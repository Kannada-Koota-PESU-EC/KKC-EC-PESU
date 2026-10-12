import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { drum, echoClap, MAYAMALAVAGOWLA, pluck, stoneNote, swaraFreq } from "@/features/karunadu/audio";

/* A small game for every place on the 3D map. Each one is about that
 * place, takes under half a minute, and scores 0–10 points. */

export interface GameApi {
  playing: boolean;
  timeLeft: number;
  setPoints: (p: number) => void;
  end: (p?: number) => void;
}

const clamp10 = (n: number) => Math.max(0, Math.min(10, Math.round(n)));
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

function GameShell({
  title,
  rules,
  seconds,
  best,
  onScore,
  children,
}: {
  title: string;
  rules: string;
  seconds?: number;
  best?: number;
  onScore: (p: number) => void;
  children: (api: GameApi) => ReactNode;
}) {
  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(seconds ?? 0);
  const [result, setResult] = useState(0);
  const points = useRef(0);
  const scoreRef = useRef(onScore);
  scoreRef.current = onScore;
  const finished = useRef(false);

  const end = useCallback((p?: number) => {
    if (finished.current) return;
    finished.current = true;
    const final = clamp10(p ?? points.current);
    setResult(final);
    setPhase("done");
    scoreRef.current(final);
  }, []);
  const setPoints = useCallback((p: number) => {
    points.current = p;
  }, []);

  // the map's arrow keys rest while a game is running
  useEffect(() => {
    document.body.dataset.kdGame = phase === "play" ? "on" : "";
    return () => {
      document.body.dataset.kdGame = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "play" || !seconds) return;
    const started = performance.now();
    const id = window.setInterval(() => {
      const left = Math.max(0, seconds - (performance.now() - started) / 1000);
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(id);
        end();
      }
    }, 100);
    return () => clearInterval(id);
  }, [phase, seconds, round, end]);

  const start = () => {
    points.current = 0;
    finished.current = false;
    setTimeLeft(seconds ?? 0);
    setRound((r) => r + 1);
    setPhase("play");
  };

  const stars = Math.ceil((result / 10) * 3);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f6dc8c]">{title}</p>
        <div className="flex items-center gap-2 text-xs tabular-nums text-[#fbf3e2]/80">
          {phase === "play" && seconds ? <span className={timeLeft < 5 ? "text-[#ff5a4f]" : ""}>⏱ {timeLeft.toFixed(0)}s</span> : null}
          {best !== undefined && <span className="rounded-full bg-white/10 px-2 py-0.5">best {best}/10</span>}
        </div>
      </div>
      {phase === "ready" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <p className="max-w-sm text-sm leading-relaxed text-[#fbf3e2]/80">{rules}</p>
          <button type="button" onClick={start} className="btn-silk !px-6 !py-2.5">
            <span className="f-serif">ಆಡೋಣ</span> · Play
          </button>
        </div>
      )}
      {phase === "play" && (
        <div key={round} className="relative min-h-0 flex-1">
          {children({ playing: true, timeLeft, setPoints, end })}
        </div>
      )}
      {phase === "done" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center" style={{ animation: "kd-card-in .5s ease" }}>
          <p className="text-3xl tracking-widest text-[#ffcc00]">{"★".repeat(stars)}<span className="text-white/20">{"★".repeat(3 - stars)}</span></p>
          <p className="f-display text-4xl text-[#fbf3e2]">
            {result}
            <span className="text-lg text-[#fbf3e2]/50">/10</span>
          </p>
          <p className="f-serif text-sm text-[#f6dc8c]">{result >= 8 ? "ಅದ್ಭುತ! Brilliant!" : result >= 5 ? "ಚೆನ್ನಾಗಿದೆ! Well played!" : "ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ! Try again!"}</p>
          <button type="button" onClick={start} className="btn-line mt-1 !px-5 !py-2 text-sm">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

/* ---- Bidar: polish the Bidri plate before time runs out ---- */
function BidriGame({ setPoints, end }: GameApi) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [cover, setCover] = useState(0);
  useEffect(() => {
    const c = canvas.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    g.fillStyle = "rgba(18,19,21,0.93)";
    g.fillRect(0, 0, c.width, c.height);
    const id = window.setInterval(() => {
      const d = g.getImageData(0, 0, c.width, c.height).data;
      let open = 0;
      let all = 0;
      for (let y = 6; y < c.height; y += 12) {
        for (let x = 6; x < c.width; x += 12) {
          if ((x - 100) ** 2 + (y - 100) ** 2 > 92 ** 2) continue;
          all++;
          if (d[(y * c.width + x) * 4 + 3] < 40) open++;
        }
      }
      const f = open / all;
      setCover(f);
      setPoints(f * 10.5);
      if (f > 0.95) end(10);
    }, 250);
    return () => clearInterval(id);
  }, [setPoints, end]);
  const rub = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvas.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    const r = c.getBoundingClientRect();
    g.globalCompositeOperation = "destination-out";
    g.beginPath();
    g.arc(((e.clientX - r.left) / r.width) * c.width, ((e.clientY - r.top) / r.height) * c.height, 15, 0, Math.PI * 2);
    g.fill();
  };
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-[#3a3d42] md:h-60 md:w-60 shadow-[inset_0_0_20px_#000]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full bg-[#1d1f22]" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 50 50)`} stroke="#eef2f5" strokeWidth="1.4" fill="none">
              <path d="M50 50 C 56 38, 56 26, 50 14 C 44 26, 44 38, 50 50 Z" fill="#d6dde3" />
              <circle cx="50" cy="8" r="2.2" fill="#eef2f5" />
              <path d="M50 22 C 60 24, 66 30, 68 40" />
            </g>
          ))}
          <circle cx="50" cy="50" r="6" fill="#eef2f5" />
        </svg>
        <canvas ref={canvas} width={200} height={200} onPointerMove={rub} onPointerDown={rub} className="absolute inset-0 h-full w-full cursor-crosshair touch-none" />
      </div>
      <div className="h-1.5 w-44 overflow-hidden rounded-full bg-white/10 md:w-60">
        <div className="h-full bg-gradient-to-r from-[#9aa4ad] to-[#eef2f5]" style={{ width: `${cover * 100}%` }} />
      </div>
      <p className="text-[11px] text-[#fbf3e2]/60">Rub the blackened plate – reveal the silver inlay</p>
    </div>
  );
}

