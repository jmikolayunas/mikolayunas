# PROJECT_CONTEXT.md — Current Site State

Last updated: April 2026

---

## CLAUDE.md OVERRIDES — read these first

CLAUDE.md contains outdated information. Where it conflicts with this file,
this file takes precedence.

- CSS is NOT a single styles.css file. It is split across css/global.css
  and css/pages/ subdirectories (css_gallery.css, css_index.css, etc.).
  Do not consolidate. Do not reference styles.css — it does not exist.
- Piece pages are NOT at pieces/{name}.html. They are at the root level
  as pieces_nantucket.html, pieces_maui.html, etc.
- max-width media queries ARE used in this project for mobile overrides
  (specifically @media (max-width: 767px)). The CLAUDE.md prohibition
  is outdated. Do not remove them.
- gallery-item aspect ratio classes are set via data-aspect attribute
  (data-aspect="landscape" / "square" / "portrait"), not BEM modifier
  classes. Do not add --landscape / --square / --portrait class variants.

---

## Current direction

The site has rebranded from Bonas Studio to Jonas Mikolayunas.
Positioning: artist-led, commission-based, contemplative, materially specific,
story-based. Target audience: affluent collectors, primarily New England.

---

## Current site structure

Core pages (all in root):
- index.html
- gallery.html
- process.html
- commission.html
- collection.html (formerly collectors.html)
- about.html
- contact.html
- agreement.html
- viewer.html
- viewer-auth.html
- process-viewer.html

Piece pages (all in root, prefixed pieces_):
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

CSS (split files):
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

JS:
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

| Name      | Query                                          |
|-----------|------------------------------------------------|
| Mobile    | base (no query) — portrait phone first         |
| Mobile lg | @media (max-width: 767px) — mobile overrides  |
| Tablet    | @media (min-width: 768px)                     |
| Desktop   | @media (min-width: 1024px)                    |
| Wide      | @media (min-width: 1440px)                    |
| Landscape | @media (max-height: 500px) and (orientation: landscape) |

---

## Mobile optimization — completed April 2026

The following mobile fixes have been implemented. Do not revert them.

### Strategy
Primary target: portrait phone. Design carefully here.
Secondary target: landscape phone. Protect against clipping, not redesign.
The landscape protection query (@media (max-height: 500px) and
(orientation: landscape)) exists in css/global.css and css/index.css.
Do not remove it.

### Nav overlay (css/global.css)
- .site-nav.is-active uses position: fixed; inset: 0 — full-screen overlay
- Background: var(--color-charcoal)
- .site-nav.is-active .nav-link color is var(--color-gallery-white) — NOT
  inherited graphite. If this appears dark text on dark background, this
  is the rule to check.
- Nav is moved to <body> via JS when open to escape backdrop-filter
  stacking context on the header
- Landscape protection reduces font-size and gap on nav links at low height

### Header safe area (css/global.css)
- .site-header has padding-top: env(safe-area-inset-top)
- This clears the Dynamic Island and notch on all iPhones
- Do not remove this rule

### Hero — home page (css/index.css)
- Mobile base: .hero-content transform: none; .hero-heading transform: none
- Desktop restore at @media (min-width: 768px) AND (min-height: 500px)
  — the min-height guard prevents offset transforms from firing on
  landscape phones where width exceeds 768px but height is short
- .hero-image object-position: center 35% at mobile (favors upper teal
  composition of Nantucket piece)
- .hero-content has translateY(-10vh) at max-width: 767px to lift the
  title to approximately 40% from top
- Landscape protection: transforms zeroed, hero min-height auto,
  scroll indicator hidden

### Gallery grid (css/gallery.css)
- Mobile uses display: flex; flex-direction: column; align-items: center
  — NOT display: grid. This is intentional for centering.
- .gallery-section.section-padded and .gallery-section .section-container
  both have padding-inline: 0 on mobile — the double padding from these
  two wrappers was collapsing available width to ~294px, preventing
  visible centering. All horizontal spacing is now controlled at the
  gallery-grid level only.
- Gallery items on mobile: width: 100%; max-width: 300px — the max-width
  creates the centering gap that align-items: center acts on.
  Do NOT change max-width to a value larger than the flex container
  or centering will not be visible.
- Gallery item media containers on mobile: aspect-ratio: unset;
  height: 260px — uniform height across all aspect ratios so pieces
  have equal visual mass while scrolling.
- .gallery-section has overflow-x: hidden to contain drop shadows.
- Base grid uses minmax(min(280px, 100%), 1fr) — the min() guard
  prevents forced overflow on screens narrower than 280px.

### Piece page spec bar (css/piece.css)
- .details-specs is flex-wrap: wrap at mobile
- Restored to flex-wrap: nowrap at min-width: 768px
- Prevents spec items from scrolling off-screen on narrow phones

### Footer logo — home link (all HTML files)
- .footer-logo now wraps an <a href="index.html" class="footer-logo-link">
- Allows users to tap the name in the footer to return to the home page
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

- Split CSS files — do not consolidate
- No frameworks, no npm, no build tools
- ES6+ JS only — no jQuery
- Formspree ID: xdappvry
- Primary domain: mikolayunas.com
- Email: jonas@mikolayunas.com
- Instagram: @jonasmikolayunas