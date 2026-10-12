import { useEffect, useState } from "react";
import { REGIONS } from "@/features/karunadu/data/karnataka";
import { useScrollProgress } from "@/features/karunadu/hooks";

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

/* one real photograph per region, with the place it shows */
const SCENES: Record<RegionId, { photo: string; place: string; tint: string; fx?: "mist" | "glow" | "dust" }> = {
  karavali: { photo: "udupi-coast", place: "ಕರಾವಳಿ ತೀರ · Karavali coast", tint: "rgba(8,40,60,.55)", fx: "glow" },
  malenadu: { photo: "coorg", place: "ಕೊಡಗು · Kodagu", tint: "rgba(10,30,20,.55)", fx: "mist" },
  mysuru: { photo: "mysuru-palace", place: "ಮೈಸೂರು ಅರಮನೆ · Mysuru Palace", tint: "rgba(30,8,20,.5)", fx: "glow" },
  bayaluseeme: { photo: "hampi", place: "ಹಂಪಿ · Hampi", tint: "rgba(50,20,5,.45)", fx: "dust" },
  kittur: { photo: "badami", place: "ಬಾದಾಮಿ · Badami", tint: "rgba(50,18,6,.45)", fx: "dust" },
  kalyana: { photo: "gol-gumbaz", place: "ಗೋಳ ಗುಮ್ಮಟ · Gol Gumbaz", tint: "rgba(30,14,40,.5)", fx: "glow" },
  bengaluru: { photo: "vidhana-soudha", place: "ವಿಧಾನ ಸೌಧ · Vidhana Soudha", tint: "rgba(8,12,38,.5)", fx: "glow" },
};

function Scene({ id, index, offset }: { id: RegionId; index: number; offset: number }) {
  const region = REGIONS[index];
  const s = SCENES[id];
  // offset: 0 when this scene is centred, ±1 one screen away
  const near = Math.max(0, 1 - Math.abs(offset));
  return (
    <section className="relative h-[100svh] w-screen shrink-0 snap-center overflow-hidden bg-[#0b0507]" aria-label={`${region.kn} – ${region.en}`}>
      <img
        src={`/karnataka/photos/${s.photo}.jpg`}
        alt={s.place}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: `translateX(${Math.max(-1, Math.min(1, offset)) * 8}%) scale(${1.24 - near * 0.04})` }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(10,4,6,.88) 0%, ${s.tint} 45%, rgba(0,0,0,.1) 75%), linear-gradient(0deg, rgba(10,4,6,.85) 0%, transparent 35%)` }} />
      {s.fx === "mist" && (
        <>
          <div className="mist" style={{ bottom: "30%" }} />
          <div className="mist" style={{ bottom: "8%", animationDelay: "-9s" }} />
        </>
      )}
      {s.fx === "dust" && <div className="pano-dust" />}
      {s.fx === "glow" && <div className="pano-glow" />}

      {/* giant outlined Kannada name drifting behind the text */}
      <p
        className="f-serif pointer-events-none absolute bottom-[-4vw] right-[-2vw] select-none whitespace-nowrap text-[22vw] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(246,220,140,.28)]"
        style={{ transform: `translateX(${offset * -30}%)` }}
        aria-hidden="true"
      >
        {region.kn}
      </p>

      <div className="absolute left-6 top-24 z-20 max-w-xl md:left-16 md:top-32" style={{ opacity: 0.25 + near * 0.75, transform: `translateY(${(1 - near) * 30}px)` }}>
        <p className="f-display text-sm uppercase tracking-[0.4em] text-[#f6dc8c]/90">
          {String(index + 1).padStart(2, "0")} / {String(REGIONS.length).padStart(2, "0")} · {region.en}
        </p>
        <h3 className="f-serif mt-3 text-6xl font-bold text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)] md:text-8xl">{region.kn}</h3>
        <span className="mt-5 block h-px w-40 origin-left bg-gradient-to-r from-[#ffcc00] to-transparent" style={{ transform: `scaleX(${near})` }} />
        <ul className="mt-6 flex flex-wrap gap-2">
          {CHIPS[id].map((c, k) => (
            <li
              key={c}
              className="f-serif rounded-full border border-white/30 bg-black/35 px-3 py-1 text-sm text-white backdrop-blur transition-all duration-700"
              style={{ opacity: near > 0.6 ? 1 : 0, transform: `translateY(${near > 0.6 ? 0 : 12}px)`, transitionDelay: `${k * 60}ms` }}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
      <p className="absolute bottom-20 right-6 z-20 text-xs uppercase tracking-[0.3em] text-white/60 md:right-16">
        <span className="f-serif normal-case tracking-normal">{s.place}</span>
      </p>
    </section>
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
  const pos = progress * (count - 1);
  const active = Math.min(count - 1, Math.round(pos));

  return (
    <div ref={ref} className="relative md:h-[700vh]" data-cursor="mallige">
      <div className="relative overflow-hidden md:sticky md:top-0 md:h-screen">
        <div
          className="flex snap-x snap-mandatory overflow-x-auto md:overflow-visible [scrollbar-width:none] md:will-change-transform"
          style={desktop ? { transform: `translateX(${-pos * 100}vw)` } : undefined}
        >
          {REGIONS.map((r, i) => (
            <Scene key={r.id} id={r.id} index={i} offset={desktop ? i - pos : 0} />
          ))}
        </div>

        {/* region progress (desktop) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 hidden justify-center md:flex">
          <ol className="flex items-center gap-3 rounded-full border border-[#f6dc8c]/20 bg-black/45 px-5 py-2.5 backdrop-blur">
            {REGIONS.map((r, i) => (
              <li key={r.id} className={`f-serif text-sm transition-all duration-500 ${i === active ? "scale-110 text-[#ffcc00]" : "text-white/55"}`}>
                {r.kn}
                {i < count - 1 && <span className="ml-3 text-white/30">—</span>}
              </li>
            ))}
          </ol>
        </div>
        <div className="absolute inset-x-0 top-0 z-30 hidden h-[3px] bg-white/10 md:block">
          <div className="h-full bg-gradient-to-r from-[#ffcc00] to-[#d6262b]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
