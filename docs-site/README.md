# Docs Site

目标：把仓库的读者入口转换为一个轻量静态 HTML 产品站，方便部署到 GitHub Pages、Vercel 或任意静态托管服务。

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | 带 Three.js 模块网络和 GSAP 动效的首页 |
| `start-here.html` | 按读者目标选择入口 |
| `explore.html` | 分类导航页 |
| `templates.html` | 软件模板选择器 |
| `project-starter.html` | 项目启动器，连接软件类型、生成命令、启动包和发布门槛 |
| `planner.html` | 构建计划器，按软件类型、阶段和团队规模生成执行路线 |
| `stack-composer.html` | 技术栈组合器，连接登录、数据、部署、AI 前端层、附加能力和参考仓库 |
| `maturity.html` | 10 模块成熟度评分表和发布 readiness 工具 |
| `repositories.html` | GitHub 模块仓库浏览页 |
| `modules.html` | 10 大模块说明 |
| `runnable-apps.html` | 可运行应用模板入口 |

## Files

| File | Purpose |
| --- | --- |
| `site-map.json` | 面向读者的文档站页面清单 |
| `build-docs-site.mjs` | 无依赖静态站构建脚本 |
| `assets/site.css` | 产品站视觉系统 |
| `assets/site.js` | GSAP 动效、筛选交互和 Three.js 首页网络 |
| `test/build-docs-site.test.mjs` | 构建脚本测试 |

## Build

```bash
npm run build:docs-site
```

本地预览：

```bash
python3 -m http.server 4173 --directory docs-site/dist
```

## Test

```bash
npm run test:docs-site
```
