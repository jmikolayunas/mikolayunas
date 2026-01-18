# CLAUDE.md - Bonas Studio Website

## Project Overview

**Bonas Studio** is a custom topographic art studio website showcasing handcrafted relief maps. This is a static website built with vanilla HTML, CSS, and JavaScript—no build process, no frameworks, no dependencies. The site is designed to be simple, elegant, and performant.

**Project Type:** Static website (HTML/CSS/JS)
**Total Code:** ~7,500 lines across all files
**Hosting:** Designed for static hosting (GitHub Pages, Netlify, Vercel, etc.)

---

## Codebase Structure

```
bonas-studio-site-claude1/
├── index.html              # Homepage - hero, philosophy, featured work, CTA
├── gallery.html            # Gallery page with filtering
├── process.html            # Creative process showcase
├── commission.html         # Commission request form
├── about.html              # About the studio/artist
├── contact.html            # Contact information
├── explore.html            # Explore/discovery page
├── styles.css              # Global styles (~66k lines - comprehensive design system)
├── scripts.js              # Global JavaScript (navigation, scroll effects, parallax)
├── gallery.js              # Gallery-specific scripts (filtering, lightbox, scaling)
├── commission.js           # Commission form handling and validation
├── process.js              # Process page interactions
├── contact.js              # Contact page scripts
├── explore.js              # Explore page functionality
├── images/                 # All image assets organized by piece
│   ├── block island/
│   ├── bromley/
│   ├── cannon/
│   ├── cape ann/
│   ├── fells/
│   ├── hurricane/
│   ├── nantucket/
│   ├── stowe/
│   ├── sunday river/
│   └── trailforks/
├── pieces/                 # Individual piece detail pages
│   ├── block-island.html
│   ├── bromley.html
│   ├── cannon.html
│   ├── cape-ann.html
│   ├── fells.html
│   ├── highland.html
│   ├── hurricane.html
│   ├── nantucket.html
│   ├── okemo.html
│   ├── stowe.html
│   └── sunday-river.html
├── reviews/                # Review/testimonial content
├── viewtest/               # Testing/development files
└── .gitignore              # Git ignore rules
```

---

## Architecture & Design Patterns

### Pure Vanilla Stack
- **No frameworks** - Pure HTML5, CSS3, and ES6+ JavaScript
- **No build process** - Files are production-ready as-is
- **No dependencies** - Everything is self-contained
- **No package.json** - Static site with no npm packages

### CSS Architecture
The `styles.css` file (~66k lines) implements a comprehensive design system:

**CSS Custom Properties (Design Tokens):**
```css
--color-charcoal, --color-brass, --color-text-primary, etc.
--space-1 through --space-8 (spacing scale)
--text-xs through --text-3xl (typography scale)
--font-primary, --font-secondary
```

**Key CSS Patterns:**
- BEM-inspired naming: `.site-header`, `.work-item`, `.gallery-item-media`
- Utility classes: `.fade-in-scroll`, `.is-visible`, `.is-active`
- Responsive design with mobile-first approach
- CSS Grid and Flexbox for layouts
- CSS animations and transitions for smooth UX

### JavaScript Architecture

**Module Pattern:**
Each page has its own JS file that only runs on that specific page. Global scripts in `scripts.js` run on every page.

**Key JavaScript Patterns:**
1. **DOMContentLoaded guards** - All scripts wait for DOM ready
2. **Null checks** - Always check if elements exist before manipulating
3. **IntersectionObserver** - For scroll-triggered animations
4. **requestAnimationFrame** - For smooth scroll effects
5. **Event delegation** - Efficient event handling
6. **Console logging** - All scripts log when loaded (e.g., `console.log('✓ Gallery scripts loaded')`)

**Example Pattern:**
```javascript
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFunction);
} else {
  initFunction();
}
```

---

## Key Features & Functionality

