import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import EventImage, {
  ImagePlaceholder,
} from "@/features/events/components/EventImage";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ROUND_BUTTON =
  "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

const GALLERY_LAYOUTS: Record<number, string[]> = {
  1: ["col-span-6 row-span-2"],
  2: ["col-span-4 row-span-2", "col-span-2 row-span-2"],
  3: ["col-span-4 row-span-2", "col-span-2", "col-span-2"],
  4: ["col-span-4", "col-span-2", "col-span-2", "col-span-4"],
  5: [
    "col-span-4 row-span-2",
    "col-span-2",
    "col-span-2",
    "col-span-3",
    "col-span-3",
  ],
};

function galleryCellClasses(count: number, index: number): string {
  const group = Math.floor(index / 5);
  const fullGroups = Math.floor(count / 5);
  const size = group < fullGroups ? 5 : count - fullGroups * 5;

  return GALLERY_LAYOUTS[size][index % 5];
}

function cellShape(index: number): string {
  if (index % 5 === 0) {
    return "rounded-tl-[2rem] rounded-br-[2rem] rounded-bl-lg rounded-tr-lg";
  }

  if (index % 5 === 3) {
    return "rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-tl-lg rounded-br-lg";
  }

  return "rounded-xl";
}

function trapTab(e: KeyboardEvent, root: HTMLElement | null) {
  if (e.key !== "Tab" || !root) return;

  const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));

  if (nodes.length === 0) {
    e.preventDefault();
    return;
  }

  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const active = document.activeElement;
  const outside = !active || !root.contains(active);

  if (e.shiftKey && (active === first || outside)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (active === last || outside)) {
    e.preventDefault();
    first.focus();
  }
}

function LightboxImage({
  src,
  alt,
  seed,
}: {
  src: string;
  alt: string;
  seed: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div className="relative aspect-[4/3] w-[min(88vw,40rem)] overflow-hidden rounded-xl">
        <ImagePlaceholder seed={seed} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailedSrc(src)}
      className="pointer-events-auto max-h-[78dvh] max-w-full rounded-xl object-contain"
    />
  );
}

interface LightboxProps {
  images: string[];
  index: number;
  title: string;
  seed: string;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}

function Lightbox({
  images,
  index,
  title,
  seed,
  onClose,
  onNavigate,
}: LightboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const openedAt = useRef(0);
  const [entered, setEntered] = useState(false);

  const hasMany = images.length > 1;

  useEffect(() => {
    openedAt.current = Date.now();
    closeRef.current?.focus({ preventScroll: true });

    const frame = window.requestAnimationFrame(() => setEntered(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && hasMany) {
        e.preventDefault();
        onNavigate(1);
      } else if (e.key === "ArrowLeft" && hasMany) {
        e.preventDefault();
        onNavigate(-1);
      } else {
        trapTab(e, rootRef.current);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hasMany, onClose, onNavigate]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — photo ${index + 1} of ${images.length}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && Date.now() - openedAt.current > 450) {
          onClose();
        }
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;

        if (start === null || !hasMany) return;

        const delta = (e.changedTouches[0]?.clientX ?? start) - start;

        if (Math.abs(delta) > 50) onNavigate(delta < 0 ? 1 : -1);
      }}
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 transition-opacity duration-300 motion-reduce:transition-none ${
        entered ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className={`absolute right-4 top-4 z-10 ${ROUND_BUTTON}`}
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      {hasMany && (
        <>
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            aria-label="Previous photo"
            className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6 ${ROUND_BUTTON}`}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate(1)}
            aria-label="Next photo"
            className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6 ${ROUND_BUTTON}`}
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      <figure className="pointer-events-none flex max-w-full flex-col items-center gap-4 px-10 sm:px-20">
        <LightboxImage
          key={index}
          src={images[index]}
          alt={`${title} — photo ${index + 1} of ${images.length}`}
          seed={`${seed}-${index}`}
        />
        <figcaption className="text-center text-sm font-semibold text-white/80">
          {index + 1} / {images.length}
        </figcaption>
      </figure>
    </div>
  );
}

interface EventGalleryProps {
  images: string[];
  title: string;
  eventId: string;
}

export default function EventGallery({
  images,
  title,
  eventId,
}: EventGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const photos = images.map((src) => src.trim()).filter(Boolean);
  const count = photos.length;

  const closeLightbox = useCallback(() => {
    const opener = trigger.current;

    setLightboxIndex(null);
    window.requestAnimationFrame(() => opener?.focus({ preventScroll: true }));
  }, []);

  const navigate = useCallback(
    (delta: number) => {
      setLightboxIndex((current) =>
        current === null ? current : (current + delta + count) % count,
      );
    },
    [count],
  );

  if (count === 0) return null;

  return (
    <>
      <div className="grid auto-rows-[7rem] grid-cols-6 gap-2 sm:auto-rows-[10rem] sm:gap-3 lg:auto-rows-[12rem]">
        {photos.map((src, i) => (
          <button
            type="button"
            key={`${src}-${i}`}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setLightboxIndex(i);
            }}
            aria-label={`View photo ${i + 1} of ${count}`}
            className={`group relative touch-manipulation overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${galleryCellClasses(
              count,
              i,
            )} ${cellShape(i)}`}
          >
            <EventImage
              src={src}
              alt={`${title} — photo ${i + 1}`}
              seed={`${eventId}-${i}`}
              compact
              className="transition-transform duration-500 ease-out motion-safe:group-hover:scale-110"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <Lightbox
            images={photos}
            index={lightboxIndex}
            title={title}
            seed={eventId}
            onClose={closeLightbox}
            onNavigate={navigate}
          />,
          document.body,
        )}
    </>
  );
}