import * as THREE from "three";
import { MAP, KARNATAKA_PATH } from "@/features/karunadu/data/map-path";
import { project } from "@/features/karunadu/data/karnataka";
import type { Stop } from "@/features/karunadu/data/journey";

/* Real-terrain Karnataka built from /public/karnataka/terrain.bin
 * (elevation in metres on a 200 x 312 grid, plus an inside/outside mask). */

const VERTICAL = 0.022; // map units per metre (relief exaggerated ~15x so the Ghats read clearly)

interface Terrain {
  w: number;
  h: number;
  heights: Uint16Array;
  mask: Uint8Array;
}

async function loadTerrain(): Promise<Terrain> {
  const buf = await (await fetch("/karnataka/terrain.bin")).arrayBuffer();
  const view = new DataView(buf);
  const w = view.getUint16(4, true);
  const h = view.getUint16(6, true);
  const heights = new Uint16Array(buf.slice(8, 8 + w * h * 2));
  const mask = new Uint8Array(buf.slice(8 + w * h * 2));
  // two passes of a 3x3 blur to remove sensor noise from the elevation tiles
  let src = heights;
  for (let pass = 0; pass < 2; pass++) {
    const out = new Uint16Array(src.length);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0;
        let cnt = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx;
            const yy = y + dy;
            if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
            sum += src[yy * w + xx];
            cnt++;
          }
        }
        out[y * w + x] = Math.round(sum / cnt);
      }
    }
    src = out;
  }
  return { w, h, heights: src, mask };
}

/* realistic land colours by elevation */
const C = {
  coast: new THREE.Color("#3f6f4a"),
  plain: new THREE.Color("#9a7448"),
  redSoil: new THREE.Color("#8f5236"),
  plateau: new THREE.Color("#a98a5a"),
  forest: new THREE.Color("#2d5a34"),
  peak: new THREE.Color("#5e7b55"),
  outside: new THREE.Color("#141c2b"),
};

function landColor(e: number, inside: boolean, out: THREE.Color) {
  if (!inside) return out.copy(C.outside);
  if (e < 60) return out.copy(C.coast);
  if (e < 400) return out.copy(C.coast).lerp(C.plain, (e - 60) / 340);
  if (e < 650) return out.copy(C.plain).lerp(C.redSoil, (e - 400) / 250);
  if (e < 900) return out.copy(C.redSoil).lerp(C.plateau, (e - 650) / 250);
  if (e < 1300) return out.copy(C.plateau).lerp(C.forest, (e - 900) / 400);
  return out.copy(C.forest).lerp(C.peak, Math.min(1, (e - 1300) / 400));
}

function sampleHeight(t: Terrain, x: number, z: number) {
  const gx = Math.max(0, Math.min(t.w - 1, Math.round((x / MAP.width) * t.w - 0.5)));
  const gy = Math.max(0, Math.min(t.h - 1, Math.round((z / MAP.height) * t.h - 0.5)));
  return t.heights[gy * t.w + gx] * VERTICAL;
}

function outlinePoints(): THREE.Vector2[] {
  return KARNATAKA_PATH.replace(/[MZ]/g, "")
    .split(" L")
    .map((p) => p.trim().split(" ").map(Number))
    .filter((p) => p.length === 2 && !Number.isNaN(p[0]))
    .map(([x, y]) => new THREE.Vector2(x, y));
}

export interface KarnatakaScene {
  setProgress: (p: number) => void;
  /** screen positions (px) of every stop, for HTML labels */
  stopScreen: () => { x: number; y: number; visible: boolean }[];
  resize: () => void;
  dispose: () => void;
}

