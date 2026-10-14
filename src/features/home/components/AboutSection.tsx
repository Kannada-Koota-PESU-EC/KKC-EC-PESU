import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { ChevronDown, ChevronUp, Users, Calendar, Heart, Award } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useLanguage } from '@/shared/i18n/useLanguage';
import type { TranslationKey } from '@/shared/i18n/translations';

const activities: TranslationKey[] = ['about.do1', 'about.do2', 'about.do3', 'about.do4', 'about.do5'];

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <section id="about" className="py-20 bg-surface/68 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative animate-fade-in-up">
            <div className="relative">
              <img
                src="/Hero/TM 2.JPG"
                alt={t('about.imageAlt')}
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-club-black/30 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 inset-x-0 text-white text-center">
                <h3 className="text-xl font-bold">{t('about.community')}</h3>
              </div>
            </div>


            {/* Floating Stats Cards */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-lg font-bold">160+</div>
                  <div className="text-xs text-muted-foreground">{t('about.members')}</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-lg font-bold">5+</div>
                  <div className="text-xs text-muted-foreground">{t('about.eventsPerYear')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground ">
                {t('about.headingBefore')}
                <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">{t('brand.name')}</span>
                {t('about.headingAfter')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.intro')}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-primary-muted rounded-lg">
                <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">{t('about.culturalEvents')}</div>
                  <div className="text-xs text-muted-foreground">{t('about.regularCelebrations')}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-accent-muted rounded-lg">
                <Award className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">{t('about.workshops')}</div>
                  <div className="text-xs text-muted-foreground">{t('about.skillDevelopment')}</div>
                </div>
              </div>
            </div>

            {/* Main Description */}
            <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded} className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {t('about.body')}
              </p>

              {/* Expandable Content */}
              <Collapsible.Content className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 mt-4 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">{t('about.missionTitle')}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.mission')}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground">{t('about.whatWeDo')}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {activities.map((key) => (
                      <li key={key} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-primary-muted p-4 rounded-lg">
                    <p className="text-foreground font-medium text-center">
                      {t('about.quote')}
                    </p>
                  </div>
                </div>
              </Collapsible.Content>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Collapsible.Trigger asChild>
                <Button 
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <span>{isExpanded ? t('common.showLess') : t('common.readMore')}</span>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </Collapsible.Trigger>
              <Button className="btn-accent" asChild>
                <Link to="/team">{t('about.meetTeam')}</Link>
              </Button>
            </div>
            </Collapsible.Root>
          </div>
        </div>
      </div>
    </section>
  );
}