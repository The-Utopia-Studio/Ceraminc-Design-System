import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { themes } from './data/design-system'

export type ThemeId = 'utopia-default' | 'dextrum' | 'barrier-intelligence'

const STORAGE_KEY = 'ceramic-theme'

export type ShellBrand = {
  label: string
  logo: string
  logoAlt: string
  subtitle: string
}

export const CERAMIC_SHELL_BRAND: ShellBrand = {
  label: 'Ceramic',
  logo: '/brand/the-utopia-studio-wordmark.avif',
  logoAlt: 'The Utopia Studio',
  subtitle: 'Design System',
}

type ThemeContextValue = {
  activeThemeId: ThemeId
  setActiveThemeId: (themeId: ThemeId) => void
  themeEntry: (typeof themes.themes)[number]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function isThemeId(value: string | null | undefined): value is ThemeId {
  return value === 'utopia-default' || value === 'dextrum' || value === 'barrier-intelligence'
}

export function readStoredThemeId(): ThemeId {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isThemeId(stored) ? stored : (themes.defaultTheme as ThemeId)
}

export function applyThemeId(activeThemeId: ThemeId) {
  document.documentElement.dataset.theme = activeThemeId
  window.localStorage.setItem(STORAGE_KEY, activeThemeId)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeThemeId, setActiveThemeIdState] = useState<ThemeId>(() => readStoredThemeId())

  const setActiveThemeId = (nextThemeId: ThemeId) => {
    setActiveThemeIdState(nextThemeId)
    applyThemeId(nextThemeId)
  }

  useEffect(() => {
    applyThemeId(activeThemeId)
  }, [activeThemeId])

  const themeEntry = themes.themes.find((entry) => entry.id === activeThemeId) ?? themes.themes[0]

  const value = useMemo<ThemeContextValue>(() => ({
    activeThemeId,
    setActiveThemeId,
    themeEntry,
  }), [activeThemeId, themeEntry])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
