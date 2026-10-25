import { useState } from "react";
import {
  Palette,
  Sparkles,
  Compass,
  ArrowRight,
  MapPin,
  Flame,
  Music,
  Eye,
  Sliders,
} from "lucide-react";
import type { FolkArtTradition } from "./types";
import { FOLK_ART_TRADITIONS } from "./folkArtData";
import ChittaraStudio from "./ChittaraStudio";
import FolkArtDetailModal from "./FolkArtDetailModal";

export default function RangaModule() {
  const [activeTab, setActiveTab] = useState<"explorer" | "studio">("explorer");
  const [selectedTradition, setSelectedTradition] =
    useState<FolkArtTradition | null>(null);

  return (
    <div
      id="ranga-module"
      className="relative z-20 max-w-5xl mx-auto px-4 mt-8 pb-24 animate-in fade-in duration-500"
    >
      {/* ── Folk Art Studio Landing Area ── */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#181822]/95 via-[#13131A]/95 to-[#0E0E14]/95 border border-amber-500/30 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl mb-8">
        {/* Subtle background ambient flare */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>ರಂಗಕಲೆ & ಜಾನಪದ ಚಿತ್ರಕಲೆ · Folk & Visual Arts</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl font-black text-white font-kannada tracking-tight">
              ರಂಗ-ಚಿತ್ತಾರ
            </h2>

            {/* English Descriptor */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-amber-300/80 uppercase">
              Interactive Folk & Art Studio
            </p>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-neutral-300 font-kannada leading-relaxed">
              ಯಕ್ಷಗಾನದ ಗಾಂಭೀರ್ಯ, ಡೊಳ್ಳಿನ ಗುಡುಗು, ಕಂಸಾಳೆಯ ನಾದ ಮತ್ತು ಮಲೆನಾಡಿನ ಪವಿತ್ರ ಹಸೆ-ಚಿತ್ತಾರ ಕಲೆ.
            </p>
          </div>

          {/* Two Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("explorer");
                const expEl = document.getElementById("ranga-content-hub");
                if (expEl) expEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 active:scale-95 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>ಕಲೆಗಳ ಅನ್ವೇಷಣೆ — Explore Traditions</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("studio");
                const studioEl = document.getElementById("ranga-content-hub");
                if (studioEl) studioEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-amber-500/30 text-amber-200 hover:text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-95 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>ಚಿತ್ತಾರ ರಚಿಸಿ — Pattern Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Sub-navigation & Mode Tabs ── */}
      <div id="ranga-content-hub" className="scroll-mt-24 mb-6">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#141419] border border-white/10 max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab("explorer")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "explorer"
                ? "bg-amber-500 text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>ಜಾನಪದ ಕಲಾ ಕಣ್ವ (Explorer)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "studio"
                ? "bg-amber-500 text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>ಚಿತ್ತಾರ ರಚನಾ ಕಣ್ವ (Pattern Studio)</span>
          </button>
        </div>
      </div>

      {/* ── VIEW 1: CULTURAL ART EXPLORER ── */}
      {activeTab === "explorer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FOLK_ART_TRADITIONS.map((tradition) => (
              <div
                key={tradition.id}
                className="group relative rounded-3xl bg-gradient-to-b from-[#16161D]/90 via-[#131318]/90 to-[#0F0F13]/90 hover:from-[#1C1C24]/90 hover:to-[#141419]/90 border border-white/10 hover:border-amber-500/40 p-6 transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Region */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>ಕರ್ನಾಟಕ ಕಲೆ</span>
                    </span>

                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-sans">
                      <MapPin className="w-3 h-3 text-amber-400/80" />
                      <span className="truncate max-w-[120px]">
                        {tradition.region.split("(")[0]}
                      </span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white font-kannada leading-tight mb-1 group-hover:text-amber-200 transition-colors">
                    {tradition.kannadaTitle}
                  </h3>
                  <p className="text-xs text-amber-200/70 font-sans tracking-wide uppercase mb-3">
                    {tradition.englishTitle}
                  </p>

                  {/* Tagline */}
                  <p className="text-xs text-amber-100/90 font-kannada font-medium mb-3 italic">
                    "{tradition.tagline}"
                  </p>

                  {/* Excerpt */}
                  <p className="text-xs text-neutral-300 font-kannada leading-relaxed line-clamp-3 mb-4">
                    {tradition.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-sans">
                    <Music className="w-3 h-3 text-amber-400" />
                    <span>ವಾದ್ಯ & ವೇಷಭೂಷಣ</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedTradition(tradition)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold text-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <span>ವಿವರ ನೋಡಿ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── VIEW 2: CREATIVE PATTERN STUDIO ── */}
      {activeTab === "studio" && <ChittaraStudio />}

      {/* ── FOCUSED PRESENTATION MODAL ── */}
      {selectedTradition && (
        <FolkArtDetailModal
          tradition={selectedTradition}
          onClose={() => setSelectedTradition(null)}
        />
      )}
    </div>
  );
}
