import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useIntroRevealed } from '@/features/intro/useIntroRevealed';
import { INSTAGRAM_URL } from '@/shared/lib/social';
import './floating-instagram.css';

const HINT_SEEN_KEY = 'kk-ig-hint-seen';
const HINT_DELAY = 2000; // ms after the site appears
const HINT_DURATION = 3000;

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Floating Instagram button, bottom-right on every page. Appears once the intro has finished. */
export default function FloatingInstagram() {
  const { t } = useLanguage();
  const revealed = useIntroRevealed();
  const [expanded, setExpanded] = useState(false);
  const [lifted, setLifted] = useState(false);

  // Once per session: open by itself for a few seconds to show the label
  useEffect(() => {
    if (!revealed || prefersReducedMotion()) return;
    try {
      if (window.sessionStorage.getItem(HINT_SEEN_KEY)) return;
      window.sessionStorage.setItem(HINT_SEEN_KEY, '1');
    } catch {
      // Storage unavailable: still show the hint this time
    }
    const open = setTimeout(() => setExpanded(true), HINT_DELAY);
    const close = setTimeout(() => setExpanded(false), HINT_DELAY + HINT_DURATION);
    return () => {
      clearTimeout(open);
      clearTimeout(close);
    };
  }, [revealed]);

  // Move up while the footer's bottom bar is on screen so it doesn't cover "Back to top"
  useEffect(() => {
    if (!revealed || typeof IntersectionObserver === 'undefined') return;
    const bottomBar = document.getElementById('site-footer-bottom');
    if (!bottomBar) return;
    const observer = new IntersectionObserver(([entry]) => setLifted(entry.isIntersecting));
    observer.observe(bottomBar);
    return () => observer.disconnect();
  }, [revealed]);

  if (!revealed) return null;

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('social.followInstagram')}
      className={`floating-ig ${expanded ? 'is-expanded' : ''} ${lifted ? 'is-lifted' : ''}`}
    >
      <span className="floating-ig-icon">
        <Instagram className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="floating-ig-label" aria-hidden="true">
        {t('social.followInstagram')}
      </span>
    </a>
  );
}
