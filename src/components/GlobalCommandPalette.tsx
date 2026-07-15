import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Box, BookOpen, Braces, Cable, Palette } from 'lucide-react'
import { catalog, components, slugify, themes } from '../data/design-system'
import type { Locale } from '../i18n'
import {
  CommandPalette,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteShortcut,
} from '../../packages/design-system/src/Navigation'

type GlobalCommandPaletteProps = {
  locale: Locale
  open: boolean
  onOpenChange: (open: boolean) => void
}

function docsHref(groupId: string, item: string) {
  if (item === 'Getting Started') return '#/docs'
  if (groupId === 'guide') return `#/docs/guide/${slugify(item)}`
  if (groupId === 'foundations') return `#/docs/foundations/${slugify(item)}`
  if (groupId === 'libraries') return `#/docs/libraries/${slugify(item)}`
  return '#/docs'
}

export function GlobalCommandPalette({ locale, open, onOpenChange }: GlobalCommandPaletteProps) {
  const isArabic = locale === 'ar'

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onOpenChange, open])

  if (!open) return null

  const navigate = (href: string) => {
    window.location.hash = href.replace(/^#/, '')
    onOpenChange(false)
  }

  return createPortal(
    <div className="global-command-backdrop" onMouseDown={(event) => {
      if (event.currentTarget === event.target) onOpenChange(false)
    }}>
      <section aria-label={isArabic ? 'البحث في Ceramic' : 'Search Ceramic'} aria-modal="true" className="global-command-dialog" role="dialog">
        <CommandPalette label={isArabic ? 'البحث الشامل' : 'Global search'}>
          <CommandPaletteInput
            autoFocus
            placeholder={isArabic ? 'ابحث في المكونات والتوكنات والمستندات وMCP...' : 'Search components, tokens, docs, and MCP...'}
          />
          <CommandPaletteList>
            <CommandPaletteEmpty>{isArabic ? 'لا توجد نتيجة.' : 'No Ceramic result found.'}</CommandPaletteEmpty>
            <CommandPaletteGroup heading={isArabic ? 'المكونات' : 'Components'}>
              {components.components.map((entry) => (
                <CommandPaletteItem
                  key={entry.name}
                  onSelect={() => navigate(`#/components/${slugify(entry.name)}`)}
                  value={`${entry.name} ${entry.category} component ${entry.useWhen.join(' ')}`}
                >
                  <Box aria-hidden="true" />
                  <span><strong>{entry.name}</strong><small>{entry.category} component</small></span>
                  <CommandPaletteShortcut>↵</CommandPaletteShortcut>
                </CommandPaletteItem>
              ))}
            </CommandPaletteGroup>
            <CommandPaletteGroup heading={isArabic ? 'المستندات' : 'Documentation'}>
              {catalog.topLevelAreas.find((area) => area.id === 'docs')?.groups.flatMap((group) => group.items.map((item) => (
                <CommandPaletteItem key={`${group.id}-${item}`} onSelect={() => navigate(docsHref(group.id, item))} value={`${item} ${group.label} docs guide`}>
                  <BookOpen aria-hidden="true" />
                  <span><strong>{item}</strong><small>{group.label}</small></span>
                </CommandPaletteItem>
              )))}
            </CommandPaletteGroup>
            <CommandPaletteGroup heading={isArabic ? 'التوكنات' : 'Tokens'}>
              {themes.requiredSemanticRoles.map((token) => (
                <CommandPaletteItem key={token} onSelect={() => navigate(`#/docs/foundations/all-tokens#tokens`)} value={`${token} design token semantic role`}>
                  <Braces aria-hidden="true" />
                  <span><strong>{token}</strong><small>Semantic token</small></span>
                </CommandPaletteItem>
              ))}
            </CommandPaletteGroup>
            <CommandPaletteGroup heading="MCP & themes">
              <CommandPaletteItem onSelect={() => navigate('#/docs/mcp-playground')} value="MCP playground doctor tools connection JSON RPC">
                <Cable aria-hidden="true" />
                <span><strong>MCP Playground</strong><small>Inspect the package contract and tool responses</small></span>
              </CommandPaletteItem>
              <CommandPaletteItem onSelect={() => navigate('#/themes')} value="themes Utopia Dextrum Barrier">
                <Palette aria-hidden="true" />
                <span><strong>{isArabic ? 'الثيمات' : 'Themes'}</strong><small>Theme contracts</small></span>
              </CommandPaletteItem>
            </CommandPaletteGroup>
          </CommandPaletteList>
        </CommandPalette>
        <footer><span><kbd>↑</kbd><kbd>↓</kbd> {isArabic ? 'تنقل' : 'Navigate'}</span><span><kbd>esc</kbd> {isArabic ? 'إغلاق' : 'Close'}</span></footer>
      </section>
    </div>,
    document.body,
  )
}
