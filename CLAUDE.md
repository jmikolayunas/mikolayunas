# CLAUDE.md — Jonas Mikolayunas

**Last updated:** April 2026 | Static site: HTML/CSS/JS only — no frameworks, no build tools, no npm.

**IMPORTANT:** PROJECT_CONTEXT.md is the authoritative reference for current site structure,
file paths, and implementation state. Where this file conflicts with PROJECT_CONTEXT.md,
PROJECT_CONTEXT.md takes precedence.

---

## Brand & Identity

- **Jonas Mikolayunas** creates sculptural topographic relief pieces as bespoke, commission-based artworks
- **Domain:** mikolayunas.com (primary), jonasmikolayunas.com (secondary)
- **Email:** jonas@mikolayunas.com
- **Instagram:** @jonasmikolayunas
- Tone: unhurried, precise, materially grounded — never salesy, never hyperbolic
- Use investment language: "commission" not "order", "piece" not "product", "studio" not "shop"
- Avoid: "beautiful", "stunning", "amazing", "luxury" — let the work speak through specificity
- Artist notes are first-person, observational, specific to this piece — not brand messaging

---

## Site Architecture

### Core pages (all at project root)
- `index.html` — hero, philosophy, featured pieces, process teaser, CTA
- `gallery.html` — filterable grid of all pieces
- `process.html` — studio process, five stages with expand/collapse on mobile
- `commission.html` — commission inquiry form with pricing tiers
- `collection.html` — In the Collection page with collector entries
- `about.html` — artist background
- `contact.html` — contact information
- `agreement.html` — commission agreement with signature
- `viewer.html` — 3D terrain viewer
- `viewer-auth.html` — viewer password gate
- `process-viewer.html` — process viewer

### Piece pages (all in pieces/ subdirectory)
- `pieces/block.html`
- `pieces/bromley.html`
- `pieces/cannon.html`
- `pieces/capeann.html`
- `pieces/fells.html`
- `pieces/highland.html`
- `pieces/mahoosuc.html`
- `pieces/mansfield.html`
- `pieces/maui.html`
- `pieces/nantucket.html`

Piece pages link to `../css/` and `../js/` and `../images/` using relative paths.
Do NOT look for piece pages at the project root. They are always in pieces/.

### CSS (all in css/ subdirectory)
- `css/global.css` — design system, nav, header, footer, shared layout
- `css/index.css` — home page only
- `css/gallery.css` — gallery grid, filters, lightbox
- `css/piece.css` — individual piece pages
- `css/process.css` — process page
- `css/commission.css` — commission form
- `css/collection.css` — collection page
- `css/about.css` — about page
- `css/contact.css` — contact page
- `css/agreement.css` — agreement page
- `css/viewer.css` — 3D viewer

There is NO styles.css file. Do not reference it.

### JS (all in js/ subdirectory)
- `js/scripts.js` — global nav, scroll effects, fade-ins
- `js/gallery.js` — filtering, lightbox
- `js/process.js` — process page scrollytelling and stage expand toggles
- `js/commission.js` — form validation
- `js/agreement.js` — signature and PDF
- `js/viewer-scripts.js` — 3D viewer
- `js/viewer-auth.js` — viewer password gate

There is NO contact.js or explore.js. Do not reference them.

---

## Nomenclature

- **Piece** — a single finished artwork; never "product" or "work"
- **Commission** — the client engagement process; never "order" or "purchase"
- **Studio** — refers to Jonas Mikolayunas's practice; never "shop" or "store"

---

## Design Tokens (css/global.css :root)

Colors:
- `--color-gallery-white: #F7F6F3`
- `--color-graphite: #2E2E2E`
- `--color-charcoal: #121212`
- `--color-brass: #C7A86A`

Spacing: `--space-1` through `--space-10`
Type scale: `--text-xs` through `--text-3xl`
Fonts: `--font-primary` (Libre Baskerville, serif), `--font-secondary` (Source Sans 3, sans)

Always use tokens — never hardcode colors or spacing values.

---

## Breakpoint Standards

