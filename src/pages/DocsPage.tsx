import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Bell, ChevronDown, Download, Home, PanelLeft, Search, Settings } from 'lucide-react'
import { dextrumTheme, themes, utopiaDefaultTheme } from '../data/design-system'
import { DextrumTypographySubpage, dextrumTypographySegmentFromPath } from './DextrumTypographySubpage'
import { ArabicDisplay, ArabicText } from '../../packages/design-system/src/Typography'
import { docsLabel, t, useI18n, type Locale } from '../i18n'

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

const foundationArabicPages: Record<keyof typeof foundationPages, { title: string; intro: string }> = {
  'all-tokens': {
    title: 'كل التوكنات',
    intro: 'يبدأ العقد الدلالي الكامل هنا. تستهلك المكونات الأدوار، وتربط الثيمات هذه الأدوار بالقيم البصرية، ويقرأ الوكيل هذا العقد قبل توليد الواجهة.',
  },
  color: {
    title: 'اللون',
    intro: 'تصف توكنات اللون وظيفة الواجهة لا اسم اللون. يربط The Utopia Studio Default هذه الأدوار بألوان العلامة، لكن المكونات العامة لا تستهلك القيم الخام.',
  },
  typography: {
    title: 'الطباعة',
    intro: 'تفصل الطباعة قواعد العرض والنص اللاتيني عن قواعد العرض والنص العربي. العربية ليست ترجمة لنمط uppercase اللاتيني.',
  },
  spacing: {
    title: 'المسافات',
    intro: 'المسافات منطقية لا مادية. تستخدم التخطيطات inline وblock وstart وend لكي تحصل منتجات RTL على القدرة نفسها.',
  },
  shape: {
    title: 'الشكل',
    intro: 'تفصل توكنات الشكل هندسة عناصر التحكم عن الأسطح والحدود والأبعاد. يربط Utopia Default الأدوار بهندسة مربعة، لكن الثيمات المستقبلية قد تختلف.',
  },
  motion: {
    title: 'الحركة',
    intro: 'توضح الحركة تغيّر الحالة. يجب أن تفهم الحركة الاتجاهية inline-start وinline-end وعكس RTL.',
  },
  elevation: {
    title: 'الارتفاع',
    intro: 'يعبّر الارتفاع عن تسلسل دلالي للأسطح والحدود والظلال الاختيارية. يفضّل Utopia Default العمق المعتمد على الحدود.',
  },
  icons: {
    title: 'الأيقونات',
    intro: 'يدعم الجوهر slots للأيقونات وإجراءات الأيقونة فقط، بينما يقرر manifest الثيم فلسفة الأيقونات. تتطلب الأيقونات الاتجاهية قواعد RTL صريحة.',
  },
  illustrations: {
    title: 'الرسوم والوسائط',
    intro: 'الرسوم وسائط اختيارية يملكها الثيم أو القالب. لا يجوز أن يعتمد عمل المكوّن عليها.',
  },
}

const foundationSectionTitles: Record<keyof typeof foundationPages, { en: [string, string]; ar: [string, string] }> = {
  'all-tokens': { en: ['Applying the token contract', 'Theme and agent release gate'], ar: ['تطبيق عقد التوكنات', 'بوابة إصدار الثيم والوكيل'] },
  color: { en: ['Assigning semantic color roles', 'Contrast and state release gate'], ar: ['تعيين أدوار اللون الدلالية', 'بوابة التباين وحالات الواجهة'] },
  typography: { en: ['Implementing script typography', 'Mixed-script release gate'], ar: ['تنفيذ طباعة كل خط', 'بوابة النص المختلط'] },
  spacing: { en: ['Implementing logical layout', 'Direction release gate'], ar: ['تنفيذ التخطيط المنطقي', 'بوابة الاتجاه'] },
  shape: { en: ['Mapping control and surface geometry', 'Theme-variance release gate'], ar: ['ربط هندسة التحكم والسطح', 'بوابة اختلاف الثيمات'] },
  motion: { en: ['Implementing state motion', 'Direction and reduced-motion gate'], ar: ['تنفيذ حركة الحالة', 'بوابة الاتجاه وتقليل الحركة'] },
  elevation: { en: ['Building surface hierarchy', 'Overlay release gate'], ar: ['بناء تسلسل الأسطح', 'بوابة الطبقات العائمة'] },
  icons: { en: ['Defining slots and mirroring', 'Icon accessibility gate'], ar: ['تعريف slots والعكس', 'بوابة وصول الأيقونات'] },
  illustrations: { en: ['Choosing media intentionally', 'Text-first localization gate'], ar: ['اختيار الوسائط بقصد', 'بوابة النص أولا والتوطين'] },
}

const foundationSectionLabels: Record<string, { en: string; ar: string }> = {
  Overview: { en: 'Overview', ar: 'نظرة عامة' },
  'Token Contract': { en: 'Token Contract', ar: 'عقد التوكنات' },
  'Required Semantic Roles': { en: 'Required Semantic Roles', ar: 'الأدوار الدلالية المطلوبة' },
  'Color Roles': { en: 'Color Roles', ar: 'أدوار اللون' },
  'Theme Swatches': { en: 'Theme Swatches', ar: 'عينات الثيم' },
  'State Matrix': { en: 'State Matrix', ar: 'مصفوفة الحالات' },
  'Type Scale': { en: 'Type Scale', ar: 'مقياس الطباعة' },
  'Dextrum Typography': { en: 'Dextrum Typography', ar: 'طباعة Dextrum' },
  'Arabic Display Is Not Uppercase': { en: 'Arabic Display Is Not Uppercase', ar: 'العرض العربي ليس Uppercase' },
  'Mixed-Script Rhythm': { en: 'Mixed-Script Rhythm', ar: 'إيقاع النص المختلط' },
  'Spacing Scale': { en: 'Spacing Scale', ar: 'مقياس المسافات' },
  'RTL-Aware Layout': { en: 'RTL-Aware Layout', ar: 'تخطيط واع بـ RTL' },
  'Radius Roles': { en: 'Radius Roles', ar: 'أدوار نصف القطر' },
  'Theme Variance': { en: 'Theme Variance', ar: 'اختلاف الثيمات' },
  'Motion Scale': { en: 'Motion Scale', ar: 'مقياس الحركة' },
  'Directional Motion Rules': { en: 'Directional Motion Rules', ar: 'قواعد الحركة الاتجاهية' },
  'Surface And Elevation': { en: 'Surface And Elevation', ar: 'السطح والارتفاع' },
  'Overlay Rules': { en: 'Overlay Rules', ar: 'قواعد الطبقات العائمة' },
  'shadcn/ui Default Icons': { en: 'shadcn/ui Default Icons', ar: 'أيقونات shadcn/ui الافتراضية' },
  'Icon Policy': { en: 'Icon Policy', ar: 'سياسة الأيقونات' },
  'Mirroring Rules': { en: 'Mirroring Rules', ar: 'قواعد العكس' },
  'Media Rules': { en: 'Media Rules', ar: 'قواعد الوسائط' },
  'Empty State Preview': { en: 'Empty State Preview', ar: 'معاينة الحالة الفارغة' },
  'AI contract': { en: 'AI contract', ar: 'عقد الذكاء الاصطناعي' },
  'Arabic / RTL Product Mockups': { en: 'Arabic / RTL Product Mockups', ar: 'نماذج منتج عربية وRTL' },
}

function foundationSectionLabel(locale: Locale, label: string) {
  return foundationSectionLabels[label]?.[locale] ?? label
}

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

const foundationGroupLabelsArabic: Record<TokenRow['group'], string> = {
  color: 'اللون',
  typography: 'الطباعة',
  spacing: 'المسافات',
  size: 'الأحجام',
  border: 'الحدود',
  shape: 'الشكل',
  motion: 'الحركة',
  elevation: 'الارتفاع',
  icons: 'الأيقونات',
  illustrations: 'الرسوم والوسائط',
}

const tokenArabicRoles: Record<string, string> = {
  '--background': 'خلفية التطبيق أو الصفحة',
  '--foreground': 'النص والأيقونات الأساسية',
  '--surface': 'أسطح واجهة محايدة',
  '--surface-strong': 'إدخالات وتنقل نشط وعناصر مجمعة',
  '--surface-elevated': 'أسطح popover وdialog وmenu',
  '--card': 'خلفية سطح مؤطر ومتكرر',
  '--primary': 'الإجراء الأساسي',
  '--secondary': 'الإجراءات الهادئة والداعمة',
  '--destructive': 'الإجراء الخطر أو غير القابل للتراجع',
  '--muted': 'سطح منخفض التركيز',
  '--border': 'فواصل وحواف الجداول والبطاقات',
  '--ring': 'حلقة التركيز المرئية',
  '--font-sans': 'طباعة واجهة لاتينية افتراضية',
  '--font-mono': 'الكود والتوكنات ومخرجات CLI',
  '--font-arabic-body': 'نص عربي ونص مختلط',
  '--font-arabic-display': 'عناوين العرض العربية',
  '--font-size-display': 'مقياس عناوين العرض',
  '--font-size-arabic-display': 'مقياس العرض العربي',
  '--line-height-arabic-body': 'إيقاع النص العربي المتصل',
  '--line-height-arabic-display': 'إيقاع عناوين العرض العربية',
  '--tracking-arabic-display': 'تباعد حروف العرض العربي',
  '--space-1': 'فجوة صغيرة جدا داخل السطر',
  '--space-2': 'فجوة مكوّن كثيف',
  '--space-3': 'حشوة عنصر تحكم مضغوط',
  '--space-4': 'مسافة inline وblock افتراضية',
  '--space-6': 'مسافة مجموعة أو panel',
  '--space-8': 'فصل محتوى كبير',
  '--space-12': 'إيقاع أقسام الصفحة',
  '--size-control-sm': 'ارتفاع عناصر التحكم الصغيرة',
  '--size-control-md': 'ارتفاع عناصر التحكم الافتراضية',
  '--size-control-lg': 'ارتفاع عناصر التحكم البارزة',
  '--size-icon-sm': 'صندوق أيقونة صغير',
  '--size-icon-md': 'صندوق أيقونة افتراضي',
  '--border-width-hairline': 'فاصل وحافة افتراضية',
  '--border-width-focus': 'عرض إطار focus-visible',
  '--border-style-default': 'نمط حدود الواجهة',
  '--radius-control': 'شكل الزر والإدخال وعنصر القائمة',
  '--radius-surface': 'شكل البطاقة والحوار والطبقة',
  '--radius-chat-bubble': 'شكل فقاعة الرسالة',
  '--radius-chat-composer': 'شكل مؤلف المحادثة',
  '--radius-chat-token': 'شكل توكنات المحادثة والمرفقات',
  '--radius-round': 'الأفاتار والشارة والعناصر الدائرية',
  '--duration-fast': 'حالات التحويم والتركيز والضغط',
  '--duration-medium': 'الطي والتوسيع وتغيّر التخطيط',
  '--duration-slow': 'دخول وخروج سطح كبير',
  '--ease-standard': 'إيقاع الانتقال الافتراضي',
  '--ease-emphasized': 'إيقاع disclosure وshell',
  '--shadow-surface': 'ارتفاع سطح بسيط',
  '--shadow-popover': 'قوائم وpopover عائمة',
  '--shadow-dialog': 'أسطح modal',
  '--icon-size-sm': 'أيقونات العناصر الكثيفة',
  '--icon-size-md': 'أيقونات الإجراءات والتنقل',
  '--icon-stroke-width': 'الوزن البصري للأيقونة',
  '--media-radius': 'شكل صورة أو لقطة أو رسم',
  '--media-background': 'خلفية معاينة الوسائط',
}

