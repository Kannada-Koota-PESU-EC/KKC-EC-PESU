import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Lost in the Western Ghats mist.
export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#0e1a14,#1f4d2b)]" data-cursor="firefly">
      <div className="rain opacity-50" />
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="firefly" style={{ left: `${(i * 41) % 95}%`, top: `${20 + ((i * 29) % 70)}%`, ["--d" as string]: `${i * 0.35}s` }} />
      ))}
      <div className="mist" style={{ top: "30%" }} />
      <div className="mist" style={{ top: "65%" }} />
      <div className="relative text-center">
        <svg viewBox="0 0 100 100" className="spin-slow mx-auto mb-6 h-24 w-24" aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#f6dc8c" strokeWidth="2" />
          <path d="M50 12 L58 50 L50 88 L42 50 Z" fill="#d6262b" />
          <path d="M50 50 L58 50 L50 88 L42 50 Z" fill="#fbf3e2" />
        </svg>
        <h1 className="f-display mb-4 text-7xl font-bold text-[#fbf3e2]">404</h1>
        <p className="mb-6 text-xl text-[#fbf3e2]/80">Oops! Page not found</p>
        <a href="/" className="btn-silk">Return to Home</a>
      </div>
    </div>
  );
}
