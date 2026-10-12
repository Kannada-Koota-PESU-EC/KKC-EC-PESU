import { useEffect, useRef, useState, type ReactNode } from "react";
import { drum, echoClap, MAYAMALAVAGOWLA, pluck, stoneNote, swaraFreq } from "@/features/karunadu/audio";
import { SWARAS, VYANJANAS } from "@/features/karunadu/data/karnataka";

/* One small hands-on thing to do at every stop of the 3D map. */

function Hint({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-center text-[11px] text-[#fbf3e2]/55">{children}</p>;
}

/* ---- Bidar: rub the blackened plate to reveal the silver inlay ---- */
function BidriPlate() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [shine, setShine] = useState(0);
  useEffect(() => {
    const c = canvas.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    g.fillStyle = "#16181b";
    g.fillRect(0, 0, c.width, c.height);
  }, []);
  const rub = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvas.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    const r = c.getBoundingClientRect();
    g.globalCompositeOperation = "destination-out";
    g.beginPath();
    g.arc(((e.clientX - r.left) / r.width) * c.width, ((e.clientY - r.top) / r.height) * c.height, 16, 0, Math.PI * 2);
    g.fill();
    setShine((s) => Math.min(100, s + 0.8));
  };
  return (
    <div>
      <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-[#3a3d42] shadow-inner">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full bg-[#1d1f22]" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 50 50)`} stroke="#e8edf1" strokeWidth="1.6" fill="none">
              <path d="M50 50 C 56 38, 56 26, 50 14 C 44 26, 44 38, 50 50 Z" fill="#d6dde3" fillOpacity=".9" />
              <circle cx="50" cy="8" r="2.2" fill="#e8edf1" />
            </g>
          ))}
          <circle cx="50" cy="50" r="6" fill="#e8edf1" />
          <circle cx="50" cy="50" r="44" stroke="#d6dde3" strokeWidth="1.2" fill="none" strokeDasharray="2 3" />
        </svg>
        <canvas ref={canvas} width={160} height={160} onPointerMove={rub} onPointerDown={rub} className="absolute inset-0 h-full w-full cursor-crosshair touch-none" />
      </div>
      <Hint>{shine >= 100 ? "ಬೆಳ್ಳಿ ಹೊಳೆಯುತ್ತಿದೆ! The silver shines." : "Rub the black plate to polish out the silver inlay"}</Hint>
    </div>
  );
}

/* ---- Gol Gumbaz: one clap, seven echoes ---- */
function WhisperingGallery() {
  const [echo, setEcho] = useState(-1);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const clap = () => {
    timers.current.forEach(clearTimeout);
    echoClap(7, 0.42);
    timers.current = Array.from({ length: 8 }, (_, k) => window.setTimeout(() => setEcho(k), k * 420));
  };
  return (
    <div className="text-center">
      <button type="button" onClick={clap} className="relative mx-auto grid h-36 w-36 place-items-center rounded-t-full border-2 border-[#f6dc8c]/50 bg-[radial-gradient(circle_at_50%_80%,#3a2a20,#120a08)]" aria-label="Clap under the dome">
        {echo >= 0 &&
          Array.from({ length: echo + 1 }).map((_, k) => (
            <span key={`${k}-${echo === 0 ? "a" : "b"}`} className="absolute inset-4 rounded-t-full border border-[#ffcc00]" style={{ animation: "pulse-ring 1.4s ease-out forwards", opacity: 1 - k * 0.12 }} />
          ))}
        <span className="f-serif text-lg font-bold text-[#ffcc00]">👏 ಚಪ್ಪಾಳೆ</span>
      </button>
      <p className="f-display mt-2 text-2xl text-[#fbf3e2]">{echo > 0 ? `${echo} / 7` : " "}</p>
      <Hint>Clap and count the echoes come back</Hint>
    </div>
  );
}

