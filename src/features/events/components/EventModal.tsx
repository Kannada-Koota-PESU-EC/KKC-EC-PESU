import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, ExternalLink, MapPin, X } from 'lucide-react';
import { Event } from '@/features/events/data/events';
import { useLanguage } from '@/shared/i18n/useLanguage';
import { useReturnFocus } from '@/shared/hooks/use-return-focus';
import { formatEventDate, splitEventDetails } from '@/features/events/components/eventFormat';
import './event-cards.css';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

const SWIPE_DISTANCE = 50;

function Lightbox({
  images,
  index,
  title,
  onChange,
  onClose,
}: {
  images: string[];
  index: number | null;
  title: string;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  const current = index ?? 0;
  const go = (step: number) => onChange((current + step + images.length) % images.length);
  const returnFocus = useReturnFocus(open);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          onCloseAutoFocus={returnFocus}
          className="fixed inset-0 z-[111] flex items-center justify-center p-4 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
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
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {open && (
            <img
              src={images[current]}
              alt={`${title} – ${t('events.galleryImageAlt', { n: current + 1 })}`}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          )}

          {images.length > 1 && (
            <>
              <button type="button" className="event-lightbox-arrow absolute left-3 sm:left-6" onClick={() => go(-1)} aria-label={t('events.prevImage')}>
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button type="button" className="event-lightbox-arrow absolute right-3 sm:right-6" onClick={() => go(1)} aria-label={t('events.nextImage')}>
                <ChevronRight className="h-6 w-6" />
              </button>
              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
                {current + 1} / {images.length}
              </p>
            </>
          )}

          <Dialog.Close className="event-modal-close absolute top-4 right-4" aria-label={t('common.close')}>
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Full event details in a modal: poster, title, date/venue, full description and gallery. */
export default function EventModal({ event, onClose }: EventModalProps) {
  const { lang, t, l } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Keep the last event while the close animation plays
  const [shown, setShown] = useState<Event | null>(event);
  const open = event !== null;
  const returnFocus = useReturnFocus(open);

  useEffect(() => {
    if (event) setShown(event);
    setLightboxIndex(null);
  }, [event]);

  // Lets fixed elements (floating Instagram button) hide while the modal is open
  useEffect(() => {
    document.documentElement.toggleAttribute('data-modal-open', open);
    return () => document.documentElement.removeAttribute('data-modal-open');
  }, [open]);

  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';
  const current = shown;
  const title = current ? l(current.title) : '';
  const { body, details } = current ? splitEventDetails(l(current.description)) : { body: '', details: [] };
  const gallery = current?.gallery ?? [];

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          onCloseAutoFocus={returnFocus}
          className="event-modal fixed z-[101] inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[min(92vw,48rem)] md:max-h-[90vh] flex flex-col overflow-hidden outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none"
          aria-describedby={undefined}
        >
          {current && (
            <>
              {/* On the outer box, so it stays in the corner while the content scrolls */}
              <Dialog.Close className="event-modal-close absolute top-3 right-3 z-10" aria-label={t('common.close')}>
                <X className="h-5 w-5" />
              </Dialog.Close>

              {/* Only this inner area scrolls; the outer box keeps its rounded corners */}
              <div className="event-modal-scroll slim-scrollbar flex-1 min-h-0 overflow-y-auto">
                <img
                  src={current.poster}
                  alt={title}
                  className="block w-full max-h-[60vh] object-contain bg-black"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />

                <div className="p-5 sm:p-8 space-y-5">
                  <Dialog.Title className={`text-2xl sm:text-3xl font-bold text-white leading-snug ${kannadaFont}`}>
                    {title}
                  </Dialog.Title>

                  <div className={`flex flex-wrap gap-2 ${kannadaFont}`}>
                    <span className="event-chip">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatEventDate(current.date, lang)}
                    </span>
                    {current.time && (
                      <span className="event-chip">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {l(current.time)}
                      </span>
                    )}
                    {current.venue && (
                      <span className="event-chip">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {l(current.venue)}
                      </span>
                    )}
                  </div>

                  <p className="text-base leading-relaxed text-[#ece7dc] whitespace-pre-line">{body}</p>

                  {details.length > 0 && (
                    <dl className="space-y-1.5 text-sm">
                      {details.map((detail) => (
                        <div key={detail.label} className="flex flex-wrap gap-x-2">
                          <dt className="font-semibold text-[#ffd23f]">{detail.label}:</dt>
                          <dd className="text-[#ece7dc]">{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {current.registerLink && (
                    <a
                      href={current.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-red-600 px-5 py-2.5 font-semibold text-[#1a1a1a]"
                    >
                      {t('events.register')}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}

                  {gallery.length > 0 && (
                    <div>
                      <h3 className={`mb-3 font-semibold text-white ${kannadaFont}`}>{t('events.gallery')}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {gallery.map((image, index) => (
                          <button
                            key={`${image}-${index}`}
                            type="button"
                            className="event-thumb"
                            onClick={() => setLightboxIndex(index)}
                            aria-label={t('events.galleryImageAlt', { n: index + 1 })}
                          >
                            <img src={image} alt="" loading="lazy" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Lightbox
            images={gallery}
            index={lightboxIndex}
            title={title}
            onChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        </Dialog.Content>
      </Dialog.Portal>

    </Dialog.Root>
  );
}
