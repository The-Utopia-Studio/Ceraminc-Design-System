import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '../lib/utils'

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

export const Carousel = Primitive
export const Chart = Primitive
export const Collapsible = Primitive
export const Combobox = Primitive
export const DataTable = Primitive
export const DatePicker = Primitive
export const Dialog = Primitive
export const Direction = Primitive
export const Drawer = Primitive
export const InputGroup = Primitive
export const Item = PrimitiveItem
export const Menubar = Primitive
export const NavigationMenu = Primitive
export const Pagination = Primitive
export const Resizable = Primitive
export const ScrollArea = Primitive
export const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => <hr className={cn('uds-separator', className)} {...props} />
export const Sheet = Primitive
export const Sidebar = Primitive
export const Sonner = Primitive

export function Alert({
  className,
  tone = 'default',
  ...props
}: DivProps & {
  tone?: 'default' | 'warning' | 'destructive'
}) {
  return <div className={cn('uds-alert', `uds-alert--${tone}`, className)} role="alert" {...props} />
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
        <span className="uds-accordion-indicator" aria-hidden="true">+</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return <AccordionPrimitive.Content className={cn('uds-accordion-content', className)} {...props} />
}

export function Attachment({
  children,
  className,
  meta,
  name,
  ...props
}: DivProps & {
  meta?: React.ReactNode
  name?: React.ReactNode
}) {
  return (
    <div className={cn('uds-attachment', className)} {...props}>
      <span className="uds-attachment-mark" aria-hidden="true" />
      <span className="uds-attachment-body">
        <span className="uds-attachment-name">{name ?? children ?? 'Attachment'}</span>
        {meta ? <span className="uds-attachment-meta">{meta}</span> : null}
      </span>
    </div>
  )
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

export function Marker({ className, tone = 'default', ...props }: SpanProps & { tone?: 'default' | 'accent' | 'muted' }) {
  return <span className={cn('uds-marker', `uds-marker--${tone}`, className)} {...props} />
}

export function Message({
  author,
  children,
  className,
  meta,
  ...props
}: DivProps & {
  author?: React.ReactNode
  meta?: React.ReactNode
}) {
  return (
    <article className={cn('uds-message', className)} {...props}>
      {author || meta ? (
        <header className="uds-message-header">
          {author ? <strong>{author}</strong> : null}
          {meta ? <span>{meta}</span> : null}
        </header>
      ) : null}
      <div className="uds-message-content">{children}</div>
    </article>
  )
}

export function MessageScroller({ className, ...props }: DivProps) {
  return <div className={cn('uds-message-scroller', className)} role="log" {...props} />
}

export function InputOTP({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('uds-input-otp', className)} {...props}>
      <span />
      <span />
      <span />
      <span />
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
