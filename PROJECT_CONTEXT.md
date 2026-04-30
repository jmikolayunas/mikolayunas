# PROJECT_CONTEXT.md — Current Site State

Last updated: April 2026

This file is the authoritative reference for the Claude Code CLI and
all AI coding agents working on this project. Where this file conflicts
with CLAUDE.md, this file takes precedence.

---

## CLAUDE.md OVERRIDES

CLAUDE.md contains outdated information. Apply these corrections:

- CSS is NOT a single styles.css file. All CSS lives in the css/
  subdirectory. Do not reference styles.css — it does not exist.
- Piece pages are NOT at pieces/block.html or pieces/{name}.html.
  They are at the project root as pieces_nantucket.html, pieces_maui.html,
  etc. Always use the pieces_ prefix at root level.
- max-width media queries ARE used in this project for mobile overrides
  (specifically @media (max-width: 767px)). Do not remove them.
- Gallery item aspect ratio classes use data-aspect attribute
  (data-aspect="landscape" / "square" / "portrait"). Do not add
  BEM modifier class variants.

---

## Current direction

The site has rebranded from Bonas Studio to Jonas Mikolayunas.
Positioning: artist-led, commission-based, contemplative, materially
specific, story-based. Target audience: affluent collectors, primarily
New England.

---

## Current site structure

### Core pages (all in project root)
- index.html
- gallery.html
- process.html
- commission.html
- collection.html
- about.html
- contact.html
- agreement.html
- viewer.html
- viewer-auth.html
- process-viewer.html

### Piece pages (all in project root, prefixed pieces_)
- pieces_block.html
- pieces_bromley.html
- pieces_cannon.html
- pieces_capeann.html
- pieces_fells.html
- pieces_highland.html
- pieces_mahoosuc.html
- pieces_mansfield.html
- pieces_maui.html
- pieces_nantucket.html

### CSS files (all in css/ subdirectory)
- css/global.css — design system, nav, header, footer, buttons, shared layout
- css/index.css — home page only
- css/gallery.css — gallery grid, filters, lightbox
- css/piece.css — individual piece pages
- css/process.css — process page
- css/commission.css — commission form
- css/collection.css — collection page
- css/about.css — about page
- css/contact.css — contact page
- css/agreement.css — agreement page
- css/viewer.css — 3D viewer

### JS files (all in js/ subdirectory)
- js/scripts.js — global nav, scroll, fade-ins
- js/gallery.js — filtering, lightbox, aspect ratio
- js/process.js — process page scrollytelling
- js/commission.js — form validation
- js/agreement.js — signature and PDF
- js/viewer-scripts.js — 3D viewer
- js/viewer-auth.js — viewer password gate

---

## Design tokens

Colors:
- --color-gallery-white: #F7F6F3
- --color-graphite: #2E2E2E
- --color-charcoal: #121212
- --color-brass: #C7A86A

Typography:
- --font-primary: Libre Baskerville (headers, display)
- --font-secondary: Source Sans 3 (body, UI)

Always use tokens. Never hardcode hex values or pixel spacing.

---

## Breakpoints in use

| Name      | Query                                               |
|-----------|-----------------------------------------------------|
| Mobile    | base (no query) — portrait phone first              |
| Mobile lg | @media (max-width: 767px) — mobile-specific rules   |
| Tablet    | @media (min-width: 768px)                           |
| Desktop   | @media (min-width: 1024px)                          |
| Wide      | @media (min-width: 1440px)                          |
| Landscape | @media (max-height: 500px) and (orientation: landscape) |

---

## Mobile optimization — completed April 2026

The following mobile fixes are in place. Do not revert them.

### Strategy
Primary target: portrait phone. Landscape phone is a protection pass only.
The landscape query (@media (max-height: 500px) and (orientation: landscape))
exists in css/global.css and css/index.css. Do not remove it.

### Nav overlay (css/global.css)
- .site-nav.is-active uses position: fixed; inset: 0 — full-screen overlay
- Background: var(--color-charcoal)
- .site-nav.is-active .nav-link color is var(--color-gallery-white)
- Nav is moved to <body> via JS when open to escape backdrop-filter
  stacking context on the header
- header has padding-top: env(safe-area-inset-top) for Dynamic Island

### Hero — home page (css/index.css)
- Mobile base: .hero-content transform: none; .hero-heading transform: none
- Desktop transforms restored at @media (min-width: 768px) AND (min-height: 500px)
- .hero-image object-position: center 35% at mobile
- .hero-content has translateY(-10vh) at max-width: 767px
- Landscape protection: transforms zeroed, hero min-height auto

### Gallery grid (css/gallery.css)
- Mobile uses display: flex; flex-direction: column; align-items: center
- .gallery-section.section-padded and .gallery-section .section-container
  both have padding-inline: 0 on mobile
- Gallery items: width: 100%; max-width: 300px — do NOT increase max-width
  beyond container width or centering breaks
- Gallery item media: aspect-ratio: unset; height: 260px on mobile
- .gallery-section has overflow-x: hidden

### Piece page (css/piece.css)
- .details-specs is flex-wrap: wrap at mobile, nowrap at min-width: 768px
- .piece-hero-inner is display: block; text-align: center at mobile
- .piece-hero-content is text-align: center at mobile
- Desktop left-aligned layout restored at min-width: 768px
- .back-to-gallery is display: none at mobile; restored at min-width: 768px
- .piece-bottom-nav appears on mobile only; hidden at min-width: 768px
- Gallery detail images: padding: 0 on .gallery-images (intentional)
- First gallery image uses .gallery-image-wrapper--hero class for
  full-bleed treatment at mobile

### Piece bottom nav
- Sits inside the dark .piece-artists-note section as the final element
- Gallery White text at 0.45 opacity, brass on hover
- No border — space alone creates separation from content above
- Circular sequence newest to oldest:
  Maui → Fells → Highland → Cape Ann → Cannon → Block →
  Mahoosuc → Bromley → Mansfield → Nantucket → (wraps to Maui)

### Footer (css/global.css)
- text-align: center on .footer-container at mobile
- .footer-nav-list align-items: center at mobile
- .footer-social justify-content: center at mobile
- Desktop restores left-aligned layout at min-width: 768px
- .footer-logo wraps an <a class="footer-logo-link" href="index.html">
  on main pages and href="../index.html" on piece pages
- .footer-logo-link styles in css/global.css: color inherit, no underline,
  brass hover

---

## Voice and positioning

The work should not feel like generic "custom topo maps."
It should read as sculptural, story-based, place-based artwork using
terrain, material, and craft to hold memory.

Use: commission, piece, studio, collector, artist note, place, terrain,
relief, material, story

Avoid: product, order, shop, buy now, stunning, amazing, beautiful,
luxury as a direct claim

---

## Maui piece note

The frameless resin edge represents openness, continuation, distance,
friendship, and the Pacific extending beyond a fixed border.
Avoid repeating "left room to continue" if already used elsewhere.
Fix typo: "choicereflects" → "choice reflects."
Avoid duplicated koa sentence about figure/chatoyance.

---

## Process page note

Discovery should emphasize a conversation about place, personal meaning,
and story. Dimensions, timing, and practical needs are part of the
discussion, but not the center.

---

## Technical preferences

- Split CSS in css/ subdirectory — do not consolidate
- No frameworks, no npm, no build tools
- ES6+ JS only — no jQuery
- Formspree ID: xdappvry
- Primary domain: mikolayunas.com
- Email: jonas@mikolayunas.com
- Instagram: @jonasmikolayunas