### Global Features (scripts.js)
1. **Auto-sizing work images** - Automatically sets aspect ratios based on image dimensions
2. **Hero parallax effect** - Smooth parallax scrolling on hero images
3. **Scroll-triggered fade-ins** - Elements fade in when scrolled into view (`.fade-in-scroll`)
4. **Mobile navigation toggle** - Hamburger menu for mobile devices
5. **Header hide/show on scroll** - Header hides when scrolling down, shows when scrolling up
6. **Scroll-linked opacity reveal** - Progressive reveal of content as user scrolls

### Gallery Features (gallery.js)
1. **Gallery data array** - Centralized gallery data structure
2. **True scale rendering** - Gallery items sized proportionally to actual piece dimensions
3. **Category filtering** - Filter by mountains, coastlines, trails, urban
4. **Staggered animations** - Items fade in with delay for smooth visual effect
5. **Lightbox functionality** - Full-screen image viewer with keyboard navigation
6. **Aspect ratio preservation** - Maintains proper proportions using data attributes

### Commission Form (commission.js)
1. **Form validation** - Client-side validation before submission
2. **Character counter** - Live character count for story field
3. **Budget helper** - Dynamic pricing guidance based on size selection
4. **Form submission** - Ready for Formspree integration (currently simulated)
5. **Success/error states** - User feedback for form submission

---

## Development Workflows

### File Editing Workflow
1. **Read before editing** - Always read the file before making changes
2. **Test in browser** - Open HTML files directly in browser to test
3. **Check console** - Look for script loading confirmations
4. **Validate changes** - Ensure no broken links or missing assets

### Adding New Pieces
1. **Add images** to `images/{piece-name}/` directory
2. **Create detail page** in `pieces/{piece-name}.html` (use existing as template)
3. **Update gallery data** in `gallery.js` - add new entry to `galleryData` array
4. **Add gallery item** in `gallery.html` with proper data attributes
5. **Update homepage** if featuring as recent work in `index.html`

### Adding New Pages
1. **Create HTML file** in root directory
2. **Include standard header/footer** - Copy from existing pages
3. **Link global styles** - `<link rel="stylesheet" href="styles.css">`
4. **Link global scripts** - `<script src="scripts.js"></script>`
5. **Add page-specific scripts** if needed - Create new `.js` file
6. **Update navigation** - Add to `.site-nav` in all HTML files

---

## Key Conventions

### HTML Conventions
- **Semantic HTML5** - Use proper semantic elements (`<header>`, `<main>`, `<section>`, `<article>`)
- **Accessibility** - Include `aria-label` attributes, proper alt text
- **BEM-style classes** - `.block`, `.block-element`, `.block--modifier`
- **Data attributes** - Used for dynamic behavior (e.g., `data-filter`, `data-category`, `data-width`, `data-height`)

### CSS Conventions
- **Design tokens first** - Use CSS custom properties, not hard-coded values
- **Mobile-first** - Base styles are mobile, use `@media (min-width:...)` for larger screens
- **Class naming** - Descriptive, hyphenated: `.work-item`, `.gallery-item-media`
- **State classes** - `.is-active`, `.is-visible`, `.hidden`
- **Avoid inline styles** - Except for dynamic JavaScript-applied styles

### JavaScript Conventions
- **Modern ES6+** - Use const/let, arrow functions, template literals
- **No jQuery** - Pure vanilla JavaScript only
- **Null safety** - Always check if elements exist before manipulating
- **Event cleanup** - Use `{ once: true }` when appropriate
- **Performance** - Use `requestAnimationFrame` for scroll/animation
- **Console feedback** - Log script loading for debugging

### Naming Conventions

**Files:**
- HTML pages: lowercase with hyphens (`commission.html`, `sunday-river.html`)
- Image folders: lowercase with spaces (`block island/`, `sunday river/`)
- CSS/JS: lowercase with hyphens or camelCase for variables

**Classes:**
- Components: `.component-name` (e.g., `.site-header`, `.work-item`)
- Elements: `.component-element` (e.g., `.work-item-media`)
- Modifiers: `.component--modifier` (e.g., `.nav-link--cta`)
- State: `.is-state` (e.g., `.is-active`, `.is-visible`)

