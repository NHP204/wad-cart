import { test } from "node:test";
import assert from "node:assert/strict";
import { cartTotal } from "../src/cart.js";

// This test fails until you implement cartTotal. That is the point:
// run `npm test` first and see it red.
test("the example from the slides", () => {
  const items = [
    { name: "Áo thun", price: 180000, qty: 2 },
    { name: "Sổ tay", price: 45000, qty: 1 },
  ];
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };
  assert.equal(cartTotal(items, options), 467400);
});

const OPTIONS = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };

test("example result is a number", () => {
  const items = [
    { name: "Áo thun", price: 180000, qty: 2 },
    { name: "Sổ tay", price: 45000, qty: 1 },
  ];
  assert.equal(typeof cartTotal(items, OPTIONS), "number");
});

test("empty cart returns 0", () => {
  assert.equal(cartTotal([], OPTIONS), 0);
});

test("subtotal exactly at threshold ships free", () => {
  const items = [{ name: "A", price: 500000, qty: 1 }];
  assert.equal(cartTotal(items, OPTIONS), 540000);
});

test("subtotal just below threshold pays shipping", () => {
  const items = [{ name: "A", price: 499999, qty: 1 }];
  assert.equal(cartTotal(items, OPTIONS), 569999);
});

test("negative price throws RangeError", () => {
  const items = [{ name: "A", price: -1, qty: 1 }];
  assert.throws(() => cartTotal(items, OPTIONS), RangeError);
});

test("fractional qty throws RangeError", () => {
  const items = [{ name: "A", price: 1000, qty: 1.5 }];
  assert.throws(() => cartTotal(items, OPTIONS), RangeError);
});

test("zero qty throws RangeError", () => {
  const items = [{ name: "A", price: 1000, qty: 0 }];
  assert.throws(() => cartTotal(items, OPTIONS), RangeError);
});
