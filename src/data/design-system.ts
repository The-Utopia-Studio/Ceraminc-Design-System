import catalog from '../../packages/design-system/src/manifests/catalog.json'
import components from '../../packages/design-system/src/manifests/components.json'
import patterns from '../../packages/design-system/src/manifests/patterns.json'
import templates from '../../packages/design-system/src/manifests/templates.json'
import themes from '../../packages/design-system/src/manifests/themes.json'
import utopiaDefaultTheme from '../../packages/design-system/src/manifests/theme-utopia-default.json'
import dextrumTheme from '../../packages/design-system/src/manifests/theme-dextrum.json'
import barrierIntelligenceTheme from '../../packages/design-system/src/manifests/theme-barrier-intelligence.json'

export { catalog, components, patterns, templates, themes, utopiaDefaultTheme, dextrumTheme, barrierIntelligenceTheme }

export const routeMap = [
  { id: 'home', label: 'Overview', path: '/', description: 'System map and first decisions.' },
  { id: 'docs', label: 'Docs', path: '/docs', description: 'Guide, foundations, libraries, and AI setup.' },
  { id: 'components', label: 'Components', path: '/components', description: 'Component catalog and status contract.' },
  { id: 'templates', label: 'Templates', path: '/templates', description: 'Website, SaaS, and production reference templates.' },
  { id: 'themes', label: 'Themes', path: '/themes', description: 'Theme contract implementations.' },
  { id: 'arabic-friendly', label: 'Arabic Friendly', path: '/arabic-friendly', description: 'RTL and mixed-script readiness.' },
] as const

export function getArea(id: string) {
  return catalog.topLevelAreas.find((area) => area.id === id)
}

export function normalizeName(name: string) {
  return name.replace(/[^a-z0-9]/gi, '').toLowerCase()
}

export function statusForComponent(name: string) {
  const normalized = normalizeName(name)
  const available = catalog.componentStatus.available.map(normalizeName)
  const wrapped = catalog.componentStatus.utopiaWrapped.map(normalizeName)
  const fallback = catalog.componentStatus.shadcnFallback.map(normalizeName)

  if (wrapped.includes(normalized)) return 'Utopia wrapped'
  if (available.includes(normalized)) return 'available'
  if (fallback.includes(normalized)) return 'shadcn fallback'
  return 'planned'
}

export function getTemplateCategoryLabel(category: string) {
  if (category === 'website-page') return 'Website Pages'
  if (category === 'product-saas') return 'Product / SaaS'
  if (category === 'production-example') return 'Production Examples'
  return category
}

export function slugify(value: string) {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()
}

export function compareDisplayName(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

export function getComponentAreaGroups() {
  const area = getArea('components')

  return (area?.groups ?? [])
    .map((group) => ({
      ...group,
      items: [...group.items].sort(compareDisplayName),
    }))
    .sort((a, b) => compareDisplayName(a.label, b.label))
}

export function getComponentFamilies() {
  return (catalog.componentFamilies ?? []).map((family) => ({
    ...family,
    items: [...family.items].sort(compareDisplayName),
  }))
}

export function getDocFamilies() {
  return (catalog.docFamilies ?? []).map((family) => ({
    ...family,
    items: [...family.items].sort(compareDisplayName),
  }))
}

export function dextrumTypographyHref(item: string) {
  if (item === 'Marketing & Sales') return '#/docs/foundations/typography/dextrum/marketing-sales'
  if (item === 'App & Website') return '#/docs/foundations/typography/dextrum/app-website'
  return null
}
