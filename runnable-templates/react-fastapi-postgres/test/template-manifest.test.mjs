import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

const manifest = JSON.parse(fs.readFileSync(new URL("../template-manifest.json", import.meta.url), "utf8"));

test("manifest declares stack services", () => {
  assert.equal(manifest.stack, "react-fastapi-postgres");
  assert.ok(manifest.services.includes("api"));
  assert.ok(manifest.services.includes("postgres"));
});

test("manifest covers knowledge-base resources and routes", () => {
  assert.ok(manifest.resources.includes("document"));
  assert.ok(manifest.resources.includes("citation"));
  assert.ok(manifest.apiRoutes.includes("POST /documents"));
  assert.ok(manifest.uiScreens.includes("Conversation"));
});

