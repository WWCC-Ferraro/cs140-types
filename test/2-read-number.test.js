// Task 2 — readNumber(raw)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { readNumber } from '../src/read.js';

const show = (v) => inspect(v);   // prints "5", 5, null and undefined so you can tell them apart

function expectValue(raw, expected, where) {
  const got = readNumber(raw);
  assert.equal(got.ok, true,
    `readNumber(${show(raw)}) should be accepted, but it was rejected (${show(got.reason)}). ${where}`);
  assert.equal(got.value, expected,
    `readNumber(${show(raw)}) should give ${show(expected)}, got ${show(got.value)}. ${where}`);
}

function expectRejected(raw, where, mention) {
  const got = readNumber(raw);
  assert.equal(got.ok, false,
    `readNumber(${show(raw)}) should be rejected, but it was accepted as ${show(got.value)}. ${where}`);
  assert.equal(typeof got.reason, 'string',
    `readNumber(${show(raw)}) was rejected with no reason. Use reject("...") so the shopper can be told what was wrong.`);
  if (mention) {
    assert.ok(got.reason.includes(mention),
      `The reason for rejecting ${show(raw)} should mention ${show(mention)}, but it was ${show(got.reason)}. ${where}`);
  }
}

test('converts number text: "12" → 12', () => {
  expectValue('12', 12, 'Text from the address has to be converted on purpose. Look at the explicit conversion in "Conversion — when a value does not fit".');
  expectValue('7.5', 7.5, 'Decimals are prices too.');
  expectValue('-3', -3, 'A negative number is still a number.');
});

test('ignores spaces around the number: " 7.5 " → 7.5', () => {
  expectValue(' 7.5 ', 7.5, 'Trim the text before deciding what it is.');
});

test('"0" is a real limit of zero, not a cleared field', () => {
  expectValue('0', 0, '"0" is a non-empty piece of text. If it came back as null, your blank check asked the falsy list, or converted before it checked.');
});

test('a cleared field ("") is null — no limit, not zero', () => {
  expectValue('', null,
    'The shopper emptied the box. That means "no limit", and a limit of 0 would hide everything that costs money. ' +
    'What does Number("") give? Decide what "blank" means before you convert.');
});

test('a field of only spaces ("   ") is cleared too', () => {
  expectValue('   ', null, 'Spaces are not a number either. Check for blank after trimming, not before.');
});

test('a number from saved JSON is used as it is: 20 → 20', () => {
  expectValue(20, 20, 'Saved preferences are already numbers. The value carries its type — ask it with typeof.');
});

test('a saved 0 stays 0', () => {
  expectValue(0, 0,
    'A saved limit of 0 is a real limit. If you got null, a check meant for blank text caught the number 0 — ' +
    'look for a `!raw`, a `||`, or a `== ""` (0 == "" is true: == converts before it compares).');
});

test('null (saved as "no limit") stays null', () => {
  expectValue(null, null, 'null is how saved JSON says "cleared". It is not a number to convert — Number(null) is 0.');
});

test('undefined (not mentioned) stays undefined, not null', () => {
  expectValue(undefined, undefined,
    'undefined and null are two different absences here. undefined means the field was never mentioned; ' +
    'null means someone cleared it. Task 5 depends on keeping them apart — "When there is nothing there".');
});

test('text that is not a number is rejected, quoting it: "abc"', () => {
  expectRejected('abc', 'Number("abc") does not fail — it hands back NaN. Ask the converted value whether it is NaN, and remember NaN === NaN is false.', 'abc');
});

test('text that only starts with a number is rejected: "12abc"', () => {
  expectRejected('12abc', 'A shopper who typed "12abc" did not mean 12. If you got 12, your conversion reads as far as it can and stops — use the conversion that takes the whole text or nothing.');
});

test('true is rejected, naming its type: boolean', () => {
  expectRejected(true,
    'Number(true) is 1, so converting everything you are handed would turn a flag into a price. ' +
    'Only numbers and text are candidates; say what arrived instead.', 'boolean');
});

test('an array is rejected, naming its type: array', () => {
  expectRejected(['5'],
    'Some address readers give an array when a name appears twice (?minPrice=5&minPrice=9). ' +
    'Number(["5"]) is 5, which would quietly pick one. Reject it, and use typeName for the message.', 'array');
});

test('NaN is rejected', () => {
  expectRejected(NaN, 'NaN has the number type, but it is not a price. The typeof check lets it through, so it needs its own test.');
});
