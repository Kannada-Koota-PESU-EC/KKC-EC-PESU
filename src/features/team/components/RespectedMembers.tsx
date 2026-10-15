import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  getInitials,
  memorialLabel,
  respectedHeading,
  respectedMembers,
  type RespectedMember,
} from '@/features/team/data/respectedMembers';
import './respected-members.css';

// Photo inside a slowly rotating gradient ring (gold for the founder)
function RespectedPhoto({ member, gold = false }: { member: RespectedMember; gold?: boolean }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = member.photo && !failed;

  return (
    <div className={`spin-ring ${gold ? 'spin-ring-gold' : ''}`}>
      <div className="spin-ring-gap">
        {showPhoto ? (
          <img
            src={member.photo}
            alt={member.name}
            className="respected-photo"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="respected-initials" aria-label={member.name}>
            {getInitials(member.name)}
          </span>
        )}
      </div>
    </div>
  );
}

// Laurel branches along the lower half of the founder's photo
const LAUREL_RADIUS = 92;
const laurelLeaves = [
  ...[168, 156, 144, 132, 120, 108].map((angle) => ({ angle, side: -1 })),
  ...[12, 24, 36, 48, 60, 72].map((angle) => ({ angle, side: 1 })),
];

function Laurel() {
  const point = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: 100 + LAUREL_RADIUS * Math.cos(rad), y: 100 + LAUREL_RADIUS * Math.sin(rad) };
  };
  const start = point(172);
  const end = point(8);
  const bottomLeft = point(100);
  const bottomRight = point(80);

  return (
    <svg className="founder-laurel" viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="#d4af37" strokeWidth="0.9" opacity="0.85">
        <path d={`M ${start.x} ${start.y} A ${LAUREL_RADIUS} ${LAUREL_RADIUS} 0 0 0 ${bottomLeft.x} ${bottomLeft.y}`} />
        <path d={`M ${end.x} ${end.y} A ${LAUREL_RADIUS} ${LAUREL_RADIUS} 0 0 1 ${bottomRight.x} ${bottomRight.y}`} />
      </g>
      <g fill="#d4af37" opacity="0.8">
        {laurelLeaves.map(({ angle, side }) => {
          const { x, y } = point(angle);
          // Leaves point along the branch, alternating outward and inward
          const tangent = angle + 90 * side;
          return [12, -12].map((tilt, i) => {
            const offset = i === 0 ? 4 : -4;
            const rad = (angle * Math.PI) / 180;
            return (
              <ellipse
                key={`${angle}-${i}`}
                cx={x + offset * Math.cos(rad)}
                cy={y + offset * Math.sin(rad)}
                rx="5.2"
                ry="2"
                transform={`rotate(${tangent + tilt * side} ${x + offset * Math.cos(rad)} ${y + offset * Math.sin(rad)})`}
              />
            );
          });
        })}
        <circle cx={bottomLeft.x - 2} cy={bottomLeft.y} r="1.6" />
        <circle cx={bottomRight.x + 2} cy={bottomRight.y} r="1.6" />
      </g>
    </svg>
  );
}

/**
 * Always-visible block at the top of the Team page. Not tied to the selected year.
 * The founder (with halo) fades in first, then the honour cards, the first time the block scrolls into view.
 */
export default function RespectedMembers() {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const founder = respectedMembers.find((member) => member.inMemory);
  const others = respectedMembers.filter((member) => member !== founder);

  useEffect(() => {
    const block = blockRef.current;
    if (!block || typeof IntersectionObserver === 'undefined') {
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
    observer.observe(block);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="respected-section pt-8 pb-16 md:pb-24" aria-labelledby="respected-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-14">
          <h2 id="respected-heading" lang="kn" className="kannada-text text-3xl md:text-4xl font-bold text-foreground">
            {respectedHeading.kn}
          </h2>
          <p className="mt-2 text-base md:text-lg text-muted-foreground">{respectedHeading.en}</p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-yellow-400 to-red-600" aria-hidden="true" />
        </div>

        <div ref={blockRef} className={`respected-block ${isVisible ? 'is-visible' : ''}`}>
          {founder && (
            <article
              className="respected-reveal flex flex-col items-center mb-14 md:mb-16"
              style={{ '--reveal-index': 0 } as CSSProperties}
            >
              <div className="founder-photo">
                <div className="founder-halo" aria-hidden="true" />
                <RespectedPhoto member={founder} gold />
                <Laurel />
              </div>

              <h3 lang="en" className="respected-sans mt-8 text-2xl sm:text-3xl font-semibold tracking-tight text-white whitespace-nowrap">
                {founder.name}
              </h3>
              <p lang="en" className="title-caption respected-sans mt-2">
                {founder.title.en}
              </p>
              <p lang="kn" className="title-chip kannada-text mt-3 text-sm sm:text-base">
                {founder.title.kn}
              </p>
              <p className="respected-memorial mt-4 flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm tracking-wide">
                <span className="respected-diya" aria-hidden="true" />
                <span>
                  <span lang="kn" className="kannada-text">{memorialLabel.kn}</span> · {memorialLabel.en}
                </span>
              </p>
            </article>
          )}

          <div className="honour-grid">
            {others.map((member, index) => (
              <article
                key={member.id}
                className="honour-card respected-reveal"
                style={{ '--reveal-index': index + 1 } as CSSProperties}
              >
                <div className="honour-glow" aria-hidden="true" />
                <div className="honour-photo">
                  <RespectedPhoto member={member} />
                </div>

                <div className="honour-body">
                  <h3 lang="en" className="honour-name respected-sans text-lg font-semibold tracking-tight text-white leading-snug text-balance">
                    {member.name}
                  </h3>
                  <p lang="kn" className="title-chip kannada-text text-sm text-balance">
                    {member.title.kn}
                  </p>
                  <p lang="en" className="title-caption respected-sans leading-relaxed text-balance">
                    {member.title.en}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
