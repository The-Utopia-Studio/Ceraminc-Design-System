import { getArea, getTemplateCategoryLabel, templates } from '../data/design-system'

export function TemplatesPage() {
  const area = getArea('templates')
  const categorySections = [
    { id: 'website-pages', label: 'Website Pages', templates: templates.templates.filter((template) => template.category === 'website-page') },
    { id: 'product-saas', label: 'Product / SaaS', templates: templates.templates.filter((template) => template.category === 'product-saas') },
    { id: 'production-examples', label: 'Production Examples', templates: templates.templates.filter((template) => template.category === 'production-example') },
  ]

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">Templates</p>
        <h1>Pages and product surfaces for AI generation.</h1>
        <p>{area?.description}</p>
      </section>

      <section className="split-grid">
        <aside className="rail">
          {area?.groups.map((group) => (
            <div key={group.id} className="rail-group">
              <strong>{group.label}</strong>
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          ))}
        </aside>

        <div className="content-stack">
          {categorySections.map((section) => (
            <section key={section.id} id={section.id} className="catalog-section">
              <div className="section-heading">
                <p>Templates</p>
                <h2>{section.label}</h2>
              </div>
              <div className="card-grid wide">
                {section.templates.length > 0 ? section.templates.map((template) => (
                  <article key={template.id} className="card">
                    <span className="kicker">{getTemplateCategoryLabel(template.category)}</span>
                    <h3>{template.title}</h3>
                    <p>{template.purpose}</p>
                    <div className="chip-list">
                      {template.sections.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <code>utopia-ds template {template.id} --skeleton --dense</code>
                  </article>
                )) : (
                  <article className="card">
                    <span className="kicker">planned</span>
                    <h3>{section.label}</h3>
                    <p>This catalog section is reserved for manifest-backed templates.</p>
                  </article>
                )}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}
