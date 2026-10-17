import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from "react";

export function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function finePointer() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/** true once the element has entered the viewport */
export function useInView<T extends Element>(threshold = 0.18, once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

/**
 * Scroll progress of an element: 0 when its top reaches the bottom of the
 * viewport, 1 when its bottom leaves the top. `mode: "pin"` instead measures
 * progress through a tall sticky container (0 → 1 while it is pinned).
 */
export function useScrollProgress<T extends HTMLElement>(mode: "through" | "pin" = "through") {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "pin"
          ? -r.top / Math.max(1, r.height - vh)
          : (vh - r.top) / (vh + r.height);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [mode]);

  return { ref, progress };
}

/** page scroll 0 → 1 */
export function usePageProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return p;
}

/** 3D tilt that follows the mouse */
export function useTilt(max = 10) {
  const [style, setStyle] = useState<CSSProperties>({});
  const onPointerMove = (e: RPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`,
      transition: "transform 0.08s linear",
    });
  };
  const onPointerLeave = () =>
    setStyle({ transform: "perspective(900px)", transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)" });
  return { style, onPointerMove, onPointerLeave };
}

/** element drifts toward the cursor when it is near */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      el.style.transition = "transform 0.15s ease-out";
    };
    const leave = () => {
      el.style.transform = "";
      el.style.transition = "transform 0.7s cubic-bezier(0.34,1.56,0.64,1)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return ref;
}

/** split text into user-perceived characters (keeps Kannada conjuncts whole) */
export function graphemes(text: string): string[] {
  type SegmenterCtor = new (locale: string, opts: { granularity: "grapheme" }) => {
    segment: (s: string) => Iterable<{ segment: string }>;
  };
  const Seg = (Intl as unknown as { Segmenter?: SegmenterCtor }).Segmenter;
  const raw = Seg ? Array.from(new Seg("kn", { granularity: "grapheme" }).segment(text), (s) => s.segment) : Array.from(text);
  // Kannada conjuncts (ottakshara): a consonant + virama joins the next letter
  const out: string[] = [];
  for (const part of raw) {
    const prev = out[out.length - 1];
    if (prev && (prev.endsWith("\u0CCD") || prev.endsWith("\u200D"))) {
      out[out.length - 1] = prev + part;
    } else {
      out.push(part);
    }
  }
  return out;
}
