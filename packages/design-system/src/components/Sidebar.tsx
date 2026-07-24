import * as React from 'react'
import { PanelLeft } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './Button'

type SidebarContextValue = {
  collapsed: boolean
  isMobile: boolean
  mobileOpen: boolean
  setCollapsed: (value: boolean) => void
  setMobileOpen: (value: boolean) => void
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function subscribeToMobileQuery(callback: () => void) {
  const query = window.matchMedia('(max-width: 48rem)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function getMobileSnapshot() { return window.matchMedia('(max-width: 48rem)').matches }
function getServerMobileSnapshot() { return false }

export type SidebarProviderProps = {
  children: React.ReactNode
  collapsed?: boolean
  defaultCollapsed?: boolean
  mobileOpen?: boolean
  defaultMobileOpen?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  onMobileOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  children,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  mobileOpen: controlledMobileOpen,
  defaultMobileOpen = false,
  onCollapsedChange,
  onMobileOpenChange,
}: SidebarProviderProps) {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed)
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = React.useState(defaultMobileOpen)
  const isMobile = React.useSyncExternalStore(subscribeToMobileQuery, getMobileSnapshot, getServerMobileSnapshot)
  const collapsed = controlledCollapsed ?? uncontrolledCollapsed
  const mobileOpen = controlledMobileOpen ?? uncontrolledMobileOpen

  const setCollapsed = React.useCallback((value: boolean) => {
    if (controlledCollapsed === undefined) setUncontrolledCollapsed(value)
    onCollapsedChange?.(value)
  }, [controlledCollapsed, onCollapsedChange])

  const setMobileOpen = React.useCallback((value: boolean) => {
    if (controlledMobileOpen === undefined) setUncontrolledMobileOpen(value)
    onMobileOpenChange?.(value)
  }, [controlledMobileOpen, onMobileOpenChange])

  const toggle = React.useCallback(() => {
    if (isMobile) setMobileOpen(!mobileOpen)
    else setCollapsed(!collapsed)
  }, [collapsed, isMobile, mobileOpen, setCollapsed, setMobileOpen])
  const value = React.useMemo(() => ({ collapsed, isMobile, mobileOpen, setCollapsed, setMobileOpen, toggle }), [collapsed, isMobile, mobileOpen, setCollapsed, setMobileOpen, toggle])

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error('Sidebar parts must be used inside SidebarProvider.')
  return context
}

export type SidebarProps = React.HTMLAttributes<HTMLElement> & {
  collapsible?: 'offcanvas' | 'icon' | 'none'
  variant?: 'sidebar' | 'floating' | 'inset'
}

export function Sidebar({ className, collapsible = 'icon', variant = 'sidebar', ...props }: SidebarProps) {
  const { collapsed, mobileOpen } = useSidebar()
  return <aside className={cn('uds-sidebar', className)} data-collapsed={collapsible !== 'none' && collapsed ? '' : undefined} data-collapsible={collapsible} data-mobile-open={mobileOpen ? '' : undefined} data-variant={variant} {...props} />
}

export type SidebarTriggerProps = Omit<React.ComponentProps<typeof Button>, 'aria-label'> & {
  collapseLabel: string
  expandLabel: string
  'aria-label'?: string
}

export function SidebarTrigger({ className, collapseLabel, expandLabel, onClick, ...props }: SidebarTriggerProps) {
  const { collapsed, isMobile, mobileOpen, toggle } = useSidebar()
  const expanded = isMobile ? mobileOpen : !collapsed
  return (
    <Button
      aria-expanded={expanded}
      aria-label={props['aria-label'] ?? (expanded ? collapseLabel : expandLabel)}
      className={cn('uds-sidebar-trigger', className)}
      onClick={(event) => { toggle(); onClick?.(event) }}
      size="icon"
      variant="ghost"
      {...props}
    >
      <PanelLeft aria-hidden="true" />
    </Button>
  )
}

export function SidebarRail({ className, label, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  const { toggle } = useSidebar()
  return <button aria-label={label} className={cn('uds-sidebar-rail', className)} onClick={(event) => { toggle(); onClick?.(event) }} type="button" {...props} />
}

export function SidebarOverlay({ className, label, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  const { isMobile, mobileOpen, setMobileOpen } = useSidebar()
  if (!isMobile || !mobileOpen) return null
  return <button aria-label={label} className={cn('uds-sidebar-overlay', className)} onClick={(event) => { setMobileOpen(false); onClick?.(event) }} type="button" {...props} />
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('uds-sidebar-header', className)} {...props} /> }
export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('uds-sidebar-content', className)} {...props} /> }
export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('uds-sidebar-footer', className)} {...props} /> }
export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <section className={cn('uds-sidebar-group', className)} {...props} /> }
export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 className={cn('uds-sidebar-group-label', className)} {...props} /> }
export function SidebarGroupAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn('uds-sidebar-group-action', className)} type="button" {...props} /> }
export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) { return <ul className={cn('uds-sidebar-menu', className)} {...props} /> }
export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) { return <li className={cn('uds-sidebar-menu-item', className)} {...props} /> }

export type SidebarMenuActiveVariant = 'background' | 'indicator' | 'both'

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  activeVariant?: SidebarMenuActiveVariant
  isActive?: boolean
  tooltip?: string
}

export function SidebarMenuButton({
  activeVariant = 'background',
  children,
  className,
  isActive,
  tooltip,
  type = 'button',
  ...props
}: SidebarMenuButtonProps) {
  return (
    <button
      {...props}
      aria-current={props['aria-current'] ?? (isActive ? 'page' : undefined)}
      aria-label={props['aria-label'] ?? tooltip}
      className={cn('uds-sidebar-menu-button', className)}
      data-active={isActive ? '' : undefined}
      data-active-variant={activeVariant}
      data-tooltip={tooltip}
      type={type}
    >
      {children}
    </button>
  )
}
export function SidebarMenuAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn('uds-sidebar-menu-action', className)} type="button" {...props} /> }
export function SidebarMenuBadge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn('uds-sidebar-menu-badge', className)} {...props} /> }
export function SidebarMenuSub({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) { return <ul className={cn('uds-sidebar-menu-sub', className)} {...props} /> }
export function SidebarMenuSubItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) { return <li className={cn('uds-sidebar-menu-sub-item', className)} {...props} /> }
export function SidebarMenuSubButton({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) { return <a className={cn('uds-sidebar-menu-sub-button', className)} {...props} /> }
export function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLElement>) { return <main className={cn('uds-sidebar-inset', className)} {...props} /> }
