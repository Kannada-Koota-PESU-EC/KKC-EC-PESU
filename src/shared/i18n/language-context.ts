import { createContext } from 'react';
import type { Language, Localized, TranslationKey } from './translations';

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** UI string by key, with {placeholders} filled from vars */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  /** Picks the current language from a { kn, en } value */
  l: (text: Localized) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
