import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const githubBase = "https://github.com/12345mutouren/software-modules-hub";

const sourceOutputs = new Map([
  ["README.md", "index.html"],
  ["START-HERE.md", "start-here.html"],
  ["reference/master-index.md", "master-index.html"],
  ["modules/README.md", "modules.html"],
  ["catalog/github-repositories.md", "repositories.html"],
  ["runnable-apps/README.md", "runnable-apps.html"],
]);

const modules = [
  ["产品层", "目标用户、核心功能、使用流程和页面范围。", "modules/01-product-layer/README.md", "Product"],
  ["账号系统", "登录、注册、资料、安全和权限管理。", "modules/02-account-system/README.md", "Identity"],
  ["数据库层", "关系型、文档、缓存、搜索、对象存储和向量数据。", "modules/03-database-layer/README.md", "Data"],
  ["后端系统", "API、业务逻辑、权限校验、文件、通知和任务。", "modules/04-backend-system/README.md", "API"],
  ["前端/客户端", "Web、移动端、桌面端、后台和交互体验。", "modules/05-frontend-client/README.md", "UI"],
  ["安全", "密码、会话、防攻击、限流、权限和隐私合规。", "modules/06-security/README.md", "Security"],
  ["运维部署", "环境、服务器、HTTPS、备份、监控和灾难恢复。", "modules/07-operations-deployment/README.md", "Ops"],
  ["测试", "单元、接口、页面、权限、安全和性能测试。", "modules/08-testing/README.md", "QA"],
  ["商业/运营功能", "会员、支付、订单、优惠券、发票和客服。", "modules/09-business-operations/README.md", "Business"],
  ["文档", "产品说明、API、数据库、部署、管理员手册和 FAQ。", "modules/10-documentation/README.md", "Docs"],
].map(([title, description, href, short]) => ({ title, description, href: resolveHref(href), short }));

const journeys = [
  {
    title: "理解完整软件",
    description: "从 10 大模块、术语和架构图开始，先建立全局地图。",
    href: "modules.html",
    accent: "teal",
  },
  {
    title: "找 GitHub 代码库",
    description: "按模块、仓库类型和学习价值筛选代表项目。",
    href: "repositories.html",
    accent: "coral",
  },
  {
    title: "启动自己的项目",
    description: "用决策树、项目启动包和生成器把想法变成计划。",
    href: resolveHref("project-kickoff/README.md"),
    accent: "gold",
  },
  {
    title: "看可运行示例",
    description: "从 mini app、模块 demo、技术栈模板到业务应用模板。",
    href: "runnable-apps.html",
    accent: "green",
  },
  {
    title: "准备上线部署",
    description: "查看生产架构、安全合规、运维 Runbook 和部署 Playground。",
    href: resolveHref("production-templates/README.md"),
    accent: "violet",
  },
  {
    title: "维护这个仓库",
    description: "运行质量门、维护索引新鲜度，并按版本发布更新。",
    href: resolveHref("quality/README.md"),
    accent: "ink",
  },
];