| Name      | Query                                               |
|-----------|-----------------------------------------------------|
| Mobile    | base (no query) — portrait phone first              |
| Mobile lg | `@media (max-width: 767px)` — mobile-specific rules |
| Tablet    | `@media (min-width: 768px)`                         |
| Desktop   | `@media (min-width: 1024px)`                        |
| Wide      | `@media (min-width: 1440px)`                        |
| Landscape | `@media (max-height: 500px) and (orientation: landscape)` |

**Rules:**
- Write base styles for mobile first; layer up with `min-width`
- `@media (max-width: 767px)` IS used in this project for mobile overrides — do not remove
- No arbitrary breakpoints (640px, 480px, 1200px) — use only the breakpoints above
- JS breakpoint detection: use `window.matchMedia('(min-width: 768px)')` — never `window.innerWidth`

---

## Gallery Image System

Gallery sizing is CSS-driven via `aspect-ratio` property — not JavaScript.

**Three aspect ratios via data-aspect attribute:**
- `data-aspect="landscape"` — 3:2 ratio
- `data-aspect="square"` — 1:1 ratio
- `data-aspect="portrait"` — 2:3 ratio

**HTML pattern:**
`<article class="gallery-item" data-category="alpine" data-aspect="landscape">`

Do NOT use BEM modifier classes (gallery-item--landscape). Use data-aspect only.

**Mobile gallery:** uniform height (260px) across all aspect ratios via
`aspect-ratio: unset; height: 260px` on `.gallery-item-media` at max-width: 767px.

---

## CSS & JavaScript Conventions

**CSS:**
- Split files in css/ subdirectory — do not consolidate into one file
- State classes: `.is-active`, `.is-visible`, `.hidden`, `.is-expanded`
- No inline styles except JS-applied dynamic values

**JavaScript:**
- ES6+: `const`/`let`, arrow functions, template literals — no jQuery
- Null-check every DOM element before use
- IntersectionObserver for scroll animations
- DOMContentLoaded guard on every page script

---

## Adding Pieces — Checklist

1. Add images to `images/[piece-name]/`
2. Create `pieces/[piece-name].html` from existing piece as template
3. Add entry to gallery grid in `gallery.html`
4. Add `<article>` with `data-category` and `data-aspect` attributes
5. Update piece bottom nav sequence in adjacent piece pages
6. Update `index.html` featured works if promoting as recent piece

---

## Common Tasks

- **New nav link:** Add to `.site-nav .nav-list` and `.footer-nav-list` in all HTML files
- **Color change:** Edit `--color-*` tokens in `css/global.css :root`
- **Scroll animation:** Add `.fade-in-scroll` to element — `js/scripts.js` handles the rest
- **Commission form:** `commission.html` for structure, `js/commission.js` for validation
- **Gallery filter:** `data-category` on `.gallery-item` must match `data-filter` on filter button/select
  Categories: `alpine`, `coastal`, `urban`

---

## DO / DON'T

✅ Use CSS tokens for all colors and spacing
✅ Write mobile-first with min-width breakpoints
✅ Use max-width: 767px for mobile-specific overrides when needed
✅ Use data-aspect for gallery aspect ratios
✅ Null-check all DOM queries
✅ Piece pages are in pieces/ subdirectory — always use pieces/name.html paths
✅ Reference "Jonas Mikolayunas" as the artist/creator

❌ No styles.css — CSS is split across css/ subdirectory
❌ No pieces_*.html at project root — piece pages are at pieces/*.html
❌ No contact.js or explore.js — these files do not exist
❌ No BEM modifier classes on gallery items (--landscape, --square, --portrait)
❌ No frameworks, no npm, no build tools
❌ No jQuery
❌ No hardcoded hex colors or pixel spacing values
❌ Never use "Bonas" or "Bonas Studio"
❌ Don't use salesy language ("beautiful", "stunning", "luxury")

---

## Git / Deploy

- Static hosting: Vercel (connected to GitHub)
- Primary domain: mikolayunas.com
- Pre-deploy: verify Formspree ID (xdappvry) in commission form, meta tags on all pages,
  all image paths resolve, email set to jonas@mikolayunas.com

---

## Contact Information

- **Email:** jonas@mikolayunas.com
- **Instagram:** @jonasmikolayunas
- **Domain:** mikolayunas.com (primary), jonasmikolayunas.com (secondary)
- Formspree endpoint forwards to jonas@mikolayunas.com