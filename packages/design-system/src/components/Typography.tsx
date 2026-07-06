import * as React from 'react'
import { cn } from '../lib/utils'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4
}

export function Heading({ className, level = 2, ...props }: HeadingProps) {
  const Tag = `h${level}` as const
  return <Tag className={cn('uds-heading', `uds-heading--${level}`, className)} {...props} />
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: 'default' | 'muted' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
}

export function Text({ className, size = 'md', tone = 'default', ...props }: TextProps) {
  return <p className={cn('uds-text', `uds-text--${size}`, `uds-text--${tone}`, className)} {...props} />
}

export function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-prose', className)} {...props} />
}

export function ArabicText({ className, dir = 'rtl', lang = 'ar', ...props }: TextProps) {
  return <Text className={cn('uds-arabic-text', className)} dir={dir} lang={lang} {...props} />
}

export function Typography({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Prose className={className} {...props} />
}
