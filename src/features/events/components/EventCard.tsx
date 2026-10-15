import { ArrowRight, Clock, Images, MapPin, Share2 } from 'lucide-react';
import { Event } from '@/features/events/data/events';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useToast } from '@/shared/hooks/use-toast';
import { useMediaLoaded } from '@/shared/hooks/use-media-loaded';
import { dateBadgeParts, eventShareUrl, eventSummary, isUpcomingEvent, posterSources } from '@/features/events/components/eventFormat';
import './event-cards.css';

interface EventCardProps {
  event: Event;
  onOpen: (event: Event) => void;
}

export default function EventCard({ event, onOpen }: EventCardProps) {
  const { lang, t, l } = useLanguage();
  const { toast } = useToast();
  const poster = useMediaLoaded();
  const title = l(event.title);
  const badge = dateBadgeParts(event.date, lang);
  const upcoming = isUpcomingEvent(event.date);
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  // Venue/time come from the data fields, or from "Venue: … Time: …" inside the description
  const { body, venue, time } = eventSummary(event, lang);
  // Only count real gallery photos (not the poster repeated)
  const galleryCount = (event.gallery ?? []).filter((image) => image !== event.poster).length;

  const share = async () => {
    const url = eventShareUrl(event);
    const touchDevice = typeof window.matchMedia === 'function' && window.matchMedia('(hover: none)').matches;
    if (touchDevice && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Share sheet closed or unavailable: fall back to copying
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: t('events.linkCopied'), description: url });
    } catch {
      // Clipboard blocked; nothing else to do
    }
  };

  return (
    <article
      className="event-card"
      data-testid="event-card"
      data-event-id={event.id}
      onClick={() => onOpen(event)}
    >
      <div className={`event-poster skeleton-fade ${poster.loaded ? '' : 'skeleton'}`}>
        <img src={event.posterSmall ?? event.poster} alt="" aria-hidden="true" className="event-poster-bg" loading="lazy" decoding="async" />
        <img
          src={event.poster}
          {...posterSources(event)}
          alt={title}
          className="event-poster-img"
          loading="lazy"
          decoding="async"
          ref={poster.checkCached}
          onLoad={poster.markLoaded}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
            poster.markLoaded();
          }}
        />
        <span className={`event-status ${upcoming ? 'event-status-upcoming' : 'event-status-completed'} ${kannadaFont}`}>
          {t(upcoming ? 'events.badgeUpcoming' : 'events.badgeCompleted')}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start gap-3">
          <div className="event-date-tile" aria-hidden="true">
            <span className="text-xl font-bold leading-none">{badge.day}</span>
            <span className={`mt-1 text-[0.6rem] leading-tight tracking-wide text-white/75 ${kannadaFont}`}>
              {badge.month} {badge.year}
            </span>
          </div>
          <h3 className={`min-w-0 text-[1.25rem] font-bold text-white line-clamp-2 ${lang === 'kn' ? 'leading-[1.5]' : 'leading-snug'} ${kannadaFont}`}>{title}</h3>
        </div>

        {(venue || time || galleryCount > 1) && (
          <div className={`flex flex-wrap gap-2 ${kannadaFont}`}>
            {venue && (
              <span className="event-chip">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="truncate">{venue}</span>
              </span>
            )}
            {time && (
              <span className="event-chip">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {time}
              </span>
            )}
            {galleryCount > 1 && (
              <span className="event-chip">
                <Images className="h-3.5 w-3.5" aria-hidden="true" />
                {t('events.galleryCount', { n: galleryCount })}
              </span>
            )}
          </div>
        )}

        <p className="text-sm leading-[1.7] text-[#bdb7aa] line-clamp-2">{body}</p>

        <div className="event-card-footer">
          <button
            type="button"
            className={`event-read-more ${kannadaFont}`}
            aria-label={`${t('common.readMore')}: ${title}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(event);
            }}
          >
            {t('common.readMore')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="event-share"
            aria-label={`${t('events.share')}: ${title}`}
            title={t('events.share')}
            onClick={(e) => {
              e.stopPropagation();
              share();
            }}
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
