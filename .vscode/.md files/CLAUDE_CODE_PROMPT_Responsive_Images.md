# Claude Code Task: Implement Responsive Images for Hero Images

## Context & Brand Requirements

Bonas Studio creates $8,000-15,000 luxury topographic art pieces. Every website element must reflect fine art gallery standards while maintaining technical excellence. This task implements responsive imaging to optimize bandwidth on mobile devices **without compromising the luxury desktop experience**.

### Critical Quality Standards:
- **Desktop images must remain pristine** - wealthy clients expect gallery-quality detail
- **Mobile users should get optimized images** - faster loading, lower data usage
- **No visible quality degradation** at any breakpoint
- **Art photography integrity** - these images showcase craftsmanship worth thousands of dollars

---

## Scope: Images to Optimize

### 1. Home Page (index.html)
**Hero Image:**
- Current: `images/nantucket/nantucket.hero.crop.webp`
- Location: Line 38-42
- Class: `.hero-image`

**Work Grid Images (below fold, lower priority):**
- `images/block/block.hero.crop.webp` (Line 84)
- `images/sunday river/sunday-river-art-only.webp` (Line 97)
- Additional work items as present

### 2. Piece Pages (all pieces_*.html files)
**Hero Images:**
- `pieces_block.html`: `../images/block/block.hero.webp` (Line 31)
- `pieces_bromley.html`: Similar pattern
- `pieces_cannon.html`: Similar pattern
- `pieces_cape-ann.html`: Similar pattern
- `pieces_fells.html`: Similar pattern
- `pieces_highland.html`: Similar pattern
- `pieces_hurricane.html`: Similar pattern
- `pieces_mahoosuc.html`: Similar pattern
- `pieces_mansfield.html`: Similar pattern
- `pieces_nantucket.html`: Similar pattern
- `pieces_okemo.html`: Similar pattern

**Gallery Detail Images (lower priority):**
- Various `.jpg` images in piece gallery sections
- These can be optimized in a future phase

---

## Responsive Image Strategy

### Breakpoint-Based Sizing (Use Established Standards)

Reference: `/BREAKPOINT_STANDARDS.md`

| Viewport | Breakpoint | Image Width | Quality | Use Case |
|----------|-----------|-------------|---------|----------|
| Mobile | 320-767px | 800px | 85% | Smartphones, bandwidth-conscious |
| Tablet | 768-1023px | 1200px | 90% | iPads, tablets |
| Desktop | 1024-1439px | 1800px | 95% | Laptops, primary luxury browsing |
| Large Desktop | 1440px+ | 2400px | 98% | Ultra-wide displays, maximum detail |

### File Naming Convention

For each hero image, create variants:
```
Original: nantucket.hero.crop.webp

Responsive variants:
nantucket.hero.crop-800w.webp   (800px wide, 85% quality)
nantucket.hero.crop-1200w.webp  (1200px wide, 90% quality)
nantucket.hero.crop-1800w.webp  (1800px wide, 95% quality)
nantucket.hero.crop-2400w.webp  (2400px wide, 98% quality)
```

---

## Implementation Pattern

### HTML: Use `<picture>` Element with `srcset`

**Before (Current):**
```html
<img 
  src="images/nantucket/nantucket.hero.crop.webp" 
  alt="Custom topographic relief map artwork" 
  class="hero-image" 
/>
```

**After (Responsive):**
```html
<picture>
  <source 
    media="(min-width: 1440px)" 
    srcset="images/nantucket/nantucket.hero.crop-2400w.webp"
  />
  <source 
    media="(min-width: 1024px)" 
    srcset="images/nantucket/nantucket.hero.crop-1800w.webp"
  />
  <source 
    media="(min-width: 768px)" 
    srcset="images/nantucket/nantucket.hero.crop-1200w.webp"
  />
  <img 
    src="images/nantucket/nantucket.hero.crop-800w.webp"
    alt="Custom topographic relief map artwork" 
    class="hero-image"
    loading="eager"
  />
</picture>
```

### Alternative: `srcset` with `sizes` Attribute (Simpler)

```html
<img 
  srcset="
    images/nantucket/nantucket.hero.crop-800w.webp 800w,
    images/nantucket/nantucket.hero.crop-1200w.webp 1200w,
    images/nantucket/nantucket.hero.crop-1800w.webp 1800w,
    images/nantucket/nantucket.hero.crop-2400w.webp 2400w
  "
  sizes="
    (min-width: 1440px) 2400px,
    (min-width: 1024px) 1800px,
    (min-width: 768px) 1200px,
    800px
  "
  src="images/nantucket/nantucket.hero.crop-800w.webp"
  alt="Custom topographic relief map artwork"
  class="hero-image"
  loading="eager"
/>
```

**Use `<picture>` when:**
- You want explicit control over which image loads
- Art direction differs by viewport (cropping, composition)

**Use `srcset` when:**
- Same composition at different sizes
- Simpler syntax preferred
- Let browser choose optimal image