/* ---- Badami: mirror-stitch a Kasuti motif ---- */
function KasutiGrid() {
  const N = 9;
  const [cells, setCells] = useState<Set<number>>(() => new Set([40, 31, 39, 41, 49]));
  const toggle = (x: number, y: number) =>
    setCells((prev) => {
      const next = new Set(prev);
      const on = !prev.has(y * N + x);
      // stitch the same cross in all four mirrored places, like a real Kasuti motif
      [[x, y], [N - 1 - x, y], [x, N - 1 - y], [N - 1 - x, N - 1 - y], [y, x], [N - 1 - y, x], [y, N - 1 - x], [N - 1 - y, N - 1 - x]].forEach(([a, b]) =>
        on ? next.add(b * N + a) : next.delete(b * N + a)
      );
      return next;
    });
  return (
    <div>
      <div className="mx-auto grid w-44 gap-[2px] rounded-lg bg-[#2a0613] p-2" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
        {Array.from({ length: N * N }).map((_, i) => {
          const x = i % N;
          const y = Math.floor(i / N);
          const on = cells.has(i);
          return (
            <button key={i} type="button" onClick={() => toggle(x, y)} className="aspect-square" aria-label={`Stitch ${x + 1},${y + 1}`}>
              <svg viewBox="0 0 10 10" className="h-full w-full">
                {on ? (
                  <path d="M1 1 L9 9 M9 1 L1 9" stroke={(x + y) % 2 ? "#ffcc00" : "#ff5a4f"} strokeWidth="2.2" strokeLinecap="round" />
                ) : (
                  <circle cx="5" cy="5" r="0.8" fill="#fbf3e2" opacity=".25" />
                )}
              </svg>
            </button>
          );
        })}
      </div>
      <Hint>Tap to stitch – every cross is mirrored, just like Kasuti from Dharwad</Hint>
    </div>
  );
}

/* ---- Hampi: the musical pillars of the Vittala temple ---- */
function MusicalPillars() {
  const [hit, setHit] = useState<number | null>(null);
  const notes = MAYAMALAVAGOWLA.slice(0, 7);
  const strike = (i: number) => {
    stoneNote(swaraFreq(notes[i].semitone, 330));
    setHit(i);
    window.setTimeout(() => setHit((h) => (h === i ? null : h)), 250);
  };
  return (
    <div>
      <div className="flex items-end justify-center gap-1.5">
        {notes.map((n, i) => (
          <button
            key={i}
            type="button"
            onPointerDown={() => strike(i)}
            className={`flex w-8 flex-col items-center rounded-t-md border border-[#c9b79a]/40 bg-gradient-to-b from-[#b8a88c] to-[#6e6150] pb-1 transition-all duration-150 ${hit === i ? "translate-y-1 brightness-125 shadow-[0_0_24px_rgba(255,204,0,.7)]" : ""}`}
            style={{ height: `${120 - i * 6}px` }}
            aria-label={`Pillar ${n.swara}`}
          >
            <span className="mt-auto f-serif text-sm font-bold text-[#1a0a06]">{n.swara}</span>
          </button>
        ))}
      </div>
      <div className="mx-auto h-2 w-64 rounded bg-[#6e6150]" />
      <Hint>Tap the granite pillars – they ring like the ones at the Vittala temple</Hint>
    </div>
  );
}

