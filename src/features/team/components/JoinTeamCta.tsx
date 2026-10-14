import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useInView } from '@/shared/hooks/use-in-view';
import './join-cta.css';

/** "Interested in joining our team?" band at the bottom of the Team page. */
export default function JoinTeamCta() {
  const { lang, t } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>();
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  return (
    <section className="join-cta">
      <div className="join-cta-bg" aria-hidden="true" />
      <div ref={ref} className={`join-cta-card ${inView ? 'is-visible' : ''}`}>
        <h2 className={`join-cta-title ${kannadaFont}`}>{t('team.joinTitle')}</h2>
        <p className="mt-4 text-base sm:text-lg text-[#ece7dc] leading-relaxed">{t('team.joinBody')}</p>
        <Link to="/contact" className={`join-cta-button ${kannadaFont}`}>
          {t('team.contactUs')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
