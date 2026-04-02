---
title: ACP 协议集成
description: 通过 Agent Client Protocol 将 Deep Agent 接入 IDE 和编辑器
---

# ACP 协议集成

## 这是什么？

ACP = **Agent Client Protocol**，一个标准化的协议，让 Deep Agent 可以接入各种 IDE 和编辑器（VS Code、Cursor、JetBrains 等）。

## 类比

> ACP 就像 USB 接口——不管你是插鼠标还是键盘，接口统一，即插即用。

## 使用方式

```typescript
import { createDeepAgent } from "deepagents";
import { serveACP } from "deepagents/acp";

const agent = createDeepAgent({
  tools: [readFile, writeFile, runCommand],
  system: "你是一个编程助手。",
});

// 启动 ACP 服务
serveACP(agent, { port: 8080 });
```

## 支持的客户端

| 客户端 | 说明 |
|--------|------|
| VS Code | 通过扩展连接 |
| Cursor | 原生支持 |
| JetBrains | 通过插件 |

## 下一步

- [CLI 工具](/deepagents/cli)
- [前端集成](/deepagents/frontend)
