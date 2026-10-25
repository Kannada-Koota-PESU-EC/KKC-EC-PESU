import { FileText, Trash2, Edit3, Eye, Clock, Sparkles } from "lucide-react";
import type { LiteraryDraft, LiteraryWork } from "./types";

interface SahityaDraftsProps {
  drafts: LiteraryDraft[];
  onEditDraft: (draft: LiteraryDraft) => void;
  onPreviewWork: (work: LiteraryWork) => void;
  onDeleteDraft: (id: string) => void;
  onCreateNew: () => void;
}

export default function SahityaDrafts({
  drafts,
  onEditDraft,
  onPreviewWork,
  onDeleteDraft,
  onCreateNew,
}: SahityaDraftsProps) {
  if (drafts.length === 0) {
    return (
      <div className="w-full rounded-3xl bg-neutral-900/60 border border-white/10 p-8 sm:p-12 text-center text-neutral-400">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <FileText className="w-7 h-7" />
        </div>
        <h4 className="text-lg sm:text-xl font-bold text-white font-kannada mb-1">
          ಯಾವುದೇ ಕರಡುಗಳು ಇಲ್ಲ (No Saved Drafts Yet)
        </h4>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mb-6">
          ನೀವು ಬರೆದ ಕವನ ಅಥವಾ ಕಥೆಗಳನ್ನು 'ಬರಹ ಕಣ್ವ'ದಲ್ಲಿ ರಚಿಸಿ, ಸ್ಥಳೀಯವಾಗಿ ಕರಡು ರೂಪದಲ್ಲಿ ಇಲ್ಲಿ ಉಳಿಸಿಕೊಳ್ಳಬಹುದು.
        </p>
        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
        >
          <Edit3 className="w-4 h-4" />
          <span>ಹೊಸ ಬರಹ ಪ್ರಾರಂಭಿಸಿ (Start Writing)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white font-kannada">
            ಉಳಿಸಲಾದ ಕರಡುಗಳು ({drafts.length})
          </span>
          <span className="text-xs text-neutral-400 font-sans">
            · Local drafts on this device
          </span>
        </div>

        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>ಹೊಸ ಬರಹ (New)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drafts.map((draft) => {
          const formattedDate = new Date(draft.updatedAt).toLocaleDateString("kn-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={draft.id}
              className="relative rounded-2xl bg-[#141419]/90 hover:bg-[#181820]/90 border border-white/10 hover:border-amber-500/30 p-5 transition-all shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
                    {draft.categoryLabel}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    {formattedDate}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white font-kannada leading-snug mb-1 group-hover:text-amber-200 transition-colors">
                  {draft.title}
                </h4>

                {draft.authorName && (
                  <p className="text-xs text-neutral-400 font-sans mb-3">
                    ಲೇಖಕರು: {draft.authorName}
                  </p>
                )}

                <p className="text-xs text-neutral-300 font-kannada line-clamp-2 leading-relaxed mb-4">
                  {draft.content}
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="text-[11px] text-neutral-500 font-mono">
                  {draft.charCount} ಅಕ್ಷರಗಳು · {draft.wordCount} ಪದಗಳು
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onPreviewWork({
                        id: draft.id,
                        title: draft.title,
                        kannadaTitle: draft.title,
                        englishTitle: "Saved Draft · ಕರಡು",
                        category: draft.category,
                        categoryLabel: draft.categoryLabel,
                        excerpt: draft.content.slice(0, 100),
                        content: draft.content.split("\n"),
                        readTime: `${Math.max(1, Math.ceil(draft.wordCount / 100))} ನಿಮಿಷ ವಾಚನ`,
                        isSample: false,
                        authorLabel: `ಲೇಖಕರು: ${draft.authorName}`,
                      })
                    }
                    title="ಮುನ್ನೋಟ (Preview)"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEditDraft(draft)}
                    title="ತಿದ್ದುಪಡಿ ಮಾಡಿ (Edit in Canvas)"
                    className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`'${draft.title}' ಕರಡನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?`)) {
                        onDeleteDraft(draft.id);
                      }
                    }}
                    title="ಅಳಿಸಿ (Delete)"
                    className="p-1.5 rounded-lg hover:bg-red-950/40 text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
