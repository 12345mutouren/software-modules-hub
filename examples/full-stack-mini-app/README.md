# Full Stack Mini App

这是第二阶段的第一个完整示例：一个无外部 npm 依赖的小型全栈软件。

它不是生产级框架模板，而是用最少代码演示一个完整软件如何把 10 个模块串起来。

## 覆盖模块

| 模块 | 示例位置 | 覆盖内容 |
| --- | --- | --- |
| 产品层 | [docs/product-spec.md](docs/product-spec.md) | 目标用户、核心流程、页面清单 |
| 账号系统 | [src/app.js](src/app.js)、[src/store.js](src/store.js) | 注册、登录、Session、角色 |
| 数据库层 | [src/store.js](src/store.js)、[docs/database-schema.sql](docs/database-schema.sql) | JSON 数据存储、代表性 SQL 表结构 |
| 后端系统 | [src/app.js](src/app.js) | REST API、校验、权限、订单、反馈 |
| 前端/客户端 | [public/index.html](public/index.html)、[public/app.js](public/app.js) | 表单、状态、接口调用、响应式页面 |
| 安全 | [src/security.js](src/security.js)、[src/app.js](src/app.js) | 密码哈希、Cookie、CSRF、限流、权限 |
| 运维部署 | [Dockerfile](Dockerfile)、[docker-compose.yml](docker-compose.yml)、[docs/deployment.md](docs/deployment.md) | 本地运行、容器运行、健康检查 |
| 测试 | [test/app.test.js](test/app.test.js) | API、权限、CSRF、业务流程测试 |
| 商业/运营功能 | [src/store.js](src/store.js)、[src/app.js](src/app.js) | 会员计划、订单、反馈、审计日志 |
| 文档 | [docs](docs) | 产品、API、数据库、部署、管理员说明 |

## 本地运行

要求：Node.js 18 或更高版本。

```bash
npm start
```

打开：

```text
http://localhost:3000
```

## 运行测试

```bash
npm test
```

测试会验证：

- 健康检查接口。
- 注册输入校验。
- 注册后的管理员角色。
- CSRF 防护。
- 订单创建和查询。
- 管理员权限。
- 普通用户禁止访问管理员接口。
- 登录用户提交反馈。

## API 快速预览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/health` | 健康检查 |
| GET | `/api/me` | 当前用户 |
| GET | `/api/plans` | 会员计划 |
| POST | `/api/register` | 注册 |
| POST | `/api/login` | 登录 |
| POST | `/api/logout` | 退出 |
| GET | `/api/orders` | 查询自己的订单 |
| POST | `/api/orders` | 创建订单 |
| POST | `/api/feedback` | 提交反馈 |
| GET | `/api/admin/users` | 管理员查询用户 |

## 示例边界

- 数据存储使用 JSON 文件，便于阅读和测试，不替代生产数据库。
- 支付是模拟订单，不连接真实 Stripe 或支付渠道。
- 密码使用 `crypto.scryptSync` 哈希，但生产项目还需要更完整的风控和合规。
- Session 存在 JSON 文件中，生产项目通常使用 Redis、数据库或专用会话服务。
- 前端是原生 HTML/CSS/JS，便于聚焦软件模块，而不是框架细节。

