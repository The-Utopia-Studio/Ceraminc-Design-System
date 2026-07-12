# Ceramic AI Platform Plan

## Goal

Humans and AI agents must discover, understand, apply, and validate Ceramic through the same package-owned contracts. The docs website is a renderer. CLI, JSON, programmatic API, generated agent instructions, and MCP are transport layers over the same manifests.

## Phase 1: Shared Contract - Complete

- Publishable `@utopia-studio-design/design-system` package with ESM, types, CSS, themes, and manifests.
- Publishable `@utopia-studio-design/design-system-cli` package.
- `manifest`, `search`, `component`, `template`, `theme`, `docs`, and `doctor` commands.
- Typed JSON success and error envelopes.
- `init` generation for AGENTS.md, Claude, Cursor, Copilot, Ceramic config, and MCP config.
- Programmatic API at `@utopia-studio-design/design-system-cli/api`.
- Stdio MCP server using the same query functions as the CLI.
- Package dry-run and external consumer smoke tests.

## Phase 2: Authoring Operations

1. Add `template apply` with dry-run, conflict reporting, and idempotent writes.
2. Add `swizzle` to copy component source plus dependency and token metadata.
3. Add `theme build` to validate and compile third-party theme manifests.
4. Add `upgrade` codemods with versioned migration records.
5. Add `discover` for approved external registries without silently installing code.

Every authoring command must support `--json`, `--dry-run`, deterministic output, explicit file lists, and non-zero failure codes.

## Phase 3: Agent Evaluation

- Create prompt fixtures for common website, SaaS, chat, data, Arabic, and mixed-script tasks.
- Score imports, semantic tokens, accessibility, RTL behavior, theme compliance, and invented API usage.
- Run LTR and RTL browser checks against generated fixtures.
- Make regression scores a release gate for CLI, manifest, component, and theme changes.

## MCP Client Setup

The generated `.mcp.json` works for clients that support project-local MCP configuration. Codex CLI can register the same stdio server explicitly:

```sh
codex mcp add ceramic -- npx -y @utopia-studio-design/design-system-cli mcp
```

The server exposes read-only design-system discovery. File-writing operations remain CLI commands with dry-run and explicit user control.

## Release Gates

- Package build and external tarball import pass.
- CLI text and JSON return equivalent records.
- MCP tool responses match the CLI/programmatic API.
- `init` generates valid files in a clean consumer project.
- Component manifest audit passes.
- Docs render in LTR and RTL without horizontal overflow.
- No reusable component depends on raw theme primitives or invented localization copy.
