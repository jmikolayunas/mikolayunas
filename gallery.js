// ============================================
// GALLERY PAGE - FILTERING & LIGHTBOX
// ============================================

// Gallery data with full details
const galleryData = [
  {
    title: "Mount Rainier Relief",
    category: "mountains",
    image: "images/work-1.jpg",
    meta: "Walnut, epoxy, brass inlay",
    description: "A dramatic relief map of Mount Rainier's glaciated peak, carved from solid walnut with topographic precision. Blue-tinted epoxy fills the valleys while brass inlay traces the summit route."
  },
  {
    title: "Big Sur Coastline",
    category: "coastlines",
    image: "images/work-2.jpg",
    meta: "Maple, blue resin",
    description: "The rugged California coastline rendered in layered maple, with deep blue resin representing the Pacific Ocean. Each contour captures the dramatic elevation changes from sea to ridge."
  },
  {
    title: "Lake Tahoe Depth Map",
    category: "lakes",
    image: "images/work-3.jpg",
    meta: "Ash, teal epoxy, 36\" × 48\"",
    description: "A bathymetric study of Lake Tahoe's legendary depth. Graduated teal resin shows the lake's descent to 1,645 feet, surrounded by the Sierra Nevada peaks in natural ash."
  },
  {
    title: "Grand Teton Range",
    category: "mountains",
    image: "images/work-4.jpg",
    meta: "Cherry, charcoal finish",
    description: "The jagged peaks of the Teton Range carved in rich cherry wood with a charcoal finish that emphasizes the dramatic relief of these ancient mountains."
  },
  {
    title: "San Francisco Topography",
    category: "urban",
    image: "images/work-5.jpg",
    meta: "Birch, graphite stain, brass",
    description: "Seven square miles of San Francisco's iconic hills rendered in birch. Brass markers indicate landmarks while graphite staining highlights the city's surprising elevation changes."
  },
  {
    title: "Maine Archipelago",
    category: "coastlines",
    image: "images/work-6.jpg",
    meta: "Oak, ocean blue resin",
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