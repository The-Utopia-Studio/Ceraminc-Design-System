import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { AlertTriangle, CheckCircle2, ChevronDown, Info, XCircle } from 'lucide-react'
import { Group as ResizableGroupPrimitive, Panel as ResizablePanelPrimitive, Separator as ResizableHandlePrimitive } from 'react-resizable-panels'
import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './Button'

type DivProps = React.HTMLAttributes<HTMLDivElement>
type SpanProps = React.HTMLAttributes<HTMLSpanElement>

function Primitive({ className, ...props }: DivProps) {
  return <div className={cn('uds-primitive', className)} {...props} />
}

function PrimitiveHeader({ className, ...props }: DivProps) {
  return <div className={cn('uds-primitive-header', className)} {...props} />
}

function PrimitiveItem({ className, ...props }: DivProps) {
  return <div className={cn('uds-primitive-item', className)} {...props} />
}

export const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => <hr className={cn('uds-separator', className)} {...props} />

export function SeparatorLabel({ className, ...props }: DivProps) {
  return <div className={cn('uds-separator-label', className)} role="separator" {...props} />
}

export function Sheet(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export function SheetTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

export function SheetContent({ className, side = 'end', ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { side?: 'start' | 'end' | 'top' | 'bottom' }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="uds-dialog-overlay" />
      <DialogPrimitive.Content className={cn('uds-sheet-content', `uds-sheet-content--${side}`, className)} {...props} />
    </DialogPrimitive.Portal>
  )
}

export function SheetHeader({ className, ...props }: DivProps) {
  return <div className={cn('uds-dialog-header', className)} {...props} />
}

export function SheetFooter({ className, ...props }: DivProps) {
  return <div className={cn('uds-dialog-footer', className)} {...props} />
}

export function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn('uds-dialog-title', className)} {...props} />
}

export function SheetDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn('uds-dialog-description', className)} {...props} />
}

export function SheetClose({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close className={cn('uds-dialog-close', className)} {...props} />
}

export function Sonner({ className, ...props }: DivProps) {
  return <div aria-live="polite" className={cn('uds-sonner', className)} role="status" {...props} />
}

export function SonnerToast({
  className,
  tone = 'default',
  ...props
}: DivProps & {
  tone?: 'default' | 'inverse'
}) {
  return <div className={cn('uds-sonner-toast', tone === 'inverse' && 'uds-sonner-toast--inverse', className)} {...props} />
}

export function SonnerTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('uds-sonner-title', className)} {...props} />
}

export function SonnerDescription({ className, ...props }: DivProps) {
  return <div className={cn('uds-sonner-description', className)} {...props} />
}

export function InputGroup({ className, ...props }: DivProps) {
  return <div className={cn('uds-input-group', className)} {...props} />
}

export function InputGroupInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-input-group-input', className)} type="text" {...props} />
}

export function InputGroupText({ className, ...props }: SpanProps) {
  return <span className={cn('uds-input-group-text', className)} {...props} />
}

export function Item({ className, ...props }: DivProps) {
  return <div className={cn('uds-item', className)} {...props} />
}

export function ItemContent({ className, ...props }: DivProps) {
  return <div className={cn('uds-item-content', className)} {...props} />
}

export function ItemTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('uds-item-title', className)} {...props} />
}

export function ItemDescription({ className, ...props }: DivProps) {
  return <div className={cn('uds-item-description', className)} {...props} />
}

export function ItemActions({ className, ...props }: DivProps) {
  return <div className={cn('uds-item-actions', className)} {...props} />
}

export function Menubar({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return <MenubarPrimitive.Root className={cn('uds-menubar', className)} {...props} />
}

export function MenubarMenu(props: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

export function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return <MenubarPrimitive.Trigger className={cn('uds-menubar-trigger', className)} {...props} />
}

export function MenubarContent({ align = 'start', className, sideOffset = 8, ...props }: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content align={align} className={cn('uds-menubar-content', className)} sideOffset={sideOffset} {...props} />
    </MenubarPrimitive.Portal>
  )
}

