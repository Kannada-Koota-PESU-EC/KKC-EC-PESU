import { useEffect, useMemo, useState, type CSSProperties } from "react";
import EventCard from "@/features/events/components/EventCard";
import EventModal from "@/features/events/components/EventModal";
import { Event, events, getUpcomingEvents, getPastEvents } from "@/features/events/data/events";
import { parseEventDate } from "@/features/events/components/eventFormat";
import { useLanguage } from "@/shared/i18n/useLanguage";
import { useInView } from "@/shared/hooks/use-in-view";
import PageHeader from "@/shared/components/layout/PageHeader";
import SectionTitle from "@/shared/components/layout/SectionTitle";
import { CalendarDays } from "lucide-react";

type YearFilter = "all" | number;

// Cards fade up one by one when the grid scrolls into view
function EventGrid({ events, onOpen }: { events: Event[]; onOpen: (event: Event) => void }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  return (
    <div ref={ref} className={`event-grid ${inView ? "is-visible" : ""}`}>
      {events.map((event, index) => (
        <div key={event.id} className="event-slot" style={{ "--i": index } as CSSProperties}>
          <EventCard event={event} onOpen={onOpen} />
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const { lang, t } = useLanguage();
  const [openEvent, setOpenEvent] = useState<Event | null>(null);
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  // Shared links (/events#<id>) open that event's details
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const shared = id ? events.find((event) => event.id === id) : undefined;
    if (shared) setOpenEvent(shared);
  }, []);

  const countLabel = (n: number) => (n === 1 ? t("events.countOne") : t("events.count", { n }));

  const pastYears = useMemo(
    () => [...new Set(pastEvents.map((event) => parseEventDate(event.date).getFullYear()))].sort((a, b) => b - a),
    [pastEvents],
  );
  const filteredPast =
    yearFilter === "all"
      ? pastEvents
      : pastEvents.filter((event) => parseEventDate(event.date).getFullYear() === yearFilter);

  return (
    <div className="min-h-screen">
      <PageHeader title={t("events.title")} subtitle={t("events.subtitle")} />

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <SectionTitle
          title={t("events.upcoming")}
          meta={upcomingEvents.length > 0 ? countLabel(upcomingEvents.length) : undefined}
          className="mb-8"
        />

        {upcomingEvents.length === 0 ? (
          <div className="empty-state flex flex-col items-center gap-3 px-6 py-10 text-center">
            <CalendarDays className="h-8 w-8 text-[#c9a24a]" aria-hidden="true" />
            <p className="text-lg text-[#ece7dc]">{t("events.noUpcoming")}</p>
            <p className="text-sm text-muted-foreground">{t("events.noUpcomingHint")}</p>
          </div>
        ) : (
          <EventGrid events={upcomingEvents} onOpen={setOpenEvent} />
        )}
      </section>

      {/* Past Events */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle
          title={t("events.past")}
          meta={filteredPast.length > 0 ? countLabel(filteredPast.length) : undefined}
          className="mb-6"
        />

        {pastEvents.length === 0 ? (
          <p className="text-muted-foreground">
            {t("events.noPast")}
          </p>
        ) : (
          <>
            {pastYears.length > 1 && (
              <div role="group" aria-label={t("events.filterLabel")} className="mb-8 flex flex-wrap gap-2">
                {(["all", ...pastYears] as YearFilter[]).map((year) => (
                  <button
                    key={year}
                    type="button"
                    aria-pressed={yearFilter === year}
                    onClick={() => setYearFilter(year)}
                    className={`event-filter-chip ${year === "all" && lang === "kn" ? "kannada-text" : ""}`}
                  >
                    {year === "all" ? t("events.filterAll") : year}
                  </button>
                ))}
              </div>
            )}

            {/* Keyed by filter so the cards fade in again when the year changes */}
            <EventGrid key={String(yearFilter)} events={filteredPast} onOpen={setOpenEvent} />
          </>
        )}
      </section>

      <EventModal event={openEvent} onClose={() => setOpenEvent(null)} />
    </div>
  );
}
