import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  Database,
  FileCheck2,
  Fingerprint,
  Menu,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { applyThemeId } from '../theme'
import './DextrumWebsite.css'

const workflow = [
  { step: '01', title: 'Monitor', copy: 'Controls continuously check the operator record.' },
  { step: '02', title: 'Surface', copy: 'Exceptions appear the moment values fail to reconcile.' },
  { step: '03', title: 'Investigate', copy: 'Trace every result through evidence to provenance.' },
  { step: '04', title: 'Resolve', copy: 'Settle the issue where it arises, with both parties aligned.' },
  { step: '05', title: 'Stamp', copy: 'Record the outcome in a tamper-evident work history.' },
]

const capabilities = [
  {
    icon: Network,
    label: 'Continuous controls',
    title: 'See the state of every control, not a month-old snapshot.',
    copy: 'A live traffic-light view keeps allocation, attribution, and lifting checks visible in one operational picture.',
  },
  {
    icon: Search,
    label: 'Exception intelligence',
    title: 'Move from a flagged number to its source in a few clicks.',
    copy: 'Filter by control, period, severity, and status. Then inspect the expected value, observed value, delta, and linked evidence.',
  },
  {
    icon: FileCheck2,
    label: 'Audit packages',
    title: 'Assemble the record while the work happens.',
    copy: 'Generate an audit package with control outcomes, exceptions, evidence links, provenance hashes, and an advisory executive summary.',
  },
]

function BrandMark() {
  return (
    <a className="dx-brand" href="#top" aria-label="Dextrum home">
      <img src="/brand/dextrum-logo.svg" alt="" />
    </a>
  )
}

function StatusDot({ tone = 'pass' }: { tone?: 'pass' | 'review' | 'neutral' }) {
  return <span className={`dx-status-dot dx-status-dot--${tone}`} aria-hidden="true" />
}

function HeroProductVisual() {
  return (
    <div className="dx-hero-visual" aria-label="Illustration of the Dextrum verification workspace">
      <div className="dx-visual-orbit dx-visual-orbit--one" />
      <div className="dx-visual-orbit dx-visual-orbit--two" />

      <article className="dx-float-card dx-float-card--source">
        <div className="dx-float-card__icon"><Database size={15} /></div>
        <div>
          <span>Operator record</span>
          <strong>Read-only source</strong>
        </div>
        <CircleCheck size={16} />
      </article>

      <article className="dx-product-window">
        <header className="dx-product-window__top">
          <span className="dx-product-mini-brand"><Fingerprint size={14} /> Dextrum</span>
          <span className="dx-product-period">Q2 · 2026</span>
          <span className="dx-avatar">AK</span>
        </header>
        <div className="dx-product-window__body">
          <div className="dx-product-heading">
            <div>
              <span>Control health</span>
              <strong>Verification overview</strong>
            </div>
            <span className="dx-live-pill"><StatusDot /> Cycle complete</span>
          </div>
          <div className="dx-control-grid">
            <div className="dx-control-card">
              <span><StatusDot /> C-001</span>
              <strong>Allocation</strong>
              <small>128 runs · PASS</small>
            </div>
            <div className="dx-control-card">
              <span><StatusDot tone="review" /> C-002</span>
              <strong>Attribution</strong>
              <small>1 exception · REVIEW</small>
            </div>
            <div className="dx-control-card">
              <span><StatusDot /> C-003</span>
              <strong>Lifting</strong>
              <small>84 runs · PASS</small>
            </div>
          </div>
          <div className="dx-exception-panel">
            <div className="dx-exception-panel__heading">
              <div>
                <span>Material exception</span>
                <strong>Allocation variance exceeds tolerance</strong>
              </div>
              <span className="dx-severity">AMBER</span>
            </div>
            <div className="dx-exception-values">
              <span><small>Expected</small><strong>1,234,567 bbl</strong></span>
              <span><small>Observed</small><strong>1,221,045 bbl</strong></span>
              <span><small>Delta</small><strong>−13,522 bbl</strong></span>
            </div>
            <div className="dx-evidence-row">
              <span><Fingerprint size={13} /> Evidence linked</span>
              <span>SHA-256 · 7f9e…b42c</span>
            </div>
          </div>
        </div>
      </article>

      <article className="dx-float-card dx-float-card--evidence">
        <div className="dx-float-card__icon"><ShieldCheck size={15} /></div>
        <div>
          <span>Neutral record</span>
          <strong>Provenance verified</strong>
        </div>
        <Check size={16} />
      </article>

      <article className="dx-float-card dx-float-card--partner">
        <span className="dx-counterparty-avatar">JV</span>
        <div>
          <span>Counterparty</span>
          <strong>Same record verified</strong>
        </div>
      </article>
    </div>
  )
}

