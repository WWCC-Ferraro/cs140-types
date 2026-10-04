# Values, one at a time

Eight small functions, each about one thing JavaScript does with a value:
what type it is, what arithmetic and comparisons give back, checking text, and
telling "nothing" apart from zero and false.

Everything here uses numbers, strings, booleans, `null` and `undefined` — the
values from the *Values, types and operators* module. Every answer is one line:
a `return` and one expression. None of them needs `if`.

## What each part leans on

| Part | Lessons |
|---|---|
| 1 `typeName` | Where the type actually lives |
| 2 `isWholeNumber` | Arithmetic operators; Comparing and combining |
| 3 `isInRange` | Comparing and combining |
| 4 `isValidCode` | Working with strings; Comparing and combining |
| 5 `isCorrect` | Conversion — when a value does not fit; Equality: == versus === |
| 6 `wasAnswered` | When there is nothing there; Truthiness |
| 7 `labelOf` | When there is nothing there; Conversion — when a value does not fit |
| 8 `formatPrice` | Arithmetic operators; Working with strings |

## Getting started

1. Open **your repository**. It is made for you: private, and named for this
   homework, the term and your username — `<term>-cs140-types-<you>`. On
   [this homework's page](https://wwcc.dev/#/lesson/types-assignment), type your GitHub
   username and click **Open my Codespace**. On your own computer, clone it
   with GitHub Desktop (**Code**, then **Open with GitHub Desktop**) and check
   that `node --version` prints 22 or later. The lesson *How a homework works*
   walks through both.
2. Run the tests:

   ```sh
   npm test
   ```

   Every test fails at first. That is the starting point, not a problem.

While you work on one task, run just its tests:

```sh
node --test test/2-whole-number.test.js
```

The same tests run on GitHub every time you push. The **Actions** tab shows
the result.

## How to write each answer

All eight functions are in `src/values.js`, already written except for the
middle. Each one looks like this:

```js
export function double(n) {
  // TODO: put your code here
}
```

Write your answer between the braces, and put `return` in front of it —
`return` sends the value out of the function so the tests can check it. The
Functions module explains the rest.

```js
export function double(n) {
  return n * 2;
}
```

The name in the parentheses — `n` here — is the value the test hands in. Use
that name in your answer. You can also make your own names with `const` inside
the braces, as you would anywhere else.

Several tasks send back `true` or `false`. A comparison already gives one —
`n > 3` *is* `true` or `false` — so send it back directly: `return n > 3;`.
Join two questions with `&&` (both must be true) or `||` (either will do).

Leave `export` in front of each function. It is what lets the tests use it.

Stuck? `console.log(something)` inside a function prints it when the tests
run. The tests do not look at what you print, so print as much as you like.

## Using an AI assistant

`AGENTS.md` in this repository tells AI coding assistants how this course wants
them to help: as a tutor who explains errors, asks questions and gives hints,
not by writing your answers. Most assistants read it automatically. It is in
the open, so read it too. It says what good AI help looks like.

## The tasks

The comment above each function in `src/values.js` says what it receives and
what it sends back, with examples. The tests say the rest: each failure message
says what came back and what to look at.

### 1. Name the type — `typeName(value)`

Send back what `typeof` says. That includes `null`, which `typeof` calls
`"object"` — a mistake in the language that was never fixed. Leave it.

### 2. Is it whole? — `isWholeNumber(n)`

`4` is whole; `4.5` is not. The remainder operator `%` gives what is left
over after dividing: a whole number divided by 1 leaves nothing over.

### 3. In range? — `isInRange(n, low, high)`

`true` when `n` is at least `low` **and** at most `high`. Both ends count.

### 4. A ticket code — `isValidCode(code)`

Exactly 6 characters, starting with `"WW"`, with no lowercase letters. Three
checks, joined with `&&`. A string with no lowercase letters is unchanged by
`toUpperCase()`.

### 5. Mark an answer — `isCorrect(answer, expected)`

`answer` is text a student typed; `expected` is a number. Convert, then
compare with `===`. A blank answer is never correct, even when the right answer
is `0` — and `Number("")` is `0`, so check for a blank first.

### 6. Was it answered? — `wasAnswered(value)`

`undefined`, `null` and `""` mean no answer. Everything else is an answer —
including `0` and `false`, which truthiness would throw away.

### 7. Show a setting — `labelOf(value)`

Any value as text — `0` gives `"0"`, `false` gives `"false"` — except that
`null` and `undefined` give `"(none)"`. `??` replaces only `null` and
`undefined`; `||` would replace `0` and `false` too.

### 8. Cents to dollars — `formatPrice(cents)`

`1205` gives `"$12.05"`, and `1250` gives `"$12.50"`, not `"$12.5"`.
`number.toFixed(2)` gives text with exactly two digits after the dot.

## Done means

`npm test` passes every test.
