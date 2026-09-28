// Task 7 — matches(product, filters)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { matches } from '../src/filters.js';

const show = (v) => inspect(v);

// The catalogue, as the shop's JSON gives it.
const MUG = { name: 'Mug', price: 12, stock: 4 };
const POSTER = { name: 'Poster', price: 0, stock: 10 };       // free
const LAMP = { name: 'Lamp', price: null, stock: 2 };         // price on request
const CHAIR = { name: 'Chair', price: 80, stock: 0 };         // sold out
const RUG = { name: 'Rug', price: 40 };                       // stock unknown

function filters(minPrice, maxPrice, inStock) {
  return { minPrice: minPrice, maxPrice: maxPrice, inStock: inStock };
}
const NONE = filters(null, null, null);

function expectMatch(product, f, expected, where) {
  const got = matches(product, f);
  assert.equal(got, expected,
    `matches(${product.name} ${show(product)}, ${show(f)}) should be ${expected}, got ${show(got)}. ${where}`);
}

test('with no filters, every product matches — price on request and unknown stock included', () => {
  for (const p of [MUG, POSTER, LAMP, CHAIR, RUG]) {
    expectMatch(p, NONE, true, 'null means no limit and no preference.');
  }
});

test('a minimum keeps products at or above it', () => {
  const f = filters(20, null, null);
  expectMatch(MUG, f, false, '12 is below 20.');
  expectMatch(RUG, f, true, '40 is above 20.');
  expectMatch(MUG, filters(12, null, null), true,'Limits include their edge: 12 passes a minimum of 12.');
});

test('a maximum keeps products at or below it', () => {
  expectMatch(RUG, filters(null, 30, null), false, '40 is above 30.');
  expectMatch(MUG, filters(null, 30, null), true, '12 is below 30.');
  expectMatch(MUG, filters(null, 12, null), true, 'Limits include their edge: 12 passes a maximum of 12.');
});

test('a maximum of 0 means free items only', () => {
  const f = filters(null, 0, null);
  expectMatch(POSTER, f, true, 'The poster costs 0.');
  expectMatch(MUG, f, false,
    'A maximum of 0 is a limit. If the mug passed, the check asked whether maxPrice was truthy, and 0 is falsy — ' +
    'the question is whether it is null.');
});

test('a product with no price never passes a price limit', () => {
  expectMatch(LAMP, filters(null, 100, null), false,
    'The lamp\'s price is null. If it passed, null <= 100 was asked, and <= converts null to 0 — no error, a wrong answer. ' +
    'Decide about a missing price before comparing it.');
  expectMatch(LAMP, filters(10, null, null), false, 'No price, so it cannot be shown to be 10 or more.');
});

test('a minimum of 0 is still a limit, and still excludes a product with no price', () => {
  expectMatch(POSTER, filters(0, null, null), true, '0 is at least 0.');
  expectMatch(LAMP, filters(0, null, null), false,
    'If the lamp passed, either the minimum of 0 was skipped as falsy, or null >= 0 was asked (true, since null becomes 0).');
});

test('inStock true keeps only products with stock above 0', () => {
  const f = filters(null, null, true);
  expectMatch(MUG, f, true, 'Stock 4.');
  expectMatch(CHAIR, f, false, 'Stock 0 is sold out.');
  expectMatch(RUG, f, false, 'The rug\'s stock is missing. The shop does not know, so it is not known to be in stock.');
});

test('inStock false keeps only products that are not in stock', () => {
  const f = filters(null, null, false);
  expectMatch(CHAIR, f, true, 'Stock 0 is not in stock.');
  expectMatch(RUG, f, true, 'Missing stock is not in stock either.');
  expectMatch(MUG, f, false,
    'inStock false is a preference: "show me what is sold out". If the mug passed, the check treated false as "no preference" — ' +
    'false and null are different answers.');
});

test('all three filters together', () => {
  const f = filters(10, 50, true);
  expectMatch(MUG, f, true, '12 is in range and in stock.');
  expectMatch(RUG, f, false, 'In range, but its stock is unknown.');
  expectMatch(CHAIR, f, false, 'Above the maximum, and sold out.');
  expectMatch(POSTER, f, false, 'Below the minimum.');
});
