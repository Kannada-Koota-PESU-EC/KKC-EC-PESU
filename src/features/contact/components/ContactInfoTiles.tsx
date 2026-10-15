import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight, Copy, Instagram, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useToast } from '@/shared/hooks/use-toast';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/shared/lib/social';
import { CONTACT_ADDRESS, CONTACT_EMAIL, MAP_LINK_URL } from '@/features/contact/data/contact';
import './contact.css';

interface TileProps {
  index: number;
  href: string;
  external?: boolean;
  icon: ReactNode;
  iconClassName?: string;
  label: string;
  value: string;
  extra?: ReactNode;
}

function Tile({ index, href, external, icon, iconClassName = '', label, value, extra }: TileProps) {
  const { lang } = useLanguage();
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  return (
    <div
      className="contact-glass contact-glow contact-tile contact-reveal-up flex-1"
      style={{ '--i': index } as CSSProperties}
    >
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <span className={`contact-icon ${iconClassName}`}>{icon}</span>
        <span className="min-w-0">
          <span className={`block text-xs uppercase tracking-wider text-[#9a958a] ${kannadaFont}`}>{label}</span>
          <span className={`block break-words text-sm sm:text-base font-medium text-[#f1ede4] ${kannadaFont}`}>{value}</span>
        </span>
        <ArrowUpRight className="contact-tile-arrow h-4 w-4" aria-hidden="true" />
      </a>
      {extra}
    </div>
  );
}

/** Email, Instagram and location tiles. */
export default function ContactInfoTiles() {
  const { t, l } = useLanguage();
  const { toast } = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      toast({ title: t('contact.copied'), description: CONTACT_EMAIL });
    } catch {
      // Clipboard blocked (e.g. insecure context); the mailto link still works
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Tile
        index={0}
        href={`mailto:${CONTACT_EMAIL}`}
        icon={<Mail className="h-5 w-5" />}
        label={t('contact.email')}
        value={CONTACT_EMAIL}
        extra={
          <button type="button" className="contact-copy" onClick={copyEmail} aria-label={t('contact.copyEmail')} title={t('contact.copyEmail')}>
            <Copy className="h-4 w-4" />
          </button>
        }
      />
      <Tile
        index={1}
        href={INSTAGRAM_URL}
        external
        icon={<Instagram className="h-5 w-5" />}
        iconClassName="contact-icon-instagram"
        label={t('contact.instagram')}
        value={`@${INSTAGRAM_HANDLE}`}
      />
      <Tile
        index={2}
        href={MAP_LINK_URL}
        external
        icon={<MapPin className="h-5 w-5" />}
        label={t('contact.location')}
        value={l(CONTACT_ADDRESS)}
      />
    </div>
  );
}
