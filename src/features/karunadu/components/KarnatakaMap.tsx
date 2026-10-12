import { useState } from "react";
import { KARNATAKA_PATH, MAP } from "@/features/karunadu/data/map-path";
import { DISTRICTS, LANDMARKS, RIVERS, project, type LandmarkKind } from "@/features/karunadu/data/karnataka";
import { useInView } from "@/features/karunadu/hooks";

type Layer = "districts" | "heritage" | "rivers";

const LAYERS: { id: Layer; kn: string; en: string }[] = [
  { id: "districts", kn: "ಜಿಲ್ಲೆಗಳು", en: "Districts" },
  { id: "heritage", kn: "ಪರಂಪರೆ", en: "Heritage" },
  { id: "rivers", kn: "ನದಿಗಳು", en: "Rivers" },
];

function LandmarkGlyph({ kind }: { kind: LandmarkKind }) {
  switch (kind) {
    case "temple":
      return <path d="M-8 6 h16 v-5 l-3 -3 v-4 l-3 -3 -2 -3 -2 3 -3 3 v4 l-3 3z" fill="#ffcc00" stroke="#3a1606" strokeWidth="1.2" />;
    case "palace":
      return <path d="M-10 6 v-8 h4 v-4 a6 6 0 0 1 12 0 v4 h4 v8z" fill="#ffcc00" stroke="#3a1606" strokeWidth="1.2" />;
    case "fort":
      return <path d="M-9 6 v-10 h3 v3 h3 v-3 h6 v3 h3 v-3 h3 v10z" fill="#e9d3a6" stroke="#3a1606" strokeWidth="1.2" />;
    case "dome":
      return <path d="M-9 6 v-4 a9 9 0 0 1 18 0 v4z M-1 -8 h2 v-3 h-2z" fill="#fbf3e2" stroke="#3a1606" strokeWidth="1.2" />;
    case "falls":
      return <path d="M-8 -6 h16 M-5 -6 v12 M0 -6 v12 M5 -6 v12" stroke="#bff3f0" strokeWidth="2.4" strokeLinecap="round" />;
    case "statue":
      return <path d="M0 -10 a3 3 0 1 1 0.1 0 M-3 -5 h6 l1 11 h-8z" fill="#e9d3a6" stroke="#3a1606" strokeWidth="1.2" />;
    case "inscription":
      return <path d="M-6 7 v-12 a6 6 0 0 1 12 0 v12z M-3 -2 h6 M-3 1 h6 M-3 4 h6" fill="#a59886" stroke="#3a1606" strokeWidth="1.2" />;
    case "city":
      return <path d="M-9 6 v-7 h4 v-4 h3 v-3 h4 v3 h3 v4 h4 v7z" fill="#bff3f0" stroke="#3a1606" strokeWidth="1.2" />;
    default:
      return <path d="M-8 6 l8 -14 8 14z" fill="#5c9a4a" stroke="#123d14" strokeWidth="1.2" />;
  }
}

