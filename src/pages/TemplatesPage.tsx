import { useState } from 'react'
import { Check, Copy, ExternalLink, FileCode2, Layers3, Play, TerminalSquare } from 'lucide-react'
import { Badge, Button, Selector } from '../../packages/design-system/src'
import { templates, themes } from '../data/design-system'
import { useI18n, type Locale } from '../i18n'

type TemplateEntry = (typeof templates.templates)[number]
type RunnableTemplate = TemplateEntry & {
  bundlePath?: string
  entryPath?: string
  manifestPath?: string
  pageCount?: number
  pages?: string[]
  sourcePath?: string
}

const pageCopy = {
  en: {
    eyebrow: 'Templates',
    title: 'Start from something you can run.',
    intro: 'Open the complete Ceramic website, inspect every route, then generate a local copy with the CLI.',
    runnable: 'Runnable template',
    pages: 'pages',
    openPreview: 'Open live preview',
    copyCommand: 'Copy command',
    copied: 'Copied',
    included: 'Included routes',
    source: 'Source contract',
    howTitle: 'Use it in three steps',
    howBody: 'The CLI creates a standalone Vite project with Ceramic imports, page entries, seed data, and the template manifest already connected.',
    steps: [
      ['Preview', 'Check the full site, responsive behavior, theme modes, and Arabic before adopting it.'],
      ['Generate', 'Run the copy command in the directory where you want the new website project.'],
      ['Customize', 'Replace seeded demo content while preserving semantic tokens, components, and route structure.'],
    ],
    command: 'Generate a standalone copy',
    importTitle: 'Ceramic package imports',
    themePicker: 'Theme for the generated website',
    themePickerHelp: 'The CLI keeps the CSS import, HTML metadata, runtime constant, and Ceramic config in sync.',
    selectedTheme: 'Selected theme',
  },
  ar: {
    eyebrow: 'القوالب',
    title: 'ابدأ من شيء يمكنك تشغيله.',
    intro: 'افتح موقع Ceramic الكامل، وراجع كل مسار، ثم أنشئ نسخة محلية عبر سطر الأوامر.',
    runnable: 'قالب قابل للتشغيل',
    pages: 'صفحات',
    openPreview: 'فتح المعاينة المباشرة',
    copyCommand: 'نسخ الأمر',
    copied: 'تم النسخ',
    included: 'المسارات المضمنة',
    source: 'عقد المصدر',
    howTitle: 'استخدمه في ثلاث خطوات',
    howBody: 'ينشئ سطر الأوامر مشروع Vite مستقلاً مع استيرادات Ceramic ومسارات الصفحات والبيانات الحتمية وبيان القالب.',
    steps: [
      ['عاين', 'راجع الموقع الكامل والاستجابة وأنماط الألوان والعربية قبل اعتماده.'],
      ['أنشئ', 'شغّل أمر النسخ في المجلد الذي تريد إنشاء مشروع الموقع داخله.'],
      ['خصّص', 'استبدل المحتوى التجريبي مع الحفاظ على الرموز الدلالية والمكونات وبنية المسارات.'],
    ],
    command: 'إنشاء نسخة مستقلة',
    importTitle: 'استيرادات حزمة Ceramic',
    themePicker: 'ثيم الموقع الذي سيتم إنشاؤه',
    themePickerHelp: 'يحافظ سطر الأوامر على تطابق استيراد CSS وبيانات HTML وثابت التشغيل وإعداد Ceramic.',
    selectedTheme: 'الثيم المختار',
  },
} as const

function localizedTemplate(template: TemplateEntry, locale: Locale) {
  if (locale !== 'ar') return template
  return {
    ...template,
    title: template.translations.ar.title,
    purpose: template.translations.ar.purpose,
    starterFor: template.translations.ar.starterFor,
    sections: template.translations.ar.sections,
  }
}

async function copyValue(value: string, onCopied: (value: string) => void) {
  let didCopy = false
  try {
    await navigator.clipboard.writeText(value)
    didCopy = true
  } catch {
    const input = document.createElement('textarea')
    input.value = value
    input.setAttribute('readonly', '')
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    didCopy = document.execCommand('copy')
    input.remove()
  }
  if (didCopy) {
    onCopied(value)
    window.setTimeout(() => onCopied(''), 1800)
  }
}

