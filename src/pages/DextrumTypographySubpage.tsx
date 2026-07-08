import { dextrumTheme } from '../data/design-system'

type Segment = 'marketing-sales' | 'app-website'

type DextrumTypographySubpageProps = {
  segment: Segment
}

const pageMeta = {
  'marketing-sales': {
    title: 'Marketing & Sales Typography',
    eyebrow: 'Dextrum · Marketing & Sales',
    intro: 'Clash Grotesk sets brand presence on pitch decks, campaigns, and website headers. Satoshi carries supporting body copy and labels where marketing surfaces need readable paragraphs.',
    pairing: dextrumTheme.brandPrimitives.typography.marketingSales,
    rationale: 'Marketing type sets the vibe — bold display rhythm, confident headlines, and campaign-ready energy. Use this pairing when the surface is selling, announcing, or framing a narrative.',
    specimens: [
      { role: 'Display headline', token: '--font-marketing-display', sample: 'Build with precision.', className: 'dextrum-type-specimen dextrum-type-specimen--display dextrum-type-specimen--hero' },
      { role: 'Section heading', token: '--font-marketing-display', sample: 'Ocean-blue clarity for technical brands.', className: 'dextrum-type-specimen dextrum-type-specimen--display dextrum-type-specimen--section' },
      { role: 'Marketing body', token: '--font-ui-support', sample: 'Satoshi keeps long-form campaign copy readable without stealing focus from Clash Grotesk display moments.', className: 'dextrum-type-specimen dextrum-type-specimen--support dextrum-type-specimen--body' },
      { role: 'Eyebrow / label', token: '--font-ui-support', sample: 'DEXTRUM PLATFORM', className: 'dextrum-type-specimen dextrum-type-specimen--support dextrum-type-specimen--eyebrow' },
    ],
    usage: [
      ['Pitch decks', 'Use Clash Grotesk for slide titles and hero statements. Keep supporting bullets in Satoshi.'],
      ['Campaign headers', 'Pair display headlines with short Satoshi subheads on dark blue surfaces.'],
      ['Website heroes', 'Marketing display may appear in website headers even when the rest of the product uses Manrope.'],
      ['Avoid', 'Do not use Clash Grotesk in dense app menus, data tables, or long dashboard paragraphs.'],
    ],
    tokens: [
      ['Marketing display', '--font-marketing-display', 'Clash Grotesk', 'Hero headlines, slide titles, website headers — opt in via data-typography="marketing" or .dextrum-marketing-display'],
      ['Body / support', '--font-ui-support', 'Satoshi', 'Marketing paragraphs, eyebrows, supporting labels'],
      ['Arabic', '--font-arabic', 'IBM Plex Sans Arabic', 'Arabic marketing copy — never apply Latin tracking rules'],
    ],
  },
  'app-website': {
    title: 'App & Website Typography',
    eyebrow: 'Dextrum · App & Website',
    intro: 'Manrope drives product UI, dashboards, and long-form web reading on dark surfaces. Satoshi supports compact labels, metadata, and secondary UI text where Manrope needs a lighter voice.',
    pairing: dextrumTheme.brandPrimitives.typography.appWebsite,
    rationale: 'App type optimizes readability on small screens and in dark mode — neutral rhythm, comfortable line-height, and UI density that survives dashboards and documentation.',
    specimens: [
      { role: 'UI heading', token: '--font-sans', sample: 'Dashboard overview', className: 'dextrum-type-specimen dextrum-type-specimen--sans dextrum-type-specimen--ui-heading' },
      { role: 'Body / UI copy', token: '--font-sans', sample: 'Manrope keeps dense product UI legible on charcoal surfaces, small viewports, and long documentation pages.', className: 'dextrum-type-specimen dextrum-type-specimen--sans dextrum-type-specimen--body' },
      { role: 'Supporting label', token: '--font-ui-support', sample: 'Last synced · 2 min ago', className: 'dextrum-type-specimen dextrum-type-specimen--support dextrum-type-specimen--meta' },
      { role: 'Form label', token: '--font-sans', sample: 'Workspace name', className: 'dextrum-type-specimen dextrum-type-specimen--sans dextrum-type-specimen--label' },
    ],
    usage: [
      ['Product UI', 'Use Manrope for navigation, forms, tables, settings, and in-app documentation.'],
      ['Dark mode', 'Manrope maintains clarity on dark blue and charcoal surfaces without heavy display styling.'],
      ['Supporting text', 'Use Satoshi for metadata, compact labels, and secondary UI hints via --font-ui-support.'],
      ['Avoid', 'Do not use Clash Grotesk in dense app chrome — reserve display type for marketing surfaces.'],
    ],
    tokens: [
      ['UI / body', '--font-sans', 'Manrope', 'Navigation, forms, tables, dashboards, long reading'],
      ['Product display', '--font-display', 'Manrope', 'In-product headings and hero copy — same stack as --font-sans'],
      ['UI support', '--font-ui-support', 'Satoshi', 'Metadata, compact labels, secondary UI text'],
      ['Arabic', '--font-arabic', 'IBM Plex Sans Arabic', 'Arabic product UI — separate display/body rhythm from Latin'],
    ],
  },
} as const

