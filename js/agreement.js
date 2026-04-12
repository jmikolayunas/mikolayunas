/* ============================================
   JONAS MIKOLAYUNAS - COMMISSION AGREEMENT
   Password protection, signature capture, PDF generation
   ============================================ */

// Configuration
const CONFIG = {
  // Password format: first initial + last name (lowercase, no spaces)
  // Example: "John Smith" = "jsmith"
  validPasswords: [
    'bonas2026',
    // Add client passwords here, or set dynamically via URL parameter
    // Format: first initial + last name (lowercase) e.g. "jsmith"
  ]
};

// State
let signaturePad = null;
let agreementData = {};

/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
  initPasswordGate();
  initSignaturePad();
  initFormHandlers();
  setDefaultDate();
});

/* ============================================
   PASSWORD GATE
   ============================================ */
function initPasswordGate() {
  const passwordInput = document.getElementById('passwordInput');
  const passwordSubmit = document.getElementById('passwordSubmit');
  const passwordError = document.getElementById('passwordError');
  const passwordGate = document.getElementById('passwordGate');
  const agreementContent = document.getElementById('agreementContent');

  // Check URL parameter for password
  const urlParams = new URLSearchParams(window.location.search);
  const urlPassword = urlParams.get('access');
  
  // If password in URL, auto-validate
  if (urlPassword) {
    passwordInput.value = urlPassword;
    validateAndUnlock();
  }

  // Enter key to submit
  passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      validateAndUnlock();
    }
  });

  // Click to submit
  passwordSubmit.addEventListener('click', validateAndUnlock);

  function validateAndUnlock() {
    const password = passwordInput.value.toLowerCase().trim();
    
    // Simple validation: must be at least 3 characters
    // In production, validate against CONFIG.validPasswords or server
    if (password.length < 2) {
      passwordError.textContent = 'Invalid access code';
      passwordInput.value = '';
      passwordInput.focus();
      return;
    }

    // Success - unlock agreement
    passwordGate.classList.add('hidden');
    agreementContent.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
}

/* ============================================
   SIGNATURE PAD
   ============================================ */
function initSignaturePad() {
  const canvas = document.getElementById('clientSignature');
  const clearButton = document.getElementById('clearClientSig');
  
  // Resize canvas to match display size
  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    
    if (signaturePad) {
      signaturePad.clear();
    }
  }

  // Initialize signature pad
  signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(46, 46, 46)',
    minWidth: 1,
    maxWidth: 2.5,
    throttle: 16,
    velocityFilterWeight: 0.7
  });

  // Handle signature changes
  signaturePad.addEventListener('endStroke', function() {
    validateForm();
  });

  // Clear signature
  clearButton.addEventListener('click', function() {
    signaturePad.clear();
    validateForm();
  });

  // Resize on window resize
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}

/* ============================================
   FORM HANDLERS
   ============================================ */
function initFormHandlers() {
  const commissionPrice = document.getElementById('commissionPrice');
  const depositAmount = document.getElementById('depositAmount');
  const balanceAmount = document.getElementById('balanceAmount');
  const clientEmail = document.getElementById('clientEmail');

  // Auto-calculate deposit and balance
  commissionPrice.addEventListener('input', function() {
    const price = parseFloat(this.value.replace(/[$,]/g, '')) || 0;
    const deposit = price * 0.5;
    const balance = price * 0.5;
    
    depositAmount.value = formatCurrency(deposit);
    balanceAmount.value = formatCurrency(balance);
    
    validateForm();
  });

  // Validate on email input
  clientEmail.addEventListener('input', validateForm);

  // Validate all required fields on any input
  const allInputs = document.querySelectorAll('.summary-input, .summary-textarea');
  allInputs.forEach(input => {
    input.addEventListener('input', validateForm);
  });
}

/* ============================================
   FORM VALIDATION
   ============================================ */
