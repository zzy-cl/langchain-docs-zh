---
title: 思维方式
description: 学习用 LangGraph 的方式思考问题
---

# Thinking in LangGraph

## 核心思维转变

```mermaid
graph TB
    subgraph "传统代码"
        LINEAR["线性执行<br/>if/else 硬编码"]
    end
    subgraph "LangGraph"
        DECL["声明式图<br/>节点 + 边 + 状态"]
    end
    LINEAR -->|"升级"| DECL

    style LINEAR fill:#ef4444,color:#fff
    style DECL fill:#22c55e,color:#fff
```

> **普通 Agent**：你说一句话，它回一句话
> **LangGraph Agent**：你画一张流程图，它按图执行

## 怎么用 LangGraph 的方式思考？

### 1. 先画图，再写代码

```mermaid
graph TD
    START --> SEARCH["🔍 搜索"]
    SEARCH --> JUDGE{"有结果？"}
    JUDGE -->|"有"| SUM["📋 总结"]
    JUDGE -->|"没有"| REPHRASE["💬 换关键词"]
    REPHRASE --> SEARCH
    SUM --> END

    style SEARCH fill:#3b82f6,color:#fff
    style JUDGE fill:#f59e0b,color:#000
    style SUM fill:#22c55e,color:#fff
    style REPHRASE fill:#8b5cf6,color:#fff
```

### 2. 每个圆圈是一个"节点"

- 节点 = 一个函数
- 输入：当前状态
- 输出：状态更新

### 3. 箭头是"边"

- 固定边：A 干完一定去 B
- 条件边：根据结果决定去 B 还是去 C

## 与普通代码的区别

```typescript
// ❌ 普通代码：硬编码流程
async function run() {
  const searchResult = await search(query);
  if (searchResult.length > 0) {
    return summarize(searchResult);
  } else {
    const newQuery = await rephrase(query);
    return await search(newQuery); // 简单逻辑还行
  }
}

// ✅ LangGraph：声明式流程
const graph = new StateGraph(/* ... */)
  .addNode("search", searchNode)
  .addNode("summarize", summarizeNode)
  .addNode("rephrase", rephraseNode)
  .addConditionalEdges("search", (state) => {
    if (state.results.length > 0) return "summarize";
    return "rephrase";
  })
  .addEdge("rephrase", "search"); // 循环
```

## 什么时候该用 LangGraph？

| 场景 | 用 LangGraph | 用普通 Agent |
|------|-------------|-------------|
| 简单一问一答 | ❌ | ✅ |
| 多步骤工作流 | ✅ | ❌ |
| 条件分支 | ✅ | ❌ |
| 循环执行 | ✅ | ❌ |
| 需要持久化 | ✅ | ❌ |
| 需要人工介入 | ✅ | ❌ |

## 下一步

- [工作流 vs Agent](/langgraph/workflows-agents)
- [两种 API 怎么选](/langgraph/api-choice)
