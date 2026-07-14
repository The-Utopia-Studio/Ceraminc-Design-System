import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspaceRoot = resolve(packageRoot, '../..')
const packagedDataRoot = join(packageRoot, 'data')
const hasWorkspaceSource = existsSync(join(workspaceRoot, 'packages/design-system/src/manifests/components.json'))

export const apiVersion = 1
export const cliVersion = '0.2.0'

export function paths(root = hasWorkspaceSource ? workspaceRoot : packagedDataRoot) {
  return {
    root,
    manifests: hasWorkspaceSource && root === workspaceRoot ? join(root, 'packages/design-system/src/manifests') : join(root, 'manifests'),
    docs: hasWorkspaceSource && root === workspaceRoot ? join(root, 'docs/design-system') : join(root, 'docs'),
  }
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function normalize(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function envelope(type, data, meta = {}) {
  return { apiVersion, type, data, meta: { version: cliVersion, ...meta } }
}

export function getCatalog() {
  return readJson(join(paths().manifests, 'catalog.json'))
}

export function listComponents() {
  return [...readJson(join(paths().manifests, 'components.json')).components]
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }))
}

export function getComponent(name) {
  const key = normalize(name)
  return listComponents().find((item) => normalize(item.name) === key) ?? null
}

export function listTemplates() {
  return readJson(join(paths().manifests, 'templates.json')).templates
}

export function getTemplate(name) {
  const key = normalize(name)
  return listTemplates().find((item) => normalize(item.id) === key || normalize(item.title) === key) ?? null
}

export function listThemes() {
  return readJson(join(paths().manifests, 'themes.json')).themes
}

export function getTheme(name) {
  const key = normalize(name)
  const entry = listThemes().find((item) => normalize(item.id) === key || normalize(item.name) === key)
  if (!entry) return null
  const policyPath = hasWorkspaceSource
    ? join(workspaceRoot, entry.policyManifest)
    : join(paths().manifests, entry.policyManifest.split('/').at(-1))
  return { ...entry, policy: readJson(policyPath) }
}

export function listDocs() {
  return readdirSync(paths().docs)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.slice(0, -3))
    .sort()
}

export function getDoc(topic) {
  const match = listDocs().find((name) => normalize(name) === normalize(topic))
  if (!match) return null
  return { topic: match, content: readFileSync(join(paths().docs, `${match}.md`), 'utf8') }
}

export function search(query) {
  const terms = String(query).toLowerCase().split(/\s+/).filter(Boolean)
  const score = (text) => terms.reduce((total, term) => total + (text.toLowerCase().includes(term) ? 1 : 0), 0)
  const results = [
    ...listComponents().map((item) => ({ kind: 'component', id: item.name, title: item.name, summary: [...item.useWhen, item.category].join(' '), item })),
    ...listTemplates().map((item) => ({ kind: 'template', id: item.id, title: item.title, summary: `${item.category} ${item.purpose}`, item })),
    ...listThemes().map((item) => ({ kind: 'theme', id: item.id, title: item.name, summary: item.role, item })),
    ...listDocs().map((topic) => ({ kind: 'docs', id: topic, title: topic, summary: getDoc(topic)?.content.slice(0, 500) ?? '', item: { topic } })),
  ]
  return results
    .map((result) => ({ ...result, score: score(`${result.title} ${result.summary}`) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .map(({ summary: _summary, ...result }) => result)
}

export function capabilityManifest() {
  return {
    name: 'utopia-ds',
    version: cliVersion,
    description: 'Ceramic Design System interface for humans, agents, build tools, and MCP clients.',
    transports: ['cli', 'json', 'mcp-stdio', 'programmatic-api'],
    globalOptions: [
      { flag: '--json', type: 'boolean', description: 'Return a typed JSON envelope.' },
      { flag: '--dense', type: 'boolean', description: 'Return compact agent-readable text.' },
    ],
    commands: [
      { name: 'init', args: ['[directory]'], flags: ['--yes', '--theme <id>'], responseType: 'init-result' },
      { name: 'search', args: ['<query>'], flags: [], responseType: 'search-results' },
      { name: 'component', args: ['<name>|--list'], flags: [], responseType: 'component|component-list' },
      { name: 'template', args: ['<id>|--list'], flags: ['--skeleton', '--copy <directory>', '--theme <id>', '--force'], responseType: 'template|template-list|template-copy-result' },
      { name: 'theme', args: ['<id>|--list', 'create <id> [directory]'], flags: ['--force'], responseType: 'theme|theme-list|theme-create-result' },
      { name: 'docs', args: ['<topic>|--list'], flags: [], responseType: 'docs|docs-list' },
      { name: 'manifest', args: [], flags: [], responseType: 'manifest' },
      { name: 'doctor', args: [], flags: [], responseType: 'doctor-result' },
      { name: 'mcp', args: [], flags: [], responseType: 'stdio-server' },
    ],
    mcp: {
      command: 'npx',
      args: ['-y', '@utopia-studio-design/design-system-cli', 'mcp'],
      tools: ['search', 'list_components', 'get_component', 'list_templates', 'get_template', 'list_themes', 'get_theme', 'list_docs', 'get_docs', 'doctor'],
    },
  }
}

export function repositoryDoctor() {
  const required = [
    'catalog.json', 'components.json', 'templates.json', 'themes.json',
  ].map((name) => join(paths().manifests, name))
  const docs = ['quick-start-ai', 'arabic-friendly', 'theme-authoring'].map((name) => join(paths().docs, `${name}.md`))
  const missing = [...required, ...docs].filter((path) => !existsSync(path))
  return {
    ok: missing.length === 0,
    checks: {
      manifests: required.every(existsSync),
      docs: docs.every(existsSync),
      components: listComponents().length,
      templates: listTemplates().length,
      themes: listThemes().length,
      mcp: existsSync(join(packageRoot, 'bin/utopia-ds-mcp.mjs')),
    },
    missing,
  }
}
