/* ============================================
   JONAS MIKOLAYUNAS - CLIENT VIEWER AUTHENTICATION
   Password protection for 3D design review page
   ============================================ */

// Configuration
const CONFIG = {
  // Add client access codes here when you want strict code validation.
  // Example: validPasswords: ['mchen', 'rsullivan']
  // If this array is left empty, the page uses the lightweight development gate below.
  validPasswords: []
};

/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initPasswordGate();
});

/* ============================================
   PASSWORD GATE
   ============================================ */
function initPasswordGate() {
  const passwordInput = document.getElementById('passwordInput');
  const passwordSubmit = document.getElementById('passwordSubmit');
  const passwordError = document.getElementById('passwordError');
  const passwordGate = document.getElementById('passwordGate');
  const reviewContent = document.getElementById('reviewContent');

  if (!passwordInput || !passwordSubmit || !passwordError || !passwordGate || !reviewContent) {
    console.warn('Viewer authentication elements were not found.');
    return;
  }

  // Auto-unlock if already authenticated during this browser session.
  if (sessionStorage.getItem('viewer_authenticated') === 'true') {
    unlockViewer();
    return;
  }

  // Check URL parameter for access code. Example: viewer-auth.html?access=clientcode
  const urlParams = new URLSearchParams(window.location.search);
  const urlPassword = urlParams.get('access');

  if (urlPassword) {
    passwordInput.value = urlPassword;
    validateAndUnlock();
  }

  passwordInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      validateAndUnlock();
    }
  });

  passwordSubmit.addEventListener('click', validateAndUnlock);

  passwordInput.focus();

  function validateAndUnlock() {
    const password = passwordInput.value.toLowerCase().trim();

    if (!isPasswordValid(password)) {
      passwordError.textContent = 'Invalid access code';
      passwordInput.value = '';
      passwordInput.focus();
      return;
    }

    sessionStorage.setItem('viewer_authenticated', 'true');
    unlockViewer();
  }

  function isPasswordValid(password) {
    if (CONFIG.validPasswords.length > 0) {
      return CONFIG.validPasswords.includes(password);
    }

    // Lightweight development gate: prevents accidental access, but is not secure.
    // Add real client codes to CONFIG.validPasswords for stricter client-side validation.
    return password.length >= 2;
  }

  function unlockViewer() {
    passwordGate.classList.add('hidden');
    reviewContent.classList.remove('hidden');
    window.scrollTo(0, 0);
  }
}

/* ============================================
   SECURITY NOTES
   ============================================

   This is a lightweight client-side access gate suitable for:
   - Low-security content protection
   - Preventing accidental access
   - Simple client review pages

   It is not true security because the validation runs in the browser.

   For sensitive client work, validate access server-side and consider:
   1. Server-side password/token validation
   2. JWT tokens or secure session cookies
   3. Rate limiting
   4. Access logging

   ============================================ */

console.log('✓ Viewer authentication scripts loaded');
