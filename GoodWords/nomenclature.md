# Bonas Studio Business Nomenclature

When these terms are used in conversation, they refer to specific HTML/CSS structures and their associated patterns.

---

## Page-Level Entities

### Site Shell
The global page wrapper structure present on all pages.
- **HTML**: `site-header`, `site-main`, `site-footer`
- **CSS**: Header with fixed positioning, blur backdrop, nav toggle for mobile
- **Files**: Defined in `css/global.css`

### Hero
Full-viewport opening section with primary imagery and messaging.
- **HTML**: `.hero`, `.hero-media`, `.hero-content`, `.hero-title`, `.hero-tagline`, `.hero-subtitle`, `.hero-scroll-indicator`
- **CSS**: Full-height, centered content, fade-in animations
- **Files**: `css/pages/home.css`

### Section
Standard content block with consistent spacing and containment.
- **HTML**: `.section-padded`, `.section-container`, `.section-container--narrow`
- **CSS**: Fluid padding (`clamp(4rem, 8vw, 8rem)`), max-width containers
- **Variants**: `--narrow` for 800px max-width

### CTA (Call to Action)
Conversion-focused section appearing at page bottoms.
- **HTML**: `.cta`, `.cta-title`, `.cta-text`, `.btn--accent`
- **CSS**: Centered text, accent button styling
- **Pattern**: Always links to `commission.html`

---

## Gallery Entities

### Gallery Item
Individual artwork card in the main gallery grid.
- **HTML**: `article.gallery-item`, `.gallery-item-link`, `.gallery-item-media`, `.gallery-item-overlay`, `.gallery-item-title`, `.gallery-item-meta`
- **Data attributes**: `data-category`, `data-width`, `data-height`
- **CSS**: Hover overlay reveal, proportional sizing based on data attributes
- **Files**: `css/pages/gallery.css`, `gallery.js`

### Work Item
Featured artwork card on homepage.
- **HTML**: `article.work-item`, `.work-link`, `.work-media`, `.work-image`, `.work-info`, `.work-title`, `.work-meta`
- **CSS**: Drop shadows, hover lift effect, staggered fade-in
- **Files**: `css/global.css`

### Filter Bar
Category filtering controls on gallery page.
- **HTML**: `.filter-bar`, `.filter-controls`, `.filter-btn`
- **CSS**: Horizontal button row, active state styling
- **Files**: `css/pages/gallery.css`, `gallery.js`

---

## Piece Page Entities

### Piece Hero
Individual artwork detail page header with primary image.
- **HTML**: `.piece-hero`, `.piece-hero-inner`, `.piece-hero-image-container`, `.piece-hero-image`, `.piece-hero-content`, `.piece-hero-title`, `.piece-hero-location`
- **CSS**: Centered presentation, fadeInUp animations, gallery-wall aesthetic
- **Files**: `css/pages/piece.css`

### Details Grid
Specification display for individual artwork.
- **HTML**: `.piece-details`, `.details-grid`, `.details-specs`, `.detail-item`, `.detail-label`, `.detail-value`, `.piece-description`
- **CSS**: Inline flex layout, bullet separators, brass accent border
- **Content**: Materials, Dimensions, Location, Completed date

### Piece Gallery
Secondary image gallery within piece pages.
- **HTML**: `.piece-gallery`, `.gallery-images`, `.gallery-image-wrapper`, `.gallery-caption`
- **CSS**: Vertical stack, scroll-triggered fade-in, italic captions
- **Behavior**: IntersectionObserver adds `.is-visible` class

### Artist's Note
Dark-background narrative section on piece pages.
- **HTML**: `.piece-artists-note`, `.artists-note-content`, `.artists-note-text`, `.artists-note-attribution`
- **CSS**: Dark charcoal background, drop cap first letter (brass, 3.5em), inverse text colors
- **Pattern**: Personal narrative about the piece, ends with "— Artist's Note"

### Back Button
Fixed-position navigation returning to gallery.
- **HTML**: `.back-to-gallery`, `.back-arrow`
- **CSS**: Fixed top-left, hidden by default, appears on scroll via `.is-visible`
- **Behavior**: JavaScript controls visibility based on scroll position

