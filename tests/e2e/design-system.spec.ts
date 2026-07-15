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

test('binds theme motion profiles to application-selected runtime adapters', async ({ page }) => {
  const errors: string[] = []
  const optionalAdapterChunks: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('response', (response) => {
    if (/Motion(?:Anime|Gsap)(?:\.ts|-)/.test(response.url())) optionalAdapterChunks.push(response.url())
  })
  await page.goto('/#/docs/foundations/semantic-tokens/motion')
  const applicationMotionRoot = page.locator('#root > .uds-motion-provider')
  await expect(applicationMotionRoot).toHaveAttribute('data-motion-engine', 'framer-motion')
  await expect(applicationMotionRoot).toHaveAttribute('data-motion-profile', 'ceremonial')
  expect(optionalAdapterChunks).toEqual([])

  const runtimeProvider = page.locator('.motion-runtime-contract').locator('..')
  for (const runtime of [
    { name: /Anime\.js/, id: 'animejs' },
    { name: /GSAP/, id: 'gsap' },
    { name: /CSS \/ WAAPI/, id: 'waapi' },
    { name: /Motion for React/, id: 'framer-motion' },
  ]) {
    await page.getByRole('button', { name: runtime.name }).click()
    await expect(runtimeProvider).toHaveAttribute('data-motion-engine', runtime.id)
    await page.getByRole('button', { name: 'Replay active profile' }).click()
  }

  await page.goto('/#/themes')
  await page.getByRole('button', { name: 'Activate Dextrum', exact: true }).click()
  await page.goto('/#/docs/foundations/semantic-tokens/motion')
  await expect(page.locator('#root > .uds-motion-provider')).toHaveAttribute('data-motion-profile', 'swift')
  await expect(page.getByText('Swift response')).toBeVisible()
  expect(optionalAdapterChunks.some((url) => url.includes('MotionAnime'))).toBe(true)
  expect(optionalAdapterChunks.some((url) => url.includes('MotionGsap'))).toBe(true)
  expect(errors).toEqual([])
})

test('settles immediately without residual transforms when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#/docs/foundations/semantic-tokens/motion')
  const provider = page.locator('#root > .uds-motion-provider')
  const preview = page.locator('.motion-runtime-preview')
  await expect(provider).toHaveAttribute('data-motion', 'off')
  await expect(preview).toHaveCSS('opacity', '1')
  await expect(preview).toHaveCSS('filter', 'blur(0px)')
  await expect(preview).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
})

test('keeps foundation documentation inside a 320px viewport', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'), 'Mobile reflow contract')
  await page.setViewportSize({ width: 320, height: 700 })
  for (const route of ['all-tokens', 'color', 'typography', 'motion', 'icons']) {
    await page.goto(`/#/docs/foundations/semantic-tokens/${route}`)
    const widths = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }))
    expect(widths.scroll, route).toBeLessThanOrEqual(widths.client)
  }
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
