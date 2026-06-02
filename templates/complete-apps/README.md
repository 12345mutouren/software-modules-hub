# 完整软件模板组合

第三阶段目标：把前两阶段的模块地图和可运行示例组合成真实软件模板。

这里的模板是蓝图级模板，适合开项目前做技术和产品设计。每个模板都回答：

- 给谁用。
- 核心业务流程是什么。
- 10 个软件模块如何组合。
- 应该有哪些数据表、API 和页面。
- 推荐参考哪些开源仓库。
- 上线前要测什么、部署什么、写什么文档。

## 模板列表

| 模板 | 适合做什么 | 入口 |
| --- | --- | --- |
| SaaS 订阅系统 | 工具类、B2B、AI 产品、会员型产品 | [saas-subscription](saas-subscription/README.md) |
| 管理后台 | 内部运营、CRUD、审核、配置中心 | [admin-dashboard](admin-dashboard/README.md) |
| 电商系统 | 商品、购物车、订单、支付、发货 | [ecommerce](ecommerce/README.md) |
| 内容社区 | 帖子、评论、关注、审核、推荐 | [content-community](content-community/README.md) |
| AI 知识库 | 文档上传、向量检索、问答、权限 | [ai-knowledge-base](ai-knowledge-base/README.md) |
| 企业内部工具 | 组织、审批、工单、报表、SSO | [enterprise-internal-tool](enterprise-internal-tool/README.md) |

## 如何选择

| 你的目标 | 优先模板 |
| --- | --- |
| 想做一个收费 Web 工具 | SaaS 订阅系统 |
| 想做用户/内容/订单管理 | 管理后台 |
| 想卖商品或服务 | 电商系统 |
| 想做论坛、社区、内容平台 | 内容社区 |
| 想做 AI 文档问答或知识库 | AI 知识库 |
| 想做公司内部审批、工单、报表 | 企业内部工具 |

## 统一结构

每个模板都按同样的结构描述：

1. 产品定位。
2. 用户角色。
3. 10 模块组合。
4. 推荐技术和参考仓库。
5. 核心数据表。
6. API 和页面。
7. 安全、测试、部署和文档检查。

