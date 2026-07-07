import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as SelectPrimitive from '@radix-ui/react-select'
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Check } from 'lucide-react'
import { cn } from '../lib/utils'

export function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-field', className)} {...props} />
}

export function FieldLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('uds-field-label', className)} {...props} />
}

export function TextInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-input', className)} type="text" {...props} />
}

export function TextArea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('uds-input uds-textarea', className)} {...props} />
}
export const Textarea = TextArea

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root className={cn('uds-checkbox', className)} {...props}>
      <CheckboxPrimitive.Indicator className="uds-checkbox-indicator">
        <Check aria-hidden="true" />
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

export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root className={cn('uds-switch', className)} {...props}>
      <SwitchPrimitive.Thumb className="uds-switch-thumb" />
    </SwitchPrimitive.Root>
  )
}

export function Slider({
  className,
  defaultValue,
  value,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const currentValue = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [typeof defaultValue === 'number' ? defaultValue : 0]

  return (
    <SliderPrimitive.Root className={cn('uds-slider', className)} defaultValue={defaultValue} value={value} {...props}>
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
