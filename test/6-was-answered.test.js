// Task 6 — wasAnswered(value)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { wasAnswered } from '../src/values.js';

const show = (v) => inspect(v);

function check(value, want, hint) {
  const got = wasAnswered(value);
  assert.equal(got, want,
    `wasAnswered(${show(value)}) should be ${show(want)}, but it gave ${show(got)}. ${hint}`);
}

test('undefined, null and "" are not answers', () => {
  const hint = 'Check for each of these three with ===. See "When there is nothing there".';
  check(undefined, false, hint);
  check(null, false, hint);
  check('', false, hint);
});

test('ordinary answers are answers', () => {
  check(3, true, '');
  check('yes', true, '');
  check(true, true, '');
});

test('0 is an answer', () => {
  check(0, true,
    '"How many pets do you have?" — 0 is an answer. 0 is falsy, so Boolean(value) says no. ' +
    'See "Truthiness": ask about the three values that mean no answer, not about truthiness.');
});

test('false is an answer', () => {
  check(false, true, '"Do you drive?" — false is an answer, the same way 0 is.');
});

test('"0" and "false" are answers', () => {
  const hint = 'Text with anything in it is truthy — it is not empty.';
  check('0', true, hint);
  check('false', true, hint);
});
