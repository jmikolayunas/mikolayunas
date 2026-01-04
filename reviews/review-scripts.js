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
  
  // Camera preset buttons
  const presetButtons = document.querySelectorAll('.view-preset');
  const resetButton = document.querySelector('.view-reset');
  
  // Store initial camera position
  let initialOrbit = null;
  
  // Wait for model to load to capture initial position
  modelViewer.addEventListener('load', () => {
    initialOrbit = modelViewer.getCameraOrbit();
    console.log('Model loaded successfully');
  });
  
  // Handle camera preset clicks
  presetButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const orbit = e.target.getAttribute('data-orbit');
      if (orbit) {
        modelViewer.cameraOrbit = orbit;
        // Pause auto-rotate when user interacts
        modelViewer.setAttribute('auto-rotate', 'false');
      }
    });
  });
  
  // Reset button
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (initialOrbit) {
        modelViewer.cameraOrbit = initialOrbit.toString();
      }
      // Resume auto-rotate
      modelViewer.setAttribute('auto-rotate', 'true');
    });
  }
  
  // Pause auto-rotate when user interacts manually
  modelViewer.addEventListener('camera-change', () => {
    if (modelViewer.hasAttribute('auto-rotate')) {
      // User has interacted, turn off auto-rotate
      setTimeout(() => {
        modelViewer.removeAttribute('auto-rotate');
      }, 100);
    }
  });
  
  // Show loading progress (optional)
  modelViewer.addEventListener('progress', (event) => {
    const progress = event.detail.totalProgress;
    console.log(`Loading: ${(progress * 100).toFixed(0)}%`);
    // You could update a progress bar here if desired
  });
  
  // Handle errors
  modelViewer.addEventListener('error', (event) => {
    console.error('Error loading model:', event.detail);
    // You could show an error message to the user here
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
      // OPTION 1: Use Netlify Forms (if hosting on Netlify)
      // Just let the form submit normally with netlify attribute
      // No additional code needed
      
      // OPTION 2: Use Formspree or similar service
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
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
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  function showMessage(text, type) {
    messageDiv.className = `form-message form-message--${type} show`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    // Auto-hide success messages after 5 seconds
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
        // Optional: stop observing once visible
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with fade-in-scroll class
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
    // Fallback for older browsers
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Review link copied to clipboard');
  }
}