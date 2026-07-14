import { StrictMode, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
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
  MotionProvider,
  Selector,
  Textarea,
  TextInput,
  TopNav,
  TopNavItem,
  useMotionPattern,
} from '../../packages/design-system/src'
import '../../packages/design-system/src/core.css'
import '../../packages/design-system/src/themes/utopia-default.css'
import './styles.css'

type Locale = 'en' | 'ar'
type PreviewMode = 'overview' | 'automations' | 'insights'
type PageKey = 'home' | 'product' | 'agents' | 'integrations' | 'integration-detail' | 'customers' | 'customer-story' | 'pricing' | 'changelog' | 'contact-sales'

type DemoData = {
  product: string
  company: string
  leaders: string[]
  price: number
  metric: number
}

const templatePath = '/templates/saas-solution-homepage'
const templateBase = window.location.pathname.includes(templatePath) ? templatePath : ''

function getPageKey(): PageKey {
  const route = (templateBase
    ? window.location.pathname.split('/saas-solution-homepage/')[1]
    : window.location.pathname.replace(/^\//, ''))?.replace(/index\.html$/, '').replace(/\/$/, '') ?? ''
  if (route === 'product') return 'product'
  if (route === 'agents') return 'agents'
  if (route === 'integrations') return 'integrations'
  if (route === 'integrations/slack') return 'integration-detail'
  if (route === 'customers') return 'customers'
  if (route === 'customers/aster-labs') return 'customer-story'
  if (route === 'pricing') return 'pricing'
  if (route === 'changelog') return 'changelog'
  if (route === 'contact-sales') return 'contact-sales'
  return 'home'
}

function pageHref(page: string, seed: number) {
  const suffix = page ? `/${page}/` : '/index.html'
  return `${templateBase}${suffix}?seed=${seed}`
}

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

function RevealBlock({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reveal = useMotionPattern('reveal')
  return (
    <motion.div
      className={className}
      initial={reveal.enabled ? { opacity: 0, y: 16 } : false}
      transition={{ ...reveal.transition, delay: reveal.enabled ? delay : 0 }}
      viewport={{ amount: 0.22, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ body, eyebrow, title }: { body: string; eyebrow: string; title: string }) {
  const reveal = useMotionPattern('reveal')
  return (
    <motion.div
      className="section-heading"
      initial={reveal.enabled ? { opacity: 0, y: 18 } : false}
      transition={reveal.transition}
      viewport={{ amount: 0.35, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </motion.div>
  )
}

function ProductPreview({ locale, mode, product, setMode }: { locale: Locale; mode: PreviewMode; product: string; setMode: (mode: PreviewMode) => void }) {
  const t = copy[locale]
  const reveal = useMotionPattern('reveal')
  const pageMotion = useMotionPattern('page')
  const tabs: PreviewMode[] = ['overview', 'automations', 'insights']
  const rows = locale === 'ar'
    ? [['مراجعة إطلاق المنطقة', 'Noor Al-Sayed', 'قيد التنفيذ'], ['توجيه طلب الشراكة', 'Maya Chen', 'مؤتمت'], ['اعتماد موجز العميل', 'James Walker', 'بانتظار المراجعة']]
    : [['Review regional launch', 'Noor Al-Sayed', 'In progress'], ['Route partnership request', 'Maya Chen', 'Automated'], ['Approve customer brief', 'James Walker', 'Awaiting review']]

  return (
    <motion.div
      className="product-window"
      data-preview={mode}
      initial={reveal.enabled ? { opacity: 0, y: 20 } : false}
      transition={reveal.transition}
      viewport={{ amount: 0.18, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
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
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="preview-main"
            exit={pageMotion.enabled ? { opacity: 0, y: -6 } : undefined}
            initial={pageMotion.enabled ? { opacity: 0, y: 8 } : false}
            key={`${locale}-${mode}`}
            transition={pageMotion.transition}
          >
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
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function PageHero({ body, children, eyebrow, title }: { body: string; children?: ReactNode; eyebrow: string; title: string }) {
  const reveal = useMotionPattern('reveal')
  return (
    <motion.section
      animate="visible"
      className="page-hero-secondary"
      id="top"
      initial={reveal.enabled ? 'hidden' : false}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: 0.06, staggerChildren: reveal.enabled ? 0.08 : 0 } },
      }}
    >
      <div className="hero-grid" aria-hidden="true" />
      <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: reveal.transition } }}>{eyebrow}</motion.p>
      <motion.h1 variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: reveal.transition } }}>{title}</motion.h1>
      <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: reveal.transition } }}>{body}</motion.p>
      {children ? <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: reveal.transition } }}>{children}</motion.div> : null}
    </motion.section>
  )
}

function PageCta({ locale, seed }: { locale: Locale; seed: number }) {
  return (
    <section className="section page-cta">
      <div><p className="eyebrow">{locale === 'ar' ? 'الخطوة التالية' : 'Next step'}</p><h2>{locale === 'ar' ? 'حوّل أول سير عمل إلى نظام مشترك.' : 'Turn your first workflow into a shared system.'}</h2></div>
      <Button endContent={<ArrowIcon />} onClick={() => { window.location.href = pageHref('contact-sales', seed) }} size="lg">{locale === 'ar' ? 'تحدث مع فريقنا' : 'Talk to our team'}</Button>
    </section>
  )
}

