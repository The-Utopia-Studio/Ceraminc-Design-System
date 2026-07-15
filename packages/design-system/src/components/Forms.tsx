import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as SelectPrimitive from '@radix-ui/react-select'
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Check, Minus } from 'lucide-react'
import { cn } from '../lib/utils'
import { useMotionPattern } from './Motion'

type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'vertical' | 'horizontal' | 'responsive'
}

export function Field({ className, orientation = 'vertical', role = 'group', ...props }: FieldProps) {
  return <div className={cn('uds-field', className)} data-orientation={orientation} role={role} {...props} />
}

export function FieldSet({ className, ...props }: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) {
  return <fieldset className={cn('uds-field-set', className)} {...props} />
}

type FieldLegendProps = React.HTMLAttributes<HTMLLegendElement> & {
  variant?: 'legend' | 'label'
}

export function FieldLegend({ className, variant = 'legend', ...props }: FieldLegendProps) {
  return <legend className={cn('uds-field-legend', className)} data-variant={variant} {...props} />
}

export function FieldGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-field-group', className)} {...props} />
}

export function FieldContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-field-content', className)} {...props} />
}

export function FieldLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('uds-field-label', className)} {...props} />
}

export function FieldTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-field-title', className)} {...props} />
}

export function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('uds-field-description', className)} {...props} />
}

type FieldErrorItem = { message?: string } | undefined

type FieldErrorProps = React.HTMLAttributes<HTMLDivElement> & {
  errors?: FieldErrorItem[]
  issues?: FieldErrorItem[]
}

export function FieldError({ className, children, errors, issues, ...props }: FieldErrorProps) {
  const messages = [...(errors ?? []), ...(issues ?? [])]
    .map((item) => item?.message)
    .filter((message): message is string => Boolean(message))

  if (!children && messages.length === 0) return null

  return (
    <div className={cn('uds-field-error', className)} aria-live="polite" {...props}>
      {children ?? (messages.length > 1 ? <ul>{messages.map((message) => <li key={message}>{message}</li>)}</ul> : messages[0])}
    </div>
  )
}

export function FieldSeparator({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-field-separator', className)} role="separator" {...props}>{children}</div>
}

export function TextInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-input', className)} type="text" {...props} />
}

export function TextArea({ className, resize = 'vertical', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { resize?: 'none' | 'vertical' | 'both' }) {
  return <textarea className={cn('uds-input uds-textarea', className)} data-resize={resize} {...props} />
}
export const Textarea = TextArea

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  motion?: boolean
  variant?: 'normal' | 'fancy'
}

type CheckboxState = boolean | 'indeterminate'

export function Checkbox({
  className,
  variant = 'normal',
  checked,
  defaultChecked,
  motion = true,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const resolvedMotion = useMotionPattern('press', motion)
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState<CheckboxState>(defaultChecked ?? false)
  const currentChecked = (isControlled ? checked : uncontrolledChecked) as CheckboxState
  const showMark = currentChecked === true || currentChecked === 'indeterminate'

  function handleCheckedChange(nextChecked: CheckboxState) {
    if (!isControlled) {
      setUncontrolledChecked(nextChecked)
    }

    onCheckedChange?.(nextChecked)
  }

  return (
    <CheckboxPrimitive.Root
      className={cn('uds-checkbox', className)}
      data-motion={resolvedMotion.enabled ? 'on' : 'off'}
      data-variant={variant}
      checked={currentChecked}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="uds-checkbox-indicator" forceMount>
        <span
          aria-hidden="true"
          className="uds-checkbox-motion-mark"
          data-visible={showMark ? 'true' : 'false'}
        >
          {showMark ? (currentChecked === 'indeterminate' ? <Minus aria-hidden="true" /> : <Check aria-hidden="true" />) : null}
        </span>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export function Radio({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-radio', className)} type="radio" {...props} />
}

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn('uds-radio-group', className)} {...props} />
}

export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item className={cn('uds-radio-group-item', className)} {...props}>
      <RadioGroupPrimitive.Indicator className="uds-radio-group-indicator" />
    </RadioGroupPrimitive.Item>
  )
}

type RadioGroupOptionProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'> & {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  variant?: 'default' | 'card'
}

export function RadioGroupOption({
  className,
  value,
  label,
  description,
  disabled = false,
  variant = 'default',
  ...props
}: RadioGroupOptionProps) {
  const generatedId = React.useId()

  return (
    <label
      className={cn('uds-radio-group-option', className)}
      data-disabled={disabled ? '' : undefined}
      data-variant={variant}
      htmlFor={generatedId}
      {...props}
    >
      <RadioGroupItem disabled={disabled} id={generatedId} value={value} />
      <span className="uds-radio-group-option-content">
        <span className="uds-radio-group-option-label">{label}</span>
        {description ? <span className="uds-radio-group-option-description">{description}</span> : null}
      </span>
    </label>
  )
}

export function Switch({ className, size = 'md', ...props }: React.ComponentProps<typeof SwitchPrimitive.Root> & { size?: 'sm' | 'md' }) {
  return (
    <SwitchPrimitive.Root className={cn('uds-switch', className)} data-size={size} {...props}>
      <SwitchPrimitive.Thumb className="uds-switch-thumb" />
    </SwitchPrimitive.Root>
  )
}

export function Slider({
  className,
  defaultValue,
  size = 'md',
  value,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & { size?: 'sm' | 'md' }) {
  const currentValue = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [typeof defaultValue === 'number' ? defaultValue : 0]

  return (
    <SliderPrimitive.Root className={cn('uds-slider', className)} data-size={size} defaultValue={defaultValue} value={value} {...props}>
      <SliderPrimitive.Track className="uds-slider-track">
        <SliderPrimitive.Range className="uds-slider-range" />
      </SliderPrimitive.Track>
      {currentValue.map((_, index) => (
        <SliderPrimitive.Thumb key={index} className="uds-slider-thumb" />
      ))}
    </SliderPrimitive.Root>
  )
}

export function NumberInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-input', className)} type="number" {...props} />
}

export function DateInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-input', className)} type="date" {...props} />
}

export function FileInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-input', className)} type="file" {...props} />
}

export function Selector({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('uds-input uds-selector', className)} {...props} />
}

export function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />
}

export function SelectTrigger({ children, className, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger className={cn('uds-select-trigger', className)} {...props}>
      {children}
      <SelectPrimitive.Icon className="uds-select-trigger-icon">⌄</SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />
}

export function SelectContent({ children, className, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={cn('uds-select-content', className)} position="popper" {...props}>
        <SelectPrimitive.Viewport className="uds-select-viewport">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group {...props} />
}

export function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label className={cn('uds-select-label', className)} {...props} />
}

export function SelectItem({ children, className, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item className={cn('uds-select-item', className)} {...props}>
      <SelectPrimitive.ItemIndicator className="uds-select-item-indicator">✓</SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>
        <span className="uds-select-item-text">{children}</span>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={cn('uds-select-separator', className)} {...props} />
}

export function SelectScrollUpButton({ className, children = '⌃', ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return <SelectPrimitive.ScrollUpButton className={cn('uds-select-scroll-button', className)} {...props}>{children}</SelectPrimitive.ScrollUpButton>
}

export function SelectScrollDownButton({ className, children = '⌄', ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return <SelectPrimitive.ScrollDownButton className={cn('uds-select-scroll-button', className)} {...props}>{children}</SelectPrimitive.ScrollDownButton>
}

export const Typeahead = TextInput
