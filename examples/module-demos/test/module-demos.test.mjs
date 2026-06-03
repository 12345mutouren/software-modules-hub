import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createAccountSystem,
  createApiRouter,
  createBusinessEngine,
  createFrontendState,
  createInMemoryDatabase,
  createOperationsChecklist,
  createPermissionSystem,
  createSecurityControls,
  createTestingMatrix,
  generateDocumentation,
  planProductFlow,
} from "../src/module-demos.mjs";

test("product layer demo builds a user journey and metrics", () => {
  const flow = planProductFlow({
    users: ["member", "admin"],
    features: ["create order", "view report"],
    entryPoint: "homepage",
  });

  assert.equal(flow.targetUser, "member");
  assert.equal(flow.steps.length, 5);
  assert.deepEqual(flow.successMetrics, ["create order: completed_count", "view report: completed_count"]);
});

test("account demo registers, verifies, logs in and resets password", () => {
  const account = createAccountSystem();
  const user = account.register({ email: "USER@example.com", password: "secret123" });
  const verified = account.verifyEmail("user@example.com");
  const login = account.login({ email: "user@example.com", password: "secret123" });
  const resetToken = account.startPasswordReset("user@example.com");

  account.resetPassword({ token: resetToken, newPassword: "newpass123" });

  assert.equal(user.email, "user@example.com");
  assert.equal(verified.verified, true);
  assert.equal(account.requireSession(login.token).email, "user@example.com");
  assert.throws(() => account.login({ email: "user@example.com", password: "secret123" }), /Invalid credentials/);
  assert.equal(account.login({ email: "user@example.com", password: "newpass123" }).user.id, user.id);
});

test("database demo inserts, indexes and rolls back transactions", () => {
  const db = createInMemoryDatabase([{ name: "orders" }]);
  const order = db.insert("orders", { ownerId: "usr_1", status: "paid" });

  assert.equal(db.findById("orders", order.id).status, "paid");
  assert.equal(db.where("orders", "ownerId", "usr_1").length, 1);

  assert.throws(() => {
    db.transaction(({ insert }) => {
      insert("orders", { ownerId: "usr_2", status: "pending" });
      throw new Error("rollback");
    });
  }, /rollback/);

  assert.equal(db.count("orders"), 1);
});

test("backend API demo applies auth and permission checks", () => {
  const account = createAccountSystem();
  const permission = createPermissionSystem();
  const user = account.register({ email: "owner@example.com", password: "secret123" });
  const login = account.login({ email: user.email, password: "secret123" });
  const router = createApiRouter({ accountSystem: account, permissionSystem: permission });

  router.addRoute(
    "POST",
    "/orders",
    ({ body }) => ({ created: true, orderId: body.resource.id }),
    { auth: true, permission: "order:create" },
  );

  const denied = router.handle({
    method: "POST",
    path: "/orders",
    token: login.token,
    body: { resource: { id: "ord_1", ownerId: user.id } },
  });

  permission.grant(user.id, "order:create", `owner:${user.id}`);

  const allowed = router.handle({
    method: "POST",
    path: "/orders",
    token: login.token,
    body: { resource: { id: "ord_1", ownerId: user.id } },
  });

  assert.equal(denied.status, 400);
  assert.equal(allowed.status, 200);
  assert.equal(allowed.body.orderId, "ord_1");
});

test("frontend state demo handles filters, loading and subscriptions", () => {
  const state = createFrontendState({ loading: true });
  const snapshots = [];
  const unsubscribe = state.subscribe((nextState) => snapshots.push(nextState));

  state.applyFilter("status", "paid");
  state.setRecords([{ id: "ord_1", status: "paid" }]);
  unsubscribe();
  state.setState({ error: "ignored by subscription" });

  assert.equal(state.getState().filters.status, "paid");
  assert.equal(state.getState().records.length, 1);
  assert.equal(snapshots.length, 2);
});

test("security demo escapes HTML, rate limits and validates CSRF", () => {
  const security = createSecurityControls({ maxAttempts: 2 });
  const token = security.issueCsrfToken();

  assert.equal(security.escapeHtml("<script>x</script>"), "&lt;script&gt;x&lt;/script&gt;");
  assert.equal(security.recordLoginFailure("ip:1").blocked, false);
  assert.equal(security.recordLoginFailure("ip:1").blocked, true);
  assert.equal(security.assertCsrfToken(token), true);
  assert.throws(() => security.assertCsrfToken(token), /Invalid CSRF token/);
});

test("operations demo validates production readiness", () => {
  const result = createOperationsChecklist({
    NODE_ENV: "production",
    DATABASE_URL: "postgres://example",
    SESSION_SECRET: "secret",
    BACKUP_BUCKET: "backups",
    ALERT_EMAIL: "ops@example.com",
    PUBLIC_URL: "https://example.com",
  });

  assert.equal(result.ready, true);
  assert.equal(result.checks.every((check) => check.pass), true);
});

test("testing demo creates coverage matrix for modules", () => {
  const matrix = createTestingMatrix(["account", "orders"]);

  assert.equal(matrix.length, 2);
  assert.equal(matrix[0].permission, "account: permission tests");
  assert.equal(matrix[1].regression, "orders: regression tests");
});

test("business operations demo applies coupons and marks orders paid", () => {
  const business = createBusinessEngine();
  business.createCoupon({ code: "SAVE10", discountCents: 1000 });
  const order = business.createOrder({
    userId: "usr_1",
    couponCode: "SAVE10",
    items: [{ sku: "sku_1", quantity: 2, unitPriceCents: 1500 }],
  });

  assert.equal(order.totalCents, 2000);
  assert.equal(business.markPaid(order.id).status, "paid");
});

test("documentation demo generates API and database markdown", () => {
  const markdown = generateDocumentation({
    title: "Demo Docs",
    endpoints: [{ method: "GET", path: "/api/orders", description: "List orders" }],
    tables: [{ name: "orders", purpose: "Order records" }],
  });

  assert.match(markdown, /# Demo Docs/);
  assert.match(markdown, /\| GET \| \/api\/orders \| List orders \|/);
  assert.match(markdown, /\| orders \| Order records \|/);
});

