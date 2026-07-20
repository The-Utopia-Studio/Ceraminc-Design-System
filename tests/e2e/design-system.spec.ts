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

test('uses the Utopia wordmark loader while switching between English and Arabic', async ({ page }) => {
  await page.goto('/#/docs')

  await page.locator('.locale-switch select').selectOption('ar')

  const loader = page.locator('.uds-utopia-wordmark-loader')
  await expect(loader).toBeVisible()
  await expect(loader).toHaveAttribute('dir', 'rtl')
  await expect(loader).toHaveAttribute('lang', 'ar')
  await expect(loader).toHaveAttribute('data-phase', 'intro')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page.waitForTimeout(400)
  await expect(loader).toBeVisible()
  await expect(loader).toHaveAttribute('data-phase', 'exit')
  await expect(loader).toBeHidden()
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
})

test('keeps the documentation command readable without a redundant header CTA', async ({ page }) => {
  await page.goto('/#/docs')

  await expect(page.locator('.topbar-cta')).toHaveCount(0)
  const command = page.locator('.getting-started-command code').first()
  await expect(command).toBeVisible()
  await expect(command).not.toBeEmpty()

  const colors = await command.evaluate((element) => {
    const commandStyle = window.getComputedStyle(element)
    const surfaceStyle = window.getComputedStyle(element.parentElement!)
    return {
      background: surfaceStyle.backgroundColor,
      fitsWithoutHorizontalScroll: element.scrollWidth <= element.clientWidth,
      foreground: commandStyle.color,
    }
  })
  expect(colors.foreground).not.toBe(colors.background)
  expect(colors.fitsWithoutHorizontalScroll).toBe(true)
})

test('keeps the Themes hero heading inside its responsive frame', async ({ page }) => {
  await page.goto('/#/themes')

  const metrics = await page.locator('.page-hero').evaluate((hero) => {
    const heading = hero.querySelector('h1')!
    const heroBounds = hero.getBoundingClientRect()
    const headingBounds = heading.getBoundingClientRect()
    return {
      headingClientWidth: heading.clientWidth,
      headingRight: headingBounds.right,
      headingScrollWidth: heading.scrollWidth,
      heroClientWidth: hero.clientWidth,
      heroRight: heroBounds.right,
      heroScrollWidth: hero.scrollWidth,
    }
  })

  expect(metrics.headingScrollWidth).toBeLessThanOrEqual(metrics.headingClientWidth + 1)
  expect(metrics.headingRight).toBeLessThanOrEqual(metrics.heroRight + 1)
  expect(metrics.heroScrollWidth).toBeLessThanOrEqual(metrics.heroClientWidth + 1)
})

test('keeps the Illustrations hero and comparison boxes inside one layout rhythm', async ({ page }) => {
  await page.goto('/#/docs/foundations/semantic-tokens/illustrations')

  const headingLayout = await page.locator('.page-hero').evaluate((hero) => {
    const heading = hero.querySelector('h1')!
    const headingBounds = heading.getBoundingClientRect()
    const heroBounds = hero.getBoundingClientRect()
    return {
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      headingClientWidth: heading.clientWidth,
      headingRight: headingBounds.right,
      headingScrollWidth: heading.scrollWidth,
      heroRight: heroBounds.right,
    }
  })

  expect(headingLayout.headingScrollWidth).toBeLessThanOrEqual(headingLayout.headingClientWidth + 1)
  expect(headingLayout.headingRight).toBeLessThanOrEqual(headingLayout.heroRight + 1)
  expect(headingLayout.documentScrollWidth).toBeLessThanOrEqual(headingLayout.documentClientWidth + 1)

  for (const selector of ['#overview .foundation-card', '#empty-state .foundation-empty-state']) {
    const rowHeightDeltas = await page.locator(selector).evaluateAll((elements) => {
      const rows = new Map<number, number[]>()
      for (const element of elements) {
        const bounds = element.getBoundingClientRect()
        const row = Math.round(bounds.top)
        rows.set(row, [...(rows.get(row) ?? []), bounds.height])
      }
      return [...rows.values()].map((heights) => Math.max(...heights) - Math.min(...heights))
    })
    expect(Math.max(...rowHeightDeltas), selector).toBeLessThanOrEqual(1)
  }
})

