import { Button } from "@/shared/components/ui/button";
import { ArrowDown, ExternalLink, Sparkles } from "lucide-react";
import DomainCard from "@/features/Recruitment/components/DomainCard";
import { useReveal } from "@/features/Recruitment/hooks/use-reveal";
import {
  RECRUITMENT_FORM_URL,
  isRecruitmentFormAvailable,
  recruitmentDomains,
} from "@/features/Recruitment/data/recruitment";

export default function Recruitment() {
  const domainsHeader = useReveal<HTMLDivElement>();
  const applyCard = useReveal<HTMLDivElement>();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const revealClasses = (isVisible: boolean) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <div className="min-h-screen heritage-rangoli-bg">

      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background/82 via-background/62 to-background/44 backdrop-blur-[1px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-6 text-center lg:text-left animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary-muted/60 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="kannada-text">ನೇಮಕಾತಿ</span>
                <span aria-hidden="true">·</span>
                Recruitment
              </span>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                Join{" "}
                <span className="kannada-text text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500">
                  ಕನ್ನಡ ಕೂಟ
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground kannada-text">
                ಕನ್ನಡ ಕೂಟದ ತಂಡದ ಭಾಗವಾಗಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Kannada Koota EC is looking for enthusiastic and passionate
                students to join our team. Be a part of our journey in
                celebrating Kannada language, culture and community while
                gaining valuable experience and creating wonderful memories.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("domains")}
                  className="group w-full sm:w-auto"
                >
                  Explore the Domains
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("apply")}
                  className="group w-full sm:w-auto"
                >
                  Register Now
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </Button>
              </div>
            </div>

            {/* Poster */}
            <div className="animate-slide-in-right">
              <div className="group relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                <img
                  src="/Events/recruitment.jpeg"
                  alt="Kannada Koota Recruitment poster"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-club-black/30 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Domains */}
      <section
        id="domains"
        className="scroll-mt-16 py-20 bg-surface/68 backdrop-blur-[2px]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={domainsHeader.ref}
            className={`text-center max-w-3xl mx-auto mb-12 space-y-4 ${revealClasses(domainsHeader.isVisible)}`}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Domains
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Find where you belong
            </h2>
            <p className="text-muted-foreground kannada-text">
              ವಿವಿಧ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ನಿಮ್ಮ ಪ್ರತಿಭೆಯನ್ನು ತೋರಿಸಿ, ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ
              ಕನ್ನಡದ ಸಂಭ್ರಮವನ್ನು ಇನ್ನಷ್ಟು ದೊಡ್ಡದಾಗಿಸಿ!
            </p>
            <p className="text-muted-foreground">
              Explore our domains and pick the one
              that matches your interests and skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recruitmentDomains.map((domain, index) => (
              <DomainCard key={domain.id} domain={domain} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section
        id="apply"
        className="scroll-mt-16 py-20 bg-background/62 backdrop-blur-[1px]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={applyCard.ref}
            className={`relative overflow-hidden rounded-2xl border border-primary/45 bg-gradient-to-br from-card via-card to-primary-muted p-8 md:p-12 text-center shadow-[0_0_0_1px_hsl(var(--primary)/0.22),0_18px_42px_-22px_hsl(var(--primary)/0.6)] ${revealClasses(applyCard.isVisible)}`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500"
            />

            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to join the team?
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Pick the domain that excites you the most and fill out the
              recruitment form to become a part of Kannada Koota EC.
            </p>

            <div className="mt-8">
              {isRecruitmentFormAvailable ? (
                <Button
                  size="lg"
                  className="px-10 py-6 text-lg animate-pulse-glow motion-reduce:animate-none"
                  asChild
                >
                  <a
                    href={RECRUITMENT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <Button size="lg" className="px-10 py-6 text-lg" disabled>
                  Register Now
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              )}

              <p className="text-sm text-muted-foreground mt-4">
                {isRecruitmentFormAvailable
                  ? "Opens the official recruitment Google Form in a new tab."
                  : "The recruitment form will be available soon. Stay tuned!"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
