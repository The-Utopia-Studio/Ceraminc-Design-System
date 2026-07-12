import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Check,
  Compass,
  GitBranch,
  GraduationCap,
  Lock,
  LogIn,
  Search,
  SearchX,
  Sparkles,
  X,
} from 'lucide-react'
import { Badge } from '../../packages/design-system/src/Badge'
import { Button } from '../../packages/design-system/src/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../packages/design-system/src/Card'
import { Checkbox, Field, FieldLabel, Switch, TextInput } from '../../packages/design-system/src/Forms'
import { InputGroup, InputGroupInput, InputGroupText, Separator } from '../../packages/design-system/src/ShadcnPrimitives'

type Resource = {
  title: string
  type: 'Newsletter' | 'Guide' | 'Workshop' | 'Thread'
  track: 'Design Systems' | 'Frontend' | 'Career' | 'AI'
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  locked?: boolean
  summary: string
}

const resources: Resource[] = [
  {
    title: 'The Student Design System Starter Kit',
    type: 'Guide',
    track: 'Design Systems',
    level: 'Beginner',
    summary: 'A practical map for tokens, components, docs, and contribution rituals.',
  },
  {
    title: 'What Great Product Engineers Notice First',
    type: 'Newsletter',
    track: 'Frontend',
    level: 'Intermediate',
    locked: true,
    summary: 'How to review interaction details, states, and implementation tradeoffs.',
  },
  {
    title: 'Portfolio Review: From Class Project to Case Study',
    type: 'Workshop',
    track: 'Career',
    level: 'Beginner',
    summary: 'A live critique format for turning school work into hiring signals.',
  },
  {
    title: 'AI Interface Patterns Worth Keeping',
    type: 'Thread',
    track: 'AI',
    level: 'Advanced',
    locked: true,
    summary: 'A curated discussion on copilots, agents, previews, and trust cues.',
  },
]

const guides = [
  { number: 'G1', title: 'A field guide to interface critique', meta: 'Guide · 12 min', tone: 'blue' },
  { number: 'G2', title: 'Design tokens without the theory fog', meta: 'Guide · 9 min', tone: 'paper' },
  { number: 'G3', title: 'Your first useful React component API', meta: 'Code guide · 16 min', tone: 'graphite' },
  { number: 'G4', title: 'Turning research into product decisions', meta: 'Guide · 11 min', tone: 'black' },
]

const academy = [
  { number: '01', title: 'Data-informed product design', meta: 'VOD · Product design' },
  { number: '02', title: 'Building products that grow', meta: 'Webinar · Product strategy' },
  { number: '03', title: 'Business models for designers', meta: 'VOD · Business' },
  { number: '04', title: 'The craft that does not expire', meta: 'VOD · Product design' },
]