test('keeps component documentation colors legible and borders quiet', async ({ page }) => {
  await page.goto('/#/components/chat-composer')

  const readVisualHierarchy = () => page.locator('.component-detail-shell').evaluate((root) => {
    const channels = (color: string) => {
      const values = color.match(/[\d.]+/g)!.map(Number)
      const rgb = values.slice(0, 3)
      return [...(color.startsWith('color(srgb') ? rgb.map((value) => value * 255) : rgb), values[3] ?? 1]
    }
    const composite = (foreground: string, background: string) => {
      const [red, green, blue, alpha] = channels(foreground)
      const [backgroundRed, backgroundGreen, backgroundBlue] = channels(background)
      return `rgb(${(red * alpha) + (backgroundRed * (1 - alpha))} ${(green * alpha) + (backgroundGreen * (1 - alpha))} ${(blue * alpha) + (backgroundBlue * (1 - alpha))})`
    }
    const luminance = (color: string) => {
      const linear = channels(color).map((channel) => {
        const value = channel / 255
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
      })
      return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2])
    }
    const contrast = (foreground: string, background: string) => {
      const compositedForeground = composite(foreground, background)
      const lighter = Math.max(luminance(compositedForeground), luminance(background))
      const darker = Math.min(luminance(compositedForeground), luminance(background))
      return (lighter + 0.05) / (darker + 0.05)
    }
    const background = getComputedStyle(document.body).backgroundColor

    return {
      background,
      component: getComputedStyle(root.querySelector('.uds-chat-composer')!).borderTopColor,
      descriptionContrast: contrast(getComputedStyle(root.querySelector('.prop-row p')!).color, background),
      divider: getComputedStyle(root.querySelector('.practice-row')!).borderBottomColor,
      frame: getComputedStyle(root.querySelector('.component-stage')!).borderTopColor,
      nameContrast: contrast(getComputedStyle(root.querySelector('.prop-row strong')!).color, background),
      section: getComputedStyle(root.querySelector('#best-practices')!).borderTopColor,
      shellBackground: getComputedStyle(root).backgroundColor,
      stageBackground: getComputedStyle(root.querySelector('.component-stage')!).backgroundColor,
      table: getComputedStyle(root.querySelector('.practice-table')!).borderTopColor,
      typeContrast: contrast(getComputedStyle(root.querySelector('.prop-row code')!).color, background),
    }
  })

  let darkStageBackground = ''

  await expect(page.getByRole('button', { name: 'Dark' })).toHaveAttribute('aria-pressed', 'true')

  for (const mode of ['dark', 'light']) {
    if (mode === 'light') await page.getByRole('button', { name: 'Dark' }).click()
    const visual = await readVisualHierarchy()
    expect(visual.nameContrast).toBeGreaterThanOrEqual(4.5)
    expect(visual.typeContrast).toBeGreaterThanOrEqual(4.5)
    expect(visual.descriptionContrast).toBeGreaterThanOrEqual(4.5)
    expect(visual.table).toBe(visual.frame)
    expect(visual.section).toBe(visual.divider)
    expect(visual.frame).not.toBe(visual.divider)
    expect(visual.component).not.toBe(visual.frame)
    expect(visual.shellBackground).toBe('rgba(0, 0, 0, 0)')

    if (mode === 'dark') darkStageBackground = visual.stageBackground
    else expect(visual.stageBackground).not.toBe(darkStageBackground)
  }
})

test('documents Native Select limits and the themeable Select migration', async ({ page }) => {
  await page.goto('/#/components/native-select')

  await expect(page.getByText(/OS or browser renders the opened option menu/)).toBeVisible()
  await expect(page.getByText(/complete theme coverage is not guaranteed/)).toBeVisible()
  await expect(page.locator('#usage pre')).toContainText('NativeExample')
  await expect(page.locator('#usage pre')).toContainText('Migrate to Select')
  await expect(page.locator('#usage pre')).toContainText('<SelectContent>')
  await expect(page.locator('#usage pre')).toContainText('<SelectItem value="default">')
})

