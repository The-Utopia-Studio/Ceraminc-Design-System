import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Command as CommandPrimitive } from 'cmdk'
import { motion, useReducedMotion } from 'framer-motion'
import { Button, type ButtonProps } from './Button'
import { cn } from '../lib/utils'

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={cn('uds-breadcrumb', className)} {...props} />
}

export function BreadcrumbList({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return <ol className={cn('uds-breadcrumb-list', className)} {...props} />
}

export function BreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('uds-breadcrumb-item', className)} {...props} />
}

export function BreadcrumbLink({ className, ...props }: AnchorProps) {
  return <a className={cn('uds-breadcrumb-link', className)} {...props} />
}

export function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-current="page" className={cn('uds-breadcrumb-page', className)} {...props} />
}

export function BreadcrumbSeparator({ className, children = '/', ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li aria-hidden="true" className={cn('uds-breadcrumb-separator', className)} {...props}>{children}</li>
}

export const Breadcrumbs = BreadcrumbList

export function TopNav({ children, className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root className={cn('uds-top-nav-root', className)} {...props}>
      <NavigationMenuPrimitive.List className="uds-top-nav">
        {children}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  )
}

export interface TopNavHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  label?: React.ReactNode
  meta?: React.ReactNode
  subtitle?: React.ReactNode
}

export function TopNavHeading({
  children,
  className,
  icon,
  label,
  meta,
  subtitle,
  ...props
}: TopNavHeadingProps) {
  return (
    <div className={cn('uds-top-nav-heading', className)} {...props}>
      {icon ? <span className="uds-top-nav-heading-icon" data-slot="icon">{icon}</span> : null}
      <span className="uds-top-nav-heading-copy" data-slot="copy">
        {meta ? <span className="uds-top-nav-heading-meta" data-slot="meta">{meta}</span> : null}
        <span className="uds-top-nav-heading-label" data-slot="label">{label ?? children}</span>
        {subtitle ? <span className="uds-top-nav-heading-subtitle" data-slot="subtitle">{subtitle}</span> : null}
      </span>
    </div>
  )
}

export interface TopNavItemProps extends AnchorProps {
  isCurrent?: boolean
}

export function TopNavItem({ className, isCurrent = false, ...props }: TopNavItemProps) {
  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Link asChild>
        <a
          aria-current={isCurrent ? 'page' : props['aria-current']}
          className={cn('uds-top-nav-item', className)}
          data-state={isCurrent ? 'current' : undefined}
          {...props}
        />
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

export interface TopNavMegaMenuProps extends React.ComponentProps<typeof NavigationMenuPrimitive.Item> {
  align?: 'start' | 'end'
  label: React.ReactNode
}

export function TopNavMegaMenu({ align = 'start', children, className, label, ...props }: TopNavMegaMenuProps) {
  return (
    <NavigationMenuPrimitive.Item className={cn('uds-top-nav-menu', className)} {...props}>
      <NavigationMenuPrimitive.Trigger className="uds-top-nav-item">{label}</NavigationMenuPrimitive.Trigger>
      <NavigationMenuPrimitive.Content className="uds-top-nav-mega-menu" data-align={align === 'end' ? 'end' : undefined}>
        {children}
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Item>
  )
}

export interface TopNavMegaMenuFeaturedCardProps extends Omit<AnchorProps, 'title'> {
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  icon?: React.ReactNode
  title?: React.ReactNode
}

export function TopNavMegaMenuFeaturedCard({
  children,
  className,
  description,
  eyebrow,
  icon,
  title,
  ...props
}: TopNavMegaMenuFeaturedCardProps) {
  return (
    <a className={cn('uds-top-nav-mega-featured-card', className)} {...props}>
      {icon ? <span className="uds-top-nav-mega-featured-icon" data-slot="icon">{icon}</span> : null}
      <span className="uds-top-nav-mega-featured-copy" data-slot="copy">
        {eyebrow ? <span className="uds-top-nav-mega-featured-eyebrow">{eyebrow}</span> : null}
        <span className="uds-top-nav-mega-featured-title">{title ?? children}</span>
        {description ? <span className="uds-top-nav-mega-featured-description">{description}</span> : null}
      </span>
    </a>
  )
}

export interface TopNavMegaMenuItemProps extends Omit<AnchorProps, 'title'> {
  description?: React.ReactNode
  icon?: React.ReactNode
  title?: React.ReactNode
}

export function TopNavMegaMenuItem({
  children,
  className,
  description,
  icon,
  title,
  ...props
}: TopNavMegaMenuItemProps) {
  return (
    <a className={cn('uds-top-nav-mega-menu-item', className)} {...props}>
      {icon ? <span className="uds-top-nav-mega-menu-item-icon" data-slot="icon">{icon}</span> : null}
      <span className="uds-top-nav-mega-menu-item-copy" data-slot="copy">
        <span className="uds-top-nav-mega-menu-item-title">{title ?? children}</span>
        {description ? <span className="uds-top-nav-mega-menu-item-description">{description}</span> : null}
      </span>
    </a>
  )
}

export function TopNavMenuItem({ className, ...props }: AnchorProps) {
  return <a className={cn('uds-menu-item', className)} {...props} />
}

export interface NavIconProps extends Omit<ButtonProps, 'isIconOnly' | 'size'> {
  active?: boolean
}

export function NavIcon({ active = false, className, type = 'button', variant = 'ghost', ...props }: NavIconProps) {
  return (
    <Button
      className={cn('uds-nav-icon', className)}
      data-state={active ? 'active' : undefined}
      isIconOnly
      size="icon"
      type={type}
      variant={variant}
      {...props}
    />
  )
}

export interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean
  density?: 'default' | 'compact'
  heading?: React.ReactNode
  search?: React.ReactNode
}

