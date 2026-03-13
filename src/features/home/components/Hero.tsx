import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";

interface HeroProps {
  title?: string;
}

// MarqueeImages component with sliding effect
function MarqueeImages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
  '/img4.jpg',
  '/img2.jpg',
  '/Hero/KKEC1.jpg',
  '/Hero/KKEC2.jpg',
  // add more later if needed
];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-2xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Kannada Koota Event ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <p className="text-sm">Kannada Koota Event {index + 1}</p>
          </div>
        </div>
      ))}

      {/* Navigation indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero({ title = "ಕನ್ನಡ ಕೂಟ EC PES" }: HeroProps) {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-surface to-primary-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Title and CTA */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text moving-gradient-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 mb-4 leading-snug md:leading-loose">
                {title}
              </h1>

              <p className="text-xl text-muted-foreground mt-4 max-w-xl mx-auto">
                Celebrating Kannada culture, language, and traditions at PES
                University Electronic City Campus
              </p>
              <p className="text-sm text-muted-foreground kannada-text max-w-xl mx-auto">
                ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಭಾಷೆಯ ಸಂರಕ್ಷಣೆಗಾಗಿ ನಮ್ಮ ಪ್ರಯತ್ನ
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToAbout}
                className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all animate-pulse"
                size="lg"
              >
                Learn More About Us
              </Button>
              {/* <Button 
                variant="outline"
                className="px-6 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                size="lg"
              >
                <a href="/Hero">View Hero</a>
              </Button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">160+</div>
                <div className="text-sm text-muted-foreground">
                  Active Members
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">
                  Years Active
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Marquee Images */}
          <div className="animate-slide-in-right">
            <MarqueeImages />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
}
