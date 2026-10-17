import { useEffect, useRef } from "react";

/** A lightweight Bharatanatyam cursor companion: settles into a gentle dance when the pointer rests. */
export default function TraditionCursor() {
  const dancer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const element = dancer.current;
    if (!element) return;

    let idleTimer: ReturnType<typeof setTimeout>;
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      // Keep the artwork above and to the right of the hotspot, away from controls.
      x = event.clientX + 14;
      y = event.clientY - 54;
      if (!frame) frame = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        element.classList.add("is-visible");
        frame = 0;
      });
      element.classList.remove("is-still");
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => element.classList.add("is-still"), 480);
    };
    const leave = () => element.classList.remove("is-visible", "is-still");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={dancer} className="tradition-cursor" aria-hidden="true">
    <img className="cursor-dancer-art" src="/dancer-cursor.png" alt="" draggable="false" />
  </div>;
}
