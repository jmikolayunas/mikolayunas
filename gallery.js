// ============================================
// GALLERY PAGE - FILTERING & LAYOUT
// ============================================

// Gallery data with full details
const galleryData = [
  {
    title: "Mt. Mansfield",
    category: "mountains",
    image: "images/stowe/stowe-front-full.jpg",
    meta: "maple, walnut",
    description: "A true-to-scale relief map of Mount Mansfield, the home of Mt. Snow ski resort, carved from solid maple and walnut. Laser-etched tree lines and negative space shading allow the slopes to reveal themselves."
  },
  {
    title: "Nantucket Island",
    category: "coastlines",
    image: "images/work-2.jpg",
    meta: "maple, walnut, resin",
    description: "The rugged California coastline rendered in layered maple, with deep blue resin representing the Pacific Ocean. Each contour captures the dramatic elevation changes from sea to ridge."
  },
  {
    title: "Hurricane Mountain Trails",
    category: "trails",
    image: "images/work-3.jpg",
    meta: "birch, walnut",
    description: "A bathymetric study of Lake Tahoe's legendary depth. Graduated teal resin shows the lake's descent to 1,645 feet, surrounded by the Sierra Nevada peaks in natural ash."
  },
  {
    title: "Mahoosuc Mountain Range",
    category: "mountains",
    image: "images/work-4.jpg",
    meta: "basswood, birch, walnut",
    description: "The jagged peaks of the Teton Range carved in rich cherry wood with a charcoal finish that emphasizes the dramatic relief of these ancient mountains."
  },
  {
    title: "Middlesex Fells Reservation",
    category: "urban",
    image: "images/work-5.jpg",
    meta: "maple, walnut, birch, gold leaf",
    description: "Seven square miles of San Francisco's iconic hills rendered in birch. Brass markers indicate landmarks while graphite staining highlights the city's surprising elevation changes."
  },
  {
    title: "Block Island",
    category: "coastlines",
    image: "images/work-6.jpg",
    meta: "maple, mahogany, resin",
    description: "The complex island ecosystem of coastal Maine, with hundreds of islands emerging from deep blue resin. White oak captures the rocky, weathered character of the North Atlantic shore."
  },
  {
    title: "Cape Ann",
    category: "coastlines",
    image: "images/work-6.jpg",
    meta: "maple, birch, mahogany, resin",
    description: "The complex island ecosystem of coastal Maine, with hundreds of islands emerging from deep blue resin. White oak captures the rocky, weathered character of the North Atlantic shore."
  }
];

// ============================================
// SET TRUE SCALE FOR GALLERY ITEMS
// ============================================

function setGalleryTrueScale() {
  const galleryItems = document.querySelectorAll('.gallery-item[data-width][data-height]');

  // Define scale: 1 inch = X pixels
  // Adjust this value to make all pieces larger or smaller
  const SCALE = 11; // 11 pixels per inch (adjust as needed)

  galleryItems.forEach(item => {
    const widthInches = parseFloat(item.dataset.width);
    const heightInches = parseFloat(item.dataset.height);
    const media = item.querySelector('.gallery-item-media');

    if (media && widthInches && heightInches) {
      // Calculate pixel dimensions based on scale
      const widthPixels = widthInches * SCALE;
      const heightPixels = heightInches * SCALE;

      // Set dimensions on the item container
      item.style.width = `${widthPixels}px`;
      item.style.maxWidth = `${widthPixels}px`;

      // Set dimensions on the media container (width AND height)
      media.style.width = `${widthPixels}px`;
      media.style.height = `${heightPixels}px`;

      console.log(`Scaled ${widthInches}"×${heightInches}" to ${widthPixels}px×${heightPixels}px`);
    }
  });
}

// ============================================
// GALLERY FILTER FUNCTIONALITY
// ============================================

function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Show all items on initial page load
  setTimeout(() => {
    galleryItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('is-visible');
      }, index * 80);
    });
  }, 100);

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // STEP 1: Fade out ALL items (regardless of filter match)
      galleryItems.forEach(item => {
        item.classList.remove('is-visible');
      });

      // STEP 2: After fade-out completes, update hidden states
      setTimeout(() => {
        galleryItems.forEach(item => {
          const itemCategory = item.dataset.category;

          if (filterValue !== 'all' && itemCategory !== filterValue) {
            item.classList.add('hidden');
          } else {
            item.classList.remove('hidden');
          }
        });

        // STEP 3: Stagger fade-in of ALL visible items
        setTimeout(() => {
          let visibleIndex = 0;

          galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;

            if (filterValue === 'all' || itemCategory === filterValue) {
              setTimeout(() => {
                item.classList.add('is-visible');
              }, visibleIndex * 80);

              visibleIndex++;
            }
          });
        }, 50);
      }, 1500); // Wait for fade-out transition to complete
    });
  });
}

// ============================================
// GALLERY ASPECT RATIOS
// ============================================

function setGalleryAspectRatios() {
  const galleryItems = document.querySelectorAll('.gallery-item[data-width][data-height]');

  galleryItems.forEach(item => {
    const width = parseFloat(item.dataset.width);
    const height = parseFloat(item.dataset.height);
    const media = item.querySelector('.gallery-item-media');

    if (media && width && height) {
      media.style.aspectRatio = `${width} / ${height}`;
    }
  });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setGalleryTrueScale();
    setGalleryAspectRatios();
    initGalleryFilter();
  });
} else {
  setGalleryTrueScale();
  setGalleryAspectRatios();
  initGalleryFilter();
}

// Recalculate on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(setGalleryTrueScale, 150);
});

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMeta = document.getElementById('lightbox-meta');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentIndex = 0;

// Open lightbox
const galleryLinks = document.querySelectorAll('.gallery-item-link');
galleryLinks.forEach(link => {
  link.addEventListener('click', () => {
    currentIndex = parseInt(link.dataset.index);
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  const item = galleryData[index];

  lightboxImage.src = item.image;
  lightboxImage.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxMeta.textContent = item.meta;
  lightboxDescription.textContent = item.description;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

// Close on background click
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// Navigation
if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentIndex);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    openLightbox(currentIndex);
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentIndex);
  } else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % galleryData.length;
    openLightbox(currentIndex);
  }
});

console.log('✓ Gallery scripts loaded');
