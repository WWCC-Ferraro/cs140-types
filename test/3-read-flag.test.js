// Task 3 — readFlag(raw)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { readFlag } from '../src/read.js';

const show = (v) => inspect(v);   // prints "true", true, null and undefined so you can tell them apart

function expectValue(raw, expected, where) {
  const got = readFlag(raw);
  assert.equal(got.ok, true,
    `readFlag(${show(raw)}) should be accepted, but it was rejected (${show(got.reason)}). ${where}`);
  assert.equal(got.value, expected,
    `readFlag(${show(raw)}) should give ${show(expected)}, got ${show(got.value)}. ${where}`);
}

function expectRejected(raw, where, mention) {
  const got = readFlag(raw);
  assert.equal(got.ok, false,
    `readFlag(${show(raw)}) should be rejected, but it was accepted as ${show(got.value)}. ${where}`);
  assert.equal(typeof got.reason, 'string',
    `readFlag(${show(raw)}) was rejected with no reason. Use reject("...").`);
  if (mention) {
    assert.ok(got.reason.includes(mention),
      `The reason for rejecting ${show(raw)} should mention ${show(mention)}, but it was ${show(got.reason)}. ${where}`);
  }
}

test('"true" is true', () => {
  expectValue('true', true,
    'If this came back false or was rejected, check for `== true`: "true" == true converts both sides to numbers, ' +
    'and "true" becomes NaN. Compare the text with the text you expect.');
});

test('"false" is false — a non-empty string, but it says no', () => {
  expectValue('false', false,
    '"false" is on nobody\'s falsy list: it is a non-empty string, so Boolean("false") and if ("false") both say true. ' +
    'The text has to be read, not tested for truthiness — see "Truthiness".');
});

test('"1" is true and "0" is false', () => {
  expectValue('1', true, 'Some pages send checkboxes as 1 and 0.');
  expectValue('0', false, '"0" is truthy text. Read what it says.');
});

test('spaces around the text are ignored: " true " is true', () => {
  expectValue(' true ', true, 'Trim first, as in readNumber.');
});

test('a saved false stays false — it is not "cleared"', () => {
  expectValue(false, false,
    'false is a real answer: "only show what is not in stock". If you got null, a check for "nothing here" ' +
    'asked the falsy list, and false is on it. Ask only about null and undefined — "When there is nothing there".');
});

test('a saved true stays true', () => {
  expectValue(true, true, 'Booleans from saved JSON are already what they mean.');
});

test('a cleared field ("" or null) is null', () => {
  expectValue('', null, 'An empty box means "no preference", the same as in readNumber.');
  expectValue('  ', null, 'Only spaces is empty too.');
  expectValue(null, null, 'null is how saved JSON says "cleared".');
});

test('undefined (not mentioned) stays undefined', () => {
  expectValue(undefined, undefined, 'Keep the two absences apart: not mentioned is not the same as cleared.');
});

test('any other text is rejected, quoting it: "maybe"', () => {
  expectRejected('maybe', 'If "maybe" came back true, something asked whether the text was truthy.', 'maybe');
});

test('a number is rejected, naming its type: number', () => {
  expectRejected(1,
    'Only booleans and text are candidates. If 1 came back true, a `== true` or a truthiness test answered — ' +
    'neither is reading the value.', 'number');
});

test('an array (inStock given twice) is rejected, naming its type: array', () => {
  expectRejected(['true', 'false'], 'Two answers is not an answer. Use typeName for the message.', 'array');
});
