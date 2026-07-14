import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const root = process.cwd()
const cli = join(root, 'packages/design-system-cli/bin/utopia-ds.mjs')
const temporary = mkdtempSync(join(tmpdir(), 'ceramic-cli-'))

function run(args, cwd = root) {
  return execFileSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' })
}

const themeWorkspace = join(temporary, 'theme-workspace')
const manifestDirectory = join(themeWorkspace, 'packages/design-system/src/manifests')
mkdirSync(join(themeWorkspace, 'packages/design-system/src/themes'), { recursive: true })
mkdirSync(manifestDirectory, { recursive: true })
writeFileSync(join(manifestDirectory, 'themes.json'), `${JSON.stringify({ defaultTheme: 'utopia-default', requiredSemanticRoles: [], themes: [] }, null, 2)}\n`)

const createOutput = run(['theme', 'create', 'nova', themeWorkspace])
assert.match(createOutput, /Created and registered theme nova/)
assert.ok(existsSync(join(themeWorkspace, 'packages/design-system/src/themes/nova.css')))
assert.ok(existsSync(join(manifestDirectory, 'theme-nova.json')))
const createdThemes = JSON.parse(readFileSync(join(manifestDirectory, 'themes.json'), 'utf8'))
assert.equal(createdThemes.themes[0].id, 'nova')
assert.match(readFileSync(join(themeWorkspace, 'packages/design-system/src/themes/nova.css'), 'utf8'), /data-color-mode="light"/)
run(['theme', 'create', 'nova', themeWorkspace, '--force'])
assert.equal(JSON.parse(readFileSync(join(manifestDirectory, 'themes.json'), 'utf8')).themes.length, 1)

const generatedProject = join(temporary, 'dextrum-website')
const copyOutput = run(['template', 'template-saas-solution-homepage', '--theme', 'dextrum', '--copy', generatedProject])
assert.match(copyOutput, /with theme dextrum/)
assert.match(readFileSync(join(generatedProject, 'main.tsx'), 'utf8'), /themes\/dextrum\.css/)
assert.match(readFileSync(join(generatedProject, 'main.tsx'), 'utf8'), /const activeTheme = 'dextrum'/)
assert.match(readFileSync(join(generatedProject, 'index.html'), 'utf8'), /data-theme="dextrum"/)
assert.equal(JSON.parse(readFileSync(join(generatedProject, '.ceramic/config.json'), 'utf8')).theme, 'dextrum')
const generatedPackage = JSON.parse(readFileSync(join(generatedProject, 'package.json'), 'utf8'))
assert.equal(generatedPackage.dependencies['@utopia-studio-design/design-system'], `file:${join(root, 'packages/design-system')}`)
assert.equal(generatedPackage.devDependencies['@utopia-studio-design/design-system-cli'], `file:${join(root, 'packages/design-system-cli')}`)

console.log('Ceramic CLI generation tests passed.')
