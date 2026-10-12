import { useState } from "react";
import {
  ARTS, DYNASTIES, FESTIVALS, FOODS, HEROES, JNANPITH, MUSICIANS, POETS, STATE_SYMBOLS, SWARAS, VYANJANAS, type FoodShape,
} from "@/features/karunadu/data/karnataka";
import { MAYAMALAVAGOWLA, pluck, swaraFreq } from "@/features/karunadu/audio";
import { useInView, useScrollProgress } from "@/features/karunadu/hooks";
import { Letters, Reveal } from "@/features/karunadu/components/Motion";
import ArtCard from "@/features/karunadu/components/ArtCard";
import { CoffeeCup, Diya, Elephant, Gandaberunda, Lotus, Mango, Roller, Sandalwood } from "@/features/karunadu/components/Motifs";

/* Section heading made only of names (Kannada + English) */
export function NameHeading({ kn, en, light = true }: { kn: string; en: string; light?: boolean }) {
  return (
    <div className="mb-12 text-center">
      <Letters as="h2" text={kn} className={`f-serif block text-5xl font-bold md:text-7xl ${light ? "text-[#fbf3e2]" : "text-[#1a0a06]"}`} />
      <Reveal delay={300}>
        <p className={`f-display mt-2 text-lg italic tracking-wide ${light ? "text-[#f6dc8c]/80" : "text-[#7a4b0f]"}`}>{en}</p>
      </Reveal>
    </div>
  );
}

