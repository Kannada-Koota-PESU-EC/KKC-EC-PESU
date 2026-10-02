import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ExternalLink,
  Layers3,
  Search,
  Sparkles,
  Star,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import DomainCard from "@/features/Recruitment/components/DomainCard";
import {
  RECRUITMENT_FORM_URL,
  isRecruitmentFormAvailable,
  recruitmentDomains,
} from "@/features/Recruitment/data/recruitment";

const domainGroups = [
  { label: "All", value: "all" },
  { label: "Creative", value: "creative" },
  { label: "Culture", value: "culture" },
  { label: "People", value: "people" },
  { label: "Operations", value: "operations" },
];

const groupForDomain = (id: string) => {
  if (["design", "content-writing", "photography"].includes(id)) {
    return "creative";
  }

  if (["cultural", "inchara"].includes(id)) {
    return "culture";
  }

  if (["hospitality", "marketing", "public-relations"].includes(id)) {
    return "people";
  }

  return "operations";
};

const revealItems = [
  {
    number: "01",
    title: "Find your space.",
    kannada: "ನಿಮ್ಮ ಕ್ಷೇತ್ರವನ್ನು ಆರಿಸಿ.",
    description:
      "Explore the domains where your interests and strengths can make a real difference.",
  },
  {
    number: "02",
    title: "Bring your energy.",
    kannada: "ನಿಮ್ಮ ಪ್ರತಿಭೆಯನ್ನು ತನ್ನಿ.",
    description:
      "Every perspective adds something different to the Kannada Koota experience.",
  },
  {
    number: "03",
    title: "Create together.",
    kannada: "ಒಟ್ಟಾಗಿ ನಿರ್ಮಿಸೋಣ.",
    description:
      "Work with people, turn ideas into experiences, and create something worth remembering.",
  },
];

