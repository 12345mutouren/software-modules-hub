# 04 后端系统

后端系统回答：业务逻辑在哪里执行，前端、移动端和第三方系统如何调用，数据如何被校验和处理。

它是产品规则、数据库、安全、消息、文件和运营功能之间的连接层。

## 核心能力

- API 接口：给前端、移动端、第三方系统调用。
- 业务逻辑：注册、登录、查询、创建、修改、删除、支付、通知。
- 权限校验：判断谁能看、谁能改、谁能删除。
- 数据校验：防止错误数据、恶意输入、重复提交。
- 文件处理：上传、下载、压缩、转码、预览。
- 消息系统：邮件、短信、站内信、推送通知。
- 定时任务：清理过期数据、发送提醒、同步数据、生成报表。

## API 类别

| 类别 | 说明 | 适合场景 |
| --- | --- | --- |
| REST API | 资源路径 + HTTP 方法 | 通用 Web 和移动端 |
| GraphQL | 前端按需查询字段 | 复杂前端、多端复用 |
| RPC | 远程调用函数 | 内部服务、强类型接口 |
| WebSocket | 长连接实时通信 | 聊天、协作、实时通知 |
| Webhook | 事件回调 | 支付回调、第三方集成 |
| Server Action | 前后端框架内置动作 | Next.js 等全栈框架 |

## 业务逻辑类别

| 类别 | 例子 |
| --- | --- |
| CRUD | 创建、读取、更新、删除 |
| 工作流 | 审批、审核、状态流转 |
| 交易逻辑 | 下单、支付、退款、订阅 |
| 协作逻辑 | 邀请、分配、评论、消息 |
| 内容逻辑 | 发布、编辑、审核、推荐 |
| AI 逻辑 | 生成、摘要、检索、工具调用 |

## 文件处理类别

| 类别 | 说明 |
| --- | --- |
| 直接上传 | 前端传到后端，后端保存 |
| 预签名上传 | 前端直接传对象存储，后端签名 |
| 分片上传 | 大文件分块上传 |
| 断点续传 | 网络中断后继续上传 |
| 转码压缩 | 图片压缩、视频转码 |
| 文件预览 | 图片、PDF、文档预览 |

## 消息和任务类别

| 类别 | 说明 |
| --- | --- |
| 邮件 | 验证、通知、营销、账单 |
| 短信 | 验证码、重要通知 |
| 站内信 | 系统内通知中心 |
| 推送通知 | 移动端或浏览器推送 |
| 队列任务 | 异步处理耗时任务 |
| 定时任务 | 每天、每小时或固定时间执行 |

## 常见数据

- API 请求和响应。
- 业务实体和状态。
- 权限上下文。
- 校验错误。
- 文件元数据。
- 队列任务。
- Webhook 事件。
- 定时任务执行记录。

## 常见流程

1. 客户端发起请求。
2. 后端解析身份和权限。
3. 后端校验输入数据。
4. 后端执行业务逻辑。
5. 后端读写数据库或对象存储。
6. 后端触发消息、队列或定时任务。
7. 后端返回结果、错误或异步任务状态。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [expressjs/express](https://github.com/expressjs/express) | framework | Node.js REST API 基础 |
| [nestjs/nest](https://github.com/nestjs/nest) | framework | TypeScript 企业后端结构 |
| [fastapi/fastapi](https://github.com/fastapi/fastapi) | framework | Python API、校验、文档 |
| [encode/django-rest-framework](https://github.com/encode/django-rest-framework) | framework | Django REST API |
| [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) | framework | Java 后端应用 |
| [laravel/laravel](https://github.com/laravel/laravel) | framework | PHP Web 后端 |
| [trpc/trpc](https://github.com/trpc/trpc) | framework | TypeScript RPC |
| [graphql/graphql-js](https://github.com/graphql/graphql-js) | library | GraphQL 基础实现 |
| [socketio/socket.io](https://github.com/socketio/socket.io) | library | 实时通信 |
| [transloadit/uppy](https://github.com/transloadit/uppy) | library | 文件上传 |
| [tus/tus-js-client](https://github.com/tus/tus-js-client) | library | 断点续传 |
| [novuhq/novu](https://github.com/novuhq/novu) | platform | 多渠道通知 |
| [resend/react-email](https://github.com/resend/react-email) | library | 邮件模板 |
| [taskforcesh/bullmq](https://github.com/taskforcesh/bullmq) | library | Node.js 队列任务 |

## 设计检查清单

- [ ] 是否定义 API 类型和接口边界。
- [ ] 是否区分控制器、业务逻辑和数据访问。
- [ ] 是否对所有输入做校验。
- [ ] 是否每个接口都有权限校验。
- [ ] 是否有重复提交和幂等处理。
- [ ] 是否有文件上传和存储策略。
- [ ] 是否有消息通知和异步任务策略。
- [ ] 是否有定时任务和失败重试策略。
- [ ] 是否有 API 文档。