test('keeps the Select indicator centered as a fixed-size SVG under zoom', async ({ page }) => {
  await page.goto('/#/components/select')

  const trigger = page.locator('.uds-select-trigger').first()
  const indicator = trigger.locator('svg.uds-select-trigger-icon')
  await expect(trigger).toBeVisible()
  await expect(indicator).toHaveCount(1)
  await expect(indicator).toHaveAttribute('aria-hidden', 'true')

  await page.evaluate(() => { document.documentElement.style.zoom = '1.5' })
  const layout = await trigger.evaluate((element) => {
    const icon = element.querySelector<SVGElement>('svg.uds-select-trigger-icon')!
    const triggerBounds = element.getBoundingClientRect()
    const iconBounds = icon.getBoundingClientRect()
    const styles = getComputedStyle(element)
    const iconStyles = getComputedStyle(icon)
    return {
      centerDelta: Math.abs(
        (triggerBounds.top + triggerBounds.height / 2) -
        (iconBounds.top + iconBounds.height / 2),
      ),
      display: styles.display,
      iconBlockSize: iconStyles.blockSize,
      iconInlineSize: iconStyles.inlineSize,
    }
  })

  expect(layout.display).toBe('flex')
  expect(layout.iconInlineSize).toBe('16px')
  expect(layout.iconBlockSize).toBe('16px')
  expect(layout.centerDelta).toBeLessThanOrEqual(1)
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

test('keeps the Side Nav shell, footer, account, and keyboard contract stable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#/components/side-nav')

  const nav = page.getByRole('navigation', { name: 'Utopia Studio primary navigation' }).first()
  const main = nav.locator('[data-slot="main"]')
  const footer = nav.locator('[data-slot="footer"]')
  const accountName = nav.locator('[data-slot="name"]')
  const command = nav.getByRole('button', { name: 'Search' })

  await expect(nav).toHaveAttribute('data-slot', 'side-nav')
  await expect(nav.locator('[data-slot="item"][aria-current="page"]')).toContainText('Dashboard')
  await expect(command).toContainText('⌘K')
  await command.focus()
  await expect(command).toBeFocused()
  await expect(accountName).toHaveCSS('white-space', 'nowrap')

  const layout = await nav.evaluate((element) => {
    const mainElement = element.querySelector<HTMLElement>('[data-slot="main"]')!
    const footerElement = element.querySelector<HTMLElement>('[data-slot="footer"]')!
    const navRect = element.getBoundingClientRect()
    const mainRect = mainElement.getBoundingClientRect()
    const footerRect = footerElement.getBoundingClientRect()
    return {
      footerAtBottom: Math.abs(navRect.bottom - footerRect.bottom) < 2,
      mainBeforeFooter: mainRect.bottom <= footerRect.top,
      mainOverflow: getComputedStyle(mainElement).overflowY,
    }
  })
  expect(layout).toEqual({ footerAtBottom: true, mainBeforeFooter: true, mainOverflow: 'auto' })
  await expect(page.locator('.side-nav-type-one-preview').first()).toHaveScreenshot('side-nav-shell-expanded.png', { animations: 'disabled' })

  await nav.getByRole('button', { name: 'Close sidebar' }).click()
  await expect(nav).toHaveAttribute('data-collapsed', 'true')
  await expect(command).toHaveAttribute('title', 'Search')
  await expect(footer).toBeVisible()
  await expect(main).toBeVisible()
  await expect(page.locator('.side-nav-type-one-preview').first()).toHaveScreenshot('side-nav-shell.png', { animations: 'disabled' })
})

test('centers collapsed Side Nav items and commands on the LTR rail', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#/components/side-nav')

  const nav = page.getByRole('navigation', { name: 'Utopia Studio primary navigation' }).first()
  await nav.getByRole('button', { name: 'Close sidebar' }).click()

  const centers = await nav.evaluate((element) => {
    const center = (target: Element) => {
      const rect = target.getBoundingClientRect()
      return rect.left + rect.width / 2
    }
    return {
      rail: center(element),
      command: center(element.querySelector('.uds-side-nav-command')!),
      item: center(element.querySelector('.uds-side-nav-item')!),
    }
  })

  expect(Math.abs(centers.command - centers.rail)).toBeLessThanOrEqual(1)
  expect(Math.abs(centers.item - centers.rail)).toBeLessThanOrEqual(1)
})

