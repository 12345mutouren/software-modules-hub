# 08 测试

测试模块回答：如何证明软件按预期工作，如何在修改后避免破坏已有功能。

完整软件需要不同层级的测试：函数、接口、页面、权限、安全和性能。

## 核心能力

- 单元测试：测试单个函数。
- 接口测试：测试后端 API。
- 页面测试：测试按钮、表单、跳转。
- 权限测试：不同用户能不能访问正确内容。
- 安全测试：防注入、防越权。
- 性能测试：很多人同时访问会不会崩。

## 测试类别

| 类别 | 测什么 | 常见工具 |
| --- | --- | --- |
| 单元测试 | 函数、组件、纯逻辑 | Jest、Vitest、pytest |
| 集成测试 | 多个模块协作 | Supertest、Testcontainers |
| 接口测试 | API 请求和响应 | Postman、Newman、Schemathesis |
| E2E 测试 | 浏览器完整流程 | Playwright、Cypress |
| 组件测试 | UI 组件交互 | Testing Library、Storybook |
| 权限测试 | 不同角色的数据和功能边界 | 自定义测试矩阵 |
| 安全测试 | 注入、越权、依赖漏洞 | OWASP ZAP、Semgrep |
| 性能测试 | 并发、吞吐、延迟 | k6、JMeter、Locust |
| 合约测试 | 服务之间接口契约 | Pact |
| 回归测试 | 修改后旧功能是否正常 | CI 测试套件 |

## 权限测试矩阵

| 角色 | 应该允许 | 应该禁止 |
| --- | --- | --- |
| 游客 | 访问公开页面 | 访问个人数据和后台 |
| 普通用户 | 管理自己的数据 | 修改别人数据 |
| 会员 | 使用会员功能 | 使用未购买权益 |
| 管理员 | 管理授权范围内资源 | 越过组织边界 |
| 超级管理员 | 系统级管理 | 绕过审计日志 |
| 只读用户 | 查看数据 | 创建、修改、删除 |

## 常见数据

- 测试用用户。
- 测试数据库。
- Mock 数据。
- API 请求样例。
- 浏览器操作脚本。
- 性能压测脚本。
- 测试报告。
- 覆盖率报告。

## 常见流程

1. 根据产品流程写测试场景。
2. 为关键业务逻辑写单元测试。
3. 为后端接口写接口测试。
4. 为登录、注册、支付等关键路径写 E2E 测试。
5. 为角色和权限写矩阵测试。
6. 在 CI 中自动运行。
7. 发布前查看测试报告和失败原因。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [jestjs/jest](https://github.com/jestjs/jest) | tooling | JavaScript 单元测试 |
| [vitest-dev/vitest](https://github.com/vitest-dev/vitest) | tooling | Vite 生态测试 |
| [pytest-dev/pytest](https://github.com/pytest-dev/pytest) | tooling | Python 测试 |
| [microsoft/playwright](https://github.com/microsoft/playwright) | tooling | 浏览器 E2E 测试 |
| [cypress-io/cypress](https://github.com/cypress-io/cypress) | tooling | 浏览器测试 |
| [testing-library/react-testing-library](https://github.com/testing-library/react-testing-library) | tooling | React 组件测试 |
| [storybookjs/storybook](https://github.com/storybookjs/storybook) | tooling | 组件开发和视觉测试 |
| [grafana/k6](https://github.com/grafana/k6) | tooling | 性能压测 |
| [locustio/locust](https://github.com/locustio/locust) | tooling | Python 性能测试 |
| [pact-foundation/pact-js](https://github.com/pact-foundation/pact-js) | tooling | 合约测试 |
| [testcontainers/testcontainers-node](https://github.com/testcontainers/testcontainers-node) | tooling | 容器化集成测试 |

## 设计检查清单

- [ ] 是否有单元测试覆盖核心逻辑。
- [ ] 是否有接口测试覆盖关键 API。
- [ ] 是否有页面测试覆盖登录、注册、核心任务。
- [ ] 是否有权限测试矩阵。
- [ ] 是否有安全测试。
- [ ] 是否有性能测试或容量验证。
- [ ] 是否有测试数据管理。
- [ ] 是否在 CI 中自动运行。
- [ ] 是否记录测试失败和修复方式。

