import { useEffect, useState } from "react";

/**
 * GaneshChaturthiAnimation
 * Splash screen shown on first load for Ganesh Chaturthi 2026.
 * Displays for ~5 seconds then fades out, unmounting itself.
 */
const GaneshChaturthiAnimation = () => {
  const [phase, setPhase] = useState<"entering" | "visible" | "exiting" | "done">("entering");

  useEffect(() => {
    // Fade in → hold → fade out timing
    const enterTimer = setTimeout(() => setPhase("visible"), 100);
    const exitTimer  = setTimeout(() => setPhase("exiting"), 4500);
    const doneTimer  = setTimeout(() => setPhase("done"),    5800);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  const opacity =
    phase === "entering" ? 0
    : phase === "exiting" ? 0
    : 1;

  const transition =
    phase === "entering"
      ? "opacity 0.8s ease-in"
      : phase === "exiting"
      ? "opacity 1.3s ease-out"
      : "opacity 0.8s ease-in";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background:
          "radial-gradient(ellipse at 50% 60%, hsl(35 80% 8%) 0%, hsl(0 0% 4%) 55%, hsl(0 0% 2%) 100%)",
        opacity,
        transition,
        overflow: "hidden",
      }}
    >
      {/* Spinning mandala ring behind Ganesha */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{
          width: "min(90vw, 680px)",
          height: "min(90vw, 680px)",
          borderRadius: "50%",
          background: `
            repeating-conic-gradient(from 0deg at center,
              hsl(44 100% 60% / 0.18) 0deg 4deg,
              transparent 4deg 10deg,
              hsl(30 95% 55% / 0.12) 10deg 12deg,
              transparent 12deg 20deg
            ),
            radial-gradient(circle at center,
              transparent 38%,
              hsl(44 100% 55% / 0.12) 38% 40%,
              transparent 40% 48%,
              hsl(35 90% 50% / 0.10) 48% 50%,
              transparent 50% 60%,
              hsl(44 100% 55% / 0.08) 60% 62%,
              transparent 62%
            )
          `,
          animation: "ganesh-spin 24s linear infinite",
        }} />
      </div>

      {/* Outer glow pulse */}
      <div style={{
        position: "absolute",
        width: "min(70vw, 500px)",
        height: "min(70vw, 500px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, hsl(44 100% 55% / 0.15) 0%, transparent 70%)",
        animation: "ganesh-pulse 2.4s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? "6px" : "4px",
            height: i % 3 === 0 ? "6px" : "4px",
            borderRadius: "50%",
            background: i % 2 === 0 ? "hsl(44 100% 65%)" : "hsl(30 95% 60%)",
            left: `${10 + (i * 73) % 80}%`,
            top: `${5 + (i * 53) % 90}%`,
            opacity: 0.6,
            animation: `ganesh-float ${3 + (i % 4)}s ease-in-out ${(i * 0.4)}s infinite`,
            boxShadow: "0 0 8px hsl(44 100% 65% / 0.8)",
          }}
        />
      ))}

      {/* Main content card */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0px",
        padding: "0 24px",
        maxWidth: "500px",
        width: "100%",
        textAlign: "center",
      }}>
        {/* OM symbol */}
        <div style={{
          fontSize: "clamp(2rem, 5vw, 2.8rem)",
          color: "hsl(44 100% 60%)",
          fontWeight: "bold",
          marginBottom: "8px",
          textShadow: "0 0 24px hsl(44 100% 60% / 0.8), 0 0 48px hsl(44 100% 60% / 0.4)",
          animation: "ganesh-pulse 2.4s ease-in-out infinite",
          letterSpacing: "0.05em",
        }}>
          ॐ
        </div>

        {/* Ganesha image — blends into background via screen mode */}
        <div style={{
          position: "relative",
          width: "clamp(240px, 60vw, 380px)",
          height: "clamp(240px, 60vw, 380px)",
          marginBottom: "0px",
        }}>
          {/* Subtle outer glow ring (decorative, not a hard border) */}
          <div style={{
            position: "absolute",
            inset: "-18px",
            borderRadius: "50%",
            border: "1.5px solid hsl(44 100% 55% / 0.35)",
            boxShadow: "0 0 40px hsl(44 100% 55% / 0.25), inset 0 0 40px hsl(44 100% 55% / 0.08)",
            animation: "ganesh-ring-spin 10s linear infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            inset: "-8px",
            borderRadius: "50%",
            border: "1px dashed hsl(44 100% 55% / 0.25)",
            animation: "ganesh-ring-spin 15s linear infinite reverse",
            pointerEvents: "none",
          }} />

          {/* Ganesha image — screen blend makes dark bg transparent */}
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
              filter: "brightness(1.1) saturate(1.15) drop-shadow(0 0 32px hsl(44 100% 55% / 0.6)) drop-shadow(0 0 70px hsl(30 95% 50% / 0.35))",
            }}
          />
        </div>

        {/* Festival greeting in Kannada */}
        <div
          style={{
            fontFamily: "'Noto Sans Kannada', system-ui, sans-serif",
            fontSize: "clamp(1.1rem, 3.5vw, 1.6rem)",
            fontWeight: 700,
            color: "hsl(44 100% 65%)",
            textShadow: "0 0 20px hsl(44 100% 55% / 0.6), 0 2px 4px hsl(0 0% 0% / 0.8)",
            lineHeight: 1.5,
            letterSpacing: "0.02em",
            marginTop: "18px",
            padding: "0 8px",
          }}
        >
          ಗೌರಿ-ಗಣೇಶ ಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು
        </div>

        {/* English subtitle */}
        <div style={{
          fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
          color: "hsl(44 80% 75%)",
          marginTop: "6px",
          opacity: 0.85,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}>
          Ganesh Chaturthi 2026
        </div>

        {/* Club name */}
        <div style={{
          marginTop: "18px",
          fontSize: "clamp(0.7rem, 1.8vw, 0.85rem)",
          color: "hsl(44 60% 60%)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.7,
          fontWeight: 600,
        }}>
          Kannada Koota EC PES
        </div>

        {/* Decorative divider */}
        <div style={{
          marginTop: "12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          opacity: 0.6,
        }}>
          <div style={{ width: "40px", height: "1px", background: "hsl(44 100% 55% / 0.6)" }} />
          <span style={{ color: "hsl(44 100% 60%)", fontSize: "1rem" }}>✦</span>
          <div style={{ width: "40px", height: "1px", background: "hsl(44 100% 55% / 0.6)" }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes ganesh-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ganesh-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ganesh-pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes ganesh-float {
          0%, 100% { transform: translateY(0px) scale(1);   opacity: 0.5; }
          50%       { transform: translateY(-18px) scale(1.2); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default GaneshChaturthiAnimation;
