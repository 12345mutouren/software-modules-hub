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

const phaseFiles = Array.from({ length: 12 }, (_, index) => index + 1).flatMap((phase) => [
  `checklists/phase-${phase}-completeness.md`,
  `audits/phase-${phase}-audit-1.md`,
]);

requireFiles([
  "README.md",
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
  "CHANGELOG.md",
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

requireText("package.json", "\"test:starter-generator\"");
requireText("package.json", "\"test:module-demos\"");
requireText("starter-generator/README.md", "## Supported Types");
requireText("starter-generator/create-starter.mjs", "saas-subscription");
requireText("starter-generator/create-starter.mjs", "enterprise-internal-tool");
requireText("examples/module-demos/README.md", "## Demo List");
requireText("examples/module-demos/src/module-demos.mjs", "createAccountSystem");
requireText("examples/module-demos/src/module-demos.mjs", "generateDocumentation");
requireText("examples/module-demos/test/module-demos.test.mjs", "product layer demo");
requireText("examples/module-demos/docs/module-map.md", "Product Layer");

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
console.log(`Checked ${diagramFiles.length} architecture diagrams, reference files, showcase files, module demos, starter generator, and root quality gates.`);
