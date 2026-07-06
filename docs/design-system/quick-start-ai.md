# Quick Start with AI

Paste this into your AI coding tool:

```text
Install the Utopia Design System project dependencies, run `npm run ds docs quick-start-ai --dense`, then read `packages/design-system/src/manifests/catalog.json`, `themes.json`, the active theme policy manifest, `components.json`, and `templates.json` before generating UI. Use shadcn/ui as the foundation, consume semantic tokens only, keep reusable components Arabic-friendly, and never treat production websites as the source of reusable design-system logic.
```

## AI Workflow

```sh
npm run ds -- template --list --dense
npm run ds -- template <id> --skeleton --dense
npm run ds -- component Button --dense
npm run ds -- docs arabic-friendly --dense
npm run ds -- theme utopia-default --dense
```

## Core vs Theme

Core owns shadcn-style component architecture, semantic token roles, accessibility, Arabic-friendly baseline behavior, and the theme extension mechanism.

Themes own brand-specific visual philosophy. Utopia Default owns Brick Red, Special Black, TWK Lausanne, square geometry, border-led elevation, and the dot/bar icon policy. Do not apply those restrictions to other themes unless their manifests declare them.
