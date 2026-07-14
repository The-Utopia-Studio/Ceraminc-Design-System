# Quick Start with AI

Ceramic follows the Astryx principle that humans, coding agents, build tools, and MCP clients use the same source of truth. The docs site does not maintain a separate component contract.

## Paste This Into Your AI

```text
Install @utopia-studio-design/design-system and @utopia-studio-design/design-system-cli. Run `npx utopia-ds init --theme utopia-default`. Read the generated AGENTS.md and active theme config. Before editing UI, run `npx utopia-ds manifest --json`, search for the intended pattern, inspect its component or template contract, and read the Arabic-friendly guide when the product supports Arabic or RTL. Do not invent props, imports, tokens, or localized copy.
```

## Install

```sh
npm install @utopia-studio-design/design-system
npm install -D @utopia-studio-design/design-system-cli
npx utopia-ds init --theme utopia-default
```

The init command creates:

- `AGENTS.md` and `CLAUDE.md`
- `.cursor/rules/ceramic-design-system.mdc`
- `.github/copilot-instructions.md`
- `.ceramic/config.json`
- `.mcp.json`
- stable `ceramic` and `ceramic:doctor` npm scripts

## Add Theme CSS

```css
@import '@utopia-studio-design/design-system/core.css';
@import '@utopia-studio-design/design-system/themes/utopia-default.css';
```

## Add A Component

```tsx
import { Button } from '@utopia-studio-design/design-system/Button'

export function SaveAction() {
  return <Button>Save changes</Button>
}
```

## Set Motion Policy

Ceramic maps BeUI-inspired interaction patterns to semantic roles: `press`, `page`, `expand`, `reveal`, and `icon`. Set the application default once and override only when a local workflow needs to be static.

```tsx
import { MotionProvider } from '@utopia-studio-design/design-system/Motion'
import { Button } from '@utopia-studio-design/design-system/Button'

export function App() {
  return (
    <MotionProvider motion>
      <Button>Animated by the press contract</Button>
      <Button motion={false}>Static override</Button>
    </MotionProvider>
  )
}
```

Never bypass `MotionProvider`, semantic motion tokens, or `prefers-reduced-motion`. The `motion` prop changes transition behavior, not component state or accessibility.

## Discover Before Generating

```sh
npx utopia-ds manifest --json
npx utopia-ds search "Arabic settings form" --json
npx utopia-ds component Button --json
npx utopia-ds template --list --json
npx utopia-ds template template-saas-solution-homepage --copy ./saas-solution-website
npx utopia-ds theme utopia-default --json
npx utopia-ds docs arabic-friendly --dense
npx utopia-ds doctor --json
```

Use `--dense` for small prompt context and `--json` for automation. Every JSON success response uses `{ apiVersion, type, data, meta }`; errors use `{ apiVersion, error, code, suggestions }`.

## MCP

The MCP server exposes the same API as the CLI. A generated `.mcp.json` uses:

```json
{
  "mcpServers": {
    "ceramic": {
      "command": "npx",
      "args": ["-y", "@utopia-studio-design/design-system-cli", "mcp"]
    }
  }
}
```

Available tools include search, component/template/theme/doc discovery, and doctor. An MCP client must never receive capabilities that the CLI cannot expose.

## Agent Decision Loop

1. Run `manifest --json` to discover supported operations.
2. Run `search <intent> --json` instead of guessing a component name.
3. Inspect the chosen template and every component contract.
4. Read the active theme and Arabic-friendly contract.
5. Implement with package exports and semantic tokens.
6. Run product tests and `doctor --json` before handoff.

## Core And Theme Boundary

Core owns shadcn-style architecture, semantic roles, accessibility, Arabic-friendly baseline behavior, and agent-readable contracts. Themes own brand visual philosophy. Utopia Default owns Brick Red, Special Black, TWK Lausanne, IBM Plex Sans Arabic, square geometry, and its declared icon policy.
