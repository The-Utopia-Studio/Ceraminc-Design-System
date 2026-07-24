# Guide

Guide pages are the operating layer of Ceramic. They define how humans and AI agents should use the design system before reaching for components, templates, or theme primitives.

## Pages

- `Getting Started`: installation, theme CSS, first component, examples, CLI discovery, Arabic-friendly entrypoint.
- `What's New`: release notes for package, manifest, theme, and docs changes.
- `Quick Start with AI`: dense setup workflow for AI coding tools.
- `Working with AI`: how manifests, docs, and examples stay machine-readable.
- `Principles`: semantic-first, shadcn-founded, theme-extensible, Arabic-friendly, AI-readable rules.
- `Theme System`: required semantic roles, Utopia Default as first theme, and future theme boundaries.
- `Arabic Friendly`: RTL-first layout, Arabic typography, mixed-script resilience, localization readiness, and icon/motion mirroring.
- `Styling Components`: safe component styling through semantic tokens and app-layer className.
- `Styling Library Interop`: Tailwind, plain CSS, CSS modules, and CSS-in-JS bridges through Ceramic CSS variables.
- `Migration Guide`: safe migration from app-local UI or raw shadcn usage into `packages/design-system`.

## Guide Contract

- Each guide page must include `Overview`, `Usage`, `Rules`, and `AI Checklist`.
- Migration pages may rename `Usage` to `Migration Order` and `Rules` to `Safe Boundaries`.
- Guide pages must not duplicate component API contracts that belong in `components.json`.
- Guide pages must not put Utopia Default visual philosophy into reusable core rules.
- Guide pages must link AI agents back to manifests, package exports, foundations, and Arabic-friendly rules.

## Navigation Composition

Ceramic owns the visual primitives for standard product navigation. Consumers provide route labels and destinations, while the design system provides icons, collapsed behavior, tooltips, current-state treatment, and surface-aware Breadcrumb colors.

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  NavigationIcon,
  PanelIcon,
  SideNavCollapseButton,
} from '@utopia-studio-design/design-system/Navigation'
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@utopia-studio-design/design-system/Sidebar'

<SideNavCollapseButton aria-expanded={!collapsed} aria-label="Collapse navigation">
  <PanelIcon />
</SideNavCollapseButton>

<SidebarMenuItem>
  <SidebarMenuButton activeVariant="both" isActive tooltip="Projects">
    <NavigationIcon name="projects" />
    <span>Projects</span>
  </SidebarMenuButton>
</SidebarMenuItem>

<div style={{ background: 'var(--surface-inverse)' }}>
  <Breadcrumb aria-label="Current location" variant="inverse">
    <BreadcrumbList>
      <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem><BreadcrumbPage>Projects</BreadcrumbPage></BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</div>
```

- Use `NavigationIcon` instead of an app-owned icon package or raw SVG for standard destinations.
- Keep `tooltip` on collapsed Sidebar items; it also supplies an accessible name when no explicit `aria-label` is provided.
- Use `activeVariant="indicator"` or `"both"` when current navigation needs the logical inline-start accent. The default `"background"` variant remains backward compatible.
- `isActive` supplies `aria-current="page"` unless the consumer explicitly provides another valid value.
- Use `Breadcrumb variant="inverse"` on `--surface-inverse`; do not remap `--foreground` or add component selectors in the consuming app.

## AI Rule

Before generating UI, read:

1. `docs/design-system/quick-start-ai.md`
2. `docs/design-system/guide.md`
3. `docs/design-system/foundations.md`
4. `docs/design-system/arabic-friendly.md`
5. `docs/design-system/shadcn-conversion.md`
6. `packages/design-system/src/manifests/catalog.json`
7. `packages/design-system/src/manifests/components.json`
8. `packages/design-system/src/manifests/themes.json`
