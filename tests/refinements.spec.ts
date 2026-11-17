import { test, expect } from '@playwright/test'
import { en } from '../src/i18n/en'
import { fr } from '../src/i18n/fr'
import { ar } from '../src/i18n/ar'

for (const width of [360, 768, 1440]) {
  test(`identity and booking remain accessible at ${width}px in every language`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    for (const [language, t] of [['en', en], ['fr', fr], ['ar', ar]] as const) {
      await page.getByRole('combobox').selectOption(language)
      await page.evaluate(() => document.fonts.ready)
      const identity = page.locator('.hero-headline-identity')
      await expect(identity).toContainText(t.name)
      await expect(identity).toContainText(t.profession)
      await expect(identity).toBeInViewport()
      const booking = page.locator('.nav-cta')
      await expect(booking).toBeVisible()
      await expect(booking).toHaveAttribute('href', '#contact')
      const menuBounds = await page.locator('.menu-toggle').boundingBox()
      const bookingBounds = await booking.boundingBox()
      if (width < 768) {
        if (language === 'ar') expect(menuBounds!.x + menuBounds!.width).toBeLessThanOrEqual(bookingBounds!.x)
        else expect(bookingBounds!.x + bookingBounds!.width).toBeLessThanOrEqual(menuBounds!.x)
      }
      await expect(page.locator('.hero-actions .button-primary')).toHaveAttribute('href', '#contact')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
  })
}

test('appointments prioritize roles, show full club names and explain youth labels', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#experience')
  const card = page.locator('#match-history > li').first()
  await expect(card.locator('.match-role')).toHaveText('Assistant referee')
  await expect(card.locator('.match-fixture')).toContainText('Jeunesse Sportive d’El Omrane')
  await expect(card.locator('.match-fixture')).toContainText('Club Sportif de Hammam Lif')
  expect(await card.evaluate(element => Boolean(element.querySelector('.match-meta')!.compareDocumentPosition(element.querySelector('.match-fixture')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true)
  await expect(page.locator('.competition-guide')).toContainText('under-19')
  await expect(page.locator('.competition-guide')).toContainText('under-17')
  await expect(page.locator('.competition-guide')).toContainText('do not indicate senior')
})