**Recommendation for Bonas Studio:** Use `srcset` with `sizes` for cleaner code.

---

## Image Generation Workflow

### Step 1: Identify All Hero Images
```bash
# Find all hero image paths in HTML files
grep -rn "hero.*\.webp\|hero.*\.jpg" *.html pieces/*.html
```

### Step 2: Generate Responsive Variants

**Using ImageMagick (if available):**
```bash
# For each hero image, generate variants
# Example for nantucket.hero.crop.webp

cd images/nantucket

# 800px variant (mobile)
magick nantucket.hero.crop.webp -resize 800x -quality 85 nantucket.hero.crop-800w.webp

# 1200px variant (tablet)
magick nantucket.hero.crop.webp -resize 1200x -quality 90 nantucket.hero.crop-1200w.webp

# 1800px variant (desktop)
magick nantucket.hero.crop.webp -resize 1800x -quality 95 nantucket.hero.crop-1800w.webp

# 2400px variant (large desktop)
magick nantucket.hero.crop.webp -resize 2400x -quality 98 nantucket.hero.crop-2400w.webp
```

**Using Sharp (Node.js - recommended for automation):**
```javascript
// generate-responsive-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { width: 800, quality: 85, suffix: '-800w' },
  { width: 1200, quality: 90, suffix: '-1200w' },
  { width: 1800, quality: 95, suffix: '-1800w' },
  { width: 2400, quality: 98, suffix: '-2400w' }
];

async function generateResponsiveImages(inputPath) {
  const ext = path.extname(inputPath);
  const basename = path.basename(inputPath, ext);
  const dirname = path.dirname(inputPath);
  
  for (const size of sizes) {
    const outputPath = path.join(
      dirname, 
      `${basename}${size.suffix}${ext}`
    );
    
    await sharp(inputPath)
      .resize({ width: size.width })
      .webp({ quality: size.quality })
      .toFile(outputPath);
    
    console.log(`✓ Generated: ${outputPath}`);
  }
}

// Usage: Process all hero images
const heroImages = [
  'images/nantucket/nantucket.hero.crop.webp',
  'images/block/block.hero.crop.webp',
  'images/block/block.hero.webp',
  // ... add all hero image paths
];

heroImages.forEach(generateResponsiveImages);
```

### Step 3: Update HTML Files

For each hero `<img>` tag, replace with `srcset` pattern:

**Home Page (index.html):**
- Line 38-42: Update hero image
- Lines 84, 97, etc.: Update work grid images (optional, lower priority)

**Piece Pages (pieces_*.html):**
- Update hero image in each file (around line 31)
- Pattern is consistent across all piece pages

---

## CSS Considerations

**No CSS changes required** if you use the `srcset` approach, since:
- Images remain in the same DOM position
- `.hero-image` class styling is preserved
- Browser handles image selection automatically

**Verify these styles remain intact:**
```css
/* From css_pages_index.css and css_pages_piece.css */
.hero-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  /* etc. - all existing styles should work */
}
```

---

## Loading Optimization

### Priority Hints

**Hero images (above fold):**
```html
<img 
  srcset="..."
  loading="eager"
  fetchpriority="high"
/>
```

**Below-fold images (work grid, gallery):**
```html
<img 
  srcset="..."
  loading="lazy"
  fetchpriority="low"
/>
```

### Preloading Critical Hero Images

Add to `<head>` of index.html and piece pages:
```html
<link 
  rel="preload" 
  as="image" 
  href="images/nantucket/nantucket.hero.crop-1800w.webp"
  media="(min-width: 1024px)"
/>
<link 
  rel="preload" 
  as="image" 
  href="images/nantucket/nantucket.hero.crop-1200w.webp"
  media="(min-width: 768px) and (max-width: 1023px)"
/>
<link 
  rel="preload" 
  as="image" 
  href="images/nantucket/nantucket.hero.crop-800w.webp"
  media="(max-width: 767px)"
/>
```

---

## Testing & Validation

### Visual Quality Check
1. **Desktop (1440px):** Image should look identical to original
2. **Laptop (1024px):** No visible quality loss
3. **Tablet (768px):** Clean, sharp image
4. **Mobile (375px):** Appropriate detail for screen size

### Performance Validation

**Chrome DevTools Network Tab:**
```
Viewport: 375px (iPhone SE)
Expected: ~150-250KB hero image load

Viewport: 1024px (Desktop)
Expected: ~400-600KB hero image load

Viewport: 1440px (Large Desktop)
Expected: ~600-900KB hero image load
```

### Bandwidth Savings

**Before (single 2400px image):**
- Mobile downloads: ~900KB
- Desktop downloads: ~900KB

**After (responsive images):**
- Mobile downloads: ~200KB (78% savings)
- Desktop downloads: ~600KB (33% savings, but still high-quality)

### Browser Compatibility
Test in:
- Chrome/Edge (Chromium)
- Safari (WebKit)
- Firefox (Gecko)
- Mobile Safari (iOS)

