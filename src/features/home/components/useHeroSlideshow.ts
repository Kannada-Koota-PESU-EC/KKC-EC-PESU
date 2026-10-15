import { useCallback, useEffect, useRef, useState } from 'react';

export const SLIDE_MS = 6000; // how long each photo stays
export const FADE_MS = 1800; // crossfade duration
export const LEAD_MS = 300; // Ken Burns starts this long before a photo appears
export const KEN_BURNS_MS = LEAD_MS + SLIDE_MS + FADE_MS; // keeps moving until fully faded out

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Crossfading slideshow state. All slides stay mounted; this only decides which one is
 * active (fading in on top), which is previous (fully visible underneath during the fade)
 * and which are moving (Ken Burns running). Images are decoded before they are first shown.
 */
export function useHeroSlideshow(count: number, imageRefs: React.MutableRefObject<(HTMLImageElement | null)[]>) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [moving, setMoving] = useState<Set<number>>(() => new Set([0]));
  const [paused, setPaused] = useState(() => typeof document !== 'undefined' && document.hidden);

  const currentRef = useRef(0);
  const movingRef = useRef(new Set([0])); // mirror of `moving`, readable synchronously
  const fadingRef = useRef(false);
  const pendingRef = useRef<number | null>(null);
  const decodedRef = useRef(new Set<number>());
  const remainingRef = useRef(SLIDE_MS);
  const lastCurrentRef = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const ensureDecoded = useCallback(
    async (index: number) => {
      if (decodedRef.current.has(index)) return;
      const image = imageRefs.current[index];
      if (image && typeof image.decode === 'function') {
        await image.decode().catch(() => {});
      }
      decodedRef.current.add(index);
    },
    [imageRefs],
  );

  const updateMoving = useCallback((change: (set: Set<number>) => void) => {
    const next = new Set(movingRef.current);
    change(next);
    movingRef.current = next;
    setMoving(next);
  }, []);

  const startMoving = useCallback(
    (index: number) => {
      if (!movingRef.current.has(index)) updateMoving((set) => set.add(index));
    },
    [updateMoving],
  );

  const goTo = useCallback(
    async (target: number) => {
      if (target === currentRef.current) return;
      // A fade is running: finish it first, then go to the latest requested slide
      if (fadingRef.current) {
        pendingRef.current = target;
        return;
      }
      fadingRef.current = true;
      const from = currentRef.current;

      await ensureDecoded(target);
      // Auto-advance already started the zoom during the lead-in; clicks start it now
      if (!movingRef.current.has(target)) {
        startMoving(target);
        await wait(LEAD_MS);
      }

      currentRef.current = target;
      setPrevious(from);
      setCurrent(target);

      fadeTimerRef.current = setTimeout(() => {
        // Only reset the old slide's zoom once it is completely hidden
        if (from !== currentRef.current) updateMoving((set) => set.delete(from));
        setPrevious(null);
        fadingRef.current = false;
        const pending = pendingRef.current;
        pendingRef.current = null;
        if (pending !== null && pending !== currentRef.current) goTo(pending);
      }, FADE_MS);
    },
    [ensureDecoded, startMoving, updateMoving],
  );

  // Pause while the tab is hidden
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Preload and decode the other photos in the background after the first one
  useEffect(() => {
    for (let index = 1; index < count; index++) ensureDecoded(index);
  }, [count, ensureDecoded]);

  // Auto-advance; resumes with the remaining time after a pause
  useEffect(() => {
    if (paused || count < 2) return;
    if (lastCurrentRef.current !== current) {
      lastCurrentRef.current = current;
      remainingRef.current = SLIDE_MS;
    }
    const started = Date.now();
    const remaining = remainingRef.current;
    const next = (current + 1) % count;

    const leadTimer = setTimeout(() => {
      ensureDecoded(next).then(() => startMoving(next));
    }, Math.max(0, remaining - LEAD_MS));
    const advanceTimer = setTimeout(() => goTo(next), remaining);

    return () => {
      clearTimeout(leadTimer);
      clearTimeout(advanceTimer);
      remainingRef.current = Math.max(0, remaining - (Date.now() - started));
    };
  }, [current, paused, count, ensureDecoded, startMoving, goTo]);

  useEffect(() => () => clearTimeout(fadeTimerRef.current), []);

  return { current, previous, moving, paused, goTo };
}
