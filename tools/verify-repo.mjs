import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function relative(filePath) {
  return filePath.replace(`${root}${path.sep}`, "");
}

function exists(filePath) {
  return fs.existsSync(path.join(root, filePath));
}

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function fail(message) {
  failures.push(message);
}

function requireFile(filePath) {
  if (!exists(filePath)) {
    fail(`Missing file: ${filePath}`);
  }
}

function requireText(filePath, text) {
  requireFile(filePath);

  if (exists(filePath) && !read(filePath).includes(text)) {
    fail(`Missing "${text}" in ${filePath}`);
  }
}

function requireCount(label, directory, matcher, expected) {
  const dir = path.join(root, directory);

  if (!fs.existsSync(dir)) {
    fail(`Missing directory: ${directory}`);
    return;
  }

  const count = fs.readdirSync(dir).filter(matcher).length;

  if (count !== expected) {
    fail(`${label}: expected ${expected}, got ${count}`);
  }
}

function requireFiles(files) {
  files.forEach(requireFile);
}

const phaseFiles = Array.from({ length: 30 }, (_, index) => index + 1).flatMap((phase) => [
  `checklists/phase-${phase}-completeness.md`,
  `audits/phase-${phase}-audit-1.md`,
]);

requireFiles([
  "README.md",
  "START-HERE.md",
  "ROADMAP.md",
  "CONTRIBUTING.md",
  "catalog/github-repositories.md",
  "catalog/module-taxonomy.md",
  "modules/README.md",
  "examples/README.md",
  "templates/README.md",
  "case-studies/README.md",
  "architecture/README.md",
  "operations/README.md",
  "decision-guides/README.md",
  "project-kickoff/README.md",
  "learning-paths/README.md",
  "reference/README.md",
  "showcase/README.md",
  "starter-generator/README.md",
  "production-templates/README.md",
  "security-compliance/README.md",
  "ops-production/README.md",
  "auditing/README.md",
  "runnable-templates/README.md",
  "runnable-apps/README.md",
  "deployment-playground/README.md",
  "docs-site/README.md",
  "maintenance/README.md",
  "CHANGELOG.md",
  "PROJECT-STATUS.md",
  "FINAL-REVIEW.md",
  "SECURITY.md",
  "GOVERNANCE.md",
  "LICENSE",
  ...phaseFiles,
]);

const moduleDirs = [
  "01-product-layer",
  "02-account-system",
  "03-database-layer",
  "04-backend-system",
  "05-frontend-client",
  "06-security",
  "07-operations-deployment",
  "08-testing",
  "09-business-operations",
  "10-documentation",
];

for (const moduleDir of moduleDirs) {
  const filePath = `modules/${moduleDir}/README.md`;
  requireText(filePath, "## 代表 GitHub 仓库");
  requireText(filePath, "## 设计检查清单");
}

const completeApps = [
  "saas-subscription",
  "admin-dashboard",
  "ecommerce",
  "content-community",
  "ai-knowledge-base",
  "enterprise-internal-tool",
];

for (const app of completeApps) {
  const filePath = `templates/complete-apps/${app}/README.md`;
  for (const section of [
    "## 产品定位",
    "## 用户角色",
    "## 10 模块组合",
    "## 推荐技术和参考仓库",
    "## 核心数据表",
    "## API 设计",
    "## 页面设计",
    "## 关键检查",
  ]) {
    requireText(filePath, section);
  }
}

const caseStudies = ["cal-diy", "plane", "twenty", "supabase", "appwrite", "dub"];

for (const study of caseStudies) {
  const filePath = `case-studies/real-projects/${study}/README.md`;
  for (const section of [
    "## Verified Snapshot",
    "## 10-Module Map",
    "## Source Reading Entry Points",
    "## What To Learn",
    "## Risks And Caveats",
    "## Suggested Next Exercise",
  ]) {
    requireText(filePath, section);
  }
}

const diagramsDir = path.join(root, "architecture/diagrams");
const diagramFiles = fs.existsSync(diagramsDir)
  ? fs.readdirSync(diagramsDir).filter((file) => file.endsWith(".md"))
  : [];

if (diagramFiles.length !== 6) {
  fail(`Architecture diagrams: expected 6, got ${diagramFiles.length}`);
}

for (const file of diagramFiles) {
  const filePath = `architecture/diagrams/${file}`;
  requireText(filePath, "```mermaid");
}

