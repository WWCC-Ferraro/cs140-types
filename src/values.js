// Eight small functions. Each one is about one thing the language does with
// values.
//
// For each function:
//   - read the comment above it — it says what the function receives and
//     what it must send back;
//   - write your answer between the braces, where it says TODO;
//   - put `return` in front of the value you want to send back.
//
// `return` sends a value out of the function so the tests can check it. When
// a `return` runs, the function stops there. The Functions module explains the
// rest.
//
// The names in the parentheses, such as `value` or `text`, are the values the
// tests hand in. Use those names in your answer.
//
// `export` lets the tests use each function. Leave it in place.

/**
 * Task 1. Name the type of a value.
 *
 * Send back what `typeof` says, with one correction: for `null`, send back
 * "null". (`typeof null` says "object", which is a mistake in the language.)
 *
 *   typeName("hi")   -> "string"
 *   typeName(5)      -> "number"
 *   typeName(null)   -> "null"
 */
export function typeName(value) {
  // TODO: put your code here
}

/**
 * Task 2. Turn text a person typed into a number.
 *
 * `text` is always a string. If it is empty, or only spaces, send back null:
 * the person typed nothing, and nothing is not zero. Otherwise send back the
 * number it holds. Text that is not a number gives NaN, and that is fine here.
 *
 *   readNumber("12")     -> 12
 *   readNumber(" 7.5 ")  -> 7.5
 *   readNumber("")       -> null
 *   readNumber("abc")    -> NaN
 */
export function readNumber(text) {
  // TODO: put your code here
}

/**
 * Task 3. Read the weight from a label such as "2.5 kg".
 *
 * `label` is a string that starts with a number and may have a unit after it.
 * Send back the number. If the label does not start with a number, send back
 * null.
 *
 *   weightOf("2.5 kg")  -> 2.5
 *   weightOf("10kg")    -> 10
 *   weightOf("kg")      -> null
 */
export function weightOf(label) {
  // TODO: put your code here
}

/**
 * Task 4. Mark an answer to a maths question.
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
 * Task 5. Did the person answer this survey question?
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
 * Task 6. Show a setting's value as text.
 *
 * Send back "(not set)" for undefined, "(none)" for null, and the value
 * turned into a string for anything else.
 *
 *   showValue(undefined)  -> "(not set)"
 *   showValue(null)       -> "(none)"
 *   showValue(0)          -> "0"
 *   showValue(false)      -> "false"
 */
export function showValue(value) {
  // TODO: put your code here
}

/**
 * Task 7. Write a price in cents as dollars.
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

/**
 * Task 8. Add two prices typed as text.
 *
 * `firstText` and `secondText` are strings a person typed. Send back their
 * sum as a number. If either one is blank or is not a number, send back null.
 * You may call your readNumber from task 2.
 *
 *   addPrices("2.50", "1.25")  -> 3.75
 *   addPrices("5", "2")        -> 7
 *   addPrices("", "3")         -> null
 */
export function addPrices(firstText, secondText) {
  // TODO: put your code here
}
