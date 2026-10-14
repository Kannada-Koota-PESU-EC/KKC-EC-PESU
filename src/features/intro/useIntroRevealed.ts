import { useEffect, useState } from 'react';
import { INTRO_REVEAL_EVENT } from '@/features/intro/data/intro';

/** False while the intro covers the site, true once it starts revealing it (or if it isn't playing). */
export function useIntroRevealed() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.introPlaying !== 'true') {
      setRevealed(true);
      return;
    }
    const reveal = () => setRevealed(true);
    window.addEventListener(INTRO_REVEAL_EVENT, reveal);
    const fallback = setTimeout(reveal, 15000);
    return () => {
      window.removeEventListener(INTRO_REVEAL_EVENT, reveal);
      clearTimeout(fallback);
    };
  }, []);

  return revealed;
}
