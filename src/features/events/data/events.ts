export interface Event {
  id: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  teaser: string;
  image: string;
  location?: string;
  gallery?: string[];
  registerLink?: string;
}

/**
 * Date-based logic:
 * - Upcoming events: event.date >= today
 * - Past events:     event.date < today
 */

export const events: Event[] = [
  {
    id: '1',
    title: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ Celebration 2025',
    date: '2025-11-07',
    teaser:
      'Join us in commemorating the proud occasion of Karnataka Formation Day with a vibrant and memorable celebration. The event will feature a rich showcase of cultural performances, authentic traditional cuisine, and a warm community gathering.',
    image: '/Events/202k 1.png',
    location: 'PES University EC MRD',
    gallery: [
      '/Events/BK1.png',
      '/Events/BK2.png',
      '/Events/BK3.png',
    ],
  },
  {
    id: '2',
    title: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ Celebration 2024',
    date: '2024-11-01',
    teaser:
      'Join us for a grand celebration of Karnataka Formation Day with cultural performances, traditional food, and community gathering.',
    image: '/Events/2024.jpeg',
    location: 'PES University EC MRD',
    gallery: [
      '/Events/BK1.png',
      '/Events/BK2.png',
      '/Events/BK3.png',
    ],
  },
  {
    id: '3',
    title: 'Kannada Koota X Rotaract',
    date: '2025-09-03',
    teaser:
      'Learn Kannada with us in a fun and engaging way through games, drama, and interactive activities.',
    image: '/Events/KKEC X RT 1.JPG',
    location: 'Seminar Hall 2',
    gallery: [
      '/Events/KKEC X RT 4.JPG',
      '/Events/KKEC X RT 3.JPG',
      '/Events/KKEC X RT 2.JPG',
    ],
  },
  {
    id: '4',
    title: 'Quadrangle Dance',
    date: '2025-09-10',
    teaser:
      'We performed a lively dance in the quadrangle to welcome the new students and showcase our rich Kannada culture.',
    image: '/Events/KKEC DC 1.jpg',
    location: 'Quadrangle PES EC',
    gallery: [
      '/Events/KKEC DC 2.jpg',
      '/Events/KKEC DC 3.png',
      '/Events/KKEC DC 5.png',
    ],
  },
  {
    id: 'club-head',
    title: 'ಹೊಸ ಚಿಗುರು New Crew for 2026',
    date: '2026-02-04',
    teaser: 'We are thrilled to announce a new leadership structure for our club. As we continue to push the boundaries of cultural and community engagement, we welcome a fresh board of Heads and Domain Heads.',
    image: '/Events/club-head.jpg',
  },
  {
    id: 'mahashivratri-dance',
    title: 'ಮಹಾ ಶಿವರಾತ್ರಿ ನೃತ್ಯ ಪ್ರದರ್ಶನು Mahashivratri Dance Performance',
    date: '2026-02-13',
    teaser: 'From silence to resonance,from resonance to rhythm 🎼🎼from rhythm to dance,from dance to devotion 🌟 The Kannada Koota presents a special dance performance for Mahashivratri🌀',
    image: '/Events/mahashivratri-dance1.jpeg',
    gallery: ['/Events/mahashivratri-dance2.jpeg',
    ],
  },
  {
  id: 'blood-donation',
  title: 'ರಕ್ತ ಸ್ಪಂದನು Raktha Spandana',
  date: '2026-03-17',
  teaser: '“Raktha Spandana” — A drop of blood can save a life. A blood donation camp organized by Kannada Koota. Blood donation is the noblest of all donations.',
  image: '/Events/blood-donation.jpeg',
  gallery: [
    '/Events/blood-donation.jpeg'
  ],
},
  {
  id: 'Kalantaranga',
  title: 'ಕಲಾಂತರಂಗ Kalantaranga',
  date: '2026-04-08',
  teaser: 'Kalantaranga - A wave of art, a celebration of your talent.This is your moment to shine.Before the art within you fades, let it surge into a flowing stream — come, make this stage yours ✨ Venue: Seminar Hall 2 Time: 2:30 PM – 4:30 PM Prize pool: ₹3000',
  image: '/Events/Kalantaranga1.jpeg',
  registerLink: 'https://forms.gle/nrLd6SAGNo2kDB8t6',
  gallery: [
    '/Events/Kalantaranga1.jpeg'
  ],
}
];

/* ---------- DATE HELPERS ---------- */

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getUpcomingEvents = () => {
  const today = getToday();

  return events
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
};

export const getPastEvents = () => {
  const today = getToday();

  return events
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < today;
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

export const getEventById = (id: string) =>
  events.find(event => event.id === id);
