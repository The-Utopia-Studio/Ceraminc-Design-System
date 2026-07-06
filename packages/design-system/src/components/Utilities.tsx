import { useEffect, useState, type ReactNode } from 'react'

export function Theme({ children }: { children: ReactNode }) {
  return children
}

export function LayerProvider({ children }: { children: ReactNode }) {
  return children
}

export function LinkProvider({ children }: { children: ReactNode }) {
  return children
}

export function MediaTheme({ children }: { children: ReactNode }) {
  return children
}

export function SyntaxTheme({ children }: { children: ReactNode }) {
  return children
}

export function useTheme() {
  return { theme: 'utopia-default', dir: typeof document === 'undefined' ? 'ltr' : document.documentElement.dir || 'ltr' }
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export function useScrollLock(locked = true) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

export function useFocusTrap() {
  return { active: false }
}

export function useKeyboardHint() {
  return { modifier: typeof navigator !== 'undefined' && /Mac/.test(navigator.platform) ? 'Command' : 'Control' }
}

export function useOverflow() {
  return { isOverflowing: false }
}
