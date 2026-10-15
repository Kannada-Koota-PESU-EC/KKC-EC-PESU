import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, ChevronDown, ChevronUp, Heart, Users } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useInView } from '@/shared/hooks/use-in-view';
import type { TranslationKey } from '@/shared/i18n/translations';
import { site } from '@/shared/data/site';
import './home.css';

const activities: TranslationKey[] = ['about.do1', 'about.do2', 'about.do3', 'about.do4', 'about.do5'];

const features: { icon: typeof Heart; title: TranslationKey; subtitle: TranslationKey }[] = [
  { icon: Heart, title: 'about.culturalEvents', subtitle: 'about.regularCelebrations' },
  { icon: Award, title: 'about.workshops', subtitle: 'about.skillDevelopment' },
  { icon: BookOpen, title: 'about.literature', subtitle: 'about.literatureSub' },
  { icon: Users, title: 'about.outreach', subtitle: 'about.outreachSub' },
];

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { lang, t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>(0.15);
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  return (
    <section id="about" ref={ref} className={`about py-20 md:py-24 scroll-mt-16 ${inView ? 'is-visible' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* Photo with offset gradient frame */}
          <div className="about-photo about-reveal-left mr-4 mb-4">
            <img
              src={site.images.aboutPhoto}
              alt={t('about.imageAlt')}
              className="w-full h-[320px] sm:h-[440px] lg:h-[500px] object-cover rounded-[24px] shadow-lg"
              loading="lazy"
            />
            <span className={`about-chip ${kannadaFont}`}>{t('about.community')}</span>
          </div>

          {/* Text */}
          <div className="about-reveal-right space-y-6">
            <div className="space-y-3">
              <p className={`text-sm font-medium uppercase tracking-[0.18em] text-[#c9a24a] ${kannadaFont}`}>
                {t('about.eyebrow')}
              </p>
              <h2 className={`text-4xl md:text-5xl font-bold text-white ${lang === 'kn' ? 'leading-[1.4]' : 'leading-tight'} ${kannadaFont}`}>
                {t('about.headingWhite')}
                <span className="gradient-text-safe text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600">
                  {t('about.headingGradient')}
                </span>
              </h2>
              <p className="text-lg text-[#d9d4c8] leading-relaxed">{t('about.intro')}</p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map(({ icon: Icon, title, subtitle }, index) => (
                <div key={title} className="about-card about-reveal-up" style={{ '--i': index } as CSSProperties}>
                  <span className="about-card-icon">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className={`font-semibold text-sm text-white ${kannadaFont}`}>{t(title)}</div>
                    <div className={`text-xs text-[#9a958a] ${kannadaFont}`}>{t(subtitle)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Description */}
            <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded} className="max-w-none">
              <p className="text-[#bdb7aa] leading-relaxed">{t('about.body')}</p>

              {/* Expandable Content */}
              <Collapsible.Content className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 mt-4 space-y-4">
                  <h3 className={`text-xl font-semibold text-white ${kannadaFont}`}>{t('about.missionTitle')}</h3>
                  <p className="text-[#bdb7aa] leading-relaxed">{t('about.mission')}</p>

                  <h3 className={`text-xl font-semibold text-white ${kannadaFont}`}>{t('about.whatWeDo')}</h3>
                  <ul className="space-y-2 text-[#bdb7aa]">
                    {activities.map((key) => (
                      <li key={key} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-red-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="about-card justify-center">
                    <p className="text-white font-medium text-center">{t('about.quote')}</p>
                  </div>
                </div>
              </Collapsible.Content>

              {/* Buttons: secondary glass + primary gradient, same as the hero */}
              <div className={`flex flex-col sm:flex-row gap-3 pt-6 ${kannadaFont}`}>
                <Collapsible.Trigger asChild>
                  <button type="button" className="home-btn-secondary">
                    {isExpanded ? t('common.showLess') : t('common.readMore')}
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </Collapsible.Trigger>
                <Link to="/team" className="home-btn-primary">
                  {t('about.meetTeam')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Collapsible.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
