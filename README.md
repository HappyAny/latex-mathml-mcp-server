# LaTeX to MathML MCP Server

A Model Context Protocol (MCP) server that converts LaTeX mathematical expressions to MathML format. And this README.md is written by DeepSeek V3.

## Features

- Converts LaTeX mathematical expressions to MathML
- Provides both tool-based conversion and resource-based access
- Standard MCP protocol implementation for easy integration
- Lightweight and fast conversion using MathJax-node

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/latex-mathml-mcp-server.git
   cd latex-mathml-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install mathjax-node
   npm install @modelcontextprotocol/sdk
   ```

## Usage

### Starting the Server

Run the server using Node.js:
```bash
node index.js
```

The server will start and listen for MCP client connections via stdio transport.

### Available Services

1. **Tool-based Conversion**:
   - Tool name: `latex2mathml`
   - Input: LaTeX string
   - Output: MathML string

2. **Resource-based Access**:
   - Resource URI pattern: `mathml://{latex_expression}`
   - Returns: MathML representation of the LaTeX expression

## Client Integration

To connect to this server from an MCP client, add the following configuration to your client's settings:

```json
{
    "mcpServers": {
        "latex-mathml-server": {
            "isActive": true,
            "command": "node",
            "args": [
                "path_to_your_server/index.js"
            ]
        }
    }
}
```

Replace `path_to_your_server/index.js` with the actual path to the server script.

## API Details

### Tool: latex2mathml

**Request Format**:
```json
{
    "latex": "your_LaTeX_expression"
}
```

**Example Request**:
```json
{
    "latex": "E = mc^2"
}
```

**Response Format**:
```json
{
    "content": [
        {
            "type": "text",
            "text": "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">...</math>"
        }
    ]
}
```

### Resource: mathml://{id}

Access mathematical expressions as resources using the URI pattern:
```
mathml://E%20%3D%20mc%5E2
```

(Note: LaTeX expressions should be URL-encoded in the resource URI)

## Development

### Dependencies

- `@modelcontextprotocol/sdk`: MCP server SDK
- `mathjax-node`: LaTeX to MathML conversion
- `zod`: Input validation

### Building

This is a Node.js project. Simply clone and install dependencies as shown in the Installation section.

## License

MIT
