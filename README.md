# Utopia Design System

Standalone design-system production for Utopia Studio.

This workspace is the parent system. Production websites are consumers and reference implementations under this design-system contract.

## Structure

- `src/`: standalone design-system home app.
- `packages/design-system/src/core.css`: core semantic token contract.
- `packages/design-system/src/themes/`: theme CSS implementations.
- `packages/design-system/src/manifests/`: AI-readable source of truth.
- `packages/design-system-cli/`: local CLI for AI discovery.
- `docs/design-system/`: human and AI docs.

## Commands

```sh
npm install
npm run dev
npm run build
npm run ds -- component --list --dense
npm run ds -- template --list --dense
npm run ds -- docs arabic-friendly --dense
npm run ds -- doctor
```

## Principles

- AI-first.
- shadcn/ui-founded core architecture.
- Theme-extensible: brand philosophy belongs to the active theme, not core.
- Arabic-friendly.
- Production websites are consumers, not reusable source.

## Core vs Theme

Core owns component architecture, semantic token roles, accessibility, Arabic-friendly behavior, and AI-readable contracts.

Utopia Default owns the Utopia Studio brand policy: Brick Red, Special Black, TWK Lausanne, square geometry, border-led elevation, and the dot/bar icon system. Other themes may declare different palettes, radii, typography, icon systems, and visual philosophies.
