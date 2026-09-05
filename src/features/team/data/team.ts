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
      linkedin: 'http://www.linkedin.com/in/manjunath-v-66ba84315',
      instagram: 'https://www.instagram.com/__manjunath__nayak__?igsi=MTlpMDk2aDFsNGs3aA==',
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
      name: 'ಅಭಿರಾಮ ಹೆಚ್ ವೈ / Abhirama H Y',
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
      id: 'dh-2026-11',
      name: 'ಅಶ್ಮಿತಾ ಶ್ರೀ ಆನಂದ್ / Ashmitha Sri Anand',
      role: 'Domain Head', 
      domain: 'ಕಾರ್ಯಾಚರಣೆಗಳು / Operations',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/ashmitha-sri-anand-92849231b/',
      instagram: 'https://www.instagram.com/justagirl10451',
    },
    {
      id: 'dh-2026-12',
      name: 'ಯಶಸ್ ಎಸ್ ಎನ್ / Yashas S N',
      role: 'Domain Head', 
      domain: ' ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕಗಳು / Public Relations',
      year: 2026,
      photo: '/DomainHeads/photo.jpeg',
      linkedin: 'https://www.linkedin.com/in/yashas-sn-a851b3392/',
      instagram: 'https://www.instagram.com/yashasyashu06?igsh=MTY1YmtramQzb2VnMg==',
    },
  ],
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
  return team.filter(member => member.role === 'Club Head' || member.role === 'Vice Head');
};

export const getDomainHeads = (year: number): Member[] => {
  const team = getTeamByYear(year);
  return team.filter(member => member.role === 'Domain Head');
};

export const getMembers = (year: number): Member[] => {
  const team = getTeamByYear(year);
  return team.filter(member => member.role === 'Member');
};
