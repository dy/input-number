const num = require('./');
const autosize = require('autosize-input');

var input = document.createElement('input');

input.value = 'border: 1.000em solid rgb(100, 200, 300)';
num(input, {});
autosize(input);

input.onchange = (e) => {console.log('change')}
input.oninput = (e) => {console.log('input')}

document.body.appendChild(input);

num(input)

var input2 = document.createElement('input');
input2.value = '-1.000';
num(input2, {step: 0.001});


document.body.appendChild(input2);