/* ---- Jog: how long a pebble falls 253 m ---- */
function PebbleDrop() {
  const H = 253;
  const T = Math.sqrt((2 * H) / 9.81); // ~7.2 s without air
  const [t, setT] = useState<number | null>(null);
  const raf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const drop = () => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const step = () => {
      const s = Math.min(T, (performance.now() - start) / 1000);
      setT(s);
      if (s < T) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };
  const fallen = t === null ? 0 : Math.min(H, 0.5 * 9.81 * t * t);
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-40 w-16 overflow-hidden rounded-md bg-gradient-to-b from-[#2c4a3a] to-[#0d1a12]">
        {[18, 26, 34, 42].map((x, i) => (
          <span key={x} className="absolute top-0 h-full w-[3px] bg-gradient-to-b from-white/80 to-white/20" style={{ left: `${x}%`, opacity: 0.5 + (i % 2) * 0.3 }} />
        ))}
        <span className="absolute left-[70%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#d8d2c4] shadow" style={{ top: `${(fallen / H) * 92}%` }} />
      </div>
      <div className="flex-1">
        <p className="f-display text-3xl text-[#fbf3e2] tabular-nums">{fallen.toFixed(0)} m</p>
        <p className="text-sm text-[#fbf3e2]/70 tabular-nums">{t === null ? "0.0" : t.toFixed(1)} s</p>
        <button type="button" onClick={drop} className="btn-silk mt-3 !px-4 !py-2 text-sm">
          {t !== null && t >= T ? "Drop again" : "Drop a pebble"}
        </button>
        <p className="mt-2 text-[11px] text-[#fbf3e2]/55">253 m – about 3½ times the Qutub Minar. A pebble needs ~{T.toFixed(1)} s to reach the pool.</p>
      </div>
    </div>
  );
}

/* ---- Karavali: Yakshagana chande ---- */
const TAALA = [1, 0, 0, 1, 0, 1, 0, 0]; // 1 = dhim, 0 = taka
function Chande() {
  const [hit, setHit] = useState<"low" | "high" | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const beat = (low: boolean) => {
    drum(low);
    setHit(low ? "low" : "high");
    window.setTimeout(() => setHit(null), 120);
  };
  const play = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [...TAALA, ...TAALA].map((b, i) => window.setTimeout(() => beat(b === 1), i * 190));
  };
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4">
        {[
          { low: true, kn: "ಧಿಂ", size: "h-24 w-24", col: "from-[#e8c58a] to-[#9a6b2f]" },
          { low: false, kn: "ತಕ", size: "h-16 w-16", col: "from-[#f6e6c2] to-[#b98a52]" },
        ].map((p) => (
          <button
            key={p.kn}
            type="button"
            onPointerDown={() => beat(p.low)}
            className={`${p.size} grid place-items-center rounded-full border-4 border-[#5a2a10] bg-gradient-to-br ${p.col} shadow-lg transition-transform duration-100 ${hit === (p.low ? "low" : "high") ? "scale-90" : ""}`}
            aria-label={`Chande ${p.kn}`}
          >
            <span className="f-serif text-xl font-bold text-[#3a1606]">{p.kn}</span>
          </button>
        ))}
      </div>
      <button type="button" onClick={play} className="btn-line mt-3 !px-4 !py-1.5 text-sm">
        Play a taala
      </button>
      <Hint>Tap the chande, the drum that drives Yakshagana all night</Hint>
    </div>
  );
}

/* ---- Halmidi: write with Kannada letters ---- */
function LetterWriter() {
  const [text, setText] = useState("ಕನ್ನಡ");
  const [big, setBig] = useState("ಅ");
  const letters = [...SWARAS.slice(0, 13), ...VYANJANAS];
  return (
    <div>
      <div className="flex items-center gap-3">
        <span key={big} className="f-serif grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[#ffcc00] text-4xl font-bold text-[#1a0a06]" style={{ animation: "kd-card-in .4s ease" }}>
          {big}
        </span>
        <div className="min-w-0 flex-1 rounded-xl border border-[#f6dc8c]/30 bg-black/30 px-3 py-2">
          <p className="f-serif truncate text-2xl text-[#fbf3e2]">{text || " "}</p>
        </div>
        <button type="button" onClick={() => setText((t) => [...t].slice(0, -1).join(""))} className="rounded-full border border-white/20 px-2 py-1 text-xs text-white/70" aria-label="Delete last letter">
          ⌫
        </button>
      </div>
      <div className="mt-2 grid max-h-24 grid-cols-10 gap-1 overflow-y-auto pr-1">
        {letters.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              setBig(l);
              setText((t) => (t.length > 14 ? t : t + l));
            }}
            className="f-serif rounded-md bg-white/5 py-0.5 text-base text-[#fbf3e2] hover:bg-[#ffcc00] hover:text-[#1a0a06]"
          >
            {l}
          </button>
        ))}
      </div>
      <Hint>Every one of these letters grew from the script on the Halmidi stone</Hint>
    </div>
  );
}

