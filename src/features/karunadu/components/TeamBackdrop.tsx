import { useEffect, useRef } from "react";
import { reducedMotion } from "@/features/karunadu/hooks";

/* Behind the team: a Bidri workshop at night. Gunmetal with a woven
 * silver jaali, a giant inlay mandala turning slowly, warm lamp glows,
 * a silver light that follows the cursor and sparks of silver and
 * gold drifting up like filings from the craftsman's file. */
export default function TeamBackdrop() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const light = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
    };
    size();
    const sparks = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      v: 0.00025 + Math.random() * 0.0007,
      w: Math.random() * Math.PI * 2,
      gold: Math.random() < 0.3,
    }));
    const still = reducedMotion();
    const draw = (t: number) => {
      g.clearRect(0, 0, c.width, c.height);
      for (const s of sparks) {
        if (!still) {
          s.y -= s.v;
          if (s.y < -0.02) {
            s.y = 1.02;
            s.x = Math.random();
          }
        }
        const x = (s.x + Math.sin(t / 2400 + s.w) * 0.01) * c.width;
        const y = s.y * c.height;
        const a = 0.35 + 0.35 * Math.sin(t / 500 + s.w);
        g.beginPath();
        g.fillStyle = s.gold
          ? `rgba(255,204,90,${a})`
          : `rgba(220,228,235,${a})`;
        g.shadowColor = s.gold ? "rgba(255,190,60,.9)" : "rgba(220,228,235,.9)";
        g.shadowBlur = 8 * dpr;
        g.arc(x, y, s.r * dpr, 0, Math.PI * 2);
        g.fill();
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const onMove = (e: PointerEvent) => {
      if (light.current)
        light.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0b0c0e]"
      aria-hidden="true"
    >
      {/* lamp glows: maroon silk and brass */}
      <div className="absolute -left-[20%] top-[-10%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(122,20,46,.45),transparent)] blur-2xl" />
      <div className="absolute -right-[15%] bottom-[-20%] h-[80vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(217,166,58,.22),transparent)] blur-2xl" />
      <div className="absolute left-1/2 top-[30%] h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(60,70,82,.55),transparent)]" />
      {/* silver jaali */}
      <div className="team-jaali absolute inset-0" />
      {/* giant Bidri inlay mandala */}
      <div className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]">
        <svg viewBox="0 0 400 400" className="spin-slow h-full w-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 15} 200 200)`}>
              <path
                d="M200 200 C 222 160, 222 110, 200 60 C 178 110, 178 160, 200 200 Z"
                fill="none"
                stroke="#e6ecf1"
                strokeWidth=".8"
              />
              <circle
                cx="200"
                cy="40"
                r="4"
                fill="none"
                stroke="#e6ecf1"
                strokeWidth=".8"
              />
            </g>
          ))}
          {[190, 150, 100, 40].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="#e6ecf1"
              strokeWidth=".6"
              strokeDasharray="2 5"
            />
          ))}
        </svg>
      </div>
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      {/* silver light that follows you */}
      <div
        ref={light}
        className="absolute left-0 top-0 transition-transform duration-300 ease-out"
        style={{ transform: "translate(50vw, 30vh)" }}
      >
        <div className="h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,221,227,.13),transparent)]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,.65))]" />
    </div>
  );
}
