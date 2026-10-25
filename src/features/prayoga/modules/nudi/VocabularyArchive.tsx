import { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MapPin,
  Sparkles,
  Info,
  X,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Clock,
} from "lucide-react";
import type { DialectRegionId, VocabularyEntry } from "./types";
import { VOCABULARY_ARCHIVE, DIALECT_REGIONS } from "./dialectData";

interface VocabularyArchiveProps {
  initialRegionFilter?: DialectRegionId | null;
}

export default function VocabularyArchive({
  initialRegionFilter,
}: VocabularyArchiveProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<DialectRegionId | "all">(
    initialRegionFilter || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeWordDetail, setActiveWordDetail] =
    useState<VocabularyEntry | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);

  // Filter vocabulary entries
  const filteredEntries = VOCABULARY_ARCHIVE.filter((item) => {
    const matchesRegion =
      selectedRegion === "all" || item.regionId === selectedRegion;
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kannadaMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exampleSentence.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRegion && matchesCategory && matchesSearch;
  });

  // Close modal on Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeWordDetail) {
        setActiveWordDetail(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeWordDetail]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
        audioInstanceRef.current = null;
      }
    };
  }, []);

  // Actual verified audio playback handler
  const handlePlayAudio = (entry: VocabularyEntry) => {
    if (!entry.hasVerifiedAudio || !entry.audioFile) {
      return;
    }

    if (playingAudioId === entry.id) {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
        audioInstanceRef.current = null;
      }
      setPlayingAudioId(null);
      return;
    }

    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current = null;
    }

    const audio = new Audio(entry.audioFile);
    audioInstanceRef.current = audio;
    setPlayingAudioId(entry.id);

    audio.onended = () => {
      setPlayingAudioId(null);
      audioInstanceRef.current = null;
    };
    audio.onerror = () => {
      setPlayingAudioId(null);
      audioInstanceRef.current = null;
    };

    audio.play().catch(() => {
      setPlayingAudioId(null);
      audioInstanceRef.current = null;
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Search and Filters Hub */}
      <div className="rounded-3xl bg-[#16161D]/90 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ಕನ್ನಡ ಪದ, ಇಂಗ್ಲಿಷ್ ಅರ್ಥ ಅಥವಾ ವಾಕ್ಯ ಹುಡುಕಿ... (Search word or meaning)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-900/90 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 text-white font-kannada text-sm sm:text-base placeholder:text-neutral-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Region Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-xs text-neutral-400 font-bold font-kannada flex-shrink-0 flex items-center gap-1 mr-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>ಪ್ರಾಂತ್ಯ:</span>
            </span>

            <button
              type="button"
              onClick={() => setSelectedRegion("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedRegion === "all"
                  ? "bg-amber-500 text-black border-amber-400 shadow-sm"
                  : "bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              ಎಲ್ಲಾ ಪ್ರಾಂತ್ಯಗಳು (All Regions)
            </button>

            {DIALECT_REGIONS.map((r) => {
              const isSelected = selectedRegion === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRegion(r.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm"
                      : "bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span className="font-kannada">{r.kannadaName.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      {filteredEntries.length === 0 ? (
        <div className="rounded-3xl bg-neutral-900/60 border border-white/10 p-12 text-center text-neutral-400">
          <BookOpen className="w-8 h-8 text-amber-400/60 mx-auto mb-3" />
          <h4 className="text-base sm:text-lg font-bold text-white font-kannada mb-1">
            ಯಾವುದೇ ಪದಗಳು ದೊರೆತಿಲ್ಲ (No words match your search)
          </h4>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
            ಬೇರೆ ಪ್ರಾಂತ್ಯ ಅಥವಾ ಕಾಗುಣಿತವನ್ನು ಬಳಸಿ ಪ್ರಯತ್ನಿಸಿ.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion("all");
              setSelectedCategory("all");
            }}
            className="text-xs text-amber-400 hover:underline"
          >
            ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ (Clear All Filters)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="group relative rounded-3xl bg-gradient-to-b from-[#16161D]/90 via-[#131318]/90 to-[#0F0F13]/90 hover:from-[#1A1A22]/90 hover:to-[#121217]/90 border border-white/10 hover:border-amber-500/40 p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Top Badge: Region & Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-kannada">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{entry.regionName}</span>
                  </span>

                  <span className="text-[10px] text-neutral-400 bg-neutral-900/80 px-2 py-0.5 rounded-full border border-white/5 font-kannada">
                    {entry.categoryLabel}
                  </span>
                </div>

                {/* Main Word Header */}
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-white font-kannada group-hover:text-amber-200 transition-colors">
                      {entry.word}
                    </h4>
                    <p className="text-xs text-amber-200/70 font-mono tracking-wide mt-0.5">
                      [{entry.phoneticGuide}] · {entry.transliteration}
                    </p>
                  </div>

                  {/* Authentic Audio Player or Clearly Disabled State */}
                  {entry.hasVerifiedAudio && entry.audioFile ? (
                    <button
                      type="button"
                      title="ಪ್ರಾದೇಶಿಕ ಧ್ವನಿಮುದ್ರಿಕೆ ಆಲಿಸಿ (Play Dialect Recording)"
                      onClick={() => handlePlayAudio(entry)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        playingAudioId === entry.id
                          ? "bg-amber-400 text-black scale-105 shadow-lg"
                          : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {playingAudioId === entry.id ? (
                        <Pause className="w-4 h-4 text-black animate-pulse" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  ) : (
                    <div
                      title="ಅಧಿಕೃತ ಧ್ವನಿಮುದ್ರಿಕೆ ಇನ್ನೂ ದಾಖಲಾಗಿಲ್ಲ (Authentic recording not yet available)"
                      className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.03] text-neutral-600 border border-white/5 cursor-not-allowed select-none"
                      aria-label="ಧ್ವನಿಮುದ್ರಿಕೆ ಅಲಭ್ಯ (Recording unavailable)"
                    >
                      <VolumeX className="w-4 h-4 text-neutral-600" />
                    </div>
                  )}
                </div>

                {/* Meanings */}
                <div className="space-y-1 my-3 text-xs sm:text-sm">
                  <p className="text-white font-semibold font-sans">
                    {entry.englishMeaning}
                  </p>
                  <p className="text-neutral-300 font-kannada">
                    ಅರ್ಥ: {entry.kannadaMeaning}
                  </p>
                </div>

                {/* Example in Context */}
                <div className="p-3 rounded-2xl bg-neutral-900/80 border border-white/5 space-y-1">
                  <div className="text-[11px] font-bold text-amber-300/80 font-kannada flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>ಬಳಕೆಯ ಉದಾಹರಣೆ (Usage Example):</span>
                  </div>
                  <p className="text-xs text-amber-100 font-kannada leading-relaxed italic">
                    "{entry.exampleSentence}"
                  </p>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    {entry.exampleTranslation}
                  </p>
                </div>
              </div>

              {/* Card Footer: Detail View Trigger */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 font-sans">
                  {entry.hasVerifiedAudio && entry.audioFile ? (
                    <span className="text-emerald-400/90 font-medium">✓ ಅಧಿಕೃತ ಧ್ವನಿ ಮುದ್ರಿಕೆ ಲಭ್ಯವಿದೆ</span>
                  ) : (
                    <span className="text-neutral-500">ಧ್ವನಿಮುದ್ರಿಕೆ ಅಲಭ್ಯ · ದಾಖಲಾತಿ ಸಂಗ್ರಹಣೆಯಲ್ಲಿದೆ</span>
                  )}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveWordDetail(entry)}
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold group/btn focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                >
                  <span>ವಿವರ ನೋಡಿ (Details)</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Field Recordings Disclaimer Banner */}
      <div className="p-4 rounded-3xl bg-neutral-900/70 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>ಪ್ರಾಮಾಣಿಕ ಭಾಷಾ ದಾಖಲಾತಿ (Authentic Dialect Archiving):</strong> ಕೃತಕ ಶಬ್ದಗಳನ್ನು ಸೃಷ್ಟಿಸದೆ, ಆಯಾ ಪ್ರಾಂತ್ಯಗಳ ಸ್ಥಳೀಯ ಭಾಷಿಕರೊಂದಿಗೆ ನೈಜ ಧ್ವನಿಮುದ್ರಿಕೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುತ್ತಿದೆ. ಅಧಿಕೃತ ಧ್ವನಿಮುದ್ರಿಕೆ ಲಭ್ಯವಿಲ್ಲದ ಪದಗಳಿಗೆ 'ಧ್ವನಿಮುದ್ರಿಕೆ ಅಲಭ್ಯ' ಎಂದು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ.
          </p>
        </div>
      </div>

      {/* ── Word Detail Modal ── */}
      {activeWordDetail && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="word-detail-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveWordDetail(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
        >
          <div className="relative w-full max-w-xl my-auto rounded-3xl bg-gradient-to-b from-[#181822] via-[#13131A] to-[#0E0E14] border border-amber-500/35 p-6 sm:p-8 shadow-2xl text-[#F5EEDB]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="text-xs font-semibold text-amber-300 font-kannada">
                ಪದಕೋಶ ವಿವರ · Word Profile
              </span>
              <button
                type="button"
                onClick={() => setActiveWordDetail(null)}
                aria-label="Close word details"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold font-kannada">
                  {activeWordDetail.regionName}
                </span>
                <h3
                  id="word-detail-title"
                  className="text-3xl sm:text-4xl font-black text-white font-kannada mt-2"
                >
                  {activeWordDetail.word}
                </h3>
                <p className="text-xs font-mono text-amber-200/70">
                  [{activeWordDetail.phoneticGuide}] · {activeWordDetail.transliteration}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-2">
                <p className="text-sm font-bold text-white font-sans">
                  {activeWordDetail.englishMeaning}
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 font-kannada">
                  ಕನ್ನಡ ವಿವರಣೆ: {activeWordDetail.kannadaMeaning}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-neutral-900/90 to-red-600/10 border border-amber-500/30 space-y-1.5">
                <span className="text-xs font-bold text-amber-300 font-kannada">
                  ಪ್ರಾಯೋಗಿಕ ಸಂಭಾಷಣೆ (In Conversation):
                </span>
                <p className="text-sm text-amber-100 font-kannada leading-relaxed italic">
                  "{activeWordDetail.exampleSentence}"
                </p>
                <p className="text-xs text-neutral-400 font-sans">
                  {activeWordDetail.exampleTranslation}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-neutral-400">
                <span>ವಿಭಾಗ: {activeWordDetail.categoryLabel}</span>
                {activeWordDetail.hasVerifiedAudio && activeWordDetail.audioFile ? (
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(activeWordDetail)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    {playingAudioId === activeWordDetail.id ? (
                      <Pause className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    )}
                    <span>
                      {playingAudioId === activeWordDetail.id ? "ನಿಲ್ಲಿಸಿ (Pause)" : "ಧ್ವನಿ ಆಲಿಸಿ (Play Recording)"}
                    </span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5 text-neutral-400 text-xs select-none">
                    <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                    <span>ಧ್ವನಿಮುದ್ರಿಕೆ ಅಲಭ್ಯ (Recording unavailable)</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
