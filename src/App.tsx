import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { catalog, dextrumTypographyHref, getComponentAreaGroups, getComponentFamilies, getDocFamilies, routeMap } from './data/design-system'
import { LocaleTransitionOverlay } from './components/LocaleTransitionOverlay'
import { TopNavigation } from './components/TopNavigation'
import { ArabicFriendlyPage } from './pages/ArabicFriendlyPage'
import { ComponentDetailPage } from './pages/ComponentDetailPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { DocsPage } from './pages/DocsPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { ThemesPage } from './pages/ThemesPage'
import { I18nProvider, categoryLabel, docsLabel, routeLabel, sideNavLabel, t, type Locale } from './i18n'
import { ThemeProvider, useTheme } from './theme'
import {
  SideNav,
  SideNavCollapseButton,
  SideNavContent,
  SideNavHeading,
  SideNavItem,
  SideNavSection,
  SideNavSearch,
  PanelIcon,
} from '../packages/design-system/src/Navigation'

const pageMap = {
  '/': DocsPage,
  '/docs': DocsPage,
  '/components': ComponentsPage,
  '/templates': TemplatesPage,
  '/themes': ThemesPage,
  '/arabic-friendly': ArabicFriendlyPage,
}

const topNav = routeMap.filter((item) => item.id !== 'home' && item.id !== 'arabic-friendly')
const docsRoute = routeMap.find((item) => item.id === 'docs')!

function slugFor(value: string) {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()
}

function getActiveAreaId(path: string) {
  if (path.startsWith('/components')) return 'components'
  if (path.startsWith('/themes')) return 'themes'
  if (path === '/' || path === '/arabic-friendly' || path.startsWith('/docs')) return 'docs'
  return path.replace('/', '')
}

function getSidebarArea(path: string) {
  return catalog.topLevelAreas.find((area) => area.id === getActiveAreaId(path)) ?? catalog.topLevelAreas[0]
}

