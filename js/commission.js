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
// FILE UPLOAD — ACCUMULATING FILE LIST
// ============================================

(function () {
  const dropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('files');
  const fileListEl = document.getElementById('file-list');
  if (!dropZone || !fileInput || !fileListEl) return;

  const MAX_SIZE_MB = 10;
  let selectedFiles = []; // accumulator

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function renderList() {
    fileListEl.innerHTML = '';
    selectedFiles.forEach((file, index) => {
      const li = document.createElement('li');
      li.className = 'file-list-item';
      li.innerHTML = `
        <span class="file-list-name" title="${file.name}">${file.name}</span>
        <span class="file-list-size">${formatBytes(file.size)}</span>
        <button type="button" class="file-list-remove" aria-label="Remove ${file.name}">×</button>
      `;
      li.querySelector('.file-list-remove').addEventListener('click', () => {
        selectedFiles.splice(index, 1);
        renderList();
        syncInput();
      });
      fileListEl.appendChild(li);
    });
  }

  function syncInput() {
    // Replace the file input's FileList with current accumulator via DataTransfer
    const dt = new DataTransfer();
    selectedFiles.forEach(f => dt.items.add(f));
    fileInput.files = dt.files;
  }

  function addFiles(newFiles) {
    const errors = [];
    Array.from(newFiles).forEach(file => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name} exceeds ${MAX_SIZE_MB}MB and was not added.`);
        return;
      }
      // Prevent duplicates by name + size
      const isDupe = selectedFiles.some(f => f.name === file.name && f.size === file.size);
      if (!isDupe) selectedFiles.push(file);
    });
    renderList();
    syncInput();
    if (errors.length) {
      const errEl = document.createElement('li');
      errEl.className = 'file-list-error';
      errEl.textContent = errors.join(' ');
      fileListEl.appendChild(errEl);
      setTimeout(() => errEl.remove(), 5000);
    }
  }

  // Click on drop zone triggers file input
  dropZone.addEventListener('click', (e) => {
    if (e.target === fileInput) return;
    fileInput.click();
  });

  // Keyboard accessibility
  dropZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  // File input change
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) addFiles(fileInput.files);
    // Reset input value so the same file can be re-added after removal
    fileInput.value = '';
  });

  // Drag and drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  ['dragleave', 'dragend'].forEach(evt => {
    dropZone.addEventListener(evt, () => dropZone.classList.remove('drag-over'));
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  });
})();

// ============================================
// FORM VALIDATION & UX ENHANCEMENTS
// ============================================

// Character counter for story field
const storyField = document.getElementById('story');
if (storyField) {
  const createCounter = () => {
    const counter = document.createElement('span');
    counter.className = 'form-helper';
    counter.style.marginTop = '0.5rem';
    return counter;
  };
  
  const counter = createCounter();
  storyField.parentNode.appendChild(counter);
  
  const updateCounter = () => {
    const length = storyField.value.length;
    const recommended = 200;
    
    if (length < recommended) {
      counter.textContent = `${length} characters (${recommended - length} more recommended for best results)`;
      counter.style.color = 'var(--color-brass)';
    } else {
      counter.textContent = `${length} characters—great detail!`;
      counter.style.color = 'var(--color-brass)';
    }
  };
  
  storyField.addEventListener('input', updateCounter);
  updateCounter();
}

// Smooth scroll to form when arriving from CTA
if (window.location.hash === '#commission-form') {
  setTimeout(() => {
    document.getElementById('commission-form').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }, 100);
}

console.log('✓ Commission form scripts loaded');
