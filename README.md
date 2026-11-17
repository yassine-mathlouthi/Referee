# The Art of Control

Yassine Mathlouthi’s football referee portfolio. A dark, editorial sports identity built with React, TypeScript, Vite, Tailwind CSS, Motion, GSAP/ScrollTrigger, and Lucide.

## Run locally

Use Node.js 22.12+ (22.x) and npm:

```bash
npm install
npm run dev
```

```bash
npm run check    # Strict TypeScript
npm run lint
npm run build   # Production output in dist/
npm run preview
```

Dependencies are pinned and `package-lock.json` is committed. Use `npm ci` for reproducible installs.

## Update content

| File | Purpose |
| --- | --- |
| `src/data/profile.ts` | Identity, real contact destinations, CV and portrait paths |
| `src/data/matches.ts` | Verified appointments, newest first |
| `src/data/teams.ts` | Exact team aliases, sourced club badges and initials |
| `src/data/gallery.ts` | Gallery frames, image paths, cropping and multilingual descriptions |
| `src/i18n/en.ts`, `fr.ts`, `ar.ts` | All interface copy and localized SEO |
| `src/styles/globals.css` | Design tokens, composition and responsive styles |

Unconfigured contacts are intentionally hidden. Set `email` to your real address, `whatsapp` to international digits **without** `+`, and social destinations to real HTTPS URLs. Place your CV under `public/files/` and set `cv` to its root-relative `.pdf` path. No forms, backend, API keys, database, or authentication are required.

Yassine’s supplied email, WhatsApp, Instagram, LinkedIn, YouTube, TikTok, GitHub and existing portfolio are now configured. Email and WhatsApp are the primary contact actions; the other profiles appear in Contact and the footer. Arabic, English and French are listed in About and structured metadata. The existing portfolio is an **outbound profile link**, not an assumed production domain for this new site. The CV link remains hidden until a real file is provided.

The appointment list contains **16 entries supplied by Yassine from his 2026 log**: 15 played matches (5 as referee, 10 as assistant) and one appointment where Union Sportive de Carthage was absent. The no-show has no result and does not contribute to played-match totals.

`src/data/matches.ts` holds ISO dates (`YYYY-MM-DD`), teams, location, age category, role, match type, scores, card counts, and any recorded penalties. Use the typed role, age and match-type keys; their display labels are translated in the dictionaries. `status: 'played'` requires a home/away score tuple; `status: 'opponentAbsent'` cannot carry a score. Summary figures are derived from played records, never hardcoded. Payment information is deliberately excluded from the public data and site bundle.

The compact match grid initially shows the six most recent appointments, with three columns on desktop and two on tablet/mobile (one on exceptionally narrow screens). Team names, transparent crests and per-team scores remain visible; venue, cards and penalties are available through each card's keyboard-accessible **Details** disclosure. Visitors can expand the full history or filter by role. No photo is attached to an individual appointment without a confirmed association. Spelling and accents are lightly normalized, but supplied team acronyms—including ASM/AMS—are preserved rather than silently reconciled. Add future records only after confirming the actual details; do not infer dates, results, credentials or official competition names from photographs.

### Team badges

Fourteen researched club crests are included as local, transparent lossless WebP files, displayed directly beside team names without white tiles or backgrounds. Native white areas inside the actual club crest are preserved. Sources and a rights notice are available in the expandable **Team badges & sources** section and in `public/team-logos/SOURCES.md`. Badges identify match opponents only; they do not imply partnerships or endorsements. The logos remain their owners' intellectual property, not freely licensed portfolio artwork. Review source terms and any required permissions before broader promotional use.

The remaining four team labels use neutral initials until a trustworthy badge is supplied or verified. Failed images also fall back to initials without shifting the layout. No live scraping, hotlinking, third-party scripts or network dependency is added for visitors.

Both former `Carthage` and `Union Carthage` entries now refer to **Union Sportive de Carthage (USC)**, following Yassine's confirmation. Its black-and-yellow shield is sourced from Footlink's football club profile under the name Union Sportive Carthaginoise.

Following Yassine's correction, all three former `KAS` / `Kalaa Kobra` opponents are now **Kalâa Sport (KS), Kalâa Seghira**, with the correct crest. The actual match venues remain Soliman and Mégrine.

### Add real photographs

The portfolio now includes all **11 supplied photographs**: the whistle-action image in the hero, the portrait beside the goal in About, and nine curated gallery images. Each has a 640px WebP and a larger WebP variant; the full collection is approximately 3.3 MB, loaded responsively and lazily outside the hero. Excess sky was cropped where helpful, while source files in Downloads were left untouched.

