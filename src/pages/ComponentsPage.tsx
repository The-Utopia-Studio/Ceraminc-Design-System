import { Bell, Box, Component, FileText, Search, UserCircle } from 'lucide-react'
import { components, getComponentAreaGroups, getComponentFamilies, slugify } from '../data/design-system'
import { AccountStatus, Avatar } from '../../packages/design-system/src/DataDisplay'
import { Badge } from '../../packages/design-system/src/Badge'
import { Button } from '../../packages/design-system/src/Button'
import { ButtonGroup, ButtonGroupSeparator } from '../../packages/design-system/src/ButtonGroup'
import { IconButton } from '../../packages/design-system/src/IconButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../packages/design-system/src/Card'
import { Checkbox, Field, FieldLabel, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Slider, Switch, TextArea, TextInput } from '../../packages/design-system/src/Forms'
import { HStack, VStack } from '../../packages/design-system/src/Layout'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, MobileNav, MobileNavContent, MobileNavToggle, MobileNavTrigger, NavIcon, PanelIcon, SideNav, SideNavCollapseButton, SideNavHeading, SideNavItem, SideNavSection, Tab, TabList, TabPanel, Tabs, TopNav, TopNavHeading, TopNavItem, TopNavMegaMenu, TopNavMegaMenuFeaturedCard, TopNavMegaMenuItem, TopNavMenu, TopNavMenuItem } from '../../packages/design-system/src/Navigation'
import { Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../packages/design-system/src/Surface'
import { ToggleButton } from '../../packages/design-system/src/ToggleButton'
import { ToggleButtonGroup, ToggleButtonGroupItem } from '../../packages/design-system/src/ToggleButtonGroup'
import { QueuedComponentPreview, queuedComponentNames } from '../components/QueuedComponentPreviews'
import { categoryLabel, componentLabel, t, useI18n } from '../i18n'

type ComponentEntry = typeof components.components[number]

export function ComponentsPage() {
  const { locale } = useI18n()
  const checklistAliases = [
    { label: 'Sidebar', target: 'side-nav', previewName: 'Side Nav' },
    { label: 'Toggle', target: 'toggle-button', previewName: 'Toggle Button' },
    { label: 'Toggle Group', target: 'toggle-button-group', previewName: 'Toggle Button Group' },
    { label: 'MarkerNew', target: 'markernew', previewName: 'Marker' },
    { label: 'MessageNew', target: 'messagenew', previewName: 'Message' },
    { label: 'Message ScrollerNew', target: 'message-scrollernew', previewName: 'Message Scroller' },
  ] as const
  const componentsByName = new Map(components.components.map((entry) => [entry.name, entry]))
  const componentAreaGroups = getComponentAreaGroups()
  const componentFamilies = getComponentFamilies()
  const familyByParent = new Map(componentFamilies.map((family) => [family.parent, family]))
  const familyChildItems = new Set(componentFamilies.flatMap((family) => family.items))

  return (
    <div className="page components-library-page">
      <section className="components-library-hero">
        <h1>{t(locale, 'browseLibrary')}</h1>
        <p>{t(locale, 'browseLibraryIntro')}</p>
        <Button onClick={() => { window.location.hash = '#/docs#install' }} variant="secondary">
          {t(locale, 'installCoreLibrary')}
        </Button>
      </section>

      <div className="components-library-divider" />

      <section className="component-gallery-section">
        <h2>{locale === 'ar' ? 'أسماء مرادفة للقائمة' : 'Checklist aliases'}</h2>
        <div className="component-gallery-grid">
          {checklistAliases.map((alias) => (
            <article className="component-gallery-card" key={alias.label}>
              <span className="component-gallery-preview" aria-hidden="true">
                <ComponentPreview name={alias.previewName} />
              </span>
              <a className="component-gallery-name" href={`#/components/${alias.target}`}>
                {alias.label}
              </a>
            </article>
          ))}
        </div>
      </section>

      <div className="components-library-divider" />

      <div className="components-library-sections">
        {componentAreaGroups.map((group) => {
          const entries = group.items
            .filter((item) => !familyChildItems.has(item))
            .map((item) => componentsByName.get(item))
            .filter(Boolean) as ComponentEntry[]

          return (
            <section className="component-gallery-section" id={group.id} key={group.id}>
              <h2>{categoryLabel(locale, group.label)}</h2>
              <div className="component-gallery-grid">
                {entries.map((entry) => {
                  const family = familyByParent.get(entry.name)

                  if (family) {
                    return (
                      <article className="component-gallery-family" key={entry.name}>
                        <div className="component-gallery-family-header">
                          <a className="component-gallery-name" href={`#/components/${slugify(entry.name)}`}>{componentLabel(locale, entry.name)}</a>
                          <p>{family.description}</p>
                        </div>
                        <div className="component-gallery-family-grid">
                          {[entry.name, ...family.items].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })).map((familyItem) => (
                            <article className="component-gallery-card" key={familyItem}>
                              <span className="component-gallery-preview" aria-hidden="true">
                                <ComponentPreview name={familyItem} />
                              </span>
                              <a className="component-gallery-name" href={`#/components/${slugify(familyItem)}`}>{componentLabel(locale, familyItem)}</a>
                            </article>
                          ))}
                        </div>
                      </article>
                    )
                  }

                  return (
                    <article className="component-gallery-card" key={entry.name}>
                      <span className="component-gallery-preview" aria-hidden="true">
                        <ComponentPreview name={entry.name} />
                      </span>
                      <a className="component-gallery-name" href={`#/components/${slugify(entry.name)}`}>{componentLabel(locale, entry.name)}</a>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function ComponentPreview({ name }: { name: string }) {
  const { locale } = useI18n()

  if (queuedComponentNames.has(name)) {
    return <QueuedComponentPreview locale={locale} name={name} />
  }

  const previewText = {
    primary: locale === 'ar' ? 'أساسي' : 'Primary',
    secondary: locale === 'ar' ? 'ثانوي' : 'Secondary',
    ghost: locale === 'ar' ? 'هادئ' : 'Ghost',
    destructive: locale === 'ar' ? 'حذف' : 'Destructive',
    archive: locale === 'ar' ? 'أرشفة' : 'Archive',
    more: locale === 'ar' ? 'المزيد' : 'More actions',
    moreOptions: locale === 'ar' ? 'خيارات أكثر' : 'More options',
    active: locale === 'ar' ? 'نشط' : 'Active',
    list: locale === 'ar' ? 'قائمة' : 'List',
    grid: locale === 'ar' ? 'شبكة' : 'Grid',
    board: locale === 'ar' ? 'لوحة' : 'Board',
    search: locale === 'ar' ? 'بحث' : 'Search',
    theme: locale === 'ar' ? 'الثيم' : 'Theme',
    docs: locale === 'ar' ? 'المستندات' : 'Docs',
    components: locale === 'ar' ? 'المكونات' : 'Components',
    markAsRead: locale === 'ar' ? 'تحديد كمقروء' : 'Mark as Read',
    trash: locale === 'ar' ? 'حذف' : 'Trash',
    addItem: locale === 'ar' ? 'إضافة عنصر' : 'Add item',
    openSettings: locale === 'ar' ? 'فتح الإعدادات' : 'Open settings',
    surface: locale === 'ar' ? 'سطح' : 'Surface',
    tokenDriven: locale === 'ar' ? 'مدعوم بالتوكنات' : 'Token driven',
    hoverTarget: locale === 'ar' ? 'هدف التحويم' : 'Hover target',
    open: locale === 'ar' ? 'فتح' : 'Open',
    popover: locale === 'ar' ? 'نافذة منبثقة' : 'Popover',
    target: locale === 'ar' ? 'الهدف' : 'Target',
    helpfulLabel: locale === 'ar' ? 'تسمية مساعدة' : 'Helpful label',
    remember: locale === 'ar' ? 'تذكرني' : 'Remember',
    note: locale === 'ar' ? 'اكتب ملاحظة' : 'Write a note',
    label: locale === 'ar' ? 'التسمية' : 'Label',
    value: locale === 'ar' ? 'القيمة' : 'Value',
    defaultTheme: locale === 'ar' ? 'افتراضي' : 'Default',
    futureTheme: locale === 'ar' ? 'مستقبلي' : 'Future',
    actions: locale === 'ar' ? 'إجراءات' : 'Actions',
    copy: locale === 'ar' ? 'نسخ' : 'Copy',
    paste: locale === 'ar' ? 'لصق' : 'Paste',
    app: locale === 'ar' ? 'التطبيق' : 'App',
    moreTopNav: locale === 'ar' ? 'المزيد' : 'More',
    library: locale === 'ar' ? 'المكتبة' : 'Library',
    searchAria: locale === 'ar' ? 'بحث' : 'Search',
    openNavigation: locale === 'ar' ? 'فتح التنقل' : 'Open navigation',
    ceramic: locale === 'ar' ? 'سيراميك' : 'Ceramic',
    designSystem: locale === 'ar' ? 'نظام التصميم' : 'Design System',
    navigation: locale === 'ar' ? 'التنقل' : 'Navigation',
    inbox: locale === 'ar' ? 'الوارد' : 'Inbox',
    documents: locale === 'ar' ? 'المستندات' : 'Documents',
    settings: locale === 'ar' ? 'الإعدادات' : 'Settings',
    closeSidebar: locale === 'ar' ? 'إغلاق الشريط الجانبي' : 'Close sidebar',
    workspace: locale === 'ar' ? 'مساحة العمل' : 'Workspace',
    table: locale === 'ar' ? 'جدول' : 'Table',
    gridView: locale === 'ar' ? 'عرض الشبكة' : 'Grid view',
    pro: locale === 'ar' ? 'احترافي' : 'Pro',
    available: locale === 'ar' ? 'متاح' : 'Available',
  }

  if (name === 'Button') {
    return (
      <HStack gap={2} align="center">
        <Button size="sm">{previewText.primary}</Button>
        <Button size="sm" variant="secondary">{previewText.secondary}</Button>
        <Button size="sm" variant="ghost">{previewText.ghost}</Button>
        <Button size="sm" variant="destructive">{previewText.destructive}</Button>
      </HStack>
    )
  }

  if (name === 'Button Group') {
    return (
      <ButtonGroup density="compact" label={previewText.actions}>
        <Button size="sm" variant="outline">{previewText.archive}</Button>
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label={previewText.more} isIconOnly size="sm" variant="outline">...</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{previewText.markAsRead}</DropdownMenuItem>
            <DropdownMenuItem>{previewText.archive}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-variant="destructive">{previewText.trash}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    )
  }

  if (name === 'Icon Button') {
    return (
      <HStack gap={2} align="center">
        <IconButton label={previewText.addItem} size="sm">+</IconButton>
        <IconButton label={previewText.openSettings} size="sm" variant="secondary">⚙</IconButton>
        <IconButton label={previewText.moreOptions} size="sm" variant="ghost">..</IconButton>
      </HStack>
    )
  }

  if (name === 'Toggle Button') return <ToggleButton defaultPressed label={previewText.active} size="sm" />

  if (name === 'Toggle Button Group') {
    return (
      <ToggleButtonGroup defaultValue="grid" label="View" type="single">
        <ToggleButtonGroupItem label={previewText.list} size="sm" value="list" />
        <ToggleButtonGroupItem label={previewText.grid} size="sm" value="grid" />
        <ToggleButtonGroupItem label={previewText.board} size="sm" value="board" />
      </ToggleButtonGroup>
    )
  }

  if (name === 'Card') {
    return (
      <Card size="sm">
        <CardHeader>
          <CardTitle>{previewText.surface}</CardTitle>
          <CardDescription>{previewText.tokenDriven}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (name === 'Hover Card') {
    return <Card size="sm"><CardContent>{previewText.hoverTarget}</CardContent></Card>
  }

  if (name === 'Popover') {
    return <Popover><PopoverTrigger asChild><Button size="sm" variant="secondary">{previewText.open}</Button></PopoverTrigger><PopoverContent>{previewText.popover}</PopoverContent></Popover>
  }

  if (name === 'Tooltip') {
    return <TooltipProvider><Tooltip open><TooltipTrigger asChild><Button size="sm" variant="secondary">{previewText.target}</Button></TooltipTrigger><TooltipContent>{previewText.helpfulLabel}</TooltipContent></Tooltip></TooltipProvider>
  }

  if (name === 'Checkbox') {
    return (
      <VStack className="checkbox-gallery-preview" gap={2}>
        <label className="choice-row"><Checkbox defaultChecked /> {previewText.remember}</label>
        <label className="choice-row"><Checkbox /> {previewText.available}</label>
        <label className="choice-row is-disabled"><Checkbox disabled /> {locale === 'ar' ? 'غير متاح' : 'Disabled'}</label>
      </VStack>
    )
  }
  if (name === 'Switch') return <Switch defaultChecked aria-label={locale === 'ar' ? 'مفتاح المعاينة' : 'Preview switch'} />
  if (name === 'Slider') return <Slider defaultValue={[54]} max={100} />
  if (name === 'Textarea') return <TextArea aria-label={locale === 'ar' ? 'ملاحظة المعاينة' : 'Preview note'} placeholder={previewText.note} />
  if (name === 'Input') return <TextInput aria-label={locale === 'ar' ? 'حقل المعاينة' : 'Preview input'} placeholder={previewText.search} />
  if (name === 'Field') return <Field><FieldLabel>{previewText.label}</FieldLabel><TextInput placeholder={previewText.value} /></Field>

  if (name === 'Select' || name === 'Native Select') {
    return (
      <Select defaultValue="default">
        <SelectTrigger aria-label={previewText.theme}><SelectValue placeholder={previewText.theme} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="default">{previewText.defaultTheme}</SelectItem>
          <SelectItem value="future">{previewText.futureTheme}</SelectItem>
        </SelectContent>
      </Select>
    )
  }

  if (name === 'Dropdown Menu') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button size="sm" variant="secondary">{previewText.actions}</Button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>{previewText.copy}</DropdownMenuItem>
          <DropdownMenuItem>{previewText.paste}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (name === 'Nav Icon') {
    return (
      <HStack className="top-nav-icon-preview top-nav-gallery-part top-nav-gallery-part--icons" gap={1} align="center">
        <NavIcon active aria-label={previewText.searchAria}><Search aria-hidden="true" /></NavIcon>
        <NavIcon aria-label={locale === 'ar' ? 'الإشعارات' : 'Notifications'}><Bell aria-hidden="true" /></NavIcon>
        <NavIcon aria-label={locale === 'ar' ? 'الحساب' : 'Account'}><UserCircle aria-hidden="true" /></NavIcon>
      </HStack>
    )
  }

  if (name === 'Top Nav Heading') {
    return (
      <div className="top-nav-gallery-heading-frame top-nav-gallery-part top-nav-gallery-part--heading">
        <TopNavHeading
          className="top-nav-gallery-heading"
          icon={<Box aria-hidden="true" />}
          label={previewText.app}
          subtitle={previewText.designSystem}
        />
      </div>
    )
  }

  if (name === 'Top Nav Item') {
    return (
      <div className="top-nav-gallery-strip top-nav-gallery-part top-nav-gallery-part--items">
        <TopNav className="top-nav-gallery-root">
          <TopNavItem href="#/components/top-nav-item" isCurrent>{locale === 'ar' ? 'الرئيسية' : 'Home'}</TopNavItem>
          <TopNavItem href="#/docs">{previewText.docs}</TopNavItem>
          <TopNavItem href="#/themes">{previewText.theme}</TopNavItem>
        </TopNav>
      </div>
    )
  }

  if (name === 'Top Nav Menu') {
    return (
      <div className="top-nav-gallery-stack top-nav-gallery-part top-nav-gallery-part--menu">
        <TopNav>
          <TopNavMenu label={previewText.moreTopNav}>
            <TopNavMenuItem href="#/components">{previewText.components}</TopNavMenuItem>
          </TopNavMenu>
        </TopNav>
        <div className="top-nav-gallery-menu-surface">
          <span>{previewText.components}</span>
          <span>{previewText.docs}</span>
        </div>
      </div>
    )
  }

  if (name === 'Top Nav Mega Menu') {
    return (
      <div className="top-nav-gallery-mega top-nav-gallery-part top-nav-gallery-part--mega">
        <TopNavMegaMenuFeaturedCard href="#/components" icon={<Component aria-hidden="true" />} title={previewText.library} description={previewText.tokenDriven} />
        <div className="top-nav-gallery-mega-list">
          <TopNavMegaMenuItem href="#/docs" icon={<FileText aria-hidden="true" />} title={previewText.docs} description={previewText.designSystem} />
          <TopNavMegaMenuItem href="#/components" icon={<Component aria-hidden="true" />} title={previewText.components} description={previewText.available} />
        </div>
      </div>
    )
  }

  if (name === 'Top Nav Mega Menu Featured Card') {
    return <TopNavMegaMenuFeaturedCard className="top-nav-gallery-featured-card top-nav-gallery-part top-nav-gallery-part--featured" href="#/components" icon={<Component aria-hidden="true" />} title={previewText.library} description={previewText.tokenDriven} />
  }

  if (name === 'Top Nav Mega Menu Item') {
    return (
      <VStack className="top-nav-gallery-mega-list top-nav-gallery-part top-nav-gallery-part--mega-items" gap={1}>
        <TopNavMegaMenuItem href="#/docs" icon={<FileText aria-hidden="true" />} title={previewText.docs} description={previewText.designSystem} />
        <TopNavMegaMenuItem href="#/components" icon={<Component aria-hidden="true" />} title={previewText.components} description={previewText.available} />
      </VStack>
    )
  }

  if (name === 'Top Nav') {
    return (
      <div className="top-nav-gallery-shell top-nav-gallery-part top-nav-gallery-part--shell">
        <TopNavHeading icon={<Box aria-hidden="true" />} label={previewText.app} />
        <TopNav className="top-nav-gallery-root">
          <TopNavItem href="#/components/top-nav" isCurrent>{locale === 'ar' ? 'الرئيسية' : 'Home'}</TopNavItem>
          <TopNavItem href="#/docs">{previewText.moreTopNav}</TopNavItem>
        </TopNav>
        <NavIcon aria-label={previewText.searchAria}><Search aria-hidden="true" /></NavIcon>
      </div>
    )
  }

  if (name === 'Mobile Nav') {
    return (
      <div className="mobile-nav-gallery-panel">
        <div className="mobile-nav-gallery-bar">
          <MobileNavToggle aria-label={previewText.openNavigation}>☰</MobileNavToggle>
          <span>{previewText.app}</span>
        </div>
        <div className="mobile-nav-gallery-content">
          <SideNavHeading label={previewText.ceramic} subtitle={previewText.designSystem} variant="brand" />
          <SideNavSection label={previewText.navigation}>
            <SideNavItem isCurrent label={previewText.docs} />
            <SideNavItem label={previewText.components} />
          </SideNavSection>
        </div>
      </div>
    )
  }

  if (name === 'Mobile Nav Toggle') {
    return <MobileNavToggle aria-label={previewText.openNavigation}>☰</MobileNavToggle>
  }

  if (name === 'Nav Heading Menu') {
    return (
      <div className="top-nav-gallery-stack">
        <Button size="sm" variant="secondary">{previewText.ceramic}</Button>
        <div className="top-nav-gallery-menu-surface">
          <span>{previewText.ceramic}</span>
          <span>{previewText.docs}</span>
        </div>
      </div>
    )
  }

  if (name === 'Side Nav Item') {
    return (
      <SideNav aria-label={locale === 'ar' ? 'معاينة عناصر التنقل الجانبي' : 'Preview side navigation items'}>
        <SideNavItem isCurrent label={previewText.inbox} badge={12} />
        <SideNavItem label={previewText.documents} />
        <SideNavItem isDisabled label={previewText.settings} />
      </SideNav>
    )
  }

  if (name === 'Side Nav Collapse Button') {
    return (
      <SideNav aria-label={locale === 'ar' ? 'معاينة التنقل الجانبي القابل للطي' : 'Preview collapsible side navigation'}>
        <SideNavHeading
          endContent={
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SideNavCollapseButton aria-label={previewText.closeSidebar} aria-expanded="true">
                    <PanelIcon />
                  </SideNavCollapseButton>
                </TooltipTrigger>
                <TooltipContent side="bottom">{previewText.closeSidebar}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
          label="Ceramic"
          subtitle={previewText.designSystem}
          variant="brand"
        />
      </SideNav>
    )
  }

  if (name.startsWith('Side Nav')) {
    return (
      <SideNav aria-label={locale === 'ar' ? 'معاينة التنقل الجانبي' : 'Preview side navigation'}>
        <SideNavSection label={previewText.workspace}>
          <SideNavItem isCurrent label={previewText.inbox} badge={12} />
          <SideNavItem label={previewText.documents} />
          <SideNavItem isDisabled label={previewText.settings} />
        </SideNavSection>
      </SideNav>
    )
  }

  if (name === 'Tabs') {
    return (
      <Tabs defaultValue="grid">
        <TabList><Tab value="list">{previewText.list}</Tab><Tab value="grid">{previewText.grid}</Tab><Tab value="table">{previewText.table}</Tab></TabList>
        <TabPanel value="grid">{previewText.gridView}</TabPanel>
      </Tabs>
    )
  }

  if (name === 'Account Status') return <AccountStatus avatarAlt={locale === 'ar' ? 'مستخدم' : 'Y K'} avatarFallback={locale === 'ar' ? 'م' : 'YK'} description={previewText.pro} label={locale === 'ar' ? 'مستخدم تجريبي' : 'ykkkk12314'} />
  if (name === 'Avatar') return <Avatar alt={locale === 'ar' ? 'استوديو يوتوبيا' : 'Utopia Studio'}>{locale === 'ar' ? 'ي' : 'US'}</Avatar>
  if (name === 'Badge') return <Badge>{previewText.available}</Badge>

  return (
    <VStack gap={2} align="center">
      <span className="library-preview-mark" />
      <span className="library-preview-label">{name}</span>
    </VStack>
  )
}
