import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Clock, ExternalLink, MapPin } from 'lucide-react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useInView } from '@/shared/hooks/use-in-view';
import type { TranslationKey } from '@/shared/i18n/translations';
import { getUpcomingEvents } from '@/features/events/data/events';
import EventModal from '@/features/events/components/EventModal';
import { eventStart, eventSummary, formatEventDate } from '@/features/events/components/eventFormat';
import '@/features/events/components/event-cards.css';
import './upcoming-event.css';

const units: { key: TranslationKey; ms: number; mod: number }[] = [
  { key: 'upcoming.days', ms: 86_400_000, mod: Infinity },
  { key: 'upcoming.hours', ms: 3_600_000, mod: 24 },
  { key: 'upcoming.mins', ms: 60_000, mod: 60 },
  { key: 'upcoming.secs', ms: 1000, mod: 60 },
];

/** Milliseconds until `target`, re-rendering every second. */
function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  const remaining = Math.max(0, target - now);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [remaining <= 0]); // eslint-disable-line react-hooks/exhaustive-deps

  return remaining;
}

/** Homepage highlight for the nearest upcoming event. Renders nothing when there isn't one. */
export default function UpcomingEvent() {
  const event = getUpcomingEvents()[0];
  if (!event) return null;
  return <UpcomingEventCard event={event} />;
}

function UpcomingEventCard({ event }: { event: ReturnType<typeof getUpcomingEvents>[number] }) {
  const { lang, t, l } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>(0.15);
  const [modalOpen, setModalOpen] = useState(false);
  const remaining = useCountdown(eventStart(event).getTime());
  const { body, venue, time } = eventSummary(event, lang);
  const title = l(event.title);
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  return (
    <section ref={ref} aria-labelledby="upcoming-event-title" className={`upcoming px-4 py-14 md:py-16 ${inView ? 'is-visible' : ''}`}>
      <div className="upcoming-card mx-auto max-w-6xl">
        {/* Poster: shown whole over a blurred copy of itself */}
        <div className="upcoming-poster">
          <img src={event.posterSmall ?? event.poster} alt="" aria-hidden="true" className="event-poster-bg" loading="lazy" decoding="async" />
          <img src={event.poster} alt={title} className="event-poster-img" loading="lazy" decoding="async" />
        </div>

        <div className={`flex flex-col gap-4 p-6 sm:p-8 ${kannadaFont}`}>
          <span className="upcoming-tag self-start">{t('upcoming.tag')}</span>

          <h2 id="upcoming-event-title" className="text-3xl font-bold leading-snug text-white sm:text-4xl">
            {title}
          </h2>

          <div className="flex flex-wrap gap-2">
            <span className="event-chip">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {formatEventDate(event.date, lang)}
            </span>
            {time && (
              <span className="event-chip">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {time}
              </span>
            )}
            {venue && (
              <span className="event-chip">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {venue}
              </span>
            )}
          </div>

          <p className="line-clamp-2 leading-[1.7] text-[#bdb7aa]">{body}</p>

          {/* Countdown, or "happening now" once it has started */}
          {remaining > 0 ? (
            <div role="timer" aria-label={t('upcoming.startsIn')} className="grid max-w-md grid-cols-4 gap-2 sm:gap-3">
              {units.map((unit) => {
                const value = Math.floor(remaining / unit.ms) % unit.mod;
                return (
                  <div key={unit.key} className="upcoming-count">
                    <span key={value} className="upcoming-count-number">
                      {String(value).padStart(2, '0')}
                    </span>
                    <span className="mt-1 text-[0.7rem] text-[#d9d4c8] sm:text-xs">{t(unit.key)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="upcoming-now">{t('upcoming.now')}</p>
          )}

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="home-btn-primary" onClick={() => setModalOpen(true)}>
              {t('upcoming.viewDetails')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            {event.registerLink && (
              <a href={event.registerLink} target="_blank" rel="noopener noreferrer" className="home-btn-secondary">
                {t('upcoming.register')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>

      <EventModal event={modalOpen ? event : null} onClose={() => setModalOpen(false)} />
    </section>
  );
}
