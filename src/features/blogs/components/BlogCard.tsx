import { useEffect, useRef, useState } from 'react';
import { Clapperboard, Play } from 'lucide-react';
import { BlogVideo, blogSubtitle, formatDuration } from '@/features/blogs/data/blogs';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useMediaLoaded } from '@/shared/hooks/use-media-loaded';
import './blogs.css';

interface BlogCardProps {
  video: BlogVideo;
  onOpen: () => void;
}

const canHover = () => typeof window.matchMedia === 'function' && window.matchMedia('(hover: hover)').matches;
const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reel-style card: first frame as thumbnail, muted looping preview on hover (desktop)
 * or while in view (touch screens). Clicking opens the full player.
 */
export default function BlogCard({ video, onOpen }: BlogCardProps) {
  const { lang, t, l } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [duration, setDuration] = useState('');
  const [previewing, setPreviewing] = useState(false);
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';
  const title = l(video.title);
  const media = useMediaLoaded(4000);
  const subtitle = blogSubtitle(video, lang);

  const startPreview = () => {
    const element = videoRef.current;
    if (!element || prefersReducedMotion()) return;
    element.muted = true;
    element.play().then(() => setPreviewing(true)).catch(() => {});
  };

  const stopPreview = () => {
    const element = videoRef.current;
    if (!element) return;
    element.pause();
    element.currentTime = 0;
    setPreviewing(false);
  };

  // Touch screens: preview while the card is mostly on screen
  useEffect(() => {
    const card = cardRef.current;
    if (!card || canHover() || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startPreview() : stopPreview()),
      { threshold: 0.6 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      className={`blog-card blog-card-${video.orientation} skeleton-fade ${media.loaded ? '' : 'skeleton'} ${previewing ? 'is-previewing' : ''}`}
      onClick={() => {
        stopPreview();
        onOpen();
      }}
      onMouseEnter={() => canHover() && startPreview()}
      onMouseLeave={() => canHover() && stopPreview()}
      aria-label={`${t('blogs.play')}: ${title}`}
    >
      <video
        ref={videoRef}
        // #t=0.1 makes mobile browsers show the first frame as the thumbnail
        src={`${video.video}#t=0.1`}
        poster={video.poster}
        preload="metadata"
        muted
        loop
        playsInline
        disablePictureInPicture
        onLoadedMetadata={(e) => setDuration(formatDuration(e.currentTarget.duration))}
        onLoadedData={media.markLoaded}
        onError={media.markLoaded}
        aria-hidden="true"
        tabIndex={-1}
      />

      <span className={`blog-chip left-3 ${kannadaFont}`}>
        <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
        {t('blogs.reel')}
      </span>
      {duration && <span className="blog-chip right-3">{duration}</span>}

      <span className="blog-play" aria-hidden="true">
        <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
      </span>

      <span className="blog-card-overlay">
        <span className={`block text-lg font-bold text-white line-clamp-2 ${lang === 'kn' ? 'leading-[1.5]' : 'leading-snug'} ${kannadaFont}`}>{title}</span>
        {subtitle && <span className={`mt-1 block text-sm text-[#d9d4c8] ${kannadaFont}`}>{subtitle}</span>}
      </span>
    </button>
  );
}
