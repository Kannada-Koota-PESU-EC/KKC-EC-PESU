import { useEffect, useState } from "react";
import { reducedMotion } from "@/features/karunadu/hooks";
import { ringBell } from "@/features/karunadu/audio";

const KEY = "kd-intro-seen";

function seen() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

/* One carved leaf of a Hoysala temple door: teak, brass studs,
 * lotus panels and a lion-mouth knocker. The right leaf is a mirror. */
function DoorLeaf({ side }: { side: "left" | "right" }) {
  const id = `door-${side}`;
  const rows = [70, 290, 510, 730];
  return (
    <svg viewBox="0 0 500 1000" preserveAspectRatio={side === "left" ? "xMaxYMid slice" : "xMinYMid slice"} className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-wood`} x1="0" x2="1">
          <stop offset="0" stopColor="#2a1208" />
          <stop offset=".45" stopColor="#4d2410" />
          <stop offset=".55" stopColor="#56291a" />
          <stop offset="1" stopColor="#2a1208" />
        </linearGradient>
        <pattern id={`${id}-grain`} width="60" height="400" patternUnits="userSpaceOnUse">
          {[6, 17, 29, 41, 52].map((x, i) => (
            <path key={x} d={`M${x} 0 C ${x + 6} 100, ${x - 6} 200, ${x + 4} 300 S ${x - 3} 380, ${x} 400`} stroke="#1a0904" strokeOpacity={0.35 + (i % 2) * 0.2} strokeWidth="1.2" fill="none" />
          ))}
        </pattern>
        <radialGradient id={`${id}-brass`} cx=".35" cy=".35" r=".7">
          <stop offset="0" stopColor="#fff2b8" />
          <stop offset=".45" stopColor="#d9a63a" />
          <stop offset="1" stopColor="#6b4410" />
        </radialGradient>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b0a04" />
          <stop offset="1" stopColor="#3a1a0c" />
        </linearGradient>
      </defs>
      <g transform={side === "right" ? "translate(500 0) scale(-1 1)" : undefined}>
        <rect width="500" height="1000" fill={`url(#${id}-wood)`} />
        <rect width="500" height="1000" fill={`url(#${id}-grain)`} />
        <rect x="18" y="18" width="464" height="964" fill="none" stroke="#d9a63a" strokeOpacity=".55" strokeWidth="3" />
        <rect x="28" y="28" width="444" height="944" fill="none" stroke="#d9a63a" strokeOpacity=".3" strokeWidth="1.5" strokeDasharray="6 5" />
        {rows.map((y) =>
          [52, 262].map((x) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="186" height="200" rx="6" fill={`url(#${id}-panel)`} stroke="#0d0402" strokeWidth="4" />
              <rect x={x + 10} y={y + 10} width="166" height="180" rx="4" fill="none" stroke="#d9a63a" strokeOpacity=".5" strokeWidth="1.5" />
              <g transform={`translate(${x + 93} ${y + 100})`}>
                {Array.from({ length: 8 }).map((_, k) => (
                  <path key={k} d="M0 0 C 14 -18, 12 -46, 0 -62 C -12 -46, -14 -18, 0 0 Z" fill="#5a2a12" stroke="#e8be5c" strokeOpacity=".75" strokeWidth="1.6" transform={`rotate(${k * 45})`} />
                ))}
                <circle r="14" fill={`url(#${id}-brass)`} />
                <circle r="68" fill="none" stroke="#d9a63a" strokeOpacity=".35" strokeWidth="1.2" strokeDasharray="3 4" />
              </g>
            </g>
          ))
        )}
        {/* brass studs on the rails */}
        {[48, 268, 488, 708, 928, 962].map((y) =>
          [60, 150, 250, 350, 440].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y + (y > 950 ? 0 : 6)} r="7" fill={`url(#${id}-brass)`} />)
        )}
        {/* carved strip along the meeting edge */}
        <rect x="478" y="0" width="22" height="1000" fill="#2a1208" />
        <path d="M489 0 V1000" stroke="#d9a63a" strokeWidth="2" strokeDasharray="14 6" />
        {/* lion-mouth knocker */}
        <g transform="translate(430 600)">
          <circle r="26" fill={`url(#${id}-brass)`} stroke="#3a2306" strokeWidth="2" />
          <circle r="8" fill="#3a2306" />
          <circle cy="46" r="34" fill="none" stroke={`url(#${id}-brass)`} strokeWidth="8" />
        </g>
      </g>
    </svg>
  );
}

