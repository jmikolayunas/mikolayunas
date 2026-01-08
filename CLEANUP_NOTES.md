# Bonas Studio - Codebase Cleanup Plan

## Overview
Systematic cleanup and standardization of HTML/CSS/JS without changing visual output or behavior.

## Changes Tracking

### styles.css
- [ ] Remove duplicate `.filter-btn` definitions (lines 960-982 vs gallery.html inline)
- [ ] Remove duplicate `.gallery-grid` definitions
- [ ] Move gallery.html inline styles into main CSS
- [ ] Sort CSS properties: layout → typography → color → effects → responsive
- [ ] Add CSS variables for repeated values (shadows, transitions, etc.)
- [ ] Consolidate gradient definitions
- [ ] Ensure consistent 2-space indentation

### gallery.html
- [ ] Remove inline `<style>` block (move to styles.css)
- [ ] Standardize 2-space indentation
- [ ] Ensure consistent formatting

### index.html
- [ ] Remove inline `<style>` block (move to styles.css)
- [ ] Standardize formatting

### scripts.js
- [ ] Sort functions logically
- [ ] Ensure consistent 2-space indentation
- [ ] Add consistent section comments
- [ ] Remove dead code if any

### gallery.js
- [ ] Organize functions logically
- [ ] Ensure consistent formatting
- [ ] Remove unused galleryData entries

## Duplicates Found
1. `.filter-btn` - defined in styles.css AND gallery.html inline styles (different implementations!)
2. `.gallery-grid` - multiple definitions
3. `.gallery-item` - base styles + gallery-specific overrides need consolidation

## CSS Variables to Add
- `--transition-smooth`: 0.3s ease
- `--transition-slow`: 0.6s ease
- `--shadow-sm`: 0 2px 16px rgba(0, 0, 0, 0.03)
- `--shadow-md`: 0 4px 32px rgba(0, 0, 0, 0.06)
- `--shadow-lg`: 0 10px 40px rgba(0, 0, 0, 0.1)
- `--header-height`: 60px
- `--overlay-gradient`: linear-gradient(...)

## Files to Clean
### Priority 1 (Core)
- [x] styles.css
- [x] gallery.html
- [x] index.html
- [x] scripts.js
- [x] gallery.js

### Priority 2 (Main Pages)
- [ ] about.html
- [ ] contact.html
- [ ] commission.html
- [ ] process.html

### Priority 3 (Supporting)
- [ ] Other JS files (contact.js, commission.js, process.js, explore.js)
- [ ] Piece detail pages (pieces/*.html)

## Rules
✓ NO class name changes
✓ NO ID changes
✓ NO data attribute changes
✓ NO file path changes
✓ Keep rendered layout identical
✓ Prefer minimal diffs
✓ Explain all removals
