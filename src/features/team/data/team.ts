import type { Localized } from '@/shared/i18n/translations';
import teamData from '@/data/team.json';

/** Content lives in src/data/team.json; this file only types it and adds helpers. */
export interface Member {
  id: string;
  name: Localized;
  /** Role or domain shown on the card, e.g. "ಐಟಿ / IT" or "ಕೂಟದ ಮುಖ್ಯಸ್ಥರು / Club Head" */
  role: Localized;
  photo: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  /** Marks the website's developer: animated border and a chip linking to `portfolio` */
  developer?: boolean;
  portfolio?: string;
}

export interface TeamGroup {
  id: string;
  title: Localized;
  /** Slightly larger cards (e.g. club heads) */
  large?: boolean;
  members: Member[];
}

export interface TeamYear {
  year: number;
  groups: TeamGroup[];
}

export const teamYears: TeamYear[] = teamData;

/** Years found in team.json, newest first (drives the year tabs). */
export const getAllYears = (): number[] => teamYears.map((entry) => entry.year).sort((a, b) => b - a);

export const getTeamGroups = (year: number): TeamGroup[] =>
  teamYears.find((entry) => entry.year === year)?.groups.filter((group) => group.members.length > 0) ?? [];
