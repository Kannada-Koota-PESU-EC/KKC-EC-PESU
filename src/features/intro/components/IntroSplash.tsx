import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  INTRO_REVEAL_EVENT,
  INTRO_SEEN_KEY,
  introImages,
  introTimings,
  logosText,
  tribute,
} from '@/features/intro/data/intro';
import './intro.css';

type Phase = 'loading' | 'tribute' | 'transition' | 'logos' | 'reveal' | 'done';

const hasSeenIntro = () => {
  // Visiting any page with ?intro in the URL replays the intro (handy for previewing)
  if (new URLSearchParams(window.location.search).has('intro')) return false;
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

const markIntroSeen = () => {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // Storage unavailable; intro may replay on refresh
  }
};

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

/**
 * Full-screen intro shown once per session: a tribute to Dr. M. R. Doreswamy,
 * then the PES University and club logos, then it fades away to reveal the site.
 */
export default function IntroSplash() {
  const [phase, setPhase] = useState<Phase>(() => (hasSeenIntro() ? 'done' : 'loading'));
  const [reducedMotion] = useState(prefersReducedMotion);
  const skipRef = useRef<HTMLButtonElement>(null);
  const isPlaying = phase !== 'done';

  // Remember for this session and preload the images before starting
  useEffect(() => {
    if (phase !== 'loading') return;
    markIntroSeen();
    skipRef.current?.focus();

    let cancelled = false;
    const images = Promise.all(Object.values(introImages).map(preloadImage));
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, introTimings.maxPreloadWait));
    Promise.race([images, timeout]).then(() => {
      if (!cancelled) setPhase((current) => (current === 'loading' ? 'tribute' : current));
    });
    return () => {
      cancelled = true;
    };
    // Runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Advance through the phases
  useEffect(() => {
    const next: Partial<Record<Phase, [Phase, number]>> = reducedMotion
      ? {
          tribute: ['reveal', introTimings.reducedMotionHold],
          reveal: ['done', introTimings.reveal],
        }
      : {
          tribute: ['transition', introTimings.tribute],
          transition: ['logos', introTimings.transition],
          logos: ['reveal', introTimings.logos],
          reveal: ['done', introTimings.reveal],
        };
    const step = next[phase];
    if (!step) return;
    const timer = setTimeout(() => setPhase(step[0]), step[1]);
    return () => clearTimeout(timer);
  }, [phase, reducedMotion]);

  // Let the rest of the page know whether the intro is covering it
  useEffect(() => {
    const root = document.documentElement;
    if (phase === 'reveal' || phase === 'done') {
      delete root.dataset.introPlaying;
      window.dispatchEvent(new Event(INTRO_REVEAL_EVENT));
    } else {
      root.dataset.introPlaying = 'true';
    }
  }, [phase]);

  // Lock page scrolling while the intro is on screen
  useEffect(() => {
    if (!isPlaying) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isPlaying]);

  if (!isPlaying) return null;

  const showTribute = phase === 'tribute' || phase === 'transition' || (reducedMotion && phase === 'reveal');
  const showLogos = phase === 'logos' || (!reducedMotion && phase === 'reveal');

  const tributeLines = [
    { text: tribute.heading, className: 'text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60' },
    { text: tribute.name, className: 'text-2xl sm:text-4xl font-semibold tracking-wide text-white' },
    { text: tribute.title, className: 'text-sm sm:text-base text-white/75' },
    { text: tribute.message, className: 'mt-3 text-base sm:text-lg italic text-white/85' },
    { text: tribute.messageKannada, className: 'kannada-text text-base sm:text-lg text-amber-100/90', lang: 'kn' },
  ];

  return (
    <div
      className="intro-overlay"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label={`${tribute.heading}, ${tribute.name}`}
      style={
        {
          '--intro-transition': `${introTimings.transition}ms`,
          '--intro-reveal': `${introTimings.reveal}ms`,
        } as CSSProperties
      }
    >
      <div className="intro-gradient" aria-hidden="true" />

      <button
        ref={skipRef}
        type="button"
        className="intro-skip"
        onClick={() => setPhase((current) => (current === 'reveal' ? current : 'reveal'))}
      >
        Skip
      </button>

      {showTribute && (
        <div className={`intro-screen intro-tribute ${phase === 'transition' ? 'is-leaving' : ''}`}>
          <img src={introImages.chairman} alt={tribute.name} className="intro-photo" />

          <div className="mt-6 flex flex-col items-center gap-1.5 sm:gap-2 max-w-xl">
            {tributeLines.map((line, index) => (
              <p
                key={index}
                lang={line.lang}
                className={`intro-line ${line.className}`}
                style={{ '--line-index': index } as CSSProperties}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      )}

      {showLogos && (
        <div className="intro-screen">
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-10">
            <div className="intro-logo-circle intro-slide-left">
              <img src={introImages.college} alt="PES University" />
            </div>
            <div className="intro-logo-circle intro-logo-fill intro-slide-right">
              <img src={introImages.club} alt="PESU Kannada Koota EC" />
            </div>
          </div>

          <div lang="kn" className="intro-title mt-6 sm:mt-8 flex flex-col items-center gap-1 sm:gap-2 text-white">
            <p className="text-xl sm:text-3xl md:text-4xl font-bold">{logosText.line1}</p>
            <p className="text-base sm:text-xl md:text-2xl">{logosText.line2}</p>
          </div>
        </div>
      )}
    </div>
  );
}
