import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from './Button'
import { buttonGroupVariants, type ButtonGroupProps } from './ButtonGroup'
import { cn } from '../lib/utils'

export interface ToggleButtonGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>, 'onChange' | 'orientation'>,
    Pick<ButtonGroupProps, 'density' | 'orientation'> {
  label?: string
  onChange?: (value: string | string[]) => void
}

export const ToggleButtonGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleButtonGroupProps
>(({ children, className, density, label, onChange, onValueChange, orientation, ...props }, ref) => {
  const resolvedOrientation = orientation ?? 'horizontal'
  const Root = ToggleGroupPrimitive.Root as React.ElementType
  const handleValueChange = (value: string | string[]) => {
    onValueChange?.(value as never)
    onChange?.(value)
  }

  return (
  <Root
    aria-label={label}
    aria-orientation={resolvedOrientation}
    className={cn(buttonGroupVariants({ density, orientation: resolvedOrientation }), 'uds-toggle-button-group', className)}
    onValueChange={handleValueChange}
    orientation={resolvedOrientation}
    ref={ref}
    {...props}
  >
    {children}
  </Root>
  )
})

ToggleButtonGroup.displayName = 'ToggleButtonGroup'

export interface ToggleButtonGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode
  isDisabled?: boolean
  label?: React.ReactNode
  pressedIcon?: React.ReactNode
}

export const ToggleButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleButtonGroupItemProps
>(({ children, className, icon, isDisabled = false, label, pressedIcon, size, variant = 'secondary', ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    aria-label={props['aria-label'] ?? (typeof label === 'string' ? label : undefined)}
    className={cn(buttonVariants({ size, variant }), 'uds-toggle-button-group-item', className)}
    disabled={isDisabled}
    ref={ref}
    {...props}
  >
    {icon || pressedIcon ? (
      <>
        <span className="uds-button-slot uds-toggle-icon-rest" data-slot="start">{icon}</span>
        <span className="uds-button-slot uds-toggle-icon-pressed" data-slot="start">{pressedIcon ?? icon}</span>
      </>
    ) : null}
    {children ?? (label ? <span className="uds-button-content">{label}</span> : null)}
  </ToggleGroupPrimitive.Item>
))

ToggleButtonGroupItem.displayName = 'ToggleButtonGroupItem'
