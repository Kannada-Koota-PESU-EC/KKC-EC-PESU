import { useEffect, useRef } from "react";

import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Camera,
  Clapperboard,
  Code2,
  Handshake,
  HeartHandshake,
  Megaphone,
  Mic2,
  PenLine,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

const recruitmentForm = "https://forms.gle/1Ejkg7UAniHSm3fB9";

const domains = [
  {
    name: "IT",
    kannada: "ಐಟಿ",
    icon: Code2,
  },
  {
    name: "Event Management",
    kannada: "ಈವೆಂಟ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್",
    icon: CalendarDays,
  },
  {
    name: "Logistics",
    kannada: "ಲಾಜಿಸ್ಟಿಕ್ಸ್",
    icon: Truck,
  },
  {
    name: "Cultural",
    kannada: "ಸಾಂಸ್ಕೃತಿಕ",
    icon: Sparkles,
  },
  {
    name: "Design & Video Editing",
    kannada: "ವಿನ್ಯಾಸ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪಾದನೆ",
    icon: Clapperboard,
  },
  {
    name: "Hospitality",
    kannada: "ಅತಿಥಿ ಸತ್ಕಾರ",
    icon: HeartHandshake,
  },
  {
    name: "Marketing",
    kannada: "ಮಾರ್ಕೆಟಿಂಗ್",
    icon: Megaphone,
  },
  {
    name: "Photography",
    kannada: "ಛಾಯಾಗ್ರಹಣ",
    icon: Camera,
  },
  {
    name: "Culturals - INCHARA",
    kannada: "ಸಾಂಸ್ಕೃತಿಕ - ಇಂಚರ",
    icon: Mic2,
  },
  {
    name: "Content Writing",
    kannada: "ವಿಷಯ ಬರವಣಿಗೆ",
    icon: PenLine,
  },
  {
    name: "Operations",
    kannada: "ಕಾರ್ಯಾಚರಣೆಗಳು",
    icon: Users,
  },
  {
    name: "Public Relations",
    kannada: "ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕಗಳು",
    icon: Handshake,
  },
  {
    name: "Sponsorship",
    kannada: "ಪ್ರಾಯೋಜಕತ್ವ",
    icon: Handshake,
  },
];

/* =========================================================
   CURSOR FOLLOWER
========================================================= */

function CursorFollower() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    let animationFrame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      /*
       * Smooth interpolation.
       * The cursor effect slightly follows behind the real cursor,
       * giving it a premium "magnetic" feel.
       */
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(
          ${currentX - 180}px,
          ${currentY - 180}px,
          0
        )`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(
          ${mouseX - 4}px,
          ${mouseY - 4}px,
          0
        )`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Large soft cursor spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[360px] w-[360px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,205,0,0.13) 0%, rgba(255,150,0,0.06) 25%, rgba(255,80,0,0.025) 45%, transparent 72%)",
          filter: "blur(4px)",
        }}
      />

      {/* Small cursor point */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[61] hidden h-2 w-2 rounded-full bg-primary md:block"
        style={{
          boxShadow:
            "0 0 12px rgba(255,205,0,0.9), 0 0 28px rgba(255,150,0,0.45)",
        }}
      />
    </>
  );
}

