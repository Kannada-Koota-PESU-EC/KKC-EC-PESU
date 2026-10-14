import { Linkedin, Instagram, Github, ExternalLink } from 'lucide-react';
import { Member } from '@/features/team/data/team';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { splitBilingual } from '@/shared/i18n/translations';
import './team-cards.css';

interface TeamCardProps {
  member: Member;
}

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'linkedin':
      return <Linkedin className="h-3.5 w-3.5" />;
    case 'instagram':
      return <Instagram className="h-3.5 w-3.5" />;
    case 'github':
      return <Github className="h-3.5 w-3.5" />;
    default:
      return <ExternalLink className="h-3.5 w-3.5" />;
  }
};

export default function TeamCard({ member }: TeamCardProps) {
  const { lang, t, l } = useLanguage();
  // Team data is written as "ಕನ್ನಡ / English"; show only the current language
  const name = l(splitBilingual(member.name));
  const role = t(`role.${member.role}` as const);
  const domain = member.domain ? l(splitBilingual(member.domain)) : undefined;

  const socialLinks = [
    { platform: 'linkedin', url: member.linkedin },
    { platform: 'instagram', url: member.instagram },
    { platform: 'github', url: member.github }
  ].filter(social => social.url);

  return (
    <article className="team-card">
      <img
        src={member.photo}
        alt={`${name} - ${role}`}
        className="team-card-photo"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder.svg';
        }}
      />

      <div className={`team-card-overlay ${socialLinks.length > 0 ? 'pr-20' : ''}`}>
        <h3
          className={`font-bold text-white text-base sm:text-lg leading-snug break-words ${
            lang === 'kn' ? 'kannada-text' : 'font-sans'
          }`}
        >
          {name}
        </h3>
        {/* Domain heads show their domain; the group heading already says "Domain Heads" */}
        <p className={`mt-0.5 text-xs sm:text-sm font-medium text-yellow-400 leading-snug break-words ${lang === 'kn' ? 'kannada-text' : ''}`}>
          {domain ?? role}
        </p>
      </div>

      {socialLinks.length > 0 && (
        <div className="team-card-socials">
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card-social"
              aria-label={t('team.socialProfile', { name, platform: social.platform })}
            >
              {getSocialIcon(social.platform)}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
