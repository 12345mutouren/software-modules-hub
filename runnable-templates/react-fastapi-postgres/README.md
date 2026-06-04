# React + FastAPI + PostgreSQL Runnable Template

第 21 阶段模板。

## Goal

Provide a testable starter shape for AI knowledge bases, internal tools and reporting dashboards using:

- React for browser UI.
- FastAPI for typed Python APIs.
- PostgreSQL for core data.
- Workers for document parsing, embeddings, imports and reports.

## Included Files

| File | Purpose |
| --- | --- |
| `template-manifest.json` | Template contract |
| `api/main.py` | FastAPI-shaped API entry |
| `web/App.jsx` | React-shaped UI entry |
| `test/template-manifest.test.mjs` | Contract tests |

## Run

```bash
npm --prefix runnable-templates/react-fastapi-postgres test
```

## Migration To Real Stack

1. Create Python environment and install FastAPI.
2. Create React app in `web`.
3. Convert manifest resources into OpenAPI routes.
4. Add PostgreSQL migrations.
5. Add worker queue for slow jobs.

