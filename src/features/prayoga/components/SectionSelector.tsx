import { Sparkles } from "lucide-react";
import type { CulturalSection } from "../types";
import { CULTURAL_SECTIONS } from "../types";

interface SectionSelectorProps {
  activeSection: CulturalSection;
  onSelectSection: (section: CulturalSection) => void;
}

export default function SectionSelector({
  activeSection,
  onSelectSection,
}: SectionSelectorProps) {
  const current = CULTURAL_SECTIONS.find((s) => s.id === activeSection) || CULTURAL_SECTIONS[0];
  const CurrentIcon = current.icon;

  return (
    <section
      className="prayoga-selector-container relative z-20 max-w-5xl mx-auto px-4 mt-8 pb-16"
      aria-label="Prayoga Cultural Gateways"
    >
      {/* Horizontal Floating Perspective Panels */}
      <div
        role="tablist"
        aria-label="Prayoga Cultural Sections"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8"
      >
        {CULTURAL_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const SecIcon = sec.icon;

          return (
            <button
              key={sec.id}
              role="tab"
              id={`tab-${sec.id}`}
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${sec.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelectSection(sec.id)}
              className={`prayoga-section-panel relative text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] ${
                isActive
                  ? "prayoga-panel-active bg-gradient-to-b from-[#18181D]/90 via-[#141418]/90 to-[#0F0F12]/90 shadow-2xl scale-[1.02]"
                  : "prayoga-panel-idle bg-[#121215]/60 hover:bg-[#16161C]/80"
              }`}
            >
              {/* Active Golden Glow Halo */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none prayoga-active-glow"
                  aria-hidden="true"
                />
              )}

              {/* Top Row: Index & Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest text-amber-400/80 font-bold">
                  {sec.index}
                </span>
                <span
                  className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border transition-colors ${
                    isActive
                      ? "bg-amber-400/15 border-amber-400/30 text-amber-300"
                      : "bg-white/5 border-white/10 text-neutral-400"
                  }`}
                >
                  {sec.badge}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-3.5 mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-inner"
                      : "bg-white/5 text-neutral-400 border border-white/10"
                  }`}
                >
                  <SecIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight font-kannada">
                    {sec.kannadaTitle}
                  </h3>
                  <p className="text-xs text-amber-200/70 font-medium tracking-wide mt-0.5">
                    {sec.englishTitle}
                  </p>
                </div>
              </div>

              {/* Tagline snippet */}
              <p className="text-xs text-neutral-400 line-clamp-2 mt-3 leading-relaxed">
                {sec.tagline}
              </p>

              {/* Active Indicator Bar */}
              <div
                className={`h-0.5 w-full mt-4 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 shadow-[0_0_8px_rgba(229,169,60,0.8)]"
                    : "bg-white/5"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Gateway Preview Card (First Stage Foundation Only - No sub-module content yet) */}
      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="prayoga-gateway-card relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#15151B]/90 to-[#0F0F14]/90 border border-amber-500/25 shadow-2xl backdrop-blur-xl transition-all duration-500"
      >
        {/* Subtle background ambient flare */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 via-red-600/20 to-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 flex-shrink-0 shadow-lg">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{current.badge}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-kannada">
                {current.kannadaTitle}
                <span className="text-sm sm:text-base font-normal text-amber-200/70 ml-2.5">
                  ({current.englishTitle})
                </span>
              </h4>
              <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl leading-relaxed mt-1">
                {current.description}
              </p>
            </div>
          </div>

          {/* Stage Status Badge */}
          <div className="flex-shrink-0 self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900/90 border border-amber-500/30 text-xs text-amber-300/90 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium">
              {current.id === "sahitya"
                ? "ಸಾಹಿತ್ಯ ವೇದಿಕೆ ಸಕ್ರಿಯ · Module Active"
                : current.id === "ranga"
                ? "ರಂಗ-ಚಿತ್ತಾರ ಸಕ್ರಿಯ · Module Active"
                : "ನುಡಿ-ಬೆಳಕು ಸಕ್ರಿಯ · Module Active"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
