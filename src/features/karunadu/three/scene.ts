import * as THREE from "three";
import { MAP, KARNATAKA_PATH } from "@/features/karunadu/data/map-path";
import { RIVERS, project } from "@/features/karunadu/data/karnataka";
import type { Stop } from "@/features/karunadu/data/journey";

/* Real Karnataka in 3D
 * - terrain.bin: elevation on a 400 x 624 grid (AWS Terrain Tiles), 1 byte
 *   per cell: 0 = outside the state, 1..255 = height in 8 m steps
 * - satellite.jpg: cloud-free Sentinel-2 true-colour mosaic (Jan 2024,
 *   contains modified Copernicus Sentinel data), same extent as the map */

const VERTICAL = 0.02; // map units per metre (relief exaggerated so the Ghats read clearly)

interface Terrain {
  w: number;
  h: number;
  metres: Float32Array;
  inside: Uint8Array;
}

async function loadTerrain(): Promise<Terrain> {
  const buf = await (await fetch("/karnataka/terrain.bin")).arrayBuffer();
  const view = new DataView(buf);
  const w = view.getUint16(4, true);
  const h = view.getUint16(6, true);
  const raw = new Uint8Array(buf, 8, w * h);
  const inside = new Uint8Array(w * h);
  const metres = new Float32Array(w * h);
  for (let i = 0; i < raw.length; i++) {
    inside[i] = raw[i] > 0 ? 1 : 0;
    metres[i] = raw[i] > 0 ? (raw[i] - 1) * 8 : 0;
  }
  // one gentle 3x3 blur pass smooths the 8 m steps
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= w || yy >= h || !inside[yy * w + xx]) continue;
          sum += metres[yy * w + xx];
          n++;
        }
      }
      out[y * w + x] = n ? sum / n : 0;
    }
  }
  return { w, h, metres: out, inside };
}

function heightAt(t: Terrain, x: number, z: number) {
  const gx = Math.max(0, Math.min(t.w - 1, Math.round((x / MAP.width) * (t.w - 1))));
  const gy = Math.max(0, Math.min(t.h - 1, Math.round((z / MAP.height) * (t.h - 1))));
  return t.metres[gy * t.w + gx] * VERTICAL;
}

function outlinePoints(): THREE.Vector2[] {
  return KARNATAKA_PATH.replace(/[MZ]/g, "")
    .split(" L")
    .map((p) => p.trim().split(" ").map(Number))
    .filter((p) => p.length === 2 && !Number.isNaN(p[0]))
    .map(([x, y]) => new THREE.Vector2(x, y));
}

function skyTexture() {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#03050d");
  grad.addColorStop(0.45, "#0b1636");
  grad.addColorStop(0.7, "#2a2a5a");
  grad.addColorStop(0.86, "#7a3f5e");
  grad.addColorStop(1, "#e08a4f");
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* India's west coast, north to south (lat, lon) – where the sea begins */
const SEA_COAST: [number, number][] = [
  [19.5, 72.75], [18.5, 72.85], [17.5, 73.15], [16.5, 73.35], [16.0, 73.5], [15.5, 73.8], [15.0, 74.05],
  [14.5, 74.35], [14.0, 74.5], [13.5, 74.68], [13.0, 74.78], [12.5, 74.95], [12.0, 75.2], [11.5, 75.55],
  [11.0, 75.85], [10.5, 76.0], [9.5, 76.3],
];

function noiseNormalTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const img = g.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const a = Math.sin((x / size) * Math.PI * 6 + Math.sin((y / size) * Math.PI * 4) * 1.5);
      const b = Math.cos((y / size) * Math.PI * 8 + Math.sin((x / size) * Math.PI * 2) * 2);
      const i = (y * size + x) * 4;
      img.data[i] = 128 + a * 50 + (Math.random() - 0.5) * 20;
      img.data[i + 1] = 128 + b * 50 + (Math.random() - 0.5) * 20;
      img.data[i + 2] = 255;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(c);
}

function cloudTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const g = c.getContext("2d")!;
  for (let i = 0; i < 14; i++) {
    const x = 40 + Math.random() * 176;
    const y = 44 + Math.random() * 40;
    const r = 26 + Math.random() * 30;
    const rg = g.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, "rgba(255,255,255,.55)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 256, 128);
  }
  return new THREE.CanvasTexture(c);
}

