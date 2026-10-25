import { useEffect, useRef, useState } from "react";
import type { CulturalSection } from "../types";
import { createPrayogaScene, type PrayogaSceneController } from "../three/PrayogaScene";

interface Prayoga3DCanvasProps {
  activeSection: CulturalSection;
  onIntroComplete?: () => void;
}

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Prayoga3DCanvas({ activeSection, onIntroComplete }: Prayoga3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneControllerRef = useRef<PrayogaSceneController | null>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(() => webglAvailable());

  const onIntroCompleteRef = useRef(onIntroComplete);
  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !webGLSupported) return;

    let controller: PrayogaSceneController | null = null;
    let animFrame: number = 0;

    try {
      controller = createPrayogaScene(canvas);
      sceneControllerRef.current = controller;
    } catch (err) {
      console.warn("Prayoga WebGL initialization failed, switching to CSS fallback:", err);
      setWebGLSupported(false);
      return;
    }

    // Cinematic entrance sequence: camera and lighting glide into full view
    const startTime = performance.now();
    const duration = 1800; // ms

    const animateIntro = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic ease out
      const eased = 1 - Math.pow(1 - progress, 3);

      if (controller) {
        controller.setIntroProgress(0.4 + eased * 0.6);
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(animateIntro);
      } else {
        onIntroCompleteRef.current?.();
      }
    };

    animFrame = requestAnimationFrame(animateIntro);

    // Pointer move listener for subtle parallax
    const handlePointerMove = (e: MouseEvent) => {
      if (controller) {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        controller.setPointer(x, y);
      }
    };

    // Resize listener
    const handleResize = () => {
      if (controller) {
        controller.resize();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (controller) {
        controller.dispose();
      }
      sceneControllerRef.current = null;
    };
  }, [webGLSupported]);

  // Update section theme in 3D scene when selection changes
  useEffect(() => {
    if (sceneControllerRef.current) {
      sceneControllerRef.current.setSection(activeSection);
    }
  }, [activeSection]);

  if (!webGLSupported) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#0D0D0D] flex items-center justify-center pointer-events-none">
        <div className="prayoga-fallback-halo" />
        <div className="prayoga-glow-top" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-hidden="true"
      />
    </div>
  );
}
