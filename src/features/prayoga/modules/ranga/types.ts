export interface FolkArtTradition {
  id: string;
  kannadaTitle: string;
  englishTitle: string;
  tagline: string;
  region: string;
  communityContext?: string;
  description: string;
  attire: {
    title: string;
    description: string;
    elements: string[];
  };
  instruments: {
    title: string;
    description: string;
    items: string[];
  };
  performanceStyle: string;
  culturalSignificance: string;
  accentColor: string;
}

export type MotifType = "padma" | "gantu" | "jali" | "surya" | "gopura";

export interface PatternSettings {
  motif: MotifType;
  color: string;
  bgColor: string;
  scale: number;
  repetition: 1 | 2 | 3 | 4;
  strokeWidth: number;
  rotation: number;
}
