import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const manifestPath = path.join(root, 'packages/design-system/src/manifests/components.json')
const catalogPath = path.join(root, 'packages/design-system/src/manifests/catalog.json')
const detailPagePath = path.join(root, 'src/pages/ComponentDetailPage.tsx')
const coreCssPath = path.join(root, 'packages/design-system/src/core.css')
const defaultThemePath = path.join(root, 'packages/design-system/src/themes/utopia-default.css')

const expectedComponents = [
  'Accordion',
  'Account Status',
  'Alert',
  'Alert Dialog',
  'Aspect Ratio',
  'Attachment',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Breadcrumb Item',
  'Breadcrumbs',
  'Bubble',
  'Button',
  'Button Group',
  'Calendar',
  'Card',
  'Carousel',
  'Chart',
  'Chat Composer',
  'Chat Composer Drawer',
  'Chat Composer Input',
  'Chat Composer Token Element',
  'Chat Dictation Button',
  'Chat Layout',
  'Chat Layout Scroll Button',
  'Chat Message',
  'Chat Message Bubble',
  'Chat Message List',
  'Chat Message Metadata',
  'Chat Send Button',
  'Chat System Message',
  'Chat Tokenized Text',
  'Chat Tool Calls',
  'Checkbox',
  'Collapsible',
  'Combobox',
  'Command',
  'Context Menu',
  'Data Table',
  'Date Picker',
  'Dialog',
  'Direction',
  'Drawer',
  'Dropdown Menu',
  'Empty',
  'Field',
  'Hover Card',
  'Icon Button',
  'Input',
  'Input Group',
  'Input OTP',
  'Item',
  'Kbd',
  'Label',
  'Menubar',
  'Mobile Nav',
  'Mobile Nav Toggle',
  'Native Select',
  'Nav Heading Menu',
  'Nav Icon',
  'Navigation Menu',
  'Pagination',
  'Popover',
  'Progress',
  'Radio Group',
  'Resizable',
  'Scroll Area',
  'Select',
  'Separator',
  'Sheet',
  'Sidebar',
  'Side Nav',
  'Side Nav Collapse Button',
  'Side Nav Heading',
  'Side Nav Item',
  'Side Nav Section',
  'Skeleton',
  'Slider',
  'Sonner',
  'Spinner',
  'Switch',
  'Table',
  'Tabs',
  'Textarea',
  'Toast',
  'Toggle Button',
  'Toggle Button Group',
  'Tooltip',
  'Top Nav',
  'Top Nav Heading',
  'Top Nav Item',
  'Top Nav Mega Menu',
  'Top Nav Mega Menu Featured Card',
  'Top Nav Mega Menu Item',
  'Top Nav Menu',
  'Typography'
]

