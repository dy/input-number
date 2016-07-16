const num = require('./');
const autosize = require('autosize-input');

var input = document.createElement('input');

input.value = 'border: .8em solid rgb(100, 200, 300)';
num(input, {

});

autosize(input);

input.onchange = (e) => {console.log('change')}
input.oninput = (e) => {console.log('input')}

document.body.appendChild(input);

