import { useState } from 'react'
import { CalendarDays, Check, ChevronDown, FileText, FolderOpen, Search, X } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../packages/design-system/src/Accordion'
import { Alert, AlertDescription, AlertTitle } from '../../packages/design-system/src/Alert'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../packages/design-system/src/AlertDialog'
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from '../../packages/design-system/src/Attachment'
import { Button } from '../../packages/design-system/src/Button'
import { ChatComposer, ChatComposerInput, ChatComposerTokenElement, ChatDictationButton, ChatLayout, ChatLayoutScrollButton, ChatMessage, ChatMessageBubble, ChatMessageList, ChatMessageMetadata, ChatSendButton, ChatSystemMessage, ChatTokenizedText, ChatToolCalls } from '../../packages/design-system/src/Chat'
import { Calendar, DatePicker, EmptyState, ProgressBar, Skeleton, Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Toast, ToastDescription, ToastIcon, ToastTitle } from '../../packages/design-system/src/DataDisplay'
import { Checkbox, Field, FieldLabel, RadioGroup, RadioGroupItem, TextInput } from '../../packages/design-system/src/Forms'
import { AspectRatio, Center, HStack, VStack } from '../../packages/design-system/src/Layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Breadcrumbs, CommandPalette, CommandPaletteEmpty, CommandPaletteGroup, CommandPaletteInput, CommandPaletteItem, CommandPaletteList, CommandPaletteShortcut, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger, NavigationIcon } from '../../packages/design-system/src/Navigation'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '../../packages/design-system/src/Sidebar'
import {
  Bubble,
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  Chart,
  ChartBars,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxOption,
  ComboboxTrigger,
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
  DataTableShell,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Direction,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  InputGroup,
  InputGroupInput,
  InputGroupText,
  InputOTP,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
  Kbd,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Resizable,
  ResizableHandle,
  ResizablePanel,
  ScrollArea,
  ScrollAreaViewport,
  ScrollBar,
  Separator,
  SeparatorLabel,
  Sonner,
  SonnerDescription,
  SonnerToast,
  SonnerTitle,
} from '../../packages/design-system/src/ShadcnPrimitives'
import { Heading, Text } from '../../packages/design-system/src/Typography'

type PreviewProps = {
  locale: 'en' | 'ar'
}

const chatComponentNames = new Set([
  'Chat Composer',
  'Chat Composer Drawer',
  'Chat Composer Input',
  'Chat Composer Token Element',
  'Chat Dictation Button',
  'Chat Layout',
  'Chat Layout Scroll Button',
  'Chat Message',
  'Chat Message Bubble',
  'Chat Message List',
  'Chat Message Metadata',
  'Chat Send Button',
  'Chat System Message',
  'Chat Tokenized Text',
  'Chat Tool Calls',
])

