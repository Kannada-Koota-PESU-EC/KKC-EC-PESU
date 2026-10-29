import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  MapPin,
} from "lucide-react";
import Bilingual from "@/features/events/components/Bilingual";
import EventGallery from "@/features/events/components/EventGallery";
import EventImage from "@/features/events/components/EventImage";
import Reveal from "@/features/events/components/Reveal";
import { events, getUpcomingEvents } from "@/features/events/data/events";
import {
  getEventBySlug,
  getEventSlug,
  getEventStory,
} from "@/features/events/data/eventStories";
import {
  OUTLINE_BUTTON,
  PRIMARY_BUTTON,
  getCountdown,
  getDateParts,
} from "@/features/events/lib/eventUtils";

const KANNADA_NUMERALS = ["೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"];

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = getEventBySlug(slug);

  if (!event) {
    return (
      <div className="koota-subpage koota-events events-flower-rangoli-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <p lang="kn" className="text-4xl font-black leading-[1.3] text-foreground">
            ಈ ಕಾರ್ಯಕ್ರಮ ಸಿಗಲಿಲ್ಲ
          </p>
          <p className="mt-3 text-muted-foreground">
            We couldn't find that event. It may have moved or never existed.
          </p>
          <Link to="/events" className={`mt-8 ${PRIMARY_BUTTON}`}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <Bilingual kn="ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು" en="All events" enClassName="tracking-normal" />
          </Link>
        </div>
      </div>
    );
  }

  const story = getEventStory(event);
  const upcoming = getUpcomingEvents().some((item) => item.id === event.id);
  const parts = getDateParts(event.date);
  const countdown = upcoming ? getCountdown(event.date) : null;
  const gallery = (event.gallery ?? []).map((src) => src.trim()).filter(Boolean);

  // Neighbours in time, so visitors can wander from one event to the next
  const timeline = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const position = timeline.findIndex((item) => item.id === event.id);
  const earlier = position > 0 ? timeline[position - 1] : undefined;
  const later =
    position >= 0 && position < timeline.length - 1
      ? timeline[position + 1]
      : undefined;

  const imageShape =
    "rounded-tl-[4rem] rounded-br-[4rem] rounded-bl-xl rounded-tr-xl";

  return (
    <div className="koota-subpage koota-events events-flower-rangoli-bg min-h-screen overflow-hidden">
      <article className="relative mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 rounded-full text-sm font-bold text-primary transition hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <Bilingual kn="ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು" en="All events" enClassName="uppercase tracking-[0.18em]" />
        </Link>

        {/* HERO */}
        <header className="relative mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          {parts && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-10 select-none text-[length:clamp(10rem,28vw,22rem)] font-black leading-none text-primary/[0.07]"
            >
              {parts.day}
            </span>
          )}

          <div className="relative order-2 lg:order-1 lg:col-span-6">
            <p className="flex flex-wrap items-center gap-3 text-xs font-bold text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              <Bilingual
                kn={upcoming ? "ಮುಂದೆ" : "ನೆನಪು"}
                en={upcoming ? "Upcoming" : "Memory"}
                enClassName="uppercase tracking-[0.3em]"
              />
            </p>

            <h1 className="mt-5 break-words text-[length:clamp(2.25rem,6vw,5rem)] font-black leading-[1.2] text-foreground">
              {event.title}
              <span className="text-primary">.</span>
            </h1>

            <div className="mt-8 flex flex-wrap items-stretch gap-4">
              <div className="-rotate-1 border border-primary/40 bg-background/70 px-5 py-4 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <Bilingual kn="ದಿನಾಂಕ" en="Date" enClassName="tracking-[0.2em]" />
                </p>
                <time dateTime={event.date} className="mt-2 flex items-end gap-3 text-foreground">
                  {parts ? (
                    <>
                      <span className="text-4xl font-black leading-[0.9] text-primary">
                        {parts.day}
                      </span>
                      <span className="pb-0.5 text-xs font-bold uppercase leading-4 tracking-[0.2em]">
                        {parts.month}
                        <br />
                        {parts.year}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-bold">Date unavailable</span>
                  )}
                </time>
              </div>

              {event.location && (
                <div className="rotate-1 border border-border bg-background/70 px-5 py-4 backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    <Bilingual kn="ಸ್ಥಳ" en="Venue" enClassName="tracking-[0.2em]" />
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-base font-bold text-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {event.location}
                  </p>
                </div>
              )}

              {countdown && (
                <div className="-rotate-1 border border-primary bg-primary px-5 py-4 text-primary-foreground">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                    <Bilingual kn="ಇನ್ನು" en="Coming up" enClassName="tracking-[0.2em]" />
                  </p>
                  <p className="mt-2 text-base font-black">
                    <Bilingual kn={countdown.kn} en={countdown.en} enClassName="uppercase tracking-[0.12em]" />
                  </p>
                </div>
              )}
            </div>

            {upcoming && event.registerLink && (
              <a
                href={event.registerLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 ${PRIMARY_BUTTON}`}
              >
                <Bilingual kn="ನೋಂದಣಿ ಮಾಡಿ" en="Register for this event" enClassName="tracking-normal" />
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="relative order-1 lg:order-2 lg:col-span-6">
            <div
              aria-hidden="true"
              className={`absolute inset-0 translate-x-4 translate-y-4 rotate-2 border-2 border-primary/50 ${imageShape}`}
            />
            <div
              className={`relative aspect-[4/5] overflow-hidden bg-muted shadow-2xl sm:aspect-[5/4] ${imageShape}`}
            >
              <EventImage
                src={event.image}
                alt={`Photo from ${event.title}`}
                seed={event.id}
                loading="eager"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              />
            </div>
          </div>
        </header>

        {/* STORY */}
        <section aria-labelledby="story-heading" className="mt-24 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-bold text-primary">
              <Bilingual kn="ಕಾರ್ಯಕ್ರಮದ ಕಥೆ" en="The story" />
            </p>

            <h2
              id="story-heading"
              lang="kn"
              className="relative mt-5 text-3xl font-black leading-[1.4] text-foreground sm:text-4xl"
            >
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-10 select-none text-8xl leading-none text-primary/30"
              >
                “
              </span>
              {story ? story.heading : event.title}
            </h2>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
              {story ? (
                story.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p className="whitespace-pre-line">{event.teaser}</p>
              )}
            </div>

            {story && (
              <div className="mt-8 border-l-4 border-primary bg-primary/5 p-6">
                <p className="text-xs font-bold text-primary">
                  <Bilingual kn="ಮಾಹಿತಿ" en="The details" />
                </p>
                <p className="mt-3 whitespace-pre-line text-base leading-8 text-foreground/90">
                  {event.teaser}
                </p>
              </div>
            )}
          </Reveal>
        </section>

        {/* HIGHLIGHTS */}
        {story && story.highlights.length > 0 && (
          <section aria-labelledby="highlights-heading" className="mt-20">
            <Reveal>
              <h2 id="highlights-heading" className="text-xs font-bold text-primary">
                <Bilingual kn="ವಿಶೇಷತೆಗಳು" en="Highlights" />
              </h2>

              <ul className="mt-6 grid gap-x-10 gap-y-6 border-t border-border pt-8 sm:grid-cols-2">
                {story.highlights.map((highlight, index) => (
                  <li key={highlight} className="flex items-start gap-4">
                    <span
                      lang="kn"
                      aria-hidden="true"
                      className="text-4xl font-black leading-none text-primary"
                    >
                      {KANNADA_NUMERALS[index] ?? String(index + 1)}
                    </span>
                    <span className="pt-1 text-base leading-7 text-foreground/90">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        )}

        {/* GALLERY */}
        <section aria-labelledby="gallery-heading" className="mt-24">
          <h2
            id="gallery-heading"
            className="mb-6 flex items-center gap-3 text-3xl font-black text-foreground sm:text-4xl"
          >
            <Camera className="h-6 w-6 text-primary" aria-hidden="true" />
            <Bilingual kn="ಕ್ಷಣಗಳ ಸಂಗ್ರಹ" en="Moments" enClassName="tracking-normal" />
            {gallery.length > 0 && (
              <span className="text-base font-semibold text-muted-foreground">
                {gallery.length}
              </span>
            )}
          </h2>

          {gallery.length > 0 ? (
            <EventGallery images={gallery} title={event.title} eventId={event.id} />
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-primary/40 px-6 py-14 text-center">
              <Camera className="h-7 w-7 text-primary" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                <Bilingual
                  kn={upcoming ? "ಕಾರ್ಯಕ್ರಮದ ನಂತರ ಚಿತ್ರಗಳು ಇಲ್ಲಿ ಬರುತ್ತವೆ" : "ಚಿತ್ರಗಳು ಶೀಘ್ರದಲ್ಲೇ"}
                  en={upcoming ? "Photos will appear here after the event" : "Photos coming soon"}
                  enClassName="tracking-normal"
                />
              </p>
            </div>
          )}
        </section>

        {/* KEEP EXPLORING */}
        {(earlier || later) && (
          <nav
            aria-label="More events"
            className="mt-24 grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
          >
            {earlier ? (
              <Link
                to={`/events/${getEventSlug(earlier)}`}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-background/60 p-6 transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex items-center gap-2 text-xs font-bold text-primary">
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" aria-hidden="true" />
                  <Bilingual kn="ಹಿಂದಿನ" en="Earlier" />
                </span>
                <span className="text-lg font-black leading-[1.4] text-foreground">
                  {earlier.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" className="hidden sm:block" />
            )}

            {later && (
              <Link
                to={`/events/${getEventSlug(later)}`}
                className="group flex flex-col items-end gap-2 rounded-2xl border border-border bg-background/60 p-6 text-right transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex items-center gap-2 text-xs font-bold text-primary">
                  <Bilingual kn="ಮುಂದಿನ" en="Later" />
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="text-lg font-black leading-[1.4] text-foreground">
                  {later.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        <div className="mt-12 flex justify-center">
          <Link to="/events" className={OUTLINE_BUTTON}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <Bilingual kn="ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು" en="Back to all events" enClassName="tracking-normal" />
          </Link>
        </div>
      </article>
    </div>
  );
}