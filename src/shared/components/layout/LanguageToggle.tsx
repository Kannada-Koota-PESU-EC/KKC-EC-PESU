import { useLanguage } from '@/shared/i18n/useLanguage';
import type { Language } from '@/shared/i18n/translations';

const options: { value: Language; label: string }[] = [
  { value: 'kn', label: 'ಕನ್ನಡ' },
  { value: 'en', label: 'English' },
];

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t('lang.groupLabel')} data-lang={lang} className={`lang-toggle ${className}`}>
      {/* Yellow knob slides under the selected option */}
      <span className="lang-toggle-knob" aria-hidden="true" />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.value}
          aria-pressed={lang === option.value}
          onClick={() => setLang(option.value)}
          className={option.value === 'kn' ? 'kannada-text' : ''}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
