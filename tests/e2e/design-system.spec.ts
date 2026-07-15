import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('utopia-ds-locale', 'en')
    localStorage.setItem('ceramic-theme', 'utopia-default')
  })
})

test('opens the global command palette and navigates to a component', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'Desktop keyboard shortcut contract')
  await page.goto('/#/docs')
  await page.keyboard.press('ControlOrMeta+K')
  await expect(page.getByRole('dialog', { name: 'Search Ceramic' })).toBeVisible()
  await page.getByPlaceholder('Search components, tokens, docs, and MCP...').fill('Button')
  await page.getByRole('option', { exact: true, name: 'Button Action component ↵' }).click()
  await expect(page).toHaveURL(/#\/components\/button/)
  await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible()
})

test('keeps route transitions and the component workbench stable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'Desktop layout contract')
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto('/#/components/button')
  await expect(page.getByRole('region', { name: 'Component workbench' })).toBeVisible()
  await page.getByRole('link', { exact: true, name: 'Card' }).click()
  await expect(page).toHaveURL(/#\/components\/card/)
  await expect(page.getByRole('heading', { level: 1, name: 'Card' })).toBeVisible()
  expect(errors).toEqual([])
})

test('supports skip navigation and documentation tab keys', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'Desktop keyboard contract')
  await page.goto('/#/docs')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  const firstTab = page.getByRole('tab').first()
  await firstTab.focus()
  await firstTab.press('ArrowDown')
  await expect(page.getByRole('tab').nth(1)).toBeFocused()
})

test('opens and closes the mobile navigation without leaking scroll', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'), 'Mobile navigation contract')
  await page.goto('/#/components')
  const toggle = page.getByRole('navigation', { name: 'Components navigation' }).getByRole('button', { name: 'Open navigation' })
  await toggle.click()
  await expect(page.locator('.app-shell')).toHaveAttribute('data-mobile-nav-open', 'true')
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.keyboard.press('Escape')
  await expect(page.locator('.app-shell')).not.toHaveAttribute('data-mobile-nav-open', 'true')
})

test('shows an honest MCP browser mirror status', async ({ page }) => {
  await page.goto('/#/docs/mcp-playground')
  await expect(page.getByRole('heading', { level: 1, name: 'MCP Playground' })).toBeVisible()
  await expect(page.getByText('Package contract verified')).toBeVisible()
  await page.getByRole('button', { name: 'Run browser mirror' }).click()
  await expect(page.getByText('doctor-result')).toBeVisible()
})

test('matches the released component and MCP visual baselines', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#/components/button')
  await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible()
  await expect(page).toHaveScreenshot('component-detail.png', { animations: 'disabled', timeout: 15_000 })
  await page.goto('/#/docs/mcp-playground')
  await expect(page.getByRole('heading', { level: 1, name: 'MCP Playground' })).toBeVisible()
  await expect(page).toHaveScreenshot('mcp-playground.png', { animations: 'disabled', timeout: 15_000 })
})
