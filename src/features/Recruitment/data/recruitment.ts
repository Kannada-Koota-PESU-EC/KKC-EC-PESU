import {
  CalendarCheck,
  Clapperboard,
  Code2,
  Drama,
  HandHeart,
  Handshake,
  Megaphone,
  MessagesSquare,
  Mic,
  PenLine,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------
 * RECRUITMENT GOOGLE FORM LINK
 *
 * Replace the placeholder below with the official Google Form URL,
 * e.g. "https://forms.gle/xxxxxxxxxxxx".
 *
 * Until a real http(s) link is set, the "Apply Now" button is shown
 * as disabled with a "form opens soon" note. No other change is
 * needed once the link is added.
 * ------------------------------------------------------------------ */
export const RECRUITMENT_FORM_URL = "PASTE_GOOGLE_FORM_URL_HERE";

export const isRecruitmentFormAvailable = /^https?:\/\//.test(RECRUITMENT_FORM_URL);

export interface RecruitmentDomain {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const recruitmentDomains: RecruitmentDomain[] = [
  {
    id: "it",
    name: "IT",
    icon: Code2,
    description:
      "The IT domain handles the technical aspects of Kannada Koota, including website development and other digital platforms. It works on technology-based solutions that support the club's activities and events.",
  },
  {
    id: "cultural",
    name: "Cultural",
    icon: Drama,
    description:
      "The Cultural domain focuses on representing and celebrating Kannada culture, traditions, and heritage. It organizes and coordinates cultural activities, performances, and related programs.",
  },
  {
    id: "event-management",
    name: "Event Management",
    icon: CalendarCheck,
    description:
      "The Event Management domain is responsible for planning and coordinating Kannada Koota events. It works with different teams to ensure that events are organized and carried out smoothly.",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: HandHeart,
    description:
      "The Hospitality domain takes care of guests, participants, artists, and other attendees during events. It focuses on welcoming them, coordinating their requirements, and ensuring their overall experience is well managed.",
  },
  {
    id: "social-media-marketing",
    name: "Social Media & Marketing",
    icon: Megaphone,
    description:
      "The Social Media & Marketing domain manages Kannada Koota's presence across social media and other digital platforms. It promotes events, activities, and initiatives while helping reach and engage a wider audience.",
  },
  {
    id: "inchara",
    name: "Inchara",
    icon: Mic,
    description:
      "The Inchara domain focuses on music and vocal performances within Kannada Koota. It involves activities such as singing, musical performances, and contributing to cultural programs through music.",
  },
  {
    id: "design-video-editing",
    name: "Design & Video Editing",
    icon: Clapperboard,
    description:
      "The Design & Video Editing domain creates the visual content required by Kannada Koota. This includes designing posters, graphics, promotional materials, and editing videos for events and social media.",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    icon: PenLine,
    description:
      "The Content Writing domain handles the written communication of Kannada Koota. It creates content for announcements, event descriptions, social media, promotional material, and other club-related communications.",
  },
  {
    id: "operations",
    name: "Operations",
    icon: Workflow,
    description:
      "The Operations domain handles the internal coordination required to carry out Kannada Koota's activities effectively. It works on organizing people, resources, and processes to ensure that planned activities are executed properly.",
  },
  {
    id: "public-relations",
    name: "Public Relations",
    icon: MessagesSquare,
    description:
      "The Public Relations domain manages Kannada Koota's communication and relationships with students, organizations, guests, and other external stakeholders. It helps represent the club and maintain effective communication with them.",
  },
  {
    id: "sponsorship",
    name: "Sponsorship",
    icon: Handshake,
    description:
      "The Sponsorship domain works on identifying and approaching potential sponsors for Kannada Koota's events and activities. It handles communication, proposals, and coordination with sponsors to establish partnerships.",
  },
  {
    id: "logistics",
    name: "Logistics",
    icon: Truck,
    description:
      "The Logistics domain handles the practical arrangements required for events and activities. This includes coordinating equipment, materials, transportation, venues, and other on-ground requirements.",
  },
];
