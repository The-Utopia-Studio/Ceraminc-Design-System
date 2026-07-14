import { StrictMode, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Languages,
  Menu,
  Moon,
  Network,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TopNav,
  TopNavItem,
} from '../../packages/design-system/src'
import '../../packages/design-system/src/core.css'
import '../../packages/design-system/src/themes/utopia-default.css'
import './styles.css'

type Locale = 'en' | 'ar'
type PreviewMode = 'overview' | 'automations' | 'insights'

const navIds = ['product', 'workflow', 'agents', 'integrations', 'security', 'pricing'] as const

const copy = {
  en: {
    nav: ['Product', 'Workflow', 'Agents', 'Integrations', 'Security', 'Pricing'],
    announcement: 'New · Agent controls are now generally available',
    heroEyebrow: 'Operations, connected',
    heroTitle: 'Move work from signal to resolution.',
    heroBody: 'One operational layer for intake, coordination, automation, and clear decisions — built for teams working across regions and systems.',
    start: 'Start building',
    tour: 'See the product',
    trusted: 'Trusted by teams building across Doha, London, New York, and Dubai',
    productEyebrow: 'Product interface',
    productTitle: 'A shared system for the work between tools.',
    productBody: 'Bring requests, owners, decisions, and automations into one legible workspace. Every view stays connected to the same operating model.',
    previewTabs: ['Overview', 'Automations', 'Insights'],
    workflowEyebrow: 'Core workflow',
    workflowTitle: 'One continuous path, from intake to impact.',
    workflowBody: 'Keep context attached while work changes shape. Teams can move quickly without losing ownership, approval, or history.',
    agentsEyebrow: 'Agents & automation',
    agentsTitle: 'Delegate repeatable work. Keep judgment with your team.',
    agentsBody: 'Agents observe approved signals, prepare the next action, and pause at the boundaries you define.',
    integrationsEyebrow: 'Integrations',
    integrationsTitle: 'Connect the systems your team already trusts.',
    integrationsBody: 'A composable integration layer keeps data moving without turning every workflow into a maintenance project.',
    securityEyebrow: 'Security & reliability',
    securityTitle: 'Controls that scale with the work.',
    securityBody: 'Granular access, full auditability, and region-aware operations are built into the same system your team uses every day.',
    proofEyebrow: 'Team proof',
    proofQuote: 'We replaced three weekly coordination meetings with one shared operating view. The biggest change was not speed — it was confidence in who owned the next move.',
    proofRole: 'VP Operations',
    pricingEyebrow: 'Adoption',
    pricingTitle: 'Start with one workflow. Expand when the proof is visible.',
    pricingBody: 'Launch a focused workspace today, then add teams, automations, and controls without rebuilding the foundation.',
    plan: 'Workspace plan',
    perMonth: '/ month',
    planNote: 'Includes unlimited viewers and a guided setup session.',
    cta: 'Create your workspace',
    contact: 'Talk to a specialist',
    footer: 'A deterministic Ceramic template for modern SaaS products.',
    menu: 'Open navigation',
    closeMenu: 'Close navigation',
    theme: 'Switch color mode',
    language: 'العربية',
    live: 'Live operations',
    health: 'All systems healthy',
    activity: 'Activity',
    owner: 'Owner',
    status: 'Status',
  },
  ar: {
    nav: ['المنتج', 'سير العمل', 'الوكلاء', 'التكاملات', 'الأمان', 'الأسعار'],
    announcement: 'جديد · أدوات التحكم في الوكلاء متاحة الآن',
    heroEyebrow: 'عمليات مترابطة',
    heroTitle: 'انقل العمل من الإشارة إلى الحل.',
    heroBody: 'طبقة تشغيل واحدة للاستقبال والتنسيق والأتمتة واتخاذ قرارات واضحة — لفرق تعمل عبر مناطق وأنظمة متعددة.',
    start: 'ابدأ البناء',
    tour: 'شاهد المنتج',
    trusted: 'موثوق لدى فرق تعمل في الدوحة ولندن ونيويورك ودبي',
    productEyebrow: 'واجهة المنتج',
    productTitle: 'نظام مشترك للعمل الذي يجري بين الأدوات.',
    productBody: 'اجمع الطلبات والمسؤولين والقرارات والأتمتة في مساحة عمل واحدة واضحة. تبقى كل الواجهات متصلة بنموذج التشغيل نفسه.',
    previewTabs: ['نظرة عامة', 'الأتمتة', 'المؤشرات'],
    workflowEyebrow: 'سير العمل الأساسي',
    workflowTitle: 'مسار متصل من الاستقبال إلى الأثر.',
    workflowBody: 'يبقى السياق ملازماً للعمل أثناء تطوره، فتتحرك الفرق بسرعة من دون فقدان المسؤولية أو الاعتماد أو السجل.',
    agentsEyebrow: 'الوكلاء والأتمتة',
    agentsTitle: 'فوّض العمل المتكرر، واحتفظ بالحكم لفريقك.',
    agentsBody: 'تراقب الوكلاء الإشارات المعتمدة، وتجهز الإجراء التالي، وتتوقف عند الحدود التي يحددها فريقك.',
    integrationsEyebrow: 'التكاملات',
    integrationsTitle: 'اربط الأنظمة التي يثق بها فريقك.',
    integrationsBody: 'تحافظ طبقة تكامل مرنة على حركة البيانات من دون تحويل كل سير عمل إلى مشروع صيانة.',
    securityEyebrow: 'الأمان والموثوقية',
    securityTitle: 'ضوابط تتوسع مع العمل.',
    securityBody: 'صلاحيات دقيقة وسجل تدقيق كامل وعمليات تراعي المنطقة، كلها مدمجة في النظام اليومي نفسه.',
    proofEyebrow: 'دليل من الفريق',
    proofQuote: 'استبدلنا ثلاثة اجتماعات تنسيق أسبوعية بمشهد تشغيلي مشترك واحد. لم يكن التغيير الأكبر في السرعة، بل في الثقة بمن يملك الخطوة التالية.',
    proofRole: 'نائب الرئيس للعمليات',
    pricingEyebrow: 'الاعتماد',
    pricingTitle: 'ابدأ بسير عمل واحد، ثم توسع عندما يظهر الدليل.',
    pricingBody: 'أطلق مساحة عمل مركزة اليوم، ثم أضف الفرق والأتمتة والضوابط من دون إعادة بناء الأساس.',
    plan: 'خطة مساحة العمل',
    perMonth: '/ شهرياً',
    planNote: 'تشمل مشاهدين بلا حد وجلسة إعداد موجهة.',
    cta: 'أنشئ مساحة العمل',
    contact: 'تحدث مع مختص',
    footer: 'قالب Ceramic حتمي لمنتجات SaaS الحديثة.',
    menu: 'فتح التنقل',
    closeMenu: 'إغلاق التنقل',
    theme: 'تبديل نمط الألوان',
    language: 'English',
    live: 'العمليات المباشرة',
    health: 'جميع الأنظمة تعمل',
    activity: 'النشاط',
    owner: 'المسؤول',
    status: 'الحالة',
  },
} as const

