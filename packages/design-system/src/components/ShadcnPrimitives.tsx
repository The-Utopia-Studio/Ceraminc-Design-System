import * as React from 'react'
import { cn } from '../lib/utils'

type DivProps = React.HTMLAttributes<HTMLDivElement>

function Primitive({ className, ...props }: DivProps) {
  return <div className={cn('uds-primitive', className)} {...props} />
}

function PrimitiveHeader({ className, ...props }: DivProps) {
  return <div className={cn('uds-primitive-header', className)} {...props} />
}

function PrimitiveItem({ className, ...props }: DivProps) {
  return <div className={cn('uds-primitive-item', className)} {...props} />
}

export const Accordion = Primitive
export const AccordionItem = PrimitiveItem
export const Alert = Primitive
export const AlertDialog = Primitive
export const Attachment = Primitive
export const Bubble = Primitive
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
export const Marker = Primitive
export const Menubar = Primitive
export const Message = Primitive
export const MessageScroller = Primitive
export const NavigationMenu = Primitive
export const Pagination = Primitive
export const Resizable = Primitive
export const ScrollArea = Primitive
export const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => <hr className={cn('uds-separator', className)} {...props} />
export const Sheet = Primitive
export const Sidebar = Primitive
export const Sonner = Primitive

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
