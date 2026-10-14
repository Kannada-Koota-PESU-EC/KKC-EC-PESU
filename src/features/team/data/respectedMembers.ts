/**
 * Respected members shown at the top of the Team page, in this order.
 * Separate from the year-wise team data; does not change when the year changes.
 * Photos live in public/Respectives. Leave photo empty to show the person's initials instead.
 */
export interface RespectedMember {
  id: string;
  name: string;
  titleEn: string;
  titleKn: string;
  photo?: string;
  /** Featured founder card on its own row: gold ring, glow and memorial line */
  inMemory?: boolean;
}

export const respectedHeading = {
  kn: 'ನಮ್ಮ ಗೌರವಾನ್ವಿತರು',
  en: 'Our Respected Members',
};

// Shown as "ಸವಿ ನೆನಪು · In Loving Memory" under the founder
export const memorialLabel = {
  kn: 'ಸವಿ ನೆನಪು',
  en: 'In Loving Memory',
};

export const respectedMembers: RespectedMember[] = [
  {
    id: 'mr-doreswamy',
    name: 'Dr. M. R. Doreswamy',
    titleEn: 'Founder, PES Institutions',
    titleKn: 'ಸಂಸ್ಥಾಪಕರು',
    photo: '/Respectives/dr-m-r-doreswamy.png',
    inMemory: true,
  },
  {
    id: 'jawahar-doreswamy',
    name: 'Prof. Jawahar Doreswamy',
    titleEn: 'Chancellor',
    titleKn: 'ಕುಲಾಧಿಪತಿಗಳು',
    photo: '/Respectives/prof-jawahar-doreswamy.png',
  },
  {
    id: 'suryaprasad',
    name: 'Dr. J Suryaprasad',
    titleEn: 'Vice Chancellor',
    titleKn: 'ಉಪ ಕುಲಾಧಿಪತಿಗಳು',
    photo: '/Respectives/dr-j-suryaprasad.png',
  },
  {
    id: 'subhash-kulkarni',
    name: 'Dr. Subhash S. Kulkarni',
    titleEn: 'Principal',
    titleKn: 'ಪ್ರಾಂಶುಪಾಲರು',
    photo: '/Respectives/dr-subhash-s-kulkarni.png',
  },
  {
    id: 'lakshmi-narayanam',
    name: 'Lakshmi Satya Vani Narayanam',
    titleEn: 'Faculty Coordinator, Kannada Koota',
    titleKn: 'ಕನ್ನಡ ಕೂಟದ ಮಾರ್ಗದರ್ಶಕರು',
    photo: '/Respectives/lakshmi-satya-vani-narayanam.png',
  },
];

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
