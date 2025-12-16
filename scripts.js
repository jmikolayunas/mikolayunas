// ============================================
// BONAS STUDIO - INTERACTIONS
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
// Smooth parallax on hero section
// ============================================
const heroImage = document.querySelector('.hero-image');
let ticking = false;

function updateParallax() {
  if (!heroImage) return;
  
  const scrolled = window.pageYOffset;
  const heroHeight = document.querySelector('.hero').offsetHeight;
  
  // Only apply parallax while hero is in view
  if (scrolled < heroHeight) {
    const parallaxSpeed = 0.5;
    heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// ============================================
// Scroll-triggered fade-ins for content sections
// ============================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
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
// Mobile navigation toggle
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
// Header hide/show on scroll
// ============================================
let lastScroll = 0;
const header = document.querySelector('.site-header');

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

// Log to confirm JS is loaded
console.log('✓ Bonas Studio scripts loaded with auto-sizing');