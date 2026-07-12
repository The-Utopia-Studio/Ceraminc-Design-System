import { catalog, patterns, routeMap } from '../data/design-system'

export function HomePage() {
  return (
    <div className="page">
      <section className="page-hero">
        <p className="eyebrow">Utopia Design System</p>
        <h1>Getting Started</h1>
        <p>
          Add the design system to your project and start building with semantic tokens, shadcn-style primitives, and the active theme policy.
        </p>
      </section>

      <section className="principles" aria-label="Design system principles">
        {patterns.principles.map((principle) => <span key={principle}>{principle}</span>)}
      </section>

      <section className="section">
        <div className="section-heading">
          <p>Top Level IA</p>
          <h2>Four product areas, one AI-readable source of truth.</h2>
        </div>
        <div className="card-grid">
          {catalog.topLevelAreas.map((area) => {
            return (
              <a key={area.id} className="card link-card" href={`#/${area.id}`}>
                <h3>{area.label}</h3>
                <p>{area.description}</p>
                <span className="text-link">Open {area.label}</span>
              </a>
            )
          })}
          <a className="card accent link-card" href="#/arabic-friendly">
            <h3>Arabic Friendly</h3>
            <p>RTL, mixed-script labels, logical layout, localized typography, and no invented Arabic copy.</p>
            <span className="text-link">Open Arabic rules</span>
          </a>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p>AI Entry</p>
          <h2>Agents should start from manifests, docs, and CLI discovery.</h2>
        </div>
        <div className="card-grid wide">
          <article className="card accent">
            <h3>Quick Start with AI</h3>
            <p>Read the generated docs first, then use dense CLI output before creating UI.</p>
            <pre>{`npx utopia-ds manifest --json
npx utopia-ds search "app shell" --json
npx utopia-ds component Button --json
npx utopia-ds docs arabic-friendly --dense
npx utopia-ds mcp`}</pre>
          </article>
          {routeMap.slice(1).map((route) => (
            <a key={route.id} className="card link-card" href={`#${route.path}`}>
              <span className="kicker">{route.label}</span>
              <h3>{route.description}</h3>
              <span className="text-link">Go to {route.label}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
