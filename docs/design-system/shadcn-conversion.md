# shadcn/ui Conversion Contract

Utopia Design System uses shadcn/ui as the implementation foundation, not as a visual theme.

## Rules

- Keep `components.json` pointed at `packages/design-system/src/components`.
- Convert shadcn source into Utopia package exports before app usage.
- Components consume semantic tokens such as `--background`, `--foreground`, `--surface`, `--border`, `--radius-control`, and `--radius-surface`.
- Do not copy raw shadcn colors, default radius assumptions, or left/right-only layout rules into reusable components.
- Utopia Default Theme maps the semantic contract to the current Utopia brand. Other themes may map it differently.
- Arabic-friendly behavior is required: logical CSS properties, `dir="rtl"` checks, mixed-script text tolerance, and no invented Arabic production copy.

## Workflow

```bash
pnpm dlx shadcn@latest init
```

The project already has a `components.json` file. Do not overwrite it unless the Utopia DS aliases are preserved.

```bash
npm run ds -- component --list --dense
npm run ds -- component "Accordion" --dense
```

Use the dense CLI output to pick the Utopia package import. If a component still points to `ShadcnPrimitives`, it has a safe semantic wrapper and should be specialized before complex production usage.

## Current Source Of Truth

- shadcn setup: `components.json`
- Utopia catalog: `packages/design-system/src/manifests/catalog.json`
- Component contracts: `packages/design-system/src/manifests/components.json`
- Safe conversion wrappers: `packages/design-system/src/components/ShadcnPrimitives.tsx`
- Core semantic styling: `packages/design-system/src/core.css`