export function MenubarItem({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Item>) {
  return <MenubarPrimitive.Item className={cn('uds-menubar-item', className)} {...props} />
}

export function NavigationMenu({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return <NavigationMenuPrimitive.Root className={cn('uds-navigation-menu', className)} {...props} />
}

export function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List className={cn('uds-navigation-menu-list', className)} {...props} />
}

export function NavigationMenuItem(props: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item {...props} />
}

export function NavigationMenuTrigger({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return <NavigationMenuPrimitive.Trigger className={cn('uds-navigation-menu-trigger', className)} {...props} />
}

export function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return <NavigationMenuPrimitive.Content className={cn('uds-navigation-menu-content', className)} {...props} />
}

export function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return <NavigationMenuPrimitive.Link className={cn('uds-navigation-menu-link', className)} {...props} />
}

export function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return <NavigationMenuPrimitive.Viewport className={cn('uds-navigation-menu-viewport', className)} {...props} />
}

export function Pagination({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Pagination" className={cn('uds-pagination', className)} {...props} />
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('uds-pagination-content', className)} {...props} />
}

export function PaginationItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('uds-pagination-item', className)} {...props} />
}

export function PaginationLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isCurrent?: boolean }) {
  const { isCurrent, ...linkProps } = props
  return <a aria-current={isCurrent ? 'page' : undefined} className={cn('uds-pagination-link', className)} {...linkProps} />
}

