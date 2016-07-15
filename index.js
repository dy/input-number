/**
 * @module  num-input
 */

const caret = require('caret-position2');

module.exports = Enhance;

const keys = {
	38: 'up',
	40: 'down'
}

function Enhance (input) {
	input.addEventListener('keydown', e => {
		var key = keys[e.which];

		if (!key) return;

		e.preventDefault();

		let str = input.value;
		let pos = caret.get(input);

		let numRE = /[\.0-9]/;

		//parse left side
		let left = pos.start;
		while (numRE.test(str[left - 1])) {
			left--;
		}

		//parse right side
		let right = pos.end;
		while (numRE.test(str[right])) {
			right++;
		}

		let numStr = str.slice(left, right);

		if (!numStr) return;

		let number = parseFloat(numStr);
		number = key === 'up' ? number+1 : number-1;

		let leftStr = str.slice(0, left);
		let rightStr = str.slice(right);

		let result = leftStr + number + rightStr;

		input.value = result;

		caret.set(input, left, result.length - rightStr.length);
	});
}