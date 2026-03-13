import Hero from "@/features/home/components/Hero";
import AboutSection from "@/features/home/components/AboutSection";
import RepublicDayPopup from "@/features/home/components/RepublicDayPopup";
import { useEffect, useState } from "react";

const slides = [
  "/img1.jpg",
  "/img3.jpg",
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const nextSlide = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setFadeIn(true);
    }, 300);
  };

  const prevSlide = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrent((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
      setFadeIn(true);
    }, 300);
  };

  // Auto slide
  useEffect(() => {
    const timer = setTimeout(nextSlide, 3500);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="min-h-screen">
      {/* 🇮🇳 Republic Day Popup (Jan 26 only) */}
      <RepublicDayPopup />

      {/* Hero Section */}
      <Hero />

      {/* Home Image Gallery */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg bg-black">

            {/* Image */}
            <img
              src={slides[current]}
              alt="Homepage gallery"
              className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Left Control */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full text-xl hover:bg-black/80"
              aria-label="Previous slide"
            >
              ‹
            </button>

            {/* Right Control */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full text-xl hover:bg-black/80"
              aria-label="Next slide"
            >
              ›
            </button>

          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
    </div>
  );
};

export default Index;
