import { useEffect, useRef, useState } from 'react';
import './page-header.css';

interface SectionTitleProps {
  title: string;
  /** Small muted-gold label, e.g. a count */
  meta?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Shared section sub-heading. Left: gradient bar beside the text. Centered: gradient underline.
 * Fades up when it scrolls into view.
 */
export default function SectionTitle({ title, meta, align = 'left', className = '' }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
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
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const visibility = isVisible ? 'is-visible' : '';

  if (align === 'center') {
    return (
      <div ref={ref} className={`section-title ${visibility} text-center ${className}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        {meta && <p className="section-title-meta mt-2 text-sm tracking-wide">{meta}</p>}
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-red-600" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`section-title ${visibility} flex items-stretch gap-4 ${className}`}>
      <span className="section-title-bar" aria-hidden="true" />
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        {meta && <span className="section-title-meta text-sm tracking-wide">{meta}</span>}
      </div>
    </div>
  );
}
