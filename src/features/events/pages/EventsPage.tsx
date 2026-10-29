import { ArrowDown } from "lucide-react";
import EventCard from "@/features/events/components/EventCard";
import Bilingual from "@/features/events/components/Bilingual";
import Reveal from "@/features/events/components/Reveal";
import {
  getUpcomingEvents,
  getPastEvents,
} from "@/features/events/data/events";
import {
  OUTLINE_BUTTON,
  PRIMARY_BUTTON,
  prefersReducedMotion,
} from "@/features/events/lib/eventUtils";

/* Layout "slots": the lists cycle through these, so any number of events keeps the rhythm. */

const UPCOMING_SLOTS = [
  {
    wrapper: "lg:col-span-5 lg:col-start-1",
    tile: "aspect-[4/5] rounded-tl-[3rem] rounded-br-[3rem] rounded-bl-xl rounded-tr-xl",
  },
  {
    wrapper: "lg:col-span-4 lg:col-start-7 lg:mt-20",
    tile: "aspect-[4/5] rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl lg:aspect-square",
  },
  {
    wrapper: "lg:col-span-6 lg:col-start-3",
    tile: "aspect-[4/5] rounded-3xl lg:aspect-[16/10]",
  },
] as const;

const MEMORY_SLOTS = [
  {
    wrapper: "lg:col-span-7",
    tile: "aspect-[4/5] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-bl-xl rounded-tr-xl lg:aspect-[16/11]",
  },
  {
    wrapper: "lg:col-span-5 lg:mt-16",
    tile: "aspect-[4/5] rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-xl rounded-br-xl",
  },
  {
    wrapper: "lg:col-span-4",
    tile: "aspect-[4/5] rounded-2xl lg:aspect-square",
  },
  {
    wrapper: "lg:col-span-4 lg:mt-12",
    tile: "aspect-[4/5] rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-bl-lg rounded-tr-lg lg:aspect-[3/4]",
  },
  {
    wrapper: "lg:col-span-4 lg:mt-4",
    tile: "aspect-[4/5] rounded-3xl",
  },
  {
    wrapper: "lg:col-span-5",
    tile: "aspect-[4/5] rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-lg rounded-br-lg",
  },
  {
    wrapper: "lg:col-span-7 lg:mt-10",
    tile: "aspect-[4/5] rounded-tl-[3rem] rounded-br-[3rem] rounded-bl-xl rounded-tr-xl lg:aspect-[16/11]",
  },
] as const;

const STRIP_WORDS = ["ಹಬ್ಬ", "ಹಾಡು", "ನೃತ್ಯ", "ನಗು", "ನೆನಪು", "ಕನ್ನಡ"];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
};

