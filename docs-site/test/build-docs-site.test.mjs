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
  assert.ok(result.pages.includes("start-here.html"));
  assert.ok(result.pages.includes("explore.html"));
  assert.ok(result.pages.includes("templates.html"));
  assert.ok(result.pages.includes("repositories.html"));
  assert.ok(result.pages.includes("master-index.html"));
  assert.ok(!result.pages.includes("roadmap.html"));
  assert.ok(fs.existsSync(path.join(outDir, "assets", "site.css")));
  assert.ok(fs.existsSync(path.join(outDir, "assets", "site.js")));
  assert.ok(fs.existsSync(path.join(outDir, "repositories.json")));
  assert.ok(fs.existsSync(path.join(outDir, "site-map.json")));

  const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
  assert.match(indexHtml, /Software Modules Hub/);
  assert.match(indexHtml, /module-constellation/);
  assert.match(indexHtml, /gsap/);

  const repositoriesHtml = fs.readFileSync(path.join(outDir, "repositories.html"), "utf8");
  assert.match(repositoriesHtml, /repo-search/);
  assert.match(repositoriesHtml, /nextauthjs\/next-auth/);

  const masterIndexHtml = fs.readFileSync(path.join(outDir, "master-index.html"), "utf8");
  assert.doesNotMatch(masterIndexHtml, /@@TOKEN/);
  assert.match(masterIndexHtml, /<a href="start-here.html">START-HERE.md<\/a>/);
});
