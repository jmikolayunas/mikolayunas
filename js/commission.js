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
      phone: formData.get('phone'),
      location: formData.get('location'),
      size: formData.get('size-preference'),
      timeline: formData.get('timeline'),
      story: formData.get('story'),
      inspiration: formData.get('inspiration')
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
      // ============================================
      // INTEGRATE WITH FORMSPREE OR YOUR BACKEND
      // ============================================
      // Sign up at formspree.io and replace YOUR_FORM_ID
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // });
      
      // if (!response.ok) {
      //   throw new Error('Form submission failed');
      // }
      
      // ============================================
      // TEMPORARY: Simulate success
      // ============================================
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      formSuccess.classList.add('show');
      
      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Reset form
      commissionForm.reset();
      
      // Log for debugging (remove in production)
      console.log('Commission inquiry:', data);
      
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
