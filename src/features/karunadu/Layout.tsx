import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import "@/features/karunadu/karunadu.css";
import Cursor from "@/features/karunadu/components/Cursor";
import Intro from "@/features/karunadu/components/Intro";
import Nav from "@/features/karunadu/components/Nav";
import Footer from "@/features/karunadu/components/Footer";

/* Between pages the Kannada flag is hoisted, whole, up a golden flagpole –
 * as at a Rajyotsava flag hoisting – then the new page appears. */
function PageCurtain() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setRun((n) => n + 1);
  }, [pathname]);

  return (
    <>
      {/* a gentle ripple, so the flag flutters like cloth */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="kd-flag-ripple" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="1" seed="4">
            <animate attributeName="baseFrequency" dur="1.4s" values="0.012 0.02;0.016 0.026;0.012 0.02" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div key={run} className={`hoist ${run ? "run" : ""}`} aria-hidden="true">
        <div className="hoist__stage">
          <span className="hoist__glow" />
          <span className="hoist__pole" />
          <span className="hoist__finial" />
          <span className="hoist__base" />
          <span className="hoist__flag" />
        </div>
        <p className="hoist__name f-serif">ಕನ್ನಡ ಕೂಟ</p>
      </div>
    </>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [cursorOn, setCursorOn] = useState(false);
  const { pathname } = useLocation();
  const onActive = useCallback((on: boolean) => setCursorOn(on), []);

  useEffect(() => {
    // jump to the top once the hoisting screen has covered the old page
    const t = setTimeout(() => window.scrollTo(0, 0), 420);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className={`kd flex min-h-screen flex-col ${cursorOn ? "cursor-on" : ""}`}>
      <Intro />
      <Cursor onActive={onActive} />
      <PageCurtain />
      <div className="kd-grain" aria-hidden="true" />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