export default function KarnatakaMap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [layers, setLayers] = useState<Record<Layer, boolean>>({ districts: true, heritage: true, rivers: true });
  const [focus, setFocus] = useState<{ kn: string; en: string; x: number; y: number } | null>(null);

  const toggle = (id: Layer) => setLayers((l) => ({ ...l, [id]: !l[id] }));

  return (
    <div ref={ref} className={`relative ${inView ? "in" : ""}`} data-cursor="compass">
      <div className="mb-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Map layers">
        {LAYERS.map((l) => (
          <button
            key={l.id}
            type="button"
            aria-pressed={layers[l.id]}
            onClick={() => toggle(l.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              layers[l.id] ? "border-[#ffcc00] bg-[#ffcc00] text-[#1a0a06]" : "border-[#f6dc8c]/40 text-[#fbf3e2]/80 hover:border-[#f6dc8c]"
            }`}
          >
            <span className="f-serif">{l.kn}</span> · {l.en}
          </button>
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[560px]">
        <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="h-auto w-full overflow-visible" role="img" aria-label="Map of Karnataka">
          <defs>
            <linearGradient id="ka-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffcc00" stopOpacity=".16" />
              <stop offset="1" stopColor="#d6262b" stopOpacity=".16" />
            </linearGradient>
            <filter id="ka-glow">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Arabian Sea shimmer along the coast */}
          <path d={KARNATAKA_PATH} fill="none" stroke="#1d7f86" strokeWidth="26" opacity=".18" filter="url(#ka-glow)" />
          <path d={KARNATAKA_PATH} fill="url(#ka-fill)" stroke="#f6dc8c" strokeWidth="2.5" pathLength={1} className="draw" />

          {layers.rivers &&
            RIVERS.map((r) => {
              const pts = r.points.map(([lat, lon]) => project(lat, lon));
              const d = "M" + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L");
              const mid = pts[Math.floor(pts.length / 2)];
              return (
                <g key={r.en} onPointerEnter={() => setFocus({ ...r, x: mid.x, y: mid.y })} onPointerLeave={() => setFocus(null)}>
                  <path d={d} fill="none" stroke="#1d7f86" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />
                  <path d={d} fill="none" stroke="#bff3f0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flow" />
                </g>
              );
            })}

          {layers.districts &&
            DISTRICTS.map((d, i) => {
              const p = project(d.lat, d.lon);
              const active = focus?.en === d.en;
              return (
                <g
                  key={d.en}
                  className={`ka-district ${active ? "active" : ""}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.kn} – ${d.en}`}
                  onPointerEnter={() => setFocus({ kn: d.kn, en: d.en, x: p.x, y: p.y })}
                  onPointerLeave={() => setFocus(null)}
                  onFocus={() => setFocus({ kn: d.kn, en: d.en, x: p.x, y: p.y })}
                  onBlur={() => setFocus(null)}
                  style={{ opacity: inView ? 1 : 0, transition: `opacity .5s ease ${1.2 + i * 0.04}s` }}
                >
                  <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
                  <circle cx={p.x} cy={p.y} r="12" fill="#ffcc00" opacity=".18" className="pulse-ring" style={{ ["--d" as string]: `${(i % 6) * 0.4}s` }} />
                  <circle className="core" cx={p.x} cy={p.y} r={active ? 7 : 5} fill="#ffcc00" stroke="#1a0a06" strokeWidth="1.5" />
                </g>
              );
            })}

          {layers.heritage &&
            LANDMARKS.map((l, i) => {
              const p = project(l.lat, l.lon);
              return (
                <g
                  key={l.en}
                  transform={`translate(${p.x + 12} ${p.y - 12})`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${l.kn} – ${l.en}`}
                  onPointerEnter={() => setFocus({ kn: l.kn, en: l.en, x: p.x + 12, y: p.y - 12 })}
                  onPointerLeave={() => setFocus(null)}
                  onFocus={() => setFocus({ kn: l.kn, en: l.en, x: p.x + 12, y: p.y - 12 })}
                  onBlur={() => setFocus(null)}
                  style={{ cursor: "pointer", opacity: inView ? 1 : 0, transition: `opacity .5s ease ${2 + i * 0.05}s` }}
                >
                  <circle r="14" fill="#1a0a06" opacity=".55" />
                  <g transform="scale(1.2)">
                    <LandmarkGlyph kind={l.kind} />
                  </g>
                </g>
              );
            })}
        </svg>

        {focus && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-xl border border-[#f6dc8c]/40 bg-[#12030a]/90 px-3 py-2 text-center shadow-xl backdrop-blur"
            style={{ left: `${(focus.x / MAP.width) * 100}%`, top: `${(focus.y / MAP.height) * 100}%` }}
          >
            <p className="f-serif text-lg font-bold text-[#ffcc00]">{focus.kn}</p>
            <p className="text-xs text-[#fbf3e2]/80">{focus.en}</p>
          </div>
        )}
      </div>
    </div>
  );
}
