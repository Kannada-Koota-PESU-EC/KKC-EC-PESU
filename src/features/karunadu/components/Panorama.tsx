import { useEffect, useState, type ReactNode } from "react";
import { REGIONS } from "@/features/karunadu/data/karnataka";
import { useScrollProgress } from "@/features/karunadu/hooks";
import {
  Boat, CoconutPalm, Elephant, GolGumbaz, Gopura, Monolith, MysuruPalace, Rocket, StoneChariot, VidhanaSoudha, YakshaCrown,
} from "@/features/karunadu/components/Motifs";

type RegionId = (typeof REGIONS)[number]["id"];

const CHIPS: Record<RegionId, string[]> = {
  karavali: ["ಯಕ್ಷಗಾನ", "ಕಂಬಳ", "ಹುಲಿ ವೇಷ", "ಉಡುಪಿ", "ಮುರುಡೇಶ್ವರ", "ಗೋಕರ್ಣ"],
  malenadu: ["ಜೋಗ ಜಲಪಾತ", "ಕೊಡಗು", "ಚಿಕ್ಕಮಗಳೂರು", "ಶೃಂಗೇರಿ", "ಆಗುಂಬೆ", "ಕಾಫಿ"],
  mysuru: ["ಮೈಸೂರು ಅರಮನೆ", "ದಸರಾ", "ಶ್ರೀರಂಗಪಟ್ಟಣ", "ಶ್ರವಣಬೆಳಗೊಳ", "ಕಾವೇರಿ"],
  bayaluseeme: ["ಹಂಪಿ", "ಚಿತ್ರದುರ್ಗ", "ತುಂಗಭದ್ರಾ", "ದಾವಣಗೆರೆ ಬೆಣ್ಣೆ ದೋಸೆ"],
  kittur: ["ಬಾದಾಮಿ", "ಐಹೊಳೆ", "ಪಟ್ಟದಕಲ್ಲು", "ಕಿತ್ತೂರು", "ಧಾರವಾಡ", "ಬೆಳಗಾವಿ"],
  kalyana: ["ಗೋಳ ಗುಮ್ಮಟ", "ಬೀದರ್ ಕೋಟೆ", "ಕಲಬುರಗಿ", "ಕೂಡಲಸಂಗಮ", "ಬಿದರಿ"],
  bengaluru: ["ವಿಧಾನ ಸೌಧ", "ಲಾಲ್‌ಬಾಗ್", "ಕರಗ", "ಇಸ್ರೋ", "ನಂದಿ ಬೆಟ್ಟ"],
};

const SKY: Record<RegionId, string> = {
  karavali: "linear-gradient(180deg,#0e4b66 0%,#2a8bab 45%,#f4c27a 72%,#e98b4a 100%)",
  malenadu: "linear-gradient(180deg,#26333a 0%,#3f5b55 45%,#6d8f6b 100%)",
  mysuru: "linear-gradient(180deg,#05030f 0%,#1b1145 50%,#4a0d1e 100%)",
  bayaluseeme: "linear-gradient(180deg,#5b2a6b 0%,#d1603f 45%,#ffb25e 75%,#ffd89a 100%)",
  kittur: "linear-gradient(180deg,#f2a36b 0%,#f6c58d 50%,#f9e2b8 100%)",
  kalyana: "linear-gradient(180deg,#1a1440 0%,#6b2a5e 45%,#e0613f 80%,#ffb25e 100%)",
  bengaluru: "linear-gradient(180deg,#0b1026 0%,#1d2b5a 55%,#3a2a6a 100%)",
};