/* ---------- State symbols ---------- */
export function StateSymbols() {
  const art: Record<string, JSX.Element> = {
    gandaberunda: <Gandaberunda className="h-full w-auto" />,
    roller: <Roller className="float h-1/2 w-auto" />,
    elephant: <Elephant howdah={false} className="walk h-full w-auto" />,
    sandalwood: <Sandalwood className="sway h-full w-auto" />,
    lotus: <Lotus className="float h-full w-auto" />,
    mango: <Mango className="sway h-full w-auto" />,
  };
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
      {STATE_SYMBOLS.map((s, i) => (
        <Reveal key={s.en} delay={i * 90} variant="scale">
          <div className="glass group flex h-full flex-col items-center p-5 text-center transition-transform duration-500 hover:-translate-y-2">
            <div className="grid h-28 w-full place-items-center">{art[s.motif]}</div>
            <p className="f-serif mt-3 text-xl font-bold">{s.kn}</p>
            <p className="text-xs text-[#fbf3e2]/70">{s.en}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Arts ---------- */
export function ArtsGallery() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {ARTS.map((a, i) => (
        <Reveal key={a.en} delay={(i % 4) * 90}>
          <ArtCard {...a} />
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Kannada alphabet ---------- */
export function AksharaWall() {
  const [lit, setLit] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const cell = (ch: string, i: number) => (
    <button
      key={ch + i}
      type="button"
      onClick={() => setLit(ch)}
      className="akshara f-serif grid aspect-square place-items-center rounded-xl text-2xl font-bold text-[#fbf3e2]/85 md:text-4xl"
      style={{ opacity: inView ? 1 : 0, transition: `opacity .5s ease ${i * 18}ms, transform .4s, color .3s` }}
      aria-label={ch}
    >
      {ch}
    </button>
  );
  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]" data-cursor="ink">
      <div>
        <p className="f-serif mb-3 text-xl text-[#f6dc8c]">ಸ್ವರಗಳು · Swaras</p>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">{SWARAS.map(cell)}</div>
        <p className="f-serif mb-3 mt-8 text-xl text-[#f6dc8c]">ವ್ಯಂಜನಗಳು · Vyanjanas</p>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">{VYANJANAS.map((c, i) => cell(c, i + SWARAS.length))}</div>
      </div>
      <div className="relative grid place-items-center">
        <div className="absolute h-72 w-72 rounded-full bg-[#ffcc00]/10 blur-3xl" />
        <span key={lit ?? "ka"} className="f-serif relative text-[12rem] font-bold leading-none md:text-[16rem]" style={{ animation: "float 6s ease-in-out infinite" }}>
          <span className="flag-text">{lit ?? "ಕ"}</span>
        </span>
        <p className="f-serif relative mt-2 text-[#fbf3e2]/70">ಹಲ್ಮಿಡಿ ಶಾಸನ · Halmidi Inscription</p>
      </div>
    </div>
  );
}

/* ---------- Literature: poets on palm leaves, Jnanpith as lamps ---------- */
export function Literature() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="grid gap-16 lg:grid-cols-2" data-cursor="ink">
      <div>
        <p className="f-serif mb-6 text-center text-2xl text-[#f6dc8c]">ಕವಿಗಳು · Poets & Saints</p>
        <div className="relative mx-auto h-[420px] max-w-md">
          {POETS.map((p, i) => {
            const angle = (i - (POETS.length - 1) / 2) * 7;
            return (
              <div
                key={p.en}
                className="group absolute bottom-0 left-1/2 h-[380px] w-16 origin-bottom"
                style={{
                  transform: `translateX(-50%) rotate(${inView ? angle : 0}deg)`,
                  transition: `transform 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
                }}
              >
                <div className="relative flex h-full flex-col items-center justify-start gap-2 rounded-full border border-[#8a5a22] bg-[linear-gradient(90deg,#e2c588,#f3e1b5,#e2c588)] pt-6 shadow-lg transition-transform duration-500 group-hover:-translate-y-6">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5a3a14]" />
                  <span className="f-serif text-lg font-bold text-[#3a2410] [writing-mode:vertical-rl]">{p.kn}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5a3a14] [writing-mode:vertical-rl]">{p.en}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="f-serif mb-6 text-center text-2xl text-[#f6dc8c]">ಜ್ಞಾನಪೀಠ · Jnanpith</p>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-8">
          {JNANPITH.map((j, i) => (
            <li
              key={j.en}
              className="flex items-center gap-3"
              style={{ opacity: inView ? 1 : 0.25, transition: `opacity .6s ease ${0.6 + i * 0.35}s` }}
            >
              <Diya className="h-12 w-12 shrink-0" delay={i * 0.2} />
              <span>
                <span className="f-serif block text-lg font-bold leading-tight">{j.kn}</span>
                <span className="text-xs text-[#fbf3e2]/65">{j.en}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------- Music: a playable veena ---------- */
export function Veena() {
  const [twang, setTwang] = useState<number | null>(null);
  const play = (i: number) => {
    pluck(swaraFreq(MAYAMALAVAGOWLA[i].semitone));
    setTwang(i);
    window.setTimeout(() => setTwang((t) => (t === i ? null : t)), 600);
  };
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]" data-cursor="zari">
      <div className="relative rounded-[999px] border border-[#f6dc8c]/30 bg-[linear-gradient(90deg,#3a1606,#6b3a12_30%,#3a1606)] px-6 py-8 shadow-2xl md:px-14">
        <div className="absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,#8a5a22,#3a1606)] shadow-xl md:-left-24 md:h-36 md:w-36" />
        <div className="absolute -right-4 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,#8a5a22,#3a1606)] md:h-24 md:w-24" />
        <div className="relative z-10 ml-6 flex flex-col gap-3 md:ml-8" role="group" aria-label="Veena strings">
          {MAYAMALAVAGOWLA.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => play(i)}
              onPointerEnter={(e) => e.buttons === 1 && play(i)}
              className="group relative flex h-8 items-center"
              aria-label={`Play ${s.swara}`}
            >
              <span
                className="block h-[2px] w-full bg-gradient-to-r from-[#d6dde3] via-[#fff] to-[#d6dde3] transition-transform"
                style={{ animation: twang === i ? "walk .08s linear 6" : undefined, height: 1 + (7 - i) * 0.25 }}
              />
              <span className="f-serif absolute -left-1 -translate-x-full pr-2 text-lg font-bold text-[#f6dc8c] md:text-xl">{s.swara}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="f-serif text-2xl text-[#f6dc8c]">ಮಾಯಾಮಾಳವಗೌಳ</p>
        <p className="f-display italic text-[#fbf3e2]/70">Mayamalavagowla</p>
        <ul className="mt-6 space-y-3">
          {[{ kn: "ಪುರಂದರದಾಸ", en: "Purandara Dasa" }, ...MUSICIANS].map((m) => (
            <li key={m.en} className="flex items-baseline justify-between border-b border-[#f6dc8c]/15 pb-2">
              <span className="f-serif text-xl font-bold">{m.kn}</span>
              <span className="text-sm text-[#fbf3e2]/65">{m.en}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Festivals: a rangoli wheel turned by scrolling ---------- */
export function FestivalWheel() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const n = FESTIVALS.length;
  const rotation = -progress * 360 * 1.1;
  const active = ((Math.round((-rotation / 360) * n) % n) + n) % n;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2" data-cursor="kumkuma">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <path key={i} d="M200 200 C 186 150, 188 90, 200 40 C 212 90, 214 150, 200 200 Z" fill={["#d6262b", "#ffcc00", "#b3134f", "#1d7f86"][i % 4]} opacity=".85" transform={`rotate(${i * 15} 200 200)`} />
          ))}
          <circle cx="200" cy="200" r="70" fill="#12030a" stroke="#f6dc8c" strokeWidth="3" />
          {Array.from({ length: 60 }).map((_, i) => (
            <circle key={i} cx={200 + 186 * Math.cos((i * Math.PI) / 30)} cy={200 + 186 * Math.sin((i * Math.PI) / 30)} r="3" fill="#fbf3e2" />
          ))}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div className="w-36">
            <p className="f-serif text-xl font-bold leading-tight text-[#ffcc00] md:text-2xl">{FESTIVALS[active].kn}</p>
            <p className="text-xs text-[#fbf3e2]/80">{FESTIVALS[active].en}</p>
          </div>
        </div>
      </div>
      <ol className="grid grid-cols-2 gap-x-8 gap-y-3">
        {FESTIVALS.map((f, i) => (
          <li key={f.en} className={`flex items-baseline gap-3 transition-all duration-500 ${i === active ? "translate-x-2 text-[#ffcc00]" : "text-[#fbf3e2]/70"}`}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-current" />
            <span>
              <span className="f-serif block text-lg font-bold">{f.kn}</span>
              <span className="text-xs opacity-75">{f.en}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Food: ಬಾಳೆ ಎಲೆ ಊಟ (meal on a banana leaf) ---------- */
function FoodShapeSvg({ shape, color }: { shape: FoodShape; color: string }) {
  switch (shape) {
    case "coffee":
      return <CoffeeCup className="h-full w-full" />;
    case "ball":
      return <svg viewBox="0 0 60 60"><circle cx="30" cy="32" r="22" fill={color} /><circle cx="22" cy="24" r="5" fill="#fff" opacity=".12" /></svg>;
    case "sweet-block":
      return <svg viewBox="0 0 60 60"><rect x="10" y="16" width="40" height="30" rx="4" fill={color} /><path d="M10 26 h40 M10 36 h40" stroke="#b07a1c" strokeWidth="2" strokeDasharray="3 3" /></svg>;
    case "sweet-round":
      return <svg viewBox="0 0 60 60">{[[22, 30], [38, 30], [30, 42]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="11" fill={color} stroke="#5a3a1a" strokeWidth="1.5" />)}</svg>;
    case "dosa":
      return <svg viewBox="0 0 60 60"><path d="M6 40 C 10 16, 50 16, 54 40 Z" fill={color} stroke="#d9cfa8" strokeWidth="2" /><path d="M14 34 C 22 26, 38 26, 46 34" stroke="#e5d9b8" fill="none" /></svg>;
    case "roti":
      return <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="24" fill={color} />{[[20, 22], [36, 26], [28, 38], [40, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#8a5a2b" opacity=".6" />)}</svg>;
    case "vada":
      return <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill={color} /><circle cx="30" cy="30" r="7" fill="#2f7a2e" /></svg>;
    case "bun":
      return <svg viewBox="0 0 60 60"><ellipse cx="30" cy="34" rx="24" ry="16" fill={color} /><ellipse cx="24" cy="28" rx="8" ry="4" fill="#fff" opacity=".2" /></svg>;
    case "holige":
      return <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="24" fill={color} /><circle cx="30" cy="30" r="14" fill="#f2c96a" opacity=".6" /></svg>;
    case "spiral":
      return <svg viewBox="0 0 60 60">{[0, 1, 2].map((i) => <circle key={i} cx={18 + i * 12} cy={30} r="9" fill="none" stroke={color} strokeWidth="5" />)}</svg>;
    case "payasa":
      return <svg viewBox="0 0 60 60"><ellipse cx="30" cy="34" rx="22" ry="14" fill="#c9ccd1" /><ellipse cx="30" cy="30" rx="18" ry="8" fill={color} />{[22, 30, 38].map((x) => <circle key={x} cx={x} cy={30} r="2" fill="#7a4b23" />)}</svg>;
    case "kosambari":
      return <svg viewBox="0 0 60 60"><ellipse cx="30" cy="34" rx="22" ry="12" fill={color} />{[[22, 32, "#2f7d32"], [32, 30, "#d6262b"], [38, 36, "#2f7d32"], [26, 38, "#fff"]].map(([x, y, c], i) => <circle key={i} cx={x as number} cy={y as number} r="3" fill={c as string} />)}</svg>;
    case "chutney":
      return <svg viewBox="0 0 60 60"><path d="M10 34 C 14 20, 46 20, 50 34 C 46 44, 14 44, 10 34 Z" fill={color} /></svg>;
    default:
      return <svg viewBox="0 0 60 60"><path d="M6 44 C 10 18, 50 18, 54 44 Z" fill={color} />{[[20, 34], [30, 28], [40, 34]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#ffcc00" />)}</svg>;
  }
}

export function BananaLeafMeal() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="relative mx-auto max-w-5xl" data-cursor="mallige">
      <div className="banana-leaf relative px-6 py-14 md:px-16">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-[#1f5a1c]/70" />
        <ul className="relative grid grid-cols-3 gap-6 sm:grid-cols-5">
          {FOODS.map((f, i) => (
            <li key={f.en} className="flex flex-col items-center text-center">
              <button
                type="button"
                className="food-item grid h-20 w-20 place-items-center md:h-24 md:w-24"
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                aria-label={`${f.kn} – ${f.en}`}
              >
                <FoodShapeSvg shape={f.shape} color={f.color} />
              </button>
              <span className={`f-serif mt-1 text-sm font-bold transition-colors ${hover === i ? "text-[#ffcc00]" : "text-white"}`}>{f.kn}</span>
              <span className="text-[11px] text-white/75">{f.en}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- History: dynasties on a carved pillar, heroes on ವೀರಗಲ್ಲು ---------- */
export function HeroStones() {
  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]" data-cursor="zari">
      <div>
        <p className="f-serif mb-6 text-2xl text-[#f6dc8c]">ರಾಜವಂಶಗಳು · Dynasties</p>
        <ol className="relative border-l-2 border-[#a59886]/60 pl-8">
          {DYNASTIES.map((d, i) => (
            <Reveal key={d.en} as="li" delay={i * 90} variant="side" className="relative mb-6">
              <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-sm bg-[#a59886] [transform:rotate(45deg)]">
                <span className="h-2 w-2 bg-[#12030a]" />
              </span>
              <p className="f-serif text-2xl font-bold">{d.kn}</p>
              <p className="text-sm text-[#fbf3e2]/65">{d.en}</p>
            </Reveal>
          ))}
        </ol>
      </div>
      <div>
        <p className="f-serif mb-6 text-2xl text-[#f6dc8c]">ವೀರಗಲ್ಲು · Hero Stones</p>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {HEROES.map((h, i) => (
            <Reveal key={h.en} delay={i * 110} variant="wipe">
              <div className="group relative flex h-64 flex-col overflow-hidden rounded-t-[80px] border border-[#5a4c3c] bg-[linear-gradient(160deg,#b4a690,#857661)] p-3 text-[#2b2118] shadow-xl">
                <div className="absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(0deg,transparent 0 3px,rgb(0 0 0 / .18) 3px 4px)" }} />
                {[0, 1, 2].map((k) => (
                  <div key={k} className="relative flex-1 border-b-2 border-[#5a4c3c]/60 last:border-b-0">
                    {k === 0 && <div className="mx-auto mt-3 h-8 w-8 rounded-full border-2 border-[#3a2e22] transition-transform duration-700 group-hover:rotate-180" style={{ background: "radial-gradient(circle,#ffcc00 0 30%,transparent 32%)" }} />}
                    {k === 1 && (
                      <p className="f-serif relative px-1 pt-2 text-center text-base font-bold leading-tight [text-shadow:1px_1px_0_rgb(255_255_255_/_.35)]">{h.kn}</p>
                    )}
                    {k === 2 && <p className="relative pt-2 text-center text-[11px] font-semibold uppercase tracking-wide">{h.en}</p>}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- ನಾಡಗೀತೆ ---------- */
export function NadaGeethe() {
  return (
    <div className="relative py-10 text-center" data-cursor="zari">
      <Gandaberunda className="float mx-auto mb-6 h-40 w-auto opacity-90" />
      <Letters as="p" text="ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ" className="f-serif block text-4xl font-bold leading-snug md:text-7xl" step={70} />
      <Reveal delay={1600}>
        <p className="f-serif mt-6 text-2xl text-[#f6dc8c]">— ಕುವೆಂಪು</p>
        <p className="f-display text-sm italic text-[#fbf3e2]/60">Nada Geethe · Kuvempu</p>
      </Reveal>
    </div>
  );
}
