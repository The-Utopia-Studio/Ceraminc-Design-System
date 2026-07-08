#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const args = process.argv.slice(2)
const cwd = resolve(process.cwd())
const command = args.find((arg) => !arg.startsWith('--')) ?? 'help'
const dense = args.includes('--dense')

function readJson(path) {
  return JSON.parse(readFileSync(join(cwd, path), 'utf8'))
}

function readDoc(topic) {
  const path = join(cwd, 'docs/design-system', `${topic}.md`)
  if (!existsSync(path)) throw new Error(`Unknown docs topic "${topic}".`)
  return readFileSync(path, 'utf8')
}

function normalizeLookup(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, '')
}

function help() {
  console.log(`Utopia Design System CLI

Commands:
  utopia-ds component --list [--dense]
  utopia-ds component <Name> [--dense]
  utopia-ds template --list [--dense]
  utopia-ds template <id> --skeleton [--dense]
  utopia-ds theme --list [--dense]
  utopia-ds theme <id> [--dense]
  utopia-ds docs <topic> [--dense]
  utopia-ds doctor
`)
}

function component() {
  const manifest = readJson('packages/design-system/src/manifests/components.json')
  const name = args[1]

  if (!name || name === '--list') {
    const rows = [...manifest.components]
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }))
      .map((entry) => `${entry.name}|${entry.status}|${entry.category}|${entry.packageImport}`)
    console.log(dense ? rows.join('\n') : rows.map((row) => `- ${row}`).join('\n'))
    return
  }

  const normalizedName = normalizeLookup(name)
  const entry = manifest.components.find(
    (item) => item.name.toLowerCase() === name.toLowerCase() || normalizeLookup(item.name) === normalizedName,
  )
  if (!entry) throw new Error(`Unknown component "${name}". Run component --list.`)

  console.log([
    `name=${entry.name}`,
    `status=${entry.status}`,
    `category=${entry.category}`,
    `import=${entry.packageImport}`,
    `sourcePath=${entry.sourcePath}`,
    `shadcn=${entry.shadcnFoundation.join(',')}`,
    `fallbackToShadcn=${entry.fallbackToShadcn}`,
    `tokens=${entry.requiredTokens.join(',')}`,
    `useWhen=${entry.useWhen.join(' | ')}`,
    `avoidWhen=${entry.avoidWhen.join(' | ')}`,
    `neverInvent=${entry.neverInvent.join(',')}`,
  ].join('\n'))
}

function template() {
  const manifest = readJson('packages/design-system/src/manifests/templates.json')
  const name = args[1]

  if (!name || name === '--list') {
    const rows = manifest.templates.map((entry) => `${entry.id}|${entry.category}|${entry.title}|${entry.purpose}`)
    console.log(dense ? rows.join('\n') : rows.map((row) => `- ${row}`).join('\n'))
    return
  }

  const entry = manifest.templates.find((item) => item.id === name || item.title.toLowerCase() === name.toLowerCase())
  if (!entry) throw new Error(`Unknown template "${name}". Run template --list.`)

  console.log([
    `id=${entry.id}`,
    `category=${entry.category}`,
    `title=${entry.title}`,
    `purpose=${entry.purpose}`,
    `sections=${entry.sections.join(' > ')}`,
  ].join('\n'))
}

function docs() {
  const topic = args[1] ?? 'quick-start-ai'
  const content = readDoc(topic)
  console.log(dense ? content.replace(/\n{2,}/g, '\n').trim() : content)
}

function theme() {
  const manifest = readJson('packages/design-system/src/manifests/themes.json')
  const name = args[1]

  if (!name || name === '--list') {
    const rows = manifest.themes.map((entry) => `${entry.id}|${entry.name}|${entry.role}|${entry.policyManifest}`)
    console.log(dense ? rows.join('\n') : rows.map((row) => `- ${row}`).join('\n'))
    return
  }

  const entry = manifest.themes.find((item) => item.id === name || item.name.toLowerCase() === name.toLowerCase())
  if (!entry) throw new Error(`Unknown theme "${name}". Run theme --list.`)

  const policy = readJson(entry.policyManifest)
  const lines = [
    `id=${policy.id}`,
    `name=${policy.name}`,
    `locked=${policy.locked}`,
    `css=${entry.css}`,
    `iconSystem=${policy.iconPolicy.system}`,
    `coreDoesNotOwn=${manifest.coreBoundary.doesNotOwn.join(',')}`,
    `semanticMappings=${Object.entries(policy.semanticMappings).map(([key, value]) => `${key}:${value}`).join(',')}`,
    `visualAvoid=${policy.visualPolicy.avoid.join(',')}`,
    `iconAvoid=${policy.iconPolicy.avoid.join(',')}`,
    `aiRules=${policy.aiRules.join(' | ')}`,
  ]

  console.log(lines.join('\n'))
}

function doctor() {
  const required = [
    'packages/design-system/src/manifests/catalog.json',
    'packages/design-system/src/manifests/themes.json',
    'packages/design-system/src/manifests/theme-utopia-default.json',
    'packages/design-system/src/manifests/components.json',
    'packages/design-system/src/manifests/templates.json',
    'packages/design-system/src/core.css',
    'packages/design-system/src/themes/utopia-default.css',
    'docs/design-system/quick-start-ai.md',
    'docs/design-system/arabic-friendly.md',
    'docs/design-system/theme-authoring.md',
  ]

  for (const path of required) {
    if (!existsSync(join(cwd, path))) throw new Error(`Missing ${path}`)
  }

  const catalog = readJson('packages/design-system/src/manifests/catalog.json')
  for (const area of ['docs', 'components', 'templates', 'themes']) {
    if (!catalog.topLevelAreas.some((item) => item.id === area)) throw new Error(`Missing catalog area ${area}`)
  }

  console.log('Utopia Design System doctor passed.')
}

try {
  if (command === 'component') component()
  else if (command === 'template') template()
  else if (command === 'theme') theme()
  else if (command === 'docs') docs()
  else if (command === 'doctor') doctor()
  else help()
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