type HeroDirection = 'editorial' | 'split'

function getHeroParam(): string | null {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  const pathWithQuery = hash.split('#')[0] ?? ''
  const hashQuery = pathWithQuery.includes('?') ? pathWithQuery.split('?')[1] ?? '' : ''
  return new URLSearchParams(hashQuery).get('hero')
    ?? new URLSearchParams(window.location.search).get('hero')
}

function getInitialHeroDirection(): HeroDirection {
  return getHeroParam() === 'split' ? 'split' : 'editorial'
}

function HeroDirectionSwitch({
  active,
  onChange,
}: {
  active: HeroDirection
  onChange: (direction: HeroDirection) => void
}) {
  return (
    <div className="dx-hero-direction-switch" aria-label="Hero design direction">
      <span>Hero direction</span>
      <button
        className={active === 'editorial' ? 'is-active' : ''}
        type="button"
        onClick={() => onChange('editorial')}
      >
        01 · Editorial
      </button>
      <button
        className={active === 'split' ? 'is-active' : ''}
        type="button"
        onClick={() => onChange('split')}
      >
        02 · Split
      </button>
    </div>
  )
}

function EditorialHero({
  direction,
  onDirectionChange,
}: {
  direction: HeroDirection
  onDirectionChange: (direction: HeroDirection) => void
}) {
  return (
    <section className="dx-hero-alt dx-hero-alt--editorial" id="top">
      <div className="dx-shell dx-editorial-hero">
        <HeroDirectionSwitch active={direction} onChange={onDirectionChange} />
        <div className="dx-editorial-hero__headline">
          <p className="dx-eyebrow"><span /> Neutral verification intelligence</p>
          <h1>
            Operational truth, built to a
            <span className="dx-inline-halo"><Fingerprint size={28} /></span>
            higher standard.
          </h1>
        </div>
        <div className="dx-editorial-hero__support">
          <p>
            Continuous controls, connected evidence, and tamper-evident provenance—so every party
            can stand behind the same operational number.
          </p>
          <div>
            <a className="dx-button dx-button--round" href="mailto:hello@dextrum.com">
              Request a briefing <span><ArrowRight size={17} /></span>
            </a>
            <a className="dx-alt-outline-button" href="#platform">Explore the platform</a>
          </div>
        </div>
        <div className="dx-editorial-product-stage">
          <div className="dx-editorial-browser-bar" aria-hidden="true">
            <span /><span /><span />
            <div><Fingerprint size={13} /> dextrum.io / verification overview</div>
            <b>Audit-defensible</b>
          </div>
          <div className="dx-editorial-product-stage__body">
            <div className="dx-editorial-product-intro">
              <span>Neutral record</span>
              <h2>Every result carries its own proof.</h2>
              <p>Control → Evidence → Exception → Provenance</p>
              <div>
                <span>Read-only</span><span>Deterministic</span><span>Traceable</span>
              </div>
            </div>
            <div className="dx-editorial-product-visual">
              <HeroProductVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SplitHero({
  direction,
  onDirectionChange,
}: {
  direction: HeroDirection
  onDirectionChange: (direction: HeroDirection) => void
}) {
  return (
    <section className="dx-hero-alt dx-hero-alt--split" id="top">
      <div className="dx-shell dx-split-hero">
        <HeroDirectionSwitch active={direction} onChange={onDirectionChange} />
        <div className="dx-split-hero__copy">
          <p className="dx-eyebrow"><span /> For multi-party energy operations</p>
          <h1>
            The verification layer for operations that
            <em> cannot afford doubt.</em>
          </h1>
          <p>
            Read existing systems, surface exceptions as they happen, and give operators, partners,
            and auditors one neutral record they can independently verify.
          </p>
          <div className="dx-split-hero__actions">
            <a className="dx-button dx-button--round" href="mailto:hello@dextrum.com">
              Request a briefing <span><ArrowRight size={17} /></span>
            </a>
            <a className="dx-alt-outline-button" href="#assurance">See how it works</a>
          </div>
          <div className="dx-split-trust">
            <p>Built for every party to the record</p>
            <div><span>Operators</span><span>JV partners</span><span>Finance</span><span>Auditors</span></div>
          </div>
        </div>
        <div className="dx-split-hero__media">
          <div className="dx-split-hero__wash" />
          <div className="dx-split-product-wrap"><HeroProductVisual /></div>
          <div className="dx-split-proof">
            <span><StatusDot /> C-001 Allocation</span>
            <strong>128 checks verified</strong>
            <small>Evidence and provenance linked</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DextrumWebsite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroDirection, setHeroDirection] = useState<HeroDirection>(getInitialHeroDirection)

  function changeHeroDirection(direction: HeroDirection) {
    setHeroDirection(direction)
    const url = new URL(window.location.href)
    url.searchParams.delete('hero')
    url.hash = `/website?hero=${direction}`
    window.history.replaceState(null, '', url)
  }

  useEffect(() => {
    applyThemeId('dextrum')
    document.title = 'Dextrum — Continuous verification intelligence'
  }, [])

  return (
    <div className="dx-site" data-typography="marketing">
      <header className="dx-header">
        <div className="dx-shell dx-header__inner">
          <BrandMark />
          <nav className={menuOpen ? 'dx-nav is-open' : 'dx-nav'} aria-label="Primary navigation">
            <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a>
            <a href="#workflow" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#assurance" onClick={() => setMenuOpen(false)}>Assurance</a>
            <a href="#use-cases" onClick={() => setMenuOpen(false)}>Use cases</a>
            <a href="#company" onClick={() => setMenuOpen(false)}>Company</a>
          </nav>
          <div className="dx-header__actions">
            <a className="dx-link-button" href="#platform">Explore platform</a>
            <a className="dx-button dx-button--small" href="mailto:hello@dextrum.com">Request a briefing <ArrowRight size={15} /></a>
          </div>
          <button
            className="dx-menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        {heroDirection === 'editorial' ? (
          <EditorialHero direction={heroDirection} onDirectionChange={changeHeroDirection} />
        ) : (
          <SplitHero direction={heroDirection} onDirectionChange={changeHeroDirection} />
        )}

        <section className="dx-section dx-intro" id="platform">
          <div className="dx-shell">
            <div className="dx-meet-heading">
              <div>
                <p className="dx-eyebrow"><span /> Meet Dextrum</p>
                <h2>Verification that<br />moves with the operation.</h2>
                <a className="dx-button dx-button--round dx-button--dark" href="#assurance">
                  Discover how <span><ArrowRight size={16} /></span>
                </a>
              </div>
              <p>
                Dextrum is a neutral intelligence layer that reads the systems you already use and
                turns their data into continuous evidence every party can independently verify.
              </p>
            </div>
            <div className="dx-benefit-grid">
              <article className="dx-benefit-card dx-benefit-card--feature">
                <div>
                  <span className="dx-card-kicker">Continuous evidence</span>
                  <h3>Stop rebuilding the truth after the fact.</h3>
                </div>
                <p>Controls run against the operator record and preserve the evidence chain as work happens.</p>
              </article>
              <article className="dx-benefit-card dx-benefit-card--dark">
                <ShieldCheck size={24} />
                <h3>Neutral by design.</h3>
                <p>Read existing systems without replacing them, so no participant owns the shared truth.</p>
              </article>
              <article className="dx-benefit-card dx-benefit-card--dark">
                <Fingerprint size={24} />
                <h3>Proof stays attached.</h3>
                <p>Every result connects to source evidence and a tamper-evident provenance record.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="dx-role-marquee" aria-label="Designed for multi-party operations">
          <div className="dx-shell dx-role-marquee__inner">
            <p>Designed for every party<br />that needs to stand behind the number.</p>
            <div className="dx-marquee-window">
              <div className="dx-backers-track">
                {[0, 1].map((set) => (
                  <div className="dx-marquee-set dx-marquee-set--roles" key={set} aria-hidden={set === 1}>
                    <span>Commercial</span><span>Finance</span><span>Joint ventures</span>
                    <span>Assurance</span><span>LNG governance</span><span>PSC operations</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="dx-section dx-ceep" id="assurance">
          <div className="dx-shell dx-ceep__grid">
            <div className="dx-ceep__copy">
              <p className="dx-eyebrow"><span /> The CEEP model</p>
              <h2>Every result carries<br />its own proof.</h2>
              <p>
                Controls produce evidence, exceptions surface the break, and provenance stamps the
                record. The full chain stays inspectable—from verdict to source.
              </p>
              <a className="dx-text-link" href="#workflow">Follow an exception <ChevronRight size={16} /></a>
            </div>
            <div className="dx-ceep-diagram">
              {[
                ['C', 'Controls', 'Deterministic checks'],
                ['E', 'Evidence', 'Source-linked facts'],
                ['E', 'Exceptions', 'Breaks surfaced early'],
                ['P', 'Provenance', 'Tamper-evident history'],
              ].map(([letter, title, copy], index) => (
                <article key={title} className="dx-ceep-card">
                  <span className="dx-ceep-card__index">0{index + 1}</span>
                  <span className="dx-ceep-card__letter">{letter}</span>
                  <div><strong>{title}</strong><small>{copy}</small></div>
                  {index < 3 ? <ChevronRight className="dx-ceep-card__arrow" size={17} /> : <Check className="dx-ceep-card__arrow" size={17} />}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dx-section dx-workflow-section" id="workflow">
          <div className="dx-shell">
            <div className="dx-section-heading">
              <p className="dx-eyebrow"><span /> The operational loop</p>
              <h2>Resolve the break<br /><em>where it happens.</em></h2>
              <p>Verification moves with the operation, instead of arriving as a checkpoint months later.</p>
            </div>
            <div className="dx-workflow">
              {workflow.map((item, index) => (
                <article key={item.step} className={index === 2 ? 'is-featured' : ''}>
                  <span>{item.step}</span>
                  <div className="dx-workflow__icon">
                    {index === 0 && <Network size={20} />}
                    {index === 1 && <ShieldCheck size={20} />}
                    {index === 2 && <Search size={20} />}
                    {index === 3 && <FileCheck2 size={20} />}
                    {index === 4 && <Fingerprint size={20} />}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dx-section dx-capabilities" id="use-cases">
          <div className="dx-shell">
            <article className="dx-usecase-editorial">
              <div className="dx-usecase-editorial__intro">
                <p className="dx-eyebrow"><span /> Dextrum in practice</p>
                <h2>Built for the<br />shared record.</h2>
                <p>
                  Give commercial teams, partners, and auditors one evidence trail—without asking
                  them to surrender their independence or replace the systems they already trust.
                </p>
              </div>
              <div className="dx-usecase-editorial__media">
                <video autoPlay muted loop playsInline aria-hidden="true">
                  <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4" type="video/mp4" />
                </video>
                <div className="dx-usecase-editorial__wash" />
                <div className="dx-usecase-editorial__copy">
                  <span>For joint operations</span>
                  <h3>Resolve the exception where it arises.</h3>
                  <p>
                    Surface the break, inspect the same evidence, and preserve the agreed outcome
                    in one forward-only, tamper-evident work history.
                  </p>
                  <a href="#workflow"><span><ArrowRight size={16} /></span> Follow the operational loop</a>
                </div>
              </div>
            </article>
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <article className="dx-capability" key={capability.title}>
                  <div className="dx-capability__copy">
                    <p className="dx-eyebrow"><Icon size={14} /> {capability.label}</p>
                    <h2>{capability.title}</h2>
                    <p>{capability.copy}</p>
                    <a className="dx-text-link" href="mailto:hello@dextrum.com">Discuss your operation <ChevronRight size={16} /></a>
                  </div>
                  <div className={`dx-capability-visual dx-capability-visual--${index + 1}`} aria-hidden="true">
                    {index === 0 && (
                      <div className="dx-mini-dashboard">
                        <header><span>Control health</span><small>Last cycle · 09:42</small></header>
                        {['Allocation', 'Attribution', 'Lifting'].map((label, itemIndex) => (
                          <div key={label}>
                            <StatusDot tone={itemIndex === 1 ? 'review' : 'pass'} />
                            <strong>{label}</strong>
                            <span>{itemIndex === 1 ? '1 exception' : 'Passing'}</span>
                            <small>C-00{itemIndex + 1}</small>
                          </div>
                        ))}
                      </div>
                    )}
                    {index === 1 && (
                      <div className="dx-mini-exception">
                        <header><span>EXC-2026-0142</span><b>AMBER</b></header>
                        <h3>Allocation variance exceeds agreed tolerance</h3>
                        <p><Sparkles size={13} /> AI-generated explanation · advisory</p>
                        <div><span>Expected<strong>1,234,567</strong></span><span>Observed<strong>1,221,045</strong></span></div>
                        <footer><Fingerprint size={14} /> 4 evidence records linked</footer>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="dx-mini-report">
                        <div className="dx-mini-report__page">
                          <span>DEXTRUM · Q2 2026</span>
                          <h3>Verification package</h3>
                          <i />
                          <i />
                          <div><span /><span /><span /></div>
                          <small>Controls · Exceptions · Evidence · Provenance</small>
                        </div>
                        <span className="dx-report-ready"><Check size={14} /> Package ready</span>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="dx-section dx-ai-boundary">
          <div className="dx-shell dx-ai-boundary__grid">
            <div className="dx-ai-visual" aria-hidden="true">
              <div className="dx-ai-core">
                <Fingerprint size={26} />
                <span>Deterministic core</span>
                <strong>VERIFIED</strong>
              </div>
              <div className="dx-ai-orbit">
                <Sparkles size={20} />
                <span>Advisory AI</span>
                <small>Explain · Query · Draft</small>
              </div>
            </div>
            <div className="dx-ai-boundary__copy">
              <p className="dx-eyebrow"><Sparkles size={14} /> Intelligence with a hard boundary</p>
              <h2>AI explains the result.<br />It never decides it.</h2>
              <p>
                Dextrum uses AI to translate exceptions, answer questions over evidence, suggest likely
                causes, and draft reports. Verification and severity remain deterministic and inspectable.
              </p>
              <ul>
                <li><Check size={15} /> Never computes a control result</li>
                <li><Check size={15} /> Never modifies source data</li>
                <li><Check size={15} /> Always labelled and paired with raw evidence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="dx-final-cta" id="company">
          <div className="dx-final-cta__glow" aria-hidden="true" />
          <div className="dx-shell dx-final-cta__inner">
            <p className="dx-eyebrow"><span /> Verification as a continuous state</p>
            <h2>Make every operational<br />number ready to stand behind.</h2>
            <p>See how a neutral verification layer can fit above your existing systems.</p>
            <a className="dx-button dx-button--light" href="mailto:hello@dextrum.com">Request a briefing <ArrowRight size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="dx-footer">
        <div className="dx-shell dx-footer__top">
          <div>
            <BrandMark />
            <p>Neutral verification intelligence for multi-party energy operations.</p>
          </div>
          <div className="dx-footer__links">
            <div><strong>Platform</strong><a href="#platform">Overview</a><a href="#workflow">How it works</a><a href="#assurance">Assurance</a></div>
            <div><strong>Use cases</strong><a href="#use-cases">Operators</a><a href="#use-cases">JV partners</a><a href="#use-cases">Auditors</a></div>
            <div><strong>Company</strong><a href="#company">About</a><a href="mailto:hello@dextrum.com">Contact</a><a href="#company">Privacy</a></div>
          </div>
        </div>
        <div className="dx-shell dx-footer__bottom">
          <span>© 2026 Dextrum. All rights reserved.</span>
          <span>Audit-defensible · ISAE 3000-mappable · Tamper-evident</span>
        </div>
      </footer>
    </div>
  )
}
