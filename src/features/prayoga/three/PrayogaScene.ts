import * as THREE from "three";
import type { CulturalSection } from "../types";
export type { CulturalSection };

export interface PrayogaSceneController {
  setPointer: (x: number, y: number) => void;
  setSection: (section: CulturalSection) => void;
  setIntroProgress: (progress: number) => void;
  resize: () => void;
  dispose: () => void;
}

/**
 * Procedural Hampi Granite Texture Generator (512x512)
 * Generates natural weathered Tungabhadra granite with quartz, feldspar,
 * biotite mica mineral speckles, fine chisel tool marks, and micro-relief.
 */
function generateGraniteTextures(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const size = 512;

  const cCanvas = document.createElement("canvas");
  cCanvas.width = size;
  cCanvas.height = size;
  const cCtx = cCanvas.getContext("2d");

  const bCanvas = document.createElement("canvas");
  bCanvas.width = size;
  bCanvas.height = size;
  const bCtx = bCanvas.getContext("2d");

  if (!cCtx || !bCtx) {
    return {
      map: new THREE.CanvasTexture(cCanvas),
      bump: new THREE.CanvasTexture(bCanvas),
    };
  }

  // 1. Warm base sandstone-granite tone authentic to Hampi
  cCtx.fillStyle = "#6d6255";
  cCtx.fillRect(0, 0, size, size);

  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, size, size);

  // 2. Crystalline grain speckling (quartz, feldspar, biotite mica)
  const numSpecks = 22000;
  for (let i = 0; i < numSpecks; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2.0 + 0.5;
    const randType = Math.random();

    let col = "#3a3229"; // Dark biotite mica
    let bumpVal = "rgba(40,40,40,0.6)";

    if (randType > 0.75) {
      col = "#a89b8a"; // Crystalline quartz
      bumpVal = "rgba(225,225,225,0.7)";
    } else if (randType > 0.45) {
      col = "#be9d7c"; // Warm golden-tan feldspar
      bumpVal = "rgba(185,185,185,0.5)";
    } else if (randType > 0.20) {
      col = "#827566"; // Medium warm weathered granite
      bumpVal = "rgba(110,110,110,0.4)";
    }

    cCtx.fillStyle = col;
    cCtx.beginPath();
    cCtx.arc(x, y, r, 0, Math.PI * 2);
    cCtx.fill();

    bCtx.fillStyle = bumpVal;
    bCtx.beginPath();
    bCtx.arc(x, y, r, 0, Math.PI * 2);
    bCtx.fill();
  }

  // 3. Ancient Vijayanagara stonemason chisel striations
  cCtx.lineWidth = 1.2;
  bCtx.lineWidth = 1.2;
  for (let j = 0; j < 45; j++) {
    const startX = Math.random() * size;
    const startY = Math.random() * size;
    const len = 30 + Math.random() * 60;
    const angle = (Math.random() - 0.5) * 0.6;

    cCtx.strokeStyle = Math.random() > 0.5 ? "rgba(38, 30, 24, 0.42)" : "rgba(195, 175, 150, 0.38)";
    cCtx.beginPath();
    cCtx.moveTo(startX, startY);
    cCtx.lineTo(startX + Math.cos(angle) * len, startY + Math.sin(angle) * len);
    cCtx.stroke();

    bCtx.strokeStyle = Math.random() > 0.5 ? "rgba(20, 20, 20, 0.5)" : "rgba(220, 220, 220, 0.5)";
    bCtx.beginPath();
    bCtx.moveTo(startX, startY);
    bCtx.lineTo(startX + Math.cos(angle) * len, startY + Math.sin(angle) * len);
    bCtx.stroke();
  }

  const map = new THREE.CanvasTexture(cCanvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(3, 3);

  const bump = new THREE.CanvasTexture(bCanvas);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(3, 3);

  return { map, bump };
}

/**
 * Paved Courtyard Flagstones Texture Generator (512x512)
 * Generates authentic rectangular stone slab tile joints with subtle
 * tonality differences between slabs.
 */
