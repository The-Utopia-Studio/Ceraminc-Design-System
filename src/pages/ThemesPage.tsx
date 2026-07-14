import { useState } from 'react'
import { Check, Copy, FileCode2, Palette, TerminalSquare } from 'lucide-react'
import { Button } from '../../packages/design-system/src/Button'
import { barrierIntelligenceTheme, dextrumTheme, getArea, themes, utopiaDefaultTheme } from '../data/design-system'
import { sideNavLabel, useI18n, type Locale } from '../i18n'
import { useTheme, type ThemeId } from '../theme'
import { DextrumTypographySubpage } from './DextrumTypographySubpage'

const themePolicyById = {
  'utopia-default': utopiaDefaultTheme,
  dextrum: dextrumTheme,
  'barrier-intelligence': barrierIntelligenceTheme,
} as const

type ThemeEntry = (typeof themes.themes)[number]

const pageCopy = {
  en: {
    eyebrow: 'Themes',
    title: 'One stable system, many theme implementations.',
    intro: 'Ceramic core owns semantic roles, component behavior, accessibility, AI contracts, and Arabic support. A theme supplies brand values and policies without rewriting reusable components.',
    defaultTheme: 'Default theme',
    brandTheme: 'Brand theme',
    locked: 'Locked',
    active: 'Active',
    activate: 'Activate',
    currentlyActive: 'Currently active',
    bestFor: 'Best for',
    principles: 'Theme principles',
    assetPolicy: 'Brand asset policy',
    planned: 'Planned contract',
    plannedStatus: 'Planned',
    audience: 'Intended surfaces',
    direction: 'Visual direction',
    extensions: 'Proposed extension tokens',
    validation: 'Required validation',
    policy: 'Theme policy',
    iconPolicy: 'Icon policy',
    coreBoundary: 'Core boundary',
    coreBoundaryTitle: 'Core does not own brand style.',
    semanticContract: 'Required roles',
    semanticContractTitle: 'Stable semantic contract',
    semanticContractBody: 'Future themes may add primitives and extension tokens, but they must preserve every required semantic role and component behavior.',
    colorRoles: 'color roles',
    marketingTypography: 'Marketing & Sales typography',
    appTypography: 'App & Website typography',
    createEyebrow: 'Theme authoring',
    createTitle: 'Create a brand theme without forking the components.',
    createBody: 'Run the scaffold in the Design System workspace, replace its placeholder primitives, then sync and validate the catalog before publishing.',
    copyCommand: 'Copy command',
    copied: 'Copied',
    createSteps: [['Scaffold', 'Create theme CSS, policy manifest, and catalog registration.'], ['Define', 'Replace placeholder colors, typography, geometry, icons, motion, and Arabic rules.'], ['Validate', 'Sync CLI data, build, audit components, and run Ceramic doctor.']],
  },
  ar: {
    eyebrow: 'الثيمات',
    title: 'نظام ثابت واحد، وتطبيقات متعددة للثيمات.',
    intro: 'يمتلك جوهر Ceramic الأدوار الدلالية وسلوك المكونات وإمكانية الوصول وعقود الذكاء الاصطناعي ودعم العربية. يزوّد الثيم قيم العلامة وسياساتها من دون إعادة كتابة المكونات القابلة لإعادة الاستخدام.',
    defaultTheme: 'الثيم الافتراضي',
    brandTheme: 'ثيم علامة',
    locked: 'مقفل',
    active: 'نشط',
    activate: 'تفعيل',
    currentlyActive: 'نشط حاليا',
    bestFor: 'مناسب لـ',
    principles: 'مبادئ الثيم',
    assetPolicy: 'سياسة أصل العلامة',
    planned: 'عقد مخطط',
    plannedStatus: 'مخطط',
    audience: 'الأسطح المستهدفة',
    direction: 'الاتجاه البصري',
    extensions: 'توكنات الامتداد المقترحة',
    validation: 'التحقق المطلوب',
    policy: 'سياسة الثيم',
    iconPolicy: 'سياسة الأيقونات',
    coreBoundary: 'حدود الجوهر',
    coreBoundaryTitle: 'الجوهر لا يمتلك أسلوب العلامة.',
    semanticContract: 'الأدوار المطلوبة',
    semanticContractTitle: 'عقد دلالي ثابت',
    semanticContractBody: 'يمكن للثيمات المستقبلية إضافة قيم أولية وتوكنات امتداد، لكن يجب أن تحافظ على كل دور دلالي مطلوب وسلوك المكونات.',
    colorRoles: 'أدوار الألوان',
    marketingTypography: 'طباعة التسويق والمبيعات',
    appTypography: 'طباعة التطبيق والموقع',
    createEyebrow: 'تأليف الثيم',
    createTitle: 'أنشئ ثيم علامة من دون نسخ المكونات.',
    createBody: 'شغّل أداة الإنشاء داخل مساحة عمل نظام التصميم، واستبدل القيم الأولية المؤقتة، ثم زامن الكتالوج وتحقق منه قبل النشر.',
    copyCommand: 'نسخ الأمر',
    copied: 'تم النسخ',
    createSteps: [['أنشئ', 'أنشئ CSS وسياسة الثيم وتسجيله في الكتالوج.'], ['عرّف', 'استبدل الألوان والطباعة والهندسة والأيقونات والحركة وقواعد العربية.'], ['تحقق', 'زامن بيانات CLI وابنِ النظام وشغّل التدقيق وCeramic doctor.']],
  },
} as const

