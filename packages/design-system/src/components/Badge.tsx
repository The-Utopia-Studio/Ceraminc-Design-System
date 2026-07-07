import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

export const badgeVariants = cva('uds-badge', {
  variants: {
    variant: {
      default: 'uds-badge--default',
      destructive: 'uds-badge--destructive',
      info: 'uds-badge--info',
      secondary: 'uds-badge--secondary',
      success: 'uds-badge--success',
      warning: 'uds-badge--warning',
      outline: 'uds-badge--outline',
    },
    size: {
      sm: 'uds-badge--sm',
      md: 'uds-badge--md',
      lg: 'uds-badge--lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  endContent?: React.ReactNode
  startContent?: React.ReactNode
}

export function Badge({ children, className, endContent, size, startContent, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ size, variant }), className)} {...props}>
      {startContent ? <span className="uds-badge-slot" data-slot="start">{startContent}</span> : null}
      <span className="uds-badge-label" data-slot="label">{children}</span>
      {endContent ? <span className="uds-badge-slot" data-slot="end">{endContent}</span> : null}
    </span>
  )
}