export default function Recruitment() {
  const scrollToDomains = () => {
    document.getElementById("domains")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">

      {/* CURSOR EFFECT */}
      <CursorFollower />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">

        {/* Main background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-muted/20" />

        {/* Atmospheric glow */}
        <div className="absolute left-[5%] top-[15%] h-72 w-72 rounded-full bg-primary/10 blur-[120px] animate-pulse" />

        <div className="absolute bottom-[5%] right-[20%] h-80 w-80 rounded-full bg-orange-500/10 blur-[130px] animate-pulse" />

        {/* Rotating background rings */}
        <div className="absolute -right-40 top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full border border-primary/10 animate-[spin_45s_linear_infinite]" />

        <div className="absolute -right-10 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-primary/10 animate-[spin_30s_linear_infinite_reverse]" />

        <div className="absolute right-32 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full border border-primary/10" />

        {/* Decorative dots */}
        <div className="absolute left-[7%] top-[24%] h-2 w-2 rounded-full bg-primary animate-pulse" />

        <div className="absolute right-[31%] top-[18%] h-2 w-2 rounded-full bg-primary/50 animate-pulse" />

        <div className="absolute bottom-[20%] left-[43%] h-2 w-2 rounded-full bg-orange-400/50 animate-pulse" />

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">

          {/* LEFT */}
          <div className="max-w-4xl animate-fade-in-up">

            <div className="mb-8 flex items-center gap-3 text-primary">

              <span className="h-px w-12 bg-primary" />

              <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                Kannada Koota EC
              </span>

            </div>

            <p className="mb-4 text-xl font-medium text-primary md:text-2xl animate-fade-in-up">
              ಕನ್ನಡ ಕೂಟಕ್ಕೆ ಸೇರಿ
            </p>

            <h1 className="text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl animate-fade-in-up">

              JOIN

              <br />

              <span className="moving-gradient-text bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent">
                KANNADA
              </span>

              <br />

              <span className="moving-gradient-text bg-gradient-to-r from-orange-400 via-red-500 to-primary bg-clip-text text-transparent">
                KOOTA
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg animate-fade-in-up">
              ನಿಮ್ಮ ಪ್ರತಿಭೆಯನ್ನು ತೋರಿಸಿ. ಹೊಸ ಜನರನ್ನು ಭೇಟಿ ಮಾಡಿ.
              ಕನ್ನಡದೊಂದಿಗೆ ಏನನ್ನಾದರೂ ಸೃಷ್ಟಿಸಿ.
            </p>

            <p className="mt-2 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg animate-fade-in-up">
              Bring your skills. Meet new people. Create experiences.
              Be part of something bigger than yourself.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up">

              <a
                href={recruitmentForm}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
              >
                JOIN THE TEAM

                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </a>

              <button
                onClick={scrollToDomains}
                className="group inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 font-semibold transition-all duration-300 hover:border-primary hover:text-primary"
              >
                EXPLORE DOMAINS

                <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
              </button>

            </div>
          </div>

          {/* =====================================================
              RIGHT MOTIVATIONAL VISUAL
          ===================================================== */}
          <div className="relative hidden min-h-[520px] items-center justify-center lg:flex">

            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

            <div className="absolute right-4 top-6 text-right">

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                Recruitment '26
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Your story starts here.
              </p>

            </div>

            <div className="relative w-full pl-16">

              <div className="group animate-fade-in-up">

                <p className="mb-1 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
                  01
                </p>

                <h2 className="text-6xl font-black leading-none tracking-tight transition-all duration-500 group-hover:translate-x-3 md:text-7xl">
                  CREATE
                  <span className="text-primary">.</span>
                </h2>

              </div>

              <div
                className="mt-8 group animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >

                <p className="mb-1 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
                  02
                </p>

                <h2 className="text-6xl font-black leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_hsl(var(--primary)/0.45)] transition-all duration-500 group-hover:translate-x-3 md:text-7xl">
                  LEAD
                  <span className="text-primary">.</span>
                </h2>

              </div>

              <div
                className="mt-8 group animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >

                <p className="mb-1 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
                  03
                </p>

                <h2 className="text-5xl font-black leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_hsl(var(--foreground)/0.25)] transition-all duration-500 group-hover:translate-x-3 md:text-6xl">
                  REPRESENT
                  <span className="text-primary">.</span>
                </h2>

              </div>

              <div
                className="mt-12 max-w-md border-l-2 border-primary pl-5 animate-fade-in-up"
                style={{ animationDelay: "600ms" }}
              >

                <p className="text-lg font-medium leading-7">
                  Don't just be a part of your college years.

                  <span className="text-primary">
                    {" "}Create the moments you'll remember.
                  </span>
                </p>

              </div>

            </div>

            <div className="absolute bottom-4 left-16 flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">

              <span className="h-px w-10 bg-border" />

              <span>
                CULTURE · COMMUNITY · CREATIVITY
              </span>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          WHY JOIN
      ========================================================= */}
      <section className="border-y border-border/50 py-24 md:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-16 max-w-2xl">

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Why join?
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              More than a club.
              <br />

              <span className="text-muted-foreground">
                It's an experience.
              </span>
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "CREATE",
                text: "Turn your ideas into real events, projects and experiences.",
              },
              {
                number: "02",
                title: "CONNECT",
                text: "Meet people from different domains and build meaningful connections.",
              },
              {
                number: "03",
                title: "CELEBRATE",
                text: "Be part of a community that celebrates Kannada culture and creativity.",
              },
            ].map((item, index) => (

              <div
                key={item.number}
                className="group rounded-3xl border border-border bg-card/30 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >

                <div className="mb-10 flex items-center justify-between">

                  <span className="text-sm font-bold text-primary">
                    {item.number}
                  </span>

                  <span className="h-5 w-5" />

                </div>

                <h3 className="text-2xl font-black">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {item.text}
                </p>

              </div>

            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          DOMAINS
      ========================================================= */}
      <section
        id="domains"
        className="scroll-mt-20 py-24 md:py-32"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-16 max-w-3xl">

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Find your place
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Choose your
              <br />

              <span className="text-muted-foreground">
                domain.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
              Whether you love technology, creativity, management,
              culture or people — there is a place for you inside
              Kannada Koota.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {domains.map((domain, index) => {

              const Icon = domain.icon;

              return (
                <div
                  key={domain.name}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/20 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:bg-card/50 hover:shadow-xl hover:shadow-primary/5 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >

                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-5">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background transition-all duration-500 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/10">

                      <Icon className="h-6 w-6 text-primary transition-transform duration-500 group-hover:rotate-6" />

                    </div>

                    <div>

                      <h3 className="font-bold">
                        {domain.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {domain.kannada}
                      </p>

                    </div>

                    <span className="ml-auto h-4 w-4" />

                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =========================================================
          JOURNEY
      ========================================================= */}
      <section className="border-y border-border/50 bg-card/20 py-24 md:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-16">

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Your journey
            </p>

            <h2 className="text-4xl font-black md:text-6xl">
              From applicant
              <br />

              <span className="text-muted-foreground">
                to team member.
              </span>
            </h2>

          </div>

          <div className="grid gap-8 md:grid-cols-4">

            {[
              {
                number: "01",
                title: "DISCOVER",
                text: "Explore the domains and find where your interests fit.",
              },
              {
                number: "02",
                title: "APPLY",
                text: "Tell us about yourself, your skills and what you want to contribute.",
              },
              {
                number: "03",
                title: "CONNECT",
                text: "Meet the people behind Kannada Koota and become part of the community.",
              },
              {
                number: "04",
                title: "CREATE",
                text: "Work together, learn new skills and create something meaningful.",
              },
            ].map((step, index) => (

              <div
                key={step.number}
                className="group relative animate-fade-in-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >

                {index !== 3 && (
                  <div className="absolute left-12 top-6 hidden h-px w-[calc(100%-3rem)] bg-border md:block" />
                )}

                <div className="relative">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background text-sm font-bold text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                    {step.number}
                  </div>

                  <h3 className="mt-8 text-xl font-black">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {step.text}
                  </p>

                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden py-32 md:py-44">

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">

          <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-primary">
            Recruitment '26
          </p>

          <h2 className="text-5xl font-black leading-tight md:text-8xl">

            ಇದು ನಿಮ್ಮ ಸಮಯ.

            <br />

            <span className="moving-gradient-text bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent">
              THIS IS YOUR TIME.
            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            ನಿಮ್ಮ ಪ್ರತಿಭೆ, ನಿಮ್ಮ ಆಲೋಚನೆಗಳು ಮತ್ತು ನಿಮ್ಮ ಶಕ್ತಿಯನ್ನು
            ಕನ್ನಡ ಕೂಟದೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ.
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Your skills. Your ideas. Your energy.
            Bring them to Kannada Koota EC.
          </p>

          <a
            href={recruitmentForm}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-9 py-5 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
          >
            REGISTER NOW

            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
          </a>

        </div>
      </section>

    </main>
  );
}