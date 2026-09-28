// split-bill.js — a teammate's first try at splitting a restaurant bill.
// No test runs this file. Read it, run it, and write your review in REVIEW.md.
//
// Run it with:   node review/split-bill.js
//
// The three values at the top stand in for what a person typed into a form,
// so all three are text. Change them and run it again to see what happens.

const billText = "48.00";
const tipText = "6";
const peopleText = "3";

const bill = Number(billText);
const tip = tipText;
const people = Number(peopleText);

const total = bill + tip;
const each = total / people;

console.log("Total: " + total);
console.log("Each person pays: " + each);

if (tipText) {
  console.log("Thanks for leaving a tip!");
}
