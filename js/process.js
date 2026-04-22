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

// ============================================
// PROCESS SLIDER — Data Crafting (Stage 03)
// ============================================
(function () {
  const slider  = document.getElementById('process-slider');
  const handle  = document.getElementById('process-slider-handle');
  if (!slider || !handle) return;

  const imgs = slider.querySelectorAll('.process-slider__img');
  let dragging = false;
  let progress = 0;

  // Rail spans 10%–90% of container width
  const RAIL_START = 10;
  const RAIL_END   = 90;

  function applyProgress(p) {
    progress = Math.max(0, Math.min(1, p));
    handle.style.left = (RAIL_START + progress * (RAIL_END - RAIL_START)) + '%';
    handle.setAttribute('aria-valuenow', Math.round(progress * 100));
    imgs.forEach(function(img, i) {
      if (i === 0) { img.style.opacity = 1; return; }
      const start = (i - 1) / 3;
      const end   = i / 3;
      const alpha = Math.max(0, Math.min(1, (progress - start) / (end - start)));
      img.style.opacity = alpha;
    });
  }

  function progressFromEvent(e) {
    const rect = slider.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = (clientX - rect.left) / rect.width * 100;
    return (pct - RAIL_START) / (RAIL_END - RAIL_START);
  }

  handle.addEventListener('mousedown', function(e) { dragging = true; e.preventDefault(); });
  slider.addEventListener('mousedown', function(e) { dragging = true; applyProgress(progressFromEvent(e)); e.preventDefault(); });
  window.addEventListener('mousemove', function(e) { if (dragging) applyProgress(progressFromEvent(e)); });
  window.addEventListener('mouseup',   function()  { dragging = false; });
  handle.addEventListener('touchstart', function()  { dragging = true; }, { passive: true });
  slider.addEventListener('touchstart', function(e)  { dragging = true; applyProgress(progressFromEvent(e)); }, { passive: true });
  window.addEventListener('touchmove',  function(e) { if (dragging) applyProgress(progressFromEvent(e)); }, { passive: true });
  window.addEventListener('touchend',   function()  { dragging = false; });
  handle.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') applyProgress(progress + 0.05);
    if (e.key === 'ArrowLeft')  applyProgress(progress - 0.05);
  });

  applyProgress(0);
})();

// Discovery Stage: Your Place Reflection Interactive
(function() {
  const reflectionContainer = document.getElementById('reflectionContainer');
  
  // Only run if the reflection container exists on this page
  if (!reflectionContainer) return;

  const prompts = [
    'Close your eyes.<br>What place appears?',
    'Is it a place you return to...<br>or one you revisit in memory?',
    'What do you see first?<br>Summit, shoreline, horizon?',
    'Who shares this place<br>with you?',
    "That's where we begin."
  ];

  let currentPrompt = 0;
  const FADE_OUT_MS = 900;
  const FADE_IN_MS = 1400;
  const BUTTON_DELAY_MS = 700;
  const promptText = document.getElementById('promptText');
  const nextButton = document.getElementById('nextButton');
  const contentArea = document.getElementById('contentArea');
  const dots = document.querySelectorAll('.dot');

  if (!promptText || !nextButton || !contentArea || dots.length === 0) return;

  nextButton.addEventListener('click', () => {
    if (currentPrompt < prompts.length - 1) {
      currentPrompt++;
      updatePrompt();
    }
  });

  function updatePrompt() {
    // Fade out
    promptText.style.opacity = '0';
    nextButton.style.opacity = '0';

    setTimeout(() => {
      // Update text
      promptText.innerHTML = prompts[currentPrompt];
      promptText.style.animation = 'none';
      
      // Update progress dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index <= currentPrompt);
      });

      // Handle final prompt
      if (currentPrompt === prompts.length - 1) {
        reflectionContainer.classList.add('final');
        nextButton.style.display = 'none';
        
        // Add CTA
        const cta = document.createElement('a');
        cta.href = 'commission.html';
        cta.className = 'cta-link';
        cta.textContent = 'Schedule Consultation';
        contentArea.appendChild(cta);
      }

      // Fade in
      setTimeout(() => {
        promptText.style.animation = `fadeInPrompt ${FADE_IN_MS}ms ease forwards`;
        if (currentPrompt < prompts.length - 1) {
          nextButton.style.animation = `fadeInPrompt ${FADE_IN_MS}ms ease ${BUTTON_DELAY_MS}ms forwards`;
        }
      }, 50);
    }, FADE_OUT_MS);
  }
})();
