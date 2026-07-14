import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspaceRoot = resolve(packageRoot, '../..')
const data = resolve(packageRoot, 'data')

rmSync(data, { recursive: true, force: true })
mkdirSync(data, { recursive: true })
cpSync(resolve(workspaceRoot, 'packages/design-system/src/manifests'), resolve(data, 'manifests'), { recursive: true })
cpSync(resolve(workspaceRoot, 'docs/design-system'), resolve(data, 'docs'), { recursive: true })
const templateTarget = resolve(data, 'templates/saas-solution-homepage')
cpSync(resolve(workspaceRoot, 'templates/saas-solution-homepage'), templateTarget, { recursive: true })
const templateMain = resolve(templateTarget, 'main.tsx')
const portableMain = readFileSync(templateMain, 'utf8')
  .replace("from '../../packages/design-system/src'", "from '@utopia-studio-design/design-system'")
  .replace("import '../../packages/design-system/src/core.css'", "import '@utopia-studio-design/design-system/core.css'")
  .replace("import '../../packages/design-system/src/themes/utopia-default.css'", "import '@utopia-studio-design/design-system/themes/utopia-default.css'")
writeFileSync(templateMain, portableMain, 'utf8')
console.log('Synced Ceramic manifests, docs, and runnable templates into the CLI package.')
