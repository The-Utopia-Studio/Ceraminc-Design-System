import * as React from 'react'
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

export function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-checkbox', className)} type="checkbox" {...props} />
}

export function Radio({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-radio', className)} type="radio" {...props} />
}

export function Switch({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-switch', className)} role="switch" type="checkbox" {...props} />
}

export function Slider({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('uds-slider', className)} type="range" {...props} />
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

export const Typeahead = TextInput
