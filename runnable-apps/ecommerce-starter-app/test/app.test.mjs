import assert from "node:assert/strict";
import { test } from "node:test";

import { createEcommerceApp } from "../src/app.mjs";

test("checks out cart with coupon and marks order paid", () => {
  const app = createEcommerceApp();
  const product = app.addProduct({ title: "Notebook", sku: "note-1", priceCents: 2000, stock: 5 });
  app.createCoupon({ code: "SAVE5", discountCents: 500 });
  app.addToCart({ userId: "usr_1", productId: product.id, quantity: 2 });

  const order = app.checkout({ userId: "usr_1", couponCode: "SAVE5" });

  assert.equal(order.totalCents, 3500);
  assert.equal(app.markPaid(order.id).paymentStatus, "paid");
});

test("prevents overselling inventory", () => {
  const app = createEcommerceApp();
  const product = app.addProduct({ title: "Keyboard", sku: "key-1", priceCents: 5000, stock: 1 });

  assert.throws(() => app.addToCart({ userId: "usr_1", productId: product.id, quantity: 2 }), /Insufficient stock/);
});

