import assert from "node:assert/strict";
import { test } from "node:test";

import { createSaasApp } from "../src/app.mjs";

test("creates organization, subscription and usage summary", () => {
  const app = createSaasApp();
  const owner = app.createUser({ email: "owner@example.com" });
  const organization = app.createOrganization({ name: "Acme", ownerId: owner.id });

  app.subscribe({ organizationId: organization.id, plan: "pro" });
  app.recordUsage({ organizationId: organization.id, metric: "documents", quantity: 3 });
  app.recordUsage({ organizationId: organization.id, metric: "documents", quantity: 2 });

  assert.equal(app.canManageBilling({ userId: owner.id, organizationId: organization.id }), true);
  assert.deepEqual(app.usageSummary(organization.id), { documents: 5 });
});

test("normal member cannot manage billing", () => {
  const app = createSaasApp();
  const owner = app.createUser({ email: "owner@example.com" });
  const member = app.createUser({ email: "member@example.com" });
  const organization = app.createOrganization({ name: "Acme", ownerId: owner.id });

  app.inviteMember({ organizationId: organization.id, userId: member.id });

  assert.equal(app.canManageBilling({ userId: member.id, organizationId: organization.id }), false);
});

