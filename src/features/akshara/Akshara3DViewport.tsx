import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  sourceCanvasRef: { readonly current: HTMLCanvasElement | null };
  revision: number;
  accentColor: string;
  secondaryColor: string;
  autoRotate: boolean;
  resetToken: number;
  onError: (message: string) => void;
};

export default function Akshara3DViewport({
  sourceCanvasRef,
  revision,
  accentColor,
  secondaryColor,
  autoRotate,
  resetToken,
  onError,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const plaqueRef = useRef<THREE.Group | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const accentLightRef = useRef<THREE.PointLight | null>(null);
  const ringMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const secondaryRingMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const particleMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const autoRotateRef = useRef(autoRotate);
  const onErrorRef = useRef(onError);
  const accentColorRef = useRef(accentColor);
  const secondaryColorRef = useRef(secondaryColor);

  autoRotateRef.current = autoRotate;
  onErrorRef.current = onError;
  accentColorRef.current = accentColor;
  secondaryColorRef.current = secondaryColor;

  useEffect(() => {
    const host = hostRef.current;
    const source = sourceCanvasRef.current;

    if (!host || !source) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      onErrorRef.current(
        "WebGL is unavailable in this browser. You can still use the flat artwork editor.",
      );
      return;
    }

    let frameId = 0;
    let previousTime = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
    camera.position.set(0, 0, 8.8);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.domElement.setAttribute("aria-label", "Interactive 3D Kannada artwork");
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "grab";

    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xe8e5ff, 0x352039, 2.0));

    const keyLight = new THREE.DirectionalLight(0xffe5bb, 3.5);
    keyLight.position.set(-3, 5, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa8baff, 1.8);
    fillLight.position.set(5, -2, 4);
    scene.add(fillLight);

    const accentLight = new THREE.PointLight(accentColorRef.current, 30, 17);
    accentLight.position.set(-3.2, 2.4, 3.5);
    scene.add(accentLight);
    accentLightRef.current = accentLight;

    const goldLight = new THREE.PointLight(secondaryColorRef.current, 25, 16);
    goldLight.position.set(3, -2.5, 2.5);
    scene.add(goldLight);

    const texture = new THREE.CanvasTexture(source);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(
      renderer.capabilities.getMaxAnisotropy(),
      8,
    );
    textureRef.current = texture;

    const gold = new THREE.MeshStandardMaterial({
      color: 0xd4b16c,
      metalness: 0.88,
      roughness: 0.24,
    });

    const back = new THREE.MeshStandardMaterial({
      color: 0x392536,
      metalness: 0.7,
      roughness: 0.32,
    });

    const face = new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
    });

    const plaque = new THREE.Group();
    plaque.rotation.set(-0.08, 0.22, 0);
    scene.add(plaque);
    plaqueRef.current = plaque;

    const foundation = new THREE.Mesh(
      new THREE.BoxGeometry(4.04, 4.04, 0.15),
      gold,
    );
    foundation.position.z = -0.09;
    foundation.castShadow = true;
    foundation.receiveShadow = true;
    plaque.add(foundation);

    const panelMaterials: THREE.Material[] = [
      gold,
      gold,
      gold,
      gold,
      face,
      back,
    ];

    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(3.82, 3.82, 0.2),
      panelMaterials,
    );
    panel.position.z = 0.015;
    panel.castShadow = true;
    plaque.add(panel);

    const ornamentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4d99a,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x573817,
      emissiveIntensity: 0.28,
    });

    const addBar = (
      width: number,
      height: number,
      x: number,
      y: number,
    ) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, 0.026),
        ornamentMaterial,
      );
      bar.position.set(x, y, 0.128);
      plaque.add(bar);
    };

    addBar(3.77, 0.025, 0, 1.89);
    addBar(3.77, 0.025, 0, -1.89);
    addBar(0.025, 3.77, 1.89, 0);
    addBar(0.025, 3.77, -1.89, 0);

    const studGeometry = new THREE.SphereGeometry(0.055, 20, 16);

    for (const x of [-1.89, 1.89]) {
      for (const y of [-1.89, 1.89]) {
        const stud = new THREE.Mesh(studGeometry, ornamentMaterial);
        stud.position.set(x, y, 0.15);
        plaque.add(stud);
      }
    }

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: accentColorRef.current,
      transparent: true,
      opacity: 0.8,
    });

    const secondaryRingMaterial = new THREE.MeshBasicMaterial({
      color: secondaryColorRef.current,
      transparent: true,
      opacity: 0.68,
    });

    ringMaterialRef.current = ringMaterial;
    secondaryRingMaterialRef.current = secondaryRingMaterial;

    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(2.65, 0.012, 8, 160),
      ringMaterial,
    );
    ringA.position.z = -0.55;
    ringA.rotation.set(0.12, 0.25, 0.1);
    scene.add(ringA);

    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(3.05, 0.008, 8, 160),
      secondaryRingMaterial,
    );
    ringB.position.z = -0.95;
    ringB.rotation.set(0.72, 0.35, -0.25);
    scene.add(ringB);

    const ringC = new THREE.Mesh(
      new THREE.TorusGeometry(2.28, 0.006, 6, 160),
      secondaryRingMaterial,
    );
    ringC.position.z = -0.8;
    ringC.rotation.set(-0.55, 0.2, 0.35);
    scene.add(ringC);

    const particleCount = 170;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const seed = i + 1;

      particlePositions[i * 3] =
        (Math.sin(seed * 91.73) * 0.5 + 0.5) * 10 - 5;

      particlePositions[i * 3 + 1] =
        (Math.sin(seed * 27.19 + 1.4) * 0.5 + 0.5) * 10 - 5;

      particlePositions[i * 3 + 2] =
        -1.8 + (Math.sin(seed * 13.77) * 0.5 + 0.5) * 1.8;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: accentColorRef.current,
      size: 0.026,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      sizeAttenuation: true,
    });

    particleMaterialRef.current = particleMaterial;

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const resize = () => {
      if (!host.isConnected) return;

      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;

      lastX = event.clientX;
      lastY = event.clientY;

      plaque.rotation.y += dx * 0.008;
      plaque.rotation.x = Math.max(
        -0.82,
        Math.min(0.82, plaque.rotation.x + dy * 0.008),
      );
    };

    const stopDragging = () => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", stopDragging);
    renderer.domElement.addEventListener("pointercancel", stopDragging);
    renderer.domElement.addEventListener("lostpointercapture", stopDragging);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resize)
        : null;

    observer?.observe(host);
    window.addEventListener("resize", resize);
    resize();

    const animate = (time: number) => {
      frameId = window.requestAnimationFrame(animate);

      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 0;

      previousTime = time;

      if (autoRotateRef.current && !reducedMotion && !dragging) {
        plaque.rotation.y += delta * 0.16;
        plaque.rotation.z = Math.sin(time * 0.00035) * 0.025;
      }

      ringA.rotation.z += delta * 0.09;
      ringA.rotation.x = 0.12 + Math.sin(time * 0.00019) * 0.07;

      ringB.rotation.y -= delta * 0.06;
      ringB.rotation.z += delta * 0.045;

      ringC.rotation.x += delta * 0.035;
      particles.rotation.y += delta * 0.012;

      const breathing = 0.94 + Math.sin(time * 0.0016) * 0.08;
      accentLight.intensity = 28 * breathing;
      goldLight.intensity = 23 * (2 - breathing);

      renderer.render(scene, camera);
    };

    resize();
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      window.removeEventListener("resize", resize);

      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", stopDragging);
      renderer.domElement.removeEventListener("pointercancel", stopDragging);
      renderer.domElement.removeEventListener("lostpointercapture", stopDragging);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();

          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach((material) => material.dispose());
        }
      });

      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();

      textureRef.current = null;
      plaqueRef.current = null;
      accentLightRef.current = null;
      ringMaterialRef.current = null;
      secondaryRingMaterialRef.current = null;
      particleMaterialRef.current = null;
    };
  }, [sourceCanvasRef]);

  useEffect(() => {
    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  }, [revision]);

  useEffect(() => {
    if (plaqueRef.current) {
      plaqueRef.current.rotation.set(-0.08, 0.22, 0);
    }
  }, [resetToken]);

  useEffect(() => {
    accentLightRef.current?.color.set(accentColor);
    ringMaterialRef.current?.color.set(accentColor);
    particleMaterialRef.current?.color.set(accentColor);
    secondaryRingMaterialRef.current?.color.set(secondaryColor);
  }, [accentColor, secondaryColor]);

  return (
    <div
      ref={hostRef}
      className="akshara-three-host"
      role="img"
      aria-label="Interactive three-dimensional Kannada artwork plaque. Drag to rotate it."
    >
      <div className="akshara-three-hud">
        <span><i /> THREE-DIMENSIONAL STUDIO</span>
        <span>DRAG TO ORBIT ↗</span>
      </div>
      <div className="akshara-three-bottom-hud">
        <span>METAL · LIGHT · LANGUAGE</span>
        <span>LIVE RENDER</span>
      </div>
    </div>
  );
}