/* ---- Gol Gumbaz: count the echoes in the whispering gallery ---- */
function EchoGame({ setPoints, end }: GameApi) {
  const [round, setRound] = useState(0);
  const [echoes, setEchoes] = useState(0);
  const [ring, setRing] = useState(-1);
  const [listening, setListening] = useState(false);
  const [score, setScore] = useState(0);
  const [said, setSaid] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const listen = useCallback(() => {
    const k = 3 + Math.floor(Math.random() * 6);
    setEchoes(k);
    setSaid(null);
    setListening(true);
    echoClap(k, 0.45);
    timers.current = Array.from({ length: k + 1 }, (_, i) => window.setTimeout(() => setRing(i), i * 450));
    timers.current.push(window.setTimeout(() => setListening(false), (k + 1) * 450 + 200));
  }, []);
  useEffect(() => {
    const t = window.setTimeout(listen, 400);
    return () => clearTimeout(t);
  }, [round, listen]);
  const guess = (n: number) => {
    if (said !== null || listening) return;
    setSaid(n);
    const s = score + (n === echoes ? 3 : Math.abs(n - echoes) === 1 ? 1 : 0);
    setScore(s);
    setPoints(s + (s === 9 ? 1 : 0));
    timers.current.push(window.setTimeout(() => (round >= 2 ? end(s + (s === 9 ? 1 : 0)) : setRound((r) => r + 1)), 1200));
  };
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="relative grid h-28 w-40 place-items-center overflow-hidden rounded-t-full md:h-40 md:w-56 border-2 border-[#f6dc8c]/50 bg-[radial-gradient(circle_at_50%_90%,#3a2a20,#120a08)]">
        {Array.from({ length: Math.max(0, ring + 1) }).map((_, k) => (
          <span key={`${round}-${k}`} className="absolute inset-3 rounded-t-full border border-[#ffcc00]" style={{ animation: "pulse-ring 1.2s ease-out forwards" }} />
        ))}
        <span className="f-serif text-sm text-[#ffcc00]">{listening ? "ಆಲಿಸಿ… listen" : `Round ${round + 1} / 3`}</span>
      </div>
      <p className="text-xs text-[#fbf3e2]/75">How many echoes came back after the clap?</p>
      <div className="flex gap-1.5">
        {[3, 4, 5, 6, 7, 8].map((n) => (
          <button
            key={n}
            type="button"
            disabled={listening}
            onClick={() => guess(n)}
            className={`h-10 w-10 rounded-full border text-sm font-bold md:h-12 md:w-12 md:text-base transition-colors disabled:opacity-40 ${
              said === null ? "border-white/20 text-[#fbf3e2] hover:border-[#ffcc00]" : n === echoes ? "border-[#7ef0c2] bg-[#7ef0c2]/20 text-[#7ef0c2]" : n === said ? "border-[#ff5a4f] text-[#ff5a4f]" : "border-white/10 text-white/30"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <button type="button" disabled={listening || said !== null} onClick={listen} className="text-[11px] text-[#f6dc8c] underline disabled:opacity-30">
        Hear it again
      </button>
    </div>
  );
}

/* ---- Badami: copy the Kasuti motif – every stitch is mirrored eight ways ---- */
const N = 7;
function mirrorGroup(x: number, y: number) {
  const m = N - 1;
  const pts = [[x, y], [m - x, y], [x, m - y], [m - x, m - y], [y, x], [m - y, x], [y, m - x], [m - y, m - x]];
  return [...new Set(pts.map(([a, b]) => b * N + a))];
}
const MOTIFS = [
  [[3, 3], [2, 3], [1, 1], [3, 0]],
  [[3, 3], [2, 2], [1, 3], [0, 0]],
  [[2, 3], [1, 2], [0, 3], [2, 2]],
].map((gen) => new Set(gen.flatMap(([x, y]) => mirrorGroup(x, y))));
function KasutiGame({ setPoints, end, timeLeft }: GameApi) {
  const target = useMemo(() => MOTIFS[Math.floor(Math.random() * MOTIFS.length)], []);
  const [cells, setCells] = useState<Set<number>>(new Set());
  const tap = (x: number, y: number) => {
    const next = new Set(cells);
    const on = !cells.has(y * N + x);
    mirrorGroup(x, y).forEach((i) => (on ? next.add(i) : next.delete(i)));
    setCells(next);
    const wrong = [...next].filter((i) => !target.has(i)).length + [...target].filter((i) => !next.has(i)).length;
    setPoints(5 * Math.max(0, 1 - wrong / target.size));
    if (wrong === 0) end(4 + (timeLeft / 30) * 6);
  };
  const grid = (set: Set<number>, size: string, onTap?: (x: number, y: number) => void) => (
    <div className={`grid gap-[2px] rounded-lg bg-[#2a0613] p-1.5 ${size}`} style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
      {Array.from({ length: N * N }).map((_, i) => {
        const x = i % N;
        const y = Math.floor(i / N);
        const on = set.has(i);
        const cell = (
          <svg viewBox="0 0 10 10" className="h-full w-full">
            {on ? <path d="M1.5 1.5 L8.5 8.5 M8.5 1.5 L1.5 8.5" stroke={(x + y) % 2 ? "#ffcc00" : "#ff5a4f"} strokeWidth="2.2" strokeLinecap="round" /> : <circle cx="5" cy="5" r=".8" fill="#fbf3e2" opacity=".25" />}
          </svg>
        );
        return onTap ? (
          <button key={i} type="button" onClick={() => onTap(x, y)} className="aspect-square" aria-label={`Stitch ${x + 1},${y + 1}`}>
            {cell}
          </button>
        ) : (
          <span key={i} className="aspect-square">
            {cell}
          </span>
        );
      })}
    </div>
  );
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <div className="text-center">
        {grid(target, "w-24 md:w-32")}
        <p className="mt-1 text-[10px] text-[#fbf3e2]/60">Copy this</p>
      </div>
      <div className="text-center">
        {grid(cells, "w-48 md:w-64", tap)}
        <p className="mt-1 text-[10px] text-[#fbf3e2]/60">Tap to stitch</p>
      </div>
    </div>
  );
}

/* ---- Hampi: repeat the tune of the musical pillars ---- */
const PILLARS = MAYAMALAVAGOWLA.slice(0, 7);
function PillarGame({ setPoints, end }: GameApi) {
  const [seq, setSeq] = useState<number[]>(() => [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)]);
  const [lit, setLit] = useState<number | null>(null);
  const [showing, setShowing] = useState(true);
  const [pos, setPos] = useState(0);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const strike = (i: number) => {
    stoneNote(swaraFreq(PILLARS[i].semitone, 330));
    setLit(i);
    timers.current.push(window.setTimeout(() => setLit((l) => (l === i ? null : l)), 260));
  };
  useEffect(() => {
    setShowing(true);
    setPos(0);
    timers.current = seq.map((n, k) => window.setTimeout(() => strike(n), 600 + k * 600));
    timers.current.push(window.setTimeout(() => setShowing(false), 600 + seq.length * 600));
    return () => timers.current.forEach(clearTimeout);
  }, [seq]);
  const tap = (i: number) => {
    if (showing) return;
    strike(i);
    if (i !== seq[pos]) {
      end((seq.length - 2) * 2);
      return;
    }
    if (pos + 1 === seq.length) {
      const done = seq.length - 1;
      setPoints(done * 2);
      if (done >= 5) end(10);
      else timers.current.push(window.setTimeout(() => setSeq((s) => [...s, Math.floor(Math.random() * 7)]), 700));
    } else setPos(pos + 1);
  };
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <p className="text-xs text-[#fbf3e2]/75">{showing ? "ಆಲಿಸಿ – watch and listen…" : `Your turn: ${pos} / ${seq.length}`}</p>
      <div className="flex items-end gap-1.5 md:gap-2.5 md:[--pillar:1.35]">
        {PILLARS.map((n, i) => (
          <button
            key={i}
            type="button"
            onPointerDown={() => tap(i)}
            className={`flex w-9 flex-col items-center rounded-t-md md:w-12 border border-[#c9b79a]/40 bg-gradient-to-b from-[#b8a88c] to-[#6e6150] pb-1 transition-all duration-150 ${lit === i ? "translate-y-1 brightness-150 shadow-[0_0_24px_rgba(255,204,0,.8)]" : ""}`}
            style={{ height: `calc(${130 - i * 7}px * var(--pillar, 1))` }}
            aria-label={`Pillar ${n.swara}`}
          >
            <span className="f-serif mt-auto text-sm font-bold text-[#1a0a06]">{n.swara}</span>
          </button>
        ))}
      </div>
      <div className="h-2 w-72 rounded bg-[#6e6150] md:w-96" />
      <p className="text-[11px] text-[#fbf3e2]/60">Round {seq.length - 1} of 5 · granite that sings, like the Vittala temple</p>
    </div>
  );
}

/* ---- Jog: stop the pebble right at the pool, 253 m below ---- */
function JogGame({ setPoints, end }: GameApi) {
  const H = 253;
  const [drop, setDrop] = useState(0);
  const [h, setH] = useState(0);
  const [stopped, setStopped] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const raf = useRef(0);
  useEffect(() => {
    setStopped(null);
    setH(0);
    const start = performance.now() + 500;
    const step = () => {
      const t = Math.max(0, (performance.now() - start) / 1000);
      const fallen = 0.5 * 9.81 * (t * 3) ** 2; // 3× faster than real life
      setH(fallen);
      if (fallen < H + 25) raf.current = requestAnimationFrame(step);
      else setStopped((s) => (s === null ? fallen : s));
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [drop]);
  useEffect(() => {
    if (stopped === null) return;
    const pts = stopped > H ? 0 : Math.max(0, 10 - (H - stopped) / 6);
    const next = [...scores, pts];
    setScores(next);
    const avg = next.reduce((a, b) => a + b, 0) / next.length;
    setPoints(avg);
    const t = window.setTimeout(() => (next.length >= 3 ? end(avg) : setDrop((d) => d + 1)), 1100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopped]);
  const stop = () => {
    if (stopped !== null || h <= 0) return;
    cancelAnimationFrame(raf.current);
    setStopped(h);
  };
  const shown = Math.min(h, H + 25);
  return (
    <div className="flex h-full items-center justify-center gap-5" onPointerDown={stop}>
      <div className="relative h-56 w-20 overflow-hidden rounded-md bg-gradient-to-b from-[#2c4a3a] to-[#0d1a12] md:h-72 md:w-28">
        {[16, 26, 36, 46].map((x) => (
          <span key={x} className="absolute top-0 h-full w-[3px] bg-gradient-to-b from-white/70 to-white/15" style={{ left: `${x}%` }} />
        ))}
        <span className="absolute inset-x-0 bottom-0 h-[9%] bg-[#1d7f86]/80" />
        <span className="absolute inset-x-0 border-t border-dashed border-[#ffcc00]" style={{ top: `${(H / (H + 25)) * 100}%` }} />
        <span className="absolute left-[72%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#e8e2d4] shadow" style={{ top: `${(shown / (H + 25)) * 100 - 2}%` }} />
      </div>
      <div className="w-36">
        <p className="f-display text-3xl tabular-nums text-[#fbf3e2]">{Math.min(H + 25, h).toFixed(0)} m</p>
        <p className="text-xs text-[#fbf3e2]/65">Drop {Math.min(3, scores.length + (stopped === null ? 1 : 0))} of 3</p>
        <p className="mt-2 text-xs text-[#fbf3e2]/80">
          {stopped === null ? "Tap anywhere to stop it at the gold line" : stopped > H ? "Splash! Too late" : `${(H - stopped).toFixed(0)} m short`}
        </p>
        <p className="mt-2 text-[10px] text-[#fbf3e2]/50">Real life: ~7.2 s to fall 253 m (shown 3× faster)</p>
      </div>
    </div>
  );
}

/* ---- Karavali: Kambala – drive your buffaloes through the slush ---- */
function KambalaGame({ setPoints, end }: GameApi) {
  const [me, setMe] = useState(0);
  const [rival, setRival] = useState(0);
  const race = useRef({ me: 0, rival: 0, over: false });
  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      const r = race.current;
      r.rival = Math.min(1, (performance.now() - start) / 9000);
      setRival(r.rival);
      if (r.rival >= 1 && !r.over) {
        r.over = true;
        end(r.me * 6);
      }
    }, 50);
    return () => clearInterval(id);
  }, [end]);
  const push = useCallback(() => {
    const r = race.current;
    if (r.over) return;
    drum(Math.random() < 0.5);
    r.me = Math.min(1, r.me + 0.024);
    setMe(r.me);
    setPoints(r.me * 6);
    if (r.me >= 1) {
      r.over = true;
      end(6 + (1 - r.rival) * 12);
    }
  }, [setPoints, end]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        push();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [push]);
  const lane = (p: number, label: string, mine: boolean) => (
    <div className="relative h-14 overflow-hidden rounded-lg bg-gradient-to-r md:h-20 from-[#5a3a1a] via-[#6b4a22] to-[#5a3a1a]">
      <span className="absolute inset-y-0 right-3 w-1 bg-[repeating-linear-gradient(180deg,#fff_0_6px,#d6262b_6px_12px)]" />
      <span className="absolute left-2 top-1 text-[10px] text-white/60">{label}</span>
      {mine && p > 0 && <span className="absolute top-1/2 h-6 w-10 -translate-y-1/2 rounded-full bg-[#c9a36a]/50 blur-sm" style={{ left: `calc(${p * 86}% - 22px)` }} />}
      <span className="absolute top-1/2 text-3xl" style={{ left: `${p * 86}%`, transform: "translateY(-50%) scaleX(-1)" }}>
        🐃
      </span>
    </div>
  );
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {lane(rival, "Rival pair", false)}
      {lane(me, "Your pair", true)}
      <button type="button" onPointerDown={push} className="btn-silk mt-1 select-none self-center !px-8 !py-3 text-base">
        <span className="f-serif">ಓಡು!</span> · Tap fast (or Space)
      </button>
      <p className="text-center text-[11px] text-[#fbf3e2]/60">Kambala: buffalo racing through flooded paddy fields</p>
    </div>
  );
}

