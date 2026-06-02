# 内容社区模板

适合：论坛、问答社区、博客社区、兴趣社区、评论平台、创作者平台。

## 产品定位

内容社区的核心是让用户持续生产、发现、互动和沉淀内容。

典型目标：

- 让用户轻松发布内容。
- 通过评论、点赞、收藏、关注形成互动。
- 通过审核和举报保持社区质量。
- 通过推荐、搜索和标签提升内容发现。

## 用户角色

| 角色 | 能力 |
| --- | --- |
| 游客 | 浏览公开内容 |
| 普通用户 | 发布、评论、点赞、收藏 |
| 创作者 | 管理自己的内容和粉丝 |
| 版主 | 审核内容、处理举报 |
| 运营 | 配置推荐、活动和公告 |
| 管理员 | 管理用户、权限和系统配置 |

## 10 模块组合

| 模块 | 设计重点 |
| --- | --- |
| 产品层 | 社区主题、内容类型、互动规则 |
| 账号系统 | 登录、个人主页、关注关系、版主角色 |
| 数据库层 | 内容、评论、点赞、收藏、关注、举报、审核 |
| 后端系统 | 发布、评论、互动、搜索、推荐、通知 |
| 前端/客户端 | Feed、详情页、编辑器、个人主页、审核后台 |
| 安全 | XSS 防护、内容权限、反刷、举报处理 |
| 运维部署 | 搜索服务、对象存储、审核队列、监控 |
| 测试 | 发布、评论、权限、审核、推荐、搜索 |
| 商业/运营 | 内容审核、数据统计、推荐、反馈、客服 |
| 文档 | 社区规则、用户指南、版主手册、审核标准 |

## 推荐技术和参考仓库

| 类别 | 推荐 |
| --- | --- |
| 前端 | Next.js、React、Vue |
| 后端 | NestJS、FastAPI、Django REST Framework |
| 搜索 | Meilisearch、Typesense、Elasticsearch |
| 对象存储 | Supabase Storage、SeaweedFS、S3 |
| 通知 | Novu、React Email |
| 分析 | PostHog |
| 审核后台 | React Admin、Refine |

## 核心数据表

| 表 | 作用 |
| --- | --- |
| users | 用户 |
| profiles | 个人主页 |
| posts | 内容 |
| comments | 评论 |
| reactions | 点赞或表情 |
| bookmarks | 收藏 |
| follows | 关注关系 |
| tags | 标签 |
| post_tags | 内容标签 |
| reports | 举报 |
| moderation_cases | 审核案件 |
| notifications | 通知 |
| audit_logs | 审计日志 |

## API 设计

| API | 说明 |
| --- | --- |
| `GET /api/feed` | 信息流 |
| `POST /api/posts` | 发布内容 |
| `GET /api/posts/:id` | 内容详情 |
| `POST /api/posts/:id/comments` | 评论 |
| `POST /api/posts/:id/reactions` | 点赞 |
| `POST /api/posts/:id/bookmarks` | 收藏 |
| `POST /api/users/:id/follow` | 关注 |
| `POST /api/reports` | 举报 |
| `GET /admin/api/moderation` | 审核队列 |
| `POST /admin/api/moderation/:id/resolve` | 处理审核 |

## 页面设计

- 首页 Feed。
- 内容详情。
- 发布/编辑页面。
- 搜索页。
- 标签页。
- 个人主页。
- 通知中心。
- 举报入口。
- 审核后台。

## 关键检查

- [ ] 富文本是否做 XSS 清洗。
- [ ] 删除、隐藏、封禁规则是否清楚。
- [ ] 举报和申诉流程是否存在。
- [ ] 推荐是否可解释和可回退。
- [ ] 用户隐私和内容可见性是否明确。
- [ ] 版主操作是否写审计日志。
- [ ] 社区规则和审核标准是否文档化。

