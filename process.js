// ============================================
// PROCESS PAGE - SCROLL-TRIGGERED ANIMATIONS
// ============================================

// Intersection Observer for stage animations
const stageObserverOptions = {
  threshold: 0.3,
  rootMargin: '-100px 0px -100px 0px'
};

const stageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Don't unobserve so animation can retrigger on scroll back up
    } else {
      // Optional: remove class when scrolling away for re-trigger effect
      // entry.target.classList.remove('in-view');
    }
  });
}, stageObserverOptions);

// Observe all process stages
const processStages = document.querySelectorAll('.process-stage');
processStages.forEach(stage => {
  stageObserver.observe(stage);
});

// ============================================
// SCROLL-DRIVEN IMAGE PARALLAX (SCALE)
// scale(1) → scale(1.08) tied to scroll position.
// Completes when lastBullet.bottom === image.bottom.
// Desktop only (≥1024px).
// ============================================

const desktopParallaxQuery = window.matchMedia('(min-width: 1024px)');
const stageParallaxData = [];

function buildParallaxCache() {
  stageParallaxData.length = 0;
  processStages.forEach(stage => {
    const mediaContainer = stage.querySelector('.stage-media-container');
    const stageMedia     = stage.querySelector('.stage-media');
    const stageImage     = stage.querySelector('.stage-image');
    const lastBullet     = stage.querySelector('.stage-details li:last-child');
    if (!mediaContainer || !stageMedia || !stageImage || !lastBullet) return;
    stageParallaxData.push({ stage, mediaContainer, stageMedia, stageImage, lastBullet });
  });
}

function updateImageParallax() {
  if (!desktopParallaxQuery.matches) {
    stageParallaxData.forEach(({ stageImage, mediaContainer }) => {
      stageImage.style.transform = '';
      mediaContainer.style.transform = '';
    });
    return;
  }

  const windowHeight = window.innerHeight;

  // Phase A: Clear all container transforms before measuring (prevents layout thrashing)
  stageParallaxData.forEach(({ mediaContainer }) => {
    mediaContainer.style.transform = '';
  });

  // Phase B: Batch-read all measurements with transforms cleared
  const measurements = stageParallaxData.map(({ stage, stageMedia, lastBullet }) => {
    if (!stage.classList.contains('in-view')) return null;
    return {
      stageMediaRect: stageMedia.getBoundingClientRect(),
      stageRect:      stage.getBoundingClientRect(),
      bulletRect:     lastBullet.getBoundingClientRect()
    };
  });

  // Phase C: Compute and apply all transforms
  stageParallaxData.forEach(({ stageImage, mediaContainer }, i) => {
    const m = measurements[i];

    if (!m) {
      stageImage.style.transform = 'scale(1)';
      return;
    }

    const { stageMediaRect, stageRect, bulletRect } = m;
    const naturalImageBottom       = stageMediaRect.bottom;
    const lastBulletRelativeBottom = bulletRect.bottom - stageRect.top;
    const initialGap               = windowHeight + lastBulletRelativeBottom - naturalImageBottom;
    const currentGap               = bulletRect.bottom - naturalImageBottom;

    // Scale: 1.0 → 1.08 proportional to scroll progress
    if (initialGap <= 0) {
      stageImage.style.transform = 'scale(1.08)';
    } else {
      const progress = Math.max(0, Math.min(1, (initialGap - currentGap) / initialGap));
      stageImage.style.transform = `scale(${(1 + 0.08 * progress).toFixed(4)})`;
    }

    // Pull image up once the last bullet has scrolled a set distance above image bottom
    const pullOffset = 80; // px above image bottom before image starts moving
    if (currentGap < -pullOffset) {
      mediaContainer.style.transform = `translateY(${(currentGap + pullOffset).toFixed(2)}px)`;
    }
  });
}

// rAF-throttled scroll listener (passive for performance)
let parallaxTicking = false;
window.addEventListener('scroll', () => {
  if (!parallaxTicking) {
    window.requestAnimationFrame(() => {
      updateImageParallax();
      parallaxTicking = false;
    });
    parallaxTicking = true;
  }
}, { passive: true });

// Debounced resize: rebuild cache then re-run
let parallaxResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(parallaxResizeTimer);
  parallaxResizeTimer = setTimeout(() => {
    buildParallaxCache();
    updateImageParallax();
  }, 150);
});

// Bootstrap after DOM settles
document.addEventListener('DOMContentLoaded', () => {
  buildParallaxCache();
  setTimeout(updateImageParallax, 100);
});

// ============================================
// SMOOTH SCROLL PROGRESS INDICATOR (Optional)
// ============================================

// Track scroll progress through the journey
const processJourney = document.querySelector('.process-journey');

if (processJourney) {
  let progressBar = document.createElement('div');
  progressBar.className = 'process-progress-bar';
  progressBar.innerHTML = '<div class="process-progress-fill"></div>';

  const desktopQuery = window.matchMedia('(min-width: 1024px)');

  // Initialize on desktop
  if (desktopQuery.matches) {
    document.body.appendChild(progressBar);
  }

  // Handle resize with matchMedia
  desktopQuery.addEventListener('change', (e) => {
    if (e.matches && !document.body.contains(progressBar)) {
      document.body.appendChild(progressBar);
    } else if (!e.matches && document.body.contains(progressBar)) {
      progressBar.remove();
    }
  });

  const progressFill = progressBar.querySelector('.process-progress-fill');

  window.addEventListener('scroll', () => {
    if (!desktopQuery.matches) return; // Don't calculate on mobile

    const journeyTop = processJourney.offsetTop;
    const journeyHeight = processJourney.offsetHeight;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Calculate progress through the journey section
    const scrollProgress = (scrollTop - journeyTop + windowHeight) / (journeyHeight + windowHeight);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    progressFill.style.height = `${clampedProgress * 100}%`;
  });
}

// ============================================
// STAGE NUMBER HIGHLIGHTING
// ============================================

// Highlight current stage number in viewport
const updateActiveStage = () => {
  const stages = document.querySelectorAll('.process-stage');
  const viewportMiddle = window.innerHeight / 2;
  
  stages.forEach(stage => {
    const rect = stage.getBoundingClientRect();
    const stageMiddle = rect.top + rect.height / 2;
    
    // Check if stage middle is near viewport middle
    if (Math.abs(stageMiddle - viewportMiddle) < rect.height / 2) {
      stage.classList.add('active-stage');
    } else {
      stage.classList.remove('active-stage');
    }
  });
};

window.addEventListener('scroll', updateActiveStage);
window.addEventListener('resize', updateActiveStage);

// Initial check
setTimeout(updateActiveStage, 100);

console.log('✓ Process scrollytelling scripts loaded');
