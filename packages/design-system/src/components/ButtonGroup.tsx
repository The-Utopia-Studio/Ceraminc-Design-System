import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

export const buttonGroupVariants = cva('uds-button-group', {
  variants: {
    orientation: {
      horizontal: 'uds-button-group--horizontal',
      vertical: 'uds-button-group--vertical',
    },
    density: {
      default: 'uds-button-group--density-default',
      compact: 'uds-button-group--density-compact',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    density: 'default',
  },
})

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  asToolbar?: boolean
  label?: string
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ asToolbar = false, children, className, density, label, orientation, ...props }, ref) => (
    <div
      aria-label={label}
      aria-orientation={orientation ?? 'horizontal'}
      className={cn(buttonGroupVariants({ density, orientation }), className)}
      ref={ref}
      role={asToolbar ? 'toolbar' : 'group'}
      {...props}
    >
      {children}
    </div>
  ),
)

ButtonGroup.displayName = 'ButtonGroup'

export interface ButtonGroupSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

export const ButtonGroupSeparator = React.forwardRef<HTMLDivElement, ButtonGroupSeparatorProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => (
    <div
      aria-hidden="true"
      className={cn('uds-button-group-separator', `uds-button-group-separator--${orientation}`, className)}
      ref={ref}
      role="separator"
      {...props}
    />
  ),
)

ButtonGroupSeparator.displayName = 'ButtonGroupSeparator'

export interface ButtonGroupTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

export const ButtonGroupText = React.forwardRef<HTMLSpanElement, ButtonGroupTextProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'

    return <Comp className={cn('uds-button-group-text', className)} ref={ref} {...props} />
  },
)

ButtonGroupText.displayName = 'ButtonGroupText'
