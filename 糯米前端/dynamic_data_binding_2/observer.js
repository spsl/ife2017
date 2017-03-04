(function( global ) {

	

	function Observer( data , selfEventName , parentEventBus) {
		if( !data || typeof data !== 'object' ) {
			return;
		} 
		this.data = data;
		this.observerObject( data );

		if ( parentEventBus ) {
			this.eventBus = parentEventBus.getChild( selfEventName );
		}

		if ( !this.eventBus ) {
			this.eventBus = new EventBus( selfEventName, parentEventBus );
		}
		
		if ( parentEventBus && selfEventName ) {
			parentEventBus.setChild( selfEventName, this.eventBus );
		}
	}

	Observer.prototype.observerObject = function( obj ) {
		const self = this;
		Object.keys( obj ).forEach(function( attr ) {
			let val = obj[attr];

			if ( typeof val === 'object' ) {
				new Observer( val, attr, self.eventBus);
			}
			self.convert( attr, val );
		});
	}

	Observer.prototype.convert = function( attr, value ) {

		const self = this;
		Object.defineProperty(this.data, attr, {
			enumerable: true,
			configurable: true,
			get: function() {
				console.log('get ' + attr + ' : ' + value);
				return value;
			},
			set: function( newVal ) {
				console.log('set ' + attr + ' : ' + newVal );
				value = newVal;
				if ( typeof newVal === 'object' ) {
					new Observer( value, attr, self.eventBus);
				}

				// 相应事件
				self.eventBus.emit( attr, value );
			}
		});
	}

	Observer.prototype.setChild = function( childEventName, childEventBus ) {
		this.child[childEventName] = childEventBus;
	}

	Observer.prototype.getChild = function( childEventName ) {
		return this.child[childEventName];
	}

	Observer.prototype.$watch = function( eventName, callback) {
		this.eventBus.on( eventName, callback );
	}



	function EventBus(selfEventName,  parent) {
		this.bus = {};
		this.parent = parent;
		this.eventName = selfEventName;
		this.child = {};
	}


	EventBus.prototype.on = function( eventName, callback ) {
		if ( !eventName || !callback || typeof callback !== 'function' ) {
			return;
		} 
		if ( this.bus[eventName] ) {
			this.bus[eventName].push( callback );
		} else {
			this.bus[eventName] = [callback];
		}
	}


	EventBus.prototype.emit = function( eventName, newVal ) {

		if ( this.bus[eventName] ) {
			this.bus[eventName].forEach(function(callback) {
				callback.call(null, newVal);
			});
		}

		if ( this.parent && this.parent.eventName ) {
			this.parent.emit( this.parent.eventName, newVal );
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










