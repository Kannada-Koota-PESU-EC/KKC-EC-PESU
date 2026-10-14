import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import TeamGroup from '@/features/team/components/TeamGroup';
import RespectedMembers from '@/features/team/components/RespectedMembers';
import {
  getAllYears,
  getClubHeads,
  getDomainHeads,
} from '@/features/team/data/team';
import { Users } from 'lucide-react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import PageHeader from '@/shared/components/layout/PageHeader';
import JoinTeamCta from '@/features/team/components/JoinTeamCta';

export default function Team() {
  const allYears = getAllYears();
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState(allYears[0] || new Date().getFullYear());

  const clubHeads = getClubHeads(selectedYear);
  const domainHeads = getDomainHeads(selectedYear);

  return (
    <div className="min-h-screen">
      <PageHeader title={t('team.title')} subtitle={t('team.subtitle')} />

      {/* Respected Members: always shown, independent of the selected year */}
      <RespectedMembers />

      <div className="max-w-5xl mx-auto px-4" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
        <div className="h-px mt-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      </div>

      {/* Year Filter Section */}
      <section className="py-8 bg-surface border-b border-border sticky top-14 z-40 backdrop-blur-sm bg-surface/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">{t('team.batch')}</span>
            </div>
            <div className="flex flex-wrap justify-center space-x-2">
              {allYears.map((year) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-20">
        {/* Keyed by year so switching years remounts the groups and the new cards animate in */}
        <div key={selectedYear} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-24">
          <TeamGroup title={t('team.clubHeads')} members={clubHeads} large />
          <TeamGroup title={t('team.domainHeads')} members={domainHeads} />

          {clubHeads.length === 0 && domainHeads.length === 0 && (
             <div className="text-center py-12">
             <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
             <h3 className="text-xl font-semibold text-foreground mb-2">
               {t('team.noMembers', { year: selectedYear })}
             </h3>
             <p className="text-muted-foreground">
               {t('team.noMembersHint')}
             </p>
           </div>
          )}
        </div>
      </section>

      <JoinTeamCta />
    </div>
  );
}