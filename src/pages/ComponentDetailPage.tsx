import { useState, type ElementType, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Archive, Bell, Box, CalendarPlus, Clock, Component, FileCode, FileText, ListFilter, LoaderCircle, MailOpen, Menu, MoreHorizontal, Search, Tag, Trash2, UserCircle, X } from 'lucide-react'
import { components, slugify } from '../data/design-system'
import { Badge } from '../../packages/design-system/src/Badge'
import { Button } from '../../packages/design-system/src/Button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '../../packages/design-system/src/ButtonGroup'
import { IconButton } from '../../packages/design-system/src/IconButton'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../packages/design-system/src/Card'
import { Field, FieldLabel, TextInput, TextArea, Checkbox, RadioGroup, RadioGroupItem, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Slider, Switch } from '../../packages/design-system/src/Forms'
import { AspectRatio, Center, Grid, HStack, VStack } from '../../packages/design-system/src/Layout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../packages/design-system/src/Accordion'
import { Alert, AlertDescription, AlertTitle } from '../../packages/design-system/src/Alert'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../packages/design-system/src/AlertDialog'
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from '../../packages/design-system/src/Attachment'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, CommandPalette, CommandPaletteEmpty, CommandPaletteGroup, CommandPaletteInput, CommandPaletteItem, CommandPaletteList, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, MobileNav, MobileNavContent, MobileNavToggle, MobileNavTrigger, NavHeadingMenu, NavHeadingMenuContent, NavHeadingMenuTrigger, NavIcon, PanelIcon, SideNav, SideNavCollapseButton, SideNavContent, SideNavHeading, SideNavItem, SideNavSection, Tab, TabList, TabPanel, Tabs, TopNav, TopNavHeading, TopNavItem, TopNavMegaMenu, TopNavMegaMenuFeaturedCard, TopNavMegaMenuItem, TopNavMenu, TopNavMenuItem } from '../../packages/design-system/src/Navigation'
import { HoverCard, HoverCardContent, HoverCardTrigger, Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../packages/design-system/src/Surface'
import { ToggleButton } from '../../packages/design-system/src/ToggleButton'
import { ToggleButtonGroup, ToggleButtonGroupItem } from '../../packages/design-system/src/ToggleButtonGroup'
import { AccountStatus, Avatar, AvatarGroup, AvatarOverflow, Calendar, EmptyState, ProgressBar, Skeleton, Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Toast, ToastDescription, ToastTitle } from '../../packages/design-system/src/DataDisplay'
import * as ShadcnPrimitives from '../../packages/design-system/src/ShadcnPrimitives'
import { ArabicText, Heading, Prose, Text } from '../../packages/design-system/src/Typography'
import { componentIntro, componentLabel, t, useI18n, type Locale } from '../i18n'

type ComponentDetailPageProps = {
  componentId: string
  tab?: string
}

export function ComponentDetailPage({ componentId, tab = 'overview' }: ComponentDetailPageProps) {
  const { locale } = useI18n()
  const aliases: Record<string, string> = {
    markernew: 'marker',
    messagenew: 'message',
    'message-scrollernew': 'message-scroller',
    sidebar: 'side-nav',
    progressbar: 'progress',
    'text-area': 'textarea',
    toggle: 'toggle-button',
    'toggle-group': 'toggle-button-group',
  }
  const resolvedComponentId = aliases[componentId] ?? componentId
  const entry = components.components.find((component) => slugify(component.name) === resolvedComponentId)

  if (!entry) {
    return (
      <div className="page">
        <section className="page-hero compact">
          <p className="eyebrow">{t(locale, 'components')}</p>
          <h1>{t(locale, 'noCatalogTitle')}</h1>
          <p>{t(locale, 'noCatalogBody')}</p>
        </section>
      </div>
    )
  }

  if (entry.name === 'Button') return <ButtonDetailPage tab={tab} />
  if (entry.name === 'Icon Button') return <IconButtonDetailPage tab={tab} />
  if (entry.name === 'Button Group') return <ButtonGroupDetailPage tab={tab} />
  if (entry.name === 'Alert') return <AlertDetailPage tab={tab} />
  if (entry.name === 'Avatar') return <AvatarDetailPage tab={tab} />
  if (entry.name === 'Badge') return <BadgeDetailPage tab={tab} />
  if (entry.name === 'Dropdown Menu') return <DropdownMenuDetailPage tab={tab} />
  if (entry.name === 'Select') return <SelectDetailPage tab={tab} />
  if (entry.name === 'Toggle Button') return <ToggleButtonDetailPage tab={tab} name="Toggle Button" />
  if (entry.name === 'Toggle Button Group') return <ToggleButtonGroupDetailPage tab={tab} name="Toggle Button Group" />

  return <GenericComponentDetailPage entry={entry} tab={tab} />
}

function ButtonDetailPage({ tab }: { tab: string }) {
  const { locale } = useI18n()
  const [label, setLabel] = useState('Click me')
  const [variant, setVariant] = useState<'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'>('default')
  const [size, setSize] = useState<'sm' | 'default' | 'lg' | 'icon'>('default')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [startContent, setStartContent] = useState(false)
  const [endContent, setEndContent] = useState(false)
  const [isIconOnly, setIsIconOnly] = useState(false)
  const [buttonType, setButtonType] = useState<'button' | 'submit' | 'reset'>('button')
  const isProperties = tab === 'properties'
  const isArabic = locale === 'ar'
  const previewLabel = isArabic && label === 'Click me' ? 'اضغط' : label.trim() || (isArabic ? 'زر' : 'Button')
  const buttonCopy = {
    primary: isArabic ? 'أساسي' : 'Primary',
    secondary: isArabic ? 'ثانوي' : 'Secondary',
    ghost: isArabic ? 'هادئ' : 'Ghost',
    destructive: isArabic ? 'حذف' : 'Destructive',
    outline: isArabic ? 'حدود' : 'Outline',
    small: isArabic ? 'صغير' : 'Small',
    defaultSize: isArabic ? 'افتراضي' : 'Default',
    large: isArabic ? 'كبير' : 'Large',
    disabled: isArabic ? 'معطل' : 'Disabled',
    rest: isArabic ? 'عادي' : 'Rest',
    hover: isArabic ? 'تحويم' : 'Hover',
    focus: isArabic ? 'تركيز' : 'Focus',
    pressed: isArabic ? 'مضغوط' : 'Pressed',
    progress: isArabic ? 'حالات التقدم' : 'Progress states',
    saving: isArabic ? 'جار الحفظ' : 'Saving',
    sending: isArabic ? 'جار الإرسال' : 'Sending',
    save: isArabic ? 'حفظ' : 'Save',
    sendInvite: isArabic ? 'إرسال دعوة' : 'Send invite',
    newProject: isArabic ? 'مشروع جديد' : 'New project',
    notifications: isArabic ? 'الإشعارات' : 'Notifications',
    updates: isArabic ? 'التحديثات' : 'Updates',
    newBadge: isArabic ? 'جديد' : 'New',
    beta: isArabic ? 'تجريبي' : 'Beta',
    addItem: isArabic ? 'إضافة عنصر' : 'Add item',
    moreOptions: isArabic ? 'خيارات أكثر' : 'More options',
    deleteItem: isArabic ? 'حذف عنصر' : 'Delete item',
    openSettings: isArabic ? 'فتح الإعدادات' : 'Open settings',
    architecture: isArabic ? 'البنية' : 'Architecture',
    motion: isArabic ? 'الحركة' : 'Motion',
    aiReadable: isArabic ? 'مقروء للذكاء الاصطناعي' : 'AI-readable',
    examplesIntro: isArabic ? 'تكوينات وحالات وتغيرات أساسية للزر.' : 'Common configurations, variations, and states.',
  }

  return (
    <div className="page component-doc-page">
      <section className="component-doc-hero">
        <h1>{componentLabel(locale, 'Button')}</h1>
        <p>@utopia-studio-design/design-system v0.1.0 · Button</p>
        <nav className="component-tabs" aria-label="Button documentation views">
          <a href="#/components/button#overview" aria-current={isProperties ? undefined : 'page'}>{t(locale, 'overview')}</a>
          <a href="#/components/button?tab=properties#props" aria-current={isProperties ? 'page' : undefined}>{t(locale, 'props')}</a>
        </nav>
      </section>

      {isProperties ? (
        <article className="docs-article">
          <section id="props">
            <div className="component-stage properties-stage">
              <Button
                aria-label={isIconOnly ? previewLabel : undefined}
                disabled={disabled}
                endContent={endContent && !isIconOnly ? <Badge variant="secondary">3</Badge> : undefined}
                isIconOnly={isIconOnly}
                loading={loading}
                loadingText={isArabic ? 'جار العمل' : 'Working'}
                size={size}
                startContent={startContent && !isIconOnly ? '+' : undefined}
                type={buttonType}
                variant={variant}
              >
                {isIconOnly || size === 'icon' ? previewLabel.slice(0, 1).toUpperCase() : previewLabel}
              </Button>
            </div>
            <h2>{t(locale, 'props')}</h2>
            <p>{isArabic ? 'غيّر قيمة الخاصية لتحديث المعاينة أعلاه.' : 'Change a prop value to update the preview above.'}</p>
            <div className="props-table">
              <div className="prop-row">
                <strong>children</strong>
                <div>
                  <code>ReactNode</code>
                  <p>{isArabic ? 'محتوى الزر المرئي.' : 'Visible button content.'}</p>
                </div>
                <div className="prop-control">
                  <PropTextControl label="children value" onChange={setLabel} value={label} />
                </div>
              </div>
              <div className="prop-row">
                <strong>variant</strong>
                <div>
                  <code>'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'</code>
                  <p>{isArabic ? 'متغير النمط المرئي.' : 'Visual style variant.'}</p>
                </div>
                <div className="prop-control">
                  <PropSelectControl label="variant value" onChange={(value) => setVariant(value as typeof variant)} options={['default', 'secondary', 'outline', 'ghost', 'destructive']} value={variant} />
                </div>
              </div>
              <div className="prop-row">
                <strong>size</strong>
                <div>
                  <code>'sm' | 'default' | 'lg' | 'icon'</code>
                  <p>{isArabic ? 'متغير الحجم.' : 'Size variant.'}</p>
                </div>
                <div className="prop-control">
                  <PropSelectControl label="size value" onChange={(value) => setSize(value as typeof size)} options={['sm', 'default', 'lg', 'icon']} value={size} />
                </div>
              </div>
              <div className="prop-row">
                <strong>disabled</strong>
                <div>
                  <code>boolean</code>
                  <p>{isArabic ? 'يعطل الزر.' : 'Disables the button.'}</p>
                </div>
                <div className="prop-control">
                  <PropBooleanControl checked={disabled} label="disabled value" onChange={setDisabled} />
                </div>
              </div>
              <div className="prop-row">
                <strong>loading</strong>
                <div>
                  <code>boolean</code>
                  <p>{isArabic ? 'يعرض حالة تقدم ويضبط aria-busy ويمنع التفعيل المتكرر.' : 'Shows progress, sets aria-busy, and prevents duplicate activation.'}</p>
                </div>
                <div className="prop-control">
                  <PropBooleanControl checked={loading} label="loading value" onChange={setLoading} />
                </div>
              </div>
              <div className="prop-row">
                <strong>startContent</strong>
                <div>
                  <code>ReactNode</code>
                  <p>{isArabic ? 'محتوى البداية قبل التسمية المرئية. استخدم علامات نصية أو رموزا يقرها الثيم.' : 'Leading content rendered before the visible label. Use text marks or theme-approved symbols.'}</p>
                </div>
                <div className="prop-control">
                  <PropBooleanControl checked={startContent} label="startContent value" onChange={setStartContent} />
                </div>
              </div>
              <div className="prop-row">
                <strong>endContent</strong>
                <div>
                  <code>ReactNode</code>
                  <p>{isArabic ? 'محتوى النهاية بعد التسمية، مثل عداد أو شارة حالة قصيرة.' : 'Trailing content rendered after the label, commonly a count or short status badge.'}</p>
                </div>
                <div className="prop-control">
                  <PropBooleanControl checked={endContent} label="endContent value" onChange={setEndContent} />
                </div>
              </div>
              <div className="prop-row">
                <strong>isIconOnly</strong>
                <div>
                  <code>boolean</code>
                  <p>{isArabic ? 'يعرض زرا مربعا. وفر aria-label عندما يكون النص المرئي مختصرا.' : 'Renders a square button. Always provide aria-label when visible text is shortened.'}</p>
                </div>
                <div className="prop-control">
                  <PropBooleanControl checked={isIconOnly} label="isIconOnly value" onChange={setIsIconOnly} />
                </div>
              </div>
              <div className="prop-row">
                <strong>type</strong>
                <div>
                  <code>'button' | 'submit' | 'reset'</code>
                  <p>{isArabic ? 'خاصية type لزر HTML.' : 'HTML button type attribute.'}</p>
                </div>
                <div className="prop-control">
                  <PropSelectControl label="type value" onChange={(value) => setButtonType(value as typeof buttonType)} options={['button', 'submit', 'reset']} value={buttonType} />
                </div>
              </div>
              <div className="prop-row">
                <strong>asChild</strong>
                <div>
                  <code>boolean</code>
                  <p>{isArabic ? 'يعرض عبر Radix Slot للتركيب.' : 'Render through Radix Slot for composition.'}</p>
                </div>
                <div className="prop-control">
                  <PropBooleanControl label="asChild value" />
                </div>
              </div>
            </div>
          </section>
        </article>
      ) : (
      <article className="docs-article">
        <section id="overview">
          <div className="component-stage">
            <div className="component-stage-actions">
              <Button>{buttonCopy.primary}</Button>
              <Button variant="secondary">{buttonCopy.secondary}</Button>
              <Button variant="ghost">{buttonCopy.ghost}</Button>
              <Button variant="destructive">{buttonCopy.destructive}</Button>
            </div>
          </div>
          <div className="overview-contract">
            <div>
              <h2>{buttonCopy.architecture}</h2>
              <p>
                {isArabic ? <>يتبع زر Ceramic معيار المكونات: بنية متوافقة مع shadcn/ui، وتركيب Radix Slot عبر <code>asChild</code>، ومتغيرات CVA، وأصناف CSS دلالية، وتنسيق يعتمد على التوكنات مثل <code>--primary</code> و<code>--secondary</code> و<code>--radius-control</code> بدلا من تثبيت قيم Utopia Default داخل المكوّن.</> : <>Button follows the Utopia Design System component standard: shadcn/ui-compatible structure,
                Radix Slot composition through <code>asChild</code>, CVA variants, semantic CSS classes,
                and token-driven styling. Components consume roles such as <code>--primary</code>,
                <code>--secondary</code>, <code>--radius-control</code>, and <code>--button-height</code>
                instead of hardcoding Utopia Default brand primitives.</>}
              </p>
            </div>
            <div>
              <h2>{buttonCopy.motion}</h2>
              <p>
                {isArabic ? 'الحركة جزء من عقد نظام التصميم. تستخدم التفاعلات توكنات مدة وتسهيل دلالية، ويمكن استخدام Framer Motion عندما يحتاج المكوّن إلى انتقالات حالة أوضح دون تحويل الحركة إلى زخرفة.' : <>Motion belongs to the design-system contract. Interaction timing uses semantic duration and easing
                tokens, and richer transitions can be implemented with Framer Motion when a component needs
                choreographed state changes. Motion should clarify state, never become decorative noise.</>}
              </p>
            </div>
            <div>
              <h2>{buttonCopy.aiReadable}</h2>
              <p>
                {isArabic ? 'تعرض صفحة الزر الاستيراد الجاهز للنسخ والخصائص التفاعلية والتوكنات المطلوبة والأمثلة وأمر CLI كثيف حتى يختار الوكيل الزر الصحيح دون اختراع أنماط محلية.' : 'Button exposes copy-paste imports, interactive props, token requirements, examples, and a dense CLI command so AI agents can choose the correct action primitive without inventing local button styles.'}
              </p>
            </div>
            <div>
              <h2>{t(locale, 'arabicFriendly')}</h2>
              <p>
                {isArabic ? <>دعم العربية يعني أن كل مكوّن جاهز لمنتجات عربية ومختلطة اللغة: يدعم <code>dir="rtl"</code>، يستخدم APIs منطقية مثل start/end، يتجنب افتراضات left/right، ويحافظ على قابلية القراءة بين العربية واللاتينية دون اختراع نص عربي إنتاجي.</> : <>Arabic-friendly means every primitive should be ready for Arabic and mixed-script products:
                support <code>dir="rtl"</code>, prefer logical start/end APIs, avoid left/right assumptions,
                preserve readable typography across Latin and Arabic scripts, and never invent Arabic copy.
                The goal is for Utopia Design System to become a serious foundation for Arabic-region products,
                not a left-to-right system with RTL added later.</>}
              </p>
            </div>
          </div>
        </section>

        <section id="usage">
          <h2>{t(locale, 'usage')}</h2>
          <p>{isArabic ? 'الزر يشغّل إجراء عند النقر. استخدمه للإرسال والتأكيدات والتفاعلات التي تحتاج إلى دعوة واضحة للفعل.' : 'Button triggers an action when clicked. Use it for form submissions, confirmations, and interactions that need a clear call to action.'}</p>
          <div className="code-block">
            <span>tsx</span>
            <pre>{isArabic ? `import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button>حفظ التغييرات</Button>;
}` : `import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button>Save changes</Button>;
}`}</pre>
          </div>
        </section>

        <section id="examples">
          <h2>{t(locale, 'examples')}</h2>
          <p>{buttonCopy.examplesIntro}</p>
	          <ExampleCard title={isArabic ? 'الزر - الأحجام' : 'Button - Sizes'} description={isArabic ? 'أزرار صغيرة وافتراضية وكبيرة بجانب بعضها. استخدم الصغير في الواجهات الكثيفة والكبير للدعوات البارزة.' : 'Small, default, and large buttons side by side. Use small in dense UIs, default for most cases, and large for prominent CTAs.'}>
	            <div className="example-stack">
	              <span>{buttonCopy.primary}</span>
	              <div className="component-example">
	                <Button size="sm">{buttonCopy.small}</Button>
	                <Button>{buttonCopy.defaultSize}</Button>
	                <Button size="lg">{buttonCopy.large}</Button>
	              </div>
	              <span>{buttonCopy.secondary}</span>
	              <div className="component-example">
	                <Button size="sm" variant="secondary">{buttonCopy.small}</Button>
	                <Button variant="secondary">{buttonCopy.defaultSize}</Button>
	                <Button size="lg" variant="secondary">{buttonCopy.large}</Button>
	              </div>
	            </div>
	          </ExampleCard>

	          <ExampleCard title={isArabic ? 'الزر - المتغيرات' : 'Button - Variants'} description={isArabic ? 'استخدم الأساسي للإجراء الأهم، والثانوي للإجراءات المساندة، والهادئ للإجراءات الأقل بروزا، والحذف للإجراءات الخطرة.' : 'Use primary for the main action, secondary for supporting actions, ghost for low-emphasis actions, and destructive for dangerous actions.'}>
	            <div className="example-stack">
	              <span>{buttonCopy.defaultSize}</span>
	              <div className="component-example">
	                <Button>{buttonCopy.primary}</Button>
	                <Button variant="secondary">{buttonCopy.secondary}</Button>
	                <Button variant="ghost">{buttonCopy.ghost}</Button>
	                <Button variant="destructive">{buttonCopy.destructive}</Button>
	              </div>
	              <span>{buttonCopy.disabled}</span>
	              <div className="component-example">
	                <Button disabled>{buttonCopy.primary}</Button>
	                <Button disabled variant="secondary">{buttonCopy.secondary}</Button>
	                <Button disabled variant="ghost">{buttonCopy.ghost}</Button>
	                <Button disabled variant="destructive">{buttonCopy.destructive}</Button>
	              </div>
	            </div>
	          </ExampleCard>

	          <ExampleCard title={isArabic ? 'الزر - الحالات' : 'Button - States'} description={isArabic ? 'يعرض الزر حالات التحويم والتركيز والضغط والتعطيل عبر توكنات دلالية ليعرّف كل ثيم لغته التفاعلية.' : 'Buttons expose hover, focus-visible, pressed, and disabled states. These states use semantic tokens so each theme can define its own interaction language.'}>
	            <div className="example-stack">
	              <span>{isArabic ? 'حالات المتغير الأساسي' : 'Default variant states'}</span>
	              <div className="component-example">
	                <Button>{buttonCopy.rest}</Button>
	                <Button className="uds-button-state-hover">{buttonCopy.hover}</Button>
	                <Button className="uds-button-state-focus">{buttonCopy.focus}</Button>
	                <Button className="uds-button-state-active">{buttonCopy.pressed}</Button>
	                <Button disabled>{buttonCopy.disabled}</Button>
	              </div>
	              <span>{isArabic ? 'حالات الحذف' : 'Destructive states'}</span>
	              <div className="component-example">
	                <Button variant="destructive">{buttonCopy.rest}</Button>
	                <Button className="uds-button-state-hover" variant="destructive">{buttonCopy.hover}</Button>
	                <Button className="uds-button-state-focus" variant="destructive">{buttonCopy.focus}</Button>
	                <Button className="uds-button-state-active" variant="destructive">{buttonCopy.pressed}</Button>
	                <Button disabled variant="destructive">{buttonCopy.disabled}</Button>
	              </div>
	            </div>
	          </ExampleCard>

	          <ExampleCard title={isArabic ? 'الزر - التحميل' : 'Button - Loading'} description={isArabic ? 'استخدم التحميل عندما يكون الإجراء قيد التنفيذ. يعلن الزر حالة الانشغال ويمنع التفعيل المكرر.' : 'Use loading when an action is in progress. The button announces busy state and blocks duplicate activation while the task is pending.'}>
	            <div className="example-stack">
	              <span>{buttonCopy.progress}</span>
	              <div className="component-example">
	                <Button loading loadingText={buttonCopy.saving}>{buttonCopy.save}</Button>
	                <Button loading loadingText={buttonCopy.sending} variant="secondary">{buttonCopy.sendInvite}</Button>
	                <Button loading aria-label={isArabic ? 'تحميل المزيد' : 'Loading more'} isIconOnly>+</Button>
	              </div>
	            </div>
	          </ExampleCard>

	          <ExampleCard title={isArabic ? 'الزر - مواضع البداية والنهاية' : 'Button - Slots'} description={isArabic ? 'استخدم محتوى البداية والنهاية للبيانات القصيرة مثل العلامات والعدادات وشارات الحالة.' : 'Use start and end content for compact metadata such as signs, counts, or short status labels. Do not use theme-specific icon rules in the reusable primitive.'}>
	            <div className="example-stack">
	              <span>{isArabic ? 'علامات نصية وشارات' : 'Text marks and badges'}</span>
	              <div className="component-example">
	                <Button startContent="+">{buttonCopy.newProject}</Button>
	                <Button endContent={<Badge variant="secondary">12</Badge>} variant="secondary">{buttonCopy.notifications}</Button>
	                <Button endContent={<Badge variant="outline">{buttonCopy.newBadge}</Badge>} variant="ghost">{buttonCopy.updates}</Button>
	              </div>
	            </div>
	          </ExampleCard>

	          <ExampleCard title={isArabic ? 'الزر - أيقونة فقط' : 'Button - Icon only'} description={isArabic ? 'استخدم شكل الأيقونة فقط للإجراءات المتكررة والكثيفة. كل زر مربع يحتاج إلى تسمية وصول.' : 'Use icon-only shape only for dense repeated actions. In Utopia Default, visible glyph choices belong to the theme layer and every square button needs an accessible label.'}>
	            <div className="example-stack">
	              <span>{isArabic ? 'خاصية isIconOnly في الزر' : 'Button isIconOnly'}</span>
	              <div className="component-example">
	                <Button aria-label={buttonCopy.addItem} isIconOnly>+</Button>
	                <Button aria-label={buttonCopy.moreOptions} isIconOnly variant="secondary">..</Button>
	                <Button aria-label={buttonCopy.deleteItem} isIconOnly variant="destructive">x</Button>
	              </div>
	              <span>{isArabic ? 'مكوّن IconButton المخصص' : 'Dedicated IconButton primitive'}</span>
	              <div className="component-example">
	                <IconButton label={buttonCopy.addItem}>+</IconButton>
	                <IconButton label={buttonCopy.openSettings} variant="secondary">⚙</IconButton>
	                <IconButton label={buttonCopy.moreOptions} variant="ghost">..</IconButton>
	              </div>
	            </div>
	          </ExampleCard>

	          <ExampleCard title={isArabic ? 'الزر - العربية وRTL' : 'Button - Arabic / RTL'} description={isArabic ? 'استخدم التسميات العربية فقط من محتوى المنتج أو الترجمة. يجب أن يدعم المكوّن dir=rtl والنص المختلط دون افتراضات left/right.' : "Use Arabic labels only when they come from product content or localization. The component must support dir='rtl', mixed-script labels, and logical start/end content without left/right assumptions."}>
	            <div className="example-stack">
	              <span>{isArabic ? 'اتجاه RTL' : 'RTL direction'}</span>
              <div className="component-example" dir="rtl" lang="ar">
                <Button>حفظ</Button>
                <Button variant="secondary">معاينة</Button>
                <Button startContent="+">مشروع جديد</Button>
              </div>
	              <span>{isArabic ? 'نص مختلط' : 'Mixed script'}</span>
              <div className="component-example" dir="rtl" lang="ar">
	                <Button endContent={<Badge variant="secondary">{buttonCopy.beta}</Badge>} variant="secondary">إصدار 2</Button>
                <Button loading loadingText="جار الحفظ">حفظ</Button>
              </div>
            </div>
          </ExampleCard>
        </section>

        <section id="best-practices">
          <h2>{t(locale, 'bestPractices')}</h2>
          <div className="practice-table">
	            {(isArabic ? [
	              ['افعل', 'احجز الزر الأساسي للإجراء الأهم في الواجهة.'],
	              ['افعل', 'اكتب تسميات تصف الإجراء مثل "حفظ التغييرات" أو "إرسال دعوة".'],
	              ['افعل', 'اعرض حالة تحميل للإجراءات التي تستغرق وقتا.'],
	              ['افعل', 'استخدم IconButton للإجراءات ذات الأيقونة فقط أو Button مع isIconOnly عند التركيب المباشر.'],
	              ['افعل', 'وفر تسمية وصول لكل زر أيقونة فقط.'],
	              ['افعل', 'اختبر التسميات العربية داخل dir="rtl" والنص المختلط قبل الشحن.'],
	              ['لا تفعل', 'لا تضع أكثر من زر أساسي واحد في الواجهة نفسها.'],
	              ['لا تفعل', 'لا تستخدم متغير الحذف دون خطوة تأكيد للإجراءات غير القابلة للتراجع.'],
	              ['لا تفعل', 'لا تخترع نصا عربيا؛ استخدم ترجمة المنتج أو محتوى موثقا.'],
	              ['لا تفعل', 'لا تستخدم الزر للتنقل عندما يكون الرابط هو العنصر الصحيح.'],
		            ] : [
	              ['Do', 'Reserve primary for the single most important action in the view.'],
	              ['Do', 'Write labels that describe the action, like "Save changes" or "Send invite".'],
	              ['Do', 'Show a loading state for actions that take time.'],
	              ['Do', 'Use IconButton for reusable icon-only actions, or Button isIconOnly when composing from Button directly.'],
	              ['Do', 'Always provide an accessible label for icon-only buttons.'],
	              ['Do', 'Test Arabic labels in dir="rtl" and mixed-script labels before shipping.'],
	              ["Don't", 'Place more than one primary button in the same view.'],
	              ["Don't", 'Use the destructive variant without a confirmation step for irreversible actions.'],
	              ["Don't", 'Invent Arabic copy; use product localization or verified content.'],
	              ["Don't", 'Use a button for navigation when a link is the correct element.'],
	            ]).map(([kind, guidance]) => (
              <div key={guidance} className="practice-row">
	                <Badge variant={kind === 'Do' || kind === 'افعل' ? 'success' : 'destructive'}>{kind}</Badge>
                <p>{guidance}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="props">
          <h2>{t(locale, 'props')}</h2>
          <p>{isArabic ? 'عناصر التحكم هنا مخصصة للتوثيق. تبقى واجهة المكوّن مبنية على أسلوب shadcn وتوكنات دلالية.' : 'Interactive controls shown here are documentation affordances. The component API remains shadcn-style and semantic-token driven.'}</p>
          <div className="props-table">
            {buttonProps.map((prop) => (
              <div key={prop.name} className="prop-row">
                <strong>{prop.name}</strong>
                <div>
                  <code>{prop.type}</code>
                  <p>{prop.description}</p>
                </div>
                <div className="prop-control">{prop.control}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="tokens">
          <h2>{t(locale, 'tokens')}</h2>
          <p>{isArabic ? 'يستهلك الزر أدوارا دلالية. يربط Utopia Default هذه الأدوار بمرئيات الثيم مثل Brick Red وSpecial Black والهندسة المربعة والخط الافتراضي.' : 'Button consumes semantic roles. Utopia Default maps those roles to Brick Red, Special Black, square geometry, and TWK Lausanne.'}</p>
          <div className="chip-list">
            {['--primary', '--primary-hover', '--primary-active', '--primary-foreground', '--secondary', '--secondary-foreground', '--destructive', '--radius-control', '--button-height', '--focus-ring-width'].map((token) => (
              <span key={token}>{token}</span>
            ))}
          </div>
        </section>

        <section id="ai-rules">
	          <h2>{isArabic ? 'قواعد الذكاء الاصطناعي' : 'AI rules'}</h2>
	          <p>{isArabic ? 'استخدم Button للإجراءات. لا تخترع ألوان أزرار ولا تثبت قيم علامة Utopia داخل منطق المكوّن القابل لإعادة الاستخدام.' : 'Use Button for actions. Do not invent button colors or hardcode Utopia brand primitives inside reusable component logic.'}</p>
          <div className="code-block">
            <span>dense</span>
            <pre>{`npm run ds -- component "Button" --dense`}</pre>
          </div>
        </section>
      </article>
      )}
    </div>
  )
}

function ButtonGroupDetailPage({ tab }: { tab: string }) {
  const { locale } = useI18n()
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const [density, setDensity] = useState<'default' | 'compact'>('default')
  const [asToolbar, setAsToolbar] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const isProperties = tab === 'properties'
  const isArabic = locale === 'ar'
  const copy = buttonGroupCopy(locale)

  return (
    <div className="page component-doc-page">
      <section className="component-doc-hero">
        <h1>{componentLabel(locale, 'Button Group')}</h1>
        <p>@utopia-studio-design/design-system v0.1.0 · ButtonGroup</p>
        <nav className="component-tabs" aria-label="Button Group documentation views">
          <a href="#/components/button-group#overview" aria-current={isProperties ? undefined : 'page'}>{t(locale, 'overview')}</a>
          <a href="#/components/button-group?tab=properties#props" aria-current={isProperties ? 'page' : undefined}>{t(locale, 'props')}</a>
        </nav>
      </section>

      {isProperties ? (
        <article className="docs-article">
          <section id="props">
            <div className="component-stage properties-stage">
	              <ButtonGroup asToolbar={asToolbar} density={density} label={copy.previewActions} orientation={orientation}>
	                <Button disabled={disabled}>{copy.save}</Button>
	                <ButtonGroupSeparator orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} />
	                <Button disabled={disabled} variant="secondary">{copy.preview}</Button>
	                <ButtonGroupSeparator orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} />
	                <Button disabled={disabled} variant="ghost">{copy.cancel}</Button>
	              </ButtonGroup>
	            </div>
	            <h2>{t(locale, 'props')}</h2>
	            <p>{isArabic ? 'غيّر قيمة الخاصية لتحديث المعاينة أعلاه.' : 'Change a prop value to update the preview above.'}</p>
            <div className="props-table">
              <div className="prop-row">
                <strong>orientation</strong>
                <div>
                  <code>'horizontal' | 'vertical'</code>
	                  <p>{isArabic ? 'اتجاه الإجراءات المجمعة. يستخدم تخطيطا منطقيا ويدعم RTL.' : 'Direction of the grouped actions. Uses logical layout and supports RTL contexts.'}</p>
                </div>
                <div className="prop-control">
                  <PropSelectControl label="orientation value" onChange={(value) => setOrientation(value as typeof orientation)} options={['horizontal', 'vertical']} value={orientation} />
                </div>
              </div>
              <div className="prop-row">
                <strong>density</strong>
                <div>
                  <code>'default' | 'compact'</code>
	                  <p>{isArabic ? 'كثافة المسافات للإجراءات المجمعة.' : 'Spacing density for grouped actions.'}</p>
                </div>
                <div className="prop-control">
                  <PropSelectControl label="density value" onChange={(value) => setDensity(value as typeof density)} options={['default', 'compact']} value={density} />
                </div>
              </div>
              <div className="prop-row">
                <strong>asToolbar</strong>
                <div>
                  <code>boolean</code>
	                  <p>{isArabic ? 'يستخدم role="toolbar" لمجموعات الأدوات، وإلا يستخدم role="group".' : 'Uses role="toolbar" for toolbar-like action clusters; otherwise role="group".'}</p>
                </div>
                <div className="prop-control">
                  <PropBooleanControl checked={asToolbar} label="asToolbar value" onChange={setAsToolbar} />
                </div>
              </div>
              <div className="prop-row">
                <strong>label</strong>
                <div>
                  <code>string</code>
	                  <p>{isArabic ? 'اختصار لـ aria-label. مطلوب عندما لا يكون هدف المجموعة واضحا من السياق.' : 'Convenience alias for aria-label. Required when the group purpose is not clear from surrounding text.'}</p>
                </div>
                <div className="prop-control">
	                  <PropTextControl label="label value" placeholder={copy.previewActions} />
                </div>
              </div>
              <div className="prop-row">
                <strong>children</strong>
                <div>
                  <code>ReactNode</code>
	                  <p>{isArabic ? 'عادة تكون أزرارا. حافظ على ترابط الإجراءات وترتيبها حسب نية المستخدم.' : 'Usually Button children. Keep the actions related and ordered by user intent.'}</p>
                </div>
                <div className="prop-control">
	                  <PropTextControl label="children value" placeholder={isArabic ? 'أزرار داخلية' : 'Button children'} />
                </div>
              </div>
              <div className="prop-row">
                <strong>disabled children</strong>
                <div>
                  <code>boolean</code>
	                  <p>{isArabic ? 'تحكم توثيقي لمعاينة الأزرار الداخلية المعطلة.' : 'Documentation control for previewing disabled child buttons.'}</p>
                </div>
                <div className="prop-control">
                  <PropBooleanControl checked={disabled} label="disabled children value" onChange={setDisabled} />
                </div>
              </div>
            </div>
          </section>
        </article>
      ) : (
        <article className="docs-article">
          <section id="overview">
            <div className="component-stage component-stage--floating-open">
	              <ButtonGroupOverflowExample defaultOpen locale={locale} />
            </div>
            <div className="overview-contract">
              <div>
	                <h2>{isArabic ? 'البنية' : 'Architecture'}</h2>
	                <p>
	                  {isArabic ? <>Button Group موجود في shadcn/ui. يتبع مكوّن Utopia هذا الأساس: أجزاء تركيبية مثل
	                  <code>ButtonGroup</code> و<code>ButtonGroupSeparator</code> و<code>ButtonGroupText</code>
	                  ومتغيرات CVA وأصناف CSS دلالية وتنسيق متصل يعتمد على التوكنات. يجمع أزرار <code>Button</code> حقيقية بدلا من اختراع نمط إجراء منفصل.</> : <>Button Group exists in shadcn/ui. Utopia Button Group follows that foundation: compositional
	                  <code>ButtonGroup</code>, <code>ButtonGroupSeparator</code>, and <code>ButtonGroupText</code>
	                  parts, CVA variants, semantic CSS classes, and token-driven connected-control styling.
	                  It groups real <code>Button</code> primitives instead of inventing a separate action style.
	                  Split and overflow actions compose with <code>DropdownMenu</code> using the same shadcn/Radix foundation.</>}
	                </p>
	              </div>
	              <div>
	                <h2>{isArabic ? 'الحركة' : 'Motion'}</h2>
	                <p>
	                  {isArabic ? 'يبقى Button Group هادئا بصريا. تحمل الأزرار الداخلية حالات التحويم والتركيز والضغط والتعطيل والتحميل، وتبقى الحركة مرتبطة بتوكنات دلالية.' : <>Button Group itself should stay quiet. Child buttons carry hover, focus, pressed, disabled, and
	                  loading states. If a toolbar needs richer transitions, use Framer Motion around state changes while
	                  keeping timing mapped to semantic motion tokens.</>}
	                </p>
	              </div>
	              <div>
	                <h2>{isArabic ? 'مقروء للذكاء الاصطناعي' : 'AI-readable'}</h2>
	                <p>
	                  {isArabic ? 'توثق صفحة Button Group مسار الاستيراد وقواعد تركيب العناصر والخصائص والتوكنات وأمر CLI كثيف حتى ينشئ الوكلاء إجراءات مجمعة بتركيب JSX.' : 'Button Group documents its import path, child composition rules, props, tokens, and dense CLI command so AI agents create grouped actions with JSX composition instead of serialized children.'}
	                </p>
	              </div>
	              <div>
	                <h2>{t(locale, 'arabicFriendly')}</h2>
	                <p>
	                  {isArabic ? 'يستخدم Button Group الاتجاه والمسافات المنطقية بدلا من افتراضات left/right. في RTL حافظ على معنى الإجراءات واستخدم لغة start/end ولا تعكس ترتيب الإجراءات الخطرة فقط لأجل الشكل.' : <>Button Group uses orientation and logical spacing instead of left/right assumptions. In RTL contexts,
	                  preserve action meaning, use start/end language for any slots, and never reorder destructive or primary
	                  actions just to mirror the visual layout.</>}
	                </p>
	              </div>
            </div>
          </section>

          <section id="usage">
	            <h2>{t(locale, 'usage')}</h2>
	            <p>{isArabic ? 'استخدم Button Group للإجراءات المرتبطة بالقرار نفسه أو شريط الأدوات نفسه. حافظ على إجراء أساسي واضح واحد، وفضّل تركيب JSX على تمرير مصفوفات React متسلسلة.' : 'Use Button Group for related actions that belong to the same decision or toolbar. Keep one clear primary action. Prefer JSX composition over serialized React children arrays.'}</p>
            <div className="code-block">
              <span>tsx</span>
            <pre>{isArabic ? `import { Button } from '@utopia-studio-design/design-system/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@utopia-studio-design/design-system/ButtonGroup';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <ButtonGroup label="إجراءات الرسائل">
      <Button variant="outline">أرشفة</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">إبلاغ</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">تأجيل</Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="إجراءات رسائل إضافية" isIconOnly variant="outline">...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>تحديد كمقروء</DropdownMenuItem>
          <DropdownMenuItem>أرشفة</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>تأجيل</DropdownMenuItem>
          <DropdownMenuItem>إضافة إلى التقويم</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>تصنيف كـ...</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>المنتج</DropdownMenuItem>
              <DropdownMenuItem>المالية</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem data-variant="destructive">حذف</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}` : `import { Button } from '@utopia-studio-design/design-system/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@utopia-studio-design/design-system/ButtonGroup';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <ButtonGroup label="Message actions">
      <Button variant="outline">Archive</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Report</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Snooze</Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="More message actions" isIconOnly variant="outline">...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as Read</DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Snooze</DropdownMenuItem>
          <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Label As...</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Product</DropdownMenuItem>
              <DropdownMenuItem>Finance</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem data-variant="destructive">Trash</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}`}</pre>
            </div>
          </section>

          <section id="examples">
	            <h2>{t(locale, 'examples')}</h2>
	            <p>{isArabic ? 'تكوينات شائعة لمجموعات الإجراءات وأشرطة الأدوات.' : 'Common configurations for action clusters and toolbar-like groups.'}</p>
	            <ExampleCard title={isArabic ? 'Button Group - إجراءات متصلة' : 'Button Group - Connected actions'} description={isArabic ? 'استخدم المجموعة المتصلة للعمليات المرتبطة التي تقرأ كتحكم واحد، مثل النسخ والقص واللصق.' : 'Use connected button groups for related operations that read as one control, like copy, cut, and paste.'}>
	              <ButtonGroup label={copy.editingActions}>
	                <Button variant="secondary">{copy.copy}</Button>
	                <ButtonGroupSeparator />
	                <Button variant="secondary">{copy.cut}</Button>
	                <ButtonGroupSeparator />
	                <Button variant="secondary">{copy.paste}</Button>
	              </ButtonGroup>
	            </ExampleCard>

	            <ExampleCard title={isArabic ? 'Button Group - الهرمية' : 'Button Group - Hierarchy'} description={isArabic ? 'استخدم إجراء أساسيا واحدا مع إجراءات مساندة ثانوية أو هادئة حتى يبقى القرار واضحا.' : 'Use one primary action with secondary or ghost supporting actions. This keeps the decision clear.'}>
	              <ButtonGroup label={copy.publishingActions}>
	                <Button>{copy.publish}</Button>
	                <Button variant="secondary">{copy.schedule}</Button>
	                <Button variant="ghost">{copy.saveDraft}</Button>
	              </ButtonGroup>
	            </ExampleCard>

	            <ExampleCard title={isArabic ? 'Button Group - شريط أدوات كثيف' : 'Button Group - Compact toolbar'} description={isArabic ? 'استخدم الكثافة compact في أشرطة الأدوات الكثيفة عندما تكون الإجراءات متساوية. استخدم role=toolbar عندما تتصرف المجموعة كشريط أدوات.' : "Use compact density for dense toolbars where the actions are peers. Use role='toolbar' when the group behaves like a toolbar."}>
	              <ButtonGroup label={copy.textActions} asToolbar density="compact">
	                <Button variant="secondary">{copy.bold}</Button>
	                <ButtonGroupSeparator />
	                <Button variant="secondary">{copy.italic}</Button>
	                <ButtonGroupSeparator />
	                <Button variant="secondary">{copy.link}</Button>
	              </ButtonGroup>
	            </ExampleCard>

	            <ExampleCard title={isArabic ? 'Button Group - عمودي' : 'Button Group - Vertical'} description={isArabic ? 'استخدم الاتجاه العمودي عندما تكون المساحة الأفقية محدودة أو عندما تقرأ الإجراءات كقائمة قصيرة.' : 'Use vertical orientation when horizontal space is limited or actions are scanned as a short stack.'}>
	              <ButtonGroup label={copy.reviewActions} orientation="vertical">
	                <Button>{copy.approve}</Button>
	                <ButtonGroupSeparator orientation="horizontal" />
	                <Button variant="secondary">{copy.requestChanges}</Button>
	                <ButtonGroupSeparator orientation="horizontal" />
	                <Button variant="destructive">{copy.reject}</Button>
	              </ButtonGroup>
	            </ExampleCard>

	            <ExampleCard title={isArabic ? 'Button Group - نص ثابت' : 'Button Group - Text'} description={isArabic ? 'استخدم ButtonGroupText للنصوص القصيرة داخل التحكم المجمع مثل النطاق أو العملة.' : 'Use ButtonGroupText for short static text inside a grouped control, such as a scope or currency marker.'}>
	              <ButtonGroup label={copy.amountActions}>
	                <ButtonGroupText>{isArabic ? 'ر.ق' : 'USD'}</ButtonGroupText>
	                <Button variant="secondary">{copy.decrease}</Button>
	                <Button variant="secondary">{copy.increase}</Button>
	              </ButtonGroup>
	            </ExampleCard>

	            <ExampleCard title={isArabic ? 'Button Group - قائمة فائضة' : 'Button Group - Dropdown overflow'} description={isArabic ? 'استخدم إجراء فائضا عندما تنتمي الإجراءات الثانوية إلى شريط الأدوات نفسه وتبقى خلف مشغل واحد.' : 'Use a split or overflow action when secondary actions belong to the same toolbar but should stay behind one trigger. This follows the shadcn Button Group plus Dropdown Menu pattern.'}>
	              <ButtonGroupOverflowExample locale={locale} />
	            </ExampleCard>

	            <ExampleCard title={isArabic ? 'Button Group - العربية وRTL' : 'Button Group - Arabic / RTL'} description={isArabic ? 'يجب أن تعمل الإجراءات المجمعة في RTL دون تغيير API. استخدم label للاسم القابل للوصول وتسميات مترجمة من التوطين.' : 'Grouped actions must work in RTL without changing the API. Use label for the accessible group name, logical orientation, and translated button labels from localization.'}>
              <div dir="rtl" lang="ar">
                <ButtonGroup label="إجراءات التحرير">
                  <Button variant="secondary">نسخ</Button>
                  <ButtonGroupSeparator />
                  <Button variant="secondary">قص</Button>
                  <ButtonGroupSeparator />
                  <Button variant="secondary">لصق</Button>
                  <Button>حفظ</Button>
                </ButtonGroup>
              </div>
            </ExampleCard>

	            <ExampleCard title={isArabic ? 'Button Group - عناصر معطلة' : 'Button Group - Disabled children'} description={isArabic ? 'عطّل الأزرار الداخلية كل على حدة حسب توفر الإجراء. لا تخف المجموعة الإجراءات غير المتاحة دون سبب منتج واضح.' : 'Disable child buttons individually based on action availability. The group itself should not hide unavailable actions without a product reason.'}>
	              <ButtonGroup label={copy.disabledExample}>
	                <Button disabled>{copy.save}</Button>
	                <Button disabled variant="secondary">{copy.preview}</Button>
	                <Button variant="ghost">{copy.cancel}</Button>
	              </ButtonGroup>
            </ExampleCard>
          </section>

          <section id="best-practices">
	            <h2>{t(locale, 'bestPractices')}</h2>
            <div className="practice-table">
	              {(isArabic ? [
	                ['افعل', 'اجمع فقط الإجراءات التي تنتمي إلى المهمة أو القرار نفسه.'],
	                ['افعل', 'حافظ على إجراء أساسي واحد واجعل الإجراءات المساندة أقل بروزا.'],
	                ['افعل', 'وفر label أو aria-label عندما لا يكون هدف المجموعة واضحا من النص القريب.'],
	                ['افعل', 'استخدم compact لأشرطة الأدوات وليس لقرارات التأكيد الكبيرة.'],
	                ['افعل', 'استخدم ButtonGroupSeparator أو ButtonGroupText عند الحاجة إلى تحكم shadcn مجمع.'],
	                ['افعل', 'اختبر التحكم المتصل داخل dir="rtl" حتى تبقى الفواصل والتركيز والحواف المنطقية صحيحة.'],
	                ['لا تفعل', 'لا تخلط إجراءات غير مترابطة فقط لأنها تتسع بصريا.'],
	                ['لا تفعل', 'لا تستخدم عدة أزرار أساسية في المجموعة نفسها.'],
	                ['لا تفعل', 'لا تمرر كائنات React متسلسلة كأطفال؛ اكتب تركيب JSX.'],
	                ['لا تفعل', 'لا تعيد ترتيب إجراءات العربية لمجرد عكس الشكل؛ حافظ على معنى المنتج.'],
	                ['لا تفعل', 'لا تعتمد على ترتيب left/right للمعنى؛ استخدم لغة منطقية وتسميات واضحة.'],
	              ] : [
	                ['Do', 'Group only actions that belong to the same task or decision.'],
                ['Do', 'Keep one primary action in the group and make supporting actions lower emphasis.'],
                ['Do', 'Provide label or aria-label when the group purpose is not obvious from nearby text.'],
                ['Do', 'Use compact density for toolbars, not for major confirmation decisions.'],
                ['Do', 'Use ButtonGroupSeparator or ButtonGroupText for shadcn-style grouped controls when needed.'],
                ['Do', 'Test connected controls in dir="rtl" so separators, focus, and logical edges remain correct.'],
                ["Don't", 'Mix unrelated actions just because they fit visually.'],
                ["Don't", 'Use multiple primary buttons in the same group.'],
                ["Don't", 'Pass serialized React element objects as children; write JSX composition instead.'],
                ["Don't", 'Reorder Arabic actions only to mirror the visual layout; preserve product meaning.'],
	                ["Don't", 'Depend on left/right order for meaning; use logical language and clear labels.'],
	              ]).map(([kind, guidance]) => (
	                <div key={guidance} className="practice-row">
	                  <Badge variant={kind === 'Do' || kind === 'افعل' ? 'success' : 'destructive'}>{kind}</Badge>
                  <p>{guidance}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="props">
	            <h2>{t(locale, 'props')}</h2>
	            <p>{isArabic ? 'يلف Button Group أزرار Button المرتبطة. لا يضيف أنماطا تتجاوز توكنات Button؛ الحجم يبقى على الأزرار الداخلية.' : 'Button Group wraps related Button primitives. It should not add visual styles that bypass Button tokens. Size belongs on child Button primitives.'}</p>
            <div className="props-table">
              {buttonGroupProps.map((prop) => (
                <div key={prop.name} className="prop-row">
                  <strong>{prop.name}</strong>
                  <div>
                    <code>{prop.type}</code>
                    <p>{prop.description}</p>
                  </div>
                  <div className="prop-control">{prop.control}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="tokens">
	            <h2>{t(locale, 'tokens')}</h2>
	            <p>{isArabic ? 'يستهلك Button Group توكنات المسافات والتحكم، بينما تستمر الأزرار الداخلية في استهلاك أدوار Button الدلالية.' : 'Button Group consumes spacing and control tokens. Child buttons continue to consume Button semantic roles.'}</p>
            <div className="chip-list">
              {['--button-group-gap', '--button-group-gap-compact', '--radius-control', '--button-height', '--focus-ring-width'].map((token) => (
                <span key={token}>{token}</span>
              ))}
            </div>
          </section>

          <section id="ai-rules">
	            <h2>{isArabic ? 'قواعد الذكاء الاصطناعي' : 'AI rules'}</h2>
	            <p>{isArabic ? 'استخدم Button Group فقط للإجراءات المرتبطة. لا تخترع ألوانا للمجموعة، ولا تنشئ APIs مبنية على left/right فقط، ولا تضع دعوات غير مترابطة في مجموعة واحدة.' : 'Use Button Group only for related actions. Do not invent group colors, do not create left/right-only APIs, and do not place unrelated CTAs in one group.'}</p>
            <div className="code-block">
              <span>dense</span>
              <pre>{`npm run ds -- component "Button Group" --dense`}</pre>
            </div>
          </section>
        </article>
      )}
    </div>
  )
}

function buttonGroupCopy(locale: Locale) {
  const isArabic = locale === 'ar'
  return {
    previewActions: isArabic ? 'إجراءات المعاينة' : 'Preview actions',
    save: isArabic ? 'حفظ' : 'Save',
    preview: isArabic ? 'معاينة' : 'Preview',
    cancel: isArabic ? 'إلغاء' : 'Cancel',
    copy: isArabic ? 'نسخ' : 'Copy',
    cut: isArabic ? 'قص' : 'Cut',
    paste: isArabic ? 'لصق' : 'Paste',
    editingActions: isArabic ? 'إجراءات التحرير' : 'Editing actions',
    publishingActions: isArabic ? 'إجراءات النشر' : 'Publishing actions',
    publish: isArabic ? 'نشر' : 'Publish',
    schedule: isArabic ? 'جدولة' : 'Schedule',
    saveDraft: isArabic ? 'حفظ مسودة' : 'Save draft',
    textActions: isArabic ? 'إجراءات النص' : 'Text actions',
    bold: isArabic ? 'غامق' : 'Bold',
    italic: isArabic ? 'مائل' : 'Italic',
    link: isArabic ? 'رابط' : 'Link',
    reviewActions: isArabic ? 'إجراءات المراجعة' : 'Review actions',
    approve: isArabic ? 'موافقة' : 'Approve',
    requestChanges: isArabic ? 'طلب تعديلات' : 'Request changes',
    reject: isArabic ? 'رفض' : 'Reject',
    amountActions: isArabic ? 'إجراءات المبلغ' : 'Amount actions',
    decrease: isArabic ? 'خفض' : 'Decrease',
    increase: isArabic ? 'زيادة' : 'Increase',
    disabledExample: isArabic ? 'مثال معطل' : 'Disabled example',
    messageActions: isArabic ? 'إجراءات الرسائل' : 'Message actions',
    archive: isArabic ? 'أرشفة' : 'Archive',
    report: isArabic ? 'إبلاغ' : 'Report',
    snooze: isArabic ? 'تأجيل' : 'Snooze',
    moreMessageActions: isArabic ? 'إجراءات رسائل إضافية' : 'More message actions',
    markAsRead: isArabic ? 'تحديد كمقروء' : 'Mark as Read',
    addToCalendar: isArabic ? 'إضافة إلى التقويم' : 'Add to Calendar',
    addToList: isArabic ? 'إضافة إلى القائمة' : 'Add to List',
    labelAs: isArabic ? 'تصنيف كـ...' : 'Label As...',
    product: isArabic ? 'المنتج' : 'Product',
    finance: isArabic ? 'المالية' : 'Finance',
    operations: isArabic ? 'العمليات' : 'Operations',
    trash: isArabic ? 'حذف' : 'Trash',
  }
}

function ButtonGroupOverflowExample({ defaultOpen = false, locale = 'en' }: { defaultOpen?: boolean; locale?: Locale }) {
  const copy = buttonGroupCopy(locale)
  return (
    <ButtonGroup label={copy.messageActions}>
      <Button startContent={<Archive aria-hidden="true" />} variant="outline">{copy.archive}</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">{copy.report}</Button>
      <ButtonGroupSeparator />
      <Button startContent={<Clock aria-hidden="true" />} variant="outline">{copy.snooze}</Button>
      <ButtonGroupSeparator />
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger asChild>
          <Button aria-label={copy.moreMessageActions} isIconOnly variant="outline">
            <MoreHorizontal aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="button-group-overflow-menu">
          <DropdownMenuItem>
            <MailOpen aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.markAsRead}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Archive aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.archive}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Clock aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.snooze}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CalendarPlus aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.addToCalendar}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ListFilter aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.addToList}</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Tag aria-hidden="true" />
              <span className="uds-menu-item-content">{copy.labelAs}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>{copy.product}</DropdownMenuItem>
              <DropdownMenuItem>{copy.finance}</DropdownMenuItem>
              <DropdownMenuItem>{copy.operations}</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem data-variant="destructive">
            <Trash2 aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.trash}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

function DropdownMenuDetailPage({ tab }: { tab: string }) {
  const { locale } = useI18n()
  const isProperties = tab === 'properties'
  const [checkboxValue, setCheckboxValue] = useState(true)
  const [radioValue, setRadioValue] = useState('comfortable')
  const isArabic = locale === 'ar'

  return (
    <ActionDocPage
      aiRules="Use Dropdown Menu for compact secondary actions, overflow menus, grouped menu items, checkbox/radio menu state, and Button Group overflow triggers. It wraps Radix Dropdown Menu with shadcn-style parts and Utopia semantic tokens. Do not use it for primary page navigation or unlabeled destructive actions."
      examples={[
        [isArabic ? 'القائمة المنسدلة - أساسية' : 'Dropdown Menu - Basic', <DropdownMenuExample locale={locale} />],
        [isArabic ? 'القائمة المنسدلة - الاختصارات' : 'Dropdown Menu - Shortcuts', <DropdownMenuExample defaultOpen locale={locale} showShortcuts />],
        ['Dropdown Menu - Checkbox items', (
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger asChild><Button variant="secondary">{isArabic ? 'الأعمدة' : 'Columns'}</Button></DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>{isArabic ? 'الأعمدة' : 'Columns'}</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={checkboxValue} onCheckedChange={(value) => setCheckboxValue(Boolean(value))}>{isArabic ? 'الحالة' : 'Status'}</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>{isArabic ? 'المالك' : 'Owner'}</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>{isArabic ? 'آخر تحديث' : 'Updated'}</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )],
        ['Dropdown Menu - Radio group', (
          <DropdownMenu defaultOpen>
            <DropdownMenuTrigger asChild><Button variant="secondary">{isArabic ? 'الكثافة' : 'Density'}</Button></DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>{isArabic ? 'الكثافة' : 'Density'}</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={radioValue} onValueChange={setRadioValue}>
                <DropdownMenuRadioItem value="compact">{isArabic ? 'كثيفة' : 'Compact'}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comfortable">{isArabic ? 'مريحة' : 'Comfortable'}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="spacious">{isArabic ? 'واسعة' : 'Spacious'}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )],
        ['Dropdown Menu - Arabic / RTL', (
          <div dir="rtl" lang="ar">
            <DropdownMenu defaultOpen>
              <DropdownMenuTrigger asChild><Button variant="secondary">إجراءات</Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>فتح</DropdownMenuItem>
                <DropdownMenuItem>نسخ</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>تصنيف</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>أولوية</DropdownMenuItem>
                    <DropdownMenuItem>متابعة</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )],
      ]}
      importCode="import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@utopia-studio-design/design-system/Navigation';"
      isProperties={isProperties}
      name="Dropdown Menu"
      overview={<MenuAnatomyPreview kind="dropdown" locale={locale} />}
      propsPanel={(
        <div className="props-table">
          {[
            ['DropdownMenu', 'component', 'Root state owner from Radix Dropdown Menu.'],
            ['DropdownMenuTrigger', 'component', 'Trigger button. Use asChild with Button for shadcn-style composition.'],
            ['DropdownMenuContent', 'component', 'Floating menu surface with align=start/end and tokenized popover surface.'],
            ['DropdownMenuItem', 'component', 'Action row. Use visible text; optional icon and shortcut slots.'],
            ['DropdownMenuCheckboxItem', 'component', 'Checked menu state with Radix checked semantics.'],
            ['DropdownMenuRadioGroup', 'component', 'Mutually exclusive menu state owner.'],
            ['DropdownMenuRadioItem', 'component', 'Radio-style menu item.'],
            ['DropdownMenuSub', 'component', 'Nested menu state owner.'],
            ['DropdownMenuSubTrigger', 'component', 'Submenu trigger with RTL-aware trailing indicator.'],
            ['DropdownMenuShortcut', 'component', 'Inline-end keyboard hint.'],
          ].map(([name, type, description]) => (
            <PropRow key={name} control={<input aria-label={`${name} value`} placeholder="value" />} description={description} name={name} type={type} />
          ))}
        </div>
      )}
      tokens={['--popover-surface', '--border', '--radius-surface', '--button-height', '--muted-foreground', '--destructive', '--focus-ring-width']}
      usageCode={`import { Button } from '@utopia-studio-design/design-system/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Copy <DropdownMenuShortcut>⌘C</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Paste <DropdownMenuShortcut>⌘V</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem data-variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`}
      usageDescription="Dropdown Menu exposes shadcn/Radix menu composition with Utopia surfaces, spacing, focus, destructive state, checkbox/radio state, submenus, shortcuts, and RTL-aware submenu indicators."
    />
  )
}

function DropdownMenuExample({ defaultOpen = false, locale = 'en', showShortcuts = false }: { defaultOpen?: boolean; locale?: Locale; showShortcuts?: boolean }) {
  const copy = buttonGroupCopy(locale)
  const isArabic = locale === 'ar'
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild><Button variant="secondary">{isArabic ? 'فتح القائمة' : 'Open menu'}</Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{isArabic ? 'الإجراءات' : 'Actions'}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Archive aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.archive}</span>
            {showShortcuts ? <DropdownMenuShortcut>⌘A</DropdownMenuShortcut> : null}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MailOpen aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.markAsRead}</span>
            {showShortcuts ? <DropdownMenuShortcut>⇧⌘M</DropdownMenuShortcut> : null}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tag aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.labelAs}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>{copy.product}</DropdownMenuItem>
            <DropdownMenuItem>{copy.finance}</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem data-variant="destructive">
            <Trash2 aria-hidden="true" />
            <span className="uds-menu-item-content">{copy.trash}</span>
          {showShortcuts ? <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SelectDetailPage({ tab }: { tab: string }) {
  const isProperties = tab === 'properties'

  return (
    <ActionDocPage
      aiRules="Use Select for compact single-choice selection. It wraps Radix Select with shadcn-style trigger/content/item/group/label/separator/scroll parts and Utopia semantic tokens. Use Radio Group when all choices should be visible, Combobox for searchable or async options, and Native Select only when platform-native UI is required."
      examples={[
        ['Select - Basic', <SelectExample defaultOpen />],
        ['Select - Groups', <SelectGroupedExample defaultOpen />],
        ['Select - Disabled option', (
          <Select defaultValue="default" open>
            <SelectTrigger aria-label="Theme"><SelectValue placeholder="Theme" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Utopia Default</SelectItem>
              <SelectItem disabled value="disabled">Unavailable theme</SelectItem>
              <SelectItem value="future">Future theme</SelectItem>
            </SelectContent>
          </Select>
        )],
        ['Select - Scrollable', <SelectScrollableExample defaultOpen />],
        ['Select - Arabic / RTL', (
          <div dir="rtl" lang="ar">
            <Select defaultValue="docs" open>
              <SelectTrigger aria-label="القسم"><SelectValue placeholder="اختر قسمًا" /></SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectLabel>الأقسام</SelectLabel>
                  <SelectItem value="docs">المستندات</SelectItem>
                  <SelectItem value="components">المكونات</SelectItem>
                  <SelectItem value="themes">الثيمات</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )],
      ]}
      importCode="import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@utopia-studio-design/design-system/Forms';"
      isProperties={isProperties}
      name="Select"
      overview={<SelectGroupedExample defaultOpen />}
      propsPanel={(
        <div className="props-table">
          {[
            ['Select', 'component', 'Root state owner for controlled or uncontrolled single selection.'],
            ['SelectTrigger', 'component', 'Button-like trigger. Pair with aria-label or visible FieldLabel.'],
            ['SelectValue', 'component', 'Selected value or placeholder display.'],
            ['SelectContent', 'component', 'Floating option surface with popover surface token.'],
            ['SelectGroup', 'component', 'Groups related options under a label.'],
            ['SelectLabel', 'component', 'Non-interactive group heading.'],
            ['SelectItem', 'component', 'Option row with selected indicator and disabled state.'],
            ['SelectSeparator', 'component', 'Visual separator between option groups.'],
            ['SelectScrollUpButton / SelectScrollDownButton', 'component', 'Optional scroll affordances for long option sets.'],
          ].map(([name, type, description]) => (
            <PropRow key={name} control={<input aria-label={`${name} value`} placeholder="value" />} description={description} name={name} type={type} />
          ))}
        </div>
      )}
      tokens={['--input', '--background', '--foreground', '--popover-surface', '--border', '--radius-control', '--radius-surface', '--button-height-sm', '--focus-ring-width']}
      usageCode={`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <Select defaultValue="default">
      <SelectTrigger aria-label="Theme">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          <SelectItem value="default">Utopia Default</SelectItem>
          <SelectItem value="future">Future theme</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}`}
      usageDescription="Select is the compact single-choice primitive. It keeps the trigger, option surface, selected indicator, grouping, disabled state, long-list scroll affordances, and RTL layout inside Utopia semantic styling."
    />
  )
}

function SelectExample({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <Select defaultValue="default" open={defaultOpen || undefined}>
      <SelectTrigger aria-label="Theme"><SelectValue placeholder="Theme" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Utopia Default</SelectItem>
        <SelectItem value="future">Future theme</SelectItem>
        <SelectItem value="custom">Custom theme</SelectItem>
      </SelectContent>
    </Select>
  )
}

function SelectGroupedExample({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <Select defaultValue="operator" open={defaultOpen || undefined}>
      <SelectTrigger aria-label="Theme profile"><SelectValue placeholder="Theme profile" /></SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Stable</SelectLabel>
          <SelectItem value="utopia">Utopia Default</SelectItem>
          <SelectItem value="operator">Operator Console</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Exploration</SelectLabel>
          <SelectItem value="editorial">Editorial Resource</SelectItem>
          <SelectItem value="venture">Venture Proof</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function SelectScrollableExample({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <Select defaultValue="3" open={defaultOpen || undefined}>
      <SelectTrigger aria-label="Density"><SelectValue placeholder="Density" /></SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton />
        {Array.from({ length: 10 }, (_, index) => (
          <SelectItem key={index + 1} value={`${index + 1}`}>Option {index + 1}</SelectItem>
        ))}
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  )
}

function IconButtonDetailPage({ tab }: { tab: string }) {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'
  const [label, setLabel] = useState('Open settings')
  const [variant, setVariant] = useState<'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'>('ghost')
  const [size, setSize] = useState<'sm' | 'default' | 'lg'>('default')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const isProperties = tab === 'properties'

  return (
    <ActionDocPage
      aiRules="Use IconButton for compact icon-only actions that still need the full Button accessibility and token contract. It wraps Button with isIconOnly=true, requires label, and must not be removed by a theme. A theme may define icon style, but the primitive remains available."
      examples={[
        [isArabic ? 'زر أيقونة - المتغيرات' : 'Icon Button - Variants', (
          <div className="component-example">
            <IconButton label={isArabic ? 'إضافة عنصر' : 'Add item'} variant="default">+</IconButton>
            <IconButton label={isArabic ? 'فتح الإعدادات' : 'Open settings'} variant="secondary">⚙</IconButton>
            <IconButton label={isArabic ? 'خيارات أكثر' : 'More options'} variant="ghost">..</IconButton>
            <IconButton label={isArabic ? 'حذف عنصر' : 'Delete item'} variant="destructive">x</IconButton>
          </div>
        )],
        [isArabic ? 'زر أيقونة - الحالات' : 'Icon Button - States', (
          <div className="component-example">
            <IconButton label={isArabic ? 'عادي' : 'Rest'} variant="secondary">□</IconButton>
            <IconButton className="uds-button-state-hover" label={isArabic ? 'تحويم' : 'Hover'} variant="secondary">□</IconButton>
            <IconButton className="uds-button-state-focus" label={isArabic ? 'تركيز' : 'Focus'} variant="secondary">□</IconButton>
            <IconButton className="uds-button-state-active" label={isArabic ? 'مضغوط' : 'Pressed'} variant="secondary">□</IconButton>
            <IconButton disabled label={isArabic ? 'معطل' : 'Disabled'} variant="secondary">□</IconButton>
          </div>
        )],
        [isArabic ? 'زر أيقونة - التحميل' : 'Icon Button - Loading', (
          <div className="component-example">
            <IconButton label={isArabic ? 'تحميل المزيد' : 'Loading more'} loading variant="secondary">+</IconButton>
            <IconButton label={isArabic ? 'جار الحفظ' : 'Saving'} loading variant="ghost">□</IconButton>
          </div>
        )],
        [isArabic ? 'زر أيقونة - العربية وRTL' : 'Icon Button - Arabic / RTL', (
          <div dir="rtl" lang="ar">
            <div className="component-example">
              <IconButton label="فتح الإعدادات" variant="secondary">⚙</IconButton>
              <IconButton label="إضافة عنصر" variant="ghost">+</IconButton>
              <IconButton label="حذف عنصر" variant="destructive">x</IconButton>
            </div>
          </div>
        )],
      ]}
      importCode={`import { IconButton } from '@utopia-studio-design/design-system/IconButton';`}
      isProperties={isProperties}
      name="Icon Button"
      overview={(
        <IconButton
          disabled={disabled}
          label={isArabic && label === 'Open settings' ? 'فتح الإعدادات' : label}
          loading={loading}
          size={size}
          variant={variant}
        >
          {isArabic && label === 'Open settings' ? 'ض' : label.slice(0, 1).toUpperCase()}
        </IconButton>
      )}
      propsPanel={(
        <div className="props-table">
          <PropRow control={<PropTextControl label="label value" onChange={setLabel} value={label} />} description="Required accessible label. This becomes aria-label because the visual control is icon-only." name="label" type="string" />
          <PropRow control={<PropSelectControl label="variant value" onChange={(value) => setVariant(value as typeof variant)} options={['default', 'secondary', 'outline', 'ghost', 'destructive']} value={variant} />} description="Visual style variant inherited from Button semantic tokens." name="variant" type="'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'" />
          <PropRow control={<PropSelectControl label="size value" onChange={(value) => setSize(value as typeof size)} options={['sm', 'default', 'lg']} value={size} />} description="Square size inherited from Button height tokens." name="size" type="'sm' | 'default' | 'lg'" />
          <PropRow control={<PropBooleanControl checked={disabled} label="disabled value" onChange={setDisabled} />} description="Disables the action." name="disabled" type="boolean" />
          <PropRow control={<PropBooleanControl checked={loading} label="loading value" onChange={setLoading} />} description="Shows progress, sets aria-busy, and blocks duplicate activation." name="loading" type="boolean" />
          <PropRow control={<PropTextControl label="children value" placeholder="⚙" />} description="Icon-only visual content. Use theme-approved icons or marks; do not rely on this as the accessible name." name="children" type="ReactNode" />
        </div>
      )}
      tokens={['--primary', '--secondary', '--ghost-hover', '--ghost-active', '--radius-control', '--button-height', '--button-height-sm', '--button-height-lg', '--focus-ring-width']}
      usageCode={isArabic ? `import { IconButton } from '@utopia-studio-design/design-system/IconButton';

export function Example() {
  return <IconButton label="فتح الإعدادات">⚙</IconButton>;
}` : `import { IconButton } from '@utopia-studio-design/design-system/IconButton';

export function Example() {
  return <IconButton label="Open settings">⚙</IconButton>;
}`}
      usageDescription={isArabic ? 'زر الأيقونة هو عنصر الإجراء المخصص للأيقونة فقط. يحافظ على سلوك الزر والهندسة المربعة وحالة التركيز والتحميل وتسمية الوصول المطلوبة.' : 'Icon Button is the dedicated icon-only action primitive. It preserves Button behavior, square geometry, focus styling, loading state, and required accessible labeling.'}
    />
  )
}

function ToggleButtonDetailPage({ name = 'Toggle Button', tab }: { name?: string; tab: string }) {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'
  const [pressed, setPressed] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [variant, setVariant] = useState<'ghost' | 'secondary' | 'outline' | 'destructive'>('ghost')
  const [size, setSize] = useState<'sm' | 'default' | 'lg' | 'icon'>('default')
  const [isIconOnly, setIsIconOnly] = useState(false)
  const isProperties = tab === 'properties'

  return (
    <ActionDocPage
      aiRules="Use ToggleButton for persistent selected/unselected states such as formatting, mute, favorite, or bookmark. It wraps shadcn/ui Toggle with Radix Toggle behavior, CVA-compatible variants, semantic button tokens, and explicit pressed-state props. Do not use it for submit/delete actions, navigation, or settings that should be Switch."
      examples={[
        [isArabic ? 'زر تبديل - أيقونة فقط' : 'Toggle Button - Icon only', (
          <div className="component-example">
            <ToggleButton aria-label={isArabic ? 'مفضل' : 'Favorite'} defaultPressed icon="☆" isIconOnly pressedIcon="★" />
            <ToggleButton aria-label={isArabic ? 'حفظ مرجعي' : 'Bookmark'} icon="□" isIconOnly pressedIcon="■" />
            <ToggleButton aria-label={isArabic ? 'كتم' : 'Mute'} icon="sound" isIconOnly pressedIcon="muted" />
          </div>
        )],
        [isArabic ? 'زر تبديل - التسمية' : 'Toggle Button - Label', (
          <div className="component-example">
            <ToggleButton defaultPressed label={isArabic ? 'غامق' : 'Bold'} />
            <ToggleButton label={isArabic ? 'مائل' : 'Italic'} />
            <ToggleButton label={isArabic ? 'تحته خط' : 'Underline'} />
          </div>
        )],
        [isArabic ? 'زر تبديل - المتغيرات' : 'Toggle Button - Variants', (
          <div className="component-example">
            <ToggleButton defaultPressed label={isArabic ? 'ثانوي' : 'Secondary'} />
            <ToggleButton defaultPressed label={isArabic ? 'هادئ' : 'Ghost'} variant="ghost" />
            <ToggleButton defaultPressed label={isArabic ? 'حدود' : 'Outline'} variant="outline" />
            <ToggleButton defaultPressed label={isArabic ? 'حذف' : 'Destructive'} variant="destructive" />
          </div>
        )],
        [isArabic ? 'زر تبديل - الحالات' : 'Toggle Button - States', (
          <div className="component-example">
            <ToggleButton label={isArabic ? 'عادي' : 'Rest'} />
            <ToggleButton defaultPressed label={isArabic ? 'مضغوط' : 'Pressed'} />
            <ToggleButton className="uds-button-state-hover" label={isArabic ? 'تحويم' : 'Hover'} />
            <ToggleButton className="uds-button-state-focus" label={isArabic ? 'تركيز' : 'Focus'} />
            <ToggleButton isDisabled label={isArabic ? 'معطل' : 'Disabled'} />
            <ToggleButton isLoading label={isArabic ? 'تحميل' : 'Loading'} loadingText={isArabic ? 'تحميل' : 'Loading'} />
          </div>
        )],
        [isArabic ? 'زر تبديل - العربية وRTL' : 'Toggle Button - Arabic / RTL', (
          <div dir="rtl" lang="ar">
            <div className="component-example">
              <ToggleButton defaultPressed label="مميز" />
              <ToggleButton label="English / عربي" />
              <ToggleButton aria-label="حفظ العنصر" icon="☆" isIconOnly pressedIcon="★" />
            </div>
          </div>
        )],
      ]}
      importCode={`import { ToggleButton } from '@utopia-studio-design/design-system/ToggleButton';`}
      isProperties={isProperties}
      name={name}
      overview={(
        <ToggleButton
          aria-label={isIconOnly ? (isArabic ? 'مفضل' : 'Favorite') : undefined}
          icon="☆"
          isDisabled={disabled}
          isIconOnly={isIconOnly || size === 'icon'}
          isLoading={loading}
          isPressed={pressed}
          label={isArabic ? 'مفضل' : 'Favorite'}
          loadingText={isArabic ? 'تحميل' : 'Loading'}
          onPressedChange={setPressed}
          pressedIcon="★"
          size={size}
          variant={variant}
        />
      )}
      propsPanel={(
        <div className="props-table">
          <PropRow control={<PropBooleanControl checked={pressed} label="isPressed value" onChange={setPressed} />} description="Controlled pressed-state alias. Maps to Radix Toggle pressed." name="isPressed" type="boolean" />
          <PropRow control={<PropBooleanControl checked={disabled} label="isDisabled value" onChange={setDisabled} />} description="Disables the toggle. Maps to Radix disabled." name="isDisabled" type="boolean" />
          <PropRow control={<PropBooleanControl checked={loading} label="isLoading value" onChange={setLoading} />} description="Shows progress, sets aria-busy, and prevents interaction while the state is pending." name="isLoading" type="boolean" />
          <PropRow control={<PropBooleanControl checked={isIconOnly} label="isIconOnly value" onChange={setIsIconOnly} />} description="Renders a square icon-only toggle. Always provide aria-label." name="isIconOnly" type="boolean" />
          <PropRow control={<PropSelectControl label="variant value" onChange={(value) => setVariant(value as typeof variant)} options={['ghost', 'secondary', 'outline', 'destructive']} value={variant} />} description="Visual variant inherited from Button semantic tokens." name="variant" type="'ghost' | 'secondary' | 'outline' | 'destructive'" />
          <PropRow control={<PropSelectControl label="size value" onChange={(value) => setSize(value as typeof size)} options={['sm', 'default', 'lg', 'icon']} value={size} />} description="Size variant inherited from Button." name="size" type="'sm' | 'default' | 'lg' | 'icon'" />
          <PropRow control={<PropTextControl label="label value" placeholder="Favorite" />} description="Visible label and fallback accessible label." name="label" type="ReactNode" />
          <PropRow control={<PropTextControl label="icon value" placeholder="☆" />} description="Optional start mark shown in the unpressed state. Theme icon policy decides which marks are allowed." name="icon" type="ReactNode" />
          <PropRow control={<PropTextControl label="pressedIcon value" placeholder="★" />} description="Optional mark shown when pressed. Works for controlled and uncontrolled pressed states." name="pressedIcon" type="ReactNode" />
          <PropRow control={<PropTextControl label="onPressedChange value" placeholder="(pressed) => ..." />} description="Radix Toggle change callback." name="onPressedChange" type="(pressed: boolean) => void" />
        </div>
      )}
      tokens={['--secondary', '--secondary-hover', '--secondary-active', '--ghost-hover', '--ghost-active', '--radius-control', '--button-height', '--focus-ring-width']}
      usageCode={isArabic ? `import { ToggleButton } from '@utopia-studio-design/design-system/ToggleButton';

export function Example() {
  return <ToggleButton label="غامق" defaultPressed />;
}` : `import { ToggleButton } from '@utopia-studio-design/design-system/ToggleButton';

export function Example() {
  return <ToggleButton label="Bold" defaultPressed />;
}`}
      usageDescription={isArabic ? 'زر التبديل يتحكم في حالة مستمرة بين محدد وغير محدد. إنه سلوك shadcn/ui Toggle مغلف بعقد زر Utopia الدلالي.' : 'Toggle Button controls a persistent on/off UI state. It is shadcn/ui Toggle behavior wrapped in the Utopia semantic Button contract.'}
    />
  )
}

function ToggleButtonGroupDetailPage({ name = 'Toggle Button Group', tab }: { name?: string; tab: string }) {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'
  const [value, setValue] = useState('grid')
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const [type, setType] = useState<'single' | 'multiple'>('single')
  const [disabled, setDisabled] = useState(false)
  const isProperties = tab === 'properties'
  const [multipleValue, setMultipleValue] = useState<string[]>(['active'])

  return (
    <ActionDocPage
      aiRules="Use ToggleButtonGroup for related toggle options. It wraps shadcn/ui Toggle Group with Radix Toggle Group behavior, button-group geometry, semantic tokens, and an accessible group label. Use type='single' for mutually exclusive choices and type='multiple' for independent formatting states."
      examples={[
        [isArabic ? 'مجموعة أزرار تبديل - اختيار واحد' : 'Toggle Button Group - Single select', (
          <div className="example-stack">
            <span>{isArabic ? 'وضع العرض' : 'View mode'}</span>
            <ToggleButtonGroup label={isArabic ? 'وضع العرض' : 'View mode'} type="single" defaultValue="grid">
              <ToggleButtonGroupItem label={isArabic ? 'قائمة' : 'List'} value="list" />
              <ToggleButtonGroupItem label={isArabic ? 'شبكة' : 'Grid'} value="grid" />
              <ToggleButtonGroupItem label={isArabic ? 'لوحة' : 'Board'} value="board" />
            </ToggleButtonGroup>
          </div>
        )],
        [isArabic ? 'مجموعة أزرار تبديل - اختيار متعدد' : 'Toggle Button Group - Multi select', (
          <div className="example-stack">
            <span>{isArabic ? 'مرشحات الحالة' : 'Status filters'}</span>
            <ToggleButtonGroup label={isArabic ? 'مرشحات الحالة' : 'Status filters'} type="multiple" defaultValue={['active', 'pending']}>
              <ToggleButtonGroupItem label={isArabic ? 'نشط' : 'Active'} value="active" />
              <ToggleButtonGroupItem label={isArabic ? 'معلق' : 'Pending'} value="pending" />
              <ToggleButtonGroupItem label={isArabic ? 'مغلق' : 'Closed'} value="closed" />
            </ToggleButtonGroup>
          </div>
        )],
        [isArabic ? 'مجموعة أزرار تبديل - عناصر أيقونة' : 'Toggle Button Group - Icon items', (
          <div className="example-stack">
            <span>{isArabic ? 'الأدوات' : 'Tools'}</span>
            <ToggleButtonGroup label={isArabic ? 'الأدوات' : 'Tools'} type="multiple" defaultValue={['favorite']}>
              <ToggleButtonGroupItem aria-label={isArabic ? 'مفضل' : 'Favorite'} icon="☆" isIconOnly pressedIcon="★" value="favorite" />
              <ToggleButtonGroupItem aria-label={isArabic ? 'حفظ مرجعي' : 'Bookmark'} icon="□" isIconOnly pressedIcon="■" value="bookmark" />
              <ToggleButtonGroupItem icon="bell" label={isArabic ? 'الإشعارات' : 'Notifications'} value="notifications" />
            </ToggleButtonGroup>
          </div>
        )],
        [isArabic ? 'مجموعة أزرار تبديل - عمودي' : 'Toggle Button Group - Vertical', (
          <div className="example-stack">
            <span>{isArabic ? 'المحاذاة' : 'Alignment'}</span>
            <ToggleButtonGroup label={isArabic ? 'المحاذاة' : 'Alignment'} orientation="vertical" type="single" defaultValue="start">
              <ToggleButtonGroupItem label={isArabic ? 'بداية' : 'Start'} value="start" />
              <ToggleButtonGroupItem label={isArabic ? 'وسط' : 'Center'} value="center" />
              <ToggleButtonGroupItem label={isArabic ? 'نهاية' : 'End'} value="end" />
            </ToggleButtonGroup>
          </div>
        )],
        [isArabic ? 'مجموعة أزرار تبديل - التعطيل' : 'Toggle Button Group - Disabled', (
          <div className="example-stack">
            <span>{isArabic ? 'مجموعة وعنصر معطلان' : 'Disabled group and item'}</span>
            <ToggleButtonGroup isDisabled label={isArabic ? 'وضع عرض معطل' : 'Disabled view mode'} type="single" defaultValue="grid">
              <ToggleButtonGroupItem label={isArabic ? 'قائمة' : 'List'} value="list" />
              <ToggleButtonGroupItem label={isArabic ? 'شبكة' : 'Grid'} value="grid" />
              <ToggleButtonGroupItem label={isArabic ? 'لوحة' : 'Board'} value="board" />
            </ToggleButtonGroup>
            <ToggleButtonGroup label={isArabic ? 'تعطيل جزئي' : 'Partial disabled'} type="single" defaultValue="grid">
              <ToggleButtonGroupItem label={isArabic ? 'قائمة' : 'List'} value="list" />
              <ToggleButtonGroupItem label={isArabic ? 'شبكة' : 'Grid'} value="grid" />
              <ToggleButtonGroupItem isDisabled label={isArabic ? 'لوحة' : 'Board'} value="board" />
            </ToggleButtonGroup>
          </div>
        )],
        [isArabic ? 'مجموعة أزرار تبديل - العربية وRTL' : 'Toggle Button Group - Arabic / RTL', (
          <div dir="rtl" lang="ar">
            <div className="example-stack">
              <span>محاذاة / Alignment</span>
              <ToggleButtonGroup label="محاذاة" type="single" defaultValue="start">
                <ToggleButtonGroupItem label="بداية" value="start" />
                <ToggleButtonGroupItem label="وسط" value="center" />
                <ToggleButtonGroupItem label="نهاية" value="end" />
              </ToggleButtonGroup>
            </div>
          </div>
        )],
      ]}
      importCode={`import { ToggleButtonGroup, ToggleButtonGroupItem } from '@utopia-studio-design/design-system/ToggleButtonGroup';`}
      isProperties={isProperties}
      name={name}
      overview={(
        type === 'single' ? (
          <ToggleButtonGroup isDisabled={disabled} label={isArabic ? 'وضع العرض' : 'View mode'} orientation={orientation} type="single" value={value} onValueChange={(nextValue: string) => nextValue && setValue(nextValue)}>
            <ToggleButtonGroupItem label={isArabic ? 'قائمة' : 'List'} value="list" />
            <ToggleButtonGroupItem label={isArabic ? 'شبكة' : 'Grid'} value="grid" />
            <ToggleButtonGroupItem label={isArabic ? 'لوحة' : 'Board'} value="board" />
          </ToggleButtonGroup>
        ) : (
          <ToggleButtonGroup isDisabled={disabled} label={isArabic ? 'مرشحات الحالة' : 'Status filters'} orientation={orientation} type="multiple" value={multipleValue} onValueChange={(nextValue: string[]) => setMultipleValue(nextValue)}>
            <ToggleButtonGroupItem label={isArabic ? 'نشط' : 'Active'} value="active" />
            <ToggleButtonGroupItem label={isArabic ? 'معلق' : 'Pending'} value="pending" />
            <ToggleButtonGroupItem label={isArabic ? 'مغلق' : 'Closed'} value="closed" />
          </ToggleButtonGroup>
        )
      )}
      propsPanel={(
        <div className="props-table">
          <PropRow control={<PropSelectControl label="type value" onChange={(value) => setType(value as typeof type)} options={['single', 'multiple']} value={type} />} description="Discriminated union mode for exclusive or multi-select behavior." name="type" type="'single' | 'multiple'" />
          <PropRow control={<PropSelectControl label="value value" onChange={setValue} options={['list', 'grid', 'board']} value={value} />} description="Controlled selected value for type='single'." name="value" type="string" />
          <PropRow control={<PropSelectControl label="orientation value" onChange={(value) => setOrientation(value as typeof orientation)} options={['horizontal', 'vertical']} value={orientation} />} description="Logical group orientation." name="orientation" type="'horizontal' | 'vertical'" />
          <PropRow control={<PropBooleanControl checked={disabled} label="isDisabled value" onChange={setDisabled} />} description="Disables all items in the group." name="isDisabled" type="boolean" />
          <PropRow control={<PropTextControl label="label value" placeholder="View mode" />} description="Accessible group label." name="label" type="string" />
          <PropRow control={<PropTextControl label="onChange value" placeholder="(value) => ..." />} description="Astryx-style change callback alias. Maps to Radix onValueChange." name="onChange" type="(value) => void" />
          <PropRow control={<PropBooleanControl label="item isIconOnly value" />} description="Item prop for square icon-only group items. Always pair with aria-label." name="ToggleButtonGroupItem.isIconOnly" type="boolean" />
        </div>
      )}
      tokens={['--button-group-gap', '--button-group-gap-compact', '--secondary', '--secondary-hover', '--secondary-active', '--radius-control', '--button-height', '--focus-ring-width']}
      usageCode={isArabic ? `import {
  ToggleButtonGroup,
  ToggleButtonGroupItem,
} from '@utopia-studio-design/design-system/ToggleButtonGroup';

export function Example() {
  return (
    <ToggleButtonGroup label="وضع العرض" type="single" defaultValue="grid">
      <ToggleButtonGroupItem label="قائمة" value="list" />
      <ToggleButtonGroupItem label="شبكة" value="grid" />
      <ToggleButtonGroupItem label="لوحة" value="board" />
    </ToggleButtonGroup>
  );
}` : `import {
  ToggleButtonGroup,
  ToggleButtonGroupItem,
} from '@utopia-studio-design/design-system/ToggleButtonGroup';

export function Example() {
  return (
    <ToggleButtonGroup label="View mode" type="single" defaultValue="grid">
      <ToggleButtonGroupItem label="List" value="list" />
      <ToggleButtonGroupItem label="Grid" value="grid" />
      <ToggleButtonGroupItem label="Board" value="board" />
    </ToggleButtonGroup>
  );
}`}
      usageDescription={isArabic ? 'مجموعة أزرار التبديل تتحكم في مجموعة خيارات مرتبطة. استخدمها لحالات الأدوات والمرشحات والتنسيق، وليس لتبويبات التنقل.' : 'Toggle Button Group controls a related set of toggle items. Use it for segmented tool states, filters, and formatting controls, not for navigation tabs.'}
    />
  )
}

type ComponentManifestEntry = typeof components.components[number]

function GenericComponentDetailPage({ entry, tab }: { entry: ComponentManifestEntry; tab: string }) {
  const { locale } = useI18n()
  const isProperties = tab === 'properties'

  return (
    <ActionDocPage
      aiRules={locale === 'ar'
        ? `استخدم ${componentLabel(locale, entry.name)} عندما يناسب هذا الدور. تجنب استخدامه عندما لا يطابق السلوك المطلوب. لا تخترع ألوانا أو قواعد أيقونات أو نصا عربيا إنتاجيا داخل المكوّن.`
        : `Use ${entry.name} when: ${entry.useWhen.join(', ')}. Avoid it when: ${entry.avoidWhen.join(', ')}. Never invent: ${entry.neverInvent.join(', ')}.`}
      examples={genericExamples(entry.name, locale)}
      importCode={entry.packageImport}
      isProperties={isProperties}
      name={entry.name}
      overview={renderGenericPreview(entry.name, locale)}
      overviewPropsPanel={locale === 'ar' ? genericArabicProps(entry.name, false) : genericProps(entry.name, false)}
      propsPanel={locale === 'ar' ? genericArabicProps(entry.name, false) : genericProps(entry.name, false)}
      propsInteractive={false}
      tokens={entry.requiredTokens}
      usageCode={usageFor(entry.name, locale)}
      usageDescription={componentIntro(locale, entry.name) ?? `${entry.name} is a ${entry.category.toLowerCase()} primitive. It follows shadcn/ui architecture where relevant and stays on semantic Utopia tokens.`}
    />
  )
}

function AlertDetailPage({ tab }: { tab: string }) {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'
  const isProperties = tab === 'properties'
  const manifestEntry = components.components.find((component) => component.name === 'Alert')
  const [variant, setVariant] = useState<'default' | 'info' | 'success' | 'warning' | 'destructive'>('success')
  const [showIcon, setShowIcon] = useState(true)
  const [title, setTitle] = useState(isArabic ? 'تم الدفع بنجاح' : 'Payment successful')
  const [description, setDescription] = useState(isArabic ? 'تمت معالجة عملية الدفع. تم إرسال الإيصال إلى بريدك الإلكتروني.' : 'Your payment has been processed. A receipt has been sent to your email address.')

  const preview = (
    <div className="alert-preview-stack" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <Alert showIcon={showIcon} variant={variant}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  )

  const staticProps = (
    <div className="props-table" dir={isArabic ? 'rtl' : undefined} lang={isArabic ? 'ar' : undefined}>
      {(isArabic ? [
        ['variant', "'default' | 'info' | 'success' | 'warning' | 'destructive'", 'المتغير الدلالي للتنبيه. يحدد الأيقونة الافتراضية وتأكيد الحالة من التوكنات.'],
        ['showIcon', 'boolean', 'يعرض أيقونة الحالة افتراضيا. أوقفه عندما يكون التنبيه النصي أوضح.'],
        ['icon', 'ReactNode', 'أيقونة مخصصة اختيارية. فضّل أيقونات دلالية غير اتجاهية حتى لا تحتاج إلى عكس في RTL.'],
        ['AlertTitle', 'ReactNode', 'عنوان قصير للحالة. يجب أن يأتي النص العربي من الترجمة المعتمدة.'],
        ['AlertDescription', 'ReactNode', 'تفاصيل مساندة للتنبيه. حافظ على التفاف النص المختلط داخل RTL.'],
      ] : [
        ['variant', "'default' | 'info' | 'success' | 'warning' | 'destructive'", 'Semantic status variant. It selects the default icon and tokenized status emphasis.'],
        ['showIcon', 'boolean', 'Shows the variant icon by default. Set false for text-only alerts.'],
        ['icon', 'ReactNode', 'Optional custom icon. Use semantic, non-directional icons unless the status requires direction.'],
        ['AlertTitle', 'ReactNode', 'Short status headline. Product owns wording and localization.'],
        ['AlertDescription', 'ReactNode', 'Supporting text supplied by product or localization.'],
      ]).map(([name, type, description]) => (
        <PropRow key={name} description={description} name={name} type={type} />
      ))}
    </div>
  )

  const interactiveProps = (
    <div className="props-table" dir={isArabic ? 'rtl' : undefined} lang={isArabic ? 'ar' : undefined}>
      <PropRow
        control={<PropSelectControl label="variant value" onChange={(value) => setVariant(value as typeof variant)} options={['default', 'info', 'success', 'warning', 'destructive']} value={variant} />}
        description={isArabic ? 'غيّر المتغير لترى الأيقونة والحالة الدلالية في المعاينة.' : 'Change the variant to update the semantic icon and state in the preview.'}
        name="variant"
        type="'default' | 'info' | 'success' | 'warning' | 'destructive'"
      />
      <PropRow
        control={<PropBooleanControl checked={showIcon} label="showIcon value" onChange={setShowIcon} />}
        description={isArabic ? 'يعرض أو يخفي أيقونة الحالة في المعاينة.' : 'Shows or hides the status icon in the preview.'}
        name="showIcon"
        type="boolean"
      />
      <PropRow
        control={<PropTextControl label="AlertTitle value" onChange={setTitle} placeholder={isArabic ? 'تم الدفع بنجاح' : 'Payment successful'} value={title} />}
        description={isArabic ? 'غيّر عنوان التنبيه. النص العربي هنا مثال توثيقي فقط.' : 'Change the alert headline. Product copy remains app-owned.'}
        name="AlertTitle"
        type="ReactNode"
      />
      <PropRow
        control={<PropTextControl label="AlertDescription value" onChange={setDescription} placeholder={isArabic ? 'تمت معالجة العملية.' : 'Your payment has been processed.'} value={description} />}
        description={isArabic ? 'غيّر وصف التنبيه واختبر التفاف النص في RTL.' : 'Change the alert description and check text wrapping.'}
        name="AlertDescription"
        type="ReactNode"
      />
    </div>
  )

  return (
    <ActionDocPage
      aiRules={isArabic
        ? 'استخدم Alert للتنبيهات السياقية غير الحاجبة. لا تضع نصا عربيا إنتاجيا داخل المكوّن؛ مرره من الترجمة.'
        : 'Use Alert for inline, non-blocking status. Do not hardcode product copy or theme primitives inside the component.'}
      examples={genericExamples('Alert', locale)}
      importCode="import { Alert, AlertDescription, AlertTitle } from '@utopia-studio-design/design-system/Alert';"
      isProperties={isProperties}
      name="Alert"
      overview={preview}
      overviewPropsPanel={staticProps}
      propsPanel={interactiveProps}
      propsInteractive
      tokens={manifestEntry?.requiredTokens ?? ['--surface', '--foreground', '--muted-foreground', '--border', '--radius-surface', '--space-1', '--space-3', '--space-4', '--space-5', '--destructive', '--destructive-surface', '--destructive-border', '--destructive-text', '--focus-ring-width']}
      usageCode={usageFor('Alert', locale)}
      usageDescription={isArabic
        ? 'يعرض Alert حالة أو ملاحظة مهمة داخل السياق. استخدمه عندما يحتاج المستخدم إلى فهم الحالة دون فتح حوار حاجب.'
        : 'Alert communicates important status in context. Use it when the user needs to understand state without a blocking dialog.'}
    />
  )
}

function AvatarDetailPage({ tab }: { tab: string }) {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'
  const isProperties = tab === 'properties'
  const manifestEntry = components.components.find((component) => component.name === 'Avatar')
  const [fallback, setFallback] = useState(isArabic ? 'س' : 'US')
  const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('lg')
  const [status, setStatus] = useState<'none' | 'online' | 'busy' | 'away' | 'offline'>('online')
  const [useImage, setUseImage] = useState(false)
  const [showGroup, setShowGroup] = useState(true)
  const [overflow, setOverflow] = useState(isArabic ? '+٣' : '+3')
  const statusValue = status === 'none' ? undefined : status
  const avatarAlt = isArabic ? 'هوية افتراضية' : 'Default identity'

  const preview = (
    <div className="avatar-demo-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <Avatar
        alt={useImage ? (isArabic ? 'عضو فريق من الدوحة' : 'Doha team member') : avatarAlt}
        size={size}
        src={useImage ? '/examples/avatar-doha-shadow.png' : undefined}
        status={statusValue}
      >
        {fallback}
      </Avatar>
      {showGroup ? (
        <AvatarGroup aria-label={isArabic ? 'فريق المشروع' : 'Project team'}>
          <Avatar alt={isArabic ? 'محرر' : 'Editor'} size="sm">{isArabic ? 'س' : 'US'}</Avatar>
          <Avatar alt={isArabic ? 'مصمم' : 'Designer'} size="sm">{isArabic ? 'ن' : 'NK'}</Avatar>
          <Avatar alt={isArabic ? 'مراجع' : 'Reviewer'} size="sm" status="online">{isArabic ? 'ع' : 'AR'}</Avatar>
          <AvatarOverflow aria-label={isArabic ? 'أعضاء إضافيون' : 'More members'} size="sm">{overflow}</AvatarOverflow>
        </AvatarGroup>
      ) : null}
    </div>
  )

  const propsPanel = (
    <div className="props-table" dir={isArabic ? 'rtl' : undefined} lang={isArabic ? 'ar' : undefined}>
      <PropRow
        control={<PropTextControl label="children value" onChange={setFallback} placeholder={isArabic ? 'س' : 'US'} value={fallback} />}
        description={isArabic ? 'المحتوى الافتراضي المرئي. اجعل الأحرف الأولى هي الحالة الافتراضية عندما لا توجد صورة موثقة.' : 'Default visible fallback. Initials are the default when no verified image exists.'}
        name="children"
        type="ReactNode"
      />
      <PropRow
        control={<PropSelectControl label="size value" onChange={(value) => setSize(value as typeof size)} options={['xs', 'sm', 'md', 'lg']} value={size} />}
        description={isArabic ? 'حجم الهوية. استخدم sm في المجموعات وmd أو lg في معاينات الحساب.' : 'Identity size. Use sm in groups and md or lg in account/profile previews.'}
        name="size"
        type="'xs' | 'sm' | 'md' | 'lg'"
      />
      <PropRow
        control={<PropSelectControl label="status value" onChange={(value) => setStatus(value as typeof status)} options={['none', 'online', 'busy', 'away', 'offline']} value={status} />}
        description={isArabic ? 'مؤشر حالة اختياري. يظهر في inline-end وينعكس منطقيا في RTL.' : 'Optional presence indicator. It sits at inline-end and mirrors logically in RTL.'}
        name="status"
        type="'online' | 'busy' | 'away' | 'offline'"
      />
      <PropRow
        control={<PropBooleanControl checked={useImage} label="src enabled value" onChange={setUseImage} />}
        description={isArabic ? 'استخدم صورة موثقة فقط. يبقى fallback موجودا عند فشل الصورة.' : 'Use only a verified image. Fallback remains available when the image fails.'}
        name="src"
        type="string"
      />
      <PropRow
        control={<PropBooleanControl checked={showGroup} label="AvatarGroup enabled value" onChange={setShowGroup} />}
        description={isArabic ? 'يعرض مجموعة هويات بتركيب منطقي وaria-label.' : 'Shows a grouped identity stack with logical overlap and aria-label.'}
        name="AvatarGroup"
        type="component"
      />
      <PropRow
        control={<PropTextControl label="AvatarOverflow value" onChange={setOverflow} placeholder={isArabic ? '+٣' : '+3'} value={overflow} />}
        description={isArabic ? 'عدد إضافي محلي. استخدم أرقاما عربية عند العرض العربي.' : 'Localized remaining count. Use Arabic numerals in Arabic UI.'}
        name="AvatarOverflow"
        type="component"
      />
    </div>
  )

  return (
    <ActionDocPage
      aiRules={isArabic
        ? 'استخدم Avatar للهوية فقط. الحالة الافتراضية هي الأحرف الأولى؛ لا تخترع أشخاصا أو أسماء عربية أو صورا غير موثقة.'
        : 'Use Avatar for identity only. Initials are the default; do not invent people, Arabic names, or unverified profile images.'}
      examples={genericExamples('Avatar', locale)}
      importCode="import { Avatar, AvatarGroup, AvatarOverflow } from '@utopia-studio-design/design-system/DataDisplay';"
      isProperties={isProperties}
      name="Avatar"
      overview={preview}
      overviewPropsPanel={propsPanel}
      propsPanel={propsPanel}
      propsInteractive
      tokens={manifestEntry?.requiredTokens ?? ['--background', '--secondary', '--secondary-foreground', '--avatar-size', '--success', '--warning', '--destructive']}
      usageCode={usageFor('Avatar', locale)}
      usageDescription={isArabic
        ? 'يمثل Avatar شخصا أو حسابا أو كيانا. استخدم الأحرف الأولى كافتراضي، والصورة كتحسين اختياري فقط عندما تكون موثقة.'
        : 'Avatar represents a person, account, or entity. Use initials as the default and image as an optional enhancement only when verified.'}
    />
  )
}

function BadgeDetailPage({ tab }: { tab: string }) {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'
  const isProperties = tab === 'properties'
  const manifestEntry = components.components.find((component) => component.name === 'Badge')
  const [label, setLabel] = useState(isArabic ? 'متاح' : 'Available')
  const [variant, setVariant] = useState<'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'info' | 'warning'>('default')
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [startContent, setStartContent] = useState(false)
  const [endContent, setEndContent] = useState(false)
  const previewLabel = label.trim() || (isArabic ? 'شارة' : 'Badge')

  const defaultVariants = isArabic
    ? [
        ['default', 'شارة'],
        ['secondary', 'ثانوي'],
        ['destructive', 'خطر'],
        ['outline', 'حدود'],
      ] as const
    : [
        ['default', 'Badge'],
        ['secondary', 'Secondary'],
        ['destructive', 'Destructive'],
        ['outline', 'Outline'],
      ] as const

  const statusVariants = isArabic
    ? [
        ['success', 'نشط'],
        ['info', 'مراجعة'],
        ['warning', 'معلّق'],
      ] as const
    : [
        ['success', 'Active'],
        ['info', 'Review'],
        ['warning', 'Pending'],
      ] as const

  const liveBadge = (
    <div className="badge-demo-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <Badge
        endContent={endContent ? (isArabic ? '٣' : '3') : undefined}
        size={size}
        startContent={startContent ? <Tag aria-hidden="true" /> : undefined}
        variant={variant}
      >
        {previewLabel}
      </Badge>
    </div>
  )

  const overview = (
    <div className="badge-demo-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <HStack className="badge-demo-row" gap={2}>
        {defaultVariants.map(([badgeVariant, badgeLabel]) => (
          <Badge key={badgeVariant} variant={badgeVariant}>{badgeLabel}</Badge>
        ))}
      </HStack>
      <HStack className="badge-demo-row" gap={2}>
        {statusVariants.map(([badgeVariant, badgeLabel]) => (
          <Badge key={badgeVariant} startContent={<Tag aria-hidden="true" />} variant={badgeVariant}>{badgeLabel}</Badge>
        ))}
      </HStack>
      <HStack className="badge-demo-row" gap={2}>
        <Badge endContent={isArabic ? '١٢' : '12'} variant="secondary">{isArabic ? 'رسائل' : 'Messages'}</Badge>
        <Badge size="sm" variant="outline">{isArabic ? 'صغير' : 'Small'}</Badge>
        <Badge size="lg" variant="default">{isArabic ? 'كبير' : 'Large'}</Badge>
      </HStack>
    </div>
  )

  const propsPanel = (
    <div className="props-table" dir={isArabic ? 'rtl' : undefined} lang={isArabic ? 'ar' : undefined}>
      <PropRow
        control={<PropTextControl label="children value" onChange={setLabel} placeholder={isArabic ? 'متاح' : 'Available'} value={label} />}
        description={isArabic ? 'نص قصير جدا. يجب أن يأتي النص العربي من الترجمة أو المحتوى المعتمد.' : 'Short visible label. Arabic copy must come from localization or approved content.'}
        name="children"
        type="ReactNode"
      />
      <PropRow
        control={<PropSelectControl label="variant value" onChange={(value) => setVariant(value as typeof variant)} options={['default', 'secondary', 'destructive', 'outline', 'success', 'info', 'warning']} value={variant} />}
        description={isArabic ? 'متغير دلالي يستخدم توكنات النظام ولا يربط المكوّن بألوان Utopia الخام.' : 'Semantic variant. Uses system tokens instead of binding the component to raw Utopia colors.'}
        name="variant"
        type="'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'info' | 'warning'"
      />
      <PropRow
        control={<PropSelectControl label="size value" onChange={(value) => setSize(value as typeof size)} options={['sm', 'md', 'lg']} value={size} />}
        description={isArabic ? 'حجم الشارة. لا تستخدم الحجم لتعويض نص طويل؛ اختصر التسمية.' : 'Badge size. Do not use size to compensate for long copy; shorten the label.'}
        name="size"
        type="'sm' | 'md' | 'lg'"
      />
      <PropRow
        control={<PropBooleanControl checked={startContent} label="startContent value" onChange={setStartContent} />}
        description={isArabic ? 'محتوى بداية منطقي. في RTL ينتقل إلى بداية السطر تلقائيا.' : 'Logical start slot. In RTL it moves to inline-start automatically.'}
        name="startContent"
        type="ReactNode"
      />
      <PropRow
        control={<PropBooleanControl checked={endContent} label="endContent value" onChange={setEndContent} />}
        description={isArabic ? 'محتوى نهاية منطقي مثل عدد قصير. استخدم أرقاما عربية عند الواجهة العربية.' : 'Logical end slot, commonly a short count. Use Arabic numerals in Arabic UI.'}
        name="endContent"
        type="ReactNode"
      />
      <PropRow
        description={isArabic ? 'منفذ تركيب فقط. لا تستخدمه لتجاوز ألوان أو مسافات الثيم.' : 'Composition escape hatch only. Do not use it to override theme color or spacing roles.'}
        name="className"
        type="string"
      />
    </div>
  )

  return (
    <ActionDocPage
      aiRules={isArabic
        ? 'استخدم Badge كعلامة حالة قصيرة أو تصنيف. لا تستخدمه للجمل الطويلة، ولا تخترع نصا عربيا أو ألوانا محلية.'
        : 'Use Badge for short status, taxonomy, and compact markers. Do not use it for sentences, invented local colors, or decorative noise.'}
      examples={[
        [isArabic ? 'المتغيرات الأساسية' : 'Core variants', overview],
        [isArabic ? 'شارة بعدد' : 'Badge with count', (
          <HStack className="badge-demo-row" dir={isArabic ? 'rtl' : 'ltr'} gap={2} lang={isArabic ? 'ar' : 'en'}>
            <Badge endContent={isArabic ? '١٢' : '12'} variant="secondary">{isArabic ? 'الوارد' : 'Inbox'}</Badge>
            <Badge endContent={isArabic ? '٣' : '3'} variant="outline">{isArabic ? 'مراجعات' : 'Reviews'}</Badge>
          </HStack>
        )],
        [isArabic ? 'شارة حالة' : 'Status badges', (
          <HStack className="badge-demo-row" dir={isArabic ? 'rtl' : 'ltr'} gap={2} lang={isArabic ? 'ar' : 'en'}>
            <Badge variant="success">{isArabic ? 'نشط' : 'Active'}</Badge>
            <Badge variant="warning">{isArabic ? 'معلّق' : 'Pending'}</Badge>
            <Badge variant="destructive">{isArabic ? 'يتطلب انتباها' : 'Needs attention'}</Badge>
          </HStack>
        )],
      ]}
      importCode="import { Badge } from '@utopia-studio-design/design-system/Badge';"
      isProperties={isProperties}
      name="Badge"
      overview={isProperties ? liveBadge : overview}
      overviewPropsPanel={propsPanel}
      propsPanel={propsPanel}
      propsInteractive
      tokens={manifestEntry?.requiredTokens ?? ['--primary', '--primary-foreground', '--secondary', '--secondary-foreground', '--border', '--radius-control', '--badge-padding-block', '--badge-padding-inline', '--badge-font-size']}
      usageCode={usageFor('Badge', locale)}
      usageDescription={isArabic
        ? 'يعرض Badge حالة قصيرة أو تصنيفا صغيرا بجانب محتوى أكبر. يجب أن يبقى قصيرا، دلاليا، وسهل القراءة في LTR وRTL.'
        : 'Badge displays a short status or taxonomy marker alongside larger content. Keep it brief, semantic, and readable in both LTR and RTL.'}
    />
  )
}

function ActionDocPage({
  aiRules,
  examples,
  importCode,
  isProperties,
  name,
  overview,
  overviewPropsPanel,
  propsPanel,
  propsInteractive = true,
  tokens,
  usageCode,
  usageDescription = 'Keep behavior explicit, accessible, and token-driven.',
}: {
  aiRules: string
  examples: Array<[string, ReactNode]>
  importCode: string
  isProperties: boolean
  name: string
  overview: ReactNode
  overviewPropsPanel?: ReactNode
  propsPanel: ReactNode
  propsInteractive?: boolean
  tokens: string[]
  usageCode: string
  usageDescription?: string
}) {
  const { locale } = useI18n()
  const slug = slugify(name)
  const displayName = componentLabel(locale, name)
  const tabOverview = t(locale, 'overview')
  const tabProps = t(locale, 'props')

  return (
    <div className="page component-doc-page">
      <section className="component-doc-hero">
        <h1>{displayName}</h1>
        <p>@utopia-studio-design/design-system v0.1.0 · {name.replaceAll(' ', '')}</p>
        <nav className="component-tabs" aria-label={`${name} documentation views`}>
          <a href={`#/components/${slug}#overview`} aria-current={isProperties ? undefined : 'page'}>{tabOverview}</a>
          <a href={`#/components/${slug}?tab=properties#props`} aria-current={isProperties ? 'page' : undefined}>{tabProps}</a>
        </nav>
      </section>

      {isProperties ? (
        <article className="docs-article">
          <section id="props">
            <div className="component-stage properties-stage">{overview}</div>
            <h2>{tabProps}</h2>
            <p>
              {propsInteractive
                ? (locale === 'ar' ? 'غيّر قيمة الخاصية لتحديث المعاينة أعلاه.' : 'Change a prop value to update the preview above.')
                : (locale === 'ar' ? 'هذا جدول عقد الخصائص. لا نعرض عناصر تحكم إلا عندما تكون متصلة بالمعاينة.' : 'This is the prop contract. Controls only appear when they are wired to the preview.')}
            </p>
            {propsPanel}
          </section>
        </article>
      ) : (
        <article className="docs-article">
          <section id="overview">
            <div className="component-stage">{overview}</div>
            <div className="overview-contract">
              <div>
                <h2>{locale === 'ar' ? 'البنية' : 'Architecture'}</h2>
                <p>{locale === 'ar' ? `${displayName} يحافظ على أساس shadcn/ui وسلوك Radix عند الحاجة ومتغيرات متوافقة مع CVA وأصناف CSS دلالية وتنسيق يعتمد على التوكنات.` : `${name} follows the shadcn/ui foundation, Radix behavior where appropriate, CVA-compatible variants, semantic CSS classes, and token-driven styling.`}</p>
              </div>
              <div>
                <h2>{locale === 'ar' ? 'مقروء للذكاء الاصطناعي' : 'AI-readable'}</h2>
                <p>{locale === 'ar' ? 'تعرض كل صفحة مكوّن الاستيراد والخصائص والتوكنات المطلوبة وإرشادات الاستخدام وأمر CLI كثيف حتى يختار الوكيل المكوّن الصحيح دون اختراع واجهة محلية.' : 'Every component page exposes copy-paste imports, props, token requirements, usage guidance, and a dense CLI command so coding agents can choose the right primitive without inventing local UI.'}</p>
              </div>
              <div>
                <h2>{t(locale, 'arabicFriendly')}</h2>
                <p>{locale === 'ar' ? <>استخدم لغة start/end المنطقية، وادعم <code>dir="rtl"</code>، واعتمد IBM Plex Sans Arabic من خلال توكنات الخط العربي، ولا تخترع نصا عربيا إنتاجيا.</> : <>Use logical start/end language, support <code>dir="rtl"</code>, use IBM Plex Sans Arabic through <code>--font-arabic</code>, and never invent Arabic production copy.</>}</p>
              </div>
            </div>
          </section>
          <section id="usage">
            <h2>{t(locale, 'usage')}</h2>
            <p>{usageDescription}</p>
            <div className="code-block"><span>tsx</span><pre>{usageCode}</pre></div>
          </section>
          <section id="examples">
            <h2>{t(locale, 'examples')}</h2>
            <p>{locale === 'ar' ? 'تكوينات وحالات وفحوصات تدعم العربية وRTL.' : 'Common configurations, variations, and Arabic-friendly checks.'}</p>
            {examples.map(([title, content], index) => (
              <ExampleCard
                key={title}
                title={locale === 'ar' ? `${displayName} - مثال ${index + 1}` : title}
                description={locale === 'ar' ? 'يعرض هذا المثال مكوّنات حقيقية من نظام التصميم مع دعم العربية وRTL.' : `${title} rendered with real design-system primitives.`}
              >
                {content}
              </ExampleCard>
            ))}
          </section>
          <section id="best-practices">
            <h2>{t(locale, 'bestPractices')}</h2>
            <div className="practice-table">
              {[
                [locale === 'ar' ? 'افعل' : 'Do', locale === 'ar' ? 'استخدم التوكنات الدلالية والتسميات القابلة للوصول.' : 'Use semantic tokens and accessible labels.'],
                [locale === 'ar' ? 'افعل' : 'Do', locale === 'ar' ? 'فضّل سلوك shadcn/Radix ومغلفات Utopia قبل إنشاء منطق مخصص.' : 'Prefer shadcn/Radix behavior and Utopia wrappers before creating custom component logic.'],
                [locale === 'ar' ? 'افعل' : 'Do', locale === 'ar' ? 'اختبر RTL والنص المختلط.' : 'Test RTL and mixed-script labels.'],
                [locale === 'ar' ? 'افعل' : 'Do', locale === 'ar' ? 'استخدم خصائص CSS المنطقية وتسميات start/end بدلا من left/right.' : 'Use logical CSS properties and start/end naming instead of left/right APIs.'],
                [locale === 'ar' ? 'لا تفعل' : "Don't", locale === 'ar' ? 'لا تخترع ألوانا أو قواعد أيقونات أو نسخة عربية داخل المكوّن.' : 'Invent colors, icon rules, or Arabic copy inside the component.'],
              ].map(([kind, guidance]) => (
                <div key={guidance} className="practice-row">
                  <Badge variant={kind === 'Do' || kind === 'افعل' ? 'success' : 'destructive'}>{kind}</Badge>
                  <p>{guidance}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="props">
            <h2>{tabProps}</h2>
            {overviewPropsPanel ?? propsPanel}
          </section>
          <section id="tokens">
            <h2>{t(locale, 'tokens')}</h2>
            <div className="chip-list">{tokens.map((token) => <span key={token}>{token}</span>)}</div>
          </section>
          <section id="ai-rules">
            <h2>{t(locale, 'aiRules')}</h2>
            <p>{aiRules}</p>
            <div className="code-block"><span>dense</span><pre>{`npm run ds -- component "${name}" --dense`}</pre></div>
            <div className="code-block"><span>import</span><pre>{importCode}</pre></div>
          </section>
        </article>
      )}
    </div>
  )
}

function PropRow({ control, description, name, type }: { control?: ReactNode; description: string; name: string; type: string }) {
  return (
    <div className={control ? 'prop-row' : 'prop-row prop-row--static'}>
      <strong>{name}</strong>
      <div>
        <code>{type}</code>
        <p>{description}</p>
      </div>
      {control ? <div className="prop-control">{control}</div> : null}
    </div>
  )
}

function PropTextControl({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string
  onChange?: (value: string) => void
  placeholder?: string
  value?: string
}) {
  return <TextInput aria-label={label} className="prop-doc-control" onChange={onChange ? (event) => onChange(event.target.value) : undefined} placeholder={placeholder} value={value} />
}

function PropBooleanControl({
  checked,
  label,
  onChange,
}: {
  checked?: boolean
  label: string
  onChange?: (checked: boolean) => void
}) {
  return <Checkbox aria-label={label} checked={checked} className="prop-doc-checkbox" defaultChecked={onChange ? undefined : checked} onCheckedChange={onChange ? (value) => onChange(value === true) : undefined} />
}

function PropSelectControl({
  label,
  onChange,
  options,
  value,
}: {
  label: string
  onChange?: (value: string) => void
  options: string[]
  value?: string
}) {
  const { locale } = useI18n()
  const defaultValue = value ?? options[0]

  return (
    <Select defaultValue={onChange ? undefined : defaultValue} dir={locale === 'ar' ? 'rtl' : 'ltr'} onValueChange={onChange} value={onChange ? defaultValue : undefined}>
      <SelectTrigger aria-label={label} className="prop-doc-control">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function ExampleCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  const { locale } = useI18n()

  return (
    <article className="example-card">
      <div className="example-card-preview">
        <span>{title}</span>
        <div>{children}</div>
      </div>
      <div className="example-card-footer">
        <strong>{locale === 'ar' ? 'الوصف' : 'Description'}</strong>
        <p>{description}</p>
      </div>
    </article>
  )
}

function genericExamples(name: string, locale: Locale): Array<[string, ReactNode]> {
  const base = renderGenericPreview(name, locale)
  const isArabic = locale === 'ar'

  if (name === 'Typography') {
    return [
      ['Human-readable hierarchy', (
        <Prose>
          <Heading level={2}>System typography</Heading>
          <Text size="lg">Use semantic text primitives so hierarchy stays readable across themes.</Text>
          <Text tone="muted">Muted text is for supporting copy, metadata, and lower-emphasis guidance.</Text>
        </Prose>
      )],
      ['Mixed script', (
        <Prose>
          <Heading level={3}>Arabic-friendly typography</Heading>
          <ArabicText>هذا نص تجريبي لا يمثل نسخة إنتاجية.</ArabicText>
          <Text tone="muted">Keep Arabic line-height, direction, and font decisions in the theme contract.</Text>
        </Prose>
      )],
      ['AI-safe copy contract', (
        <div className="code-block">
          <span>rule</span>
          <pre>{'Use <Heading>, <Text>, <Prose>, and <ArabicText>. Do not invent Arabic production copy.'}</pre>
        </div>
      )],
    ]
  }

  if (name === 'Card') {
    return [
      ['Surface composition', (
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>Header, content, action, and footer use a shared spacing contract.</CardDescription>
            <CardAction><Badge variant="outline">Available</Badge></CardAction>
          </CardHeader>
          <CardContent>Use this structure for repeated content or framed tool surfaces.</CardContent>
          <CardFooter><Button variant="secondary">View details</Button></CardFooter>
        </Card>
      )],
      ['Compact surface', <Card size="sm"><CardHeader><CardTitle>Compact</CardTitle><CardDescription>Smaller spacing for dense UI.</CardDescription></CardHeader></Card>],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><Card><CardHeader><CardTitle>بطاقة النظام</CardTitle><CardDescription>نص تجريبي لا يمثل نسخة إنتاجية.</CardDescription></CardHeader></Card></div>],
    ]
  }

  if (name === 'Account Status') {
    return [
      ['Side nav footer', <AccountStatus avatarAlt="Y K" avatarFallback="YK" description="Pro" label="ykkkk12314" />],
      ['Top nav identity', (
        <HStack align="center" gap={4}>
          <TopNav>
            <TopNavItem href="#/docs">Docs</TopNavItem>
            <TopNavItem href="#/components">Components</TopNavItem>
          </TopNav>
          <AccountStatus avatarAlt="Utopia Studio" avatarFallback="US" description="Design System" label="Utopia Studio" />
        </HStack>
      )],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><AccountStatus avatarAlt="مستخدم تجريبي" avatarFallback="م" description="نص تجريبي" label="مستخدم تجريبي" /></div>],
    ]
  }

  if (['Hover Card', 'Popover', 'Tooltip'].includes(name)) {
    return [
      ['Floating surface', base],
      ['Token contract', <Popover><PopoverTrigger asChild><Button variant="secondary">Theme tokens</Button></PopoverTrigger><PopoverContent>Uses surface, border, shadow, and radius tokens.</PopoverContent></Popover>],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="secondary">مساعدة</Button></TooltipTrigger><TooltipContent>نص تجريبي</TooltipContent></Tooltip></TooltipProvider></div>],
    ]
  }

  if (['Aspect Ratio'].includes(name)) {
    return [
      ['Layout primitive', base],
      ['Mixed composition', <Grid columns={2}><Card><CardContent>Primary panel</CardContent></Card><VStack><Button>Action</Button><Button variant="secondary">Secondary</Button></VStack></Grid>],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><HStack><Button>حفظ</Button><Button variant="secondary">إلغاء</Button></HStack></div>],
    ]
  }

  if (['Breadcrumb', 'Command', 'Context Menu', 'Dropdown Menu', 'Tabs'].includes(name)) {
    return [
      ['Navigation primitive', base],
      ['Composition', <ButtonGroup label={`${name} example actions`}><Button variant="secondary">Docs</Button><Button variant="secondary">Components</Button></ButtonGroup>],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><ButtonGroup label="تنقل"><Button variant="secondary">المستندات</Button><Button variant="secondary">المكونات</Button></ButtonGroup></div>],
    ]
  }

  if (['Top Nav', 'Top Nav Heading', 'Top Nav Item', 'Top Nav Menu', 'Top Nav Mega Menu', 'Top Nav Mega Menu Featured Card', 'Top Nav Mega Menu Item', 'Nav Icon'].includes(name)) {
    return [
      ['Top navigation shell', <TopNavExample />],
      ['Mega menu composition', <TopNavMegaMenuExample />],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><TopNavRtlExample /></div>],
    ]
  }

  if (['Mobile Nav', 'Mobile Nav Toggle', 'Nav Heading Menu'].includes(name)) {
    return [
      ['Mobile navigation trigger', <MobileNavExample openByDefault={false} />],
      ['Open mobile navigation', <MobileNavStaticPanel />],
      ['Arabic / RTL', <div dir="rtl" lang="ar"><MobileNavRtlExample /></div>],
    ]
  }

  if (name === 'Side Nav') {
    return [
      ['Side Nav Type 1', <SideNavTypeOne />],
      ['Section grouping', (
        <SideNav aria-label="Section grouping preview">
          <SideNavSection collapsible label="Overview">
            <SideNavItem isCurrent label="Dashboard" />
            <SideNavItem label="Analytics" />
          </SideNavSection>
          <SideNavSection collapsible defaultExpanded={false} label="Account">
            <SideNavItem label="Profile" />
            <SideNavItem label="Settings" />
          </SideNavSection>
        </SideNav>
      )],
      ['Arabic / RTL', (
        <div dir="rtl" lang="ar">
          <SideNav
            aria-label="تنقل تجريبي"
            heading={(
              <SideNavHeading
                endContent={(
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SideNavCollapseButton aria-label="إغلاق الشريط الجانبي" aria-expanded="true">
                          <PanelIcon />
                        </SideNavCollapseButton>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">إغلاق الشريط الجانبي</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                label="سيراميك"
                meta="يوتوبيا"
                subtitle="نظام التصميم"
                variant="brand"
              />
            )}
          >
            <SideNavSection collapsible label="نظرة عامة">
              <SideNavItem isCurrent label="لوحة التحكم" badge="١٢" />
              <SideNavItem label="التحليلات" />
              <SideNavItem isDisabled label="إعدادات تجريبية" />
            </SideNavSection>
            <SideNavSection collapsible defaultExpanded={false} label="فريق العمل">
              <SideNavItem label="Design / تصميم" />
              <SideNavItem label="Product / منتج" />
            </SideNavSection>
          </SideNav>
        </div>
      )],
    ]
  }

  return shadcnConversionExamples(name, base, locale)
}

function TopNavExample() {
  return (
    <div className="top-nav-demo-frame">
      <TopNavHeading icon={<Box aria-hidden="true" />} label="My App" />
      <TopNav>
        <TopNavItem href="#/components/top-nav" isCurrent>Home</TopNavItem>
        <TopNavMenu label="Products">
          <TopNavMenuItem href="#/components">Components</TopNavMenuItem>
          <TopNavMenuItem href="#/templates">Templates</TopNavMenuItem>
        </TopNavMenu>
        <TopNavItem href="#/docs">About</TopNavItem>
      </TopNav>
      <div className="top-nav-demo-actions">
        <NavIcon aria-label="Search"><Search aria-hidden="true" /></NavIcon>
        <NavIcon aria-label="Notifications"><Bell aria-hidden="true" /></NavIcon>
        <NavIcon aria-label="Account"><UserCircle aria-hidden="true" /></NavIcon>
      </div>
    </div>
  )
}

function TopNavMegaMenuExample() {
  return (
    <div className="top-nav-demo-frame">
      <TopNavHeading icon={<Box aria-hidden="true" />} label="Ceramic" />
      <TopNav value="components">
        <TopNavItem href="#/docs" isCurrent>Docs</TopNavItem>
        <TopNavMegaMenu label="Components" value="components">
          <TopNavMegaMenuFeaturedCard
            description="Copy-ready primitives, states, and AI-readable contracts."
            href="#/components"
            icon={<Box aria-hidden="true" />}
            title="Browse library"
          />
          <div className="top-nav-mega-list">
            <TopNavMegaMenuItem description="Buttons, menus, and nav actions." href="#/components/button" title="Action" />
            <TopNavMegaMenuItem description="Cards, popovers, and framed surfaces." href="#/components/card" title="Surfaces" />
            <TopNavMegaMenuItem description="Inputs, selects, and validation patterns." href="#/components/field" title="Forms" />
          </div>
        </TopNavMegaMenu>
        <TopNavItem href="#/themes">الثيمات</TopNavItem>
      </TopNav>
      <div className="top-nav-demo-actions">
        <NavIcon aria-label="Search"><Search aria-hidden="true" /></NavIcon>
      </div>
    </div>
  )
}

function TopNavRtlExample() {
  return (
    <div className="top-nav-demo-frame">
      <TopNavHeading icon={<Box aria-hidden="true" />} label="Ceramic" subtitle="نص تجريبي" />
      <TopNav>
        <TopNavItem href="#/docs" isCurrent>المستندات</TopNavItem>
        <TopNavItem href="#/components">المكونات</TopNavItem>
        <TopNavItem href="#/themes">الثيمات</TopNavItem>
      </TopNav>
      <div className="top-nav-demo-actions">
        <NavIcon aria-label="بحث"><Search aria-hidden="true" /></NavIcon>
        <NavIcon aria-label="الحساب"><UserCircle aria-hidden="true" /></NavIcon>
      </div>
    </div>
  )
}

function MobileNavExample({ openByDefault = false }: { openByDefault?: boolean }) {
  return (
    <MobileNav defaultOpen={openByDefault}>
      <MobileNavTrigger asChild>
        <MobileNavToggle aria-label="Open navigation">
          <Menu aria-hidden="true" />
        </MobileNavToggle>
      </MobileNavTrigger>
      <MobileNavContent>
        <SideNavHeading
          endContent={(
            <NavHeadingMenu>
              <NavHeadingMenuTrigger asChild>
                <NavIcon aria-label="Switch workspace"><MoreHorizontal aria-hidden="true" /></NavIcon>
              </NavHeadingMenuTrigger>
              <NavHeadingMenuContent>
                <DropdownMenuItem>Ceramic</DropdownMenuItem>
                <DropdownMenuItem>Docs preview</DropdownMenuItem>
              </NavHeadingMenuContent>
            </NavHeadingMenu>
          )}
          icon={<Box aria-hidden="true" />}
          label="Ceramic"
          subtitle="Design System"
          variant="brand"
        />
        <SideNavContent>
          <SideNavSection label="Navigation">
            <SideNavItem isCurrent label="Docs" />
            <SideNavItem label="Components" />
            <SideNavItem label="Templates" />
            <SideNavItem label="Themes" />
          </SideNavSection>
        </SideNavContent>
      </MobileNavContent>
    </MobileNav>
  )
}

function MobileNavStaticPanel() {
  return (
    <div className="mobile-nav-static-panel">
      <SideNavHeading
        icon={<Box aria-hidden="true" />}
        label="Ceramic"
        subtitle="Design System"
        variant="brand"
      />
      <SideNavContent>
        <SideNavSection label="Navigation">
          <SideNavItem isCurrent label="Docs" />
          <SideNavItem label="Components" />
          <SideNavItem label="Templates" />
          <SideNavItem label="Themes" />
        </SideNavSection>
      </SideNavContent>
    </div>
  )
}

function MobileNavRtlExample() {
  return (
    <div className="mobile-nav-static-panel" dir="rtl" lang="ar">
      <SideNavHeading
        icon={<Box aria-hidden="true" />}
        label="Ceramic"
        subtitle="نص تجريبي"
        variant="brand"
      />
      <SideNavContent>
        <SideNavSection label="تنقل">
          <SideNavItem isCurrent label="المستندات" />
          <SideNavItem label="المكونات" />
          <SideNavItem label="الثيمات" />
        </SideNavSection>
      </SideNavContent>
    </div>
  )
}

function SideNavTypeOne() {
  const [collapsed, setCollapsed] = useState(false)
  const collapseLabel = collapsed ? 'Open sidebar' : 'Close sidebar'

  return (
    <div className="side-nav-type-one-preview" data-collapsed={collapsed ? 'true' : undefined}>
      <SideNav aria-label="Utopia Studio primary navigation" className="side-nav-type-one" collapsed={collapsed} id="side-nav-type-one">
        <SideNavHeading
          endContent={
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SideNavCollapseButton
                    aria-controls="side-nav-type-one"
                    aria-expanded={!collapsed}
                    aria-label={collapseLabel}
                    onClick={() => setCollapsed((value) => !value)}
                  >
                    <PanelIcon />
                  </SideNavCollapseButton>
                </TooltipTrigger>
                <TooltipContent side="top">{collapseLabel}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
          label="Utopia Studio"
          subtitle="Design System"
          variant="brand"
        />
        <motion.div
          animate={collapsed ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
          aria-hidden={collapsed}
          className="side-nav-type-one-body"
          inert={collapsed ? true : undefined}
          initial={false}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <SideNavSection collapsible label="Overview">
            <SideNavItem icon={<span aria-hidden="true">⌂</span>} isCurrent label="Dashboard" />
            <SideNavItem icon={<span aria-hidden="true">▥</span>} label="Analytics" />
            <SideNavItem icon={<span aria-hidden="true">◇</span>} label="Components" badge={68} />
            <SideNavItem icon={<span aria-hidden="true">□</span>} label="Themes" />
          </SideNavSection>
          <SideNavSection collapsible label="Build">
            <SideNavItem icon={<span aria-hidden="true">✦</span>} label="Templates" />
            <SideNavItem icon={<span aria-hidden="true">⌘</span>} label="AI Rules" />
            <SideNavItem icon={<span aria-hidden="true">↔</span>} label="Arabic Friendly" />
          </SideNavSection>
          <SideNavSection collapsible label="Account">
            <SideNavItem icon={<span aria-hidden="true">○</span>} label="Profile" />
            <SideNavItem icon={<span aria-hidden="true">⚙</span>} label="Settings" />
          </SideNavSection>
          <AccountStatus
            aria-label="Signed in user"
            avatarAlt="Y K"
            avatarFallback="YK"
            className="side-nav-type-one-user"
            description="Pro"
            label="ykkkk12314"
          />
        </motion.div>
      </SideNav>
    </div>
  )
}

function genericProps(name: string, interactive = false) {
  const rows = genericPropRows(name)

  return (
    <div className="props-table">
      {rows.map((row) => (
        <PropRow key={row.name} control={interactive ? row.control : undefined} description={row.description} name={row.name} type={row.type} />
      ))}
    </div>
  )
}

function genericArabicProps(name: string, interactive = false) {
  const extraRows = (() => {
    if (name === 'Table' || name === 'Data Table') {
      return [
        { name: 'TableHeader / TableBody', type: 'component', description: 'تقسم الجدول إلى رأس وجسم مثل shadcn/ui وتحافظ على ترتيب DOM في RTL.', control: <input aria-label="table sections value" placeholder="sections" /> },
        { name: 'TableHead / TableCell', type: 'component', description: 'خلايا دلالية للعنوان والبيانات. استخدم نصا مترجما ولا تثبت محاذاة left/right.', control: <input aria-label="table cells value" placeholder="cells" /> },
      ]
    }
    if (name === 'Tabs') {
      return [
        { name: 'defaultValue', type: 'string', description: 'التبويب المفتوح افتراضيا. السلوك مبني على Radix Tabs.', control: <input aria-label="defaultValue value" placeholder="overview" /> },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'الاتجاه يجب أن ينعكس بصريا دون تغيير API.', control: <select aria-label="dir value"><option>rtl</option><option>ltr</option></select> },
      ]
    }
    if (name === 'Typography') {
      return [
        { name: 'level', type: '1 | 2 | 3 | 4', description: 'المستوى الدلالي للعنوان. لا تستخدم الحجم البصري بدلا من الترتيب الدلالي.', control: <select aria-label="level value"><option>2</option><option>3</option></select> },
        { name: 'tone', type: "'default' | 'muted' | 'subtle'", description: 'درجة النص مرتبطة بتوكنات foreground ولا تعتمد على لون ثابت.', control: <select aria-label="tone value"><option>default</option><option>muted</option></select> },
      ]
    }
    if (name === 'Alert') {
      return [
        { name: 'variant', type: "'default' | 'info' | 'success' | 'warning' | 'destructive'", description: 'المتغير الدلالي للتنبيه. يحدد الأيقونة الافتراضية وتأكيد الحالة من التوكنات.', control: <PropSelectControl label="variant value" options={['success', 'info', 'warning', 'destructive', 'default']} /> },
        { name: 'showIcon', type: 'boolean', description: 'يعرض أيقونة الحالة افتراضيا. أوقفه عندما يكون التنبيه النصي أوضح.', control: <PropBooleanControl checked label="showIcon value" /> },
        { name: 'icon', type: 'ReactNode', description: 'أيقونة مخصصة اختيارية. فضّل أيقونات دلالية غير اتجاهية حتى لا تحتاج إلى عكس في RTL.', control: <PropTextControl label="icon value" placeholder="ReactNode" /> },
        { name: 'tone', type: "'default' | 'info' | 'success' | 'warning' | 'destructive'", description: 'اسم قديم متوافق مع variant. استخدم variant في الكود الجديد.', control: <PropSelectControl label="tone value" options={['success', 'info', 'warning', 'destructive', 'default']} /> },
        { name: 'AlertTitle', type: 'ReactNode', description: 'عنوان قصير للحالة. يجب أن يأتي النص العربي من الترجمة المعتمدة.', control: <PropTextControl label="AlertTitle value" placeholder="تم الدفع بنجاح" /> },
        { name: 'AlertDescription', type: 'ReactNode', description: 'تفاصيل مساندة للتنبيه. حافظ على التفاف النص المختلط داخل RTL.', control: <PropTextControl label="AlertDescription value" placeholder="تمت معالجة العملية." /> },
      ]
    }
    if (['Message', 'Message Scroller', 'Marker', 'Sonner', 'Spinner'].includes(name)) {
      return [
        { name: 'aria-label', type: 'string', description: 'تسمية قابلة للوصول عندما لا يكفي النص المرئي.', control: <input aria-label="aria-label value" placeholder="تسمية" /> },
        { name: 'role', type: 'string', description: 'الدور الدلالي للحالة أو الرسالة أو الإشعار عند الحاجة.', control: <input aria-label="role value" placeholder="status" /> },
      ]
    }
    return []
  })()

  const rows = [
    ...extraRows,
    { name: 'className', type: 'string', description: 'منفذ تركيب فقط. لا تستخدمه لتجاوز التوكنات الدلالية أو قيم الثيم.', control: <input aria-label="className value" placeholder="value" /> },
    { name: 'children', type: 'ReactNode', description: 'المحتوى المرئي داخل المكوّن. يجب أن يأتي النص العربي من الترجمة أو المحتوى المعتمد.', control: <input aria-label="children value" placeholder="محتوى" /> },
    { name: 'dir', type: "'ltr' | 'rtl' | 'auto'", description: 'اختبار الاتجاه. في صفحة العربية يجب أن يعمل المكوّن مع RTL كنمط أساسي.', control: <select aria-label="dir value"><option>rtl</option><option>auto</option><option>ltr</option></select> },
    { name: 'lang', type: 'string', description: 'تلميح اللغة للنص المختلط واستخدام IBM Plex Sans Arabic في الثيم الافتراضي.', control: <input aria-label="lang value" placeholder="ar" /> },
  ]

  return (
    <div className="props-table" dir="rtl" lang="ar">
      {rows.map((row) => (
        <PropRow key={row.name} control={interactive ? row.control : undefined} description={row.description} name={row.name} type={row.type} />
      ))}
    </div>
  )
}

function genericPropRows(name: string) {
  const common = [
    { name: 'className', type: 'string', description: 'Optional class hook. Use it for composition, not for bypassing semantic tokens.', control: <input aria-label="className value" placeholder="value" /> },
    { name: 'children', type: 'ReactNode', description: 'Visible content rendered inside the primitive.', control: <input aria-label="children value" placeholder="content" /> },
    { name: 'dir', type: "'ltr' | 'rtl' | 'auto'", description: 'Direction override for RTL smoke testing. Prefer app-level direction when possible.', control: <select aria-label="dir value"><option>auto</option><option>ltr</option><option>rtl</option></select> },
    { name: 'lang', type: 'string', description: 'Language hint for mixed-script typography and Arabic-friendly rendering.', control: <input aria-label="lang value" placeholder="ar" /> },
  ]

  if (name === 'Account Status') {
    return [
      { name: 'label', type: 'ReactNode', description: 'Required account, user, workspace, or organization label.', control: <input aria-label="label value" placeholder="ykkkk12314" /> },
      { name: 'description', type: 'ReactNode', description: 'Optional status, plan, role, or workspace metadata.', control: <input aria-label="description value" placeholder="Pro" /> },
      { name: 'avatar', type: 'ReactNode', description: 'Optional custom avatar node. Prefer the design-system Avatar component.', control: <input aria-label="avatar value" placeholder="Avatar" /> },
      { name: 'avatarAlt', type: 'string', description: 'Accessible text used by the built-in Avatar fallback.', control: <input aria-label="avatarAlt value" placeholder="Y K" /> },
      { name: 'avatarSrc', type: 'string', description: 'Optional avatar image source used by the built-in Avatar.', control: <input aria-label="avatarSrc value" placeholder="/avatar.png" /> },
      { name: 'avatarFallback', type: 'ReactNode', description: 'Fallback initials rendered by the built-in Avatar.', control: <input aria-label="avatarFallback value" placeholder="YK" /> },
      { name: 'endContent', type: 'ReactNode', description: 'Optional trailing status or menu affordance.', control: <input aria-label="endContent value" placeholder="slot" /> },
      ...common,
    ]
  }

  if (['Breadcrumb', 'Dropdown Menu', 'Context Menu', 'Navigation Menu', 'Pagination', 'Side Nav', 'Side Nav Section', 'Side Nav Heading', 'Side Nav Item', 'Side Nav Collapse Button', 'Top Nav', 'Top Nav Heading', 'Top Nav Item', 'Top Nav Menu', 'Top Nav Mega Menu', 'Top Nav Mega Menu Featured Card', 'Top Nav Mega Menu Item', 'Mobile Nav', 'Mobile Nav Toggle', 'Nav Heading Menu', 'Nav Icon', 'Menubar'].includes(name)) {
    if (name === 'Top Nav') {
      return [
        { name: 'children', type: 'ReactNode', description: 'TopNavItem, TopNavMenu, or TopNavMegaMenu children rendered inside a Radix NavigationMenu list.', control: <input aria-label="children value" placeholder="items" /> },
        { name: 'dir', type: "'ltr' | 'rtl'", description: 'Inherited document direction controls item order and mega-menu alignment.', control: <select aria-label="dir value"><option>ltr</option><option>rtl</option></select> },
        ...common.filter((row) => row.name !== 'children'),
      ]
    }

    if (name === 'Top Nav Heading') {
      return [
        { name: 'label', type: 'ReactNode', description: 'Primary app, product, or workspace label.', control: <input aria-label="label value" placeholder="My App" /> },
        { name: 'icon', type: 'ReactNode', description: 'Optional leading brand mark. The asset is app/theme owned; the component owns sizing and alignment.', control: <input aria-label="icon value" placeholder="icon" /> },
        { name: 'meta', type: 'ReactNode', description: 'Optional line above the label.', control: <input aria-label="meta value" placeholder="Workspace" /> },
        { name: 'subtitle', type: 'ReactNode', description: 'Optional line below the label.', control: <input aria-label="subtitle value" placeholder="Design System" /> },
        ...common,
      ]
    }

    if (name === 'Top Nav Item') {
      return [
        { name: 'href', type: 'string', description: 'Navigation target. Use links for navigation, not action buttons.', control: <input aria-label="href value" placeholder="/docs" /> },
        { name: 'isCurrent', type: 'boolean', description: 'Sets aria-current=page and selected visual state.', control: <input aria-label="isCurrent value" type="checkbox" /> },
        { name: 'children', type: 'ReactNode', description: 'Visible item label.', control: <input aria-label="children value" placeholder="Home" /> },
        ...common.filter((row) => row.name !== 'children'),
      ]
    }

    if (name === 'Top Nav Menu' || name === 'Top Nav Mega Menu') {
      return [
        { name: 'label', type: 'ReactNode', description: 'Visible trigger label. The whole trigger opens the menu.', control: <input aria-label="label value" placeholder="Products" /> },
        { name: 'children', type: 'ReactNode', description: 'Menu links or mega-menu card/item children.', control: <input aria-label="children value" placeholder="menu items" /> },
        { name: 'align', type: "'start' | 'end'", description: 'TopNavMegaMenu alignment relative to the trigger using logical inline start/end.', control: <select aria-label="align value"><option>start</option><option>end</option></select> },
        ...common.filter((row) => row.name !== 'children'),
      ]
    }

    if (name === 'Top Nav Mega Menu Featured Card' || name === 'Top Nav Mega Menu Item') {
      return [
        { name: 'href', type: 'string', description: 'Navigation destination.', control: <input aria-label="href value" placeholder="/components" /> },
        { name: 'title', type: 'ReactNode', description: 'Primary destination title.', control: <input aria-label="title value" placeholder="Browse library" /> },
        { name: 'description', type: 'ReactNode', description: 'Short supporting destination text.', control: <input aria-label="description value" placeholder="Copy-ready examples" /> },
        { name: 'icon', type: 'ReactNode', description: 'Optional start icon slot. Directional icons must mirror in RTL.', control: <input aria-label="icon value" placeholder="icon" /> },
        ...common,
      ]
    }

    if (name === 'Mobile Nav') {
      return [
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state for uncontrolled mobile navigation.', control: <input aria-label="defaultOpen value" type="checkbox" /> },
        { name: 'open', type: 'boolean', description: 'Controlled open state from Radix Dialog.', control: <input aria-label="open value" type="checkbox" /> },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when trigger, overlay, escape, or close action changes state.', control: <input aria-label="onOpenChange value" placeholder="handler" /> },
        { name: 'children', type: 'ReactNode', description: 'MobileNavTrigger and MobileNavContent composition.', control: <input aria-label="children value" placeholder="trigger + content" /> },
        ...common.filter((row) => row.name !== 'children'),
      ]
    }

    if (name === 'Mobile Nav Toggle' || name === 'Nav Icon') {
      return [
        { name: 'aria-label', type: 'string', description: 'Required accessible label for icon-only navigation controls.', control: <input aria-label="aria-label value" placeholder="Open navigation" /> },
        { name: 'children', type: 'ReactNode', description: 'Icon-only visual content. Use lucide or theme-approved icons at the call site.', control: <input aria-label="children value" placeholder="icon" /> },
        { name: 'active', type: 'boolean', description: 'NavIcon selected state for active app/tool affordances.', control: <input aria-label="active value" type="checkbox" /> },
        ...common.filter((row) => row.name !== 'children'),
      ]
    }

    if (name === 'Nav Heading Menu') {
      return [
        { name: 'children', type: 'ReactNode', description: 'NavHeadingMenuTrigger and NavHeadingMenuContent composition, usually inside a nav heading end slot.', control: <input aria-label="children value" placeholder="trigger + content" /> },
        { name: 'defaultOpen', type: 'boolean', description: 'Initial open state for uncontrolled heading menu.', control: <input aria-label="defaultOpen value" type="checkbox" /> },
        ...common.filter((row) => row.name !== 'children'),
      ]
    }

    if (name === 'Side Nav Section') {
      return [
        { name: 'label', type: 'ReactNode', description: 'Optional section label rendered with SideNavHeading before the section items.', control: <input aria-label="label value" placeholder="Overview" /> },
        { name: 'collapsible', type: 'boolean', description: 'Adds a ghost icon-only disclosure button to the section heading.', control: <input aria-label="collapsible value" type="checkbox" /> },
        { name: 'defaultExpanded', type: 'boolean', description: 'Initial expanded state for uncontrolled collapsible sections.', control: <input aria-label="defaultExpanded value" type="checkbox" /> },
        { name: 'expanded', type: 'boolean', description: 'Controlled expanded state for collapsible sections.', control: <input aria-label="expanded value" type="checkbox" /> },
        { name: 'onExpandedChange', type: '(expanded: boolean) => void', description: 'Called when the section disclosure state changes.', control: <input aria-label="onExpandedChange value" placeholder="handler" /> },
        { name: 'children', type: 'ReactNode', description: 'SideNavItem rows or related navigation content owned by this section.', control: <input aria-label="children value" placeholder="items" /> },
        ...common.filter((row) => row.name !== 'children'),
      ]
    }

    if (name === 'Side Nav Collapse Button') {
      return [
        { name: 'aria-label', type: 'string', description: 'Required accessible label, such as Close sidebar or Open sidebar.', control: <input aria-label="aria-label value" placeholder="Close sidebar" /> },
        { name: 'aria-expanded', type: 'boolean', description: 'Current expanded state of the side navigation controlled by this button.', control: <input aria-label="aria-expanded value" type="checkbox" /> },
        { name: 'children', type: 'ReactNode', description: 'Icon-only visual content. Do not render visible text inside this button; pair the control with Tooltip.', control: <input aria-label="children value" placeholder="icon" /> },
        ...common.filter((row) => row.name !== 'children'),
      ]
    }

    if (name === 'Side Nav Heading') {
      return [
        { name: 'variant', type: "'section' | 'brand'", description: 'Section keeps compact group-label styling. Brand creates a larger app/workspace header.', control: <select aria-label="variant value"><option>section</option><option>brand</option></select> },
        { name: 'label', type: 'ReactNode', description: 'Primary heading text. Prefer this prop so agents can identify the heading label reliably.', control: <input aria-label="label value" placeholder="Analytics" /> },
        { name: 'icon', type: 'ReactNode', description: 'Optional leading visual slot. Omit it for text-only headings; icon artwork remains theme or app owned.', control: <input aria-label="icon value" placeholder="icon" /> },
        { name: 'meta', type: 'ReactNode', description: 'Optional text shown above the main label, such as workspace or organization.', control: <input aria-label="meta value" placeholder="Utopia Studio" /> },
        { name: 'subtitle', type: 'ReactNode', description: 'Optional supporting line shown below the label.', control: <input aria-label="subtitle value" placeholder="Design System" /> },
        { name: 'version', type: 'ReactNode', description: 'Alias for subtitle when the heading represents a versioned docs or product surface.', control: <input aria-label="version value" placeholder="v1.0.1" /> },
        { name: 'endContent', type: 'ReactNode', description: 'Optional trailing slot for a chevron, status, or menu affordance.', control: <input aria-label="endContent value" placeholder="slot" /> },
        { name: 'as', type: "'div' | 'h2' | 'h3' | 'button'", description: 'Underlying semantic element. Use button only when the whole heading opens a selector or menu.', control: <select aria-label="as value"><option>h3</option><option>div</option><option>h2</option><option>button</option></select> },
        ...common,
      ]
    }

    if (name === 'Side Nav Item') {
      return [
        { name: 'label', type: 'ReactNode', description: 'Primary visible label. Prefer this over ad hoc children when agents need predictable item text.', control: <input aria-label="label value" placeholder="Inbox" /> },
        { name: 'icon', type: 'ReactNode', description: 'Optional leading icon slot. Omit it when the item should be text-only.', control: <input aria-label="icon value" placeholder="icon" /> },
        { name: 'startContent', type: 'ReactNode', description: 'Optional leading slot for an app-owned icon or mark. The component owns spacing, not the icon asset.', control: <input aria-label="startContent value" placeholder="icon" /> },
        { name: 'badge', type: 'ReactNode', description: 'Optional trailing count or status pill, such as unread count.', control: <input aria-label="badge value" placeholder="12" /> },
        { name: 'endContent', type: 'ReactNode', description: 'Optional trailing slot for non-count content.', control: <input aria-label="endContent value" placeholder="slot" /> },
        { name: 'isCurrent', type: 'boolean', description: 'Marks the item as the current page and sets aria-current=\"page\".', control: <input aria-label="isCurrent value" type="checkbox" /> },
        { name: 'isDisabled', type: 'boolean', description: 'Removes the item from tab order, prevents navigation, and applies disabled status styling.', control: <input aria-label="isDisabled value" type="checkbox" /> },
        ...common,
      ]
    }

    return [
      { name: 'href', type: 'string', description: 'Destination for link-based navigation items. Keep routing app-owned.', control: <input aria-label="href value" placeholder="#/components" /> },
      { name: 'aria-current', type: "'page' | undefined", description: 'Marks the current navigation destination for assistive technology.', control: <select aria-label="aria-current value"><option>undefined</option><option>page</option></select> },
      ...common,
    ]
  }

  if (['Accordion', 'Collapsible'].includes(name)) {
    return [
      { name: 'type', type: "'single' | 'multiple'", description: 'Disclosure mode. Keep keyboard behavior aligned with the shadcn/Radix source pattern.', control: <select aria-label="type value"><option>single</option><option>multiple</option></select> },
      { name: 'defaultValue', type: 'string | string[]', description: 'Initial open item value.', control: <input aria-label="defaultValue value" placeholder="item-1" /> },
      { name: 'collapsible', type: 'boolean', description: 'Allows a single open item to close when optional.', control: <input aria-label="collapsible value" type="checkbox" /> },
      ...common,
    ]
  }

  if (name === 'Alert') {
    return [
      { name: 'variant', type: "'default' | 'info' | 'success' | 'warning' | 'destructive'", description: 'Semantic status variant. It selects the default icon and tokenized status emphasis.', control: <PropSelectControl label="variant value" options={['default', 'info', 'success', 'warning', 'destructive']} /> },
      { name: 'showIcon', type: 'boolean', description: 'Shows the variant icon by default. Set false for text-only alerts.', control: <PropBooleanControl checked label="showIcon value" /> },
      { name: 'icon', type: 'ReactNode', description: 'Optional custom icon. Use semantic, non-directional icons unless the status requires direction.', control: <PropTextControl label="icon value" placeholder="ReactNode" /> },
      { name: 'tone', type: "'default' | 'info' | 'success' | 'warning' | 'destructive'", description: 'Backward-compatible alias for variant. Prefer variant for new code.', control: <PropSelectControl label="tone value" options={['default', 'info', 'success', 'warning', 'destructive']} /> },
      { name: 'role', type: "'alert'", description: 'Alert uses role alert for important inline status.', control: <PropTextControl label="role value" placeholder="alert" /> },
      { name: 'AlertTitle', type: 'ReactNode', description: 'Short status headline.', control: <PropTextControl label="AlertTitle value" placeholder="System notice" /> },
      { name: 'AlertDescription', type: 'ReactNode', description: 'Supporting text supplied by product or localization.', control: <PropTextControl label="AlertDescription value" placeholder="Description" /> },
      ...common,
    ]
  }

  if (['Alert Dialog', 'Dialog', 'Drawer', 'Sheet', 'Sonner', 'Toast', 'Alert'].includes(name)) {
    return [
      { name: 'open', type: 'boolean', description: 'Controlled visibility state where the implementation supports it.', control: <input aria-label="open value" type="checkbox" /> },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'State change callback. Keep business side effects in the app layer.', control: <input aria-label="onOpenChange value" placeholder="setOpen" /> },
      { name: 'role', type: 'string', description: 'Accessible role inherited from the shadcn primitive or native element.', control: <input aria-label="role value" placeholder="dialog" /> },
      ...common,
    ]
  }

  if (name === 'Aspect Ratio') {
    return [
      { name: 'ratio', type: 'number', description: 'Aspect ratio, for example 16 / 9, 4 / 3, or 1 / 1.', control: <input aria-label="ratio value" placeholder="16 / 9" /> },
      ...common,
    ]
  }

  if (['Input', 'Input Group', 'Input OTP', 'Native Select', 'Select', 'Textarea', 'Combobox', 'Date Picker', 'Checkbox', 'Radio Group', 'Switch', 'Slider', 'Field', 'Label'].includes(name)) {
    return [
      { name: 'name', type: 'string', description: 'Form submission name. Keep product data rules outside the reusable component.', control: <input aria-label="name value" placeholder="fieldName" /> },
      { name: 'value', type: 'string | number | boolean', description: 'Controlled value where applicable.', control: <input aria-label="value value" placeholder="value" /> },
      { name: 'disabled', type: 'boolean', description: 'Disabled state. Preserve focus and accessibility behavior from the source primitive.', control: <input aria-label="disabled value" type="checkbox" /> },
      { name: 'required', type: 'boolean', description: 'Required field signal. Pair with Field status text in product forms.', control: <input aria-label="required value" type="checkbox" /> },
      ...common,
    ]
  }

  if (['Resizable', 'Scroll Area', 'Separator', 'Direction'].includes(name)) {
    return [
      { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 6 | 8 | 12', description: 'Spacing token scale. Never pass raw pixel strings.', control: <select aria-label="gap value"><option>2</option><option>4</option><option>6</option><option>8</option></select> },
      { name: 'columns', type: '1 | 2 | 3 | 4 | 6 | 12', description: 'Grid column count where applicable.', control: <select aria-label="columns value"><option>1</option><option>2</option><option>3</option><option>4</option></select> },
      ...common,
    ]
  }

  if (name === 'Attachment') {
    return [
      { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Attachment layout direction. Uses logical spacing in both LTR and RTL.', control: <select aria-label="orientation value"><option>horizontal</option><option>vertical</option></select> },
      { name: 'size', type: "'default' | 'sm' | 'xs'", description: 'Density for attachment rows and compact lists.', control: <select aria-label="size value"><option>default</option><option>sm</option><option>xs</option></select> },
      { name: 'state', type: "'idle' | 'uploading' | 'processing' | 'error' | 'done'", description: 'Semantic processing state. Do not invent visual states.', control: <select aria-label="state value"><option>done</option><option>uploading</option><option>processing</option><option>error</option><option>idle</option></select> },
      { name: 'progress', type: 'number', description: 'Optional upload or processing progress from 0 to 100. Product code owns the upload state.', control: <input aria-label="progress value" placeholder="64" type="number" /> },
      { name: 'AttachmentMedia variant', type: "'icon' | 'image'", description: 'Use image for thumbnails and icon for file/status media. Media stays at inline-start in RTL.', control: <select aria-label="AttachmentMedia variant value"><option>icon</option><option>image</option></select> },
      { name: 'AttachmentActions', type: 'ReactNode', description: 'Inline-end action group for open, retry, remove, or download.', control: <input aria-label="AttachmentActions value" placeholder="actions" /> },
      ...common,
    ]
  }

  if (['Hover Card', 'Popover', 'Tooltip', 'Command', 'Tabs'].includes(name)) {
    return [
      { name: 'open', type: 'boolean', description: 'Controlled open or selected state where the Radix-backed implementation supports it.', control: <input aria-label="open value" type="checkbox" /> },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'State change callback for controlled surfaces.', control: <input aria-label="onOpenChange value" placeholder="setOpen" /> },
      ...common,
    ]
  }

  if (name === 'Typography') {
    return [
      { name: 'level', type: '1 | 2 | 3 | 4', description: 'Heading hierarchy. Use semantic levels instead of visual-only font sizes.', control: <select aria-label="level value"><option>1</option><option>2</option><option>3</option><option>4</option></select> },
      { name: 'tone', type: "'default' | 'muted' | 'subtle'", description: 'Text emphasis mapped to semantic foreground tokens.', control: <select aria-label="tone value"><option>default</option><option>muted</option><option>subtle</option></select> },
      ...common,
    ]
  }

  if (['Avatar', 'Badge', 'Calendar', 'Carousel', 'Chart', 'Data Table', 'Empty', 'Item', 'Kbd', 'Progress', 'Skeleton', 'Spinner', 'Table', 'Attachment', 'Bubble', 'Marker', 'Message', 'Message Scroller'].includes(name)) {
    return [
      { name: 'aria-label', type: 'string', description: 'Accessible label when visible text is insufficient.', control: <input aria-label="aria-label value" placeholder={`${name} label`} /> },
      { name: 'data-state', type: 'string', description: 'Optional state attribute for token-safe styling and AI-readable examples.', control: <input aria-label="data-state value" placeholder="active" /> },
      ...common,
    ]
  }

  return common
}

function renderGenericPreview(name: string, locale: Locale = 'en') {
  const isArabic = locale === 'ar'

  if (name === 'Typography') return <TypographyPreview locale={locale} />
  if (name === 'Tabs') return <TabsPreview locale={locale} />
  if (name === 'Table') return <TablePreview locale={locale} />
  if (name === 'Spinner') return <SpinnerPreview locale={locale} />
  if (name === 'Sonner') return <SonnerPreview locale={locale} />
  if (name === 'Message') return <MessagePreview locale={locale} />
  if (name === 'Message Scroller') return <MessageScrollerPreview locale={locale} />
  if (name === 'Marker') return <MarkerPreview locale={locale} />

  if (name === 'Typography') {
    return (
      <Prose>
        <Heading level={2}>Typography</Heading>
        <Text size="lg">Readable hierarchy for humans, stable semantic primitives for AI agents.</Text>
        <ArabicText>هذا نص تجريبي لا يمثل نسخة إنتاجية.</ArabicText>
      </Prose>
    )
  }

  if (name === 'Card') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card content uses semantic surface tokens.</CardDescription>
        </CardHeader>
        <CardContent><Button variant="outline">Open</Button></CardContent>
      </Card>
    )
  }
  if (name === 'Hover Card') {
    return <HoverCard><HoverCardTrigger asChild><Button variant="secondary">Hover target</Button></HoverCardTrigger><HoverCardContent>Preview details</HoverCardContent></HoverCard>
  }
  if (name === 'Popover') {
    return <Popover><PopoverTrigger asChild><Button variant="secondary">Open popover</Button></PopoverTrigger><PopoverContent>Popover content</PopoverContent></Popover>
  }
  if (name === 'Tooltip') {
    return <TooltipProvider><Tooltip open><TooltipTrigger asChild><Button variant="secondary">Target</Button></TooltipTrigger><TooltipContent>Helpful label</TooltipContent></Tooltip></TooltipProvider>
  }
  if (name === 'Aspect Ratio') {
    return <AspectRatio ratio={16 / 9}><Center>16:9</Center></AspectRatio>
  }
  if (name === 'Breadcrumb') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#/components">Components</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  if (name === 'Side Nav Heading') {
    return (
      <div className="side-nav-heading-preview">
        <SideNavHeading
          icon={<span aria-hidden="true" className="side-nav-heading-preview-icon">▦</span>}
          label="Analytics"
          variant="brand"
        />
        <SideNavHeading
          endContent={<span aria-hidden="true">⌄</span>}
          icon={<span aria-hidden="true" className="side-nav-heading-preview-icon">▤</span>}
          label="Documentation"
          variant="brand"
          version="v1.0.1"
        />
        <SideNavHeading
          icon={<span aria-hidden="true" className="side-nav-heading-preview-icon">▦</span>}
          label="Analytics"
          meta="Utopia Studio"
          subtitle="Design System"
          variant="brand"
        />
      </div>
    )
  }
  if (name === 'Side Nav Section') {
    return (
      <SideNav aria-label="Preview sectioned side navigation">
        <SideNavSection collapsible label="Overview">
          <SideNavItem icon={<span aria-hidden="true">⌂</span>} isCurrent label="Dashboard" />
          <SideNavItem icon={<span aria-hidden="true">▥</span>} label="Analytics" />
        </SideNavSection>
        <SideNavSection collapsible defaultExpanded={false} label="Account">
          <SideNavItem icon={<span aria-hidden="true">○</span>} label="Profile" />
          <SideNavItem icon={<span aria-hidden="true">⚙</span>} label="Settings" />
        </SideNavSection>
      </SideNav>
    )
  }
  if (name === 'Side Nav Item') {
    return (
      <SideNav aria-label="Preview side navigation items">
        <SideNavItem isCurrent label="Inbox" badge={12} />
        <SideNavItem label="Documents" />
        <SideNavItem isDisabled label="Settings" />
      </SideNav>
    )
  }
  if (name === 'Side Nav Collapse Button') {
    return (
      <SideNav aria-label="Preview collapsible side navigation">
        <SideNavHeading
          endContent={
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SideNavCollapseButton aria-label="Close sidebar" aria-expanded="true">
                    <PanelIcon />
                  </SideNavCollapseButton>
                </TooltipTrigger>
                <TooltipContent side="bottom">Close sidebar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
          label="Utopia Studio"
          subtitle="Design System"
          variant="brand"
        />
        <SideNavSection label="Overview">
          <SideNavItem isCurrent label="Dashboard" />
          <SideNavItem label="Analytics" />
        </SideNavSection>
      </SideNav>
    )
  }
  if (name === 'Side Nav') {
    return <SideNavTypeOne />
  }
  if (name === 'Top Nav') return <TopNavExample />
  if (name === 'Top Nav Heading') return <TopNavHeading icon={<Box aria-hidden="true" />} label="My App" subtitle="Design System" />
  if (name === 'Top Nav Item') return <TopNav><TopNavItem href="#/components/top-nav-item" isCurrent>Home</TopNavItem><TopNavItem href="#/docs">Docs</TopNavItem></TopNav>
  if (name === 'Top Nav Menu') return <TopNav><TopNavMenu label="Products"><TopNavMenuItem href="#/components">Components</TopNavMenuItem><TopNavMenuItem href="#/templates">Templates</TopNavMenuItem></TopNavMenu></TopNav>
  if (name === 'Top Nav Mega Menu') return <TopNavMegaMenuExample />
  if (name === 'Top Nav Mega Menu Featured Card') return <TopNavMegaMenuFeaturedCard description="Featured navigation destination." href="#/components" icon={<Box aria-hidden="true" />} title="Browse library" />
  if (name === 'Top Nav Mega Menu Item') return <TopNavMegaMenuItem description="Reusable item for mega menus." href="#/components/button" title="Action" />
  if (name === 'Mobile Nav') return <MobileNavStaticPanel />
  if (name === 'Mobile Nav Toggle') return <MobileNavToggle aria-label={isArabic ? 'فتح التنقل' : 'Open navigation'}><Menu aria-hidden="true" /></MobileNavToggle>
  if (name === 'Nav Heading Menu') {
    return (
      <NavHeadingMenu defaultOpen>
        <NavHeadingMenuTrigger asChild>
          <Button variant="secondary">Ceramic</Button>
        </NavHeadingMenuTrigger>
        <NavHeadingMenuContent>
          <DropdownMenuItem>Ceramic</DropdownMenuItem>
          <DropdownMenuItem>Docs preview</DropdownMenuItem>
        </NavHeadingMenuContent>
      </NavHeadingMenu>
    )
  }
  if (name === 'Nav Icon') return <NavIcon aria-label="Search"><Search aria-hidden="true" /></NavIcon>
  if (name.startsWith('Side Nav')) {
    return (
      <SideNav aria-label="Preview side navigation">
        <SideNavSection label="Workspace">
          <SideNavItem isCurrent label="Inbox" badge={12} />
          <SideNavItem label="Documents" />
          <SideNavItem isDisabled label="Settings" />
        </SideNavSection>
      </SideNav>
    )
  }
  if (name === 'Dropdown Menu') return <MenuAnatomyPreview kind="dropdown" locale={locale} />
  if (name === 'Context Menu') return <MenuAnatomyPreview kind="context" locale={locale} />
  if (name === 'Command') {
    return (
      <CommandPalette>
        <CommandPaletteInput placeholder={isArabic ? 'ابحث في الأوامر...' : 'Search commands...'} />
        <CommandPaletteList>
          <CommandPaletteEmpty>{isArabic ? 'لم يتم العثور على أمر.' : 'No command found.'}</CommandPaletteEmpty>
          <CommandPaletteGroup heading={isArabic ? 'نظام التصميم' : 'Design System'}>
            <CommandPaletteItem>{isArabic ? 'افتح المكونات' : 'Open components'}</CommandPaletteItem>
            <CommandPaletteItem>{isArabic ? 'ابحث في التوكنات' : 'Search tokens'}</CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPalette>
    )
  }
  if (name === 'Field') return <Field><FieldLabel>{isArabic ? 'التسمية' : 'Label'}</FieldLabel><TextInput placeholder={isArabic ? 'القيمة' : 'Value'} /></Field>
  if (name === 'Input') return <Field><FieldLabel>{isArabic ? 'بحث' : 'Search'}</FieldLabel><TextInput placeholder={isArabic ? 'ابحث في المكونات' : 'Search components'} /></Field>
  if (name === 'Textarea') return <Field><FieldLabel>{isArabic ? 'ملاحظة المشروع' : 'Project note'}</FieldLabel><TextArea placeholder={isArabic ? 'اكتب ملاحظة' : 'Write a note'} /></Field>
  if (name === 'Checkbox') {
    return (
      <VStack className="checkbox-detail-preview" gap={3}>
        <label className="form-preview-row"><Checkbox defaultChecked /> {isArabic ? 'تذكرني' : 'Remember me'}</label>
        <label className="form-preview-row"><Checkbox /> {isArabic ? 'إرسال الملخص الأسبوعي' : 'Send weekly summary'}</label>
        <label className="form-preview-row is-disabled"><Checkbox disabled /> {isArabic ? 'خيار غير متاح' : 'Unavailable option'}</label>
      </VStack>
    )
  }
  if (name === 'Radio Group') return <RadioGroupPreview locale={locale} />
  if (name === 'Select') return <SelectPreview locale={locale} />
  if (name === 'Slider') return <SliderPreview />
  if (name === 'Switch') return <SwitchPreview locale={locale} />
  if (name === 'Account Status') return <AccountStatus avatarAlt={isArabic ? 'مستخدم تجريبي' : 'Y K'} avatarFallback={isArabic ? 'م' : 'YK'} description={isArabic ? 'محترف' : 'Pro'} label={isArabic ? 'مستخدم تجريبي' : 'ykkkk12314'} />
  if (name === 'Avatar') return <AvatarPreview locale={locale} />
  if (name === 'Calendar') return <Calendar locale={isArabic ? 'ar' : 'en-US'} month={new Date(2026, 6, 1)} selectedDate={new Date(2026, 6, 6)} />
  if (name === 'Empty') return <EmptyState>{isArabic ? 'لا توجد عناصر بعد.' : 'No items yet.'}</EmptyState>
  if (name === 'Progress') return <Field><FieldLabel>{isArabic ? 'تقدم الرفع ٦٢٪' : 'Upload progress 62%'}</FieldLabel><ProgressBar value={62} /></Field>
  if (name === 'Skeleton') return <Field><FieldLabel>{isArabic ? 'تحميل الملف الشخصي' : 'Loading profile'}</FieldLabel><Skeleton /></Field>
  if (name === 'Toast') return <Toast><ToastTitle>{isArabic ? 'تم الحفظ' : 'Saved'}</ToastTitle><ToastDescription>{isArabic ? 'التغييرات جاهزة للمراجعة.' : 'Changes are ready for review.'}</ToastDescription></Toast>
  if (name === 'Badge') return <Badge>{isArabic ? 'افتراضي' : 'Default'}</Badge>
  if (isShadcnMappedPrimitive(name)) {
    return renderShadcnMappedPreview(name, locale)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{componentLabel(locale, name)}</CardTitle>
        <CardDescription>{isArabic ? 'عقد مكوّن مدعوم بالمانيفست ومعاينة بداية.' : 'Manifest-backed component contract and starter preview.'}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function isShadcnMappedPrimitive(name: string) {
  return components.components.some((component) => component.name === name && component.sourcePath.includes('ShadcnPrimitives'))
}

function SliderPreview() {
  const [value, setValue] = useState([40])
  const currentValue = value[0] ?? 0

  return (
    <div className="form-control-preview">
      <Field className="form-preview-field">
        <FieldLabel>Volume {currentValue}%</FieldLabel>
        <Slider
          aria-label="Volume"
          max={100}
          onValueChange={setValue}
          step={1}
          value={value}
        />
      </Field>
      <Field className="form-preview-field is-muted">
        <FieldLabel>Disabled 70%</FieldLabel>
        <Slider aria-label="Disabled volume" defaultValue={[70]} disabled max={100} />
      </Field>
    </div>
  )
}

function RadioGroupPreview({ locale = 'en' }: { locale?: Locale } = {}) {
  const isArabic = locale === 'ar'
  const [value, setValue] = useState('docs')

  return (
    <RadioGroup
      aria-label={isArabic ? 'طريقة العرض' : 'View'}
      className="form-control-preview"
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={isArabic ? 'ar' : 'en'}
      onValueChange={setValue}
      value={value}
    >
      <div className="form-preview-row">
        <RadioGroupItem id="radio-preview-docs" value="docs" />
        <label htmlFor="radio-preview-docs">{isArabic ? 'المستندات' : 'Docs'}</label>
      </div>
      <div className="form-preview-row">
        <RadioGroupItem id="radio-preview-components" value="components" />
        <label htmlFor="radio-preview-components">{isArabic ? 'المكونات' : 'Components'}</label>
      </div>
      <div className="form-preview-row is-disabled">
        <RadioGroupItem disabled id="radio-preview-disabled" value="disabled" />
        <label htmlFor="radio-preview-disabled">{isArabic ? 'غير متاح' : 'Disabled option'}</label>
      </div>
    </RadioGroup>
  )
}

function SelectPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  return (
    <div className="form-control-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <Select defaultValue="default">
        <SelectTrigger aria-label={isArabic ? 'الثيم' : 'Theme'}><SelectValue placeholder={isArabic ? 'الثيم' : 'Theme'} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="default">{isArabic ? 'ثيم يوتوبيا الافتراضي' : 'Utopia Default'}</SelectItem>
          <SelectItem value="future">{isArabic ? 'ثيم مستقبلي' : 'Future theme'}</SelectItem>
        </SelectContent>
      </Select>
      <Select disabled>
        <SelectTrigger aria-label={isArabic ? 'ثيم معطل' : 'Disabled theme'}><SelectValue placeholder={isArabic ? 'غير متاح' : 'Disabled'} /></SelectTrigger>
      </Select>
    </div>
  )
}

function SwitchPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  return (
    <div className="form-control-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <label className="form-preview-row"><Switch defaultChecked /> {isArabic ? 'تفعيل الإشعارات' : 'Enable notifications'}</label>
      <label className="form-preview-row"><Switch /> {isArabic ? 'وضع هادئ' : 'Quiet mode'}</label>
      <label className="form-preview-row is-disabled"><Switch disabled /> {isArabic ? 'غير متاح' : 'Disabled'}</label>
    </div>
  )
}

function AttachmentDemoPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'
  const images = [
    {
      name: isArabic ? 'مساحة-عمل.png' : 'workspace.png',
      meta: isArabic ? 'PNG · ٨٢٠ KB' : 'PNG · 820 KB',
      src: '/examples/doha-shadow.png',
      alt: isArabic ? 'ظل معماري في الدوحة' : 'Doha architectural shadow',
    },
    {
      name: isArabic ? 'مرجع-مكتب.jpg' : 'desk-reference.jpg',
      meta: isArabic ? 'JPG · ١.١ MB' : 'JPG · 1.1 MB',
      src: '/examples/doha-majlis-workspace.png',
      alt: isArabic ? 'مساحة عمل مستوحاة من المجلس' : 'Majlis inspired workspace',
    },
    {
      name: isArabic ? 'مرجع-استوديو.jpg' : 'office-reference.jpg',
      meta: isArabic ? 'JPG · ٩٤٠ KB' : 'JPG · 940 KB',
      src: '/examples/doha-museum-courtyard.png',
      alt: isArabic ? 'فناء متحف في الدوحة' : 'Doha museum courtyard',
    },
  ]

  return (
    <div className="attachment-demo-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <AttachmentGroup className="attachment-demo-image-group">
        {images.map((image) => (
          <Attachment key={image.name} orientation="vertical" state="done">
            <AttachmentMedia variant="image">
              <img src={image.src} alt={image.alt} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{image.name}</AttachmentTitle>
              <AttachmentDescription>{image.meta}</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ))}
      </AttachmentGroup>
      <Attachment className="attachment-demo-row" progress={64} state="uploading">
        <AttachmentMedia>
          <LoaderCircle aria-hidden="true" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{isArabic ? 'لوحة-المبيعات.pdf' : 'sales-dashboard.pdf'}</AttachmentTitle>
          <AttachmentDescription>{isArabic ? 'جار الرفع · ٦٤٪' : 'Uploading · 64%'}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label={isArabic ? 'إلغاء الرفع' : 'Cancel upload'}>
            <X aria-hidden="true" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="attachment-demo-row" state="done">
        <AttachmentMedia>
          <FileCode aria-hidden="true" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{isArabic ? 'عارض-الرسائل.tsx' : 'message-renderer.tsx'}</AttachmentTitle>
          <AttachmentDescription>{isArabic ? 'TypeScript · ١٢ KB' : 'TypeScript · 12 KB'}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label={isArabic ? 'إزالة عارض الرسائل' : 'Remove message-renderer.tsx'}>
            <X aria-hidden="true" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}

function AvatarPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'
  const copy = {
    primaryAlt: isArabic ? 'عضو فريق من الدوحة' : 'Doha team member',
    secondaryAlt: isArabic ? 'مصمم في الاستوديو' : 'Studio designer',
    tertiaryAlt: isArabic ? 'قيادة المنتج' : 'Product lead',
    fallback: isArabic ? 'س' : 'US',
    secondFallback: isArabic ? 'ن' : 'NK',
    thirdFallback: isArabic ? 'ع' : 'AR',
    overflow: isArabic ? '+٣' : '+3',
  }

  return (
    <div className="avatar-demo-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <Avatar alt={isArabic ? 'هوية افتراضية' : 'Default identity'} size="lg" status="online">{copy.fallback}</Avatar>
      <Avatar alt={isArabic ? 'عضو فريق' : 'Team member'} status="away">{copy.secondFallback}</Avatar>
      <Avatar alt={copy.primaryAlt} size="lg" src="/examples/avatar-doha-shadow.png" status="busy" />
      <AvatarGroup aria-label={isArabic ? 'فريق المشروع' : 'Project team'}>
        <Avatar alt={isArabic ? 'محرر' : 'Editor'} size="sm">{copy.fallback}</Avatar>
        <Avatar alt={isArabic ? 'مصمم' : 'Designer'} size="sm">{copy.secondFallback}</Avatar>
        <Avatar alt={isArabic ? 'مراجع' : 'Reviewer'} size="sm" status="online">{copy.thirdFallback}</Avatar>
        <AvatarOverflow aria-label={isArabic ? 'ثلاثة أعضاء إضافيين' : 'Three more members'} size="sm">{copy.overflow}</AvatarOverflow>
      </AvatarGroup>
    </div>
  )
}

function OverlayAnatomyPreview({ kind, locale }: { kind: 'alert-dialog' | 'dialog' | 'sheet'; locale: Locale }) {
  const isArabic = locale === 'ar'
  const copy = {
    alertDialog: isArabic ? 'معاينة حوار التنبيه' : 'Alert dialog anatomy preview',
    cancel: isArabic ? 'إلغاء' : 'Cancel',
    close: isArabic ? 'إغلاق' : 'Close',
    confirm: isArabic ? 'تأكيد الإجراء' : 'Confirm action',
    continue: isArabic ? 'متابعة' : 'Continue',
    dialog: isArabic ? 'معاينة الحوار' : 'Dialog anatomy preview',
    dialogBody: isArabic ? 'يستخدم محتوى الحوار سلوك Radix وتوكنات السطح الدلالية.' : 'Dialog content uses Radix behavior and semantic surface tokens.',
    dialogTitle: isArabic ? 'عنوان الحوار' : 'Dialog title',
    save: isArabic ? 'حفظ' : 'Save',
    sheet: isArabic ? 'معاينة اللوحة' : 'Sheet anatomy preview',
    sheetBody: isArabic ? 'يعتمد موضع اللوحة على قواعد start/end المنطقية لدعم RTL.' : 'Logical side placement uses start/end rules for RTL support.',
    sheetTitle: isArabic ? 'عنوان اللوحة' : 'Sheet title',
    warningBody: isArabic ? 'استخدم حوار التنبيه للقرارات التي تحتاج إلى تأكيد صريح.' : 'Use Alert Dialog for decisions that need explicit confirmation.',
  }

  if (kind === 'sheet') {
    return (
      <div className="overlay-anatomy-preview overlay-anatomy-preview--sheet" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
        <div className="overlay-anatomy-scrim" />
        <section aria-label={copy.sheet} className="overlay-anatomy-sheet">
          <div className="overlay-anatomy-header">
            <h3>{copy.sheetTitle}</h3>
            <p>{copy.sheetBody}</p>
          </div>
          <div className="overlay-anatomy-body">
            <span />
            <span />
            <span />
          </div>
          <div className="overlay-anatomy-footer">
            <Button size="sm" variant="secondary">{copy.close}</Button>
          </div>
        </section>
      </div>
    )
  }

  const isAlert = kind === 'alert-dialog'

  return (
    <div className="overlay-anatomy-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <div className="overlay-anatomy-scrim" />
      <section aria-label={isAlert ? copy.alertDialog : copy.dialog} className={isAlert ? 'overlay-anatomy-alert-dialog' : 'overlay-anatomy-dialog'}>
        <div className="overlay-anatomy-header">
          <h3>{isAlert ? copy.confirm : copy.dialogTitle}</h3>
          <p>{isAlert ? copy.warningBody : copy.dialogBody}</p>
        </div>
        <div className="overlay-anatomy-footer">
          <Button size="sm" variant="secondary">{copy.cancel}</Button>
          <Button size="sm" variant={isAlert ? 'destructive' : 'default'}>{isAlert ? copy.continue : copy.save}</Button>
        </div>
      </section>
    </div>
  )
}

function MenuAnatomyPreview({ kind, locale }: { kind: 'context' | 'dropdown' | 'menubar' | 'navigation', locale: Locale }) {
  const isArabic = locale === 'ar'
  const copy = {
    actions: isArabic ? 'إجراءات' : 'Actions',
    components: isArabic ? 'المكونات' : 'Components',
    docs: isArabic ? 'المستندات' : 'Docs',
    foundations: isArabic ? 'الأسس' : 'Foundations',
    guide: isArabic ? 'الدليل' : 'Guide',
    more: isArabic ? 'المزيد' : 'More',
    openMenu: isArabic ? 'فتح القائمة' : 'Open menu',
    target: isArabic ? 'منطقة السياق' : 'Context target',
    theme: isArabic ? 'الثيم' : 'Theme',
    delete: isArabic ? 'حذف' : 'Delete',
    menu: isArabic ? 'قائمة' : 'Menu',
  }
  const rows = [
    { icon: <FileText aria-hidden="true" />, label: copy.docs, shortcut: '⌘D' },
    { icon: <Component aria-hidden="true" />, label: copy.components, shortcut: '⌘C', highlighted: true },
    { icon: <Box aria-hidden="true" />, label: copy.theme, shortcut: '⌘T' },
  ]

  if (kind === 'context') {
    return (
      <div className="menu-anatomy-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
        <div className="menu-anatomy-context-target">{copy.target}</div>
        <MenuAnatomySurface destructiveLabel={copy.delete} label={copy.menu} rows={rows} />
      </div>
    )
  }

  if (kind === 'menubar') {
    return (
      <div className="menu-anatomy-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
        <div className="menu-anatomy-menubar" role="menubar" aria-label={isArabic ? 'شريط القوائم' : 'Menu bar'}>
          <button className="menu-anatomy-menubar-trigger" type="button">{copy.docs}</button>
          <button className="menu-anatomy-menubar-trigger" data-state="open" type="button">{copy.components}</button>
          <button className="menu-anatomy-menubar-trigger" type="button">{copy.more}</button>
        </div>
        <MenuAnatomySurface destructiveLabel={copy.delete} label={copy.menu} rows={[
          { icon: <Box aria-hidden="true" />, label: 'Button' },
          { icon: <ListFilter aria-hidden="true" />, label: 'Input' },
          { icon: <Tag aria-hidden="true" />, label: 'Select', highlighted: true },
        ]} />
      </div>
    )
  }

  if (kind === 'navigation') {
    return (
      <div className="menu-anatomy-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
        <div className="menu-anatomy-nav-row" aria-label={isArabic ? 'قائمة التنقل' : 'Navigation menu'}>
          <button className="menu-anatomy-nav-trigger" data-state="open" type="button">{copy.docs}</button>
          <button className="menu-anatomy-nav-trigger" type="button">{copy.components}</button>
          <button className="menu-anatomy-nav-trigger" type="button">{copy.theme}</button>
        </div>
        <div className="menu-anatomy-mega-surface">
          <a href="#/docs" className="menu-anatomy-featured">
            <span className="menu-anatomy-featured-icon"><FileText aria-hidden="true" /></span>
            <span>{copy.guide}</span>
            <small>{isArabic ? 'قواعد الاستخدام للإنسان والذكاء الاصطناعي.' : 'Usage rules for humans and AI agents.'}</small>
          </a>
          <div className="menu-anatomy-mega-list">
            <a href="#/docs/foundations">{copy.foundations}</a>
            <a href="#/components">{copy.components}</a>
            <a href="#/themes">{copy.theme}</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="menu-anatomy-preview" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <Button size="sm" variant="secondary">{copy.openMenu}</Button>
      <MenuAnatomySurface destructiveLabel={copy.delete} label={copy.menu} rows={rows} />
    </div>
  )
}

function MenuAnatomySurface({ destructiveLabel, label, rows }: { destructiveLabel: ReactNode, label: ReactNode, rows: Array<{ highlighted?: boolean, icon?: ReactNode, label: ReactNode, shortcut?: ReactNode }> }) {
  return (
    <div className="menu-anatomy-surface" role="menu" aria-label="Preview menu surface">
      <span className="menu-anatomy-label">{label}</span>
      {rows.map((row) => (
        <div className="menu-anatomy-row" data-highlighted={row.highlighted ? 'true' : undefined} key={String(row.label)} role="menuitem">
          <span className="menu-anatomy-row-icon">{row.icon}</span>
          <span>{row.label}</span>
          {row.shortcut ? <kbd>{row.shortcut}</kbd> : null}
        </div>
      ))}
      <span className="menu-anatomy-separator" />
      <div className="menu-anatomy-row" data-variant="destructive" role="menuitem">
        <span className="menu-anatomy-row-icon"><Trash2 aria-hidden="true" /></span>
        <span>{destructiveLabel}</span>
      </div>
    </div>
  )
}

function TypographyPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  return (
    <Prose dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <Heading level={2}>{isArabic ? 'نظام كتابة واضح' : 'Clear type system'}</Heading>
      <Text size="lg">
        {isArabic
          ? 'تستخدم Ceramic مقاييس كتابة دلالية حتى تبقى الواجهة قابلة للقراءة في العربية واللاتينية.'
          : 'Ceramic uses semantic type primitives so interfaces stay readable across Latin and Arabic.'}
      </Text>
      <Text tone="muted">
        {isArabic
          ? 'العربية تستخدم IBM Plex Sans Arabic وارتفاع سطر مخصصا من الثيم.'
          : 'Arabic uses IBM Plex Sans Arabic with theme-owned line-height.'}
      </Text>
    </Prose>
  )
}

function TabsPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  return (
    <Tabs defaultValue="overview" dir={isArabic ? 'rtl' : 'ltr'}>
      <TabList aria-label={isArabic ? 'أقسام التوثيق' : 'Documentation sections'}>
        <Tab value="overview">{isArabic ? 'نظرة عامة' : 'Overview'}</Tab>
        <Tab value="properties">{isArabic ? 'الخصائص' : 'Properties'}</Tab>
        <Tab value="tokens">{isArabic ? 'التوكنات' : 'Tokens'}</Tab>
      </TabList>
      <TabPanel value="overview">
        {isArabic ? 'محتوى التبويب يدعم RTL دون تغيير API.' : 'Tab content supports RTL without changing the API.'}
      </TabPanel>
      <TabPanel value="properties">
        {isArabic ? 'الخصائص تبقى قابلة للقراءة للإنسان والوكيل.' : 'Properties remain readable for humans and agents.'}
      </TabPanel>
      <TabPanel value="tokens">
        {isArabic ? 'التوكنات الدلالية تقود الشكل والحركة.' : 'Semantic tokens drive visual and motion behavior.'}
      </TabPanel>
    </Tabs>
  )
}

function TablePreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  const rows = isArabic
    ? [
        ['جدول', 'متاح', 'عرض البيانات'],
        ['تبويبات', 'متاح', 'التنقل'],
        ['رسالة', 'قيد التحويل', 'الذكاء الاصطناعي'],
      ]
    : [
        ['Table', 'Available', 'Data Display'],
        ['Tabs', 'Available', 'Navigation'],
        ['Message', 'Converting', 'AI'],
      ]

  return (
    <Table dir={isArabic ? 'rtl' : 'ltr'}>
      <TableHeader>
        <TableRow>
          <TableHead>{isArabic ? 'المكوّن' : 'Component'}</TableHead>
          <TableHead>{isArabic ? 'الحالة' : 'Status'}</TableHead>
          <TableHead>{isArabic ? 'المجموعة' : 'Group'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(([component, status, group]) => (
          <TableRow key={component}>
            <TableCell>{component}</TableCell>
            <TableCell><Badge variant={status === 'Available' || status === 'متاح' ? 'success' : 'outline'}>{status}</Badge></TableCell>
            <TableCell>{group}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function SpinnerPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'
  return (
    <Field className="form-preview-field" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <FieldLabel>{isArabic ? 'جار تحميل البيانات' : 'Loading data'}</FieldLabel>
      <HStack align="center" gap={3}>
        <Spinner role="status" aria-label={isArabic ? 'جار التحميل' : 'Loading'} />
        <Text tone="muted">{isArabic ? 'يرجى الانتظار' : 'Please wait'}</Text>
      </HStack>
    </Field>
  )
}

function SonnerPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  return (
    <ShadcnPrimitives.Sonner dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <ShadcnPrimitives.SonnerToast>
        <ShadcnPrimitives.SonnerTitle>{isArabic ? 'تم الحفظ' : 'Saved'}</ShadcnPrimitives.SonnerTitle>
        <ShadcnPrimitives.SonnerDescription>
          {isArabic ? 'التغييرات جاهزة للمراجعة.' : 'Changes are ready for review.'}
        </ShadcnPrimitives.SonnerDescription>
      </ShadcnPrimitives.SonnerToast>
    </ShadcnPrimitives.Sonner>
  )
}

function MarkerPreview({ locale }: { locale: Locale }) {
  return <ShadcnPrimitives.Marker tone="accent">{locale === 'ar' ? 'ذكي' : 'AI'}</ShadcnPrimitives.Marker>
}

function MessagePreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <ShadcnPrimitives.Message author={isArabic ? 'مساعد Ceramic' : 'Ceramic AI'} meta={isArabic ? 'الآن' : 'Now'}>
        <ShadcnPrimitives.Bubble tone="accent">
          {isArabic
            ? 'تحافظ الرسالة على الاتجاه العربي وتدعم النص المختلط دون كسر التباعد.'
            : 'Message content keeps direction, spacing, and mixed-script support intact.'}
        </ShadcnPrimitives.Bubble>
      </ShadcnPrimitives.Message>
    </div>
  )
}

function MessageScrollerPreview({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar'

  return (
    <ShadcnPrimitives.MessageScroller dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
      <ShadcnPrimitives.Message author={isArabic ? 'مصمم' : 'Designer'} meta="09:30">
        <ShadcnPrimitives.Bubble>
          {isArabic ? 'هل يمكن تلخيص قواعد RTL؟' : 'Can you summarize the RTL rules?'}
        </ShadcnPrimitives.Bubble>
      </ShadcnPrimitives.Message>
      <ShadcnPrimitives.Message author={isArabic ? 'مساعد Ceramic' : 'Ceramic AI'} meta="09:31">
        <ShadcnPrimitives.Bubble tone="accent">
          {isArabic
            ? 'استخدم start/end والتوكنات الدلالية وتحقق من النص العربي فعليا.'
            : 'Use start/end, semantic tokens, and verify Arabic text in the real UI.'}
        </ShadcnPrimitives.Bubble>
      </ShadcnPrimitives.Message>
    </ShadcnPrimitives.MessageScroller>
  )
}

function renderShadcnMappedPreview(name: string, locale: Locale = 'en') {
  const isArabic = locale === 'ar'

  if (name === 'Separator') {
    return (
      <VStack>
        <span>{isArabic ? 'بداية القسم' : 'Section start'}</span>
        <ShadcnPrimitives.Separator aria-label="Section separator" />
        <span>{isArabic ? 'نهاية القسم' : 'Section end'}</span>
      </VStack>
    )
  }
  if (name === 'Input OTP') {
    return (
      <Field>
        <FieldLabel>One-time code</FieldLabel>
        <ShadcnPrimitives.InputOTP aria-label="One-time code" value="2607" />
      </Field>
    )
  }
  if (name === 'Kbd') return <ShadcnPrimitives.Kbd>⌘ K</ShadcnPrimitives.Kbd>
  if (name === 'Label') return <ShadcnPrimitives.Label>Field label</ShadcnPrimitives.Label>
  if (name === 'Native Select') {
    return (
      <ShadcnPrimitives.NativeSelect defaultValue="default" aria-label="Theme">
        <option value="default">Utopia Default</option>
        <option value="future">Future theme</option>
      </ShadcnPrimitives.NativeSelect>
    )
  }

  if (['Accordion', 'Collapsible'].includes(name)) {
    if (name === 'Accordion') {
      return (
        <Accordion type="single" defaultValue="semantic-tokens" collapsible>
          <AccordionItem value="semantic-tokens">
            <AccordionTrigger>Semantic tokens</AccordionTrigger>
            <AccordionContent>
              Components consume roles such as --surface, --border, and --radius-surface.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rtl">
            <AccordionTrigger>Arabic-friendly</AccordionTrigger>
            <AccordionContent>
              Triggers use start-aligned text and logical spacing so RTL can mirror cleanly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    }

    if (name === 'Collapsible') {
      return (
        <ShadcnPrimitives.Collapsible defaultOpen>
          <ShadcnPrimitives.CollapsibleTrigger>Show design-system contract</ShadcnPrimitives.CollapsibleTrigger>
          <ShadcnPrimitives.CollapsibleContent>
            Collapsible content uses Radix state, semantic tokens, and logical spacing.
          </ShadcnPrimitives.CollapsibleContent>
        </ShadcnPrimitives.Collapsible>
      )
    }
  }

  if (['Alert', 'Alert Dialog', 'Dialog', 'Drawer', 'Sheet', 'Sonner'].includes(name)) {
    if (name === 'Alert') {
      return (
        <div className="alert-preview-stack" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
          <Alert variant="success">
            <AlertTitle>{isArabic ? 'تم الدفع بنجاح' : 'Payment successful'}</AlertTitle>
            <AlertDescription>
              {isArabic
                ? 'تمت معالجة عملية الدفع. تم إرسال الإيصال إلى بريدك الإلكتروني.'
                : 'Your payment has been processed. A receipt has been sent to your email address.'}
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <AlertTitle>{isArabic ? 'ميزة جديدة متاحة' : 'New feature available'}</AlertTitle>
            <AlertDescription>
              {isArabic
                ? 'تتضمن التنبيهات أيقونة دلالية افتراضيا ويمكن عرضها دون أيقونة.'
                : 'Alerts include a semantic icon by default and can be rendered without one.'}
            </AlertDescription>
          </Alert>
          <Alert showIcon={false}>
            <AlertTitle>{isArabic ? 'تنبيه نصي فقط' : 'Text-only alert'}</AlertTitle>
            <AlertDescription>
              {isArabic
                ? 'استخدم تنبيها نصيا فقط عندما تكون الحالة واضحة من الواجهة المحيطة.'
                : 'Set showIcon to false when the status is already clear from nearby UI.'}
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    if (name === 'Alert Dialog') {
      return <OverlayAnatomyPreview kind="alert-dialog" locale={locale} />
    }

    if (name === 'Dialog') {
      return <OverlayAnatomyPreview kind="dialog" locale={locale} />
    }

    if (name === 'Drawer') {
      return (
        <ShadcnPrimitives.Drawer>
          <ShadcnPrimitives.DrawerTrigger asChild>
            <Button variant="secondary">Open drawer</Button>
          </ShadcnPrimitives.DrawerTrigger>
          <ShadcnPrimitives.DrawerContent side="end">
            <ShadcnPrimitives.DrawerHeader>
              <ShadcnPrimitives.DrawerTitle>Drawer title</ShadcnPrimitives.DrawerTitle>
              <ShadcnPrimitives.DrawerDescription>
                Drawer uses logical start/end placement so RTL themes can mirror it.
              </ShadcnPrimitives.DrawerDescription>
            </ShadcnPrimitives.DrawerHeader>
            <ShadcnPrimitives.DrawerFooter>
              <ShadcnPrimitives.DrawerClose>Close</ShadcnPrimitives.DrawerClose>
            </ShadcnPrimitives.DrawerFooter>
          </ShadcnPrimitives.DrawerContent>
        </ShadcnPrimitives.Drawer>
      )
    }

    if (name === 'Sheet') {
      return <OverlayAnatomyPreview kind="sheet" locale={locale} />
    }

    if (name === 'Sonner') {
      return (
        <ShadcnPrimitives.Sonner>
          <ShadcnPrimitives.SonnerToast>
            <ShadcnPrimitives.SonnerTitle>{isArabic ? 'تم الحفظ' : 'Saved'}</ShadcnPrimitives.SonnerTitle>
            <ShadcnPrimitives.SonnerDescription>{isArabic ? 'التغييرات جاهزة للمراجعة.' : 'Changes are ready for review.'}</ShadcnPrimitives.SonnerDescription>
          </ShadcnPrimitives.SonnerToast>
        </ShadcnPrimitives.Sonner>
      )
    }

    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component role={name === 'Alert' ? 'alert' : 'dialog'}>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Surface, border, focus, and motion are semantic-token driven.</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Attachment', 'Bubble', 'Marker', 'Message', 'Message Scroller'].includes(name)) {
    if (name === 'Attachment') {
      return <AttachmentDemoPreview locale={locale} />
    }

    if (name === 'Bubble') {
      return <ShadcnPrimitives.Bubble>Use Bubble for compact conversational content that still follows semantic surface tokens.</ShadcnPrimitives.Bubble>
    }

    if (name === 'Marker') {
      return <ShadcnPrimitives.Marker tone="accent">AI</ShadcnPrimitives.Marker>
    }

    if (name === 'Message') {
      return (
        <ShadcnPrimitives.Message author="Utopia AI" meta="Now">
          <ShadcnPrimitives.Bubble>Message content supports mixed-script text and RTL smoke checks.</ShadcnPrimitives.Bubble>
        </ShadcnPrimitives.Message>
      )
    }

    return (
      <ShadcnPrimitives.MessageScroller>
        <ShadcnPrimitives.Message author="Human" meta="09:30">
          <ShadcnPrimitives.Bubble>Can you summarize this direction?</ShadcnPrimitives.Bubble>
        </ShadcnPrimitives.Message>
        <ShadcnPrimitives.Message author="Utopia AI" meta="09:31">
          <ShadcnPrimitives.Bubble tone="accent">Yes. Keep AI-readable docs, semantic tokens, and Arabic-friendly checks together.</ShadcnPrimitives.Bubble>
        </ShadcnPrimitives.Message>
      </ShadcnPrimitives.MessageScroller>
    )
  }

  if (['Navigation Menu', 'Pagination', 'Menubar'].includes(name)) {
    if (name === 'Navigation Menu') {
      return <MenuAnatomyPreview kind="navigation" locale={locale} />
    }

    if (name === 'Pagination') {
      return (
        <ShadcnPrimitives.Pagination>
          <ShadcnPrimitives.PaginationContent>
            <ShadcnPrimitives.PaginationItem><ShadcnPrimitives.PaginationPrevious href="#prev">Previous</ShadcnPrimitives.PaginationPrevious></ShadcnPrimitives.PaginationItem>
            <ShadcnPrimitives.PaginationItem><ShadcnPrimitives.PaginationLink href="#1">1</ShadcnPrimitives.PaginationLink></ShadcnPrimitives.PaginationItem>
            <ShadcnPrimitives.PaginationItem><ShadcnPrimitives.PaginationLink href="#2" isCurrent>2</ShadcnPrimitives.PaginationLink></ShadcnPrimitives.PaginationItem>
            <ShadcnPrimitives.PaginationItem><ShadcnPrimitives.PaginationNext href="#next">Next</ShadcnPrimitives.PaginationNext></ShadcnPrimitives.PaginationItem>
          </ShadcnPrimitives.PaginationContent>
        </ShadcnPrimitives.Pagination>
      )
    }

    if (name === 'Menubar') {
      return <MenuAnatomyPreview kind="menubar" locale={locale} />
    }

    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Docs</ShadcnPrimitives.PrimitiveItem>
          <ShadcnPrimitives.PrimitiveItem>Components</ShadcnPrimitives.PrimitiveItem>
          <ShadcnPrimitives.PrimitiveItem>Themes</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Combobox', 'Date Picker', 'Input Group'].includes(name)) {
    if (name === 'Date Picker') {
      return <ShadcnPrimitives.DatePicker />
    }

    if (name === 'Combobox') {
      return (
        <ShadcnPrimitives.Combobox>
          <ShadcnPrimitives.ComboboxTrigger aria-expanded="true">Select component</ShadcnPrimitives.ComboboxTrigger>
          <ShadcnPrimitives.ComboboxContent>
            <ShadcnPrimitives.ComboboxInput placeholder="Search components" aria-label="Search components" />
            <ShadcnPrimitives.ComboboxOption aria-selected="true">Button</ShadcnPrimitives.ComboboxOption>
            <ShadcnPrimitives.ComboboxOption>Command</ShadcnPrimitives.ComboboxOption>
            <ShadcnPrimitives.ComboboxOption>Data Table</ShadcnPrimitives.ComboboxOption>
          </ShadcnPrimitives.ComboboxContent>
        </ShadcnPrimitives.Combobox>
      )
    }

    if (name === 'Input Group') {
      return (
        <Field>
          <FieldLabel>Project URL</FieldLabel>
          <ShadcnPrimitives.InputGroup>
            <ShadcnPrimitives.InputGroupText>https://</ShadcnPrimitives.InputGroupText>
            <ShadcnPrimitives.InputGroupInput aria-label="Project URL" placeholder="utopia-studio.co" />
          </ShadcnPrimitives.InputGroup>
        </Field>
      )
    }

    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Form composition must keep label, status, and value rules explicit.</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Carousel', 'Chart', 'Data Table', 'Item'].includes(name)) {
    if (name === 'Carousel') {
      return (
        <ShadcnPrimitives.Carousel aria-label="Featured components">
          <ShadcnPrimitives.CarouselContent>
            <ShadcnPrimitives.CarouselItem><strong>Tokens</strong><span>Semantic roles first</span></ShadcnPrimitives.CarouselItem>
            <ShadcnPrimitives.CarouselItem><strong>AI-readable</strong><span>Imports and rules included</span></ShadcnPrimitives.CarouselItem>
            <ShadcnPrimitives.CarouselItem><strong>RTL</strong><span>Logical scrolling direction</span></ShadcnPrimitives.CarouselItem>
          </ShadcnPrimitives.CarouselContent>
          <ShadcnPrimitives.CarouselControls>
            <ShadcnPrimitives.CarouselButton aria-label="Previous slide">Prev</ShadcnPrimitives.CarouselButton>
            <ShadcnPrimitives.CarouselButton aria-label="Next slide">Next</ShadcnPrimitives.CarouselButton>
          </ShadcnPrimitives.CarouselControls>
        </ShadcnPrimitives.Carousel>
      )
    }

    if (name === 'Chart') {
      return <ShadcnPrimitives.Chart title="Component coverage"><ShadcnPrimitives.ChartBars values={[42, 68, 86, 74]} /></ShadcnPrimitives.Chart>
    }

    if (name === 'Data Table') {
      return (
        <ShadcnPrimitives.DataTable>
          <ShadcnPrimitives.DataTableHeader>
            <ShadcnPrimitives.DataTableRow>
              <ShadcnPrimitives.DataTableHead>{isArabic ? 'المكوّن' : 'Component'}</ShadcnPrimitives.DataTableHead>
              <ShadcnPrimitives.DataTableHead>{isArabic ? 'الحالة' : 'Status'}</ShadcnPrimitives.DataTableHead>
            </ShadcnPrimitives.DataTableRow>
          </ShadcnPrimitives.DataTableHeader>
          <ShadcnPrimitives.DataTableBody>
            <ShadcnPrimitives.DataTableRow>
              <ShadcnPrimitives.DataTableCell>{isArabic ? 'الأوامر' : 'Command'}</ShadcnPrimitives.DataTableCell>
              <ShadcnPrimitives.DataTableCell>{isArabic ? 'متاح' : 'Available'}</ShadcnPrimitives.DataTableCell>
            </ShadcnPrimitives.DataTableRow>
            <ShadcnPrimitives.DataTableRow>
              <ShadcnPrimitives.DataTableCell>{isArabic ? 'جدول البيانات' : 'Data Table'}</ShadcnPrimitives.DataTableCell>
              <ShadcnPrimitives.DataTableCell>{isArabic ? 'متاح' : 'Available'}</ShadcnPrimitives.DataTableCell>
            </ShadcnPrimitives.DataTableRow>
          </ShadcnPrimitives.DataTableBody>
        </ShadcnPrimitives.DataTable>
      )
    }

    if (name === 'Item') {
      return (
        <ShadcnPrimitives.Item>
          <ShadcnPrimitives.ItemContent>
            <ShadcnPrimitives.ItemTitle>{isArabic ? 'مكوّن من نظام التصميم' : 'Design-system component'}</ShadcnPrimitives.ItemTitle>
            <ShadcnPrimitives.ItemDescription>{isArabic ? 'استخدم Item للصفوف المتكررة التي تحتوي عنوانا ووصفا وإجراءات اختيارية.' : 'Use Item for repeated rows with title, description, and optional actions.'}</ShadcnPrimitives.ItemDescription>
          </ShadcnPrimitives.ItemContent>
          <ShadcnPrimitives.ItemActions>
            <Badge variant="outline">{isArabic ? 'متاح' : 'Available'}</Badge>
          </ShadcnPrimitives.ItemActions>
        </ShadcnPrimitives.Item>
      )
    }

    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component>
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>Preview data</ShadcnPrimitives.PrimitiveItem>
          <ShadcnPrimitives.PrimitiveItem>Token-safe state</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  if (['Direction', 'Resizable', 'Scroll Area'].includes(name)) {
    if (name === 'Direction') {
      return (
        <ShadcnPrimitives.Direction dir="rtl" lang="ar">
          <ShadcnPrimitives.PrimitiveHeader>RTL direction scope</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>البداية والنهاية تستخدمان خصائص منطقية.</ShadcnPrimitives.PrimitiveItem>
          <ShadcnPrimitives.PrimitiveItem>Start/end layout mirrors without left/right APIs.</ShadcnPrimitives.PrimitiveItem>
        </ShadcnPrimitives.Direction>
      )
    }

    if (name === 'Resizable') {
      return (
        <ShadcnPrimitives.Resizable>
          <ShadcnPrimitives.ResizablePanel defaultSize={55}>Preview</ShadcnPrimitives.ResizablePanel>
          <ShadcnPrimitives.ResizableHandle />
          <ShadcnPrimitives.ResizablePanel defaultSize={45}>Inspector</ShadcnPrimitives.ResizablePanel>
        </ShadcnPrimitives.Resizable>
      )
    }

    if (name === 'Scroll Area') {
      return (
        <ShadcnPrimitives.ScrollArea>
          <ShadcnPrimitives.ScrollAreaViewport>
            <VStack>
              {['Tokens', 'Components', 'Templates', 'Themes', 'Arabic-friendly', 'AI rules'].map((item) => (
                <ShadcnPrimitives.Item key={item}>
                  <ShadcnPrimitives.ItemContent>
                    <ShadcnPrimitives.ItemTitle>{item}</ShadcnPrimitives.ItemTitle>
                  </ShadcnPrimitives.ItemContent>
                </ShadcnPrimitives.Item>
              ))}
            </VStack>
          </ShadcnPrimitives.ScrollAreaViewport>
          <ShadcnPrimitives.ScrollBar />
        </ShadcnPrimitives.ScrollArea>
      )
    }

    const Component = shadcnPrimitiveComponent(name)
    if (Component) {
      return (
        <Component dir="rtl">
          <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
          <ShadcnPrimitives.PrimitiveItem>RTL smoke: start/end layout must mirror without left/right assumptions.</ShadcnPrimitives.PrimitiveItem>
        </Component>
      )
    }
  }

  const Component = shadcnPrimitiveComponent(name)
  if (Component) {
    return (
      <Component>
        <ShadcnPrimitives.PrimitiveHeader>{name}</ShadcnPrimitives.PrimitiveHeader>
        <ShadcnPrimitives.PrimitiveItem>{shadcnPrimitiveDescription(name)}</ShadcnPrimitives.PrimitiveItem>
      </Component>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{shadcnPrimitiveDescription(name)}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function shadcnPrimitiveComponent(name: string): ElementType | null {
  const componentName = components.components
    .find((component) => component.name === name)
    ?.packageImport.match(/\{ ([^ }]+)/)?.[1]

  if (!componentName) return null

  const registry = ShadcnPrimitives as unknown as Record<string, ElementType | undefined>
  return registry[componentName] ?? null
}

function shadcnPrimitiveDescription(name: string, locale: Locale = 'en') {
  const entry = components.components.find((component) => component.name === name)
  const source = entry?.shadcnFoundation[0] ?? slugify(name)
  if (locale === 'ar') {
    return `يربط هذا النمط من shadcn/ui (${source}) بتوكنات Utopia الدلالية وقواعد التخطيط الداعمة للعربية وRTL وعقود استخدام مقروءة للذكاء الاصطناعي.`
  }
  return `Maps the shadcn/ui ${source} pattern into Utopia semantic tokens, Arabic-friendly layout rules, and AI-readable usage contracts.`
}

function shadcnConversionExamples(name: string, base: ReactNode, locale: Locale = 'en'): Array<[string, ReactNode]> {
  const isArabic = locale === 'ar'
  const displayName = componentLabel(locale, name)

  return [
    [isArabic ? `${displayName} - هدف التحويل` : `${name} conversion target`, base],
    [isArabic ? 'عقد مقروء للإنسان' : 'Human-readable contract', (
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? 'استخدمه عندما يكون النمط مطلوبا' : 'Use when the pattern is needed'}</CardTitle>
          <CardDescription>{shadcnPrimitiveDescription(name, locale)}</CardDescription>
        </CardHeader>
      </Card>
    )],
    [isArabic ? 'فحص العربية وRTL' : 'Arabic / RTL smoke', (
      <div dir="rtl" lang="ar">
        <Card>
          <CardHeader>
            <CardTitle>{displayName}</CardTitle>
            <CardDescription>نص تجريبي لا يمثل نسخة إنتاجية.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )],
  ]
}

const buttonProps = [
  { name: 'children', type: 'ReactNode', description: 'Visible button content.', control: <input aria-label="children value" placeholder="value" /> },
  { name: 'startContent', type: 'ReactNode', description: 'Leading content rendered before the visible label.', control: <input aria-label="startContent value" type="checkbox" /> },
  { name: 'endContent', type: 'ReactNode', description: 'Trailing content rendered after the visible label.', control: <input aria-label="endContent value" type="checkbox" /> },
  { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'", description: 'Visual style variant.', control: <select aria-label="variant value" defaultValue="default"><option>default</option><option>secondary</option><option>outline</option><option>ghost</option><option>destructive</option></select> },
  { name: 'size', type: "'sm' | 'default' | 'lg' | 'icon'", description: 'Size variant.', control: <select aria-label="size value" defaultValue="default"><option>sm</option><option>default</option><option>lg</option><option>icon</option></select> },
  { name: 'loading', type: 'boolean', description: 'Shows progress, sets aria-busy, and blocks duplicate activation.', control: <input aria-label="loading value" type="checkbox" /> },
  { name: 'loadingText', type: 'ReactNode', description: 'Optional visible label while loading.', control: <input aria-label="loadingText value" placeholder="Working" /> },
  { name: 'disabled', type: 'boolean', description: 'Disables the button.', control: <input aria-label="disabled value" type="checkbox" /> },
  { name: 'isIconOnly', type: 'boolean', description: 'Renders a square action. Provide aria-label when visible text is shortened.', control: <input aria-label="isIconOnly value" type="checkbox" /> },
  { name: 'type', type: "'button' | 'submit' | 'reset'", description: 'HTML button type attribute.', control: <select aria-label="type value" defaultValue="button"><option>button</option><option>submit</option><option>reset</option></select> },
  { name: 'asChild', type: 'boolean', description: 'Render through Radix Slot for composition.', control: <input aria-label="asChild value" type="checkbox" /> },
]

const buttonGroupProps = [
  { name: 'children', type: 'ReactNode', description: 'Related Button primitives rendered as a group.', control: <input aria-label="children value" placeholder="Button children" /> },
  { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Direction of the grouped actions.', control: <select aria-label="orientation value" defaultValue="horizontal"><option>horizontal</option><option>vertical</option></select> },
  { name: 'density', type: "'default' | 'compact'", description: 'Spacing density for the group.', control: <select aria-label="density value" defaultValue="default"><option>default</option><option>compact</option></select> },
  { name: 'asToolbar', type: 'boolean', description: 'Uses role="toolbar" instead of role="group".', control: <input aria-label="asToolbar value" type="checkbox" /> },
  { name: 'label', type: 'string', description: 'Convenience alias for aria-label when the group purpose is not clear from context.', control: <input aria-label="label value" placeholder="Document actions" /> },
  { name: 'className', type: 'string', description: 'Optional class hook. Do not use it to bypass semantic tokens.', control: <input aria-label="className value" placeholder="value" /> },
  { name: 'ButtonGroupSeparator', type: 'component', description: 'Optional visual separator between grouped controls.', control: <input aria-label="separator value" type="checkbox" /> },
  { name: 'ButtonGroupText', type: 'component', description: 'Optional short static text inside the group, with asChild support.', control: <input aria-label="text value" type="checkbox" /> },
  { name: 'DropdownMenu composition', type: 'pattern', description: 'Use DropdownMenuTrigger asChild with an icon-only Button for split or overflow actions.', control: <input aria-label="dropdown composition value" type="checkbox" /> },
]

function usageFor(name: string, locale: Locale = 'en') {
  const isArabic = locale === 'ar'

  if (name === 'Button') {
    return isArabic ? `import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button>متابعة</Button>;
}` : `import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return <Button>Continue</Button>;
}`
  }

  if (name === 'Button Group') {
    return isArabic ? `import { Button } from '@utopia-studio-design/design-system/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@utopia-studio-design/design-system/ButtonGroup';

export function Example() {
  return (
    <ButtonGroup label="إجراءات التحرير">
      <Button variant="secondary">نسخ</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">قص</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">لصق</Button>
    </ButtonGroup>
  );
}` : `import { Button } from '@utopia-studio-design/design-system/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@utopia-studio-design/design-system/ButtonGroup';

export function Example() {
  return (
    <ButtonGroup label="Editing actions">
      <Button variant="secondary">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Cut</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Paste</Button>
    </ButtonGroup>
  );
}`
  }

  if (name === 'Badge') {
    return isArabic ? `import { Badge } from '@utopia-studio-design/design-system/Badge';

export function Example() {
  return <Badge variant="outline">متاح</Badge>;
}` : `import { Badge } from '@utopia-studio-design/design-system/Badge';

export function Example() {
  return <Badge variant="outline">Available</Badge>;
}`
  }

  if (name === 'Side Nav Item') {
    return isArabic ? `import { SideNavItem } from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <SideNavItem
      href="/inbox"
      isCurrent
      label="الوارد"
      badge={12}
      icon={<span aria-hidden="true" />}
    />
  );
}` : `import { SideNavItem } from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <SideNavItem
      href="/inbox"
      isCurrent
      label="Inbox"
      badge={12}
      icon={<span aria-hidden="true" />}
    />
  );
}`
  }

  if (name === 'Side Nav Heading') {
    return `import { SideNavHeading } from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <SideNavHeading
      variant="brand"
      label="The Utopia Studio"
      subtitle="Design System"
      icon={<img alt="" src="/brand/the-utopia-studio-wordmark.avif" />}
      mediaSize="wordmark"
    />
  );
}`
  }

  if (name === 'Side Nav Section') {
    return isArabic ? `import {
  SideNavItem,
  SideNavSection,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <SideNavSection collapsible label="نظرة عامة">
      <SideNavItem href="/dashboard" isCurrent label="لوحة التحكم" />
      <SideNavItem href="/analytics" label="التحليلات" />
    </SideNavSection>
  );
}` : `import {
  SideNavItem,
  SideNavSection,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <SideNavSection collapsible label="Overview">
      <SideNavItem href="/dashboard" isCurrent label="Dashboard" />
      <SideNavItem href="/analytics" label="Analytics" />
    </SideNavSection>
  );
}`
  }

  if (name === 'Side Nav Collapse Button') {
    return `import {
  PanelIcon,
  SideNavCollapseButton,
  SideNavHeading,
} from '@utopia-studio-design/design-system/Navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@utopia-studio-design/design-system/Surface';

export function Example() {
  return (
    <SideNavHeading
      variant="brand"
      label="Utopia Studio"
      subtitle="Design System"
      endContent={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SideNavCollapseButton
                aria-label="Close sidebar"
                aria-expanded="true"
              >
                <PanelIcon aria-hidden="true" />
              </SideNavCollapseButton>
            </TooltipTrigger>
            <TooltipContent side="bottom">Close sidebar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    />
  );
}`
  }

  if (name === 'Side Nav') {
    return `import {
  PanelIcon,
  SideNav,
  SideNavCollapseButton,
  SideNavHeading,
  SideNavItem,
  SideNavSection,
} from '@utopia-studio-design/design-system/Navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@utopia-studio-design/design-system/Surface';

export function Example() {
  return (
    <SideNav aria-label="Primary navigation">
      <SideNavHeading
        variant="brand"
        label="Utopia Studio"
        subtitle="Design System"
        endContent={
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SideNavCollapseButton
                  aria-label="Close sidebar"
                  aria-expanded="true"
                >
                  <PanelIcon aria-hidden="true" />
                </SideNavCollapseButton>
              </TooltipTrigger>
              <TooltipContent side="top">Close sidebar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      />
      <SideNavSection collapsible label="Overview">
        <SideNavItem href="/dashboard" isCurrent label="Dashboard" />
        <SideNavItem href="/analytics" label="Analytics" />
        <SideNavItem href="/components" label="Components" badge={68} />
      </SideNavSection>
      <SideNavSection collapsible label="Build">
        <SideNavItem href="/templates" label="Templates" />
        <SideNavItem href="/ai-rules" label="AI Rules" />
      </SideNavSection>
    </SideNav>
  );
}`
  }

  if (name === 'Attachment') {
    return isArabic ? `import { FileCodeIcon, LoaderCircleIcon, XIcon } from 'lucide-react';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@utopia-studio-design/design-system/Attachment';

const images = [
  {
    name: 'مساحة-عمل.png',
    meta: 'PNG · ٨٢٠ KB',
    src: '/examples/doha-shadow.png',
    alt: 'ظل معماري في الدوحة',
  },
  {
    name: 'مرجع-مكتب.jpg',
    meta: 'JPG · ١.١ MB',
    src: '/examples/doha-majlis-workspace.png',
    alt: 'مساحة عمل مستوحاة من المجلس',
  },
];

export function Example() {
  return (
    <div dir="rtl" lang="ar">
      <AttachmentGroup>
        {images.map((image) => (
          <Attachment key={image.name} orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={image.src} alt={image.alt} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{image.name}</AttachmentTitle>
              <AttachmentDescription>{image.meta}</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ))}
      </AttachmentGroup>
      <Attachment progress={64} state="uploading">
        <AttachmentMedia>
          <LoaderCircleIcon aria-hidden="true" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>لوحة-المبيعات.pdf</AttachmentTitle>
          <AttachmentDescription>جار الرفع · ٦٤٪</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="إلغاء الرفع">
            <XIcon aria-hidden="true" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment>
        <AttachmentMedia>
          <FileCodeIcon aria-hidden="true" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>عارض-الرسائل.tsx</AttachmentTitle>
          <AttachmentDescription>TypeScript · ١٢ KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="إزالة عارض الرسائل">
            <XIcon aria-hidden="true" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  );
}` : `import { FileCodeIcon, LoaderCircleIcon, XIcon } from 'lucide-react';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@utopia-studio-design/design-system/Attachment';

const images = [
  {
    name: 'workspace.png',
    meta: 'PNG · 820 KB',
    src: '/examples/doha-shadow.png',
    alt: 'Doha architectural shadow',
  },
  {
    name: 'desk-reference.jpg',
    meta: 'JPG · 1.1 MB',
    src: '/examples/doha-majlis-workspace.png',
    alt: 'Majlis inspired workspace',
  },
];

export function Example() {
  return (
    <div>
      <AttachmentGroup>
        {images.map((image) => (
          <Attachment key={image.name} orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={image.src} alt={image.alt} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{image.name}</AttachmentTitle>
              <AttachmentDescription>{image.meta}</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ))}
      </AttachmentGroup>
      <Attachment progress={64} state="uploading">
        <AttachmentMedia>
          <LoaderCircleIcon aria-hidden="true" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel upload">
            <XIcon aria-hidden="true" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment>
        <AttachmentMedia>
          <FileCodeIcon aria-hidden="true" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
          <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove message-renderer.tsx">
            <XIcon aria-hidden="true" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  );
}`
  }

  if (name === 'Alert') {
    return isArabic ? `import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@utopia-studio-design/design-system/Alert';

export function Example() {
  return (
    <Alert variant="success" dir="rtl" lang="ar">
      <AlertTitle>تم الدفع بنجاح</AlertTitle>
      <AlertDescription>
        تمت معالجة عملية الدفع. تم إرسال الإيصال إلى بريدك الإلكتروني.
      </AlertDescription>
    </Alert>
  );
}` : `import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@utopia-studio-design/design-system/Alert';

export function Example() {
  return (
    <Alert variant="success">
      <AlertTitle>Payment successful</AlertTitle>
      <AlertDescription>
        Your payment has been processed. A receipt has been sent to your email address.
      </AlertDescription>
    </Alert>
  );
}`
  }

  if (name === 'Alert Dialog') {
    return isArabic ? `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@utopia-studio-design/design-system/AlertDialog';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">حذف المشروع</Button>
      </AlertDialogTrigger>
      <AlertDialogContent dir="rtl" lang="ar">
        <AlertDialogHeader>
          <AlertDialogTitle>حذف المشروع؟</AlertDialogTitle>
          <AlertDialogDescription>
            يحتاج هذا الإجراء إلى تأكيد صريح قبل المتابعة.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}` : `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@utopia-studio-design/design-system/AlertDialog';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action needs explicit confirmation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`
  }

  if (name === 'Avatar') {
    return isArabic ? `import {
  Avatar,
  AvatarGroup,
  AvatarOverflow,
} from '@utopia-studio-design/design-system/DataDisplay';

export function Example() {
  return (
    <div dir="rtl" lang="ar">
      <Avatar alt="هوية افتراضية" status="online">س</Avatar>

      <AvatarGroup aria-label="فريق المشروع">
        <Avatar alt="محرر" size="sm">س</Avatar>
        <Avatar alt="مصمم" size="sm">ن</Avatar>
        <Avatar alt="مراجع" size="sm" status="online">ع</Avatar>
        <AvatarOverflow aria-label="ثلاثة أعضاء إضافيين" size="sm">+٣</AvatarOverflow>
      </AvatarGroup>

      <Avatar
        alt="عضو فريق من الدوحة"
        size="sm"
        src="/examples/avatar-doha-shadow.png"
      />
    </div>
  );
}` : `import {
  Avatar,
  AvatarGroup,
  AvatarOverflow,
} from '@utopia-studio-design/design-system/DataDisplay';

export function Example() {
  return (
    <div>
      <Avatar alt="Default identity" status="online">US</Avatar>

      <AvatarGroup aria-label="Project team">
        <Avatar alt="Editor" size="sm">US</Avatar>
        <Avatar alt="Designer" size="sm">NK</Avatar>
        <Avatar alt="Reviewer" size="sm" status="online">AR</Avatar>
        <AvatarOverflow aria-label="Three more members" size="sm">+3</AvatarOverflow>
      </AvatarGroup>

      <Avatar
        alt="Doha team member"
        size="sm"
        src="/examples/avatar-doha-shadow.png"
      />
    </div>
  );
}`
  }

  if (name === 'Account Status') {
    return `import { AccountStatus } from '@utopia-studio-design/design-system/DataDisplay';

export function Example() {
  return (
    <AccountStatus
      avatarAlt="Y K"
      avatarFallback="YK"
      label="ykkkk12314"
      description="Pro"
    />
  );
}`
  }

  if (name === 'Calendar') {
    return `import { Calendar } from '@utopia-studio-design/design-system/DataDisplay';

export function Example() {
  return (
    <Calendar
      month={new Date(2026, 6, 1)}
      selectedDate={new Date(2026, 6, 6)}
    />
  );
}`
  }

  if (name === 'Carousel') {
    return `import {
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Carousel aria-label="Featured components">
      <CarouselContent>
        <CarouselItem>Tokens</CarouselItem>
        <CarouselItem>AI-readable</CarouselItem>
        <CarouselItem>Arabic-friendly</CarouselItem>
      </CarouselContent>
      <CarouselControls>
        <CarouselButton aria-label="Previous slide">Prev</CarouselButton>
        <CarouselButton aria-label="Next slide">Next</CarouselButton>
      </CarouselControls>
    </Carousel>
  );
}`
  }

  if (name === 'Chart') {
    return `import { Chart, ChartBars } from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Chart title="Component coverage">
      <ChartBars values={[42, 68, 86, 74]} />
    </Chart>
  );
}`
  }

  if (name === 'Collapsible') {
    return `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Show details</CollapsibleTrigger>
      <CollapsibleContent>
        Content can be hidden or revealed without leaving the page.
      </CollapsibleContent>
    </Collapsible>
  );
}`
  }

  if (name === 'Typography') {
    return `import {
  ArabicText,
  Heading,
  Prose,
  Text,
} from '@utopia-studio-design/design-system/Typography';

export function Example() {
  return (
    <Prose>
      <Heading level={2}>System typography</Heading>
      <Text size="lg">Readable hierarchy for humans and AI agents.</Text>
      <ArabicText>هذا نص تجريبي لا يمثل نسخة إنتاجية.</ArabicText>
    </Prose>
  );
}`
  }

  if (name === 'Card') {
    return `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@utopia-studio-design/design-system/Card';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Program snapshot</CardTitle>
        <CardDescription>Reusable surface content.</CardDescription>
        <CardAction>Available</CardAction>
      </CardHeader>
      <CardContent>Use cards for repeated content, grouped data, or framed tool surfaces.</CardContent>
      <CardFooter>Updated today</CardFooter>
    </Card>
  );
}`
  }

  if (name === 'Hover Card') {
    return `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@utopia-studio-design/design-system/Surface';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="secondary">Preview</Button>
      </HoverCardTrigger>
      <HoverCardContent>Supplemental preview content.</HoverCardContent>
    </HoverCard>
  );
}`
  }

  if (name === 'Popover') {
    return `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@utopia-studio-design/design-system/Surface';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open</Button>
      </PopoverTrigger>
      <PopoverContent>Small contextual panel.</PopoverContent>
    </Popover>
  );
}`
  }

  if (name === 'Tooltip') {
    return `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@utopia-studio-design/design-system/Surface';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Target</Button>
        </TooltipTrigger>
        <TooltipContent>Short helper text.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`
  }

  if (name === 'Aspect Ratio') {
    return `import { AspectRatio, Center } from '@utopia-studio-design/design-system/Layout';

export function Example() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Center>Media preview</Center>
    </AspectRatio>
  );
}`
  }

  if (name === 'Accordion') {
    return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@utopia-studio-design/design-system/Accordion';

export function Example() {
  return (
    <Accordion type="single" defaultValue="tokens" collapsible>
      <AccordionItem value="tokens">
        <AccordionTrigger>Semantic tokens</AccordionTrigger>
        <AccordionContent>
          Components consume semantic roles instead of Utopia brand primitives.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`
  }

  if (name === 'Breadcrumb') {
    return `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`
  }

  if (name === 'Tabs') {
    return `import { Tabs, TabList, Tab, TabPanel } from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="properties">Properties</Tab>
      </TabList>
      <TabPanel value="overview">Overview content</TabPanel>
      <TabPanel value="properties">Properties content</TabPanel>
    </Tabs>
  );
}`
  }

  if (name === 'Dropdown Menu') {
    return `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@utopia-studio-design/design-system/Navigation';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Components</DropdownMenuItem>
        <DropdownMenuItem>Themes</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`
  }

  if (name === 'Context Menu') {
    return `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Context target</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`
  }

  if (name === 'Command') {
    return `import {
  Command,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
} from '@utopia-studio-design/design-system/Navigation';

export function Example() {
  return (
    <Command>
      <CommandPaletteInput placeholder="Search commands..." />
      <CommandPaletteList>
        <CommandPaletteEmpty>No command found.</CommandPaletteEmpty>
        <CommandPaletteGroup heading="Design System">
          <CommandPaletteItem>Open components</CommandPaletteItem>
          <CommandPaletteItem>Search tokens</CommandPaletteItem>
        </CommandPaletteGroup>
      </CommandPaletteList>
    </Command>
  );
}`
  }

  if (name === 'Combobox') {
    return `import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxOption,
  ComboboxTrigger,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Combobox>
      <ComboboxTrigger aria-expanded="true">
        Select component
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput
          aria-label="Search components"
          placeholder="Search components"
        />
        <ComboboxOption aria-selected="true">Button</ComboboxOption>
        <ComboboxOption>Command</ComboboxOption>
        <ComboboxOption>Data Table</ComboboxOption>
      </ComboboxContent>
    </Combobox>
  );
}`
  }

  if (name === 'Data Table') {
    return `import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <DataTable>
      <DataTableHeader>
        <DataTableRow>
          <DataTableHead>Component</DataTableHead>
          <DataTableHead>Status</DataTableHead>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableCell>Command</DataTableCell>
          <DataTableCell>Available</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTable>
  );
}`
  }

  if (name === 'Date Picker') {
    return `import { DatePicker } from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <DatePicker
      label="Select date"
      value="July 6, 2026"
    />
  );
}`
  }

  if (name === 'Dialog') {
    return isArabic ? `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">فتح الحوار</Button>
      </DialogTrigger>
      <DialogContent dir="rtl" lang="ar">
        <DialogHeader>
          <DialogTitle>عنوان الحوار</DialogTitle>
          <DialogDescription>
            استخدم Dialog للمحتوى المركز الذي يحتاج إلى انتباه المستخدم.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>إغلاق</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}` : `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>
            Use Dialog for focused, interruptive content.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`
  }

  if (name === 'Direction') {
    return `import { Direction } from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Direction dir="rtl" lang="ar">
      Use logical start/end layout inside this scope.
    </Direction>
  );
}`
  }

  if (name === 'Drawer') {
    return `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="end">
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>
            Use logical side placement for RTL-ready layouts.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`
  }

  if (name === 'Input Group') {
    return `import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { Field, FieldLabel } from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <Field>
      <FieldLabel>Project URL</FieldLabel>
      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupInput
          aria-label="Project URL"
          placeholder="utopia-studio.co"
        />
      </InputGroup>
    </Field>
  );
}`
  }

  if (name === 'Input OTP') {
    return `import { InputOTP } from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { Field, FieldLabel } from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <Field>
      <FieldLabel>One-time code</FieldLabel>
      <InputOTP aria-label="One-time code" value="2607" />
    </Field>
  );
}`
  }

  if (name === 'Item') {
    return `import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { Badge } from '@utopia-studio-design/design-system/Badge';

export function Example() {
  return (
    <Item>
      <ItemContent>
        <ItemTitle>Design-system component</ItemTitle>
        <ItemDescription>
          Repeated row with title, description, and optional actions.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="outline">Available</Badge>
      </ItemActions>
    </Item>
  );
}`
  }

  if (name === 'Kbd') {
    return `import { Kbd } from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return <Kbd>⌘ K</Kbd>;
}`
  }

  if (name === 'Label') {
    return `import { Label } from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { TextInput } from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <div>
      <Label htmlFor="project-name">Project name</Label>
      <TextInput id="project-name" />
    </div>
  );
}`
  }

  if (name === 'Menubar') {
    return `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Docs</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Getting started</MenubarItem>
          <MenubarItem>Arabic-friendly guide</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`
  }

  if (name === 'Native Select') {
    return `import { NativeSelect } from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { Field, FieldLabel } from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <Field>
      <FieldLabel>Theme</FieldLabel>
      <NativeSelect defaultValue="default">
        <option value="default">Utopia Default</option>
        <option value="future">Future theme</option>
      </NativeSelect>
    </Field>
  );
}`
  }

  if (name === 'Navigation Menu') {
    return `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">Guide</NavigationMenuLink>
            <NavigationMenuLink href="/docs/foundations">Foundations</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/components">Components</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}`
  }

  if (name === 'Pagination') {
    return `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="?page=1">Previous</PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=2" isCurrent>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="?page=3">Next</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`
  }

  if (name === 'Radio Group') {
    return `import { RadioGroup, RadioGroupItem } from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <RadioGroup defaultValue="docs" aria-label="View">
      <label>
        <RadioGroupItem value="docs" />
        Docs
      </label>
      <label>
        <RadioGroupItem value="components" />
        Components
      </label>
    </RadioGroup>
  );
}`
  }

  if (name === 'Resizable') {
    return `import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Resizable>
      <ResizablePanel defaultSize={55}>Preview</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={45}>Inspector</ResizablePanel>
    </Resizable>
  );
}`
  }

  if (name === 'Scroll Area') {
    return `import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollBar,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <ScrollArea>
      <ScrollAreaViewport>
        Long scrollable content
      </ScrollAreaViewport>
      <ScrollBar />
    </ScrollArea>
  );
}`
  }

  if (name === 'Select') {
    return `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <Select defaultValue="default">
      <SelectTrigger aria-label="Theme">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Utopia Default</SelectItem>
        <SelectItem value="future">Future theme</SelectItem>
      </SelectContent>
    </Select>
  );
}`
  }

  if (name === 'Sheet') {
    return `import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';
import { Button } from '@utopia-studio-design/design-system/Button';

export function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="end">
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>
            Use logical side placement for RTL-ready layouts.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}`
  }

  if (name === 'Slider') {
    return `import { Slider } from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return <Slider defaultValue={[40]} max={100} step={1} />;
}`
  }

  if (name === 'Sonner') {
    return isArabic ? `import {
  Sonner,
  SonnerDescription,
  SonnerTitle,
  SonnerToast,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Sonner>
      <SonnerToast>
        <SonnerTitle>تم الحفظ</SonnerTitle>
        <SonnerDescription>التغييرات جاهزة للمراجعة.</SonnerDescription>
      </SonnerToast>
    </Sonner>
  );
}` : `import {
  Sonner,
  SonnerDescription,
  SonnerTitle,
  SonnerToast,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <Sonner>
      <SonnerToast>
        <SonnerTitle>Saved</SonnerTitle>
        <SonnerDescription>Changes are ready for review.</SonnerDescription>
      </SonnerToast>
    </Sonner>
  );
}`
  }

  if (name === 'Switch') {
    return isArabic ? `import { Switch } from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <label>
      <Switch defaultChecked />
      تفعيل الإشعارات
    </label>
  );
}` : `import { Switch } from '@utopia-studio-design/design-system/Forms';

export function Example() {
  return (
    <label>
      <Switch defaultChecked />
      Enable notifications
    </label>
  );
}`
  }

  if (name === 'Table') {
    return isArabic ? `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@utopia-studio-design/design-system/DataDisplay';

export function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>المكوّن</TableHead>
          <TableHead>الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>جدول</TableCell>
          <TableCell>متاح</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}` : `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@utopia-studio-design/design-system/DataDisplay';

export function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Table</TableCell>
          <TableCell>Available</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`
  }

  if (name === 'Toast') {
    return isArabic ? `import {
  Toast,
  ToastDescription,
  ToastTitle,
} from '@utopia-studio-design/design-system/DataDisplay';

export function Example() {
  return (
    <Toast>
      <ToastTitle>تم الحفظ</ToastTitle>
      <ToastDescription>التغييرات جاهزة للمراجعة.</ToastDescription>
    </Toast>
  );
}` : `import {
  Toast,
  ToastDescription,
  ToastTitle,
} from '@utopia-studio-design/design-system/DataDisplay';

export function Example() {
  return (
    <Toast>
      <ToastTitle>Saved</ToastTitle>
      <ToastDescription>Changes are ready for review.</ToastDescription>
    </Toast>
  );
}`
  }

  const entry = components.components.find((component) => component.name === name)
  if (entry) {
    if (entry.sourcePath.includes('ShadcnPrimitives')) {
      const componentName = entry.packageImport.match(/\\{ ([^ }]+)/)?.[1] ?? name.replace(/[^a-z0-9]/gi, '')
      return `import {
  ${componentName},
  PrimitiveHeader,
  PrimitiveItem,
} from '@utopia-studio-design/design-system/ShadcnPrimitives';

export function Example() {
  return (
    <${componentName}>
      <PrimitiveHeader>${name}</PrimitiveHeader>
      <PrimitiveItem>
        Convert the shadcn/ui ${entry.shadcnFoundation[0]} pattern through Utopia semantic tokens.
      </PrimitiveItem>
    </${componentName}>
  );
}`
    }

    const componentName = name.replace(/[^a-z0-9]/gi, '')
    const selfClosing = ['Input', 'Textarea', 'Checkbox', 'Radio Group', 'Select', 'Slider', 'Switch', 'Spinner', 'Skeleton', 'Progress'].includes(name)
    const hook = name.startsWith('use')
    if (hook) {
      return `${entry.packageImport}

export function Example() {
  const result = ${componentName}();
  return result;
}`
    }
    if (selfClosing) {
      return `${entry.packageImport}

export function Example() {
  return <${componentName} />;
}`
    }

    return `${entry.packageImport}

export function Example() {
  return (
    <${componentName}>
      ${name}
    </${componentName}>
  );
}`
  }

  return `import { Card, CardContent, CardHeader, CardTitle } from '@utopia-studio-design/design-system/Card';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Surface</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  );
}`
}
