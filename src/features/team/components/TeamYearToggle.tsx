import { Button } from '@/shared/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface TeamYearToggleProps {
  years: number[];
  selectedYear: number;
  onChange: (year: number) => void;
}

export default function TeamYearToggle({ years, selectedYear, onChange }: TeamYearToggleProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Scroll to selected year on mount or when selectedYear changes
    const selectedButton = document.querySelector(`[data-year="${selectedYear}"]`);
    if (selectedButton && scrollContainerRef.current) {
      selectedButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedYear]);

  // 🔑 FIX: change selectedYear instead of just scrolling container
  const changeYear = (direction: 'left' | 'right') => {
    const index = years.indexOf(selectedYear);
    if (direction === 'left' && index > 0) {
      onChange(years[index - 1]);
    } else if (direction === 'right' && index < years.length - 1) {
      onChange(years[index + 1]);
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold text-foreground">Team</h2>
        <span className="text-muted-foreground">Year:</span>
      </div>

      <div className="flex items-center space-x-2 flex-1 min-w-0">
        {/* Left Scroll Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={selectedYear === years[0]}
          className="hidden sm:flex w-8 h-8 p-0 rounded-full flex-shrink-0"
          onClick={() => changeYear('left')}
          aria-label="Previous year"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Year Buttons Container */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-2 overflow-x-auto scrollbar-thin flex-1 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {years.map((year) => (
            <Button
              key={year}
              data-year={year}
              variant={selectedYear === year ? 'default' : 'outline'}
              size="sm"
              onClick={() => onChange(year)}
              className={`relative whitespace-nowrap flex-shrink-0 ${
                selectedYear === year 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-surface'
              }`}
            >
              {year}
              {year === currentYear && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  •
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Right Scroll Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={selectedYear === years[years.length - 1]}
          className="hidden sm:flex w-8 h-8 p-0 rounded-full flex-shrink-0"
          onClick={() => changeYear('right')}
          aria-label="Next year"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Year Info */}
      <div className="hidden lg:block text-sm text-muted-foreground">
        {selectedYear === currentYear && (
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            <span>Current Year</span>
          </span>
        )}
      </div>
    </div>
  );
}
