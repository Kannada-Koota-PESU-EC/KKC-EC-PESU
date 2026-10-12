import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { usePageProgress } from "@/features/karunadu/hooks";

// Original navigation (Recruitment removed as requested) plus the 3D map of Karnataka.
const NAV = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Blogs", path: "/blogs" },
  { name: "Team", path: "/team" },
  { name: "Karunadu 3D", path: "/karunadu" },
  { name: "Contact", path: "/contact" },
];

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
              className="relative grid h-11 w-11 place-items-center rounded-full border border-[#f6dc8c]/40 bg-white/5 backdrop-blur transition-colors hover:bg-white/10 md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                {open ? (
                  <path d="M5 5l14 14M19 5L5 19" stroke="#f6dc8c" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h10" stroke="#f6dc8c" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* phone menu: a simple drop-down list */}
        <nav
          id="kd-menu"
          aria-label="Main menu"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-500 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0">
            <div className="mx-4 mt-3 flex flex-col rounded-2xl border border-[#f6dc8c]/20 bg-[#12030a]/95 p-2 backdrop-blur-xl">
              {NAV.map((n) => (
                <NavLink
                  key={n.path}
                  to={n.path}
                  end={n.path === "/"}
                  className={({ isActive }) => `rounded-xl px-4 py-3 text-base font-semibold ${isActive ? "bg-[#ffcc00] text-[#1a0a06]" : "text-[#fbf3e2]"}`}
                >
                  {n.name}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
