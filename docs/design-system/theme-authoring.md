# Theme Authoring

Themes are token-contract and visual-policy implementations.

## Required Read Order

1. `packages/design-system/src/core.css`
2. `packages/design-system/src/manifests/themes.json`
3. The active theme policy manifest, such as `theme-utopia-default.json`
4. Component and template manifests

## Core Boundary

Core owns semantic roles, component APIs, accessibility, Arabic-friendly requirements, and shadcn-style architecture.

Core does not own brand palette, brand typography, icon style, brand voice, or brand-specific layout philosophy.

## Theme Boundary

A theme maps primitives to semantic roles and declares its own visual policy:

- Color primitives
- Typography family and weights
- Radius and shape
- Elevation model
- Icon policy
- Motion profile
- Copy and casing guidance

Utopia Default is strict about Brick Red, Special Black, TWK Lausanne, square geometry, and dot/bar icons. Those are not global design-system rules.
