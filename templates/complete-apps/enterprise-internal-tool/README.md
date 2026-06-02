# 企业内部工具模板

适合：审批系统、工单系统、资产管理、报表系统、CRM 内部版、HR/财务/运营工具。

## 产品定位

企业内部工具的核心是把组织流程数字化：谁提交、谁审批、谁执行、谁能查看记录。

典型目标：

- 让员工提交请求或工单。
- 让管理员配置流程、角色和审批规则。
- 让负责人审批、分派、处理和追踪状态。
- 让管理层查看报表和审计记录。

## 用户角色

| 角色 | 能力 |
| --- | --- |
| 员工 | 提交申请、查看自己的记录 |
| 审批人 | 审批、驳回、转交 |
| 处理人 | 接单、处理、关闭 |
| 部门管理员 | 管理本部门数据和成员 |
| 系统管理员 | 配置流程、角色、权限 |
| 审计/管理层 | 查看报表和审计日志 |

## 10 模块组合

| 模块 | 设计重点 |
| --- | --- |
| 产品层 | 流程、表单、审批规则、SLA |
| 账号系统 | 企业 SSO、组织架构、部门、角色 |
| 数据库层 | 员工、部门、工单、审批、评论、附件、日志 |
| 后端系统 | 表单提交、流程引擎、审批、通知、报表 |
| 前端/客户端 | 工作台、表单、列表、详情、审批页、报表 |
| 安全 | SSO、数据权限、审计、附件权限、IP/VPN |
| 运维部署 | 内网部署、备份、监控、权限同步 |
| 测试 | 流程测试、权限矩阵、通知、报表、回归 |
| 商业/运营 | 工单、客服、反馈、统计、自动化 |
| 文档 | 员工手册、管理员手册、流程说明、FAQ |

## 推荐技术和参考仓库

| 类别 | 推荐 |
| --- | --- |
| 身份 | Keycloak、Casdoor、Ory Kratos |
| 权限 | OpenFGA、Casbin、Permify |
| 后台 | React Admin、Refine、Ant Design Pro |
| 后端 | NestJS、FastAPI、Spring Boot |
| 队列和通知 | BullMQ、Novu、React Email |
| 自动化 | n8n |
| 部署 | Docker Compose、Kubernetes、Coolify |

## 核心数据表

| 表 | 作用 |
| --- | --- |
| employees | 员工 |
| departments | 部门 |
| roles | 角色 |
| permissions | 权限 |
| workflows | 流程定义 |
| workflow_steps | 流程步骤 |
| tickets | 工单或申请 |
| approvals | 审批记录 |
| comments | 评论 |
| attachments | 附件 |
| notifications | 通知 |
| reports | 报表配置 |
| audit_logs | 审计日志 |

## API 设计

| API | 说明 |
| --- | --- |
| `GET /api/me` | 当前员工 |
| `POST /api/tickets` | 提交工单 |
| `GET /api/tickets` | 我的工单 |
| `GET /api/tickets/:id` | 工单详情 |
| `POST /api/tickets/:id/approve` | 审批通过 |
| `POST /api/tickets/:id/reject` | 审批驳回 |
| `POST /api/tickets/:id/comments` | 评论 |
| `POST /api/tickets/:id/attachments` | 上传附件 |
| `GET /api/reports` | 报表 |
| `GET /admin/api/workflows` | 流程配置 |

## 页面设计

- 登录/SSO 回调。
- 工作台。
- 提交表单。
- 我的申请。
- 待我审批。
- 工单详情。
- 流程配置。
- 部门和成员管理。
- 报表。
- 审计日志。

## 关键检查

- [ ] 企业 SSO 和组织架构是否明确。
- [ ] 部门数据权限是否正确。
- [ ] 审批流程是否支持退回、转交和超时。
- [ ] 附件是否有访问权限和病毒扫描策略。
- [ ] 审批、角色变更、导出是否写审计日志。
- [ ] 是否有 SLA 和通知策略。
- [ ] 是否有员工和管理员操作文档。

