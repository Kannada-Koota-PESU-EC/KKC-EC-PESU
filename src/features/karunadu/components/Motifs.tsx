/* Hand-built SVG motifs of Karnataka. Each takes a className for sizing. */

type P = { className?: string };

/** ಗಂಡಭೇರುಂಡ – the two-headed bird of the state emblem (stylised) */
export function Gandaberunda({ className = "", stroke = "#f6dc8c", fill = "none" }: P & { stroke?: string; fill?: string }) {
  const half = (
    <g>
      {/* head + beak */}
      <path d="M100 70 C 92 46, 74 36, 58 40 C 48 43, 42 52, 46 60 C 50 66, 60 66, 64 60 C 56 62, 52 56, 58 52 C 66 47, 80 52, 86 66" />
      <path d="M46 60 C 36 66, 28 64, 22 58 C 30 60, 38 58, 44 54" />
      <circle cx="60" cy="49" r="2.6" fill={stroke} />
      {/* crest */}
      <path d="M58 40 C 56 30, 62 22, 70 20 C 66 28, 70 34, 72 38" />
      {/* wing feathers */}
      <path d="M92 92 C 70 88, 46 96, 26 116" />
      <path d="M94 104 C 74 104, 52 114, 34 134" />
      <path d="M96 116 C 80 120, 62 132, 48 150" />
      <path d="M98 128 C 86 134, 74 146, 66 162" />
      {/* leg + talons */}
      <path d="M90 168 L 82 196 M82 196 l-10 6 M82 196 l-2 10 M82 196 l8 6" />
    </g>
  );
  return (
    <svg viewBox="0 0 200 220" className={className} fill={fill} stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {half}
      <g transform="translate(200 0) scale(-1 1)">{half}</g>
      {/* body / shield */}
      <path d="M100 66 C 82 80, 80 110, 86 140 C 90 160, 96 172, 100 180 C 104 172, 110 160, 114 140 C 120 110, 118 80, 100 66 Z" />
      <path d="M100 86 C 92 100, 92 128, 100 156 C 108 128, 108 100, 100 86 Z" />
      {/* tail fan */}
      <path d="M100 180 C 88 192, 84 204, 86 214 M100 180 L 100 216 M100 180 C 112 192, 116 204, 114 214" />
    </svg>
  );
}

/** Mysuru Dasara elephant with howdah (ambari) */
export function Elephant({ className = "", howdah = true }: P & { howdah?: boolean }) {
  return (
    <svg viewBox="0 0 240 180" className={className} aria-hidden="true">
      {howdah && (
        <g>
          <path d="M82 52 h76 v-10 c0-14-12-26-38-34 c-26 8-38 20-38 34z" fill="#d9a63a" stroke="#7a4b0f" strokeWidth="2" />
          <path d="M120 8 v-8" stroke="#d9a63a" strokeWidth="3" />
          <circle cx="120" cy="0" r="3" fill="#ffcc00" />
          <path d="M90 42 h60" stroke="#fff3c0" strokeWidth="2" strokeDasharray="3 4" />
        </g>
      )}
      {/* body */}
      <path d="M60 60 C 70 48, 170 44, 188 62 C 204 78, 204 112, 194 124 L 194 160 h-18 l-2 -30 h-56 l-2 30 h-18 v-34 C 80 120, 64 108, 60 92 Z" fill="#5a5560" />
      {/* decorated cloth */}
      <path d="M78 58 C 100 50, 160 48, 178 60 L 172 108 C 150 116, 104 116, 84 108 Z" fill="#b3134f" />
      <path d="M84 108 C 104 116, 150 116, 172 108" stroke="#d9a63a" strokeWidth="5" fill="none" />
      <path d="M82 60 C 104 52, 156 50, 176 62" stroke="#d9a63a" strokeWidth="4" fill="none" />
      {[96, 112, 128, 144, 160].map((x) => (
        <circle key={x} cx={x} cy={84} r="5" fill="#ffcc00" stroke="#7a4b0f" strokeWidth="1.5" />
      ))}
      {/* head */}
      <path d="M60 60 C 40 56, 26 68, 26 88 C 26 104, 34 112, 38 122 C 40 136, 34 152, 26 160 C 34 164, 46 156, 50 140 C 54 124, 60 112, 66 100 Z" fill="#5a5560" />
      {/* ear */}
      <path d="M58 64 C 74 62, 84 74, 82 92 C 80 106, 70 110, 60 104 Z" fill="#4a4550" />
      {/* forehead ornament (mukhapatta) */}
      <path d="M30 70 C 38 62, 52 62, 58 70 C 56 86, 46 98, 38 100 C 32 94, 28 82, 30 70 Z" fill="#d9a63a" />
      <circle cx="44" cy="78" r="4" fill="#d6262b" />
      {/* tusk + eye */}
      <path d="M40 118 C 30 124, 24 122, 18 116" stroke="#fbf3e2" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="90" r="2.4" fill="#111" />
      {/* tail */}
      <path d="M196 72 C 210 80, 212 96, 206 110" stroke="#5a5560" strokeWidth="3" fill="none" />
      {/* legs */}
      <rect x="98" y="122" width="18" height="38" rx="4" fill="#4a4550" />
      <rect x="160" y="122" width="18" height="38" rx="4" fill="#4a4550" />
      {[98, 116, 160, 178].map((x, i) => (
        <path key={i} d={`M${i % 2 ? x - 18 : x} 154 h18`} stroke="#d9a63a" strokeWidth="3" />
      ))}
    </svg>
  );
}

