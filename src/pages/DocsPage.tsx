import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Bell, ChevronDown, Download, Home, PanelLeft, Search, Settings } from 'lucide-react'
import { dextrumTheme, themes, utopiaDefaultTheme } from '../data/design-system'
import { DextrumTypographySubpage, dextrumTypographySegmentFromPath } from './DextrumTypographySubpage'
import { ArabicDisplay, ArabicText } from '../../packages/design-system/src/Typography'
import { docsLabel, t, useI18n } from '../i18n'

type DocsPageProps = {
  path?: string
}

type TokenRow = {
  group: 'color' | 'typography' | 'spacing' | 'size' | 'border' | 'shape' | 'motion' | 'elevation' | 'icons' | 'illustrations'
  name: string
  value: string
  role: string
  aiRule: string
}

const tokenRows: TokenRow[] = [
  { group: 'color', name: '--background', value: 'theme surface root', role: 'App/page background', aiRule: 'Use for page shells only; never substitute raw brand black.' },
  { group: 'color', name: '--foreground', value: 'theme foreground', role: 'Primary text and icons', aiRule: 'Use for readable primary content.' },
  { group: 'color', name: '--surface', value: 'base semantic surface', role: 'Neutral UI panels', aiRule: 'Use for unframed local UI, not brand bands.' },
  { group: 'color', name: '--surface-strong', value: 'strong semantic surface', role: 'Inputs, active nav, grouped controls', aiRule: 'Use for stronger state emphasis without inventing color.' },
  { group: 'color', name: '--surface-elevated', value: 'elevated semantic surface', role: 'Popover/dialog/menu surfaces', aiRule: 'Use with elevation tokens, not raw shadows.' },
  { group: 'color', name: '--card', value: 'semantic framed surface', role: 'Card and framed tool background', aiRule: 'Use for repeated surfaces, not page bands.' },
  { group: 'color', name: '--primary', value: 'theme primary action', role: 'Primary action emphasis', aiRule: 'Only one primary action per view unless the workflow proves otherwise.' },
  { group: 'color', name: '--secondary', value: 'theme secondary action', role: 'Secondary controls and quiet actions', aiRule: 'Prefer for most non-primary controls.' },
  { group: 'color', name: '--destructive', value: 'danger action role', role: 'Irreversible or dangerous action', aiRule: 'Use only when paired with confirmation or clear destructive copy.' },
  { group: 'color', name: '--muted', value: 'low-emphasis surface', role: 'Quiet backgrounds and disabled context', aiRule: 'Use with --muted-foreground for readable supporting UI.' },
  { group: 'color', name: '--border', value: 'semantic hairline', role: 'Separators, tables, card edges', aiRule: 'Use borders before inventing shadows in Utopia Default.' },
  { group: 'color', name: '--ring', value: 'focus color', role: 'Focus-visible outline', aiRule: 'Do not remove focus rings for visual polish.' },
  { group: 'typography', name: '--font-sans', value: 'Latin/default font stack', role: 'Default UI typography', aiRule: 'Theme-owned; do not hardcode TWK Lausanne in core.' },
  { group: 'typography', name: '--font-mono', value: 'code font stack', role: 'Code, tokens, CLI output', aiRule: 'Use for machine-readable snippets and token names.' },
  { group: 'typography', name: '--font-arabic-body', value: 'Arabic body font stack', role: 'Arabic and mixed-script body text', aiRule: 'Apply when lang="ar" or Arabic text appears.' },
  { group: 'typography', name: '--font-arabic-display', value: 'Arabic display font stack', role: 'Arabic display headings', aiRule: 'Use instead of Latin uppercase styling.' },
  { group: 'typography', name: '--font-size-display', value: 'Latin/default display scale', role: 'Hero and display headings', aiRule: 'Use as the reference scale for display typography.' },
  { group: 'typography', name: '--font-size-arabic-display', value: '95% of display scale', role: 'Arabic display headings', aiRule: 'Arabic display should track Latin display scale at about 95%, not become larger.' },
  { group: 'typography', name: '--line-height-arabic-body', value: 'Arabic body rhythm', role: 'Connected Arabic letterforms', aiRule: 'Use taller rhythm than Latin body text.' },
  { group: 'typography', name: '--line-height-arabic-display', value: 'Arabic display rhythm', role: 'Large Arabic headings', aiRule: 'Use scale/weight/rhythm, not uppercase.' },
  { group: 'typography', name: '--tracking-arabic-display', value: '0', role: 'Arabic display tracking', aiRule: 'Do not letter-space Arabic as a substitute for Latin all-caps.' },
  { group: 'spacing', name: '--space-1', value: '4px', role: 'Tiny inline gap', aiRule: 'Use for icon/text micro-spacing through gap or logical padding.' },
  { group: 'spacing', name: '--space-2', value: '8px', role: 'Compact component gap', aiRule: 'Use for dense controls, chips, and tight rows.' },
  { group: 'spacing', name: '--space-3', value: '12px', role: 'Default control inset', aiRule: 'Use for compact padding-inline, not margin-left.' },
  { group: 'spacing', name: '--space-4', value: '16px', role: 'Default inline/block spacing', aiRule: 'Use through logical properties: padding-inline, margin-block.' },
  { group: 'spacing', name: '--space-6', value: '24px', role: 'Section and panel spacing', aiRule: 'Use for readable form groups and card content.' },
  { group: 'spacing', name: '--space-8', value: '32px', role: 'Large content spacing', aiRule: 'Use for major content separation.' },
  { group: 'spacing', name: '--space-12', value: '48px', role: 'Page rhythm', aiRule: 'Use for page-level sections only.' },
  { group: 'size', name: '--size-control-sm', value: 'compact control height', role: 'Small buttons, dense inputs, toolbar controls', aiRule: 'Use for compact density; do not shrink hit targets below accessibility rules.' },
  { group: 'size', name: '--size-control-md', value: 'default control height', role: 'Default buttons, inputs, selects', aiRule: 'Use as the default interactive control block-size.' },
  { group: 'size', name: '--size-control-lg', value: 'large control height', role: 'Prominent actions and spacious forms', aiRule: 'Use when hierarchy calls for a larger action.' },
  { group: 'size', name: '--size-icon-sm', value: 'small icon box', role: 'Dense navigation and metadata', aiRule: 'Pair with labels or accessible names.' },
  { group: 'size', name: '--size-icon-md', value: 'default icon box', role: 'Buttons, nav items, menu triggers', aiRule: 'Icon size is semantic; theme controls visual icon style.' },
  { group: 'border', name: '--border-width-hairline', value: '1px', role: 'Default separators and framed surfaces', aiRule: 'Prefer hairline borders for Utopia Default elevation.' },
  { group: 'border', name: '--border-width-focus', value: '2px', role: 'Focus-visible outline width', aiRule: 'Do not remove focus-visible outlines.' },
  { group: 'border', name: '--border-style-default', value: 'solid', role: 'Default UI border style', aiRule: 'Avoid decorative border styles in reusable primitives.' },
  { group: 'shape', name: '--radius-control', value: 'control shape', role: 'Buttons, inputs, menu items', aiRule: 'Use instead of hardcoded border-radius in reusable components.' },
  { group: 'shape', name: '--radius-surface', value: 'surface shape', role: 'Cards, dialogs, popovers', aiRule: 'Use for framed surfaces.' },
  { group: 'shape', name: '--radius-chat-bubble', value: 'chat bubble shape', role: 'Message bubbles and tokenized chat text', aiRule: 'Use for chat message geometry instead of --radius-full.' },
  { group: 'shape', name: '--radius-chat-composer', value: 'chat composer shape', role: 'Chat composer input surfaces', aiRule: 'Use for assistant input/composer geometry.' },
  { group: 'shape', name: '--radius-chat-token', value: 'chat token shape', role: 'Composer chips and chat token elements', aiRule: 'Use for attachments, command tokens, and chips inside chat composers.' },
  { group: 'shape', name: '--radius-round', value: 'fully rounded role', role: 'Avatars, badges, circular controls', aiRule: 'Use only for intentionally circular/rounded affordances.' },
  { group: 'motion', name: '--duration-fast', value: '120ms', role: 'Hover/focus feedback', aiRule: 'Use for small interaction state changes.' },
  { group: 'motion', name: '--duration-medium', value: '220ms', role: 'Collapse/expand and layout motion', aiRule: 'Use for nav sections and disclosure motion.' },
  { group: 'motion', name: '--duration-slow', value: '360ms', role: 'Large surface entrance/exit', aiRule: 'Use sparingly and respect reduced motion.' },
  { group: 'motion', name: '--ease-standard', value: 'theme easing', role: 'Default state transition', aiRule: 'Use standard easing unless component contract says otherwise.' },
  { group: 'motion', name: '--ease-emphasized', value: 'theme emphasized easing', role: 'Disclosure and shell motion', aiRule: 'Use for collapse/expand transitions.' },
  { group: 'elevation', name: '--shadow-surface', value: 'surface shadow role', role: 'Subtle raised surface', aiRule: 'Theme may map to none, border, or shadow.' },
  { group: 'elevation', name: '--shadow-popover', value: 'popover shadow role', role: 'Floating menus and popovers', aiRule: 'Use only with semantic elevated surface.' },
  { group: 'elevation', name: '--shadow-dialog', value: 'dialog shadow role', role: 'Modal surfaces', aiRule: 'Do not hardcode CSS box-shadow in components.' },
  { group: 'icons', name: '--icon-size-sm', value: 'small icon size', role: 'Dense item icons', aiRule: 'Pair with accessible labels for icon-only controls.' },
  { group: 'icons', name: '--icon-size-md', value: 'default icon size', role: 'Default actions and nav items', aiRule: 'Icon style is theme-owned; slots are core-owned.' },
  { group: 'icons', name: '--icon-stroke-width', value: 'theme icon stroke', role: 'Icon visual weight', aiRule: 'Do not bake Utopia icon philosophy into core.' },
  { group: 'illustrations', name: '--media-radius', value: 'media shape role', role: 'Screenshots, illustrations, product images', aiRule: 'Use when media is part of a theme or template contract.' },
  { group: 'illustrations', name: '--media-background', value: 'media stage role', role: 'Illustration preview background', aiRule: 'Do not invent decorative blobs or gradients as filler.' },
]

