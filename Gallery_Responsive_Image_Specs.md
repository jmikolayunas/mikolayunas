# Gallery Salon Grid - Responsive Image Specifications

## Overview
Desktop display uses the Small (1x) dimensions as the base. Three variants per aspect ratio for mobile, desktop, and retina displays.

---

## Landscape (3:2) - 400px Desktop Base

### Display Dimensions:
- **Mobile (320-767px):** 300px wide
- **Tablet (768-1023px):** 400px wide
- **Desktop (1024-1439px):** 600px wide
- **Large Desktop (1440px+):** 600-800px wide

### Image File Variants:

| Variant | Width | Height | File Name | Quality | Max Size | Usage |
|---------|-------|--------|-----------|---------|----------|-------|
| Small | 300px | 200px | `[piece].hero.crop-300w.webp` | 85% | 80 KB | 320-767px viewports |
| Medium | 400px | 267px | `[piece].hero.crop-400w.webp` | 88% | 120 KB | 768-1023px viewports |
| Large | 600px | 400px | `[piece].hero.crop-600w.webp` | 92% | 200 KB | 1024-1439px viewports |
| XLarge | 800px | 533px | `[piece].hero.crop-800w.webp` | 95% | 300 KB | 1440px+ & retina displays |

### HTML Implementation:
```html
<img 
  srcset="
    images/[piece]/[piece].hero.crop-300w.webp 300w,
    images/[piece]/[piece].hero.crop-400w.webp 400w,
    images/[piece]/[piece].hero.crop-600w.webp 600w,
    images/[piece]/[piece].hero.crop-800w.webp 800w
  "
  sizes="(min-width: 1440px) 600px, (min-width: 1024px) 600px, (min-width: 768px) 400px, 300px"
  src="images/[piece]/[piece].hero.crop-400w.webp"
  alt="[Piece name] topographic relief map"
  class="gallery-item-image"
  loading="lazy"
/>
```

### Pieces Using Landscape:
- Nantucket Island
- Mahoosuc Range
- Cape Ann

---

## Square (1:1) - 360px Desktop Base

### Display Dimensions:
- **Mobile (320-767px):** 270px wide
- **Tablet (768-1023px):** 360px wide
- **Desktop (1024-1439px):** 540px wide
- **Large Desktop (1440px+):** 540-720px wide

### Image File Variants:

| Variant | Width | Height | File Name | Quality | Max Size | Usage |
|---------|-------|--------|-----------|---------|----------|-------|
| Small | 270px | 270px | `[piece].hero.crop-270w.webp` | 85% | 70 KB | 320-767px viewports |
| Medium | 360px | 360px | `[piece].hero.crop-360w.webp` | 88% | 110 KB | 768-1023px viewports |
| Large | 540px | 540px | `[piece].hero.crop-540w.webp` | 92% | 180 KB | 1024-1439px viewports |
| XLarge | 720px | 720px | `[piece].hero.crop-720w.webp` | 95% | 280 KB | 1440px+ & retina displays |

### HTML Implementation:
```html
<img 
  srcset="
    images/[piece]/[piece].hero.crop-270w.webp 270w,
    images/[piece]/[piece].hero.crop-360w.webp 360w,
    images/[piece]/[piece].hero.crop-540w.webp 540w,
    images/[piece]/[piece].hero.crop-720w.webp 720w
  "
  sizes="(min-width: 1440px) 540px, (min-width: 1024px) 540px, (min-width: 768px) 360px, 270px"
  src="images/[piece]/[piece].hero.crop-360w.webp"
  alt="[Piece name] topographic relief map"
  class="gallery-item-image"
  loading="lazy"
/>
```

### Pieces Using Square:
- Middlesex Fells Reservation
- Cannon Mountain
- Highland Mountain

---

## Portrait (2:3) - 340px Desktop Base

### Display Dimensions:
- **Mobile (320-767px):** 260px wide
- **Tablet (768-1023px):** 340px wide
- **Desktop (1024-1439px):** 510px wide
- **Large Desktop (1440px+):** 510-680px wide

### Image File Variants:

| Variant | Width | Height | File Name | Quality | Max Size | Usage |
|---------|-------|--------|-----------|---------|----------|-------|
| Small | 260px | 390px | `[piece].hero.crop-260w.webp` | 85% | 75 KB | 320-767px viewports |
| Medium | 340px | 510px | `[piece].hero.crop-340w.webp` | 88% | 115 KB | 768-1023px viewports |
| Large | 510px | 765px | `[piece].hero.crop-510w.webp` | 92% | 190 KB | 1024-1439px viewports |
| XLarge | 680px | 1020px | `[piece].hero.crop-680w.webp` | 95% | 280 KB | 1440px+ & retina displays |

### HTML Implementation:
```html
<img 
  srcset="
    images/[piece]/[piece].hero.crop-260w.webp 260w,
    images/[piece]/[piece].hero.crop-340w.webp 340w,
    images/[piece]/[piece].hero.crop-510w.webp 510w,
    images/[piece]/[piece].hero.crop-680w.webp 680w
  "
  sizes="(min-width: 1440px) 510px, (min-width: 1024px) 510px, (min-width: 768px) 340px, 260px"
  src="images/[piece]/[piece].hero.crop-340w.webp"
  alt="[Piece name] topographic relief map"
  class="gallery-item-image"
  loading="lazy"
/>
```

