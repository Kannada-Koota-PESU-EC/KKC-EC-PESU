import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Link } from 'react-router-dom';
import TeamCard from '@/features/team/components/TeamCard';
import {
  getAllYears,
  getClubHeads,
  getDomainHeads,
  Member
} from '@/features/team/data/team';
import { Users, Crown, Star } from 'lucide-react';

export default function Team() {
  const allYears = getAllYears();
  const [selectedYear, setSelectedYear] = useState(allYears[0] || new Date().getFullYear());

  const clubHeads = getClubHeads(selectedYear);
  const domainHeads = getDomainHeads(selectedYear);

  const renderSection = (title: string, members: Member[], icon: React.ReactNode) => {
    if (members.length === 0) return null;

    return (
      <div className="mb-16">
        <div className="flex items-center justify-center mb-8 space-x-3">
          {icon}
          <h2 className="text-3xl font-bold text-foreground text-center">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fade-in-up">
          {members.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-surface via-background to-primary-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Users className="h-8 w-8" />
              <h1 className="text-4xl md:text-6xl font-bold">
                ನಮ್ಮ ತಂಡ
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated individuals who drive our community forward.
            </p>
            <p className="text-base text-muted-foreground kannada-text">
              ಕನ್ನಡ ಕೂಟದ ಹಿಂದಿರುವ ಶಕ್ತಿ ನಮ್ಮ ತಂಡ
            </p>
          </div>
        </div>
      </section>

      {/* Year Filter Section */}
      <section className="py-8 bg-surface border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-surface/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Batch of:</span>
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
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderSection(
            'Club Heads',
            clubHeads,
            <Crown className="h-8 w-8 text-yellow-500" />
          )}

          {renderSection(
            'Domain Heads',
            domainHeads,
            <Star className="h-8 w-8 text-blue-500" />
          )}

          {clubHeads.length === 0 && domainHeads.length === 0 && (
             <div className="text-center py-12">
             <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
             <h3 className="text-xl font-semibold text-foreground mb-2">
               No members found for {selectedYear}
             </h3>
             <p className="text-muted-foreground">
               Please select another year or check back later.
             </p>
           </div>
          )}
        </div>
      </section>

       {/* CTA Section */}
       <section className="py-16 bg-primary-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Interested in Joining Our Team?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We are always looking for passionate individuals to contribute to our mission.
          </p>
          <Button className="btn-hero" size="lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}