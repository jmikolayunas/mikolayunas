# Bonas Studio Responsive Image Specifications

**Reference:** Mobile-First Development with Desktop-First Design  
**Breakpoints:** Mobile (default) | 768px (tablet) | 1024px (desktop) | 1440px (large desktop)

---

## Hero Images
**Location:** Home page hero, Pieces pages hero  
**Aspect Ratio:** Panoramic (typically 16:9 or 21:9)  
**Purpose:** Primary above-fold gallery-quality presentation

| Breakpoint | Viewport Range | Image Width | Max File Size | Quality |
|------------|---------------|-------------|---------------|---------|
| **Mobile** (default) | 320-767px | 800px | 200 KB | 85% |
| **Tablet** | 768-1023px | 1200px | 400 KB | 90% |
| **Desktop** | 1024-1439px | 1800px | 700 KB | 95% |
| **Large Desktop** | 1440px+ | 2400px | 1000 KB | 98% |

**File Naming Convention:**
```
[image-name]-800w.webp
[image-name]-1200w.webp
[image-name]-1800w.webp
[image-name]-2400w.webp
```

**Example:**
```
nantucket.hero.crop-800w.webp (200 KB max)
nantucket.hero.crop-1200w.webp (400 KB max)
nantucket.hero.crop-1800w.webp (700 KB max)
nantucket.hero.crop-2400w.webp (1000 KB max)
```

---

## Recent Works Images
**Location:** Home page "Recent Works" grid  
**Aspect Ratio:** Mixed (as photographed, typically 4:5 or 1:1)  
**Purpose:** Gallery preview grid, clickable thumbnails

| Breakpoint | Viewport Range | Image Width | Max File Size | Quality |
|------------|---------------|-------------|---------------|---------|
| **Mobile** (default) | 320-767px | 600px | 120 KB | 85% |
| **Tablet** | 768-1023px | 800px | 200 KB | 88% |
| **Desktop** | 1024-1439px | 1000px | 300 KB | 92% |
| **Large Desktop** | 1440px+ | 1200px | 350 KB | 95% |

**File Naming Convention:**
```
[image-name]-600w.webp
[image-name]-800w.webp
[image-name]-1000w.webp
[image-name]-1200w.webp
```

**Example:**
```
block.hero.crop-600w.webp (120 KB max)
block.hero.crop-800w.webp (200 KB max)
block.hero.crop-1000w.webp (300 KB max)
block.hero.crop-1200w.webp (350 KB max)
```

---

## Gallery Section Images (Pieces Pages)
**Location:** Detail images below hero on individual piece pages  
**Aspect Ratio:** Mixed - Portrait, Square, Landscape  
**Purpose:** Showcase craftsmanship details, various angles

### Portrait Orientation (3:4, 4:5 aspect ratio)

| Breakpoint | Viewport Range | Image Width | Max File Size | Quality |
|------------|---------------|-------------|---------------|---------|
| **Mobile** (default) | 320-767px | 600px | 150 KB | 85% |
| **Tablet** | 768-1023px | 800px | 250 KB | 88% |
| **Desktop** | 1024-1439px | 1000px | 350 KB | 92% |
| **Large Desktop** | 1440px+ | 1200px | 400 KB | 95% |

**File Naming Convention:**
```
[image-name]-portrait-600w.webp
[image-name]-portrait-800w.webp
[image-name]-portrait-1000w.webp
[image-name]-portrait-1200w.webp
```

**Example:**
```
block-detail-relief-portrait-600w.webp (150 KB max)
block-detail-relief-portrait-800w.webp (250 KB max)
block-detail-relief-portrait-1000w.webp (350 KB max)
block-detail-relief-portrait-1200w.webp (400 KB max)
```

---

### Square Orientation (1:1 aspect ratio)

| Breakpoint | Viewport Range | Image Width | Max File Size | Quality |
|------------|---------------|-------------|---------------|---------|
| **Mobile** (default) | 320-767px | 600px | 130 KB | 85% |
| **Tablet** | 768-1023px | 800px | 220 KB | 88% |
| **Desktop** | 1024-1439px | 1000px | 300 KB | 92% |
| **Large Desktop** | 1440px+ | 1200px | 350 KB | 95% |

