import { useState } from "react";
import {
  Languages,
  Compass,
  BookOpen,
  Sparkles,
  MapPin,
  Volume2,
} from "lucide-react";
import type { DialectRegionId } from "./types";
import KarnatakaRegionMap from "./KarnatakaRegionMap";
import VocabularyArchive from "./VocabularyArchive";

export default function NudiModule() {
  const [activeTab, setActiveTab] = useState<"map" | "archive">("map");
  const [selectedRegionId, setSelectedRegionId] =
    useState<DialectRegionId | null>(null);

  const handleExploreWordsForRegion = (id: DialectRegionId) => {
    setSelectedRegionId(id);
    setActiveTab("archive");
    const archEl = document.getElementById("nudi-content-hub");
    if (archEl) archEl.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="nudi-module"
      className="relative z-20 max-w-5xl mx-auto px-4 mt-8 pb-24 animate-in fade-in duration-500"
    >
      {/* ── Linguistic Archive Landing Area ── */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#181822]/95 via-[#13131A]/95 to-[#0E0E14]/95 border border-amber-500/30 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl mb-8">
        {/* Subtle background ambient flare */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>ಭಾಷಾ ಶಾಸ್ತ್ರ & ಉಪಭಾಷಾ ಸಂಗ್ರಹ · Linguistic Heritage</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl font-black text-white font-kannada tracking-tight">
              ನುಡಿ-ಬೆಳಕು
            </h2>

            {/* English Descriptor */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-amber-300/80 uppercase">
              Linguistic & Dialect Archive
            </p>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-neutral-300 font-kannada leading-relaxed">
              ಉತ್ತರ ಕರ್ನಾಟಕ, ಕರಾವಳಿ, ಮೈಸೂರು & ಬೆಂಗಳೂರು ಉಪಭಾಷಾ ವೈವಿಧ್ಯ ಮತ್ತು ನುಡಿಗಟ್ಟುಗಳ ಜೀವಂತ ಆಕರ.
            </p>
          </div>

          {/* Two Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("map");
                const mapEl = document.getElementById("nudi-content-hub");
                if (mapEl) mapEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 active:scale-95 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>ಪ್ರಾದೇಶಿಕ ನಕ್ಷೆ — Explore Regional Map</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("archive");
                const archEl = document.getElementById("nudi-content-hub");
                if (archEl) archEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-amber-500/30 text-amber-200 hover:text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>ಪದಕೋಶ ಸಂಗ್ರಹ — Search Vocabulary</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Sub-navigation Tabs ── */}
      <div id="nudi-content-hub" className="scroll-mt-24 mb-6">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#141419] border border-white/10 max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab("map")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "map"
                ? "bg-amber-500 text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>ಪ್ರಾದೇಶಿಕ ನಕ್ಷೆ (Regional Map)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("archive")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "archive"
                ? "bg-amber-500 text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>ಪದಕೋಶ ಸಂಗ್ರಹ (Vocabulary)</span>
          </button>
        </div>
      </div>

      {/* ── VIEW 1: REGIONAL MAP EXPLORER ── */}
      {activeTab === "map" && (
        <KarnatakaRegionMap
          selectedRegionId={selectedRegionId}
          onSelectRegion={(id) => setSelectedRegionId(id)}
          onExploreWordsForRegion={handleExploreWordsForRegion}
        />
      )}

      {/* ── VIEW 2: VOCABULARY ARCHIVE ── */}
      {activeTab === "archive" && (
        <VocabularyArchive initialRegionFilter={selectedRegionId} />
      )}
    </div>
  );
}
