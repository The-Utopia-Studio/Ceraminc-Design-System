# SaaS Solution Website

A production-oriented Ceramic template for a complete product-led SaaS website. It uses Linear only as an information-architecture reference: compact value proposition, early product proof, progressive feature depth, dedicated proof and adoption surfaces, and consistent navigation across the site. No Linear copy, brand primitives, or assets are included.

## Run

```bash
npm run dev -- --host 127.0.0.1 --port 3017
```

Open `/templates/saas-solution-homepage/index.html?seed=1974341818#agents`.

## Page family

- `/index.html` — homepage narrative
- `/product/` — product overview
- `/agents/` — agent and automation detail
- `/integrations/` — integration directory
- `/integrations/slack/` — integration detail
- `/customers/` — customer story index
- `/customers/aster-labs/` — customer case study
- `/pricing/` — pricing, comparison, and FAQ
- `/changelog/` — product updates
- `/contact-sales/` — sales form and success state

Every page preserves the `seed` query parameter through internal navigation.

## Package import

```tsx
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TopNav,
  TopNavItem,
} from '@utopia-studio-design/design-system'
import '@utopia-studio-design/design-system/core.css'
import '@utopia-studio-design/design-system/themes/utopia-default.css'
```

Use `data-theme="utopia-default"` on the document root. The template consumes semantic roles only. It uses logical CSS properties, mirrors directional icons in RTL, supports mixed Arabic and English data, and reads the `seed` query parameter deterministically.

## Adaptation boundaries

- Replace seeded names, metrics, pricing, and claims before production.
- Keep the section sequence when the product story depends on workflow depth; remove a section only when the buying criterion is genuinely absent.
- Replace the demo interface with reviewed product UI while preserving accessible labels and keyboard behavior.
- Extend semantic tokens in the active theme instead of adding brand literals to reusable components.
