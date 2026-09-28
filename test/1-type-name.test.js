// Task 1 — typeName(value)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { typeName } from '../src/read.js';

const show = (v) => inspect(v);   // prints "5", 5, null and undefined so you can tell them apart

function check(value, expected, where) {
  const got = typeName(value);
  assert.equal(got, expected,
    `typeName(${show(value)}) should be ${show(expected)}, got ${show(got)}. ${where}`);
}

test('names text, numbers, booleans and undefined the way typeof does', () => {
  const where = 'For these four, typeof already asks the value the right question.';
  check('hello', 'string', where);
  check('5', 'string', where + ' "5" is text that looks like a number; the value is still text.');
  check(5, 'number', where);
  check(true, 'boolean', where);
  check(undefined, 'undefined', where);
});

test('names null as "null", not "object"', () => {
  check(null, 'null',
    'typeof gets this one wrong — "Where the type actually lives" calls it a known bug. ' +
    'A message that says "got object" for a cleared field would send the reader looking for an object. ' +
    'This value needs its own check.');
});

test('names an array as "array", not "object"', () => {
  check(['true', 'false'], 'array',
    'typeof answers "object" for every array, because it reports a coarse category. ' +
    'The same lesson names the check that asks "is this an array?"');
  check([], 'array', 'An empty array is still an array.');
});

test('names a plain object as "object"', () => {
  check({ min: 5 }, 'object', 'Only null and arrays are corrected; a plain object stays "object".');
});

test('names NaN as "number" — it is the number type\'s own "not a number"', () => {
  check(NaN, 'number',
    'typeName reports the type, not whether the value is usable. NaN is a number-typed value; ' +
    'rejecting it is readNumber\'s job, not this function\'s.');
});
