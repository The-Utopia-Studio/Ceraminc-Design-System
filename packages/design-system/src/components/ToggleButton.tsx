import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from './Button'
import { cn } from '../lib/utils'

export interface ToggleButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, 'asChild' | 'disabled' | 'pressed'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  isDisabled?: boolean
  isIconOnly?: boolean
  isLoading?: boolean
  isPressed?: boolean
  label?: React.ReactNode
  loadingText?: React.ReactNode
  pressedIcon?: React.ReactNode
}

export const ToggleButton = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleButtonProps
>(
  (
    {
      asChild = false,
      children,
      className,
      icon,
      isDisabled = false,
      isIconOnly = false,
      isLoading = false,
      isPressed,
      label,
      loadingText,
      onPressedChange,
      pressedIcon,
      size,
      variant = 'ghost',
      ...props
    },
    ref,
  ) => {
    const isDisabledResolved = isDisabled || isLoading
    const visibleLabel = isLoading && loadingText ? loadingText : label
    const fallbackAriaLabel = typeof label === 'string' ? label : undefined
    const resolvedSize = isIconOnly ? 'icon' : size
    const hasIcon = Boolean(icon || pressedIcon)

    return (
      <TogglePrimitive.Root
        aria-busy={isLoading || undefined}
        aria-label={props['aria-label'] ?? fallbackAriaLabel}
        asChild={asChild}
        className={cn(buttonVariants({ size: resolvedSize, variant }), 'uds-toggle-button', className)}
        data-icon-only={isIconOnly || undefined}
        data-loading={isLoading || undefined}
        disabled={isDisabledResolved}
        onPressedChange={onPressedChange}
        pressed={isPressed}
        ref={ref}
        {...props}
      >
        {isLoading ? <span aria-hidden="true" className="uds-button-spinner" /> : null}
        {!isLoading && hasIcon ? (
          <>
            <span className="uds-button-slot uds-toggle-icon-rest" data-slot="start">
              {icon ?? pressedIcon}
            </span>
            <span className="uds-button-slot uds-toggle-icon-pressed" data-slot="start">
              {pressedIcon ?? icon}
            </span>
          </>
        ) : null}
        {isIconOnly ? null : children ?? (visibleLabel ? <span className="uds-button-content">{visibleLabel}</span> : null)}
      </TogglePrimitive.Root>
    )
  },
)

ToggleButton.displayName = 'ToggleButton'

export const Toggle = ToggleButton