function getToc(path: string, tab: string) {
  if (path.startsWith('/docs/guide/')) {
    if (path.endsWith('/arabic-friendly')) {
      return [
        { id: 'overview', label: 'Overview' },
        { id: 'usage', label: 'Usage' },
        { id: 'rules', label: 'Rules' },
        { id: 'rtl-preview', label: 'RTL preview' },
        { id: 'ai-checklist', label: 'AI checklist' },
      ]
    }

    if (path.endsWith('/migration-guide')) {
      return [
        { id: 'overview', label: 'Overview' },
        { id: 'migration-order', label: 'Migration order' },
        { id: 'safe-boundaries', label: 'Safe boundaries' },
        { id: 'ai-checklist', label: 'AI checklist' },
      ]
    }

    return [
      { id: 'overview', label: 'Overview' },
      { id: 'usage', label: 'Usage' },
      { id: 'rules', label: 'Rules' },
      { id: 'ai-checklist', label: 'AI checklist' },
    ]
  }

  if (path.startsWith('/docs/foundations/')) {
    const common = [
      { id: 'overview', label: 'Overview' },
      { id: 'tokens', label: 'Tokens' },
      { id: 'usage', label: 'Usage' },
      { id: 'best-practices', label: 'Best Practices' },
      { id: 'ai-usage', label: 'AI usage rules' },
      { id: 'arabic-check', label: 'Arabic / RTL check' },
    ]

    if (path.endsWith('/all-tokens')) {
      return [
        { id: 'overview', label: 'Overview' },
        { id: 'tokens', label: 'Token Contract' },
        { id: 'required-roles', label: 'Required Roles' },
        { id: 'roles', label: 'Color Roles' },
        { id: 'type-scale', label: 'Type Scale' },
        { id: 'scale', label: 'Spacing Scale' },
        { id: 'radius-preview', label: 'Radius Roles' },
        { id: 'motion-scale', label: 'Motion Scale' },
        { id: 'surface-preview', label: 'Elevation' },
        { id: 'shadcn-icons', label: 'shadcn Icons' },
        { id: 'icon-policy', label: 'Icon Policy' },
        { id: 'media-rules', label: 'Media Rules' },
        { id: 'usage', label: 'Usage' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'ai-usage', label: 'AI usage rules' },
        { id: 'arabic-preview', label: 'Arabic / RTL mockups' },
      ]
    }

    if (path.endsWith('/color')) return [common[0], common[1], { id: 'roles', label: 'Color Roles' }, { id: 'swatches', label: 'Theme Swatches' }, { id: 'states', label: 'State Matrix' }, common[2], common[3], common[4], common[5]]
    if (path.endsWith('/typography')) return [common[0], common[1], { id: 'type-scale', label: 'Type Scale' }, { id: 'dextrum-typography', label: 'Dextrum Typography' }, { id: 'arabic-display', label: 'Arabic Display' }, { id: 'mixed-script', label: 'Mixed Script' }, common[2], common[3], common[4], common[5]]
    if (path.endsWith('/spacing')) return [common[0], common[1], { id: 'scale', label: 'Spacing Scale' }, { id: 'logical-layout', label: 'Logical Layout' }, common[2], common[3], common[4], common[5]]
    if (path.endsWith('/shape')) return [common[0], common[1], { id: 'radius-preview', label: 'Radius Roles' }, { id: 'theme-variance', label: 'Theme Variance' }, common[2], common[3], common[4], common[5]]
    if (path.endsWith('/motion')) return [common[0], common[1], { id: 'motion-scale', label: 'Motion Scale' }, { id: 'mirroring-rules', label: 'Directional Motion' }, common[2], common[3], common[4], common[5]]
    if (path.endsWith('/elevation')) return [common[0], common[1], { id: 'surface-preview', label: 'Surface Preview' }, { id: 'overlay-rules', label: 'Overlay Rules' }, common[2], common[3], common[4], common[5]]
    if (path.endsWith('/icons')) return [common[0], common[1], { id: 'shadcn-icons', label: 'shadcn Icons' }, { id: 'icon-policy', label: 'Icon Policy' }, { id: 'icon-mirroring', label: 'Mirroring Rules' }, common[2], common[3], common[4], common[5]]
    if (path.endsWith('/illustrations')) return [common[0], common[1], { id: 'media-rules', label: 'Media Rules' }, { id: 'empty-state', label: 'Empty State' }, common[2], common[3], common[4], common[5]]
  }

  if (path.startsWith('/docs/libraries/')) {
    return [
      { id: 'core', label: 'Core package' },
      { id: 'cli', label: 'CLI package' },
      { id: 'shadcn', label: 'shadcn/ui foundation' },
    ]
  }

  if (path.startsWith('/components/')) {
    if (tab === 'properties') {
      return [
        { id: 'props', label: 'Props' },
      ]
    }

    return [
      { id: 'overview', label: 'Overview' },
      { id: 'usage', label: 'Usage' },
      { id: 'examples', label: 'Examples' },
      { id: 'best-practices', label: 'Best practices' },
      { id: 'props', label: 'Props' },
      { id: 'tokens', label: 'Tokens' },
      { id: 'ai-rules', label: 'AI rules' },
    ]
  }
  if (path === '/components') {
    return getComponentAreaGroups().map((group) => ({ id: group.id, label: group.label }))
  }
  if (path === '/templates') {
    return [
      { id: 'website-pages', label: 'Website Pages' },
      { id: 'product-saas', label: 'Product / SaaS' },
      { id: 'production-examples', label: 'Production Examples' },
    ]
  }
  if (path === '/themes') {
    return [
      { id: 'utopia-default', label: 'Utopia Default' },
      { id: 'dextrum', label: 'Dextrum' },
      { id: 'theme-policy', label: 'Theme policy' },
      { id: 'icon-policy', label: 'Icon policy' },
      { id: 'core-boundary', label: 'Core boundary' },
      { id: 'semantic-contract', label: 'Stable semantic contract' },
    ]
  }
  if (path === '/docs/foundations/typography/dextrum/marketing-sales') {
    return [
      { id: 'overview', label: 'Overview' },
      { id: 'pairing', label: 'Font pairing' },
      { id: 'tokens', label: 'Token mapping' },
      { id: 'specimens', label: 'Specimens' },
      { id: 'usage', label: 'Usage' },
      { id: 'ai-rules', label: 'AI rules' },
    ]
  }
  if (path === '/docs/foundations/typography/dextrum/app-website') {
    return [
      { id: 'overview', label: 'Overview' },
      { id: 'pairing', label: 'Font pairing' },
      { id: 'tokens', label: 'Token mapping' },
      { id: 'specimens', label: 'Specimens' },
      { id: 'usage', label: 'Usage' },
      { id: 'ai-rules', label: 'AI rules' },
    ]
  }
  if (path === '/arabic-friendly') {
    return [
      { id: 'arabic-preview', label: 'Arabic preview' },
      { id: 'contract', label: 'Contract' },
      { id: 'typography', label: 'Typography' },
      { id: 'api-naming', label: 'API naming' },
      { id: 'ai-rule', label: 'AI rule' },
      { id: 'ai-entrypoints', label: 'AI entrypoints' },
    ]
  }
  return [
    { id: 'quick-start-ai', label: 'Quick Start with AI' },
    { id: 'install', label: 'Install' },
    { id: 'add-theme-css', label: 'Add the theme CSS' },
    { id: 'add-first-component', label: 'Add your first component' },
    { id: 'customize', label: 'Customize with className' },
    { id: 'example-apps', label: 'Example Apps' },
    { id: 'explore-cli', label: 'Explore the CLI' },
    { id: 'arabic-friendly', label: 'Arabic Friendly' },
  ]
}