### Pieces Using Portrait:
- Mount Mansfield
- Block Island
- Bromley Mountain
- Okemo Mountain

---

## Image Generation Script (Sharp/Node.js)

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Aspect ratio configurations
const aspectRatios = {
  landscape: {
    ratio: [3, 2],
    variants: [
      { width: 300, height: 200, quality: 85, maxSize: 80 },
      { width: 400, height: 267, quality: 88, maxSize: 120 },
      { width: 600, height: 400, quality: 92, maxSize: 200 },
      { width: 800, height: 533, quality: 95, maxSize: 300 }
    ]
  },
  square: {
    ratio: [1, 1],
    variants: [
      { width: 270, height: 270, quality: 85, maxSize: 70 },
      { width: 360, height: 360, quality: 88, maxSize: 110 },
      { width: 540, height: 540, quality: 92, maxSize: 180 },
      { width: 720, height: 720, quality: 95, maxSize: 280 }
    ]
  },
  portrait: {
    ratio: [2, 3],
    variants: [
      { width: 260, height: 390, quality: 85, maxSize: 75 },
      { width: 340, height: 510, quality: 88, maxSize: 115 },
      { width: 510, height: 765, quality: 92, maxSize: 190 },
      { width: 680, height: 1020, quality: 95, maxSize: 280 }
    ]
  }
};

async function generateResponsiveImages(inputPath, outputDir, aspectType, pieceName) {
  const config = aspectRatios[aspectType];
  
  for (const variant of config.variants) {
    const outputPath = path.join(
      outputDir, 
      `${pieceName}.hero.crop-${variant.width}w.webp`
    );
    
    await sharp(inputPath)
      .resize(variant.width, variant.height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: variant.quality })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    const sizeKB = Math.round(stats.size / 1024);
    
    console.log(`✓ ${variant.width}x${variant.height} - ${sizeKB}KB ${sizeKB <= variant.maxSize ? '✓' : '⚠️ OVER'}`);
  }
}

// Example usage:
// generateResponsiveImages(
//   'source/nantucket-hero-crop-full.jpg',
//   'images/nantucket',
//   'landscape',
//   'nantucket'
// );
```

---

## Quick Reference: All Dimensions

### Landscape (3:2):
- 300w: **300px × 200px** (85% quality, 80 KB max)
- 400w: **400px × 267px** (88% quality, 120 KB max)
- 600w: **600px × 400px** (92% quality, 200 KB max)
- 800w: **800px × 533px** (95% quality, 300 KB max)

### Square (1:1):
- 270w: **270px × 270px** (85% quality, 70 KB max)
- 360w: **360px × 360px** (88% quality, 110 KB max)
- 540w: **540px × 540px** (92% quality, 180 KB max)
- 720w: **720px × 720px** (95% quality, 280 KB max)

### Portrait (2:3):
- 260w: **260px × 390px** (85% quality, 75 KB max)
- 340w: **340px × 510px** (88% quality, 115 KB max)
- 510w: **510px × 765px** (92% quality, 190 KB max)
- 680w: **680px × 1020px** (95% quality, 280 KB max)

---

## Export Checklist

For each piece, generate 4 files:

**Landscape pieces:** (Nantucket, Mahoosuc, Cape Ann)
- [ ] `[piece].hero.crop-300w.webp` (300×200)
- [ ] `[piece].hero.crop-400w.webp` (400×267)
- [ ] `[piece].hero.crop-600w.webp` (600×400)
- [ ] `[piece].hero.crop-800w.webp` (800×533)

**Square pieces:** (Middlesex Fells, Cannon, Highland)
- [ ] `[piece].hero.crop-270w.webp` (270×270)
- [ ] `[piece].hero.crop-360w.webp` (360×360)
- [ ] `[piece].hero.crop-540w.webp` (540×540)
- [ ] `[piece].hero.crop-720w.webp` (720×720)

**Portrait pieces:** (Mansfield, Block Island, Bromley, Okemo)
- [ ] `[piece].hero.crop-260w.webp` (260×390)
- [ ] `[piece].hero.crop-340w.webp` (340×510)
- [ ] `[piece].hero.crop-510w.webp` (510×765)
- [ ] `[piece].hero.crop-680w.webp` (680×1020)

Total: **44 image files** (11 pieces × 4 variants each)

---

## File Organization

```
images/
  nantucket/
    nantucket.hero.crop-300w.webp
    nantucket.hero.crop-400w.webp
    nantucket.hero.crop-800w.webp
  mahoosuc/
    mahoosuc.hero.crop-300w.webp
    mahoosuc.hero.crop-400w.webp
    mahoosuc.hero.crop-800w.webp
  fells/
    fells.hero.crop-270w.webp
    fells.hero.crop-360w.webp
    fells.hero.crop-720w.webp
  mansfield/
    mansfield.hero.crop-260w.webp
    mansfield.hero.crop-340w.webp
    mansfield.hero.crop-680w.webp
  [etc...]
```

---

## Notes

- All images are cropped hero compositions (no wooden frames)
- Aspect ratios are EXACT - no letterboxing or pillarboxing
- Quality settings tested for art photography
- Max file sizes are guidelines - adjust if needed to maintain visual quality
- WebP format provides best compression for photographic content
- Source images should be high-resolution for best downscaling results
