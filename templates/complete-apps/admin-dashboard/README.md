# 管理后台模板

适合：用户管理、内容审核、订单管理、权限配置、运营配置、内部 CRUD 系统。

## 产品定位

管理后台的核心是让管理员、客服和运营高效管理数据。它不应该像营销网站，而应该强调密度、可扫描、权限清晰和操作可恢复。

典型目标：

- 快速查询、筛选和编辑数据。
- 控制不同管理员能看见和修改的范围。
- 审核内容和处理用户问题。
- 记录所有敏感操作。

## 用户角色

| 角色 | 能力 |
| --- | --- |
| 超级管理员 | 系统配置、角色权限、所有数据 |
| 管理员 | 管理授权范围内的数据 |
| 运营 | 内容、活动、推荐和统计 |
| 客服 | 查询用户、订单、反馈，执行有限操作 |
| 只读用户 | 只能查看报表和记录 |

## 10 模块组合

| 模块 | 设计重点 |
| --- | --- |
| 产品层 | 明确后台服务哪些管理任务 |
| 账号系统 | 管理员登录、RBAC、操作范围 |
| 数据库层 | 用户、角色、权限、业务对象、审计日志 |
| 后端系统 | CRUD API、批量操作、审核流、导出 |
| 前端/客户端 | 表格、筛选、详情、编辑、弹窗、报表 |
| 安全 | 强权限校验、二次确认、操作审计、IP 限制 |
| 运维部署 | 内网/VPN、监控、备份、灰度发布 |
| 测试 | 权限矩阵、危险操作、批量操作、回归测试 |
| 商业/运营 | 报表、客服、反馈、内容审核、活动配置 |
| 文档 | 管理员手册、权限说明、操作 SOP |

## 推荐技术和参考仓库

| 类别 | 推荐 |
| --- | --- |
| 后台框架 | `marmelab/react-admin`、`refinedev/refine` |
| UI | `ant-design/ant-design`、`ant-design/ant-design-pro` |
| 后端 | NestJS、FastAPI、Django REST Framework |
| 权限 | Casbin、OpenFGA、Permify |
| 测试 | Playwright、Testing Library |
| 审计 | PostgreSQL audit logs、Sentry、OpenTelemetry |

## 核心数据表

| 表 | 作用 |
| --- | --- |
| admin_users | 后台用户 |
| roles | 角色 |
| permissions | 权限 |
| admin_user_roles | 管理员角色 |
| resources | 可管理资源 |
| audit_logs | 操作日志 |
| review_tasks | 审核任务 |
| exports | 导出任务 |
| system_settings | 系统配置 |

## API 设计

| API | 说明 |
| --- | --- |
| `GET /admin/api/users` | 用户列表 |
| `GET /admin/api/users/:id` | 用户详情 |
| `PATCH /admin/api/users/:id` | 更新用户 |
| `GET /admin/api/audit-logs` | 审计日志 |
| `POST /admin/api/review-tasks/:id/approve` | 审核通过 |
| `POST /admin/api/review-tasks/:id/reject` | 审核拒绝 |
| `POST /admin/api/exports` | 创建导出任务 |
| `GET /admin/api/settings` | 系统配置 |

## 页面设计

- 登录页。
- 总览 Dashboard。
- 用户列表和详情。
- 内容审核队列。
- 订单或业务对象管理。
- 角色和权限管理。
- 操作日志。
- 系统设置。
- 数据报表。

## 关键检查

- [ ] 每个操作是否有明确权限。
- [ ] 批量操作是否需要二次确认。
- [ ] 危险操作是否写审计日志。
- [ ] 列表是否支持筛选、排序、分页和导出。
- [ ] 客服是否只能看到必要数据。
- [ ] 是否有误操作恢复流程。
- [ ] 管理员文档是否覆盖常见操作。