function getTocHref(path: string, tab: string, id: string) {
  const normalizedPath = path === '/' ? '/docs' : path
  if (path.startsWith('/components/') && tab === 'properties') {
    return `#${normalizedPath}?tab=properties#${id}`
  }

  return `#${normalizedPath}#${id}`
}

function getHashParts() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  const [pathWithQuery, section = ''] = hash.split('#')
  const [path = '/', query = ''] = pathWithQuery.split('?')
  return {
    path: path || '/',
    section,
    tab: new URLSearchParams(query).get('tab') ?? 'overview',
  }
}

function getCurrentPath() {
  return getHashParts().path
}

function getCurrentSection() {
  return getHashParts().section
}

function getCurrentTab() {
  return getHashParts().tab
}

function getInitialLocale(): Locale {
  const urlLocale = new URLSearchParams(window.location.search).get('lang')
  if (urlLocale === 'ar' || urlLocale === 'en') return urlLocale
  const savedLocale = window.localStorage.getItem('utopia-ds-locale')
  return savedLocale === 'ar' ? 'ar' : 'en'
}

export function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}

function AppShell() {
  const { brand } = useTheme()
  const [path, setPath] = useState(getCurrentPath)
  const [section, setSection] = useState(getCurrentSection)
  const [tab, setTab] = useState(getCurrentTab)
  const [componentSearch, setComponentSearch] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null)
  const transitionTimers = useRef<number[]>([])
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  function clearLocaleTransitionTimers() {
    transitionTimers.current.forEach((timer) => window.clearTimeout(timer))
    transitionTimers.current = []
  }

  function transitionLocale(nextLocale: Locale) {
    if (nextLocale === locale || nextLocale === pendingLocale) return
    clearLocaleTransitionTimers()
    setPendingLocale(nextLocale)
    transitionTimers.current = [
      window.setTimeout(() => {
        setLocale(nextLocale)
      }, 1320),
      window.setTimeout(() => {
        setPendingLocale(null)
      }, 2300),
    ]
  }

  useEffect(() => {
    const handleHashChange = () => {
      setPath(getCurrentPath())
      setSection(getCurrentSection())
      setTab(getCurrentTab())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (!section) return
    const scrollToSection = () => document.getElementById(section)?.scrollIntoView({ block: 'start' })
    window.requestAnimationFrame(scrollToSection)
    const timeout = window.setTimeout(scrollToSection, 100)
    return () => window.clearTimeout(timeout)
  }, [path, section])

  useEffect(() => {
    document.documentElement.lang = locale === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = dir
    window.localStorage.setItem('utopia-ds-locale', locale)
  }, [dir, locale])

  useEffect(() => () => clearLocaleTransitionTimers(), [])

  const route = useMemo(() => {
    if (path.startsWith('/components/')) return routeMap.find((item) => item.id === 'components')!
    if (path.startsWith('/docs')) return docsRoute
    if (path.startsWith('/themes')) return routeMap.find((item) => item.id === 'themes')!
    return routeMap.find((item) => item.path === path) ?? routeMap[0]
  }, [path])
  const Page = pageMap[route.path as keyof typeof pageMap]
  const sidebarArea = getSidebarArea(path)
  const toc = getToc(path, tab)
  const componentId = path.startsWith('/components/') ? path.replace('/components/', '') : ''
  const isComponentsArea = sidebarArea.id === 'components'
  const isDocsArea = sidebarArea.id === 'docs'
  const isThemesArea = sidebarArea.id === 'themes'
  const normalizedComponentSearch = componentSearch.trim().toLowerCase()
  const componentFamilies = isComponentsArea ? getComponentFamilies() : []
  const docFamilies = isDocsArea ? getDocFamilies() : []
  const familyByParent = new Map(componentFamilies.map((family) => [family.parent, family]))
  const docFamilyByParent = new Map(docFamilies.map((family) => [family.parent, family]))
  const familyChildItems = new Set(componentFamilies.flatMap((family) => family.items))
  const docFamilyChildItems = new Set(docFamilies.flatMap((family) => family.items))
  const baseSidebarGroups = isComponentsArea
    ? getComponentAreaGroups()
    : sidebarArea.groups
  const sidebarGroups = isComponentsArea && normalizedComponentSearch
    ? baseSidebarGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (item.toLowerCase().includes(normalizedComponentSearch)) return true
          const family = familyByParent.get(item)
          return family ? family.items.some((familyItem) => familyItem.toLowerCase().includes(normalizedComponentSearch)) : false
        }),
      }))
      .filter((group) => group.items.length > 0)
    : baseSidebarGroups
  const navLinks = [
    { href: `#${docsRoute.path}`, label: routeLabel(locale, 'docs', 'Docs'), active: route.path === '/' || route.path === '/docs' },
    ...topNav.filter((item) => item.id !== 'docs').map((item) => ({
      href: `#${item.path}`,
      label: routeLabel(locale, item.id, item.label),
      active: item.path === '/themes' ? path.startsWith('/themes') : route.path === item.path,
    })),
  ]

  const isComponentsOverview = path === '/components'

  function sidebarHref(groupId: string, item: string) {
    const slug = slugFor(item)
    if (isComponentsArea) return `#/components/${slug}`
    if (isDocsArea && groupId === 'guide' && item === 'Getting Started') return '#/docs'
    if (isDocsArea && groupId === 'guide') return `#/docs/guide/${slug}`
    if (isDocsArea && groupId === 'foundations') {
      const dextrumHref = dextrumTypographyHref(item)
      if (dextrumHref) return dextrumHref
      return `#/docs/foundations/${slug}`
    }
    if (isDocsArea && groupId === 'libraries') return `#/docs/libraries/${slug}`
    if (isDocsArea && item === 'Arabic Friendly') return '#/docs#arabic-friendly'
    if (isDocsArea) return `#/docs#${slug}`
    if (isThemesArea && item === 'Utopia Default') return '#/themes#utopia-default'
    if (isThemesArea && item === 'Dextrum') return '#/themes#dextrum'
    return `#/${sidebarArea.id}`
  }

  return (
    <I18nProvider locale={locale} setLocale={transitionLocale}>
    <div
      className={isComponentsOverview ? 'app-shell components-overview-shell' : 'app-shell'}
      aria-busy={pendingLocale ? 'true' : undefined}
      data-sidebar-collapsed={sidebarCollapsed ? 'true' : undefined}
      data-locale={locale}
      dir={dir}
      lang={locale === 'ar' ? 'ar' : 'en'}
    >
      <TopNavigation
        links={navLinks}
        locale={locale}
        onLocaleChange={transitionLocale}
        showBrand={false}
      />

      <SideNav
        aria-label={`${sideNavLabel(locale, sidebarArea.label)} navigation`}
        className="app-sidebar side-nav"
        collapsed={sidebarCollapsed}
        density="compact"
        heading={(
          <SideNavHeading
            className="app-sidebar-heading"
            endContent={(
              <SideNavCollapseButton
                aria-label={sidebarCollapsed ? 'Open sidebar' : 'Close sidebar'}
                aria-expanded={!sidebarCollapsed}
                onClick={() => setSidebarCollapsed((value) => !value)}
              >
                <PanelIcon />
              </SideNavCollapseButton>
            )}
            icon={<img alt={brand.logoAlt} src={brand.logo} />}
            label={brand.label}
            mediaSize="wordmark"
            subtitle={brand.subtitle}
            variant="brand"
          />
        )}
        search={!sidebarCollapsed && isComponentsArea ? (
          <SideNavSearch
            aria-label={t(locale, 'searchComponents')}
            label={t(locale, 'searchComponents')}
            onChange={(event) => setComponentSearch(event.target.value)}
            placeholder={t(locale, 'searchComponentsPlaceholder')}
            value={componentSearch}
          />
        ) : undefined}
      >
        <motion.div
          animate={sidebarCollapsed ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
          aria-hidden={sidebarCollapsed}
          className="app-sidebar-body"
          inert={sidebarCollapsed ? true : undefined}
          initial={false}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {isComponentsArea ? (
            <SideNavSection className="side-nav-header">
              <SideNavItem aria-current={path === '/components' ? 'page' : undefined} href="#/components">
                {t(locale, 'overview')}
              </SideNavItem>
            </SideNavSection>
          ) : (
            <SideNavSection className="side-nav-header">
              <SideNavItem aria-current={path === '/' || path === '/docs' ? 'page' : undefined} href="#/docs">
                {t(locale, 'gettingStarted')}
              </SideNavItem>
              <SideNavItem aria-current={path === '/docs/guide/what-s-new' ? 'page' : undefined} href="#/docs/guide/what-s-new">{t(locale, 'whatsNew')}</SideNavItem>
            </SideNavSection>
          )}
          <SideNavContent className="side-nav-content">
            {sidebarGroups.map((group) => (
              <SideNavSection key={group.id} className="side-nav-group" collapsible label={sideNavLabel(locale, group.label)}>
                {group.items.filter((item) => !familyChildItems.has(item) && !docFamilyChildItems.has(item)).map((item) => {
                  const family = familyByParent.get(item)
                  const docFamily = isDocsArea && group.id === 'foundations' ? docFamilyByParent.get(item) : undefined

                  if (family) {
                    return (
                      <SideNavSection
                        className="side-nav-family"
                        key={item}
                        collapsedLabel={`${family.label} section`}
                        collapsible
                        defaultExpanded={componentId === slugFor(item) || family.items.some((familyItem) => componentId === slugFor(familyItem))}
                        label={sideNavLabel(locale, family.label)}
                        variant="nested"
                      >
                        <SideNavItem
                          aria-current={isComponentsArea && componentId === slugFor(item) ? 'page' : undefined}
                          depth={2}
                          href={sidebarHref(group.id, item)}
                        >
                          {sideNavLabel(locale, item)}
                        </SideNavItem>
                          {family.items.map((familyItem) => (
                            <SideNavItem
                              key={familyItem}
                              aria-current={isComponentsArea && componentId === slugFor(familyItem) ? 'page' : undefined}
                              depth={2}
                              href={sidebarHref(group.id, familyItem)}
                            >
                              {sideNavLabel(locale, familyItem)}
                            </SideNavItem>
                          ))}
                      </SideNavSection>
                    )
                  }

                  if (docFamily) {
                    const typographyPath = '/docs/foundations/typography'
                    const onTypographyRoute = path === typographyPath || path.startsWith(`${typographyPath}/`)

                    return (
                      <SideNavSection
                        className="side-nav-family"
                        key={item}
                        collapsedLabel={`${docFamily.label} section`}
                        collapsible
                        defaultExpanded={onTypographyRoute}
                        label={sideNavLabel(locale, docFamily.label)}
                        variant="nested"
                      >
                        <SideNavItem
                          aria-current={path === typographyPath ? 'page' : undefined}
                          depth={2}
                          href={sidebarHref(group.id, item)}
                        >
                          {sideNavLabel(locale, item)}
                        </SideNavItem>
                        {docFamily.items.map((familyItem) => (
                          <SideNavItem
                            key={familyItem}
                            aria-current={path === sidebarHref(group.id, familyItem).replace(/^#/, '') ? 'page' : undefined}
                            depth={2}
                            href={sidebarHref(group.id, familyItem)}
                          >
                            {sideNavLabel(locale, familyItem)}
                          </SideNavItem>
                        ))}
                      </SideNavSection>
                    )
                  }

                  return (
                    (() => {
                      const href = sidebarHref(group.id, item)
                      const hrefTarget = href.replace(/^#/, '')
                      const current = hrefTarget === path
                        || (path === '/docs' && item === 'Getting Started')
                        || (isDocsArea && item === 'Typography' && path.startsWith('/docs/foundations/typography'))
                      return (
                    <SideNavItem
                      key={item}
                      aria-current={(isComponentsArea && componentId === slugFor(item)) || (!isComponentsArea && current) ? 'page' : undefined}
                      depth={1}
                      href={href}
                    >
                      {sideNavLabel(locale, item)}
                    </SideNavItem>
                      )
                    })()
                  )
                })}
              </SideNavSection>
            ))}
          </SideNavContent>
        </motion.div>
      </SideNav>

      <main className="app-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${locale}-${path}-${tab}`}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className={isComponentsOverview ? 'content-frame content-frame-wide' : 'content-frame'}
            exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
            initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {componentId ? <ComponentDetailPage componentId={componentId} tab={tab} /> : <Page path={path} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {isComponentsOverview ? null : (
        <aside className="toc" aria-label={t(locale, 'onThisPage')}>
          <strong>{t(locale, 'onThisPage')}</strong>
          {toc.map((item) => <a key={item.id} href={getTocHref(path, tab, item.id)}>{docsLabel(locale, categoryLabel(locale, item.label))}</a>)}
        </aside>
      )}
      <AnimatePresence>
        {pendingLocale ? <LocaleTransitionOverlay nextLocale={pendingLocale} /> : null}
      </AnimatePresence>
    </div>
    </I18nProvider>
  )
}
