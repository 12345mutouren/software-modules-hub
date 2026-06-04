import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function buildDocsSite({ outDir, siteMapPath = "docs-site/site-map.json" }) {
  if (!outDir) {
    throw new Error("Missing output directory.");
  }

  const absoluteOutDir = path.resolve(outDir);
  const siteMap = JSON.parse(fs.readFileSync(path.join(root, siteMapPath), "utf8"));

  fs.mkdirSync(absoluteOutDir, { recursive: true });

  for (const page of siteMap) {
    const markdown = fs.readFileSync(path.join(root, page.source), "utf8");
    const html = renderPage(page.title, markdownToHtml(markdown));
    fs.writeFileSync(path.join(absoluteOutDir, page.output), html, "utf8");
  }

  fs.writeFileSync(path.join(absoluteOutDir, "site-map.json"), JSON.stringify(siteMap, null, 2), "utf8");

  return {
    outDir: absoluteOutDir,
    pages: siteMap.map((page) => page.output),
  };
}

function markdownToHtml(markdown) {
  return markdown
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ")) return `<h1>${escapeHtml(line.slice(2))}</h1>`;
      if (line.startsWith("## ")) return `<h2>${escapeHtml(line.slice(3))}</h2>`;
      if (line.startsWith("### ")) return `<h3>${escapeHtml(line.slice(4))}</h3>`;
      if (line.startsWith("- ")) return `<li>${escapeHtml(line.slice(2))}</li>`;
      if (line.trim() === "") return "";
      return `<p>${escapeHtml(line)}</p>`;
    })
    .join("\n");
}

function renderPage(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} - Software Modules Hub</title>
</head>
<body>
  <nav><a href="index.html">Home</a> <a href="start-here.html">Start Here</a> <a href="master-index.html">Master Index</a></nav>
  ${body}
</body>
</html>
`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseArgs(args) {
  const outIndex = args.indexOf("--out");
  if (outIndex === -1) {
    return { outDir: "" };
  }
  return { outDir: args[outIndex + 1] || "" };
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  try {
    const result = buildDocsSite(parseArgs(process.argv.slice(2)));
    console.log(`Built docs site at ${result.outDir}`);
    for (const page of result.pages) {
      console.log(`- ${page}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
