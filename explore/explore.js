/* ============================================
   TERRAIN EXPLORER - MAPBOX IMPLEMENTATION
   ============================================ */

// Mapbox access token (you'll need to get this from mapbox.com)
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';

let map;
let selectedLocation = null;

// Initialize map on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeMap();
  setupEventListeners();
});

/* ============================================
   INITIALIZE 3D TERRAIN MAP
   ============================================ */
function initializeMap() {
  map = new mapboxgl.Map({
    container: 'explore-map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [-71.5, 41.6], // Default: Block Island area
    zoom: 10,
    pitch: 60, // 3D tilt
    bearing: 0,
    antialias: true
  });

  // Add terrain and sky
  map.on('load', () => {
    map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
    
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    
    // Add sky layer
    map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 90.0],
        'sky-atmosphere-sun-intensity': 15
      }
    });
  });

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
  // Click handler for location selection
  map.on('click', handleMapClick);
}

/* ============================================
   EVENT LISTENERS
   ============================================ */
function setupEventListeners() {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('location-search');
  const commissionBtn = document.getElementById('commission-btn');
  const resetBtn = document.getElementById('reset-btn');
  
  // Search functionality
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
  
  // Preview actions
  commissionBtn.addEventListener('click', () => {
    // Navigate to commission page with pre-filled location
    const location = document.getElementById('location-search').value;
    window.location.href = `commission.html?location=${encodeURIComponent(location)}`;
  });
  
  resetBtn.addEventListener('click', resetExplorer);
}

/* ============================================
   LOCATION SEARCH
   ============================================ */
async function performSearch() {
  const searchInput = document.getElementById('location-search');
  const searchTerm = searchInput.value.trim();
  
  if (!searchTerm) return;
  
  try {
    // Mapbox Geocoding API
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${mapboxgl.accessToken}`
    );
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const location = data.features[0];
      const [lng, lat] = location.center;
      
      // Fly to location
      map.flyTo({
        center: [lng, lat],
        zoom: 12,
        pitch: 60,
        bearing: 0,
        duration: 2000
      });
      
      selectedLocation = { lng, lat, name: location.place_name };
      
      // Add marker
      new mapboxgl.Marker({ color: '#C7A86A' })
        .setLngLat([lng, lat])
        .addTo(map);
        
    } else {
      alert('Location not found. Try a different search term.');
    }
    
  } catch (error) {
    console.error('Search error:', error);
    alert('Error searching for location. Please try again.');
  }
}

/* ============================================
   MAP CLICK HANDLER
   ============================================ */
function handleMapClick(e) {
  const { lng, lat } = e.lngLat;
  
  selectedLocation = { lng, lat };
  
  // Add marker
  new mapboxgl.Marker({ color: '#C7A86A' })
    .setLngLat([lng, lat])
    .addTo(map);
  
  // Generate preview
  generateTerrainPreview(lng, lat);
}

/* ============================================
   GENERATE TERRAIN PREVIEW
   ============================================ */
async function generateTerrainPreview(lng, lat) {
  const loadingOverlay = document.getElementById('loading-overlay');
  const previewContainer = document.getElementById('preview-container');
  
  // Show loading
  loadingOverlay.classList.add('active');
  
  try {
    // Wait a moment for effect (and to fetch terrain data)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate 2D topographic preview
    const canvas = document.getElementById('terrain-canvas');
    drawTopographicPreview(canvas, lng, lat);
    
    // Show preview
    loadingOverlay.classList.remove('active');
    previewContainer.classList.add('active');
    
    // Scroll to preview
    previewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
  } catch (error) {
    console.error('Preview generation error:', error);
    loadingOverlay.classList.remove('active');
    alert('Error generating preview. Please try again.');
  }
}

/* ============================================
   DRAW TOPOGRAPHIC PREVIEW (Simplified)
   ============================================ */
function drawTopographicPreview(canvas, lng, lat) {
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = 800;
  canvas.height = 1000;
  
  // Gallery white background
  ctx.fillStyle = '#F7F6F3';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // In production, you'd:
  // 1. Fetch actual elevation data for the area
  // 2. Generate real contour lines
  // 3. Render accurate topography
  
  // For now, generate stylized placeholder
  drawStylizedContours(ctx, canvas.width, canvas.height);
  
  // Add subtle border
  ctx.strokeStyle = 'rgba(46, 46, 46, 0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawStylizedContours(ctx, width, height) {
  ctx.strokeStyle = '#2E2E2E';
  ctx.lineWidth = 1;
  
  // Draw organic, flowing contour lines
  const numLines = 25;
  const centerX = width / 2;
  const centerY = height / 2;
  
  for (let i = 0; i < numLines; i++) {
    const radius = (i / numLines) * Math.min(width, height) * 0.4;
    const points = 120;
    
    ctx.beginPath();
    
    for (let j = 0; j <= points; j++) {
      const angle = (j / points) * Math.PI * 2;
      const noise = Math.sin(angle * 3) * 20 + Math.cos(angle * 5) * 15;
      const r = radius + noise;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      
      if (j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.stroke();
  }
}

/* ============================================
   RESET EXPLORER
   ============================================ */
function resetExplorer() {
  const previewContainer = document.getElementById('preview-container');
  const searchInput = document.getElementById('location-search');
  
  // Hide preview
  previewContainer.classList.remove('active');
  
  // Clear search
  searchInput.value = '';
  
  // Reset map view
  map.flyTo({
    center: [-71.5, 41.6],
    zoom: 10,
    pitch: 60,
    bearing: 0,
    duration: 1500
  });
  
  selectedLocation = null;
}

/* ============================================
   PRODUCTION ENHANCEMENT IDEAS
   ============================================ */

// For actual implementation, you could:

// 1. Fetch real elevation data:
async function fetchElevationData(lng, lat, radiusKm) {
  // Use Mapbox Terrain RGB tiles or similar service
  // const elevationData = await fetchTerrainRGB(lng, lat, radiusKm);
  // return elevationData;
}

// 2. Generate actual contour lines from DEM data:
function generateContoursFromDEM(elevationData, interval) {
  // Use marching squares algorithm
  // or d3-contour library
  // const contours = d3.contours()...
}

// 3. Allow boundary drawing:
function enableBoundaryDrawing() {
  // Use Mapbox Draw plugin
  // const draw = new MapboxDraw({...});
  // map.addControl(draw);
}

// 4. Export preview as downloadable image:
function downloadPreview() {
  const canvas = document.getElementById('terrain-canvas');
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'terrain-preview.png';
  link.href = dataURL;
  link.click();
}