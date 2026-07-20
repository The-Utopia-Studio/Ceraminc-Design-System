import { useMemo, useState, type ReactNode } from 'react'
import { Check, Copy, Moon, PanelTop, Languages } from 'lucide-react'
import { components, slugify } from '../data/design-system'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import { Button } from '../../packages/design-system/src/Button'
import { Badge } from '../../packages/design-system/src/Badge'

type ComponentManifestEntry = typeof components.components[number]

export function ComponentDetailWorkbench({ children, entry }: { children: ReactNode; entry: ComponentManifestEntry }) {
  const { locale } = useI18n()
  const { themeId } = useTheme()
  const isArabic = locale === 'ar'
  const [previewRtl, setPreviewRtl] = useState(false)
  const [previewDark, setPreviewDark] = useState(true)
  const [copied, setCopied] = useState(false)
  const related = useMemo(() => components.components
    .filter((candidate) => candidate.category === entry.category && candidate.name !== entry.name)
    .slice(0, 4), [entry.category, entry.name])
  const accessibilityNotes = entry.neverInvent.filter((rule) => /label|keyboard|focus|aria|accessible/i.test(rule))
  const notes = accessibilityNotes.length > 0
    ? accessibilityNotes.slice(0, 3)
    : ['Keep a visible focus indicator.', 'Use product-owned accessible labels.', 'Verify keyboard and RTL behavior before release.']

  const copyImport = async () => {
    await navigator.clipboard.writeText(entry.packageImport)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className="component-detail-shell"
      data-brand={themeId}
      data-color-mode={previewDark ? 'dark' : 'light'}
      data-theme={themeId}
      dir={previewRtl ? 'rtl' : undefined}
    >
      <section aria-label="Component workbench" className="component-workbench">
        <div className="component-workbench__intro">
          <Badge variant="secondary"><PanelTop aria-hidden="true" /> Workbench</Badge>
          <div><strong>{entry.name}</strong><span>{isArabic ? 'اختبر الاتجاه والمظهر وانسخ الاستيراد قبل الاستخدام.' : 'Check direction and appearance, then copy the package import.'}</span></div>
        </div>
        <div className="component-workbench__actions">
          <Button aria-pressed={previewRtl} onClick={() => setPreviewRtl((value) => !value)} size="sm" variant={previewRtl ? 'secondary' : 'outline'}>
            <Languages aria-hidden="true" /> RTL
          </Button>
          <Button aria-pressed={previewDark} onClick={() => setPreviewDark((value) => !value)} size="sm" variant={previewDark ? 'secondary' : 'outline'}>
            <Moon aria-hidden="true" /> {isArabic ? 'داكن' : 'Dark'}
          </Button>
          <Button aria-label={isArabic ? 'نسخ مسار الاستيراد' : 'Copy package import'} onClick={copyImport} size="sm">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ الاستيراد' : 'Copy import')}
          </Button>
        </div>
        <details>
          <summary>{isArabic ? 'الوصول والمكونات ذات الصلة' : 'Accessibility and related components'}</summary>
          <div className="component-workbench__details">
            <div><strong>{isArabic ? 'فحص الوصول' : 'Accessibility checks'}</strong><ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul></div>
            <div><strong>{isArabic ? 'مكونات ذات صلة' : 'Related components'}</strong><nav>{related.map((candidate) => <a href={`#/components/${slugify(candidate.name)}`} key={candidate.name}>{candidate.name}</a>)}</nav></div>
          </div>
        </details>
      </section>
      {children}
    </div>
  )
}