**File Naming Convention:**
```
[image-name]-square-600w.webp
[image-name]-square-800w.webp
[image-name]-square-1000w.webp
[image-name]-square-1200w.webp
```

**Example:**
```
block-detail-texture-square-600w.webp (130 KB max)
block-detail-texture-square-800w.webp (220 KB max)
block-detail-texture-square-1000w.webp (300 KB max)
block-detail-texture-square-1200w.webp (350 KB max)
```

---

### Landscape Orientation (4:3, 16:9 aspect ratio)

| Breakpoint | Viewport Range | Image Width | Max File Size | Quality |
|------------|---------------|-------------|---------------|---------|
| **Mobile** (default) | 320-767px | 800px | 180 KB | 85% |
| **Tablet** | 768-1023px | 1000px | 300 KB | 88% |
| **Desktop** | 1024-1439px | 1400px | 500 KB | 92% |
| **Large Desktop** | 1440px+ | 1800px | 700 KB | 95% |

**File Naming Convention:**
```
[image-name]-landscape-800w.webp
[image-name]-landscape-1000w.webp
[image-name]-landscape-1400w.webp
[image-name]-landscape-1800w.webp
```

**Example:**
```
block-detail-full-landscape-800w.webp (180 KB max)
block-detail-full-landscape-1000w.webp (300 KB max)
block-detail-full-landscape-1400w.webp (500 KB max)
block-detail-full-landscape-1800w.webp (700 KB max)
```

---

## Quick Reference: Image Dimensions by Type

| Image Type | Mobile | Tablet | Desktop | Large Desktop |
|------------|--------|--------|---------|---------------|
| **Hero** | 800px | 1200px | 1800px | 2400px |
| **Recent Works** | 600px | 800px | 1000px | 1200px |
| **Gallery Portrait** | 600px | 800px | 1000px | 1200px |
| **Gallery Square** | 600px | 800px | 1000px | 1200px |
| **Gallery Landscape** | 800px | 1000px | 1400px | 1800px |

---

## Quick Reference: Max File Sizes by Type

| Image Type | Mobile | Tablet | Desktop | Large Desktop |
|------------|--------|--------|---------|---------------|
| **Hero** | 200 KB | 400 KB | 700 KB | 1000 KB |
| **Recent Works** | 120 KB | 200 KB | 300 KB | 350 KB |
| **Gallery Portrait** | 150 KB | 250 KB | 350 KB | 400 KB |
| **Gallery Square** | 130 KB | 220 KB | 300 KB | 350 KB |
| **Gallery Landscape** | 180 KB | 300 KB | 500 KB | 700 KB |

---

## Bandwidth Impact Analysis

### Example: Home Page Load

**Before Optimization (single hero + 3 work images):**
```
Hero: 1000 KB
Work 1: 350 KB
Work 2: 350 KB
Work 3: 350 KB
Total: 2050 KB (~2 MB)
```

**After Optimization:**

**Mobile (375px viewport):**
```
Hero: 200 KB (-80%)
Work 1: 120 KB (-66%)
Work 2: 120 KB (-66%)
Work 3: 120 KB (-66%)
Total: 560 KB (~0.5 MB) — 73% savings
```

**Desktop (1440px viewport):**
```
Hero: 1000 KB (no change)
Work 1: 350 KB (no change)
Work 2: 350 KB (no change)
Work 3: 350 KB (no change)
Total: 2050 KB (~2 MB) — quality preserved
```

---

### Example: Piece Page Load

**Before Optimization (1 hero + 6 gallery images):**
```
Hero: 1000 KB
Gallery (avg): 6 × 400 KB = 2400 KB
Total: 3400 KB (~3.4 MB)
```

**After Optimization:**

**Mobile (375px viewport):**
```
Hero: 200 KB
Gallery (avg): 6 × 150 KB = 900 KB
Total: 1100 KB (~1.1 MB) — 68% savings
```

**Desktop (1440px viewport):**
```
Hero: 1000 KB
Gallery (avg): 6 × 450 KB = 2700 KB
Total: 3700 KB (~3.7 MB) — slight increase for quality
```

---

## Generation Scripts Reference

### Sharp (Node.js) - Recommended

