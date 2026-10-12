import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Calendar, ChevronDown, ChevronUp, Heart, Users } from "lucide-react";
import RepublicDayPopup from "@/features/home/components/RepublicDayPopup";
import { CountUp, Letters, Magnetic, Reveal } from "@/features/karunadu/components/Motion";
import { Bell, Gandaberunda } from "@/features/karunadu/components/Motifs";
import ScrollBackdrop from "@/features/karunadu/components/ScrollBackdrop";
import IconLauncher from "@/features/karunadu/components/IconLauncher";
import { ringBell } from "@/features/karunadu/audio";
import { reducedMotion, useScrollProgress } from "@/features/karunadu/hooks";

/* ---------- real Karnataka behind the hero ---------- */
const HERO_PLACES = [
  { id: "hampi", kn: "ಹಂಪಿ", en: "Hampi" },
  { id: "mysuru-palace", kn: "ಮೈಸೂರು ಅರಮನೆ", en: "Mysuru Palace" },
  { id: "jog-falls", kn: "ಜೋಗ ಜಲಪಾತ", en: "Jog Falls" },
  { id: "udupi-coast", kn: "ಕರಾವಳಿ", en: "Karavali" },
  { id: "gol-gumbaz", kn: "ಗೋಲ್ ಗುಂಬಜ್", en: "Gol Gumbaz" },
  { id: "coorg", kn: "ಕೊಡಗು", en: "Kodagu" },
  { id: "badami", kn: "ಬಾದಾಮಿ", en: "Badami" },
  { id: "vidhana-soudha", kn: "ವಿಧಾನ ಸೌಧ", en: "Vidhana Soudha" },
];

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
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (reducedMotion()) return;
    const t = setInterval(() => setSlide((i) => (i + 1) % HERO_PLACES.length), 6500);
    return () => clearInterval(t);
  }, []);

  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  const place = HERO_PLACES[slide];

  return (
    <section
      className="letterbox relative flex min-h-[100svh] items-center overflow-hidden bg-[#050203] pt-28"
      data-cursor="mallige"
      data-tone="#12030a,#4a0d1e"
    >
      {/* photographs, cross-fading; they stay still behind the text */}
      <div className="absolute inset-0">
        {HERO_PLACES.map((p, i) => (
          <div key={p.id} className={`hero-slide ${i === slide ? "on" : ""}`}>
            <img src={`/karnataka/photos/${p.id}.jpg`} alt="" loading={i < 2 ? "eager" : "lazy"} />
          </div>
        ))}
      </div>
      {/* cinematic grade: deep silk shadows, warm highlights */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,3,6,.92)_0%,rgba(18,3,10,.7)_42%,rgba(18,3,10,.35)_70%,rgba(10,3,6,.6)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#12030a_0%,transparent_30%,transparent_75%,rgba(5,2,3,.75)_100%)]" />
      <div className="pano-glow" />

      {/* falling jasmine */}
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="petal" style={{ left: `${(i * 97) % 100}%`, ["--d" as string]: `${i * -1.3}s`, ["--t" as string]: `${10 + (i % 4) * 2}s`, ["--x" as string]: `${(i % 2 ? 1 : -1) * 70}px` }}>
          <svg viewBox="0 0 20 20" className="h-3 w-3" aria-hidden="true">
            {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="10" cy="5" rx="2.6" ry="5" fill="#fffdf2" transform={`rotate(${a} 10 10)`} />)}
          </svg>
        </span>
      ))}

      <Gandaberunda className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" stroke="#fff" />
      <TempleBell />
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <IconLauncher size="h-24 w-24 md:h-28 md:w-28" />
      </div>

      {/* which place you are looking at */}
      <div className="absolute bottom-10 left-6 z-20 hidden items-end gap-4 md:flex lg:left-10">
        <span className="f-display text-5xl font-light tabular-nums text-[#f6dc8c]/80">{String(slide + 1).padStart(2, "0")}</span>
        <div key={place.id} className="hero-caption pb-1" style={{ animation: "kd-card-in .9s cubic-bezier(.16,1,.3,1)" }}>
          <p className="f-serif text-lg font-semibold text-white">{place.kn}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{place.en}</p>
        </div>
      </div>
      <div className="absolute bottom-12 right-6 z-20 hidden gap-1.5 md:flex lg:right-10">
        {HERO_PLACES.map((p, i) => (
          <button key={p.id} type="button" onClick={() => setSlide(i)} aria-label={`Show ${p.en}`} className="group relative h-[3px] w-8 overflow-hidden rounded-full bg-white/25">
            <span className={`absolute inset-y-0 left-0 bg-[#ffcc00] ${i === slide ? "w-full transition-[width] duration-[6500ms] ease-linear" : i < slide ? "w-full" : "w-0"}`} />
          </button>
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="f-serif text-5xl font-bold leading-[1.2] md:text-7xl">
              <Letters text="ಕನ್ನಡ ಕೂಟ EC PES" glyphClassName="flag-text" className="drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]" step={70} />
            </h1>
            <Reveal delay={900}>
              <p className="mx-auto mt-4 max-w-xl text-xl text-[#fbf3e2]/90 lg:mx-0">
                Celebrating Kannada culture, language, and traditions at PES University Electronic City Campus
              </p>
            </Reveal>
            <Reveal delay={1100}>
              <p className="f-serif mx-auto max-w-xl text-sm text-[#f6dc8c] lg:mx-0">ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಭಾಷೆಯ ಸಂರಕ್ಷಣೆಗಾಗಿ ನಮ್ಮ ಪ್ರಯತ್ನ</p>
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
            <div className="grid grid-cols-3 gap-6 border-t border-white/20 pt-8">
              {[
                ["160+", "Active Members"],
                ["5+", "Events"],
                ["3", "Years Active"],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="f-display text-3xl font-bold text-[#ffcc00] md:text-4xl">
                    <CountUp value={v} />
                  </div>
                  <div className="text-sm text-[#fbf3e2]/75">{l}</div>
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
    <section className="relative py-20" data-cursor="zari" data-tone="#1a050c,#4a0d1e">
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
    <section id="about" ref={ref} className="relative overflow-hidden py-28" data-cursor="zari" data-tone="#22060f,#6b1a2e">
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

export default function HomePage() {
  return (
    <div className="relative isolate">
      <ScrollBackdrop />
      <RepublicDayPopup />
      <Hero />
      <Gallery />
      <About />
    </div>
  );
}
