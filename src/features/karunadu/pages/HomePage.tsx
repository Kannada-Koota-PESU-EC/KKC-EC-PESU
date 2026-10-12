import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Award, Calendar, ChevronDown, ChevronUp, Heart, Users } from "lucide-react";
import RepublicDayPopup from "@/features/home/components/RepublicDayPopup";
import { CountUp, Letters, Magnetic, Reveal } from "@/features/karunadu/components/Motion";
import { Bell, Gandaberunda, Roller } from "@/features/karunadu/components/Motifs";
import KarnatakaMap from "@/features/karunadu/components/KarnatakaMap";
import IconLauncher from "@/features/karunadu/components/IconLauncher";
import Panorama from "@/features/karunadu/components/Panorama";
import {
  AksharaWall, ArtsGallery, BananaLeafMeal, FestivalWheel, HeroStones, Literature, NadaGeethe, NameHeading, StateSymbols, Veena,
} from "@/features/karunadu/components/Culture";
import { ringBell } from "@/features/karunadu/audio";
import { reducedMotion, useScrollProgress } from "@/features/karunadu/hooks";

/* ---------- time-of-day sky ---------- */
function skyNow() {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 19) return "dusk";
  return "night";
}

/* ---------- original hero carousel (MarqueeImages) ---------- */
const HERO_IMAGES = ["/img4.jpg", "/img2.jpg", "/Hero/KKEC1.jpg", "/Hero/KKEC2.jpg"];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex((i) => (i + 1) % HERO_IMAGES.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="arch-frame mx-auto w-full max-w-md">
      <div className="arch relative h-[26rem] w-full md:h-[30rem]">
        {HERO_IMAGES.map((image, index) => (
          <div key={image} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}>
            <img src={image} alt={`Kannada Koota Event ${index + 1}`} className="ken-burns h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pb-14 text-white">
              <p className="text-sm">Kannada Koota Event {index + 1}</p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex ? "w-7 bg-[#ffcc00]" : "w-2 bg-white/60"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TempleBell() {
  const [ringing, setRinging] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        ringBell();
        setRinging(false);
        requestAnimationFrame(() => setRinging(true));
      }}
      onAnimationEnd={() => setRinging(false)}
      className={`bell-swing absolute right-[6%] top-0 z-20 hidden md:block ${ringing ? "ringing" : ""}`}
      aria-label="Ring the temple bell"
      data-cursor="zari"
    >
      <span className="mx-auto block h-24 w-[2px] bg-gradient-to-b from-transparent to-[#d9a63a]" />
      <Bell className="h-28 w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
    </button>
  );
}

