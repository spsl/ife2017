(function( global ) {
	function Observer( data ) {
		if( !data || typeof data !== 'object' ) {
			return;
		} 
		this.data = data;
		this.observerObject( data );
	}

	Observer.prototype.observerObject = function( obj ) {
		const self = this;
		Object.keys( obj ).forEach(function( attr ) {
			let val = obj[attr];

			if ( typeof val === 'object' ) {
				new Observer( val );
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
					new Observer( value );
				}
			}
		});
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










