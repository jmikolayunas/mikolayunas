# Bonas Studio Responsive Breakpoint Standards

**Version:** 1.0  
**Last Updated:** January 2026  
**Development Philosophy:** Desktop-First Design / Mobile-First Development

---

## Standardized Breakpoints

All CSS and JavaScript must use these exact breakpoints. No exceptions unless explicitly documented.

| Breakpoint Name | Media Query | Target Devices | Usage |
|----------------|-------------|----------------|--------|
| **Mobile** | *(no media query)* | 320px - 767px | Base styles - smartphone portrait/landscape |
| **Tablet** | `@media (min-width: 768px)` | 768px - 1023px | iPad, Android tablets, small laptops |
| **Desktop** | `@media (min-width: 1024px)` | 1024px - 1439px | Laptops, desktop monitors (primary luxury browsing) |
| **Large Desktop** | `@media (min-width: 1440px)` | 1440px+ | Optional enhancements for ultra-wide displays |

---

## Mobile-First Cascade Pattern

**Always write CSS in this order:**

```css
/* 1. Mobile base styles (no media query) */
.selector {
  property: mobile-value;
}

/* 2. Tablet enhancements */
@media (min-width: 768px) {
  .selector {
    property: tablet-value;
  }
}

/* 3. Desktop enhancements */
@media (min-width: 1024px) {
  .selector {
    property: desktop-value;
  }
}

/* 4. Large desktop (optional) */
@media (min-width: 1440px) {
  .selector {
    property: large-value;
  }
}
```

---

## JavaScript Breakpoint Detection

**Use `matchMedia` API, not `window.innerWidth`**

```javascript
// Define breakpoint
const tabletQuery = window.matchMedia('(min-width: 768px)');
const desktopQuery = window.matchMedia('(min-width: 1024px)');
const largeDesktopQuery = window.matchMedia('(min-width: 1440px)');

// Check current state
if (desktopQuery.matches) {
  // Desktop-only code
}

// Listen for changes
desktopQuery.addEventListener('change', (e) => {
  if (e.matches) {
    // Now on desktop
  } else {
    // No longer on desktop
  }
});
```

---

## Forbidden Patterns

**Never use these in new code:**

### ❌ Desktop-First Media Queries
```css
/* WRONG - Desktop-first pattern */
@media (max-width: 767px) {
  .selector { /* mobile overrides */ }
}
```

### ❌ Arbitrary Breakpoints
```css
/* WRONG - Non-standard breakpoint */
@media (min-width: 640px) { }
@media (min-width: 900px) { }
@media (min-width: 1200px) { }
```

### ❌ Pixel-Specific Device Targeting
```css
/* WRONG - Device-specific */
@media (min-width: 375px) and (max-width: 375px) { }
```

### ❌ window.innerWidth in JavaScript
```javascript
// WRONG - Fragile, doesn't match CSS
if (window.innerWidth >= 1024) {
  // Desktop code
}
```

---

## Exceptions & Special Cases

### Retina Display Detection
**Allowed:** Use for high-DPI image optimization
```css
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  /* 2x image assets */
}
```

### Print Styles
**Allowed:** Print has different requirements
```css
@media print {
  /* Print-specific styles */
}
```

### Legacy Code During Refactoring
**Temporary:** Mark with comment and refactor ASAP
```css
/* TODO: Refactor to mobile-first pattern */
@media (max-width: 767px) {
  /* Temporary desktop-first code */
}
```

---

## Testing Matrix

Test all changes at these viewport widths:

| Device Type | Width | Height | Browser DevTools Preset |
|-------------|-------|--------|------------------------|
| Mobile Small | 375px | 667px | iPhone SE |
| Mobile Large | 414px | 896px | iPhone 14 Pro Max |
| Tablet Portrait | 768px | 1024px | iPad |
| Tablet Landscape | 1024px | 768px | iPad (rotated) |
| Desktop Small | 1024px | 768px | Laptop |
| Desktop Standard | 1440px | 900px | Desktop Monitor |
| Desktop Large | 1920px | 1080px | Full HD Monitor |

---

## Common Responsive Patterns

### Typography Scaling
```css
/* Mobile: Smaller, tighter */
.heading-primary {
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* Desktop: Larger, airier (luxury gallery aesthetic) */
@media (min-width: 1024px) {
  .heading-primary {
    font-size: 3.5rem;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }
}
```

### Spacing Scaling
```css
/* Mobile: Compact */
.section {
  padding: 3rem 1.5rem;
}

/* Desktop: Generous breathing room */
@media (min-width: 1024px) {
  .section {
    padding: 6rem 4rem;
  }
}
```

### Layout Shifts
```css
/* Mobile: Stack vertically */
.grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Desktop: Horizontal layout */
@media (min-width: 1024px) {
  .grid {
    flex-direction: row;
    gap: 4rem;
  }
}
```

### Image Presentation
```css
/* Mobile: Full-width, edge-to-edge */
.hero-image {
  width: 100%;
  margin: 0;
}

/* Desktop: Gallery-wall presentation with breathing room */
@media (min-width: 1024px) {
  .hero-image {
    width: 80%;
    margin: 4rem auto;
  }
}
```

---

## Design Philosophy Notes

### Why Desktop-First Design?
**Luxury client psychology:** Clients commissioning $8,000-15,000 pieces browse on desktop in contemplative mode. The primary design experience prioritizes:
- Generous white space (gallery aesthetic)
- Large, detailed images revealing craftsmanship
- Breathing room for slow, considered browsing
- Museum-quality presentation standards

### Why Mobile-First Development?
**Technical best practice:** Progressive enhancement creates cleaner, more maintainable code:
- Base styles apply to all devices (mobile = universal)
- Layer enhancements upward (fewer override conflicts)
- Better performance (mobile loads minimal CSS first)
- Future-proof architecture

### The Hybrid Approach
1. **Design phase:** Sketch/mockup the luxury desktop experience first
2. **Development phase:** Code mobile styles as baseline, enhance upward
3. **Result:** Desktop design looks exactly as intended, mobile gets a thoughtful adapted experience, codebase is clean and maintainable

---

## Quick Reference Card

```css
/* STANDARD BONAS STUDIO RESPONSIVE PATTERN */

/* Mobile (320-767px) - Base styles, no media query */
.component { 
  /* Compact, stacked, essential */
}

/* Tablet (768-1023px) */
@media (min-width: 768px) {
  .component { 
    /* Intermediate scaling */
  }
}

/* Desktop (1024-1439px) - PRIMARY LUXURY EXPERIENCE */
@media (min-width: 1024px) {
  .component { 
    /* Gallery-quality presentation */
    /* Generous white space */
    /* Larger typography */
  }
}

/* Large Desktop (1440px+) - Optional */
@media (min-width: 1440px) {
  .component { 
    /* Ultra-wide enhancements only if needed */
  }
}
```

---

## File Locations

- **CSS Files:** `/css_*.css` (all use these standards)
- **JavaScript Files:** `/scripts.js`, `/process.js`, etc. (use `matchMedia`)
- **This Document:** `/BREAKPOINT_STANDARDS.md` (reference for all developers)

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial standards document - mobile-first refactor |

---

**Questions?** Reference this document before writing any responsive code. When in doubt, follow the mobile-first cascade pattern and use standard breakpoints.
