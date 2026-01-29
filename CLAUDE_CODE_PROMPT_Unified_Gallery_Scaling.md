# Claude Code Task: Implement Unified Scaling for Pieces Gallery Images

## Context & Gallery Standards

Bonas Studio creates luxury topographic art positioned as fine art gallery work. After researching industry standards (The Met, Gagosian, David Zwirner, Tate), we're implementing the standard gallery practice: **unified responsive image sizing across all orientations**.

**Why unified scaling:**
- Matches how prestigious art galleries handle collections
- All gallery images display at same container width (1200px max)
- Simpler asset management and maintenance
- Treats all topographic artworks with equal technical care
- CSS controls display differences, not image variants

---

## Current State vs Target State

### Current Approach (Over-Engineered):
```
Portrait/Square:  600/800/1000/1200w variants
Landscape:        800/1000/1400/1800w variants (different sizes)
```

### Target Approach (Gallery Standard):
```
All orientations: 600/800/1000/1200w variants (unified)
```

---

## Scope: Files to Update

### 1. HTML Files (All Pieces Pages)
**11 piece page files to update:**
- `pieces_block.html`
- `pieces_bromley.html`
- `pieces_cannon.html`
- `pieces_cape-ann.html`
- `pieces_fells.html`
- `pieces_highland.html`
- `pieces_hurricane.html`
- `pieces_mahoosuc.html`
- `pieces_mansfield.html`
- `pieces_nantucket.html`
- `pieces_okemo.html`

**Section:** Gallery images in `.piece-gallery` section (below the hero)

### 2. CSS Files
**Verify/update if needed:**
- `css_pages_piece.css` - Ensure no orientation-specific sizing
- `css_global.css` - Check for any gallery-related responsive rules

### 3. Documentation
**Update reference docs:**
- `/RESPONSIVE_IMAGE_SPECIFICATIONS.md` - Update gallery section tables

---

## Implementation Pattern

### Current HTML Pattern (Inconsistent):

**Portrait/Square images:**
```html
<img 
  src="../images/block/block-detail-portrait.jpg" 
  alt="Block Island detail view"
/>
```

**Landscape images:**
```html
<img 
  src="../images/block/block-full-landscape.jpg" 
  alt="Block Island full piece"
/>
```

### Target HTML Pattern (Unified `srcset`):

**All gallery images (regardless of orientation):**
```html
<img 
  srcset="
    ../images/block/block-detail-600w.webp 600w,
    ../images/block/block-detail-800w.webp 800w,
    ../images/block/block-detail-1000w.webp 1000w,
    ../images/block/block-detail-1200w.webp 1200w
  "
  sizes="(min-width: 1440px) 1200px, (min-width: 1024px) 1000px, (min-width: 768px) 800px, 600px"
  src="../images/block/block-detail-600w.webp"
  alt="Block Island detail view"
  loading="lazy"
/>
```

**Key elements:**
- Same 4 variants for all images: 600/800/1000/1200w
- Same `sizes` attribute for all
- `loading="lazy"` for below-fold gallery images
- `src` fallback uses smallest (600w) variant

---

## Unified Gallery Image Specifications

### Single Standard for All Orientations

| Breakpoint | Viewport Range | Image Width | Max File Size | Quality |
|------------|---------------|-------------|---------------|---------|
| **Mobile** (default) | 320-767px | 600px | 150 KB | 85% |
| **Tablet** | 768-1023px | 800px | 250 KB | 88% |
| **Desktop** | 1024-1439px | 1000px | 350 KB | 92% |
| **Large Desktop** | 1440px+ | 1200px | 400 KB | 95% |

**File Naming Convention (No Orientation Suffix):**
```
[image-name]-600w.webp
[image-name]-800w.webp
[image-name]-1000w.webp
[image-name]-1200w.webp
```

**Examples:**
```
block-detail-600w.webp (not block-detail-portrait-600w.webp)
block-full-600w.webp (not block-full-landscape-600w.webp)
highland-relief-600w.webp
nantucket-ocean-600w.webp
```

---

## CSS Verification

### Ensure No Orientation-Specific Sizing

**Check `css_pages_piece.css` for:**
```css
/* ✓ CORRECT - Unified treatment */
.gallery-images {
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-image-wrapper {
  width: 100%;
}

.gallery-image-wrapper img {
  width: 100%;
  height: auto;
}
```

**Remove if present (orientation-specific rules):**
```css
/* ✗ INCORRECT - Remove these if they exist */
.gallery-image-wrapper--landscape {
  max-width: 1400px;
}

.gallery-image-wrapper--portrait {
  max-width: 900px;
}

/* or any CSS that treats orientations differently */
```

