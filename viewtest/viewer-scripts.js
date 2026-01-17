// @ts-nocheck

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("viewer-canvas");
  const loadingEl = document.getElementById("loading-indicator");
  const overlayStatus = document.getElementById("overlay-status");

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

  setText(dbgJS, "Three.js module running ✔");

  if (!canvas || !sunSlider || !intensitySlider) {
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
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 5000);
    camera.position.set(2.5, 1.6, 2.5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.screenSpacePanning = true;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x101010, 0.25));

    // Sun light (casts the ridge shadows)
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0002;
    sun.shadow.normalBias = 0.02;
    scene.add(sun);

    const sunTarget = new THREE.Object3D();
    scene.add(sunTarget);
    sun.target = sunTarget;

    // Optional shadow catcher
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

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

    // HDR environment (ambient/reflections; shadows come from the sun)
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

        setText(dbgModel, "Loaded ✔");
        setOverlay("Loaded ✔");
        setLoading(false);

        resize();
        updateSun(); // set initial labels + sun direction
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
      const sunPos = parseInt(sunSlider.value, 10) || 50;      // 0..100
      const inten = parseInt(intensitySlider.value, 10) || 50; // 0..100
      const t = THREE.MathUtils.clamp(sunPos / 100, 0, 1);

      // We want: LEFT = West/Dusk, RIGHT = East/Dawn (map-facing-north convention).
      // In our simple axis convention: az=0 points +X, az=180 points -X.
      // So sweep RIGHT(East)=0  <->  LEFT(West)=180, meaning az goes 180 -> 0 as t goes 0 -> 1.
      const azDeg = 180 * (1 - t);

      // Low at dawn/dusk, high at noon
      const elDeg = 8 + Math.sin(Math.PI * t) * 70;

      const az = THREE.MathUtils.degToRad(azDeg);
      const el = THREE.MathUtils.degToRad(elDeg);

      const dir = new THREE.Vector3(
        Math.cos(el) * Math.cos(az),
        Math.sin(el),
        Math.cos(el) * Math.sin(az)
      );

      // Intensity + exposure
      const i = THREE.MathUtils.clamp(inten / 100, 0, 1);
      sun.intensity = 0.7 + i * 3.2;
      renderer.toneMappingExposure = 0.75 + i * 0.9;

      // Light distance scales with model size
      let dist = 12;
      if (model) {
        const s = new THREE.Vector3();
        box.setFromObject(model);
        box.getSize(s);
        dist = Math.max(12, Math.max(s.x, s.y, s.z) * 2.7);
      }

      sun.position.copy(sunTarget.position).addScaledVector(dir, dist);
      sun.target.updateMatrixWorld();

      // --------------------------
      // ✅ FIXED LABEL SCALES
      // --------------------------

      // Sun position text: LEFT end = Dusk, middle = Noon, RIGHT end = Dawn
let sunText;
if (sunPos === 0) sunText = "Dusk";
else if (sunPos === 100) sunText = "Dawn";
else if (sunPos < 35) sunText = "Afternoon";
else if (sunPos <= 65) sunText = "Noon";
else sunText = "Morning";
sunLabel.textContent = sunText;

      // Intensity text: LEFT end = Very Dark, RIGHT end = Very Bright
let intText;
if (inten === 0) intText = "Very Dark";
else if (inten === 100) intText = "Very Bright";
else if (inten < 35) intText = "Dark";
else if (inten <= 65) intText = "Medium";
else intText = "Bright";
intensityLabel.textContent = intText;


      // Debug readout
      setText(dbgEl, `${elDeg.toFixed(1)}°`);
      setText(dbgAz, `${azDeg.toFixed(1)}°`);
      setText(dbgInt, sun.intensity.toFixed(2));
      setText(dbgExp, renderer.toneMappingExposure.toFixed(2));
    }

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
