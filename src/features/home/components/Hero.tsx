import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronsDown } from "lucide-react";
import { useLanguage } from "@/shared/i18n/useLanguage";
import { useInView } from "@/shared/hooks/use-in-view";
import { useIntroRevealed } from "@/features/intro/useIntroRevealed";
import { heroSlides, heroStats } from "@/features/home/data/heroSlides";
import { FADE_MS, KEN_BURNS_MS, SLIDE_MS, useHeroSlideshow } from "@/features/home/components/useHeroSlideshow";
import "./home.css";

const COUNT_UP_MS = 1400;

// Alternate the Ken Burns pan direction per photo
const PANS = [
  { origin: "30% 40%", x: "-1.5%", y: "-1%" },
  { origin: "70% 50%", x: "1.5%", y: "-1%" },
  { origin: "50% 30%", x: "0%", y: "1.5%" },
];

const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function CountUp({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? value : 0));

  useEffect(() => {
    if (!start || prefersReducedMotion()) {
      if (prefersReducedMotion()) setShown(value);
      return;
    }
    let frame = 0;
    const began = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - began) / COUNT_UP_MS, 1);
      setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return (
    <span>
      {shown}
      {suffix}
    </span>
  );
}

/** Full-screen homepage hero with a Ken Burns photo slideshow behind the text. */
export default function Hero() {
  const { lang, t, l } = useLanguage();
  const revealed = useIntroRevealed();
  const stats = useInView<HTMLDivElement>(0.4);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { current, previous, moving, paused, goTo } = useHeroSlideshow(heroSlides.length, imageRefs);
  const [reducedMotion] = useState(prefersReducedMotion);
  const kannadaFont = lang === "kn" ? "kannada-text" : "";

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  const slideClass = (index: number) =>
    [
      "hero-slide",
      index === current && "is-active",
      index === previous && "is-prev",
      moving.has(index) && "is-moving",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <section
      className={`hero ${revealed ? "is-entered" : ""} ${paused ? "is-paused" : ""}`}
      style={
        {
          "--hero-slide": `${SLIDE_MS}ms`,
          "--hero-fade": `${FADE_MS}ms`,
          "--hero-kenburns": `${KEN_BURNS_MS}ms`,
        } as CSSProperties
      }
    >
      {/* All slides stay stacked; only opacity/transform change */}
      {heroSlides.map((slide, index) => {
        const pan = PANS[index % PANS.length];
        return (
          <div
            key={slide.image}
            className={slideClass(index)}
            style={{ "--origin": pan.origin, "--pan-x": pan.x, "--pan-y": pan.y } as CSSProperties}
            aria-hidden="true"
          >
            <img
              ref={(element) => {
                imageRefs.current[index] = element;
              }}
              src={slide.image}
              srcSet={slide.imageSmall ? `${slide.imageSmall} 960w, ${slide.image} 1920w` : undefined}
              sizes="100vw"
              alt=""
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
            />
          </div>
        );
      })}
      <div className="hero-overlay" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left">
          <p className={`hero-eyebrow hero-enter ${kannadaFont}`} style={{ "--i": 0 } as CSSProperties}>
            {t("hero.eyebrow")}
          </p>

          <h1 className={`mt-6 ${kannadaFont}`}>
            <span className="hero-title-1 hero-enter block" style={{ "--i": 1 } as CSSProperties}>
              {t("hero.titleLine1")}
            </span>
            <span className="hero-title-2 gradient-text-safe hero-enter" style={{ "--i": 2 } as CSSProperties}>
              {t("hero.titleLine2")}
            </span>
          </h1>

          <p
            className="hero-enter mt-5 max-w-[560px] text-base leading-relaxed text-[#ece7dc] sm:text-lg"
            style={{ "--i": 3 } as CSSProperties}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className={`hero-enter mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row ${kannadaFont}`}
            style={{ "--i": 4 } as CSSProperties}
          >
            <button type="button" onClick={scrollToAbout} className="home-btn-primary">
              {t("hero.aboutUs")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <Link to="/events" className="home-btn-secondary">
              {t("hero.viewEvents")}
            </Link>
          </div>

          <div
            ref={stats.ref}
            className="hero-stats hero-enter mt-8"
            style={{ "--i": 5 } as CSSProperties}
          >
            {heroStats.map((stat) => (
              <div key={stat.label.en} className="hero-stat">
                <div className="hero-stat-number gradient-text-safe">
                  <CountUp value={stat.value} suffix={stat.suffix} start={revealed && stats.inView} />
                </div>
                <div className={`mt-1 text-xs text-[#d9d4c8] sm:text-sm ${kannadaFont}`}>{l(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide dashes with the current photo's caption */}
      {heroSlides.length > 1 && (
        <div className="hero-dashes z-10">
          <span className={`hidden text-sm text-[#ece7dc] md:block ${kannadaFont}`} aria-live="polite">
            {l(heroSlides[current].caption)}
          </span>
          <div className="flex gap-1.5">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                className="hero-dash-button"
                onClick={() => goTo(index)}
                aria-label={`${t("hero.goToSlide", { n: index + 1 })}: ${l(slide.caption)}`}
                aria-current={index === current ? "true" : undefined}
              >
                <span
                  key={index === current ? `active-${current}` : "idle"}
                  className={`hero-dash block ${index === current ? "is-active" : ""} ${
                    index < current || (reducedMotion && index === current) ? "is-done" : ""
                  }`}
                >
                  <span className="hero-dash-fill" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button type="button" onClick={scrollToAbout} className={`hero-scroll z-10 ${kannadaFont}`}>
        <ChevronsDown className="h-5 w-5" aria-hidden="true" />
        {t("hero.scroll")}
      </button>
    </section>
  );
}
