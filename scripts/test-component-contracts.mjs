import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ChatSystemMessage } from '../packages/design-system/dist/Chat.mjs'
import { UtopiaWordmarkLoader } from '../packages/design-system/dist/UtopiaWordmarkLoader.mjs'

process.env.NODE_ENV = 'development'
const {
  NativeSelect,
  NativeSelectOption,
  Select,
  SelectTrigger,
  SelectValue,
  Selector,
} = await import('../packages/design-system/dist/Forms.mjs')
const rootExports = await import('../packages/design-system/dist/index.mjs')
const shadcnExports = await import('../packages/design-system/dist/ShadcnPrimitives.mjs')
const navigationExports = await import('../packages/design-system/dist/Navigation.mjs')
const sidebarExports = await import('../packages/design-system/dist/Sidebar.mjs')

function renderChatSystemMessage(props, children) {
  return renderToStaticMarkup(React.createElement(ChatSystemMessage, props, children))
}

const combined = renderChatSystemMessage({ label: 'Today' }, 'Conversation resolved')

assert.match(
  combined,
  /class="uds-chat-system-message-content">.*class="uds-chat-system-message-label">Today<\/span>.*class="uds-chat-system-message-body">Conversation resolved<\/span>.*<\/span>/,
  'label + children must share one center wrapper between the separators',
)

const labelOnly = renderChatSystemMessage({ label: 'Today' })
assert.match(labelOnly, /class="uds-chat-system-message-content"><span class="uds-chat-system-message-label">Today<\/span><\/span>/)
assert.doesNotMatch(labelOnly, /uds-chat-system-message-body/)

const childrenOnly = renderChatSystemMessage({}, 'Conversation resolved')
assert.match(childrenOnly, /class="uds-chat-system-message-content"><span class="uds-chat-system-message-body">Conversation resolved<\/span><\/span>/)
assert.doesNotMatch(childrenOnly, /uds-chat-system-message-label/)

const brandedLoader = renderToStaticMarkup(React.createElement(UtopiaWordmarkLoader, {
  fullscreen: false,
  label: 'Loading workspace',
  phase: 'intro',
  size: 'sm',
}))
assert.match(brandedLoader, /role="status"/)
assert.match(brandedLoader, /aria-busy="true"/)
assert.match(brandedLoader, /data-fullscreen="false"/)
assert.match(brandedLoader, /data-size="sm"/)
assert.match(brandedLoader, />Loading workspace<\/span>/)
assert.match(brandedLoader, /viewBox="0 0 364\.9 236\.9"/)

const nativeSelect = renderToStaticMarkup(React.createElement(
  NativeSelect,
  { 'aria-label': 'Disposition', defaultValue: 'open' },
  React.createElement(NativeSelectOption, { value: 'open' }, 'Open'),
))
assert.match(nativeSelect, /class="uds-native-select"/)
assert.match(nativeSelect, /class="uds-native-select-control"/)
assert.match(nativeSelect, /<option value="open" selected="">Open<\/option>/)
assert.equal(rootExports.NativeSelect, NativeSelect, 'root NativeSelect export must use the canonical Forms implementation')
assert.equal(shadcnExports.NativeSelect, NativeSelect, 'legacy ShadcnPrimitives path must remain a compatible re-export')

const deprecationWarnings = []
const originalWarn = console.warn
console.warn = (message) => deprecationWarnings.push(String(message))
try {
  renderToStaticMarkup(React.createElement(Selector, { 'aria-label': 'Legacy selector' }))
  renderToStaticMarkup(React.createElement(Selector, { 'aria-label': 'Legacy selector again' }))
} finally {
  console.warn = originalWarn
}
assert.equal(deprecationWarnings.length, 1, 'Selector deprecation warning must appear only once in development')
assert.match(deprecationWarnings[0], /Selector is deprecated/)
assert.match(deprecationWarnings[0], /NativeSelect/)
assert.match(deprecationWarnings[0], /SelectTrigger, SelectContent, and SelectItem/)

const themeableSelect = renderToStaticMarkup(React.createElement(
  Select,
  { defaultValue: 'default' },
  React.createElement(
    SelectTrigger,
    { 'aria-label': 'Theme' },
    React.createElement(SelectValue, null),
  ),
))
assert.match(themeableSelect, /<svg[^>]*class="lucide lucide-chevron-down uds-select-trigger-icon"/)
assert.match(themeableSelect, /aria-hidden="true"/)
assert.doesNotMatch(themeableSelect, />⌄</)

const inverseBreadcrumb = renderToStaticMarkup(React.createElement(
  navigationExports.Breadcrumb,
  { 'aria-label': 'Current location', variant: 'inverse' },
  React.createElement(
    navigationExports.BreadcrumbList,
    null,
    React.createElement(navigationExports.BreadcrumbItem, null,
      React.createElement(navigationExports.BreadcrumbLink, { href: '/' }, 'Home')),
    React.createElement(navigationExports.BreadcrumbSeparator),
    React.createElement(navigationExports.BreadcrumbItem, null,
      React.createElement(navigationExports.BreadcrumbPage, null, 'Projects')),
  ),
))
assert.match(inverseBreadcrumb, /class="uds-breadcrumb" data-variant="inverse"/)
assert.match(inverseBreadcrumb, /aria-current="page"/)

const activeSidebarItem = renderToStaticMarkup(React.createElement(
  sidebarExports.SidebarMenuButton,
  { activeVariant: 'both', isActive: true, tooltip: 'Projects' },
  React.createElement(navigationExports.NavigationIcon, { name: 'projects' }),
  React.createElement('span', null, 'Projects'),
))
assert.match(activeSidebarItem, /aria-current="page"/)
assert.match(activeSidebarItem, /aria-label="Projects"/)
assert.match(activeSidebarItem, /data-active=""/)
assert.match(activeSidebarItem, /data-active-variant="both"/)
assert.match(activeSidebarItem, /class="lucide lucide-folder-kanban uds-navigation-icon"/)
assert.match(activeSidebarItem, /aria-hidden="true"/)

const designSystemCss = await readFile(new URL('../packages/design-system/src/core.css', import.meta.url), 'utf8')
assert.doesNotMatch(designSystemCss, /var\(--font-size-xs\)/, 'Sidebar typography must resolve from a shipped token')
assert.match(designSystemCss, /\.uds-breadcrumb\[data-variant=['"]inverse['"]\]/)
assert.match(designSystemCss, /inset-inline-start:\s*0/, 'Sidebar active indicator must use logical inline positioning')

console.log('Component contract tests passed')