const foundationPages = {
  'all-tokens': {
    title: 'All Tokens',
    intro: 'The complete semantic contract starts here. Components consume roles, themes map those roles to visual primitives, and AI agents must read this before generating UI.',
    groups: ['color', 'typography', 'spacing', 'size', 'border', 'shape', 'motion', 'elevation', 'icons', 'illustrations'] as TokenRow['group'][],
  },
  color: {
    title: 'Color',
    intro: 'Color tokens describe UI roles. Utopia Default maps those roles to Brick Red, Special Black, Light Grey, and White, but reusable components never consume raw brand primitives.',
    groups: ['color'] as TokenRow['group'][],
  },
  typography: {
    title: 'Typography',
    intro: 'Typography separates Latin/default display rules from Arabic display and body rules. Arabic is not a translated uppercase style.',
    groups: ['typography'] as TokenRow['group'][],
  },
  spacing: {
    title: 'Spacing',
    intro: 'Spacing is logical, not physical. Layouts must use inline/block and start/end language so RTL products get equal capability.',
    groups: ['spacing'] as TokenRow['group'][],
  },
  shape: {
    title: 'Shape',
    intro: 'Shape tokens separate controls, surfaces, borders, and fixed dimensions. Utopia Default maps controls and surfaces to square geometry, but future themes may not.',
    groups: ['shape', 'size', 'border'] as TokenRow['group'][],
  },
  motion: {
    title: 'Motion',
    intro: 'Motion clarifies state. Directional motion must be aware of inline start/end and RTL mirroring.',
    groups: ['motion'] as TokenRow['group'][],
  },
  elevation: {
    title: 'Elevation',
    intro: 'Elevation is expressed through semantic surfaces, borders, and optional shadows. Utopia Default avoids brand-surface drop shadows.',
    groups: ['elevation'] as TokenRow['group'][],
  },
  icons: {
    title: 'Icons',
    intro: 'Core supports icon slots and icon-only actions. Theme manifests decide icon style. Directional icons require explicit RTL rules.',
    groups: ['icons'] as TokenRow['group'][],
  },
  illustrations: {
    title: 'Illustrations',
    intro: 'Illustrations are optional theme-owned media. Core must not require decorative imagery for component usability.',
    groups: ['illustrations'] as TokenRow['group'][],
  },
} as const

const foundationGroupLabels: Record<TokenRow['group'], string> = {
  color: 'Color',
  typography: 'Typography',
  spacing: 'Spacing',
  size: 'Size',
  border: 'Border',
  shape: 'Shape',
  motion: 'Motion',
  elevation: 'Elevation',
  icons: 'Icons',
  illustrations: 'Illustrations',
}

