import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

gsap.registerPlugin(ScrollTrigger)

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

type HeroDirection = 'editorial' | 'split' | 'platform'

function getHeroParam(): string | null {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  const pathWithQuery = hash.split('#')[0] ?? ''
  const hashQuery = pathWithQuery.includes('?') ? pathWithQuery.split('?')[1] ?? '' : ''
  return new URLSearchParams(hashQuery).get('hero')
    ?? new URLSearchParams(window.location.search).get('hero')
}

function getInitialHeroDirection(): HeroDirection {
  const direction = getHeroParam()
  return direction === 'split' || direction === 'platform' ? direction : 'editorial'
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
      <button
        className={active === 'platform' ? 'is-active' : ''}
        type="button"
        onClick={() => onChange('platform')}
      >
        03 · Platform
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

const platformBenefits = [
  { icon: Network, label: 'Continuous controls' },
  { icon: Search, label: 'Exceptions surfaced' },
  { icon: FileCheck2, label: 'Evidence linked' },
  { icon: Fingerprint, label: 'Provenance stamped' },
  { icon: ShieldCheck, label: 'Independent verification' },
]

function PlatformHero({
  direction,
  onDirectionChange,
}: {
  direction: HeroDirection
  onDirectionChange: (direction: HeroDirection) => void
}) {
  return (
    <section className="dx-hero-alt dx-hero-alt--platform" id="top">
      <div className="dx-shell dx-platform-hero">
        <HeroDirectionSwitch active={direction} onChange={onDirectionChange} />
        <div className="dx-platform-hero__canvas">
          <div className="dx-platform-wave dx-platform-wave--one" aria-hidden="true" />
          <div className="dx-platform-wave dx-platform-wave--two" aria-hidden="true" />

          <div className="dx-platform-hero__copy">
            <p className="dx-eyebrow"><span /> Neutral verification intelligence</p>
            <h1>Continuous verification for every party to the record.</h1>
            <p className="dx-platform-hero__lede">
              Dextrum reads existing operational systems and turns their data into continuous,
              audit-defensible evidence.
            </p>
            <div className="dx-platform-hero__actions">
              <a className="dx-platform-primary" href="mailto:hello@dextrum.com">
                Request a briefing <ArrowRight size={17} />
              </a>
              <a className="dx-platform-secondary" href="#platform">Explore the platform</a>
            </div>
          </div>

          <div className="dx-platform-hero__visual" aria-label="Dextrum verification dashboard preview">
            <article className="dx-platform-card dx-platform-card--health">
              <header>
                <div><Fingerprint size={16} /><span>Controls health</span></div>
                <small><StatusDot /> Cycle complete</small>
              </header>
              <div className="dx-platform-health__summary">
                <div><span>Current state</span><strong>Verified</strong></div>
                <div className="dx-platform-ring"><span>3/3</span></div>
              </div>
              <div className="dx-platform-control-list">
                {['Allocation', 'Attribution', 'Lifting'].map((label, index) => (
                  <div key={label}>
                    <StatusDot tone={index === 1 ? 'review' : 'pass'} />
                    <strong>{label}</strong>
                    <span>{index === 1 ? 'Review' : 'Passing'}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="dx-platform-card dx-platform-card--exception">
              <header><span>Material exception</span><b>REVIEW</b></header>
              <h2>Allocation variance exceeds agreed tolerance</h2>
              <div>
                <span><Search size={14} /> Source traced</span>
                <span><FileCheck2 size={14} /> Evidence linked</span>
              </div>
            </article>

            <article className="dx-platform-card dx-platform-card--proof">
              <Fingerprint size={18} />
              <div><span>Provenance status</span><strong>Record stamped</strong></div>
              <CircleCheck size={18} />
            </article>
          </div>

          <div className="dx-platform-benefits" aria-label="Platform benefits">
            {platformBenefits.map(({ icon: Icon, label }) => (
              <div key={label}>
                <span><Icon size={21} /></span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function DextrumWebsite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroDirection, setHeroDirection] = useState<HeroDirection>(getInitialHeroDirection)
  const pageRef = useRef<HTMLDivElement>(null)

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

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const interactionCleanups: Array<() => void> = []
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          '[data-dx-animate], [data-dx-stage], [data-dx-marker], [data-dx-tilt], .dx-dimensional-badge',
          {
          clearProps: 'all',
          },
        )
        return
      }

      const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
      heroTimeline
        .from('.dx-hero-alt .dx-eyebrow', { autoAlpha: 0, y: 16, duration: 0.55 })
        .from('.dx-hero-alt h1', { autoAlpha: 0, y: 34, duration: 0.8 }, '-=0.3')
        .from(
          '.dx-editorial-hero__support > p, .dx-split-hero__copy > p:not(.dx-eyebrow), .dx-platform-hero__lede',
          { autoAlpha: 0, y: 18, duration: 0.55 },
          '-=0.45',
        )
        .from(
          '.dx-editorial-hero__support > div, .dx-split-hero__actions, .dx-platform-hero__actions',
          { autoAlpha: 0, y: 16, duration: 0.5 },
          '-=0.35',
        )
        .from(
          '.dx-editorial-product-stage, .dx-split-hero__media, .dx-platform-hero__visual',
          { autoAlpha: 0, y: 28, scale: 0.985, duration: 0.85 },
          '-=0.45',
        )

      gsap.from('.dx-platform-wave', {
        autoAlpha: 0,
        y: 35,
        scale: 1.04,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power2.out',
      })
      gsap.from('.dx-platform-card', {
        autoAlpha: 0,
        x: 44,
        y: 14,
        rotateY: -5,
        duration: 0.72,
        stagger: 0.14,
        ease: 'power3.out',
      })
      gsap.from('.dx-platform-benefits > div', {
        autoAlpha: 0,
        y: 14,
        duration: 0.4,
        stagger: 0.09,
        ease: 'power2.out',
      })

      gsap.utils.toArray<HTMLElement>('[data-dx-heading]').forEach((heading) => {
        gsap.from(heading, {
          autoAlpha: 0,
          y: 22,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 84%', once: true },
        })
      })

      const ceepTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.dx-ceep-stage', start: 'top 78%', once: true },
      })
      ceepTimeline
        .from('.dx-ceep-stage__visual', {
          autoAlpha: 0,
          y: -38,
          scale: 0.96,
          duration: 0.9,
          ease: 'power3.out',
        })
        .from(
          '.dx-ceep-callout',
          {
            autoAlpha: 0,
            x: (index) => index % 2 === 0 ? -24 : 24,
            duration: 0.5,
            stagger: 0.13,
            ease: 'power2.out',
          },
          '-=0.45',
        )
        .from(
          '.dx-ceep-callout__connector',
          { scaleX: 0, duration: 0.38, stagger: 0.13, ease: 'power1.out' },
          '<',
        )

      const loopPath = page.querySelector<SVGPathElement>('.dx-workflow-progress-path')
      if (loopPath) {
        const pathLength = loopPath.getTotalLength()
        gsap.set(loopPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
        gsap.to(loopPath, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power1.inOut',
          scrollTrigger: { trigger: '.dx-workflow-canvas', start: 'top 76%', once: true },
        })
      }
      gsap.from('.dx-workflow-step', {
        autoAlpha: 0,
        y: 22,
        duration: 0.48,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.dx-workflow-canvas', start: 'top 72%', once: true },
      })
      gsap.from('.dx-workflow-marker', {
        autoAlpha: 0,
        scale: 0.4,
        duration: 0.35,
        stagger: 0.14,
        ease: 'back.out(1.8)',
        scrollTrigger: { trigger: '.dx-workflow-canvas', start: 'top 72%', once: true },
      })

      const aiTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.dx-ai-boundary', start: 'top 70%', once: true },
      })
      aiTimeline
        .from('.dx-ai-boundary__visual > img', {
          autoAlpha: 0,
          y: 18,
          scale: 0.97,
          duration: 0.75,
          ease: 'power3.out',
        })
        .from('.dx-ai-role--core', { autoAlpha: 0, y: 16, duration: 0.5 }, '-=0.35')
        .from(
          '.dx-ai-role--advisory',
          { autoAlpha: 0, x: 26, y: -24, duration: 0.65, ease: 'power2.out' },
          '-=0.2',
        )
        .from(
          '.dx-ai-boundary__copy li',
          { autoAlpha: 0, x: 14, duration: 0.4, stagger: 0.11 },
          '-=0.3',
        )

      const benefitTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.dx-benefit-grid', start: 'top 78%', once: true },
      })
      benefitTimeline
        .from('.dx-benefit-card', {
          autoAlpha: 0,
          y: 42,
          z: -28,
          rotateX: 4,
          scale: 0.97,
          duration: 0.72,
          stagger: 0.12,
          ease: 'power3.out',
          transformOrigin: '50% 100%',
        })
        .from(
          '.dx-benefit-control__active, .dx-benefit-card__badge, .dx-benefit-signal',
          { autoAlpha: 0, y: 12, duration: 0.42, stagger: 0.08, ease: 'power2.out' },
          '-=0.3',
        )
        .from(
          '.dx-benefit-control__row',
          { autoAlpha: 0, x: -8, duration: 0.3, stagger: 0.07, ease: 'power1.out' },
          '-=0.22',
        )

      const useCaseTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.dx-usecase-editorial', start: 'top 76%', once: true },
      })
      useCaseTimeline
        .from('.dx-usecase-editorial__media', {
          autoAlpha: 0,
          y: 46,
          scale: 0.975,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(
          '.dx-usecase-control',
          { autoAlpha: 0, y: 24, rotateX: 4, duration: 0.6, ease: 'power2.out' },
          '-=0.4',
        )
        .from(
          '.dx-usecase-control__row, .dx-usecase-control .dx-dimensional-badge',
          { autoAlpha: 0, y: 8, duration: 0.3, stagger: 0.08 },
          '-=0.28',
        )

      gsap.utils.toArray<HTMLElement>('.dx-capability').forEach((capability) => {
        const visual = capability.querySelector('.dx-capability-visual')
        const layers = capability.querySelectorAll('.dx-surface-layer')
        const activePlane = capability.querySelector('.dx-active-plane')
        const badge = capability.querySelector('.dx-dimensional-badge')
        const details = capability.querySelectorAll(
          '.dx-mini-dashboard > *, .dx-mini-exception > *, .dx-mini-report__page > *',
        )
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: capability, start: 'top 72%', once: true },
        })

        timeline
          .from(visual, {
            autoAlpha: 0,
            y: 44,
            scale: 0.97,
            duration: 0.75,
            ease: 'power3.out',
          })
          .from(
            layers,
            {
              autoAlpha: 0,
              x: (index) => index === 0 ? -28 : 28,
              y: 18,
              scale: 0.95,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
            },
            '-=0.42',
          )
          .from(
            activePlane,
            { autoAlpha: 0, y: 24, rotateX: 4, duration: 0.58, ease: 'power2.out' },
            '-=0.28',
          )
          .from(
            badge,
            { autoAlpha: 0, x: -10, y: 10, scale: 0.9, duration: 0.38, ease: 'back.out(1.4)' },
            '-=0.32',
          )
          .from(
            details,
            { autoAlpha: 0, y: 7, duration: 0.26, stagger: 0.045, ease: 'power1.out' },
            '-=0.22',
          )
      })

      const finalTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.dx-final-cta', start: 'top 72%', once: true },
      })
      finalTimeline
        .from('.dx-final-cta__copy > *', {
          autoAlpha: 0,
          y: 22,
          duration: 0.52,
          stagger: 0.09,
          ease: 'power2.out',
        })
        .from(
          '.dx-final-proof__layer',
          {
            autoAlpha: 0,
            x: (index) => index === 0 ? 28 : -18,
            y: 22,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.34',
        )
        .from(
          '.dx-final-proof__active',
          { autoAlpha: 0, y: 28, rotateX: 5, duration: 0.62, ease: 'power3.out' },
          '-=0.28',
        )
        .from(
          '.dx-final-proof__row, .dx-final-proof .dx-dimensional-badge',
          { autoAlpha: 0, y: 8, duration: 0.28, stagger: 0.07 },
          '-=0.25',
        )

      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 700px)')
      if (finePointer.matches) {
        page.querySelectorAll<HTMLElement>('[data-dx-tilt]').forEach((surface) => {
          const badge = surface.querySelector<HTMLElement>('.dx-dimensional-badge, .dx-report-ready')
          const rotateXTo = gsap.quickTo(surface, 'rotationX', { duration: 0.35, ease: 'power2.out' })
          const rotateYTo = gsap.quickTo(surface, 'rotationY', { duration: 0.35, ease: 'power2.out' })
          const xTo = gsap.quickTo(surface, 'x', { duration: 0.35, ease: 'power2.out' })
          const yTo = gsap.quickTo(surface, 'y', { duration: 0.35, ease: 'power2.out' })
          const badgeXTo = badge
            ? gsap.quickTo(badge, 'x', { duration: 0.42, ease: 'power2.out' })
            : null
          const badgeYTo = badge
            ? gsap.quickTo(badge, 'y', { duration: 0.42, ease: 'power2.out' })
            : null

          gsap.set(surface, { transformPerspective: 1000, transformOrigin: '50% 50%' })

          const onPointerMove = (event: PointerEvent) => {
            const bounds = surface.getBoundingClientRect()
            const relativeX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
            const relativeY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
            rotateXTo(relativeY * -1.8)
            rotateYTo(relativeX * 2.2)
            xTo(relativeX * 2)
            yTo(-4 + relativeY * 1.5)
            badgeXTo?.(relativeX * 4)
            badgeYTo?.(relativeY * 3)
            surface.classList.add('is-pointer-active')
          }
          const onPointerLeave = () => {
            rotateXTo(0)
            rotateYTo(0)
            xTo(0)
            yTo(0)
            badgeXTo?.(0)
            badgeYTo?.(0)
            surface.classList.remove('is-pointer-active')
          }

          surface.addEventListener('pointermove', onPointerMove)
          surface.addEventListener('pointerleave', onPointerLeave)
          interactionCleanups.push(() => {
            surface.removeEventListener('pointermove', onPointerMove)
            surface.removeEventListener('pointerleave', onPointerLeave)
          })
        })
      }

      page
        .querySelectorAll<HTMLElement>('.dx-capability, .dx-usecase-editorial__media, .dx-final-cta__inner')
        .forEach((region) => {
          const surface = region.querySelector<HTMLElement>('[data-dx-tilt]')
          if (!surface) return

          const onFocusIn = () => {
            surface.classList.add('is-keyboard-active')
            gsap.to(surface, { y: -4, duration: 0.24, ease: 'power2.out' })
          }
          const onFocusOut = (event: FocusEvent) => {
            if (region.contains(event.relatedTarget as Node | null)) return
            surface.classList.remove('is-keyboard-active')
            gsap.to(surface, { y: 0, duration: 0.24, ease: 'power2.out' })
          }

          region.addEventListener('focusin', onFocusIn)
          region.addEventListener('focusout', onFocusOut)
          interactionCleanups.push(() => {
            region.removeEventListener('focusin', onFocusIn)
            region.removeEventListener('focusout', onFocusOut)
          })
        })
    }, page)
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 0)
    const heroSafetyTimer = window.setTimeout(() => {
      gsap.set(
        page.querySelectorAll(
          [
            '.dx-hero-alt .dx-eyebrow',
            '.dx-hero-alt h1',
            '.dx-editorial-hero__support > *',
            '.dx-editorial-product-stage',
            '.dx-split-hero__copy > p',
            '.dx-split-hero__actions',
            '.dx-split-hero__media',
            '.dx-platform-hero__lede',
            '.dx-platform-hero__actions',
            '.dx-platform-hero__visual',
            '.dx-platform-wave',
            '.dx-platform-card',
            '.dx-platform-benefits > div',
          ].join(', '),
        ),
        { clearProps: 'opacity,visibility,transform' },
      )
    }, 2200)

    return () => {
      window.clearTimeout(refreshTimer)
      window.clearTimeout(heroSafetyTimer)
      interactionCleanups.forEach((cleanup) => cleanup())
      context.revert()
    }
  }, [heroDirection])

  return (
    <div className="dx-site" data-typography="marketing" ref={pageRef}>
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
        ) : heroDirection === 'split' ? (
          <SplitHero direction={heroDirection} onDirectionChange={changeHeroDirection} />
        ) : (
          <PlatformHero direction={heroDirection} onDirectionChange={changeHeroDirection} />
        )}

        <section className="dx-section dx-intro" id="platform">
          <div className="dx-shell">
            <div className="dx-meet-heading" data-dx-heading>
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
              <article className="dx-benefit-card dx-benefit-card--feature" data-dx-tilt>
                <div>
                  <span className="dx-card-kicker">Continuous evidence</span>
                  <h3>Stop rebuilding the truth after the fact.</h3>
                </div>
                <div className="dx-benefit-control" aria-hidden="true">
                  <div className="dx-benefit-control__active">
                    <header>
                      <span><StatusDot /> Control health</span>
                      <small>Live cycle · 09:42</small>
                    </header>
                    {['Allocation', 'Attribution', 'Lifting'].map((label, index) => (
                      <div className="dx-benefit-control__row" key={label}>
                        <span>C-00{index + 1}</span>
                        <strong>{label}</strong>
                        <small>{index === 1 ? 'Review' : 'Passing'}</small>
                      </div>
                    ))}
                  </div>
                </div>
                <p>Controls run against the operator record and preserve the evidence chain as work happens.</p>
              </article>
              <article className="dx-benefit-card dx-benefit-card--dark" data-dx-tilt>
                <span className="dx-benefit-card__badge dx-dimensional-badge"><ShieldCheck size={20} /></span>
                <div className="dx-benefit-signal" aria-hidden="true"><span /><span /><span /></div>
                <h3>Neutral by design.</h3>
                <p>Read existing systems without replacing them, so no participant owns the shared truth.</p>
              </article>
              <article className="dx-benefit-card dx-benefit-card--dark" data-dx-tilt>
                <span className="dx-benefit-card__badge dx-dimensional-badge"><Fingerprint size={20} /></span>
                <div className="dx-benefit-signal dx-benefit-signal--proof" aria-hidden="true"><span /><span /><span /></div>
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
          <div className="dx-shell">
            <div className="dx-ceep__copy" data-dx-heading>
              <p className="dx-eyebrow"><span /> The CEEP model</p>
              <h2>Every result carries<br />its own proof.</h2>
              <p>
                Controls produce evidence, exceptions surface the break, and provenance stamps the
                record. The full chain stays inspectable—from verdict to source.
              </p>
              <a className="dx-text-link" href="#workflow">Follow an exception <ChevronRight size={16} /></a>
            </div>
            <div className="dx-ceep-stage">
              <div className="dx-ceep-stage__visual">
                <img
                  src="/brand/dextrum-ceep-stack-v2.png"
                  alt="Exploded four-layer verification stack"
                />
              </div>
              <div className="dx-ceep-callouts" aria-label="The four layers of the CEEP model">
              {[
                ['Controls', 'Deterministic checks produce the verdict.'],
                ['Evidence', 'Every result stays linked to source facts.'],
                ['Exceptions', 'Breaks surface at the point of operation.'],
                ['Provenance', 'A tamper-evident history stamps the record.'],
              ].map(([title, copy], index) => (
                <article key={title} className={`dx-ceep-callout dx-ceep-callout--${index + 1}`}>
                  <i className="dx-ceep-callout__connector" aria-hidden="true" />
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section className="dx-section dx-workflow-section" id="workflow">
          <div className="dx-shell">
            <div className="dx-workflow-heading" data-dx-heading>
              <div>
              <p className="dx-eyebrow"><span /> The operational loop</p>
              <h2>Resolve the break<br /><em>where it happens.</em></h2>
              </div>
              <p>Verification moves with the operation, instead of arriving as a checkpoint months later.</p>
            </div>
            <div className="dx-workflow-canvas">
              <img
                src="/brand/dextrum-operational-loop-v2.png"
                alt="Five connected operational stations forming a continuous loop"
              />
              <svg className="dx-workflow-progress" viewBox="0 0 1000 563" aria-hidden="true">
                <path
                  className="dx-workflow-progress-path"
                  d="M170 292 C145 245 205 185 312 182 C365 115 480 101 544 157 C656 145 811 180 821 276 C842 355 758 424 649 414 C566 474 441 461 382 421 C266 438 161 388 170 292 Z"
                />
              </svg>
              <div className="dx-workflow-markers" aria-hidden="true">
                {workflow.map((item, index) => (
                  <span
                    className={`dx-workflow-marker dx-workflow-marker--${index + 1}`}
                    data-dx-marker={index + 1}
                    key={item.step}
                  >
                    {item.step}
                  </span>
                ))}
              </div>
              <ol className="dx-workflow-steps">
                {workflow.map((item, index) => (
                  <li
                    className="dx-workflow-step"
                    data-dx-stage={index + 1}
                    key={item.step}
                    tabIndex={0}
                    aria-label={`${item.step}. ${item.title}: ${item.copy}`}
                  >
                    <span>{item.step}</span>
                    <div><h3>{item.title}</h3><p>{item.copy}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="dx-section dx-capabilities" id="use-cases">
          <div className="dx-shell">
            <article className="dx-usecase-editorial">
              <div className="dx-usecase-editorial__intro" data-dx-heading>
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
                <div className="dx-usecase-control" data-dx-tilt aria-hidden="true">
                  <span className="dx-dimensional-badge"><Search size={16} /></span>
                  <header><span>Active exception</span><b>EXC-0142</b></header>
                  <h4>Shared evidence review</h4>
                  <div className="dx-usecase-control__row"><StatusDot /><span>Operator record</span><strong>Linked</strong></div>
                  <div className="dx-usecase-control__row"><StatusDot /><span>Partner review</span><strong>Aligned</strong></div>
                </div>
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
                  <div className="dx-capability__copy" data-dx-heading>
                    <p className="dx-eyebrow"><Icon size={14} /> {capability.label}</p>
                    <h2>{capability.title}</h2>
                    <p>{capability.copy}</p>
                    <a className="dx-text-link" href="mailto:hello@dextrum.com">Discuss your operation <ChevronRight size={16} /></a>
                  </div>
                  <div className={`dx-capability-visual dx-capability-visual--${index + 1}`} aria-hidden="true">
                    <span className="dx-surface-layer dx-surface-layer--back" />
                    <span className="dx-surface-layer dx-surface-layer--middle" />
                    <span className="dx-dimensional-badge"><Icon size={17} /></span>
                    {index === 0 && (
                      <div className="dx-mini-dashboard dx-active-plane" data-dx-tilt>
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
                      <div className="dx-mini-exception dx-active-plane" data-dx-tilt>
                        <header><span>EXC-2026-0142</span><b>AMBER</b></header>
                        <h3>Allocation variance exceeds agreed tolerance</h3>
                        <p><Sparkles size={13} /> AI-generated explanation · advisory</p>
                        <div><span>Expected<strong>1,234,567</strong></span><span>Observed<strong>1,221,045</strong></span></div>
                        <footer><Fingerprint size={14} /> 4 evidence records linked</footer>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="dx-mini-report dx-active-plane" data-dx-tilt>
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
            <div className="dx-ai-boundary__visual" data-dx-animate>
              <img
                src="/brand/dextrum-ai-boundary-v2.png"
                alt="A protected deterministic verification core with advisory AI outside its boundary"
              />
              <div className="dx-ai-roles">
                <article className="dx-ai-role dx-ai-role--core">
                  <Fingerprint size={18} />
                  <div><span>Inside the boundary</span><h3>Deterministic core</h3><p>Computes controls and preserves the inspectable verdict.</p></div>
                </article>
                <article className="dx-ai-role dx-ai-role--advisory">
                  <Sparkles size={18} />
                  <div><span>Outside the decision path</span><h3>Advisory AI</h3><p>Explains, queries evidence, and drafts—never decides.</p></div>
                </article>
              </div>
            </div>
            <div className="dx-ai-boundary__copy" data-dx-heading>
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
            <div className="dx-final-cta__copy">
              <p className="dx-eyebrow"><span /> Verification as a continuous state</p>
              <h2>Make every operational<br />number ready to stand behind.</h2>
              <p>See how a neutral verification layer can fit above your existing systems.</p>
              <a className="dx-button dx-button--light" href="mailto:hello@dextrum.com">Request a briefing <ArrowRight size={17} /></a>
            </div>
            <div className="dx-final-proof" data-dx-tilt aria-hidden="true">
              <span className="dx-final-proof__layer dx-final-proof__layer--back" />
              <span className="dx-final-proof__layer dx-final-proof__layer--middle" />
              <div className="dx-final-proof__active">
                <span className="dx-dimensional-badge"><Fingerprint size={17} /></span>
                <header><span>Neutral verification record</span><b>READY</b></header>
                <h3>Q2 operational assurance</h3>
                <div className="dx-final-proof__row"><StatusDot /><span>Controls complete</span><strong>128 / 128</strong></div>
                <div className="dx-final-proof__row"><StatusDot /><span>Evidence linked</span><strong>Verified</strong></div>
                <div className="dx-final-proof__row"><CircleCheck size={14} /><span>Provenance stamp</span><strong>7f9e…b42c</strong></div>
              </div>
            </div>
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
