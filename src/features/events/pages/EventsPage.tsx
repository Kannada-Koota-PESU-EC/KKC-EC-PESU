import EventCard from "@/features/events/components/EventCard";
import { getUpcomingEvents, getPastEvents } from "@/features/events/data/events";

export default function Events() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">
          All Events
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore our upcoming and past celebrations.
        </p>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Upcoming Events
        </h2>

        {upcomingEvents.length === 0 ? (
          <p className="text-muted-foreground">
            No upcoming events right now.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Past Events
        </h2>

        {pastEvents.length === 0 ? (
          <p className="text-muted-foreground">
            No past events available.
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
