import {
  CalendarCheck,
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
export const RECRUITMENT_FORM_URL = "PASTE_GOOGLE_FORM_URL_HERE";

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
      "ಕನ್ನಡ ಕೂಟದ ತಾಂತ್ರಿಕ ಕಾರ್ಯಗಳನ್ನು ನಿರ್ವಹಿಸುವ ವಿಭಾಗವೇ ಐಟಿ ವಿಭಾಗ. ವೆಬ್‌ಸೈಟ್ ಅಭಿವೃದ್ಧಿ, ಡಿಜಿಟಲ್ ವೇದಿಕೆಗಳು ಹಾಗೂ ಕ್ಲಬ್‌ನ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಅಗತ್ಯವಾದ ತಂತ್ರಜ್ಞಾನ ಆಧಾರಿತ ಪರಿಹಾರಗಳನ್ನು ಇದು ನಿರ್ವಹಿಸುತ್ತದೆ.",
  },
  {
    id: "cultural",
    name: "Cultural",
    kannadaName: "ಸಾಂಸ್ಕೃತಿಕ",
    icon: Drama,
    description:
      "ಕನ್ನಡ ಸಂಸ್ಕೃತಿ, ಪರಂಪರೆ ಮತ್ತು ವೈಭವವನ್ನು ಪ್ರತಿನಿಧಿಸಿ ಆಚರಿಸುವುದು ಸಾಂಸ್ಕೃತಿಕ ವಿಭಾಗದ ಮುಖ್ಯ ಉದ್ದೇಶ. ಸಾಂಸ್ಕೃತಿಕ ಚಟುವಟಿಕೆಗಳು, ಕಲಾ ಪ್ರದರ್ಶನಗಳು ಹಾಗೂ ಸಂಬಂಧಿತ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಈ ವಿಭಾಗವು ಆಯೋಜಿಸಿ ಸಂಯೋಜಿಸುತ್ತದೆ.",
  },
  {
    id: "event-management",
    name: "Event Management",
    kannadaName: "ಕಾರ್ಯಕ್ರಮ ನಿರ್ವಹಣೆ",
    icon: CalendarCheck,
    description:
      "ಕನ್ನಡ ಕೂಟದ ವಿವಿಧ ಕಾರ್ಯಕ್ರಮಗಳ ಯೋಜನೆ ಮತ್ತು ಸಂಯೋಜನೆಯ ಜವಾಬ್ದಾರಿಯನ್ನು ಕಾರ್ಯಕ್ರಮ ನಿರ್ವಹಣಾ ವಿಭಾಗವು ವಹಿಸುತ್ತದೆ. ವಿವಿಧ ತಂಡಗಳೊಂದಿಗೆ ಸಮನ್ವಯ ಸಾಧಿಸಿ ಕಾರ್ಯಕ್ರಮಗಳು ಸುಗಮವಾಗಿ ನಡೆಯುವಂತೆ ಈ ವಿಭಾಗವು ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    kannadaName: "ಆತಿಥ್ಯ",
    icon: HandHeart,
    description:
      "ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಆಗಮಿಸುವ ಅತಿಥಿಗಳು, ಭಾಗವಹಿಸುವವರು, ಕಲಾವಿದರು ಹಾಗೂ ಇತರರ ಆತಿಥ್ಯ ಮತ್ತು ಅಗತ್ಯಗಳ ನಿರ್ವಹಣೆಯನ್ನು ಆತಿಥ್ಯ ವಿಭಾಗವು ನೋಡಿಕೊಳ್ಳುತ್ತದೆ. ಅವರನ್ನು ಸ್ವಾಗತಿಸುವುದು, ಅವರ ಅಗತ್ಯಗಳನ್ನು ಸಂಯೋಜಿಸುವುದು ಮತ್ತು ಉತ್ತಮ ಅನುಭವವನ್ನು ಒದಗಿಸುವುದು ಈ ವಿಭಾಗದ ಪ್ರಮುಖ ಕಾರ್ಯವಾಗಿದೆ.",
  },
  {
    id: "marketing",
    name: "Marketing",
    kannadaName: "ಮಾರ್ಕೆಟಿಂಗ್",
    icon: Megaphone,
    description:
      "ಕನ್ನಡ ಕೂಟದ ಕಾರ್ಯಕ್ರಮಗಳು, ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ವಿವಿಧ ಉಪಕ್ರಮಗಳ ಪ್ರಚಾರವನ್ನು ಮಾರ್ಕೆಟಿಂಗ್ ವಿಭಾಗವು ನಿರ್ವಹಿಸುತ್ತದೆ. ಹೆಚ್ಚಿನ ಜನರನ್ನು ತಲುಪಲು ಹಾಗೂ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳ ಬಗ್ಗೆ ಅರಿವು ಮೂಡಿಸಲು ವಿವಿಧ ಪ್ರಚಾರ ಮತ್ತು ಮಾರ್ಕೆಟಿಂಗ್ ಚಟುವಟಿಕೆಗಳನ್ನು ಈ ವಿಭಾಗವು ಕೈಗೊಳ್ಳುತ್ತದೆ.",
  },
  {
    id: "inchara",
    name: "Inchara",
    kannadaName: "ಇಂಚರ",
    icon: Mic,
    description:
      "ಕನ್ನಡ ಕೂಟದ ಸಂಗೀತ ಮತ್ತು ಗಾಯನ ಚಟುವಟಿಕೆಗಳನ್ನು ಇಂಚರ ವಿಭಾಗವು ನಿರ್ವಹಿಸುತ್ತದೆ. ಗಾಯನ, ಸಂಗೀತ ಪ್ರದರ್ಶನಗಳು ಹಾಗೂ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಸಂಗೀತದ ಮೂಲಕ ಕೊಡುಗೆ ನೀಡುವುದು ಈ ವಿಭಾಗದ ಪ್ರಮುಖ ಕಾರ್ಯಗಳಾಗಿವೆ.",
  },
  {
    id: "design",
    name: "Design",
    kannadaName: "ವಿನ್ಯಾಸ",
    icon: Palette,
    description:
      "ಕನ್ನಡ ಕೂಟಕ್ಕೆ ಅಗತ್ಯವಿರುವ ದೃಶ್ಯಾತ್ಮಕ ವಿಷಯಗಳನ್ನು ಸೃಷ್ಟಿಸುವುದು ವಿನ್ಯಾಸ ವಿಭಾಗದ ಕಾರ್ಯವಾಗಿದೆ. ಪೋಸ್ಟರ್‌ಗಳು, ಗ್ರಾಫಿಕ್ಸ್, ಪ್ರಚಾರ ಸಾಮಗ್ರಿಗಳು ಹಾಗೂ ಇತರ ದೃಶ್ಯ ವಿನ್ಯಾಸಗಳನ್ನು ಈ ವಿಭಾಗವು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    kannadaName: "ವಿಷಯ ಬರವಣಿಗೆ",
    icon: PenLine,
    description:
      "ಕನ್ನಡ ಕೂಟದ ಲಿಖಿತ ಸಂವಹನವನ್ನು ನಿರ್ವಹಿಸುವುದು ವಿಷಯ ಬರವಣಿಗೆ ವಿಭಾಗದ ಕಾರ್ಯವಾಗಿದೆ. ಪ್ರಕಟಣೆಗಳು, ಕಾರ್ಯಕ್ರಮಗಳ ವಿವರಣೆಗಳು, ಸಾಮಾಜಿಕ ಜಾಲತಾಣದ ವಿಷಯಗಳು, ಪ್ರಚಾರ ಸಾಮಗ್ರಿಗಳು ಹಾಗೂ ಇತರ ಕ್ಲಬ್ ಸಂಬಂಧಿತ ಬರಹಗಳನ್ನು ಈ ವಿಭಾಗವು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.",
  },
  {
    id: "operations",
    name: "Operations",
    kannadaName: "ಕಾರ್ಯಾಚರಣೆ",
    icon: Workflow,
    description:
      "ಕನ್ನಡ ಕೂಟದ ಚಟುವಟಿಕೆಗಳನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ನಡೆಸಲು ಅಗತ್ಯವಾದ ಆಂತರಿಕ ಸಮನ್ವಯವನ್ನು ಕಾರ್ಯಾಚರಣೆ ವಿಭಾಗವು ನೋಡಿಕೊಳ್ಳುತ್ತದೆ. ಜನರು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಕಾರ್ಯವಿಧಾನಗಳನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಸಂಘಟಿಸಿ ಯೋಜಿತ ಚಟುವಟಿಕೆಗಳು ಸರಿಯಾಗಿ ಕಾರ್ಯಗತಗೊಳ್ಳುವಂತೆ ಈ ವಿಭಾಗವು ಖಚಿತಪಡಿಸುತ್ತದೆ.",
  },
  {
    id: "public-relations",
    name: "Public Relations",
    kannadaName: "ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕ",
    icon: MessagesSquare,
    description:
      "ವಿದ್ಯಾರ್ಥಿಗಳು, ಸಂಸ್ಥೆಗಳು, ಅತಿಥಿಗಳು ಹಾಗೂ ಇತರ ಬಾಹ್ಯ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಸಂಸ್ಥೆಗಳೊಂದಿಗೆ ಕನ್ನಡ ಕೂಟದ ಸಂವಹನ ಮತ್ತು ಸಂಬಂಧಗಳನ್ನು ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕ ವಿಭಾಗವು ನಿರ್ವಹಿಸುತ್ತದೆ. ಕ್ಲಬ್ ಅನ್ನು ಸೂಕ್ತವಾಗಿ ಪ್ರತಿನಿಧಿಸುವುದು ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಸಂವಹನವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುವುದು ಈ ವಿಭಾಗದ ಪ್ರಮುಖ ಕಾರ್ಯವಾಗಿದೆ.",
  },
  {
    id: "sponsorship",
    name: "Sponsorship",
    kannadaName: "ಪ್ರಾಯೋಜಕತ್ವ",
    icon: Handshake,
    description:
      "ಕನ್ನಡ ಕೂಟದ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳಿಗೆ ಪ್ರಾಯೋಜಕರನ್ನು ಗುರುತಿಸಿ ಸಂಪರ್ಕಿಸುವ ಕಾರ್ಯವನ್ನು ಪ್ರಾಯೋಜಕತ್ವ ವಿಭಾಗವು ನಿರ್ವಹಿಸುತ್ತದೆ. ಪ್ರಾಯೋಜಕರೊಂದಿಗೆ ಸಂವಹನ, ಪ್ರಸ್ತಾವನೆಗಳ ಸಿದ್ಧತೆ ಹಾಗೂ ಸಹಭಾಗಿತ್ವವನ್ನು ಸ್ಥಾಪಿಸಲು ಅಗತ್ಯವಾದ ಸಮನ್ವಯವನ್ನು ಈ ವಿಭಾಗವು ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.",
  },
  {
    id: "logistics",
    name: "Logistics",
    kannadaName: "ವ್ಯವಸ್ಥಾಪನೆ",
    icon: Truck,
    description:
      "ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳಿಗೆ ಅಗತ್ಯವಿರುವ ಪ್ರಾಯೋಗಿಕ ವ್ಯವಸ್ಥೆಗಳನ್ನು ನಿರ್ವಹಿಸುವುದು ವ್ಯವಸ್ಥಾಪನಾ ವಿಭಾಗದ ಕಾರ್ಯವಾಗಿದೆ. ಉಪಕರಣಗಳು, ಸಾಮಗ್ರಿಗಳು, ಸಾರಿಗೆ, ಸ್ಥಳ ಹಾಗೂ ಇತರ ಕಾರ್ಯಕ್ರಮ ಸ್ಥಳದ ಅಗತ್ಯತೆಗಳ ಸಮನ್ವಯವನ್ನು ಈ ವಿಭಾಗವು ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.",
  },
];