```javascript
const sharp = require('sharp');

// Hero images
const heroSizes = [
  { width: 800, quality: 85, max: 200 },
  { width: 1200, quality: 90, max: 400 },
  { width: 1800, quality: 95, max: 700 },
  { width: 2400, quality: 98, max: 1000 }
];

// Recent Works images
const workSizes = [
  { width: 600, quality: 85, max: 120 },
  { width: 800, quality: 88, max: 200 },
  { width: 1000, quality: 92, max: 300 },
  { width: 1200, quality: 95, max: 350 }
];

// Gallery images (adjust based on orientation)
const galleryPortraitSizes = [
  { width: 600, quality: 85, max: 150 },
  { width: 800, quality: 88, max: 250 },
  { width: 1000, quality: 92, max: 350 },
  { width: 1200, quality: 95, max: 400 }
];

const gallerySquareSizes = [
  { width: 600, quality: 85, max: 130 },
  { width: 800, quality: 88, max: 220 },
  { width: 1000, quality: 92, max: 300 },
  { width: 1200, quality: 95, max: 350 }
];

const galleryLandscapeSizes = [
  { width: 800, quality: 85, max: 180 },
  { width: 1000, quality: 88, max: 300 },
  { width: 1400, quality: 92, max: 500 },
  { width: 1800, quality: 95, max: 700 }
];
```

### ImageMagick (CLI)

```bash
# Hero image example
magick original.webp -resize 800x -quality 85 -define webp:method=6 output-800w.webp
magick original.webp -resize 1200x -quality 90 -define webp:method=6 output-1200w.webp
magick original.webp -resize 1800x -quality 95 -define webp:method=6 output-1800w.webp
magick original.webp -resize 2400x -quality 98 -define webp:method=6 output-2400w.webp

# Verify file size meets max constraint
ls -lh output-*.webp
```

---

## Quality Control Checklist

Before deploying responsive images:

- [ ] **Hero images:** Desktop (1024px+) visually identical to original
- [ ] **Recent Works:** Grid images sharp at all breakpoints
- [ ] **Gallery images:** Detail shots reveal craftsmanship on desktop
- [ ] **File sizes:** All variants under max KB limits
- [ ] **Aspect ratios:** Preserved (no distortion or stretching)
- [ ] **Loading speed:** Mobile loads <2s on 3G, desktop <1s on broadband
- [ ] **Browser testing:** Chrome, Safari, Firefox, Mobile Safari
- [ ] **Retina displays:** High-DPI screens receive appropriate quality

---

## Notes on Quality Settings

**Why these specific quality percentages?**

- **85% (Mobile):** Imperceptible quality loss on small screens, significant bandwidth savings
- **88-90% (Tablet):** Balanced for medium screens, good quality with reasonable file size
- **92-95% (Desktop):** High quality for luxury browsing experience, minimal compression artifacts
- **98% (Large Desktop):** Near-lossless for ultra-wide displays, showcases craftsmanship

**Why WebP format?**
- 25-35% smaller than JPEG at equivalent quality
- Supported by 96%+ of browsers (all modern devices)
- Better for art photography than PNG (smaller files)

**When to adjust quality:**
- If desktop images show compression artifacts → increase to 97-99%
- If mobile file sizes exceed limits → decrease to 82-83%
- If tablet images look soft → increase to 90-92%

---

## Maintenance: Adding New Images

### For New Pieces:

1. **Hero image:** Generate 4 variants (800w, 1200w, 1800w, 2400w)
2. **Gallery images:** 
   - Determine orientation (portrait/square/landscape)
   - Generate 4 variants per orientation spec
3. **Verify file sizes:** Must be under max KB limits
4. **Update HTML:** Use established `srcset` pattern
5. **Test:** Visual check at all 4 breakpoints

### File Organization:
```
images/
  [piece-name]/
    [piece-name].hero-800w.webp
    [piece-name].hero-1200w.webp
    [piece-name].hero-1800w.webp
    [piece-name].hero-2400w.webp
    [piece-name]-detail-1-portrait-600w.webp
    [piece-name]-detail-1-portrait-800w.webp
    [piece-name]-detail-1-portrait-1000w.webp
    [piece-name]-detail-1-portrait-1200w.webp
    ...etc
```

---

**Last Updated:** January 2026  
**Reference:** `/BREAKPOINT_STANDARDS.md`
