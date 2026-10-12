import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import "@/features/karunadu/karunadu.css";
import Cursor from "@/features/karunadu/components/Cursor";
import Intro from "@/features/karunadu/components/Intro";
import Nav from "@/features/karunadu/components/Nav";
import Footer from "@/features/karunadu/components/Footer";

/* Flag-coloured curtain that sweeps across when the page changes */
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
      <div key={run} className={`curtain ${run ? "run" : ""}`} aria-hidden="true">
        <span />
        <span />
      </div>
      <div key={`m${run}`} className="curtain__mark" aria-hidden="true">
        <span className="f-serif text-8xl font-bold text-[#1a0a06]">ಕ</span>
      </div>
    </>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [cursorOn, setCursorOn] = useState(false);
  const { pathname } = useLocation();
  const onActive = useCallback((on: boolean) => setCursorOn(on), []);

  useEffect(() => {
    // jump to the top after the curtain has closed over the old page
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