const guidePages = {
  'what-s-new': {
    title: "What's New",
    intro: 'Release notes for design-system structure, component readiness, theme policy, and AI-facing contracts.',
    usage: ['Use this page to understand what changed before adopting new components or docs.', 'Keep entries factual, dated, and tied to package or manifest changes.', 'AI agents should read this before assuming older examples still reflect the current system.'],
    rules: ['Document source-of-truth changes, not informal design opinions.', 'Call out breaking changes and migration notes.', 'Keep production website changes out of design-system release notes unless the website consumes a DS change.'],
    checklist: ['Check component manifests for status changes.', 'Check theme manifests for token changes.', 'Check docs/design-system for new AI or Arabic-friendly rules.'],
  },
  'quick-start-with-ai': {
    title: 'Quick Start with AI',
    intro: 'The shortest safe path for an AI coding agent to install, inspect, and use Utopia Design System without guessing.',
    usage: ['Start with CLI dense docs, then inspect manifests.', 'Prefer Utopia package exports before raw shadcn primitives.', 'Use semantic tokens and Arabic-friendly checks from the beginning.'],
    rules: ['Read quick-start-ai.md, foundations.md, arabic-friendly.md, and shadcn-conversion.md.', 'Never invent package imports, raw brand tokens, or Arabic production copy.', 'Run doctor and component audit after changing the system.'],
    checklist: ['npm run ds -- docs quick-start-ai --dense', 'npm run ds -- docs foundations --dense', 'npm run ds -- docs arabic-friendly --dense', 'npm run ds -- component --list --dense'],
  },
  'working-with-ai': {
    title: 'Working with AI',
    intro: 'Rules for making the design system readable and usable by AI agents and human engineers at the same time.',
    usage: ['Use manifests as the source of truth for imports, status, tokens, and prohibitions.', 'Write docs in contract language: use when, avoid when, required tokens, fallback behavior.', 'Keep examples copy-pasteable and scoped to DS package exports.'],
    rules: ['Do not hide behavior only in prose or visuals.', 'Do not make AI infer shadcn fallback status from implementation files.', 'Every public component should have manifest and CLI discovery.'],
    checklist: ['components.json has packageImport, sourcePath, shadcnFoundation, requiredTokens, useWhen, avoidWhen, neverInvent.', 'catalog.json exposes the correct IA.', 'llms.txt points to the current docs and manifests.'],
  },
  principles: {
    title: 'Principles',
    intro: 'The operating principles behind Ceramic: semantic first, shadcn-founded, theme-extensible, Arabic-friendly, and AI-readable.',
    usage: ['Use principles to resolve tradeoffs before adding components or theme rules.', 'Keep reusable components free of Utopia Default visual philosophy.', 'Let themes own brand-specific color, type, icon, geometry, and tone.'],
    rules: ['Core owns architecture, accessibility, semantic roles, shadcn conversion, and Arabic-friendly baseline.', 'Themes own visual philosophy and primitive mappings.', 'Docs and manifests must be specific enough for an AI agent to act without guessing.'],
    checklist: ['No raw brand primitives in reusable components.', 'Semantic tokens are used for color, radius, typography, spacing, motion, and elevation.', 'Arabic/RTL checks are explicit for navigation, forms, tables, and overlays.'],
  },
  'theme-system': {
    title: 'Theme System',
    intro: 'Themes implement the semantic role contract. Utopia Default is the first locked theme, not the whole design system.',
    usage: ['Use themes to map semantic roles to brand primitives.', 'Add future themes by preserving required semantic roles and adding extension tokens when needed.', 'Keep component code stable across theme changes.'],
    rules: ['Themes may add many primitives but must preserve required roles.', 'Do not put Utopia Default rules into reusable components.', 'Arabic typography tokens are required for every serious theme.'],
    checklist: ['themes.json lists required roles.', 'theme-utopia-default.json documents visual policy.', 'Theme CSS defines color, type, spacing, radius, motion, Arabic tokens, and elevation roles.'],
  },
  'arabic-friendly': {
    title: 'Arabic Friendly',
    intro: 'Arabic-friendly means RTL-first layout, Arabic typography, mixed-script resilience, localization readiness, and intentional icon/motion mirroring.',
    usage: ['Use this guide before generating Arabic-ready components, templates, dashboards, forms, and navigation.', 'Use supplied Arabic placeholders only for layout tests.', 'Validate Arabic alongside LTR, not as a late translation pass.'],
    rules: ['Use logical CSS properties and start/end APIs.', 'Arabic display tracks Latin display scale at about 95% and never uses Latin uppercase styling.', 'Directional arrows, chevrons, carousels, progress, and sidebars mirror intentionally.'],
    checklist: ['dir="rtl" and lang="ar" tested.', 'Mixed Arabic/English labels and Arabic numerals tested.', 'No invented production Arabic copy.', 'Focus, hover, selected, disabled, expanded, and empty states tested.'],
  },
  'styling-components': {
    title: 'Styling Components',
    intro: 'How to style Utopia components without breaking semantic token ownership or shadcn-based accessibility.',
    usage: ['Start with component props and semantic variants.', 'Use className for layout-level composition at the app layer.', 'Add CSS using semantic tokens, not raw primitives.'],
    rules: ['Reusable components consume roles such as --primary, --background, --radius-control, --radius-surface.', 'Do not copy raw shadcn colors or hardcoded Utopia brand values.', 'Keep focus-visible, disabled, loading, selected, invalid, and RTL states intact.'],
    checklist: ['Class overrides use semantic tokens.', 'No physical left/right spacing unless intentionally documented.', 'Component remains accessible after styling.'],
  },
  'styling-library-interop': {
    title: 'Styling Library Interop',
    intro: 'How Ceramic works with Tailwind, plain CSS, CSS modules, CSS-in-JS, and app-specific styling.',
    usage: ['Use Ceramic CSS variables as the contract layer.', 'Bridge other styling tools to semantic tokens.', 'Keep the design-system package independent from app-only styling preferences.'],
    rules: ['Interop may adapt syntax, but not token meaning.', 'Do not let Tailwind/shadcn visual defaults override Ceramic semantics.', 'Direction-aware layout rules still apply in every styling approach.'],
    checklist: ['Tokens are referenced through CSS custom properties.', 'Generated styles preserve logical properties.', 'App-local styles do not become reusable component source of truth.'],
  },
  'migration-guide': {
    title: 'Migration Guide',
    intro: 'A safe path for moving from app-local UI or raw shadcn usage into Ceramic design-system exports.',
    usage: ['Use this guide when promoting a component, token, or template into packages/design-system.', 'Move contracts first, then implementation, then examples.', 'Keep homepage/page refactors separate from design-system extraction.'],
    rules: ['Do not migrate visual debt into reusable components.', 'Do not replace production rendering as part of DS migration unless explicitly scoped.', 'Preserve user work and dirty worktree changes.'],
    checklist: ['Create or update manifest entry.', 'Use Utopia package export.', 'Document required tokens and Arabic-friendly behavior.', 'Run lint, build, doctor, and component audit.'],
  },
} as const

function slugFromPath(path = '/docs') {
  return path.replace('/docs/foundations/', '') as keyof typeof foundationPages
}

function guideSlugFromPath(path = '/docs') {
  return path.replace('/docs/guide/', '') as keyof typeof guidePages
}

function tokensFor(groups: TokenRow['group'][]) {
  return tokenRows.filter((row) => groups.includes(row.group))
}

export function DocsPage({ path = '/docs' }: DocsPageProps) {
  const dextrumTypographySegment = dextrumTypographySegmentFromPath(path)

  if (dextrumTypographySegment) {
    return <DextrumTypographySubpage segment={dextrumTypographySegment} />
  }

  if (path.startsWith('/docs/guide/')) {
    const slug = guideSlugFromPath(path)
    const page = guidePages[slug] ?? guidePages['quick-start-with-ai']
    return <GuidePage page={page} slug={slug in guidePages ? slug : 'quick-start-with-ai'} />
  }

  if (path.startsWith('/docs/foundations/')) {
    const slug = slugFromPath(path)
    const page = foundationPages[slug] ?? foundationPages['all-tokens']
    return <FoundationsPage page={page} slug={slug in foundationPages ? slug : 'all-tokens'} />
  }

  if (path.startsWith('/docs/libraries/')) {
    return <LibrariesPage />
  }

  return <GettingStartedPage />
}

function GuidePage({ page, slug }: { page: typeof guidePages[keyof typeof guidePages]; slug: keyof typeof guidePages }) {
  const { locale } = useI18n()
  const isMigration = slug === 'migration-guide'

  return (
    <div className="page guide-page">
      <section className="page-hero compact">
        <p className="eyebrow">{t(locale, 'guide')}</p>
        <h1>{docsLabel(locale, page.title)}</h1>
        <p>{page.intro}</p>
      </section>

      <article className="docs-article">
        <FoundationSection id="overview" title="Overview">
          <div className="foundation-card-grid">
            <article className="foundation-card">
              <strong>Source of truth</strong>
              <p>Guide pages describe operating rules. Manifests and package exports remain the machine-readable implementation contract.</p>
            </article>
            <article className="foundation-card">
              <strong>Human + AI</strong>
              <p>Each guide is written as usage, rules, and checklist so a human can scan it and an AI can act on it.</p>
            </article>
            <article className="foundation-card">
              <strong>Arabic-ready</strong>
              <p>Guide decisions must preserve RTL, Arabic typography, logical layout, and no invented Arabic production copy.</p>
            </article>
          </div>
        </FoundationSection>

        <FoundationSection id={isMigration ? 'migration-order' : 'usage'} title={isMigration ? 'Migration Order' : 'Usage'}>
          <GuidanceTable rows={page.usage.map((item, index) => [`${index + 1}`, item])} />
        </FoundationSection>

        <FoundationSection id={isMigration ? 'safe-boundaries' : 'rules'} title={isMigration ? 'Safe Boundaries' : 'Rules'}>
          <GuidanceTable rows={page.rules.map((item, index) => [`Rule ${index + 1}`, item])} />
        </FoundationSection>

        {slug === 'arabic-friendly' ? (
          <FoundationSection id="rtl-preview" title="RTL Preview">
            <div className="arabic-mockups compact">
              <article dir="rtl" lang="ar">
                <strong>RTL test placeholder</strong>
                <h3>نص اختبار</h3>
                <p>Mixed script: Ceramic DS v0.1 supports inline-start, inline-end, badges, focus, and truncation.</p>
                <div className="rtl-control-row">
                  <span>بحث</span>
                  <span className="mini-badge">12</span>
                </div>
              </article>
              <article dir="ltr" lang="en">
                <strong>LTR reference</strong>
                <h3>Test text</h3>
                <p>The same component contract must preserve capability in both directions.</p>
                <div className="rtl-control-row">
                  <span>Search</span>
                  <span className="mini-badge">12</span>
                </div>
              </article>
            </div>
          </FoundationSection>
        ) : null}

        <FoundationSection id="ai-checklist" title="AI Checklist">
          <GuidanceTable rows={page.checklist.map((item, index) => [`Check ${index + 1}`, item])} />
        </FoundationSection>
      </article>
    </div>
  )
}

