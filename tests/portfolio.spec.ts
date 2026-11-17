import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { getContactLinks } from '../src/lib/contact'
import { profile } from '../src/data/profile'

test('only valid configured contact destinations are exposed', () => {
  expect(getContactLinks()).toEqual([])
  expect(getContactLinks({ ...profile, email: 'invalid', whatsapp: '+123', linkedin: 'javascript:alert(1)', cv: '//external.test/file.pdf' })).toEqual([])
  const links = getContactLinks({ ...profile, email: 'referee@example.org', whatsapp: '21612345678', linkedin: 'https://linkedin.com/in/test', cv: '/files/cv.pdf' })
  expect(links.map(link => link.key)).toEqual(['email', 'whatsapp', 'linkedin', 'cv'])
  expect(links[0].href).toBe('mailto:referee@example.org')
  expect(links[1].href).toBe('https://wa.me/21612345678')
})

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
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab')
    expect(await page.getByRole('dialog').evaluate(dialog => dialog.contains(document.activeElement))).toBe(true)
  }
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
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(await page.locator('.footer-wordmark').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true)
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

test('gallery supports keyboard navigation, Escape and focus restoration', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const frame = page.getByRole('button', { name: 'Open frame: THE FIELD OF PLAY' })
  await frame.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('#lightbox-title')).toHaveText('EVERY ANGLE MATTERS')
  await page.keyboard.press('ArrowLeft')
  await expect(page.locator('#lightbox-title')).toHaveText('THE FIELD OF PLAY')
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(audit.violations).toEqual([])
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(frame).toBeFocused()
})

for (const language of ['fr', 'ar'] as const) {
  for (const width of [360, 390, 768, 1024, 1440]) {
    test(`${language} is translated and responsive at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await page.getByRole('combobox').selectOption(language)
      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page.locator('html')).toHaveAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      await page.reload()
      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page.locator('.intro')).toHaveCount(0)
    })
  }
}

test('normal-motion page scrolls without errors or hiding content', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/#about')
  await expect(page.locator('.intro')).toHaveCount(0)
  for (const section of ['about', 'philosophy', 'experience', 'gallery', 'availability', 'contact']) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded()
    await expect(page.locator(`#${section} h2`)).toBeVisible()
  }
  expect(errors).toEqual([])
})

test('SEO has truthful structured identity and translated titles', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page).toHaveTitle('Yassine Mathlouthi | Football Referee')
  const person = await page.locator('script[type="application/ld+json"]').textContent()
  expect(JSON.parse(person!)).toMatchObject({ '@type': 'Person', name: profile.name, homeLocation: { name: 'Tunisia' } })
  await page.getByRole('combobox').selectOption('fr')
  await expect(page).toHaveTitle('Yassine Mathlouthi | Arbitre de football')
  await page.getByRole('combobox').selectOption('ar')
  await expect(page).toHaveTitle('ياسين المثلوثي | حكم كرة قدم')
})

for (const language of ['fr', 'ar']) {
  test(`${language} meets automated accessibility checks`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.getByRole('combobox').selectOption(language)
    await page.evaluate(() => document.fonts.ready)
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(audit.violations).toEqual([])
  })
}