export async function createScene(canvas: HTMLCanvasElement, stops: Stop[]): Promise<KarnatakaScene> {
  const terrain = await loadTerrain();

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const sky = new THREE.Color("#0f1626");
  scene.background = sky;
  scene.fog = new THREE.Fog(sky, 500, 1700);

  const camera = new THREE.PerspectiveCamera(42, 1, 1, 4000);

  /* light: warm low sun from the west (the Arabian Sea side) */
  scene.add(new THREE.HemisphereLight("#cfe3ff", "#3a2a1a", 0.75));
  const sun = new THREE.DirectionalLight("#ffd9a0", 2.2);
  sun.position.set(-400, 500, 200);
  scene.add(sun);

  /* terrain mesh */
  const geo = new THREE.PlaneGeometry(MAP.width, MAP.height, terrain.w - 1, terrain.h - 1);
  geo.rotateX(-Math.PI / 2);
  geo.translate(MAP.width / 2, 0, MAP.height / 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);
  const col = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const gx = i % terrain.w;
    const gy = Math.floor(i / terrain.w);
    const e = terrain.heights[gy * terrain.w + gx];
    const inside = terrain.mask[gy * terrain.w + gx] === 1;
    pos.setY(i, inside ? e * VERTICAL : -1.5);
    landColor(e, inside, col);
    colors.set([col.r, col.g, col.b], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const land = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 }));
  scene.add(land);

  /* the land beyond the border fades into the night */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(MAP.width * 6, MAP.height * 6),
    new THREE.MeshStandardMaterial({ color: "#121a28", roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(MAP.width / 2, -2, MAP.height / 2);
  scene.add(ground);

  /* state border in zari gold, draped over the terrain */
  const border = outlinePoints().map((p) => new THREE.Vector3(p.x, sampleHeight(terrain, p.x, p.y) + 1.6, p.y));
  const borderGeo = new THREE.BufferGeometry().setFromPoints([...border, border[0]]);
  scene.add(new THREE.Line(borderGeo, new THREE.LineBasicMaterial({ color: "#f2c86a", transparent: true, opacity: 0.95 })));

  /* stop markers: a light pillar + glowing base */
  const stopPos = stops.map((s) => {
    const p = project(s.lat, s.lon);
    return new THREE.Vector3(p.x, sampleHeight(terrain, p.x, p.y), p.y);
  });
  const glow = new THREE.MeshBasicMaterial({ color: "#ffcc00", transparent: true, opacity: 0.9 });
  const pillarMat = new THREE.MeshBasicMaterial({ color: "#ffcc00", transparent: true, opacity: 0.18, depthWrite: false });
  const markers = stopPos.map((v, i) => {
    const g = new THREE.Group();
    const home = i === stops.length - 1;
    const base = new THREE.Mesh(new THREE.SphereGeometry(home ? 3.2 : 2.4, 16, 12), home ? new THREE.MeshBasicMaterial({ color: "#d6262b" }) : glow);
    base.position.copy(v).setY(v.y + 2);
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 60, 8, 1, true), pillarMat);
    pillar.position.copy(v).setY(v.y + 32);
    g.add(base, pillar);
    scene.add(g);
    return { g, base, pillar };
  });

  /* camera path: high overview → each stop (seen from the south-west, slightly above) */
  const centre = new THREE.Vector3(MAP.width / 2, 0, MAP.height / 2);
  const camKeys: THREE.Vector3[] = [new THREE.Vector3(MAP.width * 0.1, 1050, MAP.height * 1.25)];
  const lookKeys: THREE.Vector3[] = [centre.clone()];
  stopPos.forEach((v, i) => {
    const last = i === stopPos.length - 1;
    camKeys.push(new THREE.Vector3(v.x - 60, v.y + (last ? 190 : 150), v.z + 170));
    lookKeys.push(v.clone().setY(v.y + 5));
  });
  const camCurve = new THREE.CatmullRomCurve3(camKeys, false, "centripetal");
  const lookCurve = new THREE.CatmullRomCurve3(lookKeys, false, "centripetal");

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
    const segs = camKeys.length - 1;
    const raw = Math.min(0.9999, Math.max(0, current)) * segs;
    const seg = Math.floor(raw);
    const f = raw - seg;
    const eased = f < 0.35 ? 0 : f > 0.95 ? 1 : (f - 0.35) / 0.6;
    const smooth = eased * eased * (3 - 2 * eased);
    const u = (seg + smooth) / segs;
    camera.position.copy(camCurve.getPoint(u));
    look.copy(lookCurve.getPoint(u));
    camera.lookAt(look);

    // the stop we're closest to glows brighter
    const active = Math.round(u * segs) - 1;
    markers.forEach((m, i) => {
      const on = i === active;
      const s = on ? 1.6 + Math.sin(t * 4) * 0.25 : 1;
      m.base.scale.setScalar(s);
      (m.pillar.material as THREE.MeshBasicMaterial).opacity = 0.18;
      m.pillar.scale.y = on ? 1.4 : 1;
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
        tmp.copy(v).setY(v.y + 8).project(camera);
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
      renderer.dispose();
    },
  };
}
