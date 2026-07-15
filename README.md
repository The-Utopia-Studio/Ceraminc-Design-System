# Utopia Design System

Standalone design-system production for Utopia Studio. The current public package line is `0.3.x`.

This workspace is the parent system. Production websites are consumers and reference implementations under this design-system contract.

## Structure

- `src/`: standalone design-system home app.
- `packages/design-system/src/core.css`: core semantic token contract.
- `packages/design-system/src/themes/`: theme CSS implementations.
- `packages/design-system/src/manifests/`: AI-readable source of truth.
- `packages/design-system-cli/`: local CLI for AI discovery.
- `docs/design-system/`: human and AI docs.

## Install In A Product

```sh
npm install @utopia-studio-design/design-system
npm install -D @utopia-studio-design/design-system-cli
npx utopia-ds init --theme utopia-default
npx utopia-ds theme create nova
npx utopia-ds template template-saas-solution-homepage --theme nova --copy ./nova-website
```

`init` adds agent instructions for Codex/Claude, Cursor, and GitHub Copilot plus a project-local MCP configuration. All clients query the same manifests through CLI text, typed JSON, the programmatic API, or MCP.

## Workspace Commands

```sh
npm install
npm run dev
npm run build
npm run test:e2e
npm run release:check
npm run ds -- component --list --dense
npm run ds -- template --list --dense
npm run ds -- theme create nova
npm run ds -- docs arabic-friendly --dense
npm run ds -- manifest --json
npm run ds -- search "Arabic data table" --json
npm run ds:mcp
npm run ds -- doctor
```

## Agent Interfaces

- CLI: `npx utopia-ds component Button --json`
- Programmatic API: `@utopia-studio-design/design-system-cli/api`
- MCP: `npx --package @utopia-studio-design/design-system-cli utopia-ds mcp`
- Capability discovery: `npx utopia-ds manifest --json`
- Static crawler entrypoint: `/llms.txt`
- Platform roadmap and release gates: `docs/design-system/ai-platform-plan.md`
- Browser MCP contract inspector: `#/docs/mcp-playground`
- Global documentation search: `⌘K` on macOS or `Ctrl+K` elsewhere

## Release

Published packages:

- `@utopia-studio-design/design-system@0.3.0`
- `@utopia-studio-design/design-system-cli@0.3.0`

Run `npm run release:check` before publishing. It gates the release on TypeScript, MCP protocol tests, desktop/mobile Playwright coverage, visual baselines, component audits, production builds, and package dry-runs. See `CHANGELOG.md` for release notes.

## Principles

- AI-first.
- shadcn/ui-founded core architecture.
- Theme-extensible: brand philosophy belongs to the active theme, not core.
- Arabic-friendly.
- Production websites are consumers, not reusable source.

## Core vs Theme

Core owns component architecture, semantic token roles, accessibility, Arabic-friendly behavior, and AI-readable contracts.

Utopia Default owns the Utopia Studio brand policy: Brick Red, Special Black, TWK Lausanne, square geometry, border-led elevation, and the dot/bar icon system. Other themes may declare different palettes, radii, typography, icon systems, and visual philosophies.
