import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'
import { useMotionPattern } from './Motion'

type HoverCardProps = React.ComponentProps<typeof HoverCardPrimitive.Root> & {
  delay?: number
}

export function HoverCard({ delay, openDelay, ...props }: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      openDelay={delay ?? openDelay}
      {...props}
    />
  )
}

export function HoverCardTrigger(props: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger {...props} />
}

export function HoverCardContent({ align = 'center', className, motion = true, sideOffset = 8, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Content> & { motion?: boolean }) {
  const resolvedMotion = useMotionPattern('reveal', motion)
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content align={align} className={cn('uds-floating-content uds-hover-card-content', className)} data-motion={resolvedMotion.enabled ? 'on' : 'off'} sideOffset={sideOffset} {...props} />
    </HoverCardPrimitive.Portal>
  )
}

export function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root {...props} />
}

export function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger {...props} />
}

export function PopoverAnchor(props: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor {...props} />
}

export function PopoverContent({ align = 'center', className, motion = true, sideOffset = 8, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & { motion?: boolean }) {
  const resolvedMotion = useMotionPattern('reveal', motion)
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content align={align} className={cn('uds-floating-content uds-popover-content', className)} data-motion={resolvedMotion.enabled ? 'on' : 'off'} sideOffset={sideOffset} {...props} />
    </PopoverPrimitive.Portal>
  )
}

export function PopoverHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-popover-header', className)} {...props} />
}

export function PopoverTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('uds-popover-title', className)} {...props} />
}

export function PopoverDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('uds-popover-description', className)} {...props} />
}

export function PopoverClose({ className, children, ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close className={cn('uds-popover-close', className)} {...props}>
      {children ?? <X aria-hidden="true" />}
    </PopoverPrimitive.Close>
  )
}

export function TooltipProvider(props: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={200} {...props} />
}

export function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />
}

export function TooltipTrigger(props: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger {...props} />
}

export function TooltipContent({ className, motion = true, sideOffset = 6, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content> & { motion?: boolean }) {
  const resolvedMotion = useMotionPattern('reveal', motion)
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content className={cn('uds-floating-content uds-tooltip-content', className)} data-motion={resolvedMotion.enabled ? 'on' : 'off'} sideOffset={sideOffset} {...props} />
    </TooltipPrimitive.Portal>
  )
}
