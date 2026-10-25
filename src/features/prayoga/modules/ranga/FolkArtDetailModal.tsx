import { useEffect } from "react";
import {
  ArrowLeft,
  X,
  MapPin,
  Users,
  Sparkles,
  Music,
  Shield,
  Layers,
  ChevronRight,
} from "lucide-react";
import type { FolkArtTradition } from "./types";

interface FolkArtDetailModalProps {
  tradition: FolkArtTradition | null;
  onClose: () => void;
}

export default function FolkArtDetailModal({
  tradition,
  onClose,
}: FolkArtDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!tradition) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="folk-art-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-gradient-to-b from-[#181822] via-[#13131A] to-[#0E0E14] border border-amber-500/35 p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] text-[#F5EEDB]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-amber-200 text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>ಹಿಂದಕ್ಕೆ · Return to Art Studio</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close presentation"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Region & Community Badge Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{tradition.region}</span>
          </span>

          {tradition.communityContext && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-xs">
              <Users className="w-3.5 h-3.5 text-amber-400/80" />
              <span>{tradition.communityContext}</span>
            </span>
          )}
        </div>

        {/* Main Title */}
        <h2
          id="folk-art-title"
          className="text-3xl sm:text-5xl font-black text-white font-kannada tracking-tight mb-1"
        >
          {tradition.kannadaTitle}
        </h2>
        <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-amber-300/80 uppercase mb-4">
          {tradition.englishTitle}
        </p>

        <p className="text-sm sm:text-base text-amber-100/90 font-kannada leading-relaxed mb-8 max-w-3xl">
          {tradition.description}
        </p>

        {/* Detailed Cultural Feature Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {/* Panel 1: Costume & Attire */}
          <div className="rounded-2xl bg-neutral-900/80 border border-white/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-bold font-kannada">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>{tradition.attire.title}</span>
            </div>
            <p className="text-xs text-neutral-300 font-kannada leading-relaxed">
              {tradition.attire.description}
            </p>
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              {tradition.attire.elements.map((el, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-amber-200/90 font-kannada"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span>{el}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Instruments & Music */}
          <div className="rounded-2xl bg-neutral-900/80 border border-white/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-bold font-kannada">
              <Music className="w-4 h-4 text-amber-400" />
              <span>{tradition.instruments.title}</span>
            </div>
            <p className="text-xs text-neutral-300 font-kannada leading-relaxed">
              {tradition.instruments.description}
            </p>
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              {tradition.instruments.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-amber-200/90 font-kannada"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3: Performance Style */}
          <div className="rounded-2xl bg-neutral-900/80 border border-white/10 p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-bold font-kannada">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ಪ್ರದರ್ಶನ ಶೈಲಿ ಮತ್ತು ಕೌಶಲ್ಯ (Performance Style)</span>
            </div>
            <p className="text-xs text-neutral-300 font-kannada leading-relaxed">
              {tradition.performanceStyle}
            </p>
          </div>

          {/* Panel 4: Cultural Significance */}
          <div className="rounded-2xl bg-neutral-900/80 border border-white/10 p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-bold font-kannada">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವ (Cultural Significance)</span>
            </div>
            <p className="text-xs text-neutral-300 font-kannada leading-relaxed">
              {tradition.culturalSignificance}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-sans">
          <span>ಕರ್ನಾಟಕ ಜಾನಪದ ಕಲಾ ಪರಿಷತ್ತು · ರಂಗ-ಚಿತ್ತಾರ</span>
          <span className="text-amber-400/60 font-kannada">॥ ಸತ್ಯಂ ಶಿವಂ ಸುಂದರಂ ॥</span>
        </div>
      </div>
    </div>
  );
}
