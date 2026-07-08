import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { themes } from './data/design-system'

export type ThemeId = 'utopia-default' | 'dextrum'

const STORAGE_KEY = 'ceramic-theme'

type ThemeBrand = {
  label: string
  logo: string
  logoAlt: string
  subtitle: string
}

const themeBrandById: Record<ThemeId, ThemeBrand> = {
  'utopia-default': {
    label: 'Ceramic',
    logo: '/brand/the-utopia-studio-wordmark.avif',
    logoAlt: 'The Utopia Studio',
    subtitle: 'Design System',
  },
  dextrum: {
    label: 'Dextrum',
    logo: '/brand/dextrum-logo.svg',
    logoAlt: 'Dextrum',
    subtitle: 'Design System',
  },
}

type ThemeContextValue = {
  themeId: ThemeId
  setThemeId: (themeId: ThemeId) => void
  brand: ThemeBrand
  themeEntry: (typeof themes.themes)[number]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function isThemeId(value: string | null | undefined): value is ThemeId {
  return value === 'utopia-default' || value === 'dextrum'
}

export function readStoredThemeId(): ThemeId {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isThemeId(stored) ? stored : (themes.defaultTheme as ThemeId)
}

export function applyThemeId(themeId: ThemeId) {
  document.documentElement.dataset.theme = themeId
  window.localStorage.setItem(STORAGE_KEY, themeId)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => readStoredThemeId())

  const setThemeId = (nextThemeId: ThemeId) => {
    setThemeIdState(nextThemeId)
    applyThemeId(nextThemeId)
  }

  useEffect(() => {
    applyThemeId(themeId)
  }, [themeId])

  const themeEntry = themes.themes.find((entry) => entry.id === themeId) ?? themes.themes[0]

  const value = useMemo<ThemeContextValue>(() => ({
    themeId,
    setThemeId,
    brand: themeBrandById[themeId],
    themeEntry,
  }), [themeEntry, themeId])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
