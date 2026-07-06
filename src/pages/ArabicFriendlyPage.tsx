import { themes } from '../data/design-system'

export function ArabicFriendlyPage() {
  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">Arabic Friendly</p>
        <h1>RTL and mixed-script support are system requirements.</h1>
        <p>
          Utopia should be usable as a serious reference system for Arabic-speaking teams. Components, templates, themes, docs, and AI output all need explicit checks.
        </p>
      </section>

      <section className="card-grid wide">
        <article className="card accent" id="arabic-preview" dir="rtl">
          <h3>واجهة عربية جاهزة</h3>
          <p>Preview surfaces must be able to render right-to-left layout and mixed Arabic plus English labels without layout breakage.</p>
        </article>
        <article className="card" id="contract">
          <span className="kicker">Contract</span>
          <h3>Rules every component should pass</h3>
          <div className="rule-list">
            {themes.arabicFriendly.rules.map((rule) => <span key={rule}>{rule}</span>)}
          </div>
        </article>
        <article className="card" id="api-naming">
          <span className="kicker">API naming</span>
          <h3>Use start and end, not left and right</h3>
          <p>Props and slots should use logical names so components can mirror cleanly across LTR and RTL contexts.</p>
          <code>{`<Button startIcon={...} />
<AppShell sidebarPosition="start" />`}</code>
        </article>
        <article className="card" id="ai-rule">
          <span className="kicker">AI rule</span>
          <h3>No invented Arabic copy</h3>
          <p>Agents may test with supplied Arabic strings, placeholders, or verified translations. They should not fabricate production Arabic marketing copy.</p>
        </article>
      </section>
    </div>
  )
}
