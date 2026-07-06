type TopNavigationLink = {
  href: string
  label: string
  active?: boolean
}

type TopNavigationProps = {
  links: TopNavigationLink[]
}

export function TopNavigation({ links }: TopNavigationProps) {
  return (
    <header className="topbar">
      <a className="brand-mark" href="#/" aria-label="Utopia Design System home">
        <img src="/brand/the-utopia-studio-wordmark.avif" alt="The Utopia Studio" />
      </a>
      <nav className="top-nav" aria-label="Design system top level">
        {links.map((link) => (
          <a key={link.href} aria-current={link.active ? 'page' : undefined} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="topbar-cta" href="#/docs">Get started</a>
    </header>
  )
}
