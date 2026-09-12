import { useEffect, useState } from "react";

/**
 * GaneshChaturthiAnimation2
 * Alternative splash screen — deep violet/saffron aesthetic with:
 *  - Falling marigold petals
 *  - Floating diya lamps at the bottom
 *  - Lotus-bloom reveal ring around Ganesha
 *  - Char-by-char Kannada greeting animation
 *  - Radiant divine-light burst on entry
 */

// ── Petals ────────────────────────────────────────────────────────────────────
const PETAL_COUNT = 28;
const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 5) % 96}%`,
  size: 6 + (i % 5) * 2,
  delay: (i * 0.35) % 6,
  duration: 5 + (i % 4),
  drift: ((i % 2) === 0 ? 1 : -1) * (15 + (i % 3) * 10),
  rotate: 60 + (i % 5) * 40,
  hue: 30 + (i % 3) * 8,
}));

// ── Diyas ─────────────────────────────────────────────────────────────────────
const DIYA_COUNT = 7;
const diyas = Array.from({ length: DIYA_COUNT }, (_, i) => ({
  id: i,
  delay: i * 0.25,
}));

// ── Kannada greeting words ───────────────────────────────────────────────────
// IMPORTANT: Indic scripts need the full word in one text run for the browser's
// shaping engine to attach matras/half-forms correctly. Splitting per-grapheme
// and wrapping each in an inline-block span breaks shaping. We split by space
// (word level) and use display:inline so each word shapes as a whole unit.
const KANNADA_TEXT = "ಗೌರಿ-ಗಣೇಶ ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು";
const words = KANNADA_TEXT.split(" ");

// ── Component ─────────────────────────────────────────────────────────────────
const GaneshChaturthiAnimation2 = () => {
  const [phase, setPhase] = useState<"entering" | "visible" | "exiting" | "done">("entering");
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const t0 = setTimeout(() => setPhase("visible"), 80);
    const t1 = setTimeout(() => setPhase("exiting"), 5200);
    const t2 = setTimeout(() => setPhase("done"), 6600);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Reveal Kannada words one by one after splash enters
  useEffect(() => {
    if (phase !== "visible") return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setVisibleWords(idx);
      if (idx >= words.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [phase]);

  if (phase === "done") return null;

  const wrapOpacity = phase === "entering" ? 0 : phase === "exiting" ? 0 : 1;
  const wrapTransition =
    phase === "entering" ? "opacity 0.9s cubic-bezier(.22,1,.36,1)"
    : phase === "exiting"  ? "opacity 1.4s ease-out"
    : "opacity 0.9s cubic-bezier(.22,1,.36,1)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background:
          "radial-gradient(ellipse at 50% 40%, hsl(270 60% 8%) 0%, hsl(260 40% 5%) 50%, hsl(240 20% 3%) 100%)",
        opacity: wrapOpacity,
        transition: wrapTransition,
      }}
    >
      {/* ── Divine conic burst ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(110vw, 800px)",
          height: "min(110vw, 800px)",
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, transparent 0deg, hsl(44 100% 55% / 0.07) 20deg, transparent 40deg, hsl(280 80% 65% / 0.05) 60deg, transparent 80deg, hsl(44 100% 55% / 0.07) 100deg, transparent 120deg, hsl(280 80% 65% / 0.05) 140deg, transparent 160deg, hsl(44 100% 55% / 0.07) 180deg, transparent 200deg, hsl(280 80% 65% / 0.05) 220deg, transparent 240deg, hsl(44 100% 55% / 0.07) 260deg, transparent 280deg, hsl(280 80% 65% / 0.05) 300deg, transparent 320deg, hsl(44 100% 55% / 0.07) 340deg, transparent 360deg)",
          animation: "g2-burst-spin 30s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── Radial aura ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -54%)",
          width: "min(65vw, 480px)",
          height: "min(65vw, 480px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(44 100% 55% / 0.22) 0%, hsl(280 70% 55% / 0.12) 40%, transparent 70%)",
          animation: "g2-aura-pulse 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── Falling petals ── */}
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            borderRadius: "50% 50% 50% 0 / 60% 60% 40% 40%",
            background: `hsl(${p.hue} 90% 60%)`,
            boxShadow: `0 0 6px hsl(${p.hue} 90% 60% / 0.6)`,
            animationName: "g2-petal-fall",
            animationDuration: `${p.duration}s`,
            animationTimingFunction: "cubic-bezier(.3, 0, .7, 1)",
            animationDelay: `${p.delay}s`,
            animationIterationCount: "infinite",
            ["--drift" as string]: `${p.drift}px`,
            ["--rot" as string]: `${p.rotate}deg`,
          }}
        />
      ))}

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          padding: "0 24px",
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* OM */}
        <div
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 3rem)",
            background: "linear-gradient(135deg, hsl(44 100% 70%), hsl(280 80% 70%), hsl(44 100% 60%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 900,
            marginBottom: 10,
            filter: "drop-shadow(0 0 18px hsl(44 100% 60% / 0.7))",
            animation: "g2-om-breathe 2.8s ease-in-out infinite",
          }}
        >
          ॐ
        </div>

        {/* Ganesha + lotus ring */}
        <div
          style={{
            position: "relative",
            width: "clamp(220px, 55vw, 360px)",
            height: "clamp(220px, 55vw, 360px)",
          }}
        >
          {/* 8-petal lotus bloom */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "22%",
                height: "36%",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                background:
                  i % 2 === 0
                    ? "linear-gradient(160deg, hsl(320 80% 65% / 0.55), hsl(280 70% 55% / 0.3))"
                    : "linear-gradient(160deg, hsl(44 100% 65% / 0.55), hsl(30 90% 55% / 0.3))",
                transformOrigin: "50% 100%",
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                animationName: "g2-lotus-bloom",
                animationDuration: "1.2s",
                animationTimingFunction: "cubic-bezier(.34,1.56,.64,1)",
                animationDelay: `${i * 0.08}s`,
                animationFillMode: "both",
                boxShadow:
                  i % 2 === 0
                    ? "0 0 14px hsl(320 80% 65% / 0.4)"
                    : "0 0 14px hsl(44 100% 65% / 0.4)",
              }}
            />
          ))}

          {/* Gradient spinning ring */}
          <div
            style={{
              position: "absolute",
              inset: "-14px",
              borderRadius: "50%",
              border: "1.5px solid transparent",
              background:
                "linear-gradient(hsl(270 60% 8%), hsl(270 60% 8%)) padding-box, linear-gradient(135deg, hsl(44 100% 60%), hsl(280 80% 65%), hsl(44 100% 60%)) border-box",
              animation: "g2-ring-spin 8s linear infinite",
              pointerEvents: "none",
            }}
          />
          {/* Dashed counter ring */}
          <div
            style={{
              position: "absolute",
              inset: "-24px",
              borderRadius: "50%",
              border: "1px dashed hsl(44 100% 55% / 0.3)",
              animation: "g2-ring-spin 14s linear infinite reverse",
              pointerEvents: "none",
            }}
          />
          {/* Dotted outer ring */}
          <div
            style={{
              position: "absolute",
              inset: "-38px",
              borderRadius: "50%",
              border: "1px dotted hsl(280 70% 65% / 0.25)",
              animation: "g2-ring-spin 20s linear infinite",
              pointerEvents: "none",
            }}
          />

          {/* Ganesha image */}
          <img
            src="/lord_ganesha.jpg"
            alt="Lord Ganesha"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "50%",
              display: "block",
              mixBlendMode: "screen",
              filter:
                "brightness(1.15) saturate(1.2) drop-shadow(0 0 28px hsl(44 100% 55% / 0.65)) drop-shadow(0 0 60px hsl(280 80% 65% / 0.3))",
              animation: "g2-ganesha-reveal 1s cubic-bezier(.34,1.56,.64,1) both",
            }}
          />
        </div>

        {/* Kannada greeting — word-by-word reveal (preserves Indic shaping) */}
        <div
          style={{
            fontFamily: "'Noto Sans Kannada', sans-serif",
            fontSize: "clamp(0.85rem, 2.4vw, 1.3rem)",
            fontWeight: 700,
            lineHeight: 1.6,
            letterSpacing: "0.02em",
            marginTop: 22,
            whiteSpace: "nowrap",
            padding: "0 8px",
          }}
        >
          {words.map((word, i) => (
            <span key={i}>
              <span
                style={{
                  color: i % 2 === 0 ? "hsl(44 100% 70%)" : "hsl(320 80% 75%)",
                  textShadow:
                    i % 2 === 0
                      ? "0 0 18px hsl(44 100% 60% / 0.8)"
                      : "0 0 18px hsl(320 80% 65% / 0.8)",
                  opacity: i < visibleWords ? 1 : 0,
                  display: "inline",
                  transition: "opacity 0.4s ease",
                }}
              >
                {word}
              </span>
              {i < words.length - 1 && (
                <span
                  style={{
                    opacity: i < visibleWords ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    display: "inline",
                    color: "hsl(44 100% 70%)",
                  }}
                >
                  {" "}
                </span>
              )}
            </span>
          ))}
        </div>

        {/* English subtitle with shimmer */}
        <div
          style={{
            fontSize: "clamp(0.7rem, 1.8vw, 0.88rem)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginTop: 8,
            background:
              "linear-gradient(90deg, hsl(44 80% 70%), hsl(280 70% 75%), hsl(44 80% 70%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            backgroundSize: "200% 100%",
            animation: "g2-shimmer 3s linear infinite",
          }}
        >
          Ganesh Chaturthi · 2026
        </div>

        {/* Club name */}
        <div
          style={{
            marginTop: 14,
            fontSize: "clamp(0.65rem, 1.6vw, 0.8rem)",
            color: "hsl(280 60% 70%)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            opacity: 0.75,
            fontWeight: 600,
          }}
        >
          Kannada Koota · EC PES
        </div>

        {/* Decorative triple diamond row */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: 0.65,
          }}
        >
          <div style={{ width: 36, height: 1, background: "linear-gradient(90deg, transparent, hsl(280 70% 65%))" }} />
          <span style={{ color: "hsl(280 70% 70%)", fontSize: "0.9rem" }}>✦</span>
          <span style={{ color: "hsl(44 100% 65%)", fontSize: "0.9rem" }}>✦</span>
          <span style={{ color: "hsl(280 70% 70%)", fontSize: "0.9rem" }}>✦</span>
          <div style={{ width: 36, height: 1, background: "linear-gradient(90deg, hsl(44 100% 65%), transparent)" }} />
        </div>
      </div>

      {/* ── Diya row at bottom ── */}
      <div
        style={{
          position: "absolute",
          bottom: "4vh",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "clamp(14px, 3vw, 28px)",
          zIndex: 3,
        }}
      >
        {diyas.map((d) => (
          <div
            key={d.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animationName: "g2-diya-appear",
              animationDuration: "0.6s",
              animationTimingFunction: "ease",
              animationDelay: `${d.delay}s`,
              animationFillMode: "both",
            }}
          >
            {/* Flame */}
            <div
              style={{
                width: 8,
                height: 14,
                borderRadius: "50% 50% 30% 30%",
                background: "linear-gradient(180deg, hsl(55 100% 75%), hsl(30 100% 55%))",
                boxShadow:
                  "0 0 10px hsl(44 100% 60% / 0.9), 0 0 22px hsl(44 100% 55% / 0.5)",
                animationName: "g2-flame-flicker",
                animationDuration: "0.9s",
                animationTimingFunction: "ease-in-out",
                animationDelay: `${d.delay}s`,
                animationIterationCount: "infinite",
                animationDirection: "alternate",
                marginBottom: 2,
              }}
            />
            {/* Wick */}
            <div style={{ width: 2, height: 5, background: "hsl(30 40% 30%)" }} />
            {/* Bowl */}
            <div
              style={{
                width: 28,
                height: 12,
                borderRadius: "0 0 50% 50%",
                background: "linear-gradient(180deg, hsl(30 70% 45%), hsl(25 60% 30%))",
                boxShadow: "0 2px 8px hsl(30 80% 40% / 0.5)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes g2-burst-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes g2-aura-pulse {
          0%,100% { transform: translate(-50%,-54%) scale(1);    opacity: 0.8; }
          50%      { transform: translate(-50%,-54%) scale(1.12); opacity: 1; }
        }
        @keyframes g2-petal-fall {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes g2-om-breathe {
          0%,100% { filter: drop-shadow(0 0 18px hsl(44 100% 60% / 0.7)); transform: scale(1); }
          50%     { filter: drop-shadow(0 0 32px hsl(280 80% 65% / 0.9)); transform: scale(1.08); }
        }
        @keyframes g2-lotus-bloom {
          from { transform: translate(-50%,-100%) scaleY(0); opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes g2-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes g2-ganesha-reveal {
          from { opacity: 0; transform: scale(0.7); filter: brightness(2) saturate(0); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes g2-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes g2-diya-appear {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes g2-flame-flicker {
          from { transform: scaleX(1)   scaleY(1)    skewX(0deg); }
          to   { transform: scaleX(0.8) scaleY(1.15) skewX(4deg); }
        }
      `}</style>
    </div>
  );
};

export default GaneshChaturthiAnimation2;