/** ನೀಲಕಂಠ – Indian roller in flight (state bird) */
export function Roller({ className = "" }: P) {
  return (
    <svg viewBox="0 0 34 18" className={className} aria-hidden="true">
      <path d="M2 9 C 8 2, 13 3, 17 9 C 21 3, 26 2, 32 9 C 26 7, 21 8, 17 12 C 13 8, 8 7, 2 9 Z" fill="#2e7fd1" />
      <path d="M12 6 C 14 5, 16 6, 17 9 C 18 6, 20 5, 22 6" stroke="#7fd3ff" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function Lotus({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <path d="M60 70 C 46 52, 46 26, 60 6 C 74 26, 74 52, 60 70 Z" fill="#f08bb1" stroke="#b3134f" strokeWidth="2" />
      <path d="M60 70 C 40 60, 28 40, 30 18 C 46 28, 56 46, 60 70 Z" fill="#f4a3c2" stroke="#b3134f" strokeWidth="2" />
      <path d="M60 70 C 80 60, 92 40, 90 18 C 74 28, 64 46, 60 70 Z" fill="#f4a3c2" stroke="#b3134f" strokeWidth="2" />
      <path d="M60 70 C 34 68, 14 56, 6 38 C 26 40, 46 52, 60 70 Z" fill="#f7bdd3" stroke="#b3134f" strokeWidth="2" />
      <path d="M60 70 C 86 68, 106 56, 114 38 C 94 40, 74 52, 60 70 Z" fill="#f7bdd3" stroke="#b3134f" strokeWidth="2" />
      <path d="M20 76 h80" stroke="#1d7f86" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Mango({ className = "" }: P) {
  return (
    <svg viewBox="0 0 80 90" className={className} aria-hidden="true">
      <path d="M40 18 C 64 16, 74 40, 68 60 C 62 80, 38 88, 22 78 C 8 68, 10 46, 18 34 C 24 24, 32 18, 40 18 Z" fill="#ffb703" />
      <path d="M40 18 C 64 16, 74 40, 68 60 C 62 72, 50 76, 40 74 C 56 64, 60 40, 40 18 Z" fill="#fb8500" opacity=".7" />
      <path d="M40 18 C 40 12, 42 6, 46 2" stroke="#3d6b1f" strokeWidth="3" fill="none" />
      <path d="M44 8 C 56 0, 70 4, 74 12 C 62 16, 50 14, 44 8 Z" fill="#2f7d32" />
    </svg>
  );
}

export function Sandalwood({ className = "" }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M10 90 C 30 70, 50 50, 90 12" stroke="#7a4b23" strokeWidth="4" fill="none" strokeLinecap="round" />
      {[[30, 70, -40], [46, 54, -30], [62, 38, -50], [76, 24, -20], [38, 62, 40], [56, 44, 50], [70, 30, 40]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="11" ry="5" fill={i % 2 ? "#3f7f3a" : "#5c9a4a"} transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <circle cx="84" cy="20" r="3" fill="#6b2a5e" />
      <circle cx="80" cy="14" r="3" fill="#6b2a5e" />
    </svg>
  );
}

/** Mysuru palace silhouette with Deepalankara bulbs */
export function MysuruPalace({ className = "", bulbs = true }: P & { bulbs?: boolean }) {
  const outline =
    "M0 220 V160 H40 V140 Q60 112 80 140 V160 H150 V118 H165 Q180 96 195 118 V160 H245 V108 H262 V92 Q275 80 288 92 V108 H310 V130 H345 V82 H360 Q400 20 440 82 H455 V130 H490 V108 H512 V92 Q525 80 538 92 V108 H555 V160 H605 V118 Q620 96 635 118 H650 V160 H720 V140 Q740 112 760 140 V160 H800 V220 Z";
  return (
    <svg viewBox="0 0 800 220" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden="true">
      <path d={outline} fill="#1c0810" />
      {Array.from({ length: 13 }).map((_, i) => (
        <path key={i} d={`M${46 + i * 59} 220 v-26 a16 16 0 0 1 32 0 v26`} fill="#2d0d18" stroke="#f6dc8c" strokeOpacity=".35" />
      ))}
      <path d="M400 20 v-18" stroke="#f6dc8c" strokeWidth="3" />
      {bulbs && (
        <path
          d={outline}
          fill="none"
          stroke="#ffd76a"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray="0.1 9"
          style={{ filter: "drop-shadow(0 0 4px #ffb300) drop-shadow(0 0 12px rgba(255,160,0,.6))" }}
        />
      )}
    </svg>
  );
}

export function GolGumbaz({ className = "" }: P) {
  return (
    <svg viewBox="0 0 300 200" className={className} aria-hidden="true" fill="currentColor">
      <path d="M60 200 V110 H240 V200 Z" />
      <path d="M78 110 C 78 40, 222 40, 222 110 Z" />
      <path d="M150 34 v-12" stroke="currentColor" strokeWidth="4" />
      <circle cx="150" cy="18" r="5" />
      {[40, 260].map((x) => (
        <g key={x}>
          <path d={`M${x - 14} 200 V70 H${x + 14} V200 Z`} />
          {[150, 120, 92].map((y) => (
            <rect key={y} x={x - 18} y={y} width="36" height="5" />
          ))}
          <path d={`M${x - 14} 70 C ${x - 14} 48, ${x + 14} 48, ${x + 14} 70 Z`} />
        </g>
      ))}
      <path d="M90 200 v-50 a14 14 0 0 1 28 0 v50 M182 200 v-50 a14 14 0 0 1 28 0 v50 M136 200 v-60 a14 14 0 0 1 28 0 v60" fill="#000" opacity=".35" />
    </svg>
  );
}

/** Vijaya Vittala stone chariot, Hampi */
export function StoneChariot({ className = "" }: P) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="currentColor">
      <path d="M50 150 H150 V120 H50 Z" />
      <path d="M58 120 H142 V88 H58 Z" opacity=".9" />
      <path d="M66 88 H134 L124 60 H76 Z" />
      <path d="M80 60 H120 L112 36 H88 Z" opacity=".9" />
      <path d="M92 36 H108 L104 18 H96 Z" />
      <circle cx="100" cy="14" r="5" />
      {[70, 130].map((x) => (
        <g key={x}>
          <circle cx={x} cy="160" r="26" fill="none" stroke="currentColor" strokeWidth="6" />
          <circle cx={x} cy="160" r="6" />
          {[0, 45, 90, 135].map((a) => (
            <path key={a} d={`M${x} 160 l${22 * Math.cos((a * Math.PI) / 180)} ${22 * Math.sin((a * Math.PI) / 180)} M${x} 160 l${-22 * Math.cos((a * Math.PI) / 180)} ${-22 * Math.sin((a * Math.PI) / 180)}`} stroke="currentColor" strokeWidth="3" />
          ))}
        </g>
      ))}
      {/* elephants pulling */}
      <path d="M10 150 C 10 126, 34 120, 46 132 L 46 150 Z" />
      <path d="M190 150 C 190 126, 166 120, 154 132 L 154 150 Z" />
    </svg>
  );
}

export function VidhanaSoudha({ className = "" }: P) {
  return (
    <svg viewBox="0 0 320 180" className={className} aria-hidden="true" fill="currentColor">
      <path d="M0 180 V120 H320 V180 Z" />
      <path d="M40 120 V96 H280 V120 Z" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={20 + i * 25} y="128" width="8" height="44" fill="#000" opacity=".3" />
      ))}
      <path d="M120 96 V70 H200 V96 Z" />
      <path d="M128 70 C 128 30, 192 30, 192 70 Z" />
      <path d="M160 34 v-16" stroke="currentColor" strokeWidth="4" />
      <circle cx="160" cy="14" r="4" />
      {[60, 260].map((x) => (
        <path key={x} d={`M${x - 16} 96 C ${x - 16} 70, ${x + 16} 70, ${x + 16} 96 Z`} />
      ))}
    </svg>
  );
}

