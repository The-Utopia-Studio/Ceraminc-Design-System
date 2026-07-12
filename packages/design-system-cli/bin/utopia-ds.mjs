#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import {
  capabilityManifest, envelope, getComponent, getDoc, getTemplate, getTheme,
  listComponents, listDocs, listTemplates, listThemes, repositoryDoctor, search,
} from '../lib/api.mjs'

const args = process.argv.slice(2)
const command = args.find((arg) => !arg.startsWith('--')) ?? 'help'
const commandIndex = args.indexOf(command)
const values = commandIndex >= 0 ? args.slice(commandIndex + 1).filter((arg) => !arg.startsWith('--')) : []
const json = args.includes('--json')
const dense = args.includes('--dense')

function output(type, data, format = null) {
  if (json) return console.log(JSON.stringify(envelope(type, data), null, 2))
  if (format) return console.log(format(data, dense))
  console.log(typeof data === 'string' ? data : JSON.stringify(data, null, 2))
}

function fail(message, code = 'ERR_INPUT', suggestions = []) {
  if (json) console.error(JSON.stringify({ apiVersion: 1, error: message, code, suggestions }, null, 2))
  else console.error(message)
  process.exitCode = 1
}

function argAfter(flag, fallback) {
  const index = args.indexOf(flag)
  return index >= 0 ? args[index + 1] : fallback
}

function help() {
  output('help', capabilityManifest(), () => `Ceramic Design System CLI

Usage: utopia-ds <command> [options]

Commands:
  init [directory] [--theme <id>] [--yes]  Add Ceramic and agent instructions
  search <query>                           Search every design-system domain
  component <Name>|--list                 Inspect component contracts
  template <id>|--list [--skeleton]       Inspect starter structures
  theme <id>|--list                       Inspect theme contracts
  docs <topic>|--list                     Read design-system guidance
  manifest                                Print the self-describing CLI contract
  doctor                                  Validate the design-system source
  mcp                                     Start the stdio MCP server

Global options: --json, --dense
`)
}

function formatComponent(entry) {
  return [
    `name=${entry.name}`, `status=${entry.status}`, `category=${entry.category}`,
    `import=${entry.packageImport}`, `sourcePath=${entry.sourcePath}`,
    `shadcn=${entry.shadcnFoundation.join(',')}`, `fallbackToShadcn=${entry.fallbackToShadcn}`,
    `tokens=${entry.requiredTokens.join(',')}`, `useWhen=${entry.useWhen.join(' | ')}`,
    `avoidWhen=${entry.avoidWhen.join(' | ')}`, `neverInvent=${entry.neverInvent.join(',')}`,
    `ai=${JSON.stringify(entry.ai ?? {})}`,
  ].join('\n')
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content, 'utf8')
}

function init() {
  const target = resolve(values[0] ?? process.cwd())
  const theme = argAfter('--theme', 'utopia-default')
  if (!getTheme(theme)) return fail(`Unknown theme "${theme}".`, 'ERR_THEME', listThemes().map((item) => item.id))
  const pkgPath = join(target, 'package.json')
  if (!existsSync(pkgPath)) return fail(`No package.json found in ${target}.`, 'ERR_PROJECT')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  pkg.scripts = { ...pkg.scripts, 'ceramic': 'utopia-ds', 'ceramic:doctor': 'utopia-ds doctor --json' }
  write(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)

  const rules = `# Ceramic Design System agent rules

1. Run \`npm run ceramic -- manifest --json\` before generating UI.
2. Run \`npm run ceramic -- search <intent> --json\`, then inspect the selected component or template.
3. Prefer \`@utopia-studio-design/design-system\` exports over raw shadcn/ui source.
4. Components consume semantic tokens only. The active theme is \`${theme}\`.
5. Read \`npm run ceramic -- docs arabic-friendly --dense\` before Arabic or RTL work.
6. Never invent component props, import paths, tokens, Arabic product copy, or left/right-only APIs.
7. Validate with \`npm run ceramic:doctor\` before handoff.
`
  write(join(target, 'AGENTS.md'), rules)
  write(join(target, 'CLAUDE.md'), rules)
  write(join(target, '.cursor/rules/ceramic-design-system.mdc'), `---\ndescription: Ceramic Design System rules\nalwaysApply: true\n---\n\n${rules}`)
  write(join(target, '.github/copilot-instructions.md'), rules)
  write(join(target, '.ceramic/config.json'), `${JSON.stringify({ apiVersion: 1, theme, arabicFriendly: true, source: '@utopia-studio-design/design-system' }, null, 2)}\n`)
  write(join(target, '.mcp.json'), `${JSON.stringify({ mcpServers: { ceramic: { command: 'npx', args: ['-y', '@utopia-studio-design/design-system-cli', 'mcp'] } } }, null, 2)}\n`)
  output('init-result', { ok: true, target, theme, files: ['AGENTS.md', 'CLAUDE.md', '.cursor/rules/ceramic-design-system.mdc', '.github/copilot-instructions.md', '.ceramic/config.json', '.mcp.json'] },
    (data) => `Ceramic initialized in ${data.target}.\nCreated ${data.files.join(', ')}.`)
}

