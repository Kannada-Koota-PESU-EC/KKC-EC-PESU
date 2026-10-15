import { useCallback, useEffect, useState } from 'react';

/**
 * Tracks whether an image/video has loaded, to show a skeleton until then.
 * Call `markLoaded` from onLoad / onLoadedData / onError (errors count as loaded so the
 * skeleton never sticks) and pass `checkCached` as a ref for media already in the cache.
 * `fallbackMs` stops the skeleton after a while even if no load event comes (e.g. iOS videos,
 * which often don't preload until played).
 */
export function useMediaLoaded(fallbackMs?: number) {
  const [loaded, setLoaded] = useState(false);
  const markLoaded = useCallback(() => setLoaded(true), []);

  const checkCached = useCallback((element: HTMLImageElement | HTMLVideoElement | null) => {
    if (!element) return;
    const ready =
      element instanceof HTMLImageElement ? element.complete && element.naturalWidth > 0 : element.readyState >= 2;
    if (ready) setLoaded(true);
  }, []);

  useEffect(() => {
    if (!fallbackMs || loaded) return;
    const timer = setTimeout(() => setLoaded(true), fallbackMs);
    return () => clearTimeout(timer);
  }, [fallbackMs, loaded]);

  return { loaded, markLoaded, checkCached };
}
