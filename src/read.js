// Reading raw filter values — tasks 1 to 4.
//
// A value reaches these functions from one of two places:
//   - the page address (?minPrice=5&inStock=false): always text
//   - saved preferences, stored as JSON: numbers, booleans and null
// Each reader turns one raw value into what the filter means, or rejects it.

// A reader's answer is one of two shapes. These build them for you.
//   accept(5)                         -> { ok: true, value: 5 }
//   reject('"abc" is not a number')   -> { ok: false, reason: '"abc" is not a number' }
function accept(value) {
  return { ok: true, value: value };
}

function reject(reason) {
  return { ok: false, reason: reason };
}

/**
 * Task 1. Name the type of a value as it arrived, for a rejection message.
 *
 * Returns what `typeof` returns, with two corrections:
 *   null   -> "null"   (typeof says "object")
 *   arrays -> "array"  (typeof says "object")
 *
 * @param {*} value  anything at all
 * @returns {string}
 */
export function typeName(value) {
  throw new Error('not implemented');
}

/**
 * Task 2. Read a price limit.
 *
 *   not mentioned: undefined            -> accept(undefined)
 *   cleared: null, "" or only spaces    -> accept(null)
 *   a number, or text that is one       -> accept(that number)   " 7.5 " -> 7.5
 *   text that is not a number           -> reject, quoting the text
 *   NaN                                 -> reject
 *   anything else (true, ["5"], {...})  -> reject, naming its type with typeName
 *
 * @param {*} raw
 * @returns {{ ok: true, value: number | null | undefined } | { ok: false, reason: string }}
 */
export function readNumber(raw) {
  throw new Error('not implemented');
}

/**
 * Task 3. Read a yes/no filter.
 *
 *   not mentioned: undefined            -> accept(undefined)
 *   cleared: null, "" or only spaces    -> accept(null)
 *   true or false                       -> accept(it)
 *   "true" or "1"                       -> accept(true)
 *   "false" or "0"                      -> accept(false)
 *   any other text                      -> reject, quoting the text
 *   anything else (1, ["true"], {...})  -> reject, naming its type with typeName
 *
 * Spaces around the text are ignored: " true " is "true".
 *
 * @param {*} raw
 * @returns {{ ok: true, value: boolean | null | undefined } | { ok: false, reason: string }}
 */
export function readFlag(raw) {
  throw new Error('not implemented');
}

/**
 * Task 4. Read all three filters from one set of parameters.
 *
 * params is always an object. Only minPrice, maxPrice and inStock are read;
 * anything else in it (page, sort, ...) is ignored.
 *
 * Returns { filters, rejected }:
 *   filters  — always has all three keys: minPrice, maxPrice, inStock.
 *              A field that was not mentioned, or was rejected, is undefined.
 *   rejected — one entry per rejected field: { field, value, reason }, where
 *              value is exactly what arrived in params. Empty when nothing
 *              was rejected.
 *
 * One rule across fields: when minPrice and maxPrice are both numbers and
 * maxPrice is below minPrice, maxPrice is rejected (reason: "below minPrice")
 * and left undefined.
 *
 * @param {object} params
 * @returns {{ filters: { minPrice: *, maxPrice: *, inStock: * }, rejected: Array<{ field: string, value: *, reason: string }> }}
 */
export function readFilters(params) {
  throw new Error('not implemented');
}
