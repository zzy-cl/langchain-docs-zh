---
title: 存储集成
description: 向量库和其他存储集成
---

# 存储集成

## 向量库

| 向量库 | 包名 | 说明 |
|--------|------|------|
| MemoryVectorStore | `langchain/vectorstores/memory` | 内存中，开发测试 |
| Chroma | `@langchain/community/vectorstores/chroma` | 轻量本地 |
| Pinecone | `@langchain/pinecone` | 云端托管 |
| Qdrant | `@langchain/qdrant` | 高性能 |
| Weaviate | `@langchain/weaviate` | 开源搜索引擎 |
| FAISS | `faiss-node` | Facebook 高性能库 |

## 使用方式

```typescript
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const vectorStore = await MemoryVectorStore.fromDocuments(
  documents,
  embeddings
);

const results = await vectorStore.similaritySearch("搜索词", 3);
```

## 下一步

- [RAG](/langchain/retrieval)
- [Embedding 模型](/integrations/embeddings)
