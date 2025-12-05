// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // Hide any previous messages
    formSuccess.classList.remove('show');
    formError.classList.remove('show');
    
    // Disable submit button during processing
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // ============================================
      // OPTION 1: FORMSPREE (Recommended for static sites)
      // ============================================
      // Sign up at formspree.io and replace YOUR_FORM_ID with your actual form ID
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // });
      
      // ============================================
      // OPTION 2: MAILTO FALLBACK (For now)
      // ============================================
      // This is a temporary solution that opens the user's email client
      // Replace with a real form handler like Formspree, Netlify Forms, or your own backend
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      formSuccess.classList.add('show');
      contactForm.reset();
      
      // For now, also create a mailto link as backup
      const mailtoLink = `mailto:hello@bonasstudio.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`)}`;
      console.log('Mailto link:', mailtoLink);
      
    } catch (error) {
      // Show error message
      formError.classList.add('show');
      console.error('Form submission error:', error);
    } finally {
      // Re-enable submit button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// FORM VALIDATION STYLING
// ============================================

const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
  // Add validation styling on blur
  input.addEventListener('blur', () => {
    if (input.value.trim() !== '') {
      input.classList.add('has-value');
    } else {
      input.classList.remove('has-value');
    }
  });
  
  // Real-time email validation
  if (input.type === 'email') {
    input.addEventListener('input', () => {
      if (input.value && !isValidEmail(input.value)) {
        input.setCustomValidity('Please enter a valid email address');
      } else {
        input.setCustomValidity('');
      }
    });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

console.log('✓ Contact form scripts loaded');