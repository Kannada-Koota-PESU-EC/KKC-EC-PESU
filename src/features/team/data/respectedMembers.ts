import type { Localized } from '@/shared/i18n/translations';
import respectedData from '@/data/respected.json';

/**
 * Respected members shown at the top of the Team page, in the order listed in
 * src/data/respected.json. Separate from the year-wise team; not tied to the selected year.
 */
export interface RespectedMember {
  id: string;
  name: string;
  title: Localized;
  /** Photo in public/Respectives. Leave out to show the person's initials instead. */
  photo?: string;
  /** Featured founder card on its own row: gold ring, glow and memorial line */
  inMemory?: boolean;
}

export const respectedHeading: Localized = respectedData.heading;
export const memorialLabel: Localized = respectedData.memorialLabel;
export const respectedMembers: RespectedMember[] = respectedData.members;

/** "Dr. M. R. Doreswamy" -> "MD": first and last name initials, skipping titles */
export const getInitials = (name: string) => {
  const words = name
    .replace(/\b(Dr|Prof|Mr|Mrs|Ms)\.?\s/gi, '')
    .split(/[\s.]+/)
    .filter(Boolean);
  if (words.length === 0) return '';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
};
