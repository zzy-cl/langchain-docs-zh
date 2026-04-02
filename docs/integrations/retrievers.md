---
title: 检索器
description: 从向量库中检索相关文档
---

# 检索器

## 使用方式

```typescript
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

// 基本检索
const results = await vectorStore.similaritySearch("搜索词", 3);

// 带分数的检索
const resultsWithScore = await vectorStore.similaritySearchWithScore("搜索词", 3);
```

## 下一步

- [RAG](/langchain/retrieval)
- [集成概览](/integrations/)