/** Dravidian gopura (temple tower) */
export function Gopura({ className = "" }: P) {
  return (
    <svg viewBox="0 0 160 220" className={className} aria-hidden="true" fill="currentColor">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const w = 140 - i * 20;
        const x = 80 - w / 2;
        const y = 200 - i * 28;
        return (
          <g key={i}>
            <rect x={x} y={y - 28} width={w} height="28" />
            {Array.from({ length: Math.max(1, Math.floor(w / 18)) }).map((_, k) => (
              <rect key={k} x={x + 6 + k * 18} y={y - 22} width="8" height="14" fill="#000" opacity=".25" />
            ))}
          </g>
        );
      })}
      <path d="M40 32 C 40 10, 120 10, 120 32 Z" />
      {[56, 80, 104].map((x) => (
        <path key={x} d={`M${x} 14 v-10`} stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      ))}
      <path d="M60 200 v-34 a20 20 0 0 1 40 0 v34" fill="#000" opacity=".45" />
    </svg>
  );
}

/** ಯಕ್ಷಗಾನ ಕಿರೀಟ – Yakshagana crown */
export function YakshaCrown({ className = "" }: P) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden="true">
      <path d="M100 6 C 60 6, 22 40, 12 96 C 40 80, 60 74, 100 74 C 140 74, 160 80, 188 96 C 178 40, 140 6, 100 6 Z" fill="#d9a63a" stroke="#5a3608" strokeWidth="3" />
      {Array.from({ length: 9 }).map((_, i) => {
        const a = Math.PI * (0.12 + (i / 8) * 0.76);
        return <circle key={i} cx={100 - Math.cos(a) * 70} cy={92 - Math.sin(a) * 66} r="7" fill={i % 2 ? "#d6262b" : "#1d7f86"} stroke="#5a3608" strokeWidth="2" />;
      })}
      <path d="M30 96 C 60 84, 140 84, 170 96 L 164 124 C 136 114, 64 114, 36 124 Z" fill="#d6262b" stroke="#5a3608" strokeWidth="3" />
      {[50, 75, 100, 125, 150].map((x) => (
        <circle key={x} cx={x} cy={106} r="4" fill="#ffcc00" />
      ))}
      <path d="M36 124 C 64 114, 136 114, 164 124 L 160 140 C 132 132, 68 132, 40 140 Z" fill="#2f7d32" stroke="#5a3608" strokeWidth="3" />
      <circle cx="100" cy="44" r="16" fill="#ffcc00" stroke="#5a3608" strokeWidth="3" />
      <circle cx="100" cy="44" r="7" fill="#d6262b" />
      {/* side ear-pieces */}
      <path d="M36 140 C 26 150, 26 168, 36 176 C 44 168, 44 152, 40 140 Z" fill="#d9a63a" stroke="#5a3608" strokeWidth="2" />
      <path d="M164 140 C 174 150, 174 168, 164 176 C 156 168, 156 152, 160 140 Z" fill="#d9a63a" stroke="#5a3608" strokeWidth="2" />
    </svg>
  );
}

