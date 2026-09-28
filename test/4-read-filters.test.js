// Task 4 — readFilters(params)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { readFilters } from '../src/read.js';

const show = (v) => inspect(v, { depth: 4 });

function expectFilters(params, expected, where) {
  const filters = readFilters(params).filters;
  for (const field of ['minPrice', 'maxPrice', 'inStock']) {
    assert.equal(filters[field], expected[field],
      `readFilters(${show(params)}): filters.${field} should be ${show(expected[field])}, got ${show(filters[field])}. ${where}`);
  }
}

function rejectedFields(params) {
  const rejected = readFilters(params).rejected;
  assert.ok(Array.isArray(rejected), `readFilters(${show(params)}).rejected should be an array, got ${show(rejected)}.`);
  const fields = [];
  for (const r of rejected) fields.push(r.field);
  return fields;
}

test('reads all three from the address', () => {
  const params = { minPrice: '5', maxPrice: '20', inStock: 'true' };
  expectFilters(params, { minPrice: 5, maxPrice: 20, inStock: true }, 'Each field goes through its reader.');
  assert.deepEqual(readFilters(params).rejected, [], 'Nothing here is wrong, so nothing should be rejected.');
});

test('reads all three from saved JSON, keeping 0 and false', () => {
  expectFilters({ minPrice: 0, maxPrice: null, inStock: false }, { minPrice: 0, maxPrice: null, inStock: false },
    'These values already have their types. If 0 or false went missing, a check somewhere asked the falsy list.');
});

test('a field not mentioned is undefined; a cleared field is null', () => {
  expectFilters({ minPrice: '' }, { minPrice: null, maxPrice: undefined, inStock: undefined },
    'minPrice was cleared; maxPrice and inStock were never mentioned. Those are different answers.');
});

test('other parameters are ignored, not rejected', () => {
  const params = { page: '2', sort: 'price', minPrice: '5' };
  expectFilters(params, { minPrice: 5, maxPrice: undefined, inStock: undefined }, 'Only the three filter fields are read.');
  assert.deepEqual(rejectedFields(params), [], 'page and sort belong to someone else. They are not wrong, just not yours.');
});

test('a rejected value is reported with its field, what arrived, and a reason — and left undefined', () => {
  const params = { minPrice: 'abc' };
  const result = readFilters(params);
  const filters = result.filters;
  const rejected = result.rejected;
  assert.equal(rejected.length, 1, `Expected one rejection for ${show(params)}, got ${show(rejected)}.`);
  assert.equal(rejected[0].field, 'minPrice', `The rejection should name the field, got ${show(rejected[0])}.`);
  assert.equal(rejected[0].value, 'abc', `The rejection should carry the value exactly as it arrived, got ${show(rejected[0].value)}.`);
  assert.equal(typeof rejected[0].reason, 'string', `The rejection should carry the reader's reason, got ${show(rejected[0].reason)}.`);
  assert.equal(filters.minPrice, undefined,
    `A rejected field should be left undefined, as if not mentioned — got ${show(filters.minPrice)}. ` +
    'A rejected value must not become a filter, and null would mean the shopper cleared it.');
});

test('every bad field is reported, not only the first', () => {
  const fields = rejectedFields({ minPrice: 'abc', maxPrice: '10', inStock: 'maybe' });
  assert.deepEqual(fields.sort(), ['inStock', 'minPrice'],
    `Expected minPrice and inStock to be rejected, got ${show(fields)}. Check each field; do not stop at the first problem.`);
});

test('the reported value is the very one that arrived', () => {
  const twice = ['true', 'false'];
  const rejected = readFilters({ inStock: twice }).rejected;
  assert.equal(rejected.length, 1, `Expected one rejection, got ${show(rejected)}.`);
  assert.ok(rejected[0].value === twice,
    'The rejection should hold the same array that arrived — one object, two names — not a copy or a converted value. ' +
    `Got ${show(rejected[0].value)}.`);
});

test('a maximum below the minimum is rejected, and only the maximum', () => {
  const params = { minPrice: '50', maxPrice: '20' };
  expectFilters(params, { minPrice: 50, maxPrice: undefined, inStock: undefined },
    'The spec keeps the minimum and drops the maximum.');
  assert.deepEqual(rejectedFields(params), ['maxPrice'], 'The maximum is the field reported.');
});

test('a maximum of 0 below a minimum is still caught', () => {
  const params = { minPrice: '5', maxPrice: '0' };
  assert.deepEqual(rejectedFields(params), ['maxPrice'],
    `{ minPrice: 5, maxPrice: 0 } is an impossible range. If nothing was rejected, the range check asked whether ` +
    'maxPrice was truthy before comparing, and 0 is falsy. Ask whether both are numbers.');
});

test('a cleared maximum is not "below" anything', () => {
  const params = { minPrice: '5', maxPrice: '' };
  expectFilters(params, { minPrice: 5, maxPrice: null, inStock: undefined }, 'No maximum means no range to check.');
  assert.deepEqual(rejectedFields(params), [],
    'maxPrice is null here. If it was rejected as below minPrice: 5 > null is true, because > converts null to 0. ' +
    'Compare only when both values are numbers.');
});

test('a minimum equal to the maximum is a valid range', () => {
  assert.deepEqual(rejectedFields({ minPrice: '12', maxPrice: '12' }), [], 'Limits include their edge, so 12 to 12 is one price.');
});