function runMcp() {
  const child = spawn(process.execPath, [join(dirname(new URL(import.meta.url).pathname), 'utopia-ds-mcp.mjs')], { stdio: 'inherit' })
  child.on('exit', (code) => { process.exitCode = code ?? 0 })
}

if (command === 'help' || args.includes('--help')) help()
else if (command === 'init') init()
else if (command === 'manifest') output('manifest', capabilityManifest())
else if (command === 'search') {
  const query = values.join(' ')
  if (!query) fail('Search requires a query.', 'ERR_QUERY')
  else output('search-results', search(query), (rows) => rows.map((row) => `${row.kind}|${row.id}|score=${row.score}`).join('\n'))
} else if (command === 'component') {
  const name = values[0]
  if (!name || args.includes('--list')) output('component-list', listComponents(), (rows) => rows.map((item) => `${item.name}|${item.status}|${item.category}|${item.packageImport}`).join(dense ? '\n' : '\n- '))
  else { const item = getComponent(name); item ? output('component', item, formatComponent) : fail(`Unknown component "${name}".`, 'ERR_COMPONENT', search(name).slice(0, 5).map((result) => result.id)) }
} else if (command === 'template') {
  const name = values[0]
  if (!name || args.includes('--list')) output('template-list', listTemplates(), (rows) => rows.map((item) => `${item.id}|${item.category}|${item.title}|${item.purpose}`).join('\n'))
  else { const item = getTemplate(name); item ? output('template', item, (entry) => args.includes('--skeleton') ? entry.sections.map((section) => `<section data-ceramic-part="${section}">{/* ${section} */}</section>`).join('\n') : JSON.stringify(entry, null, 2)) : fail(`Unknown template "${name}".`, 'ERR_TEMPLATE') }
} else if (command === 'theme') {
  const name = values[0]
  if (!name || args.includes('--list')) output('theme-list', listThemes(), (rows) => rows.map((item) => `${item.id}|${item.name}|${item.role}|${item.policyManifest}`).join('\n'))
  else { const item = getTheme(name); item ? output('theme', item) : fail(`Unknown theme "${name}".`, 'ERR_THEME') }
} else if (command === 'docs') {
  const topic = values[0]
  if (!topic || args.includes('--list')) output('docs-list', listDocs(), (rows) => rows.join('\n'))
  else { const item = getDoc(topic); item ? output('docs', item, (doc) => dense ? doc.content.replace(/\n{2,}/g, '\n').trim() : doc.content) : fail(`Unknown docs topic "${topic}".`, 'ERR_DOCS', listDocs()) }
} else if (command === 'doctor') {
  const result = repositoryDoctor(); output('doctor-result', result, (data) => data.ok ? `Ceramic doctor passed. ${data.checks.components} components, ${data.checks.templates} templates, ${data.checks.themes} themes, MCP ready.` : `Ceramic doctor failed: ${data.missing.join(', ')}`); if (!result.ok) process.exitCode = 1
} else if (command === 'mcp') runMcp()
else fail(`Unknown command "${command}".`, 'ERR_COMMAND', capabilityManifest().commands.map((item) => item.name))
