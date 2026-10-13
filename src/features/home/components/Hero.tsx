
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface HeroProps {
  title?: string;
}

function MarqueeImages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/img4.jpg",
    "/img2.jpg",
    "/Hero/KKEC1.jpg",
    "/Hero/KKEC2.jpg",
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % images.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-primary/10" />

      <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-2xl sm:aspect-[5/4]">
        {images.map((image, index) => (
          <div
            key={image}
            aria-hidden={index !== currentIndex}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={
                index === currentIndex
                  ? `Kannada Koota campus and cultural activities, image ${index + 1}`
                  : ""
              }
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Our campus. Our culture.
          </p>
          <p className="text-xl font-semibold sm:text-2xl">
            ಕನ್ನಡದ ಸಂಭ್ರಮ, ಎಲ್ಲರ ಸಂಭ್ರಮ
          </p>
          <p className="mt-1 text-sm text-white/80">
            A community connected by language and tradition.
          </p>
        </div>

        <div
          className="absolute right-4 top-4 flex gap-2"
          aria-label="Choose gallery image"
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={currentIndex === index}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-7 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          PESU · Electronic City
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  title = "ಕನ್ನಡ ಕೂಟ EC PES",
}: HeroProps) {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="heritage-rangoli-bg relative isolate overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="animate-fade-in-up text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Celebrating Kannada at PESU ECC
          </div>

          <h1 className="kannada-text mb-6 text-4xl font-bold leading-[1.25] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
            <span className="mt-3 block text-primary">
              ನಮ್ಮ ಭಾಷೆ, ನಮ್ಮ ಹೆಮ್ಮೆ.
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
            A home for Kannada language, culture, creativity, and community.
            Discover our traditions, meet your people, and make memories
            together at PES University Electronic City Campus.
          </p>

          <div className="kannada-text mx-auto mt-4 max-w-xl text-base text-foreground/80 lg:mx-0">
            ಕನ್ನಡ ಸಂಸ್ಕೃತಿ, ಭಾಷೆ ಮತ್ತು ಪರಂಪರೆಯ ಸಂಭ್ರಮದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="min-h-12 rounded-full px-6 font-semibold"
            >
              Explore Our Culture
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 rounded-full border-primary/40 px-6 font-semibold hover:bg-primary/10"
            >
              <Link to="/recruitments">
                Join Our Team
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 divide-x divide-border border-t border-border/70 pt-6 lg:mx-0">
            <div className="px-2 text-center lg:text-left">
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                160+
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Active members
              </p>
            </div>

            <div className="px-2 text-center lg:text-left">
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                5+
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Events
              </p>
            </div>

            <div className="px-2 text-center lg:text-left">
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                3
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Years active
              </p>
            </div>
          </div>
        </div>

        <div className="animate-slide-in-right">
          <MarqueeImages />
        </div>
      </div>
    </section>
  );
}
