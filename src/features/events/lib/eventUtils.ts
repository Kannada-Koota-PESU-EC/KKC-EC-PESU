/**
 * Small, pure helpers shared by the Events page, cards and detail page.
 * Nothing here changes how events are categorised — that still lives in
 * src/features/events/data/events.ts (getUpcomingEvents / getPastEvents).
 */

export const PRIMARY_BUTTON =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const OUTLINE_BUTTON =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Parses YYYY-MM-DD as a LOCAL date so it never shifts a day across time zones. */
export function parseEventDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatEventDate(value: string): string {
  const date = parseEventDate(value);

  if (!date) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export interface DateParts {
  day: string;
  month: string;
  year: string;
}

export function getDateParts(value: string): DateParts | null {
  const date = parseEventDate(value);

  if (!date) return null;

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: date
      .toLocaleDateString("en-IN", { month: "short" })
      .toUpperCase(),
    year: String(date.getFullYear()),
  };
}

export function daysUntil(value: string): number | null {
  const date = parseEventDate(value);

  if (!date) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return Math.round((date.getTime() - today.getTime()) / 86400000);
}

export function getCountdown(
  value: string,
): { kn: string; en: string } | null {
  const days = daysUntil(value);

  if (days === null || days < 0) return null;
  if (days === 0) return { kn: "ಇಂದೇ", en: "Today" };
  if (days === 1) return { kn: "ನಾಳೆ", en: "Tomorrow" };

  return { kn: `${days} ದಿನ ಬಾಕಿ`, en: `In ${days} days` };
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ---------- placeholder helpers ---------- */

const KANNADA_GLYPHS = ["ಕ", "ನ", "ಸ", "ಮ", "ಹ", "ಅ", "ರ", "ಲ"];

export function seedNumber(seed: string): number {
  let total = 0;

  for (let i = 0; i < seed.length; i += 1) {
    total = (total * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return total;
}

export function glyphFor(seed: string): string {
  return KANNADA_GLYPHS[seedNumber(seed) % KANNADA_GLYPHS.length];
}