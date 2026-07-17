import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { AlertTriangle, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Circle, GripVertical, Info, MoreHorizontal, X, XCircle } from 'lucide-react'
import { Toaster as SonnerPrimitive, toast } from 'sonner'
import { Legend as RechartsLegend, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { Group as ResizableGroupPrimitive, Panel as ResizablePanelPrimitive, Separator as ResizableHandlePrimitive } from 'react-resizable-panels'
import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './Button'
import { DatePicker as DataDisplayDatePicker, type DatePickerProps } from './DataDisplay'
import { useMotionPattern } from './Motion'

export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  type NativeSelectProps,
} from './Forms'

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

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  decorative?: boolean
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ className, decorative = true, orientation = 'horizontal', ...props }: SeparatorProps) {
  return <div aria-orientation={orientation} className={cn('uds-separator', className)} data-orientation={orientation} role={decorative ? 'none' : 'separator'} {...props} />
}

export function SeparatorLabel({ className, ...props }: DivProps) {
  return <div className={cn('uds-separator-label', className)} role="separator" {...props} />
}

export function Sheet(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export function SheetTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

export function SheetContent({ children, className, closeLabel, motion = true, showCloseButton = true, side = 'end', ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string; motion?: boolean; showCloseButton?: boolean; side?: 'start' | 'end' | 'top' | 'bottom' }) {
  const resolvedMotion = useMotionPattern('reveal', motion)
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="uds-dialog-overlay" />
      <DialogPrimitive.Content className={cn('uds-sheet-content', `uds-sheet-content--${side}`, className)} data-motion={resolvedMotion.enabled ? 'on' : 'off'} {...props}>
        {children}
        {showCloseButton && closeLabel ? <DialogPrimitive.Close aria-label={closeLabel} className="uds-sheet-close"><X aria-hidden="true" /></DialogPrimitive.Close> : null}
      </DialogPrimitive.Content>
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

export function Toaster(props: React.ComponentProps<typeof SonnerPrimitive>) {
  return <SonnerPrimitive className="uds-toaster" richColors={false} theme="system" {...props} />
}

export { toast }

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

export function MenubarGroup(props: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

export function MenubarLabel({ className, inset, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }) {
  return <MenubarPrimitive.Label className={cn('uds-menubar-label', inset && 'uds-menubar-inset', className)} {...props} />
}

export function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return <MenubarPrimitive.Separator className={cn('uds-menubar-separator', className)} {...props} />
}

export function MenubarShortcut({ className, ...props }: SpanProps) {
  return <span className={cn('uds-menubar-shortcut', className)} {...props} />
}

export function MenubarCheckboxItem({ children, className, checked, ...props }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem checked={checked} className={cn('uds-menubar-item uds-menubar-choice-item', className)} {...props}>
      <span className="uds-menubar-item-indicator">
        <MenubarPrimitive.ItemIndicator><Check aria-hidden="true" /></MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

export function MenubarRadioGroup(props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

export function MenubarRadioItem({ children, className, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem className={cn('uds-menubar-item uds-menubar-choice-item', className)} {...props}>
      <span className="uds-menubar-item-indicator">
        <MenubarPrimitive.ItemIndicator><Circle aria-hidden="true" /></MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

export function MenubarSub(props: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub {...props} />
}

export function MenubarSubTrigger({ children, className, inset, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.SubTrigger className={cn('uds-menubar-item uds-menubar-sub-trigger', inset && 'uds-menubar-inset', className)} {...props}>
      {children}
      <ChevronRight aria-hidden="true" className="uds-menubar-sub-indicator" />
    </MenubarPrimitive.SubTrigger>
  )
}

export function MenubarSubContent({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return <MenubarPrimitive.SubContent className={cn('uds-menubar-content', className)} {...props} />
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

export function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger className={cn('uds-navigation-menu-trigger', className)} {...props}>
      {children}
      <ChevronDown aria-hidden="true" className="uds-navigation-menu-trigger-indicator" />
    </NavigationMenuPrimitive.Trigger>
  )
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

export function NavigationMenuIndicator({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator className={cn('uds-navigation-menu-indicator', className)} {...props}>
      <span aria-hidden="true" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export function Pagination({ className, ...props }: React.HTMLAttributes<HTMLElement> & { 'aria-label': string }) {
  return <nav className={cn('uds-pagination', className)} {...props} />
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('uds-pagination-content', className)} {...props} />
}

export function PaginationItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('uds-pagination-item', className)} {...props} />
}

export function PaginationLink({ className, isActive, isCurrent, size = 'icon', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean; isCurrent?: boolean; size?: 'icon' | 'default' }) {
  const current = isActive ?? isCurrent
  return <a aria-current={current ? 'page' : undefined} className={cn('uds-pagination-link', size === 'default' && 'uds-pagination-link--default', className)} {...props} />
}

export function PaginationPrevious({ className, children, text, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { text: string }) {
  return (
    <PaginationLink aria-label={props['aria-label'] ?? text} className={cn('uds-pagination-previous', className)} rel="prev" size="default" {...props}>
      <ChevronLeft aria-hidden="true" className="uds-pagination-direction-icon" />
      <span>{children ?? text}</span>
    </PaginationLink>
  )
}

export function PaginationNext({ className, children, text, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { text: string }) {
  return (
    <PaginationLink aria-label={props['aria-label'] ?? text} className={cn('uds-pagination-next', className)} rel="next" size="default" {...props}>
      <span>{children ?? text}</span>
      <ChevronRight aria-hidden="true" className="uds-pagination-direction-icon" />
    </PaginationLink>
  )
}

export function PaginationEllipsis({ className, label, ...props }: React.HTMLAttributes<HTMLSpanElement> & { label: string }) {
  return (
    <span aria-hidden="true" className={cn('uds-pagination-ellipsis', className)} {...props}>
      <MoreHorizontal />
      <span className="uds-visually-hidden">{label}</span>
    </span>
  )
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

export function ResizableHandle({
  className,
  withHandle = false,
  ...props
}: React.ComponentProps<typeof ResizableHandlePrimitive> & { withHandle?: boolean }) {
  return (
    <ResizableHandlePrimitive className={cn('uds-resizable-handle', className)} {...props}>
      {withHandle ? <span className="uds-resizable-handle-grip"><GripVertical aria-hidden="true" /></span> : null}
    </ResizableHandlePrimitive>
  )
}

export function ScrollArea({ className, type = 'hover', ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return <ScrollAreaPrimitive.Root className={cn('uds-scroll-area', className)} type={type} {...props} />
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

export function ScrollAreaCorner({ className, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Corner>) {
  return <ScrollAreaPrimitive.Corner className={cn('uds-scroll-area-corner', className)} {...props} />
}

export function Direction({ className, dir = 'rtl', ...props }: DivProps & { dir?: 'ltr' | 'rtl' | 'auto' }) {
  return <div className={cn('uds-direction', className)} dir={dir} {...props} />
}

export function ShadcnDatePicker(props: DatePickerProps) {
  return <DataDisplayDatePicker {...props} />
}

export function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

export function DialogContent({ className, motion = true, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { motion?: boolean }) {
  const resolvedMotion = useMotionPattern('reveal', motion)
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="uds-dialog-overlay" />
      <DialogPrimitive.Content className={cn('uds-dialog-content', className)} data-motion={resolvedMotion.enabled ? 'on' : 'off'} {...props} />
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

export function DrawerContent({ className, motion = true, side = 'end', ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { motion?: boolean; side?: 'start' | 'end' | 'bottom' }) {
  const resolvedMotion = useMotionPattern('reveal', motion)
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="uds-dialog-overlay" />
      <DialogPrimitive.Content className={cn('uds-drawer-content', `uds-drawer-content--${side}`, className)} data-motion={resolvedMotion.enabled ? 'on' : 'off'} data-side={side} {...props} />
    </DialogPrimitive.Portal>
  )
}

export function DrawerHeader({ className, ...props }: DivProps) {
  return <div className={cn('uds-drawer-header', className)} {...props} />
}

export function DrawerFooter({ className, ...props }: DivProps) {
  return <div className={cn('uds-drawer-footer', className)} {...props} />
}

export function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn('uds-drawer-title', className)} {...props} />
}

export function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn('uds-drawer-description', className)} {...props} />
}

export function DrawerClose({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close className={cn('uds-drawer-close', className)} {...props} />
}

export function Carousel({ className, ...props }: DivProps) {
  return <div className={cn('uds-carousel', className)} aria-roledescription="carousel" {...props} />
}

export function CarouselContent({ className, onWheel, ...props }: DivProps) {
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const target = contentRef.current
    if (!target) return
    const scrollElement = target

    function handleWheel(event: WheelEvent) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      const direction = scrollElement.closest('[dir="rtl"]') ? -1 : 1
      scrollElement.scrollLeft += event.deltaY * direction
      event.preventDefault()
    }

    scrollElement.addEventListener('wheel', handleWheel, { passive: false })
    return () => scrollElement.removeEventListener('wheel', handleWheel)
  }, [])

  return <div ref={contentRef} className={cn('uds-carousel-content', className)} onWheel={onWheel} {...props} />
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

export type ChartConfig = Record<string, {
  color?: string
  label?: React.ReactNode
}>

export function ChartContainer({
  children,
  className,
  config = {},
  ...props
}: DivProps & {
  config?: ChartConfig
  children: React.ReactNode
}) {
  const chartStyle = Object.fromEntries(
    Object.entries(config)
      .filter(([, value]) => value.color)
      .map(([key, value]) => [`--color-${key}`, value.color])
  ) as React.CSSProperties

  return (
    <div className={cn('uds-chart-container', className)} data-chart="" style={chartStyle} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
}

export const ChartTooltip = RechartsTooltip
export const ChartLegend = RechartsLegend

type ChartPayloadItem = {
  color?: string
  dataKey?: string | number
  name?: string | number
  value?: string | number
}

export function ChartTooltipContent({
  active,
  className,
  hideLabel = false,
  label,
  payload,
}: {
  active?: boolean
  label?: React.ReactNode
  payload?: ChartPayloadItem[]
  hideLabel?: boolean
  className?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className={cn('uds-chart-tooltip', className)}>
      {!hideLabel && label ? <div className="uds-chart-tooltip-label">{label}</div> : null}
      <div className="uds-chart-tooltip-list">
        {payload.map((item) => (
          <div className="uds-chart-tooltip-item" key={`${item.dataKey}-${item.name}`}>
            <span className="uds-chart-tooltip-indicator" style={{ background: item.color }} />
            <span>{item.name}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartLegendContent({
  className,
  payload,
}: {
  payload?: ChartPayloadItem[]
  className?: string
}) {
  if (!payload?.length) return null

  return (
    <div className={cn('uds-chart-legend', className)}>
      {payload.map((item) => (
        <div className="uds-chart-legend-item" key={`${item.dataKey}-${item.value}`}>
          <span className="uds-chart-legend-indicator" style={{ background: item.color }} />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export type ChartBarValue = number | {
  label?: React.ReactNode
  value: number
}

export function ChartBars({
  className,
  getValueLabel,
  values = [42, 68, 54],
  ...props
}: DivProps & {
  getValueLabel?: (value: number, label: React.ReactNode, index: number) => string
  values?: ChartBarValue[]
}) {
  return (
    <div className={cn('uds-chart-bars', className)} {...props}>
      {values.map((entry, index) => {
        const value = typeof entry === 'number' ? entry : entry.value
        const label = typeof entry === 'number' ? undefined : entry.label
        const clampedValue = Math.max(4, Math.min(100, value))

        return (
          <span
            key={`${value}-${index}`}
            aria-hidden={getValueLabel ? undefined : true}
            aria-label={getValueLabel?.(value, label, index)}
            className="uds-chart-bar"
            style={{ '--chart-bar-value': `${clampedValue}%` } as React.CSSProperties}
          >
            {label ? <span className="uds-chart-bar-label">{label}</span> : null}
          </span>
        )
      })}
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

export function DataTableToolbar({ className, ...props }: DivProps) {
  return <div className={cn('uds-data-table-toolbar', className)} {...props} />
}

export function DataTableShell({ className, ...props }: DivProps) {
  return <div className={cn('uds-data-table-shell', className)} {...props} />
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

export function DataTableFooter({ className, ...props }: DivProps) {
  return <div className={cn('uds-data-table-footer', className)} {...props} />
}

const CollapsibleMotionContext = React.createContext({
  open: false,
})

export function Collapsible({
  defaultOpen = false,
  motion = true,
  onOpenChange,
  open,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root> & { motion?: boolean }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : uncontrolledOpen
  const resolvedMotion = useMotionPattern('expand', motion)

  function handleOpenChange(nextOpen: boolean) {
    if (!isControlled) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  return (
    <CollapsibleMotionContext.Provider value={{ open: currentOpen }}>
      <CollapsiblePrimitive.Root data-motion={resolvedMotion.enabled ? 'on' : 'off'} open={currentOpen} onOpenChange={handleOpenChange} {...props} />
    </CollapsibleMotionContext.Provider>
  )
}

export function CollapsibleTrigger({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.Trigger className={cn('uds-collapsible-trigger', className)} {...props} />
}

export function CollapsibleContent({ children, className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  const { open } = React.useContext(CollapsibleMotionContext)

  return (
    <CollapsiblePrimitive.Content className={cn('uds-collapsible-content', className)} forceMount {...props}>
      <div
        className="uds-collapsible-motion"
        data-state={open ? 'open' : 'closed'}
      >
        <div className="uds-collapsible-content-inner">{children}</div>
      </div>
    </CollapsiblePrimitive.Content>
  )
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

export function AlertDialogContent({ className, motion = true, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content> & { motion?: boolean }) {
  const resolvedMotion = useMotionPattern('reveal', motion)
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="uds-alert-dialog-overlay" />
      <AlertDialogPrimitive.Content className={cn('uds-alert-dialog-content', className)} data-motion={resolvedMotion.enabled ? 'on' : 'off'} {...props} />
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

export function Accordion({ className, motion = true, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root> & { motion?: boolean }) {
  const resolvedMotion = useMotionPattern('expand', motion)
  return <AccordionPrimitive.Root className={cn('uds-accordion', className)} data-motion={resolvedMotion.enabled ? 'on' : 'off'} {...props} />
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
            {name ? <AttachmentTitle>{name}</AttachmentTitle> : null}
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

export type AttachmentActionProps = ButtonProps & { 'aria-label': string }

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

export function InputOTP({
  className,
  getSlotLabel,
  length = 4,
  value = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  getSlotLabel: (index: number) => string
  length?: number
  value?: string
}) {
  const characters = Array.from({ length }, (_, index) => value[index] ?? '')

  return (
    <div className={cn('uds-input-otp', className)} role="group" {...props}>
      {characters.map((character, index) => (
        <span key={index} aria-label={getSlotLabel(index)}>
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
  return <label className={cn('uds-label', className)} {...props} />
}

export { PrimitiveHeader, PrimitiveItem }
