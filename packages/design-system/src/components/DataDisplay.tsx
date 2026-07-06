import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../lib/utils'

export function Avatar({
  alt,
  children,
  className,
  src,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  alt?: string
  src?: string
}) {
  return (
    <AvatarPrimitive.Root className={cn('uds-avatar', className)} {...props}>
      {src ? <AvatarPrimitive.Image alt={alt ?? ''} className="uds-avatar-image" src={src} /> : null}
      <AvatarPrimitive.Fallback className="uds-avatar-fallback">
        {children ?? fallbackFromAlt(alt)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image className={cn('uds-avatar-image', className)} {...props} />
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return <AvatarPrimitive.Fallback className={cn('uds-avatar-fallback', className)} {...props} />
}

function fallbackFromAlt(alt?: string) {
  if (!alt) return 'U'
  return alt
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function Banner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-banner', className)} role="status" {...props} />
}

export function Blockquote({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return <blockquote className={cn('uds-blockquote', className)} {...props} />
}

export function CodeBlock({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return <pre className={cn('uds-code-block', className)} {...props} />
}

export function EmptyState({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-empty-state', className)} {...props} />
}

export function List({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('uds-list', className)} {...props} />
}

export function MetadataList({ className, ...props }: React.HTMLAttributes<HTMLDListElement>) {
  return <dl className={cn('uds-metadata-list', className)} {...props} />
}

export function ProgressBar({ className, value = 0, ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: number }) {
  return <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={value} className={cn('uds-progress', className)} role="progressbar" {...props}><span style={{ inlineSize: `${value}%` }} /></div>
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-skeleton', className)} {...props} />
}

export function Spinner({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('uds-spinner', className)} aria-hidden="true" {...props} />
}

export function StatusDot({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('uds-status-dot', className)} {...props} />
}

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn('uds-table', className)} {...props} />
}

export function Toast({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-toast', className)} role="status" {...props} />
}

export const Calendar = EmptyState
export const Chat = EmptyState
export const Markdown = EmptyState
export const TreeList = List
