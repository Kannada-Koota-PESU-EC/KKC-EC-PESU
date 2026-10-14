import { Link } from 'react-router-dom';
import { ArrowUp, ChevronRight, Instagram, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import type { TranslationKey } from '@/shared/i18n/translations';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/shared/lib/social';
import './footer.css';

const EMAIL = 'kannadakoota.ecc@pes.edu';

const quickLinks: { key: TranslationKey; path: string }[] = [
  { key: 'events.upcoming', path: '/events' },
  { key: 'team.title', path: '/team' },
  { key: 'footer.getInTouch', path: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang, t } = useLanguage();
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';
  const [madeBefore, madeAfter] = t('footer.madeWith').split('{heart}');

  const scrollToTop = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-line" aria-hidden="true" />
      <span className="site-footer-watermark" aria-hidden="true">
        ಕನ್ನಡ
      </span>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="site-footer-logo">
                <img src="/Respectives/KKC1.png" alt={t('brand.logoAlt')} loading="lazy" />
              </span>
              <span className={`font-bold text-lg text-white ${kannadaFont}`}>{t('footer.brand')}</span>
            </div>
            <p className="text-sm leading-relaxed text-[#bdb7aa]">{t('footer.about')}</p>
            <p className="text-sm italic text-[#ffd23f]">{t('brand.tagline')}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className={`site-footer-heading ${kannadaFont}`}>{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="site-footer-link text-sm">
                    <ChevronRight aria-hidden="true" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className={`site-footer-heading ${kannadaFont}`}>{t('nav.contact')}</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center justify-center md:justify-start gap-3 text-sm text-[#bdb7aa] hover:text-[#ffd23f] transition-colors"
              >
                <span className="site-footer-chip">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="break-all">{EMAIL}</span>
              </a>
              <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-[#bdb7aa]">
                <span className="site-footer-chip">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-5">
            <h3 className={`site-footer-heading ${kannadaFont}`}>{t('footer.followUs')}</h3>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-instagram text-sm"
              aria-label={t('footer.instagramLabel')}
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />@{INSTAGRAM_HANDLE}
            </a>
            <p className="text-xs text-[#9a958a]">{t('footer.stayUpdated')}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          id="site-footer-bottom"
          className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center"
        >
          <p className="text-xs text-[#9a958a]">{t('footer.rights', { year: currentYear })}</p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-[#9a958a]">
              {madeBefore}
              <span className="site-footer-heart" role="img" aria-label="love">
                ❤️
              </span>
              {madeAfter}
            </p>
            <button type="button" className="site-footer-top" onClick={scrollToTop} aria-label={t('footer.backToTop')} title={t('footer.backToTop')}>
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
