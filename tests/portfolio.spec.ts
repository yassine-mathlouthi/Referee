import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('introduction is skippable and does not replay', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Skip introduction' }).click()
  await expect(page.locator('.intro')).toHaveCount(0)
  await page.reload()
  await expect(page.locator('.intro')).toHaveCount(0)
})

test('mobile menu contains focus, closes with Escape, and follows anchors', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open menu' })
  await toggle.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(toggle).toBeFocused()
  await toggle.click()
  await page.getByRole('dialog').getByRole('link', { name: 'About' }).click()
  await expect(page).toHaveURL(/#about$/)
  await expect(page.getByRole('dialog')).not.toBeVisible()
})

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`layout has no overflow or browser errors at ${width}px`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(errors).toEqual([])
  })
}

test('page meets automated accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.locator('#philosophy').scrollIntoViewIfNeeded()
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(audit.violations).toEqual([])
})