/* ---- Halmidi: read the letters that grew from this stone ---- */
const SOUNDS: [string, string][] = [
  ["a", "ಅ"], ["ā", "ಆ"], ["i", "ಇ"], ["ī", "ಈ"], ["u", "ಉ"], ["ū", "ಊ"], ["e", "ಎ"], ["ē", "ಏ"], ["ai", "ಐ"], ["o", "ಒ"], ["ō", "ಓ"], ["au", "ಔ"],
  ["ka", "ಕ"], ["kha", "ಖ"], ["ga", "ಗ"], ["gha", "ಘ"], ["ca", "ಚ"], ["ja", "ಜ"], ["ṭa", "ಟ"], ["ḍa", "ಡ"], ["ṇa", "ಣ"], ["ta", "ತ"], ["da", "ದ"],
  ["na", "ನ"], ["pa", "ಪ"], ["ba", "ಬ"], ["bha", "ಭ"], ["ma", "ಮ"], ["ya", "ಯ"], ["ra", "ರ"], ["la", "ಲ"], ["va", "ವ"], ["śa", "ಶ"], ["sa", "ಸ"], ["ha", "ಹ"], ["ḷa", "ಳ"],
];
function LetterGame({ setPoints, end }: GameApi) {
  const [q, setQ] = useState(0);
  const [right, setRight] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const round = useMemo(() => {
    const pick = shuffle(SOUNDS).slice(0, 4);
    return { ask: pick[0], options: shuffle(pick) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);
  const answer = (l: string) => {
    if (flash) return;
    const ok = l === round.ask[1];
    const r = right + (ok ? 1 : 0);
    setRight(r);
    setPoints(r);
    setFlash(l);
    window.setTimeout(() => {
      setFlash(null);
      if (q >= 9) end(r);
      else setQ(q + 1);
    }, 450);
  };
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <p className="text-xs text-[#fbf3e2]/70">
        {q + 1} / 10 · ✓ {right}
      </p>
      <p className="text-sm text-[#fbf3e2]/80">Which letter says</p>
      <p className="f-display -mt-2 text-5xl text-[#ffcc00]">“{round.ask[0]}”</p>
      <div className="grid grid-cols-4 gap-2">
        {round.options.map(([, l]) => (
          <button
            key={l}
            type="button"
            onClick={() => answer(l)}
            className={`f-serif grid h-16 w-16 place-items-center rounded-xl border text-3xl md:h-20 md:w-20 md:text-4xl transition-colors ${
              flash === null ? "border-white/15 bg-white/5 text-[#fbf3e2] hover:border-[#ffcc00]" : l === round.ask[1] ? "border-[#7ef0c2] bg-[#7ef0c2]/20 text-[#7ef0c2]" : l === flash ? "border-[#ff5a4f] text-[#ff5a4f]" : "border-white/10 text-white/30"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-[#fbf3e2]/55">These letters grew from the script on the Halmidi stone (c. 450 CE)</p>
    </div>
  );
}

/* ---- Shravanabelagola: climb Vindhyagiri, left foot, right foot ---- */
function ClimbGame({ setPoints, end }: GameApi) {
  const TOP = 620;
  const [steps, setSteps] = useState(0);
  const [last, setLast] = useState<"L" | "R" | null>(null);
  const [slip, setSlip] = useState(false);
  const stepRef = useRef({ steps: 0, last: null as "L" | "R" | null });
  const foot = useCallback(
    (f: "L" | "R") => {
      const s = stepRef.current;
      if (s.last === f) {
        s.steps = Math.max(0, s.steps - 10);
        setSlip(true);
        window.setTimeout(() => setSlip(false), 250);
      } else s.steps = Math.min(TOP, s.steps + 10);
      s.last = f;
      setSteps(s.steps);
      setLast(f);
      setPoints((s.steps / TOP) * 10);
      if (s.steps >= TOP) end(10);
    },
    [setPoints, end]
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "a" || e.key === "A") foot("L");
      if (e.key === "d" || e.key === "D") foot("R");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [foot]);
  const p = steps / TOP;
  return (
    <div className="flex h-full items-center justify-center gap-5">
      <div className="relative h-56 w-36 overflow-hidden rounded-xl md:h-72 md:w-48">
        <img src="/karnataka/photos/shravanabelagola.jpg" alt="" className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-300" style={{ filter: `brightness(${0.35 + p * 0.75}) saturate(${0.4 + p})` }} />
        <svg viewBox="0 0 100 160" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M10 155 L30 135 L22 115 L45 95 L35 75 L58 55 L50 35 L70 15" stroke="#fbf3e2" strokeOpacity=".5" strokeWidth="2" strokeDasharray="3 3" fill="none" />
        </svg>
        <span className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#ffcc00] transition-all duration-150 ${slip ? "bg-[#ff5a4f]" : ""}`} style={{ left: `${10 + p * 60}%`, top: `${97 - p * 88}%` }} />
      </div>
      <div className="w-40">
        <p className="f-display text-3xl tabular-nums text-[#fbf3e2]">{steps}</p>
        <p className="text-xs text-[#fbf3e2]/65">of about {TOP} steps</p>
        <div className="mt-3 flex gap-2">
          {(["L", "R"] as const).map((f) => (
            <button key={f} type="button" onPointerDown={() => foot(f)} className={`h-14 flex-1 select-none rounded-xl border text-sm font-bold ${last === f ? "border-[#ffcc00]/60 bg-[#ffcc00]/15 text-[#ffcc00]" : "border-white/20 bg-white/5 text-[#fbf3e2]"}`}>
              {f === "L" ? "ಎಡ · L" : "ಬಲ · R"}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-[#fbf3e2]/55">Alternate feet (or A / D keys). Same foot twice = slip!</p>
      </div>
    </div>
  );
}

/* ---- Mysuru: Jamboo Savari – lead the Dasara elephant up the palace road ---- */
type Thing = { id: number; lane: number; y: number; garland: boolean; hit?: boolean };
function JambooGame({ setPoints }: GameApi) {
  const [lane, setLane] = useState(1);
  const [things, setThings] = useState<Thing[]>([]);
  const [score, setScore] = useState({ garlands: 0, bumps: 0 });
  const [stumble, setStumble] = useState(false);
  const [near, setNear] = useState(0); // 0 → 1 as the palace comes closer
  const game = useRef({ lane: 1, things: [] as Thing[], id: 0, garlands: 0, bumps: 0, spawn: 0, start: 0 });

  const move = useCallback((d: number) => {
    const g = game.current;
    g.lane = Math.max(0, Math.min(2, g.lane + d));
    setLane(g.lane);
  }, []);

  useEffect(() => {
    const g = game.current;
    let raf = 0;
    let last = performance.now();
    g.start = last;
    const step = (now: number) => {
      // real elapsed time, so the procession moves at the same pace on slow devices
      const dt = Math.min(0.25, (now - last) / 1000);
      last = now;
      const t = (now - g.start) / 1000;
      const speed = 0.42 + t * 0.018; // the procession picks up pace
      g.spawn -= dt;
      if (g.spawn <= 0) {
        g.spawn = 0.55 - Math.min(0.2, t * 0.008);
        g.things.push({ id: g.id++, lane: Math.floor(Math.random() * 3), y: -0.1, garland: Math.random() < 0.68 });
      }
      g.things.forEach((th) => {
        th.y += speed * dt;
        // the elephant walks at y ≈ 0.82
        if (!th.hit && th.lane === g.lane && th.y > 0.74 && th.y < 0.9) {
          th.hit = true;
          if (th.garland) {
            g.garlands++;
            pluck(swaraFreq([0, 4, 7, 12][g.garlands % 4], 262));
          } else {
            g.bumps++;
            drum(true);
            setStumble(true);
            window.setTimeout(() => setStumble(false), 300);
          }
          setScore({ garlands: g.garlands, bumps: g.bumps });
          setPoints(Math.max(0, g.garlands - g.bumps * 2) / 2);
        }
      });
      g.things = g.things.filter((th) => th.y < 1.1 && !(th.hit && th.garland));
      setThings([...g.things]);
      setNear(Math.min(1, t / 25));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        move(-1);
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        move(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [move, setPoints]);

  const laneX = (l: number) => `${18 + l * 32}%`;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div
        className="relative h-56 w-full max-w-md touch-none select-none overflow-hidden rounded-xl md:h-72"
        onPointerDown={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          move(e.clientX - r.left < r.width / 2 ? -1 : 1);
        }}
      >
        {/* the palace at the end of the road, coming closer */}
        <img
          src="/karnataka/photos/mysuru-palace.jpg"
          alt=""
          className="absolute inset-x-0 top-0 h-[45%] w-full object-cover"
          style={{ transform: `scale(${1 + near * 0.35})`, transformOrigin: "50% 30%", filter: `brightness(${0.55 + near * 0.5})` }}
        />
        <div className="absolute inset-x-0 top-[38%] h-[10%] bg-gradient-to-b from-transparent to-[#3a2416]" />
        {/* the road, with lamp posts */}
        <div className="absolute inset-x-0 bottom-0 top-[45%] bg-gradient-to-b from-[#3a2416] to-[#5a3a22]">
          {[1, 2].map((k) => (
            <span key={k} className="absolute inset-y-0 w-px bg-[repeating-linear-gradient(180deg,#f6dc8c_0_10px,transparent_10px_22px)] opacity-40" style={{ left: `${2 + k * 32}%` }} />
          ))}
        </div>
        {[0, 1].map((side) => (
          <span key={side} className="absolute top-[46%] h-2 w-2 rounded-full bg-[#ffd24a] shadow-[0_0_12px_4px_rgba(255,200,60,.7)]" style={{ [side ? "right" : "left"]: "3%" }} />
        ))}
        {things.map((th) =>
          th.y < 0.45 && th.y > -0.05 ? null : (
            <span key={th.id} className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity" style={{ left: laneX(th.lane), top: `${th.y * 100}%`, opacity: th.hit ? 0.3 : 1 }}>
              {th.garland ? (
                <svg viewBox="0 0 40 40" className="h-9 w-9" aria-label="Marigold garland">
                  {Array.from({ length: 12 }).map((_, k) => (
                    <circle key={k} cx={20 + 13 * Math.cos((k * Math.PI) / 6)} cy={20 + 13 * Math.sin((k * Math.PI) / 6)} r="5" fill={k % 2 ? "#ff9f1c" : "#ffcc00"} stroke="#c25e00" strokeWidth=".8" />
                  ))}
                </svg>
              ) : (
                <svg viewBox="0 0 60 30" className="h-7 w-14" aria-label="Barrier">
                  <rect x="2" y="6" width="56" height="10" rx="2" fill="#fff" />
                  {[0, 1, 2, 3].map((k) => (
                    <rect key={k} x={4 + k * 14} y="6" width="7" height="10" fill="#d6262b" />
                  ))}
                  <rect x="8" y="16" width="4" height="12" fill="#6b4a2a" />
                  <rect x="48" y="16" width="4" height="12" fill="#6b4a2a" />
                </svg>
              )}
            </span>
          )
        )}
        {/* the elephant with the golden howdah */}
        <span className={`absolute top-[82%] -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150 ${stumble ? "animate-pulse" : ""}`} style={{ left: laneX(lane) }}>
          <span className="relative block">
            <svg viewBox="0 0 40 28" className="absolute -top-5 left-1/2 h-6 w-8 -translate-x-1/2" aria-hidden="true">
              <path d="M6 26 V14 Q20 -2 34 14 V26 Z" fill="#ffcc00" stroke="#8a5a14" strokeWidth="2" />
              <path d="M20 2 V-4" stroke="#ffcc00" strokeWidth="2" />
              <rect x="4" y="22" width="32" height="5" fill="#d6262b" />
            </svg>
            <span className="block text-4xl md:text-5xl" style={{ transform: "scaleX(-1)" }}>
              🐘
            </span>
          </span>
        </span>
        <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-[#ffcc00]">
          🌼 {score.garlands}
          {score.bumps ? <span className="ml-2 text-[#ff5a4f]">✕ {score.bumps}</span> : null}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onPointerDown={() => move(-1)} className="h-10 w-14 select-none rounded-full border border-white/20 bg-white/5 text-[#fbf3e2]" aria-label="Move left">
          ◀
        </button>
        <p className="text-[11px] text-[#fbf3e2]/60">Collect garlands, dodge barriers</p>
        <button type="button" onPointerDown={() => move(1)} className="h-10 w-14 select-none rounded-full border border-white/20 bg-white/5 text-[#fbf3e2]" aria-label="Move right">
          ▶
        </button>
      </div>
    </div>
  );
}

/* ---- Kodagu: pick only the ripe red coffee cherries ---- */
function CoffeeGame({ setPoints }: GameApi) {
  const [berries, setBerries] = useState<{ id: number; x: number; y: number; ripe: boolean; born: number }[]>([]);
  const [score, setScore] = useState(0);
  const [pop, setPop] = useState<{ id: number; ok: boolean } | null>(null);
  const idRef = useRef(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      const now = performance.now();
      setBerries((b) => [
        ...b.filter((x) => now - x.born < 1300),
        { id: idRef.current++, x: 8 + Math.random() * 84, y: 12 + Math.random() * 70, ripe: Math.random() < 0.7, born: now },
      ]);
    }, 420);
    return () => clearInterval(id);
  }, []);
  const pick = (id: number, ripe: boolean) => {
    setBerries((b) => b.filter((x) => x.id !== id));
    setPop({ id, ok: ripe });
    const n = Math.max(0, score + (ripe ? 1 : -2));
    setScore(n);
    setPoints(n / 2.5);
  };
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="relative h-52 w-full max-w-md overflow-hidden rounded-xl md:h-72 bg-[radial-gradient(circle_at_30%_20%,#2f5d34,#0f2414)]">
        <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
          <path d="M0 80 C 80 60, 160 110, 300 70" stroke="#4a3220" strokeWidth="6" fill="none" />
          {Array.from({ length: 9 }).map((_, i) => (
            <ellipse key={i} cx={20 + i * 33} cy={i % 2 ? 60 : 100} rx="22" ry="9" fill="#3f8a3a" transform={`rotate(${i % 2 ? -25 : 25} ${20 + i * 33} ${i % 2 ? 60 : 100})`} />
          ))}
        </svg>
        {berries.map((b) => (
          <button
            key={b.id}
            type="button"
            onPointerDown={() => pick(b.id, b.ripe)}
            className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg md:h-10 md:w-10"
            style={{ left: `${b.x}%`, top: `${b.y}%`, background: b.ripe ? "radial-gradient(circle at 35% 30%, #ff8a7a, #c4161c 60%, #6b0a0d)" : "radial-gradient(circle at 35% 30%, #c8f08a, #4f9a2a 60%, #24501a)", animation: "kd-card-in .25s ease" }}
            aria-label={b.ripe ? "Ripe cherry" : "Unripe cherry"}
          />
        ))}
        {pop && (
          <span key={pop.id} className="pointer-events-none absolute right-3 top-2 text-sm font-bold" style={{ color: pop.ok ? "#7ef0c2" : "#ff5a4f", animation: "kd-card-in .3s ease" }}>
            {pop.ok ? "+1" : "−2"}
          </span>
        )}
      </div>
      <p className="text-xs tabular-nums text-[#fbf3e2]/80">Picked: {score}</p>
      <p className="text-[11px] text-[#fbf3e2]/60">Kodagu's coffee is hand-picked – only the red ones are ripe!</p>
    </div>
  );
}

/* ---- Home: put the Nada Geethe back in order ---- */
const LINES = [
  ["ಜಯ", "ಭಾರತ", "ಜನನಿಯ", "ತನುಜಾತೆ"],
  ["ಜಯಹೇ", "ಕರ್ನಾಟಕ", "ಮಾತೆ"],
];
const TUNE = [0, 4, 5, 7, 7, 5, 4];
function GeetheGame({ setPoints, end }: GameApi) {
  const words = useMemo(() => LINES.flat(), []);
  const pool = useMemo(() => shuffle(words.map((w, i) => ({ w, i }))), [words]);
  const [placed, setPlaced] = useState(0);
  const [miss, setMiss] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const tap = (i: number) => {
    if (i === placed) {
      pluck(swaraFreq(TUNE[i % TUNE.length], 220));
      const n = placed + 1;
      setPlaced(n);
      setPoints((n / words.length) * 6);
      if (n === words.length) end(Math.max(0, 10 - miss * 2));
    } else {
      setMiss((m) => m + 1);
      setWrong(i);
      window.setTimeout(() => setWrong(null), 350);
    }
  };
  let k = -1;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="min-h-[72px] text-center">
        {LINES.map((line, li) => (
          <p key={li} className="f-serif text-2xl leading-snug md:text-3xl">
            {line.map((w) => {
              k++;
              return (
                <span key={w} className={`mx-1 ${k < placed ? "text-[#ffcc00]" : "text-white/15"}`}>
                  {k < placed ? w : "____"}
                </span>
              );
            })}
          </p>
        ))}
      </div>
      <div className="flex max-w-md flex-wrap justify-center gap-2">
        {pool.map(({ w, i }) =>
          i < placed ? null : (
            <button key={w} type="button" onClick={() => tap(i)} className={`f-serif rounded-full border px-3 py-1.5 text-lg transition-colors md:px-4 md:py-2 md:text-xl ${wrong === i ? "border-[#ff5a4f] text-[#ff5a4f]" : "border-white/20 bg-white/5 text-[#fbf3e2] hover:border-[#ffcc00]"}`}>
              {w}
            </button>
          )
        )}
      </div>
      <p className="text-[11px] text-[#fbf3e2]/60">Tap the words in order – Nada Geethe by Kuvempu · mistakes: {miss}</p>
    </div>
  );
}

const GAMES: Record<string, { title: string; rules: string; seconds?: number; Game: (api: GameApi) => JSX.Element }> = {
  bidar: { title: "Polish the Bidri plate", rules: "Bidriware is blackened with soil from this very fort. Rub the plate to reveal the silver inlay before the time runs out.", seconds: 12, Game: BidriGame },
  "gol-gumbaz": { title: "Count the echoes", rules: "Under the great dome a single clap comes back again and again. Listen, then count the echoes. 3 rounds – turn your sound on!", Game: EchoGame },
  badami: { title: "Kasuti stitch match", rules: "Kasuti from the Badami–Dharwad region is perfectly symmetric. Copy the motif – each stitch is mirrored eight ways.", seconds: 30, Game: KasutiGame },
  hampi: { title: "Musical pillars", rules: "The pillars of the Vittala temple ring when struck. Watch the tune, then play it back. It grows each round.", Game: PillarGame },
  "jog-falls": { title: "Stop at the pool", rules: "A pebble falls 253 m down Jog Falls. Tap to stop it as close as you can to the pool line – without going past. 3 drops.", Game: JogGame },
  "udupi-coast": { title: "Kambala race", rules: "Drive your buffalo pair through the slushy paddy field. Tap as fast as you can and beat the rival to the flag!", Game: KambalaGame },
  halmidi: { title: "Read the old letters", rules: "Kannada letters grew from the script carved on the Halmidi stone. Match each sound to its letter – 10 questions.", seconds: 30, Game: LetterGame },
  shravanabelagola: { title: "Climb Vindhyagiri", rules: "About 620 rock-cut steps lead up to Bahubali. Tap left, right, left, right to climb before time runs out.", seconds: 20, Game: ClimbGame },
  "mysuru-palace": {
    title: "Jamboo Savari",
    rules: "Lead the Dasara elephant with the golden howdah up the road to the palace. Move left and right (tap, ◀ ▶ or arrow keys) to collect marigold garlands and dodge the barriers!",
    seconds: 25,
    Game: JambooGame,
  },
  coorg: { title: "Coffee picking", rules: "Pick only the ripe red coffee cherries. Green ones cost you points!", seconds: 20, Game: CoffeeGame },
  home: { title: "Nada Geethe in order", rules: "Put the opening words of our state song back in order. Each right word plays a note.", seconds: 30, Game: GeetheGame },
};

export default function StopPlay({ id, best, onScore }: { id: string; best?: number; onScore: (p: number) => void }) {
  const g = GAMES[id];
  if (!g) return null;
  const { Game } = g;
  return (
    <GameShell title={g.title} rules={g.rules} seconds={g.seconds} best={best} onScore={onScore}>
      {(api) => <Game {...api} />}
    </GameShell>
  );
}