function generateCourtyardTexture(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const size = 512;
  const cCanvas = document.createElement("canvas");
  cCanvas.width = size;
  cCanvas.height = size;
  const cCtx = cCanvas.getContext("2d");

  const bCanvas = document.createElement("canvas");
  bCanvas.width = size;
  bCanvas.height = size;
  const bCtx = bCanvas.getContext("2d");

  if (!cCtx || !bCtx) {
    return {
      map: new THREE.CanvasTexture(cCanvas),
      bump: new THREE.CanvasTexture(bCanvas),
    };
  }

  // Base stone tone
  cCtx.fillStyle = "#554b40";
  cCtx.fillRect(0, 0, size, size);

  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, size, size);

  // Draw rectangular stone slabs (4x4 grid per repeat tile)
  const rows = 4;
  const cols = 4;
  const w = size / cols;
  const h = size / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * w;
      const y = r * h;

      // Slight tone variation per slab
      const shade = 75 + Math.floor(Math.random() * 20 - 10);
      cCtx.fillStyle = `rgb(${shade + 8}, ${shade}, ${shade - 10})`;
      cCtx.fillRect(x + 2, y + 2, w - 4, h - 4);

      // Chisel marks on each slab
      cCtx.fillStyle = "rgba(220, 200, 175, 0.08)";
      for (let k = 0; k < 6; k++) {
        cCtx.fillRect(x + 6 + Math.random() * (w - 18), y + 6 + Math.random() * (h - 18), 12, 1);
      }

      // Mortar/Joint recessed shadow
      bCtx.fillStyle = "#333333";
      bCtx.fillRect(x, y, w, 3);
      bCtx.fillRect(x, y, 3, h);
    }
  }

  const map = new THREE.CanvasTexture(cCanvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(8, 8);

  const bump = new THREE.CanvasTexture(bCanvas);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(8, 8);

  return { map, bump };
}

/**
 * Cinematic Evening Horizon Sky Dome Texture
 * Warm golden hour sunset fading into dusk obsidian.
 */
function generateSkyTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, "#080808"); // Deep dusk zenith
    grad.addColorStop(0.4, "#140c11"); // Velvet night
    grad.addColorStop(0.65, "#2a1017"); // Subtle Karnataka crimson twilight
    grad.addColorStop(0.82, "#4a2414"); // Warm terracotta amber
    grad.addColorStop(0.94, "#7a441a"); // Sunset golden glow at horizon
    grad.addColorStop(1.0, "#9c5f22"); // Low horizon sun rim
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 512);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

