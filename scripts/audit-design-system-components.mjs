import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const manifestPath = path.join(root, 'packages/design-system/src/manifests/components.json')
const catalogPath = path.join(root, 'packages/design-system/src/manifests/catalog.json')
const templatesPath = path.join(root, 'packages/design-system/src/manifests/templates.json')
const themesPath = path.join(root, 'packages/design-system/src/manifests/themes.json')
const detailPagePath = path.join(root, 'src/pages/ComponentDetailPage.tsx')
const docsPagePath = path.join(root, 'src/pages/DocsPage.tsx')
const arabicFriendlyPagePath = path.join(root, 'src/pages/ArabicFriendlyPage.tsx')
const templatesPagePath = path.join(root, 'src/pages/TemplatesPage.tsx')
const themesPagePath = path.join(root, 'src/pages/ThemesPage.tsx')
const appPath = path.join(root, 'src/App.tsx')
const appStylesPath = path.join(root, 'src/styles.css')
const commandPalettePath = path.join(root, 'src/components/GlobalCommandPalette.tsx')
const workbenchPath = path.join(root, 'src/components/ComponentDetailWorkbench.tsx')
const mcpPlaygroundPath = path.join(root, 'src/pages/McpPlaygroundPage.tsx')
const e2ePath = path.join(root, 'tests/e2e/design-system.spec.ts')
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
const templatesManifest = readJson(templatesPath)
const themesManifest = readJson(themesPath)
const themePolicyPaths = themesManifest.themes.map((theme) => path.join(root, theme.policyManifest))
const themePolicies = themePolicyPaths.map(readJson)
const detailPage = fs.readFileSync(detailPagePath, 'utf8')
const docsPage = fs.readFileSync(docsPagePath, 'utf8')
const arabicFriendlyPage = fs.readFileSync(arabicFriendlyPagePath, 'utf8')
const templatesPage = fs.readFileSync(templatesPagePath, 'utf8')
const themesPage = fs.readFileSync(themesPagePath, 'utf8')
const appSource = fs.readFileSync(appPath, 'utf8')
const appStyles = fs.readFileSync(appStylesPath, 'utf8')
const commandPalette = fs.readFileSync(commandPalettePath, 'utf8')
const workbench = fs.readFileSync(workbenchPath, 'utf8')
const mcpPlayground = fs.readFileSync(mcpPlaygroundPath, 'utf8')
const e2eSuite = fs.readFileSync(e2ePath, 'utf8')
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

if (templatesManifest.templates.length < 1) {
  fail('templates manifest must expose at least one runnable template')
}

for (const template of templatesManifest.templates) {
  if (!template.sourcePath || !template.entryPath || !template.manifestPath || !template.bundlePath) {
    fail(`${template.id}: runnable template must define source, entry, manifest, and bundle paths`)
  }
  for (const sourcePath of [template.sourcePath, template.entryPath, template.manifestPath, template.bundlePath]) {
    if (!fs.existsSync(path.join(root, sourcePath))) fail(`${template.id}: missing runnable source ${sourcePath}`)
  }
  if (!template.pageCount || template.pages?.length !== template.pageCount) {
    fail(`${template.id}: runnable template pageCount must match its page list`)
  }
  if (!template.purpose || !template.starterFor?.length || !template.sections?.length) {
    fail(`${template.id}: template must define purpose, starterFor, and sections`)
  }
  if (!template.requiredComponents?.length || !template.useWhen?.length || !template.avoidWhen?.length) {
    fail(`${template.id}: template must define component and usage contracts`)
  }
  if (!template.translations?.ar?.title || !template.translations?.ar?.purpose || !template.translations?.ar?.sections?.length) {
    fail(`${template.id}: template must include an Arabic title, purpose, and section map`)
  }
  if (template.rtlReady !== true) fail(`${template.id}: template must declare rtlReady`)
}

