import { getArea, themes, utopiaDefaultTheme } from '../data/design-system'

export function ThemesPage() {
  const area = getArea('themes')
  const theme = themes.themes[0]

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">Themes</p>
        <h1>Token-contract implementations.</h1>
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

        <div className="card-grid wide">
          <article className="theme-card" id="utopia-default">
            <div className="card-row">
              <span className="kicker">{theme.role}</span>
              <span className="pill">locked</span>
            </div>
            <h3>{theme.name}</h3>
            <p>{theme.description}</p>
            <div className="swatches">
              {Object.entries(theme.values).slice(0, 10).map(([key, value]) => (
                <span key={key} style={{ background: value }} title={`${key}: ${value}`} />
              ))}
            </div>
          </article>

          <article className="card accent" id="theme-policy">
            <span className="kicker">Theme policy</span>
            <h3>Brand philosophy lives here, not in core.</h3>
            <p>{utopiaDefaultTheme.summary}</p>
            <code>{theme.policyManifest}</code>
          </article>

          <article className="card" id="icon-policy">
            <span className="kicker">Icon policy</span>
            <h3>{utopiaDefaultTheme.iconPolicy.system}</h3>
            <p>{utopiaDefaultTheme.iconPolicy.description}</p>
            <div className="chip-list">
              {utopiaDefaultTheme.iconPolicy.avoid.map((rule) => <span key={rule}>{rule}</span>)}
            </div>
          </article>

          <article className="card" id="core-boundary">
            <span className="kicker">Core boundary</span>
            <h3>Core does not own brand style.</h3>
            <div className="chip-list">
              {themes.coreBoundary.doesNotOwn.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>

          {themes.plannedThemeSlots.map((slot) => (
            <article key={slot.id} className="card">
              <span className="kicker">planned theme slot</span>
              <h3>{slot.name}</h3>
              <p>{slot.purpose}</p>
            </article>
          ))}

          <article className="card accent" id="semantic-contract">
            <span className="kicker">Required roles</span>
            <h3>Stable semantic contract</h3>
            <p>Future themes may add many primitives and extension tokens, but must preserve these semantic roles.</p>
            <div className="chip-list">
              {themes.requiredSemanticRoles.map((role) => <span key={role}>{role}</span>)}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