export function DextrumTypographySubpage({ segment }: DextrumTypographySubpageProps) {
  const page = pageMeta[segment]
  const pairing = page.pairing

  return (
    <div className="page dextrum-typography-page">
      <section className="page-hero compact">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>

      <article className="docs-article">
        <section id="overview">
          <h2>Overview</h2>
          <div className="foundation-card-grid">
            <article className="foundation-card">
              <strong>Pairing</strong>
              <p>
                {'display' in pairing
                  ? `${pairing.display} + ${pairing.body}`
                  : `${pairing.ui} + ${pairing.support}`}
              </p>
            </article>
            <article className="foundation-card">
              <strong>Use when</strong>
              <p>{pairing.use}</p>
            </article>
            <article className="foundation-card">
              <strong>Rationale</strong>
              <p>{page.rationale}</p>
            </article>
          </div>
        </section>

        <section id="pairing">
          <h2>Font Pairing</h2>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Family</th>
                <th>Semantic token</th>
              </tr>
            </thead>
            <tbody>
              {page.tokens.map(([role, token, family]) => (
                <tr key={token}>
                  <td>{role}</td>
                  <td><strong>{family}</strong></td>
                  <td><code>{token}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="dextrum-type-note">{dextrumTheme.brandPrimitives.typography.rationale}</p>
        </section>

        <section id="tokens">
          <h2>Token Mapping</h2>
          <p>Dextrum maps brand font choices to Ceramic semantic tokens. Product chrome consumes Manrope via <code>--font-sans</code> and <code>--font-display</code>. Clash Grotesk is available only through <code>--font-marketing-display</code> on explicit marketing surfaces.</p>
          <div className="token-chip-grid">
            {page.tokens.map(([, token]) => <span key={token}>{token}</span>)}
          </div>
          <table className="docs-table guidance-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Dextrum value</th>
                <th>When to use</th>
              </tr>
            </thead>
            <tbody>
              {page.tokens.map(([role, token, family, use]) => (
                <tr key={token}>
                  <td><code>{token}</code></td>
                  <td>{family}</td>
                  <td>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="specimens">
          <h2>Specimens</h2>
          <p>Previews use active Dextrum theme tokens. Activate Dextrum under Themes if specimens look off-brand.</p>
          <div className="dextrum-specimen-grid" data-typography={segment === 'marketing-sales' ? 'marketing' : undefined}>
            {page.specimens.map((specimen) => (
              <article className="dextrum-specimen-card" key={specimen.role}>
                <span className="dextrum-specimen-meta">{specimen.role} · <code>{specimen.token}</code></span>
                <p className={specimen.className}>{specimen.sample}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="usage">
          <h2>Usage</h2>
          <table className="docs-table guidance-table">
            <thead>
              <tr>
                <th>Context</th>
                <th>Guidance</th>
              </tr>
            </thead>
            <tbody>
              {page.usage.map(([context, guidance]) => (
                <tr key={context}>
                  <td><strong>{context}</strong></td>
                  <td>{guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="ai-rules">
          <h2>AI Rules</h2>
          <div className="chip-list">
            {dextrumTheme.aiRules
              .filter((rule) => rule.toLowerCase().includes('manrope') || rule.toLowerCase().includes('clash') || rule.toLowerCase().includes('satoshi') || rule.toLowerCase().includes('arabic') || rule.toLowerCase().includes('font'))
              .map((rule) => <span key={rule}>{rule}</span>)}
          </div>
        </section>
      </article>
    </div>
  )
}

export function dextrumTypographySegmentFromPath(path: string): Segment | null {
  if (path === '/docs/foundations/typography/dextrum/marketing-sales') return 'marketing-sales'
  if (path === '/docs/foundations/typography/dextrum/app-website') return 'app-website'
  return null
}
