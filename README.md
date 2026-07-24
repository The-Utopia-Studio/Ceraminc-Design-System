# Utopia Design System

Standalone design-system production for Utopia Studio. The current public package line is `0.4.x`.

This workspace is the parent system. Production websites are consumers and reference implementations under this design-system contract.

## Structure

- `src/`: standalone design-system home app.
- `packages/design-system/src/core.css`: core semantic token contract.
- `packages/design-system/src/themes/`: theme CSS implementations.
- `packages/design-system/src/manifests/`: AI-readable source of truth.
- `packages/clerk/`: optional Clerk integration wrappers and semantic-token appearance adapters.
- `packages/design-system-cli/`: local CLI for AI discovery.
- `docs/design-system/`: human and AI docs.

## Install In A Product

```sh
npm install @utopia-studio-design/design-system
npm install @utopia-studio-design/clerk @clerk/nextjs
npm install -D @utopia-studio-design/design-system-cli
npx utopia-ds init --theme utopia-default
npx utopia-ds theme create nova
npx utopia-ds template template-saas-solution-homepage --theme nova --copy ./nova-website
```

`init` adds agent instructions for Codex/Claude, Cursor, and GitHub Copilot plus a project-local MCP configuration. All clients query the same manifests through CLI text, typed JSON, the programmatic API, or MCP.

## CSS layer contract

The core stylesheet declares `@layer reset, theme, base, components, utilities` and places design-system component rules in `components`. Import Tailwind or app utilities after the design-system stylesheet, using the `utilities` layer, so ordinary layout utilities can override component defaults without `!important` or high-specificity selectors. Theme packages may remain unlayered so their semantic-token policy keeps precedence.

Public `className` values are applied to component roots. Side Nav composition parts also expose stable `data-slot` attributes; interactive/current state uses `data-state`, and every descendant derives `data-collapsed` behavior from the `SideNav` context.

```css
@layer reset, theme, base, components, utilities;
@import '@utopia-studio-design/design-system/core.css';
@import 'tailwindcss';
```

## Workspace Commands

```sh
npm install
npm run dev
npm run build
npm run test:e2e
npm run release:check
npm run ds -- component --list --dense
npm run ds -- template --list --dense
npm run ds -- template validate ./path-to-community-template
npm run ds -- template submit ./path-to-community-template
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

## Motion adapters

Ceramic keeps theme personality separate from the application runtime. Themes select an engine-neutral profile (`ceremonial`, `swift`, or `precise`); applications select the built-in WAAPI adapter or the optional Motion for React, Anime.js, or GSAP adapter. Components request semantic `feedback`, `page`, `surface`, or `layout` motion and retain `motion={false}` as an escape hatch.

```tsx
import { getMotionThemeProfile, MotionProvider } from '@utopia-studio-design/design-system/Motion'
import { animeMotionAdapter } from '@utopia-studio-design/design-system/MotionAnime'

<MotionProvider adapter={animeMotionAdapter} themeProfile={getMotionThemeProfile(activeTheme.motionProfile)}>
  <App />
</MotionProvider>
```

`motion-profiles.json` is the runtime and MCP source of truth for timing, easing, states, orchestration, and reduced-motion behavior. Resolve a custom theme through its declared `motionProfile`, not by guessing from its theme id. Optional adapters can be loaded with `import()` when the user selects them.

## Native Select and themeable Select

`NativeSelect` preserves platform-native `<select>` semantics and mobile picker behavior. Ceramic tokens style its closed field, but the opened option menu is rendered by the operating system or browser. Full dark, light, brand, and `--popover-surface` styling is therefore not guaranteed.

Use `Select`, `SelectTrigger`, `SelectContent`, `SelectValue`, and `SelectItem` by default when the opened menu must follow design-system theme and popover tokens. `Selector` remains temporarily available as a deprecated alias for `NativeSelect` and emits a one-time warning in supported development builds.

```tsx
// Before: native menu surface
<NativeSelect defaultValue="open">
  <NativeSelectOption value="open">Open</NativeSelectOption>
</NativeSelect>

// After: fully themeable menu surface
<Select defaultValue="open">
  <SelectTrigger aria-label="Disposition"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="open">Open</SelectItem>
  </SelectContent>
</Select>
```

## Release

Published packages:

- `@utopia-studio-design/design-system@0.4.5`
- `@utopia-studio-design/design-system-cli@0.3.2`

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
