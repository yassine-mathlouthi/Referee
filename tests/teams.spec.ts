import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { teams, getTeamIdentity, getTeamInitials } from '../src/data/teams'
import { matches } from '../src/data/matches'

test('all identified clubs have local WebP badges and source references', () => {
  expect(teams).toHaveLength(14)
  const aliases = teams.flatMap(team => team.matchNames)
  expect(new Set(aliases).size).toBe(aliases.length)
  for (const team of teams) {
    const asset = readFileSync(new URL(`../public${team.logo}`, import.meta.url))
    expect(asset.subarray(8, 12).toString()).toBe('WEBP')
    expect(asset.length).toBeLessThan(80_000)
    expect(team.source).toMatch(/^https:\/\//)
    expect(matches.some(match => team.matchNames.includes(match.homeTeam) || team.matchNames.includes(match.awayTeam))).toBe(true)
  }
})

test('team aliases distinguish Mégrine and Marsa without guessing unknown clubs', () => {
  expect(getTeamIdentity('AMS (Mégrine)')?.id).toBe('megrine')
  expect(getTeamIdentity('Mégrine (ASM)')?.id).toBe('megrine')
  expect(getTeamIdentity('Marsa')?.id).toBe('marsa')
  expect(getTeamIdentity('ASM')).toBeUndefined()
  expect(getTeamIdentity('Borj el Amri')).toBeUndefined()
  expect(getTeamInitials('Borj el Amri')).toBe('BEA')
})

test('all three corrected Kalâa opponents resolve to the confirmed KS badge', () => {
  const kalaa = matches.filter(match => match.awayTeam === 'Kalâa Sport (KS)')
  expect(kalaa).toHaveLength(3)
  expect(kalaa.map(match => match.location)).toEqual(['Soliman', 'Mégrine', 'Mégrine'])
  expect(getTeamIdentity('Kalâa Sport (KS)')).toMatchObject({ id: 'kalaa-sport', initials: 'KS', city: 'Kalâa Seghira' })
  expect(matches.some(match => /KAS|Kobra/.test(match.awayTeam))).toBe(false)
})

test('badges load from this site and their sources are keyboard-accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#experience')
  await page.getByRole('button', { name: /^View full history/ }).click()
  const badges = page.locator('.team-badge img')
  expect(await badges.count()).toBeGreaterThan(20)
  for (const badge of await badges.all()) {
    await badge.scrollIntoViewIfNeeded()
    await expect.poll(() => badge.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    await expect(badge).toHaveAttribute('src', /^\/team-logos\//)
    await expect(badge).toHaveAttribute('alt', '')
    await expect(badge.locator('..')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  }
  const summary = page.locator('.team-sources summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.team-sources')).toHaveAttribute('open', '')
  await expect(page.locator('.team-sources a')).toHaveCount(14)
})

test('a failed badge falls back to initials without hiding the team name', async ({ page }) => {
  await page.route('**/team-logos/est.webp', route => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#experience')
  const appointment = page.locator('[data-match-id="2026-10-31-parc-b-minime-a"]')
  await appointment.scrollIntoViewIfNeeded()
  await expect(appointment.locator('.team-badge-fallback')).toHaveText('EST')
  await expect(appointment.locator('.match-team').first()).toContainText('Espérance Sportive de Tunis')
})
