import { KARNATAKA_PATH, MAP } from "@/features/karunadu/data/map-path";
import { DISTRICTS, REGIONS } from "@/features/karunadu/data/karnataka";

/* ಕರುನಾಡು emblem
 * - 31 lamps on the outer ring: the 31 districts
 * - 7 arcs: the 7 regions (Karavali, Malenadu, Old Mysuru, Bayaluseeme,
 *   Kittur, Kalyana, Bengaluru)
 * - the real outline of the state, in the flag's yellow and red
 * - ಕ at the heart: the language that holds it together */

const REGION_COLORS = ["#1d7f86", "#2f6b3a", "#b3134f", "#b8742e", "#d6262b", "#6b2a5e", "#d9a63a"];

function arcPath(r: number, a0: number, a1: number) {
  const p = (a: number) => [100 + r * Math.cos(a), 100 + r * Math.sin(a)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

export default function KarnatakaIcon({ className = "", animated = true }: { className?: string; animated?: boolean }) {
  const scale = 96 / MAP.height; // fit the state inside the inner disc
  const tx = 100 - (MAP.width * scale) / 2;
  const ty = 100 - (MAP.height * scale) / 2;
  const seg = (Math.PI * 2) / REGIONS.length;

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="ಕರುನಾಡು – Karnataka emblem">
      <defs>
        <linearGradient id="kd-icon-flag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="#ffcc00" />
          <stop offset="0.5" stopColor="#d6262b" />
        </linearGradient>
        <radialGradient id="kd-icon-disc" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#3a0f1c" />
          <stop offset="1" stopColor="#14050b" />
        </radialGradient>
        <linearGradient id="kd-icon-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dc8c" />
          <stop offset=".5" stopColor="#d9a63a" />
          <stop offset="1" stopColor="#8a5a14" />
        </linearGradient>
        <path id="kd-icon-text" d="M 100 100 m -82 0 a 82 82 0 1 1 164 0 a 82 82 0 1 1 -164 0" />
      </defs>

      <circle cx="100" cy="100" r="98" fill="url(#kd-icon-gold)" />
      <circle cx="100" cy="100" r="94" fill="url(#kd-icon-disc)" />

      {/* 7 regions */}
      <g className={animated ? "spin-slow" : ""} style={{ transformOrigin: "100px 100px" }}>
        {REGIONS.map((r, i) => (
          <path key={r.id} d={arcPath(88, i * seg + 0.04, (i + 1) * seg - 0.04)} stroke={REGION_COLORS[i]} strokeWidth="4" fill="none" strokeLinecap="round" />
        ))}
      </g>

      {/* 31 districts */}
      <g className={animated ? "spin-rev" : ""} style={{ transformOrigin: "100px 100px" }}>
        {DISTRICTS.map((d, i) => {
          const a = (i / DISTRICTS.length) * Math.PI * 2 - Math.PI / 2;
          return <circle key={d.en} cx={100 + 79 * Math.cos(a)} cy={100 + 79 * Math.sin(a)} r="1.7" fill="#ffe08a" />;
        })}
      </g>

      <text fontSize="7.5" letterSpacing="2.2" fill="#f6dc8c" className="f-serif" opacity=".85">
        <textPath href="#kd-icon-text" startOffset="2%">
          ಕರುನಾಡು · ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ · ಕರುನಾಡು · ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ ·
        </textPath>
      </text>

      <circle cx="100" cy="100" r="62" fill="none" stroke="#f6dc8c" strokeOpacity=".35" />

      {/* the land */}
      <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
        <path d={KARNATAKA_PATH} fill="url(#kd-icon-flag)" stroke="#f6dc8c" strokeWidth={2.4 / scale} />
      </g>

      {/* the letter */}
      <text x="103" y="114" textAnchor="middle" fontSize="34" fontWeight="700" className="f-serif" fill="#fbf3e2" stroke="#1a0a06" strokeWidth="1.2" paintOrder="stroke">
        ಕ
      </text>
    </svg>
  );
}
