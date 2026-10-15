import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useInView } from '@/shared/hooks/use-in-view';
import PageHeader from '@/shared/components/layout/PageHeader';
import ContactInfoTiles from '@/features/contact/components/ContactInfoTiles';
import ContactForm from '@/features/contact/components/ContactForm';
import { MAP_EMBED_URL, MAP_LINK_URL } from '@/features/contact/data/contact';
import '@/features/contact/components/contact.css';

export default function Contact() {
  const { lang, t } = useLanguage();
  const columns = useInView<HTMLDivElement>(0.1);
  const map = useInView<HTMLDivElement>(0.15);
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  return (
    <div className="min-h-screen">
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <section className="mx-auto max-w-[1100px] px-4 pt-8 pb-20">
        {/* Info tiles (40%) and form (60%); stacked on mobile */}
        <div
          ref={columns.ref}
          className={`grid items-stretch gap-6 lg:grid-cols-[2fr_3fr] ${columns.inView ? 'is-visible' : ''}`}
        >
          <ContactInfoTiles />
          <ContactForm />
        </div>

        {/* Map */}
        <div ref={map.ref} className={`contact-map contact-reveal-up mt-6 ${map.inView ? 'is-visible' : ''}`}>
          <iframe
            src={MAP_EMBED_URL}
            title={t('contact.mapTitle')}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={MAP_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3.5 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/85 ${kannadaFont}`}
          >
            {t('contact.openMaps')}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
