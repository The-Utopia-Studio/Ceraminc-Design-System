import { Button } from '../../packages/design-system/src/Button'
import { barrierIntelligenceTheme, dextrumTheme, getArea, themes, utopiaDefaultTheme } from '../data/design-system'
import { sideNavLabel, useI18n, type Locale } from '../i18n'
import { useTheme, type ThemeId } from '../theme'

const themePolicyById = {
  'utopia-default': utopiaDefaultTheme,
  dextrum: dextrumTheme,
  'barrier-intelligence': barrierIntelligenceTheme,
} as const

type ThemeEntry = (typeof themes.themes)[number]
type PlannedThemeSlot = (typeof themes.plannedThemeSlots)[number]

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

function localizedSlot(slot: PlannedThemeSlot, locale: Locale) {
  if (locale !== 'ar') return slot
  return {
    ...slot,
    name: slot.translations.ar.name,
    purpose: slot.translations.ar.purpose,
    audience: slot.translations.ar.audience,
    visualDirection: slot.translations.ar.visualDirection,
    requiredValidation: slot.translations.ar.requiredValidation,
  }
}

export function ThemesPage() {
  const area = getArea('themes')
  const { locale } = useI18n()
  const { setThemeId, themeEntry, themeId } = useTheme()
  const activePolicy = themePolicyById[themeId]
  const copy = pageCopy[locale]
  const activeTheme = localizedTheme(themeEntry as ThemeEntry, locale)
  const activePolicySummary = locale === 'ar' ? activePolicy.translations.ar.summary : activePolicy.summary
  const activeIconPolicy = locale === 'ar' ? activePolicy.translations.ar.iconPolicy : activePolicy.iconPolicy
  const coreBoundaryItems = locale === 'ar' ? themes.translations.ar.coreBoundary.doesNotOwn : themes.coreBoundary.doesNotOwn

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
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
                      <a href="#/docs/foundations/typography/dextrum/marketing-sales">{copy.marketingTypography}</a>
                      <a href="#/docs/foundations/typography/dextrum/app-website">{copy.appTypography}</a>
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

          <section className="catalog-section" aria-labelledby="planned-theme-heading">
            <div className="section-heading">
              <p>{copy.planned}</p>
              <h2 id="planned-theme-heading">{locale === 'ar' ? 'مساحات الثيمات المستقبلية' : 'Future theme workspaces'}</h2>
            </div>
            <div className="planned-theme-grid">
              {themes.plannedThemeSlots.map((sourceSlot) => {
                const slot = localizedSlot(sourceSlot, locale)
                return (
                  <article key={slot.id} className="theme-planned-card">
                    <div className="card-row">
                      <span className="kicker">{copy.planned}</span>
                      <span className="pill">{copy.plannedStatus}</span>
                    </div>
                    <h3>{slot.name}</h3>
                    <p>{slot.purpose}</p>
                    <div className="theme-meta-grid">
                      <div>
                        <strong>{copy.audience}</strong>
                        <div className="chip-list">
                          {slot.audience.map((item) => <span key={item}>{item}</span>)}
                        </div>
                      </div>
                      <div>
                        <strong>{copy.direction}</strong>
                        <p>{slot.visualDirection}</p>
                      </div>
                      <div>
                        <strong>{copy.extensions}</strong>
                        <div className="chip-list">
                          {slot.semanticExtensions.map((item) => <span key={item}>{item}</span>)}
                        </div>
                      </div>
                      <div>
                        <strong>{copy.validation}</strong>
                        <ul className="theme-check-list">
                          {slot.requiredValidation.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
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