function Scene({ id, children }: { id: RegionId; children: ReactNode }) {
  const region = REGIONS.find((r) => r.id === id)!;
  const index = REGIONS.findIndex((r) => r.id === id);
  return (
    <section
      className="relative h-[100svh] w-screen shrink-0 snap-center overflow-hidden"
      style={{ background: SKY[id] }}
      aria-label={`${region.kn} – ${region.en}`}
    >
      {children}
      <div className="absolute left-6 top-24 z-20 max-w-xl md:left-16 md:top-28">
        <p className="f-display text-sm uppercase tracking-[0.4em] text-white/80">
          {String(index + 1).padStart(2, "0")} / {String(REGIONS.length).padStart(2, "0")} · {region.en}
        </p>
        <h3 className="f-serif mt-2 text-6xl font-bold text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] md:text-8xl">{region.kn}</h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {CHIPS[id].map((c) => (
            <li key={c} className="f-serif rounded-full border border-white/40 bg-black/25 px-3 py-1 text-sm text-white backdrop-blur">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Hills({ color, d, className = "" }: { color: string; d: string; className?: string }) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={`absolute inset-x-0 bottom-0 w-full ${className}`} aria-hidden="true">
      <path d={d} fill={color} />
    </svg>
  );
}

function Karavali() {
  return (
    <Scene id="karavali">
      <div className="absolute right-[12%] top-[16%] h-28 w-28 rounded-full bg-[#ffe7a8] shadow-[0_0_80px_30px_rgba(255,214,140,.5)]" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-[#1b7fa0] to-[#0b4a66]">
        {[0, 1, 2, 3].map((i) => (
          <svg key={i} viewBox="0 0 1440 40" preserveAspectRatio="none" className="waves absolute inset-x-[-40px] h-6 w-[calc(100%+80px)]" style={{ top: `${10 + i * 22}%`, animationDelay: `${i * -1.4}s`, opacity: 0.5 - i * 0.08 }} aria-hidden="true">
            <path d="M0 20 Q 30 0 60 20 T 120 20 T 180 20 T 240 20 T 300 20 T 360 20 T 420 20 T 480 20 T 540 20 T 600 20 T 660 20 T 720 20 T 780 20 T 840 20 T 900 20 T 960 20 T 1020 20 T 1080 20 T 1140 20 T 1200 20 T 1260 20 T 1320 20 T 1380 20 T 1440 20" stroke="#bff3f0" strokeWidth="3" fill="none" />
          </svg>
        ))}
        <Boat className="float absolute left-[30%] top-[18%] h-14 w-24 text-[#3a1606]" />
        <Boat className="float absolute left-[62%] top-[40%] h-10 w-16 text-[#5a2a10]" />
      </div>
      <div className="absolute bottom-[34%] right-[6%] h-[46%] text-[#3a1606]/90"><Gopura className="h-full w-auto" /></div>
      <CoconutPalm className="sway absolute bottom-[30%] left-[4%] h-[52%] w-auto text-[#14301a]" />
      <CoconutPalm className="sway absolute bottom-[30%] left-[16%] h-[40%] w-auto text-[#1b3d22]" />
      <YakshaCrown className="float absolute bottom-[8%] right-[32%] hidden h-40 w-auto drop-shadow-2xl md:block" />
    </Scene>
  );
}

function Malenadu() {
  return (
    <Scene id="malenadu">
      <div className="rain" />
      <Hills color="#2c4a3a" d="M0 120 C 200 40 360 160 560 80 C 760 0 940 140 1140 60 C 1300 0 1380 80 1440 60 V320 H0Z" className="h-[62%]" />
      <div className="mist" style={{ bottom: "44%" }} />
      <Hills color="#1f4d2b" d="M0 180 C 220 100 420 220 640 140 C 860 60 1060 200 1260 130 C 1360 100 1420 120 1440 110 V320 H0Z" className="h-[48%]" />
      {/* Jog falls */}
      <svg viewBox="0 0 300 500" className="absolute bottom-[14%] right-[10%] h-[66%] w-auto" aria-hidden="true">
        <path d="M0 40 H120 V500 H0Z M180 40 H300 V500 H180Z" fill="#33463a" />
        <path d="M120 40 C 130 30, 170 30, 180 40" fill="#2a3a30" />
        {[128, 140, 150, 160, 172].map((x, i) => (
          <path key={x} d={`M${x} 40 V470`} stroke="#e8fbff" strokeWidth={i % 2 ? 6 : 4} className="fall" style={{ animationDelay: `${i * -0.13}s` }} opacity=".85" />
        ))}
        <ellipse cx="150" cy="480" rx="80" ry="22" fill="#e8fbff" opacity=".55" className="float" />
      </svg>
      <div className="mist" style={{ bottom: "16%" }} />
      <Hills color="#173a20" d="M0 240 C 260 180 520 280 780 220 C 1040 160 1260 260 1440 210 V320 H0Z" className="h-[30%]" />
      {/* coffee shrubs */}
      <div className="absolute bottom-[3%] left-[6%] flex gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="relative block h-10 w-10 rounded-full bg-[#2f7d32]">
            <span className="absolute left-3 top-2 h-2 w-2 rounded-full bg-[#d6262b]" />
            <span className="absolute left-6 top-5 h-2 w-2 rounded-full bg-[#d6262b]" />
          </span>
        ))}
      </div>
      <Elephant howdah={false} className="walk absolute bottom-[6%] left-[44%] h-28 w-auto opacity-90" />
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="firefly" style={{ left: `${8 + ((i * 37) % 84)}%`, top: `${45 + ((i * 23) % 40)}%`, ["--d" as string]: `${i * 0.3}s`, ["--t" as string]: `${5 + (i % 4)}s` }} />
      ))}
    </Scene>
  );
}