function ProductPage({ demo, locale, previewMode, seed, setPreviewMode }: { demo: DemoData; locale: Locale; previewMode: PreviewMode; seed: number; setPreviewMode: (mode: PreviewMode) => void }) {
  const capabilities = locale === 'ar'
    ? [['الاستقبال', 'حوّل البريد والنماذج والأحداث إلى عمل منظم.'], ['التخطيط', 'اربط الأهداف بالمشاريع والقرارات اليومية.'], ['التنفيذ', 'حافظ على وضوح المسؤولية والموافقات وحالة العمل.'], ['المؤشرات', 'اقرأ الاختناقات والنتائج من نموذج تشغيل واحد.']]
    : [['Intake', 'Turn email, forms, and events into structured work.'], ['Planning', 'Connect goals to projects and daily decisions.'], ['Execution', 'Keep ownership, approvals, and work state legible.'], ['Insights', 'Read bottlenecks and outcomes from one operating model.']]
  return <>
    <PageHero body={locale === 'ar' ? 'مساحة تشغيل واحدة تربط التخطيط والتنفيذ والأتمتة من دون فقدان السياق.' : 'One operating workspace connects planning, execution, and automation without losing context.'} eyebrow={locale === 'ar' ? 'المنتج' : 'Product'} title={locale === 'ar' ? 'خطّط للعمل وشغّله من النظام نفسه.' : 'Plan the work. Run it from the same system.'}>
      <Button endContent={<ArrowIcon />} onClick={() => { window.location.href = pageHref('contact-sales', seed) }} size="lg">{locale === 'ar' ? 'اطلب عرضاً' : 'Request a demo'}</Button>
      <Button onClick={() => document.getElementById('interface')?.scrollIntoView({ behavior: 'smooth' })} size="lg" variant="outline">{locale === 'ar' ? 'استكشف الواجهة' : 'Explore the interface'}</Button>
    </PageHero>
    <section className="section" id="interface"><SectionHeading body={locale === 'ar' ? 'تتغير الواجهات مع المهمة، لكنها تبقى متصلة بالبيانات نفسها.' : 'Views change with the task while staying connected to the same underlying data.'} eyebrow={locale === 'ar' ? 'نظام عمل حي' : 'A living work system'} title={locale === 'ar' ? 'كل فريق يرى ما يحتاجه، من دون إنشاء مصدر حقيقة جديد.' : 'Every team gets the view it needs without creating a new source of truth.'} /><ProductPreview locale={locale} mode={previewMode} product={demo.product} setMode={setPreviewMode} /></section>
    <section className="section" id="workflow"><SectionHeading body={locale === 'ar' ? 'ابدأ بتدفق واحد ثم وسّع النموذج نفسه إلى بقية المؤسسة.' : 'Start with one flow, then extend the same model across the organization.'} eyebrow={locale === 'ar' ? 'القدرات الأساسية' : 'Core capabilities'} title={locale === 'ar' ? 'بنية واضحة للعمل المتغير.' : 'A clear structure for work that keeps changing.'} /><div className="capability-grid">{capabilities.map(([title, body], index) => <Card accent="hover" key={title}><CardHeader><Badge variant="outline">0{index + 1}</Badge><CardTitle>{title}</CardTitle><CardDescription>{body}</CardDescription></CardHeader></Card>)}</div></section>
    <PageCta locale={locale} seed={seed} />
  </>
}

function AgentsPage({ demo, locale, seed }: { demo: DemoData; locale: Locale; seed: number }) {
  const useCases = locale === 'ar'
    ? [['فرز الطلبات', 'اقرأ الطلب وحدد الأولوية والمسؤول قبل أن يصل إلى قائمة الفريق.'], ['تجهيز القرارات', 'اجمع السياق والخيارات والمخاطر قبل نقطة الاعتماد.'], ['متابعة الالتزامات', 'راقب المهلات والتبعيات وصعّد الحالات التي تحتاج تدخلاً.']]
    : [['Request triage', 'Read the request, set priority, and identify an owner before it reaches the team queue.'], ['Decision preparation', 'Collect context, options, and risk before the approval moment.'], ['Commitment follow-up', 'Watch deadlines and dependencies, escalating only when intervention is needed.']]
  return <>
    <PageHero body={locale === 'ar' ? 'وكلاء يعملون داخل حدود واضحة، ويتركون القرارات الحساسة للأشخاص المناسبين.' : 'Agents work inside explicit boundaries and leave consequential decisions to the right people.'} eyebrow={locale === 'ar' ? 'الوكلاء والأتمتة' : 'Agents & automation'} title={locale === 'ar' ? 'أتمت العمل المتكرر، لا المساءلة.' : 'Automate the repeatable work, not accountability.'}>
      <Button endContent={<ArrowIcon />} onClick={() => { window.location.href = pageHref('contact-sales', seed) }} size="lg">{locale === 'ar' ? 'صمّم أول وكيل' : 'Design your first agent'}</Button>
    </PageHero>
    <section className="section agents-detail-layout"><div><p className="eyebrow">{locale === 'ar' ? 'داخل سير العمل' : 'Inside the workflow'}</p><h2>{locale === 'ar' ? 'كل إجراء قابل للفهم والمراجعة والإيقاف.' : 'Every action can be understood, reviewed, and stopped.'}</h2><p>{locale === 'ar' ? 'يشاهد الفريق الإشارة والقاعدة والنتيجة في المكان نفسه.' : 'The team sees the signal, rule, and outcome in one place.'}</p></div><div className="agent-console"><div className="console-head"><span><Bot aria-hidden="true" />{locale === 'ar' ? 'وكيل الفرز' : 'Triage agent'}</span><Badge variant="success">{locale === 'ar' ? 'نشط' : 'Active'}</Badge></div><div className="agent-flow"><div><span>01</span><p>{locale === 'ar' ? 'تم اكتشاف إشارة جديدة' : 'New signal detected'}</p><small>09:42</small></div><i /><div><span>02</span><p>{locale === 'ar' ? 'تم تجهيز السياق والاقتراح' : 'Context and recommendation prepared'}</p><small>09:43</small></div><i /><div className="requires-review"><span>03</span><p>{locale === 'ar' ? 'مطلوب اعتماد بشري' : 'Human approval required'}</p><Button size="sm">{locale === 'ar' ? 'مراجعة' : 'Review'}</Button></div></div><div className="console-note"><ShieldCheck aria-hidden="true" /><span>{locale === 'ar' ? `جميع الإجراءات مسجلة في ${demo.product}.` : `Every action is recorded in ${demo.product}.`}</span></div></div></section>
    <section className="section"><SectionHeading body={locale === 'ar' ? 'نقاط بداية عملية يمكن مراجعتها قبل التوسع.' : 'Practical starting points that can be reviewed before they scale.'} eyebrow={locale === 'ar' ? 'أنماط الوكلاء' : 'Agent patterns'} title={locale === 'ar' ? 'ابدأ من عمل يعرفه فريقك بالفعل.' : 'Begin with work your team already understands.'} /><div className="security-grid">{useCases.map(([title, body]) => <Card accent="hover" key={title}><CardHeader><div className="security-icon"><Sparkles aria-hidden="true" /></div><CardTitle>{title}</CardTitle><CardDescription>{body}</CardDescription></CardHeader></Card>)}</div></section>
    <PageCta locale={locale} seed={seed} />
  </>
}