export default function Events() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  const hasAnyEvents = upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <div className="koota-subpage koota-events events-flower-rangoli-bg min-h-screen overflow-hidden">
      {/* HERO */}
      <header className="relative border-b border-border/50">
        <span
          aria-hidden="true"
          lang="kn"
          className="pointer-events-none absolute -right-4 -top-8 select-none text-[length:clamp(14rem,34vw,30rem)] font-black leading-none text-primary/[0.07]"
        >
          ಕ
        </span>

        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-20">
          <p className="flex items-center gap-3 text-xs font-bold text-primary">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            <Bilingual kn="ಕನ್ನಡ ಕೂಟ" en="PESU EC" enClassName="uppercase tracking-[0.3em]" />
          </p>

          <h1
            lang="kn"
            className="mt-6 text-[length:clamp(2.75rem,9.5vw,8rem)] font-black leading-[1.2] text-foreground"
          >
            <span className="block text-primary">ನಮ್ಮ</span>
            <span className="block">
              ಕಾರ್ಯಕ್ರಮಗಳು<span className="text-primary">.</span>
            </span>
          </h1>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
            <div>
              <p
                lang="kn"
                className="max-w-2xl text-xl font-semibold leading-9 text-foreground sm:text-2xl sm:leading-10"
              >
                ಹಬ್ಬ, ಹಾಡು, ನೃತ್ಯ, ನಗು — ಪ್ರತಿ ಕಾರ್ಯಕ್ರಮವೂ ಒಂದು ಹೊಸ ನೆನಪು.
              </p>

              <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Festivals, dance, stage and service — this is how Kannada Koota
                shows up, together, all year round.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("upcoming")}
                  className={PRIMARY_BUTTON}
                >
                  <Bilingual kn="ಮುಂದಿನ ಸಂಭ್ರಮ" en="Upcoming" enClassName="tracking-normal" />
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("memories")}
                  className={OUTLINE_BUTTON}
                >
                  <Bilingual kn="ನೆನಪಿನ ಗೋಡೆ" en="Memories" enClassName="tracking-normal" />
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="flex items-end gap-4 lg:justify-end">
              <div className="-rotate-3 border border-primary/40 bg-background/60 px-5 py-4 text-center backdrop-blur-sm">
                <p className="text-3xl font-black text-primary">
                  {String(upcomingEvents.length).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[10px] font-bold text-muted-foreground">
                  <Bilingual kn="ಮುಂದೆ" en="Upcoming" enClassName="uppercase tracking-[0.16em]" />
                </p>
              </div>

              <div className="rotate-2 border border-border bg-background/60 px-5 py-4 text-center backdrop-blur-sm">
                <p className="text-3xl font-black text-foreground">
                  {String(pastEvents.length).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[10px] font-bold text-muted-foreground">
                  <Bilingual kn="ನೆನಪುಗಳು" en="Memories" enClassName="uppercase tracking-[0.16em]" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tilted ribbon between the hero and the events */}
      <div
        aria-hidden="true"
        lang="kn"
        className="relative z-10 -mx-[5%] my-3 w-[110%] -rotate-1 overflow-hidden bg-primary py-3 text-primary-foreground"
      >
        <div className="flex items-center justify-center gap-5 whitespace-nowrap text-sm font-bold sm:text-base">
          {[...STRIP_WORDS, ...STRIP_WORDS].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-5">
              {word}
              <span className="text-xs opacity-70">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* UPCOMING */}
      <section
        id="upcoming"
        aria-labelledby="upcoming-heading"
        className="mx-auto max-w-7xl scroll-mt-6 px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-primary">
              <Bilingual kn="ಮುಂದೆ ಏನಿದೆ?" en="The next chapter" />
            </p>

            <h2
              id="upcoming-heading"
              lang="kn"
              className="text-4xl font-black leading-[1.25] text-foreground sm:text-6xl"
            >
              ಬರುವ ಸಂಭ್ರಮ<span className="text-primary">.</span>
            </h2>
          </div>

          <p className="hidden max-w-48 text-right text-sm leading-6 text-muted-foreground sm:block">
            Your next favourite memory might be right here.
          </p>
        </div>

        {upcomingEvents.length > 0 ? (
          <>
            <Reveal>
              <EventCard
                event={upcomingEvents[0]}
                upcoming
                featured
              />
            </Reveal>

            {upcomingEvents.length > 1 && (
              <div className="mt-16 grid grid-cols-12 items-start gap-x-6 gap-y-14 lg:gap-x-8 lg:gap-y-16">
                {upcomingEvents.slice(1).map((event, index) => {
                  const slot = UPCOMING_SLOTS[index % UPCOMING_SLOTS.length];

                  return (
                    <Reveal
                      key={event.id}
                      delay={(index % 3) * 70}
                      className={`col-span-12 sm:col-span-6 ${slot.wrapper}`}
                    >
                      <EventCard
                        event={event}
                        upcoming
                        tileClassName={slot.tile}
                        caption={`ಮುಂದೆ · ${String(index + 2).padStart(2, "0")}`}
                      />
                    </Reveal>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-primary/40 bg-background/50 px-6 py-14 text-center backdrop-blur-sm sm:py-20">
            <span
              aria-hidden="true"
              lang="kn"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[12rem] font-black leading-none text-primary/[0.06]"
            >
              ಸ
            </span>

            <p lang="kn" className="relative text-2xl font-black leading-[1.4] text-foreground sm:text-3xl">
              ಮುಂದಿನ ಅಧ್ಯಾಯವನ್ನು ಬರೆಯುತ್ತಿದ್ದೇವೆ.
            </p>

            <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
              No events are scheduled at the moment — check back soon.
            </p>

            {pastEvents.length > 0 && (
              <button
                type="button"
                onClick={() => scrollToSection("memories")}
                className={`relative mt-7 ${OUTLINE_BUTTON}`}
              >
                <Bilingual
                  kn="ನೆನಪುಗಳನ್ನು ನೋಡಿ"
                  en="Browse the memories"
                  enClassName="tracking-normal"
                />
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </section>

      {/* PAST: WALL OF MEMORIES */}
      {pastEvents.length > 0 && (
        <section
          id="memories"
          aria-labelledby="memories-heading"
          className="scroll-mt-6 border-t border-border/60 bg-muted/20"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-2 text-sm font-semibold text-primary">
                  <Bilingual kn="ಮರೆಯಲಾಗದ ಕ್ಷಣಗಳು" en="The wall of memories" />
                </p>

                <h2
                  id="memories-heading"
                  lang="kn"
                  className="text-4xl font-black leading-[1.25] text-foreground sm:text-6xl"
                >
                  ನೆನಪಿನ ಗೋಡೆ<span className="text-primary">.</span>
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                  Some days end. Some moments stay on the wall forever. Hover
                  over a photo, open it, and step back into the celebration.
                </p>
              </div>

              <span className="w-fit -rotate-3 border border-primary/50 px-4 py-3 text-xs font-black text-primary">
                <Bilingual kn="ನೆನಪುಗಳಿಂದ ನಿರ್ಮಿತ" en="Made of memories" enClassName="uppercase tracking-[0.18em]" />
              </span>
            </div>

            <div className="grid grid-cols-12 items-start gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
              {pastEvents.map((event, index) => {
                const slot = MEMORY_SLOTS[index % MEMORY_SLOTS.length];

                return (
                  <Reveal
                    key={event.id}
                    delay={(index % 3) * 70}
                    className={`col-span-12 sm:col-span-6 ${slot.wrapper}`}
                  >
                    <EventCard
                      event={event}
                      upcoming={false}
                      tileClassName={slot.tile}
                      caption={`ನೆನಪು · ${String(index + 1).padStart(2, "0")}`}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* NOTHING AT ALL */}
      {!hasAnyEvents && (
        <section className="mx-auto max-w-7xl px-5 py-24 text-center">
          <p lang="kn" className="text-3xl font-black text-foreground">
            ಮುಂದಿನ ಕಥೆ ಇನ್ನಷ್ಟೇ ಬರೆಯಬೇಕು.
          </p>
          <p className="mt-3 text-muted-foreground">
            This collection is waiting for its first memory.
          </p>
        </section>
      )}

      {/* FOOTER */}
      <footer className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6">
          <p lang="kn" className="font-bold text-foreground">
            ಕನ್ನಡ ಕೂಟ <span className="text-primary">♥</span>
          </p>

          <p lang="kn" className="text-xs font-semibold text-muted-foreground">
            ನಮ್ಮ ಭಾಷೆ · ನಮ್ಮ ಸಂಸ್ಕೃತಿ · ನಮ್ಮ ಹೆಮ್ಮೆ
          </p>
        </div>
      </footer>

    </div>
  );
}