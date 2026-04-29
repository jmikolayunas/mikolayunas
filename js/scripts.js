// ============================================
// JONAS MIKOLAYUNAS - GLOBAL INTERACTIONS
// ============================================

// ============================================
// AUTO-SIZE WORK ITEM IMAGES
// Automatically adjusts containers to match image dimensions
// ============================================

function autoSizeWorkImages() {
  const workItems = document.querySelectorAll('.work-item');

  workItems.forEach(item => {
    const workMedia = item.querySelector('.work-media');
    const mainImage = item.querySelector('.work-image:not(.work-image--detail)');

    if (!mainImage || !workMedia) return;

    // Wait for image to load
    if (mainImage.complete) {
      setAspectRatio(mainImage, workMedia);
    } else {
      mainImage.addEventListener('load', () => {
        setAspectRatio(mainImage, workMedia);
      });
    }
  });
}

function setAspectRatio(image, container) {
  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;

  if (naturalWidth && naturalHeight) {
    const aspectRatio = naturalWidth / naturalHeight;

    // Set CSS aspect ratio on container
    container.style.aspectRatio = `${aspectRatio}`;

    // Add data attribute for reference
    container.setAttribute('data-aspect-ratio', aspectRatio.toFixed(3));

    console.log(`✓ Auto-sized: ${aspectRatio.toFixed(3)} ratio (${naturalWidth}×${naturalHeight})`);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', autoSizeWorkImages);

// Re-run if window is resized (in case images reload)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(autoSizeWorkImages, 250);
});

// ============================================
// HERO PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ============================================
// SCROLL-TRIGGERED FADE-INS
// ============================================

function initFadeInOnScroll() {
  // Supports both page-wide fade-ins and gallery image wrappers
  const targets = document.querySelectorAll('.gallery-image-wrapper, .fade-in-scroll');
  if (!targets.length) return;

  // Tuned for smooth reveals as elements approach the viewport
  const options = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Only trigger once
        observer.unobserve(entry.target);
      }
    });
  }, options);

  targets.forEach(el => observer.observe(el));
}

function initBackToGalleryButton() {
  const backButton = document.getElementById('back-to-gallery');
  if (!backButton) return;

  const detailsSection = document.getElementById('details');
  const gallerySection = document.querySelector('.piece-gallery');

  // If a page doesn't have the expected sections, fail gracefully.
  if (!detailsSection || !gallerySection) return;

  // Optional per-page tuning via: data-buffer="120"
  const buffer = parseInt(backButton.dataset.buffer || '100', 10);

  function updateButtonVisibility() {
    const scrollY = window.scrollY;
    const detailsTop = detailsSection.offsetTop;
    const galleryBottom = gallerySection.offsetTop + gallerySection.offsetHeight;

    const shouldShow = scrollY >= (detailsTop - buffer) && scrollY < (galleryBottom - buffer);
    backButton.classList.toggle('is-visible', shouldShow);
  }

  // Run once now + on scroll/resize
  updateButtonVisibility();
  window.addEventListener('scroll', updateButtonVisibility, { passive: true });
  window.addEventListener('resize', updateButtonVisibility);
}

function initSite() {
  initFadeInOnScroll();
  initBackToGalleryButton();
}

// Ensure DOM exists before querying for page features
document.addEventListener('DOMContentLoaded', initSite);

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const headerContainer = document.querySelector('.header-container');
const body = document.body;

function closeNav() {
  siteNav.classList.remove('is-active');
  navToggle.classList.remove('is-active');
  // Return nav to header so desktop layout stays intact
  headerContainer.insertBefore(siteNav, navToggle);
  body.style.overflow = '';
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isActive = siteNav.classList.toggle('is-active');
    navToggle.classList.toggle('is-active');

    if (isActive) {
      // Move nav to body level — escapes site-header's backdrop-filter
      // stacking context so position:fixed covers the full viewport
      document.body.appendChild(siteNav);
      body.style.overflow = 'hidden';
    } else {
      headerContainer.insertBefore(siteNav, navToggle);
      body.style.overflow = '';
    }
  });

  // Close menu when clicking nav links
  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// ============================================
// HEADER HIDE/SHOW ON SCROLL
// ============================================

let lastScroll = 0;
const header = document.querySelector('.site-header');

if (header) {
  const updateHeaderState = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('scrolled');
      if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.classList.remove('scrolled');
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

// ============================================
// SCROLL-LINKED OPACITY REVEAL
// ============================================

function initScrollReveal() {
  const revealItems = document.querySelectorAll('[data-scroll-reveal]');

  function updateReveal() {
    revealItems.forEach(item => {
      const image = item.querySelector('.work-image');
      const info = item.querySelector('.work-info');
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate opacity progress (0 to 1)
      // Starts revealing when item enters bottom 80% of viewport
      // Fully opaque when item is at 30% from top
      const revealStart = windowHeight * 0.8;
      const revealEnd = windowHeight * 0.3;
      const revealRange = revealStart - revealEnd;

      let progress = 0;

      if (rect.top < revealStart && rect.top > revealEnd) {
        // Item is in reveal zone
        progress = (revealStart - rect.top) / revealRange;
        progress = Math.max(0, Math.min(1, progress)); // Clamp 0-1
      } else if (rect.top <= revealEnd) {
        // Item is fully revealed
        progress = 1;
      }

      // Apply opacity directly based on scroll position
      if (image) {
        image.style.opacity = progress;
      }

      // Fade in text info when image is 70% opaque
      if (info) {
        if (progress >= 0.7) {
          info.style.opacity = '1';
          info.style.transform = 'translateY(0)';
        } else {
          info.style.opacity = '0';
          info.style.transform = 'translateY(20px)';
        }
      }
    });
  }

  // Update on scroll (with requestAnimationFrame for performance)
  let revealTicking = false;

  window.addEventListener('scroll', () => {
    if (!revealTicking) {
      window.requestAnimationFrame(() => {
        updateReveal();
        revealTicking = false;
      });
      revealTicking = true;
    }
  });

  // Initial check
  updateReveal();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

// Log to confirm JS is loaded
console.log('✓ Jonas Mikolayunas global scripts loaded');
