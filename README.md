# Search filters from a query string

A shop's search page lets a shopper narrow the product list three ways: a
lowest price, a highest price, and "in stock only". The filters arrive from two
places:

- **The page address**, such as `?minPrice=5&maxPrice=&inStock=false`. Every
  value here is text.
- **The shopper's saved preferences**, stored as JSON. Here the values are
  numbers, booleans and `null`.

You will write the code that reads both, decides what each value means,
combines them, and uses the result to pick products.

JavaScript will not stop a wrong value anywhere on the way. `"5"` and `5` both
flow through. `"false"` passes an `if`. `null <= 20` is `true`. Nothing throws;
the page just shows the wrong products. So every task here is a decision about
types that you make on purpose, because the language will not make it for you.

## What it needs from the Types and values module

| Task | Lesson it leans on |
|---|---|
| 1 `typeName` | Where the type actually lives |
| 2 `readNumber` | Conversion — when a value does not fit; When there is nothing there |
| 3 `readFlag` | Truthiness; Equality is three questions |
| 4 `readFilters` | Conversion; When there is nothing there |
| 5 `combine` | When there is nothing there |
| 6 `sameFilters` | Equality is three questions |
| 7 `matches` | Truthiness; Conversion; When there is nothing there |
| Your answers | The type-discipline axis; Where the type actually lives |

## Getting started

1. Make your own copy. On this repository's GitHub page, choose **Use this
   template**, then **Create a new repository**.
2. Open your copy in one of two ways. Both work the same.
   - **In a Codespace.** Choose **Code**, then **Codespaces**, then **Create
     codespace on main**. Node is already installed.
   - **On your own machine.** Clone it and open the folder. Check that
     `node --version` prints 22 or later — Start Here's *Set up where your code
     runs* covers this.
3. Run the tests:

   ```sh
   npm test
   ```

   Every test fails at first. That is the starting point, not a problem.

While you work on one task, run just its file:

```sh
node --test test/2-read-number.test.js
```

The same tests run on GitHub every time you push. The **Actions** tab shows
the result.

## The files

- `src/read.js` — tasks 1 to 4: reading raw values.
- `src/filters.js` — tasks 5 to 7: using the filters.
- `test/` — one file per task. Read them. Each test's name is one sentence of
  the spec, and each failure message says what came back and where to look.
- `review/checkout.js` — the code you review.
- `REVIEW.md` — where you write the review.

Each function in `src/` starts as `throw new Error('not implemented')`. Replace
that line with your code. The comment above each function is its contract:
what it receives and what it must return.

The `export` in front of each function is what lets the tests use it. Modules
come later in the course; leave it in place.

## Three words this assignment uses

A filter value can be absent in two different ways, and the difference matters
in task 5.

| Word | Means | The value |
|---|---|---|
| **Not mentioned** | The field is not there at all | `undefined` |
| **Cleared** | The field is there, with nothing in it: `""` or only spaces in the address, `null` in saved JSON. It means "no limit" or "no preference" | `null` |
| **Rejected** | Something arrived that this field cannot take | a reason, reported |

This is the lesson's own model of JavaScript's two absences: `undefined` is
nothing ever put there, and `null` is someone saying "none".

## The readers' answers

The readers in tasks 2 and 3 return one of two shapes. Two helpers at the top
of `src/read.js` build them for you:

```js
accept(5)                         // { ok: true, value: 5 }
accept(null)                      // { ok: true, value: null }
reject('"abc" is not a number')   // { ok: false, reason: '"abc" is not a number' }
```

## Tasks

### 1. Name the type that arrived — `typeName(value)`

A rejection message should say what arrived: "expected a number, got boolean".
Write `typeName`, which returns what `typeof` returns with two corrections:
`null` is `"null"` and an array is `"array"`.

### 2. Read a price — `readNumber(raw)`

| `raw` | Answer |
|---|---|
| `undefined` | `accept(undefined)` — not mentioned |
| `null`, `""`, `"   "` | `accept(null)` — cleared |
| a number, such as `20` or `0` | `accept` it |
| text that is a number, such as `"12"`, `" 7.5 "` or `"0"` | `accept` the number |
| other text, such as `"abc"` or `"12abc"` | `reject`, quoting the text |
| `NaN` | `reject` |
| anything else, such as `true` or `["5"]` | `reject`, naming its type with `typeName` |

Convert on purpose, with the explicit conversion from the lesson. Then check
what the conversion gave you. `text.trim()` returns the text without spaces at
either end.

### 3. Read a yes or no — `readFlag(raw)`

