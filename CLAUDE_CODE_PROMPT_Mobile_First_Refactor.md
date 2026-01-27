# Claude Code Task: Refactor CSS to Mobile-First Architecture

## Context & Brand Positioning

Bonas Studio creates luxury custom topographic art ($8,000-15,000 commissions). The website must reflect fine art gallery standards while maintaining technical excellence. This refactoring preserves desktop-first **design** (luxury clients browse on desktop) while implementing mobile-first **development** (cleaner code architecture).

## Task Overview

Refactor all CSS files from inconsistent desktop-first/mobile-first patterns to a **consistent mobile-first cascade** using `min-width` media queries exclusively.

### Files to Refactor (in order):

1. `css_global.css` (foundational - do this first)
2. `css_pages_index.css`
3. `css_pages_gallery.css`
4. `css_pages_piece.css`
5. `css_pages_commission.css`
6. `css_pages_contact.css`
7. `css_pages_about.css`
8. `css_pages_process.css`
9. `css_pages_stories.css`
10. `css_pages_viewer.css`
11. `process.js` (update window.innerWidth to matchMedia)

---

## Refactoring Rules

### 1. Transform Media Query Patterns

**Before (Mixed Approach):**
```css
/* Desktop styles as default */
.hero-section {
  padding: 6rem 8rem;
  max-width: 1200px;
}

@media (max-width: 767px) {
  .hero-section {
    padding: 2rem 1.5rem;
    max-width: 100%;
  }
}
```

**After (Mobile-First):**
```css
/* Mobile styles as default */
.hero-section {
  padding: 2rem 1.5rem;
  max-width: 100%;
}

@media (min-width: 768px) {
  .hero-section {
    padding: 4rem 4rem;
  }
}

@media (min-width: 1024px) {
  .hero-section {
    padding: 6rem 8rem;
    max-width: 1200px;
  }
}
```

### 2. Standardized Breakpoints

Use these exact breakpoints in all media queries:

| Breakpoint | Value | Usage |
|------------|-------|-------|
| Mobile (default) | No media query | Base styles, 320px-767px |
| Tablet | `@media (min-width: 768px)` | iPad/tablet layouts |
| Desktop | `@media (min-width: 1024px)` | Laptop/desktop luxury experience |
| Large Desktop | `@media (min-width: 1440px)` | Optional for ultra-wide enhancements |

**Never use:**
- `max-width` queries (desktop-first pattern)
- Arbitrary breakpoints (640px, 900px, 480px) unless critical
- Pixel-specific device targeting

### 3. Cascade Order Within Each Selector Block

```css
/* ✓ CORRECT: Mobile → Tablet → Desktop */
.component {
  /* Mobile base styles */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .component {
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .component {
    flex-direction: row;
    gap: 3rem;
  }
}

/* ✗ INCORRECT: Don't mix min-width and max-width */
.component {
  display: flex;
}

@media (max-width: 767px) {
  .component { flex-direction: column; }
}

@media (min-width: 1024px) {
  .component { flex-direction: row; }
}
```

### 4. Preserve Luxury Design Principles

**Critical: The visual design must not change on desktop.** This refactor changes code architecture only.

