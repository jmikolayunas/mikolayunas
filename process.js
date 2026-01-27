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

// ============================================
// PARALLAX EFFECT ON STAGE IMAGES (Subtle)
// ============================================

const stageImages = document.querySelectorAll('.stage-image');

window.addEventListener('scroll', () => {
  stageImages.forEach(image => {
    const stage = image.closest('.process-stage');
    const rect = stage.getBoundingClientRect();

    // Only apply parallax when stage is in viewport AND entrance animation has completed
    if (stage.classList.contains('in-view') && rect.top < window.innerHeight && rect.bottom > 0) {
      // Calculate parallax offset (very subtle)
      const scrolled = rect.top;
      const parallaxSpeed = 0.1;
      const offset = scrolled * parallaxSpeed;

      image.style.transform = `translateY(${offset}px) scale(1)`;
    }
  });
});

console.log('✓ Process scrollytelling scripts loaded');