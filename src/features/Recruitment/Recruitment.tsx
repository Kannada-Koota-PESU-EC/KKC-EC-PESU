import { useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

const domains = [
  ["💻","ಐಟಿ / IT","Build and manage the digital side of Kannada Koota through technology."],
  ["🎪","ಈವೆಂಟ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ / Event Management","Turn ideas into well-planned, engaging events from start to finish."],
  ["📦","ಲಾಜಿಸ್ಟಿಕ್ಸ್ / Logistics","Keep everything moving smoothly, from planning to execution."],
  ["🎭","ಸಾಂಸ್ಕೃತಿಕ / Culturals","Bring creativity, tradition and celebration together through cultural activities."],
  ["🎨","ವಿನ್ಯಾಸ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪಾದನೆ / Design and Video Editing","Create the visuals and videos that give Kannada Koota its identity."],
  ["🤝","ಅತಿಥಿ ಸತ್ಕಾರ / Hospitality","Make guests, participants and teams feel welcomed and taken care of."],
  ["📣","ಮಾರ್ಕೆಟಿಂಗ್ / Social Media & Marketing","Take our events and initiatives to the right audience through creative promotion."],
  ["📸","ಛಾಯಾಗ್ರಹಣ / Photography","Capture the moments, people and energy that make every event memorable."],
  ["🎶","ಸಾಂಸ್ಕೃತಿಕ-ಇಂಚರ / Culturals-INCHARA","Be part of Inchara through singing, musical performances and cultural expression."],
  ["✍️","ವಿಷಯ ಬರವಣಿಗೆ / Content Writing","Turn ideas into engaging stories, captions, posts and communication."],
  ["⚙️","ಕಾರ್ಯಾಚರಣೆಗಳು / Operations","Coordinate the behind-the-scenes work that keeps everything running."],
  ["🗣️","ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕಗಳು / Public Relations","Build connections and communicate Kannada Koota's presence beyond the team."],
  ["💼","ಪ್ರಾಯೋಜಕತ್ವ / Sponsorship","Connect with brands and organisations to build meaningful partnerships."]
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
    registerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#210708] text-[#f7ead8]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#8d5317]/30">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(190,90,20,0.16),transparent_35%),radial-gradient(circle_at_15%_60%,rgba(130,20,30,0.22),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(206,140,25,0.10),transparent_30%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a8691d]/20 md:h-[760px] md:w-[760px]" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 md:py-24 lg:px-8">
          <p className="mb-7 text-xs uppercase tracking-[0.18em] text-[#f2b52d] md:text-sm">
            ನೇಮಕಾತಿ 2026 / Recruitment 2026
          </p>
          <p className="kannada-text text-xl font-medium leading-tight text-[#f3c257] md:text-3xl">
            ಹೊಸ ಪ್ರತಿಭೆಗಳ ಹುಡುಕಾಟ
          </p>
          <p className="kannada-text mt-6 text-xl font-medium leading-tight text-[#f3c257] md:text-3xl">
            ಕನ್ನಡ ಕೂಟದ ಒಂದು ಭಾಗವಾಗಿ
          </p>
          <p className="mt-1 text-sm text-[#d8b36b] md:text-base">Become a Part of Our Team</p>
          <p className="mx-auto mt-6 max-w-2xl px-2 text-sm leading-relaxed text-[#cdb8a7] md:text-base">
            ನಿಮ್ಮ ಆಲೋಚನೆಗಳು. ನಿಮ್ಮ ಸೃಜನಶೀಲತೆ. ನಿಮ್ಮದೇ ಆದ ಛಾಪು ಮೂಡಿಸಲು ನಿಮ್ಮ ವೇದಿಕೆ.
            <br />
            Your ideas. Your creativity. Your space to make an impact.
          </p>
          <button onClick={scrollToRegister} className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffc329] to-[#f05a22] px-6 py-3 text-sm font-semibold text-[#250607] transition hover:scale-[1.02]">
            ಅರ್ಜಿ ಸಲ್ಲಿಸಿ / Apply Now
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <p className="mx-auto mt-8 w-full max-w-2xl break-words px-2 text-sm leading-relaxed text-[#cdb8a7] md:text-base">
            Find your space, meet your people and help create something that stays with you long after the event ends.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-y border-[#8d5317]/30 bg-[#2a0909]/70 py-3">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-7 gap-y-2 px-5 text-[10px] uppercase tracking-[0.18em] text-[#bda99a]">
          <span> CREATE <span className="ml-2 text-[#f2b52d]">✦</span></span>
          <span> COLLABORATE <span className="ml-2 text-[#f2b52d]">✦</span></span>
          <span> LEARN <span className="ml-2 text-[#f2b52d]">✦</span></span>
        </div>
      </div>

      {/* Domains */}
      <section id="domains" className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-7 text-center">
            <p className="kannada-text text-xl font-semibold text-[#f0c26a] md:text-2xl">
              ನಿಮಗೆ ಸರಿಹೊಂದುವ ಕ್ಷೇತ್ರವನ್ನು ಕಂಡುಕೊಳ್ಳಿ
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#fff1df] md:text-4xl">
              Explore Domains
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setDomainsOpen((open) => !open)}
            aria-expanded={domainsOpen}
            className="mx-auto flex w-full max-w-4xl items-center justify-between rounded-lg border border-[#9b651e]/40 bg-[#32100f]/70 px-5 py-4 text-sm font-medium text-[#f6e7d5] transition hover:border-[#d79a2e]/70"
          >
            <span>{domainsOpen ? "Hide Domains" : "View All Domains"}</span>
            <Plus className={`h-5 w-5 text-[#f2b52d] transition-transform duration-300 ${domainsOpen ? "rotate-45" : ""}`} />
          </button>
          {domainsOpen && (
            <div className="mx-auto mt-4 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {domains.map(([emoji, name, description], index) => (
                <article
                  key={name}
                  className={`rounded-xl border border-[#9b651e]/30 bg-[#32100f]/60 p-4 transition hover:border-[#d79a2e]/50 hover:bg-[#421512]/80 ${
                    index === domains.length - 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{emoji}</span>
                    <span className="text-[10px] tracking-widest text-[#e4a92c]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="kannada-text mt-4 text-sm font-semibold leading-snug text-[#fff0dc] md:text-base">{name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#cbb8aa]">{description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="border-t border-[#8d5317]/30 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="kannada-text text-xl font-semibold text-[#f0c26a] md:text-2xl">ನಮ್ಮ ತಂಡವನ್ನು ಏಕೆ ಸೇರಬೇಕು?</p>
          <p className="mt-1 text-sm text-[#cdb8a7]">Why should you join our team?</p>
          <h2 className="mt-4 text-3xl font-bold text-[#fff1df] md:text-4xl">Why Join Us?</h2>
          <div className="mt-8 border-y border-[#9b651e]/30">
            {reasons.map((reason, index) => (
              <div key={reason} className="flex items-center justify-center gap-4 border-b border-[#9b651e]/25 py-4 last:border-b-0">
                <span className="w-6 text-[11px] font-medium text-[#e4a92c]">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm font-medium text-[#f2e4d5] md:text-base">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={registerRef} id="register" className="border-t border-[#8d5317]/30 py-20 text-center md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <p className="kannada-text text-xl font-semibold text-[#f0c26a] md:text-2xl">ಮುಂದಿನ ಹೆಜ್ಜೆ ನಿಮ್ಮದು</p>
          <p className="mt-1 text-sm text-[#cdb8a7]">The Next Step Is Yours</p>
          <p className="mt-4 text-sm leading-relaxed text-[#cbb8aa]">
            ನಿಮ್ಮ ನೋಂದಣಿಯನ್ನು Google Form ಮೂಲಕ ಪೂರ್ಣಗೊಳಿಸಿ.
            <br />
            Complete your registration through the Google Form.
          </p>
          <a
            href="https://forms.gle/1Ejkg7UAniHSm3fB9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffc329] to-[#f05a22] px-6 py-3 text-sm font-semibold text-[#250607] transition hover:scale-[1.02]"
          >
            ಅರ್ಜಿ ಸಲ್ಲಿಸಿ / Apply Now
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#8d5317]/30 bg-[#1a0607]/70 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-xs text-[#a99383] sm:flex-row sm:px-6 lg:px-8">
          <span>© 2026 Kannada Koota EC</span>
          <span className="kannada-text">ಕನ್ನಡ ಕೂಟ · PES University EC Campus</span>
        </div>
      </footer>
    </div>
  );
}
