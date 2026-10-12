import type { ArtStyle } from "@/features/karunadu/data/karnataka";
import { useTilt } from "@/features/karunadu/hooks";
import { Dollu, Puppet, YakshaCrown } from "@/features/karunadu/components/Motifs";

/* Each art form is rendered in its own technique. */
function ArtVisual({ style }: { style: ArtStyle }) {
  switch (style) {
    case "yakshagana":
      return (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_40%,#5a1206,#1a0503)]">
          <YakshaCrown className="h-[70%] w-auto transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3" />
        </div>
      );
    case "dollu":
      return (
        <div className="grid h-full place-items-center bg-[repeating-conic-gradient(from_0deg,#c0521b_0_10deg,#a8441a_10deg_20deg)]">
          <Dollu className="h-[55%] w-auto drop-shadow-2xl transition-transform duration-300 group-hover:[animation:walk_.25s_ease-in-out_infinite]" />
        </div>
      );
    case "puppet":
      return (
        <div className="puppet-screen grid h-full place-items-center">
          <Puppet className="puppet h-[80%] w-auto opacity-90" color="#3a1206" />
        </div>
      );
    case "kasuti":
      return (
        <div className="relative h-full bg-[#1d1a2e] p-4">
          <div className="h-full w-full opacity-90" style={{ background: "repeating-conic-gradient(from 45deg,#d6262b 0 25%,transparent 0 50%) 0 0/16px 16px, repeating-conic-gradient(from 45deg,#ffcc00 0 25%,transparent 0 50%) 8px 8px/16px 16px" }} />
          <div className="absolute inset-8 rounded-sm border-2 border-dashed border-[#fbf3e2]/60 transition-all duration-700 group-hover:inset-4" />
        </div>
      );
    case "bidri":
      return (
        <div className="bidri relative grid h-full place-items-center overflow-hidden">
          <svg viewBox="0 0 100 100" className="h-[80%] w-auto" aria-hidden="true">
            <circle cx="50" cy="50" r="40" className="bidri-inlay" pathLength={1} />
            <path d="M50 10 C 70 30, 70 70, 50 90 C 30 70, 30 30, 50 10 Z" className="bidri-inlay" pathLength={1} />
            <path d="M10 50 C 30 30, 70 30, 90 50 C 70 70, 30 70, 10 50 Z" className="bidri-inlay" pathLength={1} />
            <circle cx="50" cy="50" r="10" className="bidri-inlay" pathLength={1} />
          </svg>
          <span className="silver-sheen absolute inset-0" />
        </div>
      );
    case "mysore-painting":
      return (
        <div className="grid h-full place-items-center bg-[#2a5a3a] p-4">
          <div className="arch-frame h-full w-[70%]">
            <div className="arch h-full bg-[radial-gradient(circle_at_50%_30%,#f6dc8c,#d9a63a_40%,#8a5a14)] transition-[filter] duration-700 group-hover:brightness-125" />
          </div>
        </div>
      );
    case "channapatna":
      return (
        <div className="grid h-full place-items-center bg-[#fff5e1]">
          <div className="flex items-end gap-3">
            {["#d6262b", "#ffcc00", "#2f7d32", "#1d4fa3"].map((c, i) => (
              <span key={c} className="block rounded-full border-4 border-[#1a0a06] transition-transform duration-500 group-hover:-translate-y-3" style={{ background: c, width: 34 + i * 6, height: 34 + i * 6, transitionDelay: `${i * 80}ms` }} />
            ))}
          </div>
        </div>
      );
    case "ilkal":
      return (
        <div className="flex h-full flex-col">
          <div className="flex-[3]" style={{ background: "repeating-linear-gradient(90deg,#1f4d2b 0 6px,#24572f 6px 12px)" }} />
          <div className="ilkal-edge" />
          <div className="flex-[2] bg-[#b3131f] transition-[filter] duration-700 group-hover:brightness-125" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent 0 10px,rgb(255 255 255 / .18) 10px 12px)" }} />
        </div>
      );
    case "mysore-silk":
      return (
        <div className="loom weave relative h-full">
          <div className="zari absolute inset-x-0 bottom-6" />
        </div>
      );
    case "huli":
      return (
        <div className="h-full transition-[background-position] duration-1000 group-hover:[background-position:40px_0]" style={{ background: "repeating-linear-gradient(110deg,#f39c1f 0 22px,#1a0a06 22px 32px,#f39c1f 32px 46px,#1a0a06 46px 52px)" }} />
      );
    case "kamsale":
      return (
        <div className="grid h-full place-items-center bg-[#3a1206]">
          <div className="flex gap-1">
            {[0, 1].map((i) => (
              <span key={i} className="block h-16 w-16 rounded-full bg-[radial-gradient(circle_at_40%_35%,#fff3c0,#d9a63a_45%,#7a4b0f)] transition-transform duration-300 group-hover:[animation:walk_.3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      );
    case "veeragase":
      return (
        <div className="grid h-full place-items-center bg-[linear-gradient(180deg,#fbf3e2,#e9d3a6)]">
          <svg viewBox="0 0 100 100" className="h-[70%] w-auto transition-transform duration-500 group-hover:rotate-12" aria-hidden="true">
            <path d="M50 6 L58 70 H42 Z" fill="#c9ccd1" stroke="#1a0a06" strokeWidth="2" />
            <rect x="30" y="70" width="40" height="8" rx="3" fill="#d9a63a" />
            <rect x="45" y="78" width="10" height="18" fill="#7a4b23" />
          </svg>
        </div>
      );
    case "sandalwood":
      return (
        <div className="relative grid h-full place-items-center bg-[linear-gradient(135deg,#d8b384,#b98a52)]">
          <div className="absolute inset-0" style={{ background: "repeating-radial-gradient(ellipse at 30% 50%,transparent 0 10px,rgb(90 50 20 / 0.12) 10px 12px)" }} />
          <svg viewBox="0 0 80 160" className="relative h-[80%] w-auto" aria-hidden="true">
            <g className="steam" stroke="#fbf3e2" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M40 70 C 30 56, 50 44, 40 30 C 32 20, 46 10, 40 2" />
              <path d="M40 70 C 50 58, 30 46, 42 32" />
              <path d="M40 70 C 34 60, 46 52, 38 40" />
            </g>
            <path d="M39 70 L41 70 L42 140 L38 140 Z" fill="#6b3a12" />
            <circle cx="40" cy="70" r="2.5" fill="#ff6a1a" className="flicker" />
            <ellipse cx="40" cy="146" rx="22" ry="7" fill="#7a4b23" />
          </svg>
        </div>
      );
    case "kinnal":
      return (
        <div className="grid h-full place-items-center bg-[#2f6b3a]">
          <svg viewBox="0 0 100 100" className="h-[70%] w-auto" aria-hidden="true">
            <path d="M20 80 C 20 40, 40 20, 60 20 C 80 20, 86 40, 74 54 C 64 66, 46 62, 50 50" fill="none" stroke="#ffcc00" strokeWidth="8" strokeLinecap="round" />
            <circle cx="62" cy="30" r="4" fill="#d6262b" />
            <path d="M20 80 h20" stroke="#d6262b" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      );
    case "navalgund":
      return (
        <div className="h-full" style={{ background: "repeating-linear-gradient(0deg,#1d4fa3 0 16px,#fbf3e2 16px 20px,#d6262b 20px 36px,#fbf3e2 36px 40px)" }} />
      );
    case "bharatanatya":
      return (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_60%,#b3134f,#4a0d1e)]">
          <svg viewBox="0 0 100 100" className="h-[70%] w-auto transition-transform duration-700 group-hover:scale-110" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <path key={i} d="M50 50 L 50 8" stroke="#f6dc8c" strokeWidth="2" transform={`rotate(${i * 30} 50 50)`} strokeDasharray="2 4" />
            ))}
            <circle cx="50" cy="50" r="14" fill="#f6dc8c" />
            <circle cx="50" cy="50" r="6" fill="#d6262b" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export default function ArtCard({ kn, en, style }: { kn: string; en: string; style: ArtStyle }) {
  const tilt = useTilt(12);
  return (
    <figure
      className="group relative h-72 overflow-hidden rounded-[22px] border border-[#f6dc8c]/20 bg-black/30 shadow-2xl"
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={tilt.style}
    >
      <div className="absolute inset-0">
        <ArtVisual style={style} />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 pt-14">
        <p className="f-serif text-2xl font-bold leading-tight text-white">{kn}</p>
        <p className="text-sm text-white/75">{en}</p>
      </figcaption>
    </figure>
  );
}
