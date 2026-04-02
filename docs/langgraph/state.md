---
title: State（状态）
description: LangGraph 中的状态管理和状态通道
---

# State（状态）

## 这是什么？

状态 = 图在执行过程中记住的所有信息。就像游戏存档——每个节点读取存档、修改存档，然后传给下一个节点。

## 状态通道

```typescript
const graph = new StateGraph({
  channels: {
    // 消息列表：新消息追加到后面
    messages: {
      value: (existing, update) => existing.concat(update),
      default: () => [],
    },
    // 计数器：直接覆盖
    count: {
      value: (existing, update) => update,
      default: () => 0,
    },
    // 用户名：直接覆盖
    userName: {
      value: (existing, update) => update,
      default: () => "",
    },
  },
});
```

## 状态更新规则

| 更新方式 | 示例 | 说明 |
|----------|------|------|
| **覆盖** | `count: 5` | 直接替换旧值 |
| **追加** | `messages: [newMsg]` | 新值追加到旧值后面 |
| **合并** | `data: { ...old, ...new }` | 深度合并 |

## 节点读写状态

```typescript
graph.addNode("greet", async (state) => {
  // ① 读取状态
  const name = state.userName;

  // ② 返回状态更新（不是完整状态）
  return {
    messages: [{ role: "assistant", content: `你好，${name}！` }],
    count: state.count + 1,
  };
});
```

## 下一步

- [Nodes（节点）](/langgraph/nodes)
- [Edges（边）](/langgraph/edges)
