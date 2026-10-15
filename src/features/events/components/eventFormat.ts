import type { Language } from '@/shared/i18n/translations';
import type { Event } from '@/features/events/data/events';

/** "2026-08-19" as a local date (avoids the UTC shift of new Date(isoString)). */
export const parseEventDate = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const locale = (lang: Language) => (lang === 'kn' ? 'kn-IN' : 'en-IN');

export const isUpcomingEvent = (iso: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseEventDate(iso).getTime() >= today.getTime();
};

/** Parts for the calendar-tile badge: "19" / "AUG" / "2026". */
export const dateBadgeParts = (iso: string, lang: Language) => {
  const date = parseEventDate(iso);
  const month = date.toLocaleDateString(locale(lang), { month: 'short' });
  return {
    day: date.getDate(),
    month: lang === 'en' ? month.toUpperCase() : month,
    year: date.getFullYear(),
  };
};

export const formatEventDate = (iso: string, lang: Language) =>
  parseEventDate(iso).toLocaleDateString(locale(lang), { day: 'numeric', month: 'long', year: 'numeric' });

// Labels that start their own line in the full description
const DETAIL_LABELS = ['Venue:', 'Time:', 'Prize pool:', 'ಸ್ಥಳ:', 'ಸಮಯ:', 'ಬಹುಮಾನ ಮೊತ್ತ:'];

/**
 * Splits a description into the main text and "Label: value" detail lines
 * (e.g. "... ✨ Venue: Seminar Hall 2 Time: 2:30 PM" -> text + [Venue, Time]).
 */
export const splitEventDetails = (text: string) => {
  const pattern = new RegExp(`\\s*(${DETAIL_LABELS.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*`, 'g');
  const parts = text.split(pattern);
  const body = parts[0].trim();
  const details: { label: string; value: string }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    details.push({ label: parts[i].replace(/:$/, ''), value: (parts[i + 1] ?? '').trim() });
  }
  return { body, details };
};

/** Link that opens an event's details on the Events page (/events#<id>) */
export const eventShareUrl = (event: { id: string }) => `${window.location.origin}/events#${event.id}`;

/** srcSet/sizes for a poster when a small copy exists (cards are at most ~400px wide on desktop) */
export const posterSources = (event: Event) =>
  event.posterSmall
    ? {
        srcSet: `${event.posterSmall} 600w, ${event.poster} 1200w`,
        sizes: '(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw',
      }
    : {};

const VENUE_LABELS = ['Venue', 'ಸ್ಥಳ'];
const TIME_LABELS = ['Time', 'ಸಮಯ'];

/** Venue, time and short description for an event: from its fields, or from "Venue: … Time: …" in the description. */
export const eventSummary = (event: Event, lang: Language) => {
  const { body, details } = splitEventDetails(event.description[lang]);
  const detail = (labels: string[]) => details.find((d) => labels.includes(d.label))?.value;
  return {
    body,
    venue: event.venue ? event.venue[lang] : detail(VENUE_LABELS),
    time: event.time ? event.time[lang] : detail(TIME_LABELS),
  };
};

/**
 * When the event starts: its date plus the first time found in the English time text
 * ("10:00 AM", "2:30 PM – 4:30 PM"). Without a time, midnight at the start of that day.
 */
export const eventStart = (event: Event) => {
  const start = parseEventDate(event.date);
  const timeText = eventSummary(event, 'en').time ?? '';
  const match = timeText.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (match) {
    let hours = Number(match[1]) % 12;
    if ((match[3] ?? '').toUpperCase() === 'PM') hours += 12;
    if (!match[3] && Number(match[1]) === 12) hours = 12;
    start.setHours(hours, Number(match[2] ?? 0), 0, 0);
  }
  return start;
};
