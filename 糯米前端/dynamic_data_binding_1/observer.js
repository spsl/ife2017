(function(global) {

	function Observer(bindData) {
		
		this.data = {};
		this.convert(bindData, this.data);
	}

	Observer.prototype.convert = function(from, to) {
		const value = {};

		for(let attr in from) {
			value[attr] = from[attr];
			Object.defineProperty(to, attr, {
				get : function() {
					console.log('你访问了 ' + attr);
					return value[attr];
				},
				set: function(newValue) {
					console.log('你设置了' + attr + '，新的值为' + newValue);
					value[attr] = newValue;
				}
			});
		}
	}
	window.Observer = Observer;
}(window));