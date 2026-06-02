# Glossary

## Core Software Terms

| Term | Meaning |
| --- | --- |
| Product layer | 定义软件解决什么问题、给谁用、核心流程是什么 |
| Account system | 登录、注册、用户资料、角色和权限 |
| Backend | 执行业务逻辑、提供 API、处理数据和任务 |
| Frontend | 用户看到和操作的软件界面 |
| Database | 存储、组织、查询和保护数据的系统 |
| Deployment | 把软件发布到用户可访问环境的过程 |
| Observability | 通过日志、指标、追踪和错误监控理解系统状态 |
| Runbook | 遇到固定场景时可执行的操作手册 |
| ADR | Architecture Decision Record，架构决策记录 |

## Auth And Security

| Term | Meaning |
| --- | --- |
| Authentication | 证明你是谁 |
| Authorization | 判断你能做什么 |
| RBAC | 基于角色控制权限 |
| ABAC | 基于属性控制权限 |
| ReBAC | 基于关系控制权限 |
| Session | 服务端或存储中维护的登录状态 |
| JWT | 自包含身份声明的 Token |
| Cookie | 浏览器自动携带的小型数据 |
| CSRF | 借用户登录态发起伪造请求的攻击 |
| XSS | 注入脚本影响用户页面的攻击 |
| SQL injection | 通过输入篡改 SQL 查询的攻击 |
| MFA | 多因素认证 |
| SSO | 单点登录 |

## Data

| Term | Meaning |
| --- | --- |
| ORM | 用代码对象操作数据库的工具 |
| Migration | 数据库结构变更记录 |
| Index | 用于加速查询的数据结构 |
| Cache | 临时保存热点数据以加速访问 |
| Object storage | 存储图片、视频、附件和导出文件 |
| Vector database | 用于语义检索的向量存储 |
| Search index | 用于全文搜索和筛选的索引 |

## Operations

| Term | Meaning |
| --- | --- |
| CI/CD | 自动测试、构建和发布流程 |
| Staging | 接近生产的测试环境 |
| Rollback | 发布失败后回到旧版本 |
| RPO | 能接受最多丢失多少数据 |
| RTO | 能接受多久恢复服务 |
| Health check | 判断服务是否可用的接口 |
| Incident | 影响用户或系统稳定性的事故 |
| Postmortem | 事故复盘 |

