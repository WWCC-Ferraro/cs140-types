// Task 4 — isCorrect(answer, expected)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { isCorrect } from '../src/values.js';

const show = (v) => inspect(v);

function check(answer, expected, want, hint) {
  const got = isCorrect(answer, expected);
  assert.equal(got, want,
    `isCorrect(${show(answer)}, ${show(expected)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('the right number, typed as text, is correct', () => {
  check('7', 7, true,
    '"7" === 7 is false: a string and a number are never the same value. ' +
    'Convert the answer to a number first. See "Equality: == versus ===".');
  check('0', 0, true, 'Convert, then compare with ===.');
});

test('the same number written differently is still correct', () => {
  const hint = 'Once converted, "7.0" and " 7 " are both the number 7.';
  check('7.0', 7, true, hint);
  check(' 7 ', 7, true, hint);
});

test('a different number is not correct', () => {
  check('8', 7, false, 'Compare the numbers.');
});

test('words are not correct', () => {
  check('seven', 7, false, 'Number("seven") is NaN, and NaN is not equal to anything.');
});

test('a blank answer is never correct, even when the answer is 0', () => {
  const hint = '"" == 0 is true: == converts the text first, and empty text becomes 0. ' +
    'So does Number(""). Check for a blank answer before you compare, and use ===.';
  check('', 0, false, hint);
  check('   ', 0, false, hint);
  check('', 7, false, hint);
});
