import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "@/shared/components/layout/LanguageToggle";
import { useLanguage } from "@/shared/i18n/useLanguage";
import type { TranslationKey } from "@/shared/i18n/translations";
import { INTRO_REVEAL_EVENT } from "@/features/intro/data/intro";
import { site } from "@/shared/data/site";
import "./navbar.css";

const navItems: { key: TranslationKey; path: string }[] = [
  { key: "nav.home", path: "/" },
  { key: "nav.events", path: "/events" },
  { key: "nav.blogs", path: "/blogs" },
  { key: "nav.team", path: "/team" },
  { key: "nav.contact", path: "/contact" },
];

const SCROLL_THRESHOLD = 50;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { lang, t } = useLanguage();

  const activeIndex = navItems.findIndex((item) => item.path === location.pathname);
  const closeMenu = () => setIsOpen(false);

  // Glass background after scrolling
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation once the site is visible (after the intro, if it is playing)
  useEffect(() => {
    if (document.documentElement.dataset.introPlaying !== "true") {
      setHasEntered(true);
      return;
    }
    const enter = () => setHasEntered(true);
    window.addEventListener(INTRO_REVEAL_EVENT, enter);
    const fallback = setTimeout(enter, 15000);
    return () => {
      window.removeEventListener(INTRO_REVEAL_EVENT, enter);
      clearTimeout(fallback);
    };
  }, []);

  // Sliding indicator follows the hovered link, otherwise the active one
  const moveIndicator = useCallback(() => {
    const index = hoverIndex ?? activeIndex;
    const link = index >= 0 ? linkRefs.current[index] : null;
    setIndicator(
      link
        ? { left: link.offsetLeft, width: link.offsetWidth, visible: true }
        : (current) => ({ ...current, visible: false }),
    );
  }, [hoverIndex, activeIndex]);

  useLayoutEffect(() => {
    moveIndicator();
  }, [moveIndicator, lang, isScrolled]);

  useEffect(() => {
    window.addEventListener("resize", moveIndicator);
    // Link widths change once the web font finishes loading
    document.fonts?.ready.then(moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  // Mobile panel: close on route change and Escape, lock page scroll while open
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Closed panel can't be tabbed into
    panelRef.current?.toggleAttribute("inert", !isOpen);
    // Lets other fixed elements (e.g. the floating Instagram button) hide while the menu is open
    document.documentElement.toggleAttribute("data-nav-open", isOpen);
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const kannadaFont = lang === "kn" ? "kannada-text" : "";

  return (
    <nav
      className={`site-nav sticky top-0 z-50 ${isScrolled ? "is-scrolled" : ""} ${isOpen ? "is-open" : ""} ${
        hasEntered ? "has-entered" : ""
      }`}
    >
      <div className="site-nav-bg" aria-hidden="true" />

      {/* Mobile side panel (behind the bar so the X stays on top) */}
      <div className="site-nav-backdrop md:hidden" onClick={closeMenu} aria-hidden="true" />
      <div
        ref={panelRef}
        id="mobile-menu"
        className="site-nav-panel md:hidden"
        aria-hidden={!isOpen}
      >
        <div className={`flex flex-col gap-1 ${kannadaFont}`}>
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`site-nav-panel-link ${index === activeIndex ? "is-active" : ""}`}
              style={{ "--i": index } as CSSProperties}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
        <LanguageToggle className="mt-auto self-start" />
      </div>

      <div className="site-nav-bar relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="site-nav-brand nav-enter flex items-center gap-3 min-w-0"
          style={{ "--i": 0 } as CSSProperties}
        >
          <span className="site-nav-logo">
            <img src={site.images.logo} alt={t("brand.logoAlt")} />
          </span>
          <span className={`site-nav-title font-bold text-lg whitespace-nowrap hidden xl:block ${kannadaFont}`}>
            {t("brand.full")}
          </span>
          <span className={`site-nav-title font-bold text-lg whitespace-nowrap xl:hidden ${kannadaFont}`}>
            {t("brand.short")}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop Navigation */}
          <div
            className={`relative hidden md:flex items-center ${kannadaFont}`}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <span
              className="site-nav-indicator"
              style={{ left: indicator.left, width: indicator.width, opacity: indicator.visible ? 1 : 0 }}
              aria-hidden="true"
            />
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                ref={(element) => {
                  linkRefs.current[index] = element;
                }}
                to={item.path}
                onMouseEnter={() => setHoverIndex(index)}
                onFocus={() => setHoverIndex(index)}
                onBlur={() => setHoverIndex(null)}
                aria-current={index === activeIndex ? "page" : undefined}
                className={`site-nav-link nav-enter ${index === activeIndex ? "is-active" : ""}`}
                style={{ "--i": index + 1 } as CSSProperties}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="hidden md:block nav-enter" style={{ "--i": navItems.length + 1 } as CSSProperties}>
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="site-nav-burger md:hidden nav-enter"
            style={{ "--i": 1 } as CSSProperties}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={t("nav.toggleMenu")}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="site-nav-accent" aria-hidden="true" />
    </nav>
  );
}
