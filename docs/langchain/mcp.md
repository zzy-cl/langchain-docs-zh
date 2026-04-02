---
title: MCP（模型上下文协议）
description: Model Context Protocol —— 标准化模型与工具的通信协议
---

# MCP（模型上下文协议）

## 这是什么？

MCP = **Model Context Protocol**，一个开放标准，让模型能以统一的方式接入各种工具和数据源。

## 类比

> MCP 就像 USB 接口——不管你是插鼠标、键盘还是 U 盘，接口统一，即插即用。MCP 让不同工具都能被任何模型调用。

## 核心概念

| 概念 | 说明 |
|------|------|
| **MCP Server** | 提供工具和数据的服务端 |
| **MCP Client** | 调用工具的模型端（LangChain Agent） |
| **Tools** | MCP Server 暴露的工具 |
| **Resources** | MCP Server 暴露的数据 |

## 使用方式

```typescript
import { createAgent } from "langchain";
import { MCPClient } from "langchain/mcp";

// ① 连接 MCP Server
const mcpClient = new MCPClient({
  serverUrl: "http://localhost:3001",
});

// ② 获取 MCP Server 提供的工具
const tools = await mcpClient.getTools();

// ③ 创建 Agent，自动使用 MCP 工具
const agent = createAgent({
  model: "openai:gpt-4o",
  tools,
});
```

## 适用场景

- 统一管理多个工具服务
- 工具提供者和消费者解耦
- 跨团队/跨公司共享工具

## 下一步

- [工具](/langchain/tools)
- [集成](/integrations/)
