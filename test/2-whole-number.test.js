// Task 2 — isWholeNumber(n)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { isWholeNumber } from '../src/values.js';

const show = (v) => inspect(v);   // shows "5" and 5 differently, so you can tell text from a number

function check(n, want, hint) {
  const got = isWholeNumber(n);
  assert.equal(got, want,
    `isWholeNumber(${show(n)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('whole numbers are whole', () => {
  const hint = 'A whole number leaves no remainder when divided by 1: n % 1 is 0. See "Arithmetic operators".';
  check(4, true, hint);
  check(0, true, hint);
  check(-3, true, hint);
});

test('numbers with a fraction are not whole', () => {
  const hint = 'n % 1 is the fraction part: 4.5 % 1 is 0.5. Compare it with 0 using ===.';
  check(4.5, false, hint);
  check(0.25, false, hint);
});

test('odd numbers are whole too', () => {
  check(3, true, 'Whole is not the same as even. % 2 asks about even; % 1 asks about whole.');
  check(7, true, 'Whole is not the same as even.');
});
