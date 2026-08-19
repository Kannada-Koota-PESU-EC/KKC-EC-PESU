import { useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { Users, ExternalLink, ArrowDown } from "lucide-react";

export default function Recruitment() {
  const registerRef = useRef<HTMLDivElement>(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-surface via-background to-primary-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />

            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Recruitment
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            ಕನ್ನಡ ಕೂಟದ ತಂಡದ ಭಾಗವಾಗಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ
          </p>

          <p className="mt-2 text-base text-muted-foreground kannada-text">
            Join Kannada Koota EC and become a part of our team!
          </p>

          {/* Register Your Interest Button */}
          <div className="mt-8">
            <Button
              size="lg"
              onClick={scrollToRegister}
              className="px-8 py-6 text-lg"
            >
              Register Your Interest
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>

        </div>
      </section>

      {/* Recruitment Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">

            {/* Poster */}
            <div className="w-full bg-muted flex justify-center">
              <img
                src="/Events/Nritya_Lahari.jpeg"
                alt="Kannada Koota Recruitment"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Description */}
            <div className="p-6 md:p-10 text-center">

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Join Kannada Koota
              </h2>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                ವಿವಿಧ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ನಿಮ್ಮ ಪ್ರತಿಭೆಯನ್ನು ತೋರಿಸಿ, ನಮ್ಮೊಂದಿಗೆ
                ಸೇರಿ ಕನ್ನಡದ ಸಂಭ್ರಮವನ್ನು ಇನ್ನಷ್ಟು ದೊಡ್ಡದಾಗಿಸಿ!
              </p>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-4">
                Kannada Koota EC is looking for enthusiastic and passionate
                students to join our team. Be a part of our journey in
                celebrating Kannada language, culture and community while
                gaining valuable experience and creating wonderful memories.
              </p>

              {/* Register Now Section */}
              <div
                ref={registerRef}
                className="mt-10 scroll-mt-24"
              >
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg"
                  asChild
                >
                  <a
                    href="https://forms.gle/1Ejkg7UAniHSm3fB9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>

                <p className="text-sm text-muted-foreground mt-4">
                  Click the button above to fill out the recruitment form.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
