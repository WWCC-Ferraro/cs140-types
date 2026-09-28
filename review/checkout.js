// checkout.js — a teammate's first draft of the checkout summary.
// Nothing imports this file and no test runs it. Read it, try it, and
// write your review in REVIEW.md.
//
// The checkout form sends text:      { qty: "2", tip: "1.50", giftWrap: "false" }
// The item comes from the catalogue: { name: "Mug", price: 12 }

const GIFT_WRAP_FEE = 3;

// The amount to charge: the items, the tip, and gift wrap if it was asked for.
function orderTotal(item, form) {
  let total = item.price * form.qty;
  total = total + form.tip;
  if (form.giftWrap) {
    total = total + GIFT_WRAP_FEE;
  }
  return total;
}

// The line the checkout page shows, such as "Mug × 2: $25.5".
// Returns null when the form is unchanged since previousForm, so the page
// can skip redrawing. The page reads a fresh form object on every keystroke.
function summaryLine(item, form, previousForm) {
  if (form === previousForm) {
    return null;
  }
  const line = item.name + " × " + form.qty + ": $" + orderTotal(item, form);
  console.log(line);
}

export { orderTotal, summaryLine };
