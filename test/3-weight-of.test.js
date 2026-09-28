// Task 3 — weightOf(label)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { weightOf } from '../src/values.js';

const show = (v) => inspect(v);

function check(label, expected, hint) {
  const got = weightOf(label);
  assert.ok(Object.is(got, expected),
    `weightOf(${show(label)}) should be ${show(expected)}, but it gave ${show(got)}. ${hint}`);
}

test('reads the number at the start of a label', () => {
  const hint = 'Number("2.5 kg") is NaN, because the whole text is not a number. ' +
    'parseFloat reads a number from the start of the text and stops at the first thing that is not part of one.';
  check('2.5 kg', 2.5, hint);
  check('10kg', 10, hint);
  check('0.75 kg', 0.75, hint);
});

test('a weight of 0 is 0, not null', () => {
  check('0 kg', 0,
    '0 is a real weight. If you checked with if (!weight), 0 counts as false and is thrown away — ' +
    'see "Truthiness". Ask the exact question: is it NaN?');
});

test('a label that does not start with a number is null', () => {
  const hint = 'parseFloat gives NaN here. NaN === NaN is false, so === cannot find it; ' +
    'Number.isNaN(x) is the check that can.';
  check('kg', null, hint);
  check('', null, hint);
  check('about 3 kg', null, hint + ' parseFloat reads from the start, and "about" is not a number.');
});
