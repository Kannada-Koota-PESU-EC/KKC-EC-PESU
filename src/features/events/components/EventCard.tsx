import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Event } from "@/features/events/data/events";
import Bilingual from "@/features/events/components/Bilingual";
import EventImage from "@/features/events/components/EventImage";
import { getEventSlug } from "@/features/events/data/eventStories";
import { useCanHover } from "@/features/events/lib/useCanHover";
import {
  OUTLINE_BUTTON,
  PRIMARY_BUTTON,
  formatEventDate,
  getCountdown,
  getDateParts,
} from "@/features/events/lib/eventUtils";

interface EventCardProps {
  event: Event;
  /** true when the event came from getUpcomingEvents(), false for getPastEvents(). */
  upcoming: boolean;
  /** Large editorial layout for the first upcoming event. */
  featured?: boolean;
  /** Aspect ratio + corner shape of the image tile. */
  tileClassName?: string;
  /** Small line shown under the image, e.g. "ನೆನಪು · 03". */
  caption?: string;
}

/* ------------------------------------------------------------------ */
/* Image tile: hover / focus reveals the story, click or tap opens it. */
/* ------------------------------------------------------------------ */

interface EventTileProps {
  event: Event;
  upcoming: boolean;
  large?: boolean;
  className?: string;
}

function EventTile({
  event,
  upcoming,
  large = false,
  className = "",
}: EventTileProps) {
  const canHover = useCanHover();

  // Mouse users: revealed on hover or keyboard focus. Touch users: always visible.
  const revealClasses = canHover
    ? "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 peer-focus-visible:grid-rows-[1fr] peer-focus-visible:opacity-100"
    : "grid-rows-[1fr] opacity-100";

  const scrimClasses = canHover
    ? "opacity-0 group-hover:opacity-100 peer-focus-visible:opacity-100"
    : "opacity-0";

  const arrowClasses = canHover
    ? "translate-y-2 scale-75 opacity-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 peer-focus-visible:translate-y-0 peer-focus-visible:scale-100 peer-focus-visible:opacity-100"
    : "translate-y-0 scale-100 opacity-100";

  return (
    <div
      className={`group relative isolate overflow-hidden bg-muted ${className}`}
    >
      {/* One real link covers the whole tile: click, tap and Enter open the event's own page. */}
      <Link
        to={`/events/${getEventSlug(event)}`}
        aria-label={`Open ${event.title}`}
        className="peer absolute inset-0 z-20 block h-full w-full touch-manipulation rounded-[inherit] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white"
      />

      <EventImage
        src={event.image}
        alt={`Photo from ${event.title}`}
        seed={event.id}
        className="transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06] motion-safe:peer-focus-visible:scale-[1.06]"
      />

      {/* Light scrim so the title is always readable, then a second one that fades in on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-black/30 transition-opacity duration-500 motion-reduce:transition-none ${scrimClasses}`}
      />

      <span className="pointer-events-none absolute left-5 top-5 z-10 rounded-full border border-white/40 bg-black/30 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md sm:left-6 sm:top-6">
        <Bilingual
          kn={upcoming ? "ಮುಂದೆ" : "ನೆನಪು"}
          en={upcoming ? "Upcoming" : "Memory"}
          enClassName="uppercase tracking-[0.2em]"
        />
      </span>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-500 motion-reduce:transition-none sm:right-6 sm:top-6 ${arrowClasses}`}
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/85">
          {formatEventDate(event.date)}
        </p>

        <h3
          className={`mt-2 line-clamp-3 font-black leading-[1.3] ${
            large ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
          }`}
        >
          {event.title}
        </h3>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${revealClasses}`}
        >
          <div className="min-h-0 overflow-hidden">
            <p
              className={`mt-3 text-sm leading-6 text-white/90 ${
                large ? "line-clamp-4" : "line-clamp-2 sm:line-clamp-3"
              }`}
            >
              {event.teaser}
            </p>

            {canHover && event.location && (
              <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/85">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{event.location}</span>
              </p>
            )}

            {canHover && (
              <p className="mt-4 flex items-center justify-between border-t border-white/30 pt-3 text-sm font-semibold">
                <Bilingual
                  kn="ಇನ್ನಷ್ಟು ನೋಡಿ"
                  en="Open story"
                  enClassName="uppercase tracking-[0.14em]"
                />
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Featured layout: big image with a date panel overlapping its edge.   */
/* ------------------------------------------------------------------ */

function FeaturedEvent({
  event,
  upcoming,
  tileClassName,
}: Pick<EventCardProps, "event" | "upcoming" | "tileClassName">) {
  const parts = getDateParts(event.date);
  const countdown = upcoming ? getCountdown(event.date) : null;

  return (
    <article
      data-testid="featured-event"
      data-event-id={event.id}
      className="relative grid min-w-0 lg:grid-cols-12"
    >
      <div className="min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-1">
        <EventTile
          event={event}
          upcoming={upcoming}
          large
          className={
            tileClassName ??
            "aspect-[4/5] rounded-tl-[3rem] rounded-br-[3rem] rounded-bl-xl rounded-tr-xl sm:aspect-[4/3] lg:aspect-[16/11]"
          }
        />
      </div>

      <div className="relative z-10 mx-3 -mt-10 rounded-bl-[2rem] rounded-tr-[2rem] border border-border bg-background p-6 shadow-2xl sm:mx-8 sm:p-8 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mx-0 lg:mb-12 lg:ml-[-6rem] lg:mt-0 lg:self-end">
        <p className="text-xs font-bold text-primary">
          <Bilingual kn="ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮ" en="Featured" />
        </p>

        <time
          dateTime={event.date}
          className="mt-5 flex items-end gap-4 text-foreground"
        >
          {parts ? (
            <>
              <span className="text-7xl font-black leading-[0.9] text-primary sm:text-8xl">
                {parts.day}
              </span>
              <span className="pb-1 text-sm font-bold uppercase leading-5 tracking-[0.2em]">
                {parts.month}
                <br />
                {parts.year}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">Date unavailable</span>
          )}
        </time>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {countdown && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Bilingual
                kn={countdown.kn}
                en={countdown.en}
                enClassName="uppercase tracking-[0.12em]"
              />
            </span>
          )}

          {event.location && (
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {event.location}
            </span>
          )}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to={`/events/${getEventSlug(event)}`}
            className={PRIMARY_BUTTON}
          >
            <Bilingual
              kn="ಕಥೆ ತೆರೆಯಿರಿ"
              en="Open story"
              enClassName="tracking-normal"
            />
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {upcoming && event.registerLink && (
            <a
              href={event.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className={OUTLINE_BUTTON}
            >
              <Bilingual
                kn="ನೋಂದಣಿ"
                en="Register"
                enClassName="tracking-normal"
              />
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

export default function EventCard({
  event,
  upcoming,
  featured = false,
  tileClassName,
  caption,
}: EventCardProps) {
  if (featured) {
    return (
      <FeaturedEvent
        event={event}
        upcoming={upcoming}
        tileClassName={tileClassName}
      />
    );
  }

  const parts = getDateParts(event.date);

  return (
    <article
      data-testid="event-card"
      data-event-id={event.id}
      className="min-w-0"
    >
      <EventTile
        event={event}
        upcoming={upcoming}
        className={tileClassName ?? "aspect-[4/5] rounded-2xl"}
      />

      {caption && (
        <p className="mt-3 flex items-center justify-between gap-3 px-1 text-xs font-semibold text-muted-foreground">
          <span lang="kn">{caption}</span>
          {parts && <span>{parts.year}</span>}
        </p>
      )}
    </article>
  );
}