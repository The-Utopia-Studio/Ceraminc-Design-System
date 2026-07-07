import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../lib/utils'

export interface AccountStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode
  avatarAlt?: string
  avatarFallback?: React.ReactNode
  avatarSrc?: string
  description?: React.ReactNode
  endContent?: React.ReactNode
  label: React.ReactNode
}

export function AccountStatus({
  avatar,
  avatarAlt,
  avatarFallback,
  avatarSrc,
  children,
  className,
  description,
  endContent,
  label,
  ...props
}: AccountStatusProps) {
  return (
    <div className={cn('uds-account-status', className)} {...props}>
      <span className="uds-account-status-avatar" data-slot="avatar">
        {avatar ?? <Avatar alt={avatarAlt} src={avatarSrc}>{avatarFallback}</Avatar>}
      </span>
      <span className="uds-account-status-copy" data-slot="copy">
        <span className="uds-account-status-label" data-slot="label">{label}</span>
        {description ? <span className="uds-account-status-description" data-slot="description">{description}</span> : null}
        {children}
      </span>
      {endContent ? <span className="uds-account-status-end" data-slot="end">{endContent}</span> : null}
    </div>
  )
}

export function Avatar({
  alt,
  children,
  className,
  size = 'md',
  src,
  status,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  src?: string
  status?: 'online' | 'busy' | 'away' | 'offline'
}) {
  return (
    <AvatarPrimitive.Root className={cn('uds-avatar', className)} data-size={size} data-status={status} {...props}>
      {src ? <AvatarPrimitive.Image alt={alt ?? ''} className="uds-avatar-image" src={src} /> : null}
      <AvatarPrimitive.Fallback className="uds-avatar-fallback">
        {children ?? fallbackFromAlt(alt)}
      </AvatarPrimitive.Fallback>
      {status ? <AvatarStatusDot status={status} /> : null}
    </AvatarPrimitive.Root>
  )
}

export function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image className={cn('uds-avatar-image', className)} {...props} />
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return <AvatarPrimitive.Fallback className={cn('uds-avatar-fallback', className)} {...props} />
}

export function AvatarStatusDot({
  className,
  status = 'online',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { status?: 'online' | 'busy' | 'away' | 'offline' }) {
  return <span aria-hidden="true" className={cn('uds-avatar-status-dot', className)} data-status={status} {...props} />
}

export function AvatarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-avatar-group', className)} role="group" {...props} />
}

export function AvatarOverflow({
  className,
  size = 'md',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { size?: 'xs' | 'sm' | 'md' | 'lg' }) {
  return <span className={cn('uds-avatar-overflow', className)} data-size={size} {...props} />
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

export function ProgressBar({
  className,
  label,
  showValue = false,
  value = 0,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  label?: React.ReactNode
  showValue?: boolean
  value?: number
}) {
  const bar = (
    <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={value} className="uds-progress" role="progressbar" {...props}>
      <span style={{ inlineSize: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )

  if (!label && !showValue) {
    return (
      <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={value} className={cn('uds-progress', className)} role="progressbar" {...props}>
        <span style={{ inlineSize: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    )
  }

  return (
    <div className={cn('uds-progress-root', className)}>
      <div className="uds-progress-header">
        {label ? <span className="uds-progress-label">{label}</span> : <span />}
        {showValue ? <span className="uds-progress-value">{Math.round(value)}%</span> : null}
      </div>
      {bar}
    </div>
  )
}
export const Progress = ProgressBar

export function Skeleton({
  className,
  variant = 'block',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'block' | 'circle' | 'line'
}) {
  return <div className={cn('uds-skeleton', `uds-skeleton--${variant}`, className)} {...props} />
}

export function Spinner({
  className,
  size = 'sm',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  size?: 'sm' | 'md'
}) {
  const isDecorative = !props['aria-label'] && !props['aria-labelledby'] && !props.role
  return (
    <span
      aria-hidden={isDecorative ? true : undefined}
      className={cn('uds-spinner', size === 'md' && 'uds-spinner--md', className)}
      {...props}
    />
  )
}

export function StatusDot({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('uds-status-dot', className)} {...props} />
}

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn('uds-table', className)} {...props} />
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('uds-table-header', className)} {...props} />
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('uds-table-body', className)} {...props} />
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('uds-table-row', className)} {...props} />
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn('uds-table-head', className)} scope="col" {...props} />
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('uds-table-cell', className)} {...props} />
}

export function Toast({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-toast', className)} role="status" {...props} />
}

export function ToastIcon({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn('uds-toast-icon', className)} {...props} />
}

export function ToastTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('uds-toast-title', className)} {...props} />
}

export function ToastDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-toast-description', className)} {...props} />
}

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  locale?: string
  month?: Date
  selectedDate?: Date
  weekStartsOn?: 0 | 1
}

export function Calendar({
  className,
  locale = 'en-US',
  month = new Date(),
  selectedDate,
  weekStartsOn = 0,
  ...props
}: CalendarProps) {
  const visibleMonth = new Date(month.getFullYear(), month.getMonth(), 1)
  const days = getCalendarDays(visibleMonth, weekStartsOn)
  const weekDays = getWeekDays(locale, weekStartsOn)
  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(visibleMonth)

  return (
    <div className={cn('uds-calendar', className)} {...props}>
      <div className="uds-calendar-header">{monthLabel}</div>
      <div className="uds-calendar-grid" role="grid" aria-label={monthLabel}>
        {weekDays.map((day) => (
          <div key={day} className="uds-calendar-weekday" role="columnheader">{day}</div>
        ))}
        {days.map((day) => {
          const outside = day.getMonth() !== visibleMonth.getMonth()
          const selected = selectedDate ? isSameDay(day, selectedDate) : false
          return (
            <button
              key={day.toISOString()}
              aria-selected={selected}
              className="uds-calendar-day"
              data-outside={outside ? 'true' : undefined}
              data-selected={selected ? 'true' : undefined}
              role="gridcell"
              type="button"
            >
              {new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(day)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function getCalendarDays(month: Date, weekStartsOn: 0 | 1) {
  const start = new Date(month.getFullYear(), month.getMonth(), 1)
  const offset = (start.getDay() - weekStartsOn + 7) % 7
  start.setDate(start.getDate() - offset)

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    return day
  })
}

function getWeekDays(locale: string, weekStartsOn: 0 | 1) {
  const sunday = new Date(2026, 0, 4)
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(sunday)
    day.setDate(sunday.getDate() + ((index + weekStartsOn) % 7))
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(day)
  })
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export const Chat = EmptyState
export const Markdown = EmptyState
export const TreeList = List
