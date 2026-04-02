---
title: Retrieval / RAG
description: 检索增强生成——让 Agent 从你的知识库中找答案
---

# Retrieval / RAG

## 这是什么？

RAG = **Retrieval-Augmented Generation**（检索增强生成）。

> Agent 不是凭空回答，而是先从你的知识库中找到相关资料，再结合这些资料回答。

## 类比

> 就像开卷考试——不靠死记硬背，而是先翻书找答案，再用自己的话写出来。

## 工作流程

```
用户提问 → ① 把问题转成向量 → ② 在向量库中搜索相似内容 → ③ 把找到的内容喂给模型 → ④ 模型基于内容回答
```

## 完整示例

```typescript
import { createAgent } from "langchain";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// ① 准备文档
const docs = [
  "LangChain 是一个 Agent 开发框架...",
  "Deep Agents 是开箱即用的 Agent 框架...",
  "LangGraph 是底层编排运行时...",
];

// ② 切分文档
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });
const chunks = await splitter.createDocuments(docs);

// ③ 向量化存储
const embeddings = new OpenAIEmbeddings();
const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);

// ④ 创建带检索的 Agent
const agent = createAgent({
  model: "openai:gpt-4o",
  retrieval: {
    vectorStore,
    topK: 3, // 返回最相关的 3 条
  },
  system: "根据检索到的资料回答用户问题。",
});
```

## 常用向量库

| 向量库 | 说明 |
|--------|------|
| `MemoryVectorStore` | 内存中，开发测试用 |
| `Chroma` | 轻量本地向量库 |
| `Pinecone` | 云端向量库 |
| `Weaviate` | 开源向量搜索引擎 |
| `Qdrant` | 高性能向量库 |

## 下一步

- [RAG Agent 实战教程](/langchain/tutorials/rag-agent)
- [集成 - 向量库](/integrations/stores)
