import { useState } from "react";
import { KARNATAKA_PATH, MAP } from "@/features/karunadu/data/map-path";
import { project } from "@/features/karunadu/data/karnataka";
import { JOURNEY } from "@/features/karunadu/data/journey";
import { useInView, reducedMotion } from "@/features/karunadu/hooks";
import { openJourney } from "@/features/karunadu/journey-events";
import KarnatakaIcon from "@/features/karunadu/components/KarnatakaIcon";

/* Real Karnataka from space, tilted like a relief model on a table.
 * Clicking anywhere on it starts the 3D fly-through. */
export default function SatelliteTeaser() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]" data-cursor="compass">
      <button
        type="button"
        onClick={openJourney}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || reducedMotion()) return;
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
        }}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        className="group relative mx-auto block w-full max-w-[520px] [perspective:1400px]"
        aria-label="Fly across Karnataka in 3D"
      >
        <div
          className="relative transition-transform duration-700 ease-out [transform-style:preserve-3d]"
          style={{
            transform: inView
              ? `rotateX(${38 - tilt.y * 10}deg) rotateZ(${-8 + tilt.x * 8}deg) translateZ(0)`
              : "rotateX(70deg) rotateZ(-20deg) scale(0.85)",
            opacity: inView ? 1 : 0,
            transition: "transform 1.6s cubic-bezier(0.16,1,0.3,1), opacity 1.2s ease",
          }}
        >
          {/* ground shadow */}
          <div className="absolute inset-[6%] translate-y-10 rounded-[40%] bg-black/70 blur-3xl" />
          <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="relative w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.75)]" role="img" aria-label="Satellite view of Karnataka">
            <defs>
              <clipPath id="kd-sat-clip">
                <path d={KARNATAKA_PATH} />
              </clipPath>
            </defs>
            <image href="/karnataka/satellite.jpg" x="0" y="0" width={MAP.width} height={MAP.height} preserveAspectRatio="none" clipPath="url(#kd-sat-clip)" />
            <path d={KARNATAKA_PATH} fill="none" stroke="#f6dc8c" strokeWidth="2.4" pathLength={1} className={`draw ${inView ? "in" : ""}`} style={{ filter: "drop-shadow(0 0 6px rgba(246,220,140,.8))" }} />
            {JOURNEY.map((s, i) => {
              const p = project(s.lat, s.lon);
              const home = s.id === "home";
              return (
                <g key={s.id} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} style={{ opacity: inView ? 1 : 0, transition: `opacity .6s ease ${1.4 + i * 0.12}s` }}>
                  <circle cx={p.x} cy={p.y} r="16" fill={home ? "#e63a3f" : "#ffcc33"} opacity=".35" className="pulse-ring" style={{ ["--d" as string]: `${i * 0.25}s` }} />
                  <circle cx={p.x} cy={p.y} r={home ? 8 : 6} fill={home ? "#e63a3f" : "#ffcc33"} stroke="#1a0a06" strokeWidth="2" />
                </g>
              );
            })}
          </svg>
          {hover !== null && (
            <span
              className="f-serif pointer-events-none absolute -translate-x-1/2 -translate-y-[160%] whitespace-nowrap rounded-full bg-[#ffcc00] px-3 py-1 text-sm font-bold text-[#1a0a06] shadow-lg"
              style={{
                left: `${(project(JOURNEY[hover].lat, JOURNEY[hover].lon).x / MAP.width) * 100}%`,
                top: `${(project(JOURNEY[hover].lat, JOURNEY[hover].lon).y / MAP.height) * 100}%`,
              }}
            >
              {JOURNEY[hover].kn}
            </span>
          )}
        </div>
      </button>

      <div className="text-center lg:text-left">
        <button type="button" onClick={openJourney} className="kd-icon-btn mx-auto block lg:mx-0" aria-label="Open the 3D journey across Karnataka">
          <KarnatakaIcon className="h-36 w-36 md:h-44 md:w-44" />
        </button>
        <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-left">
          {JOURNEY.map((s, i) => (
            <li key={s.id} className={`flex items-baseline gap-2 transition-colors ${hover === i ? "text-[#ffcc00]" : "text-[#fbf3e2]/75"}`} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
              <span className="text-xs tabular-nums text-[#f6dc8c]/60">{String(i + 1).padStart(2, "0")}</span>
              <span className="f-serif text-base font-semibold">{s.kn}</span>
            </li>
          ))}
        </ol>
        <button type="button" onClick={openJourney} className="btn-silk mt-8">
          <span className="f-serif">ಕರುನಾಡು</span> · 3D
        </button>
      </div>
    </div>
  );
}
