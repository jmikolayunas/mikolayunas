// @ts-nocheck

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/* ============================================================
   SEASON PRESETS — ONLY SUMMER + WINTER
   ------------------------------------------------------------
   Sun Position slider drives azimuth + elevation curve (t)
   Intensity slider drives ONLY sun intensity (i)
   Exposure is AUTO (derived from i + season)
   ============================================================ */

const SEASONS = {
  WINTER: {
    name: "Winter",

    // Lower sun path (more raking light all day)
    elevationMinDeg: 2,
    elevationAmpDeg: 45,

    // Sun strength range
    sunIntensityMin: 0.8,
    sunIntensityMax: 4.2,

    // Exposure AUTO range (we’ll map inversely to sun strength)
    exposureMin: 0.80,
    exposureMax: 1.55,

    intensityScaleDivisor: 100,
    hemisphereIntensity: 0.20,

    shadowMapSize: 4096,
    shadowBias: -0.00025,
    shadowNormalBias: 0.02
  },

  SUMMER: {
    name: "Summer",

    // Higher sun path (noon gets higher)
    elevationMinDeg: 6,
    elevationAmpDeg: 70,

    // Sun strength range
    sunIntensityMin: 0.7,
    sunIntensityMax: 3.9,

    // Exposure AUTO range
    exposureMin: 0.85,
    exposureMax: 1.75,

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
  const overlayStatus = document.getElementById("overlay-status");

  const seasonToggle = document.getElementById("season-toggle");
  const seasonValue = document.getElementById("season-value");

  const sunSlider = document.getElementById("sun-position-slider");
  const sunLabel = document.getElementById("sun-position-value");
  const intensitySlider = document.getElementById("intensity-slider");
  const intensityLabel = document.getElementById("intensity-value");

  const dbgEl = document.getElementById("debug-elevation");
  const dbgAz = document.getElementById("debug-azimuth");
  const dbgInt = document.getElementById("debug-shadow");
  const dbgExp = document.getElementById("debug-exposure");

  const dbgJS = document.getElementById("dbg-js");
  const dbgGLB = document.getElementById("dbg-glb");
  const dbgHDR = document.getElementById("dbg-hdr");
  const dbgModel = document.getElementById("dbg-model");

  const glbPath = "models/stowe.glb";
  const hdrPath = "models/hdri/kloppenheim_06_1k.hdr";

  const setText = (el, t) => { if (el) el.textContent = t; };
  const setOverlay = (t) => { if (overlayStatus) overlayStatus.textContent = t; };
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

  setText(dbgJS, "Three.js module running ✔");

  if (!canvas || !sunSlider || !intensitySlider || !seasonToggle) {
    setOverlay("Missing required DOM elements");
    return;
  }

  if (location.protocol === "file:") {
    setOverlay("Opened as file:// — use Live Server (http://)");
    setText(dbgGLB, "FAILED (file://)");
    setText(dbgHDR, "FAILED (file://)");
    setText(dbgModel, "NOT ATTEMPTED");
    return;
  }

  // Init season label from default checked state
  setSeasonFromToggle();

  async function check(url, outEl) {
    try {
      const bust = url + (url.includes("?") ? "&" : "?") + "v=" + Date.now();
      const res = await fetch(bust, { method: "GET" });
      setText(outEl, res.ok ? `OK (${res.status})` : `FAILED (${res.status})`);
      return res.ok;
    } catch {
      setText(outEl, "FAILED (network/CORS)");
      return false;
    }
  }

  setLoading(true);
  setOverlay("Checking assets…");

  Promise.all([check(glbPath, dbgGLB), check(hdrPath, dbgHDR)]).then(([glbOK, hdrOK]) => {
    if (!glbOK) {
      setOverlay(`GLB not reachable: ${glbPath} (check path/case)`);
      setText(dbgModel, "FAILED (GLB fetch)");
      setLoading(false);
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Start exposure in the middle of the season’s range
    renderer.toneMappingExposure = (SEASON.exposureMin + SEASON.exposureMax) / 2;

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

    setText(dbgModel, "Loading…");
    setOverlay("Loading GLB…");

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

        // Shadow camera bounds sized to model
        const r = maxDim * 1.3;
        const sc = sun.shadow.camera;
        sc.left = -r; sc.right = r; sc.top = r; sc.bottom = -r;
        sc.near = 0.01;
        sc.far = Math.max(50, maxDim * 12);
        sc.updateProjectionMatrix();

        sunTarget.position.copy(center);

        applySeasonTuning();

        setText(dbgModel, "Loaded ✔");
        setOverlay("Loaded ✔");
        setLoading(false);

        resize();
        updateSun(); // initial
      },
      undefined,
      (err) => {
        console.error("GLB load error:", err);
        setText(dbgModel, "FAILED (parse/load)");
        setOverlay("GLB failed to parse/load — check Console");
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

      // Slider -> sun strength ONLY
      const i = 1 - THREE.MathUtils.clamp(inten / SEASON.intensityScaleDivisor, 0, 1);

      // Season controls the elevation curve endpoints + noon height
      const elDeg =
        SEASON.elevationMinDeg +
        Math.sin(Math.PI * t) * SEASON.elevationAmpDeg;

      // ✅ Sun intensity driven by slider
      sun.intensity =
        SEASON.sunIntensityMin +
        i * (SEASON.sunIntensityMax - SEASON.sunIntensityMin);

      // ✅ Exposure AUTO (inverse to sun strength so highlights don’t blow out)
      // When i is high (strong sun), expT drops → exposure goes toward exposureMin.
      const expT = 1 - i;
      renderer.toneMappingExposure =
        SEASON.exposureMin +
        expT * (SEASON.exposureMax - SEASON.exposureMin);

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

      // Debug readout
      setText(dbgEl, `${elDeg.toFixed(1)}°`);
      setText(dbgAz, `${azDeg.toFixed(1)}°`);
      setText(dbgInt, sun.intensity.toFixed(2));
      setText(dbgExp, renderer.toneMappingExposure.toFixed(2));
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
