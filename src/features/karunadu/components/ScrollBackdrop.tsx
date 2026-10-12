import { useEffect, useRef } from "react";

/* One continuous sky behind the whole home page.
 * Every section declares a tone (data-tone="#rrggbb,#rrggbb" = base, glow);
 * as you scroll, the backdrop melts from one section's tone into the next,
 * so the colours flow like a single story instead of separate blocks. */

type RGB = [number, number, number];

const hex = (h: string): RGB => {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const css = (c: RGB, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function ScrollBackdrop() {
  const base = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
      if (!nodes.length || !base.current || !glow.current) return;
      const mid = window.innerHeight * 0.5;
      // section under the middle of the screen
      let i = nodes.findIndex((n) => n.getBoundingClientRect().bottom > mid);
      if (i < 0) i = nodes.length - 1;
      const r = nodes[i].getBoundingClientRect();
      const f = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
      const [b0, g0] = nodes[i].dataset.tone!.split(",").map(hex);
      const next = nodes[Math.min(nodes.length - 1, i + 1)];
      const [b1, g1] = next.dataset.tone!.split(",").map(hex);
      // hold the tone for most of the section, then melt into the next one
      const t = smooth(Math.max(0, (f - 0.55) / 0.45));
      const b = mix(b0, b1, t);
      const g = mix(g0, g1, t);
      const y = 30 + Math.sin((window.scrollY / window.innerHeight) * 0.9) * 18;
      const x = 50 + Math.cos((window.scrollY / window.innerHeight) * 0.6) * 22;
      base.current.style.backgroundColor = css(b);
      glow.current.style.background = `radial-gradient(60% 50% at ${x}% ${y}%, ${css(g, 0.55)}, transparent 70%), radial-gradient(50% 40% at ${100 - x}% ${100 - y}%, ${css(g, 0.25)}, transparent 70%)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div ref={base} className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor: "#22060f" }} />
      <div ref={glow} className="absolute inset-0" />
      {/* faint kasuti stitch lattice so the sky feels woven, not flat */}
      <div className="kd-lattice absolute inset-0" />
    </div>
  );
}