export default function Recruitment() {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");

  const filteredDomains = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return recruitmentDomains.filter((domain) => {
      const matchesGroup =
        activeGroup === "all" ||
        groupForDomain(domain.id) === activeGroup;

      const matchesQuery =
        !normalized ||
        domain.name.toLowerCase().includes(normalized) ||
        domain.kannadaName.toLowerCase().includes(normalized) ||
        domain.description.toLowerCase().includes(normalized);

      return matchesGroup && matchesQuery;
    });
  }, [activeGroup, query]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="recruitment-page heritage-rangoli-bg min-h-screen overflow-x-hidden">

      <style>{`
        @keyframes recruitmentFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -12px, 0);
          }
        }

        @keyframes recruitmentFloatSlow {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, -18px, 0) rotate(3deg);
          }
        }

        @keyframes recruitmentRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes recruitmentScan {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(420%);
          }
        }

        @keyframes recruitmentShimmer {
          0% {
            background-position: -500px 0;
          }
          100% {
            background-position: 500px 0;
          }
        }

        @keyframes recruitmentPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.35);
          }
        }

        @keyframes recruitmentReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes recruitmentLine {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        .recruitment-float {
          animation: recruitmentFloat 5s ease-in-out infinite;
        }

        .recruitment-float-slow {
          animation: recruitmentFloatSlow 7s ease-in-out infinite;
        }

        .recruitment-rotate {
          animation: recruitmentRotate 22s linear infinite;
        }

        .recruitment-pulse {
          animation: recruitmentPulse 3s ease-in-out infinite;
        }

        .recruitment-reveal {
          animation: recruitmentReveal 0.8s ease-out both;
        }

        .recruitment-line {
          animation: recruitmentLine 1s cubic-bezier(.22,1,.36,1) both;
        }

        .recruitment-delay-1 {
          animation-delay: 120ms;
        }

        .recruitment-delay-2 {
          animation-delay: 220ms;
        }

        .recruitment-delay-3 {
          animation-delay: 320ms;
        }

        .recruitment-delay-4 {
          animation-delay: 420ms;
        }

        .recruitment-shimmer {
          background-size: 1000px 100%;
          animation: recruitmentShimmer 5s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .recruitment-float,
          .recruitment-float-slow,
          .recruitment-rotate,
          .recruitment-pulse,
          .recruitment-reveal,
          .recruitment-line,
          .recruitment-shimmer {
            animation: none !important;
          }
        }
      `}</style>

      {/* HERO */}

      <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden">

        {/* Ambient background */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-[-12%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-red-500/10 blur-[140px]" />
          <div className="absolute bottom-[-20%] left-[35%] h-[24rem] w-[24rem] rounded-full bg-primary/5 blur-[110px]" />
        </div>

        {/* Decorative orbit */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[4%] top-[10%] hidden h-[32rem] w-[32rem] rounded-full border border-primary/10 lg:block recruitment-rotate"
        >
          <div className="absolute left-1/2 top-[-3px] h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_25px_hsl(var(--primary)/0.9)]" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[10%] top-[17%] hidden h-[23rem] w-[23rem] rounded-full border border-red-500/10 lg:block"
        />

        {/* Floating particles */}

        <div
          aria-hidden="true"
          className="recruitment-pulse pointer-events-none absolute left-[8%] top-[24%] h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.9)]"
        />

        <div
          aria-hidden="true"
          className="recruitment-pulse pointer-events-none absolute left-[42%] top-[14%] h-1.5 w-1.5 rounded-full bg-red-400"
          style={{ animationDelay: "800ms" }}
        />

        <div
          aria-hidden="true"
          className="recruitment-pulse pointer-events-none absolute bottom-[24%] right-[38%] h-2 w-2 rounded-full bg-primary"
          style={{ animationDelay: "1400ms" }}
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center px-4 py-16 sm:px-6 md:py-20 lg:px-8">

          <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">

            {/* LEFT */}

            <div className="relative z-10">

              <div className="recruitment-reveal inline-flex items-center gap-2 rounded-full border border-primary/25 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5" />

                <span className="kannada-text tracking-normal">
                  ನೇಮಕಾತಿ
                </span>

                <span className="text-muted-foreground/40">
                  /
                </span>

                Recruitment 2026
              </div>

              <div className="recruitment-reveal recruitment-delay-1 mt-7">

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Kannada Koota EC
                </p>

                <h1 className="max-w-4xl text-[4rem] font-black leading-[0.86] tracking-[-0.055em] text-foreground sm:text-[5.5rem] md:text-[6.5rem] lg:text-[6.8rem]">

                  Find your

                  <span className="relative block">

                    <span className="bg-gradient-to-r from-red-500 via-primary to-yellow-300 bg-clip-text text-transparent">
                      place.
                    </span>

                    <span
                      aria-hidden="true"
                      className="absolute -bottom-2 left-0 h-[3px] w-28 bg-gradient-to-r from-primary to-transparent recruitment-line"
                    />

                  </span>

                </h1>

              </div>

              <div className="recruitment-reveal recruitment-delay-2 mt-8">

                <h2 className="max-w-2xl text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">

                  ಕನ್ನಡ ಕೂಟದ ಜೊತೆ{" "}

                  <span className="kannada-text bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
                    ಒಂದು ಕಥೆ ಕಟ್ಟೋಣ.
                  </span>

                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Bring your craft, curiosity and energy to Kannada Koota EC.
                  Choose a domain, meet people who care about Kannada, and help
                  turn ideas into experiences the campus remembers.
                </p>

              </div>

              <div className="recruitment-reveal recruitment-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">

                <Button
                  size="lg"
                  onClick={() => scrollToSection("domains")}
                  className="group h-13 rounded-full px-7 text-base font-bold shadow-[0_14px_40px_-18px_hsl(var(--primary)/0.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-18px_hsl(var(--primary)/0.9)]"
                >
                  Explore domains

                  <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("apply")}
                  className="group h-13 rounded-full border-primary/25 bg-black/20 px-7 text-base font-semibold backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/5"
                >
                  Register now

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

              </div>

              {/* Stats */}

              <div className="recruitment-reveal recruitment-delay-4 mt-11 grid max-w-xl grid-cols-3 border-y border-border/50">

                <div className="py-5">

                  <p className="text-3xl font-black text-primary">
                    {recruitmentDomains.length}
                  </p>

                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Domains
                  </p>

                </div>

                <div className="border-l border-border/50 px-5 py-5">

                  <p className="text-3xl font-black text-foreground">
                    01
                  </p>

                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Community
                  </p>

                </div>

                <div className="border-l border-border/50 px-5 py-5">

                  <p className="text-3xl font-black text-foreground">
                    ∞
                  </p>

                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Possibilities
                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT VISUAL */}

            <div className="relative mx-auto w-full max-w-[34rem] lg:ml-auto">

              {/* Glow */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-15%] rounded-full bg-primary/10 blur-[90px]"
              />

              {/* Decorative ring */}

              <div
                aria-hidden="true"
                className="absolute -right-5 -top-5 hidden h-24 w-24 rounded-full border border-primary/30 lg:block recruitment-float-slow"
              >
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
              </div>

              {/* Poster frame */}

              <div className="recruitment-float-slow relative">

                <div className="relative rounded-[2.25rem] border border-primary/30 bg-black/40 p-2 shadow-[0_40px_100px_-35px_hsl(var(--primary)/0.65)] backdrop-blur-xl">

                  <div className="relative overflow-hidden rounded-[1.8rem]">

                    <img
                      src="/Events/recruitment.jpeg"
                      alt="Kannada Koota recruitment"
                      className="aspect-[4/5] w-full object-cover"
                    />

                    {/* Image tint */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />

                    {/* Animated scan */}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl recruitment-shimmer"
                    />

                    {/* Top label */}

                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl">
                      KANNADA KOOTA EC
                    </div>

                    {/* Bottom card */}

                    <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-black/55 p-5 backdrop-blur-xl">

                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">

                        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.9)]" />

                        Recruitment 2026

                      </div>

                      <p className="mt-3 text-xl font-black text-white sm:text-2xl">
                        Your talent belongs somewhere.
                      </p>

                      <p className="mt-1 text-sm text-white/65 kannada-text">
                        ನಿಮ್ಮ ಪ್ರತಿಭೆಗೆ ಇಲ್ಲಿ ಒಂದು ಜಾಗವಿದೆ.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Floating badge */}

                <div className="recruitment-float absolute -bottom-5 -left-3 hidden rounded-2xl border border-primary/25 bg-card/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <WandSparkles className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="text-xs text-muted-foreground">
                        Make something
                      </p>

                      <p className="text-sm font-bold text-foreground">
                        worth remembering.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Floating domain badge */}

                <div className="recruitment-float-slow absolute -right-3 top-[28%] hidden rounded-2xl border border-border/70 bg-card/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <Layers3 className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Explore
                      </p>

                      <p className="text-sm font-bold text-foreground">
                        {recruitmentDomains.length} domains
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Scroll cue */}

        <button
          type="button"
          onClick={() => scrollToSection("domains")}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary md:flex"
        >

          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em]">
            Explore
          </span>

          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-border/70 p-1.5">

            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />

          </span>

        </button>

      </section>

      {/* IDENTITY STRIP */}

      <section className="relative border-y border-border/50 bg-black/20">

        <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-5 sm:px-6 lg:justify-between lg:px-8">

          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">

            <Zap className="h-4 w-4 text-primary" />

            Create

          </div>

          <div className="hidden h-5 w-px bg-border/60 lg:block" />

          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">

            <Users className="h-4 w-4 text-primary" />

            Collaborate

          </div>

          <div className="hidden h-5 w-px bg-border/60 lg:block" />

          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">

            <Star className="h-4 w-4 text-primary" />

            Celebrate

          </div>

          <div className="hidden h-5 w-px bg-border/60 lg:block" />

          <div className="kannada-text text-sm font-semibold text-primary/80">

            ಕನ್ನಡ • ಸಂಸ್ಕೃತಿ • ಸಮುದಾಯ

          </div>

        </div>

      </section>

      {/* DOMAIN SECTION */}

      <section
        id="domains"
        className="relative scroll-mt-20 py-24 md:py-32"
      >

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10rem] top-[10rem] h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">

                <span>01</span>

                <span className="h-px w-8 bg-primary/50" />

                Choose your lane

              </div>

              <h2 className="mt-5 text-5xl font-black tracking-[-0.04em] text-foreground md:text-7xl">

                Where do

                <span className="block bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
                  you fit?
                </span>

              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                From technology and design to culture, people and operations,
                there is more than one way to contribute.
              </p>

              <p className="mt-3 text-base text-muted-foreground kannada-text">
                ನಿಮ್ಮ ಆಸಕ್ತಿ ಮತ್ತು ಪ್ರತಿಭೆಗೆ ಹೊಂದುವ ಕ್ಷೇತ್ರವನ್ನು ಆರಿಸಿ.
              </p>

            </div>

            {/* FILTER PANEL */}

            <div className="rounded-[1.75rem] border border-border/60 bg-card/40 p-4 shadow-xl backdrop-blur-xl">

              <div className="relative">

                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search domains..."
                  aria-label="Search recruitment domains"
                  className="h-12 w-full rounded-xl border border-border/70 bg-background/60 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary/60 focus:bg-background/80 focus:ring-4 focus:ring-primary/5"
                />

              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">

                {domainGroups.map((group) => {

                  const active = activeGroup === group.value;

                  return (
                    <button
                      key={group.value}
                      type="button"
                      onClick={() => setActiveGroup(group.value)}
                      className={`relative whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        active
                          ? "border-primary/60 bg-primary text-primary-foreground shadow-[0_8px_25px_-12px_hsl(var(--primary)/0.9)]"
                          : "border-border/70 bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {group.label}
                    </button>
                  );
                })}

              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">

                <span className="text-xs text-muted-foreground">
                  Explore the team
                </span>

                <span className="text-xs font-semibold text-primary">
                  {filteredDomains.length}{" "}
                  {filteredDomains.length === 1 ? "domain" : "domains"}
                </span>

              </div>

            </div>

          </div>

          {/* DOMAIN GRID */}

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {filteredDomains.map((domain, index) => (
              <div
                key={domain.id}
                className="group relative"
              >

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-[1.2rem] bg-gradient-to-r from-primary/0 via-primary/0 to-red-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-red-500/10 group-hover:opacity-100"
                />

                <div className="relative">

                  <DomainCard
                    domain={domain}
                    index={index}
                  />

                </div>

              </div>
            ))}

          </div>

          {filteredDomains.length === 0 && (

            <div className="mt-8 rounded-[2rem] border border-dashed border-border/70 bg-card/30 p-14 text-center backdrop-blur-md">

              <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />

              <p className="mt-4 text-lg font-bold text-foreground">
                No domain matches that search.
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Try another keyword or explore all domains.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveGroup("all");
                }}
                className="mt-5 text-sm font-bold text-primary transition-colors hover:text-primary/80 hover:underline"
              >
                Clear filters
              </button>

            </div>

          )}

        </div>

      </section>

      {/* JOURNEY */}

      <section className="relative px-4 pb-12 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex items-end justify-between gap-6">

            <div>

              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">

                <span>02</span>

                <span className="h-px w-8 bg-primary/50" />

                Your journey

              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground md:text-5xl">
                Pick. Connect. Create.
              </h2>

            </div>

            <Sparkles className="hidden h-7 w-7 text-primary/60 md:block" />

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {revealItems.map((item, index) => (

              <article
                key={item.number}
                className="group relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/40 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_25px_60px_-35px_hsl(var(--primary)/0.65)]"
              >

                <div className="absolute right-5 top-5 text-5xl font-black text-primary/5 transition-colors duration-500 group-hover:text-primary/10">
                  {item.number}
                </div>

                <div className="relative">

                  <div className="flex items-center gap-3">

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-xs font-bold text-primary">
                      {item.number}
                    </span>

                    {index < revealItems.length - 1 && (
                      <span className="hidden h-px flex-1 bg-border/60 md:block" />
                    )}

                  </div>

                  <h3 className="mt-7 text-2xl font-black text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-base font-semibold text-primary/80 kannada-text">
                    {item.kannada}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section
        id="apply"
        className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
      >

        <div className="relative mx-auto max-w-5xl">

          {/* Outer aura */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-10 rounded-full bg-primary/5 blur-[100px]"
          />

          <div className="group relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-card/55 p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_35px_100px_-45px_hsl(var(--primary)/0.75)] md:p-16">

            {/* Hover bloom */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-8rem] left-[-5rem] h-56 w-56 rounded-full bg-red-500/5 opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"
            />

            {/* Decorative stars */}

            <Sparkles
              aria-hidden="true"
              className="absolute left-8 top-8 h-5 w-5 text-primary/30 transition-all duration-500 group-hover:rotate-12 group-hover:text-primary/70"
            />

            <Sparkles
              aria-hidden="true"
              className="absolute bottom-8 right-8 h-5 w-5 text-primary/20 transition-all duration-500 group-hover:-rotate-12 group-hover:text-primary/60"
            />

            <div className="relative">

              <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">

                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.9)]" />

                Your next chapter

              </div>

              <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] text-foreground sm:text-5xl md:text-7xl">

                Ready to make

                <span className="block bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
                  your mark?
                </span>

              </h2>

              <div className="mx-auto mt-7 max-w-2xl">

                <p className="text-base leading-8 text-muted-foreground md:text-lg">
                  Pick the domain that feels like you and complete the official
                  recruitment form.
                </p>

                <p className="mt-2 text-base leading-8 text-muted-foreground kannada-text">
                  ನಿಮ್ಮ ಕ್ಷೇತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.
                </p>

              </div>

              <div className="mt-10">

                {isRecruitmentFormAvailable ? (

                  <Button
                    size="lg"
                    className="group/button h-14 rounded-full px-9 text-base font-bold shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-18px_hsl(var(--primary)/0.9)]"
                    asChild
                  >

                    <a
                      href={RECRUITMENT_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >

                      Register now

                      <ExternalLink className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />

                    </a>

                  </Button>

                ) : (

                  <Button
                    size="lg"
                    className="h-14 rounded-full px-9"
                    disabled
                  >
                    Registration opens soon
                  </Button>

                )}

              </div>

              <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-5 text-xs text-muted-foreground">

                <span className="flex items-center gap-1.5">

                  <Check className="h-3.5 w-3.5 text-primary" />

                  Simple registration

                </span>

                <span className="h-3 w-px bg-border/60" />

                <span className="kannada-text text-primary/70">
                  ಕನ್ನಡ ಕೂಟ EC
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}