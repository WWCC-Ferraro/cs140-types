// Task 6 — sameFilters(a, b)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { sameFilters } from '../src/filters.js';

const show = (v) => inspect(v);

function expectSame(a, b, expected, where) {
  const got = sameFilters(a, b);
  assert.equal(got, expected, `sameFilters(${show(a)}, ${show(b)}) should be ${expected}, got ${show(got)}. ${where}`);
}

test('two sets built separately, holding the same values, are the same', () => {
  expectSame({ minPrice: 10, maxPrice: 50, inStock: true }, { minPrice: 10, maxPrice: 50, inStock: true }, true,
    'These are two objects. If you got false, you asked whether they are the same object — the identity question. ' +
    'You need the equivalence question, and "Equality is three questions" says which operator JavaScript gives you for that.');
});

test('a set compared with itself is the same', () => {
  const f = { minPrice: null, maxPrice: 20, inStock: null };
  expectSame(f, f, true, 'One object, two names.');
});

test('the order the fields were written in does not matter', () => {
  expectSame({ minPrice: 10, maxPrice: 50, inStock: true }, { inStock: true, maxPrice: 50, minPrice: 10 }, true,
    'Same values, keys written in a different order. If you got false, you compared a serialised form — ' +
    'two strings built in different orders are different strings. Compare the fields.');
});

test('a minimum of 0 is not the same as no minimum', () => {
  expectSame({ minPrice: 0, maxPrice: null, inStock: null }, { minPrice: null, maxPrice: null, inStock: null }, false,
    '0 and null are different values. If you got true, something treated both as "nothing".');
});

test('inStock false is not the same as no preference', () => {
  expectSame({ minPrice: null, maxPrice: null, inStock: false }, { minPrice: null, maxPrice: null, inStock: null }, false,
    'false and null are different values.');
});

test('a difference in any one field is noticed', () => {
  const base = { minPrice: 10, maxPrice: 50, inStock: true };
  expectSame(base, { minPrice: 11, maxPrice: 50, inStock: true }, false, 'minPrice differs.');
  expectSame(base, { minPrice: 10, maxPrice: 51, inStock: true }, false, 'maxPrice differs.');
  expectSame(base, { minPrice: 10, maxPrice: 50, inStock: false }, false, 'inStock differs.');
});
