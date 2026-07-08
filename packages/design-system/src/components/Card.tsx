import * as React from 'react'
import { cn } from '../lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: boolean | 'always' | 'hover'
  interactive?: boolean
  size?: 'default' | 'sm'
}

export function Card({ accent = false, className, interactive = false, size = 'default', ...props }: CardProps) {
  const accentValue = accent === true ? 'always' : accent === false ? undefined : accent

  return (
    <div
      className={cn('uds-card', interactive && 'uds-card--interactive', className)}
      data-accent={accentValue}
      data-size={size}
      {...props}
    />
  )
}

export interface ClickableCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  accent?: boolean | 'always' | 'hover'
  size?: 'default' | 'sm'
}

export function ClickableCard({ accent = 'hover', className, size = 'default', ...props }: ClickableCardProps) {
  const accentValue = accent === true ? 'always' : accent === false ? undefined : accent

  return (
    <a
      className={cn('uds-card uds-card--interactive uds-clickable-card', className)}
      data-accent={accentValue}
      data-size={size}
      {...props}
    />
  )
}

export interface SelectableCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: boolean | 'always' | 'hover'
  selected?: boolean
  size?: 'default' | 'sm'
}

export function SelectableCard({ accent = 'hover', className, selected = false, size = 'default', ...props }: SelectableCardProps) {
  const accentValue = accent === true ? 'always' : accent === false ? undefined : accent

  return (
    <button
      aria-pressed={selected}
      className={cn('uds-card uds-card--interactive uds-selectable-card', className)}
      data-accent={accentValue}
      data-selected={selected ? 'true' : undefined}
      data-size={size}
      type="button"
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-card-header', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('uds-card-title', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('uds-card-description', className)} {...props} />
}

export function CardAction({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-card-action', className)} {...props} />
}

export function CardStatus({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('uds-card-status', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-card-content', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-card-footer', className)} {...props} />
}