**Current CSS appears correct** - all gallery images treated equally at max-width 1200px. Just verify no orientation-specific classes exist.

---

## Step-by-Step Implementation

### Phase 1: Update HTML Files

For each of the 11 piece pages:

1. **Locate `.piece-gallery` section** (usually around line 93-150)
2. **Identify all `<img>` tags** in `.gallery-image-wrapper` divs
3. **Replace each with unified `srcset` pattern:**

**Template to use:**
```html
<div class="gallery-image-wrapper fade-in-scroll">
  <img 
    srcset="
      ../images/[folder]/[name]-600w.webp 600w,
      ../images/[folder]/[name]-800w.webp 800w,
      ../images/[folder]/[name]-1000w.webp 1000w,
      ../images/[folder]/[name]-1200w.webp 1200w
    "
    sizes="(min-width: 1440px) 1200px, (min-width: 1024px) 1000px, (min-width: 768px) 800px, 600px"
    src="../images/[folder]/[name]-600w.webp"
    alt="[descriptive alt text]"
    loading="lazy"
  />
  <p class="gallery-caption">[existing caption]</p>
</div>
```

**Example transformation:**

**Before:**
```html
<div class="gallery-image-wrapper fade-in-scroll">
  <img src="../images/block/block-island-full.jpg" alt="Block Island full piece view" />
  <p class="gallery-caption">Full piece showing entire topography</p>
</div>
```

**After:**
```html
<div class="gallery-image-wrapper fade-in-scroll">
  <img 
    srcset="
      ../images/block/block-island-full-600w.webp 600w,
      ../images/block/block-island-full-800w.webp 800w,
      ../images/block/block-island-full-1000w.webp 1000w,
      ../images/block/block-island-full-1200w.webp 1200w
    "
    sizes="(min-width: 1440px) 1200px, (min-width: 1024px) 1000px, (min-width: 768px) 800px, 600px"
    src="../images/block/block-island-full-600w.webp"
    alt="Block Island full piece view"
    loading="lazy"
  />
  <p class="gallery-caption">Full piece showing entire topography</p>
</div>
```

### Phase 2: CSS Verification

1. **Open `css_pages_piece.css`**
2. **Search for:** `gallery-image`, `landscape`, `portrait`, `square`
3. **Verify:** No orientation-specific sizing rules exist
4. **Confirm:** All gallery images use unified `.gallery-image-wrapper` styles

**Expected CSS (already correct):**
```css
.gallery-images {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.gallery-image-wrapper {
  position: relative;
  width: 100%;
  /* All images treated equally */
}

.gallery-image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}
```

**If orientation-specific classes exist, remove them.**

### Phase 3: Update Documentation

**Update `/RESPONSIVE_IMAGE_SPECIFICATIONS.md`:**

**Replace this section:**
```markdown
## Gallery Section Images (Pieces Pages)

### Portrait Orientation
[separate table]

### Square Orientation
[separate table]

### Landscape Orientation
[separate table]
```

**With unified section:**
```markdown
## Gallery Section Images (Pieces Pages)
**Location:** Detail images below hero on individual piece pages  
**Aspect Ratio:** Mixed - all orientations treated equally  
**Purpose:** Showcase craftsmanship details, various angles

### Unified Sizing (All Orientations)

| Breakpoint | Viewport Range | Image Width | Max File Size | Quality |
|------------|---------------|-------------|---------------|---------|
| **Mobile** (default) | 320-767px | 600px | 150 KB | 85% |
| **Tablet** | 768-1023px | 800px | 250 KB | 88% |
| **Desktop** | 1024-1439px | 1000px | 350 KB | 92% |
| **Large Desktop** | 1440px+ | 1200px | 400 KB | 95% |

**File Naming Convention:**
```
[image-name]-600w.webp
[image-name]-800w.webp
[image-name]-1000w.webp
[image-name]-1200w.webp
```

**Example:**
```
block-detail-600w.webp (150 KB max)
block-detail-800w.webp (250 KB max)
block-detail-1000w.webp (350 KB max)
block-detail-1200w.webp (400 KB max)
```

**Note:** Gallery standard practice - all artworks receive identical responsive treatment regardless of orientation. Container CSS handles display differences, not image source variants.
```

---

## Image Asset Preparation Notes

**For image generation (not part of this task, but for reference):**

All gallery images should be exported with:
- 4 variants: 600/800/1000/1200w
- Quality: 85/88/92/95%
- Format: WebP
- Max file sizes: 150/250/350/400 KB
- No orientation suffix in filename
- Same transparent border proportions (10/13/17/20px per side)

