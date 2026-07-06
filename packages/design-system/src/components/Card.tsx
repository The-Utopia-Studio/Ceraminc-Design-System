import * as React from 'react'
import { cn } from '../lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'sm'
}

export function Card({ className, size = 'default', ...props }: CardProps) {
  return <div className={cn('uds-card', className)} data-size={size} {...props} />
}

export function ClickableCard({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn('uds-card uds-card--interactive uds-clickable-card', className)} {...props} />
}

export interface SelectableCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export function SelectableCard({ className, selected = false, ...props }: SelectableCardProps) {
  return (
    <button
      aria-pressed={selected}
      className={cn('uds-card uds-card--interactive uds-selectable-card', className)}
      data-selected={selected ? 'true' : undefined}
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

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-card-content', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-card-footer', className)} {...props} />
}
