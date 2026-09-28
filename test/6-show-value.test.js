// Task 6 — showValue(value)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { showValue } from '../src/values.js';

const show = (v) => inspect(v);

function check(value, want, hint) {
  const got = showValue(value);
  assert.equal(got, want,
    `showValue(${show(value)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('undefined and null are shown differently', () => {
  const hint = 'undefined means nothing was ever set; null means someone set it to none. ' +
    'null == undefined is true, so == cannot tell them apart — use ===. See "When there is nothing there".';
  check(undefined, '(not set)', hint);
  check(null, '(none)', hint);
});

test('numbers, booleans and text become text', () => {
  const hint = 'String(value) converts any value to text, on purpose.';
  check(42, '42', hint);
  check('Ada', 'Ada', hint);
  check(true, 'true', hint);
});

test('0, false and NaN are shown, not hidden', () => {
  const hint = 'These are falsy, but they are real values. Only undefined and null get the special text.';
  check(0, '0', hint);
  check(false, 'false', hint);
  check(NaN, 'NaN', hint);
});

test('always sends back a string', () => {
  const got = showValue(7);
  assert.equal(typeof got, 'string',
    `showValue(7) should be the string "7", but it gave ${show(got)}, a ${typeof got}. Convert with String().`);
});