**JavaScript:**
- Variables: camelCase (`const galleryData`, `let currentIndex`)
- Functions: camelCase verbs (`initGalleryFilter`, `openLightbox`)
- Constants: UPPER_CASE for config (`const SCALE = 11`)

---

## Important Guidelines for AI Assistants

### DO:
✅ **Maintain the vanilla stack** - No frameworks, no build tools
✅ **Preserve existing patterns** - Follow established conventions
✅ **Use CSS custom properties** - Don't hard-code colors/spacing
✅ **Check for null** - Always verify elements exist
✅ **Test responsiveness** - Ensure mobile/tablet/desktop compatibility
✅ **Maintain accessibility** - Keep ARIA labels and semantic HTML
✅ **Use BEM-style naming** - Keep class names consistent
✅ **Add console logs** - Help with debugging (`console.log('✓ Script loaded')`)
✅ **Preserve animations** - Maintain smooth transitions and fade-ins
✅ **Keep it simple** - Prioritize clarity over cleverness

### DON'T:
❌ **Add npm packages** - This is a static site
❌ **Add build tools** - No webpack, vite, gulp, etc.
❌ **Use frameworks** - No React, Vue, etc.
❌ **Break the design system** - Don't introduce new color/spacing values
❌ **Remove null checks** - Safety first
❌ **Inline critical CSS** - Keep styles in styles.css
❌ **Add jQuery** - Everything is vanilla JS
❌ **Mix patterns** - Stick to established conventions
❌ **Over-engineer** - Simple solutions are better
❌ **Break responsive design** - Always test mobile view

---

## Common Tasks Reference

### Task: Update Gallery Item
1. Read `gallery.html` to find the item
2. Update image path in `<img src="...">`
3. Update data attributes: `data-width`, `data-height`, `data-category`
4. Update entry in `gallery.js` `galleryData` array
5. Ensure image exists in `images/` directory

### Task: Add New Navigation Link
1. Open all HTML files (or just the main pages)
2. Find `.site-nav .nav-list`
3. Add new `<li class="nav-item">` with proper link
4. Update footer navigation `.footer-nav-list` as well
5. Ensure link styling matches existing

### Task: Modify Color Scheme
1. Open `styles.css`
2. Find CSS custom properties at top of file (`:root {}`)
3. Modify `--color-*` variables
4. Changes propagate throughout entire site
5. Test dark/light sections for contrast

### Task: Add Scroll Animation
1. Add `.fade-in-scroll` class to HTML element
2. `scripts.js` IntersectionObserver handles the rest
3. Element fades in when 50% visible (see `observerOptions`)
4. Animation is one-time only (auto-unobserved)

### Task: Update Commission Form
1. Read `commission.html` for form structure
2. Update fields as needed (maintain accessibility)
3. Read `commission.js` for validation logic
4. Update form data collection in submit handler
5. Configure Formspree or backend endpoint

---

## Data Structures

### Gallery Data Format (gallery.js)
```javascript
{
  title: "Piece Name",           // Display name
  category: "mountains",          // Filter category: mountains|coastlines|trails|urban
  image: "images/folder/file.jpg", // Image path
  meta: "wood types, materials",  // Materials description
  description: "Full description..." // Detailed piece description
}
```

### Gallery HTML Data Attributes
```html
<article class="gallery-item"
         data-category="mountains"
         data-width="33"
         data-height="22">
  <!-- category: filtering
       width/height: true-scale rendering (inches) -->
</article>
```

---

## File Purpose Reference

### Core Pages
- `index.html` - Homepage with hero, philosophy, featured works, process teaser, CTA
- `gallery.html` - Filterable gallery of all pieces with lightbox
- `process.html` - Studio process documentation and storytelling
- `commission.html` - Commission request form with validation
- `about.html` - About the studio/artist background
- `contact.html` - Contact information and methods
- `explore.html` - Discovery/exploration interface

### Individual Pieces (pieces/)
- `{piece-name}.html` - Detail pages for individual artworks
- Each has: hero image, specifications, story, materials, detail photos
- Embedded styles in `<style>` tag for piece-specific layout
- Follows consistent template structure