export function TemplatesPage() {
  const { locale } = useI18n()
  const copy = pageCopy[locale]
  const [copied, setCopied] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('utopia-default')
  const featuredSource = templates.templates.find((template) => template.id === 'template-saas-solution-homepage') as RunnableTemplate
  const featured = localizedTemplate(featuredSource, locale) as RunnableTemplate
  const previewUrl = `/${featured.entryPath}?seed=1974341818`
  const selectedThemeEntry = themes.themes.find((theme) => theme.id === selectedTheme) ?? themes.themes[0]
  const selectedThemeName = locale === 'ar' ? selectedThemeEntry.translations.ar.name : selectedThemeEntry.name
  const generateCommand = `npx utopia-ds template ${featured.id} --theme ${selectedTheme} --copy ./saas-solution-website`
  const importExample = `import { Button, Card, TopNav } from '@utopia-studio-design/design-system'\nimport '@utopia-studio-design/design-system/core.css'\nimport '@utopia-studio-design/design-system/themes/${selectedTheme}.css'`

  return (
    <div className="page templates-page">
      <section className="page-hero compact templates-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
        <div className="templates-summary" aria-label={copy.eyebrow}>
          <span><strong>1</strong>{copy.runnable}</span>
          <span><strong>{featured.pageCount}</strong>{copy.pages}</span>
        </div>
      </section>

      <section className="template-feature" id="ready-template" aria-labelledby="featured-template-title">
        <div className="template-feature__preview">
          <div className="template-browser-bar" aria-hidden="true"><span /><span /><span /><small>/saas-solution-homepage</small></div>
          <iframe src={previewUrl} title={`${featured.title} — ${copy.openPreview}`} loading="eager" tabIndex={-1} />
        </div>
        <div className="template-feature__content">
          <div className="template-feature__status">
            <Badge variant="success">{copy.runnable}</Badge>
            <span>{featured.pageCount} {copy.pages}</span>
          </div>
          <h2 id="featured-template-title">{featured.title}</h2>
          <p>{featured.purpose}</p>
          <div className="template-feature__actions">
            <Button endContent={<ExternalLink aria-hidden="true" />} onClick={() => window.open(previewUrl, '_blank', 'noopener,noreferrer')}>
              {copy.openPreview}
            </Button>
            <Button
              onClick={() => copyValue(generateCommand, setCopied)}
              startContent={copied === generateCommand ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              variant="outline"
            >
              {copied === generateCommand ? copy.copied : copy.copyCommand}
            </Button>
          </div>
          <div className="template-route-list">
            <strong>{copy.included}</strong>
            <div>{featured.pages?.map((page) => <span key={page}>{page}</span>)}</div>
          </div>
          <dl className="template-source-list">
            <div><dt>{copy.source}</dt><dd><code>{featured.manifestPath}</code></dd></div>
            <div><dt>Seed</dt><dd><code>?seed=1974341818</code></dd></div>
          </dl>
        </div>
      </section>

      <section className="template-usage" id="how-to-use" aria-labelledby="template-usage-title">
        <div className="section-heading">
          <p>{copy.command}</p>
          <h2 id="template-usage-title">{copy.howTitle}</h2>
          <span>{copy.howBody}</span>
        </div>
        <div className="template-steps">
          {copy.steps.map(([title, body], index) => {
            const StepIcon = [Play, TerminalSquare, Layers3][index]
            return <article key={title}><span><StepIcon aria-hidden="true" /></span><small>0{index + 1}</small><h3>{title}</h3><p>{body}</p></article>
          })}
        </div>
        <div className="template-theme-picker">
          <div>
            <label htmlFor="template-theme">{copy.themePicker}</label>
            <p>{copy.themePickerHelp}</p>
          </div>
          <Selector id="template-theme" onChange={(event) => setSelectedTheme(event.target.value)} value={selectedTheme}>
            {themes.themes.map((theme) => <option key={theme.id} value={theme.id}>{locale === 'ar' ? theme.translations.ar.name : theme.name}</option>)}
          </Selector>
          <span><small>{copy.selectedTheme}</small><strong>{selectedThemeName}</strong><code>{selectedTheme}</code></span>
        </div>
        <div className="template-code-grid">
          <div className="template-code-block">
            <div><TerminalSquare aria-hidden="true" /><strong>{copy.command}</strong><Button aria-label={copy.copyCommand} isIconOnly onClick={() => copyValue(generateCommand, setCopied)} size="icon" variant="ghost">{copied === generateCommand ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</Button></div>
            <pre><code>{generateCommand}</code></pre>
          </div>
          <div className="template-code-block">
            <div><FileCode2 aria-hidden="true" /><strong>{copy.importTitle}</strong><Button aria-label={copy.copyCommand} isIconOnly onClick={() => copyValue(importExample, setCopied)} size="icon" variant="ghost">{copied === importExample ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</Button></div>
            <pre><code>{importExample}</code></pre>
          </div>
        </div>
        <span aria-live="polite" className="sr-only">{copied ? copy.copied : ''}</span>
      </section>

    </div>
  )
}
