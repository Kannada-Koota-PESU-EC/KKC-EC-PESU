import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { KARNATAKA_PATH, MAP } from "@/features/karunadu/data/map-path";
import { project } from "@/features/karunadu/data/karnataka";
import { usePageProgress } from "@/features/karunadu/hooks";

// Original navigation (Recruitment removed as requested). Each page is
// pinned to a place on the map menu.
const NAV = [
  { name: "Home", path: "/", place: { kn: "ಬೆಂಗಳೂರು", lat: 12.97, lon: 77.59 } },
  { name: "Events", path: "/events", place: { kn: "ಮೈಸೂರು", lat: 12.3, lon: 76.64 } },
  { name: "Blogs", path: "/blogs", place: { kn: "ಧಾರವಾಡ", lat: 15.46, lon: 75.01 } },
  { name: "Team", path: "/team", place: { kn: "ಹಂಪಿ", lat: 15.335, lon: 76.46 } },
  { name: "Contact", path: "/contact", place: { kn: "ಮಂಗಳೂರು", lat: 12.91, lon: 74.86 } },
];

function MapMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [hover, setHover] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      id="kd-menu"
      className={`fixed inset-0 z-[120] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${open ? "" : "pointer-events-none"}`}
      style={{
        background: "radial-gradient(circle at 30% 40%, #4a0d1e, #12030a 75%)",
        clipPath: `circle(${open ? "150%" : "0%"} at calc(100% - 3rem) 2.5rem)`,
      }}
      data-cursor="compass"
      aria-hidden={!open}
    >
      <div className="stars-field opacity-60" />
      <div className="relative mx-auto grid h-full max-w-6xl items-center gap-6 px-6 py-20 md:grid-cols-[1fr_1.1fr]">
        <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="mx-auto hidden h-[72vh] w-auto md:block" aria-hidden="true">
          <path d={KARNATAKA_PATH} fill="rgb(246 220 140 / 0.06)" stroke="#f6dc8c" strokeWidth="2.5" />
          {NAV.map((n) => {
            const p = project(n.place.lat, n.place.lon);
            const on = hover === n.path || (!hover && pathname === n.path);
            return (
              <g key={n.path} style={{ transition: "opacity .3s", opacity: on ? 1 : 0.55 }}>
                {on && <circle cx={p.x} cy={p.y} r="16" fill="#d6262b" className="pulse-ring" />}
                <circle cx={p.x} cy={p.y} r={on ? 10 : 7} fill={on ? "#ffcc00" : "#f6dc8c"} />
                <text x={p.x + 16} y={p.y + 6} fill="#fbf3e2" fontSize="26" className="f-serif">
                  {n.place.kn}
                </text>
              </g>
            );
          })}
        </svg>
        <nav className="flex flex-col gap-2" aria-label="Main menu">
          {NAV.map((n, i) => (
            <NavLink
              key={n.path}
              to={n.path}
              end={n.path === "/"}
              onClick={onClose}
              onPointerEnter={() => setHover(n.path)}
              onPointerLeave={() => setHover(null)}
              className={({ isActive }) =>
                `group flex items-baseline justify-between border-b border-[#f6dc8c]/15 py-3 transition-all duration-700 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${isActive ? "text-[#ffcc00]" : "text-[#fbf3e2]"}`
              }
              style={{ transitionDelay: open ? `${250 + i * 70}ms` : "0ms" }}
            >
              <span className="f-display text-5xl font-semibold italic transition-transform duration-500 group-hover:translate-x-3 md:text-7xl">{n.name}</span>
              <span className="f-serif text-lg text-[#f6dc8c]/70">{n.place.kn}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = usePageProgress();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => setScrolled(progress > 0.005), [progress]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[130] transition-all duration-500 ${
          scrolled ? "bg-[#12030a]/75 py-2 backdrop-blur-xl" : "py-4"
        }`}
      >
        {/* reading progress, in the flag colours */}
        <div className="absolute inset-x-0 top-0 h-[3px] origin-left" style={{ transform: `scaleX(${progress})`, background: "linear-gradient(90deg,#ffcc00,#d6262b)" }} />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center">
              <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full spin-slow" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, i) => (
                  <ellipse key={i} cx="24" cy="5" rx="2.2" ry="5" fill={i % 2 ? "#d6262b" : "#ffcc00"} transform={`rotate(${i * 22.5} 24 24)`} />
                ))}
              </svg>
              <img src="/KKCEC-ECON.png" alt="Kannada Koota Logo" className="relative h-7 w-7" />
            </span>
            <span className="hidden text-lg font-bold sm:block">Kannada Koota EC PES</span>
            <span className="text-lg font-bold sm:hidden">KKEC</span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
              {NAV.map((n) => (
                <NavLink
                  key={n.path}
                  to={n.path}
                  end={n.path === "/"}
                  className={({ isActive }) => `stitch text-sm font-semibold tracking-wide transition-colors ${isActive ? "text-[#ffcc00]" : "text-[#fbf3e2]/85 hover:text-[#fbf3e2]"}`}
                >
                  {n.name}
                </NavLink>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="kd-menu"
              aria-label="Toggle navigation menu"
              className="relative grid h-12 w-12 place-items-center rounded-full border border-[#f6dc8c]/40 bg-white/5 backdrop-blur transition-colors hover:bg-white/10"
            >
              {open ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" stroke="#f6dc8c" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="h-7 w-auto" aria-hidden="true">
                  <path d={KARNATAKA_PATH} fill="#ffcc00" stroke="#d6262b" strokeWidth="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <MapMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
