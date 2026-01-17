/* ============================================
   3D VIEWER - DUAL LIGHT CONTROL
   Sun Position + Light Intensity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  const modelViewer = document.querySelector('#model-viewer');
  
  // Sun Position Slider
  const sunPositionSlider = document.getElementById('sun-position-slider');
  const sunPositionValue = document.getElementById('sun-position-value');
  
  // Light Intensity Slider
  const intensitySlider = document.getElementById('intensity-slider');
  const intensityValue = document.getElementById('intensity-value');
  
  // Debug elements
  const debugElevation = document.getElementById('debug-elevation');
  const debugAzimuth = document.getElementById('debug-azimuth');
  const debugShadow = document.getElementById('debug-shadow');
  const debugExposure = document.getElementById('debug-exposure');
  
  // State
  let currentSunPosition = 50;
  let currentIntensity = 50;
  
  if (!modelViewer || !sunPositionSlider || !intensitySlider) {
    console.error('âŒ MISSING ELEMENTS!');
    console.error('modelViewer:', modelViewer);
    console.error('sunPositionSlider:', sunPositionSlider);
    console.error('intensitySlider:', intensitySlider);
    return;
  }
  
  console.log('âœ“ ALL ELEMENTS FOUND');
  console.log('âœ“ Dual Light Control initialized');
  console.log('âœ“ Environment: neutral');
  console.log('âœ“ Initial settings: shadow=1.5, exposure=1.2');
  
  // Wait for model to load
  modelViewer.addEventListener('load', () => {
    console.log('âœ“ Model loaded successfully');
    updateLighting();
  });
  
  // Sun Position changes
  sunPositionSlider.addEventListener('input', (e) => {
    currentSunPosition = parseInt(e.target.value);
    console.log('=== SUN POSITION CHANGED:', currentSunPosition, '===');
    updateLighting();
  });
  
  // Intensity changes
  intensitySlider.addEventListener('input', (e) => {
    currentIntensity = parseInt(e.target.value);
    console.log('=== INTENSITY CHANGED:', currentIntensity, '===');
    updateLighting();
  });
  
  // Progress
  modelViewer.addEventListener('progress', (event) => {
    const progress = event.detail.totalProgress;
    console.log(`Loading: ${(progress * 100).toFixed(0)}%`);
  });
  
  /* ============================================
     UPDATE LIGHTING - TWO INDEPENDENT CONTROLS
     ============================================ */
  
  function updateLighting() {
    console.log('\n=== LIGHTING UPDATE ===');
    
    // Calculate elevation and azimuth
    const normalizedPos = currentSunPosition / 100;
    const sunElevation = Math.sin(normalizedPos * Math.PI) * 75;
    const sunAzimuth = normalizedPos * 180;
    
    console.log(`â˜€ï¸ Sun Position: ${currentSunPosition}`);
    console.log(`   Elevation: ${sunElevation.toFixed(1)}Â°`);
    console.log(`   Azimuth: ${sunAzimuth.toFixed(1)}Â°`);
    
    // Calculate intensity values
    const shadowIntensity = 2.5 - (currentIntensity / 100) * 1.5;
    const exposure = 0.8 + (currentIntensity / 100) * 0.8;
    const contrast = 140 - (currentIntensity / 100) * 30;
    
    console.log(`ðŸ’¡ Intensity: ${currentIntensity}`);
    console.log(`   Shadow Intensity: ${shadowIntensity.toFixed(2)}`);
    console.log(`   Exposure: ${exposure.toFixed(2)}`);
    console.log(`   Contrast: ${contrast.toFixed(0)}%`);
    
    // APPLY TO MODEL VIEWER
    if (modelViewer) {
      const rotationString = `${sunElevation}deg ${sunAzimuth}deg 0deg`;
      
      // Apply environment rotation
      modelViewer.environmentRotation = rotationString;
      console.log(`   ðŸ”„ Applied rotation: ${rotationString}`);
      
      // Verify it was applied
      setTimeout(() => {
        const applied = modelViewer.environmentRotation;
        console.log(`   âœ“ Confirmed rotation: ${applied}`);
      }, 100);
      
      // Apply other properties
      modelViewer.shadowIntensity = shadowIntensity;
      modelViewer.exposure = exposure;
      modelViewer.style.filter = `contrast(${contrast}%)`;
    }

    // ==========================================
    // UPDATE LABELS
    // ==========================================
    
    // Sun position label
    let posLabel;
    if (currentSunPosition < 15) posLabel = 'Dawn';
    else if (currentSunPosition < 35) posLabel = 'Morning';
    else if (currentSunPosition < 65) posLabel = 'Noon';
    else if (currentSunPosition < 85) posLabel = 'Afternoon';
    else posLabel = 'Dusk';
    
    if (sunPositionValue) sunPositionValue.textContent = posLabel;
    
    // Intensity label
    let intLabel;
    if (currentIntensity < 25) intLabel = 'Very Dark';
    else if (currentIntensity < 45) intLabel = 'Dark';
    else if (currentIntensity < 55) intLabel = 'Medium';
    else if (currentIntensity < 75) intLabel = 'Bright';
    else intLabel = 'Very Bright';
    
    if (intensityValue) intensityValue.textContent = intLabel;
    
    // Update debug
    if (debugElevation) debugElevation.textContent = sunElevation.toFixed(1) + 'Â°';
    if (debugAzimuth) debugAzimuth.textContent = sunAzimuth.toFixed(1) + 'Â°';
    if (debugShadow) debugShadow.textContent = shadowIntensity.toFixed(2);
    if (debugExposure) debugExposure.textContent = exposure.toFixed(2);
  }

});

/* ============================================
   HOW THIS WORKS
   ============================================
   
   TWO INDEPENDENT SLIDERS:
   
   1. SUN POSITION (Top Slider)
      - Controls WHERE light comes from
      - Changes shadow DIRECTION
      - Rotates the environment/HDRI
      - 0 = East (dawn, shadows go west)
      - 50 = Overhead (noon, short shadows)
      - 100 = West (dusk, shadows go east)
   
   2. LIGHT INTENSITY (Bottom Slider)
      - Controls HOW BRIGHT the scene is
      - Changes shadow DARKNESS
      - Independent of sun position
      - 0 = Very dark, dramatic shadows
      - 50 = Balanced
      - 100 = Very bright, soft shadows
   
   BOTH UPDATE IN REAL-TIME:
   - Move sun position â†’ shadows sweep across terrain
   - Move intensity â†’ shadows get darker/lighter
   - Both at once â†’ complete control
   
   NO PHYSICS ENGINE NEEDED:
   - This is graphics rendering (WebGL)
   - GPU calculates shadows 60fps
   - Environment rotation moves light source
   - Shadow mapping creates realistic shadows
   
   ============================================ */