---

## Navigation Entities

### Header
Fixed global navigation bar.
- **HTML**: `.site-header`, `.header-container`, `.site-logo`, `.site-nav`, `.nav-list`, `.nav-item`, `.nav-link`
- **CSS**: Fixed position, blur backdrop, z-index 1000
- **Variants**: `.nav-link--cta` for Commission link (brass color)
- **Mobile**: `.nav-toggle` hamburger menu

### Footer
Global page footer with brand, navigation, and legal.
- **HTML**: `.site-footer`, `.footer-container`, `.footer-brand`, `.footer-logo`, `.footer-tagline`, `.footer-nav`, `.footer-social`, `.footer-legal`, `.footer-copyright`
- **CSS**: Dark charcoal background, grid layout, inverse colors
- **Optional**: `.footer-attribution` for third-party credits (Trailforks)

---

## Form Entities

### Form
Input collection patterns used across contact and commission pages.
- **HTML**: `.form-row`, `.form-group`, `.form-label`, `.form-input`, `.form-textarea`, `.form-select`, `.form-actions`
- **CSS**: Grid layout for rows, brass focus states
- **Variants**: `.form-helper` for hint text, `.form-message` for success/error feedback

---

## Client Viewer Entities

### Review Header
Simplified header for client review pages.
- **HTML**: `.review-header`, `.review-header-container`, `.review-logo`, `.review-status`
- **CSS**: Fixed, blurred backdrop, minimal styling
- **Files**: `css/pages/viewer.css`

### Model Viewer
Three.js 3D terrain viewer container.
- **HTML**: `.model-viewer-container`, `.viewer-stage`, `#viewer-canvas`, `.loading-indicator`
- **CSS**: Dark gradient background, responsive heights
- **Files**: `clients/viewer.html`, `clients/viewer-scripts.js`

### Viewer Controls
Interactive buttons within the 3D viewer.
- **HTML**: `.viewer-controls`, `.view-preset`, `.view-reset`, `.viewer-season-toggle`
- **CSS**: Pill-shaped buttons, glass-morphism effect, brass accents

### Lighting Controls
Slider controls for viewer lighting adjustment.
- **HTML**: `.lighting-controls`, `.light-control`, `.light-slider`, `.light-label-text`, `.light-value`
- **CSS**: Custom range slider styling, brass thumb

---

## Component Entities

### Button
Reusable action triggers.
- **HTML**: `.btn`
- **CSS**: Uppercase, letter-spacing, 2px border
- **Variants**:
  - `.btn--primary` (inverse colors, for dark backgrounds)
  - `.btn--accent` (brass color)
  - `.btn--large` (increased padding)

### Split Layout
Two-column content/media arrangement.
- **HTML**: `.split-layout`, `.split-content`, `.split-media`, `.split-image`
- **CSS**: CSS Grid, stacks on mobile, side-by-side on desktop
- **Files**: `css/global.css`

### Section Divider
Decorative brass line between sections.
- **HTML**: `.section-divider`
- **CSS**: 60px width, 2px height, brass color, centered

---

## Animation Patterns

### Fade In Scroll
Standard scroll-triggered entrance animation.
- **HTML**: Add `.fade-in-scroll` class to any element
- **CSS**: Starts at `opacity: 0`, `translateY(60px)`
- **Behavior**: JavaScript adds `.is-visible` when element enters viewport
- **Duration**: 2.0s cubic-bezier easing

### FadeInUp Keyframe
CSS keyframe animation for hero elements.
- **CSS**: `@keyframes fadeInUp` - opacity 0→1, translateY 20px→0
- **Usage**: Applied to piece hero elements with staggered delays

---

## Usage Examples

**"Update the Piece Hero"** → Modify `.piece-hero` and related classes in `piece.css`

**"The Gallery Items need new hover states"** → Edit `.gallery-item` styles in `gallery.css`

**"Add a new field to the Details Grid"** → Add `.detail-item` with label/value in piece HTML

**"The Artist's Note drop cap isn't rendering"** → Check `.artists-note-text p:first-of-type::first-letter` in `piece.css`

**"CTA button color is wrong"** → Check `.btn--accent` in `global.css`
