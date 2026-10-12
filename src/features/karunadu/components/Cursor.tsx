import { useEffect, useRef, useState } from "react";
import { finePointer, reducedMotion } from "@/features/karunadu/hooks";

export type CursorMode = "mallige" | "zari" | "ink" | "firefly" | "silver" | "ember" | "water" | "kumkuma" | "film" | "compass";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  kind: "petal" | "spark" | "dot" | "ring" | "line" | "square";
}

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary, label";
const RANGOLI = ["#ffcc00", "#d6262b", "#b3134f", "#1d7f86", "#5c9a4a", "#fbf3e2"];

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function CursorIcon({ mode }: { mode: CursorMode }) {
  switch (mode) {
    case "zari":
      return (
        <svg viewBox="0 0 32 32"><path d="M16 2l3 10 10 4-10 4-3 10-3-10-10-4 10-4z" fill="#f6dc8c" stroke="#8a5a14" strokeWidth="1.2" /></svg>
      );
    case "ink":
      return (
        <svg viewBox="0 0 32 32"><path d="M28 2C18 6 10 14 6 24l3 2C14 16 21 9 28 2z" fill="#fbf3e2" stroke="#1a0a06" strokeWidth="1.4" /><path d="M6 24l-3 6 6-4" fill="#1a0a06" /></svg>
      );
    case "firefly":
      return (
        <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="6" fill="#e9ff7a" /><circle cx="16" cy="16" r="12" fill="#e9ff7a" opacity=".25" /></svg>
      );
    case "silver":
      return (
        <svg viewBox="0 0 32 32"><path d="M16 3l11 13-11 13L5 16z" fill="#17191c" stroke="#d6dde3" strokeWidth="1.6" /><path d="M16 9l5 7-5 7-5-7z" fill="none" stroke="#d6dde3" strokeWidth="1.2" /></svg>
      );
    case "ember":
      return (
        <svg viewBox="0 0 32 32"><path d="M16 4c4 6 6 9 6 13a6 6 0 0 1-12 0c0-4 2-7 6-13z" fill="#ffb300" /><path d="M16 11c2 3 3 5 3 7a3 3 0 0 1-6 0c0-2 1-4 3-7z" fill="#fff3c0" /><path d="M5 22h22c-1 5-5 8-11 8S6 27 5 22z" fill="#c0521b" /></svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 32 32"><path d="M16 3c6 9 9 14 9 18a9 9 0 0 1-18 0c0-4 3-9 9-18z" fill="#1d7f86" stroke="#bff3f0" strokeWidth="1.4" /></svg>
      );
    case "kumkuma":
      return (
        <svg viewBox="0 0 32 32"><ellipse cx="16" cy="19" rx="11" ry="6" fill="#ffcc00" /><ellipse cx="16" cy="16" rx="8" ry="4" fill="#d6262b" /></svg>
      );
    case "film":
      return (
        <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#1a0a06" stroke="#f7ecd0" strokeWidth="1.6" />{[0, 72, 144, 216, 288].map((a) => (<circle key={a} cx={16 + 7 * Math.cos((a * Math.PI) / 180)} cy={16 + 7 * Math.sin((a * Math.PI) / 180)} r="2.6" fill="#f7ecd0" />))}</svg>
      );
    case "compass":
      return (
        <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#f6dc8c" strokeWidth="1.6" /><path d="M16 5l3 11-3 11-3-11z" fill="#d6262b" /><path d="M16 16l3 0-3 11-3-11z" fill="#fbf3e2" /></svg>
      );
    default:
      // ಮಲ್ಲಿಗೆ – Mysuru jasmine
      return (
        <svg viewBox="0 0 32 32">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="16" cy="8" rx="4.2" ry="8" fill="#fffdf6" stroke="#d9cfa8" strokeWidth=".8" transform={`rotate(${a} 16 16)`} />
          ))}
          <circle cx="16" cy="16" r="3" fill="#f6dc8c" />
        </svg>
      );
  }
}