const demoSets = {
  product: ['Namaa', 'Relay', 'Atlas', 'Madar', 'Orbit'],
  company: ['Aster Labs', 'Sahm Cloud', 'Northstar Health', 'Majlis Works', 'Cedar Systems'],
  leaders: [
    ['Lina Al-Khatib', 'Omar Rahman', 'Maya Chen'],
    ['Noor Al-Sayed', 'James Walker', 'Hana Kim'],
    ['Leila Mansour', 'Ethan Brooks', 'Yousef Khalil'],
    ['Dana Haddad', 'Alex Morgan', 'Sara Al-Nuaimi'],
    ['Rania Farouk', 'Sam Taylor', 'Minji Park'],
  ],
  price: [39, 49, 59, 69, 79],
  metric: [24, 31, 38, 42, 47],
}

function seededIndex(seed: number, salt: number, length: number) {
  let value = (seed ^ (salt * 0x9e3779b9)) >>> 0
  value ^= value << 13
  value ^= value >>> 17
  value ^= value << 5
  return (value >>> 0) % length
}

function ArrowIcon() {
  return <ArrowUpRight aria-hidden="true" className="directional-icon" />
}

function SectionHeading({ body, eyebrow, title }: { body: string; eyebrow: string; title: string }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  )
}

function ProductPreview({ locale, mode, product, setMode }: { locale: Locale; mode: PreviewMode; product: string; setMode: (mode: PreviewMode) => void }) {
  const t = copy[locale]
  const tabs: PreviewMode[] = ['overview', 'automations', 'insights']
  const rows = locale === 'ar'
    ? [['مراجعة إطلاق المنطقة', 'Noor Al-Sayed', 'قيد التنفيذ'], ['توجيه طلب الشراكة', 'Maya Chen', 'مؤتمت'], ['اعتماد موجز العميل', 'James Walker', 'بانتظار المراجعة']]
    : [['Review regional launch', 'Noor Al-Sayed', 'In progress'], ['Route partnership request', 'Maya Chen', 'Automated'], ['Approve customer brief', 'James Walker', 'Awaiting review']]

  return (
    <div className="product-window reveal" data-preview={mode}>
      <div className="window-bar">
        <span className="window-brand"><span className="brand-mark" />{product}</span>
        <div className="window-search"><Search aria-hidden="true" /><span>{locale === 'ar' ? 'ابحث في مساحة العمل' : 'Search workspace'}</span><kbd>⌘ K</kbd></div>
        <span className="presence"><span /> {locale === 'ar' ? '8 متصلون' : '8 online'}</span>
      </div>
      <div className="window-layout">
        <aside className="preview-sidebar" aria-label={locale === 'ar' ? 'تنقل المنتج' : 'Product navigation'}>
          <strong>{t.live}</strong>
          {tabs.map((tab, index) => {
            const PreviewIcon = [Workflow, Bot, Sparkles][index]
            return (
            <button aria-pressed={mode === tab} key={tab} onClick={() => setMode(tab)} type="button">
              <PreviewIcon aria-hidden="true" />
              <span>{t.previewTabs[index]}</span>
            </button>
          )})}
          <div className="preview-sidebar__footer"><CircleCheck aria-hidden="true" />{t.health}</div>
        </aside>
        <div className="preview-main">
          <div className="preview-toolbar">
            <div><p>{t.live}</p><h3>{mode === 'overview' ? t.previewTabs[0] : mode === 'automations' ? t.previewTabs[1] : t.previewTabs[2]}</h3></div>
            <Badge variant="outline">{locale === 'ar' ? 'آخر 30 يوماً' : 'Last 30 days'}</Badge>
          </div>
          <div className="metric-grid">
            <div><span>{locale === 'ar' ? 'وقت الاستجابة' : 'Response time'}</span><strong>2.4h</strong><small>↓ 18%</small></div>
            <div><span>{locale === 'ar' ? 'عمل مؤتمت' : 'Work automated'}</span><strong>38%</strong><small>↑ 12%</small></div>
            <div><span>{locale === 'ar' ? 'معدل الإنجاز' : 'Resolution rate'}</span><strong>94%</strong><small>↑ 7%</small></div>
          </div>
          <div className="activity-panel">
            <div className="activity-head"><strong>{t.activity}</strong><span>{locale === 'ar' ? 'تحديث مباشر' : 'Live update'}</span></div>
            <div className="activity-labels"><span>{locale === 'ar' ? 'العمل' : 'Work item'}</span><span>{t.owner}</span><span>{t.status}</span></div>
            {rows.map(([item, owner, status], index) => (
              <div className="activity-row" key={item} style={{ '--row-delay': `${index * 80}ms` } as CSSProperties}>
                <span><i>{index + 1}</i>{item}</span><span>{owner}</span><span><b />{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const params = new URLSearchParams(window.location.search)
  const seed = Number(params.get('seed')) || 1974341818
  const [locale, setLocale] = useState<Locale>('en')
  const [colorMode, setColorMode] = useState<'dark' | 'light'>('dark')
  const [activeSection, setActiveSection] = useState('product')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('overview')
  const [isolated, setIsolated] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[locale]
  const goTo = (id: string) => {
    window.history.pushState(null, '', `#${id}`)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const demo = useMemo(() => {
    const set = seededIndex(seed, 11, demoSets.product.length)
    return {
      product: demoSets.product[set],
      company: demoSets.company[seededIndex(seed, 23, demoSets.company.length)],
      leaders: demoSets.leaders[seededIndex(seed, 37, demoSets.leaders.length)],
      price: demoSets.price[seededIndex(seed, 47, demoSets.price.length)],
      metric: demoSets.metric[seededIndex(seed, 59, demoSets.metric.length)],
    }
  }, [seed])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dataset.theme = 'utopia-default'
    document.documentElement.dataset.colorMode = colorMode
  }, [colorMode, locale])

  useEffect(() => {
    const onScroll = () => setIsolated(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = navIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -58%', threshold: [0.08, 0.35, 0.7] })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.setAttribute('data-visible', 'true')
      })
    }, { threshold: 0.12 })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [locale])

  const workflowSteps = locale === 'ar'
    ? [['استقبل', 'حوّل الطلبات والإشارات إلى سجل منظم مع السياق الصحيح.'], ['نسّق', 'حدد المسؤول والخطوة التالية واتفاقية مستوى الخدمة تلقائياً.'], ['اعتمد', 'أدخل الحكم البشري عند القرارات الحساسة فقط.'], ['تعلّم', 'حوّل النتائج إلى قواعد ومؤشرات أوضح للدورة التالية.']]
    : [['Capture', 'Turn requests and signals into structured work with the right context.'], ['Coordinate', 'Assign the owner, next action, and service level automatically.'], ['Approve', 'Bring human judgment into the moments that carry real consequence.'], ['Learn', 'Feed outcomes back into clearer rules and signals for the next cycle.']]
  const integrationNames = ['Slack', 'Salesforce', 'HubSpot', 'GitHub', 'Notion', 'Snowflake', 'Jira', 'Microsoft 365']

  return (
    <div className="template-shell">
      <header className="site-header" data-isolated={isolated || undefined}>
        <div className="nav-frame">
          <a className="product-logo" href="#top" aria-label={`${demo.product} home`}><span className="brand-mark" />{demo.product}</a>
          <TopNav aria-label={locale === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'} className="site-links">
            {navIds.map((id, index) => <TopNavItem href={`#${id}`} isCurrent={activeSection === id} key={id}>{t.nav[index]}</TopNavItem>)}
          </TopNav>
          <div className="nav-actions">
            <Button aria-label={t.theme} isIconOnly onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')} size="icon" variant="ghost">
              {colorMode === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>
            <Button aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'} className="language-button" onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')} size="sm" startContent={<Languages aria-hidden="true" />} variant="ghost">{t.language}</Button>
            <Button className="nav-cta" onClick={() => goTo('pricing')} size="sm">{t.start}</Button>
            <Button aria-expanded={menuOpen} aria-label={menuOpen ? t.closeMenu : t.menu} className="menu-button" isIconOnly onClick={() => setMenuOpen(!menuOpen)} size="icon" variant="ghost">
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
        {menuOpen ? <nav className="mobile-menu" aria-label={t.menu}>{navIds.map((id, index) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{t.nav[index]}<ChevronRight aria-hidden="true" className="directional-icon" /></a>)}</nav> : null}
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <a className="announcement reveal" href="#agents"><span>{t.announcement}</span><ChevronRight className="directional-icon" /></a>
          <p className="eyebrow reveal">{t.heroEyebrow}</p>
          <h1 className="reveal">{t.heroTitle}</h1>
          <p className="hero-copy reveal">{t.heroBody}</p>
          <div className="hero-actions reveal">
            <Button endContent={<ArrowIcon />} onClick={() => goTo('pricing')} size="lg">{t.start}</Button>
            <Button onClick={() => goTo('product')} size="lg" startContent={<Play aria-hidden="true" />} variant="outline">{t.tour}</Button>
          </div>
          <div className="hero-proof reveal"><span>{demo.metric}%</span><p>{locale === 'ar' ? 'وقت أقل في التنسيق اليدوي خلال أول 90 يوماً' : 'less time spent on manual coordination in the first 90 days'}</p></div>
        </section>

        <section className="section product-section" id="product">
          <SectionHeading body={t.productBody} eyebrow={t.productEyebrow} title={t.productTitle} />
          <ProductPreview locale={locale} mode={previewMode} product={demo.product} setMode={setPreviewMode} />
          <div className="logo-proof reveal"><p>{t.trusted}</p><div>{['Sahm', 'NORTHSTAR', 'ASTER', 'CEDAR', 'MAJLIS'].map((name) => <span key={name}>{name}</span>)}</div></div>
        </section>

        <section className="section workflow-section" id="workflow">
          <SectionHeading body={t.workflowBody} eyebrow={t.workflowEyebrow} title={t.workflowTitle} />
          <div className="workflow-grid">
            {workflowSteps.map(([title, body], index) => (
              <article className="workflow-step reveal" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div>{index < workflowSteps.length - 1 ? <ChevronRight aria-hidden="true" className="step-arrow directional-icon" /> : null}</article>
            ))}
          </div>
        </section>

        <section className="section agents-section" id="agents">
          <div className="agents-copy"><SectionHeading body={t.agentsBody} eyebrow={t.agentsEyebrow} title={t.agentsTitle} /><ul className="check-list reveal">
            {(locale === 'ar' ? ['حدود اعتماد واضحة لكل إجراء', 'سجل قابل للمراجعة لكل قرار', 'تحويل فوري إلى عضو الفريق عند الحاجة'] : ['Explicit approval boundaries for every action', 'An inspectable trace for every decision', 'Immediate handoff to a teammate when needed']).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
          </ul></div>
          <div className="agent-console reveal">
            <div className="console-head"><span><Bot aria-hidden="true" />{locale === 'ar' ? 'وكيل الفرز' : 'Triage agent'}</span><Badge variant="success">{locale === 'ar' ? 'نشط' : 'Active'}</Badge></div>
            <div className="agent-flow"><div><span>01</span><p>{locale === 'ar' ? 'وصل طلب شراكة جديد' : 'New partnership request received'}</p><small>09:42</small></div><i /><div><span>02</span><p>{locale === 'ar' ? 'تم إثراء الحساب والسياق' : 'Account and context enriched'}</p><small>09:42</small></div><i /><div className="requires-review"><span>03</span><p>{locale === 'ar' ? 'مطلوب اعتماد بشري' : 'Human approval required'}</p><Button size="sm">{locale === 'ar' ? 'مراجعة' : 'Review'}</Button></div></div>
            <div className="console-note"><ShieldCheck aria-hidden="true" /><span>{locale === 'ar' ? 'لن يرسل الوكيل أي رد قبل الاعتماد.' : 'The agent cannot send a response before approval.'}</span></div>
          </div>
        </section>

        <section className="section integrations-section" id="integrations">
          <SectionHeading body={t.integrationsBody} eyebrow={t.integrationsEyebrow} title={t.integrationsTitle} />
          <div className="integration-stage reveal">
            <div className="integration-core"><Network aria-hidden="true" /><strong>{demo.product}</strong><span>{locale === 'ar' ? 'طبقة التشغيل' : 'Operating layer'}</span></div>
            <div className="integration-grid">{integrationNames.map((name, index) => {
              const IntegrationIcon = [Zap, Cloud, Database, GitBranch, Code2, Database, Workflow, Globe2][index]
              return <div key={name}><span><IntegrationIcon aria-hidden="true" /></span><strong>{name}</strong><small>{locale === 'ar' ? 'متصل' : 'Connected'}</small></div>
            })}</div>
          </div>
        </section>

        <section className="section security-section" id="security">
          <SectionHeading body={t.securityBody} eyebrow={t.securityEyebrow} title={t.securityTitle} />
          <div className="security-grid">
            {[
              [ShieldCheck, locale === 'ar' ? 'صلاحيات دقيقة' : 'Granular access', locale === 'ar' ? 'أدوار ونطاقات وموافقات تناسب طريقة عمل كل فريق.' : 'Roles, scopes, and approvals that match how each team operates.'],
              [Clock3, locale === 'ar' ? 'سجل تدقيق كامل' : 'Complete audit trail', locale === 'ar' ? 'كل تغيير وإجراء آلي وقرار بشري قابل للتتبع.' : 'Every change, automated action, and human decision remains traceable.'],
              [Globe2, locale === 'ar' ? 'جاهزية إقليمية' : 'Regional readiness', locale === 'ar' ? 'ضوابط بيانات وعمليات تناسب فرقاً تعمل عبر مناطق متعددة.' : 'Data and operating controls for teams working across regions.'],
            ].map(([Icon, title, body]) => <Card accent="hover" className="security-card reveal" key={String(title)}><CardHeader><div className="security-icon"><Icon aria-hidden="true" /></div><CardTitle>{title as string}</CardTitle><CardDescription>{body as string}</CardDescription></CardHeader><CardContent><span><Check aria-hidden="true" />{locale === 'ar' ? 'متوفر في كل الخطط' : 'Available on every plan'}</span></CardContent></Card>)}
          </div>
          <div className="reliability-strip reveal"><span><b>99.99%</b>{locale === 'ar' ? 'وقت التشغيل' : 'uptime'}</span><span><b>SOC 2</b>{locale === 'ar' ? 'ضوابط مدققة' : 'audited controls'}</span><span><b>24/7</b>{locale === 'ar' ? 'مراقبة' : 'monitoring'}</span><span><b>4</b>{locale === 'ar' ? 'مناطق بيانات' : 'data regions'}</span></div>
        </section>

        <section className="section proof-section" aria-labelledby="proof-title">
          <div className="proof-number reveal"><span>{demo.metric}%</span><p>{locale === 'ar' ? 'انخفاض في وقت دورة العمل بعد ربع واحد' : 'shorter work cycle after one quarter'}</p></div>
          <figure className="quote reveal"><p className="eyebrow" id="proof-title">{t.proofEyebrow}</p><blockquote>“{t.proofQuote}”</blockquote><figcaption><span>{demo.leaders[0].split(' ').map((part) => part[0]).join('')}</span><div><strong>{demo.leaders[0]}</strong><small>{t.proofRole}, {demo.company}</small></div></figcaption></figure>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="pricing-copy"><SectionHeading body={t.pricingBody} eyebrow={t.pricingEyebrow} title={t.pricingTitle} /><Button endContent={<ArrowIcon />} onClick={() => { window.location.href = 'mailto:hello@example.com?subject=SaaS%20workspace' }} size="lg">{t.contact}</Button></div>
          <Card accent="always" className="pricing-card reveal"><CardHeader><CardTitle>{t.plan}</CardTitle><CardDescription>{locale === 'ar' ? 'للفرق التي تبدأ سير عمل تشغيلياً مشتركاً.' : 'For teams beginning with one shared operational workflow.'}</CardDescription></CardHeader><CardContent><div className="price"><span>$</span><strong>{demo.price}</strong><small>{t.perMonth}</small></div><ul>{(locale === 'ar' ? ['5 أعضاء أساسيين', 'أتمتة ووكلاء بلا حد', 'تكاملات جاهزة', 'سجل تدقيق كامل'] : ['5 core members', 'Unlimited automations and agents', 'Native integrations', 'Complete audit history']).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul><Button endContent={<ArrowIcon />} onClick={() => { window.location.href = 'mailto:hello@example.com?subject=Create%20workspace' }} size="lg">{t.cta}</Button><p>{t.planNote}</p></CardContent></Card>
        </section>
      </main>

      <footer className="site-footer"><a className="product-logo" href="#top"><span className="brand-mark" />{demo.product}</a><p>{t.footer}</p><div><a href="#product">{t.nav[0]}</a><a href="#security">{t.nav[4]}</a><a href="#pricing">{t.nav[5]}</a><a href="mailto:hello@example.com">Contact</a></div><small>© 2026 {demo.product}. Seed {seed}.</small></footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