export function PaginationPrevious({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <PaginationLink className={className} rel="prev" {...props} />
}

export function PaginationNext({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <PaginationLink className={className} rel="next" {...props} />
}

export function Resizable({
  className,
  direction,
  orientation,
  ...props
}: React.ComponentProps<typeof ResizableGroupPrimitive> & {
  direction?: 'horizontal' | 'vertical'
}) {
  return <ResizableGroupPrimitive className={cn('uds-resizable', className)} orientation={orientation ?? direction ?? 'horizontal'} {...props} />
}

export function ResizablePanel({ className, ...props }: React.ComponentProps<typeof ResizablePanelPrimitive>) {
  return <ResizablePanelPrimitive className={cn('uds-resizable-panel', className)} {...props} />
}

export function ResizableHandle({ className, ...props }: React.ComponentProps<typeof ResizableHandlePrimitive>) {
  return <ResizableHandlePrimitive className={cn('uds-resizable-handle', className)} {...props} />
}

export function ScrollArea({ className, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return <ScrollAreaPrimitive.Root className={cn('uds-scroll-area', className)} {...props} />
}

export function ScrollAreaViewport({ className, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  return <ScrollAreaPrimitive.Viewport className={cn('uds-scroll-area-viewport', className)} {...props} />
}

export function ScrollBar({ className, orientation = 'vertical', ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar className={cn('uds-scroll-bar', className)} orientation={orientation} {...props}>
      <ScrollAreaPrimitive.Thumb className="uds-scroll-thumb" />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export function Direction({ className, dir = 'rtl', ...props }: DivProps & { dir?: 'ltr' | 'rtl' | 'auto' }) {
  return <div className={cn('uds-direction', className)} dir={dir} {...props} />
}

export function DatePicker({
  className,
  label = 'Select date',
  value = 'July 6, 2026',
  ...props
}: DivProps & {
  label?: React.ReactNode
  value?: React.ReactNode
}) {
  return (
    <div className={cn('uds-date-picker', className)} {...props}>
      <button className="uds-date-picker-trigger" type="button">
        <span>{label}</span>
        <strong>{value}</strong>
      </button>
      <div className="uds-date-picker-panel">
        <PrimitiveHeader>July 2026</PrimitiveHeader>
        <div className="uds-date-picker-grid" role="grid" aria-label="July 2026">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <span key={day} className="uds-date-picker-weekday">{day}</span>
          ))}
          {Array.from({ length: 35 }, (_, index) => {
            const day = index - 2
            const isCurrentMonth = day >= 1 && day <= 31
            const isSelected = day === 6
            return (
              <button
                key={index}
                aria-selected={isSelected}
                className="uds-date-picker-day"
                data-outside={!isCurrentMonth || undefined}
                role="gridcell"
                type="button"
              >
                {isCurrentMonth ? day : ''}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

export function DialogContent({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="uds-dialog-overlay" />
      <DialogPrimitive.Content className={cn('uds-dialog-content', className)} {...props} />
    </DialogPrimitive.Portal>
  )
}

export function DialogHeader({ className, ...props }: DivProps) {
  return <div className={cn('uds-dialog-header', className)} {...props} />
}

export function DialogFooter({ className, ...props }: DivProps) {
  return <div className={cn('uds-dialog-footer', className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn('uds-dialog-title', className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn('uds-dialog-description', className)} {...props} />
}

export function DialogClose({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close className={cn('uds-dialog-close', className)} {...props} />
}

export function Drawer(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export function DrawerTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

export function DrawerContent({ className, side = 'end', ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { side?: 'start' | 'end' | 'bottom' }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="uds-dialog-overlay" />
      <DialogPrimitive.Content className={cn('uds-drawer-content', `uds-drawer-content--${side}`, className)} {...props} />
    </DialogPrimitive.Portal>
  )
}

export const DrawerHeader = DialogHeader
export const DrawerFooter = DialogFooter
export const DrawerTitle = DialogTitle
export const DrawerDescription = DialogDescription
export const DrawerClose = DialogClose

export function Carousel({ className, ...props }: DivProps) {
  return <div className={cn('uds-carousel', className)} aria-roledescription="carousel" {...props} />
}

export function CarouselContent({ className, ...props }: DivProps) {
  return <div className={cn('uds-carousel-content', className)} {...props} />
}

export function CarouselItem({ className, ...props }: DivProps) {
  return <div className={cn('uds-carousel-item', className)} role="group" {...props} />
}

export function CarouselControls({ className, ...props }: DivProps) {
  return <div className={cn('uds-carousel-controls', className)} {...props} />
}

export function CarouselButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('uds-carousel-button', className)} type="button" {...props} />
}

export function Chart({
  className,
  title,
  ...props
}: DivProps & {
  title?: React.ReactNode
}) {
  return (
    <figure className={cn('uds-chart', className)} {...props}>
      {title ? <figcaption className="uds-chart-title">{title}</figcaption> : null}
      {props.children}
    </figure>
  )
}

export function ChartBars({ className, values = [42, 68, 54], ...props }: DivProps & { values?: number[] }) {
  return (
    <div className={cn('uds-chart-bars', className)} {...props}>
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          aria-label={`${value}%`}
          className="uds-chart-bar"
          style={{ blockSize: `${Math.max(4, Math.min(100, value))}%` }}
        />
      ))}
    </div>
  )
}

export function Combobox({ className, ...props }: DivProps) {
  return <div className={cn('uds-combobox', className)} {...props} />
}

export function ComboboxTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('uds-combobox-trigger', className)} type="button" {...props} />
}

export function ComboboxContent({ className, ...props }: DivProps) {
  return <div className={cn('uds-combobox-content', className)} role="listbox" {...props} />
}

export function ComboboxInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-combobox-input', className)} type="text" {...props} />
}

export function ComboboxOption({ className, ...props }: DivProps) {
  return <div className={cn('uds-combobox-option', className)} role="option" {...props} />
}

export function DataTable({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn('uds-data-table', className)} {...props} />
}

export function DataTableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('uds-data-table-header', className)} {...props} />
}

export function DataTableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('uds-data-table-body', className)} {...props} />
}

export function DataTableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('uds-data-table-row', className)} {...props} />
}

export function DataTableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn('uds-data-table-head', className)} scope="col" {...props} />
}

export function DataTableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('uds-data-table-cell', className)} {...props} />
}

export function Collapsible(props: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root {...props} />
}

