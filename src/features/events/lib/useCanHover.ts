import { useEffect, useState } from "react";

const QUERY = "(hover: hover)";

function readCanHover(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }

  return window.matchMedia(QUERY).matches;
}

/**
 * true  -> the primary input can hover (mouse / trackpad): info is revealed on hover or keyboard focus.
 * false -> touch-first device: info is always visible on the image, and a single tap opens the story.
 */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState<boolean>(readCanHover);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;

    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = () => setCanHover(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return canHover;
}