export function createPrayogaScene(canvas: HTMLCanvasElement): PrayogaSceneController {
  const initW = canvas.clientWidth || window.innerWidth || 1200;
  const initH = canvas.clientHeight || window.innerHeight || 800;

  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── WebGL Renderer ──
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(initW, initH, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.32;

  // ── Scene & Atmospheric Fog ──
  // Warm atmospheric haze separating foreground architecture from distant gopuram & hills
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x130e0b, 0.026);

  // ── Perspective Camera ──
  const camera = new THREE.PerspectiveCamera(42, initW / Math.max(initH, 1), 0.1, 100);
  camera.position.set(0, 0.35, 8.2);

  // ── Textures ──
  const graniteTex = generateGraniteTextures();
  const courtyardTex = generateCourtyardTexture();
  const skyTex = generateSkyTexture();

  // ── Materials ──
  // 1. Natural Weathered Hampi Granite
  const graniteStone = new THREE.MeshStandardMaterial({
    color: 0x7a6e60,
    map: graniteTex.map,
    bumpMap: graniteTex.bump,
    bumpScale: 0.07,
    roughness: 0.82,
    metalness: 0.08,
  });

  // 2. Chiseled Carved Relief Granite (moldings, capitals, petal cornices)
  const graniteCarved = new THREE.MeshStandardMaterial({
    color: 0x8f8171,
    map: graniteTex.map,
    bumpMap: graniteTex.bump,
    bumpScale: 0.09,
    roughness: 0.74,
    metalness: 0.12,
  });

  // 3. Deep Granite Joint / Recessed Shadow
  const graniteDark = new THREE.MeshStandardMaterial({
    color: 0x483e34,
    map: graniteTex.map,
    bumpMap: graniteTex.bump,
    bumpScale: 0.06,
    roughness: 0.90,
    metalness: 0.05,
  });

  // 4. Distant Gopuram Brick & Plaster Material (weathered terracotta-ochre tone)
  const gopuramStone = new THREE.MeshStandardMaterial({
    color: 0x6e5c4a,
    map: graniteTex.map,
    bumpMap: graniteTex.bump,
    bumpScale: 0.08,
    roughness: 0.85,
    metalness: 0.06,
  });

  // 5. Paved Courtyard Flagstone Material
  const courtyardMat = new THREE.MeshStandardMaterial({
    color: 0x4e4438,
    map: courtyardTex.map,
    bumpMap: courtyardTex.bump,
    bumpScale: 0.05,
    roughness: 0.78,
    metalness: 0.15,
  });

  // 6. Antique Temple Gold (bronze kalashas, finials, wheel hub highlights)
  const templeGold = new THREE.MeshStandardMaterial({
    color: 0xe5a93c,
    metalness: 0.85,
    roughness: 0.32,
    emissive: 0x2e1b04,
    emissiveIntensity: 0.20,
  });

  // 7. Sacred Karnataka Crimson Accent
  const sacredCrimson = new THREE.MeshStandardMaterial({
    color: 0xc8102e,
    metalness: 0.65,
    roughness: 0.35,
    emissive: 0x5a0812,
    emissiveIntensity: 0.55,
  });

  // ═════════════════════════════════════════════════════════════════════════
  // THREE LAYER HIERARCHY
  // ═════════════════════════════════════════════════════════════════════════
  const foregroundPillarsGroup = new THREE.Group();  // Layer 1: Framing Colonnade (flanks)
  const midgroundMonumentsGroup = new THREE.Group(); // Layer 2: Stone Chariot (secondary landmark)
  const backgroundLandscapeGroup = new THREE.Group(); // Layer 3: Virupaksha Gopuram & Boulder Hills
  const particlesGroup = new THREE.Group();

  scene.add(backgroundLandscapeGroup);
  scene.add(midgroundMonumentsGroup);
  scene.add(foregroundPillarsGroup);
  scene.add(particlesGroup);

  // ═════════════════════════════════════════════════════════════════════════
  // CINEMATIC LIGHTING
  // ═════════════════════════════════════════════════════════════════════════
  // 1. Warm Late-Afternoon / Sunset Sun (Key Light casting long architectural shadows)
  const sunLight = new THREE.DirectionalLight(0xffdfa4, 3.8);
  sunLight.position.set(7.0, 8.0, 5.0);
  scene.add(sunLight);

  // 2. Theatrical Golden Accent Spotlight
  const goldSpotlight = new THREE.SpotLight(0xf5a623, 3.2, 45, Math.PI / 4, 0.5, 1.2);
  goldSpotlight.position.set(4.0, 5.5, 4.0);
  scene.add(goldSpotlight);

  // 3. Deep Karnataka Crimson Rim / Fill Light (dignified low-angle ruby graze)
  const crimsonRimLight = new THREE.PointLight(0xc8102e, 2.6, 30, 1.5);
  crimsonRimLight.position.set(-7.0, 1.0, -4.0);
  scene.add(crimsonRimLight);

  // 4. Soft Golden Horizon Uplight
  const horizonLight = new THREE.PointLight(0xe5a93c, 2.0, 35, 1.6);
  horizonLight.position.set(-2.0, -1.0, -16.0);
  scene.add(horizonLight);

  // 5. Warm Ambient Stone Fill
  const ambientLight = new THREE.AmbientLight(0x352b22, 2.0);
  scene.add(ambientLight);

  // ═════════════════════════════════════════════════════════════════════════
  // LAYER 3: DISTANT BACKGROUND — VIRUPAKSHA GOPURAM & HAMPI BOULDER HILLS
  // ═════════════════════════════════════════════════════════════════════════

  // ── A. Distant Evening Sky Backdrop Plane ──
  const skyGeo = new THREE.PlaneGeometry(65, 36);
  const skyMat = new THREE.MeshBasicMaterial({
    map: skyTex,
    depthWrite: false,
  });
  const skyPlane = new THREE.Mesh(skyGeo, skyMat);
  skyPlane.position.set(0, 6.0, -28.0);
  backgroundLandscapeGroup.add(skyPlane);

  // ── B. The Virupaksha Temple Raja-Gopuram Silhouette & Structure ──
  // Proportions: 7-tiered pyramidal tower with stone base, pillared niches,
  // overhanging kapotas, and crowning barrel-vaulted sala roof with 7 golden kalashas.
  const createVirupakshaGopuram = (): THREE.Group => {
    const gopuram = new THREE.Group();

    // 1. Stone Base / Upapitha & Adhisthana (2 substantial stone tiers)
    const baseW = 5.2;
    const baseH = 2.4;
    const baseD = 3.6;

    const lowerBase = new THREE.Mesh(
      new THREE.BoxGeometry(baseW, baseH * 0.5, baseD),
      graniteDark
    );
    lowerBase.position.y = -1.2;
    gopuram.add(lowerBase);

    const upperBase = new THREE.Mesh(
      new THREE.BoxGeometry(baseW * 0.92, baseH * 0.5, baseD * 0.92),
      gopuramStone
    );
    upperBase.position.y = -0.6;
    gopuram.add(upperBase);

    // Dvarasala Portal Entrance Arch (tunneling through the base)
    const portalArch = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 1.6, baseD + 0.2),
      graniteDark
    );
    portalArch.position.set(0, -0.6, 0);
    gopuram.add(portalArch);

    // Front portal carved jambs
    const portalTrim = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.8, 0.2),
      graniteCarved
    );
    portalTrim.position.set(0, -0.5, baseD * 0.46);
    gopuram.add(portalTrim);

    // 2. Multi-tiered Pyramidal Super-Structure (7 ascending Talas)
    let currentY = 0.0;
    const tiers = 7;
    for (let t = 0; t < tiers; t++) {
      const taper = 1 - t * 0.095;
      const tierW = (baseW * 0.84) * taper;
      const tierH = 1.15 * (1 - t * 0.04);
      const tierD = (baseD * 0.84) * taper;

      // Tier Main Body
      const tierBody = new THREE.Mesh(
        new THREE.BoxGeometry(tierW, tierH, tierD),
        gopuramStone
      );
      tierBody.position.y = currentY + tierH * 0.5;
      gopuram.add(tierBody);

      // Overhanging Cornice Eaves (Kapota) on each tier
      const eaveW = tierW + 0.35;
      const eaveD = tierD + 0.35;
      const eave = new THREE.Mesh(
        new THREE.BoxGeometry(eaveW, 0.16, eaveD),
        graniteCarved
      );
      eave.position.y = currentY + tierH;
      gopuram.add(eave);

      // Decorative pilaster / miniature shrine reliefs (kutas & salas on tier facade)
      const numPilasters = 5;
      for (let p = 0; p < numPilasters; p++) {
        const px = (p - 2) * (tierW * 0.2);
        const pilaster = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, tierH * 0.8, 0.08),
          graniteCarved
        );
        pilaster.position.set(px, currentY + tierH * 0.45, tierD * 0.5 + 0.04);
        gopuram.add(pilaster);
      }

      currentY += tierH + 0.16;
    }

    // 3. Crowning Wagon-Vault / Barrel-Vaulted Sala Shikhara
    const crownW = 2.2;
    const crownH = 0.95;
    const crownD = 1.6;

    // Wagon barrel-vault roof (half cylinder rotated)
    const salaGeo = new THREE.CylinderGeometry(crownD * 0.5, crownD * 0.5, crownW, 16, 1, false, 0, Math.PI);
    const salaRoof = new THREE.Mesh(salaGeo, graniteCarved);
    salaRoof.rotation.z = Math.PI / 2;
    salaRoof.position.set(0, currentY + 0.15, 0);
    gopuram.add(salaRoof);

    // Arched Gable Ends (Chaitya / Kudu arched fronton)
    const kuduTrim = new THREE.Mesh(
      new THREE.TorusGeometry(crownD * 0.48, 0.08, 12, 16, Math.PI),
      templeGold
    );
    kuduTrim.rotation.y = Math.PI / 2;
    kuduTrim.position.set(crownW * 0.5, currentY + 0.15, 0);
    gopuram.add(kuduTrim);

    // 4. Crest of Golden Kalashas (Row of 7 consecrated finials atop the sala crest)
    const numKalashas = 7;
    for (let k = 0; k < numKalashas; k++) {
      const kx = (k - 3) * (crownW / 7);

      // Kalasha pot base
      const pot = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 10, 10),
        templeGold
      );
      pot.position.set(kx, currentY + crownH + 0.08, 0);
      gopuram.add(pot);

      // Kalasha conical spire
      const spire = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.32, 10),
        templeGold
      );
      spire.position.set(kx, currentY + crownH + 0.28, 0);
      gopuram.add(spire);
    }

    return gopuram;
  };

  // Position the Virupaksha Gopuram majestically in the background to the left-center
  const virupakshaGopuram = createVirupakshaGopuram();
  virupakshaGopuram.position.set(-4.2, -1.8, -19.5);
  backgroundLandscapeGroup.add(virupakshaGopuram);

  // ── C. Characteristic Hampi Granite Boulder Formations (Matanga / Hemakuta ridges) ──
  const createHampiBoulderHill = (baseX: number, baseY: number, baseZ: number, scaleFactor: number): THREE.Group => {
    const hill = new THREE.Group();

    // Natural pile of rounded, weathered balancing boulders
    const boulderData = [
      { x: -1.8, y: 0.2, z: 0.0, rx: 1.8, ry: 1.2, rz: 1.5, rot: 0.1 },
      { x: 0.4, y: 0.5, z: -0.4, rx: 2.2, ry: 1.5, rz: 1.8, rot: -0.15 },
      { x: 2.2, y: 0.1, z: 0.2, rx: 1.7, ry: 1.1, rz: 1.4, rot: 0.2 },
      { x: -0.6, y: 1.6, z: -0.2, rx: 1.6, ry: 1.2, rz: 1.3, rot: -0.05 }, // Second tier
      { x: 1.1, y: 1.5, z: 0.1, rx: 1.4, ry: 1.0, rz: 1.2, rot: 0.12 },
      { x: 0.2, y: 2.5, z: -0.1, rx: 1.1, ry: 0.9, rz: 0.9, rot: -0.25 }, // Top balancing boulder
    ];

    boulderData.forEach((b) => {
      // Deformed sphere creating organic weathered granite boulder
      const geo = new THREE.SphereGeometry(1.0, 10, 8);
      geo.scale(b.rx, b.ry, b.rz);
      const mesh = new THREE.Mesh(geo, graniteStone);
      mesh.position.set(b.x, b.y, b.z);
      mesh.rotation.set(b.rot, b.rot * 2, b.rot * 0.5);
      hill.add(mesh);
    });

    // Small distant four-pillar hilltop mandapa (characteristic of Hemakuta hill shrines)
    const shrine = new THREE.Group();
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 1.4), graniteDark);
    shrine.add(plinth);

    [[-0.5, -0.5], [-0.5, 0.5], [0.5, -0.5], [0.5, 0.5]].forEach(([cx, cz]) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.9, 8), graniteCarved);
      col.position.set(cx, 0.5, cz);
      shrine.add(col);
    });

    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 1.6), graniteStone);
    roof.position.y = 1.0;
    shrine.add(roof);

    const shikhara = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.6, 4), graniteCarved);
    shikhara.position.y = 1.4;
    shikhara.rotation.y = Math.PI / 4;
    shrine.add(shikhara);

    shrine.position.set(0.2, 3.4, -0.1);
    shrine.scale.setScalar(0.75);
    hill.add(shrine);

    hill.position.set(baseX, baseY, baseZ);
    hill.scale.setScalar(scaleFactor);
    return hill;
  };

  // Add distant boulder hills framing the horizon
  backgroundLandscapeGroup.add(createHampiBoulderHill(7.5, -2.4, -21.0, 1.25));  // Right Matanga ridge
  backgroundLandscapeGroup.add(createHampiBoulderHill(-10.5, -2.6, -23.0, 1.4)); // Left Hemakuta ridge

  // ═════════════════════════════════════════════════════════════════════════
  // LAYER 2: MIDGROUND — STONE CHARIOT AS SECONDARY HERITAGE LANDMARK
  // ═════════════════════════════════════════════════════════════════════════
  // The Vittala Temple Stone Chariot is positioned gracefully in the courtyard
  // to the right (x: ~3.5, z: ~ -6.0), rather than oversized in the foreground!

  const createStoneChariotMonument = (): THREE.Group => {
    const chariot = new THREE.Group();

    // ── A. Adhisthana Plinth Base (Stepped granite chariot chassis) ──
    const plinthW = 2.8;
    const plinthL = 3.6;
    const plinthH = 0.9;

    // Lower carved foundation
    const lowerP = new THREE.Mesh(
      new THREE.BoxGeometry(plinthW, 0.35, plinthL),
      graniteDark
    );
    lowerP.position.y = 0.18;
    chariot.add(lowerP);

    // Middle frieze band with mythical beast / floral relief
    const midP = new THREE.Mesh(
      new THREE.BoxGeometry(plinthW * 0.94, 0.30, plinthL * 0.94),
      graniteCarved
    );
    midP.position.y = 0.50;
    chariot.add(midP);

    // Upper platform coping with lotus petal rim
    const topP = new THREE.Mesh(
      new THREE.BoxGeometry(plinthW * 0.98, 0.25, plinthL * 0.98),
      graniteStone
    );
    topP.position.y = 0.77;
    chariot.add(topP);

    // Front approach steps (*Sopana*)
    const steps = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.45, 0.8),
      graniteCarved
    );
    steps.position.set(0, 0.22, plinthL * 0.5 + 0.35);
    chariot.add(steps);

    // ── B. Four Sculpted 16-Spoke Stone Wheels ──
    const createWheel = (): THREE.Group => {
      const wheel = new THREE.Group();
      const radius = 0.72;

      // Outer heavy stone tire with concentric carved grooves
      const tire = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.08, 16, 48),
        graniteStone
      );
      wheel.add(tire);

      // Lotus petal notches on outer rim
      for (let p = 0; p < 16; p++) {
        const ang = (p * Math.PI * 2) / 16;
        const petal = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.08, 0.04),
          graniteCarved
        );
        petal.position.set(Math.cos(ang) * (radius - 0.04), Math.sin(ang) * (radius - 0.04), 0.04);
        petal.rotation.z = ang;
        wheel.add(petal);
      }

      // 16 Chiseled Stone Spokes
      for (let s = 0; s < 16; s++) {
        const sAngle = (s * Math.PI * 2) / 16;
        const spoke = new THREE.Mesh(
          new THREE.CylinderGeometry(0.022, 0.035, radius * 0.85, 8),
          graniteCarved
        );
        spoke.position.set(
          Math.cos(sAngle) * (radius * 0.42),
          Math.sin(sAngle) * (radius * 0.42),
          0.0
        );
        spoke.rotation.z = sAngle + Math.PI / 2;
        wheel.add(spoke);
      }

      // Central sculpted floral hub
      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.25, 0.24, 16),
        graniteDark
      );
      hub.rotation.x = Math.PI / 2;
      wheel.add(hub);

      // Conical bronze axle boss
      const axle = new THREE.Mesh(
        new THREE.ConeGeometry(0.14, 0.22, 16),
        templeGold
      );
      axle.rotation.x = -Math.PI / 2;
      axle.position.z = 0.14;
      wheel.add(axle);

      return wheel;
    };

    // Position four wheels on the chariot base
    const wheelOffsetX = plinthW * 0.5 + 0.06;
    const wheelOffsetZ = plinthL * 0.32;
    const wheelY = 0.72;

    const wheelFL = createWheel();
    wheelFL.position.set(-wheelOffsetX, wheelY, wheelOffsetZ);
    wheelFL.rotation.y = Math.PI;
    chariot.add(wheelFL);

    const wheelFR = createWheel();
    wheelFR.position.set(wheelOffsetX, wheelY, wheelOffsetZ);
    chariot.add(wheelFR);

    const wheelRL = createWheel();
    wheelRL.position.set(-wheelOffsetX, wheelY, -wheelOffsetZ);
    wheelRL.rotation.y = Math.PI;
    chariot.add(wheelRL);

    const wheelRR = createWheel();
    wheelRR.position.set(wheelOffsetX, wheelY, -wheelOffsetZ);
    chariot.add(wheelRR);

    // ── C. Stone Elephant Guardians flanking front steps ──
    const createElephantGuard = (isLeft: boolean): THREE.Group => {
      const ele = new THREE.Group();
      const sign = isLeft ? -1 : 1;

      // Body mass
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.42, 0.65), graniteCarved);
      body.position.y = 0.32;
      ele.add(body);

      // Head & domed forehead
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), graniteCarved);
      head.position.set(0, 0.45, 0.35);
      ele.add(head);

      // Curving trunk down to the platform
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.4, 8), graniteStone);
      trunk.position.set(0, 0.22, 0.48);
      trunk.rotation.x = 0.4;
      ele.add(trunk);

      // Gold caparison forehead band
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.025, 8, 16), templeGold);
      band.position.set(0, 0.45, 0.35);
      ele.add(band);

      ele.position.set(sign * 0.65, 0.15, plinthL * 0.5 + 0.35);
      return ele;
    };
    chariot.add(createElephantGuard(true));
    chariot.add(createElephantGuard(false));

    // ── D. Chariot Mandapa Shrine Body & Dravidian Vimana Shikhara ──
    const shrineW = plinthW * 0.72;
    const shrineL = plinthL * 0.68;
    const shrineH = 1.35;
    const shrineBaseY = 0.90;

    // Corner ornate pillars supporting chariot roof
    const cornerX = shrineW * 0.42;
    const cornerZ = shrineL * 0.42;
    [[-cornerX, -cornerZ], [-cornerX, cornerZ], [cornerX, -cornerZ], [cornerX, cornerZ]].forEach(([cx, cz]) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.085, shrineH, 10), graniteCarved);
      col.position.set(cx, shrineBaseY + shrineH * 0.5, cz);
      chariot.add(col);

      // Pushpapodigai bracket capital
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.24), templeGold);
      cap.position.set(cx, shrineBaseY + shrineH, cz);
      chariot.add(cap);
    });

    // Inner sanctum stone sanctuary block
    const sanctum = new THREE.Mesh(
      new THREE.BoxGeometry(shrineW * 0.68, shrineH * 0.92, shrineL * 0.68),
      graniteStone
    );
    sanctum.position.set(0, shrineBaseY + shrineH * 0.46, -0.05);
    chariot.add(sanctum);

    // Chariot eave cornice (Kapota)
    const chariotEave = new THREE.Mesh(
      new THREE.BoxGeometry(shrineW + 0.35, 0.18, shrineL + 0.35),
      graniteCarved
    );
    chariotEave.position.set(0, shrineBaseY + shrineH + 0.08, 0);
    chariot.add(chariotEave);

    // Dravidian Stepped Vimana Tower (3 stepped tiers)
    let vimanaY = shrineBaseY + shrineH + 0.17;
    for (let v = 0; v < 3; v++) {
      const vScale = 1 - v * 0.22;
      const tier = new THREE.Mesh(
        new THREE.BoxGeometry(shrineW * vScale, 0.35, shrineL * vScale),
        graniteCarved
      );
      tier.position.set(0, vimanaY + 0.175, 0);
      chariot.add(tier);
      vimanaY += 0.35;
    }

    // Domical Shikhara Cap
    const domeCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
      graniteCarved
    );
    domeCap.position.set(0, vimanaY, 0);
    chariot.add(domeCap);

    // Golden Kalasha Finial on Chariot Peak
    const chariotKalasha = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.48, 12),
      templeGold
    );
    chariotKalasha.position.set(0, vimanaY + 0.58, 0);
    chariot.add(chariotKalasha);

    return chariot;
  };

  // Build the stone chariot and position it in the mid-ground courtyard
  const chariotMonument = createStoneChariotMonument();
  chariotMonument.position.set(3.4, -2.1, -6.2);
  chariotMonument.rotation.y = -0.48; // 3/4 dignified angle showing side wheels & front elephants
  chariotMonument.scale.setScalar(0.92);
  midgroundMonumentsGroup.add(chariotMonument);

  // ═════════════════════════════════════════════════════════════════════════
  // LAYER 1: FOREGROUND — VIJAYANAGARA TEMPLE MANDAPA COLONNADE
  // ═════════════════════════════════════════════════════════════════════════
  // Positioned strictly along the left and right outer flanks to frame the central
  // content, leaving the hero title and section selector completely unobscured!

  const createTempleMandapaFraming = (isLeft: boolean): THREE.Group => {
    const colonnade = new THREE.Group();
    const sign = isLeft ? -1 : 1;

    // Colonnade with 2 depth-layered pillars along each flank
    const pillarPositions = [
      { x: sign * 5.8, z: 2.2 },  // Near foreground pillar
      { x: sign * 6.5, z: -1.2 }, // Slightly deeper pillar
    ];

    pillarPositions.forEach((pos, idx) => {
      const pillar = new THREE.Group();

      // 1. Stepped Plinth Base (Upana & Padma)
      const base1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.32, 1.2), graniteDark);
      base1.position.y = -3.0;
      pillar.add(base1);

      const base2 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.25, 0.95), graniteCarved);
      base2.position.y = -2.72;
      pillar.add(base2);

      // 2. Classical Vijayanagara Pillar Shaft
      // Lower square section (Chaturashra)
      const lowerSquare = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.8, 0.55), graniteStone);
      lowerSquare.position.y = -1.7;
      pillar.add(lowerSquare);

      // Middle octagonal fluted section (Ashtashra) with carved bands
      const midOct = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 2.2, 8), graniteCarved);
      midOct.position.y = 0.3;
      pillar.add(midOct);

      // Medallion band
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 8, 16), templeGold);
      ring.position.y = 0.3;
      ring.rotation.x = Math.PI / 2;
      pillar.add(ring);

      // Upper square section
      const upperSquare = new THREE.Mesh(new THREE.BoxGeometry(0.52, 1.8, 0.52), graniteStone);
      upperSquare.position.y = 2.3;
      pillar.add(upperSquare);

      // 3. Potika / Pushpapodigai Lotus-Bud Corbel Capital
      const potikaBase = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.3, 0.85), graniteCarved);
      potikaBase.position.y = 3.35;
      pillar.add(potikaBase);

      // Inward-projecting lotus bud bracket
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.42, 0.55), graniteCarved);
      bracket.position.set(-sign * 0.35, 3.65, 0);
      pillar.add(bracket);

      pillar.position.set(pos.x, 0, pos.z);
      colonnade.add(pillar);
    });

    // Massive overhead stone beam (Uttira) connecting the colonnade
    const architrave = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.55, 5.5),
      graniteDark
    );
    architrave.position.set(sign * 6.15, 4.15, 0.5);
    colonnade.add(architrave);

    // Overhanging carved stone cornice (Kapota) with double-curved drip edge
    const kapota = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.22, 5.8),
      graniteCarved
    );
    kapota.position.set(sign * 6.15, 4.52, 0.5);
    colonnade.add(kapota);

    return colonnade;
  };

  foregroundPillarsGroup.add(createTempleMandapaFraming(true));  // Left flank
  foregroundPillarsGroup.add(createTempleMandapaFraming(false)); // Right flank

  // ── D. Paved Temple Courtyard Flagstones (Realistic Ground Plane) ──
  const floorGeo = new THREE.PlaneGeometry(38, 38, 1, 1);
  const courtyardFloor = new THREE.Mesh(floorGeo, courtyardMat);
  courtyardFloor.rotation.x = -Math.PI / 2;
  courtyardFloor.position.y = -3.18;
  scene.add(courtyardFloor);

  // ═════════════════════════════════════════════════════════════════════════
  // ATMOSPHERIC DUST MOTES & DIYA LIGHT GLOW
  // ═════════════════════════════════════════════════════════════════════════
  const particleCount = 140; // Restrained count to prevent visual distraction
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 18.0;
    particlePositions[i3 + 1] = -2.5 + Math.random() * 8.0;
    particlePositions[i3 + 2] = -12.0 + Math.random() * 16.0;
  }

  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

  // Circular soft glowing particle texture
  const pCanvas = document.createElement("canvas");
  pCanvas.width = 64;
  pCanvas.height = 64;
  const pctx = pCanvas.getContext("2d");
  if (pctx) {
    const grad = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 245, 215, 1)");
    grad.addColorStop(0.35, "rgba(229, 169, 60, 0.75)");
    grad.addColorStop(0.7, "rgba(200, 16, 46, 0.15)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    pctx.fillStyle = grad;
    pctx.fillRect(0, 0, 64, 64);
  }
  const particleTexture = new THREE.CanvasTexture(pCanvas);

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xf5eedb,
    size: 0.12,
    map: particleTexture,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particleSystem = new THREE.Points(particleGeo, particleMaterial);
  particlesGroup.add(particleSystem);

  // ═════════════════════════════════════════════════════════════════════════
  // ANIMATION LOOP & CONTROLS
  // ═════════════════════════════════════════════════════════════════════════
  let running = true;
  let isTabVisible = true;
  let animFrameId = 0;
  let introProgress = 0.95;
  let currentSection: CulturalSection = "sahitya";

  const targetPointer = { x: 0, y: 0 };
  const currentPointer = { x: 0, y: 0 };

  const sectionThemes = {
    sahitya: {
      goldIntensity: 3.4,
      crimsonIntensity: 2.2,
      sunIntensity: 3.8,
    },
    ranga: {
      goldIntensity: 3.0,
      crimsonIntensity: 3.6,
      sunIntensity: 3.4,
    },
    nudi: {
      goldIntensity: 3.8,
      crimsonIntensity: 2.0,
      sunIntensity: 4.0,
    },
  };

  const clock = new THREE.Clock();

  const handleVisibility = () => {
    isTabVisible = !document.hidden;
    if (isTabVisible && running) {
      clock.start();
    }
  };
  document.addEventListener("visibilitychange", handleVisibility);

  const tick = () => {
    if (!running) return;

    if (!isTabVisible) {
      animFrameId = requestAnimationFrame(tick);
      return;
    }

    const elapsedTime = clock.getElapsedTime();
    const theme = sectionThemes[currentSection];
    const speedMult = isReducedMotion ? 0.15 : 1.0;

    // Smooth pointer parallax lerping
    currentPointer.x += (targetPointer.x - currentPointer.x) * 0.04;
    currentPointer.y += (targetPointer.y - currentPointer.y) * 0.04;

    // Restrained camera glide
    const targetZ = 9.2 - introProgress * 1.4;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.position.x = currentPointer.x * 0.45 * speedMult;
    camera.position.y = -currentPointer.y * 0.25 * speedMult + 0.35;
    camera.lookAt(0, 0.4, -4.5);

    // Multi-depth layer parallax:
    // Layer 1 (Foreground framing colonnade): slightly faster parallax
    foregroundPillarsGroup.position.x = -currentPointer.x * 0.45 * speedMult;
    foregroundPillarsGroup.position.y = currentPointer.y * 0.15 * speedMult;

    // Layer 2 (Midground stone chariot): subtle dignified breathing motion
    const isMob = (window.innerWidth || 1200) < 768;
    const baseChariotX = isMob ? 2.6 : 3.4;
    chariotMonument.position.x = baseChariotX + currentPointer.x * 0.15 * speedMult;
    chariotMonument.position.y = -2.1 + Math.sin(elapsedTime * 0.35 * speedMult) * 0.02;

    // Layer 3 (Distant Gopuram & Hills): deep horizon parallax
    backgroundLandscapeGroup.position.x = -currentPointer.x * 0.08 * speedMult;

    // Floating golden dust slow drift
    particlesGroup.rotation.y = elapsedTime * 0.012 * speedMult;

    // Gentle sunbeam light breathing
    goldSpotlight.intensity = theme.goldIntensity + Math.sin(elapsedTime * 0.8 * speedMult) * 0.25;
    crimsonRimLight.intensity = theme.crimsonIntensity + Math.cos(elapsedTime * 0.7 * speedMult) * 0.20;

    renderer.render(scene, camera);
    animFrameId = requestAnimationFrame(tick);
  };

  animFrameId = requestAnimationFrame(tick);

  // ── Resize Handler ──
  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth || 1200;
    const h = canvas.clientHeight || window.innerHeight || 800;
    if (w === 0 || h === 0) return;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const isMob = w < 768;
    // Adjust framing dynamically for mobile to ensure open central view
    chariotMonument.position.x = isMob ? 2.6 : 3.4;
    chariotMonument.scale.setScalar(isMob ? 0.75 : 0.92);
    virupakshaGopuram.position.x = isMob ? -3.2 : -4.2;
    virupakshaGopuram.scale.setScalar(isMob ? 0.82 : 1.0);
  };

  // ── Resource Disposal ──
  const dispose = () => {
    running = false;
    cancelAnimationFrame(animFrameId);
    document.removeEventListener("visibilitychange", handleVisibility);

    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material?.dispose();
        }
      }
    });

    graniteTex.map.dispose();
    graniteTex.bump.dispose();
    courtyardTex.map.dispose();
    courtyardTex.bump.dispose();
    skyTex.dispose();
    particleGeo.dispose();
    particleMaterial.dispose();
    particleTexture.dispose();
    renderer.dispose();
  };

  return {
    setPointer: (x, y) => {
      targetPointer.x = x;
      targetPointer.y = y;
    },
    setSection: (section) => {
      currentSection = section;
    },
    setIntroProgress: (progress) => {
      introProgress = Math.min(1, Math.max(0.4, progress));
    },
    resize,
    dispose,
  };
}
