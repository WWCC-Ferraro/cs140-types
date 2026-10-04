// Task 8 — formatPrice(cents)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { formatPrice } from '../src/values.js';

const show = (v) => inspect(v);

function check(cents, want, hint) {
  const got = formatPrice(cents);
  assert.equal(got, want,
    `formatPrice(${show(cents)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('writes dollars and cents with a dollar sign', () => {
  const hint = 'Divide by 100 to get dollars, and join "$" to the front with +. See "Operators" and "Working with strings".';
  check(1205, '$12.05', hint);
  check(999, '$9.99', hint);
});

test('always shows two digits of cents', () => {
  const hint = '1250 / 100 is 12.5, and a number does not keep a trailing zero. ' +
    'number.toFixed(2) gives text with exactly two digits after the dot.';
  check(1250, '$12.50', hint);
  check(1200, '$12.00', hint);
});

test('small and zero amounts', () => {
  const hint = 'toFixed(2) gives "0.05" for 0.05 and "0.00" for 0.';
  check(5, '$0.05', hint);
  check(0, '$0.00', hint);
});

test('sends back a string', () => {
  const got = formatPrice(100);
  assert.equal(typeof got, 'string', `formatPrice(100) should be a string, but it gave ${show(got)}.`);
});
