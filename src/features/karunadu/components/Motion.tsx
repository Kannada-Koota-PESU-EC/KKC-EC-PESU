import { useEffect, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { graphemes, reducedMotion, useInView, useMagnetic } from "@/features/karunadu/hooks";

type Variant = "up" | "wipe" | "side" | "side-r" | "scale" | "focus";

const cls: Record<Variant, string> = {
  up: "",
  wipe: "rv--wipe",
  side: "rv--side",
  "side-r": "rv--side-r",
  scale: "rv--scale",
  focus: "rv--focus",
};

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  // A clipped element never "intersects", so the wipe animates an inner layer
  if (variant === "wipe") {
    return (
      <Tag ref={ref} className={className} style={style}>
        <div className={`rv rv--wipe ${inView ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
          {children}
        </div>
      </Tag>
    );
  }
  return (
    <Tag
      ref={ref}
      className={`rv ${cls[variant]} ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/** Text that assembles itself one akshara at a time (words never break apart) */
export function Letters({
  text,
  as: Tag = "span",
  className = "",
  glyphClassName = "",
  delay = 0,
  step = 45,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  glyphClassName?: string;
  delay?: number;
  step?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  let i = 0;
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`${inView ? "in" : ""} ${className}`} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {graphemes(word).map((g) => {
            const n = i++;
            return (
              <span key={n} className={`glyph ${glyphClassName}`} style={{ transitionDelay: `${delay + n * step}ms` }}>
                {g}
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block w-[0.28em]" />}
        </span>
      ))}
    </Tag>
  );
}

const KANNADA_POOL = "ಅಆಇಈಉಊಎಏಐಒಓಔಕಖಗಘಚಛಜಝಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಲವಶಷಸಹಳ";

/** Text that "decodes" through the Kannada alphabet before settling */
export function Scramble({ text, className = "", duration = 1200 }: { text: string; className?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reducedMotion()) {
      setOut(text);
      return;
    }
    const target = graphemes(text);
    const pool = graphemes(KANNADA_POOL);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * target.length);
      setOut(
        target
          .map((g, i) => (i < settled || g === " " ? g : pool[Math.floor(Math.random() * pool.length)]))
          .join("")
      );
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, text, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** Wrapper that makes its child drift toward the cursor */
export function Magnetic({ children, strength = 0.3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useMagnetic<HTMLSpanElement>(strength);
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}

/** Number that counts up when visible, keeping any suffix like "+" */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(match ? 0 : value);

  useEffect(() => {
    if (!match) return;
    if (!inView) return;
    if (reducedMotion()) {
      setN(target);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      const eased = 1 - Math.pow(1 - t, 4);
      setN(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  return (
    <span ref={ref} className={className}>
      {typeof n === "number" ? `${n}${suffix}` : n}
    </span>
  );
}