export function SideNav({
  children,
  className,
  collapsed = false,
  density = 'default',
  heading,
  search,
  ...props
}: SideNavProps) {
  return (
    <nav
      className={cn('uds-side-nav', className)}
      data-collapsed={collapsed ? 'true' : undefined}
      data-density={density === 'compact' ? 'compact' : undefined}
      {...props}
    >
      {heading}
      {search}
      {children}
    </nav>
  )
}

export function SideNavContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-side-nav-content', className)} {...props} />
}

export interface SideNavSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  className?: string
  inputClassName?: string
  label?: string
}

export function SideNavSearch({
  className,
  inputClassName,
  label = 'Search navigation',
  type = 'search',
  ...props
}: SideNavSearchProps) {
  return (
    <label className={cn('uds-side-nav-search', className)}>
      <span>{label}</span>
      <input className={cn('uds-side-nav-search-input', inputClassName)} type={type} {...props} />
    </label>
  )
}

export function SideNavNestedGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-side-nav-nested-group', className)} {...props} />
}

export function SideNavNestedItems({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('uds-side-nav-nested-items', className)} {...props} />
}

export interface SideNavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsedLabel?: string
  collapsible?: boolean
  defaultExpanded?: boolean
  expanded?: boolean
  label?: React.ReactNode
  onExpandedChange?: (expanded: boolean) => void
  variant?: 'section' | 'nested'
}

