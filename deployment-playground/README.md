# Deployment Playground

第 22 阶段 Docker Compose 一键启动参考环境。

目标：给真实项目提供一个本地准生产环境骨架，包含 web、api、worker、PostgreSQL、Redis 和对象存储占位服务。

## Files

| File | Purpose |
| --- | --- |
| `docker-compose.yml` | Local production-like service graph |
| `.env.example` | Environment variables |
| `smoke-check.mjs` | Dependency-free smoke validator |

## Run Smoke Check

```bash
npm run test:deployment-playground
```

## Use In A Real Project

1. Replace placeholder images with real app images.
2. Add health checks for web, api and worker.
3. Replace object storage placeholder with S3, MinIO or provider config.
4. Keep PostgreSQL and Redis local for development.
5. Never commit real secrets.

