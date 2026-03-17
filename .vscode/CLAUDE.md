# CLAUDE.md — Bonas Studio

**Last updated:** March 2026 | Static site: HTML/CSS/JS only — no frameworks, no build tools, no npm.

---

## Brand & Voice

- Bonas Studio makes handcrafted topographic relief maps as bespoke, investment-grade objects
- Tone: unhurried, precise, materially grounded — never salesy, never hyperbolic
- Use investment language: "commission" not "order", "piece" not "product", "studio" not "shop"
- Avoid: "beautiful", "stunning", "amazing", "luxury" — let the work speak through specificity
- Hero copy pattern: geography + material + process, one breath; no taglines, no exclamation marks
- Artist notes are first-person, observational, specific to this piece — not brand messaging

---

## Site Architecture

- `index.html` — hero, philosophy, 3 featured pieces, process teaser, CTA
- `gallery.html` — filterable grid of all pieces (filter: alpine / ocean / trail / urban)
- `process.html` — studio process, step by step
- `commission.html` — multi-step commission form with validation
- `about.html` — artist background
- `contact.html` — contact information
- `explore.html` — discovery interface
- `pieces/{name}.html` — individual piece detail pages (hero, specs, story, materials, detail shots)
- `styles.css` — single flat CSS file, full design system (~66k lines)
- `scripts.js` — global: nav, scroll effects, parallax, fade-ins
- `gallery.js` — gallery: filtering, lightbox, aspect ratio helpers
- `commission.js`, `process.js`, `contact.js`, `explore.js` — page-specific scripts
- `images/{piece-name}/` — photos per piece (folder names use spaces: `block island/`)
- `reviews/` — testimonials; `viewtest/` — dev/test files

---

## Nomenclature

- **Piece** (`.piece`, `.gallery-item`) — a single finished artwork; never "product" or "work"
- **Commission** (`.commission-form`) — the client engagement process; never "order" or "purchase"
- **Studio** (`.studio-*`) — refers to Bonas Studio as entity; never "shop" or "store"
- **Hero** (`.hero`, `.piece-hero`) — full-bleed top section of any page
- **Gallery item** (`.gallery-item`) — one piece card in the filterable grid
- **Filter** (`.filter-btn`, `data-filter`) — category selector above gallery
- **Lightbox** (`#lightbox`) — full-screen overlay image viewer
- **Process step** (`.process-step`) — numbered studio workflow stage
- Full entity reference: `GoodWords/nomenclature.md`

---

## Design Tokens (styles.css `:root`)

- Colors: `--color-charcoal`, `--color-brass`, `--color-text-primary`, `--color-text-secondary`
- Spacing: `--space-1` through `--space-8`
- Type scale: `--text-xs` through `--text-3xl`
- Fonts: `--font-primary` (serif, display), `--font-secondary` (sans, UI)
- Always use tokens — never hardcode colors or spacing values

---

## Breakpoint Standards

Four standardized breakpoints, mobile-first cascade only:

| Name    | Value            |
|---------|------------------|
| Mobile  | base (no query)  |
| Tablet  | `min-width: 768px`  |
| Desktop | `min-width: 1024px` |
| Wide    | `min-width: 1440px` |

**Rules:**
- Write base styles for mobile first; layer up with `min-width` only
- `max-width` queries are forbidden — remove any found in styles.css
- No arbitrary breakpoints (e.g. 640px, 480px, 1200px) — use only the four above
- JavaScript breakpoint detection: use `window.matchMedia('(min-width: 768px)')` — never `window.innerWidth`
- Philosophy: design thinking is desktop-first (sketch desktop layout first); code is mobile-first (write mobile styles first)

---

## Gallery Image System

Gallery sizing is **CSS-driven via `aspect-ratio` property** — not JavaScript.

**Three aspect ratio classes:**
- `.gallery-item--landscape` — 3:2 ratio (wider than tall pieces)
- `.gallery-item--square` — 1:1 ratio (equal dimensions)
- `.gallery-item--portrait` — 2:3 ratio (taller than wide pieces)