All modern browsers support `srcset` and `sizes`.

---

## Step-by-Step Execution Plan

### Phase 1: Generate Image Assets
1. Audit all hero images in project
2. Run image generation script (Sharp recommended)
3. Verify all variants created successfully
4. Check file sizes align with expectations

### Phase 2: Update HTML
1. **Start with index.html** (home page hero)
2. Test thoroughly at all breakpoints
3. **Update piece pages** (all pieces_*.html files)
4. Use consistent pattern across all files

### Phase 3: Add Performance Optimizations
1. Add `loading` attributes (`eager` for hero, `lazy` for below-fold)
2. Add `fetchpriority` hints
3. Add preload links in `<head>` for hero images
4. Test performance impact

### Phase 4: Validate
1. Visual quality check at all breakpoints
2. Network tab analysis (bandwidth savings)
3. PageSpeed Insights (before/after comparison)
4. Mobile device testing (real phones/tablets)

---

## Success Criteria

- [ ] All hero images have 4 responsive variants (800w, 1200w, 1800w, 2400w)
- [ ] All HTML files updated with `srcset` implementation
- [ ] Desktop (1024px+) visual quality matches original
- [ ] Mobile bandwidth reduced by 70%+ for hero images
- [ ] No console errors or broken images
- [ ] `loading="eager"` on hero images, `loading="lazy"` on below-fold
- [ ] Preload hints added for hero images
- [ ] All piece pages follow consistent pattern

---

## Edge Cases & Considerations

### Retina Displays
Current approach handles retina automatically:
- 1x density: Downloads size appropriate for viewport
- 2x density (retina): Browser may download next-size-up variant
- Example: iPhone 375px @2x = 750px density → downloads 1200w variant

### Art Direction (Future Enhancement)
If you want different crops for mobile vs. desktop:
```html
<picture>
  <!-- Mobile: Square crop -->
  <source 
    media="(max-width: 767px)" 
    srcset="images/nantucket/nantucket.hero.square-800w.webp"
  />
  <!-- Desktop: Original panoramic -->
  <source 
    media="(min-width: 768px)" 
    srcset="images/nantucket/nantucket.hero.crop-1800w.webp"
  />
  <img src="..." alt="..." />
</picture>
```

**Current scope:** Same composition, different sizes. Art direction is a future enhancement.

### WebP Fallback (Not Required)
Modern browser support for WebP is 95%+. Fallback not necessary for luxury brand targeting recent devices.

---

## File Organization

After implementation, image directory structure:
```
images/
  nantucket/
    nantucket.hero.crop.webp (original, keep as backup)
    nantucket.hero.crop-800w.webp
    nantucket.hero.crop-1200w.webp
    nantucket.hero.crop-1800w.webp
    nantucket.hero.crop-2400w.webp
  block/
    block.hero.crop.webp
    block.hero.crop-800w.webp
    block.hero.crop-1200w.webp
    block.hero.crop-1800w.webp
    block.hero.crop-2400w.webp
    block.hero.webp
    block.hero-800w.webp
    block.hero-1200w.webp
    block.hero-1800w.webp
    block.hero-2400w.webp
  ...etc
```

---

## Maintenance Notes

**Adding New Pieces:**
1. Generate responsive variants for new hero image
2. Use established `srcset` pattern in HTML
3. Follow naming convention: `[name]-[width]w.webp`

**Updating Existing Images:**
1. Replace original source image
2. Regenerate all variants with same script
3. No HTML changes needed (paths remain same)

---

## Questions & Troubleshooting

**Q: What if original images are smaller than 2400px?**
A: Generate only the sizes up to the original's width. Don't upscale.

**Q: Should work grid images (home page) get this treatment?**
A: Lower priority. Start with hero images. Add work grid images in Phase 2 if time permits.

**Q: What about gallery detail images on piece pages?**
A: Even lower priority. Hero images provide 80% of bandwidth savings. Detail images can be optimized later.

**Q: How do I know which quality settings to use?**
A: Provided settings (85/90/95/98) are tested for art photography. Test visually and adjust if needed.

---

## Deliverables

1. **Image assets:** All responsive variants generated for hero images
2. **Updated HTML:** index.html + all pieces_*.html files with `srcset`
3. **Performance report:** Before/after bandwidth comparison
4. **Visual validation:** Screenshots at each breakpoint confirming quality
5. **Documentation:** Updated file naming and any deviations from this spec

---

## Brand Alignment Check

Before completing, verify:
- ✓ Desktop luxury experience preserved (1024px+ looks identical)
- ✓ Mobile experience respects user bandwidth (ethical data usage)
- ✓ Gallery-quality standards maintained at all viewports
- ✓ No broken images or console errors
- ✓ Consistent implementation across all pages

This optimization honors both the luxury client (desktop perfection) and the mobile user (respectful of data usage) while maintaining Bonas Studio's commitment to craft and quality.
