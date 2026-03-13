import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { ChevronDown, ChevronUp, Users, Calendar, Heart, Award } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <section id="about" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative animate-fade-in-up">
            <div className="relative">
              <img
                src="/Hero/TM 2.JPG"
                alt="Kannada Koota club members in traditional attire"
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-club-black/30 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 inset-x-0 text-white text-center">
                <h3 className="text-xl font-bold kannada-text">ನಮ್ಮ ಸಮುದಾಯ</h3>
                <p className="text-sm opacity-90">Our Community</p>
              </div>
            </div>


            {/* Floating Stats Cards */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-lg font-bold">160+</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-lg font-bold">5+</div>
                  <div className="text-xs text-muted-foreground">Events/Year</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground ">
                About <span className="text-primary kannada-text text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">ಕನ್ನಡ ಕೂಟ</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Kannada Koota EC PES is a vibrant cultural club dedicated to preserving and promoting the rich heritage of Karnataka. We bring together students who share a passion for Kannada language, literature, arts, and traditions.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-primary-muted rounded-lg">
                <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Cultural Events</div>
                  <div className="text-xs text-muted-foreground">Regular celebrations</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-accent-muted rounded-lg">
                <Award className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Workshops</div>
                  <div className="text-xs text-muted-foreground">Skill development</div>
                </div>
              </div>
            </div>

            {/* Main Description */}
            <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded} className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Our club serves as a bridge between tradition and modernity, organizing cultural festivals, 
                poetry workshops, traditional cooking sessions, and community outreach programs. We believe 
                in creating an inclusive environment where everyone can learn and appreciate the beauty of Kannada culture.
              </p>

              {/* Expandable Content */}
              <Collapsible.Content className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 mt-4 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To create a platform where students can connect with their cultural roots while building 
                    lasting friendships and memories. We aim to showcase the diversity and richness of Karnataka's 
                    cultural landscape through authentic experiences and meaningful engagement.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground">What We Do</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Organize traditional festivals like Kannada Rajyotsava and Mysore Dasara</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Conduct poetry and literature workshops in Kannada</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Host traditional cooking and crafts sessions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Arrange cultural performances and music concerts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Build community partnerships and outreach programs</span>
                    </li>
                  </ul>

                  <div className="bg-primary-muted p-4 rounded-lg">
                    <p className="text-foreground font-medium kannada-text text-center">
                      "ಕನ್ನಡ ನಾಡು ನುಡಿ ಬೆಳದಿಂಗ್ಳಾಗಿ ಬೆಳೆಯಲಿ"
                    </p>
                    <p className="text-muted-foreground text-sm text-center mt-1">
                      "May the Kannada land and language flourish like the bright moon"
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
                  <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </Collapsible.Trigger>
              <Button className="btn-accent" asChild>
                <Link to="/team">Meet Our Team</Link>
              </Button>
            </div>
            </Collapsible.Root>
          </div>
        </div>
      </div>
    </section>
  );
}