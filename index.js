/**
 * @module  input-number
 */
'use strict'

const caret = require('caret-position2');
const clamp = require('mumath/clamp');
const round = require('mumath/round');
const keys = {
	38: 'up',
	40: 'down',
	13: 'enter'
};
const numRE = /[\-\.0-9]/;

module.exports = inputNumber;

function inputNumber (input, opts) {
	opts = opts || {};
	opts.step = opts.step || ((opts.min && opts.max) ? (opts.max - opts.min / 100) : 1);
	opts.max = opts.max || Infinity;
	opts.min = opts.min || -Infinity;
	opts.precision = opts.precision || 0.00001;

	var focused = false;

	if (input._inputNumber) {
		input.removeEventListener('keydown', input._inputNumber)
		input.removeEventListener('blur', input._inputNumber.change)
	}

	input.addEventListener('keydown', keydown)

	function keydown(e) {
		let key = keys[e.which];

		if (!key) return;

		if (key === 'enter') {
			let changeEvent = new Event('change');
			input.dispatchEvent(changeEvent);
			return;
		}

		e.preventDefault();

		let str = input.value;
		let pos = caret.get(input);

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
		let fract = /\.([0-9]+)/.exec(numStr);

		if (key === 'up') {
			number = clamp((number+opts.step), opts.min, opts.max);
		}
		else {
			number = clamp((number-opts.step), opts.min, opts.max);
		}
		number = round(number, opts.precision);

		// ensure number format
		if (fract) number = number.toFixed(fract[1].length)

		let leftStr = str.slice(0, left);
		let rightStr = str.slice(right);

		let result = leftStr + number + rightStr;

		input.value = result;

		caret.set(input, left, result.length - rightStr.length);

		//resurrect suppressed event
		let inputEvent = new Event('input');
		input.dispatchEvent(inputEvent);

		//emulate change event
		if (!focused) {
			focused = true;
			input.addEventListener('blur', change);
		}
	}
	keydown.change = change
	function change () {
		input.removeEventListener('blur', change);
		let changeEvent = new Event('change');
		input.dispatchEvent(changeEvent);
		focused = false;
	}

	input._inputNumber = keydown


	return input;
}
