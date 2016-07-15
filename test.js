const num = require('./');

var input = document.createElement('input');

input.value = 'rgb(100, 200, 300)';
console.log(input)
num(input);

document.body.appendChild(input);