function GettingStartedPage() {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'

  return (
    <div className="page">
      <section className="page-hero compact">
        <h1>{t(locale, 'gettingStarted')}</h1>
        <p>{isArabic ? 'أضف نظام التصميم إلى مشروعك وابدأ البناء بتوكنات دلالية ومكونات قابلة للقراءة من البشر والذكاء الاصطناعي.' : 'Add the design system to your project and start building.'}</p>
      </section>

      <article className="docs-article">
        <section id="quick-start-ai">
          <h2>{isArabic ? 'بدء سريع مع الذكاء الاصطناعي' : 'Quick Start with AI'}</h2>
          <p>{isArabic ? 'الصق هذا في أداة البرمجة بالذكاء الاصطناعي واتركها تضبط المشروع وفق قواعد Ceramic.' : 'Paste this into your AI coding tool and let it handle the setup.'}</p>
          <div className="code-block">
            <span>text</span>
            <pre>{`Install @utopia-studio-design/design-system and @utopia-studio-design/design-system-cli in this project. Run \`npx utopia-ds init\` to set up agent docs. Read the generated files to learn the conventions.`}</pre>
          </div>
        </section>

        <section id="install">
          <h2>{isArabic ? 'التثبيت' : 'Install'}</h2>
          <p>{isArabic ? 'أضف الحزمة الأساسية والثيم وواجهة CLI إلى مشروعك الحالي.' : 'Add the core package, a theme, and the CLI to your existing project.'}</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npm install @utopia-studio-design/design-system @utopia-studio-design/design-system-cli`}</pre>
          </div>
          <p>Then run the init wizard to set up AI agent docs, pick a starter template, and learn about theming.</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npx utopia-ds init`}</pre>
          </div>
        </section>

        <section id="add-theme-css">
          <h2>Add the theme CSS</h2>
          <p>Import the core stylesheet and a theme in your global CSS file. Themes provide all design tokens as CSS custom properties.</p>
          <div className="code-block">
            <span>css</span>
            <pre>{`@import '@utopia-studio-design/design-system/core.css';
@import '@utopia-studio-design/design-system/themes/utopia-default.css';`}</pre>
          </div>
        </section>

        <section id="add-first-component">
          <h2>Add your first component</h2>
          <p>Components are imported from per-component subpath entrypoints. This keeps intent clear for humans and AI agents.</p>
          <div className="code-block">
            <span>tsx</span>
            <pre>{`import { Button } from '@utopia-studio-design/design-system/Button';

export default function Page() {
  return <Button>Build with Utopia</Button>;
}`}</pre>
          </div>
        </section>

        <section id="customize">
          <h2>Customize with className</h2>
          <p>Utopia components support semantic tokens and standard React styling surfaces. Start with className overrides, then add project-specific CSS only at the app layer.</p>
          <div className="code-block">
            <span>tsx</span>
            <pre>{`import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button className="justify-self-end">Save</Button>;
}`}</pre>
          </div>
        </section>

        <section id="example-apps">
          <h2>Example Apps</h2>
          <p>Example apps will become complete setups with routing, theming, Arabic-friendly checks, and components wired together.</p>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Example</th>
                <th>Stack</th>
                <th>Path</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Next.js</td>
                <td>Next.js + theme CSS</td>
                <td>apps/example-nextjs</td>
              </tr>
              <tr>
                <td>Vite</td>
                <td>Vite + theme CSS</td>
                <td>apps/example-vite</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="explore-cli">
          <h2>Explore the CLI</h2>
          <p>The CLI is the AI-readable reference for components, tokens, templates, themes, and docs.</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npm run ds -- component --list --dense
npm run ds -- component Button --dense
npm run ds -- theme utopia-default --dense
npm run ds -- docs foundations --dense
npm run ds -- docs arabic-friendly --dense`}</pre>
          </div>
        </section>

        <section id="arabic-friendly">
          <h2>Arabic Friendly</h2>
          <p>Arabic-friendly is a first-class design-system requirement, not a translation pass. AI agents must read the Arabic contract before generating navigation, forms, tables, empty states, icons, motion, or typography for Arabic/RTL contexts.</p>
          <div className="foundation-card-grid">
            <article className="foundation-card">
              <strong>Typography</strong>
              <p>Use IBM Plex Sans Arabic for Utopia Default, set Arabic display size from the Latin display scale at about 95%, keep Arabic line-height readable, and never apply Latin uppercase styling.</p>
            </article>
            <article className="foundation-card">
              <strong>Layout</strong>
              <p>Use logical CSS and start/end naming. Validate <code>dir="rtl"</code>, mixed-script labels, Arabic numerals, badges, truncation, focus, hover, and selected states.</p>
            </article>
            <article className="foundation-card">
              <strong>AI entrypoint</strong>
              <p>Use <code>npm run ds -- docs arabic-friendly --dense</code> and the full <a href="#/arabic-friendly">Arabic Friendly page</a> before producing Arabic-ready UI.</p>
            </article>
          </div>
        </section>
      </article>
    </div>
  )
}

function FoundationsPage({ page, slug }: { page: typeof foundationPages[keyof typeof foundationPages]; slug: keyof typeof foundationPages }) {
  const { locale } = useI18n()
  const rows = tokensFor(page.groups)

  return (
    <div className="page foundations-page">
      <section className="page-hero compact">
        <p className="eyebrow">{t(locale, 'foundations')}</p>
        <h1>{docsLabel(locale, page.title)}</h1>
        <p>{page.intro}</p>
      </section>

      <article className="docs-article">
        <FoundationSection id="overview" title="Overview">
          <FoundationOverview slug={slug} />
        </FoundationSection>

        <FoundationSection id="tokens" title={slug === 'all-tokens' ? 'Token Contract' : `${page.title} Tokens`}>
          {slug === 'all-tokens' ? <GroupedTokenTables /> : <TokenTable rows={rows} />}
        </FoundationSection>

        {slug === 'all-tokens' ? (
          <FoundationSection id="required-roles" title="Required Semantic Roles">
            <p>Every theme can add primitives and extension tokens, but these semantic roles are stable. Components may depend on these names without knowing the active theme.</p>
            <div className="token-chip-grid">
              {themes.requiredSemanticRoles.map((token) => <span key={token}>{token}</span>)}
            </div>
          </FoundationSection>
        ) : null}

        {slug === 'color' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="roles" title="Color Roles">
              <ColorRoles />
            </FoundationSection>
            <FoundationSection id="swatches" title="Theme Swatches">
              <ThemeSwatches />
            </FoundationSection>
            <FoundationSection id="states" title="State Matrix">
              <StateMatrix />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'typography' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="type-scale" title="Type Scale">
              <TypeScale />
            </FoundationSection>
            <FoundationSection id="dextrum-typography" title="Dextrum Typography">
              <DextrumTypographyLinks />
            </FoundationSection>
            <FoundationSection id="arabic-display" title="Arabic Display Is Not Uppercase">
              <ArabicDisplayPreview />
            </FoundationSection>
            <FoundationSection id="mixed-script" title="Mixed-Script Rhythm">
              <MixedScriptPreview />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'spacing' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="scale" title="Spacing Scale">
              <SpacingScale />
            </FoundationSection>
            <FoundationSection id="logical-layout" title="RTL-Aware Layout">
              <LogicalLayoutPreview />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'shape' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="radius-preview" title="Radius Roles">
              <ShapePreview />
            </FoundationSection>
            <FoundationSection id="theme-variance" title="Theme Variance">
              <ThemeVariancePreview />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'motion' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="motion-scale" title="Motion Scale">
              <MotionScale />
            </FoundationSection>
            <FoundationSection id="mirroring-rules" title="Directional Motion Rules">
              <DirectionalRules />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'elevation' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="surface-preview" title="Surface And Elevation">
              <ElevationPreview />
            </FoundationSection>
            <FoundationSection id="overlay-rules" title="Overlay Rules">
              <OverlayRules />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'icons' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="shadcn-icons" title="shadcn/ui Default Icons">
              <ShadcnIconPreview />
            </FoundationSection>
            <FoundationSection id="icon-policy" title="Icon Policy">
              <IconPolicy />
            </FoundationSection>
            <FoundationSection id="icon-mirroring" title="Mirroring Rules">
              <IconMirroringPreview />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'illustrations' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="media-rules" title="Media Rules">
              <IllustrationRules />
            </FoundationSection>
            <FoundationSection id="empty-state" title="Empty State Preview">
              <IllustrationPreview />
            </FoundationSection>
          </>
        ) : null}

        <FoundationSection id="usage" title="Usage">
          <FoundationUsage slug={slug} />
        </FoundationSection>

        <FoundationSection id="best-practices" title="Best Practices">
          <FoundationBestPractices slug={slug} />
        </FoundationSection>

        <FoundationSection id="ai-usage" title="AI Usage Rules">
          <AiUsageRules slug={slug} />
        </FoundationSection>

        {slug === 'all-tokens' ? (
          <FoundationSection id="arabic-preview" title="Arabic / RTL Product Mockups">
            <ArabicMockups />
          </FoundationSection>
        ) : (
          <FoundationSection id="arabic-check" title="Arabic / RTL Check">
            <ArabicFoundationCheck slug={slug} />
          </FoundationSection>
        )}
      </article>
    </div>
  )
}

function FoundationUsage({ slug }: { slug: keyof typeof foundationPages }) {
  const rows: Record<keyof typeof foundationPages, string[][]> = {
    'all-tokens': [
      ['Start here', 'Use All Tokens before generating a component, template, or theme.'],
      ['Then narrow', 'Move to Color, Typography, Spacing, Shape, Motion, Elevation, Icons, or Illustrations for implementation guidance.'],
      ['AI workflow', 'Use the token group, role, and AI rule columns as the machine-readable decision layer.'],
    ],
    color: [
      ['Surfaces', 'Use color roles to separate page canvas, local panels, elevated layers, and framed cards.'],
      ['Actions', 'Use primary for the main action, secondary for supporting actions, and destructive only for dangerous actions.'],
      ['Focus', 'Use --ring for keyboard focus in every theme.'],
    ],
    typography: [
      ['Latin UI', 'Use the default font stack and display rhythm for English and mixed Latin interfaces.'],
      ['Arabic UI', 'Use Arabic body/display tokens with lang="ar" and dir="rtl" when Arabic text is present.'],
      ['Code/docs', 'Use mono style for imports, tokens, CLI output, and copy-paste examples.'],
    ],
    spacing: [
      ['Component gaps', 'Use spacing tokens through gap, padding-inline, and margin-block.'],
      ['Navigation depth', 'Use inline-start rails and depth spacing instead of physical left padding.'],
      ['RTL products', 'Validate navigation, drawer, tabs, pagination, carousel, and progress in both directions.'],
    ],
    shape: [
      ['Controls', 'Use control size, border, and radius roles for buttons, inputs, selects, and menu items.'],
      ['Surfaces', 'Use surface radius and border roles for cards, popovers, dialogs, and panels.'],
      ['Theme variance', 'Do not assume square or rounded geometry in reusable components.'],
    ],
    motion: [
      ['Micro state', 'Use fast motion for hover, focus, active, selected, and pressed states.'],
      ['Disclosure', 'Use medium motion for accordion, side navigation, drawer, and collapsible content.'],
      ['Direction', 'Use inline-aware motion for navigation and carousel patterns.'],
    ],
    elevation: [
      ['Base hierarchy', 'Use background, border, and surface roles before adding shadows.'],
      ['Floating UI', 'Use elevated surfaces for popovers, dropdowns, dialogs, and hover cards.'],
      ['Accessibility', 'Elevation never replaces focus management, escape behavior, or accessible naming.'],
    ],
    icons: [
      ['Slots', 'Use icon slots only when the icon clarifies a label or creates an icon-only control.'],
      ['Icon-only', 'Use IconButton-style behavior with labels, focus, hover, active, disabled, and tooltip guidance.'],
      ['RTL', 'Mirror directional icons and keep direction-neutral icons stable.'],
    ],
    illustrations: [
      ['Empty states', 'Use text-first empty states before adding illustration.'],
      ['Product media', 'Use real product/place/object imagery when the user needs to inspect the subject.'],
      ['Theme media', 'Treat illustration style as theme/template owned, not a core component requirement.'],
    ],
  }

  return <GuidanceTable rows={rows[slug]} />
}

function FoundationBestPractices({ slug }: { slug: keyof typeof foundationPages }) {
  const rows: Record<keyof typeof foundationPages, string[][]> = {
    'all-tokens': [
      ['Do', 'Keep primitive tokens inside theme manifests and semantic roles inside components.'],
      ["Don't", 'Generate raw brand colors, shadcn defaults, or physical left/right spacing into reusable code.'],
      ['Check', 'Run docs, CLI, component audit, and browser verification after changing foundation contracts.'],
    ],
    color: [
      ['Do', 'Use role names that describe UI purpose and state.'],
      ["Don't", 'Use Brick Red, Special Black, or raw hex values directly inside reusable components.'],
      ['Check', 'Verify hover, active, focus-visible, disabled, selected, and destructive states.'],
    ],
    typography: [
      ['Do', 'Treat Arabic as a first-class type system with its own display/body tokens.'],
      ["Don't", 'Apply uppercase, negative tracking, or Latin display casing to Arabic.'],
      ['Check', 'Test mixed Arabic/English labels, numerals, truncation, and line-height.'],
    ],
    spacing: [
      ['Do', 'Use logical properties and start/end naming.'],
      ["Don't", 'Hardcode padding-left, margin-right, or left/right-only API names.'],
      ['Check', 'Use dir="rtl" smoke tests for shell, side navigation, forms, tables, and overlays.'],
    ],
    shape: [
      ['Do', 'Use --radius-control for controls and --radius-surface for framed surfaces.'],
      ["Don't", 'Bake Utopia square geometry into core component code.'],
      ['Check', 'Preview compact/default/large controls and future rounded-theme variance.'],
    ],
    motion: [
      ['Do', 'Use semantic durations and easing roles for consistent interaction motion.'],
      ["Don't", 'Animate layout with physical direction assumptions or ignore reduced-motion users.'],
      ['Check', 'Open and close disclosures; both directions should animate without scroll jumps.'],
    ],
    elevation: [
      ['Do', 'Use semantic elevated surfaces for overlays and floating content.'],
      ["Don't", 'Use decorative shadows as the only sign of hierarchy or state.'],
      ['Check', 'Verify border-led Utopia Default and future shadow-heavy themes can both work.'],
    ],
    icons: [
      ['Do', 'Keep icon APIs direction-neutral: leading, trailing, start, end, iconOnly.'],
      ["Don't", 'Assume every theme follows Utopia Default minimal icon philosophy.'],
      ['Check', 'Mirror arrows/chevrons in RTL and keep neutral icons unchanged.'],
    ],
    illustrations: [
      ['Do', 'Use illustrations to clarify product state only after text and controls work.'],
      ["Don't", 'Fill pages with generic decorative media, gradients, or blobs.'],
      ['Check', 'Validate Arabic empty state expansion and no invented production Arabic copy.'],
    ],
  }

  return <GuidanceTable rows={rows[slug]} />
}

function FoundationOverview({ slug }: { slug: keyof typeof foundationPages }) {
  const descriptions: Record<keyof typeof foundationPages, string[]> = {
    'all-tokens': [
      'This page is the canonical contract across every foundation.',
      'Use it to verify that a theme provides the semantic roles a component expects.',
      'AI agents should start here before choosing component APIs or generating CSS.',
    ],
    color: [
      'Color names describe purpose, not hue.',
      'Utopia Default may map Brick Red to primary, but components only see --primary.',
      'Status, focus, disabled, and destructive states must remain readable in LTR and RTL.',
    ],
    typography: [
      'Latin and Arabic typography are separate first-class systems.',
      'Arabic uses IBM Plex Sans Arabic in Utopia Default and keeps text-transform disabled.',
      'Mixed-script labels must preserve rhythm, truncation, and line-height.',
    ],
    spacing: [
      'Spacing tokens are scale decisions; layout APIs are direction decisions.',
      'Use logical properties so start/end works in Arabic and English.',
      'Depth, rails, badges, and side navigation must not rely on left/right CSS.',
    ],
    shape: [
      'Shape roles separate control geometry from surface geometry.',
      'Utopia Default is square, but the design system must allow rounded future themes.',
      'Reusable components consume --radius-control and --radius-surface.',
    ],
    motion: [
      'Motion explains state changes without hiding structure.',
      'Collapse, disclosure, drawer, carousel, and progress motion must understand direction.',
      'Reduced-motion support is part of the contract, not polish.',
    ],
    elevation: [
      'Elevation is a semantic hierarchy, not a mandatory drop-shadow style.',
      'Utopia Default prefers border-led surfaces; other themes may use shadows.',
      'Floating surfaces must keep focus, escape, and outside-click behavior clear.',
    ],
    icons: [
      'Core owns icon slots and accessibility; themes own icon philosophy.',
      'Icon-only actions require labels and focus-visible state.',
      'Directional icons mirror; neutral icons stay stable unless documented.',
    ],
    illustrations: [
      'Illustrations and media are optional theme/template content.',
      'They must not be required for a component to work.',
      'Arabic empty states validate layout, but examples must not invent production copy.',
    ],
  }

  return (
    <div className="foundation-card-grid">
      {descriptions[slug].map((item) => (
        <article key={item} className="foundation-card">
          <p>{item}</p>
        </article>
      ))}
    </div>
  )
}

function GroupedTokenTables() {
  return (
    <div className="foundation-stack">
      {(Object.keys(foundationGroupLabels) as TokenRow['group'][]).map((group) => (
        <section className="foundation-token-group" key={group}>
          <h3>{foundationGroupLabels[group]}</h3>
          <TokenTable rows={tokensFor([group])} />
        </section>
      ))}
    </div>
  )
}

function ColorRoles() {
  const roles = [
    ['Background', '--background', 'Root application/page canvas'],
    ['Surface', '--surface / --card / --surface-elevated', 'Local panels, cards, popovers, dialogs'],
    ['Action', '--primary / --secondary / --destructive', 'Buttons, active controls, danger actions'],
    ['Text', '--foreground / --muted-foreground', 'Readable content hierarchy'],
    ['System', '--border / --ring', 'Separation, focus, and keyboard visibility'],
  ]

  return <RoleMatrix rows={roles} />
}

function ThemeSwatches() {
  return (
    <>
      <div className="foundation-swatches">
        {Object.entries(utopiaDefaultTheme.brandPrimitives.colors).map(([name, value]) => (
          <div key={name}>
            <span style={{ background: String(value) }} />
            <strong>{name}</strong>
            <code>{String(value)}</code>
          </div>
        ))}
      </div>
      <p>These are Utopia Default brand primitives. Components consume semantic roles such as <code>--primary</code>, never raw primitive names.</p>
    </>
  )
}

function StateMatrix() {
  const states = ['default', 'hover', 'focus-visible', 'active', 'disabled', 'selected', 'destructive']

  return (
    <div className="state-matrix" aria-label="Color state matrix">
      {states.map((state) => <span key={state} data-state={state}>{state}</span>)}
    </div>
  )
}

function TypeScale() {
  return (
    <div className="type-scale">
      <article>
        <span>Display</span>
        <strong>Build clear systems</strong>
        <p>Latin display may use uppercase only when the active theme owns that rule.</p>
      </article>
      <article>
        <span>Heading</span>
        <strong>Component documentation</strong>
        <p>Headings stay readable inside dense docs and operational UIs.</p>
      </article>
      <article>
        <span>Body</span>
        <strong>Semantic contracts for humans and AI</strong>
        <p>Body copy carries usage boundaries, imports, fallback behavior, and accessibility rules.</p>
      </article>
      <article>
        <span>Code</span>
        <code>import {'{ Button }'} from '@utopia-studio-design/design-system/Button'</code>
        <p>Code and token names use mono styling for copy-paste reliability.</p>
      </article>
    </div>
  )
}

function DextrumTypographyLinks() {
  const pairings = [
    {
      href: '#/docs/foundations/typography/dextrum/marketing-sales',
      label: 'Marketing & Sales',
      title: 'Clash Grotesk + Satoshi',
      description: dextrumTheme.brandPrimitives.typography.marketingSales.use,
    },
    {
      href: '#/docs/foundations/typography/dextrum/app-website',
      label: 'App & Website',
      title: 'Manrope + Satoshi',
      description: dextrumTheme.brandPrimitives.typography.appWebsite.use,
    },
  ]

  return (
    <div className="foundation-card-grid">
      {pairings.map((pairing) => (
        <a className="foundation-card link-card" href={pairing.href} key={pairing.href}>
          <span className="kicker">{pairing.label}</span>
          <strong>{pairing.title}</strong>
          <p>{pairing.description}</p>
        </a>
      ))}
    </div>
  )
}

function ArabicDisplayPreview() {
  return (
    <div className="foundation-type-comparison">
      <div>
        <span>Latin display</span>
        <h3>BUILD CLEAR SYSTEMS</h3>
        <p>All-caps can be a Latin theme rule.</p>
      </div>
      <div dir="rtl" lang="ar">
        <span>Arabic display</span>
        <ArabicDisplay>نظام واضح</ArabicDisplay>
        <ArabicText>يعتمد العرض العربي على الحجم والوزن والإيقاع، وليس على مفهوم الأحرف الكبيرة.</ArabicText>
      </div>
    </div>
  )
}

function MixedScriptPreview() {
  return (
    <div className="mixed-script-grid">
      <div dir="ltr"><strong>Design / تصميم</strong><span>LTR shell with Arabic label segment</span></div>
      <div dir="rtl" lang="ar"><strong>Product / منتج</strong><span>RTL shell with English product term</span></div>
      <div dir="rtl" lang="ar"><strong>الإجمالي ١٢ / 24 total</strong><span>Arabic numerals and Latin numbers must not collide</span></div>
    </div>
  )
}

function SpacingScale() {
  const scale = tokenRows.filter((row) => row.group === 'spacing')

  return (
    <div className="spacing-scale">
      {scale.map((row, index) => (
        <div key={row.name}>
          <code>{row.name}</code>
          <span style={{ inlineSize: `${(index + 1) * 28}px` }} />
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  )
}

function LogicalLayoutPreview() {
  return (
    <div className="logical-layout-grid">
      <article dir="ltr">
        <strong>LTR</strong>
        <span>Logo</span>
        <span>Search</span>
        <span>Profile</span>
      </article>
      <article dir="rtl" lang="ar">
        <strong>RTL</strong>
        <span>الشعار</span>
        <span>البحث</span>
        <span>الملف</span>
      </article>
      <div className="rule-list">
        <span><code>padding-inline-start</code> instead of <code>padding-left</code></span>
        <span><code>margin-inline-end</code> instead of <code>margin-right</code></span>
        <span><code>border-inline-start</code> for nested nav depth and document rails</span>
        <span><code>inset-inline</code> for overlays, drawers, and floating controls</span>
      </div>
    </div>
  )
}

function ShapePreview() {
  return (
    <div className="foundation-preview-row">
      <span className="shape-sample control">Control</span>
      <span className="shape-sample surface">Surface</span>
      <span className="shape-sample round">Round role</span>
    </div>
  )
}

function ThemeVariancePreview() {
  return (
    <div className="theme-variance-grid">
      <article><strong>Utopia Default</strong><span className="theme-variance-square" /> <p>Square control and surface geometry.</p></article>
      <article><strong>Future rounded theme</strong><span className="theme-variance-rounded" /> <p>Can remap the same semantic roles without changing component code.</p></article>
    </div>
  )
}

function MotionScale() {
  return (
    <div className="motion-scale">
      {[
        ['Fast', '--duration-fast', 'Hover, focus, pressed state'],
        ['Medium', '--duration-medium', 'Accordion, side nav collapse, disclosure'],
        ['Slow', '--duration-slow', 'Large modal or shell transition'],
      ].map(([label, token, use]) => (
        <article key={token}>
          <span />
          <strong>{label}</strong>
          <code>{token}</code>
          <p>{use}</p>
        </article>
      ))}
    </div>
  )
}

function DirectionalRules() {
  return (
    <table className="docs-table">
      <thead>
        <tr>
          <th>Pattern</th>
          <th>RTL Rule</th>
          <th>AI rule</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['Arrows / chevrons', 'Mirror when they mean previous/next, open/closed, or inline movement.', 'Prefer direction-neutral panel icons unless the meaning is directional.'],
          ['Progress / stepper', 'Reverse visual flow only when product sequence follows reading direction.', 'Do not reverse data meaning without product rules.'],
          ['Sidebar / drawer', 'Use inline-start/inline-end placement and preserve scroll state.', 'A page link must not also be a disclosure trigger.'],
          ['Carousel', 'Respect document direction and keyboard behavior.', 'Do not hardcode left/right buttons.'],
          ['Navigation', 'Mirror layout affordances while preserving semantic order.', 'Use start/end labels and avoid invented Arabic copy.'],
        ].map(([pattern, rule, aiRule]) => (
          <tr key={pattern}>
            <td>{pattern}</td>
            <td>{rule}</td>
            <td>{aiRule}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ElevationPreview() {
  return (
    <div className="foundation-surface-grid">
      <article><strong>Base surface</strong><p>Use borders and background shifts before decorative shadows.</p></article>
      <article><strong>Raised surface</strong><p>Semantic raised surface. Utopia Default may keep this border-led.</p></article>
      <article><strong>Popover</strong><p>Floating content with escape/outside-click behavior and focus management.</p></article>
      <article><strong>Dialog</strong><p>Modal surface with semantic backdrop, not a hardcoded shadow recipe.</p></article>
    </div>
  )
}

function OverlayRules() {
  return (
    <div className="rule-list">
      <span>Use <code>--surface-elevated</code> with <code>--shadow-popover</code> for floating UI.</span>
      <span>Use borders as elevation in Utopia Default before adding decorative shadows.</span>
      <span>Never let elevation replace focus management, escape behavior, or accessible labels.</span>
    </div>
  )
}

function IconPolicy() {
  return (
    <div className="foundation-card-grid">
      <article className="foundation-card"><strong>Core owns slots</strong><p>Components expose leading/trailing/icon-only surfaces and accessible labels.</p></article>
      <article className="foundation-card"><strong>shadcn baseline</strong><p>Use lucide-react as the default shadcn/ui icon source. Themes may constrain when icons appear, but the system should support the baseline.</p></article>
      <article className="foundation-card"><strong>IconButton is required</strong><p>Icon-only actions are real controls with label, tooltip guidance, focus, hover, and pressed state.</p></article>
    </div>
  )
}

function ShadcnIconPreview() {
  const icons = [
    { label: 'Search', icon: Search, rule: 'Search fields, command palettes, filtering.' },
    { label: 'Settings', icon: Settings, rule: 'Direction-neutral utility icon.' },
    { label: 'Home', icon: Home, rule: 'Direction-neutral navigation icon.' },
    { label: 'Bell', icon: Bell, rule: 'Notifications and status surfaces.' },
    { label: 'Download', icon: Download, rule: 'Direction-neutral action icon.' },
    { label: 'Panel', icon: PanelLeft, rule: 'Direction-neutral shell/sidebar control.' },
    { label: 'Chevron', icon: ChevronDown, rule: 'Disclosure icon; rotate/mirror intentionally.' },
    { label: 'Arrow Left', icon: ArrowLeft, rule: 'Directional icon; mirror or swap in RTL.' },
    { label: 'Arrow Right', icon: ArrowRight, rule: 'Directional icon; mirror or swap in RTL.' },
  ]

  return (
    <>
      <div className="shadcn-icon-grid">
        {icons.map(({ icon: Icon, label, rule }) => (
          <article key={label}>
            <Icon aria-hidden="true" />
            <strong>{label}</strong>
            <p>{rule}</p>
          </article>
        ))}
      </div>
      <p>These previews use <code>lucide-react</code>, the icon library commonly paired with shadcn/ui. Components should expose semantic icon slots and labels; themes decide how visible or restrained icon usage should be.</p>
    </>
  )
}

function IconMirroringPreview() {
  return (
    <div className="icon-mirroring-grid">
      <article><strong>Directional</strong><span aria-hidden="true">Back <b>←</b> / Next <b>→</b></span><p>Mirror for previous/next and open/close meanings.</p></article>
      <article><strong>Neutral</strong><span aria-hidden="true">Home · Download · Settings</span><p>Do not mirror unless a theme or product rule says so.</p></article>
      <article dir="rtl" lang="ar"><strong>RTL</strong><span aria-hidden="true">التالي <b>←</b> / السابق <b>→</b></span><p>Direction follows reading flow, not physical left/right naming.</p></article>
    </div>
  )
}

function IllustrationRules() {
  return (
    <div className="rule-list">
      <span>Use real product/place/object imagery when inspection matters.</span>
      <span>Do not use generic gradients or decorative blobs as a substitute for system content.</span>
      <span>Empty states must work with text-only content before illustration is added.</span>
      <span>Arabic previews validate layout and text expansion; they are not production copy.</span>
    </div>
  )
}

function IllustrationPreview() {
  return (
    <div className="illustration-preview-grid">
      <article className="foundation-empty-state">
        <strong>No illustration required</strong>
        <p>A component must remain understandable without decorative media.</p>
      </article>
      <article className="foundation-empty-state media" dir="rtl" lang="ar">
        <span aria-hidden="true" />
        <strong>لا توجد بيانات بعد</strong>
        <p>نص تجريبي للتحقق من الاتجاه والتباعد فقط.</p>
      </article>
    </div>
  )
}

function AiUsageRules({ slug }: { slug: keyof typeof foundationPages }) {
  return (
    <>
      <div className="code-block">
        <span>agent</span>
        <pre>{`Before generating ${foundationPages[slug].title} UI:
1. Read packages/design-system/src/manifests/themes.json.
2. Read packages/design-system/src/manifests/theme-utopia-default.json.
3. Read docs/design-system/foundations.md.
4. Use semantic tokens only.
5. Test dir="rtl", lang="ar", mixed-script labels, logical CSS, and no invented production Arabic copy.`}</pre>
      </div>
      <div className="foundation-card-grid">
        <article className="foundation-card"><strong>Import rule</strong><p>Use Utopia design-system exports before raw shadcn primitives.</p></article>
        <article className="foundation-card"><strong>Token rule</strong><p>Reusable code consumes semantic roles; theme files map primitives.</p></article>
        <article className="foundation-card"><strong>Arabic rule</strong><p>Arabic-friendly means RTL-first layout, typography, mirroring, localization tolerance, and mixed-script checks.</p></article>
      </div>
    </>
  )
}

function ArabicFoundationCheck({ slug }: { slug: keyof typeof foundationPages }) {
  const rows: Record<keyof typeof foundationPages, string[][]> = {
    'all-tokens': [
      ['Mockups', 'Use the full Arabic/RTL product mockups below as the global release-gate preview.'],
      ['Tokens', 'Confirm all required Arabic and logical layout tokens exist before component work.'],
    ],
    color: [
      ['State colors', 'Check hover, focus-visible, selected, disabled, and destructive states in dir="rtl".'],
      ['Contrast', 'Do not rely on hue alone when Arabic labels, numerals, and badges expand.'],
    ],
    typography: [
      ['Display scale', 'Arabic display tracks the Latin display scale at about 95%, with readable Arabic line-height.'],
      ['Casing', 'Never apply Latin uppercase styling or letter spacing to Arabic text.'],
    ],
    spacing: [
      ['Logical spacing', 'Use padding-inline, margin-inline, border-inline, and start/end naming.'],
      ['Navigation depth', 'Nested rails and badges must align by inline-start/inline-end, not left/right.'],
    ],
    shape: [
      ['Control geometry', 'Radius, border, and size roles must apply equally in LTR and RTL.'],
      ['Hit targets', 'Do not shrink Arabic controls because labels are longer.'],
    ],
    motion: [
      ['Direction', 'Directional motion follows inline start/end rather than physical left/right.'],
      ['Disclosure', 'Open and close animations must work in both directions without scroll jumps.'],
    ],
    elevation: [
      ['Overlays', 'Popover/dialog placement should respect logical side and focus order.'],
      ['Hierarchy', 'Elevation must not hide Arabic text overflow, badges, or validation messages.'],
    ],
    icons: [
      ['Mirroring', 'Directional lucide icons such as arrows mirror or swap in RTL.'],
      ['Neutral icons', 'Search, home, settings, download, and panel icons stay direction-neutral.'],
    ],
    illustrations: [
      ['Empty states', 'Arabic empty states must work text-first without decorative media.'],
      ['Copy', 'Use placeholder Arabic only for layout checks; do not invent production copy.'],
    ],
  }

  return <GuidanceTable rows={rows[slug]} />
}

function ArabicMockups() {
  return (
    <div className="arabic-mockup-grid" dir="rtl" lang="ar">
      <article className="arabic-mockup hero">
        <ArabicDisplay>منصة تشغيل واضحة</ArabicDisplay>
        <ArabicText>نص تجريبي للتحقق من العناوين الكبيرة والإيقاع العربي واتجاه القراءة.</ArabicText>
      </article>
      <article className="arabic-mockup form">
        <strong>نموذج قصير</strong>
        <label>الاسم الكامل<input placeholder="قيمة تجريبية" /></label>
        <label>رقم الهاتف<input placeholder="+974 0000 0000" /></label>
        <button type="button">متابعة</button>
      </article>
      <article className="arabic-mockup dashboard">
        <strong>لوحة بيانات</strong>
        <table>
          <thead><tr><th>الحالة</th><th>القيمة</th><th>الفريق</th></tr></thead>
          <tbody>
            <tr><td>نشط</td><td>١٢</td><td>Design / تصميم</td></tr>
            <tr><td>قيد المراجعة</td><td>٨</td><td>Product / منتج</td></tr>
          </tbody>
        </table>
      </article>
      <article className="arabic-mockup empty">
        <strong>لا توجد عناصر</strong>
        <p>نص تجريبي يضمن أن حالات الفراغ تعمل بدون اختراع نسخة إنتاجية.</p>
        <button type="button">إضافة عنصر</button>
      </article>
    </div>
  )
}

function RoleMatrix({ rows }: { rows: string[][] }) {
  return (
    <table className="docs-table">
      <thead>
        <tr>
          <th>Role</th>
          <th>Tokens</th>
          <th>Use</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([role, tokens, use]) => (
          <tr key={role}>
            <td>{role}</td>
            <td><code>{tokens}</code></td>
            <td>{use}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function GuidanceTable({ rows }: { rows: string[][] }) {
  return (
    <table className="docs-table guidance-table">
      <thead>
        <tr>
          <th>Rule</th>
          <th>Guidance</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([rule, guidance]) => (
          <tr key={rule}>
            <td><strong>{rule}</strong></td>
            <td>{guidance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function FoundationSection({ children, id, title }: { children: ReactNode; id: string; title: string }) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function TokenTable({ rows }: { rows: TokenRow[] }) {
  return (
    <table className="docs-table token-table">
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>Role</th>
          <th>AI rule</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td><code>{row.name}</code></td>
            <td>{row.value}</td>
            <td>{row.role}</td>
            <td>{row.aiRule}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function LibrariesPage() {
  const { locale } = useI18n()

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">{t(locale, 'libraries')}</p>
        <h1>{locale === 'ar' ? 'نقاط دخول الحزم' : 'Package entrypoints'}</h1>
        <p>{locale === 'ar' ? 'توثق المكتبات كنقاط دخول مقروءة للذكاء الاصطناعي. استخدم صادرات Utopia أولا، ثم افحص أساس shadcn عند الحاجة إلى تفاصيل التحويل.' : 'Libraries are documented as AI-readable entrypoints. Use Utopia exports first, then inspect shadcn foundations only when conversion detail is needed.'}</p>
      </section>
      <article className="docs-article">
        <section id="core">
          <h2>@utopia-studio-design/design-system</h2>
          <p>Reusable components, tokens, theme CSS, manifests, and shadcn-based wrappers.</p>
        </section>
        <section id="cli">
          <h2>@utopia-studio-design/design-system-cli</h2>
          <p>Discovery tool for humans and AI agents.</p>
          <div className="code-block"><span>bash</span><pre>{`npm run ds -- component --list --dense
npm run ds -- docs foundations --dense`}</pre></div>
        </section>
        <section id="shadcn">
          <h2>shadcn/ui foundation</h2>
          <p>Utopia uses shadcn/ui as architecture foundation: Radix behavior, Slot composition, CVA variants, accessible primitives, and registry-style documentation.</p>
        </section>
      </article>
    </div>
  )
}
