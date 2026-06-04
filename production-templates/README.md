# Production Templates

第十三阶段生产级架构模板。

目标：把前面的模块、示例、决策指南和项目生成器推进到更接近真实生产项目的结构设计。

这些模板不是可直接上线的完整应用，而是生产项目启动前的架构骨架：服务拓扑、目录结构、环境变量、数据库、缓存、对象存储、搜索、队列、测试和部署边界。

## Templates

| Template | Best For |
| --- | --- |
| [Next.js + Node.js + PostgreSQL](stacks/nextjs-node-postgres.md) | SaaS、后台、电商、内容社区 |
| [React + FastAPI + PostgreSQL](stacks/react-fastapi-postgres.md) | 数据密集型后台、AI 知识库、内部工具 |
| [Vue + Go + PostgreSQL](stacks/vue-go-postgres.md) | 高并发 API、企业内部系统、运维后台 |

## Infrastructure References

| File | Purpose |
| --- | --- |
| [docker-compose.reference.yml](infra/docker-compose.reference.yml) | 本地到准生产的服务组合参考 |
| [env.example](infra/env.example) | 环境变量命名和分层参考 |
| [migration-plan.md](runbooks/migration-plan.md) | 数据库迁移和回滚计划 |

## Production Architecture Rules

- Separate web, API, worker and database responsibilities.
- Keep secrets out of source code.
- Use PostgreSQL for core business data.
- Use Redis for session, cache, queue and rate-limit support.
- Use object storage for files.
- Add search only when product search behavior is clear.
- Add queue workers for slow, retryable or external-provider work.
- Treat migrations, backups, monitoring and rollback as first-class requirements.