const tokenArabicRules: Record<TokenRow['group'], string> = {
  color: 'استخدم الدور الدلالي ولا تربط المكوّن بقيمة علامة خام.',
  typography: 'استخدم خط وحجم وإيقاع الثيم وافصل قواعد العربية عن اللاتينية.',
  spacing: 'استخدم gap وخصائص inline وblock المنطقية.',
  size: 'حافظ على هدف تفاعل قابل للوصول ولا تشتق الحجم من طول النص.',
  border: 'استخدم دور الحدود الدلالي ولا تخترع سماكة أو نمطا محليا.',
  shape: 'استخدم دور الشكل الدلالي ولا تثبت هندسة Utopia داخل الجوهر.',
  motion: 'استخدم مددا وإيقاعات دلالية واحترم reduced motion والاتجاه.',
  elevation: 'اربط السطح والحد والظل بأدوار دلالية.',
  icons: 'يمتلك المكوّن slot والتسمية، ويمتلك الثيم فلسفة الأيقونة.',
  illustrations: 'الوسائط اختيارية ويجب أن يبقى المحتوى مفهوما من دونها.',
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

const guideArabicPages: Record<keyof typeof guidePages, { title: string; intro: string; usage: readonly string[]; rules: readonly string[]; checklist: readonly string[] }> = {
  'what-s-new': {
    title: 'ما الجديد',
    intro: 'ملاحظات إصدار لبنية نظام التصميم وجاهزية المكونات وسياسة الثيمات والعقود الموجهة للذكاء الاصطناعي.',
    usage: ['راجع التغييرات قبل اعتماد مكوّن أو وثيقة جديدة.', 'اربط كل تغيير بتاريخ وحزمة أو ملف manifest.', 'اقرأ هذه الصفحة قبل افتراض أن الأمثلة القديمة ما زالت تمثل النظام الحالي.'],
    rules: ['وثّق تغييرات مصدر الحقيقة لا الآراء التصميمية غير الرسمية.', 'اذكر التغييرات الكاسرة ومسار الانتقال بوضوح.', 'لا تخلط تغييرات موقع الإنتاج بإصدار نظام التصميم إلا عندما يستهلك الموقع تغييرا من النظام.'],
    checklist: ['افحص تغيّر حالات المكونات في manifest.', 'افحص تغيّر التوكنات وسياسات الثيمات.', 'افحص مستندات الذكاء الاصطناعي ودعم العربية الجديدة.'],
  },
  'quick-start-with-ai': {
    title: 'بدء سريع مع الذكاء الاصطناعي',
    intro: 'أقصر مسار آمن لتثبيت Ceramic وفحصه واستخدامه من دون تخمين.',
    usage: ['ابدأ بوثائق CLI الكثيفة ثم افحص ملفات manifest.', 'استخدم صادرات Ceramic قبل primitives الخام من shadcn.', 'طبّق التوكنات الدلالية وفحوص العربية منذ البداية.'],
    rules: ['اقرأ quick-start-ai.md وfoundations.md وarabic-friendly.md وshadcn-conversion.md.', 'لا تخترع مسارات استيراد أو توكنات علامة خام أو نصا عربيا للإنتاج.', 'شغّل doctor وتدقيق المكونات بعد تغيير النظام.'],
    checklist: ['npx utopia-ds docs quick-start-ai --dense', 'npx utopia-ds docs foundations --dense', 'npx utopia-ds docs arabic-friendly --dense', 'npx utopia-ds component --list --dense'],
  },
  'working-with-ai': {
    title: 'العمل مع الذكاء الاصطناعي',
    intro: 'قواعد تجعل النظام مقروءا وقابلا للاستخدام من الوكلاء والمهندسين في الوقت نفسه.',
    usage: ['اعتبر manifest مصدر الحقيقة للاستيراد والحالة والتوكنات والمحظورات.', 'اكتب العقود بصيغة متى يستخدم ومتى يتجنب وما التوكنات المطلوبة وما البديل.', 'اجعل الأمثلة قابلة للنسخ ومحصورة في صادرات الحزمة.'],
    rules: ['لا تخف السلوك في النثر أو الصورة فقط.', 'لا تجعل الوكيل يستنتج حالة shadcn fallback من ملفات التنفيذ.', 'كل مكوّن عام يحتاج manifest واكتشافا عبر CLI.'],
    checklist: ['يصف components.json الاستيراد والمصدر والأساس والتوكنات وقواعد الاستخدام.', 'يعرض catalog.json بنية المعلومات الحالية.', 'يشير llms.txt إلى المستندات وملفات manifest الحالية.'],
  },
  principles: {
    title: 'المبادئ',
    intro: 'مبادئ تشغيل Ceramic: دلالي أولا، مبني على shadcn، قابل لتعدد الثيمات، داعم للعربية، ومقروء للذكاء الاصطناعي.',
    usage: ['استخدم المبادئ لحسم المقايضات قبل إضافة مكوّن أو قاعدة ثيم.', 'أبعد فلسفة Utopia Default البصرية عن المكونات القابلة لإعادة الاستخدام.', 'دع الثيم يمتلك اللون والخط والأيقونات والهندسة والنبرة الخاصة بالعلامة.'],
    rules: ['يمتلك الجوهر البنية وإمكانية الوصول والأدوار الدلالية والتحويل من shadcn وخط الأساس العربي.', 'يمتلك الثيم الفلسفة البصرية وربط القيم الأولية.', 'يجب أن تكون الوثائق وmanifest محددة بما يكفي لكي يعمل الوكيل بلا تخمين.'],
    checklist: ['لا قيم علامة خام داخل المكونات القابلة لإعادة الاستخدام.', 'تستخدم المكونات توكنات دلالية للون والشكل والطباعة والمسافة والحركة والارتفاع.', 'فحوص العربية وRTL صريحة للتنقل والنماذج والجداول والطبقات.'],
  },
  'theme-system': {
    title: 'نظام الثيمات',
    intro: 'تطبق الثيمات عقد الأدوار الدلالية. ثيم The Utopia Studio Default هو أول ثيم مقفل وليس النظام كله.',
    usage: ['استخدم الثيم لربط الأدوار الدلالية بقيم العلامة.', 'أضف ثيما جديدا مع الحفاظ على الأدوار المطلوبة وإضافة توكنات امتداد عند الحاجة.', 'أبق كود المكونات ثابتا عند تبديل الثيم.'],
    rules: ['يمكن للثيم إضافة قيم كثيرة لكنه يحافظ على الأدوار المطلوبة.', 'لا تضع قواعد Utopia Default داخل المكوّن القابل لإعادة الاستخدام.', 'توكنات الطباعة العربية مطلوبة في كل ثيم جاد.'],
    checklist: ['يسرد themes.json الأدوار المطلوبة.', 'يوثق theme-utopia-default.json السياسة البصرية.', 'يعرّف CSS اللون والطباعة والمسافة والشكل والحركة والعربية والارتفاع.'],
  },
  'arabic-friendly': {
    title: 'دعم العربية',
    intro: 'دعم العربية يعني تخطيط RTL أولا وطباعة عربية ومتانة للنص المختلط واستعدادا للتوطين وعكس الأيقونات والحركة بقصد.',
    usage: ['اقرأ هذا الدليل قبل توليد مكوّنات وقوالب ولوحات ونماذج وتنقل عربي.', 'استخدم النص العربي المرفق للاختبار فقط.', 'اختبر العربية مع LTR منذ البداية لا كمرحلة ترجمة متأخرة.'],
    rules: ['استخدم خصائص CSS المنطقية وواجهات start/end.', 'حجم العرض العربي يقارب 95% من مرجع العرض اللاتيني ولا يستخدم uppercase لاتينيا.', 'تعكس الأسهم وchevrons وcarousel وprogress وsidebar عندما يكون المعنى اتجاهيا.'],
    checklist: ['اختبر dir="rtl" وlang="ar".', 'اختبر النص المختلط والأرقام العربية.', 'لا تخترع نصا عربيا للإنتاج.', 'اختبر التركيز والتحويم والتحديد والتعطيل والتوسيع والحالة الفارغة.'],
  },
  'styling-components': {
    title: 'تنسيق المكونات',
    intro: 'طريقة تنسيق مكونات Ceramic من دون كسر ملكية التوكنات أو إمكانية الوصول المبنية على shadcn.',
    usage: ['ابدأ بخصائص المكوّن والمتغيرات الدلالية.', 'استخدم className لتكوين التخطيط في طبقة التطبيق.', 'اكتب CSS بتوكنات دلالية لا بقيم أولية خام.'],
    rules: ['تستهلك المكونات أدوارا مثل --primary و--background و--radius-control و--radius-surface.', 'لا تنسخ ألوان shadcn الخام أو قيم Utopia الخاصة.', 'حافظ على حالات focus-visible وdisabled وloading وselected وinvalid وRTL.'],
    checklist: ['تستخدم التجاوزات توكنات دلالية.', 'لا مسافات left/right مادية إلا إذا كانت مقصودة وموثقة.', 'يبقى المكوّن قابلا للوصول بعد التنسيق.'],
  },
  'styling-library-interop': {
    title: 'تكامل مكتبات التنسيق',
    intro: 'طريقة عمل Ceramic مع Tailwind وCSS وCSS modules وCSS-in-JS وتنسيق التطبيق.',
    usage: ['استخدم متغيرات Ceramic كطبقة العقد.', 'اربط أدوات التنسيق الأخرى بالتوكنات الدلالية.', 'أبق الحزمة مستقلة عن تفضيلات تنسيق التطبيق.'],
    rules: ['يمكن للتكامل تغيير الصياغة لا معنى التوكن.', 'لا تدع الإعدادات البصرية الافتراضية لـ Tailwind أو shadcn تتجاوز دلالات Ceramic.', 'تظل قواعد التخطيط المنطقي مطلوبة في كل طريقة تنسيق.'],
    checklist: ['تشير الأنماط إلى CSS custom properties.', 'تحافظ الأنماط المولدة على الخصائص المنطقية.', 'لا يصبح CSS المحلي للتطبيق مصدر حقيقة للمكوّن العام.'],
  },
  'migration-guide': {
    title: 'دليل الانتقال',
    intro: 'مسار آمن لنقل واجهة محلية أو استخدام خام لـ shadcn إلى صادرات Ceramic.',
    usage: ['استخدمه عند ترقية مكوّن أو توكن أو قالب إلى packages/design-system.', 'انقل العقد أولا ثم التنفيذ ثم الأمثلة.', 'افصل إعادة هيكلة الصفحات عن استخراج نظام التصميم.'],
    rules: ['لا تنقل الدين البصري إلى المكوّن العام.', 'لا تستبدل عرض الإنتاج أثناء الانتقال إلا بنطاق صريح.', 'حافظ على عمل المستخدم وتغييرات worktree الحالية.'],
    checklist: ['أنشئ أو حدّث مدخل manifest.', 'استخدم تصدير حزمة Ceramic.', 'وثّق التوكنات المطلوبة وسلوك العربية.', 'شغّل lint وbuild وdoctor وتدقيق المكونات.'],
  },
}

const guideSectionMeta: Record<keyof typeof guidePages, { en: [string, string, string]; ar: [string, string, string] }> = {
  'what-s-new': { en: ['Release signal', 'Adoption impact', 'Before upgrading'], ar: ['إشارة الإصدار', 'أثر الاعتماد', 'قبل الترقية'] },
  'quick-start-with-ai': { en: ['Install contract', 'Agent discovery', 'Verification'], ar: ['عقد التثبيت', 'اكتشاف الوكيل', 'التحقق'] },
  'working-with-ai': { en: ['Discovery order', 'Generation constraints', 'Output contract'], ar: ['ترتيب الاكتشاف', 'قيود التوليد', 'عقد المخرجات'] },
  principles: { en: ['Core owns', 'Themes own', 'Decision test'], ar: ['ما يمتلكه الجوهر', 'ما يمتلكه الثيم', 'اختبار القرار'] },
  'theme-system': { en: ['Required roles', 'Authoring sequence', 'Compatibility gate'], ar: ['الأدوار المطلوبة', 'تسلسل التأليف', 'بوابة التوافق'] },
  'arabic-friendly': { en: ['Layout direction', 'Script and localization', 'Release gate'], ar: ['اتجاه التخطيط', 'الخط والتوطين', 'بوابة الإصدار'] },
  'styling-components': { en: ['Variants first', 'Semantic styling', 'State preservation'], ar: ['المتغيرات أولا', 'التنسيق الدلالي', 'حفظ الحالات'] },
  'styling-library-interop': { en: ['Contract layer', 'Framework adapters', 'Boundary checks'], ar: ['طبقة العقد', 'محولات الأطر', 'فحوص الحدود'] },
  'migration-guide': { en: ['Inventory', 'Promotion order', 'No-regression gate'], ar: ['الجرد', 'ترتيب الترقية', 'بوابة عدم التراجع'] },
}

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
    return <GuidePage slug={slug in guidePages ? slug : 'quick-start-with-ai'} />
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

function GuidePage({ slug }: { slug: keyof typeof guidePages }) {
  const { locale } = useI18n()
  const page = locale === 'ar' ? guideArabicPages[slug] : guidePages[slug]
  const sectionTitles = guideSectionMeta[slug][locale]

  return (
    <div className="page guide-page">
      <section className="page-hero compact">
        <p className="eyebrow">{t(locale, 'guide')}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>

      <article className="docs-article">
        <FoundationSection id="operating-sequence" title={sectionTitles[0]}>
          <GuidanceTable locale={locale} rows={page.usage.map((item, index) => [`${index + 1}`, item])} />
        </FoundationSection>

        <FoundationSection id="constraints" title={sectionTitles[1]}>
          <GuidanceTable locale={locale} rows={page.rules.map((item, index) => [locale === 'ar' ? `قاعدة ${index + 1}` : `Rule ${index + 1}`, item])} />
        </FoundationSection>

        <FoundationSection id="release-gate" title={sectionTitles[2]}>
          <GuidanceTable locale={locale} rows={page.checklist.map((item, index) => [locale === 'ar' ? `فحص ${index + 1}` : `Check ${index + 1}`, item])} />
        </FoundationSection>

        {slug === 'arabic-friendly' ? (
          <FoundationSection id="rtl-preview" title={locale === 'ar' ? 'معاينة RTL وLTR' : 'RTL and LTR preview'}>
            <div className="arabic-mockups compact">
              <article dir="rtl" lang="ar">
                <strong>نموذج اختبار RTL</strong>
                <h3>نص اختبار</h3>
                <p>نص مختلط: يدعم Ceramic DS v0.1 اتجاه inline-start وinline-end والشارات والتركيز والاقتطاع.</p>
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
            <pre>{`Install @utopia-studio-design/design-system and @utopia-studio-design/design-system-cli. Run \`npx utopia-ds init --theme utopia-default\`. Read the generated agent rules, then use \`npx utopia-ds manifest --json\` and \`search\` before generating UI. Connect the generated Ceramic MCP server when your coding tool supports MCP.`}</pre>
          </div>
        </section>

        <section id="install">
          <h2>{isArabic ? 'التثبيت' : 'Install'}</h2>
          <p>{isArabic ? 'أضف الحزمة الأساسية والثيم وواجهة CLI إلى مشروعك الحالي.' : 'Add the core package, a theme, and the CLI to your existing project.'}</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npm install @utopia-studio-design/design-system
npm install -D @utopia-studio-design/design-system-cli`}</pre>
          </div>
          <p>{isArabic ? 'ثم شغّل معالج init لإنشاء قواعد الوكيل واختيار قالب بداية وفهم عقد الثيم.' : 'Then run the init wizard to set up AI agent docs, pick a starter template, and learn about theming.'}</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npx utopia-ds init --theme utopia-default`}</pre>
          </div>
        </section>

        <section id="add-theme-css">
          <h2>{isArabic ? 'أضف CSS الخاص بالثيم' : 'Add the theme CSS'}</h2>
          <p>{isArabic ? 'استورد ملف الجوهر وثيم العلامة في ملف CSS العام. يوفّر الثيم كل توكنات التصميم كمتغيرات CSS.' : 'Import the core stylesheet and a theme in your global CSS file. Themes provide all design tokens as CSS custom properties.'}</p>
          <div className="code-block">
            <span>css</span>
            <pre>{`@import '@utopia-studio-design/design-system/core.css';
@import '@utopia-studio-design/design-system/themes/utopia-default.css';`}</pre>
          </div>
        </section>

        <section id="add-first-component">
          <h2>{isArabic ? 'أضف أول مكوّن' : 'Add your first component'}</h2>
          <p>{isArabic ? 'استورد المكونات من مساراتها الفرعية العامة. يحافظ ذلك على وضوح القصد للبشر ووكلاء الذكاء الاصطناعي.' : 'Components are imported from per-component subpath entrypoints. This keeps intent clear for humans and AI agents.'}</p>
          <div className="code-block">
            <span>tsx</span>
            <pre>{`import { Button } from '@utopia-studio-design/design-system/Button';

export default function Page() {
  return <Button>Build with Utopia</Button>;
}`}</pre>
          </div>
        </section>

        <section id="customize">
          <h2>{isArabic ? 'خصّص عبر className' : 'Customize with className'}</h2>
          <p>{isArabic ? 'تدعم مكونات Ceramic التوكنات الدلالية وواجهات تنسيق React المعتادة. ابدأ بتجاوزات className ثم أضف CSS الخاص بالمشروع في طبقة التطبيق فقط.' : 'Ceramic components support semantic tokens and standard React styling surfaces. Start with className overrides, then add project-specific CSS only at the app layer.'}</p>
          <div className="code-block">
            <span>tsx</span>
            <pre>{`import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button className="justify-self-end">Save</Button>;
}`}</pre>
          </div>
        </section>

        <section id="example-apps">
          <h2>{isArabic ? 'تطبيقات نموذجية' : 'Example Apps'}</h2>
          <p>{isArabic ? 'استخدم قالبا مدعوما بملف manifest كنقطة بداية ثابتة، ثم افحص عقد كل مكوّن قبل التنفيذ.' : 'Use a manifest-backed template as the stable starting point, then inspect every component contract before implementation.'}</p>
          <table className="docs-table">
            <thead>
              <tr>
                <th>{isArabic ? 'المثال' : 'Example'}</th>
                <th>{isArabic ? 'التقنيات' : 'Stack'}</th>
                <th>{isArabic ? 'المسار' : 'Path'}</th>
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
          <h2>{isArabic ? 'استكشف CLI' : 'Explore the CLI'}</h2>
          <p>{isArabic ? 'تقرأ واجهة CLI وJSON API والواجهة البرمجية وخادم MCP ملفات manifest نفسها المملوكة للحزمة.' : 'The CLI, JSON API, programmatic API, and MCP server all read the same package-owned manifests.'}</p>
          <div className="code-block">
            <span>bash</span>
            <pre>{`npx utopia-ds manifest --json
npx utopia-ds search "Arabic settings form" --json
npx utopia-ds component Button --json
npx utopia-ds template template-app-shell --skeleton --dense
npx utopia-ds theme utopia-default --json
npx utopia-ds docs arabic-friendly --dense
npx utopia-ds doctor --json`}</pre>
          </div>
        </section>

        <section id="connect-mcp">
          <h2>{isArabic ? 'ربط MCP' : 'Connect MCP'}</h2>
          <p>{isArabic ? 'يعرض خادم MCP نفس البحث وعقود المكونات والقوالب والثيمات والوثائق التي تعرضها واجهة CLI، من دون مصدر حقيقة منفصل.' : 'The MCP server exposes the same search, component, template, theme, docs, and doctor contracts as the CLI without creating a second source of truth.'}</p>
          <div className="code-block">
            <span>json</span>
            <pre>{`{
  "mcpServers": {
    "ceramic": {
      "command": "npx",
      "args": ["-y", "@utopia-studio-design/design-system-cli", "mcp"]
    }
  }
}`}</pre>
          </div>
        </section>

        <section id="arabic-friendly">
          <h2>{isArabic ? 'دعم العربية' : 'Arabic Friendly'}</h2>
          <p>{isArabic ? 'دعم العربية متطلب أساسي في نظام التصميم وليس مرحلة ترجمة. يجب أن يقرأ الوكيل عقد العربية قبل توليد التنقل أو النماذج أو الجداول أو الحالات الفارغة أو الأيقونات أو الحركة أو الطباعة لسياقات RTL.' : 'Arabic-friendly is a first-class design-system requirement, not a translation pass. AI agents must read the Arabic contract before generating navigation, forms, tables, empty states, icons, motion, or typography for Arabic/RTL contexts.'}</p>
          <div className="foundation-card-grid">
            <article className="foundation-card">
              <strong>{isArabic ? 'الطباعة' : 'Typography'}</strong>
              <p>{isArabic ? 'استخدم IBM Plex Sans Arabic في Utopia Default واضبط حجم العرض العربي عند نحو 95% من مقياس العرض اللاتيني وحافظ على line-height مقروء ولا تطبق uppercase لاتينيا.' : 'Use IBM Plex Sans Arabic for Utopia Default, set Arabic display size from the Latin display scale at about 95%, keep Arabic line-height readable, and never apply Latin uppercase styling.'}</p>
            </article>
            <article className="foundation-card">
              <strong>{isArabic ? 'التخطيط' : 'Layout'}</strong>
              <p>{isArabic ? <>استخدم CSS المنطقي وأسماء start/end. اختبر <code>dir="rtl"</code> والنص المختلط والأرقام العربية والشارات والاقتطاع والتركيز والتحويم والتحديد.</> : <>Use logical CSS and start/end naming. Validate <code>dir="rtl"</code>, mixed-script labels, Arabic numerals, badges, truncation, focus, hover, and selected states.</>}</p>
            </article>
            <article className="foundation-card">
              <strong>{isArabic ? 'نقطة دخول الذكاء الاصطناعي' : 'AI entrypoint'}</strong>
              <p>{isArabic ? <>استخدم <code>npx utopia-ds docs arabic-friendly --dense</code> واقرأ <a href="#/docs/guide/arabic-friendly">دليل دعم العربية</a> كاملا قبل إنتاج واجهة عربية.</> : <>Use <code>npx utopia-ds docs arabic-friendly --dense</code> and the full <a href="#/docs/guide/arabic-friendly">Arabic Friendly guide</a> before producing Arabic-ready UI.</>}</p>
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
  const displayPage = locale === 'ar' ? { ...page, ...foundationArabicPages[slug] } : page
  const [implementationTitle, releaseTitle] = foundationSectionTitles[slug][locale]

  return (
    <div className="page foundations-page">
      <section className="page-hero compact">
        <p className="eyebrow">{t(locale, 'foundations')}</p>
        <h1>{displayPage.title}</h1>
        <p>{displayPage.intro}</p>
      </section>

      <article className="docs-article">
        <FoundationSection id="overview" title={foundationSectionLabel(locale, 'Overview')}>
          <FoundationOverview locale={locale} slug={slug} />
        </FoundationSection>

        <FoundationSection id="tokens" title={slug === 'all-tokens' ? foundationSectionLabel(locale, 'Token Contract') : locale === 'ar' ? `توكنات ${displayPage.title}` : `${page.title} Tokens`}>
          {slug === 'all-tokens' ? <GroupedTokenTables locale={locale} /> : <TokenTable locale={locale} rows={rows} />}
        </FoundationSection>

        {slug === 'all-tokens' ? (
          <FoundationSection id="required-roles" title={foundationSectionLabel(locale, 'Required Semantic Roles')}>
            <p>{locale === 'ar' ? 'يمكن لكل ثيم إضافة قيم أولية وتوكنات امتداد، لكن هذه الأدوار الدلالية ثابتة. تعتمد المكونات على هذه الأسماء من دون معرفة الثيم النشط.' : 'Every theme can add primitives and extension tokens, but these semantic roles are stable. Components may depend on these names without knowing the active theme.'}</p>
            <div className="token-chip-grid">
              {themes.requiredSemanticRoles.map((token) => <span key={token}>{token}</span>)}
            </div>
          </FoundationSection>
        ) : null}

        {slug === 'color' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="roles" title={foundationSectionLabel(locale, 'Color Roles')}>
              <ColorRoles locale={locale} />
            </FoundationSection>
            <FoundationSection id="swatches" title={foundationSectionLabel(locale, 'Theme Swatches')}>
              <ThemeSwatches locale={locale} />
            </FoundationSection>
            <FoundationSection id="states" title={foundationSectionLabel(locale, 'State Matrix')}>
              <StateMatrix locale={locale} />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'typography' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="type-scale" title={foundationSectionLabel(locale, 'Type Scale')}>
              <TypeScale locale={locale} />
            </FoundationSection>
            <FoundationSection id="dextrum-typography" title={foundationSectionLabel(locale, 'Dextrum Typography')}>
              <DextrumTypographyLinks locale={locale} />
            </FoundationSection>
            <FoundationSection id="arabic-display" title={foundationSectionLabel(locale, 'Arabic Display Is Not Uppercase')}>
              <ArabicDisplayPreview locale={locale} />
            </FoundationSection>
            <FoundationSection id="mixed-script" title={foundationSectionLabel(locale, 'Mixed-Script Rhythm')}>
              <MixedScriptPreview locale={locale} />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'spacing' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="scale" title={foundationSectionLabel(locale, 'Spacing Scale')}>
              <SpacingScale />
            </FoundationSection>
            <FoundationSection id="logical-layout" title={foundationSectionLabel(locale, 'RTL-Aware Layout')}>
              <LogicalLayoutPreview locale={locale} />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'shape' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="radius-preview" title={foundationSectionLabel(locale, 'Radius Roles')}>
              <ShapePreview locale={locale} />
            </FoundationSection>
            <FoundationSection id="theme-variance" title={foundationSectionLabel(locale, 'Theme Variance')}>
              <ThemeVariancePreview locale={locale} />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'motion' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="motion-scale" title={foundationSectionLabel(locale, 'Motion Scale')}>
              <MotionScale locale={locale} />
            </FoundationSection>
            <FoundationSection id="mirroring-rules" title={foundationSectionLabel(locale, 'Directional Motion Rules')}>
              <DirectionalRules locale={locale} />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'elevation' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="surface-preview" title={foundationSectionLabel(locale, 'Surface And Elevation')}>
              <ElevationPreview locale={locale} />
            </FoundationSection>
            <FoundationSection id="overlay-rules" title={foundationSectionLabel(locale, 'Overlay Rules')}>
              <OverlayRules locale={locale} />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'icons' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="shadcn-icons" title={foundationSectionLabel(locale, 'shadcn/ui Default Icons')}>
              <ShadcnIconPreview locale={locale} />
            </FoundationSection>
            <FoundationSection id="icon-policy" title={foundationSectionLabel(locale, 'Icon Policy')}>
              <IconPolicy locale={locale} />
            </FoundationSection>
            <FoundationSection id="icon-mirroring" title={foundationSectionLabel(locale, 'Mirroring Rules')}>
              <IconMirroringPreview locale={locale} />
            </FoundationSection>
          </>
        ) : null}

        {slug === 'illustrations' || slug === 'all-tokens' ? (
          <>
            <FoundationSection id="media-rules" title={foundationSectionLabel(locale, 'Media Rules')}>
              <IllustrationRules locale={locale} />
            </FoundationSection>
            <FoundationSection id="empty-state" title={foundationSectionLabel(locale, 'Empty State Preview')}>
              <IllustrationPreview locale={locale} />
            </FoundationSection>
          </>
        ) : null}

        <FoundationSection id="implementation" title={implementationTitle}>
          <FoundationUsage locale={locale} slug={slug} />
        </FoundationSection>

        <FoundationSection id="release-gate" title={releaseTitle}>
          <FoundationBestPractices locale={locale} slug={slug} />
          {slug !== 'all-tokens' ? <ArabicFoundationCheck locale={locale} slug={slug} /> : null}
        </FoundationSection>

        {slug === 'all-tokens' ? (
          <>
            <FoundationSection id="ai-contract" title={foundationSectionLabel(locale, 'AI contract')}>
              <AiUsageRules locale={locale} slug={slug} />
            </FoundationSection>
            <FoundationSection id="arabic-preview" title={foundationSectionLabel(locale, 'Arabic / RTL Product Mockups')}>
              <ArabicMockups />
            </FoundationSection>
          </>
        ) : null}
      </article>
    </div>
  )
}

function FoundationUsage({ locale, slug }: { locale: Locale; slug: keyof typeof foundationPages }) {
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

  const arabicRows: Record<keyof typeof foundationPages, string[][]> = {
    'all-tokens': [
      ['ابدأ هنا', 'اقرأ كل التوكنات قبل توليد مكوّن أو قالب أو ثيم.'],
      ['ثم ضيّق النطاق', 'انتقل إلى اللون أو الطباعة أو المسافات أو الشكل أو الحركة أو الارتفاع أو الأيقونات أو الوسائط.'],
      ['مسار الوكيل', 'استخدم أعمدة المجموعة والدور وقاعدة الذكاء الاصطناعي كطبقة قرار قابلة للقراءة آليا.'],
    ],
    color: [
      ['الأسطح', 'افصل خلفية الصفحة واللوحات المحلية والطبقات العائمة والبطاقات المؤطرة بأدوار اللون.'],
      ['الإجراءات', 'استخدم primary للإجراء الأهم وsecondary للدعم وdestructive للخطر فقط.'],
      ['التركيز', 'استخدم --ring للتركيز بلوحة المفاتيح في كل ثيم.'],
    ],
    typography: [
      ['الواجهة اللاتينية', 'استخدم خط الواجهة وإيقاع العرض الافتراضي للإنجليزية والنص اللاتيني المختلط.'],
      ['الواجهة العربية', 'استخدم توكنات النص والعرض العربي مع lang="ar" وdir="rtl".'],
      ['الكود والوثائق', 'استخدم mono للاستيراد والتوكنات ومخرجات CLI والأمثلة القابلة للنسخ.'],
    ],
    spacing: [
      ['فجوات المكونات', 'استخدم توكنات المسافة عبر gap وpadding-inline وmargin-block.'],
      ['عمق التنقل', 'استخدم rails ومسافات inline-start بدلا من padding-left المادي.'],
      ['منتجات RTL', 'اختبر التنقل والدرج والتبويبات والترقيم وcarousel وprogress في الاتجاهين.'],
    ],
    shape: [
      ['عناصر التحكم', 'استخدم أدوار الحجم والحد والشكل للأزرار والإدخالات والقوائم.'],
      ['الأسطح', 'استخدم أدوار سطح مؤطر للبطاقات وpopover وdialog وpanel.'],
      ['اختلاف الثيم', 'لا تفترض هندسة مربعة أو دائرية داخل المكوّن العام.'],
    ],
    motion: [
      ['الحالة الدقيقة', 'استخدم الحركة السريعة للتحويم والتركيز والنشاط والتحديد والضغط.'],
      ['الإظهار والطي', 'استخدم الحركة المتوسطة لـ accordion وside navigation وdrawer وcollapsible.'],
      ['الاتجاه', 'استخدم حركة واعية بـ inline في التنقل وcarousel.'],
    ],
    elevation: [
      ['التسلسل الأساسي', 'استخدم الخلفية والحد والسطح قبل إضافة الظلال.'],
      ['الواجهة العائمة', 'استخدم الأسطح المرتفعة لـ popover وdropdown وdialog وhover card.'],
      ['إمكانية الوصول', 'لا يستبدل الارتفاع إدارة التركيز أو Escape أو التسمية القابلة للوصول.'],
    ],
    icons: [
      ['Slots', 'استخدم slot الأيقونة عندما توضح التسمية أو تنشئ عنصرا بأيقونة فقط.'],
      ['الأيقونة فقط', 'وفّر اسما وتركيزا وتحويما وضغطا وتعطيلا وtooltip.'],
      ['RTL', 'اعكس الأيقونات الاتجاهية وأبق الأيقونات المحايدة ثابتة.'],
    ],
    illustrations: [
      ['الحالات الفارغة', 'ابدأ بنص واضح قبل إضافة أي رسم.'],
      ['وسائط المنتج', 'استخدم صورة حقيقية عندما يحتاج المستخدم إلى فحص المنتج أو المكان أو الشيء.'],
      ['وسائط الثيم', 'أسلوب الرسم مملوك للثيم أو القالب وليس شرطا في الجوهر.'],
    ],
  }

  return <GuidanceTable locale={locale} rows={locale === 'ar' ? arabicRows[slug] : rows[slug]} />
}

function FoundationBestPractices({ locale, slug }: { locale: Locale; slug: keyof typeof foundationPages }) {
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

  const arabicRows: Record<keyof typeof foundationPages, string[][]> = {
    'all-tokens': [
      ['افعل', 'احتفظ بالقيم الأولية داخل manifest الثيم وبالأدوار الدلالية داخل المكونات.'],
      ['لا تفعل', 'لا تولّد ألوان علامة خام أو إعدادات shadcn البصرية أو مسافات left/right داخل الكود العام.'],
      ['تحقق', 'شغّل docs وCLI وتدقيق المكونات والتحقق البصري بعد تغيير عقد الأسس.'],
    ],
    color: [
      ['افعل', 'استخدم أسماء أدوار تصف وظيفة الواجهة وحالتها.'],
      ['لا تفعل', 'لا تستخدم Brick Red أو Special Black أو hex خاما داخل المكونات العامة.'],
      ['تحقق', 'اختبر hover وactive وfocus-visible وdisabled وselected وdestructive.'],
    ],
    typography: [
      ['افعل', 'عامل العربية كنظام طباعة من الدرجة الأولى له توكنات نص وعرض.'],
      ['لا تفعل', 'لا تطبق uppercase أو tracking سالبا أو casing لاتينيا على العربية.'],
      ['تحقق', 'اختبر النص المختلط والأرقام والاقتطاع وline-height.'],
    ],
    spacing: [
      ['افعل', 'استخدم الخصائص المنطقية وأسماء start وend.'],
      ['لا تفعل', 'لا تثبت padding-left أو margin-right أو API يعتمد left/right فقط.'],
      ['تحقق', 'اختبر shell والتنقل الجانبي والنماذج والجداول والطبقات في dir="rtl".'],
    ],
    shape: [
      ['افعل', 'استخدم --radius-control للتحكم و--radius-surface للأسطح المؤطرة.'],
      ['لا تفعل', 'لا تثبت هندسة Utopia المربعة داخل كود الجوهر.'],
      ['تحقق', 'عاين الكثافات المختلفة وثيما مستقبليا ذا هندسة مستديرة.'],
    ],
    motion: [
      ['افعل', 'استخدم مددا وإيقاعات دلالية لحركة متسقة.'],
      ['لا تفعل', 'لا تحرك التخطيط بافتراض اتجاه مادي ولا تتجاهل reduced motion.'],
      ['تحقق', 'افتح وأغلق disclosure في الاتجاهين من دون قفزة تمرير.'],
    ],
    elevation: [
      ['افعل', 'استخدم أسطحا دلالية مرتفعة للمحتوى العائم.'],
      ['لا تفعل', 'لا تجعل الظل الزخرفي الإشارة الوحيدة للتسلسل أو الحالة.'],
      ['تحقق', 'اختبر Utopia Default المعتمد على الحدود وثيما آخر يعتمد الظلال.'],
    ],
    icons: [
      ['افعل', 'اجعل API محايدا اتجاهيا: leading وtrailing وstart وend وiconOnly.'],
      ['لا تفعل', 'لا تفترض أن كل ثيم يتبع فلسفة Utopia Default المحدودة للأيقونات.'],
      ['تحقق', 'اعكس الأسهم وchevrons في RTL وأبق الأيقونات المحايدة كما هي.'],
    ],
    illustrations: [
      ['افعل', 'استخدم الوسائط لتوضيح حالة المنتج بعد أن يعمل النص والتحكم.'],
      ['لا تفعل', 'لا تملأ الصفحة بوسائط عامة أو gradients أو زخارف بديلة عن المحتوى.'],
      ['تحقق', 'اختبر توسع الحالة الفارغة العربية ولا تخترع نصا للإنتاج.'],
    ],
  }

  return <GuidanceTable locale={locale} rows={locale === 'ar' ? arabicRows[slug] : rows[slug]} />
}

function FoundationOverview({ locale, slug }: { locale: Locale; slug: keyof typeof foundationPages }) {
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

  const arabicDescriptions: Record<keyof typeof foundationPages, string[]> = {
    'all-tokens': ['هذه الصفحة هي العقد المرجعي لكل الأسس.', 'استخدمها للتأكد من أن الثيم يوفّر الأدوار التي يتوقعها المكوّن.', 'يبدأ الوكيل هنا قبل اختيار API المكوّن أو توليد CSS.'],
    color: ['تصف أسماء اللون الوظيفة لا الدرجة اللونية.', 'قد يربط Utopia Default اللون Brick Red بـ --primary، لكن المكوّن يرى --primary فقط.', 'تبقى حالات النظام والتركيز والتعطيل والخطر مقروءة في LTR وRTL.'],
    typography: ['الطباعة اللاتينية والعربية نظامان من الدرجة الأولى.', 'يستخدم Utopia Default خط IBM Plex Sans Arabic ويبقي text-transform معطلا.', 'يحافظ النص المختلط على الإيقاع والاقتطاع وline-height.'],
    spacing: ['توكن المسافة قرار مقياس، وAPI التخطيط قرار اتجاه.', 'استخدم الخصائص المنطقية لكي يعمل start وend بالعربية والإنجليزية.', 'لا يعتمد العمق وrails والشارات والتنقل الجانبي على left/right.'],
    shape: ['تفصل أدوار الشكل هندسة التحكم عن هندسة السطح.', 'Utopia Default مربع، لكن النظام يسمح بثيمات مستقبلية مستديرة.', 'تستهلك المكونات --radius-control و--radius-surface.'],
    motion: ['تشرح الحركة تغيّر الحالة من دون إخفاء البنية.', 'تفهم حركة الطي والدرج وcarousel وprogress الاتجاه.', 'دعم reduced motion جزء من العقد وليس لمسة تجميلية.'],
    elevation: ['الارتفاع تسلسل دلالي وليس وصفة shadow إلزامية.', 'يفضل Utopia Default الأسطح المعتمدة على الحدود وقد تستخدم ثيمات أخرى الظلال.', 'تحافظ الأسطح العائمة على التركيز وEscape والنقر الخارجي.'],
    icons: ['يمتلك الجوهر slots وإمكانية الوصول ويمتلك الثيم فلسفة الأيقونات.', 'تحتاج إجراءات الأيقونة فقط إلى اسم وحالة focus-visible.', 'تعكس الأيقونات الاتجاهية وتبقى المحايدة ثابتة إلا إذا وُثق غير ذلك.'],
    illustrations: ['الرسوم والوسائط محتوى اختياري للثيم أو القالب.', 'لا يعتمد عمل المكوّن عليها.', 'تختبر الحالة الفارغة العربية التخطيط ولا تخترع نصا للإنتاج.'],
  }

  const visibleDescriptions = locale === 'ar' ? arabicDescriptions[slug] : descriptions[slug]

  return (
    <div className="foundation-card-grid">
      {visibleDescriptions.map((item) => (
        <article key={item} className="foundation-card">
          <p>{item}</p>
        </article>
      ))}
    </div>
  )
}

function GroupedTokenTables({ locale }: { locale: Locale }) {
  return (
    <div className="foundation-stack">
      {(Object.keys(foundationGroupLabels) as TokenRow['group'][]).map((group) => (
        <section className="foundation-token-group" key={group}>
          <h3>{locale === 'ar' ? foundationGroupLabelsArabic[group] : foundationGroupLabels[group]}</h3>
          <TokenTable locale={locale} rows={tokensFor([group])} />
        </section>
      ))}
    </div>
  )
}

function ColorRoles({ locale }: { locale: Locale }) {
  const roles = locale === 'ar' ? [
    ['الخلفية', '--background', 'لوحة التطبيق أو الصفحة الجذرية'],
    ['السطح', '--surface / --card / --surface-elevated', 'لوحات محلية وبطاقات وpopover وdialog'],
    ['الإجراء', '--primary / --secondary / --destructive', 'أزرار وعناصر نشطة وإجراءات خطرة'],
    ['النص', '--foreground / --muted-foreground', 'تسلسل محتوى مقروء'],
    ['النظام', '--border / --ring', 'الفصل والتركيز ووضوح لوحة المفاتيح'],
  ] : [
    ['Background', '--background', 'Root application/page canvas'],
    ['Surface', '--surface / --card / --surface-elevated', 'Local panels, cards, popovers, dialogs'],
    ['Action', '--primary / --secondary / --destructive', 'Buttons, active controls, danger actions'],
    ['Text', '--foreground / --muted-foreground', 'Readable content hierarchy'],
    ['System', '--border / --ring', 'Separation, focus, and keyboard visibility'],
  ]

  return <RoleMatrix locale={locale} rows={roles} />
}

function ThemeSwatches({ locale }: { locale: Locale }) {
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
      <p>{locale === 'ar' ? <>هذه قيم علامة The Utopia Studio Default الأولية. تستهلك المكونات أدوارا دلالية مثل <code>--primary</code> ولا تستهلك أسماء القيم الخام.</> : <>These are The Utopia Studio Default brand primitives. Components consume semantic roles such as <code>--primary</code>, never raw primitive names.</>}</p>
    </>
  )
}

function StateMatrix({ locale }: { locale: Locale }) {
  const states = ['default', 'hover', 'focus-visible', 'active', 'disabled', 'selected', 'destructive']

  return (
    <div className="state-matrix" aria-label={locale === 'ar' ? 'مصفوفة حالات اللون' : 'Color state matrix'}>
      {states.map((state) => <span key={state} data-state={state}>{state}</span>)}
    </div>
  )
}

function TypeScale({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'
  return (
    <div className="type-scale">
      <article>
        <span>{isArabic ? 'العرض' : 'Display'}</span>
        <strong>{isArabic ? 'ابن أنظمة واضحة' : 'Build clear systems'}</strong>
        <p>{isArabic ? 'يعتمد العرض العربي على المقياس والوزن والإيقاع ولا يستخدم uppercase اللاتيني.' : 'Latin display may use uppercase only when the active theme owns that rule.'}</p>
      </article>
      <article>
        <span>{isArabic ? 'العنوان' : 'Heading'}</span>
        <strong>{isArabic ? 'توثيق المكونات' : 'Component documentation'}</strong>
        <p>{isArabic ? 'تبقى العناوين مقروءة داخل الوثائق الكثيفة وواجهات التشغيل.' : 'Headings stay readable inside dense docs and operational UIs.'}</p>
      </article>
      <article>
        <span>{isArabic ? 'النص' : 'Body'}</span>
        <strong>{isArabic ? 'عقود دلالية للبشر والذكاء الاصطناعي' : 'Semantic contracts for humans and AI'}</strong>
        <p>{isArabic ? 'يحمل النص حدود الاستخدام والاستيراد وسلوك fallback وقواعد إمكانية الوصول.' : 'Body copy carries usage boundaries, imports, fallback behavior, and accessibility rules.'}</p>
      </article>
      <article>
        <span>{isArabic ? 'الكود' : 'Code'}</span>
        <code>import {'{ Button }'} from '@utopia-studio-design/design-system/Button'</code>
        <p>{isArabic ? 'تستخدم أسماء الكود والتوكنات خط mono لنسخ موثوق.' : 'Code and token names use mono styling for copy-paste reliability.'}</p>
      </article>
    </div>
  )
}

function DextrumTypographyLinks({ locale }: { locale: Locale }) {
  const pairings = [
    {
      href: '#/docs/foundations/typography/dextrum/marketing-sales',
      label: locale === 'ar' ? 'التسويق والمبيعات' : 'Marketing & Sales',
      title: 'Clash Grotesk + Satoshi',
      description: dextrumTheme.brandPrimitives.typography.marketingSales.use,
    },
    {
      href: '#/docs/foundations/typography/dextrum/app-website',
      label: locale === 'ar' ? 'التطبيق والموقع' : 'App & Website',
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

function ArabicDisplayPreview({ locale }: { locale: Locale }) {
  return (
    <div className="foundation-type-comparison">
      <div>
        <span>{locale === 'ar' ? 'العرض اللاتيني' : 'Latin display'}</span>
        <h3>BUILD CLEAR SYSTEMS</h3>
        <p>{locale === 'ar' ? 'يمكن أن يكون all-caps قاعدة خاصة بثيم لاتيني.' : 'All-caps can be a Latin theme rule.'}</p>
      </div>
      <div dir="rtl" lang="ar">
        <span>{locale === 'ar' ? 'العرض العربي' : 'Arabic display'}</span>
        <ArabicDisplay>نظام واضح</ArabicDisplay>
        <ArabicText>يعتمد العرض العربي على الحجم والوزن والإيقاع، وليس على مفهوم الأحرف الكبيرة.</ArabicText>
      </div>
    </div>
  )
}

function MixedScriptPreview({ locale }: { locale: Locale }) {
  return (
    <div className="mixed-script-grid">
      <div dir="ltr"><strong>Design / تصميم</strong><span>{locale === 'ar' ? 'هيكل LTR مع جزء تسمية عربي' : 'LTR shell with Arabic label segment'}</span></div>
      <div dir="rtl" lang="ar"><strong>Product / منتج</strong><span>{locale === 'ar' ? 'هيكل RTL مع مصطلح منتج إنجليزي' : 'RTL shell with English product term'}</span></div>
      <div dir="rtl" lang="ar"><strong>الإجمالي ١٢ / 24 total</strong><span>{locale === 'ar' ? 'يجب ألا تتصادم الأرقام العربية واللاتينية' : 'Arabic numerals and Latin numbers must not collide'}</span></div>
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

function LogicalLayoutPreview({ locale }: { locale: Locale }) {
  return (
    <div className="logical-layout-grid">
      <article dir="ltr">
        <strong>LTR</strong>
        <span>{locale === 'ar' ? 'Logo / الشعار' : 'Logo'}</span>
        <span>{locale === 'ar' ? 'Search / البحث' : 'Search'}</span>
        <span>{locale === 'ar' ? 'Profile / الملف' : 'Profile'}</span>
      </article>
      <article dir="rtl" lang="ar">
        <strong>RTL</strong>
        <span>الشعار</span>
        <span>البحث</span>
        <span>الملف</span>
      </article>
      <div className="rule-list">
        <span><code>padding-inline-start</code> {locale === 'ar' ? 'بدلا من' : 'instead of'} <code>padding-left</code></span>
        <span><code>margin-inline-end</code> {locale === 'ar' ? 'بدلا من' : 'instead of'} <code>margin-right</code></span>
        <span>{locale === 'ar' ? <>استخدم <code>border-inline-start</code> لعمق التنقل وrails الوثيقة</> : <><code>border-inline-start</code> for nested nav depth and document rails</>}</span>
        <span>{locale === 'ar' ? <>استخدم <code>inset-inline</code> للطبقات والدرج والعناصر العائمة</> : <><code>inset-inline</code> for overlays, drawers, and floating controls</>}</span>
      </div>
    </div>
  )
}

function ShapePreview({ locale }: { locale: Locale }) {
  return (
    <div className="foundation-preview-row">
      <span className="shape-sample control">{locale === 'ar' ? 'عنصر تحكم' : 'Control'}</span>
      <span className="shape-sample surface">{locale === 'ar' ? 'سطح' : 'Surface'}</span>
      <span className="shape-sample round">{locale === 'ar' ? 'دور دائري' : 'Round role'}</span>
    </div>
  )
}

function ThemeVariancePreview({ locale }: { locale: Locale }) {
  return (
    <div className="theme-variance-grid">
      <article><strong>The Utopia Studio Default</strong><span className="theme-variance-square" /> <p>{locale === 'ar' ? 'هندسة مربعة للتحكم والسطح.' : 'Square control and surface geometry.'}</p></article>
      <article><strong>{locale === 'ar' ? 'ثيم مستقبلي مستدير' : 'Future rounded theme'}</strong><span className="theme-variance-rounded" /> <p>{locale === 'ar' ? 'يعيد ربط الأدوار نفسها من دون تغيير كود المكوّن.' : 'Can remap the same semantic roles without changing component code.'}</p></article>
    </div>
  )
}

function MotionScale({ locale }: { locale: Locale }) {
  const items = locale === 'ar' ? [
    ['سريع', '--duration-fast', 'التحويم والتركيز والضغط'],
    ['متوسط', '--duration-medium', 'Accordion وطي التنقل وdisclosure'],
    ['بطيء', '--duration-slow', 'انتقال modal أو shell كبير'],
  ] : [
    ['Fast', '--duration-fast', 'Hover, focus, pressed state'],
    ['Medium', '--duration-medium', 'Accordion, side nav collapse, disclosure'],
    ['Slow', '--duration-slow', 'Large modal or shell transition'],
  ]
  return (
    <div className="motion-scale">
      {items.map(([label, token, use]) => (
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

function DirectionalRules({ locale }: { locale: Locale }) {
  const rows = locale === 'ar' ? [
    ['الأسهم وchevrons', 'تعكس عندما تعني السابق أو التالي أو الفتح أو الإغلاق أو حركة inline.', 'فضّل أيقونات panel المحايدة إلا عندما يكون المعنى اتجاهيا.'],
    ['Progress وstepper', 'اعكس التدفق البصري عندما يتبع تسلسل المنتج اتجاه القراءة.', 'لا تعكس معنى البيانات من دون قاعدة منتج.'],
    ['Sidebar وdrawer', 'استخدم موضع inline-start وinline-end واحفظ حالة التمرير.', 'لا تجعل رابط الصفحة نفسه زر disclosure.'],
    ['Carousel', 'احترم اتجاه الوثيقة وسلوك لوحة المفاتيح.', 'لا تثبت أزرار left/right.'],
    ['التنقل', 'اعكس affordances مع الحفاظ على الترتيب الدلالي.', 'استخدم start/end ولا تخترع نصا عربيا للإنتاج.'],
  ] : [
    ['Arrows / chevrons', 'Mirror when they mean previous/next, open/closed, or inline movement.', 'Prefer direction-neutral panel icons unless the meaning is directional.'],
    ['Progress / stepper', 'Reverse visual flow only when product sequence follows reading direction.', 'Do not reverse data meaning without product rules.'],
    ['Sidebar / drawer', 'Use inline-start/inline-end placement and preserve scroll state.', 'A page link must not also be a disclosure trigger.'],
    ['Carousel', 'Respect document direction and keyboard behavior.', 'Do not hardcode left/right buttons.'],
    ['Navigation', 'Mirror layout affordances while preserving semantic order.', 'Use start/end labels and avoid invented Arabic copy.'],
  ]
  return (
    <table className="docs-table">
      <thead>
        <tr>
          <th>{locale === 'ar' ? 'النمط' : 'Pattern'}</th>
          <th>{locale === 'ar' ? 'قاعدة RTL' : 'RTL Rule'}</th>
          <th>{locale === 'ar' ? 'قاعدة الذكاء الاصطناعي' : 'AI rule'}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([pattern, rule, aiRule]) => (
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

function ElevationPreview({ locale }: { locale: Locale }) {
  return (
    <div className="foundation-surface-grid">
      <article><strong>{locale === 'ar' ? 'السطح الأساسي' : 'Base surface'}</strong><p>{locale === 'ar' ? 'استخدم الحدود وتغير الخلفية قبل الظلال الزخرفية.' : 'Use borders and background shifts before decorative shadows.'}</p></article>
      <article><strong>{locale === 'ar' ? 'السطح المرتفع' : 'Raised surface'}</strong><p>{locale === 'ar' ? 'سطح دلالي مرتفع. يمكن أن يبقى Utopia Default معتمدا على الحدود.' : 'Semantic raised surface. Utopia Default may keep this border-led.'}</p></article>
      <article><strong>Popover</strong><p>{locale === 'ar' ? 'محتوى عائم يدعم Escape والنقر الخارجي وإدارة التركيز.' : 'Floating content with escape/outside-click behavior and focus management.'}</p></article>
      <article><strong>Dialog</strong><p>{locale === 'ar' ? 'سطح modal بخلفية دلالية لا وصفة ظل ثابتة.' : 'Modal surface with semantic backdrop, not a hardcoded shadow recipe.'}</p></article>
    </div>
  )
}

function OverlayRules({ locale }: { locale: Locale }) {
  return (
    <div className="rule-list">
      <span>{locale === 'ar' ? <>استخدم <code>--surface-elevated</code> مع <code>--shadow-popover</code> للواجهة العائمة.</> : <>Use <code>--surface-elevated</code> with <code>--shadow-popover</code> for floating UI.</>}</span>
      <span>{locale === 'ar' ? 'استخدم الحدود كارتفاع في Utopia Default قبل إضافة الظلال.' : 'Use borders as elevation in Utopia Default before adding decorative shadows.'}</span>
      <span>{locale === 'ar' ? 'لا تجعل الارتفاع بديلا عن إدارة التركيز أو Escape أو التسميات القابلة للوصول.' : 'Never let elevation replace focus management, escape behavior, or accessible labels.'}</span>
    </div>
  )
}

function IconPolicy({ locale }: { locale: Locale }) {
  return (
    <div className="foundation-card-grid">
      <article className="foundation-card"><strong>{locale === 'ar' ? 'الجوهر يمتلك slots' : 'Core owns slots'}</strong><p>{locale === 'ar' ? 'تعرض المكونات leading وtrailing وicon-only وتسميات قابلة للوصول.' : 'Components expose leading/trailing/icon-only surfaces and accessible labels.'}</p></article>
      <article className="foundation-card"><strong>{locale === 'ar' ? 'خط أساس shadcn' : 'shadcn baseline'}</strong><p>{locale === 'ar' ? 'استخدم lucide-react كمصدر افتراضي لأيقونات shadcn/ui. يمكن للثيم تقييد ظهورها لكن النظام يدعم الأساس.' : 'Use lucide-react as the default shadcn/ui icon source. Themes may constrain when icons appear, but the system should support the baseline.'}</p></article>
      <article className="foundation-card"><strong>{locale === 'ar' ? 'IconButton مطلوب' : 'IconButton is required'}</strong><p>{locale === 'ar' ? 'إجراءات الأيقونة فقط عناصر تحكم حقيقية لها اسم وtooltip وتركيز وتحويم وضغط.' : 'Icon-only actions are real controls with label, tooltip guidance, focus, hover, and pressed state.'}</p></article>
    </div>
  )
}

function ShadcnIconPreview({ locale }: { locale: Locale }) {
  const icons = locale === 'ar' ? [
    { label: 'بحث', icon: Search, rule: 'حقول البحث ولوحات الأوامر والفلاتر.' },
    { label: 'إعدادات', icon: Settings, rule: 'أيقونة utility محايدة الاتجاه.' },
    { label: 'الرئيسية', icon: Home, rule: 'أيقونة تنقل محايدة الاتجاه.' },
    { label: 'الإشعارات', icon: Bell, rule: 'أسطح الإشعارات والحالة.' },
    { label: 'تنزيل', icon: Download, rule: 'إجراء محايد الاتجاه.' },
    { label: 'Panel', icon: PanelLeft, rule: 'تحكم shell أوsidebar محايد الاتجاه.' },
    { label: 'Chevron', icon: ChevronDown, rule: 'أيقونة disclosure تدور أو تعكس بقصد.' },
    { label: 'سهم لليسار', icon: ArrowLeft, rule: 'أيقونة اتجاهية تعكس أو تستبدل في RTL.' },
    { label: 'سهم لليمين', icon: ArrowRight, rule: 'أيقونة اتجاهية تعكس أو تستبدل في RTL.' },
  ] : [
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
      <p>{locale === 'ar' ? <>تستخدم هذه المعاينات <code>lucide-react</code> المرتبط عادة بـ shadcn/ui. تعرض المكونات slots دلالية وتسميات، ويحدد الثيم درجة ظهور الأيقونات.</> : <>These previews use <code>lucide-react</code>, the icon library commonly paired with shadcn/ui. Components should expose semantic icon slots and labels; themes decide how visible or restrained icon usage should be.</>}</p>
    </>
  )
}

function IconMirroringPreview({ locale }: { locale: Locale }) {
  return (
    <div className="icon-mirroring-grid">
      <article><strong>{locale === 'ar' ? 'اتجاهية' : 'Directional'}</strong><span aria-hidden="true">Back <b>←</b> / Next <b>→</b></span><p>{locale === 'ar' ? 'تعكس لمعاني السابق والتالي والفتح والإغلاق.' : 'Mirror for previous/next and open/close meanings.'}</p></article>
      <article><strong>{locale === 'ar' ? 'محايدة' : 'Neutral'}</strong><span aria-hidden="true">Home · Download · Settings</span><p>{locale === 'ar' ? 'لا تعكس إلا إذا نص الثيم أو المنتج على ذلك.' : 'Do not mirror unless a theme or product rule says so.'}</p></article>
      <article dir="rtl" lang="ar"><strong>RTL</strong><span aria-hidden="true">التالي <b>←</b> / السابق <b>→</b></span><p>{locale === 'ar' ? 'يتبع الاتجاه تدفق القراءة لا أسماء اليسار واليمين المادية.' : 'Direction follows reading flow, not physical left/right naming.'}</p></article>
    </div>
  )
}

function IllustrationRules({ locale }: { locale: Locale }) {
  return (
    <div className="rule-list">
      <span>{locale === 'ar' ? 'استخدم صورة حقيقية للمنتج أو المكان أو الشيء عندما يكون الفحص مهما.' : 'Use real product/place/object imagery when inspection matters.'}</span>
      <span>{locale === 'ar' ? 'لا تستخدم gradients عامة أو زخارف بديلا عن محتوى النظام.' : 'Do not use generic gradients or decorative blobs as a substitute for system content.'}</span>
      <span>{locale === 'ar' ? 'تعمل الحالة الفارغة بالنص وحده قبل إضافة الرسم.' : 'Empty states must work with text-only content before illustration is added.'}</span>
      <span>{locale === 'ar' ? 'تتحقق المعاينة العربية من التخطيط والتوسع وليست نصا للإنتاج.' : 'Arabic previews validate layout and text expansion; they are not production copy.'}</span>
    </div>
  )
}

function IllustrationPreview({ locale }: { locale: Locale }) {
  return (
    <div className="illustration-preview-grid">
      <article className="foundation-empty-state">
        <strong>{locale === 'ar' ? 'لا يلزم رسم' : 'No illustration required'}</strong>
        <p>{locale === 'ar' ? 'يبقى المكوّن مفهوما من دون وسائط زخرفية.' : 'A component must remain understandable without decorative media.'}</p>
      </article>
      <article className="foundation-empty-state media" dir="rtl" lang="ar">
        <span aria-hidden="true" />
        <strong>لا توجد بيانات بعد</strong>
        <p>نص تجريبي للتحقق من الاتجاه والتباعد فقط.</p>
      </article>
    </div>
  )
}

function AiUsageRules({ locale, slug }: { locale: Locale; slug: keyof typeof foundationPages }) {
  const instructions = locale === 'ar' ? `قبل توليد واجهة ${foundationArabicPages[slug].title}:
1. اقرأ packages/design-system/src/manifests/themes.json.
2. اقرأ packages/design-system/src/manifests/theme-utopia-default.json.
3. اقرأ docs/design-system/foundations.md.
4. استخدم التوكنات الدلالية فقط.
5. اختبر dir="rtl" وlang="ar" والنص المختلط وCSS المنطقي ولا تخترع نصا عربيا للإنتاج.` : `Before generating ${foundationPages[slug].title} UI:
1. Read packages/design-system/src/manifests/themes.json.
2. Read packages/design-system/src/manifests/theme-utopia-default.json.
3. Read docs/design-system/foundations.md.
4. Use semantic tokens only.
5. Test dir="rtl", lang="ar", mixed-script labels, logical CSS, and no invented production Arabic copy.`
  return (
    <>
      <div className="code-block">
        <span>agent</span>
        <pre>{instructions}</pre>
      </div>
      <div className="foundation-card-grid">
        <article className="foundation-card"><strong>{locale === 'ar' ? 'قاعدة الاستيراد' : 'Import rule'}</strong><p>{locale === 'ar' ? 'استخدم صادرات Ceramic قبل primitives الخام من shadcn.' : 'Use Ceramic design-system exports before raw shadcn primitives.'}</p></article>
        <article className="foundation-card"><strong>{locale === 'ar' ? 'قاعدة التوكن' : 'Token rule'}</strong><p>{locale === 'ar' ? 'يستهلك الكود العام أدوارا دلالية وتربط ملفات الثيم القيم الأولية.' : 'Reusable code consumes semantic roles; theme files map primitives.'}</p></article>
        <article className="foundation-card"><strong>{locale === 'ar' ? 'قاعدة العربية' : 'Arabic rule'}</strong><p>{locale === 'ar' ? 'دعم العربية يعني RTL أولا وطباعة وعكسا مقصودا واستعدادا للتوطين وفحوص النص المختلط.' : 'Arabic-friendly means RTL-first layout, typography, mirroring, localization tolerance, and mixed-script checks.'}</p></article>
      </div>
    </>
  )
}

function ArabicFoundationCheck({ locale, slug }: { locale: Locale; slug: keyof typeof foundationPages }) {
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

  const arabicRows: Record<keyof typeof foundationPages, string[][]> = {
    'all-tokens': [['النماذج', 'استخدم نماذج المنتج العربية وRTL أدناه كمعاينة إصدار عامة.'], ['التوكنات', 'أكد وجود كل توكنات العربية والتخطيط المنطقي قبل عمل المكوّن.']],
    color: [['ألوان الحالة', 'اختبر hover وfocus-visible وselected وdisabled وdestructive في dir="rtl".'], ['التباين', 'لا تعتمد على اللون وحده عندما تتمدد التسمية والأرقام والشارة العربية.']],
    typography: [['مقياس العرض', 'يتبع العرض العربي نحو 95% من مقياس العرض اللاتيني مع line-height عربي مقروء.'], ['الحالة', 'لا تطبق uppercase أو letter-spacing لاتينيا على النص العربي.']],
    spacing: [['المسافة المنطقية', 'استخدم padding-inline وmargin-inline وborder-inline وأسماء start/end.'], ['عمق التنقل', 'تتراصف rails والشارات وفق inline-start وinline-end لا left/right.']],
    shape: [['هندسة التحكم', 'تعمل أدوار الشكل والحد والحجم بالتساوي في LTR وRTL.'], ['هدف التفاعل', 'لا تصغر التحكم العربي لأن التسمية أطول.']],
    motion: [['الاتجاه', 'تتبع الحركة الاتجاهية inline start/end لا left/right المادي.'], ['Disclosure', 'تعمل حركة الفتح والإغلاق في الاتجاهين من دون قفزة تمرير.']],
    elevation: [['الطبقات', 'يحترم موضع popover وdialog الجانب المنطقي وترتيب التركيز.'], ['التسلسل', 'لا يخفي الارتفاع overflow النص العربي أو الشارات أو رسائل التحقق.']],
    icons: [['العكس', 'تعكس أو تستبدل أيقونات lucide الاتجاهية مثل الأسهم في RTL.'], ['الأيقونات المحايدة', 'تبقى البحث والرئيسية والإعدادات والتنزيل وpanel محايدة الاتجاه.']],
    illustrations: [['الحالات الفارغة', 'تعمل الحالة العربية بالنص أولا من دون وسائط زخرفية.'], ['النص', 'استخدم نصا عربيا تجريبيا لفحص التخطيط ولا تخترع نصا للإنتاج.']],
  }

  return <GuidanceTable locale={locale} rows={locale === 'ar' ? arabicRows[slug] : rows[slug]} />
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

function RoleMatrix({ locale, rows }: { locale: Locale; rows: string[][] }) {
  return (
    <table className="docs-table">
      <thead>
        <tr>
          <th>{locale === 'ar' ? 'الدور' : 'Role'}</th>
          <th>{locale === 'ar' ? 'التوكنات' : 'Tokens'}</th>
          <th>{locale === 'ar' ? 'الاستخدام' : 'Use'}</th>
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

function GuidanceTable({ locale = 'en', rows }: { locale?: Locale; rows: readonly (readonly string[])[] }) {
  return (
    <table className="docs-table guidance-table">
      <thead>
        <tr>
          <th>{locale === 'ar' ? 'القاعدة' : 'Rule'}</th>
          <th>{locale === 'ar' ? 'الإرشاد' : 'Guidance'}</th>
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

function TokenTable({ locale, rows }: { locale: Locale; rows: TokenRow[] }) {
  return (
    <table className="docs-table token-table">
      <thead>
        <tr>
          <th>{locale === 'ar' ? 'التوكن' : 'Token'}</th>
          <th>{locale === 'ar' ? 'القيمة' : 'Value'}</th>
          <th>{locale === 'ar' ? 'الدور' : 'Role'}</th>
          <th>{locale === 'ar' ? 'قاعدة الذكاء الاصطناعي' : 'AI rule'}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td><code>{row.name}</code></td>
            <td>{row.value}</td>
            <td>{locale === 'ar' ? tokenArabicRoles[row.name] ?? row.role : row.role}</td>
            <td>{locale === 'ar' ? tokenArabicRules[row.group] : row.aiRule}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function LibrariesPage() {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'

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
          <p>{isArabic ? 'مكونات وتوكنات وCSS للثيمات وملفات manifest وwrappers مبنية على shadcn وقابلة لإعادة الاستخدام.' : 'Reusable components, tokens, theme CSS, manifests, and shadcn-based wrappers.'}</p>
        </section>
        <section id="cli">
          <h2>@utopia-studio-design/design-system-cli</h2>
          <p>{isArabic ? 'أداة اكتشاف للبشر ووكلاء الذكاء الاصطناعي. تقرأ المصدر نفسه الذي تستخدمه الوثائق وخادم MCP.' : 'Discovery tool for humans and AI agents. It reads the same source used by the docs and MCP server.'}</p>
          <div className="code-block"><span>bash</span><pre>{`npx utopia-ds component --list --dense
npx utopia-ds docs foundations --dense
npx utopia-ds search "Arabic settings form" --json`}</pre></div>
        </section>
        <section id="shadcn">
          <h2>{isArabic ? 'أساس shadcn/ui' : 'shadcn/ui foundation'}</h2>
          <p>{isArabic ? 'يستخدم Ceramic بنية shadcn/ui: سلوك Radix وتركيب Slot ومتغيرات CVA وprimitives قابلة للوصول وتوثيقا بأسلوب registry.' : 'Ceramic uses shadcn/ui as its architecture foundation: Radix behavior, Slot composition, CVA variants, accessible primitives, and registry-style documentation.'}</p>
        </section>
      </article>
    </div>
  )
}
