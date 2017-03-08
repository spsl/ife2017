
(function( global ) {
    function Observer( data, parentDep) {

        if( !data || typeof data !== 'object' ) {
            return;
        }
        this.parent = parentDep;
        this.data = data;
        this.observerObject( data );
    }

    Observer.prototype.observerObject = function( obj ) {
        const self = this;
        Object.keys( obj ).forEach( function( attr ) {
            var val = obj[attr];
            var dep = new Dep( self.parent );
            new Observer( val, dep);
            self.convert( attr, val, dep );
        });
    };

    Observer.prototype.convert = function( attr, value , dep ) {
        const self = this;
        
        Object.defineProperty(this.data, attr, {
            enumerable: true,
            configurable: false,
            get: function() {
                console.log('get ' + attr + ' : ' + value);

                if (Dep.target) {
                    dep.addWatchers();
                }

                return value;
            },
            set: function( newVal ) {
                console.log('set ' + attr + ' : ' + newVal );

                if (value === newVal) {
                    return;
                }

                value = newVal;
                if ( typeof newVal === 'object' ) {
                    new Observer( value, dep );
                }
                dep.notify( newVal );
            }
        });
    };


    Observer.prototype.$watch = function(event, cb, context) {
        new Watcher( this, event, cb, context);
    };


    function Dep( parent ) {
        this.parent = parent;
        this.watchers = [];
    }

    Dep.prototype.notify = function( newVal ) {
        this.watchers.forEach(function( watcher ) {
            watcher.update( newVal );
        });
        if ( this.parent ) {
            this.parent.notify( newVal );
        }
    };

    Dep.prototype.addWatchers = function() {
        this.watchers.push( Dep.target );
    };

    function Watcher(ob, event, cb, context) {

        if (typeof cb !== 'function') {
            return;
        }
        this.cb = cb;
        this.ob = ob;
        this.context = context;
        this.calculateDep(event);
    }

    Watcher.prototype.register = function(deepValue, attr) {
        Dep.target = this;
        deepValue[attr];
        Dep.target = undefined;
    }

    Watcher.prototype.calculateDep = function(event) {
        var events = event.split('.');

        if (events.length == 1) {
            this.register( this.ob.data, event);
        } else {
            var i = 1;
            var deepValue = this.ob.data[events[0]];
            while(deepValue && i < events.length - 1) {
                deepValue = deepValue[events[i++]];
            }
            this.register( deepValue, events[i]);
        }
    };


    Watcher.prototype.update = function(newVal) {
        if ( this.cb ) {
            this.cb.call(this.context, newVal);
        }
    }

    global.Observer = Observer;

}(window));


const a = {
    id: 1,
    age: 12,
    name: {
        first: 'sai',
        last: 'sun'
    }
}


const b = new Observer(a);