/* ---- Shravanabelagola: Mahamastakabhisheka ---- */
const OFFERINGS = [
  { kn: "ಹಾಲು", en: "Milk", c: "rgba(255,255,255,.55)" },
  { kn: "ಅರಿಶಿನ", en: "Turmeric", c: "rgba(255,196,0,.5)" },
  { kn: "ಶ್ರೀಗಂಧ", en: "Sandal", c: "rgba(233,190,140,.5)" },
  { kn: "ಕುಂಕುಮ", en: "Vermilion", c: "rgba(214,38,43,.45)" },
];
function Abhisheka() {
  const [pours, setPours] = useState<{ id: number; c: string }[]>([]);
  return (
    <div>
      <div className="relative h-36 overflow-hidden rounded-xl">
        <img src="/karnataka/photos/shravanabelagola.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        {pours.slice(-6).map((p) => (
          <span key={p.id} className="abhisheka absolute inset-x-[30%] top-0 h-full" style={{ background: `linear-gradient(180deg, ${p.c}, ${p.c} 70%, transparent)` }} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {OFFERINGS.map((o) => (
          <button key={o.en} type="button" onClick={() => setPours((p) => [...p, { id: Date.now(), c: o.c }])} className="rounded-lg border border-white/15 bg-white/5 px-1 py-1.5 text-center hover:bg-white/10">
            <span className="mx-auto mb-1 block h-3 w-3 rounded-full" style={{ background: o.c.replace(/,\.\d+\)/, ",1)") }} />
            <span className="f-serif block text-xs text-[#fbf3e2]">{o.kn}</span>
          </button>
        ))}
      </div>
      <Hint>Pour the offerings over Bahubali, as devotees do every 12 years</Hint>
    </div>
  );
}

/* ---- Mysuru: switch on the Dasara lights ---- */
function PalaceLights() {
  const [on, setOn] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOn((v) => !v)} className="relative block h-36 w-full overflow-hidden rounded-xl" aria-pressed={on} aria-label="Switch the palace lights">
        <img src="/karnataka/photos/mysuru-palace.jpg" alt="" className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-1000" style={{ filter: on ? "none" : "grayscale(.7) brightness(.22)" }} />
        {on &&
          Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="firefly" style={{ left: `${8 + ((i * 37) % 84)}%`, top: `${30 + ((i * 23) % 45)}%`, ["--d" as string]: `${(i % 7) * 0.2}s`, ["--t" as string]: `${2 + (i % 3)}s` }} />
          ))}
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-[#ffcc00]">{on ? "≈ 97,000 ದೀಪಗಳು" : "ದೀಪ ಬೆಳಗಿಸಿ · Tap to light"}</span>
      </button>
      <Hint>On Dasara nights the whole palace is outlined in light</Hint>
    </div>
  );
}