const templates = [
  {
    title: "SaaS 订阅系统",
    fit: "工具类、B2B、AI 产品、会员型产品。",
    href: resolveHref("templates/complete-apps/saas-subscription/README.md"),
    runnable: resolveHref("runnable-apps/saas-starter-app/README.md"),
    tags: ["saas", "subscription", "billing", "team"],
    modules: ["账号", "权限", "订阅", "用量"],
  },
  {
    title: "管理后台",
    fit: "内部运营、CRUD、审核、配置中心。",
    href: resolveHref("templates/complete-apps/admin-dashboard/README.md"),
    runnable: resolveHref("runnable-apps/admin-dashboard-app/README.md"),
    tags: ["admin", "operations", "audit", "dashboard"],
    modules: ["用户", "内容", "审计", "导出"],
  },
  {
    title: "电商系统",
    fit: "商品、购物车、订单、支付、发货。",
    href: resolveHref("templates/complete-apps/ecommerce/README.md"),
    runnable: resolveHref("runnable-apps/ecommerce-starter-app/README.md"),
    tags: ["ecommerce", "payment", "order", "inventory"],
    modules: ["商品", "库存", "购物车", "支付"],
  },
  {
    title: "内容社区",
    fit: "帖子、评论、关注、审核、推荐。",
    href: resolveHref("templates/complete-apps/content-community/README.md"),
    runnable: resolveHref("catalog/github-repositories.md"),
    tags: ["content", "community", "moderation"],
    modules: ["内容", "互动", "审核", "推荐"],
  },
  {
    title: "AI 知识库",
    fit: "文档上传、向量检索、问答、权限。",
    href: resolveHref("templates/complete-apps/ai-knowledge-base/README.md"),
    runnable: resolveHref("runnable-apps/ai-knowledge-base-app/README.md"),
    tags: ["ai", "knowledge", "search", "workspace"],
    modules: ["文档", "检索", "引用", "隔离"],
  },
  {
    title: "企业内部工具",
    fit: "组织、审批、工单、报表、SSO。",
    href: resolveHref("templates/complete-apps/enterprise-internal-tool/README.md"),
    runnable: resolveHref("production-templates/README.md"),
    tags: ["enterprise", "workflow", "sso", "report"],
    modules: ["组织", "审批", "工单", "SSO"],
  },
];

export function buildDocsSite({ outDir, siteMapPath = "docs-site/site-map.json" }) {
  if (!outDir) {
    throw new Error("Missing output directory.");
  }

  const absoluteOutDir = path.resolve(outDir);
  const siteMap = JSON.parse(fs.readFileSync(path.join(root, siteMapPath), "utf8"));
  const repositories = parseRepositoryCatalog(read("catalog/github-repositories.md"));

  fs.mkdirSync(absoluteOutDir, { recursive: true });
  copyAssets(absoluteOutDir);

  for (const page of siteMap) {
    const html = renderSitePage(page, repositories);
    fs.writeFileSync(path.join(absoluteOutDir, page.output), html, "utf8");
  }

  fs.writeFileSync(path.join(absoluteOutDir, "site-map.json"), JSON.stringify(siteMap, null, 2), "utf8");
  fs.writeFileSync(path.join(absoluteOutDir, "repositories.json"), JSON.stringify(repositories, null, 2), "utf8");

  return {
    outDir: absoluteOutDir,
    pages: siteMap.map((page) => page.output),
  };
}

function renderSitePage(page, repositories) {
  const kind = page.kind || "markdown";
  const renderers = {
    home: () => renderHomePage(),
    start: () => renderStartPage(),
    explore: () => renderExplorePage(),
    templates: () => renderTemplatePage(),
    repositories: () => renderRepositoryPage(repositories),
    markdown: () => renderMarkdownPage(page),
  };
  const body = (renderers[kind] || renderers.markdown)();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)} - Software Modules Hub</title>
  <link rel="stylesheet" href="assets/site.css">
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script defer src="assets/site.js"></script>
</head>
<body class="page-${escapeAttr(kind)}">
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Software Modules Hub home">
      <span class="brand-mark">SMH</span>
      <span>Software Modules Hub</span>
    </a>
    <nav class="site-nav" aria-label="Main navigation">
      <a href="start-here.html">Start Here</a>
      <a href="explore.html">Explore</a>
      <a href="templates.html">Templates</a>
      <a href="repositories.html">GitHub Index</a>
      <a href="modules.html">Modules</a>
    </nav>
  </header>
  <main>${body}</main>
</body>
</html>
`;
}

function renderHomePage() {
  return `
<section class="hero">
  <canvas id="module-constellation" aria-hidden="true"></canvas>
  <div class="hero-copy">
    <p class="eyebrow reveal">Complete Software Map</p>
    <h1 class="reveal">从模块地图到可运行模板，一个仓库看懂完整软件。</h1>
    <p class="hero-text reveal">按产品、账号、数据库、后端、前端、安全、运维、测试、商业和文档拆解现代软件，并配套代码示例、GitHub 仓库索引、模板和上线资料。</p>
    <div class="hero-actions reveal">
      <a class="button primary" href="start-here.html">从这里开始</a>
      <a class="button ghost" href="repositories.html">浏览 GitHub 模块库</a>
    </div>
  </div>
