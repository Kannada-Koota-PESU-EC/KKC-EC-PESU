
import Hero from "@/features/home/components/Hero";
import AboutSection from "@/features/home/components/AboutSection";
import RepublicDayPopup from "@/features/home/components/RepublicDayPopup";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";

const slides = ["/img1.jpg", "/img3.jpg"];

const Index = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <RepublicDayPopup />

      <Hero />

      <section
        aria-label="Kannada Koota moments"
        className="relative overflow-hidden bg-background py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                <Images className="h-4 w-4" />
                Moments We Share
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                A little glimpse of
                <span className="kannada-text mt-2 block text-primary">
                  ನಮ್ಮ ಸಂಭ್ರಮ
                </span>
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                Every gathering tells a story. Explore the moments, memories,
                and connections that bring our community together.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="min-w-16 text-sm font-medium tabular-nums text-muted-foreground">
                0{current + 1} / 0{slides.length}
              </span>

              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous gallery image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next gallery image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="relative aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/7]">
              {slides.map((slide, index) => (
                <img
                  key={slide}
                  src={slide}
                  alt={`Kannada Koota campus and cultural memories ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    current === index ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={current !== index}
                />

              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                <div className="text-white">
                  <p className="kannada-text text-2xl font-bold sm:text-3xl">
                    ನಮ್ಮ ಭಾಷೆ, ನಮ್ಮ ಹೆಮ್ಮೆ
                  </p>
                  <p className="mt-2 text-sm text-white/80 sm:text-base">
                    Celebrating culture, community, and togetherness.
                  </p>
                </div>

                <div
                  className="flex items-center gap-2"
                  aria-label="Choose gallery image"
                >
                  {slides.map((slide, index) => (
                    <button
                      key={slide}
                      type="button"
                      onClick={() => setCurrent(index)}
                      aria-label={`Show gallery image ${index + 1}`}
                      aria-pressed={current === index}
                      className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        current === index
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-right text-xs text-muted-foreground">
            A collection of moments from our community
          </p>
        </div>
      </section>

      <AboutSection />
    </div>
  );
};

export default Index;