const integrationDirectory = ['Slack', 'Salesforce', 'HubSpot', 'GitHub', 'Notion', 'Snowflake', 'Jira', 'Microsoft 365', 'Zendesk', 'Figma', 'Google Drive', 'Datadog']

function IntegrationsPage({ locale, seed }: { locale: Locale; seed: number }) {
  const [query, setQuery] = useState('')
  const visible = integrationDirectory.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
  return <>
    <PageHero body={locale === 'ar' ? 'اربط مصادر الإشارة والعمل والبيانات من دون بناء طبقة صيانة جديدة.' : 'Connect signal, work, and data sources without creating another maintenance layer.'} eyebrow={locale === 'ar' ? 'دليل التكاملات' : 'Integration directory'} title={locale === 'ar' ? 'أدواتك الحالية، ضمن سير عمل واحد.' : 'Your existing tools, inside one workflow.'} />
    <section className="section directory-section"><div className="directory-toolbar"><label><Search aria-hidden="true" /><span className="sr-only">{locale === 'ar' ? 'بحث' : 'Search'}</span><TextInput onChange={(event) => setQuery(event.target.value)} placeholder={locale === 'ar' ? 'ابحث في التكاملات' : 'Search integrations'} type="search" value={query} /></label><Badge variant="outline">{visible.length} {locale === 'ar' ? 'تكاملات' : 'integrations'}</Badge></div><div className="directory-grid">{visible.map((name, index) => { const IntegrationIcon = [Zap, Cloud, Database, GitBranch, Code2, Database, Workflow, Globe2][index % 8]; return <a className="directory-card" href={`${pageHref('integrations/slack', seed)}&connector=${encodeURIComponent(name)}`} key={name}><span><IntegrationIcon aria-hidden="true" /></span><div><strong>{name}</strong><small>{locale === 'ar' ? 'مزامنة ثنائية الاتجاه' : 'Two-way sync'}</small></div><ChevronRight aria-hidden="true" className="directional-icon" /></a>})}</div></section>
    <PageCta locale={locale} seed={seed} />
  </>
}

