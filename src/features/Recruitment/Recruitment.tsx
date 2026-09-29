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
    registerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-[#210708] text-[#f7ead8] overflow-x-hidden">
      <section className="relative overflow-hidden border-b border-[#8d5317]/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(190,90,20,0.16),transparent_35%),radial-gradient(circle_at_15%_60%,rgba(130,20,30,0.22),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(206,140,25,0.10),transparent_30%)] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[760px] md:h-[760px] rounded-full border border-[#a8691d]/20 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-[#a8691d]/15 rotate-12 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
          <p className="inline-block border border-[#c88a22] rounded-full px-5 py-2 text-[10px] md:text-xs tracking-[0.22em] text-[#f2b52d] uppercase mb-7">
            Recruitments · Phase 2
          </p>
          <p className="kannada-text text-xl md:text-3xl font-medium leading-tight text-[#f3c257]">
            ಹೊಸ ಪ್ರತಿಭೆಗಳ ಹುಡುಕಾಟ
          </p>
          <p className="kannada-text text-xl md:text-3xl font-medium leading-tight mt-2 text-[#f3c257]">
            ಕನ್ನಡ ಕೂಟದ ಒಂದು ಭಾಗವಾಗಿ
          </p>
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#fff1df]">
            Become a part of our team
          </h1>
          <p className="mt-4 text-sm md:text-base text-[#d8c2ad] leading-relaxed max-w-2xl mx-auto">
            Your ideas. Your creativity. Your space to make an impact.
          </p>
          <button
            onClick={scrollToRegister}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffc329] to-[#f05a22] text-[#250607] px-6 py-3 text-sm font-semibold hover:scale-[1.02] transition"
          >
            ಅರ್ಜಿ ಸಲ್ಲಿಸಿ / Apply Now
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <p className="mt-8 mx-auto w-full max-w-2xl px-2 text-sm md:text-base text-[#cdb8a7] leading-relaxed break-words">
            Find your space, meet your people and help create something that stays with you long after the event ends.
          </p>
        </div>
      </section>

      <div className="border-y border-[#8d5317]/30 py-3 bg-[#2a0909]/70">
        <div className="max-w-5xl mx-auto px-5 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[10px] tracking-[0.18em] text-[#bda99a] uppercase">
          <span>CREATE <span className="text-[#f2b52d] ml-2">✦</span></span>
          <span>COLLABORATE <span className="text-[#f2b52d] ml-2">✦</span></span>
          <span>LEARN <span className="text-[#f2b52d] ml-2">✦</span></span>
        </div>
      </div>

      <section id="domains" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <p className="kannada-text text-xl md:text-2xl font-semibold text-[#f0c26a]">
              ನಿಮಗೆ ಸರಿಹೊಂದುವ ಕ್ಷೇತ್ರವನ್ನು ಕಂಡುಕೊಳ್ಳಿ
            </p>
            <h2 className="mt-1 text-3xl md:text-4xl font-bold text-[#fff1df]">
              Explore Domains
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setDomainsOpen((open) => !open)}
            aria-expanded={domainsOpen}
            className="w-full max-w-4xl mx-auto flex items-center justify-between rounded-lg border border-[#9b651e]/40 bg-[#32100f]/70 px-5 py-4 text-sm font-medium text-[#f6e7d5] hover:border-[#d79a2e]/70 transition"
          >
            <span>{domainsOpen ? "Hide Domains" : "View All Domains"}</span>
            <Plus className={`h-5 w-5 text-[#f2b52d] transition-transform duration-300 ${domainsOpen ? "rotate-45" : ""}`} />
          </button>
          {domainsOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 max-w-5xl mx-auto">
              {domains.map(([emoji, name, description], index) => (
                <article
                  key={name}
                  className={`rounded-xl border border-[#9b651e]/30 bg-[#32100f]/60 p-4 md:p-5 hover:bg-[#421512]/80 hover:border-[#d79a2e]/50 transition ${index === domains.length - 1 ? "lg:col-start-2" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{emoji}</span>
                    <span className="text-[10px] tracking-widest text-[#e4a92c]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="kannada-text mt-4 text-sm md:text-base font-semibold leading-snug text-[#fff0dc]">
                    {name}
                  </h3>
                  <p className="mt-2 text-xs text-[#cbb8aa] leading-relaxed">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-[#8d5317]/30">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="kannada-text text-xl md:text-2xl font-semibold text-[#f0c26a]">
            ನಮ್ಮ ತಂಡವನ್ನು ಏಕೆ ಸೇರಬೇಕು?
          </p>
          <h2 className="mt-1 text-3xl md:text-4xl font-bold text-[#fff1df]">
            Why Join Us?
          </h2>
          <div className="mt-8 border-y border-[#9b651e]/30">
            {reasons.map((reason, index) => (
              <div
                key={reason}
                className="flex items-center justify-center gap-4 py-4 border-b last:border-b-0 border-[#9b651e]/25"
              >
                <span className="text-[11px] text-[#e4a92c] font-medium">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base font-medium text-[#f2e4d5]">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={registerRef} id="register" className="py-20 md:py-24 text-center border-t border-[#8d5317]/30">
        <div className="max-w-3xl mx-auto px-5">
          <p className="kannada-text text-xl md:text-2xl font-semibold text-[#f0c26a]">
            ಮುಂದಿನ ಹೆಜ್ಜೆ ನಿಮ್ಮದು
          </p>
          <h2 className="mt-1 text-3xl md:text-4xl font-bold leading-tight text-[#fff1df]">
            The Next Step Is Yours.
          </h2>
          <p className="mt-4 text-sm text-[#cbb8aa] leading-relaxed">
            ನಿಮ್ಮ ನೋಂದಣಿಯನ್ನು Google Form ಮೂಲಕ ಪೂರ್ಣಗೊಳಿಸಿ.
            <br />
            Complete your registration through the Google Form.
          </p>
          <a
            href="https://forms.gle/1Ejkg7UAniHSm3fB9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffc329] to-[#f05a22] text-[#250607] px-6 py-3 text-sm font-semibold hover:scale-[1.02] transition"
          >
            ಅರ್ಜಿ ಸಲ್ಲಿಸಿ / Apply Now
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-[#8d5317]/30 py-5 bg-[#1a0607]/70">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#a99383]">
          <span>© 2026 Kannada Koota EC</span>
          <span className="kannada-text">ಕನ್ನಡ ಕೂಟ · PES University EC Campus</span>
        </div>
      </footer>
    </div>
  );
}