</section>
<section class="band stats-band" aria-label="Repository highlights">
  <div class="stat reveal"><strong>10</strong><span>核心模块</span></div>
  <div class="stat reveal"><strong>120</strong><span>GitHub 仓库链接</span></div>
  <div class="stat reveal"><strong>6</strong><span>完整软件模板</span></div>
  <div class="stat reveal"><strong>4</strong><span>可运行业务应用</span></div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">Choose A Path</p>
    <h2>按你的目标进入，不用从头读。</h2>
  </div>
  <div class="card-grid journey-grid">${journeys.map(renderJourneyCard).join("")}</div>
</section>
<section class="band split-band">
  <div class="section-heading reveal">
    <p class="eyebrow">Module System</p>
    <h2>10 个模块是一张系统地图。</h2>
    <p>每张卡都对应仓库中的深度文档和后续模板。</p>
  </div>
  <div class="module-grid">${modules.map(renderModuleCard).join("")}</div>
</section>
<section class="band feature-strip">
  <a class="feature-card reveal" href="templates.html"><span>01</span><strong>模板选择器</strong><p>从 SaaS、电商、AI 知识库、管理后台等方向快速选型。</p></a>
  <a class="feature-card reveal" href="repositories.html"><span>02</span><strong>GitHub 仓库浏览页</strong><p>按模块和仓库类型筛选学习对象。</p></a>
  <a class="feature-card reveal" href="explore.html"><span>03</span><strong>分类导航页</strong><p>把学习、启动项目、运行示例和上线维护分开。</p></a>
</section>`;
}

function renderStartPage() {
  return `
<section class="page-hero">
  <p class="eyebrow reveal">Start Here</p>
  <h1 class="reveal">先选目标，再选资料。</h1>
  <p class="reveal">这个仓库内容很多，最好的读法不是顺序阅读，而是按任务进入。</p>
</section>
<section class="band">
  <div class="card-grid journey-grid">${journeys.map(renderJourneyCard).join("")}</div>
</section>
<section class="band compact-band">
  <h2 class="reveal">最短路径</h2>
  <ol class="timeline">
    <li class="reveal"><strong>建立地图</strong><span>读模块总览，知道完整软件有哪些层。</span></li>
    <li class="reveal"><strong>找参考</strong><span>进入 GitHub 仓库浏览页，按模块看代表代码库。</span></li>
    <li class="reveal"><strong>选方向</strong><span>用模板选择器确定 SaaS、电商、AI 知识库或管理后台。</span></li>
    <li class="reveal"><strong>跑示例</strong><span>用可运行模板把概念对应到代码。</span></li>
  </ol>
</section>`;
}

function renderExplorePage() {
  return `
<section class="page-hero">
  <p class="eyebrow reveal">Explore</p>
  <h1 class="reveal">按使用场景浏览整个仓库。</h1>
  <p class="reveal">这里把文档、模板、代码、部署和维护资料重新组织成几个清晰入口。</p>
</section>
<section class="band">
  <div class="card-grid journey-grid">${journeys.map(renderJourneyCard).join("")}</div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">Deep Links</p>
    <h2>常用入口</h2>
  </div>
  <div class="link-matrix">
    ${renderLinkColumn("学习", [["模块总览", "modules.html"], ["术语表", resolveHref("reference/glossary.md")], ["30 天计划", resolveHref("learning-paths/30-day-plan.md")]])}
    ${renderLinkColumn("构建", [["项目生成器", resolveHref("starter-generator/README.md")], ["可运行模板", resolveHref("runnable-templates/README.md")], ["可运行应用", "runnable-apps.html"]])}
    ${renderLinkColumn("上线", [["生产模板", resolveHref("production-templates/README.md")], ["安全合规", resolveHref("security-compliance/README.md")], ["部署包", resolveHref("docs-site/deploy/README.md")]])}
  </div>
