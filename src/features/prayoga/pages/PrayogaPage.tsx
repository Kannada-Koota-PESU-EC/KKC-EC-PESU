import { useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Prayoga3DCanvas from "../components/Prayoga3DCanvas";
import SectionSelector from "../components/SectionSelector";
import SahityaModule from "../modules/sahitya/SahityaModule";
import RangaModule from "../modules/ranga/RangaModule";
import NudiModule from "../modules/nudi/NudiModule";
import type { CulturalSection } from "../types";
import "../styles/prayoga.css";

export default function PrayogaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab") || searchParams.get("section") || searchParams.get("module");
  const activeSection: CulturalSection =
    rawTab === "ranga" || rawTab === "nudi" || rawTab === "sahitya"
      ? rawTab
      : "sahitya";

  const handleSelectSection = (sec: CulturalSection) => {
    setSearchParams({ tab: sec });
  };

  return (
    <div className="prayoga-page-container relative min-h-screen bg-[#0D0D0D] text-[#F5EEDB] overflow-x-hidden">
      {/* ── Full 3D Interactive WebGL Hero Canvas ── */}
      <Prayoga3DCanvas activeSection={activeSection} />

      {/* ── Ambient Background Lighting Overlays ── */}
      <div className="prayoga-glow-top" aria-hidden="true" />
      <div className="prayoga-glow-crimson" aria-hidden="true" />
      <div className="prayoga-glow-gold" aria-hidden="true" />

      {/* ── Subtle Floating Background Watermark ── */}
      <div className="prayoga-watermark" aria-hidden="true">
        ಪ್ರ
      </div>

      {/* ── Foreground Hero Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-14 sm:pt-20 pb-4 text-center prayoga-hero-section">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-red-600/10 to-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ಕನ್ನಡ ಕೂಟ · ಪಿ.ಇ.ಎಸ್.ಯು ಇ.ಸಿ</span>
          <span className="text-white/30">•</span>
          <span className="tracking-widest text-amber-200/90">THE CREATIVE CULTURE STUDIO</span>
        </div>

        {/* Monumental Primary Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 select-none">
          <span className="prayoga-title-gradient font-kannada">ಪ್ರಯೋಗ</span>
        </h1>

        {/* Bilingual Subtitle */}
        <div className="max-w-2xl mx-auto space-y-1 mb-8">
          <p className="text-lg sm:text-2xl text-amber-100 font-medium font-kannada leading-relaxed tracking-wide">
            ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ಸಮ್ಮಿಲನ
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 font-light tracking-[0.22em] uppercase">
            THE CREATIVE CULTURE STUDIO
          </p>
        </div>

        {/* Cultural Geometric Divider */}
        <div className="flex items-center justify-center gap-3 my-6 text-amber-500/60" aria-hidden="true">
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="w-2 h-2 rotate-45 border border-amber-400 bg-amber-500/40" />
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>
      </div>

      {/* ── Cultural Section Gateways ── */}
      <SectionSelector
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* ── Cultural Module 1: ಸಾಹಿತ್ಯ ವೇದಿಕೆ (Poetry & Literature Canvas) ── */}
      {activeSection === "sahitya" && <SahityaModule />}

      {/* ── Cultural Module 2: ರಂಗ-ಚಿತ್ತಾರ (Folk & Art Studio) ── */}
      {activeSection === "ranga" && <RangaModule />}

      {/* ── Cultural Module 3: ನುಡಿ-ಬೆಳಕು (Linguistic & Dialect Archive) ── */}
      {activeSection === "nudi" && <NudiModule />}
    </div>
  );
}