**This task focuses on HTML/CSS updates**, not image generation.

---

## Testing & Validation

After implementation, verify:

### Visual Testing
1. **Desktop (1440px):** All gallery images display at 1200px max, sharp and clear
2. **Laptop (1024px):** Images display at container width, no quality loss
3. **Tablet (768px):** Images scale appropriately
4. **Mobile (375px):** Images fit screen, load quickly

### Technical Validation

**Check Network Tab (Chrome DevTools):**
```
Mobile (375px):
- Gallery images should load 600w variants (~150 KB each)

Desktop (1440px):
- Gallery images should load 1200w variants (~400 KB each)
```

**Verify HTML:**
```bash
# All piece pages should have consistent srcset pattern
grep -n "srcset=" pieces_*.html | wc -l
# Count should match total gallery images across all pieces

# No orientation-specific filenames in HTML
grep -n "portrait\|landscape\|square" pieces_*.html
# Should return no results in image src/srcset attributes
```

**Verify CSS:**
```bash
# No orientation-specific gallery styling
grep -n "landscape\|portrait\|square" css_pages_piece.css
# Should return no results in gallery image rules
```

### Browser Compatibility
Test in:
- Chrome/Edge (Chromium)
- Safari (WebKit)
- Firefox (Gecko)
- Mobile Safari (iOS)

All modern browsers support `srcset` - should work universally.

---

## Success Criteria

- [ ] All 11 piece pages updated with unified `srcset` pattern
- [ ] All gallery images use 600/800/1000/1200w variants
- [ ] Same `sizes` attribute across all gallery images
- [ ] No orientation-specific CSS rules in `css_pages_piece.css`
- [ ] Documentation updated to reflect unified approach
- [ ] Visual quality maintained at all breakpoints
- [ ] Network tab shows correct variant loading per viewport
- [ ] Loading performance improved (lazy loading on gallery images)
- [ ] Code is cleaner and more maintainable

---

## Gallery Standards Alignment

This implementation matches industry practices:

**What we're doing (Gallery Standard):**
- ✓ Unified sizing across all artwork orientations
- ✓ Container CSS controls display differences
- ✓ Treats all topographic art with equal technical care
- ✓ Simpler asset management
- ✓ Professional, maintainable codebase

**What we're avoiding (Over-Engineering):**
- ✗ Different responsive variants based on orientation
- ✗ Complexity that doesn't match layout reality
- ✗ Non-standard approach vs gallery best practices

---

## Additional Notes

### Why This Matches Your Layout

Current CSS shows:
```css
.gallery-images {
  max-width: 1200px;  /* All images constrained equally */
}

.gallery-image-wrapper {
  width: 100%;  /* All images fill container */
}
```

**All gallery images display at the same width** - they're stacked vertically in a single column. Unified source sizes match this display reality.

### Future-Proofing

If you later decide to display landscape images larger:
```css
/* Future change to CSS only - no HTML updates needed */
.gallery-image-wrapper--landscape {
  max-width: 1400px;
}
```

The browser will automatically select larger variants from the existing srcset. The unified HTML remains correct.

### Philosophical Alignment

Fine art galleries don't editorialize with different technical treatment per orientation. A horizontal Monet landscape and a vertical Vermeer portrait both get the same responsive image options. This approach honors that standard for your topographic art.

---

## Deliverables

1. **11 piece pages updated** with unified `srcset` pattern
2. **CSS verified** - no orientation-specific rules
3. **Documentation updated** - `/RESPONSIVE_IMAGE_SPECIFICATIONS.md`
4. **Testing report** - Network tab screenshots showing correct variant loading
5. **Visual regression check** - Screenshots confirming quality maintained

---

## File Location Reference

```
Project structure:
├── pieces_block.html (update gallery section)
├── pieces_bromley.html (update gallery section)
├── pieces_cannon.html (update gallery section)
├── pieces_cape-ann.html (update gallery section)
├── pieces_fells.html (update gallery section)
├── pieces_highland.html (update gallery section)
├── pieces_hurricane.html (update gallery section)
├── pieces_mahoosuc.html (update gallery section)
├── pieces_mansfield.html (update gallery section)
├── pieces_nantucket.html (update gallery section)
├── pieces_okemo.html (update gallery section)
├── css_pages_piece.css (verify no orientation rules)
├── css_global.css (verify no gallery orientation rules)
└── RESPONSIVE_IMAGE_SPECIFICATIONS.md (update documentation)
```

---

**This implementation brings Bonas Studio in line with gallery industry standards while simplifying the codebase and maintaining the luxury positioning that reflects the $8,000-15,000 commission value of the work.**
