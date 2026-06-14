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
  assert.ok(result.pages.includes("project-starter.html"));
  assert.ok(result.pages.includes("planner.html"));
  assert.ok(result.pages.includes("stack-composer.html"));
  assert.ok(result.pages.includes("maturity.html"));
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
  assert.match(indexHtml, /底层代码包/);
  assert.match(indexHtml, /core、security、auth、database、data、api/);
  assert.match(indexHtml, /Web 管理后台/);

  const repositoriesHtml = fs.readFileSync(path.join(outDir, "repositories.html"), "utf8");
  assert.match(repositoriesHtml, /repo-search/);
  assert.match(repositoriesHtml, /nextauthjs\/next-auth/);

  const projectStarterHtml = fs.readFileSync(path.join(outDir, "project-starter.html"), "utf8");
  assert.match(projectStarterHtml, /starter-select/);
  assert.match(projectStarterHtml, /node starter-generator\/create-starter\.mjs --type saas-subscription/);
  assert.match(projectStarterHtml, /enterprise-internal-tool/);
  assert.match(projectStarterHtml, /第一版不是只要能跑/);

  const plannerHtml = fs.readFileSync(path.join(outDir, "planner.html"), "utf8");
  assert.match(plannerHtml, /Build Planner/);
  assert.match(plannerHtml, /planner-type/);
  assert.match(plannerHtml, /data-planner-track/);
  assert.match(plannerHtml, /把软件想法排成可执行路线/);

  const composerHtml = fs.readFileSync(path.join(outDir, "stack-composer.html"), "utf8");
  assert.match(composerHtml, /Stack Composer/);
  assert.match(composerHtml, /composer-type/);
  assert.match(composerHtml, /composer-agent/);
  assert.match(composerHtml, /CopilotKit \/ AG-UI/);
  assert.match(composerHtml, /data-composer-extra/);
  assert.match(composerHtml, /把技术选择组合成一套可执行架构/);

  const maturityHtml = fs.readFileSync(path.join(outDir, "maturity.html"), "utf8");
  assert.match(maturityHtml, /Maturity Scorecard/);
  assert.match(maturityHtml, /score-value/);
  assert.match(maturityHtml, /data-score-check/);
  assert.match(maturityHtml, /Production Ready/);

  const masterIndexHtml = fs.readFileSync(path.join(outDir, "master-index.html"), "utf8");
  assert.doesNotMatch(masterIndexHtml, /@@TOKEN/);
  assert.match(masterIndexHtml, /<a href="start-here.html">START-HERE.md<\/a>/);
});