requireCount("Operations runbooks", "operations/runbooks", (file) => file.endsWith(".md"), 6);
requireCount("Decision guides", "decision-guides", (file) => file.endsWith(".md"), 7);
requireCount("Kickoff templates", "project-kickoff/templates", (file) => file.endsWith(".md"), 10);
requireCount("Learning paths", "learning-paths", (file) => file.endsWith(".md"), 6);
requireCount("Reference files", "reference", (file) => file.endsWith(".md"), 7);
requireCount("Showcase files", "showcase", (file) => file.endsWith(".md"), 6);
requireCount("Production stack templates", "production-templates/stacks", (file) => file.endsWith(".md"), 3);
requireCount("Security compliance files", "security-compliance", (file) => file.endsWith(".md"), 6);
requireCount("Operations production files", "ops-production", (file) => file.endsWith(".md"), 6);
requireCount("Audit system files", "auditing", (file) => file.endsWith(".md"), 7);
requireCount("GitHub issue templates", ".github/ISSUE_TEMPLATE", (file) => file.endsWith(".md"), 3);
requireCount("Release files", "releases", (file) => file.endsWith(".md"), 3);
requireCount("Runnable template files", "runnable-templates/test", (file) => file.endsWith(".mjs"), 1);
requireCount("Runnable app index tests", "runnable-apps/test", (file) => file.endsWith(".mjs"), 1);
requireCount("Maintenance refresh plans", "maintenance/refresh-plans", (file) => file.endsWith(".md"), 3);
requireCount("Online audit reports", "maintenance/online-audits", (file) => file.endsWith(".md"), 2);

requireText("package.json", "\"test:starter-generator\"");
requireText("package.json", "\"test:module-demos\"");
requireText("package.json", "\"test:runnable-templates\"");
requireText("package.json", "\"test:runnable-apps\"");
requireText("package.json", "\"test:deployment-playground\"");
requireText("package.json", "\"test:docs-site\"");
requireText("package.json", "\"audit:freshness\"");
requireText("package.json", "\"check:links\"");
requireText("package.json", "\"version\": \"1.2.0\"");
requireText("starter-generator/README.md", "## Supported Types");
requireText("starter-generator/README.md", "Optional Code Scaffold");
requireText("starter-generator/create-starter.mjs", "--with-code");
requireText("starter-generator/create-starter.mjs", "saas-subscription");
requireText("starter-generator/create-starter.mjs", "enterprise-internal-tool");
requireText("examples/module-demos/README.md", "## Demo List");
requireText("examples/module-demos/src/module-demos.mjs", "createAccountSystem");
requireText("examples/module-demos/src/module-demos.mjs", "generateDocumentation");
requireText("examples/module-demos/test/module-demos.test.mjs", "product layer demo");
requireText("examples/module-demos/docs/module-map.md", "Product Layer");
requireText("production-templates/README.md", "## Templates");
requireText("security-compliance/README.md", "## Files");
requireText("ops-production/README.md", "## Files");
requireText("auditing/README.md", "## Audit Types");
requireText("PROJECT-STATUS.md", "v1.2.0");
requireText("FINAL-REVIEW.md", "Ready for v1.2.0 release");
requireText("runnable-templates/README.md", "## Templates");
requireText("runnable-apps/README.md", "## Apps");
requireText("deployment-playground/README.md", "## Run Smoke Check");
requireText("docs-site/README.md", "## Build");
requireText("maintenance/README.md", "## Automated Check");
requireText("maintenance/online-audits/github-repository-index-2026-06-04.md", "GitHub REST API");