function Hero() {
  const [sky] = useState(skyNow);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const scrollY = progress * 300;

  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  const dark = sky === "night" || sky === "dusk";

  return (
    <section
      ref={ref}
      className={`sky-${sky} relative flex min-h-[100svh] items-center overflow-hidden pt-28`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reducedMotion()) return;
        setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
      }}
      data-cursor="mallige"
    >
      {dark && <div className="stars-field" />}
      {/* sun / moon */}
      <div
        className={`absolute right-[22%] top-[16%] h-32 w-32 rounded-full ${dark ? "bg-[#f3efe1] shadow-[0_0_80px_20px_rgba(255,255,255,.25)]" : "bg-[#ffe7a8] shadow-[0_0_120px_40px_rgba(255,214,140,.6)]"}`}
        style={{ transform: `translate(${mouse.x * -20}px, ${scrollY * 0.4}px)` }}
      />
      {/* state bird flying past */}
      {[{ top: "18%", dur: "30s", delay: "0s", s: 1 }, { top: "26%", dur: "36s", delay: "-12s", s: 0.7 }, { top: "12%", dur: "42s", delay: "-25s", s: 0.55 }].map((b, i) => (
        <span key={i} className="bird" style={{ top: b.top, ["--dur" as string]: b.dur, ["--delay" as string]: b.delay, ["--s" as string]: b.s }}>
          <Roller className="h-full w-full" />
        </span>
      ))}
      {/* falling jasmine */}
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="petal" style={{ left: `${(i * 97) % 100}%`, ["--d" as string]: `${i * -1.3}s`, ["--t" as string]: `${10 + (i % 4) * 2}s`, ["--x" as string]: `${(i % 2 ? 1 : -1) * 70}px` }}>
          <svg viewBox="0 0 20 20" className="h-3 w-3" aria-hidden="true">
            {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="10" cy="5" rx="2.6" ry="5" fill="#fffdf2" transform={`rotate(${a} 10 10)`} />)}
          </svg>
        </span>
      ))}

      {/* Western Ghats, layered parallax */}
      {[
        { c: dark ? "#2a1d4a" : "#7aa0a8", d: "M0 160 C 180 80 320 190 520 110 C 720 30 900 170 1100 90 C 1260 30 1380 100 1440 80 V320 H0Z", k: 0.3, h: "62%" },
        { c: dark ? "#1f163a" : "#4f7f6a", d: "M0 200 C 220 120 420 240 640 160 C 860 80 1060 220 1260 150 C 1360 120 1420 140 1440 130 V320 H0Z", k: 0.55, h: "48%" },
        { c: dark ? "#150f26" : "#1f4d2b", d: "M0 250 C 260 190 520 290 780 230 C 1040 170 1260 270 1440 220 V320 H0Z", k: 0.85, h: "34%" },
      ].map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute inset-x-[-4%] bottom-0 w-[108%]"
          style={{ height: l.h, transform: `translate(${mouse.x * -30 * l.k}px, ${scrollY * l.k * 0.35}px)` }}
          aria-hidden="true"
        >
          <path d={l.d} fill={l.c} />
        </svg>
      ))}
      <div className="mist" style={{ bottom: "26%" }} />

      <Gandaberunda className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" stroke="#fff" />
      <TempleBell />
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <IconLauncher size="h-24 w-24 md:h-28 md:w-28" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="f-serif text-5xl font-bold leading-[1.2] md:text-7xl">
              <Letters text="ಕನ್ನಡ ಕೂಟ EC PES" glyphClassName="flag-text" className="drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]" step={70} />
            </h1>
            <Reveal delay={900}>
              <p className={`mx-auto mt-4 max-w-xl text-xl lg:mx-0 ${dark ? "text-[#fbf3e2]/90" : "text-[#1a0a06]/85"}`}>
                Celebrating Kannada culture, language, and traditions at PES University Electronic City Campus
              </p>
            </Reveal>
            <Reveal delay={1100}>
              <p className={`f-serif mx-auto max-w-xl text-sm lg:mx-0 ${dark ? "text-[#f6dc8c]" : "text-[#4a0d1e]"}`}>ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಭಾಷೆಯ ಸಂರಕ್ಷಣೆಗಾಗಿ ನಮ್ಮ ಪ್ರಯತ್ನ</p>
            </Reveal>
          </div>

          <Reveal delay={1300}>
            <Magnetic>
              <button type="button" onClick={scrollToAbout} className="btn-silk text-lg">
                Learn More About Us
                <ChevronDown className="h-5 w-5" />
              </button>
            </Magnetic>
          </Reveal>

          <Reveal delay={1500}>
            <div className={`grid grid-cols-3 gap-6 border-t pt-8 ${dark ? "border-white/20" : "border-black/15"}`}>
              {[
                ["160+", "Active Members"],
                ["5+", "Events"],
                ["3", "Years Active"],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className={`f-display text-3xl font-bold md:text-4xl ${dark ? "text-[#ffcc00]" : "text-[#4a0d1e]"}`}>
                    <CountUp value={v} />
                  </div>
                  <div className={`text-sm ${dark ? "text-[#fbf3e2]/75" : "text-[#1a0a06]/70"}`}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal variant="focus" delay={400}>
          <HeroCarousel />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- original home gallery ---------- */
const SLIDES = ["/img1.jpg", "/img3.jpg"];

function Gallery() {
  const [current, setCurrent] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const go = (dir: 1 | -1) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrent((p) => (p + dir + SLIDES.length) % SLIDES.length);
      setFadeIn(true);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => go(1), 3500);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section className="relative bg-[#22060f] py-20" data-cursor="zari">
      <div className="zari absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal variant="wipe">
          <div className="relative h-[450px] overflow-hidden rounded-[32px] border border-[#f6dc8c]/30 bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
            <img
              src={SLIDES[current]}
              alt="Homepage gallery"
              className={`h-full w-full object-cover transition-all duration-500 ease-in-out ${fadeIn ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
            />
            <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-xl text-white backdrop-blur hover:bg-black/80" aria-label="Previous slide">
              ‹
            </button>
            <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-xl text-white backdrop-blur hover:bg-black/80" aria-label="Next slide">
              ›
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- original About section ---------- */
const STAR = Array.from({ length: 32 })
  .map((_, i) => {
    const r = i % 2 ? 46 : 50;
    const a = (i / 32) * Math.PI * 2;
    return `${50 + r * Math.cos(a)}% ${50 + r * Math.sin(a)}%`;
  })
  .join(",");

function About() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, progress } = useScrollProgress<HTMLElement>();

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-[linear-gradient(180deg,#22060f,#3a0a17_60%,#22060f)] py-28" data-cursor="zari">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Hoysala star-platform frame */}
          <Reveal variant="scale" className="relative">
            <div className="relative mx-auto aspect-square max-w-[520px]">
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#d9a63a,#f6dc8c,#d9a63a,#8a5a14,#d9a63a)]" style={{ clipPath: `polygon(${STAR})`, transform: `rotate(${progress * 40}deg)` }} />
              <div className="absolute inset-[14px] overflow-hidden" style={{ clipPath: `polygon(${STAR})`, transform: `rotate(${progress * 40}deg)` }}>
                <img
                  src="/Hero/TM 2.JPG"
                  alt="Kannada Koota club members in traditional attire"
                  className="h-full w-full object-cover"
                  style={{ transform: `rotate(${-progress * 40}deg) scale(1.25)` }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-[16%] text-center text-white">
                <h3 className="f-serif text-xl font-bold">ನಮ್ಮ ಸಮುದಾಯ</h3>
                <p className="text-sm opacity-90">Our Community</p>
              </div>

              <div className="glass float absolute -right-2 top-6 flex items-center gap-2 p-4" style={{ ["--d" as string]: "-2s" }}>
                <Users className="h-5 w-5 text-[#ffcc00]" />
                <div>
                  <div className="text-lg font-bold"><CountUp value="160+" /></div>
                  <div className="text-xs text-[#fbf3e2]/70">Members</div>
                </div>
              </div>
              <div className="glass float absolute -left-2 bottom-6 flex items-center gap-2 p-4">
                <Calendar className="h-5 w-5 text-[#ffcc00]" />
                <div>
                  <div className="text-lg font-bold"><CountUp value="5+" /></div>
                  <div className="text-xs text-[#fbf3e2]/70">Events/Year</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <h2 className="f-display text-5xl font-semibold">
                About <span className="f-serif gold-foil">ಕನ್ನಡ ಕೂಟ</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#fbf3e2]/85">
                Kannada Koota EC PES is a vibrant cultural club dedicated to preserving and promoting the rich heritage of Karnataka. We bring together students who share a passion for Kannada language, literature, arts, and traditions.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={100} className="glass flex items-center gap-3 p-4">
                <Heart className="h-5 w-5 flex-shrink-0 text-[#d6262b]" />
                <div>
                  <div className="text-sm font-semibold">Cultural Events</div>
                  <div className="text-xs text-[#fbf3e2]/70">Regular celebrations</div>
                </div>
              </Reveal>
              <Reveal delay={200} className="glass flex items-center gap-3 p-4">
                <Award className="h-5 w-5 flex-shrink-0 text-[#ffcc00]" />
                <div>
                  <div className="text-sm font-semibold">Workshops</div>
                  <div className="text-xs text-[#fbf3e2]/70">Skill development</div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={250}>
              <p className="leading-relaxed text-[#fbf3e2]/80">
                Our club serves as a bridge between tradition and modernity, organizing cultural festivals, poetry workshops, traditional cooking sessions, and community outreach programs. We believe in creating an inclusive environment where everyone can learn and appreciate the beauty of Kannada culture.
              </p>
            </Reveal>

            <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="space-y-4 pt-2">
                  <h3 className="f-display text-2xl font-semibold text-[#f6dc8c]">Our Mission</h3>
                  <p className="leading-relaxed text-[#fbf3e2]/80">
                    To create a platform where students can connect with their cultural roots while building lasting friendships and memories. We aim to showcase the diversity and richness of Karnataka's cultural landscape through authentic experiences and meaningful engagement.
                  </p>
                  <h3 className="f-display text-2xl font-semibold text-[#f6dc8c]">What We Do</h3>
                  <ul className="space-y-2 text-[#fbf3e2]/80">
                    {[
                      "Organize traditional festivals like Kannada Rajyotsava and Mysore Dasara",
                      "Conduct poetry and literature workshops in Kannada",
                      "Host traditional cooking and crafts sessions",
                      "Arrange cultural performances and music concerts",
                      "Build community partnerships and outreach programs",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rotate-45 bg-[#ffcc00]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-2xl border border-[#f6dc8c]/30 bg-[#f6dc8c]/10 p-5 text-center">
                    <p className="f-serif font-medium text-[#fbf3e2]">"ಕನ್ನಡ ನಾಡು ನುಡಿ ಬೆಳದಿಂಗ್ಳಾಗಿ ಬೆಳೆಯಲಿ"</p>
                    <p className="mt-1 text-sm text-[#fbf3e2]/70">"May the Kannada land and language flourish like the bright moon"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button type="button" onClick={() => setIsExpanded((v) => !v)} className="btn-line" aria-expanded={isExpanded}>
                <span>{isExpanded ? "Show Less" : "Read More"}</span>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              <Magnetic>
                <Link to="/team" className="btn-silk">Meet Our Team</Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Karnataka sections (visual + names) ---------- */
function Band({ children, className = "", cursor }: { children: ReactNode; className?: string; cursor?: string }) {
  return (
    <section className={`relative overflow-hidden py-24 md:py-32 ${className}`} data-cursor={cursor}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <RepublicDayPopup />
      <Hero />
      <Gallery />
      <About />

      <div className="ilkal-edge" />
      <Band className="bg-[radial-gradient(circle_at_50%_30%,#3a0a17,#12030a_70%)]" cursor="compass">
        <NameHeading kn="ಕರುನಾಡು" en="Karnataka" />
        <KarnatakaMap />
      </Band>

      <Panorama />

      <Band className="bg-[#12030a]">
        <NameHeading kn="ನಾಡಿನ ಲಾಂಛನಗಳು" en="State Symbols" />
        <StateSymbols />
      </Band>

      <div className="zari--pink zari" />
      <Band className="bg-[linear-gradient(180deg,#22060f,#4a0d1e)]">
        <NameHeading kn="ಕಲೆ ಮತ್ತು ಕರಕುಶಲ" en="Arts & Crafts" />
        <ArtsGallery />
      </Band>

      <Band className="bg-[#14060c]" cursor="ink">
        <NameHeading kn="ಕನ್ನಡ ವರ್ಣಮಾಲೆ" en="The Kannada Alphabet" />
        <AksharaWall />
      </Band>

      <Band className="bg-[linear-gradient(180deg,#14060c,#2a1406)]" cursor="ink">
        <NameHeading kn="ಸಾಹಿತ್ಯ" en="Literature" />
        <Literature />
      </Band>

      <Band className="bg-[radial-gradient(circle_at_30%_50%,#3a1606,#12030a_70%)]" cursor="zari">
        <NameHeading kn="ಸಂಗೀತ" en="Music" />
        <Veena />
      </Band>

      <div className="kasuti-line" />
      <Band className="bg-[#12030a]" cursor="kumkuma">
        <NameHeading kn="ಹಬ್ಬಗಳು" en="Festivals" />
        <FestivalWheel />
      </Band>

      <Band className="bg-[linear-gradient(180deg,#12030a,#1f4d2b_140%)]" cursor="mallige">
        <NameHeading kn="ಬಾಳೆ ಎಲೆ ಊಟ" en="A Meal on a Banana Leaf" />
        <BananaLeafMeal />
      </Band>

      <Band className="bg-[linear-gradient(180deg,#1a140e,#12030a)]" cursor="zari">
        <NameHeading kn="ಇತಿಹಾಸ" en="History" />
        <HeroStones />
      </Band>

      <Band className="bg-[radial-gradient(circle_at_50%_40%,#4a0d1e,#12030a_70%)]" cursor="zari">
        <NadaGeethe />
      </Band>
    </div>
  );
}
