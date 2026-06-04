import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

test("docs deployment package includes GitHub Pages and Vercel config", () => {
  const workflow = fs.readFileSync("docs-site/deploy/github-pages-workflow.yml", "utf8");
  const vercel = JSON.parse(fs.readFileSync("docs-site/deploy/vercel.json", "utf8"));

  assert.match(workflow, /actions\/upload-pages-artifact@v5/);
  assert.match(workflow, /actions\/deploy-pages@v5/);
  assert.equal(vercel.outputDirectory, "docs-site/dist");
});
