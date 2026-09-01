# Stamford Publishers, Christian Imprint landing page

A drop-in Next.js App Router page for
`https://www.stamfordpublishers.com/christian-book-publishing`.

## Files

```
app/
  christian-book-publishing/
    page.tsx               server component: metadata, fonts, JSON-LD
    ChristianLanding.tsx   client component: all markup and interaction
    lp.module.css          scoped design system
    content.ts             every word on the page, in one editable file
  api/
    christian-lead/
      route.ts             form handler with validation and honeypot
```

Copy those two folders into your existing `app/` directory. Nothing else in
the project needs to change.

## Why CSS Modules instead of Tailwind

Your site already has its own global styles. CSS Modules hash every class
name at build time, so `.tier` here can never collide with a `.tier` anywhere
else on stamfordpublishers.com, and you do not have to touch your Tailwind
config or purge settings. If you would rather have a Tailwind version, say so
and I will convert it.

## Requirements

Next.js 13.4 or newer with the App Router. No new dependencies. Fonts load
through `next/font/google`, which self-hosts them at build time, so there is
no render-blocking request to Google and no layout shift.

## Before you publish

1. **Confirm the prices.** `content.ts` has $1,195, $2,895 and $5,450 as
   placeholders. If you would rather not show prices at all, delete the
   `price` and `priceNote` lines and change the tier buttons to
   "Request pricing". The layout holds either way.
2. **Replace the testimonials.** The three in `content.ts` are written
   placeholders. Swap in real, permissioned author quotes before launch.
3. **Check the trust strip claims.** "8 to 10 weeks" and "one consultant"
   are commitments your delivery team has to be able to keep.
4. **Add the OG image** at `public/og/christian-publishing.jpg`, 1200x630.
5. **Point the form somewhere.** Set `LEAD_WEBHOOK_URL` in your environment,
   or uncomment the Resend block in `route.ts`. Until you do, leads only get
   logged to the server console.
6. **Add the conversion event.** There is a marked spot in
   `ChristianLanding.tsx` right after a successful submission.

## For the Google Ads campaigns

The page is built as a single scroll with the form above the fold on desktop
and immediately below the headline on mobile, so it works as a paid landing
page without a separate mobile variant. Every button on the page scrolls to
that one form rather than opening a second conversion path.

If you want to run message-match variants per ad group, for example a
devotional-specific version and a Bible-study-specific version, duplicate
`content.ts` and pass the variant into `ChristianLanding` as a prop. The
markup will not need editing.

## Accessibility and performance notes

- Ribbon animation and the page-load reveal both respect
  `prefers-reduced-motion`.
- Focus rings are visible and use the ruby accent, not the browser default.
- The FAQ uses native `details` and `summary`, so it works with keyboard and
  screen readers with no JavaScript.
- Only one client component boundary, and the only JavaScript that runs on
  load is the ribbon scroll listener, which is passive and rAF-throttled.
