import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

const apps = [
  "saas-starter-app",
  "ecommerce-starter-app",
  "ai-knowledge-base-app",
  "admin-dashboard-app",
];

test("all runnable app templates expose app source and tests", () => {
  for (const app of apps) {
    assert.ok(fs.existsSync(`runnable-apps/${app}/src/app.mjs`));
    assert.ok(fs.existsSync(`runnable-apps/${app}/test/app.test.mjs`));
    assert.ok(fs.existsSync(`runnable-apps/${app}/README.md`));
  }
});