| `raw` | Answer |
|---|---|
| `undefined` | `accept(undefined)` |
| `null`, `""`, `"   "` | `accept(null)` |
| `true` or `false` | `accept` it |
| `"true"` or `"1"` | `accept(true)` |
| `"false"` or `"0"` | `accept(false)` |
| any other text | `reject`, quoting it |
| anything else, such as `1` or `["true", "false"]` | `reject`, naming its type |

Spaces around the text are ignored. `"false"` is a non-empty string; decide
what that means before you write the `if`.

### 4. Read all three — `readFilters(params)`

`params` is an object, from the address or from saved JSON. Read `minPrice`
and `maxPrice` with `readNumber` and `inStock` with `readFlag`, and return:

```js
{
  filters:  { minPrice: 5, maxPrice: null, inStock: false },
  rejected: [ { field: "minPrice", value: "abc", reason: '"abc" is not a number' } ]
}
```

- `filters` always has all three keys. A field that was not mentioned, or was
  rejected, is `undefined`.
- `rejected` has one entry per rejected field. `value` is exactly what arrived.
- Anything else in `params`, such as `page`, is ignored.
- One rule across fields: when `minPrice` and `maxPrice` are both numbers and
  the maximum is below the minimum, reject `maxPrice` with the reason
  `"below minPrice"` and leave it `undefined`.

### 5. Combine with saved preferences — `combine(saved, fromUrl)`

`fromUrl` is the `filters` from task 4. `saved` is the shopper's saved JSON. It
may lack a field, if it was saved by an older version of the page. It may be
`null`, if the shopper never saved anything.

For each field, use the address's value if the address mentioned it — `null`
included, because a cleared box is a choice. Otherwise use the saved value.
Otherwise `null`. The result is a complete set of filters: no field is ever
`undefined`.

### 6. Did anything change? — `sameFilters(a, b)`

The page offers "Save as my defaults" only when the filters in use differ from
the saved ones. Return `true` when two complete sets of filters hold the same
values. They are almost always two separate objects.

### 7. Pick the products — `matches(product, filters)`

A product is `{ name, price, stock }`. `price` is `null` when the price is
given on request. `stock` is missing when the shop does not know it. Return
whether the product passes the filters:

- A limit of `null` is no limit. Any number is a limit, `0` included.
- Limits include their edge: a minimum of 12 lets a price of 12 through.
- A product with no price never passes a price limit.
- In stock means a stock above 0. Missing stock is not in stock.
- `inStock: true` keeps only products in stock. `inStock: false` keeps only
  products that are not. `null` keeps both.

### 8. Decide how forgiving `readNumber` should be

`Number()` accepts more than a shopper means, and less than a shopper types:

```js
Number("1e3")       // 1000
Number("0x1A")      // 26
Number("Infinity")  // Infinity
Number("$12")       // NaN
Number("1,200")     // NaN
```

Decide what `readNumber` should do with each of these five. Change your code if
your decision needs it — the tests do not check these five inputs, so any
defended choice passes. Write your decision and your reasons in the answer
section below: which you accept, which you reject, and what each choice costs
a shopper.

## The review

`review/checkout.js` is a teammate's first draft of a checkout summary. It runs
without an error. It still has more than one defect, most of them the kind this
module is about.

Find them. For each one, write in `REVIEW.md`:

- the line or lines;
- what goes wrong, and why — name the rule the language followed;
- an input that shows it: the call, what it returns, and what it should return;
- the fix.

You can try the file's functions in a scratch file, or paste them into Node.
The tests do not check `REVIEW.md`. A person reads it, so write for the
teammate who will act on it.

## Your answers

Replace each prompt with your answer. One to three sentences each.

1. **When would you have found out?** Suppose `readFilters` did not exist and a
   `minPrice` of `"abc"` went straight into `matches`. What would `matches` do,
   and when — if ever — would anything report a problem?

   *Your answer:*

2. **Two axes.** In Python, `float("")` raises an error and `"5" - 1` raises a
   `TypeError`. In JavaScript, `Number("")` is `0` and `"5" - 1` is `4`. Place
   the two languages on the two axes from *The type-discipline axis*. Which
   axis is the reason `readNumber` needs a blank check that a Python version
   would get from the language?

   *Your answer:*

3. **Which question?** Why can `sameFilters` not be `return a === b;`? Name the
   question `===` asks about two objects, and the one you needed.

   *Your answer:*

4. **Task 8.** What does your `readNumber` do with `"1e3"`, `"0x1A"`,
   `"Infinity"`, `"$12"` and `"1,200"`, and why?

   *Your answer:*

## Done means

- `npm test` passes every test.
- `REVIEW.md` has a finding for each defect you found, each with lines, what
  goes wrong, an input, and a fix.
- The four answers above are filled in.