/* The website opens like a temple: carved doors, a lamp glowing in the
 * gap and ಕನ್ನಡ ಕೂಟ shining on them – then the doors swing open, light
 * pours out and you walk through into the home page. */
export default function Intro() {
  const [stage, setStage] = useState<"closed" | "open" | "done">(() => (seen() || reducedMotion() ? "done" : "closed"));

  useEffect(() => {
    if (stage === "done") return;
    const t = setTimeout(
      () => {
        if (stage === "open") {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {
            /* ignore */
          }
        }
        setStage(stage === "closed" ? "open" : "done");
      },
      stage === "closed" ? 2400 : 2300
    );
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "closed") return;
    const skip = () => setStage("open");
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [stage]);

  if (stage === "done") return null;

  return (
    <div
      className={`kd-doors ${stage === "open" ? "open" : ""}`}
      onClick={() => {
        if (stage !== "closed") return;
        ringBell();
        setStage("open");
      }}
      role="presentation"
    >
      <div className="kd-doors__world">
        {/* light waiting behind the doors */}
        <div className="kd-doors__inner-light" />
        <div className="kd-doors__leaf kd-doors__leaf--l">
          <DoorLeaf side="left" />
        </div>
        <div className="kd-doors__leaf kd-doors__leaf--r">
          <DoorLeaf side="right" />
        </div>
        <div className="kd-doors__seam" />

        {/* granite frame with hanging bells */}
        <div className="kd-doors__lintel">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[38%] w-full" aria-hidden="true">
            {Array.from({ length: 30 }).map((_, i) => (
              <path key={i} d={`M${i * 40} 60 Q ${i * 40 + 20} 10 ${i * 40 + 40} 60`} fill="none" stroke="#c9b79a" strokeOpacity=".45" strokeWidth="2" />
            ))}
          </svg>
          <div className="absolute inset-x-[6%] top-full flex justify-between">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="kd-doors__bell" style={{ animationDelay: `${(i % 4) * -0.4}s`, height: `${50 + (i % 3) * 18}px` }}>
                <svg viewBox="0 0 20 26" className="absolute bottom-0 left-1/2 h-6 w-5 -translate-x-1/2" aria-hidden="true">
                  <path d="M10 2 C 4 2, 4 8, 3 16 L 1 20 H 19 L 17 16 C 16 8, 16 2, 10 2 Z" fill="#d9a63a" stroke="#6b4410" strokeWidth="1" />
                  <circle cx="10" cy="22" r="2.4" fill="#8a5a14" />
                </svg>
              </span>
            ))}
          </div>
        </div>
        <div className="kd-doors__jamb kd-doors__jamb--l" />
        <div className="kd-doors__jamb kd-doors__jamb--r" />

        {/* the name, shining across both doors */}
        {/* a brass name-plate hung across the doors, so the name always reads clearly */}
        <div className="kd-doors__title">
          <div className="kd-doors__plate">
            <p className="kd-doors__name f-serif whitespace-nowrap font-bold">ಕನ್ನಡ ಕೂಟ</p>
            <p className="mt-1 whitespace-nowrap text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffe9a8] md:text-sm md:tracking-[0.45em]">EC · PES University</p>
          </div>
        </div>

        {/* oil lamp at the threshold */}
        <div className="kd-doors__lamp">
          <span className="kd-doors__flame" />
          <svg viewBox="0 0 80 30" className="h-8 w-24" aria-hidden="true">
            <path d="M4 8 Q 40 34 76 8 Q 60 4 40 6 Q 20 4 4 8 Z" fill="#c9862a" stroke="#6b4410" strokeWidth="1.5" />
          </svg>
        </div>

        {Array.from({ length: 26 }).map((_, i) => (
          <span key={i} className="kd-doors__dust" style={{ left: `${44 + ((i * 37) % 12)}%`, top: `${20 + ((i * 53) % 65)}%`, animationDelay: `${(i % 9) * 0.12}s` }} />
        ))}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setStage("open");
        }}
        className="kd-doors__skip f-serif"
        aria-label="Skip intro"
      >
        ಮುಂದೆ ›
      </button>
    </div>
  );
}