export function QueuedComponentPreview({ locale, name }: PreviewProps & { name: string }) {
  const isArabic = locale === 'ar'

  if (chatComponentNames.has(name)) {
    return <ChatGalleryPreview locale={locale} name={name} />
  }

  if (name === 'Accordion') {
    return (
      <Accordion className="component-gallery-accordion" collapsible defaultValue="tokens" type="single">
        <AccordionItem value="tokens">
          <AccordionTrigger>{isArabic ? 'التوكنات الدلالية' : 'Semantic tokens'}</AccordionTrigger>
          <AccordionContent>{isArabic ? 'تستهلك المكونات أدوارا مستقرة.' : 'Components consume stable roles.'}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="rtl">
          <AccordionTrigger>{isArabic ? 'دعم الاتجاه' : 'Direction support'}</AccordionTrigger>
          <AccordionContent>{isArabic ? 'تعكس الخصائص المنطقية التخطيط.' : 'Logical properties mirror layout.'}</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  if (name === 'Alert') {
    return (
      <Alert className="component-gallery-alert" variant="success">
        <AlertTitle>{isArabic ? 'تم حفظ التغييرات' : 'Changes saved'}</AlertTitle>
        <AlertDescription>{isArabic ? 'المسودة محدثة.' : 'Your draft is up to date.'}</AlertDescription>
      </Alert>
    )
  }

  if (name === 'Alert Dialog') {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild><Button size="sm" variant="secondary">{isArabic ? 'تأكيد الإجراء' : 'Confirm action'}</Button></AlertDialogTrigger>
        <AlertDialogContent dir={isArabic ? 'rtl' : 'ltr'}>
          <AlertDialogHeader>
            <AlertDialogTitle>{isArabic ? 'هل تريد المتابعة؟' : 'Continue with this action?'}</AlertDialogTitle>
            <AlertDialogDescription>{isArabic ? 'يتطلب هذا الإجراء تأكيدا صريحا.' : 'This action needs explicit confirmation.'}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{isArabic ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
            <AlertDialogAction>{isArabic ? 'متابعة' : 'Continue'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  if (name === 'Aspect Ratio') {
    return <AspectRatio className="component-gallery-aspect-ratio" ratio={16 / 9}><Center>{isArabic ? 'نسبة 16:9' : '16:9 media'}</Center></AspectRatio>
  }

  if (name === 'Attachment') {
    return (
      <Attachment className="component-gallery-attachment" size="sm">
        <AttachmentMedia><FileText aria-hidden="true" /></AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{isArabic ? 'موجز المشروع.pdf' : 'project-brief.pdf'}</AttachmentTitle>
          <AttachmentDescription>{isArabic ? 'PDF · 2.4 م.ب' : 'PDF · 2.4 MB'}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions><AttachmentAction aria-label={isArabic ? 'إزالة الملف' : 'Remove file'}><X aria-hidden="true" /></AttachmentAction></AttachmentActions>
      </Attachment>
    )
  }

  if (['Breadcrumb', 'Breadcrumb Item', 'Breadcrumbs'].includes(name)) {
    return <BreadcrumbGalleryPreview locale={locale} />
  }

  if (name === 'Bubble') {
    return <Bubble tone="muted">{isArabic ? 'كيف يمكننا تحسين هذا التدفق؟' : 'How can we improve this flow?'}</Bubble>
  }

  if (name === 'Calendar') {
    return (
      <div className="component-gallery-calendar" dir={isArabic ? 'rtl' : 'ltr'}>
        <Calendar captionLayout="label" defaultMonth={new Date(2026, 6, 1)} defaultSelectedDate={new Date(2026, 6, 8)} locale={isArabic ? 'ar' : 'en-US'} weekStartsOn={isArabic ? 6 : 0} />
      </div>
    )
  }

  if (name === 'Carousel') {
    return <CarouselGalleryPreview locale={locale} />
  }

  if (name === 'Chart') {
    return (
      <Chart className="component-gallery-chart" title={isArabic ? 'نشاط أسبوعي' : 'Weekly activity'}>
        <ChartBars getValueLabel={(value) => isArabic ? `${value} بالمئة` : `${value} percent`} values={[42, 68, 54, 82, 64]} />
      </Chart>
    )
  }

  if (name === 'Collapsible') {
    return (
      <Collapsible className="component-gallery-collapsible" defaultOpen>
        <CollapsibleTrigger>{isArabic ? 'عقد المكوّن' : 'Component contract'} <ChevronDown aria-hidden="true" /></CollapsibleTrigger>
        <CollapsibleContent>{isArabic ? 'توكنات دلالية وتباعد منطقي وحركة هادئة.' : 'Semantic tokens, logical spacing, and calm motion.'}</CollapsibleContent>
      </Collapsible>
    )
  }

  if (name === 'Combobox') {
    return <ComboboxGalleryPreview locale={locale} />
  }

  if (name === 'Command') {
    return (
      <CommandPalette className="component-gallery-command">
        <CommandPaletteInput placeholder={isArabic ? 'اكتب أمرا أو ابحث' : 'Type a command or search'} />
        <CommandPaletteList>
          <CommandPaletteEmpty>{isArabic ? 'لا توجد نتائج.' : 'No results found.'}</CommandPaletteEmpty>
          <CommandPaletteGroup heading={isArabic ? 'اقتراحات' : 'Suggestions'}>
            <CommandPaletteItem><CalendarDays aria-hidden="true" />{isArabic ? 'التقويم' : 'Calendar'}<CommandPaletteShortcut>⌘ K</CommandPaletteShortcut></CommandPaletteItem>
            <CommandPaletteItem><Search aria-hidden="true" />{isArabic ? 'البحث' : 'Search'}</CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPalette>
    )
  }

  if (name === 'Context Menu') {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="component-gallery-context-trigger">{isArabic ? 'انقر بزر الفأرة الأيمن' : 'Right click here'}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>{isArabic ? 'إجراءات' : 'Actions'}</ContextMenuLabel>
          <ContextMenuItem>{isArabic ? 'رجوع' : 'Back'}<ContextMenuShortcut>⌘ [</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem>{isArabic ? 'إعادة تحميل' : 'Reload'}<ContextMenuShortcut>⌘ R</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>{isArabic ? 'فحص البنية' : 'Inspect structure'}</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  }

  if (name === 'Data Table') {
    return <DataTableGalleryPreview locale={locale} />
  }

  if (name === 'Date Picker') {
    return (
      <div className="component-gallery-date-picker" dir={isArabic ? 'rtl' : 'ltr'}>
        <DatePicker defaultSelectedDate={new Date(2026, 6, 8)} label={isArabic ? 'اختر التاريخ' : 'Select date'} locale={isArabic ? 'ar' : 'en-US'} placeholder={isArabic ? 'اختر تاريخا' : 'Pick a date'} weekStartsOn={isArabic ? 6 : 0} />
      </div>
    )
  }

  if (name === 'Dialog') {
    return (
      <Dialog>
        <DialogTrigger asChild><Button size="sm" variant="secondary">{isArabic ? 'فتح الحوار' : 'Open dialog'}</Button></DialogTrigger>
        <DialogContent dir={isArabic ? 'rtl' : 'ltr'}>
          <DialogHeader><DialogTitle>{isArabic ? 'تعديل الملف' : 'Edit profile'}</DialogTitle><DialogDescription>{isArabic ? 'حدّث التفاصيل ثم احفظ.' : 'Update the details, then save.'}</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><Button variant="secondary">{isArabic ? 'إغلاق' : 'Close'}</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (name === 'Direction') {
    return <Direction className="component-gallery-direction" dir="rtl" lang="ar"><strong>واجهة ثنائية الاتجاه</strong><span>RTL + English 2026</span></Direction>
  }

  if (name === 'Drawer') {
    return (
      <Drawer>
        <DrawerTrigger asChild><Button size="sm" variant="secondary">{isArabic ? 'فتح الدرج' : 'Open drawer'}</Button></DrawerTrigger>
        <DrawerContent dir={isArabic ? 'rtl' : 'ltr'} side="bottom">
          <DrawerHeader><DrawerTitle>{isArabic ? 'اختر وقت التسليم' : 'Pick a delivery time'}</DrawerTitle><DrawerDescription>{isArabic ? 'اختر الوقت الأنسب لك.' : 'Choose the time that works best.'}</DrawerDescription></DrawerHeader>
          <DrawerFooter><DrawerClose asChild><Button variant="secondary">{isArabic ? 'إغلاق' : 'Close'}</Button></DrawerClose></DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  if (name === 'Empty') {
    return (
      <EmptyState className="component-gallery-empty">
        <FolderOpen aria-hidden="true" />
        <strong>{isArabic ? 'لا توجد مشاريع بعد' : 'No projects yet'}</strong>
        <span>{isArabic ? 'أنشئ مشروعك الأول للبدء.' : 'Create your first project to get started.'}</span>
        <Button size="sm">{isArabic ? 'إنشاء مشروع' : 'Create project'}</Button>
      </EmptyState>
    )
  }

  if (name === 'Input Group') {
    return (
      <InputGroup className="component-gallery-input-group">
        <InputGroupText>https://</InputGroupText>
        <InputGroupInput aria-label={isArabic ? 'رابط المشروع' : 'Project URL'} placeholder="utopia-studio.co" />
      </InputGroup>
    )
  }

  if (name === 'Input OTP') {
    return <InputOTP aria-label={isArabic ? 'رمز التحقق' : 'Verification code'} getSlotLabel={(index) => isArabic ? `الخانة ${index + 1}` : `Digit ${index + 1}`} value="2607" />
  }

  if (name === 'Item') {
    return (
      <Item className="component-gallery-item">
        <ItemContent><ItemTitle>{isArabic ? 'مكوّن جاهز' : 'Component ready'}</ItemTitle><ItemDescription>{isArabic ? 'يدعم التوكنات وRTL.' : 'Token and RTL support included.'}</ItemDescription></ItemContent>
        <ItemActions><Check aria-label={isArabic ? 'متاح' : 'Available'} /></ItemActions>
      </Item>
    )
  }

  if (name === 'Sidebar') {
    return (
      <SidebarProvider>
        <Sidebar className="component-gallery-sidebar" collapsible="icon">
          <SidebarHeader><SidebarTrigger collapseLabel={isArabic ? 'طي الشريط' : 'Collapse sidebar'} expandLabel={isArabic ? 'توسيع الشريط' : 'Expand sidebar'} /></SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{isArabic ? 'مساحة العمل' : 'Workspace'}</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton activeVariant="both" isActive tooltip={isArabic ? 'الوارد' : 'Inbox'}><NavigationIcon name="inbox" /><span>{isArabic ? 'الوارد' : 'Inbox'}</span><SidebarMenuBadge>4</SidebarMenuBadge></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton tooltip={isArabic ? 'الملفات' : 'Files'}><NavigationIcon name="files" /><span>{isArabic ? 'الملفات' : 'Files'}</span></SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    )
  }

  if (name === 'Kbd') {
    return (
      <HStack align="center" gap={2}>
        <Kbd>⌘</Kbd>
        <Text size="sm" tone="muted">+</Text>
        <Kbd>K</Kbd>
      </HStack>
    )
  }

  if (name === 'Label') {
    return (
      <VStack gap={2} style={{ inlineSize: 'min(220px, 100%)' }}>
        <Field>
          <Label>{isArabic ? 'البريد الإلكتروني' : 'Email address'}</Label>
          <TextInput defaultValue="amelia@studio.com" type="email" />
        </Field>
      </VStack>
    )
  }

  if (name === 'Menubar') {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger data-state="open">{isArabic ? 'ملف' : 'File'}</MenubarTrigger>
          <MenubarContent align="start" forceMount>
            <MenubarItem>{isArabic ? 'ملف جديد' : 'New file'}</MenubarItem>
            <MenubarItem>{isArabic ? 'فتح' : 'Open'}</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{isArabic ? 'تحرير' : 'Edit'}</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{isArabic ? 'عرض' : 'View'}</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    )
  }

  if (name === 'Navigation Menu') {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger data-state="open">{isArabic ? 'المنتجات' : 'Products'}</NavigationMenuTrigger>
            <NavigationMenuContent forceMount>
              <NavigationMenuLink href="#">{isArabic ? 'أدوات التصميم' : 'Design tools'}</NavigationMenuLink>
              <NavigationMenuLink href="#">{isArabic ? 'النماذج الأولية' : 'Prototyping'}</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">{isArabic ? 'الأسعار' : 'Pricing'}</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }

  if (name === 'Pagination') {
    return (
      <Pagination aria-label={isArabic ? 'ترقيم الصفحات' : 'Pagination'}>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" text={isArabic ? 'السابق' : 'Previous'} /></PaginationItem>
          <PaginationItem><PaginationLink href="#" isCurrent>1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext href="#" text={isArabic ? 'التالي' : 'Next'} /></PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  if (name === 'Progress') {
    return <ProgressBar label={isArabic ? 'جار الرفع' : 'Uploading'} showValue value={62} />
  }

  if (name === 'Radio Group') {
    return (
      <RadioGroup defaultValue="standard">
        <FieldLabel style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <RadioGroupItem value="standard" />
          {isArabic ? 'شحن عادي' : 'Standard shipping'}
        </FieldLabel>
        <FieldLabel style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <RadioGroupItem value="express" />
          {isArabic ? 'شحن سريع' : 'Express shipping'}
        </FieldLabel>
      </RadioGroup>
    )
  }

  if (name === 'Resizable') {
    return (
      <Resizable style={{ inlineSize: 'min(280px, 100%)', blockSize: '7.5rem' }}>
        <ResizablePanel defaultSize={40} minSize={25}>
          <span>{isArabic ? 'يسار' : 'Left'}</span>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60} minSize={25}>
          <span>{isArabic ? 'يمين' : 'Right'}</span>
        </ResizablePanel>
      </Resizable>
    )
  }

  if (name === 'Scroll Area') {
    return (
      <ScrollArea>
        <ScrollAreaViewport>
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} style={{ fontSize: '0.75rem', paddingBlock: '0.25rem' }}>
              {isArabic ? `عنصر ${String(index + 1).padStart(2, '0')}` : `Item ${String(index + 1).padStart(2, '0')}`}
            </div>
          ))}
        </ScrollAreaViewport>
        <ScrollBar />
      </ScrollArea>
    )
  }

  if (name === 'Separator') {
    return (
      <VStack gap={3} style={{ inlineSize: 'min(240px, 100%)' }}>
        <Text size="sm">{isArabic ? 'إعدادات الحساب' : 'Account settings'}</Text>
        <Separator />
        <Text size="sm" tone="muted">{isArabic ? 'إدارة الملف والتفضيلات' : 'Manage profile and preferences'}</Text>
        <SeparatorLabel>{isArabic ? 'أو' : 'Or'}</SeparatorLabel>
      </VStack>
    )
  }

  if (name === 'Sheet') {
    return (
      <div className="component-gallery-sheet-preview" aria-hidden="true">
        <div className="component-gallery-sheet-scrim" />
        <div className="component-gallery-sheet-panel">
          <strong>{isArabic ? 'الفلاتر' : 'Filters'}</strong>
          <span>{isArabic ? 'الفئة' : 'Category'}</span>
          <span className="component-gallery-sheet-field" />
        </div>
      </div>
    )
  }

  if (name === 'Skeleton') {
    return (
      <HStack align="center" gap={3}>
        <Skeleton className="uds-skeleton--circle" variant="circle" />
        <VStack gap={2} style={{ flex: 1 }}>
          <Skeleton className="uds-skeleton--line" style={{ inlineSize: '80%' }} variant="line" />
          <Skeleton className="uds-skeleton--line" style={{ inlineSize: '55%' }} variant="line" />
        </VStack>
      </HStack>
    )
  }

  if (name === 'Sonner') {
    return (
      <Sonner>
        <SonnerToast tone="inverse">
          <SonnerTitle>{isArabic ? 'تم الحفظ بنجاح' : 'Saved successfully'}</SonnerTitle>
          <SonnerDescription>{isArabic ? 'الآن' : 'now'}</SonnerDescription>
        </SonnerToast>
      </Sonner>
    )
  }

  if (name === 'Spinner') {
    return <Spinner aria-hidden="true" size="md" />
  }

  if (name === 'Table') {
    return (
      <Table style={{ inlineSize: 'min(320px, 100%)' }}>
        <TableHeader>
          <TableRow>
            <TableHead>{isArabic ? 'الاسم' : 'Name'}</TableHead>
            <TableHead>{isArabic ? 'الدور' : 'Role'}</TableHead>
            <TableHead style={{ textAlign: 'end' }}>{isArabic ? 'الحالة' : 'Status'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{isArabic ? 'أميليا' : 'Amelia Chen'}</TableCell>
            <TableCell style={{ color: 'var(--muted-foreground)' }}>{isArabic ? 'مصممة' : 'Designer'}</TableCell>
            <TableCell style={{ textAlign: 'end' }}>{isArabic ? 'نشط' : 'Active'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{isArabic ? 'مالك' : 'Malik Rahman'}</TableCell>
            <TableCell style={{ color: 'var(--muted-foreground)' }}>{isArabic ? 'مهندس' : 'Engineer'}</TableCell>
            <TableCell style={{ textAlign: 'end' }}>{isArabic ? 'بعيد' : 'Away'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  if (name === 'Toast') {
    return (
      <Toast style={{ inlineSize: 'min(280px, 100%)' }}>
        <ToastIcon><Check aria-hidden="true" size={10} strokeWidth={2.5} /></ToastIcon>
        <div className="uds-toast-body">
          <ToastTitle>{isArabic ? 'تم حفظ التغييرات' : 'Changes saved'}</ToastTitle>
          <ToastDescription>{isArabic ? 'المسودة محدثة.' : 'Your draft is up to date.'}</ToastDescription>
        </div>
      </Toast>
    )
  }

  if (name === 'Typography') {
    return (
      <VStack gap={1}>
        <Heading level={3}>{isArabic ? 'عنوان' : 'Heading'}</Heading>
        <Text>{isArabic ? 'نص أساسي بإيقاع مريح.' : 'Body copy sits at a comfortable rhythm.'}</Text>
        <Text size="sm" tone="muted">{isArabic ? 'تسمية توضيحية' : 'Caption, muted'}</Text>
      </VStack>
    )
  }

  return null
}

export const queuedComponentNames = new Set([
  ...chatComponentNames,
  'Accordion',
  'Alert',
  'Alert Dialog',
  'Aspect Ratio',
  'Attachment',
  'Breadcrumb',
  'Breadcrumb Item',
  'Breadcrumbs',
  'Bubble',
  'Calendar',
  'Carousel',
  'Chart',
  'Collapsible',
  'Combobox',
  'Command',
  'Context Menu',
  'Data Table',
  'Date Picker',
  'Dialog',
  'Direction',
  'Drawer',
  'Empty',
  'Input Group',
  'Input OTP',
  'Item',
  'Kbd',
  'Label',
  'Menubar',
  'Navigation Menu',
  'Pagination',
  'Progress',
  'Radio Group',
  'Resizable',
  'Scroll Area',
  'Sidebar',
  'Separator',
  'Sheet',
  'Skeleton',
  'Sonner',
  'Spinner',
  'Table',
  'Toast',
  'Typography',
])

function BreadcrumbGalleryPreview({ locale }: PreviewProps) {
  const isArabic = locale === 'ar'
  return (
    <Breadcrumb aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'}>
      <Breadcrumbs>
        <BreadcrumbItem><BreadcrumbLink href="#/docs">{isArabic ? 'المستندات' : 'Docs'}</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#/components">{isArabic ? 'المكوّنات' : 'Components'}</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>{isArabic ? 'المعاينة' : 'Preview'}</BreadcrumbPage></BreadcrumbItem>
      </Breadcrumbs>
    </Breadcrumb>
  )
}

function DataTableGalleryPreview({ locale }: PreviewProps) {
  const isArabic = locale === 'ar'
  return (
    <DataTableShell className="component-gallery-data-table">
      <DataTable>
        <DataTableHeader><DataTableRow><DataTableHead aria-label={isArabic ? 'تحديد' : 'Select'} /><DataTableHead>{isArabic ? 'الحالة' : 'Status'}</DataTableHead><DataTableHead>{isArabic ? 'المبلغ' : 'Amount'}</DataTableHead></DataTableRow></DataTableHeader>
        <DataTableBody>
          <DataTableRow><DataTableCell><Checkbox aria-label={isArabic ? 'تحديد الصف الأول' : 'Select first row'} defaultChecked /></DataTableCell><DataTableCell>{isArabic ? 'ناجح' : 'Success'}</DataTableCell><DataTableCell>$316</DataTableCell></DataTableRow>
          <DataTableRow><DataTableCell><Checkbox aria-label={isArabic ? 'تحديد الصف الثاني' : 'Select second row'} /></DataTableCell><DataTableCell>{isArabic ? 'قيد المعالجة' : 'Processing'}</DataTableCell><DataTableCell>$242</DataTableCell></DataTableRow>
        </DataTableBody>
      </DataTable>
    </DataTableShell>
  )
}

function ChatGalleryPreview({ locale, name }: PreviewProps & { name: string }) {
  const isArabic = locale === 'ar'
  const sendLabel = isArabic ? 'إرسال الرسالة' : 'Send message'
  const message = isArabic ? 'راجع التغييرات في هذا الملف.' : 'Review the changes in this file.'
  const metadata = isArabic ? 'تمت القراءة · 2:30 م' : 'Read · 2:30 PM'

  if (name === 'Chat Composer Token Element') return <ChatComposerTokenElement tokenType="command">/review</ChatComposerTokenElement>
  if (name === 'Chat Dictation Button') return <ChatDictationButton label={isArabic ? 'بدء الإملاء' : 'Start dictation'} />
  if (name === 'Chat Layout Scroll Button') return <ChatLayoutScrollButton accessibilityLabel={isArabic ? 'الانتقال إلى أحدث رسالة' : 'Jump to latest message'} label={isArabic ? 'رسائل جديدة' : 'New messages'} />
  if (name === 'Chat Send Button') return <ChatSendButton label={sendLabel} />
  if (name === 'Chat System Message') return <ChatSystemMessage label={isArabic ? 'اليوم' : 'Today'}>{isArabic ? 'تم حل المحادثة' : 'Conversation resolved'}</ChatSystemMessage>
  if (name === 'Chat Tokenized Text') return <ChatTokenizedText><ChatComposerTokenElement tokenType="mention">@Cindy</ChatComposerTokenElement> {isArabic ? 'أضافت' : 'filed'} <ChatComposerTokenElement>#feature</ChatComposerTokenElement></ChatTokenizedText>
  if (name === 'Chat Tool Calls') return <ChatToolCalls calls={[{ id: 'read', label: isArabic ? 'قراءة الملف' : 'read file', status: 'success', duration: '45ms' }]} label={isArabic ? 'استدعاء أداة واحد' : '1 tool call'} />

  const composer = (
    <ChatComposer
      actions={<><ChatDictationButton label={isArabic ? 'بدء الإملاء' : 'Start dictation'} /><ChatSendButton label={sendLabel} /></>}
      drawer={name === 'Chat Composer Drawer' ? <><ChatComposerTokenElement>design-spec.pdf</ChatComposerTokenElement><ChatComposerTokenElement tokenType="command">/review</ChatComposerTokenElement></> : undefined}
      input={<ChatComposerInput aria-label={isArabic ? 'نص الرسالة' : 'Message text'} placeholder={isArabic ? 'اكتب رسالة...' : 'Type a message...'} />}
      onSubmit={(event) => event.preventDefault()}
    />
  )
  if (['Chat Composer', 'Chat Composer Drawer', 'Chat Composer Input'].includes(name)) return composer

  if (name === 'Chat Message Metadata') return <ChatMessageMetadata>{metadata}</ChatMessageMetadata>

  const chatMessage = (
    <ChatMessage metadata={metadata} role="user">
      <ChatMessageBubble role="user">{message}</ChatMessageBubble>
    </ChatMessage>
  )
  if (['Chat Message', 'Chat Message Bubble'].includes(name)) return chatMessage
  if (name === 'Chat Message List') return <ChatMessageList>{chatMessage}<ChatMessage role="assistant"><ChatMessageBubble>{isArabic ? 'سأراجعها الآن.' : 'I will review it now.'}</ChatMessageBubble></ChatMessage></ChatMessageList>

  return <ChatLayout composer={composer} messages={<ChatMessageList>{chatMessage}</ChatMessageList>} />
}

function CarouselGalleryPreview({ locale }: PreviewProps) {
  const isArabic = locale === 'ar'
  const move = (trigger: HTMLElement, direction: number) => {
    const content = trigger.closest('.uds-carousel')?.querySelector<HTMLElement>('.uds-carousel-content')
    content?.scrollBy({ behavior: 'smooth', left: direction * content.clientWidth * 0.72 })
  }

  return (
    <Carousel className="component-gallery-carousel" dir={isArabic ? 'rtl' : 'ltr'}>
      <CarouselContent>
        {[1, 2, 3].map((item) => <CarouselItem key={item}><span>{isArabic ? `مشهد ${item}` : `Scene ${item}`}</span></CarouselItem>)}
      </CarouselContent>
      <CarouselControls>
        <CarouselButton aria-label={isArabic ? 'السابق' : 'Previous'} onClick={(event) => move(event.currentTarget, isArabic ? 1 : -1)}>←</CarouselButton>
        <CarouselButton aria-label={isArabic ? 'التالي' : 'Next'} onClick={(event) => move(event.currentTarget, isArabic ? -1 : 1)}>→</CarouselButton>
      </CarouselControls>
    </Carousel>
  )
}

function ComboboxGalleryPreview({ locale }: PreviewProps) {
  const isArabic = locale === 'ar'
  const options = ['React', 'Remix', 'Next.js']
  const [open, setOpen] = useState(true)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('React')
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))

  return (
    <Combobox className="component-gallery-combobox">
      <ComboboxTrigger aria-expanded={open} onClick={() => setOpen((value) => !value)}>{selected} <ChevronDown aria-hidden="true" /></ComboboxTrigger>
      {open ? (
        <ComboboxContent>
          <ComboboxInput aria-label={isArabic ? 'بحث الأطر' : 'Search frameworks'} onChange={(event) => setQuery(event.target.value)} placeholder={isArabic ? 'ابحث' : 'Search'} value={query} />
          {filteredOptions.map((option) => (
            <ComboboxOption
              aria-selected={selected === option}
              key={option}
              onClick={() => { setSelected(option); setOpen(false) }}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return
                event.preventDefault()
                setSelected(option)
                setOpen(false)
              }}
              tabIndex={0}
            >
              {option}
            </ComboboxOption>
          ))}
        </ComboboxContent>
      ) : null}
    </Combobox>
  )
}