test('centers collapsed Side Nav items and commands on the RTL rail', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#/components/side-nav')

  const nav = page.getByRole('navigation', { name: 'Utopia Studio primary navigation' }).first()
  await nav.evaluate((element) => { element.setAttribute('dir', 'rtl') })
  await nav.getByRole('button', { name: 'Close sidebar' }).click()

  const centers = await nav.evaluate((element) => {
    const center = (target: Element) => {
      const rect = target.getBoundingClientRect()
      return rect.left + rect.width / 2
    }
    return {
      rail: center(element),
      command: center(element.querySelector('.uds-side-nav-command')!),
      item: center(element.querySelector('.uds-side-nav-item')!),
    }
  })

  expect(Math.abs(centers.command - centers.rail)).toBeLessThanOrEqual(1)
  expect(Math.abs(centers.item - centers.rail)).toBeLessThanOrEqual(1)
})

test('matches the Dextrum charcoal Dark and plain Light theme contracts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' })
  await page.goto('/#/themes')
  await page.getByRole('button', { name: 'Activate Dextrum', exact: true }).click()
  await page.goto('/#/components/side-nav')

  const root = page.locator('html')
  const shell = page.locator('.component-detail-shell')
  const preview = page.locator('.side-nav-type-one-preview').first()
  await expect(root).toHaveAttribute('data-theme', 'dextrum')
  await expect(shell).toHaveAttribute('data-theme', 'dextrum')
  await shell.evaluate((element) => { element.dataset.colorMode = 'dark' })
  expect(await shell.evaluate((element) => {
    const styles = getComputedStyle(element)
    return {
      background: styles.getPropertyValue('--background').trim(),
      foreground: styles.getPropertyValue('--foreground').trim(),
      oceanBlue: styles.getPropertyValue('--dx-brand-ocean-blue').trim(),
      logoTeal: styles.getPropertyValue('--dx-brand-logo-teal').trim(),
      primary: styles.getPropertyValue('--primary').trim(),
      ring: styles.getPropertyValue('--ring').trim(),
      sidebarPrimary: styles.getPropertyValue('--sidebar-primary').trim(),
    }
  })).toEqual({
    background: '#0e1215',
    foreground: '#eaeaea',
    oceanBlue: '#3e8ecc',
    logoTeal: '#063946',
    primary: '#3e8ecc',
    ring: '#3e8ecc',
    sidebarPrimary: '#3e8ecc',
  })
  await expect(preview).toHaveScreenshot('dextrum-side-nav-dark.png', { animations: 'disabled' })
  await preview.getByRole('button', { name: 'Close sidebar' }).click()
  await expect(preview.locator('.uds-side-nav')).toHaveAttribute('data-collapsed', 'true')
  await expect(preview.locator('[data-slot="heading"][data-variant="brand"]')).toBeVisible()
  await expect(preview.locator('[data-slot="command"]')).toBeVisible()
  await expect(preview.locator('[data-slot="auxiliary"]')).toBeVisible()
  await expect(preview.locator('[data-slot="status"]')).toBeVisible()
  await expect(preview.locator('[data-slot="account"]')).toBeVisible()
  await expect(preview.locator('.uds-side-nav-item[aria-current="page"]')).toHaveAttribute('aria-current', 'page')
  await expect(preview).toHaveScreenshot('dextrum-side-nav-dark-collapsed.png', { animations: 'disabled' })
  await preview.getByRole('button', { name: 'Open sidebar' }).click()

  await shell.evaluate((element) => { element.dataset.colorMode = 'light' })
  expect(await shell.evaluate((element) => getComputedStyle(element).getPropertyValue('--background').trim())).toBe('#f7f7f5')
  await expect(preview).toHaveScreenshot('dextrum-side-nav-light.png', { animations: 'disabled' })
  await preview.getByRole('button', { name: 'Close sidebar' }).click()
  await expect(preview).toHaveScreenshot('dextrum-side-nav-light-collapsed.png', { animations: 'disabled' })

  const tokens = await shell.evaluate((element) => {
    const styles = getComputedStyle(element)
    return {
      background: styles.getPropertyValue('--background').trim(),
      card: styles.getPropertyValue('--card').trim(),
      collapsed: styles.getPropertyValue('--sidebar-width-collapsed').trim(),
      foreground: styles.getPropertyValue('--foreground').trim(),
      primary: styles.getPropertyValue('--primary').trim(),
      ring: styles.getPropertyValue('--ring').trim(),
      sidebar: styles.getPropertyValue('--sidebar').trim(),
      sidebarPrimary: styles.getPropertyValue('--sidebar-primary').trim(),
    }
  })
  expect(tokens).toEqual({
    background: '#f7f7f5',
    card: '#ffffff',
    collapsed: '4rem',
    foreground: '#192b39',
    primary: '#26689a',
    ring: '#26689a',
    sidebar: '#f1f2f0',
    sidebarPrimary: '#26689a',
  })
})