function localizedTheme(theme: ThemeEntry, locale: Locale) {
  if (locale !== 'ar') return theme
  return {
    ...theme,
    name: theme.translations.ar.name,
    role: theme.translations.ar.role,
    description: theme.translations.ar.description,
    bestFor: theme.translations.ar.bestFor,
    principles: theme.translations.ar.principles,
  }
}

type ThemesPageProps = {
  path?: string
}

export function ThemesPage({ path = '/themes' }: ThemesPageProps) {
  const area = getArea('themes')
  const { locale } = useI18n()
  const { setThemeId, themeEntry, themeId } = useTheme()
  const activePolicy = themePolicyById[themeId]
  const copy = pageCopy[locale]
  const activeTheme = localizedTheme(themeEntry as ThemeEntry, locale)
  const activePolicySummary = locale === 'ar' ? activePolicy.translations.ar.summary : activePolicy.summary
  const activeIconPolicy = locale === 'ar' ? activePolicy.translations.ar.iconPolicy : activePolicy.iconPolicy
  const coreBoundaryItems = locale === 'ar' ? themes.translations.ar.coreBoundary.doesNotOwn : themes.coreBoundary.doesNotOwn
  const [copied, setCopied] = useState(false)
  const createCommand = 'npx utopia-ds theme create nova'

  const copyCreateCommand = async () => {
    try {
      await navigator.clipboard.writeText(createCommand)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  if (path === '/themes/dextrum/typography/app-website') {
    return <DextrumTypographySubpage segment="app-website" />
  }

  if (path === '/themes/dextrum/typography/marketing-sales') {
    return <DextrumTypographySubpage segment="marketing-sales" />
  }

  if (path === '/themes/dextrum/typography') {
    return <DextrumTypographyLanding locale={locale} />
  }

  if (path.startsWith('/themes/utopia-default/') || path.startsWith('/themes/dextrum/')) {
    return <ThemeImplementationPage path={path} locale={locale} />
  }

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </section>

      <section className="theme-create" id="create-theme" aria-labelledby="theme-create-title">
        <div className="theme-create__intro">
          <span><Palette aria-hidden="true" /></span>
          <p className="eyebrow">{copy.createEyebrow}</p>
          <h2 id="theme-create-title">{copy.createTitle}</h2>
          <p>{copy.createBody}</p>
        </div>
        <div className="theme-create__steps">
          {copy.createSteps.map(([title, body], index) => {
            const Icon = [TerminalSquare, FileCode2, Check][index]
            return <article key={title}><Icon aria-hidden="true" /><small>0{index + 1}</small><h3>{title}</h3><p>{body}</p></article>
          })}
        </div>
        <div className="theme-create__command">
          <div><TerminalSquare aria-hidden="true" /><strong>{copy.createEyebrow}</strong></div>
          <code>{createCommand}</code>
          <Button onClick={copyCreateCommand} startContent={copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />} variant="outline">
            {copied ? copy.copied : copy.copyCommand}
          </Button>
        </div>
      </section>

      <section className="split-grid">
        <aside className="rail" aria-label={copy.eyebrow}>
          {area?.groups.map((group) => (
            <div key={group.id} className="rail-group">
              <strong>{sideNavLabel(locale, group.label)}</strong>
              {group.items.map((item) => <span key={item}>{sideNavLabel(locale, item)}</span>)}
            </div>
          ))}
        </aside>

        <div className="theme-catalog">
          <div className="theme-grid">
            {themes.themes.map((sourceTheme) => {
              const theme = localizedTheme(sourceTheme, locale)
              const isActive = theme.id === themeId
              const brandAsset = sourceTheme.brandAsset
              const brandAssetUsage = locale === 'ar' ? sourceTheme.translations.ar.brandAssetUsage : brandAsset?.usage

              return (
                <article className={`theme-card${isActive ? ' theme-card--active' : ''}`} id={theme.id} key={theme.id}>
                  {brandAsset ? (
                    <div className="theme-brand-preview" data-theme-preview={sourceTheme.id}>
                      <img alt={brandAsset.alt} src={brandAsset.src} />
                    </div>
                  ) : (
                    <div aria-hidden="true" className="theme-brand-preview theme-brand-preview--typographic">
                      <span>{sourceTheme.shortName ?? sourceTheme.name}</span>
                    </div>
                  )}
                  <div className="card-row">
                    <span className="kicker">{sourceTheme.id === 'utopia-default' ? copy.defaultTheme : copy.brandTheme}</span>
                    {theme.locked ? <span className="pill">{copy.locked}</span> : null}
                    {isActive ? <span className="pill">{copy.active}</span> : null}
                  </div>
                  <h2>{theme.name}</h2>
                  <p>{theme.description}</p>
                  <div className="swatches" aria-label={`${theme.name}: ${copy.colorRoles}`}>
                    {Object.entries(theme.values).slice(0, 10).map(([key, value]) => (
                      <span key={key} style={{ background: value }} title={`${key}: ${value}`} />
                    ))}
                  </div>
                  <div className="theme-meta-grid">
                    <div>
                      <strong>{copy.bestFor}</strong>
                      <div className="chip-list">
                        {theme.bestFor.map((item) => <span key={item}>{item}</span>)}
                      </div>
                    </div>
                    <div>
                      <strong>{copy.principles}</strong>
                      <ul className="theme-check-list">
                        {theme.principles.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    {brandAsset ? (
                      <div>
                        <strong>{copy.assetPolicy}</strong>
                        <p>{brandAssetUsage}</p>
                      </div>
                    ) : null}
                  </div>
                  <Button
                    disabled={isActive}
                    onClick={() => setThemeId(theme.id as ThemeId)}
                    size="sm"
                    type="button"
                    variant={isActive ? 'secondary' : 'outline'}
                  >
                    {isActive ? copy.currentlyActive : `${copy.activate} ${theme.name}`}
                  </Button>
                  {theme.id === 'dextrum' ? (
                    <div className="dextrum-type-links">
                    <a href="#/themes/dextrum/typography/marketing-sales">{copy.marketingTypography}</a>
                    <a href="#/themes/dextrum/typography/app-website">{copy.appTypography}</a>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>

          <section className="theme-contract-band" id="theme-policy">
            <article className="card accent">
              <span className="kicker">{copy.policy}</span>
              <h3>{activeTheme.name}</h3>
              <p>{activePolicySummary}</p>
              <code>{themeEntry.policyManifest}</code>
            </article>
            <article className="card" id="icon-policy">
              <span className="kicker">{copy.iconPolicy}</span>
              <h3>{activeIconPolicy.system}</h3>
              <p>{activeIconPolicy.description}</p>
              <div className="chip-list">
                {activeIconPolicy.allow.map((rule) => <span key={rule}>{rule}</span>)}
              </div>
            </article>
            <article className="card" id="core-boundary">
              <span className="kicker">{copy.coreBoundary}</span>
              <h3>{copy.coreBoundaryTitle}</h3>
              <div className="chip-list">
                {coreBoundaryItems.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          </section>

          <article className="card accent" id="semantic-contract">
            <span className="kicker">{copy.semanticContract}</span>
            <h3>{copy.semanticContractTitle}</h3>
            <p>{copy.semanticContractBody}</p>
            <div className="chip-list">
              {themes.requiredSemanticRoles.map((role) => <span key={role}>{role}</span>)}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

function DextrumTypographyLanding({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  return (
    <div className="page">
      <header className="page-hero compact" id="theme-overview">
        <p className="eyebrow">Dextrum</p>
        <h1>{isArabic ? 'نظام Dextrum الطباعي' : 'Dextrum Typography'}</h1>
        <p>
          {isArabic
            ? 'تنتمي الخطوط ونبرتها وقواعد استخدامها إلى تنفيذ ثيم Dextrum، بينما يبقى عقد الأدوار الدلالية مستقرا في Foundations.'
            : 'Typeface choices, tone, and usage rules belong to the Dextrum theme implementation. Foundations keeps only the stable semantic type contract.'}
        </p>
      </header>

      <section className="section">
        <div className="foundation-card-grid">
          <a className="foundation-card link-card" href="#/themes/dextrum/typography/app-website">
            <span className="kicker">Dextrum</span>
            <h2>{isArabic ? 'التطبيقات والمواقع' : 'App & Website'}</h2>
            <p>{isArabic ? 'هرمية كثيفة وواضحة لواجهات المنتجات.' : 'Dense, legible hierarchy for product interfaces.'}</p>
          </a>
          <a className="foundation-card link-card" href="#/themes/dextrum/typography/marketing-sales">
            <span className="kicker">Dextrum</span>
            <h2>{isArabic ? 'التسويق والمبيعات' : 'Marketing & Sales'}</h2>
            <p>{isArabic ? 'مقاييس وعروض طباعية للتواصل الخارجي.' : 'Display scale and pairings for external communication.'}</p>
          </a>
        </div>
      </section>
    </div>
  )
}

function ThemeImplementationPage({ path, locale }: { path: string; locale: Locale }) {
  const isArabic = locale === 'ar'
  const isDextrum = path.startsWith('/themes/dextrum')
  const segments = path.split('/').filter(Boolean)
  const section = segments[segments.length - 1] ?? 'overview'
  const themeName = isDextrum ? 'Dextrum' : 'The Utopia Studio Default'
  const sectionLabels: Record<string, { en: string; ar: string }> = {
    overview: { en: 'Overview', ar: 'نظرة عامة' },
    primitives: { en: 'Primitives', ar: 'الرموز الأولية' },
    typography: { en: 'Typography', ar: 'الطباعة' },
    'semantic-mapping': { en: 'Semantic Mapping', ar: 'الربط الدلالي' },
  }
  const label = sectionLabels[section] ?? sectionLabels.overview
  const sectionRoles = themes.requiredSemanticRoles.filter((role) => {
    if (section === 'typography') return role.startsWith('--font') || role.startsWith('--line-height')
    if (section === 'primitives') return ['--background', '--foreground', '--primary', '--secondary', '--muted', '--border', '--input', '--ring', '--radius', '--radius-control', '--radius-surface'].includes(role)
    if (section === 'semantic-mapping') return ['--background', '--foreground', '--card', '--card-foreground', '--primary', '--primary-foreground', '--secondary', '--secondary-foreground', '--muted', '--muted-foreground', '--border', '--input', '--ring'].includes(role)
    return ['--background', '--foreground', '--primary', '--primary-foreground', '--secondary', '--muted', '--muted-foreground', '--border', '--ring', '--radius-control', '--radius-surface', '--motion-duration-page', '--motion-ease-standard', '--font-sans', '--font-arabic'].includes(role)
  })

  return (
    <div className="page">
      <header className="page-hero compact">
        <p className="eyebrow">{themeName}</p>
        <h1>{isArabic ? label.ar : label.en}</h1>
        <p>
          {isArabic
            ? 'هذه الصفحة توثق تنفيذ الثيم فوق عقد دلالي مشترك. لا تعتمد المكونات القابلة لإعادة الاستخدام على قيم العلامة مباشرة.'
            : 'This page documents a theme implementation over the shared semantic contract. Reusable components never consume brand values directly.'}
        </p>
      </header>

      <section className="section">
        <div className="foundation-card-grid theme-implementation-grid">
          <article className="foundation-card" id="theme-ownership">
            <span className="kicker">{isArabic ? 'حدود الملكية' : 'Ownership boundary'}</span>
            <h2>{isArabic ? 'ما يملكه الثيم' : 'What the theme owns'}</h2>
            <p>
              {isArabic
                ? 'القيم الأولية، والخطوط، ونبرة العلامة، ثم ربطها بالأدوار الدلالية المطلوبة.'
                : 'Primitive values, typefaces, brand expression, and their mapping into required semantic roles.'}
            </p>
          </article>
          <article className="foundation-card" id="theme-contract">
            <span className="kicker">{isArabic ? 'العقد' : 'Contract'}</span>
            <h2>{isArabic ? 'أدوار ثابتة' : 'Stable roles'}</h2>
            <div className="chip-list">
              {sectionRoles.map((role) => <span key={role}>{role}</span>)}
            </div>
          </article>
          {isDextrum && section === 'typography' ? (
            <a className="foundation-card link-card" href="#/themes/dextrum/typography">
              <span className="kicker">Dextrum</span>
              <h2>{isArabic ? 'استعراض قواعد الطباعة' : 'Browse typography rules'}</h2>
              <p>{isArabic ? 'قواعد التطبيقات والمواقع والتسويق.' : 'App, website, marketing, and sales guidance.'}</p>
            </a>
          ) : null}
        </div>
      </section>
    </div>
  )
}