requireFiles([
  "examples/full-stack-mini-app/package.json",
  "examples/full-stack-mini-app/src/app.js",
  "examples/full-stack-mini-app/test/app.test.js",
  "examples/module-demos/package.json",
  "examples/module-demos/src/module-demos.mjs",
  "examples/module-demos/test/module-demos.test.mjs",
  "examples/module-demos/docs/module-map.md",
  "project-kickoff/examples/saas-kickoff-example.md",
  ".github/workflows/verify.yml",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/content_update.md",
  ".github/ISSUE_TEMPLATE/starter_request.md",
  ".github/pull_request_template.md",
  ".github/CODEOWNERS",
  "quality/github-actions-verify.yml",
  "learning-paths/role-based.md",
  "learning-paths/30-day-plan.md",
  "learning-paths/exercises.md",
  "learning-paths/capstone-projects.md",
  "learning-paths/self-assessment.md",
  "reference/master-index.md",
  "reference/glossary.md",
  "reference/module-artifact-map.md",
  "reference/technology-comparison.md",
  "reference/repository-evaluation-rubric.md",
  "reference/common-pitfalls.md",
  "showcase/project-one-pager.md",
  "showcase/repository-tour.md",
  "showcase/release-playbook.md",
  "showcase/maintainer-handbook.md",
  "showcase/shareable-summary.md",
  "starter-generator/create-starter.mjs",
  "starter-generator/test/create-starter.test.mjs",
  "runnable-templates/nextjs-node-postgres/package.json",
  "runnable-templates/nextjs-node-postgres/src/app-contract.mjs",
  "runnable-templates/nextjs-node-postgres/test/app-contract.test.mjs",
  "runnable-templates/nextjs-node-postgres/docs/schema.sql",
  "runnable-templates/react-fastapi-postgres/package.json",
  "runnable-templates/react-fastapi-postgres/template-manifest.json",
  "runnable-templates/react-fastapi-postgres/api/main.py",
  "runnable-templates/react-fastapi-postgres/web/App.jsx",
  "runnable-templates/react-fastapi-postgres/test/template-manifest.test.mjs",
  "runnable-apps/saas-starter-app/package.json",
  "runnable-apps/saas-starter-app/src/app.mjs",
  "runnable-apps/saas-starter-app/test/app.test.mjs",
  "runnable-apps/ecommerce-starter-app/package.json",
  "runnable-apps/ecommerce-starter-app/src/app.mjs",
  "runnable-apps/ecommerce-starter-app/test/app.test.mjs",
  "runnable-apps/ai-knowledge-base-app/package.json",
  "runnable-apps/ai-knowledge-base-app/src/app.mjs",
  "runnable-apps/ai-knowledge-base-app/test/app.test.mjs",
  "runnable-apps/admin-dashboard-app/package.json",
  "runnable-apps/admin-dashboard-app/src/app.mjs",
  "runnable-apps/admin-dashboard-app/test/app.test.mjs",
  "runnable-apps/test/runnable-apps.test.mjs",
  "deployment-playground/docker-compose.yml",
  "deployment-playground/.env.example",
  "deployment-playground/smoke-check.mjs",
  "docs-site/site-map.json",
  "docs-site/build-docs-site.mjs",
  "docs-site/test/build-docs-site.test.mjs",
  "maintenance/refresh-plans/github-repository-index.md",
  "maintenance/refresh-plans/case-study-refresh.md",
  "maintenance/refresh-plans/template-refresh.md",
  "maintenance/release-cadence.md",
  "maintenance/freshness-audit.md",
  "maintenance/online-audits/README.md",
  "maintenance/online-audits/github-repository-index-2026-06-04.md",
  "tools/audit-freshness.mjs",
  "tools/audit-github-catalog-online.mjs",
  "production-templates/infra/docker-compose.reference.yml",
  "production-templates/infra/env.example",
  "production-templates/runbooks/migration-plan.md",
  "security-compliance/threat-model-template.md",
  "security-compliance/owasp-checklist.md",
  "security-compliance/privacy-data-rights.md",
  "security-compliance/access-review.md",
  "security-compliance/security-test-plan.md",
  "ops-production/env-var-standard.md",
  "ops-production/backup-script-plan.md",
  "ops-production/monitoring-alerting-template.md",
  "ops-production/release-rollback-script.md",
  "ops-production/disaster-recovery-drill.md",
  "auditing/content-audit.md",
  "auditing/link-audit.md",
  "auditing/github-repository-audit.md",
  "auditing/example-code-audit.md",
  "auditing/security-audit.md",
  "auditing/structure-audit.md",
  "tools/check-local-links.mjs",
  "releases/v1.0.0.md",
  "releases/v1.1.0.md",
  "releases/v1.2.0.md",
]);

if (failures.length > 0) {
  console.error("Repository verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Repository verification passed.");
console.log(`Checked ${moduleDirs.length} modules, ${completeApps.length} app templates, ${caseStudies.length} case studies.`);
console.log(`Checked ${diagramFiles.length} architecture diagrams, production templates, security, operations, audits, module demos, starter generator, and root quality gates.`);
