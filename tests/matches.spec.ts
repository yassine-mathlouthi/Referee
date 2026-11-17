import { test, expect } from '@playwright/test'
import { matches, summarizeMatches } from '../src/data/matches'

test('all supplied appointments retain valid dates and distinct identities', () => {
  expect(matches).toHaveLength(16)
  expect(new Set(matches.map(match => match.id)).size).toBe(16)
  for (const match of matches) {
    expect(new Date(`${match.date}T00:00:00Z`).toISOString().slice(0, 10)).toBe(match.date)
    expect(match.yellowCards).toBeGreaterThanOrEqual(0)
    expect(match.redCards).toBeGreaterThanOrEqual(0)
    expect(match).not.toHaveProperty('paymentStatus')
  }
  expect(matches.filter(match => match.date === '2026-05-03')).toHaveLength(2)
  expect(matches.filter(match => match.date === '2026-10-27')).toHaveLength(2)
  expect(matches.filter(match => match.date === '2026-10-31')).toHaveLength(2)
  expect(matches.filter(match => match.date === '2026-11-15')).toHaveLength(2)
})

test('opponent absence is never represented as a result or a played match', () => {
  const absent = matches.filter(match => match.status === 'opponentAbsent')
  expect(absent).toHaveLength(1)
  expect(absent[0].date).toBe('2026-05-17')
  expect(absent[0].awayTeam).toBe('Union Carthage')
  expect(absent[0]).not.toHaveProperty('score')
  expect(summarizeMatches(matches)).toEqual({ played: 15, referee: 5, assistant: 10 })
  expect(summarizeMatches([])).toEqual({ played: 0, referee: 0, assistant: 0 })
})

test('reported cards, penalty and score order are preserved', () => {
  expect(matches.reduce((sum, match) => sum + match.yellowCards, 0)).toBe(14)
  expect(matches.reduce((sum, match) => sum + match.redCards, 0)).toBe(1)
  const megrine = matches.find(match => match.id === '2026-11-08-megrine-junior')!
  expect(megrine).toMatchObject({ score: [1, 1], yellowCards: 6, redCards: 0, penalties: 1 })
  expect(matches.find(match => match.id === '2026-10-03-soliman-cadet-b')?.score).toEqual([0, 1])
  expect(matches.find(match => match.id === '2026-10-31-parc-b-minime-a')?.redCards).toBe(1)
})

test('timeline shows accurate totals, expands all dates and filters appointments', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#experience')
  await expect(page.locator('.match-stats dd')).toHaveText(['15', '5', '10'])
  await expect(page.locator('#match-history > li')).toHaveCount(6)
  await page.getByRole('button', { name: /^View full history/ }).click()
  await expect(page.locator('#match-history > li')).toHaveCount(16)
  const dates = await page.locator('.match-record time').evaluateAll(elements => elements.map(element => element.getAttribute('datetime')))
  expect(dates).toEqual([...dates].sort().reverse())
  const absent = page.locator('[data-match-id="2026-05-17-khadhra-minime"]')
  await expect(absent).toContainText('Opponent absent')
  await expect(absent.locator('.match-score')).toHaveCount(0)
  await expect(page.locator('#experience')).not.toContainText(/not paid|payment status/i)
  await page.getByRole('button', { name: 'Referee', exact: true }).click()
  await expect(page.locator('#match-history > li')).toHaveCount(5)
  await expect(page.locator('#match-history [data-role="assistant"]')).toHaveCount(0)
  await expect(page.locator('[data-match-id="2026-11-08-megrine-junior"] .match-decisions')).toContainText('Penalties')
  await page.getByRole('button', { name: 'Assistant referee', exact: true }).click()
  await page.getByRole('button', { name: /^View full history/ }).click()
  await expect(page.locator('#match-history > li')).toHaveCount(11)
  await page.getByRole('button', { name: /^Show recent matches/ }).click()
  await expect(page.locator('#match-history > li')).toHaveCount(6)
})

test('match roles and competition types translate in French and Arabic', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#experience')
  await page.getByRole('combobox').selectOption('fr')
  await page.getByRole('button', { name: 'Arbitre', exact: true }).click()
  await expect(page.locator('#match-history > li')).toHaveCount(5)
  await expect(page.locator('#match-history')).toContainText('Cartons jaunes')
  await page.getByRole('combobox').selectOption('ar')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('#match-history')).toContainText('ركلات جزاء')
  await expect(page.locator('.match-stats dd').first()).toHaveText(await page.evaluate(() => new Intl.NumberFormat('ar').format(15)))
})

for (const width of [360, 768]) {
  test(`expanded match history fits at ${width}px in all languages`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/#experience')
    await page.getByRole('button', { name: /^View full history/ }).click()
    for (const language of ['en', 'fr', 'ar']) {
      await page.getByRole('combobox').selectOption(language)
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      await expect(page.locator('#match-history > li')).toHaveCount(16)
      expect(await page.locator('.match-score').evaluateAll(elements => elements.every(element => {
        const bounds = element.getBoundingClientRect()
        return bounds.left >= 0 && bounds.right <= innerWidth
      }))).toBe(true)
    }
  })
}
