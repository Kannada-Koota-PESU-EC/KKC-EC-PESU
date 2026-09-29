import { useRef, useState } from "react";
import { Plus, ArrowUpRight } from "lucide-react";

const domains = [
  ["ಐಟಿ / IT", "Build and manage the digital side of Kannada Koota through technology."],
  ["ಈವೆಂಟ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ / Event Management", "Turn ideas into well-planned, engaging events from start to finish."],
  ["ಲಾಜಿಸ್ಟಿಕ್ಸ್ / Logistics", "Keep everything moving smoothly, from planning to execution."],
  ["ಸಾಂಸ್ಕೃತಿಕ / Culturals", "Bring creativity, tradition and celebration together through cultural activities."],
  ["ವಿನ್ಯಾಸ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪಾದನೆ / Design and Video Editing", "Create the visuals and videos that give Kannada Koota its identity."],
  ["ಅತಿಥಿ ಸತ್ಕಾರ / Hospitality", "Make guests, participants and teams feel welcomed and taken care of."],
  ["ಮಾರ್ಕೆಟಿಂಗ್ / Marketing", "Take our events and initiatives to the right audience through creative promotion."],
  ["ಛಾಯಾಗ್ರಹಣ / Photography", "Capture the moments, people and energy that make every event memorable."],
  ["ಸಾಂಸ್ಕೃತಿಕ-ಇಂಚರ / Culturals-INCHARA", "Contribute to Inchara through performances, cultural expression and creative initiatives."],
  ["ವಿಷಯ ಬರವಣಿಗೆ / Content Writing", "Turn ideas into engaging stories, captions, posts and communication."],
  ["ಕಾರ್ಯಾಚರಣೆಗಳು / Operations", "Coordinate the behind-the-scenes work that keeps everything running."],
  ["ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕಗಳು / Public Relations", "Build connections and communicate Kannada Koota's presence beyond the team."],
  ["ಪ್ರಾಯೋಜಕತ್ವ / Sponsorship", "Connect with brands and organisations to build meaningful partnerships."]
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
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <section className="relative min-h-[82vh] flex items-center overflow-hidden bg-gradient-to-br from-surface via-background to-primary-muted">
        <div className="absolute -right-20 -bottom-10 text-[180px] md:text-[330px] font-bold leading-none text-foreground/[0.025] pointer-events-none select-none">2026</div>
        <div className="max-w-6xl w-full mx-auto px-5 sm:px-6 lg:px-8 py-24 md:py-28">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-end">
            <div>
              <p className="text-primary text-xs md:text-sm tracking-[0.22em] uppercase font-semibold mb-6">Kannada Koota EC · Recruitment 2026</p>
              <h2 className="kannada-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-3">ಹೊಸ ಪ್ರತಿಭೆಗಳ ಹುಡುಕಾಟ</h2>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.85]">ಕನ್ನಡ ಕೂಟದ<br />ಒಂದು ಭಾಗವಾಗಿ</h1>
              <p className="mt-7 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                <span className="font-semibold text-foreground">BECOME A PART OF OUR TEAM</span><br /><br />
                Your ideas. Your creativity. Your space to make an impact.
              </p>
              <button onClick={scrollToRegister} className="mt-7 inline-flex items-center gap-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 py-3 font-semibold transition-all duration-300 hover:-translate-y-1">
                ಅರ್ಜಿ ಸಲ್ಲಿಸಿ <span className="text-muted-foreground">/</span> APPLY NOW <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            <div className="border-l border-border pl-6 md:pl-8">
              <p className="text-muted-foreground leading-relaxed max-w-md">Find your space, meet your people and help create something that stays with you long after the event ends.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-border py-4 overflow-hidden">
        <div className="flex justify-center gap-8 md:gap-14 text-xs tracking-[0.22em] text-muted-foreground uppercase whitespace-nowrap">
          <span>CREATE <span className="text-primary ml-4">✦</span></span>
          <span>COLLABORATE <span className="text-primary ml-4">✦</span></span>
          <span>LEARN <span className="text-primary ml-4">✦</span></span>
        </div>
      </div>

      <section className="py-24 md:py-28" id="domains">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-9">
            <p className="kannada-text text-2xl md:text-4xl font-semibold leading-[1.1] mb-2">ನಿಮಗೆ ಸರಿಹೊಂದುವ ಕ್ಷೇತ್ರವನ್ನು ಕಂಡುಕೊಳ್ಳಿ</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.9]">EXPLORE DOMAINS</h2>
          </div>
          <button type="button" onClick={() => setDomainsOpen(!domainsOpen)} className="w-full flex items-center justify-between border border-border bg-card hover:border-primary/60 px-5 py-5 transition-all duration-300">
            <span className="font-medium">{domainsOpen ? "HIDE DOMAINS" : "VIEW ALL DOMAINS"}</span>
            <Plus className={`h-6 w-6 text-primary transition-transform duration-300 ${domainsOpen ? "rotate-45" : ""}`} />
          </button>
          {domainsOpen && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border border-t-0">
              {domains.map(([name, description], index) => (
                <article key={name} className="relative min-h-[205px] bg-card p-6 md:p-7 overflow-hidden group transition-all duration-300 hover:bg-muted/40">
                  <p className="text-primary text-xs tracking-[0.15em] mb-9">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="kannada-text text-lg md:text-xl font-semibold leading-[1.3] mb-3">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-snug max-w-sm">{description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 md:py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-9">
            <p className="kannada-text text-2xl md:text-4xl font-semibold leading-[1.05] mb-2">ನಮ್ಮ ತಂಡವನ್ನು ಏಕೆ ಸೇರಬೇಕು?</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.9]">WHY JOIN US?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {reasons.map((reason, index) => (
              <div key={reason} className="min-h-[145px] md:min-h-[155px] border border-border bg-card p-5 md:p-6 flex flex-col justify-between hover:border-primary/60 hover:bg-muted/30 hover:-translate-y-1 transition-all duration-300">
                <span className="text-primary text-xs tracking-[0.15em]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg md:text-xl font-medium tracking-tight leading-snug max-w-sm">{reason}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={registerRef} id="register" className="relative py-28 md:py-32 text-center overflow-hidden scroll-mt-24">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] md:w-[520px] md:h-[520px] rounded-full border border-primary/10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5">
          <p className="kannada-text text-3xl md:text-5xl font-semibold leading-[1.05] mb-3">ಮುಂದಿನ ಹೆಜ್ಜೆ ನಿಮ್ಮದು</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.85]">THE NEXT STEP<br />IS YOURS.</h2>
          <p className="mt-7 text-muted-foreground leading-relaxed">
            ನಿಮ್ಮ ನೋಂದಣಿಯನ್ನು Google Form ಮೂಲಕ ಪೂರ್ಣಗೊಳಿಸಿ.<br />
            Complete your registration through the Google Form.
          </p>
          <a href="https://forms.gle/1Ejkg7UAniHSm3fB9" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-4 font-bold transition-all duration-300 hover:-translate-y-1">
            ಅರ್ಜಿ ಸಲ್ಲಿಸಿ <span className="opacity-60">/</span> APPLY NOW <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 Kannada Koota EC</span>
          <span className="kannada-text">ಕನ್ನಡ ಕೂಟ · PES University EC Campus</span>
        </div>
      </footer>
    </div>
  );
}
