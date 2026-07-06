import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

export const buttonVariants = cva('uds-button', {
  variants: {
    variant: {
      default: 'uds-button--default',
      secondary: 'uds-button--secondary',
      outline: 'uds-button--outline',
      ghost: 'uds-button--ghost',
      destructive: 'uds-button--destructive',
    },
    size: {
      default: 'uds-button--size-default',
      sm: 'uds-button--size-sm',
      lg: 'uds-button--size-lg',
      icon: 'uds-button--size-icon',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  endContent?: React.ReactNode
  isIconOnly?: boolean
  loading?: boolean
  loadingText?: React.ReactNode
  startContent?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      disabled,
      endContent,
      isIconOnly = false,
      loading = false,
      loadingText,
      size,
      startContent,
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading
    const resolvedSize = isIconOnly ? 'icon' : size

    return (
      <Comp
        aria-busy={loading || undefined}
        aria-disabled={asChild && isDisabled ? true : undefined}
        className={cn(buttonVariants({ variant, size: resolvedSize }), className)}
        data-icon-only={isIconOnly || undefined}
        data-loading={loading || undefined}
        disabled={!asChild ? isDisabled : undefined}
        ref={ref}
        {...props}
      >
        {loading ? <span aria-hidden="true" className="uds-button-spinner" /> : null}
        {!loading && startContent ? (
          <span className="uds-button-slot" data-slot="start">
            {startContent}
          </span>
        ) : null}
        {isIconOnly ? (
          loading ? null : children
        ) : (
          <span className="uds-button-content">{loading && loadingText ? loadingText : children}</span>
        )}
        {!isIconOnly && !loading && endContent ? (
          <span className="uds-button-slot" data-slot="end">
            {endContent}
          </span>
        ) : null}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
