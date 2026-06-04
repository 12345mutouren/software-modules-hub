import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "maintenance/README.md",
  "maintenance/refresh-plans/github-repository-index.md",
  "maintenance/refresh-plans/case-study-refresh.md",
  "maintenance/refresh-plans/template-refresh.md",
  "maintenance/release-cadence.md",
  "maintenance/freshness-audit.md",
  "maintenance/online-audits/README.md",
  "maintenance/online-audits/github-repository-index-2026-06-04.md",
  "catalog/github-repositories.md",
  "case-studies/real-projects/README.md",
  "CHANGELOG.md",
];

const failures = [];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, filePath))) {
    failures.push(`Missing required freshness file: ${filePath}`);
  }
}

const catalog = fs.existsSync(path.join(root, "catalog/github-repositories.md"))
  ? fs.readFileSync(path.join(root, "catalog/github-repositories.md"), "utf8")
  : "";

const githubUrlCount = (catalog.match(/https:\/\/github\.com\//g) || []).length;
if (githubUrlCount < 10) {
  failures.push(`Expected at least 10 GitHub URLs in catalog, found ${githubUrlCount}`);
}

if (failures.length > 0) {
  console.error("Freshness audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Freshness audit passed.");
console.log(`Catalog GitHub URLs checked: ${githubUrlCount}`);
