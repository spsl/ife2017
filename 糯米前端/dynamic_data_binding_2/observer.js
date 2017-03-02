(function(global) {

	function Observer(bindData) {
		
		this.data = {};
		this.convert(bindData, this.data);
	}



	Observer.prototype.convert = function( from, to ) {
		const value = {};
		const self = this;
		for(let attr in from) {
			if ( from.hasOwnProperty(attr) ) {
				if (typeof from[attr] === 'object' ) {
					to[attr] = {}
					self.convert( from[attr], to[attr] );
				} else {
					value[attr] = from[attr];
					Object.defineProperty( to, attr, {
						get : function() {
							console.log('你访问了 ' + attr);
							return value[attr];
						},
						set: function( newValue ) {
							if (typeof newValue === 'object') {
								value[attr] = {};
								self.convert( newValue, to[attr] );
							} else {
								console.log('你设置了' + attr + '，新的值为' + newValue);
								value[attr] = newValue;
							}
						}
					});
				}
			}
				
			
		}
	}
	window.Observer = Observer;
}(window));