/** ಡೊಳ್ಳು – the Dollu drum */
export function Dollu({ className = "" }: P) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      <ellipse cx="30" cy="60" rx="18" ry="44" fill="#f3e3c3" stroke="#3a1606" strokeWidth="3" />
      <path d="M30 16 H130 V104 H30" fill="#c0521b" stroke="#3a1606" strokeWidth="3" />
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M${34 + i * 16} 18 L ${50 + i * 16} 102`} stroke="#fbf3e2" strokeWidth="2.5" />
      ))}
      <ellipse cx="130" cy="60" rx="18" ry="44" fill="#f3e3c3" stroke="#3a1606" strokeWidth="3" />
      <path d="M20 36 C 50 30, 110 30, 140 36" stroke="#d6262b" strokeWidth="6" fill="none" />
    </svg>
  );
}

/** ತೊಗಲು ಗೊಂಬೆ – leather shadow puppet (Rama-like warrior with bow) */
export function Puppet({ className = "", color = "#2a0e05" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={className} aria-hidden="true" fill={color}>
      <path d="M60 2 v14" stroke={color} strokeWidth="2" />
      <path d="M46 34 C 46 18, 74 18, 74 34 L 70 40 H50 Z" />
      <path d="M48 22 L 60 4 L 72 22 Z" />
      <circle cx="60" cy="48" r="13" />
      <path d="M40 64 C 50 58, 70 58, 80 64 L 84 118 C 70 124, 50 124, 36 118 Z" />
      {/* perforated pattern */}
      {[[50, 78], [60, 84], [70, 78], [52, 100], [68, 100], [60, 108]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#ffd27a" />
      ))}
      <path d="M40 66 L 14 96 L 20 100 L 44 80 Z" />
      <path d="M80 66 L 104 84 L 100 90 L 78 80 Z" />
      <path d="M10 60 C 0 100, 0 120, 12 150" stroke={color} strokeWidth="3" fill="none" />
      <path d="M10 60 L 14 150" stroke={color} strokeWidth="1" />
      <path d="M38 118 C 34 150, 36 180, 30 214 H 46 L 58 150 L 70 214 H 86 C 82 180, 84 150, 82 118 Z" />
      <path d="M60 30 v-24 M14 96 v110 M104 86 v120" stroke="#5a3a1a" strokeWidth="1.5" opacity=".6" />
    </svg>
  );
}

export function Bell({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 170" className={className} aria-hidden="true">
      <path d="M60 0 v22" stroke="#7a4b0f" strokeWidth="4" />
      <circle cx="60" cy="26" r="7" fill="none" stroke="#d9a63a" strokeWidth="4" />
      <path d="M60 32 C 34 34, 24 60, 22 92 C 20 116, 12 126, 6 134 H114 C 108 126, 100 116, 98 92 C 96 60, 86 34, 60 32 Z" fill="url(#bellg)" stroke="#7a4b0f" strokeWidth="3" />
      <path d="M8 134 H112" stroke="#7a4b0f" strokeWidth="6" strokeLinecap="round" />
      <path d="M30 100 H90 M28 112 H92" stroke="#7a4b0f" strokeWidth="2" opacity=".6" />
      <circle cx="60" cy="148" r="10" fill="#b07a1c" stroke="#7a4b0f" strokeWidth="3" />
      <defs>
        <linearGradient id="bellg" x1="0" x2="1">
          <stop offset="0" stopColor="#8a5a14" />
          <stop offset=".4" stopColor="#f6dc8c" />
          <stop offset=".7" stopColor="#d9a63a" />
          <stop offset="1" stopColor="#7a4b0f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Diya({ className = "", delay = 0 }: P & { delay?: number }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g className="flicker" style={{ ["--d" as string]: `${delay}s` }}>
        <path d="M32 4c6 9 9 15 9 20a9 9 0 0 1-18 0c0-5 3-11 9-20z" fill="#ffb300" />
        <path d="M32 13c3 5 4 8 4 11a4 4 0 0 1-8 0c0-3 1-6 4-11z" fill="#fff3c0" />
      </g>
      <path d="M6 36h52c-2 12-12 20-26 20S8 48 6 36z" fill="#c0521b" stroke="#3a1606" strokeWidth="2.5" />
      <ellipse cx="32" cy="36" rx="26" ry="5" fill="#e0752e" stroke="#3a1606" strokeWidth="2.5" />
    </svg>
  );
}

export function CoconutPalm({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden="true" fill="currentColor">
      <path d="M58 200 C 60 150, 70 100, 66 52 L 72 52 C 78 100, 68 150, 66 200 Z" />
      {[-70, -35, 0, 35, 70, 110, -110].map((a) => (
        <path key={a} d="M68 52 C 90 40, 112 46, 120 62 C 104 54, 88 54, 68 56 Z" transform={`rotate(${a} 68 54)`} />
      ))}
    </svg>
  );
}

export function Boat({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden="true" fill="currentColor">
      <path d="M4 44 H116 C 106 62, 20 62, 4 44 Z" />
      <path d="M58 44 V4 L 96 40 Z" opacity=".85" />
      <path d="M56 44 V10 L 26 40 Z" opacity=".6" />
    </svg>
  );
}

export function Rocket({ className = "" }: P) {
  return (
    <svg viewBox="0 0 60 160" className={className} aria-hidden="true">
      <path d="M30 4 C 44 24, 44 60, 40 110 H20 C 16 60, 16 24, 30 4 Z" fill="#fbf3e2" />
      <path d="M20 110 L 8 132 L 20 126 Z M40 110 L 52 132 L 40 126 Z" fill="#d6262b" />
      <circle cx="30" cy="48" r="6" fill="#1d7f86" />
      <path d="M22 112 C 22 136, 38 136, 38 112" fill="#ffb300" className="flicker" />
    </svg>
  );
}

export function CoffeeCup({ className = "" }: P) {
  return (
    <svg viewBox="0 0 100 110" className={className} aria-hidden="true">
      <g className="steam" stroke="#fbf3e2" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M40 30 C 32 22, 48 16, 40 6" />
        <path d="M52 30 C 44 22, 60 16, 52 6" />
        <path d="M64 30 C 56 22, 72 16, 64 6" />
      </g>
      <path d="M26 40 H78 L 72 92 C 70 100, 34 100, 32 92 Z" fill="#c9ccd1" stroke="#7d828a" strokeWidth="3" />
      <ellipse cx="52" cy="40" rx="26" ry="6" fill="#5b3a22" stroke="#7d828a" strokeWidth="3" />
      <path d="M14 98 H90 C 86 106, 18 106, 14 98 Z" fill="#c9ccd1" stroke="#7d828a" strokeWidth="3" />
    </svg>
  );
}

/** Gommateshwara (Shravanabelagola) – monolith silhouette */
export function Monolith({ className = "" }: P) {
  return (
    <svg viewBox="0 0 80 200" className={className} aria-hidden="true" fill="currentColor">
      <ellipse cx="40" cy="20" rx="12" ry="14" />
      <path d="M34 32 h12 v6 h-12 Z" />
      <path d="M22 40 C 30 36, 50 36, 58 40 L 60 100 L 56 132 L 50 196 H 42 L 40 136 L 38 196 H 30 L 24 132 L 20 100 Z" />
      <path d="M22 44 L 14 120 L 20 122 L 26 60 M58 44 L 66 120 L 60 122 L 54 60" />
      <path d="M8 196 C 20 150, 18 110, 26 80 M72 196 C 60 150, 62 110, 54 80" stroke="#5c9a4a" strokeWidth="3" fill="none" opacity=".8" />
    </svg>
  );
}
