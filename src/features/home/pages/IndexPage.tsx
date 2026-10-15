import Hero from "@/features/home/components/Hero";
import AboutSection from "@/features/home/components/AboutSection";
import UpcomingEvent from "@/features/home/components/UpcomingEvent";
import RepublicDayPopup from "@/features/home/components/RepublicDayPopup";

const Index = () => (
  <div className="min-h-screen">
    {/* 🇮🇳 Republic Day Popup (Jan 26 only) */}
    <RepublicDayPopup />

    {/* Hero: full-screen photo slideshow (includes the photos of the old gallery slider) */}
    <Hero />

    {/* Nearest future event; hidden when there is none */}
    <UpcomingEvent />

    <AboutSection />
  </div>
);

export default Index;
