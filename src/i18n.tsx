import { createContext, useContext, type ReactNode } from 'react'

export type Locale = 'en' | 'ar'

export type Direction = 'ltr' | 'rtl'

type I18nContextValue = {
  dir: Direction
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  children,
  locale,
  setLocale,
}: {
  children: ReactNode
  locale: Locale
  setLocale: (locale: Locale) => void
}) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <I18nContext.Provider
      value={{
        dir,
        locale,
        setLocale,
        toggleLocale: () => setLocale(locale === 'ar' ? 'en' : 'ar'),
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}

const uiText = {
  en: {
    aiRules: 'AI rules',
    arabicFriendly: 'Arabic Friendly',
    arabicMode: 'Arabic',
    arabicPreview: 'Arabic preview',
    bestPractices: 'Best practices',
    browseLibrary: 'Browse the library',
    browseLibraryIntro: 'Every component, with copy-ready examples for every variant, state, and pattern.',
    components: 'Components',
    docs: 'Docs',
    exampleApps: 'Example Apps',
    examples: 'Examples',
    foundations: 'Foundations',
    getStarted: 'Get started',
    gettingStarted: 'Getting Started',
    guide: 'Guide',
    installCoreLibrary: 'Install core library',
    libraries: 'Libraries',
    noCatalogTitle: 'Not in current catalog',
    noCatalogBody: 'This route is outside the current shadcn/ui-based component set.',
    onThisPage: 'On this page',
    overview: 'Overview',
    props: 'Props',
    searchComponents: 'Search components',
    searchComponentsPlaceholder: 'Search components...',
    templates: 'Templates',
    themes: 'Themes',
    tokens: 'Tokens',
    usage: 'Usage',
    whatsNew: "What's New",
  },
  ar: {
    aiRules: 'قواعد الذكاء الاصطناعي',
    arabicFriendly: 'دعم العربية',
    arabicMode: 'العربية',
    arabicPreview: 'معاينة عربية',
    bestPractices: 'أفضل الممارسات',
    browseLibrary: 'تصفح المكتبة',
    browseLibraryIntro: 'كل مكوّن مع أمثلة جاهزة للنسخ لكل متغير وحالة ونمط.',
    components: 'المكونات',
    docs: 'المستندات',
    exampleApps: 'تطبيقات أمثلة',
    examples: 'الأمثلة',
    foundations: 'الأسس',
    getStarted: 'ابدأ الآن',
    gettingStarted: 'البدء',
    guide: 'الدليل',
    installCoreLibrary: 'ثبّت المكتبة الأساسية',
    libraries: 'المكتبات',
    noCatalogTitle: 'غير موجود في الكتالوج الحالي',
    noCatalogBody: 'هذا المسار خارج مجموعة المكونات الحالية المبنية على shadcn/ui.',
    onThisPage: 'في هذه الصفحة',
    overview: 'نظرة عامة',
    props: 'الخصائص',
    searchComponents: 'بحث في المكونات',
    searchComponentsPlaceholder: 'ابحث في المكونات...',
    templates: 'القوالب',
    themes: 'الثيمات',
    tokens: 'التوكنات',
    usage: 'الاستخدام',
    whatsNew: 'ما الجديد',
  },
} as const

export type UiTextKey = keyof typeof uiText.en

export function t(locale: Locale, key: UiTextKey) {
  return uiText[locale][key] ?? uiText.en[key]
}

const routeLabels: Record<string, Record<Locale, string>> = {
  docs: { en: 'Docs', ar: 'المستندات' },
  components: { en: 'Components', ar: 'المكونات' },
  templates: { en: 'Templates', ar: 'القوالب' },
  themes: { en: 'Themes', ar: 'الثيمات' },
}

const categoryLabels: Record<string, Record<Locale, string>> = {
  Action: { en: 'Action', ar: 'الإجراءات' },
  'Data Display': { en: 'Data Display', ar: 'عرض البيانات' },
  Feedback: { en: 'Feedback', ar: 'التنبيهات' },
  Forms: { en: 'Forms', ar: 'النماذج' },
  Guide: { en: 'Guide', ar: 'الدليل' },
  Foundations: { en: 'Foundations', ar: 'الأسس' },
  Libraries: { en: 'Libraries', ar: 'المكتبات' },
  Layout: { en: 'Layout', ar: 'التخطيط' },
  'Mobile Navigation': { en: 'Mobile Navigation', ar: 'تنقل الجوال' },
  Navigation: { en: 'Navigation', ar: 'التنقل' },
  'Side Navigation': { en: 'Side Navigation', ar: 'التنقل الجانبي' },
  Surfaces: { en: 'Surfaces', ar: 'الأسطح' },
  'Top Navigation': { en: 'Top Navigation', ar: 'التنقل العلوي' },
}

const docsLabels: Record<string, Record<Locale, string>> = {
  'All Tokens': { en: 'All Tokens', ar: 'كل التوكنات' },
  'AI rules': { en: 'AI rules', ar: 'قواعد الذكاء الاصطناعي' },
  'Arabic Friendly': { en: 'Arabic Friendly', ar: 'دعم العربية' },
  'Arabic / RTL check': { en: 'Arabic / RTL check', ar: 'فحص العربية وRTL' },
  'Arabic / RTL mockups': { en: 'Arabic / RTL mockups', ar: 'نماذج عربية وRTL' },
  'Arabic Display': { en: 'Arabic Display', ar: 'العرض العربي' },
  'App & Website': { en: 'App & Website', ar: 'التطبيق والموقع' },
  'Active': { en: 'Active', ar: 'النشطة' },
  'Application Flow': { en: 'Application Flow', ar: 'مسار التقديم' },
  Architecture: { en: 'Architecture', ar: 'البنية' },
  'Barrier Intelligence': { en: 'Barrier Intelligence', ar: 'Barrier Intelligence' },
  'Best Practices': { en: 'Best Practices', ar: 'أفضل الممارسات' },
  'Best practices': { en: 'Best practices', ar: 'أفضل الممارسات' },
  Color: { en: 'Color', ar: 'اللون' },
  Components: { en: 'Components', ar: 'المكونات' },
  'Color Roles': { en: 'Color Roles', ar: 'أدوار اللون' },
  Elevation: { en: 'Elevation', ar: 'الارتفاع' },
  'Dextrum Typography': { en: 'Dextrum Typography', ar: 'طباعة Dextrum' },
  Docs: { en: 'Docs', ar: 'المستندات' },
  'Directional Icons': { en: 'Directional Icons', ar: 'الأيقونات الاتجاهية' },
  'Editorial Resource': { en: 'Editorial Resource', ar: 'المورد التحريري' },
  Examples: { en: 'Examples', ar: 'الأمثلة' },
  'Getting Started': { en: 'Getting Started', ar: 'البدء' },
  Icons: { en: 'Icons', ar: 'الأيقونات' },
  Illustrations: { en: 'Illustrations', ar: 'الرسوم' },
  'Migration Guide': { en: 'Migration Guide', ar: 'دليل الانتقال' },
  'Marketing & Sales': { en: 'Marketing & Sales', ar: 'التسويق والمبيعات' },
  'Localized Typography': { en: 'Localized Typography', ar: 'الطباعة المحلية' },
  'Mixed Script': { en: 'Mixed Script', ar: 'النص المختلط' },
  Motion: { en: 'Motion', ar: 'الحركة' },
  Overview: { en: 'Overview', ar: 'نظرة عامة' },
  Principles: { en: 'Principles', ar: 'المبادئ' },
  Props: { en: 'Props', ar: 'الخصائص' },
  'Quick Start with AI': { en: 'Quick Start with AI', ar: 'بدء سريع مع الذكاء الاصطناعي' },
  'Operator Console': { en: 'Operator Console', ar: 'وحدة المشغّل' },
  'Planned Theme Slots': { en: 'Planned Theme Slots', ar: 'مساحات الثيمات المستقبلية' },
  'Product / SaaS': { en: 'Product / SaaS', ar: 'المنتج وSaaS' },
  'Production Examples': { en: 'Production Examples', ar: 'أمثلة الإنتاج' },
  'RTL Layout': { en: 'RTL Layout', ar: 'تخطيط RTL' },
  'SaaS Solution Website': { en: 'SaaS Solution Website', ar: 'موقع متكامل لحل SaaS' },
  Shape: { en: 'Shape', ar: 'الشكل' },
  Spacing: { en: 'Spacing', ar: 'المسافات' },
  'Styling Components': { en: 'Styling Components', ar: 'تنسيق المكونات' },
  'Styling Library Interop': { en: 'Styling Library Interop', ar: 'تكامل مكتبات التنسيق' },
  'The Utopia Studio Default': { en: 'The Utopia Studio Default', ar: 'ثيم The Utopia Studio الافتراضي' },
  'Theme System': { en: 'Theme System', ar: 'نظام الثيمات' },
  Templates: { en: 'Templates', ar: 'القوالب' },
  Themes: { en: 'Themes', ar: 'الثيمات' },
  'shadcn/ui foundation': { en: 'shadcn/ui foundation', ar: 'أساس shadcn/ui' },
  Tokens: { en: 'Tokens', ar: 'التوكنات' },
  Typography: { en: 'Typography', ar: 'الطباعة' },
  'Venture Proof': { en: 'Venture Proof', ar: 'إثبات المشاريع' },
  'Website Pages': { en: 'Website Pages', ar: 'صفحات المواقع' },
  Usage: { en: 'Usage', ar: 'الاستخدام' },
  "What's New": { en: "What's New", ar: 'ما الجديد' },
  'Working with AI': { en: 'Working with AI', ar: 'العمل مع الذكاء الاصطناعي' },
  '@utopia-studio-design/cli': { en: '@utopia-studio-design/cli', ar: '@utopia-studio-design/cli' },
  '@utopia-studio-design/design-system': {
    en: '@utopia-studio-design/design-system',
    ar: '@utopia-studio-design/design-system',
  },
}

const componentLabels: Record<string, string> = {
  Accordion: 'أكورديون',
  'Account Status': 'حالة الحساب',
  Alert: 'تنبيه',
  'Alert Dialog': 'حوار التنبيه',
  'Aspect Ratio': 'نسبة العرض',
  Attachment: 'مرفق',
  Avatar: 'الصورة الرمزية',
  Badge: 'شارة',
  Breadcrumb: 'مسار التنقل',
  Bubble: 'فقاعة',
  Button: 'زر',
  'Button Group': 'مجموعة أزرار',
  Calendar: 'تقويم',
  Card: 'بطاقة',
  Carousel: 'عارض شرائح',
  Chart: 'مخطط',
  'Chat Composer': 'مؤلف المحادثة',
  'Chat Composer Drawer': 'درج مؤلف المحادثة',
  'Chat Composer Input': 'إدخال مؤلف المحادثة',
  'Chat Composer Token Element': 'عنصر توكن في المؤلف',
  'Chat Dictation Button': 'زر الإملاء',
  'Chat Layout': 'تخطيط المحادثة',
  'Chat Layout Scroll Button': 'زر تمرير المحادثة',
  'Chat Message': 'رسالة المحادثة',
  'Chat Message Bubble': 'فقاعة رسالة',
  'Chat Message List': 'قائمة رسائل المحادثة',
  'Chat Message Metadata': 'بيانات رسالة المحادثة',
  'Chat Send Button': 'زر إرسال المحادثة',
  'Chat System Message': 'رسالة نظام المحادثة',
  'Chat Tokenized Text': 'نص محادثة مكوّن من توكنات',
  'Chat Tool Calls': 'استدعاءات أدوات المحادثة',
  Checkbox: 'مربع اختيار',
  Collapsible: 'قسم قابل للطي',
  Combobox: 'مربع اختيار وبحث',
  Command: 'لوحة الأوامر',
  'Context Menu': 'قائمة السياق',
  'Data Table': 'جدول بيانات',
  'Date Picker': 'منتقي التاريخ',
  Dialog: 'حوار',
  Direction: 'الاتجاه',
  Drawer: 'درج',
  'Dropdown Menu': 'قائمة منسدلة',
  Empty: 'حالة فارغة',
  Field: 'حقل',
  'Hover Card': 'بطاقة عند التحويم',
  'Icon Button': 'زر أيقونة',
  Input: 'إدخال',
  'Input Group': 'مجموعة إدخال',
  'Input OTP': 'إدخال رمز تحقق',
  Item: 'عنصر',
  Kbd: 'مفتاح لوحة',
  Label: 'تسمية',
  Menubar: 'شريط القوائم',
  'Mobile Nav': 'تنقل الجوال',
  'Mobile Nav Toggle': 'زر تبديل تنقل الجوال',
  'Native Select': 'اختيار أصلي',
  'Nav Heading Menu': 'قائمة عنوان التنقل',
  'Nav Icon': 'أيقونة التنقل',
  'Navigation Menu': 'قائمة التنقل',
  Pagination: 'ترقيم الصفحات',
  Popover: 'نافذة منبثقة',
  Progress: 'تقدم',
  'Radio Group': 'مجموعة أزرار اختيار',
  Resizable: 'قابل لتغيير الحجم',
  'Scroll Area': 'منطقة تمرير',
  Select: 'اختيار',
  Separator: 'فاصل',
  Sheet: 'لوحة جانبية',
  'Side Nav': 'تنقل جانبي',
  'Side Nav Collapse Button': 'زر طي التنقل الجانبي',
  'Side Nav Heading': 'عنوان التنقل الجانبي',
  'Side Nav Item': 'عنصر التنقل الجانبي',
  'Side Nav Section': 'قسم التنقل الجانبي',
  Skeleton: 'هيكل تحميل',
  Slider: 'منزلق',
  Sonner: 'إشعار Sonner',
  Spinner: 'مؤشر تحميل',
  Switch: 'مفتاح تبديل',
  Table: 'جدول',
  Tabs: 'تبويبات',
  Textarea: 'منطقة نص',
  Toast: 'إشعار',
  'Toggle Button': 'زر تبديل',
  'Toggle Button Group': 'مجموعة أزرار تبديل',
  Tooltip: 'تلميح',
  'Top Nav': 'تنقل علوي',
  'Top Nav Heading': 'عنوان التنقل العلوي',
  'Top Nav Item': 'عنصر التنقل العلوي',
  'Top Nav Mega Menu': 'قائمة علوية كبيرة',
  'Top Nav Mega Menu Featured Card': 'بطاقة مميزة في القائمة العلوية',
  'Top Nav Mega Menu Item': 'عنصر في القائمة العلوية الكبيرة',
  'Top Nav Menu': 'قائمة التنقل العلوي',
  Typography: 'الطباعة',
}

export function routeLabel(locale: Locale, id: string, fallback: string) {
  return routeLabels[id]?.[locale] ?? fallback
}

export function categoryLabel(locale: Locale, label: string) {
  return categoryLabels[label]?.[locale] ?? label
}

export function docsLabel(locale: Locale, label: string) {
  return docsLabels[label]?.[locale] ?? label
}

export function componentLabel(locale: Locale, name: string) {
  return locale === 'ar' ? componentLabels[name] ?? name : name
}

export function sideNavLabel(locale: Locale, label: string) {
  return componentLabel(locale, docsLabel(locale, categoryLabel(locale, label)))
}

export function componentIntro(locale: Locale, name: string) {
  if (locale !== 'ar') return null
  const localizedName = componentLabel(locale, name)
  return `صفحة ${localizedName} تعرض الاستخدام والخصائص والحالات الأساسية وفق بنية shadcn/ui وتوكنات Ceramic الدلالية ودعم RTL.`
}
