import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const manifestPath = path.join(root, 'packages/design-system/src/manifests/components.json')
const catalogPath = path.join(root, 'packages/design-system/src/manifests/catalog.json')
const detailPagePath = path.join(root, 'src/pages/ComponentDetailPage.tsx')

const expectedComponents = [
  'Attachment',
  'Bubble',
  'Marker',
  'Message',
  'Message Scroller',
  'Accordion',
  'Alert',
  'Alert Dialog',
  'Aspect Ratio',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Button Group',
  'Calendar',
  'Card',
  'Carousel',
  'Chart',
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
  'Input',
  'Input Group',
  'Input OTP',
  'Item',
  'Kbd',
  'Label',
  'Menubar',
  'Native Select',
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
  'Skeleton',
  'Slider',
  'Sonner',
  'Spinner',
  'Switch',
  'Table',
  'Tabs',
  'Textarea',
  'Toast',
  'Toggle',
  'Toggle Group',
  'Tooltip',
  'Typography',
]

const removedPublicComponents = [
  'App Shell',
  'Code Block',
  'Icon Button',
  'Progress Bar',
  'Side Nav',
  'Text Input',
  'Text Area',
  'Top Nav',
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
  if (component.status !== 'available') fail(`${component.name}: status must be available`)
  if (!component.packageImport?.includes('@utopia-studio-design/design-system/')) {
    fail(`${component.name}: packageImport must use the design-system package`)
  }
  if (!component.sourcePath?.startsWith('packages/design-system/src/')) {
    fail(`${component.name}: sourcePath must stay inside packages/design-system/src`)
  }
  if (!component.shadcnFoundation?.length) fail(`${component.name}: missing shadcnFoundation`)
  if (!component.requiredTokens?.length) fail(`${component.name}: missing requiredTokens`)
  if (!component.useWhen?.length) fail(`${component.name}: missing useWhen`)
  if (!component.avoidWhen?.length) fail(`${component.name}: missing avoidWhen`)
  if (!component.neverInvent?.some((rule) => rule.includes('Left/right-only'))) {
    fail(`${component.name}: neverInvent must include left/right-only layout rule`)
  }
  if (!component.neverInvent?.some((rule) => rule.includes('Utopia brand primitives'))) {
    fail(`${component.name}: neverInvent must include Utopia brand primitive rule`)
  }
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

console.log(`Component QA audit passed (${expectedComponents.length} components)`)
