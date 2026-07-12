import { getArea, templates } from '../data/design-system'
import { sideNavLabel, useI18n, type Locale } from '../i18n'

type TemplateEntry = (typeof templates.templates)[number]

const categoryCopy = {
  'website-page': {
    en: { eyebrow: 'Website pages', title: 'Narrative and conversion pages' },
    ar: { eyebrow: 'صفحات المواقع', title: 'صفحات السرد والتحويل' },
  },
  'product-saas': {
    en: { eyebrow: 'Product / SaaS', title: 'Operational product surfaces' },
    ar: { eyebrow: 'المنتج وSaaS', title: 'أسطح المنتج التشغيلية' },
  },
  'production-example': {
    en: { eyebrow: 'Production examples', title: 'Composition references' },
    ar: { eyebrow: 'أمثلة الإنتاج', title: 'مراجع التكوين' },
  },
} as const

const pageCopy = {
  en: {
    eyebrow: 'Templates',
    title: 'Start with a page blueprint, not an empty canvas.',
    intro: 'Reusable information architecture for websites and product surfaces. Each blueprint names the sections, Ceramic components, and RTL checks an AI agent or product team should begin with.',
    sourceNote: 'Templates are structural starters. They do not copy another product’s brand, content, or visual primitives.',
    available: 'Available',
    reference: 'Reference',
    starterFor: 'Start here for',
    sections: 'Page structure',
    components: 'Required components',
    command: 'Agent command',
    previewLabel: 'Blueprint preview',
  },
  ar: {
    eyebrow: 'القوالب',
    title: 'ابدأ بمخطط صفحة، لا بلوحة فارغة.',
    intro: 'بنية معلومات قابلة لإعادة الاستخدام للمواقع وأسطح المنتجات. يحدد كل مخطط الأقسام ومكونات Ceramic وفحوص RTL التي يبدأ منها وكيل الذكاء الاصطناعي أو فريق المنتج.',
    sourceNote: 'القوالب نقاط بداية بنيوية. لا تنسخ علامة منتج آخر أو محتواه أو قيمه البصرية.',
    available: 'متاح',
    reference: 'مرجع',
    starterFor: 'مناسب للبدء في',
    sections: 'بنية الصفحة',
    components: 'المكونات المطلوبة',
    command: 'أمر الوكيل',
    previewLabel: 'معاينة المخطط',
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

function TemplateBlueprintPreview({ kind, label }: { kind: string; label: string }) {
  return (
    <div aria-label={label} className="template-preview" data-kind={kind} role="img">
      <span className="template-preview__rail" />
      <div className="template-preview__canvas">
        <span className="template-preview__nav" />
        <div className="template-preview__hero">
          <span />
          <span />
        </div>
        <div className="template-preview__metrics">
          <span />
          <span />
          <span />
        </div>
        <div className="template-preview__body">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

export function TemplatesPage() {
  const area = getArea('templates')
  const { locale } = useI18n()
  const copy = pageCopy[locale]
  const categorySections = (['website-page', 'product-saas', 'production-example'] as const).map((category) => ({
    category,
    id: category === 'website-page' ? 'website-pages' : category === 'product-saas' ? 'product-saas' : 'production-examples',
    templates: templates.templates.filter((template) => template.category === category),
  }))

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
        <p className="template-source-note">{copy.sourceNote}</p>
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

        <div className="content-stack template-catalog">
          {categorySections.map((section) => {
            const category = categoryCopy[section.category][locale]
            return (
              <section key={section.id} id={section.id} className="catalog-section">
                <div className="section-heading">
                  <p>{category.eyebrow}</p>
                  <h2>{category.title}</h2>
                </div>
                <div className="template-grid">
                  {section.templates.map((sourceTemplate) => {
                    const template = localizedTemplate(sourceTemplate, locale)
                    const status = template.status === 'reference' ? copy.reference : copy.available
                    return (
                      <article key={template.id} className="template-card">
                        <TemplateBlueprintPreview kind={template.preview.kind} label={`${template.title}: ${copy.previewLabel}`} />
                        <div className="template-card__content">
                          <div className="card-row">
                            <span className="kicker">{category.eyebrow}</span>
                            <span className="pill">{status}</span>
                          </div>
                          <h3>{template.title}</h3>
                          <p>{template.purpose}</p>
                          <div className="template-meta-grid">
                            <div>
                              <strong>{copy.starterFor}</strong>
                              <div className="chip-list">
                                {template.starterFor.map((item) => <span key={item}>{item}</span>)}
                              </div>
                            </div>
                            <div>
                              <strong>{copy.sections}</strong>
                              <ol className="template-section-list">
                                {template.sections.map((item) => <li key={item}>{item}</li>)}
                              </ol>
                            </div>
                            <div>
                              <strong>{copy.components}</strong>
                              <div className="chip-list">
                                {template.requiredComponents.map((item) => <span key={item}>{item}</span>)}
                              </div>
                            </div>
                          </div>
                          <div className="template-command">
                            <span>{copy.command}</span>
                            <code>npx utopia-ds template {template.id} --skeleton --dense</code>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </div>
  )
}
