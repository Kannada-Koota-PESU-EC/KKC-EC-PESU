export interface Member {
  id: string;
  name: string; // Kannada first, then English
  role: 'Club Head' | 'Domain Head' | 'Member' | 'Vice Head';
  domain?: string; // Kannada first, then English (for domain heads)
  year: number;
  photo: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  bio?: string;
}

export const teamData: Record<number, Member[]> = {
  2026: [
    {
      id: 'ch-2026-1',
      name: 'ಮಂಜುನಾಥ್ ವಿ / Manjunath V',
      role: 'Club Head',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
    },
    {
      id: 'ch-2026-2', 
      name: 'ಎಸ್ ಧ್ಯಾನ್ / S Dhyan',
      role: 'Vice Head',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/s-dhyan/',
      instagram: 'https://www.instagram.com/s.dhyan_1306/',
    },
    {
      id: 'dh-2026-1',
      name: 'ಧ್ರುವ ಗಿರೀಶ್ / Dhruva Girish',
      role: 'Domain Head',
      domain: 'ಐಟಿ / IT',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/dhruva-girish/',
      instagram: 'https://www.instagram.com/dhruva_0912/',
    },
    {
      id: 'dh-2026-2',
      name: 'ಅರುಣ್ ಆರ್ ಕೆ / Arun R K',
      role: 'Domain Head',
      domain: 'ಈವೆಂಟ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ / Event Management',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/arun-kadli-347200374',
      instagram: 'https://www.instagram.com/arun_r_kadli/',
    },
    {
      id: 'dh-2026-3',
      name: 'ಪಲ್ಲ ತೇಜೇಶ್ವರ್ ರೆಡ್ಡಿ / Palla Tejeswar Reddy',
      role: 'Domain Head', 
      domain: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್ / Logistics',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/palla-tejeswar-reddy',
      instagram: 'https://www.instagram.com/tejeswarp2006/',
    },
    {
      id: 'dh-2026-4',
      name: 'ಸ್ನೇಹ ಹೆಚ್ ಎಸ್ / Sneha H S',
      role: 'Domain Head', 
      domain: 'ಸಾಂಸ್ಕೃತಿಕ / Cultural',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/sneha-h-s-966145372/',
      instagram: 'https://www.instagram.com/snehaaaa._?igsi=aGo3d2JjOGtkM2Jn',
    },
    {
      id: 'dh-2026-5',
      name: 'ಶಿವ ಸ್ವರೂಪ್ ಡಿ ಎಸ್  / Shiva Swaroop D S',
      role: 'Domain Head', 
      domain: 'ವಿನ್ಯಾಸ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪಾದನೆ/ Design and Video Editing',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/swaroop-d-s-1b0253331?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      instagram: 'https://www.instagram.com/swaroopd_s/',
    },
    {
      id: 'dh-2026-6',
      name: 'ದೀಪ್ತಿ ವಿ  / Deepthi V',
      role: 'Domain Head', 
      domain: 'ಸಾಂಸ್ಕೃತಿಕ / Cultural',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/deepthi-venkatesh-1a5a80350/',
      instagram: 'https://www.instagram.com/deepthi_venkatesh211/',
    },
    {
      id: 'dh-2026-7',
      name: 'ತನುಶ್ರೀ ಜಿ ಭಕ್ತ / Tanushree G Bhakta',
      role: 'Domain Head', 
      domain: 'ಅತಿಥಿ ಸತ್ಕಾರ / Hospitality',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/tanushree-bhakta-bab082307/',
      instagram: 'https://www.instagram.com/tanushree_g.b?igsi=am1qcXhkMjZsN2hx',
    },
    {
      id: 'dh-2026-8',
      name: 'ಸುನಾಗ್ ಎನ್ / Sunag N',
      role: 'Domain Head', 
      domain: 'ಮಾರ್ಕೆಟಿಂಗ್ / Marketing',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      instagram: 'https://www.instagram.com/sunag_08_davasam?igsi=OHg5Y3A0c2tobjJt',
      linkedin: 'https://www.linkedin.com/in/sunag-n-b4a972354',
    },
    {
      id: 'dh-2026-9',
      name: 'ಭಕ್ತಿ ಎಸ್ ಪಾಟೀಲ್ / Bhakti S Patil',
      role: 'Domain Head', 
      domain: 'ಛಾಯಾಗ್ರಹಣ / Photography',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/bhakti-s-patil',
      instagram: 'https://www.instagram.com/bhaktiandcamera',
    },
    {
      id: 'dh-2026-10',
      name: 'ವಿನಯ ಕಟ್ನೂರ / Vinay',
      role: 'Domain Head', 
      domain: 'ಸಾಂಸ್ಕೃತಿಕ-ಇಂಚರ / Culturals-INCHARA',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/abhiramahy836',
      instagram: 'https://www.instagram.com/abhirama_hy/',
    },
    {
      id: 'dh-2026-11',
      name: 'ತೇಜಸ್ವಿ ಗಣಪತಿ ಹೆಗಡೆ / Tejaswi Ganapati Hegde',
      role: 'Domain Head', 
      domain: 'ವಿಷಯ ಬರವಣಿಗೆ / Content Writing',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'http://www.linkedin.com/in/tejaswi-hegde-797064320',
      instagram: 'https://www.instagram.com/tejaswi_g_hegde/',
    },
    {
      id: 'dh-2026-12',
      name: "ಯಶಸ್ ಎಸ್ ಎನ್ / Yashas S N',
      role: 'Domain Head', 
      domain: ' ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕಗಳು / Public Relations',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/yashas-sn-a851b3392/',
      instagram: 'https://www.instagram.com/yashasyashu06?igsh=MTY1YmtramQzb2VnMg==',
    },
  ],
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
