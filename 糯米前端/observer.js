(function(global) {

	function Observer(bindData) {
		const value = {};
		this.data = {};
		for(let attr in bindData) {
			value[attr] = bindData[attr];
			Object.defineProperty(this.data, attr, {
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