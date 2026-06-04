import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

test("next-node template has runnable contract files", () => {
  assert.ok(fs.existsSync("runnable-templates/nextjs-node-postgres/package.json"));
  assert.ok(fs.existsSync("runnable-templates/nextjs-node-postgres/src/app-contract.mjs"));
  assert.ok(fs.existsSync("runnable-templates/nextjs-node-postgres/docs/schema.sql"));
});

test("react-fastapi template has manifest and stack entries", () => {
  const manifest = JSON.parse(fs.readFileSync("runnable-templates/react-fastapi-postgres/template-manifest.json", "utf8"));

  assert.equal(manifest.stack, "react-fastapi-postgres");
  assert.ok(manifest.services.includes("worker"));
});

