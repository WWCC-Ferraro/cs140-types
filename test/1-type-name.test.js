// Task 1 — typeName(value)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { typeName } from '../src/values.js';

const show = (v) => inspect(v);   // shows "5" and 5 differently, so you can tell text from a number

function check(value, want, hint) {
  const got = typeName(value);
  assert.equal(got, want,
    `typeName(${show(value)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('names strings, numbers, booleans and undefined', () => {
  const hint = 'typeof gives the answer. See "Where the type actually lives".';
  check('hello', 'string', hint);
  check(5, 'number', hint);
  check(true, 'boolean', hint);
  check(undefined, 'undefined', hint);
});

test('"5" is a string, even though it looks like a number', () => {
  check('5', 'string', 'The quotes make it text. The type belongs to the value, not to what it looks like.');
});

test('NaN is a number', () => {
  check(NaN, 'number', 'NaN means "not a number", but its type is number. Send back what typeof says.');
});

test('null is "object" — the language\'s famous mistake, left as it is', () => {
  check(null, 'object', 'typeof null says "object". It is a mistake in the language that was never fixed; send it back unchanged.');
});
