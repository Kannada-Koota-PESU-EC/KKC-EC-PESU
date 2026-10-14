import { useEffect, useRef, useState, type CSSProperties } from 'react';
import TeamCard from '@/features/team/components/TeamCard';
import { Member } from '@/features/team/data/team';
import SectionTitle from '@/shared/components/layout/SectionTitle';
import { useLanguage } from '@/shared/i18n/useLanguage';

interface TeamGroupProps {
  title: string;
  members: Member[];
  /** Slightly larger cards (club heads) */
  large?: boolean;
}

/**
 * One group of the year-wise team (e.g. club heads). Cards fade up one after another
 * when the group scrolls into view; the page remounts it per year so a new year animates in too.
 */
export default function TeamGroup({ title, members, large = false }: TeamGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const group = groupRef.current;
    if (!group || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  if (members.length === 0) return null;

  return (
    <div ref={groupRef} className={`team-group ${isVisible ? 'is-visible' : ''}`}>
      <SectionTitle
        title={title}
        meta={members.length === 1 ? t('team.memberCountOne') : t('team.memberCount', { n: members.length })}
        align="center"
        className="mb-8 md:mb-10"
      />

      <div className={`team-grid ${large ? 'team-grid-large' : ''}`}>
        {members.map((member, index) => (
          <div key={member.id} className="team-card-slot" style={{ '--i': index } as CSSProperties}>
            <TeamCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}
