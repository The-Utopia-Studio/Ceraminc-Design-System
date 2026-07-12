# Foundations

Foundations define the semantic contract for humans, AI agents, themes, and reusable components. Components consume roles. Themes map those roles to visual primitives. The design-system app renders these pages at `/docs/foundations/*`.

## Foundation Pages

- `All Tokens`: complete semantic contract and required roles.
- `Color`: role-based color, swatches, state matrix, and contrast/state guidance.
- `Typography`: Latin/default type, Arabic type, mixed-script rhythm, and code typography.
- `Spacing`: spacing scale plus RTL-aware logical layout rules.
- `Shape`: control, surface, size, border, and round roles across theme styles.
- `Motion`: duration/easing roles, disclosure motion, and directional motion rules.
- `Elevation`: surface hierarchy, popovers, dialogs, and border-led elevation.
- `Icons`: icon slots, icon-only actions, and directional mirroring.
- `Illustrations`: media rules, empty states, and illustration boundaries.

## Token Contract

- Use semantic roles such as `--background`, `--foreground`, `--primary`, `--secondary`, `--surface`, `--surface-elevated`, `--border`, `--ring`, `--radius-control`, `--radius-surface`, `--font-sans`, `--font-arabic-body`, and `--font-arabic-display`.
- Do not hardcode Utopia Default primitives such as Brick Red, Special Black, TWK Lausanne, or IBM Plex Sans Arabic inside reusable components.
- Use logical CSS properties: `padding-inline`, `margin-inline`, `border-inline`, `inset-inline`, `block-size`, and `inline-size`.
- Use start/end API names instead of left/right names.

## Color Contract

- Name tokens by purpose, not hue.
- Components use `--primary`, `--secondary`, `--destructive`, `--muted`, `--border`, and `--ring`.
- Themes may map those roles to brand primitives.
- Focus-visible color is required; do not remove it for visual polish.
- Disabled and selected states must remain readable in both LTR and RTL.

## Typography Contract

Arabic support is not a translation pass. Themes must define Arabic body and display roles.

- `--font-arabic`
- `--font-arabic-body`
- `--font-arabic-display`
- `--font-weight-arabic-body`
- `--font-weight-arabic-display`
- `--font-size-arabic-body`
- `--font-size-arabic-body-lg`
- `--font-size-arabic-display`
- `--line-height-arabic`
- `--line-height-arabic-body`
- `--line-height-arabic-display`
- `--tracking-arabic`
- `--tracking-arabic-display`

Latin all-caps display styling does not transfer to Arabic. For Arabic display, use scale, weight, rhythm, and Arabic display typeface tokens. Keep `text-transform: none`.

Arabic display sizing should follow the Latin display scale at about 95%, rather than making Arabic headings larger than Latin headings. Keep Arabic line-height readable for connected letterforms and diacritics.

## Spacing Contract

- Use the spacing scale through semantic layout decisions.
- Use `inline-start` and `inline-end` instead of physical left/right.
- Navigation, sidebars, drawers, tabs, pagination, carousels, progress indicators, and steppers require RTL smoke checks.
- Preserve DOM meaning and keyboard order. Do not reverse data or workflow meaning unless product rules require it.

## Shape Contract

- Controls consume `--radius-control`.
- Cards, dialogs, popovers, and other framed surfaces consume `--radius-surface`.
- Avatars, pills, and circular affordances may consume a round role when present.
- Control dimensions use size roles such as `--size-control-sm`, `--size-control-md`, and `--size-control-lg`.
- Borders use semantic width/style roles such as `--border-width-hairline`, `--border-width-focus`, and `--border-style-default`.
- Utopia Default can be square. Future themes may be rounded without component rewrites.

## Motion Contract

- Hover/focus uses fast motion.
- Disclosure, collapse, side navigation, and layout transitions use medium motion.
- Directional motion follows inline start/end, not hardcoded left/right.
- Support reduced motion for non-essential transitions.

## Elevation Contract

- Elevation is semantic hierarchy, not a mandatory shadow style.
- Utopia Default prefers border-led surfaces.
- Popovers and dialogs use elevated surface roles and focus management.
- Do not hardcode `box-shadow` recipes inside reusable component logic.

## Icon Contract

- Core owns icon slots, icon-only controls, labels, and accessibility.
- Theme manifests own icon philosophy and icon style.
- Use `lucide-react` as the default shadcn/ui icon baseline for examples and previews.
- Mirror arrows and chevrons when they mean previous/next, open/close, or inline movement.
- Do not mirror direction-neutral icons such as settings, add, download, home, camera, or panel icons unless a theme says otherwise.

## Illustration Contract

- Illustrations are theme and product media, not core component requirements.
- Empty states must work without decorative imagery.
- Use real product/place/object media when inspection matters.
- Do not use generic gradients or decorative blobs as a substitute for system content.

## Usage Sections

Every foundation page should expose:

1. `Overview`: what the foundation controls and what it does not own.
2. `Tokens`: the semantic roles and AI usage rule for each role.
3. Foundation-specific visualization: swatches, type scale, spacing scale, shape preview, motion preview, elevation surfaces, icon mirroring, or empty state media.
4. `Usage`: when to use the foundation in real UI.
5. `Best Practices`: do/don't/check guidance.
6. `AI Usage Rules`: machine-readable setup and generation instructions.
7. `Arabic / RTL Check`: compact page-specific RTL guidance. Use `All Tokens` and the Arabic Friendly page for full product mockups.

## Best Practice Baseline

- Keep primitive tokens inside theme manifests and semantic roles inside reusable components.
- Do not generate raw brand colors, shadcn visual defaults, or physical left/right spacing into reusable code.
- Verify hover, focus-visible, active, disabled, selected, expanded, loading, empty, and destructive states.
- Verify Arabic/RTL with mixed-script labels, Arabic numerals, truncation, badges, and direction-aware icons.
- Treat illustration, icon philosophy, brand-specific geometry, and display casing as theme-owned unless a component contract explicitly owns the behavior.

## AI Usage Rules

Before generating UI:

1. Read `packages/design-system/src/manifests/themes.json`.
2. Read the active theme policy manifest.
3. Read `packages/design-system/src/manifests/components.json`.
4. Use semantic tokens only.
5. Check Arabic/RTL behavior with `dir="rtl"`, `lang="ar"`, mixed-script labels, Arabic numerals, badges, truncation, focus-visible, and no invented production Arabic copy.

## Required Arabic Mockups

All Tokens and the Arabic Friendly page must include or link to these RTL previews:

- Hero or display section
- Form
- Dashboard or table
- Empty state
- Side navigation

Individual Foundation pages should show a compact Arabic / RTL check instead of repeating the full product mockups.
