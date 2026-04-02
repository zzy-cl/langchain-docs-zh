---
title: Deep Agents 概览
description: 构建能规划、能派子 Agent、能管理文件系统的智能 Agent
---

# Deep Agents 概览

## 这是什么？

`deepagents` 是一个**开箱即用的 Agent 框架**。它在 LangChain 的基础上，内置了一整套高级能力：

```mermaid
graph TB
    DA["🪄 Deep Agent"]

    subgraph "内置能力"
        PLAN["📋 任务规划<br/>自动拆分子步骤"]
        SUB["👥 子 Agent<br/>派专门的 Agent 干活"]
        FS["📁 文件系统<br/>Agent 间共享文件"]
        MEM["💾 长期记忆<br/>跨会话记住重要信息"]
        SANDBOX["🖥️ 沙箱<br/>安全执行代码"]
        ACP["🔌 ACP 协议<br/>接入 IDE 和编辑器"]
    end

    DA --> PLAN & SUB & FS & MEM & SANDBOX & ACP

    style DA fill:#f59e0b,color:#000
    style PLAN fill:#fef3c7,color:#000
    style SUB fill:#fef3c7,color:#000
    style FS fill:#fef3c7,color:#000
    style MEM fill:#fef3c7,color:#000
    style SANDBOX fill:#fef3c7,color:#000
    style ACP fill:#fef3c7,color:#000
```

## 为什么用它？

普通 Agent 一问一答。Deep Agent 能做**复杂多步骤任务**：

```mermaid
sequenceDiagram
    participant User as 👤 用户
    participant DA as 🪄 Deep Agent
    participant Search as 🔍 搜索子Agent
    participant Writer as ✍️ 写作子Agent
    participant FS as 📁 文件系统

    User->>DA: "帮我写一篇 LangChain 入门文章"
    DA->>DA: 📋 规划：搜索 → 大纲 → 写作 → 校对
    DA->>Search: 👥 派搜索子Agent 搜集资料
    Search->>FS: 📁 写入搜索结果
    Search-->>DA: 搜集完成
    DA->>Writer: 👥 派写作子Agent 写文章
    Writer->>FS: 📁 读取搜索结果
    Writer->>FS: 📁 写入文章草稿
    Writer-->>DA: 写作完成
    DA->>DA: 📋 校对修改
    DA-->>User: "文章已完成！"
```

## 适用场景

| 场景 | Deep Agent 怎么帮你 |
|------|---------------------|
| 📝 写长文章 | 自动搜索 → 大纲 → 逐段写作 → 校对 |
| 📊 数据分析 | 自动读文件 → 清洗 → 分析 → 生成报告 |
| 🎯 复杂任务 | 自动拆分 → 派子 Agent 并行处理 → 汇总结果 |
| 💬 客户支持 | 根据问题类型路由到不同的处理 Agent |
| 🔬 深度研究 | 多轮搜索 → 对比分析 → 生成研究报告 |

## 安装

```bash
npm install deepagents @langchain/core zod
```

## 最简示例

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  system: "你是一个有帮助的助手。",
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "帮我写一首关于春天的诗" }],
});

console.log(result.messages[result.messages.length - 1].content);
```

## 带工具的示例

```typescript
import { createDeepAgent } from "deepagents";
import { tool } from "langchain";
import { z } from "zod";

// ① 定义搜索工具
const search = tool(
  async ({ query }) => {
    // 实际项目中接入搜索 API
    return `搜索"${query}"的结果：LangChain 是一个 Agent 开发框架...`;
  },
  {
    name: "search",
    description: "搜索互联网获取信息",
    schema: z.object({ query: z.string() }),
  }
);

// ② 定义写文件工具
const writeFile = tool(
  ({ filename, content }) => {
    console.log(`📝 写入文件 ${filename}：${content.slice(0, 50)}...`);
    return `文件 ${filename} 写入成功`;
  },
  {
    name: "write_file",
    description: "将内容写入文件",
    schema: z.object({
      filename: z.string().describe("文件名"),
      content: z.string().describe("文件内容"),
    }),
  }
);

// ③ 创建 Agent
const agent = createDeepAgent({
  tools: [search, writeFile],
  system: `你是一个研究助手。
流程：
1. 先搜索相关信息
2. 整理成结构化笔记
3. 写入文件保存`,
});

// ④ 调用
const result = await agent.invoke({
  messages: [{ role: "user", content: "帮我研究一下 LangChain 是什么，保存成笔记" }],
});
```

## 与普通 Agent 的区别

```mermaid
graph LR
    subgraph "普通 Agent"
        U1["用户提问"] --> A1["Agent 回答"] --> E1["结束"]
    end

    subgraph "Deep Agent"
        U2["用户提问"] --> A2["📋 规划"]
        A2 --> S1["👥 派子Agent 1"]
        A2 --> S2["👥 派子Agent 2"]
        S1 --> FS["📁 写文件"]
        S2 --> FS
        FS --> SUM["📋 汇总"]
        SUM --> E2["回复用户"]
    end
```

## 与其他产品的关系

```
Deep Agents = LangChain + LangGraph + 内置增强功能
```

| 你需要 | 用什么 |
|--------|--------|
| 快速做一个复杂 Agent | **Deep Agents** ✅ |
| 自定义 Agent 行为 | [LangChain](/langchain/) |
| 底层工作流控制 | [LangGraph](/langgraph/) |

详见 [产品关系与选型指南](/overview/product-comparison)。

## 下一步

- [快速开始](/deepagents/quickstart)
- [创建 Agent](/deepagents/creation)
- [工具（Tools）](/deepagents/tools)
- [子 Agent（Subagents）](/deepagents/subagents)
