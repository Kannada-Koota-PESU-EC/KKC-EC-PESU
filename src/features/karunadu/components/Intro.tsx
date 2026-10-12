import { useEffect, useState } from "react";
import { KARNATAKA_PATH, MAP } from "@/features/karunadu/data/map-path";
import { DISTRICTS, project } from "@/features/karunadu/data/karnataka";
import { reducedMotion } from "@/features/karunadu/hooks";

const KEY = "kd-intro-seen";

function seen() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

// ಅಕ್ಷರ → ನಾಡು: the letter ಕ is written in gold, then the land is drawn
// and every district lights up like a lamp.
export default function Intro() {
  const [stage, setStage] = useState<"letter" | "land" | "leave" | "done">(() =>
    seen() || reducedMotion() ? "done" : "letter"
  );

  useEffect(() => {
    if (stage === "done") return;
    const next = { letter: "land", land: "leave", leave: "done" } as const;
    const wait = { letter: 2600, land: 3600, leave: 1200 }[stage];
    const t = setTimeout(() => {
      if (stage === "leave") {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
      }
      setStage(next[stage]);
    }, wait);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage === "done") return;
    const skip = () => setStage((s) => (s === "leave" ? s : "leave"));
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [stage]);

  if (stage === "done") return null;

  return (
    <div
      className={`kd-intro ${stage === "leave" ? "leave" : ""}`}
      onClick={() => setStage("leave")}
      role="presentation"
    >
      {stage === "letter" ? (
        <svg viewBox="0 0 400 400" className="h-[60vmin] w-[60vmin]" aria-hidden="true">
          <text x="200" y="285" textAnchor="middle" fontSize="300" className="kd-intro__letter">
            ಕ
          </text>
        </svg>
      ) : (
        <div className="flex flex-col items-center px-6">
          <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="h-[62vh] w-auto" aria-hidden="true">
            <defs>
              <linearGradient id="intro-flag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0.5" stopColor="#ffcc00" stopOpacity=".18" />
                <stop offset="0.5" stopColor="#d6262b" stopOpacity=".18" />
              </linearGradient>
            </defs>
            <path d={KARNATAKA_PATH} fill="url(#intro-flag)" stroke="#f6dc8c" strokeWidth="3" pathLength={1} className="kd-intro__map" />
            {DISTRICTS.map((d, i) => {
              const p = project(d.lat, d.lon);
              return (
                <g key={d.en} className="kd-intro__dot" style={{ animationDelay: `${1.4 + i * 0.05}s` }}>
                  <circle cx={p.x} cy={p.y} r="14" fill="#ffb300" opacity=".25" />
                  <circle cx={p.x} cy={p.y} r="5" fill="#ffe08a" />
                </g>
              );
            })}
          </svg>
          <p className="kd-intro__dot mt-4 f-serif text-3xl font-bold md:text-5xl" style={{ animationDelay: "2.6s" }}>
            <span className="gold-foil">ಕನ್ನಡ ಕೂಟ EC PES</span>
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setStage("leave");
        }}
        className="absolute bottom-6 right-6 rounded-full border border-[#f6dc8c]/40 px-4 py-2 f-serif text-sm text-[#f6dc8c]"
        aria-label="Skip intro"
      >
        ಮುಂದೆ ›
      </button>
    </div>
  );
}
