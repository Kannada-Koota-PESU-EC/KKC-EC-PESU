import { lazy, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import KarnatakaIcon from "@/features/karunadu/components/KarnatakaIcon";
import { OPEN_JOURNEY_EVENT as EVENT, openJourney } from "@/features/karunadu/journey-events";

const Journey3D = lazy(() => import("@/features/karunadu/components/Journey3D"));


/** Mounted once in the layout: renders the 3D journey when asked */
export function JourneyHost() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);
  if (!open) return null;
  return createPortal(
    <div className="kd">
      <Suspense fallback={null}>
        <Journey3D open={open} onClose={() => setOpen(false)} />
      </Suspense>
    </div>,
    document.body
  );
}

/* The one icon that holds all of Karnataka – click to fly across it in 3D */
export default function IconLauncher({ className = "", size = "h-40 w-40", label = true }: { className?: string; size?: string; label?: boolean }) {
  return (
    <button type="button" onClick={openJourney} className={`kd-icon-btn group relative ${className}`} aria-label="Open the 3D journey across Karnataka" data-cursor="zari">
      <span className="kd-icon-halo pointer-events-none absolute inset-0 rounded-full border-2 border-[#ffcc00]/60" />
      <KarnatakaIcon className={size} />
      {label && <span className="f-serif mt-3 block text-center text-sm text-[#f6dc8c] opacity-80 transition-opacity group-hover:opacity-100">ಕರುನಾಡು · 3D</span>}
    </button>
  );
}