export default function Cursor({ onActive }: { onActive: (on: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("mallige");
  const [hot, setHot] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const modeRef = useRef<CursorMode>("mallige");

  useEffect(() => {
    if (finePointer()) setEnabled(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;
    onActive(true);
    const calm = reducedMotion();
    const ctx = canvas.getContext("2d");
    const particles: Particle[] = [];
    const pointer = { x: -200, y: -200, px: -200, py: -200 };
    const icon = { x: -200, y: -200 };
    let frame = 0;
    let running = false;
    let lastEmit = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const emit = (x: number, y: number, speed: number) => {
      if (calm) return;
      const m = modeRef.current;
      const n = Math.min(4, 1 + Math.floor(speed / 18));
      for (let i = 0; i < n; i++) {
        const base: Particle = {
          x, y, vx: rand(-0.6, 0.6), vy: rand(-0.6, 0.6), life: 0, max: rand(40, 70),
          size: rand(3, 6), rot: rand(0, Math.PI * 2), vr: rand(-0.08, 0.08), color: "#fff", kind: "dot",
        };
        switch (m) {
          case "mallige":
            particles.push({ ...base, kind: "petal", color: "#fffdf2", vy: rand(0.4, 1.4), size: rand(4, 7), max: rand(60, 90) });
            break;
          case "zari":
            particles.push({ ...base, kind: "spark", color: Math.random() > 0.5 ? "#f6dc8c" : "#d9a63a", size: rand(3, 7) });
            break;
          case "ink":
            particles.push({ ...base, kind: "dot", color: "rgba(20,10,6,0.85)", vx: 0, vy: 0.15, size: rand(2.5, 4.5), max: 50 });
            break;
          case "firefly":
            particles.push({ ...base, kind: "dot", color: "#e9ff7a", vy: rand(-1.2, -0.3), size: rand(2, 3.5), max: rand(60, 100) });
            break;
          case "silver":
            particles.push({ ...base, kind: "line", color: "#d6dde3", vx: rand(-2, 2), vy: rand(-2, 2), size: rand(4, 9), max: 30 });
            break;
          case "ember":
            particles.push({ ...base, kind: "dot", color: Math.random() > 0.4 ? "#ffb300" : "#ff6a1a", vy: rand(-1.6, -0.6), size: rand(1.5, 3.5), max: rand(40, 70) });
            break;
          case "water":
            if (i === 0) particles.push({ ...base, kind: "ring", color: "#bff3f0", vx: 0, vy: 0, size: 2, max: 45 });
            break;
          case "kumkuma":
            particles.push({ ...base, kind: "dot", color: Math.random() > 0.5 ? "#d6262b" : "#ffcc00", vx: rand(-1.4, 1.4), vy: rand(0.2, 1.6), size: rand(1.5, 3), max: 50 });
            break;
          case "film":
            particles.push({ ...base, kind: "square", color: "rgba(247,236,208,0.8)", size: rand(3, 5), max: 35 });
            break;
          case "compass":
            particles.push({ ...base, kind: "dot", color: "#d6262b", vx: 0, vy: 0, size: 2, max: 30 });
            break;
        }
      }
    };

    const burst = (x: number, y: number) => {
      if (calm) return;
      const count = 18;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const sp = i % 2 ? 3.2 : 2.2;
        particles.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 55, size: i % 2 ? 3.5 : 2.5,
          rot: a, vr: 0, color: RANGOLI[i % RANGOLI.length], kind: i % 3 === 0 ? "petal" : "dot",
        });
      }
      particles.push({ x, y, vx: 0, vy: 0, life: 0, max: 40, size: 4, rot: 0, vr: 0, color: "#f6dc8c", kind: "ring" });
      start();
    };

    const draw = () => {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // icon follows with a little lag
      icon.x += (pointer.x - icon.x) * 0.35;
      icon.y += (pointer.y - icon.y) * 0.35;
      if (iconRef.current) iconRef.current.style.transform = `translate3d(${icon.x}px, ${icon.y}px, 0)`;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.kind === "petal") p.vx += Math.sin(p.life / 9) * 0.03;
        const t = p.life / p.max;
        const alpha = 1 - t;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        switch (p.kind) {
          case "petal":
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "spark":
            ctx.beginPath();
            for (let k = 0; k < 4; k++) {
              ctx.rotate(Math.PI / 2);
              ctx.moveTo(0, 0);
              ctx.lineTo(0, p.size * (1 - t * 0.5));
            }
            ctx.lineWidth = 1.4;
            ctx.stroke();
            break;
          case "ring":
            ctx.beginPath();
            ctx.arc(0, 0, p.size + t * 26, 0, Math.PI * 2);
            ctx.lineWidth = 1.5;
            ctx.stroke();
            break;
          case "line":
            ctx.beginPath();
            ctx.moveTo(-p.size / 2, 0);
            ctx.lineTo(p.size / 2, 0);
            ctx.lineWidth = 1.2;
            ctx.stroke();
            break;
          case "square":
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
            break;
          default:
            if (p.color === "#e9ff7a" || p.color === "#ffb300") {
              ctx.shadowBlur = 10;
              ctx.shadowColor = p.color;
            }
            ctx.beginPath();
            ctx.arc(0, 0, p.size * (1 - t * 0.4), 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
        if (p.life >= p.max) particles.splice(i, 1);
      }
      ctx.globalAlpha = 1;

      const settled = Math.abs(pointer.x - icon.x) < 0.3 && Math.abs(pointer.y - icon.y) < 0.3;
      if (particles.length === 0 && settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.px = pointer.x;
      pointer.py = pointer.y;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (icon.x < -100) {
        icon.x = pointer.x;
        icon.y = pointer.y;
      }
      const el = e.target instanceof Element ? e.target : null;
      const zone = el?.closest<HTMLElement>("[data-cursor]");
      const next = (zone?.dataset.cursor as CursorMode) ?? "mallige";
      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
      setHot(Boolean(el?.closest(INTERACTIVE)));
      const now = performance.now();
      const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
      if (now - lastEmit > 28 && speed > 1.5) {
        emit(pointer.x, pointer.y, speed);
        lastEmit = now;
      }
      start();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") burst(e.clientX, e.clientY);
    };
    const onLeave = () => {
      pointer.x = pointer.y = -200;
      start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
      onActive(false);
    };
  }, [enabled, onActive]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[250]" aria-hidden="true" />
      <div ref={iconRef} className="pointer-events-none fixed left-0 top-0 z-[251]" aria-hidden="true">
        <span
          className="absolute -left-5 -top-5 block h-10 w-10 rounded-full border border-[#f6dc8c] transition-all duration-300"
          style={{ opacity: hot ? 0.9 : 0, transform: hot ? "scale(1.35)" : "scale(0.4)" }}
        />
        <span
          className="absolute -left-3 -top-3 block h-6 w-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-transform duration-300"
          style={{ transform: hot ? "scale(1.25) rotate(-15deg)" : "none" }}
        >
          <CursorIcon mode={mode} />
        </span>
      </div>
    </>
  );
}
