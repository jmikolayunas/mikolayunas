/* ============================================
   ENHANCED TERRAIN EXPLORER WITH 3D GENERATION
   ============================================ */

// Replace with your Mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoiam1pa29sYXl1bmFzIiwiYSI6ImNtazA5MnJ1MTA4ZWszY3B2MjF6aHlmd3kifQ.nmEJFXg8QJF77YOywWGWYw';

let map;
let draw;
let selectedLocation = null;
let currentModel = null;
let elevationData = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initializeMap();
  setupEventListeners();
});

/* ============================================
   INITIALIZE MAP WITH DRAW CONTROLS
   ============================================ */
function initializeMap() {
  map = new mapboxgl.Map({
    container: 'explore-map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [-71.5777, 41.1697], // Block Island
    zoom: 11,
    pitch: 60,
    bearing: 0,
    antialias: true
  });

  // Add terrain
  map.on('load', () => {
    map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
    
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.8 });
    
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

  // Add geocoder
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
    placeholder: 'Search for your place...'
  });
  
  map.addControl(geocoder, 'top-left');
  
  geocoder.on('result', (e) => {
    map.flyTo({
      center: e.result.center,
      zoom: 13,
      pitch: 60
    });
  });

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
  // Initialize Draw controls
  draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {},
    styles: [
      // Custom styling for drawn features
      {
        'id': 'gl-draw-polygon-fill',
        'type': 'fill',
        'paint': {
          'fill-color': '#C7A86A',
          'fill-opacity': 0.2
        }
      },
      {
        'id': 'gl-draw-polygon-stroke-active',
        'type': 'line',
        'paint': {
          'line-color': '#C7A86A',
          'line-width': 3
        }
      },
      {
        'id': 'gl-draw-line',
        'type': 'line',
        'paint': {
          'line-color': '#C7A86A',
          'line-width': 3
        }
      },
      {
        'id': 'gl-draw-polygon-and-line-vertex-active',
        'type': 'circle',
        'paint': {
          'circle-radius': 6,
          'circle-color': '#C7A86A'
        }
      }
    ]
  });
  
  map.addControl(draw);
  
  // Listen for drawing events
  map.on('draw.create', handleDrawingComplete);
  map.on('draw.update', handleDrawingComplete);
}

/* ============================================
   EVENT LISTENERS
   ============================================ */
function setupEventListeners() {
  // Draw controls - polygon only
  document.getElementById('draw-polygon').addEventListener('click', () => {
    draw.changeMode('draw_polygon');
    setActiveDrawButton('draw-polygon');
  });
  
  document.getElementById('clear-drawing').addEventListener('click', () => {
    draw.deleteAll();
    document.getElementById('generate-model').disabled = true;
    document.getElementById('clear-drawing').disabled = true;
    hideModelViewer();
  });
  
  document.getElementById('clear-drawing').addEventListener('click', () => {
    draw.deleteAll();
    document.getElementById('generate-model').disabled = true;
    document.getElementById('clear-drawing').disabled = true;
    hideModelViewer();
  });
  
  document.getElementById('generate-model').addEventListener('click', generateTerrainModel);
  
  // Model controls
  document.getElementById('exaggeration-slider').addEventListener('input', (e) => {
    const value = e.target.value;
    document.getElementById('exaggeration-value').textContent = `${value}×`;
    if (currentModel) {
      regenerateModelWithSettings();
    }
  });
  
  document.getElementById('base-height-slider').addEventListener('input', (e) => {
    const value = e.target.value;
    document.getElementById('base-height-value').textContent = `${value}mm`;
    if (currentModel) {
      regenerateModelWithSettings();
    }
  });
  
  document.getElementById('download-model').addEventListener('click', downloadModel);
  document.getElementById('commission-this-model').addEventListener('click', commissionModel);
  document.getElementById('new-selection').addEventListener('click', startNewSelection);
  
  // Model viewer camera presets
  document.querySelectorAll('.view-preset').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orbit = e.target.getAttribute('data-orbit');
      const modelViewer = document.getElementById('terrain-model-viewer');
      if (orbit && modelViewer) {
        modelViewer.cameraOrbit = orbit;
      }
    });
  });
  
  document.querySelector('.view-reset')?.addEventListener('click', () => {
    const modelViewer = document.getElementById('terrain-model-viewer');
    modelViewer.resetTurntableRotation();
  });
  
  // Dismiss instructions
  document.getElementById('hide-instructions')?.addEventListener('click', () => {
    document.querySelector('.map-instructions').style.display = 'none';
  });
}

