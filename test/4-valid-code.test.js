// Task 4 — isValidCode(code)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { isValidCode } from '../src/values.js';

const show = (v) => inspect(v);   // shows "5" and 5 differently, so you can tell text from a number

function check(code, want, hint) {
  const got = isValidCode(code);
  assert.equal(got, want,
    `isValidCode(${show(code)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('a code with all three rules met is valid', () => {
  const hint = 'Check all three — length, how it starts, no lowercase — and join them with &&. See "Working with strings".';
  check('WW1234', true, hint);
  check('WWAB12', true, hint);
});

test('a code that does not start with "WW" is not valid', () => {
  check('XX1234', false, 'code.startsWith("WW") asks the question for you.');
  check('ww1234', false, 'The start must be "WW" exactly — capitals.');
});

test('a code that is not exactly 6 characters is not valid', () => {
  const hint = 'code.length is the number of characters. Exactly 6 means === 6.';
  check('WW123', false, hint);
  check('WW12345', false, hint);
});

test('a code with lowercase letters is not valid', () => {
  check('WWab12', false, 'A string with no lowercase letters is unchanged by toUpperCase(). Compare the code with its uppercase version.');
});
