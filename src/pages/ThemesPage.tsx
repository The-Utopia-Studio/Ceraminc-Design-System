import { getArea, themes, utopiaDefaultTheme, dextrumTheme, barrierIntelligenceTheme } from '../data/design-system'
import { useTheme, type ThemeId } from '../theme'

const themePolicyById = {
  'utopia-default': utopiaDefaultTheme,
  dextrum: dextrumTheme,
  'barrier-intelligence': barrierIntelligenceTheme,
} as const

type ThemesPageProps = {
  path?: string
}

export function ThemesPage(_props: ThemesPageProps = {}) {
  const area = getArea('themes')
  const { setActiveThemeId, activeThemeId, themeEntry } = useTheme()
  const activePolicy = themePolicyById[activeThemeId]

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">Themes</p>
        <h1>Preview token-contract implementations.</h1>
        <p>{area?.description}</p>
        <p className="note">Theme preview updates component tokens and styling only. Ceramic navigation and docs chrome stay Utopia/Ceramic.</p>
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
          {themes.themes.map((theme) => {
            const isActive = theme.id === activeThemeId

            return (
              <article
                className={`theme-card${isActive ? ' theme-card--active' : ''}`}
                id={theme.id}
                key={theme.id}
              >
                <div className="card-row">
                  <span className="kicker">{theme.role}</span>
                  {theme.locked ? <span className="pill">locked</span> : null}
                  {isActive ? <span className="pill">active</span> : null}
                </div>
                <h3>{theme.name}</h3>
                <p>{theme.description}</p>
                <div className="swatches">
                  {Object.entries(theme.values).slice(0, 10).map(([key, value]) => (
                    <span key={key} style={{ background: value }} title={`${key}: ${value}`} />
                  ))}
                </div>
                <button
                  className="theme-activate-button"
                  disabled={isActive}
                  onClick={() => setActiveThemeId(theme.id as ThemeId)}
                  type="button"
                >
                  {isActive ? 'Currently previewing' : `Preview ${theme.name}`}
                </button>
                {theme.id === 'dextrum' ? (
                  <div className="dextrum-type-links">
                    <a href="#/docs/foundations/typography/dextrum/marketing-sales">View Marketing &amp; Sales typography docs →</a>
                    <a href="#/docs/foundations/typography/dextrum/app-website">View App &amp; Website typography docs →</a>
                  </div>
                ) : null}
              </article>
            )
          })}

          <article className="card accent" id="theme-policy">
            <span className="kicker">Theme policy</span>
            <h3>{activePolicy.name}</h3>
            <p>{activePolicy.summary}</p>
            <code>{themeEntry.policyManifest}</code>
          </article>

          <article className="card" id="icon-policy">
            <span className="kicker">Icon policy</span>
            <h3>{activePolicy.iconPolicy.system}</h3>
            <p>{activePolicy.iconPolicy.description}</p>
            <div className="chip-list">
              {activePolicy.iconPolicy.allow.map((rule) => <span key={rule}>{rule}</span>)}
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