function IntegrationDetailPage({ demo, locale, seed }: { demo: DemoData; locale: Locale; seed: number }) {
  const connector = new URLSearchParams(window.location.search).get('connector') || 'Slack'
  return <>
    <section className="detail-hero" id="top"><nav aria-label={locale === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}><a href={pageHref('integrations', seed)}>{locale === 'ar' ? 'التكاملات' : 'Integrations'}</a><ChevronRight aria-hidden="true" className="directional-icon" /><span>{connector}</span></nav><div className="integration-detail-title"><span><Zap aria-hidden="true" /></span><div><p className="eyebrow">{locale === 'ar' ? 'تكامل معتمد' : 'Verified integration'}</p><h1>{connector} + {demo.product}</h1><p>{locale === 'ar' ? 'حوّل المحادثات والطلبات إلى عمل قابل للتتبع، وأعد التحديثات إلى القناة الصحيحة.' : 'Turn conversations and requests into traceable work, then return updates to the right channel.'}</p><Button endContent={<ArrowIcon />} size="lg">{locale === 'ar' ? `ربط ${connector}` : `Connect ${connector}`}</Button></div></div></section>
    <section className="section detail-columns"><aside><strong>{locale === 'ar' ? 'في هذه الصفحة' : 'On this page'}</strong><a href="#capabilities">{locale === 'ar' ? 'القدرات' : 'Capabilities'}</a><a href="#setup">{locale === 'ar' ? 'الإعداد' : 'Setup'}</a><a href="#related">{locale === 'ar' ? 'تكاملات ذات صلة' : 'Related'}</a></aside><div><section id="capabilities"><h2>{locale === 'ar' ? 'اجعل القنوات نقطة دخول، لا مستودع عمل.' : 'Make channels an entry point, not a work repository.'}</h2><div className="detail-list">{(locale === 'ar' ? ['إنشاء سجل من رسالة أو رمز تفاعل', 'توجيه الطلب بناء على القناة والسياق', 'نشر حالة العمل والقرار تلقائياً'] : ['Create a record from a message or reaction', 'Route the request using channel and context', 'Publish work state and decisions automatically']).map((item) => <div key={item}><Check aria-hidden="true" /><span>{item}</span></div>)}</div></section><section id="setup"><h2>{locale === 'ar' ? 'إعداد واضح في ثلاث خطوات.' : 'A legible three-step setup.'}</h2><ol className="setup-steps">{(locale === 'ar' ? ['اعتمد مساحة العمل', 'اختر القنوات والقواعد', 'اختبر التدفق ثم انشره'] : ['Authorize the workspace', 'Choose channels and routing rules', 'Test the flow, then publish']).map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></section><section id="related"><h2>{locale === 'ar' ? 'تكاملات ذات صلة' : 'Related integrations'}</h2><div className="capability-grid">{['Microsoft 365', 'Zendesk', 'Salesforce'].map((name) => <Card key={name}><CardHeader><CardTitle>{name}</CardTitle><CardDescription>{locale === 'ar' ? 'اربط السياق والتحديثات بسير العمل.' : 'Connect context and updates to the workflow.'}</CardDescription></CardHeader></Card>)}</div></section></div></section>
  </>
}

function CustomersPage({ demo, locale, seed }: { demo: DemoData; locale: Locale; seed: number }) {
  const stories = [['Sahm Cloud', 'Fintech', '31%'], ['Northstar Health', 'Health', '24%'], ['Majlis Works', 'Venture studio', '42%'], ['Cedar Systems', 'Infrastructure', '38%']]
  return <>
    <PageHero body={locale === 'ar' ? 'قصص فرق بنت إيقاعاً تشغيلياً أوضح عبر مناطق ومنتجات متعددة.' : 'Stories from teams that built a clearer operating rhythm across regions and products.'} eyebrow={locale === 'ar' ? 'العملاء' : 'Customers'} title={locale === 'ar' ? 'فرق تبني المستقبل بنظام عمل مشترك.' : 'Teams building the future on a shared work system.'} />
    <section className="section featured-story"><div><p className="eyebrow">{locale === 'ar' ? 'قصة مميزة' : 'Featured story'}</p><h2>{locale === 'ar' ? `كيف وحّدت ${demo.company} العمل بين المنتج والعمليات.` : `How ${demo.company} unified product and operations.`}</h2><p>{locale === 'ar' ? 'نموذج تشغيل واحد حل محل الجداول والاجتماعات وعمليات التسليم المتكررة.' : 'One operating model replaced spreadsheets, status meetings, and repeated handoffs.'}</p><a href={pageHref('customers/aster-labs', seed)}>{locale === 'ar' ? 'اقرأ القصة' : 'Read the story'}<ArrowIcon /></a></div><div className="story-visual"><span>{demo.metric}%</span><p>{locale === 'ar' ? 'دورة عمل أقصر' : 'shorter work cycle'}</p></div></section>
    <section className="section"><SectionHeading body={locale === 'ar' ? 'كل مثال يستخدم بيانات تجريبية حتمية قابلة للاستبدال.' : 'Every example uses deterministic demo data that is ready to replace.'} eyebrow={locale === 'ar' ? 'مكتبة العملاء' : 'Customer library'} title={locale === 'ar' ? 'أدلة بحسب الفريق والسياق.' : 'Proof across teams and contexts.'} /><div className="story-grid">{stories.map(([name, sector, metric]) => <a href={pageHref('customers/aster-labs', seed)} key={name}><span>{sector}</span><h3>{name}</h3><strong>{metric}</strong><p>{locale === 'ar' ? 'تحسن في سرعة التسليم' : 'faster delivery cadence'}</p><ChevronRight aria-hidden="true" className="directional-icon" /></a>)}</div></section>
    <PageCta locale={locale} seed={seed} />
  </>
}

function CustomerStoryPage({ demo, locale, seed }: { demo: DemoData; locale: Locale; seed: number }) {
  return <>
    <article className="case-study" id="top"><header><nav aria-label={locale === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}><a href={pageHref('customers', seed)}>{locale === 'ar' ? 'العملاء' : 'Customers'}</a><ChevronRight aria-hidden="true" className="directional-icon" /><span>{demo.company}</span></nav><p className="eyebrow">{locale === 'ar' ? 'دراسة حالة' : 'Customer story'}</p><h1>{locale === 'ar' ? `${demo.company} تبني نظاماً واحداً للتخطيط والتنفيذ.` : `${demo.company} builds one system for planning and execution.`}</h1><p>{locale === 'ar' ? 'كيف استبدل فريق موزع تنسيقاً مجزأً بنموذج تشغيل واضح وقابل للقياس.' : 'How a distributed team replaced fragmented coordination with a clear, measurable operating model.'}</p></header><div className="case-metrics"><span><strong>{demo.metric}%</strong>{locale === 'ar' ? 'دورة أقصر' : 'shorter cycle'}</span><span><strong>3.2×</strong>{locale === 'ar' ? 'قرارات أسرع' : 'faster decisions'}</span><span><strong>1</strong>{locale === 'ar' ? 'مصدر حقيقة' : 'source of truth'}</span></div><div className="article-layout"><aside><strong>{demo.company}</strong><span>120 {locale === 'ar' ? 'موظفاً' : 'people'}</span><span>{locale === 'ar' ? 'الدوحة ولندن' : 'Doha & London'}</span><span>{locale === 'ar' ? 'التقنية المالية' : 'Financial technology'}</span></aside><div><h2>{locale === 'ar' ? 'التحدي' : 'The challenge'}</h2><p>{locale === 'ar' ? 'توزعت الطلبات والقرارات على المحادثات والجداول واجتماعات الحالة. كان كل فريق يرى جزءاً من الصورة فقط.' : 'Requests and decisions were spread across chat, spreadsheets, and status meetings. Each team could only see part of the picture.'}</p><h2>{locale === 'ar' ? 'التغيير' : 'The change'}</h2><p>{locale === 'ar' ? `بدأت ${demo.company} بسير عمل واحد عالي الاحتكاك، ثم ربطت الإشارات والموافقات والنتائج في ${demo.product}.` : `${demo.company} began with one high-friction workflow, then connected signals, approvals, and outcomes in ${demo.product}.`}</p><blockquote>“{locale === 'ar' ? 'أصبح بإمكاننا رؤية القرار والمسؤول والخطوة التالية من دون طلب تحديث جديد.' : 'We can see the decision, owner, and next move without asking for another update.'}”<cite>{demo.leaders[0]}, {locale === 'ar' ? 'نائب الرئيس للعمليات' : 'VP Operations'}</cite></blockquote><h2>{locale === 'ar' ? 'النتيجة' : 'The outcome'}</h2><p>{locale === 'ar' ? 'انخفض وقت الانتظار بين الفرق، وأصبحت نقاط الاعتماد والتصعيد جزءاً قابلاً للقياس من النظام.' : 'Wait time between teams fell, while approval and escalation became measurable parts of the system.'}</p></div></div></article>
    <PageCta locale={locale} seed={seed} />
  </>
}

function PricingPage({ demo, locale, seed }: { demo: DemoData; locale: Locale; seed: number }) {
  const plans = locale === 'ar'
    ? [['البداية', `$${demo.price}`, 'لفريق يبدأ أول سير عمل.', ['5 أعضاء أساسيين', 'تكاملات جاهزة', 'سجل نشاط']], ['النمو', `$${demo.price + 30}`, 'لفرق تربط عدة عمليات.', ['أعضاء بلا حد', 'وكلاء وأتمتة', 'تحليلات متقدمة']], ['المؤسسة', 'مخصص', 'للحوكمة والتوسع الإقليمي.', ['صلاحيات دقيقة', 'مناطق بيانات', 'دعم مخصص']]]
    : [['Starter', `$${demo.price}`, 'For a team launching its first workflow.', ['5 core members', 'Native integrations', 'Activity history']], ['Scale', `$${demo.price + 30}`, 'For teams connecting multiple operations.', ['Unlimited members', 'Agents and automation', 'Advanced analytics']], ['Enterprise', 'Custom', 'For governance and regional scale.', ['Granular access', 'Data regions', 'Dedicated support']]]
  return <>
    <PageHero body={locale === 'ar' ? 'ابدأ صغيراً مع كل الأساسيات، ثم أضف الأتمتة والحوكمة عندما تحتاجها.' : 'Start small with the full foundation, then add automation and governance when needed.'} eyebrow={locale === 'ar' ? 'الأسعار' : 'Pricing'} title={locale === 'ar' ? 'سعر واضح لكل مرحلة من الاعتماد.' : 'Clear pricing for every stage of adoption.'} />
    <section className="section pricing-page-grid">{plans.map(([name, price, description, features], index) => <Card accent={index === 1 ? 'always' : 'hover'} key={name as string}><CardHeader><Badge variant={index === 1 ? 'default' : 'outline'}>{index === 1 ? (locale === 'ar' ? 'الأكثر اختياراً' : 'Most selected') : (locale === 'ar' ? 'خطة' : 'Plan')}</Badge><CardTitle>{name as string}</CardTitle><CardDescription>{description as string}</CardDescription></CardHeader><CardContent><div className="plan-price"><strong>{price as string}</strong>{price !== 'Custom' && price !== 'مخصص' ? <span>{locale === 'ar' ? '/ شهرياً' : '/ month'}</span> : null}</div><ul>{(features as string[]).map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul><Button onClick={() => { window.location.href = pageHref('contact-sales', seed) }} size="lg" variant={index === 1 ? 'default' : 'outline'}>{locale === 'ar' ? 'اختر الخطة' : 'Choose plan'}</Button></CardContent></Card>)}</section>
    <section className="section comparison-section"><SectionHeading body={locale === 'ar' ? 'قارن الحدود التي تتغير مع حجم المؤسسة.' : 'Compare the controls that change with organizational scale.'} eyebrow={locale === 'ar' ? 'المقارنة' : 'Compare'} title={locale === 'ar' ? 'الأساس مشترك في كل الخطط.' : 'The foundation is shared across every plan.'} /><div className="comparison-table" role="table"><div role="row"><strong role="columnheader">{locale === 'ar' ? 'القدرة' : 'Capability'}</strong><strong role="columnheader">Starter</strong><strong role="columnheader">Scale</strong><strong role="columnheader">Enterprise</strong></div>{[['Workflows', '3', 'Unlimited', 'Unlimited'], ['Automation runs', '1k', '25k', 'Custom'], ['Audit history', '90 days', '1 year', 'Custom'], ['Data regions', '—', '2', '4']].map((row) => <div role="row" key={row[0]}>{row.map((cell) => <span role="cell" key={cell}>{cell}</span>)}</div>)}</div></section>
    <section className="section faq-section"><SectionHeading body={locale === 'ar' ? 'إجابات مختصرة قبل البدء.' : 'Short answers before you begin.'} eyebrow={locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'} title={locale === 'ar' ? 'ما تحتاج إلى معرفته.' : 'What you need to know.'} /><div>{(locale === 'ar' ? [['هل يمكن تغيير الخطة؟', 'نعم، يمكن الترقية أو التخفيض مع بداية دورة الفوترة التالية.'], ['هل يشمل السعر المشاهدين؟', 'المشاهدون بلا حد في جميع الخطط.'], ['هل تتوفر تجربة؟', 'تتضمن كل مساحة عمل فترة تقييم موجهة.']] : [['Can I change plans?', 'Yes. Upgrade or downgrade at the next billing cycle.'], ['Are viewers included?', 'Unlimited viewers are included on every plan.'], ['Is there a trial?', 'Every workspace includes a guided evaluation period.']]).map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  </>
}

function ChangelogPage({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState('all')
  const entries = locale === 'ar'
    ? [['14 يوليو 2026', 'حدود اعتماد الوكلاء', 'أضفنا سياسات اعتماد قابلة لإعادة الاستخدام لكل إجراء آلي.', 'product'], ['2 يوليو 2026', 'دليل تكاملات أسرع', 'بحث وتصنيف أوضح مع صفحات تفاصيل لكل موصل.', 'integrations'], ['18 يونيو 2026', 'مؤشرات سير العمل', 'مشاهد جديدة لوقت الانتظار والتسليم والاختناقات.', 'product'], ['3 يونيو 2026', 'مناطق بيانات إضافية', 'خيارات إقامة بيانات جديدة للفرق الإقليمية.', 'api']]
    : [['July 14, 2026', 'Agent approval boundaries', 'Reusable approval policies can now govern every automated action.', 'product'], ['July 2, 2026', 'A faster integration directory', 'Clearer search and categories with detail pages for every connector.', 'integrations'], ['June 18, 2026', 'Workflow insights', 'New views for wait time, handoffs, and bottlenecks.', 'product'], ['June 3, 2026', 'Additional data regions', 'New data residency options for regional teams.', 'api']]
  const filters = [['all', locale === 'ar' ? 'الكل' : 'All updates'], ['product', locale === 'ar' ? 'المنتج' : 'Product'], ['integrations', locale === 'ar' ? 'التكاملات' : 'Integrations'], ['api', 'API']]
  const visibleEntries = entries.filter((entry) => filter === 'all' || entry[3] === filter)
  return <>
    <PageHero body={locale === 'ar' ? 'تحسينات صغيرة وكبيرة على المنتج والنظام والتجربة.' : 'Small and substantial improvements across the product, system, and experience.'} eyebrow={locale === 'ar' ? 'سجل التغييرات' : 'Changelog'} title={locale === 'ar' ? 'ما الجديد في المنتج.' : 'What is new in the product.'} />
    <section className="section changelog-layout"><aside><strong>{locale === 'ar' ? 'التصفية' : 'Filter'}</strong>{filters.map(([key, label]) => <button aria-pressed={filter === key} key={key} onClick={() => setFilter(key)} type="button">{label}</button>)}</aside><div aria-live="polite">{visibleEntries.map(([date, title, body], index) => <article key={title}><span>{date}</span><div><Badge variant="outline">v2.{8 - index}</Badge><h2>{title}</h2><p>{body}</p><div className="changelog-visual"><span>{index % 2 === 0 ? <Bot aria-hidden="true" /> : <Workflow aria-hidden="true" />}</span><strong>{title}</strong><small>{locale === 'ar' ? 'معاينة تحديث المنتج' : 'Product update preview'}</small></div></div></article>)}</div></section>
  </>
}

function ContactSalesPage({ demo, locale }: { demo: DemoData; locale: Locale }) {
  const [submitted, setSubmitted] = useState(false)
  if (submitted) return <section className="contact-success" id="top"><CircleCheck aria-hidden="true" /><p className="eyebrow">{locale === 'ar' ? 'تم استلام الطلب' : 'Request received'}</p><h1>{locale === 'ar' ? 'سنتواصل معك قريباً.' : 'We will be in touch shortly.'}</h1><p>{locale === 'ar' ? `شكراً لاهتمامك بـ ${demo.product}.` : `Thank you for your interest in ${demo.product}.`}</p></section>
  return <section className="contact-layout" id="top"><div><p className="eyebrow">{locale === 'ar' ? 'تواصل مع المبيعات' : 'Contact sales'}</p><h1>{locale === 'ar' ? 'صمّم مسار اعتماد يناسب فريقك.' : 'Design an adoption path for your team.'}</h1><p>{locale === 'ar' ? 'اطلب عرضاً، اختر الخطة المناسبة، واحصل على مساعدة في الإعداد.' : 'Request a demo, choose the right plan, and get help with setup.'}</p><ul>{(locale === 'ar' ? ['عرض مخصص لسير عملك', 'توصية بالخطة والحوكمة', 'دعم للإعداد والتكامل'] : ['A demo tailored to your workflow', 'Plan and governance recommendation', 'Setup and integration support']).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label>{locale === 'ar' ? 'الاسم' : 'Name'}<TextInput name="name" required /></label><label>{locale === 'ar' ? 'البريد للعمل' : 'Work email'}<TextInput name="email" required type="email" /></label><label>{locale === 'ar' ? 'الشركة' : 'Company'}<TextInput name="company" required /></label><label>{locale === 'ar' ? 'حجم الفريق' : 'Team size'}<Selector defaultValue=""><option disabled value="">{locale === 'ar' ? 'اختر' : 'Select'}</option><option>1–20</option><option>21–100</option><option>101–500</option><option>500+</option></Selector></label><label>{locale === 'ar' ? 'ما سير العمل الذي تريد تحسينه؟' : 'Which workflow do you want to improve?'}<Textarea name="workflow" rows={5} /></label><Button endContent={<ArrowIcon />} size="lg" type="submit">{locale === 'ar' ? 'إرسال الطلب' : 'Submit request'}</Button><small>{locale === 'ar' ? 'بيانات تجريبية فقط — لا يتم إرسالها إلى خدمة خارجية.' : 'Demo only — data is not sent to an external service.'}</small></form></section>
}

function SecondaryPage({ demo, locale, page, previewMode, seed, setPreviewMode }: { demo: DemoData; locale: Locale; page: PageKey; previewMode: PreviewMode; seed: number; setPreviewMode: (mode: PreviewMode) => void }) {
  if (page === 'product') return <ProductPage demo={demo} locale={locale} previewMode={previewMode} seed={seed} setPreviewMode={setPreviewMode} />
  if (page === 'agents') return <AgentsPage demo={demo} locale={locale} seed={seed} />
  if (page === 'integrations') return <IntegrationsPage locale={locale} seed={seed} />
  if (page === 'integration-detail') return <IntegrationDetailPage demo={demo} locale={locale} seed={seed} />
  if (page === 'customers') return <CustomersPage demo={demo} locale={locale} seed={seed} />
  if (page === 'customer-story') return <CustomerStoryPage demo={demo} locale={locale} seed={seed} />
  if (page === 'pricing') return <PricingPage demo={demo} locale={locale} seed={seed} />
  if (page === 'changelog') return <ChangelogPage locale={locale} />
  return <ContactSalesPage demo={demo} locale={locale} />
}

function App() {
  const params = new URLSearchParams(window.location.search)
  const seed = Number(params.get('seed')) || 1974341818
  const page = getPageKey()
  const [locale, setLocale] = useState<Locale>(() => window.localStorage.getItem('ceramic-saas-locale') === 'ar' ? 'ar' : 'en')
  const [colorMode, setColorMode] = useState<'dark' | 'light'>(() => window.localStorage.getItem('ceramic-saas-mode') === 'light' ? 'light' : 'dark')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('overview')
  const [isolated, setIsolated] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pageMotion = useMotionPattern('page')
  const revealMotion = useMotionPattern('reveal')
  const t = copy[locale]
  const siteNav = [
    { key: 'product', label: locale === 'ar' ? 'المنتج' : 'Product', href: pageHref('product', seed) },
    { key: 'agents', label: locale === 'ar' ? 'الوكلاء' : 'Agents', href: pageHref('agents', seed) },
    { key: 'integrations', label: locale === 'ar' ? 'التكاملات' : 'Integrations', href: pageHref('integrations', seed) },
    { key: 'customers', label: locale === 'ar' ? 'العملاء' : 'Customers', href: pageHref('customers', seed) },
    { key: 'pricing', label: locale === 'ar' ? 'الأسعار' : 'Pricing', href: pageHref('pricing', seed) },
    { key: 'changelog', label: locale === 'ar' ? 'التحديثات' : 'Changelog', href: pageHref('changelog', seed) },
  ]
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
    window.localStorage.setItem('ceramic-saas-locale', locale)
    window.localStorage.setItem('ceramic-saas-mode', colorMode)
  }, [colorMode, locale])

  useEffect(() => {
    const pageName = page === 'home' ? (locale === 'ar' ? 'الرئيسية' : 'Home') : siteNav.find((item) => item.key === page)?.label ?? (locale === 'ar' ? 'التفاصيل' : 'Details')
    document.title = `${pageName} — ${demo.product}`
  }, [demo.product, locale, page])

  useEffect(() => {
    const onScroll = () => setIsolated(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targetId = window.location.hash.replace(/^#/, '')
    if (!targetId) return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [page])

  const workflowSteps = locale === 'ar'
    ? [['استقبل', 'حوّل الطلبات والإشارات إلى سجل منظم مع السياق الصحيح.'], ['نسّق', 'حدد المسؤول والخطوة التالية واتفاقية مستوى الخدمة تلقائياً.'], ['اعتمد', 'أدخل الحكم البشري عند القرارات الحساسة فقط.'], ['تعلّم', 'حوّل النتائج إلى قواعد ومؤشرات أوضح للدورة التالية.']]
    : [['Capture', 'Turn requests and signals into structured work with the right context.'], ['Coordinate', 'Assign the owner, next action, and service level automatically.'], ['Approve', 'Bring human judgment into the moments that carry real consequence.'], ['Learn', 'Feed outcomes back into clearer rules and signals for the next cycle.']]
  const integrationNames = ['Slack', 'Salesforce', 'HubSpot', 'GitHub', 'Notion', 'Snowflake', 'Jira', 'Microsoft 365']

  return (
    <div className="template-shell">
      <header className="site-header" data-isolated={isolated || undefined}>
        <div className="nav-frame">
          <a className="product-logo" href={pageHref('', seed)} aria-label={`${demo.product} home`}><span className="brand-mark" />{demo.product}</a>
          <TopNav aria-label={locale === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'} className="site-links">
            {siteNav.map((item) => <TopNavItem href={item.href} isCurrent={page === item.key || (page === 'integration-detail' && item.key === 'integrations') || (page === 'customer-story' && item.key === 'customers')} key={item.key}>{item.label}</TopNavItem>)}
          </TopNav>
          <div className="nav-actions">
            <Button aria-label={t.theme} isIconOnly onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')} size="icon" variant="ghost">
              {colorMode === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>
            <Button aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'} className="language-button" onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')} size="sm" startContent={<Languages aria-hidden="true" />} variant="ghost">{t.language}</Button>
            <Button className="nav-cta" onClick={() => { window.location.href = pageHref('contact-sales', seed) }} size="sm">{t.contact}</Button>
            <Button aria-expanded={menuOpen} aria-label={menuOpen ? t.closeMenu : t.menu} className="menu-button" isIconOnly onClick={() => setMenuOpen(!menuOpen)} size="icon" variant="ghost">
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {menuOpen ? <motion.nav animate={{ opacity: 1, y: 0 }} className="mobile-menu" aria-label={t.menu} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>{siteNav.map((item) => <a href={item.href} key={item.key} onClick={() => setMenuOpen(false)}>{item.label}<ChevronRight aria-hidden="true" className="directional-icon" /></a>)}</motion.nav> : null}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
      <motion.main
        animate={{ opacity: 1, y: 0 }}
        exit={pageMotion.enabled ? { opacity: 0, y: -6 } : undefined}
        id="main-content"
        initial={pageMotion.enabled ? { opacity: 0, y: 8 } : false}
        key={`${page}-${locale}`}
        transition={pageMotion.transition}
      >
        {page === 'home' ? <>
        <motion.section
          animate="visible"
          className="hero"
          id="top"
          initial={revealMotion.enabled ? 'hidden' : false}
          variants={{ hidden: {}, visible: { transition: { delayChildren: 0.08, staggerChildren: revealMotion.enabled ? 0.07 : 0 } } }}
        >
          <div className="hero-grid" aria-hidden="true" />
          <motion.a className="announcement" href="#agents" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: revealMotion.transition } }}><span>{t.announcement}</span><ChevronRight className="directional-icon" /></motion.a>
          <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: revealMotion.transition } }}>{t.heroEyebrow}</motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: revealMotion.transition } }}>{t.heroTitle}</motion.h1>
          <motion.p className="hero-copy" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: revealMotion.transition } }}>{t.heroBody}</motion.p>
          <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: revealMotion.transition } }}>
            <Button endContent={<ArrowIcon />} onClick={() => goTo('pricing')} size="lg">{t.start}</Button>
            <Button onClick={() => goTo('product')} size="lg" startContent={<Play aria-hidden="true" />} variant="outline">{t.tour}</Button>
          </motion.div>
          <motion.div className="hero-proof" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: revealMotion.transition } }}><span>{demo.metric}%</span><p>{locale === 'ar' ? 'وقت أقل في التنسيق اليدوي خلال أول 90 يوماً' : 'less time spent on manual coordination in the first 90 days'}</p></motion.div>
        </motion.section>

        <section className="section product-section" id="product">
          <SectionHeading body={t.productBody} eyebrow={t.productEyebrow} title={t.productTitle} />
          <ProductPreview locale={locale} mode={previewMode} product={demo.product} setMode={setPreviewMode} />
          <RevealBlock className="logo-proof"><p>{t.trusted}</p><div>{['Sahm', 'NORTHSTAR', 'ASTER', 'CEDAR', 'MAJLIS'].map((name) => <span key={name}>{name}</span>)}</div></RevealBlock>
        </section>

        <section className="section workflow-section" id="workflow">
          <SectionHeading body={t.workflowBody} eyebrow={t.workflowEyebrow} title={t.workflowTitle} />
          <div className="workflow-grid">
            {workflowSteps.map(([title, body], index) => (
              <RevealBlock className="workflow-step" delay={index * 0.06} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div>{index < workflowSteps.length - 1 ? <ChevronRight aria-hidden="true" className="step-arrow directional-icon" /> : null}</RevealBlock>
            ))}
          </div>
        </section>

        <section className="section agents-section" id="agents">
          <div className="agents-copy"><SectionHeading body={t.agentsBody} eyebrow={t.agentsEyebrow} title={t.agentsTitle} /><RevealBlock><ul className="check-list">
            {(locale === 'ar' ? ['حدود اعتماد واضحة لكل إجراء', 'سجل قابل للمراجعة لكل قرار', 'تحويل فوري إلى عضو الفريق عند الحاجة'] : ['Explicit approval boundaries for every action', 'An inspectable trace for every decision', 'Immediate handoff to a teammate when needed']).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
          </ul></RevealBlock></div>
          <RevealBlock className="agent-console">
            <div className="console-head"><span><Bot aria-hidden="true" />{locale === 'ar' ? 'وكيل الفرز' : 'Triage agent'}</span><Badge variant="success">{locale === 'ar' ? 'نشط' : 'Active'}</Badge></div>
            <div className="agent-flow"><div><span>01</span><p>{locale === 'ar' ? 'وصل طلب شراكة جديد' : 'New partnership request received'}</p><small>09:42</small></div><i /><div><span>02</span><p>{locale === 'ar' ? 'تم إثراء الحساب والسياق' : 'Account and context enriched'}</p><small>09:42</small></div><i /><div className="requires-review"><span>03</span><p>{locale === 'ar' ? 'مطلوب اعتماد بشري' : 'Human approval required'}</p><Button size="sm">{locale === 'ar' ? 'مراجعة' : 'Review'}</Button></div></div>
            <div className="console-note"><ShieldCheck aria-hidden="true" /><span>{locale === 'ar' ? 'لن يرسل الوكيل أي رد قبل الاعتماد.' : 'The agent cannot send a response before approval.'}</span></div>
          </RevealBlock>
        </section>

        <section className="section integrations-section" id="integrations">
          <SectionHeading body={t.integrationsBody} eyebrow={t.integrationsEyebrow} title={t.integrationsTitle} />
          <RevealBlock className="integration-stage">
            <div className="integration-core"><Network aria-hidden="true" /><strong>{demo.product}</strong><span>{locale === 'ar' ? 'طبقة التشغيل' : 'Operating layer'}</span></div>
            <div className="integration-grid">{integrationNames.map((name, index) => {
              const IntegrationIcon = [Zap, Cloud, Database, GitBranch, Code2, Database, Workflow, Globe2][index]
              return <div key={name}><span><IntegrationIcon aria-hidden="true" /></span><strong>{name}</strong><small>{locale === 'ar' ? 'متصل' : 'Connected'}</small></div>
            })}</div>
          </RevealBlock>
        </section>

        <section className="section security-section" id="security">
          <SectionHeading body={t.securityBody} eyebrow={t.securityEyebrow} title={t.securityTitle} />
          <div className="security-grid">
            {[
              [ShieldCheck, locale === 'ar' ? 'صلاحيات دقيقة' : 'Granular access', locale === 'ar' ? 'أدوار ونطاقات وموافقات تناسب طريقة عمل كل فريق.' : 'Roles, scopes, and approvals that match how each team operates.'],
              [Clock3, locale === 'ar' ? 'سجل تدقيق كامل' : 'Complete audit trail', locale === 'ar' ? 'كل تغيير وإجراء آلي وقرار بشري قابل للتتبع.' : 'Every change, automated action, and human decision remains traceable.'],
              [Globe2, locale === 'ar' ? 'جاهزية إقليمية' : 'Regional readiness', locale === 'ar' ? 'ضوابط بيانات وعمليات تناسب فرقاً تعمل عبر مناطق متعددة.' : 'Data and operating controls for teams working across regions.'],
            ].map(([Icon, title, body], index) => <RevealBlock className="motion-card-wrap" delay={index * 0.06} key={String(title)}><Card accent="hover" className="security-card"><CardHeader><div className="security-icon"><Icon aria-hidden="true" /></div><CardTitle>{title as string}</CardTitle><CardDescription>{body as string}</CardDescription></CardHeader><CardContent><span><Check aria-hidden="true" />{locale === 'ar' ? 'متوفر في كل الخطط' : 'Available on every plan'}</span></CardContent></Card></RevealBlock>)}
          </div>
          <RevealBlock className="reliability-strip"><span><b>99.99%</b>{locale === 'ar' ? 'وقت التشغيل' : 'uptime'}</span><span><b>SOC 2</b>{locale === 'ar' ? 'ضوابط مدققة' : 'audited controls'}</span><span><b>24/7</b>{locale === 'ar' ? 'مراقبة' : 'monitoring'}</span><span><b>4</b>{locale === 'ar' ? 'مناطق بيانات' : 'data regions'}</span></RevealBlock>
        </section>

        <section className="section proof-section" aria-labelledby="proof-title">
          <RevealBlock className="proof-number"><span>{demo.metric}%</span><p>{locale === 'ar' ? 'انخفاض في وقت دورة العمل بعد ربع واحد' : 'shorter work cycle after one quarter'}</p></RevealBlock>
          <RevealBlock><figure className="quote"><p className="eyebrow" id="proof-title">{t.proofEyebrow}</p><blockquote>“{t.proofQuote}”</blockquote><figcaption><span>{demo.leaders[0].split(' ').map((part) => part[0]).join('')}</span><div><strong>{demo.leaders[0]}</strong><small>{t.proofRole}, {demo.company}</small></div></figcaption></figure></RevealBlock>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="pricing-copy"><SectionHeading body={t.pricingBody} eyebrow={t.pricingEyebrow} title={t.pricingTitle} /><Button endContent={<ArrowIcon />} onClick={() => { window.location.href = 'mailto:hello@example.com?subject=SaaS%20workspace' }} size="lg">{t.contact}</Button></div>
          <RevealBlock className="motion-card-wrap"><Card accent="always" className="pricing-card"><CardHeader><CardTitle>{t.plan}</CardTitle><CardDescription>{locale === 'ar' ? 'للفرق التي تبدأ سير عمل تشغيلياً مشتركاً.' : 'For teams beginning with one shared operational workflow.'}</CardDescription></CardHeader><CardContent><div className="price"><span>$</span><strong>{demo.price}</strong><small>{t.perMonth}</small></div><ul>{(locale === 'ar' ? ['5 أعضاء أساسيين', 'أتمتة ووكلاء بلا حد', 'تكاملات جاهزة', 'سجل تدقيق كامل'] : ['5 core members', 'Unlimited automations and agents', 'Native integrations', 'Complete audit history']).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul><Button endContent={<ArrowIcon />} onClick={() => { window.location.href = 'mailto:hello@example.com?subject=Create%20workspace' }} size="lg">{t.cta}</Button><p>{t.planNote}</p></CardContent></Card></RevealBlock>
        </section>
        </> : <SecondaryPage demo={demo} locale={locale} page={page} previewMode={previewMode} seed={seed} setPreviewMode={setPreviewMode} />}
      </motion.main>
      </AnimatePresence>

      <footer className="site-footer"><a className="product-logo" href={pageHref('', seed)}><span className="brand-mark" />{demo.product}</a><p>{t.footer}</p><div><a href={pageHref('product', seed)}>{locale === 'ar' ? 'المنتج' : 'Product'}</a><a href={pageHref('customers', seed)}>{locale === 'ar' ? 'العملاء' : 'Customers'}</a><a href={pageHref('pricing', seed)}>{locale === 'ar' ? 'الأسعار' : 'Pricing'}</a><a href={pageHref('contact-sales', seed)}>{locale === 'ar' ? 'اتصل بنا' : 'Contact'}</a></div><small>© 2026 {demo.product}. Seed {seed}.</small></footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><MotionProvider asChild><App /></MotionProvider></StrictMode>)
