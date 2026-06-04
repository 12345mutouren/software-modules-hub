import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const ignoredDirectories = new Set([".git", "node_modules"]);

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...walk(path.join(directory, entry.name)));
      }
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path.join(directory, entry.name));
    }
  }

  return files;
}

function stripCodeBlocks(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, "");
}

function normalizeTarget(target) {
  const trimmed = target.trim();
  const withoutAngleBrackets = trimmed.startsWith("<") && trimmed.endsWith(">")
    ? trimmed.slice(1, -1)
    : trimmed;
  return withoutAngleBrackets.split("#")[0];
}

function shouldSkip(target) {
  return (
    !target ||
    target.startsWith("#") ||
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.startsWith("mailto:") ||
    target.startsWith("tel:")
  );
}

function checkFile(filePath) {
  const markdown = stripCodeBlocks(fs.readFileSync(filePath, "utf8"));
  const linkPattern = /(?<!!)\[[^\]\n]+\]\(([^)\n]+)\)/g;
  let match;

  while ((match = linkPattern.exec(markdown)) !== null) {
    const target = normalizeTarget(match[1]);
    if (shouldSkip(target)) continue;

    const resolved = path.resolve(path.dirname(filePath), target);
    if (!resolved.startsWith(root)) {
      failures.push(`${relative(filePath)} links outside repository: ${match[1]}`);
      continue;
    }

    if (!fs.existsSync(resolved)) {
      failures.push(`${relative(filePath)} has broken link: ${match[1]}`);
    }
  }
}

function relative(filePath) {
  return path.relative(root, filePath);
}

for (const filePath of walk(root)) {
  checkFile(filePath);
}

if (failures.length > 0) {
  console.error("Local link check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Local link check passed.");

