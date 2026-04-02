---
title: 可观测性
description: 用 LangSmith 监控 LangGraph 的执行
---

# 可观测性

## 配置

```bash
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_API_KEY=lsv2_xxx
export LANGCHAIN_PROJECT=my-langgraph-app
```

## 自动追踪

开启环境变量后，LangGraph 的每次执行都会自动记录到 LangSmith：

- 每个节点的输入/输出
- 状态流转路径
- 耗时和 token 消耗
- 错误信息

## 查看追踪

访问 [smith.langchain.com](https://smith.langchain.com)，可以看到：
- 完整的执行图（可视化）
- 每个节点的详细信息
- 时间旅行（回溯历史）

## 下一步

- [Studio 调试](/langgraph/studio)
- [LangChain 可观测性](/langchain/observability)
