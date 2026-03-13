import { Button } from '@/shared/components/ui/button';
import { Linkedin, Instagram, Github, ExternalLink } from 'lucide-react';
import { Member } from '@/features/team/data/team';

interface TeamCardProps {
  member: Member;
}

export default function TeamCard({ member }: TeamCardProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getCardSize = () => {
    if (member.role === 'Club Head' || member.role === 'Domain Head') {
      return 'md:col-span-1';
    }
    return '';
  };

  const getImageSize = () => {
    if (member.role === 'Club Head' || member.role === 'Domain Head') {
      return 'w-24 h-24 lg:w-28 lg:h-28';
    }
    return 'w-20 h-20 lg:w-24 lg:h-24';
  };

  const socialLinks = [
    { platform: 'linkedin', url: member.linkedin },
    { platform: 'instagram', url: member.instagram },
    { platform: 'github', url: member.github }
  ].filter(social => social.url);

  return (
    <div className={`card-elevated group ${getCardSize()} border-2 border-yellow-400`}>
      <div className="p-6 text-center space-y-4">
        {/* Profile Image - Centered */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={member.photo}
              alt={`${member.name} - ${member.role}`}
              className={`${getImageSize()} rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 mx-auto`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/200/200';
              }}
            />
            {member.role === 'Club Head' && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                <span className="text-xs font-bold">â˜…</span>
              </div>
            )}
          </div>
        </div>

        {/* Member Info */}
        <div className="space-y-2">
          <h3 className={`font-bold text-foreground ${member.role === 'Club Head' ? 'text-xl' : member.role === 'Domain Head' ? 'text-xl' : 'text-lg'}`}>
            {member.name}
          </h3>
          
          <div className="space-y-1">
            <p className={`font-semibold ${member.role === 'Club Head' ? 'text-primary' : 'text-accent'}`}>
              {member.role}
            </p>
            
            {member.domain && (
              <p className="text-sm text-muted-foreground">
                {member.domain}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {member.bio && (
          <p className="text-muted-foreground leading-relaxed text-sm">
            {member.bio}
          </p>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center space-x-3 pt-4">
            {socialLinks.map((social) => (
              <Button
                key={social.platform}
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 rounded-full hover:bg-accent hover:text-accent-foreground"
                asChild
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s ${social.platform} profile`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              </Button>
            ))}
          </div>
        )}

        {/* Role Badge */}
        <div className="pt-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            member.role === 'Club Head' ? 'bg-primary text-primary-foreground' :
            member.role === 'Domain Head' ? 'bg-accent text-accent-foreground' :
            'bg-muted text-muted-foreground'
          }`}>
            {member.year} Team
          </span>
        </div>
      </div>
    </div>
  );
}