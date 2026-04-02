---
title: 集成概览
description: LangChain 支持的所有模型、工具、存储等集成
---

# 集成概览

## 模型集成

| 厂商 | 包名 | 模型 |
|------|------|------|
| [OpenAI](/integrations/chat#openai) | `@langchain/openai` | gpt-4o, gpt-4o-mini |
| [Anthropic](/integrations/chat#anthropic) | `@langchain/anthropic` | claude-sonnet-4, claude-haiku-4 |
| [Google](/integrations/chat#google) | `@langchain/google-genai` | gemini-2.0-flash |
| [Azure](/integrations/chat#azure) | `@langchain/openai` | Azure OpenAI |
| [Bedrock](/integrations/chat#bedrock) | `@langchain/aws` | Claude on AWS |

## Embedding 集成

| 厂商 | 包名 |
|------|------|
| OpenAI | `@langchain/openai` |
| Azure | `@langchain/openai` |
| Bedrock | `@langchain/aws` |

## 工具集成

- 搜索（Google、Anthropic）
- 文件操作
- 数据库查询
- API 调用

## 存储集成

- 向量库（Chroma、Pinecone、Qdrant、Weaviate）
- 键值存储（Redis、MongoDB）
- 文件存储（S3、本地磁盘）

## 下一步

- [Chat 模型](/integrations/chat)
- [Embedding 模型](/integrations/embeddings)
