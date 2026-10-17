import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Castle, Check, ChevronDown, ChevronLeft, ChevronRight, Coffee, Crown, Droplets, GraduationCap, Landmark, MountainSnow, PersonStanding, ScrollText, Shield, Star, Waves, X as Wrong,
  type LucideIcon,
} from "lucide-react";
import { JOURNEY } from "@/features/karunadu3d/data/journey";
import { KIND_LABEL, STOP_INFO } from "@/features/karunadu3d/data/stops";
import type { KarnatakaScene } from "@/features/karunadu3d/three/scene";
import KarnatakaIcon from "@/features/karunadu3d/KarnatakaIcon";
import StopPlay from "@/features/karunadu3d/StopPlay";

/* ಕರುನಾಡು 3D. Scrolling flies the camera across the real terrain; at every
 * place a pin drops and a large card opens beside it with the story, a
 * game about that place and one question. Nothing inside the card scrolls. */

const ICONS: Record<string, LucideIcon> = {
  bidar: Shield,
  "gol-gumbaz": Landmark,
  badami: MountainSnow,
  hampi: Castle,
  "jog-falls": Droplets,
  "udupi-coast": Waves,
  halmidi: ScrollText,
  shravanabelagola: PersonStanding,
  "mysuru-palace": Crown,
  coorg: Coffee,
  home: GraduationCap,
};

type Tab = "story" | "play" | "quiz";
const TABS: { id: Tab; kn: string; en: string }[] = [
  { id: "story", kn: "ಕಥೆ", en: "Story" },
  { id: "play", kn: "ಆಟ", en: "Game" },
  { id: "quiz", kn: "ಪ್ರಶ್ನೆ", en: "Quiz" },
];

const n = JOURNEY.length;
const TOP = 136; // header + score row
const PIN = 64;
const QUIZ_POINTS = 5;

/* where the place should sit on screen, and where the card goes */
interface Layout {
  wide: boolean;
  W: number;
  H: number;
  pin: { x: number; y: number }; // fractions of the screen
  card: { left: number; top: number; width: number; height: number };
}
function computeLayout(W: number, H: number): Layout {
  const landscape = W >= 900 && W / H > 1.15;
  if (landscape) {
    const pin = { x: 0.72, y: 0.62 };
    const width = Math.min(860, pin.x * W - 32 - 110);
    return { wide: true, W, H, pin, card: { left: 32, top: TOP, width, height: Math.min(620, H - TOP - 22) } };
  }
  const pin = { x: 0.5, y: 0.9 };
  return { wide: false, W, H, pin, card: { left: 12, top: TOP, width: W - 24, height: Math.max(300, pin.y * H - PIN - 18 - TOP) } };
}

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** scroll progress (0..1) that parks the camera at stop i (-1 = overview) */
const progressFor = (i: number) => (i < 0 ? 0 : Math.min(1, (i + 1.15) / n));
/** same rule the camera uses, for when there is no 3D */
const activeFor = (p: number) => Math.min(n - 1, Math.floor(p * n * 0.9999 + 0.65) - 1);

