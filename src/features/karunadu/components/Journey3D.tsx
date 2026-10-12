import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { JOURNEY } from "@/features/karunadu/data/journey";
import type { KarnatakaScene } from "@/features/karunadu/three/scene";
import KarnatakaIcon from "@/features/karunadu/components/KarnatakaIcon";

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/* Full-screen 3D journey across real Karnataka terrain. Scrolling (or the
 * arrow keys) flies the camera from Bidar in the north to home – PES
 * University, Electronic City. */
export default function Journey3D({ open, onClose }: { open: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<KarnatakaScene | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [labels, setLabels] = useState<{ x: number; y: number; visible: boolean }[]>([]);

  const n = JOURNEY.length;
  // matches the camera: segment k (of n) arrives at stop k-1 after the first 35% of it
  const active = Math.min(n - 1, Math.max(0, Math.floor(progress * n * 0.9999 + 0.65) - 1));
  const stop = JOURNEY[active];

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      const el = scrollRef.current;
      if (!el) return;
      const step = el.scrollHeight / (n + 1);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") el.scrollBy({ top: step, behavior: "smooth" });
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") el.scrollBy({ top: -step, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, n]);

  useEffect(() => {
    if (!open) return;
    if (!webglAvailable()) {
      setFailed(true);
      return;
    }
    let disposed = false;
    let labelFrame = 0;
    (async () => {
      try {
        const { createScene } = await import("@/features/karunadu/three/scene");
        if (disposed || !canvasRef.current) return;
        const s = await createScene(canvasRef.current, JOURNEY);
        if (disposed) {
          s.dispose();
          return;
        }
        sceneRef.current = s;
        setReady(true);
        const loop = () => {
          setLabels(s.stopScreen());
          labelFrame = requestAnimationFrame(loop);
        };
        labelFrame = requestAnimationFrame(loop);
      } catch {
        setFailed(true);
      }
    })();
    const onResize = () => sceneRef.current?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      cancelAnimationFrame(labelFrame);
      window.removeEventListener("resize", onResize);
      sceneRef.current?.dispose();
      sceneRef.current = null;
      setReady(false);
      setProgress(0);
    };
  }, [open]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
    setProgress(p);
    sceneRef.current?.setProgress(p);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[180] bg-[#0f1626]" role="dialog" aria-modal="true" aria-label="3D journey across Karnataka" data-cursor="compass">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* place labels pinned to the terrain */}
      <div className="pointer-events-none absolute inset-0">
        {labels.map((l, i) =>
          l.visible ? (
            <div
              key={JOURNEY[i].id}
              className={`absolute -translate-x-1/2 -translate-y-full whitespace-nowrap transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-55"}`}
              style={{ left: l.x, top: l.y }}
            >
              <span className={`f-serif block rounded-full px-3 py-1 text-sm shadow-lg backdrop-blur ${i === active ? "bg-[#ffcc00] font-bold text-[#1a0a06]" : "bg-black/45 text-[#fbf3e2]"}`}>
                {JOURNEY[i].kn}
              </span>
            </div>
          ) : null
        )}
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,8,15,0.75))]" />

      {/* scroll driver */}
      <div ref={scrollRef} onScroll={onScroll} className="absolute inset-0 overflow-y-auto [scrollbar-width:none]">
        <div style={{ height: `${(n + 1) * 100}vh` }} />
      </div>

      {/* current stop card */}
      <div className="pointer-events-none absolute bottom-6 left-4 right-4 md:bottom-10 md:left-10 md:right-auto md:w-[380px]">
        <div key={stop.id} className="glass overflow-hidden" style={{ animation: "kd-card-in .6s cubic-bezier(.16,1,.3,1)" }}>
          {stop.photo && <img src={stop.photo} alt={stop.en} className="ken-burns h-44 w-full object-cover md:h-52" />}
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f6dc8c]/80">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
            <p className="f-serif mt-1 text-3xl font-bold text-[#fbf3e2]">{stop.kn}</p>
            <p className="text-sm text-[#fbf3e2]/75">{stop.en}</p>
            {stop.credit && <p className="mt-2 text-[10px] text-[#fbf3e2]/45">Photo: {stop.credit}</p>}
          </div>
        </div>
      </div>

      {/* progress along the route */}
      <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {JOURNEY.map((s, i) => (
          <span key={s.id} className={`block h-2 w-2 rounded-full transition-all duration-500 ${i === active ? "scale-150 bg-[#ffcc00]" : i < active ? "bg-[#f6dc8c]/70" : "bg-white/25"}`} />
        ))}
      </div>

      {/* top bar */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <KarnatakaIcon className="h-11 w-11" animated={false} />
          <div>
            <p className="f-serif text-lg font-bold leading-tight text-[#fbf3e2]">ಕರುನಾಡು</p>
            <p className="text-xs text-[#fbf3e2]/65">{progress < 0.02 ? "Scroll to fly across Karnataka" : "Karnataka"}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border border-[#f6dc8c]/40 bg-black/40 text-[#f6dc8c] backdrop-blur hover:bg-black/60" aria-label="Close 3D journey">
          <X className="h-5 w-5" />
        </button>
      </div>

      {!ready && !failed && (
        <div className="absolute inset-0 grid place-items-center bg-[#0f1626]">
          <div className="text-center">
            <KarnatakaIcon className="mx-auto h-28 w-28" />
            <p className="f-serif mt-4 text-[#f6dc8c]">ನಾಡನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದೆ…</p>
          </div>
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 grid place-items-center bg-[#0f1626] p-6 text-center text-[#fbf3e2]">
          <div>
            <KarnatakaIcon className="mx-auto h-28 w-28" />
            <p className="mt-4">Your browser can't show the 3D map.</p>
          </div>
        </div>
      )}
    </div>
  );
}
