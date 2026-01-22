// @ts-nocheck

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/* ============================================================
   SEASON PRESETS — ONLY SUMMER + WINTER
   ============================================================ */

const SEASONS = {
  WINTER: {
    name: "Winter",
    elevationMinDeg: 2,
    elevationAmpDeg: 45,
    sunIntensityMin: 0.30,
    sunIntensityMax: 3.10,
    exposureLow: 0.65,
    exposureHigh: 1.00,
    intensityScaleDivisor: 100,
    hemisphereIntensity: 0.20,
    shadowMapSize: 4096,
    shadowBias: -0.00025,
    shadowNormalBias: 0.02
  },
  SUMMER: {
    name: "Summer",
    elevationMinDeg: 6,
    elevationAmpDeg: 70,
    sunIntensityMin: 0.35,
    sunIntensityMax: 2.80,
    exposureLow: 0.70,
    exposureHigh: 1.10,
    intensityScaleDivisor: 100,
    hemisphereIntensity: 0.25,
    shadowMapSize: 2048,
    shadowBias: -0.0002,
    shadowNormalBias: 0.02
  }
};

// Default: SUMMER (toggle checked)
let ACTIVE_SEASON_KEY = "SUMMER";
let SEASON = SEASONS[ACTIVE_SEASON_KEY];

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("viewer-canvas");
  const loadingEl = document.getElementById("loading-indicator");

  const seasonToggle = document.getElementById("season-toggle");
  const seasonValue = document.getElementById("season-value");

  const sunSlider = document.getElementById("sun-position-slider");
  const sunLabel = document.getElementById("sun-position-value");
  const intensitySlider = document.getElementById("intensity-slider");
  const intensityLabel = document.getElementById("intensity-value");

  // View preset buttons
  const viewPresetButtons = document.querySelectorAll(".view-preset");
  const viewResetButton = document.querySelector(".view-reset");

  const glbPath = "models/stowe.glb";
  const hdrPath = "models/hdri/kloppenheim_06_1k.hdr";

  const setText = (el, t) => { if (el) el.textContent = t; };
  const setLoading = (on) => { if (loadingEl) loadingEl.style.display = on ? "flex" : "none"; };

  function readRange(inputEl, fallback) {
    const n = Number(inputEl?.value);
    return Number.isFinite(n) ? n : fallback;
  }

  function setSeasonFromToggle() {
    // checked = Summer, unchecked = Winter
    ACTIVE_SEASON_KEY = seasonToggle?.checked ? "SUMMER" : "WINTER";
    SEASON = SEASONS[ACTIVE_SEASON_KEY];
    setText(seasonValue, SEASON.name);
  }

  if (!canvas || !sunSlider || !intensitySlider || !seasonToggle) {
    console.error("Missing required DOM elements");
    return;
  }

  if (location.protocol === "file:") {
    console.error("Opened as file:// — use Live Server (http://)");
    return;
  }

  // Init season label from default checked state
  setSeasonFromToggle();

  async function check(url) {
    try {
      const bust = url + (url.includes("?") ? "&" : "?") + "v=" + Date.now();
      const res = await fetch(bust, { method: "GET" });
      return res.ok;
    } catch {
      return false;
    }
  }

  setLoading(true);

  Promise.all([check(glbPath), check(hdrPath)]).then(([glbOK, hdrOK]) => {
    if (!glbOK) {
      console.error(`GLB not reachable: ${glbPath}`);
      setLoading(false);
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Start exposure midrange (now uses exposureLow/exposureHigh)
    renderer.toneMappingExposure = (SEASON.exposureLow + SEASON.exposureHigh) / 2;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 5000);
    camera.position.set(2.5, 1.6, 2.5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.screenSpacePanning = true;

    // Keep refs so season can retune them live
    const hemi = new THREE.HemisphereLight(0xffffff, 0x101010, SEASON.hemisphereIntensity);
    scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffffff, (SEASON.sunIntensityMin + SEASON.sunIntensityMax) / 2);
    sun.castShadow = true;
    scene.add(sun);

    const sunTarget = new THREE.Object3D();
    scene.add(sunTarget);
    sun.target = sunTarget;

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    function applySeasonTuning() {
      // ensure SEASON matches toggle
      setSeasonFromToggle();

      // Fill light
      hemi.intensity = SEASON.hemisphereIntensity;

      // Shadow quality + acne controls
      sun.shadow.mapSize.set(SEASON.shadowMapSize, SEASON.shadowMapSize);
      sun.shadow.bias = SEASON.shadowBias;
      sun.shadow.normalBias = SEASON.shadowNormalBias;

      // Refresh shadow map after resizing
      if (sun.shadow.map) sun.shadow.map.dispose();
      sun.shadow.map = null;
      sun.shadow.needsUpdate = true;

      // Keep exposure in range after season switch
      renderer.toneMappingExposure = (SEASON.exposureLow + SEASON.exposureHigh) / 2;
    }

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);

    // HDR environment (optional)
    if (hdrOK) {
      const pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      new RGBELoader().load(
        hdrPath,
        (tex) => {
          scene.environment = pmrem.fromEquirectangular(tex).texture;
          tex.dispose();
          pmrem.dispose();
        },
        undefined,
        () => pmrem.dispose()
      );
    }

    // Load model
    const box = new THREE.Box3();
    let model = null;
    let initialCameraPosition = new THREE.Vector3();
    let modelCenter = new THREE.Vector3();

    new GLTFLoader().load(
      glbPath,
      (gltf) => {
        model = gltf.scene;

        model.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;

            if (o.material && "roughness" in o.material) {
              o.material.roughness = Math.max(o.material.roughness ?? 0.7, 0.7);
            }
            if (o.material && "metalness" in o.material) {
              o.material.metalness = Math.min(o.material.metalness ?? 0.0, 0.0);
            }
          }
        });

        scene.add(model);

        // Fit camera + ground
        box.setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        model.position.y -= box.min.y;

        box.setFromObject(model);
        box.getSize(size);
        box.getCenter(center);

        controls.target.copy(center);
        controls.update();
        ground.position.set(center.x, 0, center.z);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = (camera.fov * Math.PI) / 180;
        const dist = (maxDim / 2) / Math.tan(fov / 2);

        camera.position.set(center.x + dist * 0.9, center.y + dist * 0.55, center.z + dist * 0.9);
        camera.near = Math.max(0.01, dist / 200);
        camera.far = dist * 50;
        camera.updateProjectionMatrix();

        // Store initial camera position and center for reset
        initialCameraPosition.copy(camera.position);
        modelCenter.copy(center);

        // Shadow camera bounds sized to model
        const r = maxDim * 1.3;
        const sc = sun.shadow.camera;
        sc.left = -r; sc.right = r; sc.top = r; sc.bottom = -r;
        sc.near = 0.01;
        sc.far = Math.max(50, maxDim * 12);
        sc.updateProjectionMatrix();

        sunTarget.position.copy(center);

        applySeasonTuning();

        setLoading(false);

        resize();
        updateSun(); // initial
      },
      undefined,
      (err) => {
        console.error("GLB load error:", err);
        setLoading(false);
      }
    );

    function updateSun() {
      const sunPos = readRange(sunSlider, 50);          // 0..100
      const inten = readRange(intensitySlider, 50);     // 0..100
      const t = THREE.MathUtils.clamp(sunPos / 100, 0, 1);

      // East↔West sweep, map-facing-north convention:
      // LEFT = West/Dusk, RIGHT = East/Dawn
      const azDeg = 180 * (1 - t);

      // FLIPPED: left = stronger sun, right = weaker sun
      const i = THREE.MathUtils.clamp(inten / SEASON.intensityScaleDivisor, 0, 1);

      // Elevation curve
      const elDeg =
        SEASON.elevationMinDeg +
        Math.sin(Math.PI * t) * SEASON.elevationAmpDeg;

      // Sun intensity driven by slider
      sun.intensity =
        SEASON.sunIntensityMin +
        i * (SEASON.sunIntensityMax - SEASON.sunIntensityMin);

      // ✅ NEW: Exposure AUTO follows sun strength (dark stays dark; brights don't blow out)
      renderer.toneMappingExposure =
        SEASON.exposureLow +
        i * (SEASON.exposureHigh - SEASON.exposureLow);

      const az = THREE.MathUtils.degToRad(azDeg);
      const el = THREE.MathUtils.degToRad(elDeg);

      const dir = new THREE.Vector3(
        Math.cos(el) * Math.cos(az),
        Math.sin(el),
        Math.cos(el) * Math.sin(az)
      );

      // Distance scales with model size
      let dist = 12;
      if (model) {
        const s = new THREE.Vector3();
        box.setFromObject(model);
        box.getSize(s);
        dist = Math.max(12, Math.max(s.x, s.y, s.z) * 2.7);
      }

      sun.position.copy(sunTarget.position).addScaledVector(dir, dist);
      sun.target.updateMatrixWorld();

      // Sun position label
      if (sunPos === 0) sunLabel.textContent = "Dusk";
      else if (sunPos === 100) sunLabel.textContent = "Dawn";
      else if (sunPos < 35) sunLabel.textContent = "Afternoon";
      else if (sunPos <= 65) sunLabel.textContent = "Noon";
      else sunLabel.textContent = "Morning";

      // Intensity label now means SUN STRENGTH (not exposure)
      if (inten === 0) intensityLabel.textContent = "Very Low";
      else if (inten === 100) intensityLabel.textContent = "Very High";
      else if (inten < 35) intensityLabel.textContent = "Low";
      else if (inten <= 65) intensityLabel.textContent = "Medium";
      else intensityLabel.textContent = "High";
    }

    // ============================================
    // VIEW PRESET BUTTONS (Added from review page)
    // ============================================
    viewPresetButtons.forEach(button => {
      button.addEventListener("click", () => {
        const view = button.dataset.view;
        if (!model) return;

        const size = new THREE.Vector3();
        box.setFromObject(model);
        box.getSize(size);
        const center = modelCenter;

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = (camera.fov * Math.PI) / 180;
        const dist = (maxDim / 2) / Math.tan(fov / 2);

        switch (view) {
          case "top":
            // Top view - looking straight down
            camera.position.set(center.x, center.y + dist * 1.2, center.z);
            break;
          case "angle":
            // Angle view - 45 degree perspective
            camera.position.set(center.x + dist * 0.9, center.y + dist * 0.55, center.z + dist * 0.9);
            break;
          case "side":
            // Side view - 90 degree from side
            camera.position.set(center.x + dist * 1.2, center.y + dist * 0.3, center.z);
            break;
        }

        controls.target.copy(center);
        controls.update();
      });
    });

    // Reset View Button
    if (viewResetButton) {
      viewResetButton.addEventListener("click", () => {
        if (!model) return;
        camera.position.copy(initialCameraPosition);
        controls.target.copy(modelCenter);
        controls.update();
      });
    }

    // Season toggle handler
    seasonToggle.addEventListener("change", () => {
      applySeasonTuning();
      updateSun();
    });

    sunSlider.addEventListener("input", updateSun);
    intensitySlider.addEventListener("input", updateSun);

    function tick() {
      requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    }

    resize();
    tick();
  });
});
