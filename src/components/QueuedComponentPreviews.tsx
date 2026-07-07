import { Check } from 'lucide-react'
import { ProgressBar, Skeleton, Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Toast, ToastDescription, ToastIcon, ToastTitle } from '../../packages/design-system/src/DataDisplay'
import { Field, FieldLabel, RadioGroup, RadioGroupItem, TextInput } from '../../packages/design-system/src/Forms'
import { HStack, VStack } from '../../packages/design-system/src/Layout'
import {
  Kbd,
  Label,
  Marker,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  Message,
  MessageScroller,
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

export function QueuedComponentPreview({ locale, name }: PreviewProps & { name: string }) {
  const isArabic = locale === 'ar'

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

  if (name === 'Marker' || name === 'MarkerNew') {
    return (
      <VStack gap={2}>
        <Marker data-checked="true" variant="check">{isArabic ? 'تمت المراجعة' : 'Reviewed by editor'}</Marker>
        <Marker variant="check">{isArabic ? 'بانتظار الموافقة' : 'Approved by legal'}</Marker>
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

  if (name === 'Message' || name === 'MessageNew') {
    return (
      <Message author={isArabic ? 'أميليا' : 'Amelia'} meta="10:24" variant="bubble">
        {isArabic ? 'أرسلت النماذج الجديدة.' : 'Sent the new mockups your way.'}
      </Message>
    )
  }

  if (name === 'Message Scroller' || name === 'Message ScrollerNew') {
    return (
      <MessageScroller>
        <span className="uds-message-scroller-day">{isArabic ? 'اليوم' : 'Today'}</span>
        <span className="uds-message-scroller-bubble">{isArabic ? 'هل أنت جاهز؟' : 'Ping when ready.'}</span>
        <span className="uds-message-scroller-bubble uds-message-scroller-bubble--outgoing">{isArabic ? 'حاضر.' : 'On it.'}</span>
      </MessageScroller>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#" isCurrent>1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
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
  'Kbd',
  'Label',
  'Marker',
  'MarkerNew',
  'Menubar',
  'Message',
  'MessageNew',
  'Message Scroller',
  'Message ScrollerNew',
  'Navigation Menu',
  'Pagination',
  'Progress',
  'Radio Group',
  'Resizable',
  'Scroll Area',
  'Separator',
  'Sheet',
  'Skeleton',
  'Sonner',
  'Spinner',
  'Table',
  'Toast',
  'Typography',
])
