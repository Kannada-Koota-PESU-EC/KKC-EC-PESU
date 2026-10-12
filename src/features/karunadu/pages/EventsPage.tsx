import { useState } from "react";
import { Calendar, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { getPastEvents, getUpcomingEvents, type Event } from "@/features/events/data/events";
import { Reveal } from "@/features/karunadu/components/Motion";
import { Puppet } from "@/features/karunadu/components/Motifs";
import { useInView, useTilt } from "@/features/karunadu/hooks";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function EventCard({ event, featured = false, upcoming }: { event: Event; featured?: boolean; upcoming: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLElement>(0.45);
  const tilt = useTilt(5);

  return (
    <article
      ref={ref}
      data-testid={featured ? "featured-event" : "event-card"}
      data-event-id={event.id}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={tilt.style}
      className={`group relative overflow-hidden rounded-[28px] border border-[#ffb35c]/25 bg-[linear-gradient(160deg,#2a0e05,#160602)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${
        featured ? "md:grid md:grid-cols-[1.05fr_1fr]" : ""
      }`}
    >
      {/* carved wooden frame edge */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[#ffb35c]/10" />

      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className={`shadow-img w-full object-cover ${inView ? "lit" : ""} ${featured ? "h-72 md:h-full md:min-h-[420px]" : "h-56"}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_40%,rgba(22,6,2,0.65))]" />
        {upcoming && (
          <span className="absolute right-4 top-4 rounded-full bg-[#2f7d32] px-3 py-1 text-xs font-semibold text-white shadow-lg">Upcoming</span>
        )}
        {featured && (
          <span className="absolute left-4 top-4 rounded-full bg-[#ffcc00] px-3 py-1 text-xs font-semibold text-[#1a0a06] shadow-lg">Featured Event</span>
        )}
      </div>

      <div className="relative space-y-4 p-6 md:p-8">
        <h3 className={`f-serif font-bold leading-snug text-[#fff1d6] ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>{event.title}</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#ffcf8a]/85">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(event.date)}
          </span>
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {event.location}
            </span>
          )}
        </div>
        <p className={`leading-relaxed text-[#fbf3e2]/80 ${featured ? "text-lg" : ""}`}>{event.teaser}</p>

        {event.registerLink && (
          <a href={event.registerLink} target="_blank" rel="noopener noreferrer" className="btn-silk">
            Register Now
          </a>
        )}

        <div className={`grid transition-[grid-template-rows,opacity] duration-700 ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            {event.gallery && event.gallery.length > 0 && (
              <div className="mt-2 border-t border-[#ffb35c]/20 pt-4">
                <h4 className="mb-3 font-semibold text-[#ffcf8a]">Gallery</h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {event.gallery.slice(0, 6).map((image, index) => (
                    <button key={image + index} type="button" onClick={() => setSelectedImage(image)} className="overflow-hidden rounded-xl" aria-label={`Gallery image ${index + 1}`}>
                      <img src={image} alt={`Gallery image ${index + 1}`} loading="lazy" className="h-20 w-full object-cover transition-transform duration-500 hover:scale-110" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button type="button" onClick={() => setIsExpanded((v) => !v)} className="btn-line py-2 text-sm" aria-expanded={isExpanded}>
          <span>{isExpanded ? "Show Less" : "Read More"}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-4" onClick={() => setSelectedImage(null)} role="dialog">
          <img src={selectedImage} alt="" className="max-h-[90%] max-w-[90%] rounded-2xl shadow-2xl" />
        </div>
      )}
    </article>
  );
}

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="min-h-screen bg-[#160602]" data-cursor="ember">
      {/* shadow-puppet screen */}
      <section className="relative overflow-hidden px-4 pb-20 pt-36">
        <div className="puppet-screen absolute inset-x-[4%] top-24 bottom-6 rounded-[40px] opacity-95 shadow-[0_0_120px_20px_rgba(255,150,40,0.25)]" />
        <div className="absolute inset-x-[4%] top-24 bottom-6 rounded-[40px] opacity-30" style={{ background: "repeating-linear-gradient(90deg,transparent 0 3px,rgb(0 0 0 / .25) 3px 4px)" }} />
        <div className="pointer-events-none absolute inset-x-[8%] bottom-6 top-24 flex items-end justify-between">
          <Puppet className="puppet h-[78%] w-auto opacity-90" />
          <Puppet className="puppet hidden h-[70%] w-auto -scale-x-100 opacity-90 md:block" color="#3a1206" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl py-16 text-center">
          <Reveal variant="focus">
            <h1 className="f-display text-6xl font-bold text-[#2a0e05] md:text-8xl">All Events</h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-lg font-medium text-[#2a0e05]/85">Explore our upcoming and past celebrations.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10">
        <Reveal>
          <h2 className="f-display mb-10 text-4xl font-semibold text-[#ffcf8a]">Upcoming Events</h2>
        </Reveal>
        {upcomingEvents.length === 0 ? (
          <Reveal>
            <p className="text-[#fbf3e2]/70">No upcoming events right now.</p>
          </Reveal>
        ) : (
          <div className="space-y-8">
            <Reveal>
              <EventCard event={upcomingEvents[0]} featured upcoming />
            </Reveal>
            {upcomingEvents.length > 1 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.slice(1).map((event, i) => (
                  <Reveal key={event.id} delay={(i % 3) * 120}>
                    <EventCard event={event} upcoming />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-28">
        <Reveal>
          <h2 className="f-display mb-10 text-4xl font-semibold text-[#ffcf8a]">Past Events</h2>
        </Reveal>
        {pastEvents.length === 0 ? (
          <p className="text-[#fbf3e2]/70">No past events available.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event, i) => (
              <Reveal key={event.id} delay={(i % 3) * 120}>
                <EventCard event={event} upcoming={false} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
