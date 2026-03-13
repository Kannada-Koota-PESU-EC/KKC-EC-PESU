import { useState, useEffect } from 'react';

interface MarqueeImagesProps {
  images?: string[];
}

const defaultImages = [
  { src: '/api/placeholder/300/400', alt: 'Kannada cultural performance' },
  { src: '/api/placeholder/400/300', alt: 'Traditional Mysore Dasara celebration' },
  { src: '/api/placeholder/350/400', alt: 'Students in traditional attire' },
  { src: '/api/placeholder/400/350', alt: 'Kannada poetry workshop' },
  { src: '/api/placeholder/320/400', alt: 'Cultural dance performances' },
  { src: '/api/placeholder/400/320', alt: 'Traditional food festival' },
  { src: '/api/placeholder/360/400', alt: 'Team members at event' },
  { src: '/api/placeholder/400/360', alt: 'Community gathering' }
];

export default function MarqueeImages({ images }: MarqueeImagesProps) {
  const [isVisible, setIsVisible] = useState(true);
  const imageList = images || defaultImages.map(img => img.src);

  // Duplicate images for seamless loop
  const duplicatedImages = [...imageList, ...imageList];

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 p-4">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      
      {/* Vertical Marquee Container */}
      <div className="grid grid-cols-3 gap-4 h-full">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="marquee overflow-hidden">
            <div 
              className={`marquee-content flex-col ${isVisible ? '' : 'pause'}`}
              style={{
                animation: `marquee ${30 + colIndex * 5}s linear infinite`,
                animationDirection: colIndex % 2 === 0 ? 'normal' : 'reverse'
              }}
            >
              {duplicatedImages.map((imageSrc, index) => (
                <div 
                  key={`${colIndex}-${index}`}
                  className="flex-shrink-0 mb-4 last:mb-0"
                >
                  <img
                    src={imageSrc}
                    alt={defaultImages[index % defaultImages.length]?.alt || `Cultural image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/300/300';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center pointer-events-none">
        <div className="text-center text-foreground">
          <h3 className="text-lg font-semibold mb-2">Our Cultural Journey</h3>
          <p className="text-sm text-muted-foreground">Memories from our events and celebrations</p>
        </div>
      </div>
    </div>
  );
}