Ensure these remain intact:
- ✓ Generous white space on desktop (4-8rem padding)
- ✓ Gallery-wall image presentations with breathing room
- ✓ Charcoal text (#2E2E2E) on gallery-white backgrounds
- ✓ Brass accent colors (--color-brass)
- ✓ Typography hierarchy (larger sizes on desktop)
- ✓ Full-width vs. contained layouts match original intent

### 5. JavaScript Update: process.js

**Current Code (~line 42-49):**
```javascript
if (window.innerWidth >= 1024) {
  document.body.appendChild(progressBar);
}

window.addEventListener('scroll', () => {
  if (window.innerWidth < 1024) return;
  // ... scroll logic
});
```

**Refactor to:**
```javascript
// Use matchMedia for consistency with CSS
const desktopQuery = window.matchMedia('(min-width: 1024px)');

// Initialize progress bar on desktop
if (desktopQuery.matches) {
  document.body.appendChild(progressBar);
}

// Handle resize events
const handleResize = (e) => {
  if (e.matches && !document.body.contains(progressBar)) {
    document.body.appendChild(progressBar);
  } else if (!e.matches && document.body.contains(progressBar)) {
    progressBar.remove();
  }
};

desktopQuery.addEventListener('change', handleResize);

window.addEventListener('scroll', () => {
  if (!desktopQuery.matches) return;
  
  const journeyTop = processJourney.offsetTop;
  const journeyHeight = processJourney.offsetHeight;
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  
  const scrollProgress = (scrollTop - journeyTop + windowHeight) / (journeyHeight + windowHeight);
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
  
  progressFill.style.height = `${clampedProgress * 100}%`;
});
```

---

## Step-by-Step Process

### For Each CSS File:

1. **Scan for all `@media` queries** - Note line numbers
2. **Identify desktop-first patterns** - Any `max-width` queries
3. **Extract mobile styles** - Pull styles from `max-width` queries into base rules
4. **Rewrite as progressive enhancement** - Use `min-width` queries for tablet/desktop
5. **Consolidate duplicate breakpoints** - Combine multiple 768px queries into one block
6. **Test visually** - Compare before/after at 375px, 768px, 1024px, 1440px

### Example File Workflow:

```bash
# 1. Backup original
cp css_global.css css_global.css.backup

# 2. Refactor css_global.css following mobile-first pattern

# 3. Test in browser at breakpoints:
# - 375px (mobile - iPhone SE)
# - 768px (tablet - iPad)
# - 1024px (desktop - laptop)
# - 1440px (large desktop)

# 4. Verify no visual regressions on desktop

# 5. Move to next file
```

---

## Testing Requirements

After refactoring each file, verify:

### Visual Regression Testing
1. **Desktop (1440px)**: Must look identical to original
2. **Laptop (1024px)**: Must look identical to original  
3. **Tablet (768px)**: Should look good, minor adjustments acceptable
4. **Mobile (375px)**: Should look good, content accessible

### Functionality Testing
1. All scroll animations work
2. Navigation functions at all breakpoints
3. Forms are usable on mobile
4. Images load and display correctly
5. Gallery filters/lightboxes work

### Code Quality Checks
```bash
# No max-width queries remain (except retina display detection)
grep -n "max-width" css_*.css | grep -v "device-pixel-ratio" | grep -v "resolution"

# Breakpoints are standardized
grep -n "@media" css_*.css | grep -v "768px\|1024px\|1440px\|device-pixel-ratio\|resolution"
```

---

## Known Edge Cases

### Retina Display Detection
**Keep this as-is** (uses `max-width` legitimately):
```css
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* Retina-specific styles */
}
```

### Print Styles
If any `@media print` queries exist, leave them unchanged.

### Container Queries
If any `@container` queries exist (unlikely), leave them unchanged.

---

## Deliverables

1. **All 10 CSS files refactored** to mobile-first pattern
2. **process.js updated** to use `matchMedia`
3. **Visual regression report** - Screenshot comparison at 4 breakpoints
4. **Code quality report** - Grep output showing no desktop-first patterns remain

---

## Success Criteria

- [ ] Zero `max-width` media queries (except retina/print)
- [ ] All breakpoints use 768px / 1024px / 1440px standard
- [ ] Desktop design looks identical to original
- [ ] Mobile/tablet layouts are functional and accessible
- [ ] JavaScript uses `matchMedia` instead of `window.innerWidth`
- [ ] Code is cleaner and more maintainable

---

## Additional Context

This is a GitHub Pages site with modular CSS architecture. Files are version-controlled, so don't worry about backups—Git history preserves originals.

The luxury client psychology dictates desktop-first **design thinking** (wealthy clients browse on large screens in contemplative mode), but mobile-first **development** creates better code architecture for long-term brand evolution.

This refactoring sets the foundation for future responsive features while honoring the gallery-quality aesthetic that positions Bonas Studio as fine art, not craft.