export function SideNavSection({
  children,
  className,
  collapsedLabel = 'Toggle section',
  collapsible = false,
  defaultExpanded = true,
  expanded,
  label,
  onExpandedChange,
  variant = 'section',
  ...props
}: SideNavSectionProps) {
  const contentId = React.useId()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const [contentSize, setContentSize] = React.useState(0)
  const isExpanded = expanded ?? uncontrolledExpanded
  const resolvedExpanded = collapsible ? isExpanded : true

  React.useEffect(() => {
    if (expanded === undefined && defaultExpanded) setUncontrolledExpanded(true)
  }, [defaultExpanded, expanded])

  React.useLayoutEffect(() => {
    const node = contentRef.current
    if (!node) return undefined

    const updateContentSize = () => setContentSize(node.scrollHeight)
    updateContentSize()

    const observer = new ResizeObserver(updateContentSize)
    observer.observe(node)

    return () => observer.disconnect()
  }, [children])

  const handleToggle = () => {
    const nextExpanded = !resolvedExpanded
    if (expanded === undefined) setUncontrolledExpanded(nextExpanded)
    onExpandedChange?.(nextExpanded)
  }

  return (
    <div
      className={cn('uds-side-nav-section', className)}
      data-collapsible={collapsible ? 'true' : undefined}
      data-state={resolvedExpanded ? 'open' : 'closed'}
      data-variant={variant === 'nested' ? 'nested' : undefined}
      {...props}
    >
      {label ? (
        variant === 'nested' ? (
          <motion.button
            aria-controls={collapsible ? contentId : undefined}
            aria-expanded={collapsible ? resolvedExpanded : undefined}
            className="uds-side-nav-nested-trigger"
            onClick={collapsible ? handleToggle : undefined}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
            title={collapsible ? collapsedLabel : undefined}
            type="button"
          >
            <span className="uds-side-nav-item-label">{label}</span>
            {collapsible ? (
              <span aria-hidden="true" className="uds-side-nav-section-toggle">
                ⌄
              </span>
            ) : null}
          </motion.button>
        ) : (
          <SideNavHeading
            aria-controls={collapsible ? contentId : undefined}
            aria-expanded={collapsible ? resolvedExpanded : undefined}
            as={collapsible ? 'button' : undefined}
            className={collapsible ? 'uds-side-nav-section-trigger' : undefined}
            endContent={collapsible ? (
              <span aria-hidden="true" className="uds-side-nav-section-toggle">
                ⌄
              </span>
            ) : undefined}
            onClick={collapsible ? handleToggle : undefined}
            title={collapsible ? collapsedLabel : undefined}
          >
            {label}
          </SideNavHeading>
        )
      ) : null}
      <div
        aria-hidden={!resolvedExpanded}
        className="uds-side-nav-section-content"
        data-motion-state={resolvedExpanded ? 'open' : 'closed'}
        id={contentId}
        inert={resolvedExpanded ? undefined : true}
        ref={contentRef}
        style={{
          '--uds-side-nav-section-content-size': `${contentSize}px`,
          pointerEvents: resolvedExpanded ? 'auto' : 'none',
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}

export interface SideNavHeadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'h2' | 'h3' | 'button'
  endContent?: React.ReactNode
  icon?: React.ReactNode
  label?: React.ReactNode
  mediaSize?: 'mark' | 'wordmark' | 'auto'
  meta?: React.ReactNode
  subtitle?: React.ReactNode
  variant?: 'section' | 'brand'
  version?: React.ReactNode
}

export function SideNavHeading({
  as,
  children,
  className,
  endContent,
  icon,
  label,
  mediaSize = 'mark',
  meta,
  subtitle,
  variant = 'section',
  version,
  ...props
}: SideNavHeadingProps) {
  const Component = as ?? (variant === 'brand' ? 'div' : 'h3')
  const resolvedSubtitle = subtitle ?? version
  const resolvedLabel = label ?? children

  return (
    <Component
      className={cn('uds-side-nav-heading', className)}
      data-media-size={mediaSize === 'mark' ? undefined : mediaSize}
      data-variant={variant}
      type={Component === 'button' ? 'button' : undefined}
      {...props}
    >
      {icon ? <span className="uds-side-nav-heading-icon" data-slot="icon">{icon}</span> : null}
      <span className="uds-side-nav-heading-copy" data-slot="copy">
        {meta ? <span className="uds-side-nav-heading-meta" data-slot="meta">{meta}</span> : null}
        <span className="uds-side-nav-heading-label" data-slot="label">{resolvedLabel}</span>
        {resolvedSubtitle ? <span className="uds-side-nav-heading-subtitle" data-slot="subtitle">{resolvedSubtitle}</span> : null}
      </span>
      {endContent ? <span className="uds-side-nav-heading-end" data-slot="end">{endContent}</span> : null}
    </Component>
  )
}

export interface SideNavItemProps extends AnchorProps {
  badge?: React.ReactNode
  depth?: 0 | 1 | 2 | 3
  endContent?: React.ReactNode
  icon?: React.ReactNode
  isCurrent?: boolean
  isDisabled?: boolean
  label?: React.ReactNode
  startContent?: React.ReactNode
}

export function SideNavItem({
  badge,
  children,
  className,
  depth = 0,
  endContent,
  icon,
  isCurrent = false,
  isDisabled = false,
  label,
  onClick,
  startContent,
  ...props
}: SideNavItemProps) {
  const resolvedCurrent = isCurrent || props['aria-current'] === 'page'

  return (
    <a
      {...props}
      aria-current={resolvedCurrent ? 'page' : props['aria-current']}
      aria-disabled={isDisabled ? true : undefined}
      className={cn('uds-side-nav-item', className)}
      data-depth={depth > 0 ? depth : undefined}
      data-disabled={isDisabled ? 'true' : undefined}
      data-state={resolvedCurrent ? 'current' : undefined}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
      tabIndex={isDisabled ? -1 : props.tabIndex}
    >
      {icon || startContent ? <span className="uds-side-nav-item-start" data-slot="start">{icon ?? startContent}</span> : null}
      <span className="uds-side-nav-item-label">{label ?? children}</span>
      {badge ? <span className="uds-side-nav-item-badge" data-slot="badge">{badge}</span> : null}
      {endContent ? <span className="uds-side-nav-item-end" data-slot="end">{endContent}</span> : null}
    </a>
  )
}

export interface SideNavCollapseButtonProps extends Omit<ButtonProps, 'isIconOnly' | 'size' | 'variant'> {}

export function PanelIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn('uds-panel-icon', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect height="16" rx="4" stroke="currentColor" strokeWidth="1.8" width="16" x="4" y="4" />
      <path d="M11 5v14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

export function SideNavCollapseButton({ className, type = 'button', ...props }: SideNavCollapseButtonProps) {
  return (
    <Button
      className={cn('uds-side-nav-collapse-button', className)}
      isIconOnly
      size="icon"
      type={type}
      variant="ghost"
      {...props}
    />
  )
}

export interface MobileNavProps extends React.ComponentProps<typeof DialogPrimitive.Root> {
  children: React.ReactNode
}

export function MobileNav(props: MobileNavProps) {
  return <DialogPrimitive.Root {...props} />
}

export function MobileNavTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

export interface MobileNavToggleProps extends Omit<ButtonProps, 'isIconOnly' | 'size' | 'variant'> {
  open?: boolean
}

export function MobileNavToggle({ className, open = false, type = 'button', ...props }: MobileNavToggleProps) {
  return (
    <Button
      aria-expanded={open}
      className={cn('uds-mobile-nav-toggle', className)}
      data-state={open ? 'open' : 'closed'}
      isIconOnly
      size="icon"
      type={type}
      variant="ghost"
      {...props}
    />
  )
}

export function MobileNavPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />
}

export function MobileNavOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay className={cn('uds-mobile-nav-overlay', className)} {...props} />
}

export function MobileNavContent({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="uds-mobile-nav-overlay" />
      <DialogPrimitive.Content className={cn('uds-mobile-nav-content', className)} {...props} />
    </DialogPrimitive.Portal>
  )
}

export interface NavHeadingMenuProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Root> {
  children: React.ReactNode
}

export function NavHeadingMenu(props: NavHeadingMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} />
}

