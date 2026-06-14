# 05 前端/客户端

前端/客户端回答：用户如何看见软件、操作软件、获得反馈。

它包括 Web 网站、移动 App、桌面软件和管理后台，也包括交互状态、响应式适配和可访问性。

## 核心能力

- Web 网站：React、Vue、Next.js 等。
- 移动 App：iOS、Android、Flutter、React Native。
- 桌面软件：Electron、Qt、Tauri。
- 管理后台：用户管理、内容管理、权限管理、数据统计。
- 交互体验：表单、按钮、搜索、筛选、分页、弹窗、加载状态、错误提示。
- 响应式适配：电脑、平板、手机都能用。
- AI 前端层：Agent UI、Generative UI、共享状态、人机确认。

## 客户端类别

| 类别 | 说明 | 适合场景 |
| --- | --- | --- |
| Web 网站 | 浏览器访问 | 大多数 SaaS、社区、电商、工具 |
| 移动 App | iOS/Android 原生或跨平台 | 高频使用、需要推送或设备能力 |
| 桌面软件 | Electron、Tauri、Qt | 本地文件、专业工具、离线能力 |
| 管理后台 | 面向管理员和运营 | CRUD、审核、统计、配置 |
| 小程序 | 微信、支付宝等平台 | 国内轻量应用和交易场景 |
| 嵌入式 UI | 插件、Widget、iframe | 第三方集成 |
| AI Agent UI | Copilot、Generative UI、工具调用、人机确认 | AI 知识库、后台助手、企业内部工具 |

## 页面类别

| 类别 | 说明 |
| --- | --- |
| 公开页面 | 首页、介绍页、公开内容 |
| 认证页面 | 登录、注册、找回密码、二次验证 |
| 用户页面 | 用户中心、设置、账单、通知 |
| 功能页面 | 核心业务操作页面 |
| 列表页面 | 搜索、筛选、排序、分页 |
| 详情页面 | 单个对象的完整信息 |
| 编辑页面 | 表单、富文本、拖拽、上传 |
| 后台页面 | 用户、内容、权限、配置、统计 |
| 状态页面 | 加载、空状态、错误、无权限、成功 |

## 交互体验类别

| 类别 | 说明 |
| --- | --- |
| 表单 | 输入、校验、提交、错误提示 |
| 搜索 | 关键词、筛选、排序、搜索建议 |
| 分页 | 页码、无限滚动、加载更多 |
| 弹窗 | 确认、编辑、详情、危险操作 |
| 通知 | toast、站内消息、系统提示 |
| 加载状态 | skeleton、spinner、进度条 |
| 错误状态 | 网络错误、权限错误、数据错误 |
| 响应式 | 手机、平板、桌面布局适配 |
| 可访问性 | 键盘操作、语义标签、对比度 |

## 常见数据

- 页面路由。
- 组件状态。
- 表单数据。
- 用户会话。
- API 请求状态。
- 缓存数据。
- 错误信息。
- 用户偏好。

## 常见流程

1. 用户进入页面。
2. 前端读取会话和权限。
3. 前端请求 API 或读取本地缓存。
4. 页面展示加载、空状态、数据或错误。
5. 用户操作表单、搜索、筛选或按钮。
6. 前端提交请求并展示结果。
7. 页面根据设备尺寸和权限调整展示。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [facebook/react](https://github.com/facebook/react) | library | Web UI 组件模型 |
| [vuejs/core](https://github.com/vuejs/core) | framework | Vue 前端框架 |
| [vercel/next.js](https://github.com/vercel/next.js) | framework | 全栈 React 和路由 |
| [vitejs/vite](https://github.com/vitejs/vite) | tooling | 前端构建工具 |
| [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | library | 原子化 CSS |
| [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | library | React 组件示例和设计系统 |
| [ant-design/ant-design](https://github.com/ant-design/ant-design) | library | 企业级 React UI 组件 |
| [ant-design/ant-design-pro](https://github.com/ant-design/ant-design-pro) | starter | 管理后台模板 |
| [marmelab/react-admin](https://github.com/marmelab/react-admin) | framework | 后台管理框架 |
| [refinedev/refine](https://github.com/refinedev/refine) | framework | 内部工具、后台、Dashboard |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | framework | Agent 前端栈、Generative UI 和 AG-UI 集成 |
| [flutter/flutter](https://github.com/flutter/flutter) | framework | 跨平台移动和桌面 |
| [facebook/react-native](https://github.com/facebook/react-native) | framework | 跨平台移动 App |
| [electron/electron](https://github.com/electron/electron) | framework | 桌面软件 |
| [tauri-apps/tauri](https://github.com/tauri-apps/tauri) | framework | 轻量桌面软件 |

## 设计检查清单

- [ ] 是否列出所有关键页面。
- [ ] 是否有游客、用户、管理员等不同视图。
- [ ] 是否有加载、错误、空状态和无权限状态。
- [ ] 是否有表单校验和提交反馈。
- [ ] 是否有搜索、筛选、排序和分页策略。
- [ ] 是否适配手机、平板和桌面。
- [ ] 是否有管理后台。
- [ ] 如果引入 AI Agent UI，是否限制工具权限、用户确认和状态写入边界。
- [ ] 是否考虑可访问性。
- [ ] 是否和后端 API 文档对齐。
