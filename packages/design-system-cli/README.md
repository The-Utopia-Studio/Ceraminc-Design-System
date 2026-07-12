# Ceramic Design System CLI

The same structured API powers terminal output, JSON automation, generated agent instructions, and the stdio MCP server.

```sh
npm install -D @utopia-studio-design/design-system-cli
npx utopia-ds init
npx utopia-ds search "Arabic data table" --json
npx utopia-ds component DataTable --json
npx utopia-ds manifest --json
npx utopia-ds mcp
```

Programmatic consumers can import `@utopia-studio-design/design-system-cli/api`.
