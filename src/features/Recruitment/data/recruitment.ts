import {
  CalendarCheck,
  Camera,
  Code2,
  Drama,
  HandHeart,
  Handshake,
  Megaphone,
  MessagesSquare,
  Mic,
  Palette,
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
 * Until a real http(s) link is set, the "Register Now" button is shown
 * as disabled with a "form opens soon" note. No other change is
 * needed once the link is added.
 * ------------------------------------------------------------------ */
export const RECRUITMENT_FORM_URL = "https://forms.gle/QUZBsGsBA94D9b7L9";

export const isRecruitmentFormAvailable = /^https?:\/\//.test(RECRUITMENT_FORM_URL);

export interface RecruitmentDomain {
  id: string;
  name: string;
  kannadaName: string;
  description: string;
  icon: LucideIcon;
}

export const recruitmentDomains: RecruitmentDomain[] = [
  {
    id: "it",
    name: "IT",
    kannadaName: "ಐಟಿ",
    icon: Code2,
    description:
      "Handles the club’s website, digital platforms, and technology needs.\n\nಕನ್ನಡ ಕೂಟದ ವೆಬ್‌ಸೈಟ್, ಡಿಜಿಟಲ್ ವೇದಿಕೆಗಳು ಹಾಗೂ ತಂತ್ರಜ್ಞಾನ ಸಂಬಂಧಿತ ಕಾರ್ಯಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.",
  },
  {
    id: "cultural",
    name: "Cultural",
    kannadaName: "ಸಾಂಸ್ಕೃತಿಕ",
    icon: Drama,
    description:
      "Promotes and celebrates Kannada culture, traditions, arts, and dance through various activities and performances.\n\nಕನ್ನಡ ಸಂಸ್ಕೃತಿ, ಪರಂಪರೆ, ಕಲೆ ಮತ್ತು ನೃತ್ಯವನ್ನು ವಿವಿಧ ಚಟುವಟಿಕೆಗಳು ಹಾಗೂ ಪ್ರದರ್ಶನಗಳ ಮೂಲಕ ಪ್ರಚಾರ ಮಾಡುತ್ತದೆ ಮತ್ತು ಆಚರಿಸುತ್ತದೆ.",
  },
  {
    id: "event-management",
    name: "Event Management",
    kannadaName: "ಕಾರ್ಯಕ್ರಮ ನಿರ್ವಹಣೆ",
    icon: CalendarCheck,
    description:
      "Plans and coordinates events to ensure they run smoothly.\n\nಕಾರ್ಯಕ್ರಮಗಳ ಯೋಜನೆ ಮತ್ತು ಸಮನ್ವಯವನ್ನು ನಿರ್ವಹಿಸಿ ಅವು ಸುಗಮವಾಗಿ ನಡೆಯುವಂತೆ ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    kannadaName: "ಆತಿಥ್ಯ",
    icon: HandHeart,
    description:
      "Welcomes and takes care of guests, participants, and artists during events.\n\nಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಅತಿಥಿಗಳು, ಭಾಗವಹಿಸುವವರು ಹಾಗೂ ಕಲಾವಿದರ ಆತಿಥ್ಯ ಮತ್ತು ಅಗತ್ಯಗಳನ್ನು ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.",
  },
  {
    id: "marketing",
    name: "Marketing and Sponsorship",
    kannadaName: "ಮಾರ್ಕೆಟಿಂಗ್",
    icon: Megaphone,
    description:
      "Promotes the club’s events, activities, and initiatives to reach a wider audience, while connecting with sponsors and building partnerships to support them.\n\nಕನ್ನಡ ಕೂಟದ ಕಾರ್ಯಕ್ರಮಗಳು, ಚಟುವಟಿಕೆಗಳು ಹಾಗೂ ಉಪಕ್ರಮಗಳನ್ನು ಹೆಚ್ಚಿನ ಜನರಿಗೆ ತಲುಪಿಸುವಂತೆ ಪ್ರಚಾರ ಮಾಡುತ್ತದೆ ಮತ್ತು ಅವುಗಳಿಗೆ ಬೆಂಬಲ ನೀಡಲು ಪ್ರಾಯೋಜಕರನ್ನು ಸಂಪರ್ಕಿಸಿ ಸಹಭಾಗಿತ್ವವನ್ನು ಸ್ಥಾಪಿಸುತ್ತದೆ.",
  },
  {
    id: "inchara",
    name: "Inchara",
    kannadaName: "ಇಂಚರ",
    icon: Mic,
    description:
      "Handles music, singing, and instrumental activities, contributing to cultural events through musical performances.\n\nಸಂಗೀತ, ಗಾಯನ ಮತ್ತು ವಾದ್ಯಸಂಗೀತದ ಚಟುವಟಿಕೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ, ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಸಂಗೀತದ ಮೂಲಕ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.",
  },
  {
    id: "design",
    name: "Design and Video Editing",
    kannadaName: "ವಿನ್ಯಾಸ",
    icon: Palette,
    description:
      "Creates posters, graphics, video edits, and other visual content for the club.\n\nಕನ್ನಡ ಕೂಟಕ್ಕೆ ಅಗತ್ಯವಿರುವ ಪೋಸ್ಟರ್‌ಗಳು, ಗ್ರಾಫಿಕ್ಸ್, ವಿಡಿಯೋ ಎಡಿಟಿಂಗ್ ಹಾಗೂ ಇತರ ದೃಶ್ಯಾತ್ಮಕ ವಿಷಯಗಳನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ.",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    kannadaName: "ವಿಷಯ ಬರವಣಿಗೆ",
    icon: PenLine,
    description:
      "Creates written content for announcements, events, social media, and club communications.\n\nಪ್ರಕಟಣೆಗಳು, ಕಾರ್ಯಕ್ರಮಗಳು, ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳು ಹಾಗೂ ಕ್ಲಬ್‌ನ ಸಂವಹನಕ್ಕಾಗಿ ಬರಹಗಳನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.",
  },
  {
    id: "operations",
    name: "Operations",
    kannadaName: "ಕಾರ್ಯಾಚರಣೆ",
    icon: Workflow,
    description:
      "Coordinates people, resources, and processes to ensure smooth club operations.\n\nಜನರು, ಸಂಪನ್ಮೂಲಗಳು ಹಾಗೂ ಕಾರ್ಯವಿಧಾನಗಳ ಸಮನ್ವಯದ ಮೂಲಕ ಕ್ಲಬ್‌ನ ಚಟುವಟಿಕೆಗಳು ಸುಗಮವಾಗಿ ನಡೆಯುವಂತೆ ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.",
  },
  {
    id: "public-relations",
    name: "Public Relations and Promotions",
    kannadaName: "ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕ",
    icon: MessagesSquare,
    description:
      "Manages communication and relationships with students, organizations, guests, and external groups, while driving promotions to increase the club’s reach.\n\nವಿದ್ಯಾರ್ಥಿಗಳು, ಸಂಸ್ಥೆಗಳು, ಅತಿಥಿಗಳು ಹಾಗೂ ಬಾಹ್ಯ ಗುಂಪುಗಳೊಂದಿಗೆ ಸಂವಹನ ಮತ್ತು ಬಾಂಧವ್ಯವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ, ಜೊತೆಗೆ ಕ್ಲಬ್‌ನ ಪ್ರಚಾರ ಕಾರ್ಯಗಳನ್ನು ಮುನ್ನಡೆಸುತ್ತದೆ.",
  },
  {
    id: "photography",
    name: "Photography and Videography",
    kannadaName: "ಛಾಯಾಗ್ರಹಣ ಚಿತ್ರೀಕರಣ",
    icon: Camera,
    description:
      "Captures all the events and performances from the club.\n\nಕ್ಲಬ್‌ನ ಎಲ್ಲಾ ಈವೆಂಟ್‌ಗಳು ಮತ್ತು ಪ್ರದರ್ಶನಗಳ ಫೋಟೋ ಮತ್ತು ವಿಡಿಯೋ ಸೆರೆಹಿಡಿಯಲಾಗುತ್ತದೆ..",
  },
  {
    id: "logistics",
    name: "Logistics",
    kannadaName: "ವ್ಯವಸ್ಥಾಪನೆ",
    icon: Truck,
    description:
      "Manages equipment, materials, transport, venues, and other event-related requirements.\n\nಉಪಕರಣಗಳು, ಸಾಮಗ್ರಿಗಳು, ಸಾರಿಗೆ, ಸ್ಥಳ ಹಾಗೂ ಇತರ ಕಾರ್ಯಕ್ರಮ ಸಂಬಂಧಿತ ಅಗತ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.",
  },
];
