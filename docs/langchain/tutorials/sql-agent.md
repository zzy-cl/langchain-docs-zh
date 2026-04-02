---
title: 构建 SQL Agent
description: 用自然语言查询数据库的 Agent
---

# 构建 SQL Agent

## 目标

用自然语言查数据库——"上个月销售额最高的产品是什么？" Agent 自动写 SQL、执行、返回结果。

## 实现

```typescript
import { createAgent, tool } from "langchain";
import { z } from "zod";
import Database from "better-sqlite3";

// ① 连接数据库
const db = new Database(":memory:");
db.exec(`
  CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, sales INTEGER);
  INSERT INTO products VALUES (1, 'iPhone', 999, 1500);
  INSERT INTO products VALUES (2, 'MacBook', 1999, 800);
  INSERT INTO products VALUES (3, 'AirPods', 199, 3000);
`);

// ② 定义 SQL 查询工具
const queryDB = tool(
  ({ sql }) => {
    try {
      const rows = db.prepare(sql).all();
      return JSON.stringify(rows, null, 2);
    } catch (error) {
      return `SQL 错误：${error.message}`;
    }
  },
  {
    name: "query_db",
    description: "执行 SQL 查询并返回结果。表结构：products(id, name, price, sales)",
    schema: z.object({ sql: z.string().describe("要执行的 SQL 语句") }),
  }
);

// ③ 创建 Agent
const agent = createAgent({
  model: "openai:gpt-4o",
  tools: [queryDB],
  system: `你是一个数据库助手。
表结构：products(id INTEGER, name TEXT, price REAL, sales INTEGER)
根据用户的问题生成 SQL 查询，执行后用通俗语言解释结果。`,
});

// ④ 调用
const result = await agent.invoke({
  messages: [{ role: "user", content: "销量最高的产品是什么？" }],
});
// Agent 会自动写 SELECT * FROM products ORDER BY sales DESC LIMIT 1 然后回答
```

## ⚠️ 安全提醒

- **永远不要让用户直接写 SQL** — Agent 生成 SQL 后做白名单校验
- **只读数据库** — 生产环境用只读账号
- **限制结果数量** — `LIMIT 100`

## 下一步

- [语义搜索引擎](/langchain/tutorials/semantic-search)
- [工具](/langchain/tools)
