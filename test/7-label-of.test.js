// Task 7 — labelOf(value)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { labelOf } from '../src/values.js';

const show = (v) => inspect(v);   // shows "5" and 5 differently, so you can tell text from a number

function check(value, want, hint) {
  const got = labelOf(value);
  assert.equal(got, want,
    `labelOf(${show(value)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('a value becomes text', () => {
  const hint = 'String(value) turns any value into text. See "Conversion — when a value does not fit".';
  check('dark', 'dark', hint);
  check(12, '12', hint);
});

test('0 and false are values, not "(none)"', () => {
  const hint = '0 and false are falsy, so || would replace them. ?? only replaces null and undefined. See "When there is nothing there".';
  check(0, '0', hint);
  check(false, 'false', hint);
  check('', '', hint);
});

test('null and undefined become "(none)"', () => {
  const hint = 'value ?? "(none)" gives "(none)" when value is null or undefined.';
  check(null, '(none)', hint);
  check(undefined, '(none)', hint);
});

test('sends back a string', () => {
  const got = labelOf(5);
  assert.equal(typeof got, 'string', `labelOf(5) should be a string, but it gave ${show(got)}. Turn the result into text with String().`);
});
