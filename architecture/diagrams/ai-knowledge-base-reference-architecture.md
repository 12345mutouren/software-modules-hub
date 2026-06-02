# AI Knowledge Base Reference Architecture

适合：企业知识库、文档问答、客服助手、研发文档检索。

```mermaid
flowchart LR
  user["用户"]
  editor["编辑者/管理员"]
  web["Web App<br/>聊天、上传、权限"]
  api["API Layer"]
  auth["Auth and Access Policy"]
  storage["Object Storage<br/>原始文件"]
  parser["Parser<br/>PDF、网页、Markdown"]
  queue["Queue<br/>索引任务"]
  chunks["Document Chunks"]
  vector["Vector DB<br/>Qdrant/Milvus/pgvector"]
  llm["LLM Provider"]
  citations["Citations"]
  feedback["Feedback"]
  monitor["Monitoring and Cost Tracking"]

  user --> web
  editor --> web
  web --> api
  api --> auth
  api --> storage
  storage --> parser
  parser --> queue
  queue --> chunks
  chunks --> vector
  web --> api
  api --> vector
  api --> llm
  api --> citations
  api --> feedback
  api --> monitor
  llm --> monitor
```

## Key Decisions

| Decision | Default |
| --- | --- |
| Source storage | Object storage |
| Chunk storage | PostgreSQL or document table |
| Vector search | Qdrant, Milvus, or pgvector |
| Ingestion | Async queue with retry |
| Permissions | Filter before retrieval and before answer generation |
| Quality | Evaluation set for retrieval and answers |

## Production Notes

- 检索必须遵守文档权限。
- 答案要展示引用来源。
- 上传文件要限制大小、类型和权限。
- 模型成本、延迟和失败率要监控。

