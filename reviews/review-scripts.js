/* ============================================
   REVIEW PAGE SCRIPTS
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all review features
  initModelViewer();
  initFeedbackForm();
  initScrollAnimations();
  
});

/* ============================================
   3D MODEL VIEWER FUNCTIONALITY
   ============================================ */
function initModelViewer() {
  const modelViewer = document.querySelector('#model-viewer');
  
  if (!modelViewer) return;
  
// --- Interaction prompt (mouse/drag hint) control ---
  // Show briefly, then turn off (≈2 cycles), and turn off immediately on first interaction.
  modelViewer.setAttribute('interaction-prompt', 'auto');

  const TWO_CYCLES_MS = 10000; // tweak (8000–12000) depending on what you see
  const promptTimer = setTimeout(() => {
    modelViewer.setAttribute('interaction-prompt', 'none');
  }, TWO_CYCLES_MS);

  const disablePrompt = () => {
    clearTimeout(promptTimer);
    modelViewer.setAttribute('interaction-prompt', 'none');
  };


  // Camera preset buttons
  const presetButtons = document.querySelectorAll('.view-preset');
  const resetButton = document.querySelector('.view-reset');
  
  // Store initial camera position
  let initialOrbit = null;
  
  // Wait for model to load to capture initial position
  modelViewer.addEventListener('load', () => {
    initialOrbit = modelViewer.getCameraOrbit();

    // Ensure initial lighting settings are applied
    modelViewer.exposure = 1.4;
    modelViewer.shadowIntensity = 1.8;
    modelViewer.shadowSoftness = 0.8;
    modelViewer.style.filter = 'contrast(125%)';

    // Set initial sun position if slider exists
    const sunSlider = document.getElementById('sun-position-slider');
    if (sunSlider) {
      updateSunPosition(50);
    }

    console.log('Model loaded successfully with enhanced lighting');
  });
  
  // Handle camera preset clicks
  presetButtons.forEach(button => {
    button.addEventListener('click', () => {
      const orbit = button.getAttribute('data-orbit');
      if (orbit) {
        modelViewer.cameraOrbit = orbit;
        modelViewer.autoRotate = false;
      }
    });
  });
  
  // Reset button
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (initialOrbit) {
        modelViewer.cameraOrbit = initialOrbit.toString();
      }
      modelViewer.autoRotate = true;
    });
  }
  
  // Light slider - simple one-direction brightness control
  const sunSlider = document.getElementById('sun-position-slider');

  // Function to update lighting (one direction: dark to bright)
  function updateSunPosition(value) {
    // 0 = darker, 100 = brighter
    const exposure = 0.8 + (value / 100) * 1.0; // 0.8 to 1.8
    const shadowIntensity = 2.2 - (value / 100) * 1.0; // 2.2 to 1.2
    const contrast = 130 - (value / 100) * 20; // 130% to 110%

    if (modelViewer) {
      modelViewer.exposure = exposure;
      modelViewer.shadowIntensity = shadowIntensity;
      modelViewer.style.filter = `contrast(${contrast}%)`;
    }
  }

  if (sunSlider) {
    sunSlider.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      updateSunPosition(value);
    });
  }
  
  
  // Pause auto-rotate when user interacts manually
  modelViewer.addEventListener('camera-change', () => {
    setTimeout(() => {
      modelViewer.autoRotate = false;
    }, 100);
  });
  
  // Show loading progress
  modelViewer.addEventListener('progress', (event) => {
    const progress = event.detail.totalProgress;
    console.log(`Loading: ${(progress * 100).toFixed(0)}%`);
  });
  
  // Handle errors
  modelViewer.addEventListener('error', (event) => {
    console.error('Error loading model:', event.detail);
  });
}

/* ============================================
   FEEDBACK FORM SUBMISSION
   ============================================ */
function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  const messageDiv = document.getElementById('form-message');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const feedback = formData.get('feedback');
    const nextStep = formData.get('next-step');
    
    // Basic validation
    if (!feedback || feedback.trim() === '') {
      showMessage('Please share your thoughts before submitting.', 'error');
      return;
    }
    
    if (!nextStep) {
      showMessage('Please select a next step.', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      const response = await fetch('https://formspree.io/f/xojjvbeb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showMessage('Thank you for your feedback! I\'ll be in touch shortly.', 'success');
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      showMessage('There was an error sending your feedback. Please email me directly at studio@bonasstudio.com', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  function showMessage(text, type) {
    messageDiv.className = `form-message form-message--${type} show`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    if (type === 'success') {
      setTimeout(() => {
        messageDiv.classList.remove('show');
      }, 5000);
    }
  }
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   UTILITY: Copy Link to Clipboard
   ============================================ */
function copyReviewLink() {
  const url = window.location.href;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      alert('Review link copied to clipboard');
    });
  } else {
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Review link copied to clipboard');
  }
}