### Styles & Scripts
- `styles.css` - Complete design system, all components, responsive layouts
- `scripts.js` - Global interactions for all pages
- `gallery.js` - Gallery filtering, lightbox, true-scale rendering
- `commission.js` - Form validation, submission, helper text
- `process.js` - Process page specific interactions
- `contact.js` - Contact page functionality
- `explore.js` - Explore page interactions

### Assets
- `images/` - All photography organized by piece name
- `reviews/` - Customer testimonials and reviews
- `viewtest/` - Development/testing resources

---

## Technical Specifications

### Browser Support
- Modern browsers (ES6+ support required)
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile Safari, Chrome Mobile
- Uses: IntersectionObserver, CSS Grid, CSS Custom Properties, CSS `aspect-ratio`

### Performance Optimizations
- Lazy scroll effects with `requestAnimationFrame`
- IntersectionObserver for viewport-based animations
- Debounced resize handlers
- CSS transitions over JavaScript animations where possible
- Progressive image loading

### Responsive Breakpoints
The site uses mobile-first design. Common breakpoints:
- Mobile: Base styles (< 768px)
- Tablet: `@media (min-width: 768px)`
- Desktop: `@media (min-width: 1024px)`
- Large: `@media (min-width: 1280px)`

---

## Deployment

### Static Hosting Options
This site works on any static host:
- **GitHub Pages** - Push to gh-pages branch
- **Netlify** - Connect repo, auto-deploy on push
- **Vercel** - Import repo, zero config needed
- **Traditional hosting** - Upload via FTP/SFTP

### Deployment Checklist
1. ✅ All images optimized and in place
2. ✅ Forms configured (Formspree ID added to commission.js)
3. ✅ Contact info updated in footer
4. ✅ Social links updated (footer icons)
5. ✅ Console logs removed or minimal
6. ✅ 404 page created (if needed)
7. ✅ Meta tags for SEO (title, description, og:image)
8. ✅ Favicon added

---

## Git Workflow

### Current Branch
- Working on: `claude/claude-md-mkk3y8nlqqf3p74c-6wwOZ`
- Main branch: (not specified - check with `git branch -r`)

### Commit Guidelines
- Use clear, descriptive messages
- Recent pattern: Simple "Update" messages (consider more specific messages)
- Always commit related changes together
- Test before committing

### Push Protocol
- Use: `git push -u origin <branch-name>`
- Branch must start with `claude/` and match session ID
- Retry up to 4 times on network errors (exponential backoff: 2s, 4s, 8s, 16s)

---

## Troubleshooting

### Scripts Not Running
- Check console for errors
- Verify script tags at end of `<body>`
- Ensure file paths are correct
- Check for JavaScript syntax errors
- Verify DOMContentLoaded is firing

### Styles Not Applying
- Clear browser cache
- Check CSS selector specificity
- Verify class names match exactly
- Check for typos in custom property names
- Inspect element to see computed styles

### Images Not Loading
- Verify image paths (case-sensitive on some servers)
- Check folder names (spaces in folder names are preserved)
- Ensure images exist in `images/` directory
- Check file extensions (.jpg vs .jpeg)
- Look for console 404 errors

### Gallery Filter Not Working
- Verify `data-category` matches filter button `data-filter`
- Check that gallery.js is loaded
- Ensure `.gallery-item` elements exist
- Check console for JavaScript errors
- Verify button event listeners attached

---

## Version History

**Current State (2026-01-18):**
- ~7,500 lines of code across HTML/CSS/JS
- 11 individual piece detail pages
- 7 main navigation pages
- Comprehensive design system in CSS
- Fully interactive gallery with filtering
- Commission form with validation
- Scroll-based animations throughout
- Mobile-responsive design

**Recent Updates:**
- Multiple "Update" commits (see git log for details)
- Active development on Claude branch

---

## Contact & Support

For questions about this codebase or to report issues, refer to the repository owner or project documentation.

---

**Last Updated:** 2026-01-18
**Documented By:** Claude AI Assistant
**Purpose:** Guide AI assistants working on this codebase to maintain consistency and quality
