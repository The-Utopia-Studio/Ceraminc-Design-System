import { Switch } from '../../packages/design-system/src/Forms'
import {
  TopNav,
  TopNavItem,
} from '../../packages/design-system/src/Navigation'
import { t, type Locale } from '../i18n'

type TopNavigationLink = {
  href: string
  label: string
  active?: boolean
}

type TopNavigationProps = {
  links: TopNavigationLink[]
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function TopNavigation({ links, locale, onLocaleChange }: TopNavigationProps) {
  return (
    <header className="topbar" data-has-brand="false">
      <span className="topbar-spacer" aria-hidden="true" />
      <TopNav className="topbar-nav" aria-label="Design system top level">
        {links.map((link) => (
          <TopNavItem key={link.href} href={link.href} isCurrent={link.active}>
            {link.label}
          </TopNavItem>
        ))}
      </TopNav>
      <div className="topbar-actions">
        <label className="locale-switch">
          <span>{t(locale, 'arabicMode')}</span>
          <Switch
            aria-label={t(locale, 'arabicMode')}
            checked={locale === 'ar'}
            onCheckedChange={(checked) => onLocaleChange(checked ? 'ar' : 'en')}
          />
        </label>
        <a className="topbar-cta" href="#/docs">{t(locale, 'getStarted')}</a>
      </div>
    </header>
  )
}
