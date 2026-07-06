import { useEffect, useMemo, useState } from 'react'
import { catalog, routeMap } from './data/design-system'
import { TopNavigation } from './components/TopNavigation'
import { ArabicFriendlyPage } from './pages/ArabicFriendlyPage'
import { ComponentDetailPage } from './pages/ComponentDetailPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { DocsPage } from './pages/DocsPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { ThemesPage } from './pages/ThemesPage'

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
  if (path === '/' || path === '/arabic-friendly') return 'docs'
  return path.replace('/', '')
}

function getSidebarArea(path: string) {
  return catalog.topLevelAreas.find((area) => area.id === getActiveAreaId(path)) ?? catalog.topLevelAreas[0]
}

function getToc(path: string, tab: string) {
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
    return [
      { id: 'available-now', label: 'Available Now' },
      { id: 'architecture-smoke-test', label: 'shadcn architecture smoke test' },
      { id: 'button', label: 'Button' },
      { id: 'card', label: 'Card' },
      { id: 'badge', label: 'Badge' },
    ]
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
      { id: 'theme-policy', label: 'Theme policy' },
      { id: 'icon-policy', label: 'Icon policy' },
      { id: 'core-boundary', label: 'Core boundary' },
      { id: 'semantic-contract', label: 'Stable semantic contract' },
    ]
  }
  if (path === '/arabic-friendly') {
    return [
      { id: 'arabic-preview', label: 'Arabic preview' },
      { id: 'contract', label: 'Contract' },
      { id: 'api-naming', label: 'API naming' },
      { id: 'ai-rule', label: 'AI rule' },
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
  const hash = window.location.hash.replace(/^#/, '')
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

export function App() {
  const [path, setPath] = useState(getCurrentPath)
  const [section, setSection] = useState(getCurrentSection)
  const [tab, setTab] = useState(getCurrentTab)
  const [componentSearch, setComponentSearch] = useState('')

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
    window.requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ block: 'start' })
    })
  }, [path, section])

  const route = useMemo(() => routeMap.find((item) => item.path === path) ?? (path.startsWith('/components/') ? routeMap.find((item) => item.id === 'components')! : routeMap[0]), [path])
  const Page = pageMap[route.path as keyof typeof pageMap]
  const sidebarArea = getSidebarArea(path)
  const toc = getToc(path, tab)
  const componentId = path.startsWith('/components/') ? path.replace('/components/', '') : ''
  const isComponentsArea = sidebarArea.id === 'components'
  const normalizedComponentSearch = componentSearch.trim().toLowerCase()
  const sidebarGroups = isComponentsArea && normalizedComponentSearch
    ? sidebarArea.groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.toLowerCase().includes(normalizedComponentSearch)),
      }))
      .filter((group) => group.items.length > 0)
    : sidebarArea.groups
  const navLinks = [
    { href: `#${docsRoute.path}`, label: 'Docs', active: route.path === '/' || route.path === '/docs' },
    ...topNav.filter((item) => item.id !== 'docs').map((item) => ({
      href: `#${item.path}`,
      label: item.label,
      active: route.path === item.path,
    })),
  ]

  return (
    <div className="app-shell">
      <TopNavigation links={navLinks} />

      <aside className="app-sidebar">
        <nav className="side-nav" aria-label={`${sidebarArea.label} navigation`}>
          {isComponentsArea ? (
            <>
              <label className="side-search">
                <span>Search components</span>
                <input
                  aria-label="Search components"
                  onChange={(event) => setComponentSearch(event.target.value)}
                  placeholder="Search components..."
                  value={componentSearch}
                />
              </label>
              <a aria-current={path === '/components' ? 'page' : undefined} href="#/components">
                Overview
              </a>
            </>
          ) : (
            <>
              <a aria-current={route.path === '/' || route.path === '/docs' ? 'page' : undefined} href="#/docs">
                Getting Started
              </a>
              <a href="#/docs">What's New</a>
            </>
          )}
          {sidebarGroups.map((group) => (
            <div key={group.id} className="side-nav-group">
              <strong>{group.label}</strong>
              {group.items.map((item) => (
                <a
                  key={item}
                  aria-current={isComponentsArea && componentId === slugFor(item) ? 'page' : undefined}
                  href={isComponentsArea ? `#/components/${slugFor(item)}` : `#/${sidebarArea.id}`}
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="app-main">
        <div className="content-frame">
          {componentId ? <ComponentDetailPage componentId={componentId} tab={tab} /> : <Page />}
        </div>
      </main>

      <aside className="toc" aria-label="On this page">
        <strong>On this page</strong>
        {toc.map((item) => <a key={item.id} href={getTocHref(path, tab, item.id)}>{item.label}</a>)}
      </aside>
    </div>
  )
}
