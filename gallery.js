// ============================================
// GALLERY PAGE - FILTERING & LIGHTBOX
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
// FILTERING FUNCTIONALITY
// ============================================

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter gallery items
    galleryItems.forEach(item => {
      const category = item.dataset.category;
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
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

lightboxClose.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Navigation
lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
  openLightbox(currentIndex);
});

lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryData.length;
  openLightbox(currentIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
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