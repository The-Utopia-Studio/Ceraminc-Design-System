import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '../lib/utils'

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export function Breadcrumbs({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return <ol className={cn('uds-breadcrumbs', className)} {...props} />
}

export function BreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('uds-breadcrumb-item', className)} {...props} />
}

export function TopNav({ children, className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root className={cn('uds-top-nav-root', className)} {...props}>
      <NavigationMenuPrimitive.List className="uds-top-nav">
        {children}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  )
}

export function TopNavItem({ className, ...props }: AnchorProps) {
  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Link asChild>
        <a className={cn('uds-top-nav-item', className)} {...props} />
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  )
}

export function TopNavMenu({ children, className, label, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item> & { label: React.ReactNode }) {
  return (
    <NavigationMenuPrimitive.Item className={cn('uds-top-nav-menu', className)} {...props}>
      <NavigationMenuPrimitive.Trigger className="uds-top-nav-item">{label}</NavigationMenuPrimitive.Trigger>
      <NavigationMenuPrimitive.Content className="uds-top-nav-content">
        {children}
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Item>
  )
}

export function TopNavMenuItem({ className, ...props }: AnchorProps) {
  return (
    <NavigationMenuPrimitive.Link asChild>
      <a className={cn('uds-menu-item', className)} {...props} />
    </NavigationMenuPrimitive.Link>
  )
}

export function SideNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={cn('uds-side-nav', className)} {...props} />
}

export function SideNavSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-side-nav-section', className)} {...props} />
}

export function SideNavHeading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('uds-side-nav-heading', className)} {...props} />
}

export function SideNavItem({ className, ...props }: AnchorProps) {
  return <a className={cn('uds-side-nav-item', className)} {...props} />
}

export function MobileNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={cn('uds-mobile-nav', className)} {...props} />
}

export function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn('uds-tabs', className)} {...props} />
}

export function TabList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn('uds-tab-list', className)} {...props} />
}

export function Tab({ className, selected, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger> & { selected?: boolean }) {
  return <TabsPrimitive.Trigger className={cn('uds-tab', className)} data-selected={selected ? 'true' : undefined} {...props} />
}

export function TabPanel({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn('uds-tab-panel', className)} {...props} />
}

export function DropdownMenu(props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root {...props} />
}

export function DropdownMenuTrigger(props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger {...props} />
}

export function DropdownMenuContent({ align = 'start', className, sideOffset = 8, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content align={align} className={cn('uds-menu', className)} sideOffset={sideOffset} {...props} />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return <DropdownMenuPrimitive.Item className={cn('uds-menu-item', className)} {...props} />
}

export function ContextMenu(props: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root {...props} />
}

export function ContextMenuTrigger(props: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return <ContextMenuPrimitive.Trigger {...props} />
}

export function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content className={cn('uds-menu', className)} {...props} />
    </ContextMenuPrimitive.Portal>
  )
}

export function ContextMenuItem({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Item>) {
  return <ContextMenuPrimitive.Item className={cn('uds-menu-item', className)} {...props} />
}

export function CommandPalette({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive className={cn('uds-command-palette', className)} {...props} />
}

export function CommandPaletteInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return <CommandPrimitive.Input className={cn('uds-command-palette-input', className)} {...props} />
}

export function CommandPaletteList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List className={cn('uds-command-palette-list', className)} {...props} />
}

export function CommandPaletteGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group className={cn('uds-command-palette-group', className)} {...props} />
}

export function CommandPaletteEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty className={cn('uds-command-palette-empty', className)} {...props} />
}

export function CommandPaletteItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item className={cn('uds-command-palette-item', className)} {...props} />
}
