---
title: Embedding 模型集成
description: 将文本转换为向量
---

# Embedding 模型集成

## 这是什么？

Embedding = 把文字变成数字向量。语义相似的文字，向量也相似。

## OpenAI Embeddings

```typescript
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// 单条文本
const vector = await embeddings.embedQuery("你好世界");

// 批量文本
const vectors = await embeddings.embedDocuments(["你好", "世界", "LangChain"]);
```

## 在向量库中使用

```typescript
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const vectorStore = await MemoryVectorStore.fromDocuments(
  documents,
  embeddings  // 传入 embedding 模型
);

const results = await vectorStore.similaritySearch("搜索词", 3);
```

## 下一步

- [RAG](/langchain/retrieval)
- [语义搜索引擎](/langchain/tutorials/semantic-search)