function setActiveDrawButton(activeId) {
  document.querySelectorAll('.draw-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(activeId).classList.add('active');
}

/* ============================================
   HANDLE DRAWING COMPLETION
   ============================================ */
function handleDrawingComplete() {
  const data = draw.getAll();
  if (data.features.length > 0) {
    document.getElementById('generate-model').disabled = false;
    document.getElementById('clear-drawing').disabled = false;
    console.log('Drawing complete:', data.features[0]);
  }
}

/* ============================================
   GENERATE 3D TERRAIN MODEL
   ============================================ */
async function generateTerrainModel() {
  const data = draw.getAll();
  if (data.features.length === 0) {
    alert('Please draw a boundary first');
    return;
  }
  
  const feature = data.features[0];
  const bounds = getBounds(feature.geometry.coordinates[0]);
  
  showProgress('Fetching elevation data...', 10);
  
  try {
    // Fetch elevation data
    elevationData = await fetchDetailedElevationData(bounds);
    
    showProgress('Generating 3D mesh...', 50);
    
    // Generate 3D model
    await generateAndDisplay3DModel(elevationData, bounds);
    
    showProgress('Complete!', 100);
    
    setTimeout(() => {
      hideProgress();
      showModelViewer();
    }, 500);
    
  } catch (error) {
    console.error('Error generating model:', error);
    hideProgress();
    alert('Unable to generate model. Please try a smaller area or different location.');
  }
}

/* ============================================
   FETCH DETAILED ELEVATION DATA
   ============================================ */
async function fetchDetailedElevationData(bounds) {
  // Create a grid of points to sample
  const resolution = 50; // 50x50 grid
  const points = [];
  
  const { west, south, east, north } = bounds;
  const lngStep = (east - west) / resolution;
  const latStep = (north - south) / resolution;
  
  for (let i = 0; i <= resolution; i++) {
    for (let j = 0; j <= resolution; j++) {
      points.push({
        lng: west + (lngStep * j),
        lat: south + (latStep * i),
        x: j,
        y: i
      });
    }
  }
  
  // Batch query elevations
  // Note: In production, you'd batch these requests efficiently
  // For now, we'll use a simplified approach with Mapbox Terrain RGB
  
  const elevations = await Promise.all(
    points.map(async (point) => {
      const elevation = await queryElevation(point.lng, point.lat);
      return {
        ...point,
        elevation: elevation
      };
    })
  );
  
  return {
    points: elevations,
    resolution: resolution,
    bounds: bounds
  };
}

async function queryElevation(lng, lat) {
  // Using Mapbox Tilequery API
  try {
    const url = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?layers=contour&limit=1&access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      return data.features[0].properties.ele || 0;
    }
    return 0;
  } catch (error) {
    console.error('Elevation query error:', error);
    return 0;
  }
}

/* ============================================
   GENERATE AND DISPLAY 3D MODEL
   ============================================ */
async function generateAndDisplay3DModel(data, bounds) {
  const exaggeration = parseFloat(document.getElementById('exaggeration-slider').value);
  const baseHeight = parseFloat(document.getElementById('base-height-slider').value);
  
  // Create THREE.js geometry
  const geometry = new THREE.BufferGeometry();
  
  const resolution = data.resolution;
  const points = data.points;
  
  // Find min/max elevation for normalization
  const elevations = points.map(p => p.elevation);
  const minElevation = Math.min(...elevations);
  const maxElevation = Math.max(...elevations);
  const range = maxElevation - minElevation;
  
  // Create vertices
  const vertices = [];
  const indices = [];
  
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const normalizedElevation = (point.elevation - minElevation) / range;
    
    vertices.push(
      point.x / resolution - 0.5, // Center at origin
      normalizedElevation * exaggeration,
      point.y / resolution - 0.5
    );
  }
  
  // Create faces
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const a = i * (resolution + 1) + j;
      const b = a + 1;
      const c = a + (resolution + 1);
      const d = c + 1;
      
      // Two triangles per quad
      indices.push(a, b, d);
      indices.push(a, d, c);
    }
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  // Create material
  const material = new THREE.MeshStandardMaterial({
    color: 0xC7A86A,
    metalness: 0.3,
    roughness: 0.7,
    flatShading: false
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  
  // Export to GLB
  const exporter = new GLTFExporter();
  
  return new Promise((resolve, reject) => {
    exporter.parse(
      mesh,
      (gltf) => {
        const blob = new Blob([gltf], { type: 'model/gltf-binary' });
        const url = URL.createObjectURL(blob);
        
        // Store model
        currentModel = {
          url: url,
          blob: blob,
          data: data,
          bounds: bounds
        };
        
        // Display in model-viewer
        const modelViewer = document.getElementById('terrain-model-viewer');
        modelViewer.src = url;
        
        resolve();
      },
      { binary: true },
      (error) => {
        reject(error);
      }
    );
  });
}

/* ============================================
   REGENERATE MODEL WITH NEW SETTINGS
   ============================================ */
async function regenerateModelWithSettings() {
  if (!elevationData) return;
  
  showProgress('Regenerating model...', 50);
  
  try {
    await generateAndDisplay3DModel(elevationData, currentModel.bounds);
    hideProgress();
  } catch (error) {
    console.error('Regeneration error:', error);
    hideProgress();
  }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function getBounds(coordinates) {
  const lngs = coordinates.map(coord => coord[0]);
  const lats = coordinates.map(coord => coord[1]);
  
  return {
    west: Math.min(...lngs),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    north: Math.max(...lats)
  };
}

function showProgress(text, percent) {
  const progressDiv = document.getElementById('generation-progress');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  progressDiv.classList.add('active');
  progressFill.style.width = `${percent}%`;
  progressText.textContent = text;
}

function hideProgress() {
  document.getElementById('generation-progress').classList.remove('active');
}

function showModelViewer() {
  document.getElementById('model-viewer-section').classList.add('active');
  document.getElementById('model-viewer-section').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'nearest' 
  });
}

function hideModelViewer() {
  document.getElementById('model-viewer-section').classList.remove('active');
}

function downloadModel() {
  if (!currentModel) return;
  
  const link = document.createElement('a');
  link.href = currentModel.url;
  link.download = 'terrain-model.glb';
  link.click();
}

function commissionModel() {
  if (!currentModel) {
    window.location.href = 'commission.html';
    return;
  }
  
  const bounds = currentModel.bounds;
  const center = {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2
  };
  
  const params = new URLSearchParams({
    lat: center.lat,
    lng: center.lng,
    bounds: JSON.stringify(bounds)
  });
  
  window.location.href = `commission.html?${params.toString()}`;
}

function startNewSelection() {
  draw.deleteAll();
  hideModelViewer();
  document.getElementById('generate-model').disabled = true;
  document.getElementById('clear-drawing').disabled = true;
  
  // Scroll back to map
  document.getElementById('explore-map').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  });
}