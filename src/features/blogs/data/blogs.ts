import type { Language, Localized } from '@/shared/i18n/translations';
import blogsData from '@/data/blogs.json';

/** Content lives in src/data/blogs.json; this file only types it. */
export interface BlogVideo {
  id: string;
  /** Video file in public/, e.g. "/blog1.mp4" */
  video: string;
  /** Optional thumbnail image; without it the card shows the video's first frame */
  poster?: string;
  title: Localized;
  /** Event the video is from (shown under the title with the date) */
  event?: Localized;
  /** ISO date (YYYY-MM-DD) */
  date?: string;
  /** Shown under the video in the player */
  description?: Localized;
  /** 'landscape' = 16:9 cards, 'portrait' = 9:16 reel cards */
  orientation: 'landscape' | 'portrait';
}

export const blogVideos = blogsData as BlogVideo[];

/** "7.4" -> "0:07" */
export const formatDuration = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '';
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

/** "Nritya Lahari · 19 August 2026": event name and/or date, whichever exist */
export const blogSubtitle = (video: BlogVideo, lang: Language) => {
  const parts: string[] = [];
  if (video.event) parts.push(video.event[lang]);
  if (video.date) {
    const [year, month, day] = video.date.split('-').map(Number);
    parts.push(
      new Date(year, month - 1, day).toLocaleDateString(lang === 'kn' ? 'kn-IN' : 'en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    );
  }
  return parts.join(' · ');
};
