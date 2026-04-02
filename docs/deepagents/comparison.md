---
title: 对比 Claude Agent SDK / Codex
description: Deep Agents 与 Claude Agent SDK、OpenAI Codex 的对比
---

# 对比 Claude Agent SDK / Codex

## 一句话对比

| 产品 | 定位 | 绑定 |
|------|------|------|
| **Deep Agents** | 模型无关的 Agent 框架 | 支持所有模型 |
| **Claude Agent SDK** | Anthropic 官方 Agent 框架 | 只支持 Claude |
| **OpenAI Codex** | OpenAI 官方编码 Agent | 只支持 GPT |

## 详细对比

| 维度 | Deep Agents | Claude Agent SDK | Codex |
|------|-------------|------------------|-------|
| 模型支持 | OpenAI / Anthropic / Google 等 | 仅 Claude | 仅 GPT |
| 子 Agent | ✅ 支持 | ✅ 支持 | ❌ 不支持 |
| 文件系统 | ✅ 内置 | ✅ 内置 | ⚙️ 有限 |
| 沙箱 | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| 记忆 | ✅ 短期+长期 | ⚙️ 有限 | ❌ 不支持 |
| 前端集成 | ✅ 提供 | ❌ 需自建 | ❌ 需自建 |
| ACP 协议 | ✅ 支持 | ❌ 不支持 | ❌ 不支持 |
| 开源 | ✅ 是 | ❌ 否 | ❌ 否 |

## 怎么选？

- **想用 Claude 且只用 Claude** → Claude Agent SDK 原生体验最好
- **想用 GPT 且只用 GPT** → Codex 更轻量
- **想灵活切换模型 / 多模型混用** → Deep Agents
- **想要最完整的功能**（子 Agent + 记忆 + 文件系统 + 前端）→ Deep Agents

## 下一步

- [Deep Agents 概览](/deepagents/)
- [产品关系与选型指南](/overview/product-comparison)
