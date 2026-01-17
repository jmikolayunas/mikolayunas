/* ============================================
   3D VIEWER - DUAL LIGHT CONTROL (with diagnostics)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  const modelViewer = document.querySelector('#model-viewer');

  // Sliders + labels
  const sunPositionSlider = document.getElementById('sun-position-slider');
  const sunPositionValue = document.getElementById('sun-position-value');

  const intensitySlider = document.getElementById('intensity-slider');
  const intensityValue = document.getElementById('intensity-value');

  // Debug outputs
  const debugElevation = document.getElementById('debug-elevation');
  const debugAzimuth = document.getElementById('debug-azimuth');
  const debugShadow = document.getElementById('debug-shadow');
  const debugExposure = document.getElementById('debug-exposure');

  const debugModelStatus = document.getElementById('debug-model-status');
  const debugHdriStatus = document.getElementById('debug-hdri-status');
  const debugJsStatus = document.getElementById('debug-js-status');

  // State
  let currentSunPosition = 50;
  let currentIntensity = 50;

  // --- Helper: write status safely
  function setText(el, text) {
    if (el) el.textContent = text;
  }

  // --- If elements are missing, show it plainly
  if (!modelViewer || !sunPositionSlider || !intensitySlider) {
    console.error('MISSING ELEMENTS!', { modelViewer, sunPositionSlider, intensitySlider });
    setText(debugJsStatus, 'ERROR: missing required DOM elements');
    return;
  }

  setText(debugJsStatus, 'JS loaded ✔');

  // ============================================
  // Always update Live Values immediately
  // (even if the model never loads)
  // ============================================
  updateLighting();

  // ============================================
  // Diagnostics: confirm files exist (GLB + HDR)
  // ============================================
  const modelSrc = modelViewer.getAttribute('src') || '';
  const hdriSrc = modelViewer.getAttribute('environment-image') || '';

  // If you’re seeing 304 for HDR, that’s fine (cached).
  async function checkURL(url, labelEl) {
    if (!url) {
      setText(labelEl, 'No URL set');
      return;
    }

    try {
      // Cache-bust just for the check, so you see real status codes
      const bust = (url.includes('?') ? '&' : '?') + 'check=' + Date.now();
      const res = await fetch(url + bust, { method: 'GET' });

      if (res.ok) {
        setText(labelEl, `OK (${res.status})`);
      } else {
        setText(labelEl, `FAILED (${res.status})`);
        console.warn(`Asset failed: ${url} -> ${res.status}`);
      }
    } catch (e) {
      setText(labelEl, 'FAILED (network error)');
      console.warn(`Asset failed (network): ${url}`, e);
    }
  }

  checkURL(modelSrc, debugModelStatus);
  checkURL(hdriSrc, debugHdriStatus);

  // ============================================
  // Model-viewer events
  // ============================================
  let loaded = false;

  modelViewer.addEventListener('load', () => {
    loaded = true;
    setText(debugModelStatus, 'Loaded ✔');
    updateLighting();
  });

  modelViewer.addEventListener('error', (ev) => {
    // Model-viewer emits an error event if the model fails to load/parse
    setText(debugModelStatus, 'ERROR (see console)');
    console.error('model-viewer error event:', ev);
  });

  modelViewer.addEventListener('progress', (event) => {
    const p = event.detail && typeof event.detail.totalProgress === 'number'
      ? event.detail.totalProgress
      : 0;

    // Only show progress text if not loaded yet
    if (!loaded) setText(debugModelStatus, `Loading… ${(p * 100).toFixed(0)}%`);
  });

  // Timeout: if nothing loads, say so
  setTimeout(() => {
    if (!loaded) {
      // Could be a 404, a GLB parse failure, or model-viewer not loading at all
      setText(debugModelStatus, 'Still not loaded (check Network/Console)');
    }
  }, 6000);

  // ============================================
  // Slider bindings
  // ============================================
  sunPositionSlider.addEventListener('input', (e) => {
    currentSunPosition = parseInt(e.target.value, 10);
    updateLighting();
  });

  intensitySlider.addEventListener('input', (e) => {
    currentIntensity = parseInt(e.target.value, 10);
    updateLighting();
  });

  /* ============================================
     UPDATE LIGHTING - TWO INDEPENDENT CONTROLS
     NOTE: environmentRotation rotates the IBL/HDR lighting.
     It does NOT create true terrain self-shadowing.
     ============================================ */
  function updateLighting() {
    // Calculate elevation and azimuth (just for display + environment rotation)
    const normalizedPos = currentSunPosition / 100;
    const sunElevation = Math.sin(normalizedPos * Math.PI) * 75;
    const sunAzimuth = normalizedPos * 180;

    // Intensity mapping
    const shadowIntensity = 2.5 - (currentIntensity / 100) * 1.5;
    const exposure = 0.8 + (currentIntensity / 100) * 0.8;
    const contrast = 140 - (currentIntensity / 100) * 30;

    // Apply to model-viewer
    const rotationString = `${sunElevation}deg ${sunAzimuth}deg 0deg`;
    modelViewer.environmentRotation = rotationString;
    modelViewer.shadowIntensity = shadowIntensity;
    modelViewer.exposure = exposure;
    modelViewer.style.filter = `contrast(${contrast}%)`;

    // Labels
    let posLabel;
    if (currentSunPosition < 15) posLabel = 'Dawn';
    else if (currentSunPosition < 35) posLabel = 'Morning';
    else if (currentSunPosition < 65) posLabel = 'Noon';
    else if (currentSunPosition < 85) posLabel = 'Afternoon';
    else posLabel = 'Dusk';
    if (sunPositionValue) sunPositionValue.textContent = posLabel;

    let intLabel;
    if (currentIntensity < 25) intLabel = 'Very Dark';
    else if (currentIntensity < 45) intLabel = 'Dark';
    else if (currentIntensity < 55) intLabel = 'Medium';
    else if (currentIntensity < 75) intLabel = 'Bright';
    else intLabel = 'Very Bright';
    if (intensityValue) intensityValue.textContent = intLabel;

    // Debug outputs (these should update even if the model never loads)
    setText(debugElevation, sunElevation.toFixed(1) + '°');
    setText(debugAzimuth, sunAzimuth.toFixed(1) + '°');
    setText(debugShadow, shadowIntensity.toFixed(2));
    setText(debugExposure, exposure.toFixed(2));
  }

});
