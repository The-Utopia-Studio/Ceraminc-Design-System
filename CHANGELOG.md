# Changelog

All notable changes to Ceramic Design System are documented here.

## 0.4.5 — 2026-07-23

### Added

- Official `NavigationIcon` destination icons for standard collapsed product navigation without consumer icon packages or raw SVG paths.
- `Breadcrumb variant="inverse"` with theme-owned link, current-page, separator, hover, and focus roles for `--surface-inverse`.
- `SidebarMenuButton` active variants for background, logical inline-start indicator, or both.

### Fixed

- Sidebar group labels and badges now use the shipped `--font-size-supporting` token instead of the undefined `--font-size-xs` alias.
- Active Sidebar menu buttons now expose `aria-current="page"` by default and retain official icon and tooltip affordances when collapsed.

## 0.4.4 — 2026-07-17

### Changed

- `NativeSelect` is now the canonical Forms API for native platform selection. The former `Selector` name remains as a deprecated alias with a one-time development warning where build metadata is available.
- Native Select documentation now states that the OS/browser owns the opened option menu and recommends `Select`, `SelectTrigger`, `SelectContent`, and `SelectItem` when theme and popover-token consistency is required.
- Added a Native Select → Select migration example and migrated the Ceramic template theme picker to the themeable Select composition.
- `SelectTrigger` now uses a fixed-size SVG chevron in a flex-aligned indicator slot so it remains vertically centered across fonts and browser zoom levels.

## 0.4.3 — 2026-07-17

### Added

- `UtopiaWordmarkLoader` with `sm`, `md`, and `lg` sizes, full-screen and contained layouts, localized status semantics, and reduced-motion support.
- Catalog, CLI search metadata, package entrypoint, documentation preview, and component contract coverage for the branded loader.

### Changed

- The Ceramic website now uses `UtopiaWordmarkLoader` for English and Arabic interface transitions and unmounts it from the component exit callback without fixed completion timers.

## 0.4.2 — 2026-07-17

### Fixed

- `ChatSystemMessage` now groups its optional label and body in one center column between the two separators.
- Collapsed `SideNavItem` and `SideNavCommand` controls now remain centered in the rail in both LTR and RTL layouts.

## 0.4.1 — 2026-07-17

### Added

- Independent `data-brand` and `data-color-mode` theme activation with legacy `data-theme` compatibility.
- Standard and wide container, responsive gutter, content measure, and marketing H1/H2/H3 token contracts.
- Barrier Intelligence detector-active and assurance-state semantic token families.
- Barrier Intelligence Dark, Light, System, and reduced-motion regression coverage.

### Changed

- Dextrum now preserves its immutable brand primitives while mapping charcoal Dark and plain Light semantic modes.
- Barrier Intelligence now documents its 3D engineering asset language and loads its declared Latin mono and Arabic font families.
- Theme-level reduced-motion overrides now win over brand motion defaults in the published stylesheet order.

## 0.4.0 — 2026-07-16

### Added

- Framework-native `SideNavItem asChild` composition for Next.js and other router links without nested anchors or full-document navigation.
- `SideNavHeader`, `SideNavMain`, `SideNavFooter`, `SideNavCommand`, `SideNavStatus`, `SideNavAccount`, workspace, and auxiliary composition regions.
- Shared collapsed and density context plus stable `data-slot`, `data-state`, and `data-collapsed` hooks.
- `SideNavContent layout="stack"` and `Button contentAlign` APIs for predictable shell and action alignment.
- Desktop and mobile visual regression plus keyboard, overflow, footer pinning, and long-account-name coverage.

### Changed

- Core component CSS now participates in the documented `reset, theme, base, components, utilities` layer contract so consumer utilities can override layout defaults without `!important`.
- The Side Nav example uses the same fixed-header, scrolling-main, pinned-footer structure intended for production app shells.

## Clerk integration 0.1.0 — 2026-07-16

### Added

- An optional `@utopia-studio-design/clerk` package that keeps Clerk outside the design-system core.
- `DextrumUserButton` and `DextrumOrganizationSwitcher` wrappers with composable Clerk appearance overrides.
- A runtime-independent `@utopia-studio-design/clerk/appearance` entrypoint and token-driven Dextrum stylesheet.
- Release checks covering appearance merging, type declarations, client boundaries, and package contents.

### Boundaries

- Clerk continues to own authentication, sessions, organizations, account UI behavior, and security notices.
- The integration package owns only semantic-token styling, element-class adapters, and thin React wrappers.

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
