export type DialectRegionId =
  | "uttara"
  | "karavali"
  | "mysuru"
  | "malenadu"
  | "kalyana"
  | "bengaluru";

export interface DialectRegion {
  id: DialectRegionId;
  kannadaName: string;
  englishName: string;
  districts: string;
  tagline: string;
  description: string;
  characteristics: string[];
  tonalNuance: string;
  famousPhrase: string;
  phraseMeaning: string;
  sampleWordsCount: number;
  svgPathCoords: { cx: number; cy: number; r: number };
  accentColor: string;
}

export interface VocabularyEntry {
  id: string;
  word: string;
  transliteration: string;
  englishMeaning: string;
  kannadaMeaning: string;
  regionId: DialectRegionId;
  regionName: string;
  category: "daily" | "affection" | "food" | "slang" | "nature";
  categoryLabel: string;
  exampleSentence: string;
  exampleTranslation: string;
  phoneticGuide: string;
  hasVerifiedAudio: boolean;
  audioFile?: string;
}
