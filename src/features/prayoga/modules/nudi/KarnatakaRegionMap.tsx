import { useState } from "react";
import {
  MapPin,
  Sparkles,
  Quote,
  Info,
  ChevronRight,
  Compass,
  RotateCcw,
} from "lucide-react";
import type { DialectRegion, DialectRegionId } from "./types";
import { DIALECT_REGIONS } from "./dialectData";

interface KarnatakaRegionMapProps {
  selectedRegionId: DialectRegionId | null;
  onSelectRegion: (id: DialectRegionId | null) => void;
  onExploreWordsForRegion: (id: DialectRegionId) => void;
}

export default function KarnatakaRegionMap({
  selectedRegionId,
  onSelectRegion,
  onExploreWordsForRegion,
}: KarnatakaRegionMapProps) {
  const [hoveredRegionId, setHoveredRegionId] = useState<DialectRegionId | null>(null);

  const activeRegion = DIALECT_REGIONS.find(
    (r) => r.id === (hoveredRegionId || selectedRegionId || "uttara")
  );

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#181822]/95 via-[#13131A]/95 to-[#0E0E14]/95 border border-amber-500/30 p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>ಪ್ರಾದೇಶಿಕ ಉಪಭಾಷಾ ನಕ್ಷೆ · Illustrative Linguistic Landscape</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-kannada">
            ಕರ್ನಾಟಕದ ಉಪಭಾಷಾ ವೈವಿಧ್ಯ (Dialect Regions of Karnataka)
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
            ಕರಾವಳಿಯ ಕಡಲಿನಿಂದ ಉತ್ತರ ಕರ್ನಾಟಕದ ಬಯಲುಸೀಮೆಯವರೆಗೆ ಕನ್ನಡದ ನುಡಿಗಟ್ಟುಗಳ ನಾದಲೋಕ.
          </p>
        </div>

        {selectedRegionId && (
          <button
            type="button"
            onClick={() => onSelectRegion(null)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-300 hover:text-white text-xs font-medium transition-colors self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ಎಲ್ಲಾ ಪ್ರಾಂತ್ಯಗಳು (Full State Overview)</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Illustrative Stylized Vector Map of Karnataka (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[340px] aspect-[3/4] p-4 rounded-3xl bg-neutral-900/80 border border-white/10 flex items-center justify-center shadow-inner">
            {/* Ambient map glow */}
            <div
              className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Stylized Karnataka Outline and Region Hub Nodes */}
            <svg
              viewBox="0 0 300 400"
              className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(229,169,60,0.15)]"
            >
              {/* Stylized Karnataka Coastal and Boundary Contour */}
              <path
                d="M 190 25 C 230 40, 240 70, 220 110 C 235 140, 245 190, 230 240 C 240 280, 210 350, 165 375 C 130 380, 105 320, 95 280 C 70 230, 80 160, 110 100 C 130 50, 160 20, 190 25 Z"
                fill="rgba(255, 255, 255, 0.02)"
                stroke="#E5A93C"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                opacity="0.4"
              />

              {/* Coastal Edge Indicator */}
              <path
                d="M 110 100 Q 80 180 95 280"
                fill="none"
                stroke="#2A6F78"
                strokeWidth="2.5"
                opacity="0.7"
              />

              {/* Connecting cultural trade & river routes (Tungabhadra, Kaveri, Krishna) */}
              <line
                x1="160"
                y1="110"
                x2="165"
                y2="310"
                stroke="rgba(229, 169, 60, 0.15)"
                strokeDasharray="3 3"
              />
              <line
                x1="85"
                y1="230"
                x2="165"
                y2="310"
                stroke="rgba(229, 169, 60, 0.15)"
                strokeDasharray="3 3"
              />
              <line
                x1="160"
                y1="110"
                x2="210"
                y2="60"
                stroke="rgba(229, 169, 60, 0.15)"
                strokeDasharray="3 3"
              />

              {/* Regional Cultural Nodes */}
              {DIALECT_REGIONS.map((region) => {
                const isSelected = selectedRegionId === region.id;
                const isHovered = hoveredRegionId === region.id;
                const isHighlighted = isSelected || isHovered;

                return (
                  <g
                    key={region.id}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredRegionId(region.id)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() =>
                      onSelectRegion(isSelected ? null : region.id)
                    }
                  >
                    {/* Pulsing selection aura */}
                    {isHighlighted && (
                      <circle
                        cx={region.svgPathCoords.cx}
                        cy={region.svgPathCoords.cy}
                        r={region.svgPathCoords.r}
                        fill={region.accentColor}
                        fillOpacity="0.22"
                        className="animate-pulse"
                      />
                    )}

                    {/* Regional Node Marker */}
                    <circle
                      cx={region.svgPathCoords.cx}
                      cy={region.svgPathCoords.cy}
                      r={isHighlighted ? 12 : 8}
                      fill={isHighlighted ? "#E5A93C" : "#222"}
                      stroke={region.accentColor}
                      strokeWidth={isHighlighted ? "3" : "2"}
                      className="transition-all duration-300"
                    />

                    {/* Inner Jewel */}
                    <circle
                      cx={region.svgPathCoords.cx}
                      cy={region.svgPathCoords.cy}
                      r={isHighlighted ? 4 : 2.5}
                      fill={isHighlighted ? "#C8102E" : "#FFF"}
                    />

                    {/* Regional Label */}
                    <text
                      x={region.svgPathCoords.cx}
                      y={region.svgPathCoords.cy + (region.id === "kalyana" ? -18 : 22)}
                      textAnchor="middle"
                      fill={isHighlighted ? "#FFF" : "#AAA"}
                      fontSize={isHighlighted ? "11" : "9.5"}
                      fontWeight={isHighlighted ? "bold" : "normal"}
                      fontFamily="Noto Sans Kannada, sans-serif"
                    >
                      {region.kannadaName.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-start gap-2 max-w-[340px] mt-4 p-3 rounded-xl bg-neutral-900/60 border border-white/5 text-[11px] text-neutral-400 font-sans">
            <Info className="w-4 h-4 text-amber-400/80 flex-shrink-0 mt-0.5" />
            <span>
              <strong>ಗಮನಿಸಿ (Linguistic Note):</strong> ಕನ್ನಡದ ಪ್ರಾದೇಶಿಕ ಉಪಭಾಷೆಗಳು ಆಡಳಿತಾತ್ಮಕ ಜಿಲ್ಲಾ ಗಡಿಗಳಿಗಿಂತ ಸಾಂಸ್ಕೃತಿಕವಾಗಿ ವಿಸ್ತಾರವಾಗಿವೆ. ಇದು ಸಾಂಕೇತಿಕ ದೃಶ್ಯ ನಕ್ಷೆಯಾಗಿದೆ.
            </span>
          </div>
        </div>

        {/* Right: Regional Spotlight & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {activeRegion && (
            <div className="space-y-5">
              {/* Regional Title Banner */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeRegion.districts}</span>
                  </span>

                  <span className="text-xs text-neutral-400 font-mono">
                    {activeRegion.sampleWordsCount} ಮಾದರಿ ಪದಗಳು (Sample Words)
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-black text-white font-kannada">
                  {activeRegion.kannadaName}
                </h4>
                <p className="text-xs font-semibold tracking-wider text-amber-200/70 uppercase">
                  {activeRegion.englishName}
                </p>

                <p className="text-xs sm:text-sm text-neutral-300 font-kannada leading-relaxed italic">
                  "{activeRegion.tagline}"
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 font-kannada leading-relaxed">
                {activeRegion.description}
              </p>

              {/* Tonal Nuance and Famous Catchphrase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold text-amber-300 font-kannada flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>ಧ್ವನಿ ಲಯ (Tonal Cadence)</span>
                  </span>
                  <p className="text-xs text-neutral-300 font-kannada leading-relaxed">
                    {activeRegion.tonalNuance}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-neutral-900/90 to-red-600/10 border border-amber-500/30 space-y-1.5">
                  <span className="text-xs font-bold text-amber-300 font-kannada flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-amber-400" />
                    <span>ವಿಶಿಷ್ಟ ಆಡುನುಡಿ (Catchphrase)</span>
                  </span>
                  <p className="text-sm font-bold text-white font-kannada">
                    "{activeRegion.famousPhrase}"
                  </p>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    {activeRegion.phraseMeaning}
                  </p>
                </div>
              </div>

              {/* Linguistic Characteristics */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-neutral-300 font-kannada block">
                  ಭಾಷಿಕ ವೈಶಿಷ್ಟ್ಯಗಳು (Linguistic Markers):
                </span>
                <div className="space-y-1.5">
                  {activeRegion.characteristics.map((char, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-amber-100/90 font-kannada"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button to jump to vocabulary for this region */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onExploreWordsForRegion(activeRegion.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <span>ಈ ಪ್ರಾಂತ್ಯದ ಪದಕೋಶ ನೋಡಿ (Explore Vocabulary)</span>
                  <ChevronRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
