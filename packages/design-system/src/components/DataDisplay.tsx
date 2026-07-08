import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { CalendarPlus, ChevronDown } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { arSA, enUS } from 'react-day-picker/locale'
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
  size?: 'sm' | 'md' | 'lg'
}) {
  return <span className={cn('uds-spinner', `uds-spinner--${size}`, className)} {...props} />
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
  return <div aria-live="polite" className={cn('uds-toast', className)} role="status" {...props} />
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

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  captionLayout?: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years'
  defaultMonth?: Date
  defaultSelectedDate?: Date
  disabledDates?: (date: Date) => boolean
  locale?: string
  month?: Date
  onMonthChange?: (month: Date) => void
  onSelect?: (date: Date) => void
  selectedDate?: Date
  weekStartsOn?: WeekDayIndex
  yearRange?: number
}

export function Calendar({
  captionLayout = 'dropdown',
  className,
  defaultMonth,
  defaultSelectedDate,
  disabledDates,
  locale = 'en-US',
  month,
  onMonthChange,
  onSelect,
  selectedDate,
  weekStartsOn = 0,
  yearRange = 6,
  ...props
}: CalendarProps) {
  const initialMonth = startOfMonth(month ?? defaultMonth ?? selectedDate ?? defaultSelectedDate ?? new Date())
  const [uncontrolledMonth, setUncontrolledMonth] = React.useState(initialMonth)
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = React.useState<Date | undefined>(defaultSelectedDate)
  const visibleMonth = startOfMonth(month ?? uncontrolledMonth)
  const activeDate = selectedDate ?? uncontrolledSelectedDate
  const isArabicLocale = locale.toLowerCase().startsWith('ar')
  const fromMonth = new Date(visibleMonth.getFullYear() - yearRange, 0, 1)
  const toMonth = new Date(visibleMonth.getFullYear() + yearRange, 11, 1)

  const setVisibleMonth = (nextMonth: Date) => {
    const normalized = startOfMonth(nextMonth)
    if (month === undefined) {
      setUncontrolledMonth(normalized)
    }
    onMonthChange?.(normalized)
  }

  const selectDay = (day: Date) => {
    if (disabledDates?.(day)) return
    const nextDate = new Date(day.getFullYear(), day.getMonth(), day.getDate())
    if (selectedDate === undefined) {
      setUncontrolledSelectedDate(nextDate)
    }
    if (day.getMonth() !== visibleMonth.getMonth()) {
      setVisibleMonth(day)
    }
    onSelect?.(nextDate)
  }

  return (
    <div className={cn('uds-calendar', className)} {...props}>
      <DayPicker
        captionLayout={captionLayout}
        classNames={calendarClassNames}
        defaultMonth={initialMonth}
        dir={isArabicLocale ? 'rtl' : undefined}
        disabled={disabledDates}
        fixedWeeks
        locale={isArabicLocale ? arSA : enUS}
        mode="single"
        month={visibleMonth}
        navLayout="after"
        onMonthChange={setVisibleMonth}
        onSelect={(date) => {
          if (date) selectDay(date)
        }}
        selected={activeDate}
        showOutsideDays
        startMonth={fromMonth}
        endMonth={toMonth}
        weekStartsOn={weekStartsOn}
      />
    </div>
  )
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

const calendarClassNames = {
  root: 'uds-calendar-rdp-root',
  months: 'uds-calendar-months',
  month: 'uds-calendar-month',
  nav: 'uds-calendar-nav',
  button_previous: 'uds-calendar-nav-button uds-calendar-nav-button-previous',
  button_next: 'uds-calendar-nav-button uds-calendar-nav-button-next',
  month_caption: 'uds-calendar-caption',
  caption_label: 'uds-calendar-title',
  dropdowns: 'uds-calendar-dropdowns',
  dropdown: 'uds-calendar-select',
  dropdown_root: 'uds-calendar-select-root',
  chevron: 'uds-calendar-chevron',
  month_grid: 'uds-calendar-grid',
  weekdays: 'uds-calendar-weekdays',
  weekday: 'uds-calendar-weekday',
  weeks: 'uds-calendar-weeks',
  week: 'uds-calendar-week',
  day: 'uds-calendar-day',
  day_button: 'uds-calendar-day-button',
  outside: 'uds-calendar-day-outside',
  selected: 'uds-calendar-day-selected',
  today: 'uds-calendar-day-today',
  disabled: 'uds-calendar-day-disabled',
}

export interface DatePickerProps extends Omit<CalendarProps, 'children'> {
  label?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: React.ReactNode
  triggerClassName?: string
  valueFormatter?: (date: Date, locale: string) => React.ReactNode
}

export function DatePicker({
  captionLayout = 'label',
  className,
  defaultSelectedDate,
  label,
  locale = 'en-US',
  onOpenChange,
  onSelect,
  open,
  placeholder,
  selectedDate,
  triggerClassName,
  valueFormatter,
  ...calendarProps
}: DatePickerProps) {
  const [uncontrolledDate, setUncontrolledDate] = React.useState<Date | undefined>(defaultSelectedDate)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const activeDate = selectedDate ?? uncontrolledDate
  const activeOpen = open ?? uncontrolledOpen
  const isArabicLocale = locale.toLowerCase().startsWith('ar')
  const triggerLabel = label ?? (isArabicLocale ? 'اختر التاريخ' : 'Select date')
  const triggerPlaceholder = placeholder ?? (isArabicLocale ? 'اختر تاريخاً' : 'Pick a date')
  const formattedValue = activeDate
    ? valueFormatter?.(activeDate, locale) ?? new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(activeDate)
    : triggerPlaceholder

  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (open === undefined) {
      setUncontrolledOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }, [onOpenChange, open])

  const handleSelect = (date: Date) => {
    if (selectedDate === undefined) {
      setUncontrolledDate(date)
    }
    onSelect?.(date)
    setOpen(false)
  }

  return (
    <PopoverPrimitive.Root open={activeOpen} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button className={cn('uds-date-picker-trigger', triggerClassName)} dir={isArabicLocale ? 'rtl' : undefined} type="button">
          <span className="uds-date-picker-trigger-copy">
            <span className="uds-date-picker-label">{triggerLabel}</span>
            <strong data-placeholder={!activeDate || undefined}>{formattedValue}</strong>
          </span>
          <span className="uds-date-picker-trigger-icons" aria-hidden="true">
            <CalendarPlus />
            <ChevronDown />
          </span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={isArabicLocale ? 'end' : 'start'}
          className={cn('uds-floating-content uds-date-picker-content', className)}
          collisionPadding={16}
          dir={isArabicLocale ? 'rtl' : undefined}
          sideOffset={8}
        >
          <Calendar
            {...calendarProps}
            captionLayout={captionLayout}
            defaultSelectedDate={defaultSelectedDate}
            locale={locale}
            onSelect={handleSelect}
            selectedDate={activeDate}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export const Markdown = EmptyState
export const TreeList = List
