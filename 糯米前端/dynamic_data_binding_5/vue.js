



function Vue(data) {

    this.element = document.querySelector(data.el);
    this.observer = new Observer(data.data);
    this.template = this.element.innerHTML;
    this.render();
}

 Vue.prototype.getValue = function(context, key) {
	var events = key.split('.');
    var i = 1;
    var dat = context[events[0]];
    while(dat && i < events.length) {
        dat = dat[events[i]];
        i++;
    }
    return dat;
}

 Vue.prototype.parseTemplate = function(tpl) {
    var result = {};
    var reg = /{{([a-zA-Z_$][a-zA-Z_$0-9\.]*)}}/g;
    tpl.replace(reg, function (raw, key, offset, str) {
        result[raw] = {
            key: key
        };
    });
    return result;
}

Vue.prototype.render = function() {
    var template = this.template;
    var context = this.observer.data;
    var exp = this.parseTemplate(template);
    var self = this;
    Object.keys( exp ).forEach(function(attr) {
        console.log(attr);
        var item = exp[attr];
        console.log(item);
        var value = self.getValue( context, item.key);
        item.value = value;
        template = template.replace(attr, value);
    });
    this.element.innerHTML = template;
}


var context = {
    id: 123,
    user: {
        name: 'sun sai',
        age: 12
    }
};


var vue = new Vue({
    el: '#app',
    data: context
})
