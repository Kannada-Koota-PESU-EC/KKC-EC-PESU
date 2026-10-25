export type LiteraryCategory = "all" | "kavana" | "kathe" | "prabandha" | "mukta";

export interface LiteraryWork {
  id: string;
  title: string;
  kannadaTitle: string;
  englishTitle: string;
  category: "kavana" | "kathe" | "prabandha" | "mukta";
  categoryLabel: string;
  excerpt: string;
  content: string[]; // Stanzas or paragraphs
  readTime: string;
  isSample: boolean;
  authorLabel?: string;
}

export interface LiteraryDraft {
  id: string;
  title: string;
  category: "kavana" | "kathe" | "prabandha" | "mukta";
  categoryLabel: string;
  authorName: string;
  content: string;
  charCount: number;
  wordCount: number;
  updatedAt: number;
}
