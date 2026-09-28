// Task 2 — readNumber(text)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { readNumber } from '../src/values.js';

const show = (v) => inspect(v);

function check(text, expected, hint) {
  const got = readNumber(text);
  assert.ok(Object.is(got, expected),
    `readNumber(${show(text)}) should be ${show(expected)}, but it gave ${show(got)}. ${hint}`);
}

test('turns text that holds a number into that number', () => {
  const hint = 'Convert on purpose with Number(). See "Conversion — when a value does not fit".';
  check('12', 12, hint);
  check('7.5', 7.5, hint);
  check('-3', -3, hint);
});

test('ignores spaces around the number', () => {
  check(' 7.5 ', 7.5, 'Number() ignores spaces at either end for you.');
});

test('"0" is the number 0', () => {
  check('0', 0, 'A person who types 0 means zero.');
});

test('empty text is null, not 0', () => {
  check('', null,
    'Number("") is 0 — the language decides that nothing means zero. ' +
    'Check for empty text first and send back null.');
});

test('text that is only spaces is null, not 0', () => {
  check('   ', null,
    'Number("   ") is 0 as well. text.trim() gives the text without the spaces at either end; ' +
    'compare that with "".');
});

test('text that is not a number gives NaN', () => {
  const got = readNumber('abc');
  assert.ok(Number.isNaN(got),
    `readNumber("abc") should be NaN, but it gave ${show(got)}. Number("abc") already gives NaN.`);
});