function Story({ index, wide, onPlay }: { index: number; wide: boolean; onPlay: () => void }) {
  const stop = JOURNEY[index];
  const info = STOP_INFO[stop.id];
  return (
    <div className={`flex h-full flex-col ${wide ? "gap-3" : "gap-2"}`}>
      <p className={`${wide ? "text-base leading-relaxed" : "text-[13px] leading-snug"} text-[#fbf3e2]/85`}>{info.about}</p>
      <dl className="grid grid-cols-3 gap-2">
        {info.facts.map(([k, v]) => (
          <div key={k} className="rounded-xl border border-[#f6dc8c]/15 bg-white/[0.04] p-2">
            <dt className="text-[10px] uppercase tracking-wider text-[#f6dc8c]/75">{k}</dt>
            <dd className={`mt-0.5 font-semibold leading-snug text-[#fbf3e2] ${wide ? "text-sm" : "text-[11px]"}`}>{v}</dd>
          </div>
        ))}
      </dl>
      <ul className="flex flex-wrap gap-1.5">
        {info.culture.slice(0, wide ? 7 : 4).map((c) => (
          <li key={c.en} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1.5 pr-2.5" title={c.en}>
            <span className="f-serif rounded-full px-1.5 text-[10px] font-bold text-[#1a0a06]" style={{ background: KIND_LABEL[c.kind].color }}>
              {KIND_LABEL[c.kind].kn}
            </span>
            <span className="f-serif text-xs text-[#fbf3e2]">{c.kn}</span>
            {wide && <span className="text-[10px] text-[#fbf3e2]/55">{c.en}</span>}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-3">
        <button type="button" onClick={onPlay} className="btn-silk !px-4 !py-2 text-sm">
          ▶ <span className="f-serif">ಆಡಿ</span> · {info.play}
        </button>
        {stop.id === "home" && (
          <Link to="/team" className="btn-line !px-4 !py-2 text-sm">
            Meet Our Team
          </Link>
        )}
      </div>
    </div>
  );
}

function Quiz({ id, picked, answer }: { id: string; picked?: number; answer: (c: number) => void }) {
  const info = STOP_INFO[id];
  const done = picked !== undefined;
  return (
    <div className="flex h-full flex-col">
      <p className="text-base font-semibold text-[#fbf3e2]">{info.quiz.q}</p>
      <div className="mt-3 space-y-2">
        {info.quiz.options.map((o, i) => {
          const right = i === info.quiz.answer;
          const state = !done ? "" : right ? "border-[#7ef0c2] bg-[#7ef0c2]/15" : picked === i ? "border-[#ff5a4f] bg-[#ff5a4f]/15" : "opacity-50";
          return (
            <button
              key={o}
              type="button"
              disabled={done}
              onClick={() => answer(i)}
              className={`flex w-full items-center justify-between rounded-xl border border-white/15 px-4 py-2.5 text-left text-sm text-[#fbf3e2] transition-colors hover:border-[#ffcc00] ${state}`}
            >
              {o}
              {done && right && <Check className="h-4 w-4 text-[#7ef0c2]" />}
              {done && !right && picked === i && <Wrong className="h-4 w-4 text-[#ff5a4f]" />}
            </button>
          );
        })}
      </div>
      {done && (
        <p className="mt-3 rounded-xl bg-white/5 p-3 text-xs leading-relaxed text-[#fbf3e2]/80" style={{ animation: "kd-card-in .5s ease" }}>
          <span className="font-bold text-[#ffcc00]">{picked === info.quiz.answer ? `ಸರಿ! +${QUIZ_POINTS} points. ` : "ಅಯ್ಯೋ! Not quite. "}</span>
          {info.quiz.why}
        </p>
      )}
    </div>
  );
}

function StopCard({
  index,
  layout,
  tab,
  setTab,
  answers,
  answer,
  best,
  onScore,
}: {
  index: number;
  layout: Layout;
  tab: Tab;
  setTab: (t: Tab) => void;
  answers: Record<string, number>;
  answer: (id: string, choice: number) => void;
  best: Record<string, number>;
  onScore: (id: string, p: number) => void;
}) {
  const stop = JOURNEY[index];
  const info = STOP_INFO[stop.id];
  const wide = layout.wide && layout.card.width >= 680;

  const header = (
    <>
      <span className="rounded-full bg-black/55 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f6dc8c] backdrop-blur">
        {String(index + 1).padStart(2, "0")} / {n} · <span className="f-serif normal-case tracking-normal">{info.regionKn}</span>
      </span>
      <p className={`f-serif mt-2 font-bold leading-tight text-white ${wide ? "text-4xl" : "text-2xl"}`}>{stop.kn}</p>
      <p className="text-xs text-white/75">{stop.en}</p>
      {wide && <p className="f-serif mt-2 text-base text-[#f6dc8c]">{info.tagline}</p>}
    </>
  );

  const tabs = (
    <div className="flex shrink-0 gap-1 rounded-full bg-white/5 p-1" role="tablist">
      {TABS.map((t) => {
        const mark = t.id === "quiz" ? answers[stop.id] !== undefined : t.id === "play" ? best[stop.id] !== undefined : false;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-1 items-center justify-center gap-1 rounded-full px-2 py-1.5 text-xs transition-colors ${tab === t.id ? "bg-[#ffcc00] font-bold text-[#1a0a06]" : "text-[#fbf3e2]/75 hover:text-white"}`}
          >
            <span className="f-serif">{t.kn}</span>
            <span className="opacity-70">· {t.en}</span>
            {mark && <Check className="h-3 w-3" />}
          </button>
        );
      })}
    </div>
  );

  const body = (
    <div className="min-h-0 flex-1 overflow-hidden pt-3" key={tab} style={{ animation: "kd-card-in .45s cubic-bezier(.16,1,.3,1)" }}>
      {tab === "story" && <Story index={index} wide={wide} onPlay={() => setTab("play")} />}
      {tab === "play" && <StopPlay id={stop.id} best={best[stop.id]} onScore={(p) => onScore(stop.id, p)} />}
      {tab === "quiz" && <Quiz id={stop.id} picked={answers[stop.id]} answer={(c) => answer(stop.id, c)} />}
    </div>
  );

  if (wide) {
    return (
      <div className="grid h-full grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="relative overflow-hidden rounded-l-[22px]">
          {stop.photo && <img src={stop.photo} alt={stop.en} className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140a0e] via-[#140a0e]/35 to-transparent" />
          <div className="absolute inset-x-5 bottom-5">{header}</div>
        </div>
        <div className="flex min-h-0 flex-col p-5">
          {tabs}
          {body}
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col">
      <div className="relative h-28 shrink-0 overflow-hidden rounded-t-[22px]">
        {stop.photo && <img src={stop.photo} alt={stop.en} className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140a0e] via-[#140a0e]/45 to-transparent" />
        <div className="absolute inset-x-4 bottom-2">{header}</div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3">
        {tabs}
        {body}
      </div>
    </div>
  );
}

export default function Journey3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<KarnatakaScene | null>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pinRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<SVGPathElement>(null);
  const layoutRef = useRef<Layout>(computeLayout(1440, 900));

  const [layout, setLayout] = useState<Layout>(layoutRef.current);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState({ active: -1, settled: false });
  const [tab, setTab] = useState<Tab>("story");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [best, setBest] = useState<Record<string, number>>({});

  const flat = failed || !ready; // no 3D (yet): drive everything from the scroll
  const active = flat ? activeFor(progress) : status.active;
  const showCard = active >= 0 && (flat || status.settled);
  const score =
    Object.values(best).reduce((a, b) => a + b, 0) + Object.entries(answers).filter(([id, a]) => STOP_INFO[id]?.quiz.answer === a).length * QUIZ_POINTS;

  const onScore = useCallback((id: string, p: number) => setBest((b) => ({ ...b, [id]: Math.max(p, b[id] ?? 0) })), []);

  const jumpTo = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + progressFor(i) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  }, []);

  // a new place opens on its story
  useEffect(() => setTab("story"), [active]);

  // screen shape decides where the place and its card go
  useEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      const l = computeLayout(stage?.clientWidth || window.innerWidth, stage?.clientHeight || window.innerHeight);
      layoutRef.current = l;
      setLayout(l);
      sceneRef.current?.setFraming(-(l.pin.x - 0.5), -(l.pin.y - 0.5));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ready]);

  // scroll drives the camera
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      setProgress(p);
      sceneRef.current?.setProgress(p);
      sceneRef.current?.setRunning(r.bottom > 0 && r.top < vh);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // arrow keys hop between places (but not while a game is running)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.body.dataset.kdGame === "on" || (e.target as HTMLElement)?.closest?.("input, textarea")) return;
      if (e.key === "ArrowRight") jumpTo(Math.min(n - 1, active + 1));
      if (e.key === "ArrowLeft") jumpTo(Math.max(-1, active - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, jumpTo]);

  // build the scene, then keep pins and labels glued to the terrain
  useEffect(() => {
    if (!webglAvailable()) {
      setFailed(true);
      return;
    }
    let disposed = false;
    let raf = 0;
    let last = { active: -2, settled: false };
    (async () => {
      try {
        const { createScene } = await import("@/features/karunadu3d/three/scene");
        if (disposed || !canvasRef.current) return;
        const s = await createScene(canvasRef.current, JOURNEY);
        if (disposed) {
          s.dispose();
          return;
        }
        sceneRef.current = s;
        const l = layoutRef.current;
        s.setFraming(-(l.pin.x - 0.5), -(l.pin.y - 0.5));
        window.dispatchEvent(new Event("scroll"));
        setReady(true);
        const loop = () => {
          raf = requestAnimationFrame(loop);
          const st = s.status();
          if (st.active !== last.active || st.settled !== last.settled) {
            last = st;
            setStatus(st);
          }
          const pts = s.stopScreen();
          pts.forEach((p, i) => {
            const el = labelRefs.current[i];
            if (!el) return;
            const show = p.visible && i !== st.active;
            el.style.opacity = show ? "1" : "0";
            el.style.pointerEvents = show ? "auto" : "none";
            el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -100%)`;
          });
          const a = pts[st.active];
          if (pinRef.current && a) pinRef.current.style.transform = `translate(${a.x}px, ${a.y}px)`;
          const lay = layoutRef.current;
          if (linkRef.current && a && lay.wide) {
            const x0 = lay.card.left + lay.card.width;
            const y0 = Math.max(lay.card.top + 50, Math.min(lay.card.top + lay.card.height - 50, a.y - 40));
            const x1 = a.x - 16;
            const y1 = a.y - 40;
            linkRef.current.setAttribute("d", `M${x0} ${y0} C ${x0 + (x1 - x0) * 0.5} ${y0}, ${x0 + (x1 - x0) * 0.5} ${y1}, ${x1} ${y1}`);
          }
        };
        raf = requestAnimationFrame(loop);
      } catch {
        setFailed(true);
      }
    })();
    const onResize = () => sceneRef.current?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  const Icon = active >= 0 ? ICONS[JOURNEY[active].id] : null;
  const c = layout.card;
  const tip = Math.max(24, Math.min(c.width - 24, layout.pin.x * layout.W - c.left));

  return (
    <section
      ref={sectionRef}
      className="relative [overflow-anchor:none]"
      style={{ height: `${(n + 1) * 100}vh` }}
      aria-label="Karnataka in 3D"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_50%_100%,#3a2347,#0b1230_55%,#03050d)]"
        data-cursor="compass"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          sceneRef.current?.setPointer((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {flat && (
          <img src="/karnataka/satellite.jpg" alt="" className="absolute left-1/2 top-1/2 h-[86%] -translate-x-1/2 -translate-y-1/2 opacity-60 [mask-image:radial-gradient(closest-side,#000_70%,transparent)]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,5,13,0.75))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#12030a]/90 to-transparent" />

        {/* every place, pinned to the terrain – tap to fly there */}
        {!flat &&
          JOURNEY.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => (labelRefs.current[i] = el)}
              type="button"
              onClick={() => jumpTo(i)}
              className="group absolute left-0 top-0 opacity-0 transition-opacity duration-300"
              aria-label={`Fly to ${s.en}`}
            >
              <span className="f-serif flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-xs text-[#fbf3e2] shadow-lg backdrop-blur transition-colors group-hover:border-[#ffcc00] group-hover:bg-[#ffcc00] group-hover:text-[#1a0a06]">
                <span className={`h-1.5 w-1.5 rounded-full ${best[s.id] !== undefined || answers[s.id] !== undefined ? "bg-[#7ef0c2]" : "bg-[#ffcc00]"}`} />
                {s.kn}
              </span>
              <span className="mx-auto block h-3 w-px bg-white/40" />
            </button>
          ))}

        {/* gold thread from the card to the pin */}
        {!flat && showCard && layout.wide && (
          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true">
            <path ref={linkRef} d="" fill="none" stroke="#ffcc00" strokeOpacity=".8" strokeWidth="2" className="kd-link-line" />
          </svg>
        )}

        {/* the location pin for the current place */}
        {!flat && showCard && Icon && (
          <div ref={pinRef} className="pointer-events-none absolute left-0 top-0 z-10">
            <div key={active} className="kd-pin-drop absolute -translate-x-1/2" style={{ bottom: 0 }}>
              <div className="kd-pin relative">
                <svg viewBox="0 0 48 64" className="h-16 w-12 drop-shadow-[0_8px_16px_rgba(0,0,0,.6)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="kd-pin-g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ffe08a" />
                      <stop offset=".55" stopColor="#ffcc00" />
                      <stop offset="1" stopColor="#d6262b" />
                    </linearGradient>
                  </defs>
                  <path d="M24 63 C 24 63, 3 38, 3 23 A 21 21 0 1 1 45 23 C 45 38, 24 63, 24 63 Z" fill="url(#kd-pin-g)" stroke="#1a0a06" strokeWidth="2" />
                  <circle cx="24" cy="23" r="14" fill="#1a0a06" />
                </svg>
                <Icon className="absolute left-1/2 top-[13px] h-5 w-5 -translate-x-1/2 text-[#ffcc00]" />
              </div>
            </div>
            <span className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ffcc00]" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
          </div>
        )}

        {/* the big card – fixed in place, sized to fit without scrolling */}
        {showCard && (
          <div
            key={JOURNEY[active].id}
            className={`kd-stop-card absolute z-20 rounded-[22px] ${layout.wide ? "wide" : ""}`}
            style={{ left: c.left, top: c.top, width: c.width, height: c.height, ["--tip" as string]: `${tip}px`, animation: "kd-card-in .6s cubic-bezier(.16,1,.3,1)" }}
            data-cursor="zari"
          >
            <StopCard
              index={active}
              layout={layout}
              tab={tab}
              setTab={setTab}
              answers={answers}
              answer={(id, ch) => setAnswers((a) => ({ ...a, [id]: ch }))}
              best={best}
              onScore={onScore}
            />
          </div>
        )}

        {/* overview: how to use the map */}
        {active < 0 && <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55%] bg-gradient-to-t from-[#03050d] via-[#03050d]/70 to-transparent md:h-[45%] md:w-[60%] md:bg-gradient-to-tr" />}
        {active < 0 && (
          <div className="absolute inset-x-4 bottom-10 z-20 mx-auto max-w-xl text-center md:inset-x-auto md:left-12 md:mx-0 md:text-left" style={{ animation: "kd-card-in .8s cubic-bezier(.16,1,.3,1)" }}>
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <KarnatakaIcon className="h-20 w-20 md:h-24 md:w-24" />
              <div>
                <h1 className="f-serif text-5xl font-bold text-[#fbf3e2] md:text-6xl">ಕರುನಾಡು</h1>
                <p className="f-display text-lg italic text-[#f6dc8c]/85">Karnataka, in 3D</p>
              </div>
            </div>
            <p className="f-serif mt-4 text-base text-[#f6dc8c]">ಬೀದರ್‌ನಿಂದ ನಮ್ಮ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿಯವರೆಗೆ, ಕರುನಾಡಿನ ಮೇಲೆ ಹಾರಿ ಬನ್ನಿ.</p>
            <p className="mt-2 text-sm text-[#fbf3e2]/80">
              Scroll to fly over the real land, from Bidar in the north to our home in Electronic City. At every place, read its story, play its game and answer its question to collect points.
            </p>
            <button type="button" onClick={() => jumpTo(0)} className="btn-silk mt-5">
              <span className="f-serif">ಪಯಣ ಆರಂಭಿಸಿ</span> · Start the journey
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* score + quick hops */}
        <div className="absolute left-4 top-24 z-20 flex items-center gap-2 md:left-8">
          <span className="flex items-center gap-1 rounded-full border border-[#f6dc8c]/30 bg-black/50 px-3 py-1 text-xs text-[#f6dc8c] backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-current" /> <span className="f-serif">ಅಂಕ</span> {score}
          </span>
          <button type="button" onClick={() => jumpTo(Math.max(-1, active - 1))} className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur hover:text-white" aria-label="Previous place">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => jumpTo(Math.min(n - 1, active + 1))} className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur hover:text-white" aria-label="Next place">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* the route, as a list you can jump around */}
        <ol className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1 xl:flex" aria-label="Places on the journey">
          {JOURNEY.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => jumpTo(i)}
                className={`f-serif flex w-full items-center justify-end gap-2 rounded-full px-2 py-0.5 text-right text-xs transition-all ${i === active ? "text-[#ffcc00]" : "text-[#fbf3e2]/55 hover:text-white"}`}
              >
                {s.kn}
                <span className={`block h-2 w-2 rounded-full transition-transform ${i === active ? "scale-150 bg-[#ffcc00]" : best[s.id] !== undefined || answers[s.id] !== undefined ? "bg-[#7ef0c2]" : i < active ? "bg-[#f6dc8c]/70" : "bg-white/25"}`} />
              </button>
            </li>
          ))}
        </ol>

        {/* progress along the route */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/10">
          <div className="h-full bg-gradient-to-r from-[#ffcc00] to-[#d6262b]" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="pointer-events-none absolute bottom-2 right-3 z-10 hidden text-[10px] text-white/40 sm:block">
          Imagery: contains modified Copernicus Sentinel data (2024) · Terrain: AWS Terrain Tiles · Border: Natural Earth
        </p>

        {!ready && !failed && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <p className="f-serif animate-pulse text-[#f6dc8c]">ನಾಡನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದೆ…</p>
          </div>
        )}
      </div>
    </section>
  );
}
