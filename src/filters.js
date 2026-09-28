// Using the filters — tasks 5 to 7.
//
// A complete set of filters looks like this, and every field is always there:
//   { minPrice: 10, maxPrice: null, inStock: true }
// minPrice, maxPrice: a number, or null for "no limit".
// inStock: true (only items in stock), false (only items not in stock),
//          or null (either).

/**
 * Task 5. Combine the shopper's saved preferences with what the address says.
 *
 * For each of minPrice, maxPrice and inStock:
 *   - the address mentioned it (anything but undefined, including null) -> use the address's value
 *   - the address did not mention it                                  -> use the saved value
 *   - nothing saved for it either                                     -> null
 *
 * saved      — from JSON: { minPrice, maxPrice, inStock }, with numbers,
 *              booleans or null. An older save may lack a field. A shopper
 *              who never saved anything has saved === null.
 * fromUrl    — the filters from readFilters: every key present, values may
 *              be undefined (not mentioned) or null (cleared).
 *
 * Returns a complete set of filters: no field is ever undefined.
 *
 * @param {object | null} saved
 * @param {{ minPrice: *, maxPrice: *, inStock: * }} fromUrl
 * @returns {{ minPrice: number | null, maxPrice: number | null, inStock: boolean | null }}
 */
export function combine(saved, fromUrl) {
  throw new Error('not implemented');
}


/**
 * Task 6. Are two complete sets of filters the same?
 *
 * The page offers "Save as my defaults" only when the filters in use differ
 * from the saved ones. a and b are complete sets of filters, usually built
 * separately.
 *
 * @param {{ minPrice: *, maxPrice: *, inStock: * }} a
 * @param {{ minPrice: *, maxPrice: *, inStock: * }} b
 * @returns {boolean}
 */
export function sameFilters(a, b) {
  throw new Error('not implemented');
}

/**
 * Task 7. Does one product pass a complete set of filters?
 *
 * product — from the catalogue JSON: { name, price, stock }
 *   price: a number, or null when the price is given on request
 *   stock: a number, or missing when the shop does not know
 *
 * Rules:
 *   - a limit of null is no limit; any number, 0 included, is a limit
 *   - limits include their edge: minPrice 12 lets a 12 through
 *   - a product with no price never passes a price limit
 *   - "in stock" means a stock above 0; missing stock is not in stock
 *   - inStock true keeps only items in stock; false keeps only items that are not
 *
 * @param {{ name: string, price: number | null, stock?: number }} product
 * @param {{ minPrice: number | null, maxPrice: number | null, inStock: boolean | null }} filters
 * @returns {boolean}
 */
export function matches(product, filters) {
  throw new Error('not implemented');
}
