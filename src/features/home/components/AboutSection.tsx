
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background py-20 text-foreground sm:py-28"
    >
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute -right-12 top-32 h-48 w-48 rounded-full border border-primary/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-4 w-4" />
              Our Story
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              More than a club.
              <span className="kannada-text mt-2 block text-primary">
                ಒಂದು ಕುಟುಂಬ.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            A place where language connects generations, culture brings us
            together, and campus life becomes a little more meaningful.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-3 rotate-2 rounded-2xl bg-primary/10" />

            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <img
                src="/Hero/TM 2.JPG"
                alt="Kannada Koota members celebrating together"
                className="aspect-[4/5] max-h-[620px] w-full object-cover sm:aspect-[5/4]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="kannada-text text-3xl font-bold sm:text-4xl">
                  ನಮ್ಮ ಸಮುದಾಯ
                </p>
                <p className="mt-2 text-sm tracking-wide text-white/80">
                  Our Community · Our Culture · Our Home
                </p>
              </div>

              <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                PESU · Electronic City
              </div>
            </div>

            <div className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-lg sm:-right-5 sm:p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Rooted in Karnataka</p>
                <p className="text-xs text-muted-foreground">
                  Growing together on campus
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 lg:pt-5">
            <p className="kannada-text text-lg font-medium text-primary">
              ಕನ್ನಡ ನಮ್ಮ ಹೆಮ್ಮೆ.
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              Keeping our roots alive in a changing world.
            </h3>

            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Kannada Koota EC PES is a cultural community at PES University
              Electronic City Campus dedicated to celebrating Kannada
              language, literature, art, and traditions. We bring students
              together through shared experiences that make our culture a
              living part of campus life.
            </p>

            <div className="my-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <Users className="mb-4 h-5 w-5 text-primary" />
                <p className="text-lg font-bold">Culture & Community</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Bringing students together through a shared heritage.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <CalendarDays className="mb-4 h-5 w-5 text-primary" />
                <p className="text-lg font-bold">Events & Experiences</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Creating opportunities to celebrate and participate.
                </p>
              </div>
            </div>

            <Collapsible.Root
              open={isExpanded}
              onOpenChange={setIsExpanded}
            >
              <p className="text-base leading-8 text-muted-foreground">
                From cultural celebrations to creative activities, Kannada
                Koota is a space to discover traditions, share ideas, build
                friendships, and make memories with people across campus.
              </p>

              <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="mt-6 space-y-6 border-l-2 border-primary/30 pl-5">
                  <div>
                    <h4 className="text-lg font-bold">Our Mission</h4>
                    <p className="mt-2 leading-7 text-muted-foreground">
                      To create an inclusive platform where students can
                      connect with their cultural roots, appreciate Kannada
                      heritage, and form lasting friendships through meaningful
                      experiences.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold">What We Celebrate</h4>
                    <ul className="mt-3 space-y-3 text-muted-foreground">
                      {[
                        "Kannada Rajyotsava and cultural festivals",
                        "Kannada literature, poetry, and language",
                        "Traditional arts, music, and performances",
                        "Creative activities and community participation",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span className="leading-6">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <p className="kannada-text text-center text-lg font-semibold text-primary sm:text-xl">
                      ಕನ್ನಡವೇ ಸತ್ಯ, ಕನ್ನಡವೇ ನಿತ್ಯ.
                    </p>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      Celebrating the language that connects us.
                    </p>
                  </blockquote>
                </div>
              </Collapsible.Content>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Collapsible.Trigger asChild>
                  <Button
                    variant="outline"
                    className="min-h-11 justify-center rounded-full border-primary/30 px-5"
                  >
                    {isExpanded ? "Show Less" : "Discover Our Story"}
                    {isExpanded ? (
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </Collapsible.Trigger>

                <Button
                  asChild
                  className="min-h-11 rounded-full px-5"
                >
                  <Link to="/team">
                    Meet Our Team
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Collapsible.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
