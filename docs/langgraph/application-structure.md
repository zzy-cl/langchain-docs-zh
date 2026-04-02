---
title: 应用结构
description: LangGraph 项目的推荐目录结构
---

# 应用结构

## 推荐目录结构

```
my-langgraph-app/
├── src/
│   ├── graphs/
│   │   ├── research.ts      # 研究图
│   │   └── chat.ts          # 对话图
│   ├── nodes/
│   │   ├── search.ts        # 搜索节点
│   │   ├── analyze.ts       # 分析节点
│   │   └── summarize.ts     # 总结节点
│   ├── tools/
│   │   ├── web-search.ts    # 搜索工具
│   │   └── calculator.ts    # 计算工具
│   ├── state.ts             # 状态定义
│   └── server.ts            # HTTP 服务
├── package.json
├── tsconfig.json
└── .env
```

## 状态定义（state.ts）

```typescript
import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  messages: Annotation<any[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  step: Annotation<number>({
    reducer: (x, y) => y,
    default: () => 0,
  }),
});
```

## 下一步

- [本地服务器](/langgraph/local-server)
- [部署](/langgraph/deployment)
