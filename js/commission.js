// ============================================
// COMMISSION FORM HANDLING
// ============================================

const commissionForm = document.getElementById('commission-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

if (commissionForm) {
  commissionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(commissionForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      place: formData.get('place'),
      message: formData.get('message')
    };
    
    // Hide any previous messages
    formSuccess.classList.remove('show');
    formError.classList.remove('show');
    
    // Disable submit button during processing
    const submitBtn = commissionForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
      const response = await fetch('https://formspree.io/f/xwvwwdnl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Show success message
      formSuccess.classList.add('show');

      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset form
      commissionForm.reset();
      
    } catch (error) {
      // Show error message
      formError.classList.add('show');
      formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      console.error('Form submission error:', error);
    } finally {
      // Re-enable submit button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// FORM VALIDATION & UX ENHANCEMENTS
// ============================================

// Smooth scroll to form when arriving from CTA
if (window.location.hash === '#commission-form') {
  setTimeout(() => {
    document.getElementById('commission-form').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }, 100);
}

console.log('✓ Commission form scripts loaded');
