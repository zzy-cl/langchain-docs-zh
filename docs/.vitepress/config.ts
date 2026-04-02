import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LangChain 中文文档',
  description: 'Deep Agents / LangChain / LangGraph 中文学习指南',
  base: '/langchain-docs-zh/',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'LangChain 中文文档',

    nav: [
      { text: '首页', link: '/' },
      { text: '概述', link: '/overview/' },
      { text: 'Deep Agents', link: '/deepagents/' },
      { text: 'LangChain', link: '/langchain/' },
      { text: 'LangGraph', link: '/langgraph/' },
      { text: '集成', link: '/integrations/' },
      { text: '实战', link: '/tutorials/' },
      { text: 'GitHub', link: 'https://github.com/zzy-cl/langchain-docs-zh' }
    ],

    sidebar: {
      '/overview/': [
        {
          text: '概述',
          items: [
            { text: '产品关系与选型指南', link: '/overview/product-comparison' },
            { text: '框架 vs 运行时 vs Harness', link: '/overview/frameworks-runtimes-harnesses' },
            { text: '核心概念', link: '/overview/concepts' },
            { text: '快速开始', link: '/overview/quickstart' }
          ]
        }
      ],

      '/deepagents/': [
        {
          text: '🪄 Deep Agents',
          items: [
            { text: '概览', link: '/deepagents/' },
            { text: '快速开始', link: '/deepagents/quickstart' },
            { text: '创建 Agent', link: '/deepagents/creation' },
            { text: '自定义 Deep Agents', link: '/deepagents/customization' },
            { text: '工具（Tools）', link: '/deepagents/tools' },
            { text: '子 Agent（Subagents）', link: '/deepagents/subagents' },
            { text: '异步子 Agent', link: '/deepagents/async-subagents' },
            { text: '文件系统 & Backends', link: '/deepagents/backends' },
            { text: '上下文工程', link: '/deepagents/context-engineering' },
            { text: '记忆（Memory）', link: '/deepagents/memory' },
            { text: '技能（Skills）', link: '/deepagents/skills' },
            { text: '沙箱（Sandboxes）', link: '/deepagents/sandboxes' },
            { text: '流式输出（Streaming）', link: '/deepagents/streaming' },
            { text: '模型配置（Models）', link: '/deepagents/models' },
            { text: 'Agent Harness 能力', link: '/deepagents/harness' },
            { text: '人工介入', link: '/deepagents/human-in-the-loop' },
            { text: 'ACP 协议集成', link: '/deepagents/acp' },
            { text: '前端集成', link: '/deepagents/frontend' },
            { text: '生产部署', link: '/deepagents/going-to-production' },
            { text: '对比 Claude Agent SDK / Codex', link: '/deepagents/comparison' },
            { text: 'CLI 工具', link: '/deepagents/cli' }
          ]
        },
        {
          text: '实战教程',
          items: [
            { text: '构建内容写作 Agent', link: '/deepagents/tutorials/content-builder' },
            { text: '构建深度研究 Agent', link: '/deepagents/tutorials/deep-research' }
          ]
        }
      ],

      '/langchain/': [
        {
          text: '🦜 LangChain',
          items: [
            { text: '概览', link: '/langchain/' },
            { text: '设计哲学', link: '/langchain/philosophy' },
            { text: '安装', link: '/langchain/install' },
            { text: '组件架构', link: '/langchain/component-architecture' },
            { text: '运行时（Runtime）', link: '/langchain/runtime' },
            { text: '消息（Messages）', link: '/langchain/messages' }
          ]
        },
        {
          text: 'Agent',
          items: [
            { text: '创建 Agent', link: '/langchain/agents/creation' },
            { text: '工具调用', link: '/langchain/agents/tool-calling' },
            { text: '流式输出', link: '/langchain/agents/streaming' },
            { text: '结构化输出', link: '/langchain/agents/structured-output' },
            { text: 'Guardrails 安全检查', link: '/langchain/agents/guardrails' },
            { text: '人工介入', link: '/langchain/agents/human-in-the-loop' }
          ]
        },
        {
          text: '核心模块',
          items: [
            { text: 'Models（模型）', link: '/langchain/models' },
            { text: 'Prompts（提示词）', link: '/langchain/prompts' },
            { text: 'Chains（链）', link: '/langchain/chains' },
            { text: 'Tools（工具）', link: '/langchain/tools' },
            { text: 'Middleware（中间件）', link: '/langchain/middleware' }
          ]
        },
        {
          text: '记忆 & 检索',
          items: [
            { text: '短期记忆', link: '/langchain/short-term-memory' },
            { text: '长期记忆', link: '/langchain/long-term-memory' },
            { text: 'Retrieval / RAG', link: '/langchain/retrieval' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: 'MCP（模型上下文协议）', link: '/langchain/mcp' },
            { text: 'Multi-Agent 多 Agent', link: '/langchain/multi-agent' },
            { text: '前端集成', link: '/langchain/frontend' },
            { text: '可观测性', link: '/langchain/observability' },
            { text: '部署', link: '/langchain/deployment' }
          ]
        },
        {
          text: '实战教程',
          items: [
            { text: '构建 RAG Agent', link: '/langchain/tutorials/rag-agent' },
            { text: '构建 SQL Agent', link: '/langchain/tutorials/sql-agent' },
            { text: '语义搜索引擎', link: '/langchain/tutorials/semantic-search' },
            { text: '客服系统', link: '/langchain/tutorials/customer-support' }
          ]
        }
      ],

      '/langgraph/': [
        {
          text: '🔷 LangGraph',
          items: [
            { text: '概览', link: '/langgraph/' },
            { text: '快速开始', link: '/langgraph/quickstart' },
            { text: '安装', link: '/langgraph/install' },
            { text: '思维方式', link: '/langgraph/thinking' },
            { text: '工作流 vs Agent', link: '/langgraph/workflows-agents' },
            { text: '两种 API 怎么选', link: '/langgraph/api-choice' }
          ]
        },
        {
          text: 'API',
          items: [
            { text: 'Graph API', link: '/langgraph/graph-api' },
            { text: 'Functional API', link: '/langgraph/functional-api' }
          ]
        },
        {
          text: '核心概念',
          items: [
            { text: 'State（状态）', link: '/langgraph/state' },
            { text: 'Nodes（节点）', link: '/langgraph/nodes' },
            { text: 'Edges（边）', link: '/langgraph/edges' },
            { text: 'Interrupts（中断）', link: '/langgraph/interrupts' },
            { text: 'Subgraphs（子图）', link: '/langgraph/subgraphs' }
          ]
        },
        {
          text: '高级功能',
          items: [
            { text: '持久化（Persistence）', link: '/langgraph/persistence' },
            { text: '持久化执行', link: '/langgraph/durable-execution' },
            { text: '人工介入', link: '/langgraph/human-in-the-loop' },
            { text: '时间旅行', link: '/langgraph/time-travel' },
            { text: '流式输出', link: '/langgraph/streaming' }
          ]
        },
        {
          text: '部署 & 工具',
          items: [
            { text: '应用结构', link: '/langgraph/application-structure' },
            { text: '本地服务器', link: '/langgraph/local-server' },
            { text: '运行时（Pregel）', link: '/langgraph/pregel' },
            { text: '可观测性', link: '/langgraph/observability' },
            { text: 'Studio 调试', link: '/langgraph/studio' },
            { text: '部署', link: '/langgraph/deployment' }
          ]
        },
        {
          text: '实战',
          items: [
            { text: '案例研究', link: '/langgraph/case-studies' },
            { text: '自定义 RAG Agent', link: '/langgraph/tutorials/custom-rag' }
          ]
        }
      ],

      '/integrations/': [
        {
          text: '🔗 集成',
          items: [
            { text: '概览', link: '/integrations/' },
            { text: 'Chat 模型', link: '/integrations/chat' },
            { text: 'Embedding 模型', link: '/integrations/embeddings' },
            { text: '文档加载器', link: '/integrations/document-loaders' },
            { text: '文档转换器', link: '/integrations/document-transformers' },
            { text: '文本切分器', link: '/integrations/splitters' },
            { text: '检索器', link: '/integrations/retrievers' },
            { text: '存储', link: '/integrations/stores' },
            { text: '工具', link: '/integrations/tools' },
            { text: '中间件', link: '/integrations/middleware' },
            { text: '回调', link: '/integrations/callbacks' },
            { text: '缓存', link: '/integrations/caching' }
          ]
        }
      ],

      '/tutorials/': [
        {
          text: '💡 实战案例',
          items: [
            { text: '总览', link: '/tutorials/' },
            { text: '从零搭建 RAG 问答系统', link: '/tutorials/rag-qa' },
            { text: '构建能搜索的 Agent', link: '/tutorials/search-agent' },
            { text: '多 Agent 协作任务', link: '/tutorials/multi-agent' }
          ]
        }
      ]
    },

    outline: false,

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/xxx/langchain-docs-zh/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: '基于 Apache 2.0 许可证发布',
      copyright: 'Copyright © 2026 LangChain 中文文档'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xxx/langchain-docs-zh' }
    ],

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单'
  },

  head: [
    ['meta', { name: 'keywords', content: 'LangChain, LangGraph, Deep Agents, 中文文档, TypeScript, AI Agent, LLM' }],
    ['meta', { name: 'author', content: 'LangChain 中文文档团队' }]
  ]
})
