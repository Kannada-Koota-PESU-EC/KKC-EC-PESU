import { useState } from "react";
import { glyphFor, seedNumber } from "@/features/events/lib/eventUtils";

const RING_VARIANTS = [
  ["-right-16 -top-16 h-56 w-56", "-bottom-20 -left-12 h-64 w-64"],
  ["-left-16 -top-12 h-52 w-52", "-bottom-16 -right-16 h-60 w-60"],
  ["-top-24 left-1/2 h-64 w-64 -translate-x-1/2", "-bottom-24 left-1/3 h-72 w-72"],
];

interface ImagePlaceholderProps {
  seed: string;
  compact?: boolean;
}

/**
 * Intentional stand-in used whenever a photograph is missing or fails to load.
 * It fills its (relatively positioned) parent, so layouts never collapse or show a broken-image icon.
 */
export function ImagePlaceholder({
  seed,
  compact = false,
}: ImagePlaceholderProps) {
  const rings = RING_VARIANTS[seedNumber(seed) % RING_VARIANTS.length];

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/45" />

      {rings.map((ring) => (
        <span
          key={ring}
          className={`absolute rounded-full border border-white/20 ${ring}`}
        />
      ))}

      <span
        lang="kn"
        className={`absolute inset-0 flex select-none items-center justify-center font-black leading-[1.4] text-primary-foreground/25 ${
          compact ? "text-5xl" : "text-[7rem] sm:text-[9rem]"
        }`}
      >
        {glyphFor(seed)}
      </span>
    </div>
  );
}

interface EventImageProps {
  src?: string;
  alt: string;
  seed: string;
  /** Extra classes for the <img> (e.g. hover zoom). */
  className?: string;
  compact?: boolean;
  loading?: "lazy" | "eager";
}

/** Fills its relatively positioned parent with the photo, or the placeholder if it is missing/broken. */
export default function EventImage({
  src,
  alt,
  seed,
  className = "",
  compact = false,
  loading = "lazy",
}: EventImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const cleanSrc = src?.trim();

  if (!cleanSrc || failedSrc === cleanSrc) {
    return <ImagePlaceholder seed={seed} compact={compact} />;
  }

  return (
    <img
      src={cleanSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailedSrc(cleanSrc)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}