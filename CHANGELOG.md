# Changelog

All notable changes to Ceramic Design System are documented here.

## 0.3.0 — 2026-07-15

### Added

- Playwright regression coverage for desktop navigation, mobile navigation, keyboard access, MCP tooling, and cross-platform visual baselines.
- A global `⌘K` / `Ctrl+K` command palette for components, documentation, semantic tokens, themes, and MCP tooling.
- A shared component workbench with package-import copy, RTL and dark previews, accessibility checks, and related-component navigation.
- An MCP Playground that exposes the verified package contract, correct stdio configuration, available tools, JSON-RPC requests, and typed browser-mirror responses.
- GitHub Actions coverage for UI regression tests on every pull request and push to `main`.

### Changed

- Component documentation now reports the installed package version instead of a stale hardcoded version.
- The CLI capability manifest and generated project dependencies now target the `0.3.x` release line.
- MCP, navigation, panel motion, documentation consistency, route error handling, and accessibility improvements from the previous audit are included in the formal release.

### Release checks

- TypeScript, production build, CLI protocol tests, MCP doctor, package dry-runs, desktop/mobile Playwright checks, visual snapshots, and `npm audit` must pass before publication.
