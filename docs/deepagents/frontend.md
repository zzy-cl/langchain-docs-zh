---
title: 前端集成
description: 构建 UI 来展示 Agent 实时流、任务进度和沙箱
---

# 前端集成

## 能做什么？

| 功能 | 说明 |
|------|------|
| **子 Agent 流式展示** | 实时显示每个子 Agent 的工作进度 |
| **Todo List** | 任务清单，实时同步 Agent 状态 |
| **沙箱 UI** | IDE 风格的代码编辑和执行界面 |

## 使用方式

```typescript
import { createDeepAgent } from "deepagents";
import { useAgentStream } from "deepagents/frontend";

// React 组件中
function AgentChat() {
  const { messages, status, send } = useAgentStream({
    endpoint: "/api/agent",
  });

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      {status === "thinking" && <div>Agent 正在思考...</div>}
    </div>
  );
}
```

## Todo List 同步

```typescript
const agent = createDeepAgent({
  todoList: true, // 开启任务清单同步
});

// Agent 执行时会自动更新 todo 状态
// 前端实时接收更新
```

## 下一步

- [流式输出](/deepagents/streaming)
- [LangChain 前端集成](/langchain/frontend)
