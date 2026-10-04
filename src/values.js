// Eight small functions, each about one thing the language does with a value.
//
// For each function:
//   - read the comment above it — it says what the function receives and
//     what it must send back;
//   - write your answer between the braces, where it says TODO;
//   - put `return` in front of the value you want to send back.
//
// Every answer is a single line: one `return` and one expression. None of
// them needs anything the Values, types and operators module has not taught.
//
// `return` sends a value out of the function so the tests can check it. The
// Functions module explains the rest.
//
// The names in the parentheses, such as `value` or `text`, are the values the
// tests hand in. Use those names in your answer.
//
// `export` lets the tests use each function. Leave it in place.

/**
 * Task 1. Name the type of a value.
 *
 * Send back what `typeof` says about `value`.
 *
 *   typeName("hi")   -> "string"
 *   typeName(5)      -> "number"
 *   typeName("5")    -> "string"
 *   typeName(null)   -> "object"   (a famous mistake in the language; leave it)
 */
export function typeName(value) {
  // TODO: put your code here
}

/**
 * Task 2. Is a number whole?
 *
 * `n` is a number. Send back true if it has no fraction part, false if it has.
 *
 *   isWholeNumber(4)     -> true
 *   isWholeNumber(4.5)   -> false
 *   isWholeNumber(-3)    -> true
 */
export function isWholeNumber(n) {
  // TODO: put your code here
}

/**
 * Task 3. Is a number inside a range?
 *
 * Send back true if `n` is at least `low` and at most `high` — both ends count —
 * and false otherwise.
 *
 *   isInRange(5, 1, 10)    -> true
 *   isInRange(1, 1, 10)    -> true
 *   isInRange(11, 1, 10)   -> false
 */
export function isInRange(n, low, high) {
  // TODO: put your code here
}

/**
 * Task 4. Check a ticket code.
 *
 * `code` is a string. A valid code is exactly 6 characters long, starts with
 * "WW", and has no lowercase letters. Send back true if `code` is valid, false
 * if not.
 *
 *   isValidCode("WW1234")   -> true
 *   isValidCode("WWAB12")   -> true
 *   isValidCode("WWab12")   -> false
 *   isValidCode("XX1234")   -> false
 *   isValidCode("WW123")    -> false
 */
export function isValidCode(code) {
  // TODO: put your code here
}

/**
 * Task 5. Mark an answer to a maths question.
 *
 * `answer` is the text a student typed. `expected` is the right answer, a
 * number. Send back true if the answer is that number, and false if not. A
 * blank answer is never right — not even when the right answer is 0.
 *
 *   isCorrect("7", 7)    -> true
 *   isCorrect("7.0", 7)  -> true
 *   isCorrect("8", 7)    -> false
 *   isCorrect("", 0)     -> false
 */
export function isCorrect(answer, expected) {
  // TODO: put your code here
}

/**
 * Task 6. Did the person answer this survey question?
 *
 * `value` is what the survey stored: a number, a boolean, a string, null or
 * undefined. Send back false for undefined, null and "" — those mean no
 * answer. Send back true for everything else. 0 and false are answers.
 *
 *   wasAnswered(3)          -> true
 *   wasAnswered(0)          -> true
 *   wasAnswered(false)      -> true
 *   wasAnswered(undefined)  -> false
 */
export function wasAnswered(value) {
  // TODO: put your code here
}

/**
 * Task 7. Show a setting as text.
 *
 * Send back `value` turned into a string. If there is no value — null or
 * undefined — send back "(none)" instead.
 *
 *   labelOf("dark")     -> "dark"
 *   labelOf(0)          -> "0"
 *   labelOf(false)      -> "false"
 *   labelOf(null)       -> "(none)"
 */
export function labelOf(value) {
  // TODO: put your code here
}

/**
 * Task 8. Write a price in cents as dollars.
 *
 * `cents` is a whole number. Send back a string: a dollar sign, the dollars,
 * a dot, and always two digits of cents.
 *
 *   formatPrice(1205)  -> "$12.05"
 *   formatPrice(1250)  -> "$12.50"
 *   formatPrice(5)     -> "$0.05"
 */
export function formatPrice(cents) {
  // TODO: put your code here
}