**HTML pattern:** `<article class="gallery-item gallery-item--landscape" data-category="alpine" data-aspect="landscape">`

**Removed:** `setGalleryTrueScale()`, `setGalleryAspectRatios()`, `setVariedSpacing()` — do not re-add JS sizing functions

**Gallery images:** box-shadow on `.gallery-item-media img` for depth; no borders

---

## Responsive Image Specs

**Hero images** (`loading="eager"`, `fetchpriority="high"`):
- srcset: 800w, 1200w, 1800w, 2400w
- sizes: `100vw`
- File naming: `[piece].hero.crop-[width]w.webp`

**Gallery images** (`loading="lazy"`):
- Landscape: 300w, 400w, 600w, 800w
- Square: 270w, 360w, 540w, 720w
- Portrait: 260w, 340w, 510w, 680w
- sizes: `(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw`
- File naming: `[piece].gallery.[width]w.webp`

---

## CSS & JavaScript Conventions

**CSS:**
- Single flat file: `styles.css` (root level) — no subdirectory CSS
- BEM-style naming: `.component`, `.component-element`, `.component--modifier`
- State classes: `.is-active`, `.is-visible`, `.hidden`
- No inline styles except JS-applied dynamic values

**JavaScript:**
- ES6+: `const`/`let`, arrow functions, template literals — no jQuery
- Null-check every DOM element before use
- IntersectionObserver for scroll animations (`.fade-in-scroll` → `.is-visible`)
- `requestAnimationFrame` for scroll/animation loops
- Each page script logs: `console.log('✓ [Page] scripts loaded')`
- DOMContentLoaded guard pattern on every page script

---

## Adding Pieces — Checklist

1. Add images to `images/[piece-name]/` (use spaces in folder name to match convention)
2. Create `pieces/[piece-name].html` from existing piece as template
3. Add entry to `galleryData` array in `gallery.js`
4. Add `<article>` to `gallery.html` with `data-category`, `data-aspect`, and correct aspect-ratio class
5. Add `<img>` with srcset/sizes per responsive image spec above
6. Update `index.html` featured works if promoting as recent piece

---

## Common Tasks

- **New nav link:** Add `<li class="nav-item">` to `.site-nav .nav-list` and `.footer-nav-list` in all HTML files
- **Color change:** Edit `--color-*` tokens in `styles.css :root {}` — propagates site-wide
- **Scroll animation:** Add `.fade-in-scroll` to element — `scripts.js` handles the rest (fires once at 50% visibility)
- **Commission form:** `commission.html` for structure, `commission.js` for validation; configure Formspree endpoint in submit handler
- **Gallery filter:** `data-category` on `.gallery-item` must match `data-filter` on `.filter-btn`; categories: `alpine`, `ocean`, `trail`, `urban`

---

## DO / DON'T

✅ Use CSS tokens for all colors and spacing
✅ Write mobile-first with `min-width` breakpoints only
✅ Use `data-aspect` + CSS `aspect-ratio` for gallery sizing
✅ Use `matchMedia` for JS breakpoint checks
✅ Null-check all DOM queries
✅ Use `loading="lazy"` for gallery, `eager` + `fetchpriority="high"` for heroes

❌ No `max-width` media queries
❌ No arbitrary breakpoints (640px, 480px, 1200px, etc.)
❌ No JS-driven gallery sizing functions
❌ No frameworks, no npm, no build tools
❌ No jQuery
❌ No hardcoded hex colors or pixel spacing values

---

## Git / Deploy

- Branch: `claude/claude-md-mkk3y8nlqqf3p74c-6wwOZ` — push with `git push -u origin <branch>`
- Static hosting: GitHub Pages, Netlify, Vercel — no build step needed
- Pre-deploy: verify Formspree ID in `commission.js`, meta tags on all pages, all image paths resolve
