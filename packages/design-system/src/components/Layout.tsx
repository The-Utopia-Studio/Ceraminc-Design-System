import * as React from 'react'
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import { cn } from '../lib/utils'

type Gap = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12

type DivProps = React.HTMLAttributes<HTMLDivElement>

export interface StackProps extends DivProps {
  direction?: 'horizontal' | 'vertical'
  gap?: Gap
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
}

export function Stack({ align = 'stretch', className, direction = 'vertical', gap = 4, justify = 'start', ...props }: StackProps) {
  return <div className={cn('uds-stack', `uds-stack--${direction}`, `uds-gap-${gap}`, `uds-align-${align}`, `uds-justify-${justify}`, className)} {...props} />
}

export function HStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="horizontal" {...props} />
}

export function VStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="vertical" {...props} />
}

export function Center({ className, ...props }: DivProps) {
  return <div className={cn('uds-center', className)} {...props} />
}

export interface GridProps extends DivProps {
  columns?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: Gap
}

export function Grid({ className, columns = 2, gap = 4, ...props }: GridProps) {
  return <div className={cn('uds-grid', `uds-grid--${columns}`, `uds-gap-${gap}`, className)} {...props} />
}

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn('uds-section', className)} {...props} />
}

export function Layout({ className, ...props }: DivProps) {
  return <div className={cn('uds-layout', className)} {...props} />
}

export function LayoutHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <header className={cn('uds-layout-header', className)} {...props} />
}

export function LayoutContent({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <main className={cn('uds-layout-content', className)} {...props} />
}

export function LayoutPanel({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <aside className={cn('uds-layout-panel', className)} {...props} />
}

export function LayoutFooter({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cn('uds-layout-footer', className)} {...props} />
}

export interface AspectRatioProps extends React.ComponentProps<typeof AspectRatioPrimitive.Root> {
  ratio?: number
}

export function AspectRatio({ className, ratio = 16 / 9, ...props }: AspectRatioProps) {
  return <AspectRatioPrimitive.Root className={cn('uds-aspect-ratio', className)} ratio={ratio} {...props} />
}

export function AppShell({ className, ...props }: DivProps) {
  return <div className={cn('uds-app-shell', className)} {...props} />
}