</section>`;
}

function renderTemplatePage() {
  const filters = [
    ["all", "全部"],
    ["saas", "SaaS"],
    ["ecommerce", "电商"],
    ["ai", "AI"],
    ["admin", "后台"],
    ["enterprise", "企业工具"],
  ];

  return `
<section class="page-hero">
  <p class="eyebrow reveal">Template Selector</p>
  <h1 class="reveal">选择你要做的软件类型。</h1>
  <p class="reveal">每个模板都连接到蓝图文档、模块组合和可运行参考。</p>
</section>
<section class="band">
  <div class="filter-bar reveal" role="group" aria-label="Template filters">
    ${filters.map(([value, label], index) => `<button class="filter-button${index === 0 ? " active" : ""}" data-template-filter="${escapeAttr(value)}">${escapeHtml(label)}</button>`).join("")}
  </div>
  <div class="template-grid">${templates.map(renderTemplateCard).join("")}</div>
</section>`;
}

function renderRepositoryPage(repositories) {
  const modulesList = unique(repositories.map((repo) => repo.module)).filter(Boolean);
  const types = unique(repositories.map((repo) => repo.type)).filter(Boolean);

  return `
<section class="page-hero">
  <p class="eyebrow reveal">GitHub Repository Browser</p>
  <h1 class="reveal">按模块和类型筛选代表仓库。</h1>
  <p class="reveal">从库、框架、模板、平台、真实产品源码和学习示例里找到该看的代码。</p>
</section>
<section class="band">
  <div class="repo-toolbar reveal">
    <label><span>搜索</span><input id="repo-search" type="search" placeholder="Auth.js, PostgreSQL, Playwright"></label>
    <label><span>模块</span><select id="repo-module"><option value="all">全部模块</option>${modulesList.map((moduleName) => `<option value="${escapeAttr(moduleName)}">${escapeHtml(moduleName)}</option>`).join("")}</select></label>
    <label><span>类型</span><select id="repo-type"><option value="all">全部类型</option>${types.map((type) => `<option value="${escapeAttr(type)}">${escapeHtml(type)}</option>`).join("")}</select></label>
    <p class="repo-count"><strong id="repo-count">${repositories.length}</strong> repositories</p>
  </div>
  <div class="repo-grid">
    ${repositories.map(renderRepositoryCard).join("")}
  </div>
</section>`;
}

function renderMarkdownPage(page) {
  const markdown = read(page.source);
  return `<article class="article-shell">${markdownToHtml(markdown)}</article>`;
}

function renderJourneyCard(journey) {
  return `<a class="journey-card reveal accent-${journey.accent}" href="${escapeAttr(journey.href)}">
  <strong>${escapeHtml(journey.title)}</strong>
  <p>${escapeHtml(journey.description)}</p>
</a>`;
}

function renderModuleCard(moduleItem) {
  return `<a class="module-card reveal" href="${escapeAttr(moduleItem.href)}">
  <span>${escapeHtml(moduleItem.short)}</span>
  <strong>${escapeHtml(moduleItem.title)}</strong>
  <p>${escapeHtml(moduleItem.description)}</p>
