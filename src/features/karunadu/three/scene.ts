import * as THREE from "three";
import { MAP, KARNATAKA_PATH } from "@/features/karunadu/data/map-path";
import { project } from "@/features/karunadu/data/karnataka";
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
  grad.addColorStop(0, "#050914");
  grad.addColorStop(0.55, "#101b33");
  grad.addColorStop(0.8, "#24314f");
  grad.addColorStop(1, "#3a3346");
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export interface KarnatakaScene {
  setProgress: (p: number) => void;
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
  renderer.toneMappingExposure = 1.15;

  satellite.colorSpace = THREE.SRGBColorSpace;
  satellite.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scene = new THREE.Scene();
  const sky = skyTexture();
  scene.background = sky;
  scene.fog = new THREE.Fog("#1a2440", 700, 2100);

  const camera = new THREE.PerspectiveCamera(40, 1, 1, 5000);

  /* light: late-afternoon sun from the north-west, soft sky fill */
  scene.add(new THREE.HemisphereLight("#d6e6ff", "#2a2016", 1.1));
  const sun = new THREE.DirectionalLight("#fff0d8", 2.6);
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

  /* ground beyond the map */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(MAP.width * 8, MAP.height * 8),
    new THREE.MeshStandardMaterial({ color: "#0d1422", roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(MAP.width / 2, -3, MAP.height / 2);
  scene.add(ground);

  /* state border in zari gold, draped over the terrain */
  const border = outlinePoints().map((p) => new THREE.Vector3(p.x, heightAt(terrain, p.x, p.y) + 1.2, p.y));
  scene.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([...border, border[0]]),
      new THREE.LineBasicMaterial({ color: "#f2c86a", transparent: true, opacity: 0.9 })
    )
  );

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
    scene.add(base, pillar);
    return { base, pillar };
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
  const look = new THREE.Vector3();
  const clock = new THREE.Clock();

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();

  const tick = () => {
    if (!running) return;
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
    camera.position.x += Math.sin(t * 0.25) * 6;
    look.copy(lookCurve.getPoint(u));
    camera.lookAt(look);

    const active = Math.round(u * segs) - 1;
    markers.forEach((m, i) => {
      const on = i === active;
      m.base.scale.setScalar(on ? 1.5 + Math.sin(t * 4) * 0.2 : 1);
      m.pillar.scale.y = on ? 1.3 : 1;
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
    stopScreen: () =>
      stopPos.map((v) => {
        tmp.copy(v).setY(v.y + 7).project(camera);
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
      sky.dispose();
      renderer.dispose();
    },
  };
}
