import { useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

const domains = [
  ["💻", "ಐಟಿ / IT", "Build and manage the digital side of Kannada Koota through technology."],
  ["🎪", "ಈವೆಂಟ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ / Event Management", "Turn ideas into well-planned, engaging events from start to finish."],
  ["📦", "ಲಾಜಿಸ್ಟಿಕ್ಸ್ / Logistics", "Keep everything moving smoothly, from planning to execution."],
  ["🎭", "ಸಾಂಸ್ಕೃತಿಕ / Culturals", "Bring creativity, tradition and celebration together through cultural activities."],
  ["🎨", "ವಿನ್ಯಾಸ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪಾದನೆ / Design and Video Editing", "Create the visuals and videos that give Kannada Koota its identity."],
  ["🤝", "ಅತಿಥಿ ಸತ್ಕಾರ / Hospitality", "Make guests, participants and teams feel welcomed and taken care of."],
  ["📣", "ಮಾರ್ಕೆಟಿಂಗ್ / Marketing", "Take our events and initiatives to the right audience through creative promotion."],
  ["📸", "ಛಾಯಾಗ್ರಹಣ / Photography", "Capture the moments, people and energy that make every event memorable."],
  ["🎶", "ಸಾಂಸ್ಕೃತಿಕ-ಇಂಚರ / Culturals-INCHARA", "Contribute to Inchara through performances, cultural expression and creative initiatives."],
  ["✍️", "ವಿಷಯ ಬರವಣಿಗೆ / Content Writing", "Turn ideas into engaging stories, captions, posts and communication."],
  ["⚙️", "ಕಾರ್ಯಾಚರಣೆಗಳು / Operations", "Coordinate the behind-the-scenes work that keeps everything running."],
  ["🗣️", "ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕಗಳು / Public Relations", "Build connections and communicate Kannada Koota's presence beyond the team."],
  ["💼", "ಪ್ರಾಯೋಜಕತ್ವ / Sponsorship", "Connect with brands and organisations to build meaningful partnerships."]
];

const reasons = [
  "Learn by doing",
  "Speak Kannada. Celebrate culture.",
  "Create unforgettable experiences",
  "Be part of something beyond the classroom"
];

export default function Recruitment() {
  const registerRef = useRef<HTMLDivElement>(null);
  const [domainsOpen, setDomainsOpen] = useState(false);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };

  return (
    <div className="min-h-screen text-foreground bg-gradient-to-br from-[#3A0909] via-[#681914] to-[#7A5208]">
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,215,0,0.18),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(220,30,30,0.18),transparent_30%)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
            
            <div>
              <p className="text-yellow-300 text-xs tracking-[0.2em] uppercase font-semibold mb-5">
                Kannada Koota EC · Recruitment 2026
              </p>

              <p className="kannada-text text-lg md:text-2xl font-medium leading-tight mb-4 whitespace-nowrap">
                ಹೊಸ ಪ್ರತಿಭೆಗಳ ಹುಡುಕಾಟ <span className="text-yellow-300/70">•</span> ಕನ್ನಡ ಕೂಟದ ಒಂದು ಭಾಗವಾಗಿ
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight capitalize">
                Become a part of our team
              </h1>

              <p className="mt-4 text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
                Your ideas. Your creativity. Your space to make an impact.
              </p>

              <button
                onClick={scrollToRegister}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-yellow-300 text-red-950 px-5 py-3 text-sm font-semibold hover:bg-yellow-200 transition-all hover:-translate-y-0.5"
              >
                ಅರ್ಜಿ ಸಲ್ಲಿಸಿ / Apply Now
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="lg:border-l border-white/20 lg:pl-8">
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md">
                Find your space, meet your people and help create something that stays with you long after the event ends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-y border-white/15 py-3 bg-black/10">
        <div className="max-w-6xl mx-auto px-5 flex justify-center gap-7 text-[11px] tracking-[0.2em] text-white/60 uppercase">
          <span>CREATE <span className="text-yellow-300 ml-2">✦</span></span>
          <span>COLLABORATE <span className="text-yellow-300 ml-2">✦</span></span>
          <span>LEARN <span className="text-yellow-300 ml-2">✦</span></span>
        </div>
      </div>

      {/* Domains */}
      <section id="domains" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-7">
            <p className="kannada-text text-xl md:text-2xl font-semibold leading-tight mb-1">
              ನಿಮಗೆ ಸರಿಹೊಂದುವ ಕ್ಷೇತ್ರವನ್ನು ಕಂಡುಕೊಳ್ಳಿ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Explore Domains
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setDomainsOpen((open) => !open)}
            aria-expanded={domainsOpen}
            className="w-full flex items-center justify-between rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm px-5 py-4 text-sm font-medium hover:border-yellow-300/60 hover:bg-white/15 transition"
          >
            <span>{domainsOpen ? "Hide Domains" : "View All Domains"}</span>
            <Plus className={`h-5 w-5 text-yellow-300 transition-transform duration-300 ${domainsOpen ? "rotate-45" : ""}`} />
          </button>

          {domainsOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {domains.map(([emoji, name, description], index) => (
                <article
                  key={name}
                  className={`rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 md:p-5 hover:bg-white/15 hover:border-yellow-300/50 hover:-translate-y-1 transition-all ${
                    index === domains.length - 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="text-2xl mb-3">{emoji}</div>
                  <p className="text-[10px] text-yellow-300 tracking-widest mb-2">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="kannada-text text-sm md:text-base font-semibold leading-snug mb-2">
                    {name}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 md:py-20 border-t border-white/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-7">
            <p className="kannada-text text-xl md:text-2xl font-semibold leading-tight mb-1">
              ನಮ್ಮ ತಂಡವನ್ನು ಏಕೆ ಸೇರಬೇಕು?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Why Join Us?
            </h2>
          </div>

          <div className="max-w-3xl border-y border-white/15">
            {reasons.map((reason, index) => (
              <div
                key={reason}
                className="flex items-center gap-5 py-4 border-b last:border-b-0 border-white/15"
              >
                <span className="text-xs text-yellow-300 font-medium w-6">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base font-medium text-white/90">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={registerRef}
        id="register"
        className="py-20 md:py-24 text-center border-t border-white/15"
      >
        <div className="max-w-3xl mx-auto px-5">
          <p className="kannada-text text-xl md:text-2xl font-semibold leading-tight mb-2">
            ಮುಂದಿನ ಹೆಜ್ಜೆ ನಿಮ್ಮದು
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            The Next Step Is Yours.
          </h2>

          <p className="mt-4 text-sm text-white/65 leading-relaxed">
            ನಿಮ್ಮ ನೋಂದಣಿಯನ್ನು Google Form ಮೂಲಕ ಪೂರ್ಣಗೊಳಿಸಿ.
            <br />
            Complete your registration through the Google Form.
          </p>

          <a
            href="https://forms.gle/1Ejkg7UAniHSm3fB9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-yellow-300 text-red-950 px-6 py-3 text-sm font-semibold hover:bg-yellow-200 transition-all hover:-translate-y-0.5"
          >
            ಅರ್ಜಿ ಸಲ್ಲಿಸಿ / Apply Now
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/15 py-5 bg-black/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/50">
          <span>© 2026 Kannada Koota EC</span>
          <span className="kannada-text">ಕನ್ನಡ ಕೂಟ · PES University EC Campus</span>
        </div>
      </footer>
    </div>
  );
}
