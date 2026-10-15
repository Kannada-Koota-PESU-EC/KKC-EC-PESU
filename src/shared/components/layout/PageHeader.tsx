import { useEffect, useRef } from 'react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import './page-header.css';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  /** Extra-large title (e.g. the 404 page) */
  large?: boolean;
}

const PARALLAX_FACTOR = 0.25;

/** Shared header banner for inner pages (Events, Blogs, Team, Contact). */
export default function PageHeader({ title, subtitle, large = false }: PageHeaderProps) {
  const { lang, t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);

  // Gentle parallax on the watermark while scrolling
  useEffect(() => {
    const header = headerRef.current;
    if (!header || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        header.style.setProperty('--ph-parallax', `${window.scrollY * PARALLAX_FACTOR}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  return (
    <header ref={headerRef} className="page-header">
      <div className="page-header-bg" aria-hidden="true">
        <div className="page-header-pattern" />
        <span className="page-header-watermark">ಕ</span>
      </div>

      <div className="page-header-content">
        <p className={`page-header-eyebrow ${kannadaFont}`}>{t('header.eyebrow')}</p>
        <h1 className={`page-header-title ${large ? 'page-header-title-xl' : ''} ${kannadaFont}`}>{title}</h1>
        <div className="page-header-divider" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="page-header-subtitle">{subtitle}</p>
      </div>
    </header>
  );
}
