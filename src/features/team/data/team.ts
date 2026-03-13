export interface Member {
  id: string;
  name: string; // Kannada first, then English
  role: 'Club Head' | 'Domain Head' | 'Member';
  domain?: string; // Kannada first, then English (for domain heads)
  year: number;
  photo: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  bio?: string;
}

export const teamData: Record<number, Member[]> = {
  2025: [
    {
      id: 'ch-2025-1',
      name: 'ಗಣೇಶ್ ಹೆಗಡೆ / Ganesh',
      role: 'Club Head',
      year: 2025,
      photo: '/DomainHeads/ganesh.JPG',
    },
    {
      id: 'ch-2025-2', 
      name: 'ಅಚ್ಯುತ / Achyuth',
      role: 'Club Head',
      year: 2025,
      photo: '/DomainHeads/achyuth.JPG',
      linkedin: 'https://www.linkedin.com/in/achyuth-h/',
      instagram: 'https://www.instagram.com/_achyuth___/',
    },
    {
      id: 'dh-2025-1',
      name: 'ಶರತ್ ಗೌಡ / Sharath',
      role: 'Domain Head',
      domain: 'ಐಟಿ / IT',
      year: 2025,
      photo: '/DomainHeads/sharath.JPG',
      linkedin: 'https://www.linkedin.com/in/sharath-gowda-g-r-372832281/',
      github: 'https://github.com/DiganthGowdaGR',
      instagram: 'https://www.instagram.com/diganth_gr/',
    },
    {
      id: 'dh-2025-2',
      name: 'ಕುಶಾಲ್ ತೊರಗಲ್ / Kushal',
      role: 'Domain Head',
      domain: 'ಈವೆಂಟ್ / Event',
      year: 2025,
      photo: '/DomainHeads/kushal.JPG',
      linkedin: 'https://www.linkedin.com/in/kushal-toragal',
    },
    {
      id: 'dh-2025-3',
      name: 'ಸುಮನ್ / Suman',
      role: 'Domain Head', 
      domain: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್ / Logistics',
      year: 2025,
      photo: '/DomainHeads/suman.JPG',
      linkedin: 'https://www.linkedin.com/in/suman-kumar-k-r-0a4837304',
      instagram: 'https://www.instagram.com/suman_kumar_k_r',
    },
    {
      id: 'dh-2025-4',
      name: 'ಸುಮನಾ / Sumana',
      role: 'Domain Head', 
      domain: 'ಸಾಂಸ್ಕೃತಿಕ / Cultural',
      year: 2025,
      photo: '/DomainHeads/sumana.JPG',
      instagram: 'https://www.instagram.com/sumana_ag',
      linkedin: 'https://www.linkedin.com/in/sumana-a-g-7862ba360',
    },
    {
      id: 'dh-2025-5',
      name: 'ರೋಹನ್ / Rohan',
      role: 'Domain Head', 
      domain: 'ವಿನ್ಯಾಸ / Design',
      year: 2025,
      photo: '/DomainHeads/rohan.JPG',
      instagram: 'https://www.instagram.com/rohan134v',
      linkedin: 'https://www.linkedin.com/in/rohan-a09b11298',
    },
    {
      id: 'dh-2025-6',
      name: 'ಅನನ್ಯ ಸತೀಶ್ / Ananya',
      role: 'Domain Head', 
      domain: 'ಸಾಂಸ್ಕೃತಿಕ / Cultural',
      year: 2025,
      photo: '/DomainHeads/ananya.JPG',
      instagram: 'https://www.instagram.com/ananya.satish_',
      linkedin: 'http://linkedin.com/in/ananya-satish-31b465323',
    },
    {
      id: 'dh-2025-7',
      name: 'ಸಿರಿ ಬಸವರಾಜ್ / Siri',
      role: 'Domain Head', 
      domain: 'ಅತಿಥಿ ಸತ್ಕಾರ / Hospitality',
      year: 2025,
      photo: '/DomainHeads/siri.JPG',
      linkedin: 'https://www.linkedin.com/in/siri-basavaraj/',
    },
    {
      id: 'dh-2025-8',
      name: 'ಪ್ರೇಕ್ಷಾ / Preksha',
      role: 'Domain Head', 
      domain: 'ಮಾರ್ಕೆಟಿಂಗ್ / Marketing',
      year: 2025,
      photo: '/DomainHeads/preksha.JPG',
      instagram: 'https://www.instagram.com/prekshaa__._',
      linkedin: 'http://www.linkedin.com/in/preksha-prakash-',
    },
    {
      id: 'dh-2025-9',
      name: 'ಕವನ್ ರೆಡ್ಡಿ / Kavan',
      role: 'Domain Head', 
      domain: 'ಮೀಡಿಯಾ / Media',
      year: 2025,
      photo: '/DomainHeads/kavan.JPG',
      instagram: 'https://www.instagram.com/_kavan_reddy',
    },
    {
      id: 'dh-2025-10',
      name: 'ವಿನಯ ಕಟ್ನೂರ / Vinay',
      role: 'Domain Head', 
      domain: 'ಪ್ರಾಯೋಜಕತ್ವ / Sponsorship',
      year: 2025,
      photo: '/DomainHeads/vinay.JPG',
    },
    {
      id: 'dh-2025-11',
      name: 'ಚಿತ್ರಾ ಮದರಖಂಡಿ / Chitra',
      role: 'Domain Head', 
      domain: 'ವಿಷಯ ಬರವಣಿಗೆ / Content Writing',
      year: 2025,
      photo: '/DomainHeads/chitra.JPG',
      linkedin: 'https://www.linkedin.com/in/chitra-madarakhandi-15b8162a0',
      instagram: 'https://www.instagram.com/chitramadarakhandi',
    },
    {
      id: 'dh-2025-12',
      name: 'ಸೃಜನ ಕಶ್ಯಪ್ / Srujan',
      role: 'Domain Head', 
      domain: 'ಕಾರ್ಯಾಚರಣೆಗಳು / Operations',
      year: 2025,
      photo: '/DomainHeads/srujan.JPG',
      linkedin: 'https://www.linkedin.com/in/srujan-kashyap-s-610944282',
      instagram: 'https://www.instagram.com/srujan.kashyap._',
    },
    {
      id: 'dh-2025-13',
      name: 'ರುಚಿತ / Ruchitha',
      role: 'Domain Head', 
      domain: ' ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕಗಳು / Public Relations',
      year: 2025,
      photo: '/DomainHeads/ruchitha.JPG',
      linkedin: 'https://www.linkedin.com/in/ruchitha-m-334681315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      instagram: 'https://www.instagram.com/itz_ruchi103?igsh=MW92MGlhc3l2emg0YQ==',
    },
  ],
  2024: [
    {
      id: 'ch-2024-1',
      name: 'NA',
      role: 'Club Head',
      year: 2024,
      photo: '/Hero/KK1.jpeg',
      linkedin: 'https://linkedin.com/in/NA',
    }
  ]
};

// Utility functions
export const getTeamByYear = (year: number): Member[] => {
  return teamData[year] || [];
};

export const getAllYears = (): number[] => {
  return Object.keys(teamData)
    .map(year => parseInt(year))
    .sort((a, b) => b - a);
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const getClubHeads = (year: number): Member[] => {
  const team = getTeamByYear(year);
  return team.filter(member => member.role === 'Club Head');
};

export const getDomainHeads = (year: number): Member[] => {
  const team = getTeamByYear(year);
  return team.filter(member => member.role === 'Domain Head');
};

export const getMembers = (year: number): Member[] => {
  const team = getTeamByYear(year);
  return team.filter(member => member.role === 'Member');
};
