import type { Localized } from '@/shared/i18n/translations';
import eventsData from '@/data/events.json';

/** Content lives in src/data/events.json; this file only types and sorts it. */
export interface Event {
  id: string;
  title: Localized;
  date: string; // ISO date (YYYY-MM-DD); upcoming/past is worked out from this
  description: Localized;
  poster: string;
  /** Optional ~600px copy of the poster for small screens and the blurred card background */
  posterSmall?: string;
  venue?: Localized;
  time?: Localized;
  gallery?: string[];
  registerLink?: string;
}

export const events: Event[] = eventsData;

/* ---------- DATE HELPERS ---------- */

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getUpcomingEvents = () => {
  const today = getToday();

  return events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
};

export const getPastEvents = () => {
  const today = getToday();

  return events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < today;
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

export const getEventById = (id: string) =>
  events.find((event) => event.id === id);
