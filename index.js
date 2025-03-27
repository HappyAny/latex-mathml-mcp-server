import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as mj from "mathjax-node";

// 初始化MathJax
mj.config({
  MathJax: {
    loader: { load: ['input/tex', 'output/mml'] }
  }
});
mj.start();

// 创建MCP服务器
const server = new McpServer({
  name: "LaTeX2MathML",
  version: "1.0.0"
});

// 添加LaTeX转MathML工具
server.tool("latex2mathml",
  { latex: z.string() },
  async ({ latex }) => {
    const result = await mj.typeset({
      math: latex,
      format: "TeX",
      mml: true
    });
    
    return {
      content: [{ 
        type: "text", 
        text: result.mml 
      }]
    };
  }
);

// 添加动态资源
server.resource(
  "mathml",
  new ResourceTemplate("mathml://{id}", { list: undefined }),
  async (uri, { id }) => {
    const result = await mj.typeset({
      math: id,
      format: "TeX",
      mml: true
    });
    
    return {
      contents: [{
        uri: uri.href,
        text: result.mml
      }]
    };
  }
);

// 启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);