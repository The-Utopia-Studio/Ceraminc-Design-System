import {
  TopNav,
  TopNavHeading,
  TopNavItem,
} from '../../packages/design-system/src/Navigation'
import { availableLocales, t, type Locale } from '../i18n'
import { Search } from 'lucide-react'

type TopNavigationLink = {
  href: string
  label: string
  active?: boolean
}

type TopNavigationProps = {
  links: TopNavigationLink[]
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  onSearch: () => void
  showBrand?: boolean
}

export function TopNavigation({ links, locale, onLocaleChange, onSearch, showBrand = true }: TopNavigationProps) {
  const topLevelLabel = locale === 'ar' ? 'التنقل الرئيسي لنظام التصميم' : locale === 'ko' ? '디자인 시스템 주요 탐색' : 'Design system top level'
  const homeLabel = locale === 'ar' ? 'الصفحة الرئيسية لنظام التصميم' : locale === 'ko' ? '디자인 시스템 홈' : 'Design system home'

  return (
    <header className="topbar" data-has-brand={showBrand ? 'true' : 'false'}>
      {showBrand ? (
        <a className="topbar-brand" href="#/" aria-label={homeLabel}>
          <TopNavHeading
            icon={<img alt="" src="/brand/the-utopia-studio-wordmark.avif" />}
            label="Ceramic"
            subtitle="Design System"
          />
        </a>
      ) : <span className="topbar-spacer" aria-hidden="true" />}
      <TopNav className="topbar-nav" aria-label={topLevelLabel}>
        {links.map((link) => (
          <TopNavItem key={link.href} href={link.href} isCurrent={link.active}>
            {link.label}
          </TopNavItem>
        ))}
      </TopNav>
      <div className="topbar-actions">
        <button aria-label={locale === 'ar' ? 'البحث في Ceramic' : locale === 'ko' ? 'Ceramic 검색' : 'Search Ceramic'} className="topbar-search" onClick={onSearch} type="button">
          <Search aria-hidden="true" />
          <span>{locale === 'ar' ? 'بحث' : locale === 'ko' ? '검색' : 'Search'}</span>
          <kbd>⌘K</kbd>
        </button>
        <label className="locale-switch" aria-label={locale === 'ko' ? '언어 선택' : 'Language'}>
          <span>{t(locale, 'arabicMode')}</span>
          <select value={locale} onChange={(event) => onLocaleChange(event.target.value as Locale)}>
            {availableLocales.includes('ko') ? <option value="ko">한국어</option> : null}
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </label>
      </div>
    </header>
  )
}
