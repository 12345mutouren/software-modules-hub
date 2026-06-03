import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { generateStarter, listStarterTypes } from "../create-starter.mjs";

test("lists all supported starter types", () => {
  assert.deepEqual(listStarterTypes(), [
    "saas-subscription",
    "admin-dashboard",
    "ecommerce",
    "content-community",
    "ai-knowledge-base",
    "enterprise-internal-tool",
  ]);
});

test("generates a SaaS starter package", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "software-modules-hub-saas-"));
  const result = generateStarter({
    type: "saas-subscription",
    outDir,
    generatedAt: "2026-06-03",
  });

  assert.equal(result.files.length, 10);
  assert.ok(fs.existsSync(path.join(outDir, "README.md")));
  assert.ok(fs.existsSync(path.join(outDir, "docs", "permission-matrix.md")));
  assert.ok(fs.existsSync(path.join(outDir, "docs", "api-contract.md")));

  const readme = fs.readFileSync(path.join(outDir, "README.md"), "utf8");
  const apiContract = fs.readFileSync(path.join(outDir, "docs", "api-contract.md"), "utf8");
  const dataModel = fs.readFileSync(path.join(outDir, "docs", "data-model.md"), "utf8");

  assert.match(readme, /SaaS Subscription Starter/);
  assert.match(apiContract, /\/api\/subscriptions/);
  assert.match(dataModel, /organizations/);
});

test("rejects unknown starter type", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "software-modules-hub-unknown-"));

  assert.throws(
    () => generateStarter({ type: "unknown", outDir }),
    /Unknown starter type: unknown/,
  );
});

test("does not write into a non-empty directory unless forced", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "software-modules-hub-force-"));
  fs.writeFileSync(path.join(outDir, "existing.txt"), "keep", "utf8");

  assert.throws(
    () => generateStarter({ type: "ecommerce", outDir }),
    /Output directory is not empty/,
  );

  const result = generateStarter({ type: "ecommerce", outDir, force: true });

  assert.equal(result.type, "ecommerce");
  assert.ok(fs.existsSync(path.join(outDir, "existing.txt")));
  assert.ok(fs.existsSync(path.join(outDir, "docs", "data-model.md")));
});

