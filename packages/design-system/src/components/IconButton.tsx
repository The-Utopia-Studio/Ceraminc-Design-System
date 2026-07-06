import * as React from 'react'
import { Button, type ButtonProps } from './Button'

export interface IconButtonProps extends Omit<ButtonProps, 'isIconOnly'> {
  label: string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, label, ...props }, ref) => (
    <Button aria-label={label} isIconOnly ref={ref} {...props}>
      {children}
    </Button>
  ),
)

IconButton.displayName = 'IconButton'