export interface KarnatakaScene {
  setProgress: (p: number) => void;
  /** -0.5..0.5 pointer offset, for a gentle look-around */
  setPointer: (x: number, y: number) => void;
  /** pause rendering while the map is off screen */
  setRunning: (on: boolean) => void;
  /** shift the picture (fractions of the screen) so a stop sits where the card leaves room */
  setFraming: (x: number, y: number) => void;
  /** where the (smoothed) camera is: the stop it is at, or -1 for the overview */
  status: () => { active: number; settled: boolean };
  /** screen positions (px) of every stop, for HTML labels */
  stopScreen: () => { x: number; y: number; visible: boolean }[];
  resize: () => void;
  dispose: () => void;
}

export async function createScene(canvas: HTMLCanvasElement, stops: Stop[]): Promise<KarnatakaScene> {
  const [terrain, satellite] = await Promise.all([
    loadTerrain(),
    new THREE.TextureLoader().loadAsync("/karnataka/satellite.jpg"),
  ]);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  satellite.colorSpace = THREE.SRGBColorSpace;
  satellite.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scene = new THREE.Scene();
  const sky = skyTexture();
  scene.background = sky;
  scene.fog = new THREE.Fog("#1d2140", 800, 2400);

  const camera = new THREE.PerspectiveCamera(40, 1, 1, 6000);
  const centreX = MAP.width / 2;
  const centreZ = MAP.height / 2;

  /* light: late-afternoon sun from the north-west, soft sky fill */
  scene.add(new THREE.HemisphereLight("#e4efff", "#3a2a18", 1.5));
  const sun = new THREE.DirectionalLight("#fff0d8", 3.0);
  sun.position.set(-500, 650, -350);
  scene.add(sun);

  /* terrain draped with the satellite mosaic */
  const geo = new THREE.PlaneGeometry(MAP.width, MAP.height, terrain.w - 1, terrain.h - 1);
  geo.rotateX(-Math.PI / 2);
  geo.translate(MAP.width / 2, 0, MAP.height / 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, terrain.inside[i] ? terrain.metres[i] * VERTICAL : -2.5);
  }
  geo.computeVertexNormals();
  scene.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: satellite, roughness: 0.92, metalness: 0 })));

  /* the rest of India: dark land, faintly warm */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(MAP.width * 8, MAP.height * 8),
    new THREE.MeshStandardMaterial({ color: "#1b1820", roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(MAP.width / 2, -3, MAP.height / 2);
  scene.add(ground);

  /* the Arabian Sea, shimmering along the west coast */
  const waterNormals = noiseNormalTexture();
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  waterNormals.repeat.set(18, 18);
  const coast = SEA_COAST.map(([lat, lon]) => project(lat, lon + 0.06));
  const seaShape = new THREE.Shape();
  seaShape.moveTo(-MAP.width * 3, coast[0].y);
  coast.forEach((c) => seaShape.lineTo(c.x, c.y));
  seaShape.lineTo(-MAP.width * 3, coast[coast.length - 1].y);
  seaShape.closePath();
  const seaGeo = new THREE.ShapeGeometry(seaShape);
  seaGeo.rotateX(Math.PI / 2); // shape y → world z
  const sea = new THREE.Mesh(
    seaGeo,
    new THREE.MeshStandardMaterial({ color: "#0e4a66", roughness: 0.18, metalness: 0.2, normalMap: waterNormals, normalScale: new THREE.Vector2(0.6, 0.6), side: THREE.DoubleSide })
  );
  sea.position.y = -1.5;
  scene.add(sea);

  /* stars and a rising moon */
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(1800 * 3);
  for (let i = 0; i < 1800; i++) {
    const a = Math.random() * Math.PI * 2;
    const e = 0.08 + Math.random() * 1.2;
    starPos.set([centreX + Math.cos(a) * Math.cos(e) * 3200, Math.sin(e) * 3200, centreZ + Math.sin(a) * Math.cos(e) * 3200], i * 3);
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: "#fff6e0", size: 2, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.85 }));
  scene.add(stars);

  /* state border in zari gold, draped over the terrain */
  const border = outlinePoints().map((p) => new THREE.Vector3(p.x, heightAt(terrain, p.x, p.y) + 1.2, p.y));
  scene.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([...border, border[0]]),
      new THREE.LineBasicMaterial({ color: "#f2c86a", transparent: true, opacity: 0.9 })
    )
  );

  /* the great rivers, glowing softly as they flow */
  const riverMats: THREE.LineDashedMaterial[] = [];
  RIVERS.forEach((r) => {
    const pts = r.points.map(([lat, lon]) => {
      const p = project(lat, lon);
      return new THREE.Vector3(p.x, 0, p.y);
    });
    const curve = new THREE.CatmullRomCurve3(pts);
    const dense = curve.getSpacedPoints(160).map((v) => v.setY(heightAt(terrain, v.x, v.z) + 0.9));
    const g = new THREE.BufferGeometry().setFromPoints(dense);
    const glowLine = new THREE.Line(g, new THREE.LineBasicMaterial({ color: "#4fd6e6", transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }));
    const flow = new THREE.LineDashedMaterial({ color: "#c8fbff", dashSize: 4, gapSize: 5, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    const flowLine = new THREE.Line(g.clone(), flow);
    flowLine.computeLineDistances();
    riverMats.push(flow);
    scene.add(glowLine, flowLine);
  });

  /* soft glow texture for markers */
  const glowTex = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, "rgba(255,230,150,1)");
    rg.addColorStop(0.3, "rgba(255,200,80,0.55)");
    rg.addColorStop(1, "rgba(255,180,40,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  const discTex = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const rg = g.createRadialGradient(28, 28, 2, 32, 32, 30);
    rg.addColorStop(0, "#fffef6");
    rg.addColorStop(0.85, "#f3ead2");
    rg.addColorStop(1, "rgba(243,234,210,0)");
    g.fillStyle = rg;
    g.beginPath();
    g.arc(32, 32, 30, 0, Math.PI * 2);
    g.fill();
    return new THREE.CanvasTexture(c);
  })();

  const moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: "#fff4d6", fog: false, transparent: true, depthWrite: false }));
  moon.position.set(centreX + 1600, 900, centreZ - 2400);
  moon.scale.setScalar(520);
  const moonDisc = new THREE.Sprite(new THREE.SpriteMaterial({ map: discTex, color: "#fffaf0", fog: false, transparent: true, depthWrite: false }));
  moonDisc.position.copy(moon.position);
  moonDisc.scale.setScalar(120);
  scene.add(moon, moonDisc);

  /* slow monsoon clouds drifting over the land */
  const cloudTex = cloudTexture();
  const clouds = Array.from({ length: 16 }, (_, i) => {
    const c = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTex, color: "#cfd6ea", transparent: true, opacity: 0.18 + (i % 3) * 0.05, depthWrite: false }));
    c.position.set(Math.random() * MAP.width * 1.4 - MAP.width * 0.2, 110 + Math.random() * 60, Math.random() * MAP.height);
    c.scale.set(180 + Math.random() * 160, 70 + Math.random() * 50, 1);
    scene.add(c);
    return { c, speed: 2 + Math.random() * 4 };
  });

  /* stop markers: a slim light pillar + glowing base */
  const stopPos = stops.map((s) => {
    const p = project(s.lat, s.lon);
    return new THREE.Vector3(p.x, heightAt(terrain, p.x, p.y), p.y);
  });
  const pillarMat = new THREE.MeshBasicMaterial({ color: "#ffd56a", transparent: true, opacity: 0.22, depthWrite: false });
  const markers = stopPos.map((v, i) => {
    const home = i === stops.length - 1;
    const base = new THREE.Mesh(
      new THREE.SphereGeometry(home ? 2.6 : 1.9, 20, 14),
      new THREE.MeshBasicMaterial({ color: home ? "#e63a3f" : "#ffcc33" })
    );
    base.position.copy(v).setY(v.y + 1.8);
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 70, 8, 1, true), pillarMat);
    pillar.position.copy(v).setY(v.y + 37);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: home ? "#ff6b6b" : "#ffd56a", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.position.copy(v).setY(v.y + 2);
    halo.scale.setScalar(16);
    scene.add(base, pillar, halo);
    return { base, pillar, halo };
  });

  /* camera path: overview → each stop, seen from the south-west and above */
  const centre = new THREE.Vector3(MAP.width / 2, 0, MAP.height / 2);
  const camKeys: THREE.Vector3[] = [new THREE.Vector3(MAP.width * 0.22, 1150, MAP.height * 1.3)];
  const lookKeys: THREE.Vector3[] = [centre.clone()];
  stopPos.forEach((v, i) => {
    const last = i === stopPos.length - 1;
    camKeys.push(new THREE.Vector3(v.x - 75, v.y + (last ? 230 : 175), v.z + 200));
    lookKeys.push(v.clone().setY(v.y + 4));
  });
  const camCurve = new THREE.CatmullRomCurve3(camKeys, false, "centripetal");
  const lookCurve = new THREE.CatmullRomCurve3(lookKeys, false, "centripetal");
  const segs = camKeys.length - 1;

  let target = 0;
  let current = 0;
  let frame = 0;
  let running = true;
  let visible = true;
  let active = -1;
  let settled = false;
  let drift = 1;
  const pointer = new THREE.Vector2();
  const pointerNow = new THREE.Vector2();
  const framing = new THREE.Vector2();
  let frameMix = 0;
  const look = new THREE.Vector3();
  const clock = new THREE.Clock();

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const applyFraming = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    // a lens shift: the land slides on screen without the camera turning
    camera.setViewOffset(w, h, framing.x * w * frameMix, framing.y * h * frameMix, w, h);
  };
  resize();

  const tick = () => {
    if (!running) return;
    if (!visible) {
      clock.getDelta();
      frame = requestAnimationFrame(tick);
      return;
    }
    const dt = Math.min(0.1, clock.getDelta());
    const t = clock.elapsedTime;
    current += (target - current) * (1 - Math.exp(-dt * 3.5));

    // each stop gets an equal share of the scroll, and the camera lingers at it
    const raw = Math.min(0.9999, Math.max(0, current)) * segs;
    const seg = Math.floor(raw);
    const f = raw - seg;
    const eased = f < 0.35 ? 0 : f > 0.95 ? 1 : (f - 0.35) / 0.6;
    const smooth = eased * eased * (3 - 2 * eased);
    const u = (seg + smooth) / segs;

    // a slow drift so the land never feels frozen
    camera.position.copy(camCurve.getPoint(u));
    drift += ((settled ? 0.25 : 1) - drift) * (1 - Math.exp(-dt * 2));
    camera.position.x += Math.sin(t * 0.25) * 6 * drift;
    // look around with the mouse while flying; hold almost still at a stop so its card can be used
    pointerNow.lerp(settled ? pointer.clone().multiplyScalar(0.1) : pointer, 1 - Math.exp(-dt * 3));
    camera.position.x += pointerNow.x * 40;
    camera.position.y += -pointerNow.y * 25;
    look.copy(lookCurve.getPoint(u));
    camera.lookAt(look);

    active = Math.round(u * segs) - 1;
    settled = active >= 0 && (f < 0.4 || f > 0.9);
    markers.forEach((m, i) => {
      const on = i === active;
      m.base.scale.setScalar(on ? 1.5 + Math.sin(t * 4) * 0.2 : 1);
      m.pillar.scale.y = on ? 1.3 : 1;
      m.halo.scale.setScalar(on ? 30 + Math.sin(t * 3) * 4 : 14);
    });
    frameMix += ((active >= 0 ? 1 : 0) - frameMix) * (1 - Math.exp(-dt * 2.5));
    applyFraming();
    waterNormals.offset.set(t * 0.012, t * 0.008);
    clouds.forEach(({ c, speed }) => {
      c.position.x += speed * dt;
      if (c.position.x > MAP.width * 1.3) c.position.x = -MAP.width * 0.3;
    });
    riverMats.forEach((mat) => {
      (mat as unknown as { dashOffset: number }).dashOffset = -t * 6;
    });

    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  const tmp = new THREE.Vector3();
  return {
    setProgress: (p) => {
      target = p;
    },
    setPointer: (x, y) => {
      pointer.set(x, y);
    },
    setRunning: (on) => {
      visible = on;
    },
    setFraming: (x, y) => {
      framing.set(x, y);
    },
    status: () => ({ active, settled }),
    stopScreen: () =>
      stopPos.map((v) => {
        tmp.copy(v).setY(v.y + 2).project(camera);
        return {
          x: (tmp.x * 0.5 + 0.5) * canvas.clientWidth,
          y: (-tmp.y * 0.5 + 0.5) * canvas.clientHeight,
          visible: tmp.z < 1 && Math.abs(tmp.x) < 1.1 && Math.abs(tmp.y) < 1.1,
        };
      }),
    resize,
    dispose: () => {
      running = false;
      cancelAnimationFrame(frame);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose?.();
      });
      satellite.dispose();
      glowTex.dispose();
      discTex.dispose();
      cloudTex.dispose();
      waterNormals.dispose();
      sky.dispose();
      renderer.dispose();
    },
  };
}
