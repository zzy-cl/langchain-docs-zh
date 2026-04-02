---
title: 自定义 RAG Agent
description: 用 LangGraph 构建可控制的 RAG 系统
---

# 自定义 RAG Agent

## 目标

用 LangGraph 构建一个 RAG 系统——不是简单的"搜索 → 回答"，而是：搜索 → 评估质量 → 不够好就换关键词再搜 → 最后总结。

## 实现

```typescript
import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// ① 定义状态
const RAGState = Annotation.Root({
  question: Annotation<string>,
  searchQuery: Annotation<string>,
  documents: Annotation<any[]>({
    reducer: (x, y) => y,
    default: () => [],
  }),
  answer: Annotation<string>({ reducer: (x, y) => y }),
  attempts: Annotation<number>({ reducer: (x, y) => y, default: () => 0 }),
});

const model = new ChatOpenAI({ model: "gpt-4o" });

// ② 节点：搜索
async function search(state) {
  const results = await vectorStore.similaritySearch(state.searchQuery, 3);
  return { documents: results, attempts: state.attempts + 1 };
}

// ③ 节点：评估搜索质量
async function evaluate(state) {
  const response = await model.invoke(
    `这些文档能回答"${state.question}"吗？回答 yes 或 no：\n${state.documents.map(d => d.pageContent).join("\n")}`
  );
  return { quality: (response.content as string).toLowerCase().includes("yes") ? "good" : "bad" };
}

// ④ 节点：重新生成搜索词
async function rephrase(state) {
  const response = await model.invoke(
    `原始问题："${state.question}"，之前的搜索没有找到好结果。换一个搜索词。只返回搜索词。`
  );
  return { searchQuery: response.content as string };
}

// ⑤ 节点：生成答案
async function generate(state) {
  const response = await model.invoke(
    `根据以下资料回答问题：\n${state.documents.map(d => d.pageContent).join("\n")}\n\n问题：${state.question}`
  );
  return { answer: response.content as string };
}

// ⑥ 构建图
const graph = new StateGraph(RAGState)
  .addNode("search", search)
  .addNode("evaluate", evaluate)
  .addNode("rephrase", rephrase)
  .addNode("generate", generate)
  .addEdge(START, "search")
  .addEdge("search", "evaluate")
  .addConditionalEdges("evaluate", (state) => {
    if (state.quality === "good") return "generate";
    if (state.attempts >= 3) return "generate"; // 最多试 3 次
    return "rephrase";
  })
  .addEdge("rephrase", "search") // 循环
  .addEdge("generate", END)
  .compile();

// ⑦ 执行
const result = await graph.invoke({
  question: "LangChain 是什么？",
  searchQuery: "LangChain",
});
```

## 工作流程

```
START → 搜索 → 评估质量 → 好 → 生成答案 → END
                      ↓ 坏
                  换搜索词 → 搜索（循环，最多 3 次）
```

## 下一步

- [Graph API](/langgraph/graph-api)
- [条件边](/langgraph/edges)
- [RAG 详解](/langchain/retrieval)