export function NavHeadingMenuTrigger(props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger {...props} />
}

export function NavHeadingMenuContent({ align = 'start', className, sideOffset = 8, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content align={align} className={cn('uds-nav-heading-menu-content uds-menu', className)} sideOffset={sideOffset} {...props} />
    </DropdownMenuPrimitive.Portal>
  )
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

export const Sidebar = SideNav
export const SidebarContent = SideNavContent
export const SidebarSection = SideNavSection
export const SidebarHeading = SideNavHeading
export const SidebarItem = SideNavItem
export const SidebarCollapseButton = SideNavCollapseButton

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

export function DropdownMenuGroup(props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group {...props} />
}

export function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return <DropdownMenuPrimitive.Label className={cn('uds-menu-label', className)} {...props} />
}

export function DropdownMenuItem({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return <DropdownMenuPrimitive.Item className={cn('uds-menu-item', className)} {...props} />
}

export function DropdownMenuCheckboxItem({ children, className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem className={cn('uds-menu-item uds-menu-check-item', className)} {...props}>
      <DropdownMenuPrimitive.ItemIndicator className="uds-menu-item-indicator">✓</DropdownMenuPrimitive.ItemIndicator>
      <span className="uds-menu-item-content">{children}</span>
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

export function DropdownMenuRadioGroup(props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup {...props} />
}

export function DropdownMenuRadioItem({ children, className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem className={cn('uds-menu-item uds-menu-check-item', className)} {...props}>
      <DropdownMenuPrimitive.ItemIndicator className="uds-menu-item-indicator">•</DropdownMenuPrimitive.ItemIndicator>
      <span className="uds-menu-item-content">{children}</span>
    </DropdownMenuPrimitive.RadioItem>
  )
}

export function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator className={cn('uds-menu-separator', className)} {...props} />
}

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('uds-menu-shortcut', className)} {...props} />
}

export function DropdownMenuSub(props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub {...props} />
}

export function DropdownMenuSubTrigger({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <DropdownMenuPrimitive.SubTrigger className={cn('uds-menu-item uds-menu-sub-trigger', className)} {...props}>
      <span className="uds-menu-item-content">{children}</span>
      <span aria-hidden="true" className="uds-menu-sub-indicator">›</span>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

export function DropdownMenuSubContent({ className, sideOffset = 8, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent className={cn('uds-menu', className)} sideOffset={sideOffset} {...props} />
    </DropdownMenuPrimitive.Portal>
  )
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