export function CollapsibleTrigger({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.Trigger className={cn('uds-collapsible-trigger', className)} {...props} />
}

export function CollapsibleContent({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return <CollapsiblePrimitive.Content className={cn('uds-collapsible-content', className)} {...props} />
}

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'destructive'

const alertIconByVariant: Record<AlertVariant, React.ElementType> = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: XCircle,
}

export function Alert({
  className,
  children,
  icon,
  showIcon = true,
  tone,
  variant = tone ?? 'default',
  ...props
}: DivProps & {
  icon?: React.ReactNode
  showIcon?: boolean
  tone?: AlertVariant
  variant?: AlertVariant
}) {
  const Icon = alertIconByVariant[variant]

  return (
    <div className={cn('uds-alert', `uds-alert--${variant}`, className)} data-icon={showIcon ? 'true' : 'false'} data-variant={variant} role="alert" {...props}>
      {showIcon ? (
        <span className="uds-alert-icon" aria-hidden="true">
          {icon ?? <Icon />}
        </span>
      ) : null}
      <div className="uds-alert-content">{children}</div>
    </div>
  )
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('uds-alert-title', className)} {...props} />
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-alert-description', className)} {...props} />
}

export function AlertDialog(props: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root {...props} />
}

export function AlertDialogTrigger(props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger {...props} />
}

export function AlertDialogPortal(props: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal {...props} />
}

export function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return <AlertDialogPrimitive.Overlay className={cn('uds-alert-dialog-overlay', className)} {...props} />
}

export function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="uds-alert-dialog-overlay" />
      <AlertDialogPrimitive.Content className={cn('uds-alert-dialog-content', className)} {...props} />
    </AlertDialogPrimitive.Portal>
  )
}

export function AlertDialogHeader({ className, ...props }: DivProps) {
  return <div className={cn('uds-alert-dialog-header', className)} {...props} />
}

export function AlertDialogFooter({ className, ...props }: DivProps) {
  return <div className={cn('uds-alert-dialog-footer', className)} {...props} />
}

export function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return <AlertDialogPrimitive.Title className={cn('uds-alert-dialog-title', className)} {...props} />
}

export function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return <AlertDialogPrimitive.Description className={cn('uds-alert-dialog-description', className)} {...props} />
}

export function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return <AlertDialogPrimitive.Action className={cn('uds-alert-dialog-action', className)} {...props} />
}

export function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return <AlertDialogPrimitive.Cancel className={cn('uds-alert-dialog-cancel', className)} {...props} />
}

export function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root className={cn('uds-accordion', className)} {...props} />
}

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn('uds-accordion-item', className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="uds-accordion-header">
      <AccordionPrimitive.Trigger className={cn('uds-accordion-trigger', className)} {...props}>
        <span>{children}</span>
        <ChevronDown className="uds-accordion-indicator" aria-hidden="true" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ children, className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className={cn('uds-accordion-content', className)} {...props}>
      <div className="uds-accordion-content-inner">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export interface AttachmentProps extends DivProps {
  orientation?: 'horizontal' | 'vertical'
  progress?: number
  size?: 'default' | 'sm' | 'xs'
  state?: 'idle' | 'uploading' | 'processing' | 'error' | 'done'
}

export function Attachment({
  children,
  className,
  meta,
  name,
  orientation = 'horizontal',
  progress,
  size = 'default',
  state = 'done',
  style,
  ...props
}: AttachmentProps & {
  meta?: React.ReactNode
  name?: React.ReactNode
}) {
  const progressValue = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined
  const attachmentStyle = progressValue === undefined
    ? style
    : ({ ...style, '--attachment-progress': `${progressValue}%` } as React.CSSProperties)

  return (
    <div
      className={cn('uds-attachment', className)}
      data-orientation={orientation}
      data-progress={progressValue === undefined ? undefined : progressValue}
      data-size={size}
      data-state={state}
      style={attachmentStyle}
      {...props}
    >
      {children ?? (
        <>
          <AttachmentMedia />
          <AttachmentContent>
            <AttachmentTitle>{name ?? 'Attachment'}</AttachmentTitle>
            {meta ? <AttachmentDescription>{meta}</AttachmentDescription> : null}
          </AttachmentContent>
        </>
      )}
    </div>
  )
}

export interface AttachmentMediaProps extends DivProps {
  variant?: 'icon' | 'image'
}

export function AttachmentMedia({ className, variant = 'icon', ...props }: AttachmentMediaProps) {
  return <div className={cn('uds-attachment-media', className)} data-variant={variant} {...props} />
}

export function AttachmentContent({ className, ...props }: DivProps) {
  return <div className={cn('uds-attachment-content', className)} {...props} />
}

export function AttachmentTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-attachment-title', className)} {...props} />
}

