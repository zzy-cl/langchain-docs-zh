---
title: 从零搭建 RAG 问答系统
description: 完整的 RAG 问答系统教程
---

# 从零搭建 RAG 问答系统

## 目标

构建一个能从你的文档中回答问题的系统。

## 完整代码

```typescript
import { createAgent } from "langchain";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";

// ① 准备你的文档
const documents = [
  new Document({ pageContent: "LangChain 是一个用于构建 LLM 应用的开源框架..." }),
  new Document({ pageContent: "Deep Agents 是开箱即用的 Agent 框架..." }),
  new Document({ pageContent: "LangGraph 是底层编排运行时..." }),
];

// ② 切分文档
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
const chunks = await splitter.splitDocuments(documents);

// ③ 向量化
const embeddings = new OpenAIEmbeddings();
const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);

// ④ 创建 RAG Agent
const agent = createAgent({
  model: "openai:gpt-4o",
  retrieval: { vectorStore, topK: 3 },
  system: "根据检索到的资料回答。如果资料中没有，就说不知道。",
});

// ⑤ 提问
const result = await agent.invoke({
  messages: [{ role: "user", content: "什么是 Deep Agents？" }],
});
console.log(result);
```

## 下一步

- [RAG 详解](/langchain/retrieval)
- [搜索 Agent](/tutorials/search-agent)