function OldMysuru() {
  return (
    <Scene id="mysuru">
      <div className="stars-field" />
      {[
        { l: "18%", t: "20%", c: "#ffcc00" },
        { l: "74%", t: "14%", c: "#ff5fa2" },
        { l: "52%", t: "26%", c: "#7cf7ff" },
      ].map((f, i) => (
        <svg key={i} viewBox="0 0 100 100" className="pulse-ring absolute h-40 w-40" style={{ left: f.l, top: f.t, ["--d" as string]: `${i * 0.9}s` }} aria-hidden="true">
          {Array.from({ length: 16 }).map((_, k) => (
            <line key={k} x1="50" y1="50" x2={50 + 46 * Math.cos((k * Math.PI) / 8)} y2={50 + 46 * Math.sin((k * Math.PI) / 8)} stroke={f.c} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 6" />
          ))}
        </svg>
      ))}
      <MysuruPalace className="absolute bottom-[12%] left-1/2 h-[46%] w-[120%] -translate-x-1/2 md:w-[90%]" />
      <div className="absolute inset-x-0 bottom-0 h-[13%] bg-gradient-to-b from-[#2b0a14] to-[#12030a]" />
      <div className="absolute bottom-[4%] left-0 w-full overflow-hidden">
        <div className="flex w-max gap-24" style={{ animation: "fly 28s linear infinite" }}>
          <Elephant className="walk h-28 w-auto md:h-36" />
          <Elephant className="walk h-24 w-auto md:h-32" />
        </div>
      </div>
      <Monolith className="absolute bottom-[12%] right-[4%] hidden h-[30%] w-auto text-[#e9d3a6]/30 md:block" />
    </Scene>
  );
}

function Bayaluseeme() {
  return (
    <Scene id="bayaluseeme">
      <div className="absolute left-1/2 top-[40%] h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ffe08a] to-[#ff8a3d] shadow-[0_0_120px_40px_rgba(255,160,80,.55)]" />
      {/* boulders */}
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[48%] w-full" aria-hidden="true">
        {[[80, 300, 120, 90], [220, 280, 150, 120], [360, 320, 90, 70], [1060, 290, 140, 110], [1220, 260, 170, 140], [1360, 320, 100, 80], [300, 210, 70, 60], [1150, 180, 80, 70]].map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={i % 2 ? "#7a5236" : "#8f6444"} />
        ))}
        <path d="M0 330 C 300 300 600 350 900 320 C 1150 296 1300 330 1440 315 V400 H0Z" fill="#5a3a24" />
        <path d="M0 360 C 360 350 720 372 1080 356 C 1260 350 1380 360 1440 356" stroke="#1d7f86" strokeWidth="10" fill="none" className="flow" />
      </svg>
      <StoneChariot className="absolute bottom-[14%] left-1/2 h-[40%] w-auto -translate-x-1/2 text-[#6b4a32]" />
      {/* Chitradurga fort wall */}
      <svg viewBox="0 0 400 120" className="absolute bottom-[22%] left-[3%] hidden h-24 w-auto md:block" aria-hidden="true">
        <path d="M0 120 V40 H20 V20 H40 V40 H80 V20 H100 V40 H140 V30 H170 V40 H220 V20 H240 V40 H290 V20 H310 V40 H360 V30 H400 V120Z" fill="#4a3020" />
      </svg>
    </Scene>
  );
}

