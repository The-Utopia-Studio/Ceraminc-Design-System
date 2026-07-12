import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspaceRoot = resolve(packageRoot, '../..')
const data = resolve(packageRoot, 'data')

rmSync(data, { recursive: true, force: true })
mkdirSync(data, { recursive: true })
cpSync(resolve(workspaceRoot, 'packages/design-system/src/manifests'), resolve(data, 'manifests'), { recursive: true })
cpSync(resolve(workspaceRoot, 'docs/design-system'), resolve(data, 'docs'), { recursive: true })
console.log('Synced Ceramic manifests and docs into the CLI package.')
