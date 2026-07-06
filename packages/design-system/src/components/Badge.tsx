import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

export const badgeVariants = cva('uds-badge', {
  variants: {
    variant: {
      default: 'uds-badge--default',
      destructive: 'uds-badge--destructive',
      secondary: 'uds-badge--secondary',
      success: 'uds-badge--success',
      outline: 'uds-badge--outline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