function Kittur() {
  return (
    <Scene id="kittur">
      {/* Badami red sandstone cliffs with cave temples */}
      <svg viewBox="0 0 1440 500" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[64%] w-full" aria-hidden="true">
        <path d="M0 140 L 120 110 L 200 150 L 320 90 L 420 130 L 520 80 L 560 500 H0Z" fill="#a8492b" />
        <path d="M880 500 L 920 100 L 1040 70 L 1120 120 L 1260 60 L 1360 110 L 1440 90 V500Z" fill="#b5532f" />
        {[[140, 260], [260, 230], [380, 280], [1000, 250], [1140, 220], [1280, 270]].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x} ${y + 70} v-46 a30 30 0 0 1 60 0 v46z`} fill="#4a1c0e" />
            {[0, 20, 40].map((o) => (
              <rect key={o} x={x + 6 + o} y={y + 34} width="6" height="36" fill="#8a3a20" />
            ))}
          </g>
        ))}
        <path d="M560 500 C 640 420 820 430 880 500Z" fill="#1d7f86" opacity=".85" />
        <path d="M600 470 C 680 450 780 450 860 470" stroke="#bff3f0" strokeWidth="4" fill="none" className="flow" />
      </svg>
      <div className="absolute bottom-[40%] left-1/2 h-[28%] -translate-x-1/2 text-[#6b2a12]"><Gopura className="h-full w-auto" /></div>
      {/* Kittur flag */}
      <svg viewBox="0 0 80 120" className="sway absolute right-[16%] top-[24%] h-32 w-auto" aria-hidden="true">
        <path d="M6 0 V120" stroke="#3a1606" strokeWidth="4" />
        <path d="M8 6 C 30 0, 50 18, 76 10 V 50 C 50 58, 30 40, 8 46Z" fill="#ff8a00" />
      </svg>
    </Scene>
  );
}

function Kalyana() {
  return (
    <Scene id="kalyana">
      <div className="absolute left-[20%] top-[28%] h-24 w-24 rounded-full bg-[#ffd89a] opacity-90 shadow-[0_0_80px_20px_rgba(255,180,90,.5)]" />
      <GolGumbaz className="absolute bottom-[10%] left-1/2 h-[52%] w-auto -translate-x-1/2 text-[#2a0f1e]" />
      <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[22%] w-[45%]" aria-hidden="true">
        <path d="M0 160 V60 H30 V40 H60 V60 H140 V30 H180 V60 H260 V40 H290 V60 H380 V50 H420 V60 H600 V160Z" fill="#1c0a14" />
      </svg>
      <svg viewBox="0 0 600 160" preserveAspectRatio="none" className="absolute bottom-0 right-0 h-[18%] w-[45%]" aria-hidden="true">
        <path d="M0 160 V70 H60 V50 H90 V70 H200 V40 H240 V70 H360 V50 H400 V70 H600 V160Z" fill="#1c0a14" />
      </svg>
      {/* Bidri vase */}
      <svg viewBox="0 0 80 120" className="float absolute bottom-[12%] right-[10%] hidden h-36 w-auto md:block" aria-hidden="true">
        <path d="M30 6 h20 v14 c20 10 26 40 20 66 c-4 20-16 30-30 30 s-26-10-30-30 c-6-26 0-56 20-66z" fill="#17191c" stroke="#d6dde3" strokeWidth="2" />
        <path d="M18 60 c10 -12 34 -12 44 0 M16 76 c12 10 36 10 48 0 M40 40 v60" stroke="#d6dde3" strokeWidth="1.6" fill="none" />
      </svg>
    </Scene>
  );
}

function Bengaluru() {
  return (
    <Scene id="bengaluru">
      <div className="stars-field" />
      <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[44%] w-full" aria-hidden="true">
        {Array.from({ length: 34 }).map((_, i) => {
          const w = 30 + ((i * 17) % 30);
          const h = 80 + ((i * 53) % 170);
          const x = i * 44;
          return (
            <g key={i}>
              <rect x={x} y={300 - h} width={w} height={h} fill={i % 3 ? "#141b3a" : "#1b244a"} />
              {Array.from({ length: Math.floor(h / 22) }).map((_, k) => (
                <rect key={k} x={x + 6} y={300 - h + 8 + k * 22} width={w - 12} height="5" fill="#ffd76a" opacity={(i + k) % 4 ? 0.12 : 0.75} />
              ))}
            </g>
          );
        })}
      </svg>
      <VidhanaSoudha className="absolute bottom-[4%] left-1/2 h-[30%] w-auto -translate-x-1/2 text-[#e9d3a6]" />
      <Rocket className="float absolute bottom-[34%] right-[10%] h-[30%] w-auto" />
      <div className="absolute inset-x-0 bottom-0 h-[5%] bg-[#0b1026]" />
    </Scene>
  );
}

export default function Panorama() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>("pin");
  const [desktop, setDesktop] = useState(false);
  const count = REGIONS.length;

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const active = Math.min(count - 1, Math.round(progress * (count - 1)));

  return (
    <div ref={ref} className="relative md:h-[700vh]" data-cursor="mallige">
      <div className="relative overflow-hidden md:sticky md:top-0 md:h-screen">
        <div
          className="flex snap-x snap-mandatory overflow-x-auto md:overflow-visible [scrollbar-width:none] md:will-change-transform"
          style={desktop ? { transform: `translateX(${-progress * (count - 1) * 100}vw)` } : undefined}
        >
          <Karavali />
          <Malenadu />
          <OldMysuru />
          <Bayaluseeme />
          <Kittur />
          <Kalyana />
          <Bengaluru />
        </div>

        {/* region progress (desktop) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 hidden justify-center md:flex">
          <ol className="flex items-center gap-3 rounded-full bg-black/35 px-5 py-2.5 backdrop-blur">
            {REGIONS.map((r, i) => (
              <li key={r.id} className={`f-serif text-sm transition-all duration-500 ${i === active ? "text-[#ffcc00] scale-110" : "text-white/55"}`}>
                {r.kn}
                {i < count - 1 && <span className="ml-3 text-white/30">—</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
