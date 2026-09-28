// Task 5 — combine(saved, fromUrl)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { combine } from '../src/filters.js';

const show = (v) => inspect(v);

// fromUrl always has all three keys, as readFilters returns it.
function url(minPrice, maxPrice, inStock) {
  return { minPrice: minPrice, maxPrice: maxPrice, inStock: inStock };
}

function expectCombined(saved, fromUrl, expected, where) {
  const got = combine(saved, fromUrl);
  for (const field of ['minPrice', 'maxPrice', 'inStock']) {
    assert.equal(got[field], expected[field],
      `combine(${show(saved)}, ${show(fromUrl)}): ${field} should be ${show(expected[field])}, got ${show(got[field])}. ${where}`);
  }
}

const SAVED = { minPrice: 10, maxPrice: 50, inStock: true };

test('a field the address mentions replaces the saved one', () => {
  expectCombined(SAVED, url(20, undefined, undefined), { minPrice: 20, maxPrice: 50, inStock: true },
    'The address is what the shopper asked for just now.');
});

test('a field the address does not mention keeps the saved value', () => {
  expectCombined(SAVED, url(undefined, undefined, undefined), SAVED,
    'undefined means "not mentioned", so the saved preference stands.');
});

test('a field the address cleared (null) clears the saved value', () => {
  expectCombined(SAVED, url(undefined, null, undefined), { minPrice: 10, maxPrice: null, inStock: true },
    'The shopper emptied the maximum box: they want no maximum, not their saved 50. ' +
    'If you got 50, your fallback treats null like undefined — ?? does exactly that. ' +
    'Here the two absences mean different things, so ask about undefined alone.');
});

test('an explicit false in the address beats a saved true', () => {
  expectCombined(SAVED, url(undefined, undefined, false), { minPrice: 10, maxPrice: 50, inStock: false },
    'false is an answer, not an absence. If you got true, the fallback asked the falsy list — look for ||.');
});

test('a 0 in the address beats a saved minimum', () => {
  expectCombined(SAVED, url(0, undefined, undefined), { minPrice: 0, maxPrice: 50, inStock: true },
    '0 is a limit the shopper typed. If you got 10, the fallback asked the falsy list.');
});

test('saved values of 0 and false are kept', () => {
  const saved = { minPrice: 0, maxPrice: null, inStock: false };
  expectCombined(saved, url(undefined, undefined, undefined), saved,
    'The saved side has real zeros and falses too. Any fallback on this side must also ask only about absence.');
});

test('with nothing saved (null), unmentioned fields are null', () => {
  expectCombined(null, url(5, undefined, undefined), { minPrice: 5, maxPrice: null, inStock: null },
    'A shopper who never saved anything has saved === null. If this threw a TypeError, the code asked null for a property — ' +
    'that link in the chain is allowed to be missing, so guard it.');
});

test('an older save missing a field gives null for it, never undefined', () => {
  expectCombined({ minPrice: 10 }, url(undefined, undefined, undefined), { minPrice: 10, maxPrice: null, inStock: null },
    'The result is a complete set of filters: every field is a value or null. undefined would leave matches() guessing.');
});
