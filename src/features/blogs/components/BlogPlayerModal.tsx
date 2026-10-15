import { useEffect, useRef, useState, type CSSProperties } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Maximize, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { BlogVideo, blogSubtitle } from '@/features/blogs/data/blogs';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useReturnFocus } from '@/shared/hooks/use-return-focus';
import './blogs.css';

interface BlogPlayerModalProps {
  videos: BlogVideo[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

const SWIPE_DISTANCE = 50;

/** Full player: plays with sound from the start, custom controls, previous/next between videos. */
export default function BlogPlayerModal({ videos, index, onChange, onClose }: BlogPlayerModalProps) {
  const { lang, t, l } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const open = index !== null;
  const returnFocus = useReturnFocus(open);
  const current = index !== null ? videos[index] : null;
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  const go = (step: number) => {
    if (index === null || videos.length < 2) return;
    onChange((index + step + videos.length) % videos.length);
  };

  // Lets fixed elements (floating Instagram button) hide while the player is open
  useEffect(() => {
    document.documentElement.toggleAttribute('data-modal-open', open);
    return () => document.documentElement.removeAttribute('data-modal-open');
  }, [open]);

  // New video: start from the beginning, with sound
  useEffect(() => {
    const element = videoRef.current;
    if (!element || !current) return;
    setProgress(0);
    element.currentTime = 0;
    element.muted = muted;
    element.play().catch(() => setPlaying(false));
    // Only when the video changes, not when mute changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  const togglePlay = () => {
    const element = videoRef.current;
    if (!element) return;
    if (element.paused) element.play().catch(() => {});
    else element.pause();
  };

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) return;
    element.muted = !element.muted;
    setMuted(element.muted);
  };

  const toggleFullscreen = () => {
    const frame = frameRef.current;
    if (!frame) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else frame.requestFullscreen?.().catch(() => {});
  };

  const seek = (percent: number) => {
    const element = videoRef.current;
    if (!element || !Number.isFinite(element.duration)) return;
    element.currentTime = (percent / 100) * element.duration;
    setProgress(percent);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          onCloseAutoFocus={returnFocus}
          className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none"
          aria-describedby={undefined}
          // Clicking the empty area around the player closes it, like the backdrop
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === ' ' && e.target === e.currentTarget) {
              e.preventDefault();
              togglePlay();
            }
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const distance = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(distance) > SWIPE_DISTANCE) go(distance < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          {current && (
            <div className="w-full max-w-5xl">
              <div ref={frameRef} className="blog-player-frame relative">
                <video
                  ref={videoRef}
                  key={current.id}
                  src={current.video}
                  poster={current.poster}
                  className="blog-player-video"
                  playsInline
                  autoPlay
                  loop
                  onClick={togglePlay}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onTimeUpdate={(e) => {
                    const element = e.currentTarget;
                    if (element.duration) setProgress((element.currentTime / element.duration) * 100);
                  }}
                />

                {/* Custom controls */}
                <div className="mt-3 flex items-center gap-2 sm:gap-3 px-1">
                  <button type="button" className="blog-control" onClick={togglePlay} aria-label={playing ? t('blogs.pause') : t('blogs.play')}>
                    {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5" fill="currentColor" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="blog-progress"
                    style={{ '--progress': `${progress}%` } as CSSProperties}
                    aria-label={t('blogs.progress')}
                  />
                  <button type="button" className="blog-control" onClick={toggleMute} aria-label={muted ? t('blogs.unmute') : t('blogs.mute')}>
                    {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <button type="button" className="blog-control" onClick={toggleFullscreen} aria-label={t('blogs.fullscreen')}>
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4 px-1">
                <div className="min-w-0">
                  <Dialog.Title className={`text-xl sm:text-2xl font-bold text-white ${kannadaFont}`}>
                    {l(current.title)}
                  </Dialog.Title>
                  {blogSubtitle(current, lang) && (
                    <p className={`mt-1 text-sm text-[#c9a24a] ${kannadaFont}`}>{blogSubtitle(current, lang)}</p>
                  )}
                  {current.description && (
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#ece7dc]">{l(current.description)}</p>
                  )}
                </div>

                {videos.length > 1 && (
                  <div className="flex shrink-0 gap-2">
                    <button type="button" className="blog-nav-arrow" onClick={() => go(-1)} aria-label={t('blogs.prev')}>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button type="button" className="blog-nav-arrow" onClick={() => go(1)} aria-label={t('blogs.next')}>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <Dialog.Close className="blog-close absolute top-4 right-4" aria-label={t('common.close')}>
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
