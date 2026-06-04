import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { buildDocsSite } from "../build-docs-site.mjs";

test("builds static docs site pages", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "software-modules-hub-docs-site-"));
  const result = buildDocsSite({ outDir });

  assert.ok(result.pages.includes("index.html"));
  assert.ok(result.pages.includes("master-index.html"));
  assert.ok(fs.existsSync(path.join(outDir, "site-map.json")));

  const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
  assert.match(indexHtml, /Software Modules Hub/);
});