/* ---- Kodagu: pour a filter coffee ---- */
function FilterCoffee() {
  const [level, setLevel] = useState(0);
  const timer = useRef(0);
  const stop = () => clearInterval(timer.current);
  useEffect(() => stop, []);
  const start = () => {
    stop();
    timer.current = window.setInterval(() => setLevel((l) => Math.min(100, l + 2.5)), 40);
  };
  return (
    <div className="flex items-center gap-5">
      <div className="relative mx-2 h-32 w-20">
        {/* tumbler */}
        <div className="absolute bottom-6 left-1/2 h-24 w-14 -translate-x-1/2 overflow-hidden rounded-b-lg border-2 border-[#d6dde3] bg-white/5">
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#6b3e1e] via-[#a8723e] to-[#e9cfa6] transition-[height] duration-100" style={{ height: `${level}%` }} />
          {level >= 100 && <span className="absolute inset-x-0 top-0 h-2 bg-[#f4e3c6]" />}
        </div>
        {/* davara */}
        <div className="absolute bottom-0 left-1/2 h-7 w-20 -translate-x-1/2 rounded-b-[40%] border-2 border-[#d6dde3] bg-white/5" />
        {level >= 100 && (
          <svg viewBox="0 0 40 30" className="steam absolute -top-2 left-1/2 h-10 w-12 -translate-x-1/2" aria-hidden="true">
            {[12, 20, 28].map((x) => (
              <path key={x} d={`M${x} 28 C ${x - 5} 20, ${x + 5} 12, ${x} 2`} stroke="#fbf3e2" strokeOpacity=".6" strokeWidth="2" fill="none" strokeLinecap="round" />
            ))}
          </svg>
        )}
      </div>
      <div className="flex-1">
        <p className="f-serif text-xl text-[#fbf3e2]">{level >= 100 ? "ಕಾಫಿ ಸಿದ್ಧ! ☕" : "ಡಿಕಾಕ್ಷನ್ + ಹಾಲು"}</p>
        <button
          type="button"
          onPointerDown={start}
          onPointerUp={stop}
          onPointerLeave={stop}
          onClick={() => level >= 100 && setLevel(0)}
          className="btn-silk mt-3 !px-4 !py-2 text-sm select-none"
        >
          {level >= 100 ? "Make another" : "Hold to pour"}
        </button>
        <p className="mt-2 text-[11px] text-[#fbf3e2]/55">Kodagu coffee, poured from tumbler to davara</p>
      </div>
    </div>
  );
}

/* ---- Home: sing the Nada Geethe ---- */
const GEETHE = [
  ["ಜಯ", "ಭಾರತ", "ಜನನಿಯ", "ತನುಜಾತೆ"],
  ["ಜಯಹೇ", "ಕರ್ನಾಟಕ", "ಮಾತೆ"],
];
const TUNE = [0, 4, 5, 7, 7, 5, 4, 5, 7, 12, 7]; // semitones above Sa, one per word
function NadaGeethe() {
  const [at, setAt] = useState(-1);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const words = GEETHE.flat();
  const sing = () => {
    timers.current.forEach(clearTimeout);
    timers.current = words.map((_, i) =>
      window.setTimeout(() => {
        setAt(i);
        pluck(swaraFreq(TUNE[i % TUNE.length], 220));
      }, i * 520)
    );
    timers.current.push(window.setTimeout(() => setAt(words.length), words.length * 520));
  };
  let k = -1;
  return (
    <div className="text-center">
      {GEETHE.map((line, li) => (
        <p key={li} className="f-serif text-2xl leading-snug">
          {line.map((w) => {
            k++;
            return (
              <span key={w} className={`mx-1 transition-colors duration-300 ${k <= at ? "text-[#ffcc00]" : "text-[#fbf3e2]/45"}`}>
                {w}
              </span>
            );
          })}
        </p>
      ))}
      <p className="mt-1 text-xs text-[#f6dc8c]/70">— ಕುವೆಂಪು</p>
      <button type="button" onClick={sing} className="btn-silk mt-3 !px-4 !py-2 text-sm">
        ♪ ಹಾಡೋಣ
      </button>
    </div>
  );
}

const PLAYS: Record<string, () => JSX.Element> = {
  bidar: BidriPlate,
  "gol-gumbaz": WhisperingGallery,
  badami: KasutiGrid,
  hampi: MusicalPillars,
  "jog-falls": PebbleDrop,
  "udupi-coast": Chande,
  halmidi: LetterWriter,
  shravanabelagola: Abhisheka,
  "mysuru-palace": PalaceLights,
  coorg: FilterCoffee,
  home: NadaGeethe,
};

export default function StopPlay({ id }: { id: string }) {
  const Play = PLAYS[id];
  return Play ? <Play /> : null;
}
