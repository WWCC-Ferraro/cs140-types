// Task 3 — isInRange(n, low, high)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { isInRange } from '../src/values.js';

const show = (v) => inspect(v);   // shows "5" and 5 differently, so you can tell text from a number

function check(n, low, high, want, hint) {
  const got = isInRange(n, low, high);
  assert.equal(got, want,
    `isInRange(${show(n) + ", " + show(low) + ", " + show(high)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('a number between the ends is in range', () => {
  check(5, 1, 10, true, 'Both questions must be true: is n at least low, and is n at most high? Join them with &&. See "Comparing and combining".');
});

test('both ends count', () => {
  const hint = '"At least" is >= and "at most" is <=. With > and < the ends are left out.';
  check(1, 1, 10, true, hint);
  check(10, 1, 10, true, hint);
});

test('a number outside the range is not in it', () => {
  const hint = 'Each side alone is not enough: 11 is at least 1, but not at most 10. && needs both; || needs only one.';
  check(11, 1, 10, false, hint);
  check(0, 1, 10, false, hint);
});
