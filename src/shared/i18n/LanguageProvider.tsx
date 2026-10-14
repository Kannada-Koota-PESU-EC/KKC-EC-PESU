import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LanguageContext } from './language-context';
import { translations, type Language, type Localized, type TranslationKey } from './translations';

const STORAGE_KEY = 'kk-language';
const DEFAULT_LANGUAGE: Language = 'kn';

const readStoredLanguage = (): Language => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'kn' ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

interface LanguageProviderProps {
  children: ReactNode;
  /** Overrides the saved choice (used in tests) */
  initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>(() => initialLanguage ?? readStoredLanguage());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage unavailable (private mode etc.); the choice just won't persist
    }
    document.documentElement.lang = lang;
    document.title = translations['site.title'][lang];
  }, [lang]);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      let text: string = translations[key][lang];
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.split(`{${name}}`).join(String(value));
        }
      }
      return text;
    },
    [lang],
  );

  const l = useCallback((text: Localized) => text[lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, t, l }), [lang, t, l]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
