import { useEffect } from "react";
import { ArrowLeft, BookOpen, Clock, Sparkles, X } from "lucide-react";
import type { LiteraryWork } from "./types";

interface SahityaReaderProps {
  work: LiteraryWork | null;
  onClose: () => void;
}

export default function SahityaReader({ work, onClose }: SahityaReaderProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!work) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
    >
      <div
        className="relative w-full max-w-3xl my-auto rounded-3xl bg-gradient-to-b from-[#16161D] via-[#121217] to-[#0D0D11] border border-amber-500/30 p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] text-[#F5EEDB]"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-amber-200 text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>ಹಿಂದಕ್ಕೆ · Back to Library</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close reader"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>{work.categoryLabel}</span>
          </span>

          {work.isSample && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-[11px] font-medium">
              <Sparkles className="w-3 h-3 text-amber-400/80" />
              <span>ಮಾದರಿ ರಚನೆ · Sample Demo Content</span>
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-xs text-neutral-400 ml-auto">
            <Clock className="w-3.5 h-3.5 text-amber-400/70" />
            <span>{work.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h2
          id="reader-title"
          className="text-2xl sm:text-4xl font-black text-white font-kannada leading-snug tracking-tight mb-2"
        >
          {work.kannadaTitle}
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/70 font-sans tracking-wide uppercase mb-6">
          {work.englishTitle}
        </p>

        {/* Traditional Manuscript Floral Divider */}
        <div className="flex items-center justify-center gap-3 my-6 text-amber-500/50" aria-hidden="true">
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-amber-500/40" />
          <span className="w-1.5 h-1.5 rotate-45 border border-amber-400 bg-amber-500/50" />
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>

        {/* Reading Body Content */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar font-kannada text-base sm:text-lg text-neutral-200 leading-loose sm:leading-loose">
          {work.content.map((paragraph, index) => {
            if (paragraph.trim() === "") {
              return <div key={index} className="h-3" aria-hidden="true" />;
            }
            return (
              <p
                key={index}
                className={
                  work.category === "kavana"
                    ? "text-center sm:text-center text-amber-50/95"
                    : "text-justify sm:text-left text-neutral-200 text-indent-4"
                }
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Bottom Manuscript Footer */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-sans">
          <span>{work.authorLabel || "ಕನ್ನಡ ಕೂಟ ಸಾಹಿತ್ಯ ವೇದಿಕೆ"}</span>
          <span className="text-amber-400/60 font-kannada">॥ ಶುಭಮಸ್ತು ॥</span>
        </div>
      </div>
    </div>
  );
}