const defaultTheme = themesManifest.themes.find((theme) => theme.id === 'utopia-default')
if (defaultTheme?.name !== 'The Utopia Studio Default' || defaultTheme?.locked !== true) {
  fail('The Utopia Studio Default must be the named, locked default theme')
}
if (!defaultTheme?.brandAsset?.src || !defaultTheme?.translations?.ar?.description) {
  fail('The Utopia Studio Default must expose its optional brand asset and Arabic description')
}
if (!defaultTheme?.translations?.ar?.principles?.length || !defaultTheme?.translations?.ar?.brandAssetUsage) {
  fail('The Utopia Studio Default must localize its principles and brand asset policy')
}
if (!themesManifest.translations?.ar?.coreBoundary?.doesNotOwn?.length) {
  fail('The theme contract boundary must be available in Arabic')
}

if (themesManifest.plannedThemeSlots.length < 3) {
  fail('theme roadmap must contain populated future slots')
}
for (const slot of themesManifest.plannedThemeSlots) {
  if (!slot.purpose || !slot.audience?.length || !slot.visualDirection || !slot.requiredValidation?.length) {
    fail(`${slot.id}: planned theme slot must define purpose, audience, direction, and validation`)
  }
  if (!slot.translations?.ar?.name || !slot.translations?.ar?.purpose) {
    fail(`${slot.id}: planned theme slot must include Arabic metadata`)
  }
  if (!slot.translations?.ar?.audience?.length || !slot.translations?.ar?.requiredValidation?.length) {
    fail(`${slot.id}: planned theme slot must localize audience and validation metadata`)
  }
}

for (const policy of themePolicies) {
  if (!policy.translations?.ar?.summary || !policy.translations?.ar?.iconPolicy?.description || !policy.translations?.ar?.iconPolicy?.allow?.length) {
    fail(`${policy.id}: theme policy summary and icon contract must be available in Arabic`)
  }
}

for (const [label, source] of [
  ['DocsPage', docsPage],
  ['ArabicFriendlyPage', arabicFriendlyPage],
  ['TemplatesPage', templatesPage],
  ['ThemesPage', themesPage],
]) {
  if (!source.includes('useI18n')) fail(`${label} must render from the shared locale contract`)
}

const docsSources = `${docsPage}\n${arabicFriendlyPage}\n${templatesPage}\n${themesPage}\n${detailPage}`
if (docsSources.includes('#/docs/foundations/arabic-friendly')) {
  fail('Arabic Friendly links must use the canonical guide route')
}
if (detailPage.includes("style={{ cursor: 'pointer', padding: '0 4px' }}")) {
  fail('Breadcrumb docs must use BreadcrumbEllipsis instead of a local styled mock')
}

if (docsPage.includes('"args": ["-y", "@utopia-studio-design/design-system-cli", "mcp"]')) {
  fail('Getting Started must use an explicit npm package and utopia-ds executable for MCP')
}
if (docsPage.includes('apps/example-nextjs') || docsPage.includes('apps/example-vite') || docsPage.includes('rules/agent.md')) {
  fail('Getting Started must not advertise files or example apps that are not generated')
}
if (!appSource.includes('RouteErrorBoundary') || !appSource.includes('data-mobile-nav-open')) {
  fail('App shell must preserve route recovery and mobile navigation')
}
if (appStyles.includes('transition: grid-template-columns')) {
  fail('App shell must not animate grid-template-columns')
}
if (!appStyles.includes('.skip-link:focus-visible') || !docsPage.includes('onKeyDown={(event) => handlePathKeyDown(event, index)}')) {
  fail('Docs shell must preserve skip navigation and keyboard-operable path tabs')
}
if (!appSource.includes('GlobalCommandPalette') || !commandPalette.includes('themes.requiredSemanticRoles') || !commandPalette.includes('MCP Playground')) {
  fail('Global command palette must index components, semantic tokens, documentation, and MCP')
}
if (!detailPage.includes('ComponentDetailWorkbench') || !workbench.includes('Copy package import') || !workbench.includes('Related components')) {
  fail('Component detail pages must expose the shared workbench contract')
}
if (!mcpPlayground.includes('Package contract verified') || !mcpPlayground.includes('not a live stdio transport')) {
  fail('MCP Playground must distinguish the browser mirror from live stdio transport')
}
for (const e2eContract of ['global command palette', 'mobile navigation', 'documentation tab keys', 'visual baselines']) {
  if (!e2eSuite.includes(e2eContract)) fail(`Playwright suite missing contract: ${e2eContract}`)
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
