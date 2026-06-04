import assert from "node:assert/strict";
import { test } from "node:test";

import { createTemplateContract } from "../src/app-contract.mjs";

test("template exposes expected web and API routes", () => {
  const contract = createTemplateContract();

  assert.equal(contract.routeExists("GET", "/"), true);
  assert.equal(contract.routeExists("POST", "/api/auth/login"), true);
  assert.equal(contract.routeExists("GET", "/api/missing"), false);
});

test("template includes production service boundaries", () => {
  const contract = createTemplateContract();

  assert.deepEqual(contract.services, ["web", "api", "worker", "postgres", "redis", "object-storage"]);
  assert.equal(contract.deploymentPlan().length, 6);
});

