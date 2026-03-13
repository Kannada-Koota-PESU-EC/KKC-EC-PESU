import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Event } from '@/features/events/data/events';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isUpcoming = new Date(event.date).getTime() >= new Date().setHours(0, 0, 0, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const cardClasses = featured
    ? 'card-elevated lg:col-span-2 bg-gradient-to-br from-card to-primary-muted'
    : 'card-elevated card-hover';

  return (
    <Collapsible.Root
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className={cardClasses}
      data-testid={featured ? 'featured-event' : 'event-card'}
      data-event-id={event.id}
    >
      <div className={`p-6 ${featured ? 'lg:flex lg:space-x-6' : ''}`}>
        
        {/* Event Image */}
        <div className={`relative overflow-hidden rounded-lg ${featured ? 'lg:w-1/2' : ''}`}>
          <img
            src={event.image}
            alt={event.title}
            className={`w-full object-cover transition-transform duration-300 ${
              featured ? 'h-64 lg:h-80' : 'h-48'
            }`}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/600/400';
            }}
          />

          {/* Upcoming Badge */}
          {isUpcoming && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
                Upcoming
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                Featured Event
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`${featured ? 'lg:w-1/2 mt-4 lg:mt-0' : 'mt-4'} space-y-4`}>

          {/* Title */}
          <div>
            <h3
              className={`font-bold text-foreground leading-tight ${
                featured ? 'text-2xl lg:text-3xl' : 'text-xl'
              }`}
            >
              {event.title}
            </h3>

            {/* Date + Location */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(event.date)}</span>
              </div>

              {event.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className={`text-muted-foreground leading-relaxed ${featured ? 'text-lg' : ''}`}>
            {event.teaser}
          </p>
          {event.registerLink && (
          <a
            href={event.registerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
          <Button className="mt-3">
            Register Now
          </Button>
          </a>
          )}

          {/* Expandable Section */}
          <Collapsible.Content
            className={`transition-all duration-300 overflow-hidden ${
              isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-4 mt-4 border-t border-border space-y-4">

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Gallery</h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {event.gallery.slice(0, 6).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        onClick={() => setSelectedImage(image)}
                        className="w-full h-20 object-cover rounded border cursor-pointer hover:scale-105 transition"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/api/placeholder/200/150';
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </Collapsible.Content>

          {/* Read More Button */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Collapsible.Trigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </Collapsible.Trigger>
          </div>

        </div>
      </div>

      {/* Image Popup Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}

    </Collapsible.Root>
  );
}