</a>`;
}

function renderTemplateCard(template) {
  return `<article class="template-card reveal" data-template-tags="${escapeAttr(template.tags.join(" "))}">
  <div class="template-card-top">
    <h2>${escapeHtml(template.title)}</h2>
    <p>${escapeHtml(template.fit)}</p>
  </div>
  <div class="tag-row">${template.modules.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
  <div class="card-actions">
    <a class="button compact" href="${escapeAttr(template.href)}">看蓝图</a>
    <a class="button compact ghost-light" href="${escapeAttr(template.runnable)}">看实现</a>
  </div>
</article>`;
}

function renderRepositoryCard(repo) {
  const searchText = `${repo.name} ${repo.module} ${repo.category} ${repo.type} ${repo.learning}`.toLowerCase();
  return `<article class="repo-card reveal" data-module="${escapeAttr(repo.module)}" data-type="${escapeAttr(repo.type)}" data-search="${escapeAttr(searchText)}">
  <div class="repo-meta"><span>${escapeHtml(repo.module)}</span><span>${escapeHtml(repo.type)}</span></div>
  <h2><a href="${escapeAttr(repo.url)}">${escapeHtml(repo.name)}</a></h2>
  <p>${escapeHtml(repo.learning)}</p>
  <small>${escapeHtml(repo.category || "General")}</small>
</article>`;
}

function renderLinkColumn(title, links) {
  return `<div class="link-column reveal"><h3>${escapeHtml(title)}</h3>${links.map(([label, href]) => `<a href="${escapeAttr(href)}">${escapeHtml(label)}</a>`).join("")}</div>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      html.push(`<pre><code class="language-${escapeAttr(language)}">${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (line.startsWith("|") && lines[index + 1]?.startsWith("|")) {
      const table = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        table.push(lines[index]);
        index += 1;
      }
      html.push(renderMarkdownTable(table));
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];
      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].slice(2));
        index += 1;
      }
      html.push(`<ul>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+/);
    if (orderedMatch) {
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      html.push(`<ol>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      html.push(`<h${level} id="${escapeAttr(slugify(text))}">${inlineMarkdown(text)}</h${level}>`);
      index += 1;
      continue;
    }

    html.push(`<p>${inlineMarkdown(line)}</p>`);
    index += 1;
  }

  return html.join("\n");
}

function renderMarkdownTable(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*-+/.test(line))
    .map((line) => splitTableRow(line));
  const [header, ...body] = rows;

  if (!header) return "";

  return `<div class="table-wrap"><table><thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function parseRepositoryCatalog(markdown) {
  const repositories = [];
  let section = "";

  for (const rawLine of markdown.split("\n")) {
    if (rawLine.startsWith("## ")) {
      section = rawLine.slice(3).trim();
      continue;
    }

    if (!rawLine.startsWith("|") || rawLine.includes("---")) continue;

    const cells = splitTableRow(rawLine);
    const linkCell = cells.find((cell) => cell.includes("github.com"));
    if (!linkCell) continue;

    const link = linkCell.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (!link) continue;

    const isModuleTable = cells.length >= 4;
    repositories.push({
      module: section,
      category: isModuleTable ? cells[0] : section,
      name: link[1],
      url: link[2],
      type: isModuleTable ? cells[2] : cells[1],
      learning: isModuleTable ? cells[3] : cells[2],
    });
  }

  return repositories;
}

function splitTableRow(row) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function inlineMarkdown(value) {
  const tokens = [];
  const pushToken = (html) => {
    const marker = `@@TOKEN${tokens.length}@@`;
    tokens.push([marker, html]);
    return marker;
  };

  let output = String(value).replace(/`([^`]+)`/g, (_, code) => {
    return pushToken(`<code>${escapeHtml(code)}</code>`);
  });

  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    return pushToken(`<a href="${escapeAttr(resolveHref(href))}">${escapeHtml(label)}</a>`);
  });

  output = escapeHtml(output);

  tokens.forEach(([marker, html]) => {
    output = output.replaceAll(marker, html);
  });

  return output;
}

function resolveHref(href) {
  if (!href) return "#";
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  if (href.endsWith(".html")) return href;

  const normalized = href.replace(/^(\.\.\/)+/, "").replace(/^\.\//, "");
  const [cleanPath, hash = ""] = normalized.split("#");
  const suffix = hash ? `#${hash}` : "";

  if (sourceOutputs.has(cleanPath)) return `${sourceOutputs.get(cleanPath)}${suffix}`;
  if (cleanPath.endsWith(".md")) return `${githubBase}/blob/main/${cleanPath}${suffix}`;
  return `${githubBase}/tree/main/${cleanPath}${suffix}`;
}

function copyAssets(outDir) {
  const assetsDir = path.join(root, "docs-site/assets");
  const outputAssetsDir = path.join(outDir, "assets");
  fs.mkdirSync(outputAssetsDir, { recursive: true });

  if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, outputAssetsDir, { recursive: true });
  }
}

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function unique(values) {
  return [...new Set(values)];
}

function slugify(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
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
