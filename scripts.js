// ============================================
// BONAS STUDIO - GLOBAL INTERACTIONS
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

const heroImage = document.querySelector('.hero-image');
let parallaxTicking = false;

function updateParallax() {
  if (!heroImage) return;

  const scrolled = window.pageYOffset;
  const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

  // Only apply parallax while hero is in view
  if (scrolled < heroHeight) {
    const parallaxSpeed = 0.3;
    heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }

  parallaxTicking = false;
}

window.addEventListener('scroll', () => {
  if (!parallaxTicking) {
    window.requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
});

// ============================================
// SCROLL-TRIGGERED FADE-INS
// ============================================

const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -0% 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Only trigger once
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in-scroll class
document.querySelectorAll('.fade-in-scroll').forEach(el => {
  fadeObserver.observe(el);
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const body = document.body;

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isActive = siteNav.classList.toggle('is-active');
    navToggle.classList.toggle('is-active');

    // Prevent scroll when mobile menu is open
    if (isActive) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });

  // Close menu when clicking nav links
  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-active');
      navToggle.classList.remove('is-active');
      body.style.overflow = '';
    });
  });
}

// ============================================
// HEADER HIDE/SHOW ON SCROLL
// ============================================

let lastScroll = 0;
const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });
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
console.log('✓ Bonas Studio global scripts loaded');
