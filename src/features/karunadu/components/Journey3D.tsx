import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Castle, Check, ChevronDown, ChevronLeft, ChevronRight, Coffee, Crown, Droplets, GraduationCap, Landmark, MountainSnow, PersonStanding, ScrollText, Shield, Star, Waves, X as Wrong,
  type LucideIcon,
} from "lucide-react";
import { JOURNEY } from "@/features/karunadu/data/journey";
import { KIND_LABEL, STOP_INFO } from "@/features/karunadu/data/stops";
import type { KarnatakaScene } from "@/features/karunadu/three/scene";
import KarnatakaIcon from "@/features/karunadu/components/KarnatakaIcon";
import StopPlay from "@/features/karunadu/components/journey/StopPlay";

/* ಕರುನಾಡು in 3D – lives right on the home page. Scrolling flies the camera
 * across the real terrain; at every place a pin drops and a card above it
 * tells the story, gives you something to play with and asks one question. */

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
  { id: "play", kn: "ಆಟ", en: "Play" },
  { id: "quiz", kn: "ಪ್ರಶ್ನೆ", en: "Quiz" },
];

const n = JOURNEY.length;
const TOP = 132; // fixed site header + score bar
const PIN = 64;

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

function StopCard({
  index,
  tab,
  setTab,
  answers,
  answer,
}: {
  index: number;
  tab: Tab;
  setTab: (t: Tab) => void;
  answers: Record<string, number>;
  answer: (id: string, choice: number) => void;
}) {
  const stop = JOURNEY[index];
  const info = STOP_INFO[stop.id];
  const picked = answers[stop.id];
  const score = Object.entries(answers).filter(([id, a]) => STOP_INFO[id]?.quiz.answer === a).length;
  const done = picked !== undefined;

  return (
    <>
      <div className="relative h-28 shrink-0 overflow-hidden md:h-32">
        {stop.photo && <img src={stop.photo} alt={stop.en} className="ken-burns absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140a0e] via-[#140a0e]/40 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f6dc8c] backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {n} · <span className="f-serif normal-case tracking-normal">{info.regionKn}</span>
        </span>
        <div className="absolute bottom-2 left-4 right-4">
          <p className="f-serif text-2xl font-bold leading-tight text-white md:text-3xl">{stop.kn}</p>
          <p className="text-xs text-white/75">{stop.en}</p>
        </div>
      </div>
      <p className="f-serif px-4 pt-2 text-sm text-[#f6dc8c]">{info.tagline}</p>

      <div className="mx-4 mt-2 flex shrink-0 gap-1 rounded-full bg-white/5 p-1" role="tablist">
        {TABS.map((t) => (
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
            {t.id === "quiz" && done && <Check className="h-3 w-3" />}
          </button>
        ))}
      </div>

      <div className="kd-card-body min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-3" key={tab} style={{ animation: "kd-card-in .45s cubic-bezier(.16,1,.3,1)" }}>
        {tab === "story" && (
          <div className="space-y-3">
            <p className="text-[13px] leading-relaxed text-[#fbf3e2]/85">{info.about}</p>
            <dl className="grid grid-cols-3 gap-2">
              {info.facts.map(([k, v]) => (
                <div key={k} className="rounded-xl border border-[#f6dc8c]/15 bg-white/[0.04] p-2">
                  <dt className="text-[10px] uppercase tracking-wider text-[#f6dc8c]/70">{k}</dt>
                  <dd className="mt-0.5 text-xs font-semibold leading-snug text-[#fbf3e2]">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="flex flex-wrap gap-1.5">
              {info.culture.map((c) => (
                <li key={c.en} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1.5 pr-2.5" title={c.en}>
                  <span className="rounded-full px-1.5 text-[10px] font-bold text-[#1a0a06]" style={{ background: KIND_LABEL[c.kind].color }}>
                    <span className="f-serif">{KIND_LABEL[c.kind].kn}</span>
                  </span>
                  <span className="f-serif text-xs text-[#fbf3e2]">{c.kn}</span>
                  <span className="hidden text-[10px] text-[#fbf3e2]/55 sm:inline">{c.en}</span>
                </li>
              ))}
            </ul>
            {stop.id === "home" && (
              <Link to="/team" className="btn-silk !px-4 !py-2 text-sm">
                Meet Our Team
              </Link>
            )}
            <button type="button" onClick={() => setTab("play")} className="text-xs font-semibold text-[#ffcc00] hover:underline">
              ▶ {info.play}
            </button>
          </div>
        )}
        {tab === "play" && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f6dc8c]/80">{info.play}</p>
            <StopPlay id={stop.id} />
          </div>
        )}
        {tab === "quiz" && (
          <div>
            <p className="text-sm font-semibold text-[#fbf3e2]">{info.quiz.q}</p>
            <div className="mt-3 space-y-2">
              {info.quiz.options.map((o, i) => {
                const right = i === info.quiz.answer;
                const state = !done ? "" : right ? "border-[#7ef0c2] bg-[#7ef0c2]/15" : picked === i ? "border-[#ff5a4f] bg-[#ff5a4f]/15" : "opacity-50";
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={done}
                    onClick={() => answer(stop.id, i)}
                    className={`flex w-full items-center justify-between rounded-xl border border-white/15 px-3 py-2 text-left text-sm text-[#fbf3e2] transition-colors hover:border-[#ffcc00] ${state}`}
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
                <span className="font-bold text-[#ffcc00]">{picked === info.quiz.answer ? "ಸರಿ! Correct. " : "ಅಯ್ಯೋ! Not quite. "}</span>
                {info.quiz.why}
              </p>
            )}
            <p className="mt-3 flex items-center gap-1 text-xs text-[#f6dc8c]">
              <Star className="h-3.5 w-3.5 fill-current" /> ಅಂಕ {score} / {n}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function Journey3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<KarnatakaScene | null>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState({ active: -1, settled: false });
  const [tab, setTab] = useState<Tab>("story");
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const flat = failed || !ready; // no 3D (yet): drive everything from the scroll
  const active = flat ? activeFor(progress) : status.active;
  const showCard = active >= 0 && (flat || status.settled);
  const score = Object.entries(answers).filter(([id, a]) => STOP_INFO[id]?.quiz.answer === a).length;

  const jumpTo = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + progressFor(i) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  }, []);

  // new place, start with its story
  useEffect(() => setTab("story"), [active]);

  // start loading the 3D world shortly before it scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "150% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  // arrow keys hop between places while the map fills the screen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el || (e.target as HTMLElement)?.closest?.("input, textarea")) return;
      const r = el.getBoundingClientRect();
      if (r.top > 1 || r.bottom < window.innerHeight - 1) return;
      if (e.key === "ArrowRight") jumpTo(Math.min(n - 1, active + 1));
      if (e.key === "ArrowLeft") jumpTo(Math.max(-1, active - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, jumpTo]);

  // build the scene, then keep pins, labels and the card glued to the terrain
  useEffect(() => {
    if (!near) return;
    if (!webglAvailable()) {
      setFailed(true);
      return;
    }
    let disposed = false;
    let raf = 0;
    let last = { active: -2, settled: false };
    (async () => {
      try {
        const { createScene } = await import("@/features/karunadu/three/scene");
        if (disposed || !canvasRef.current) return;
        const s = await createScene(canvasRef.current, JOURNEY);
        if (disposed) {
          s.dispose();
          return;
        }
        sceneRef.current = s;
        window.dispatchEvent(new Event("scroll"));
        setReady(true);
        const loop = () => {
          raf = requestAnimationFrame(loop);
          const stage = stageRef.current;
          if (!stage) return;
          const st = s.status();
          if (st.active !== last.active || st.settled !== last.settled) {
            last = st;
            setStatus(st);
          }
          const pts = s.stopScreen();
          const W = stage.clientWidth;
          const H = stage.clientHeight;
          pts.forEach((p, i) => {
            const el = labelRefs.current[i];
            if (!el) return;
            const show = p.visible && i !== st.active;
            el.style.opacity = show ? "1" : "0";
            el.style.pointerEvents = show ? "auto" : "none";
            el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -100%)`;
          });
          const a = pts[st.active];
          const pin = pinRef.current;
          if (pin && a) pin.style.transform = `translate(${a.x}px, ${a.y}px)`;
          const card = cardRef.current;
          if (card && a) {
            const cw = card.offsetWidth;
            const left = Math.round(Math.max(12, Math.min(W - cw - 12, a.x - cw / 2)));
            const bottom = Math.round(H - a.y + PIN + 14);
            // only follow real moves, so the card holds still under your finger
            const [pl, pb] = [parseFloat(card.style.left), parseFloat(card.style.bottom)];
            if (!Number.isNaN(pl) && Math.abs(pl - left) < 6 && Math.abs(pb - bottom) < 6) return;
            card.style.left = `${left}px`;
            card.style.bottom = `${bottom}px`;
            card.style.maxHeight = `${Math.max(240, H - bottom - TOP)}px`;
            card.style.setProperty("--tip", `${Math.max(24, Math.min(cw - 24, a.x - left))}px`);
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
  }, [near]);

  const Icon = active >= 0 ? ICONS[JOURNEY[active].id] : null;

  return (
    <section id="karunadu" ref={sectionRef} className="relative" style={{ height: `${(n + 1) * 100}vh` }} data-tone="#0f1626,#1d3b5a" aria-label="Karnataka in 3D">
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden bg-[#0f1626]"
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,8,15,0.8))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#12030a] to-transparent" />

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
                <span className={`h-1.5 w-1.5 rounded-full ${answers[s.id] !== undefined ? "bg-[#7ef0c2]" : "bg-[#ffcc00]"}`} />
                {s.kn}
              </span>
              <span className="mx-auto block h-3 w-px bg-white/40" />
            </button>
          ))}

        {/* the location pin for the current place */}
        {!flat && showCard && Icon && (
          <div ref={pinRef} className="pointer-events-none absolute left-0 top-0">
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

        {/* the story card above the pin */}
        {showCard && (
          <div
            ref={cardRef}
            key={JOURNEY[active].id}
            className={`kd-stop-card absolute z-20 flex w-[min(400px,calc(100vw-24px))] flex-col rounded-[22px] ${flat ? "bottom-20 left-1/2 max-h-[70vh] -translate-x-1/2" : ""}`}
            style={{ animation: "kd-card-in .6s cubic-bezier(.16,1,.3,1)" }}
            data-cursor="zari"
          >
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px]">
              <StopCard index={active} tab={tab} setTab={setTab} answers={answers} answer={(id, c) => setAnswers((a) => ({ ...a, [id]: c }))} />
            </div>
          </div>
        )}

        {/* overview: how to use the map */}
        {active < 0 && <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55%] bg-gradient-to-t from-[#0f1626] via-[#0f1626]/70 to-transparent md:h-[45%] md:w-[60%] md:bg-gradient-to-tr" />}
        {active < 0 && (
          <div className="absolute inset-x-4 bottom-10 z-20 mx-auto max-w-xl text-center md:inset-x-auto md:left-12 md:mx-0 md:text-left" style={{ animation: "kd-card-in .8s cubic-bezier(.16,1,.3,1)" }}>
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <KarnatakaIcon className="h-20 w-20 md:h-24 md:w-24" />
              <div>
                <h2 className="f-serif text-5xl font-bold text-[#fbf3e2] md:text-6xl">ಕರುನಾಡು</h2>
                <p className="f-display text-lg italic text-[#f6dc8c]/85">Karnataka, in 3D</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#fbf3e2]/80">
              Scroll to fly over the real land, from Bidar in the north to our home in Electronic City. At every place, open its story, play with it and answer its question.
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
            <Star className="h-3.5 w-3.5 fill-current" /> ಅಂಕ {score} / {n}
          </span>
          <button type="button" onClick={() => jumpTo(Math.max(-1, active - 1))} className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur hover:text-white" aria-label="Previous place">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => jumpTo(Math.min(n - 1, active + 1))} className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur hover:text-white" aria-label="Next place">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* the route, as a list you can jump around */}
        <ol className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1 lg:flex" aria-label="Places on the journey">
          {JOURNEY.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => jumpTo(i)}
                className={`f-serif flex w-full items-center justify-end gap-2 rounded-full px-2 py-0.5 text-right text-xs transition-all ${i === active ? "text-[#ffcc00]" : "text-[#fbf3e2]/55 hover:text-white"}`}
              >
                {s.kn}
                <span className={`block h-2 w-2 rounded-full transition-transform ${i === active ? "scale-150 bg-[#ffcc00]" : answers[s.id] !== undefined ? "bg-[#7ef0c2]" : i < active ? "bg-[#f6dc8c]/70" : "bg-white/25"}`} />
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

        {near && !ready && !failed && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <p className="f-serif animate-pulse text-[#f6dc8c]">ನಾಡನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದೆ…</p>
          </div>
        )}
      </div>
    </section>
  );
}