export function AttachmentDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-attachment-description', className)} {...props} />
}

export function AttachmentActions({ className, ...props }: DivProps) {
  return <div className={cn('uds-attachment-actions', className)} {...props} />
}

export type AttachmentActionProps = ButtonProps

export function AttachmentAction({ className, size = 'icon', variant = 'ghost', ...props }: AttachmentActionProps) {
  return <Button className={cn('uds-attachment-action', className)} isIconOnly size={size} variant={variant} {...props} />
}

export type AttachmentTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function AttachmentTrigger({ className, type = 'button', ...props }: AttachmentTriggerProps) {
  return <button className={cn('uds-attachment-trigger', className)} type={type} {...props} />
}

export function AttachmentGroup({ className, ...props }: DivProps) {
  return <div className={cn('uds-attachment-group', className)} {...props} />
}

export function Bubble({
  className,
  tone = 'default',
  ...props
}: DivProps & {
  tone?: 'default' | 'muted' | 'accent'
}) {
  return <div className={cn('uds-bubble', `uds-bubble--${tone}`, className)} {...props} />
}

export function Marker({
  children,
  className,
  tone = 'default',
  variant = 'pill',
  ...props
}: SpanProps & {
  tone?: 'default' | 'accent' | 'muted'
  variant?: 'pill' | 'check'
}) {
  if (variant === 'check') {
    return (
      <span className={cn('uds-marker-check', className)} {...props}>
        <span aria-hidden="true" className="uds-marker-check-box" />
        {children ? <span className="uds-marker-check-label">{children}</span> : null}
      </span>
    )
  }

  return <span className={cn('uds-marker', `uds-marker--${tone}`, className)} {...props}>{children}</span>
}

export function Message({
  author,
  children,
  className,
  meta,
  variant = 'thread',
  ...props
}: DivProps & {
  author?: React.ReactNode
  meta?: React.ReactNode
  variant?: 'thread' | 'bubble'
}) {
  return (
    <article className={cn('uds-message', variant === 'bubble' && 'uds-message--bubble', className)} {...props}>
      {author || meta ? (
        <header className="uds-message-header">
          {author ? <strong>{author}</strong> : null}
          {meta ? <span>{meta}</span> : null}
        </header>
      ) : null}
      <div className={cn('uds-message-content', variant === 'bubble' && 'uds-message-bubble')}>{children}</div>
    </article>
  )
}

export function MessageScroller({ className, ...props }: DivProps) {
  return <div className={cn('uds-message-scroller', className)} role="log" {...props} />
}

export const MarkerNew = Marker
export const MessageNew = Message
export const MessageScrollerNew = MessageScroller

export function InputOTP({
  className,
  length = 4,
  value = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  length?: number
  value?: string
}) {
  const characters = Array.from({ length }, (_, index) => value[index] ?? '')

  return (
    <div className={cn('uds-input-otp', className)} role="group" {...props}>
      {characters.map((character, index) => (
        <span key={index} aria-label={`Digit ${index + 1}`}>
          {character || ' '}
        </span>
      ))}
    </div>
  )
}

export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <kbd className={cn('uds-kbd', className)} {...props} />
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('uds-field-label', className)} {...props} />
}

export function NativeSelect({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('uds-input uds-selector', className)} {...props} />
}

export { PrimitiveHeader, PrimitiveItem }
