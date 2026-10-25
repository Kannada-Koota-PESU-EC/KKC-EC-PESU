import { Feather, Palette, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CulturalSection = "sahitya" | "ranga" | "nudi";

export interface SectionMeta {
  id: CulturalSection;
  index: string;
  kannadaTitle: string;
  englishTitle: string;
  tagline: string;
  badge: string;
  description: string;
  icon: LucideIcon;
}

export const CULTURAL_SECTIONS: SectionMeta[] = [
  {
    id: "sahitya",
    index: "೦೧",
    kannadaTitle: "ಸಾಹಿತ್ಯ ವೇದಿಕೆ",
    englishTitle: "Poetry & Literature Canvas",
    tagline: "ವಚನ, ಭಾವಗೀತೆ ಹಾಗೂ ಶ್ರೇಷ್ಠ ಕಾವ್ಯಗಳ ಜೀವಂತ ಸಂವಾದ",
    badge: "ಸಾಹಿತ್ಯ & ಕಾವ್ಯ",
    description:
      "An evocative digital space honoring 12th-century classical Vachanas of Basavanna, the timeless lyrical meters of Kuvempu & Bendre, and modern Kannada poetic expressions.",
    icon: Feather,
  },
  {
    id: "ranga",
    index: "೦೨",
    kannadaTitle: "ರಂಗ-ಚಿತ್ತಾರ",
    englishTitle: "Interactive Folk & Art Studio",
    tagline: "ಯಕ್ಷಗಾನ ವೇಷಭೂಷಣ ಮತ್ತು ಮಲೆನಾಡಿನ ಪವಿತ್ರ ಹಸೆ-ಚಿತ್ತಾರ ಕಲೆ",
    badge: "ಜಾನಪದ & ರಂಗಕಲೆ",
    description:
      "A spatial studio celebrating the monumental Kireeta, facial Mukhavarnike, and sacred ornaments of Yakshagana alongside Deevaru tribal wall-art Chittara patterns.",
    icon: Palette,
  },
  {
    id: "nudi",
    index: "೦೩",
    kannadaTitle: "ನುಡಿ-ಬೆಳಕು",
    englishTitle: "Linguistic & Dialect Archive",
    tagline: "ಉತ್ತರ ಕರ್ನಾಟಕ, ಕರಾವಳಿ, ಮೈಸೂರು & ಬೆಂಗಳೂರು ಉಪಭಾಷಾ ವೈವಿಧ್ಯ",
    badge: "ಭಾಷಾ ಶಾಸ್ತ್ರ & ಉಪಭಾಷೆ",
    description:
      "An archival journey exploring Karnataka's living colloquial dialects, rare desi idioms, historical inscriptional heritage, and campus folklore proverbs.",
    icon: Languages,
  },
];
