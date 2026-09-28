# Values, one at a time

Eight small functions, each about one thing JavaScript does with a value: what
type it is, how to turn text into a number on purpose, which comparison to use,
and how to tell "nothing" apart from zero. Then a short review of a teammate's
script, and two short written answers.

Everything here uses numbers, strings, booleans, `null` and `undefined` — the
values from the *Values, types and operators* module. Plan on about an hour and
a half. If this is your first time programming, it may take a little longer,
and that is fine.

## What each part leans on

| Part | Lessons |
|---|---|
| 1 `typeName` | Where the type actually lives |
| 2 `readNumber` | Conversion — when a value does not fit; Working with strings |
| 3 `weightOf` | Conversion — when a value does not fit; Truthiness |
| 4 `isCorrect` | Equality: == versus === |
| 5 `wasAnswered` | Truthiness; When there is nothing there |
| 6 `showValue` | When there is nothing there |
| 7 `formatPrice` | Operators; Working with strings |
| 8 `addPrices` | Operators; Conversion — when a value does not fit |
| The review | all of the above |

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

While you work on one task, run just its tests:

```sh
node --test test/2-read-number.test.js
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

Some tasks need a different answer for some values. For those, use `if`. When
a `return` runs, the function stops there, so a `return` inside an `if` answers
for that case, and the lines after the `if` handle everything else:

```js
export function sign(n) {
  if (n < 0) {
    return "negative";
  }
  return "not negative";
}
```

The *Control flow* module teaches `if` properly. This much is all you need
here.

Leave `export` in front of each function. It is what lets the tests use it.

Stuck? `console.log(something)` inside a function prints it when the tests
run. The tests do not look at what you print, so print as much as you like.

## The tasks

The comment above each function in `src/values.js` says what it receives and
what it sends back, with examples. The tests say the rest: each failure message
says what came back and what to look at.

### 1. Name the type — `typeName(value)`

Send back what `typeof` says, except that `null` gives `"null"`. (`typeof null`
says `"object"`, which is a mistake in the language.)

### 2. Text to a number — `readNumber(text)`

`"12"` gives `12`. Empty text, or only spaces, gives `null`: the person typed
nothing, and nothing is not zero. `Number()` alone gets this wrong — try
`Number("")` and see. `text.trim()` gives the text without spaces at either
end.

### 3. The number at the start — `weightOf(label)`

`"2.5 kg"` gives `2.5`. `Number()` wants the whole text to be a number;
`parseFloat()` reads a number from the start and stops at the first thing that
is not part of one. A label with no number at the start gives `null`. To find
out whether you got `NaN`, use `Number.isNaN(x)` — `x === NaN` is always
`false`.

### 4. Mark an answer — `isCorrect(answer, expected)`

`answer` is text a student typed; `expected` is a number. Convert, then
compare with `===`. A blank answer is never correct, even when the right answer
is `0`.

### 5. Was it answered? — `wasAnswered(value)`

`undefined`, `null` and `""` mean no answer. Everything else is an answer —
including `0` and `false`, which `if (value)` would throw away.

### 6. Show a value — `showValue(value)`

`undefined` gives `"(not set)"`; `null` gives `"(none)"`; anything else gives
`String(value)`.

### 7. Cents to dollars — `formatPrice(cents)`

`1205` gives `"$12.05"`, and `1250` gives `"$12.50"`, not `"$12.5"`.
`number.toFixed(2)` gives text with exactly two digits after the dot.

### 8. Add two typed prices — `addPrices(firstText, secondText)`

`"5"` and `"2"` give `7`, not `"52"`. A blank or a price that is not a number
gives `null`. You can call your `readNumber` from task 2.

## The review

`review/split-bill.js` is a teammate's first try at splitting a restaurant
bill. It runs without an error, and it has three problems of the kind this
module is about. Run it:

```sh
node review/split-bill.js
```

Change the three values at the top and run it again — try a blank, try `"0"`.

For each problem, write in `REVIEW.md`: the line, what goes wrong and why, the
values that show it, and a fix. A person reads it, not the tests.

## Your answers

Replace each prompt with one to three sentences.

1. **Nothing is not zero.** Your `readNumber("")` gives `null`, but
   `Number("")` gives `0`. Describe one thing that would go wrong in a real
   program if a blank box were read as `0`.

   *Your answer:*

2. **Which equals?** Give one pair of values where `answer == expected` and
   `answer === expected` give different results in task 4, and say which one a
   quiz should trust.

   *Your answer:*

## Done means

- `npm test` passes every test.
- `REVIEW.md` has the three problems, each with a line, what goes wrong,
  values that show it, and a fix.
- The two answers above are filled in.