test('separates the Barrier Intelligence brand from color mode and exposes its marketing contracts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' })
  await page.goto('/#/themes')
  await page.locator('html').evaluate((element) => { element.dataset.colorMode = 'light' })
  await page.getByRole('button', { name: 'Activate Barrier Intelligence', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-brand', 'barrier-intelligence')
  await expect(page.locator('html')).toHaveAttribute('data-color-mode', 'light')
  await page.goto('/#/components/side-nav')

  const shell = page.locator('.component-detail-shell')
  const preview = page.locator('.side-nav-type-one-preview').first()
  await expect(shell).toHaveAttribute('data-brand', 'barrier-intelligence')

  await shell.evaluate((element) => {
    element.removeAttribute('data-theme')
    element.dataset.colorMode = 'dark'
  })
  const dark = await shell.evaluate((element) => {
    const styles = getComputedStyle(element)
    return {
      background: styles.getPropertyValue('--background').trim(),
      containerStandard: styles.getPropertyValue('--container-standard').trim(),
      containerWide: styles.getPropertyValue('--container-wide').trim(),
      detector: styles.getPropertyValue('--detector-active').trim(),
      fontMono: styles.getPropertyValue('--font-mono').trim(),
      gutter: styles.getPropertyValue('--page-gutter').trim(),
      marketingH1: styles.getPropertyValue('--font-size-marketing-h1').trim(),
      motionPage: styles.getPropertyValue('--motion-duration-page').trim(),
      revealDistance: styles.getPropertyValue('--motion-distance-reveal').trim(),
      verified: styles.getPropertyValue('--assurance-verified').trim(),
    }
  })
  expect(dark).toEqual({
    background: '#000000',
    containerStandard: '72rem',
    containerWide: '90rem',
    detector: '#a6b86a',
    fontMono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    gutter: 'clamp(1rem, 3vw, 2.5rem)',
    marketingH1: 'clamp(3rem, 6vw, 5.75rem)',
    motionPage: '0ms',
    revealDistance: '0px',
    verified: '#a6b86a',
  })
  await expect(preview).toHaveScreenshot('barrier-side-nav-dark.png', { animations: 'disabled' })

  await shell.evaluate((element) => { element.dataset.colorMode = 'light' })
  expect(await shell.evaluate((element) => {
    const styles = getComputedStyle(element)
    return {
      background: styles.getPropertyValue('--background').trim(),
      detector: styles.getPropertyValue('--detector-active').trim(),
      lost: styles.getPropertyValue('--assurance-lost').trim(),
      primary: styles.getPropertyValue('--primary').trim(),
    }
  })).toEqual({ background: '#f5f5f2', detector: '#657437', lost: '#9c4942', primary: '#8a6637' })
  await expect(preview).toHaveScreenshot('barrier-side-nav-light.png', { animations: 'disabled' })

  await shell.evaluate((element) => { element.dataset.colorMode = 'system' })
  await expect(shell).toHaveCSS('color-scheme', 'light')
  expect(await shell.evaluate((element) => getComputedStyle(element).getPropertyValue('--background').trim())).toBe('#f5f5f2')
  await page.waitForTimeout(300)
  await expect(preview).toHaveScreenshot('barrier-side-nav-system-light.png', { animations: 'disabled' })
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
