// Task 8 — addPrices(firstText, secondText)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { addPrices } from '../src/values.js';

const show = (v) => inspect(v);

function check(a, b, want, hint) {
  const got = addPrices(a, b);
  assert.ok(Object.is(got, want),
    `addPrices(${show(a)}, ${show(b)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('adds two prices typed as text', () => {
  const hint = '"5" + "2" is "52": with text on either side, + joins instead of adding. ' +
    'Convert both to numbers first. See "Conversion — when a value does not fit".';
  check('5', '2', 7, hint);
  check('2.50', '1.25', 3.75, hint);
});

test('0 is a price', () => {
  check('0', '3', 3, 'A price of 0 is free, not missing.');
});

test('a blank price gives null', () => {
  const hint = 'Number("") is 0, so a blank would quietly count as free. ' +
    'readNumber from task 2 already gives null for a blank; check for null.';
  check('', '3', null, hint);
  check('3', '  ', null, hint);
});

test('a price that is not a number gives null', () => {
  const hint = 'Otherwise the sum is NaN. Check each price with Number.isNaN before you add.';
  check('abc', '3', null, hint);
  check('3', 'three', null, hint);
});
