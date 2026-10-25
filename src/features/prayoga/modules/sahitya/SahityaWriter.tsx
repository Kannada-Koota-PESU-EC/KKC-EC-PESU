import { useState, useId } from "react";
import { Edit3, Eye, Save, Trash2, CheckCircle2, AlertCircle, Sparkles, Info } from "lucide-react";
import type { LiteraryDraft, LiteraryWork } from "./types";

interface SahityaWriterProps {
  initialDraft?: LiteraryDraft | null;
  onSaveDraft: (draft: LiteraryDraft) => void;
  onPreviewWork: (work: LiteraryWork) => void;
}

const CATEGORY_OPTIONS: { id: "kavana" | "kathe" | "prabandha" | "mukta"; label: string }[] = [
  { id: "kavana", label: "ಕವನಗಳು (Poetry)" },
  { id: "kathe", label: "ಸಣ್ಣ ಕಥೆಗಳು (Short Stories)" },
  { id: "prabandha", label: "ಪ್ರಬಂಧಗಳು (Essays)" },
  { id: "mukta", label: "ಮುಕ್ತ ಬರಹ (Creative Writing)" },
];

export default function SahityaWriter({
  initialDraft,
  onSaveDraft,
  onPreviewWork,
}: SahityaWriterProps) {
  const titleId = useId();
  const categoryId = useId();
  const authorId = useId();
  const contentId = useId();

  const [title, setTitle] = useState(initialDraft?.title || "");
  const [category, setCategory] = useState<"kavana" | "kathe" | "prabandha" | "mukta">(
    initialDraft?.category || "kavana"
  );
  const [authorName, setAuthorName] = useState(initialDraft?.authorName || "");
  const [content, setContent] = useState(initialDraft?.content || "");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Character and word counts
  const charCount = content.length;
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      setFeedback({
        type: "error",
        message: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬರಹಕ್ಕೆ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ (Please enter a title for your writing).",
      });
      return;
    }

    if (content.trim() === "") {
      setFeedback({
        type: "error",
        message: "ದಯವಿಟ್ಟು ಸಾಹಿತ್ಯ ವಿಷಯವನ್ನು ಬರೆಯಿರಿ (Please enter your literary writing content).",
      });
      return;
    }

    const categoryObj = CATEGORY_OPTIONS.find((c) => c.id === category);
    const draft: LiteraryDraft = {
      id: initialDraft?.id || `draft-${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: categoryObj ? categoryObj.label.split(" ")[0] : "ಕವನ",
      authorName: authorName.trim() || "ಅನಾಮಿಕ ಕವಿ / ಲೇಖಕ",
      content: content.trim(),
      charCount,
      wordCount,
      updatedAt: Date.now(),
    };

    onSaveDraft(draft);
    setFeedback({
      type: "success",
      message: "ನಿಮ್ಮ ಕರಡು ಯಶಸ್ವಿಯಾಗಿ ಸ್ಥಳೀಯವಾಗಿ ಸಂಗ್ರಹವಾಗಿದೆ! (Draft saved locally in your browser)",
    });

    // Clear feedback after 4 seconds
    setTimeout(() => {
      setFeedback((prev) => (prev?.type === "success" ? null : prev));
    }, 4000);
  };

  const handlePreview = () => {
    if (content.trim() === "") {
      setFeedback({
        type: "error",
        message: "ಮುನ್ನೋಟ ನೋಡಲು ಕನಿಷ್ಠ ಒಂದು ಸಾಲಿನ ವಿಷಯವನ್ನು ಬರೆಯಿರಿ (Write content before previewing).",
      });
      return;
    }

    const categoryObj = CATEGORY_OPTIONS.find((c) => c.id === category);
    const previewWork: LiteraryWork = {
      id: "preview-temp",
      title: title.trim() || "ಅನಾಮಧೇಯ ಕೃತಿ (Untitled)",
      kannadaTitle: title.trim() || "ಅನಾಮಧೇಯ ಕೃತಿ",
      englishTitle: "Live Preview · ಮುನ್ನೋಟ",
      category,
      categoryLabel: categoryObj ? categoryObj.label.split(" ")[0] : "ಕವನ",
      excerpt: content.slice(0, 100) + "...",
      content: content.split("\n"),
      readTime: `${Math.max(1, Math.ceil(wordCount / 100))} ನಿಮಿಷ ವಾಚನ`,
      isSample: false,
      authorLabel: authorName.trim() ? `ಲೇಖಕರು: ${authorName.trim()}` : "ಸ್ವಂತ ರಚನೆ",
    };

    onPreviewWork(previewWork);
  };

  const handleClear = () => {
    if (content.trim() === "" || window.confirm("ಬರೆದ ವಿಷಯವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ? (Clear current canvas?)")) {
      setTitle("");
      setContent("");
      setAuthorName("");
      setFeedback(null);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#16161D]/90 via-[#131317]/90 to-[#0F0F13]/90 border border-amber-500/25 p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Canvas Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>ಬರಹ ಕಣ್ವ · Literary Canvas</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-kannada">
            ನಿಮ್ಮ ಸಾಹಿತ್ಯ ಸೃಷ್ಟಿಸಿ (Compose Your Writing)
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
            ಕನ್ನಡ ಯುನಿಕೋಡ್ ಬೆಂಬಲದೊಂದಿಗೆ ಕವನ, ಕಥೆ ಅಥವಾ ಪ್ರಬಂಧಗಳನ್ನು ರಚಿಸಿ.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-xs font-mono text-amber-200/80 bg-neutral-900/80 px-4 py-2 rounded-xl border border-white/10 self-start sm:self-auto">
          <span>{charCount} ಅಕ್ಷರಗಳು (chars)</span>
          <span className="text-white/20">•</span>
          <span>{wordCount} ಪದಗಳು (words)</span>
        </div>
      </div>

      {/* Inline Feedback Alerts */}
      {feedback && (
        <div
          role="alert"
          className={`flex items-start gap-3 p-4 rounded-2xl mb-6 text-sm font-medium transition-all ${
            feedback.type === "success"
              ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-200"
              : "bg-red-950/60 border border-red-500/40 text-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{feedback.message}</span>
        </div>
      )}

      {/* Writing Form */}
      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Title */}
          <div className="md:col-span-2 space-y-1.5">
            <label htmlFor={titleId} className="block text-xs font-semibold text-amber-200/90 font-kannada">
              ಶೀರ್ಷಿಕೆ (Title) <span className="text-red-400">*</span>
            </label>
            <input
              id={titleId}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ಉದಾಹರಣೆ: ತುಂಗಭದ್ರೆಯ ಸಂಜೆ, ಮಳೆಗಾಲದ ನೆನಪು..."
              className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/10 hover:border-white/20 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 text-white font-kannada placeholder:text-neutral-500 text-sm sm:text-base transition-colors"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label htmlFor={categoryId} className="block text-xs font-semibold text-amber-200/90 font-kannada">
              ವಿಭಾಗ (Category)
            </label>
            <select
              id={categoryId}
              value={category}
              onChange={(e) => setCategory(e.target.value as "kavana" | "kathe" | "prabandha" | "mukta")}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/10 hover:border-white/20 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 text-white font-kannada text-sm sm:text-base transition-colors cursor-pointer"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-neutral-900 text-white">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Optional Pen Name / Author */}
        <div className="space-y-1.5">
          <label htmlFor={authorId} className="block text-xs font-semibold text-neutral-300 font-kannada">
            ಲೇಖಕರ ಹೆಸರು ಅಥವಾ ಕಾವ್ಯನಾಮ (Author / Pen Name - ಐಚ್ಛಿಕ)
          </label>
          <input
            id={authorId}
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="ನಿಮ್ಮ ಹೆಸರು ಅಥವಾ ಕಾವ್ಯನಾಮ (Your Name / Pen name)..."
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/80 border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 text-white font-kannada placeholder:text-neutral-500 text-xs sm:text-sm transition-colors"
          />
        </div>

        {/* Literary Textarea */}
        <div className="space-y-1.5">
          <label htmlFor={contentId} className="block text-xs font-semibold text-amber-200/90 font-kannada">
            ಸಾಹಿತ್ಯ ವಿಷಯ (Literary Content in Kannada) <span className="text-red-400">*</span>
          </label>
          <textarea
            id={contentId}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="ಇಲ್ಲಿ ನಿಮ್ಮ ಕವನ, ಕಥೆ, ಭಾವಗೀತೆ ಅಥವಾ ಅನಿಸಿಕೆಗಳನ್ನು ಕನ್ನಡ ಯುನಿಕೋಡ್‌ನಲ್ಲಿ ಬರೆಯಿರಿ... (Compose your verse, story, or creative prose in Kannada here)..."
            className="w-full px-4 py-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 hover:border-white/20 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 text-white font-kannada text-base sm:text-lg leading-relaxed placeholder:text-neutral-500 transition-colors resize-y custom-scrollbar"
          />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>ಕರಡು ಉಳಿಸಿ (Save Draft)</span>
            </button>

            <button
              type="button"
              onClick={handlePreview}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 hover:text-white font-medium text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>ಮುನ್ನೋಟ (Preview)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-950/30 text-xs transition-colors focus:outline-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>ತೆರವುಗೊಳಿಸಿ (Clear)</span>
          </button>
        </div>

        {/* Local Storage Disclaimer */}
        <div className="flex items-start gap-2 p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 text-[11px] text-neutral-400 font-sans">
          <Info className="w-4 h-4 text-amber-400/70 flex-shrink-0 mt-0.5" />
          <span>
            <strong>ಗಮನಿಸಿ (Note):</strong> ನಿಮ್ಮ ಕರಡುಗಳು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಯುತ್ತವೆ (Drafts are saved locally on this device/browser; no external server or account required).
          </span>
        </div>
      </form>
    </div>
  );
}