The gallery covers player dialogue, assistant-referee movement, pre-match briefing, signals, tracking play, attention to a player, touchline conversation, and a matchday portrait. Captions describe visible scenes only: they do not imply verified competitions, appointments or dates.

To replace or extend the collection:

1. Put your own optimized AVIF/WebP images in `public/images/`.
2. Set `heroImage` for a background portrait, `heroCutout` for an optional transparent foreground, and `heroPosition` for background cropping in `profile.ts`.
3. Set `aboutImage` to the portrait path.
4. Set a gallery frame’s `src`, optional `srcSet` and `position`, plus **truthful descriptions in all three languages**:

```ts
{
  id: 'field',
  variant: 0,
  copyIndex: 0,
  src: '/images/match-wide.webp',
  srcSet: '/images/match-small.webp 640w, /images/match-wide.webp 1600w',
  position: 'center 35%',
  alt: { en: 'Your actual description', fr: 'Votre description réelle', ar: 'وصف الصورة الحقيقي' },
}
```

Each `copyIndex` selects a translated editorial title; edit gallery titles in the dictionaries to reflect the real subject. Add more entries and translated titles as needed. Frames without `src` retain the abstract pitch artwork and explicitly say photography is forthcoming. Real images are lazy-loaded outside the hero; the lightbox supports arrow keys, touch swipes, Escape, focus containment, and focus restoration.

For performance, supply appropriately cropped images rather than multi-megabyte originals. Review every crop at mobile and desktop sizes. Use only photography you have permission to publish.

## Languages and motion

English is the default. French and Arabic are complete dictionaries; the preference persists locally, and Arabic updates document direction, fonts, spacing, and layout. Storage-denied environments still work without persistence.

The first-session introduction is skippable and lasts about 2.1 seconds. Hero text reveals begin when it finishes. Deep links bypass the intro. Reduced-motion users see content immediately, without parallax or scroll effects. There is no scroll hijacking or replacement cursor. Optional GSAP enhancement is loaded separately on motion-enabled desktop screens; mobile keeps the normal editorial layout.

Fonts use Google Fonts with `display=swap` and local fallbacks. Self-host the font files if your deployment requires no third-party font requests.

## Browser checks

```bash
npx playwright install chromium
npm test
```

The suite automatically builds and serves the **production** site on port 4174. It covers:

- All three languages at 360, 390, 768, 1024 and 1440px.
- Intro skipping, reduced motion, language persistence and document RTL.
- Navigation, modal focus cycling, Escape and lightbox arrow keys.
- Browser errors, horizontal overflow and footer clipping.
- Automated WCAG A/AA checks with axe, including French, Arabic and the lightbox.
- Safe contact destination handling and truthful structured data.

Automated checks complement—not replace—manual screen-reader, touch-device, content and visual review. Browser screenshots were manually inspected during implementation.

## Deploy to Vercel

1. Import this GitHub repository into a Vercel project.
2. Select **Vite**, Node **22.x**, build command `npm run build`, output directory `dist`.
3. Set `VITE_SITE_URL` to the real production HTTPS origin (no path), then deploy.
4. Check the deployed site, real links, `robots.txt`, social preview, and `sitemap.xml`.

`vercel.json` supplies the build defaults, security headers, and immutable caching for hashed assets. This is a single-page site with native anchors, so no router or SPA rewrite is necessary.

If `VITE_SITE_URL` is absent, the build can use Vercel’s `VERCEL_PROJECT_PRODUCTION_URL`. If neither is available, canonical URL and sitemap are deliberately omitted rather than inventing a domain; `robots.txt` is still generated. Set the production origin and rebuild before requesting indexing.

SEO includes static English metadata for crawlers, localized browser metadata, a YM favicon, verified Person JSON-LD, and an original 1200×630 PNG social card. `public/og-image.svg` is its editable source. Regenerate the PNG after editing the SVG. Language switching is client-side, not separate indexable language URLs.

**Deployment is configured, not provisioned:** no Vercel account was linked and no live deployment is claimed.

## Launch checklist

- Review the imported match log, configured contact destinations, photography and crops.
- Review biography and translations with Yassine.
- Set the real production origin and deploy through your Vercel account.
- Check actual mobile devices, screen-reader navigation and final image performance.

See `PROGRESS.md` for implementation status. The original `todo.md` brief is preserved.
