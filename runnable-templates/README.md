# Runnable Templates

第 20-21 阶段可运行模板目录。

目标：把生产级架构模板进一步具体化为可检查的项目骨架。为了保持仓库轻量，这些模板不安装 Next.js、React 或 FastAPI 依赖；它们提供可运行的核心契约测试、目录结构、环境变量、数据库 schema 和真实项目迁移说明。

## Templates

| Phase | Template | Purpose |
| --- | --- | --- |
| 20 | [nextjs-node-postgres](nextjs-node-postgres/README.md) | Next.js + Node.js + PostgreSQL 项目骨架 |
| 21 | [react-fastapi-postgres](react-fastapi-postgres/README.md) | React + FastAPI + PostgreSQL 项目骨架 |

## Test

```bash
npm run test:runnable-templates
```

The tests validate template contracts, expected files and smoke behavior.

