



function Vue() {



}



function render(template, context) {



}


var template = `
	<span>{{id}}</span>
	<span> {{name.first}}</span>
	<span> {{name.last}} </span>
`;


var context = {
	id: 123,
	name: {
		first: 'sun',
		last: 'sai'
	}
};


easyTpl(template, context);


function getValue(context, key) {
	var events = key.split('.');
    var i = 1;
    var dat = context[events[0]];
    while(dat && i < events.length) {
        dat = dat[events[i]];
        i++;
    }
    return dat;
}

function easyTpl(tpl, context) {
    var reg = /{{([a-zA-Z_$][a-zA-Z_$0-9\.]*)}}/g;    
    return tpl.replace(reg, function (raw, key, offset, str) {
        console.log('-----------');
        console.log(raw);
        console.log(key);
        console.log(offset);
        console.log(str);

        return getValue(context, key);

    });
}
