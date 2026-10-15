import type { Localized } from '@/shared/i18n/translations';
import siteData from '@/data/site.json';

/** Site-wide content from src/data/site.json (stats, contact details, hero photos). */
export interface SiteStat {
  value: number;
  suffix: string;
  label: Localized;
}

export interface HeroSlide {
  /** Image in public/, e.g. "/Hero/slides/team.webp" */
  image: string;
  /** Optional ~960px copy for phones */
  imageSmall?: string;
  /** Short caption shown next to the slide dashes */
  caption: Localized;
}

export interface SiteContent {
  /** Images used around the site (paths in public/) */
  images: {
    logo: string;
    footerLogo: string;
    aboutPhoto: string;
    republicDay: string;
  };
  stats: SiteStat[];
  contact: {
    email: string;
    instagramHandle: string;
    address: Localized;
    shortAddress: Localized;
    /** Place searched/embedded on Google Maps */
    mapSearch: string;
    /** Optional form-service URL (e.g. Formspree). Empty = form opens the visitor's email app. */
    formEndpoint: string;
  };
  heroSlides: HeroSlide[];
  /** Small photo button in the footer linking to the site developer's LinkedIn */
  developer: {
    name: string;
    photo: string;
    linkedin: string;
  };
}

export const site: SiteContent = siteData;