const removedPublicComponents = [
  'App Shell',
  'Code Block',
  'Progress Bar',
  'Text Input',
  'Text Area',
  'Tree List',
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function fail(message) {
  failures.push(message)
}

function sameSet(actual, expected, label) {
  const actualSet = new Set(actual)
  const expectedSet = new Set(expected)
  const missing = expected.filter((item) => !actualSet.has(item))
  const extra = actual.filter((item) => !expectedSet.has(item))

  if (missing.length) fail(`${label} missing: ${missing.join(', ')}`)
  if (extra.length) fail(`${label} extra: ${extra.join(', ')}`)
}

const failures = []
const componentsManifest = readJson(manifestPath)
const catalog = readJson(catalogPath)
const detailPage = fs.readFileSync(detailPagePath, 'utf8')
const componentSourcePaths = [...new Set(componentsManifest.components.map((component) => path.join(root, component.sourcePath)))]
const missingSourcePaths = componentSourcePaths.filter((filePath) => !fs.existsSync(filePath))
for (const filePath of missingSourcePaths) fail(`missing component source: ${path.relative(root, filePath)}`)
const componentSources = componentSourcePaths
  .filter((filePath) => fs.existsSync(filePath))
  .map((filePath) => fs.readFileSync(filePath, 'utf8'))
  .join('\n')
const tokenContract = `${fs.readFileSync(coreCssPath, 'utf8')}\n${fs.readFileSync(defaultThemePath, 'utf8')}`
const declaredTokens = new Set([...tokenContract.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((match) => match[1]))

const manifestNames = componentsManifest.components.map((component) => component.name)
sameSet(manifestNames, expectedComponents, 'components.json')

const componentArea = catalog.topLevelAreas.find((area) => area.id === 'components')
if (!componentArea) {
  fail('catalog is missing components area')
} else {
  if (componentArea.groups.some((group) => group.label === 'New Components')) {
    fail('catalog must not expose a separate New Components group')
  }

  const catalogItems = componentArea.groups.flatMap((group) => group.items)
  sameSet(catalogItems, expectedComponents, 'catalog components area')

  for (const removed of removedPublicComponents) {
    if (catalogItems.includes(removed)) fail(`catalog still exposes removed component: ${removed}`)
  }
}

for (const component of componentsManifest.components) {
  if (!['available', 'legacy'].includes(component.status)) fail(`${component.name}: status must be available or legacy`)
  if (component.status === 'legacy' && !component.replacement) fail(`${component.name}: legacy components must name a replacement`)
  if (!component.packageImport?.includes('@utopia-studio-design/design-system/')) {
    fail(`${component.name}: packageImport must use the design-system package`)
  }
  if (!component.sourcePath?.startsWith('packages/design-system/src/')) {
    fail(`${component.name}: sourcePath must stay inside packages/design-system/src`)
  }
  if (!component.shadcnFoundation?.length) fail(`${component.name}: missing shadcnFoundation`)
  if (!component.fallbackToShadcn?.length) fail(`${component.name}: missing fallbackToShadcn`)
  if (!component.requiredTokens?.length) fail(`${component.name}: missing requiredTokens`)
  for (const token of component.requiredTokens ?? []) {
    if (!declaredTokens.has(token)) fail(`${component.name}: required token is not declared by core or Utopia Default: ${token}`)
  }
  if (!component.useWhen?.length) fail(`${component.name}: missing useWhen`)
  if (!component.avoidWhen?.length) fail(`${component.name}: missing avoidWhen`)
  if (!component.neverInvent?.some((rule) => rule.includes('Left/right-only'))) {
    fail(`${component.name}: neverInvent must include left/right-only layout rule`)
  }
  if (!component.neverInvent?.some((rule) => rule.includes('Utopia brand primitives'))) {
    fail(`${component.name}: neverInvent must include Utopia brand primitive rule`)
  }
}

for (const forbiddenText of [
  'Close sheet',
  'Expand sidebar',
  'Collapse sidebar',
  'aria-label="Loading"',
  'aria-label="Breadcrumb"',
  'aria-label="Pagination"',
  'More pages',
  'Send message',
  'Start dictation',
  'Search navigation',
  'Toggle section',
  'tool calls`',
  '`Digit ${index + 1}`',
  "name ?? 'Attachment'",
]) {
  if (componentSources.includes(forbiddenText)) {
    fail(`package components must receive localized accessibility text from consumers: ${forbiddenText}`)
  }
}

if (/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(componentSources)) {
  fail('package component source contains raw color values; use semantic tokens')
}

for (const component of componentsManifest.components) {
  const subpath = component.packageImport.match(/@utopia-studio-design\/design-system\/([^'\"]+)/)?.[1]
  if (!subpath) continue
  const entryPath = path.join(root, 'packages/design-system/src', `${subpath}.ts`)
  const entryTsxPath = path.join(root, 'packages/design-system/src', `${subpath}.tsx`)
  if (!fs.existsSync(entryPath) && !fs.existsSync(entryTsxPath)) {
    fail(`${component.name}: package import subpath has no public entry file: ${subpath}`)
  }
}

const localizationContracts = {
  Breadcrumb: ['aria-label'],
  'Chat Dictation Button': ['accessibilityText'],
  'Chat Layout Scroll Button': ['accessibilityText'],
  'Chat Send Button': ['accessibilityText'],
  'Chat Tool Calls': ['accessibilityText'],
  'Date Picker': ['label', 'placeholder'],
  Pagination: ['aria-label', 'PaginationPrevious.text', 'PaginationNext.text', 'PaginationEllipsis.label'],
  Spinner: ['label', 'aria-label'],
  'Input OTP': ['aria-label', 'getSlotLabel'],
}

for (const [name, props] of Object.entries(localizationContracts)) {
  const component = componentsManifest.components.find((item) => item.name === name)
  for (const prop of props) {
    if (!component?.ai?.props?.[prop]) fail(`${name}: AI contract must document localized prop ${prop}`)
  }
}

const toastComponent = componentsManifest.components.find((component) => component.name === 'Toast')
if (toastComponent?.status !== 'legacy' || toastComponent?.replacement !== 'Sonner') {
  fail('Toast must be legacy and name Sonner as its replacement')
}

if (!detailPage.includes("import { Toaster, toast }")) {
  fail('Sonner copy-paste usage must use Toaster + toast')
}

for (const requiredText of [
  'AI-readable',
  'Arabic-friendly',
  'dir="rtl"',
  '--font-arabic',
  'npm run ds -- component',
]) {
  if (!detailPage.includes(requiredText)) fail(`ComponentDetailPage missing contract text: ${requiredText}`)
}

if (failures.length) {
  console.error(`Component QA audit failed (${failures.length})`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

if (process.argv.includes('--verbose')) {
  for (const component of componentsManifest.components) {
    console.log(`PASS ${component.name} | ${component.status} | ${component.fallbackToShadcn} | ${component.sourcePath}`)
  }
}

console.log(`Component QA audit passed (${expectedComponents.length} components)`)