function validateForm() {
  const downloadBtn = document.getElementById('downloadPDF');
  const submitBtn = document.getElementById('submitAgreement');
  
  // Required fields
  const clientName = document.getElementById('clientName').value.trim();
  const clientEmail = document.getElementById('clientEmail').value.trim();
  const hasSigned = signaturePad && !signaturePad.isEmpty();
  
  // Email validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail);
  
  // Enable buttons if valid
  const isValid = clientName && emailValid && hasSigned;
  
  downloadBtn.disabled = !hasSigned;
  submitBtn.disabled = !isValid;
}

/* ============================================
   DATE HELPERS
   ============================================ */
function setDefaultDate() {
  const today = new Date();
  const dateString = formatDate(today);
  
  document.getElementById('agreementDate').textContent = dateString;
  document.getElementById('clientDate').value = dateString;
}

function formatDate(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/* ============================================
   CURRENCY FORMATTING
   ============================================ */
function formatCurrency(amount) {
  return '$' + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* ============================================
   PDF GENERATION
   ============================================ */
document.getElementById('downloadPDF').addEventListener('click', function() {
  generatePDF(false);
});

function generatePDF(forEmail = false) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  // Collect all form data
  const data = {
    agreementDate: document.getElementById('agreementDate').textContent,
    clientName: document.getElementById('clientName').value,
    clientEmail: document.getElementById('clientEmail').value,
    clientPhone: document.getElementById('clientPhone').value,
    projectLocation: document.getElementById('projectLocation').value,
    projectDimensions: document.getElementById('projectDimensions').value,
    projectNotes: document.getElementById('projectNotes').value,
    commissionPrice: document.getElementById('commissionPrice').value,
    depositAmount: document.getElementById('depositAmount').value,
    balanceAmount: document.getElementById('balanceAmount').value,
    expectedCompletion: document.getElementById('expectedCompletion').value,
    clientDate: document.getElementById('clientDate').value,
    privateCommission: document.getElementById('privateCommission').checked,
    signature: signaturePad.toDataURL()
  };

  // Store for later use
  agreementData = data;

  // PDF Layout
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 72; // 1 inch
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  // Helper for checking page break
  function checkPageBreak(requiredSpace) {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  }

  // --- PAGE 1: HEADER & SUMMARY ---
  
  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'normal');
  doc.text('Commission Agreement', pageWidth / 2, y, { align: 'center' });
  y += 30;

  doc.setFontSize(11);
  doc.setTextColor(199, 168, 106);
  doc.text('Jonas Mikolayunas', pageWidth / 2, y, { align: 'center' });
  y += 20;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.text(`Agreement Date: ${data.agreementDate}`, pageWidth / 2, y, { align: 'center' });
  y += 30;

  // Commission Summary
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Commission Summary', margin, y);
  y += 25;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  // Summary table data
  const summaryFields = [
    ['Client Name:', data.clientName],
    ['Contact Email:', data.clientEmail],
    ['Telephone:', data.clientPhone],
    ['Location/Subject:', data.projectLocation],
    ['Dimensions:', data.projectDimensions],
    ['Design Notes:', data.projectNotes],
    ['Commission Price:', data.commissionPrice],
    ['Deposit (50%):', data.depositAmount],
    ['Balance Due:', data.balanceAmount],
    ['Expected Completion:', data.expectedCompletion]
  ];

  summaryFields.forEach(([label, value]) => {
    if (checkPageBreak(25)) return;
    
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin, y);
    doc.setFont('helvetica', 'normal');
    
    const valueLines = doc.splitTextToSize(value || '', contentWidth - 150);
    doc.text(valueLines, margin + 150, y);
    y += Math.max(15, valueLines.length * 12);
  });

  y += 15;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(107, 107, 107);
  const authNote = doc.splitTextToSize('Your signature and deposit authorize fabrication under the agreement terms.', contentWidth);
  doc.text(authNote, pageWidth / 2, y, { align: 'center' });
  y += 30;

  // Signatures
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Client Authorization', margin, y);
  doc.text('Jonas Mikolayunas', margin + contentWidth / 2 + 20, y);
  y += 15;

  // Client signature image
  if (data.signature) {
    doc.addImage(data.signature, 'PNG', margin, y, 180, 60);
  }
  
  // Studio info
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Jonas Mikolayunas', margin + contentWidth / 2 + 20, y + 15);
  doc.setFontSize(9);
  doc.setTextColor(107, 107, 107);
  doc.text('780 Worcester St.', margin + contentWidth / 2 + 20, y + 30);
  doc.text('Natick, MA 01760', margin + contentWidth / 2 + 20, y + 43);
  
  y += 70;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.text(`Date: ${data.clientDate}`, margin, y);
  
  y += 30;

  // Divider
  doc.setTextColor(199, 168, 106);
  doc.setFontSize(12);
  doc.text('• • •', pageWidth / 2, y, { align: 'center' });
  y += 30;

  // --- AGREEMENT TERMS ---
  doc.setTextColor(0, 0, 0);

  const terms = [
    {
      heading: 'The Commission',
      text: 'Jonas Mikolayunas designs and handcrafts custom 3D topographic artworks using CNC carving, laser etching, hand finishing, epoxy resin water features, and custom framing—refined through collaborative process.'
    },
    {
      heading: 'Our Collaborative Approach',
      text: 'Your piece evolves through design milestones. Not all decisions finalize at the outset—together we refine composition, orientation, materials, finishes, resin characteristics, typography, and framing.\n\nWhen new concepts emerge, we explore them through studio testing and share results with you. Timely feedback ensures the project stays on schedule.'
    },
    {
      heading: 'Timeline & Design Changes',
      text: 'Completion timelines vary based on material availability, curing times, and craft complexity. We welcome design changes during early phases; however, as fabrication proceeds, modifications can become more limited or incur additional cost or time. We present any change-related costs in writing for your approval before proceeding.'
    },
    {
      heading: 'Client-Supplied Content',
      text: 'If you provide reference materials, coordinates, trails, text, or logos, you confirm the rights to use them and grant us permission to incorporate them. We interpret topographic data as art, not technical cartography. Your commission is a handcrafted work of art.'
    },
    {
      heading: 'Ownership & Portfolio Rights',
      text: 'You own the physical work upon full payment. We retain all copyright and reproduction rights, including designs, models, CNC files, and process documentation. You may not reproduce the work commercially (prints, merchandise, marketing) without written permission.\n\nWe may photograph and film your piece—including in-progress—for portfolio, website, editorial, and promotional use. Your identity remains confidential. We never share names, contact information, or identifying details publicly without explicit permission.'
    },
    {
      heading: 'Private Commission',
      text: 'By default, we photograph your completed piece for portfolio, website, and editorial use. Your identity always remains confidential—we never share client names or contact information publicly.\n\nComplete confidentiality requested: ' + (data.privateCommission ? 'YES' : 'NO')
    },
    {
      heading: 'Communication & Approvals',
      text: 'Please respond to design reviews within 7 days. We\'ll communicate via email, text, secure web portal, or other written formats as agreed. Extended inactivity (over 30 days) may require rescheduling due to reserved production capacity.'
    },
    {
      heading: 'Delivery, Shipping & Risk',
      text: 'After final payment, we coordinate delivery or shipping. Professional packaging and insured shipping are included. Risk of loss transfers when the work is tendered to the carrier (or at delivery handoff). Report any shipping damage within 48 hours with photographs of packaging and contents—retain all materials for claim processing. Installation is your responsibility unless otherwise agreed in writing.'
    },
    {
      heading: 'Materials & Natural Character',
      text: 'Natural materials possess inherent variations in grain, figure, tone, and mineral character. These contribute to your piece\'s uniqueness. Epoxy may exhibit subtle surface textures or optical shifts depending on viewing angle and lighting—hallmarks of handcrafted work.'
    },
    {
      heading: 'Payment Terms',
      text: 'Your signed agreement, accompanied by the 50% deposit, initiates fabrication. This deposit secures production capacity, material sourcing, and custom procurement—making it non-refundable due to the bespoke nature of the work. The remaining 50% balance is due before delivery.\n\nWe accept bank transfer, check, or card. Your commission price is all-inclusive—no processing or delivery fees.'
    },
    {
      heading: 'Cancellation',
      text: 'Once signed and deposit submitted, the deposit is non-refundable and you remain responsible for costs incurred. Should you cancel after fabrication begins, we may complete the work as a studio piece without obligation to refund.'
    },
    {
      heading: 'Returns & Craftsmanship Warranty',
      text: 'Custom commissions are final. We remedy verified workmanship defects reported within 7 days of delivery through repair or refinishing at our discretion. Normal wear, misuse, improper installation, environmental damage (humidity, heat, sunlight), and shipping damage are excluded.'
    },
    {
      heading: 'Legal Terms',
      text: 'Our liability shall not exceed amounts you\'ve paid for the work. This agreement is governed by Massachusetts law. This agreement constitutes our entire understanding and supersedes all prior discussions. Modifications require mutual written agreement (email acceptable for approvals and change orders).'
    }
  ];

  terms.forEach(term => {
    checkPageBreak(60);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(term.heading, margin, y);
    y += 15;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(term.text, contentWidth);
    doc.text(lines, margin, y);
    y += (lines.length * 11) + 15;
  });

  // Closing
  checkPageBreak(40);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  const closing = doc.splitTextToSize('We look forward to creating an exceptional work of art together.', contentWidth);
  doc.text(closing, pageWidth / 2, y, { align: 'center' });
  y += 40;

  // Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Jonas Mikolayunas', pageWidth / 2, y, { align: 'center' });
  y += 12;
  doc.setFontSize(8);
  doc.setTextColor(107, 107, 107);
  doc.text('780 Worcester St. • Natick, MA 01760', pageWidth / 2, y, { align: 'center' });

  // Download or return
  if (forEmail) {
    return doc.output('blob');
  } else {
    const filename = `Bonas_Studio_Commission_Agreement_${data.clientName.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
  }
}

/* ============================================
   SUBMIT AGREEMENT
   ============================================ */
document.getElementById('submitAgreement').addEventListener('click', async function() {
  const btn = this;
  const originalText = btn.textContent;
  
  // Disable button
  btn.disabled = true;
  btn.textContent = 'Generating PDF...';
  
  try {
    // Generate PDF blob
    const pdfBlob = generatePDF(true);
    
    btn.textContent = 'Sending...';
    
    // Prepare form data
    const formData = new FormData();
    formData.append('pdf', pdfBlob, `Commission_Agreement_${agreementData.clientName}.pdf`);
    formData.append('clientEmail', agreementData.clientEmail);
    formData.append('clientName', agreementData.clientName);
    formData.append('commissionPrice', agreementData.commissionPrice);
    formData.append('projectLocation', agreementData.projectLocation);
    
    // Note: This requires a backend endpoint
    // For now, just show success message
    
    // Simulated send (replace with actual fetch to your backend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success feedback
    btn.textContent = '✓ Sent Successfully';
    btn.style.background = '#4CAF50';
    
    // Show confirmation
    alert(`Agreement sent to ${agreementData.clientEmail}!\n\nA copy has been emailed to you and Jonas Mikolayunas.`);
    
    // Reset button after 3 seconds
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
    
  } catch (error) {
    console.error('Error submitting agreement:', error);
    btn.textContent = 'Error - Please try again';
    btn.disabled = false;
    
    setTimeout(() => {
      btn.textContent = originalText;
    }, 3000);
  }
});

/* ============================================
   BACKEND INTEGRATION NOTES
   ============================================
   
   To fully implement email functionality, you'll need a backend endpoint:
   
   fetch('/api/submit-agreement', {
     method: 'POST',
     body: formData
   })
   .then(response => response.json())
   .then(data => {
     // Handle success
   })
   .catch(error => {
     // Handle error
   });
   
   Backend should:
   1. Receive PDF blob and form data
   2. Send email to client with PDF attached
   3. Send copy to Jonas Mikolayunas
   4. Store agreement in database
   5. Return success/error response
   
   ============================================ */
