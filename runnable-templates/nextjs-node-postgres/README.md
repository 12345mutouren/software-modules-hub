# Next.js + Node.js + PostgreSQL Runnable Template

第 20 阶段模板。

## Goal

Provide a testable starter shape for a SaaS, admin, ecommerce or content product using:

- Next.js for web routes and UI.
- Node.js for API and business services.
- PostgreSQL for core data.
- Redis and workers when background work is needed.

## Included Files

| File | Purpose |
| --- | --- |
| `package.json` | Local test command |
| `.env.example` | Environment variables |
| `src/app-contract.mjs` | Testable app contract |
| `test/app-contract.test.mjs` | Smoke tests |
| `docs/schema.sql` | PostgreSQL schema starter |
| `docs/migration-notes.md` | Migration notes |

## Run

```bash
npm --prefix runnable-templates/nextjs-node-postgres test
```

## Migration To Real Stack

1. Create `apps/web` with Next.js.
2. Move API contracts into `apps/api`.
3. Replace in-memory test contract with database-backed services.
4. Convert `docs/schema.sql` into migrations.
5. Keep contract tests and add integration tests.

