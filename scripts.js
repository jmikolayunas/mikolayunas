// ============================================
// BONAS STUDIO - INTERACTIONS
// ============================================

// Smooth parallax on hero section
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
console.log('✓ Bonas Studio scripts loaded');