import { useState, useEffect } from "react";
import {
  BookOpen,
  Feather,
  Edit3,
  Sparkles,
  FileText,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Compass,
} from "lucide-react";
import type { LiteraryCategory, LiteraryWork, LiteraryDraft } from "./types";
import { SAMPLE_LITERARY_WORKS } from "./sampleData";
import SahityaReader from "./SahityaReader";
import SahityaWriter from "./SahityaWriter";
import SahityaDrafts from "./SahityaDrafts";

const STORAGE_KEY = "prayoga_sahitya_drafts";

const CATEGORIES: { id: LiteraryCategory; label: string; english: string }[] = [
  { id: "all", label: "ಎಲ್ಲವೂ", english: "All" },
  { id: "kavana", label: "ಕವನಗಳು", english: "Poetry" },
  { id: "kathe", label: "ಸಣ್ಣ ಕಥೆಗಳು", english: "Short Stories" },
  { id: "prabandha", label: "ಪ್ರಬಂಧಗಳು", english: "Essays" },
  { id: "mukta", label: "ಮುಕ್ತ ಬರಹ", english: "Creative Writing" },
];

export default function SahityaModule() {
  const [activeTab, setActiveTab] = useState<"library" | "write" | "drafts">("library");
  const [selectedCategory, setSelectedCategory] = useState<LiteraryCategory>("all");
  const [readingWork, setReadingWork] = useState<LiteraryWork | null>(null);
  const [editingDraft, setEditingDraft] = useState<LiteraryDraft | null>(null);
  const [drafts, setDrafts] = useState<LiteraryDraft[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load saved drafts from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setDrafts(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to read drafts from localStorage:", e);
    }
  }, []);

  // Save drafts to localStorage helper
  const saveDraftsToStorage = (updatedDrafts: LiteraryDraft[]) => {
    setDrafts(updatedDrafts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
    } catch (e) {
      console.warn("Failed to save drafts to localStorage:", e);
    }
  };

  const handleSaveDraft = (draft: LiteraryDraft) => {
    const existingIndex = drafts.findIndex((d) => d.id === draft.id);
    let updated: LiteraryDraft[];
    if (existingIndex >= 0) {
      updated = [...drafts];
      updated[existingIndex] = draft;
    } else {
      updated = [draft, ...drafts];
    }
    saveDraftsToStorage(updated);
    setEditingDraft(null);
  };

  const handleDeleteDraft = (id: string) => {
    const updated = drafts.filter((d) => d.id !== id);
    saveDraftsToStorage(updated);
  };

  const handleEditDraft = (draft: LiteraryDraft) => {
    setEditingDraft(draft);
    setActiveTab("write");
  };

  // Filter works by category and search
  const filteredWorks = SAMPLE_LITERARY_WORKS.filter((work) => {
    const matchesCategory =
      selectedCategory === "all" || work.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      work.kannadaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      id="sahitya-module"
      className="relative z-20 max-w-5xl mx-auto px-4 mt-8 pb-24 animate-in fade-in duration-500"
    >
      {/* ── Literary Landing Area ── */}
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
              <Feather className="w-3.5 h-3.5 text-amber-400" />
              <span>ಸಾಹಿತ್ಯ ವಿಭಾಗ · Classical & Modern Kannada Letters</span>
            </div>

            {/* Required Heading */}
            <h2 className="text-3xl sm:text-5xl font-black text-white font-kannada tracking-tight">
              ಸಾಹಿತ್ಯ ವೇದಿಕೆ
            </h2>

            {/* Required English Descriptor */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-amber-300/80 uppercase">
              Poetry & Literature Canvas
            </p>

            {/* Required Supporting Text */}
            <p className="text-sm sm:text-base text-neutral-300 font-kannada leading-relaxed">
              ಕನ್ನಡ ಕಾವ್ಯ, ಕಥೆ ಮತ್ತು ಸೃಜನಶೀಲ ಅಭಿವ್ಯಕ್ತಿಗೆ ಒಂದು ವೇದಿಕೆ.
            </p>
          </div>

          {/* ── Two Required Primary Actions ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("library");
                const libEl = document.getElementById("sahitya-content-hub");
                if (libEl) libEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>ಕವನಗಳನ್ನು ಓದಿ — Explore Poetry</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("write");
                setEditingDraft(null);
                const writeEl = document.getElementById("sahitya-content-hub");
                if (writeEl) writeEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-amber-500/30 text-amber-200 hover:text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-95 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-amber-400" />
              <span>ನಿಮ್ಮ ಬರಹ ರಚಿಸಿ — Create Your Writing</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Sub-navigation & Mode Tabs ── */}
      <div id="sahitya-content-hub" className="scroll-mt-24 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#141419] border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("library")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "library"
                  ? "bg-amber-500 text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>ವಾಚನಾಲಯ (Explore)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("write");
                setEditingDraft(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "write"
                  ? "bg-amber-500 text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>ಬರಹ ಕಣ್ವ (Write)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("drafts")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "drafts"
                  ? "bg-amber-500 text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>ಕರಡುಗಳು (Drafts)</span>
              {drafts.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-mono">
                  {drafts.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Search inside Library view */}
          {activeTab === "library" && (
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ಕವನ ಅಥವಾ ಕಥೆ ಹುಡುಕಿ..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 focus:border-amber-400 focus:outline-none text-xs text-white placeholder:text-neutral-500 font-kannada"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── VIEW 1: DISCOVERY & READING (Library) ── */}
      {activeTab === "library" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <span className="text-xs text-neutral-500 flex items-center gap-1 flex-shrink-0 mr-1 font-sans">
              <Filter className="w-3.5 h-3.5 text-amber-400/80" />
              <span>ವಿಭಾಗ:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-sm"
                      : "bg-[#141419]/80 border-white/5 text-neutral-400 hover:text-white hover:border-white/15"
                  }`}
                >
                  <span className="font-kannada">{cat.label}</span>
                  <span className="text-[10px] text-neutral-400 ml-1.5">
                    ({cat.english})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Literature Cards Grid */}
          {filteredWorks.length === 0 ? (
            <div className="rounded-2xl bg-neutral-900/60 border border-white/10 p-12 text-center text-neutral-400">
              <p className="font-kannada text-base mb-1">
                ಯಾವುದೇ ಸಾಹಿತ್ಯ ಕೃತಿ ದೊರೆತಿಲ್ಲ (No matching works found).
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs text-amber-400 hover:underline mt-2"
              >
                ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ (Clear filter)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredWorks.map((work) => (
                <div
                  key={work.id}
                  className="group relative rounded-3xl bg-gradient-to-b from-[#16161D]/90 via-[#131318]/90 to-[#0F0F13]/90 hover:from-[#1A1A22]/90 hover:to-[#121217]/90 border border-white/10 hover:border-amber-500/40 p-6 transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
                        <BookOpen className="w-3 h-3 text-amber-400" />
                        <span>{work.categoryLabel}</span>
                      </span>

                      {work.isSample && (
                        <span className="text-[10px] text-neutral-400 bg-neutral-900/80 px-2 py-0.5 rounded-full border border-white/5 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400/80" />
                          <span>ಮಾದರಿ ರಚನೆ (Demo)</span>
                        </span>
                      )}
                    </div>

                    {/* Titles */}
                    <h3 className="text-xl sm:text-2xl font-black text-white font-kannada leading-snug mb-1 group-hover:text-amber-200 transition-colors">
                      {work.kannadaTitle}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans tracking-wide uppercase mb-3">
                      {work.englishTitle}
                    </p>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-neutral-300 font-kannada leading-relaxed line-clamp-3 mb-4">
                      {work.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400/70" />
                      <span>{work.readTime}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setReadingWork(work)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-medium text-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <span>ಸಂಪೂರ್ಣ ಓದಿ (Read)</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── VIEW 2: WRITING CANVAS ── */}
      {activeTab === "write" && (
        <SahityaWriter
          initialDraft={editingDraft}
          onSaveDraft={handleSaveDraft}
          onPreviewWork={(work) => setReadingWork(work)}
        />
      )}

      {/* ── VIEW 3: SAVED DRAFTS ── */}
      {activeTab === "drafts" && (
        <SahityaDrafts
          drafts={drafts}
          onEditDraft={handleEditDraft}
          onPreviewWork={(work) => setReadingWork(work)}
          onDeleteDraft={handleDeleteDraft}
          onCreateNew={() => {
            setEditingDraft(null);
            setActiveTab("write");
          }}
        />
      )}

      {/* ── FOCUSED READING VIEW MODAL ── */}
      {readingWork && (
        <SahityaReader
          work={readingWork}
          onClose={() => setReadingWork(null)}
        />
      )}
    </div>
  );
}
