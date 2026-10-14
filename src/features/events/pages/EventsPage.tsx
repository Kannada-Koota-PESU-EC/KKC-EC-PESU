import EventCard from "@/features/events/components/EventCard";
import { getUpcomingEvents, getPastEvents } from "@/features/events/data/events";
import { useLanguage } from "@/shared/i18n/useLanguage";
import PageHeader from "@/shared/components/layout/PageHeader";
import SectionTitle from "@/shared/components/layout/SectionTitle";
import { CalendarDays } from "lucide-react";

export default function Events() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const { t } = useLanguage();
  const countLabel = (n: number) => (n === 1 ? t("events.countOne") : t("events.count", { n }));

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
          <div className="space-y-8">
            <EventCard event={upcomingEvents[0]} featured />

            {upcomingEvents.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.slice(1).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle
          title={t("events.past")}
          meta={pastEvents.length > 0 ? countLabel(pastEvents.length) : undefined}
          className="mb-8"
        />

        {pastEvents.length === 0 ? (
          <p className="text-muted-foreground">
            {t("events.noPast")}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