export function CommunityPage() {
  const [query, setQuery] = useState('')
  const [track, setTrack] = useState<Resource['track'] | 'All'>('All')
  const [membersOnly, setMembersOnly] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle')
  const [loginError, setLoginError] = useState('')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!loginOpen) return
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLoginOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [loginOpen])

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return resources.filter((resource) => {
      const matchesQuery = !normalizedQuery
        || `${resource.title} ${resource.summary} ${resource.type} ${resource.track} ${resource.level}`.toLowerCase().includes(normalizedQuery)
      const matchesTrack = track === 'All' || resource.track === track
      const matchesMembership = !membersOnly || resource.locked
      return matchesQuery && matchesTrack && matchesMembership
    })
  }, [membersOnly, query, track])

  const resetFilters = () => {
    setQuery('')
    setTrack('All')
    setMembersOnly(false)
  }

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setNewsletterStatus('success')
  }

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setLoginError('Member accounts are not connected in this preview yet.')
  }

  return (
    <div className="community-site" data-theme="utopia-community" dir="ltr" lang="en">
      <a className="community-skip-link" href="#community-main">Skip to content</a>
      <header className="community-nav">
        <a className="community-brand" href="#/community" aria-label="Utopia Design Club home">
          <span className="community-brand-mark"><Compass aria-hidden="true" /></span>
          <span>
            <strong>UTOPIA/CLUB</strong>
            <small>Design + code community</small>
          </span>
        </a>
        <nav className="community-nav-links" aria-label="Community sections">
          <a href="#insights">Magazine</a>
          <a href="#guides">Guides</a>
          <a href="#academy">Academy</a>
          <a href="#newsletter">The Brief</a>
        </nav>
        <div className="community-nav-actions">
          <button className="community-nav-search" onClick={() => document.getElementById('insights')?.scrollIntoView({ block: 'start' })} type="button">
            <Search aria-hidden="true" /><span>Search</span>
          </button>
          <Button variant="ghost" startContent={<LogIn aria-hidden="true" />} onClick={() => setLoginOpen(true)}>
            Log in
          </Button>
          <Button startContent={<Sparkles aria-hidden="true" />} onClick={() => document.getElementById('newsletter')?.scrollIntoView({ block: 'start' })}>
            Join
          </Button>
        </div>
      </header>

      <main id="community-main">
        <section className="community-hero" aria-labelledby="community-title">
          <div className="community-hero-media" role="img" aria-label="Abstract Utopia system made from glass discs and electric blue light" />
          <div className="community-hero-copy">
            <span className="community-eyebrow">Issue 031 · Design systems</span>
            <h1 id="community-title">Build the taste.<br />Ship the proof.</h1>
            <p>A weekly field guide for student designers and developers turning sharp ideas into working products.</p>
            <div className="community-hero-actions">
              <Button size="lg" endContent={<ArrowRight aria-hidden="true" />} onClick={() => document.getElementById('newsletter')?.scrollIntoView({ block: 'start' })}>Read this issue</Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('insights')?.scrollIntoView({ block: 'start' })}>Browse archive</Button>
            </div>
          </div>
        </section>

        <section className="community-stats" aria-label="Community highlights">
          <Stat value="3,200+" label="newsletter readers" />
          <Stat value="42" label="student showcases" />
          <Stat value="18" label="monthly critique circles" />
          <Stat value="7 min" label="average weekly brief" />
        </section>

        <section className="community-section" id="insights" aria-labelledby="insights-title">
          <div className="section-heading">
            <div>
              <span className="community-eyebrow">The archive</span>
              <h2 id="insights-title">Latest insights</h2>
            </div>
            <p>Filter newsletter issues, guides, workshops, and member threads by track and membership level.</p>
          </div>

          <div className="insight-toolbar">
            <InputGroup className="community-search">
              <InputGroupText><Search aria-hidden="true" /></InputGroupText>
              <InputGroupInput
                aria-label="Search community insights"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search design systems, frontend, career, AI..."
                value={query}
              />
            </InputGroup>
            <div className="track-tabs" aria-label="Insight tracks">
              {(['All', 'Design Systems', 'Frontend', 'Career', 'AI'] as const).map((item) => (
                <button
                  aria-pressed={track === item}
                  className="track-tab"
                  key={item}
                  onClick={() => setTrack(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="members-toggle">
              <Switch checked={membersOnly} onCheckedChange={setMembersOnly} />
              <span>Members only</span>
            </label>
          </div>

          <div className="resource-grid">
            {filteredResources.map((resource) => (
              <Card className={`community-card resource-${resource.track.toLowerCase().replace(' ', '-')}`} interactive key={resource.title}>
                <div className="resource-cover" aria-hidden="true"><span>{resource.track}</span><strong>{String(resources.indexOf(resource) + 1).padStart(2, '0')}</strong></div>
                <CardHeader>
                  <div className="card-kicker">
                    <Badge variant={resource.locked ? 'secondary' : 'success'} size="sm" startContent={resource.locked ? <Lock aria-hidden="true" /> : <Check aria-hidden="true" />}>
                      {resource.locked ? 'Member' : 'Free'}
                    </Badge>
                    <span>{resource.type}</span>
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="resource-meta">
                    <span>{resource.track}</span>
                    <span>{resource.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredResources.length === 0 ? (
              <div className="resource-empty" role="status">
                <SearchX aria-hidden="true" />
                <div><strong>No matching insights</strong><p>Try another keyword or clear the active filters.</p></div>
                <Button variant="outline" onClick={resetFilters}>Clear filters</Button>
              </div>
            ) : null}
          </div>
        </section>

        <EditorialShelf eyebrow="Practical guides" id="guides" items={guides} title="Guides" />

        <EditorialShelf eyebrow="Learn with working practitioners" id="academy" items={academy} title="Latest academy" />

        <section className="community-section community-newsletter" id="newsletter" aria-labelledby="newsletter-title">
          <div className="newsletter-copy">
            <Badge variant="info" startContent={<GraduationCap aria-hidden="true" />}>Newsletter</Badge>
            <h2 id="newsletter-title">Get the next student builder brief.</h2>
            <p>One concise email each week with a teardown, a coding pattern, and one portfolio prompt.</p>
          </div>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <Field>
                <FieldLabel htmlFor="newsletter-email">Email</FieldLabel>
                <TextInput id="newsletter-email" placeholder="you@example.com" required type="email" />
              </Field>
              <label className="consent-row">
                <Checkbox />
                <span>Send me community updates and event invitations.</span>
              </label>
              <Button type="submit" endContent={newsletterStatus === 'success' ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}>
                {newsletterStatus === 'success' ? 'You are on the list' : 'Subscribe'}
              </Button>
              {newsletterStatus === 'success' ? <p className="form-success" role="status">The next brief will arrive in your inbox.</p> : null}
            </form>
        </section>
      </main>

      <footer className="community-footer">
        <span>Utopia Design Club</span>
        <span>Newsletter, community, membership, and practical product craft for students.</span>
        <div>
          <a href="https://designcompass.org/" target="_blank" rel="noreferrer">Reference</a>
          <a href="#/docs">Design System Docs</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer"><GitBranch aria-hidden="true" /> GitHub</a>
        </div>
      </footer>

      {loginOpen ? (
        <div className="login-overlay" role="presentation">
          <div className="login-dialog" role="dialog" aria-modal="true" aria-labelledby="login-title">
            <button ref={closeButtonRef} className="login-close" aria-label="Close login" onClick={() => setLoginOpen(false)} type="button">
              <X aria-hidden="true" />
            </button>
            <Badge variant="outline">Member access</Badge>
            <h2 id="login-title">Log in to continue.</h2>
            <p>Use your email to save resources, join events, and access member-only threads.</p>
            <Separator />
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <Field>
                <FieldLabel htmlFor="login-email">Email</FieldLabel>
                <TextInput id="login-email" placeholder="you@example.com" required type="email" />
              </Field>
              <Field>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <TextInput id="login-password" minLength={8} placeholder="Password" required type="password" />
              </Field>
              <Button type="submit" className="full-width">Log in</Button>
              <Button type="button" variant="outline" className="full-width">Continue with school SSO</Button>
              {loginError ? <p className="form-error" role="alert">{loginError}</p> : null}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-item">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function EditorialShelf({ eyebrow, id, items, title }: { eyebrow: string; id: string; items: Array<{ number: string; title: string; meta: string; tone?: string }>; title: string }) {
  return (
    <section className="community-section editorial-shelf" id={id} aria-label={title}>
      <div className="editorial-shelf-heading">
        <div><span className="community-eyebrow">{eyebrow}</span><h2>{title}</h2></div>
        <Button variant="secondary" endContent={<ArrowRight aria-hidden="true" />}>View all</Button>
      </div>
      <div className="editorial-shelf-grid">
        {items.map((item) => (
          <article className={`editorial-tile tone-${item.tone ?? 'blue'}`} key={item.title}>
            <div className="editorial-tile-cover" aria-hidden="true"><span>{item.number}</span><i /><i /></div>
            <h3>{item.title}</h3>
            <p>{item.meta}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
