export type Language = 'kn' | 'en';

// Text that exists in both languages
export interface Localized {
  kn: string;
  en: string;
}

/**
 * Splits data written as "ಕನ್ನಡ / English" (the convention used in team data)
 * into its two halves. Text without a "/" is used for both languages.
 */
export const splitBilingual = (text: string): Localized => {
  const slash = text.indexOf('/');
  if (slash === -1) return { kn: text.trim(), en: text.trim() };
  return { kn: text.slice(0, slash).trim(), en: text.slice(slash + 1).trim() };
};

// UI strings. Use {name} placeholders for values filled in at render time.
export const translations = {
  // Site
  'brand.full': { kn: 'ಕನ್ನಡ ಕೂಟ ಇ.ಸಿ. ಪಿ.ಇ.ಎಸ್.ಯು.', en: 'Kannada Koota EC PESU' },
  'brand.short': { kn: 'ಕನ್ನಡ ಕೂಟ', en: 'KKEC' },
  'brand.name': { kn: 'ಕನ್ನಡ ಕೂಟ', en: 'Kannada Koota' },
  'brand.logoAlt': { kn: 'ಕನ್ನಡ ಕೂಟದ ಲಾಂಛನ', en: 'Kannada Koota Logo' },
  'brand.tagline': { kn: 'ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಭಾಷೆಯ ಸಂರಕ್ಷಣೆಗಾಗಿ ನಮ್ಮ ಪ್ರಯತ್ನ', en: 'Our effort to preserve Kannada culture and language' },

  // Page header
  'header.eyebrow': { kn: 'ಕನ್ನಡ ಕೂಟ · ಪಿ.ಇ.ಎಸ್.ಯು ಇ.ಸಿ', en: 'Kannada Koota · PESU EC' },

  // Language toggle
  'lang.groupLabel': { kn: 'ಭಾಷೆ ಆಯ್ಕೆ', en: 'Choose language' },

  // Navigation
  'nav.home': { kn: 'ಮುಖಪುಟ', en: 'Home' },
  'nav.events': { kn: 'ಕಾರ್ಯಕ್ರಮಗಳು', en: 'Events' },
  'nav.blogs': { kn: 'ಬ್ಲಾಗ್‌ಗಳು', en: 'Blogs' },
  'nav.team': { kn: 'ತಂಡ', en: 'Team' },
  'nav.contact': { kn: 'ಸಂಪರ್ಕ', en: 'Contact' },
  'nav.toggleMenu': { kn: 'ಮೆನು ತೆರೆಯಿರಿ ಅಥವಾ ಮುಚ್ಚಿರಿ', en: 'Toggle navigation menu' },

  // Common
  'common.readMore': { kn: 'ಇನ್ನಷ್ಟು ಓದಿ', en: 'Read More' },
  'common.showLess': { kn: 'ಕಡಿಮೆ ತೋರಿಸಿ', en: 'Show Less' },
  'common.close': { kn: 'ಮುಚ್ಚಿ', en: 'Close' },

  // Home: hero
  'hero.subtitle': {
    kn: 'ಪಿ.ಇ.ಎಸ್. ವಿಶ್ವವಿದ್ಯಾಲಯದ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಆವರಣದಲ್ಲಿ ಕನ್ನಡ ಸಂಸ್ಕೃತಿ, ಭಾಷೆ ಮತ್ತು ಸಂಪ್ರದಾಯಗಳ ಸಂಭ್ರಮ',
    en: 'Celebrating Kannada culture, language, and traditions at PES University Electronic City Campus',
  },
  'hero.eyebrow': { kn: 'ಪಿ.ಇ.ಎಸ್. ವಿಶ್ವವಿದ್ಯಾಲಯ · ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ', en: 'PES University · Electronic City' },
  'hero.titleLine1': { kn: 'ಕನ್ನಡ ಕೂಟ', en: 'Kannada Koota' },
  'hero.titleLine2': { kn: 'ಇ.ಸಿ. ಪಿ.ಇ.ಎಸ್.ಯು.', en: 'EC PESU' },
  'hero.aboutUs': { kn: 'ನಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ', en: 'About us' },
  'hero.viewEvents': { kn: 'ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ', en: 'View events' },
  'hero.scroll': { kn: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ', en: 'Scroll' },
  'hero.goToSlide': { kn: '{n}ನೇ ಚಿತ್ರಕ್ಕೆ ಹೋಗಿ', en: 'Go to slide {n}' },

  // Home: gallery

  // Home: upcoming event
  'upcoming.tag': { kn: 'ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮ', en: 'Upcoming event' },
  'upcoming.days': { kn: 'ದಿನ', en: 'Days' },
  'upcoming.hours': { kn: 'ಗಂಟೆ', en: 'Hours' },
  'upcoming.mins': { kn: 'ನಿಮಿಷ', en: 'Mins' },
  'upcoming.secs': { kn: 'ಸೆಕೆಂಡ್', en: 'Secs' },
  'upcoming.startsIn': { kn: 'ಆರಂಭಕ್ಕೆ ಉಳಿದ ಸಮಯ', en: 'Starts in' },
  'upcoming.now': { kn: 'ಕಾರ್ಯಕ್ರಮ ಈಗ ನಡೆಯುತ್ತಿದೆ!', en: 'Happening now!' },
  'upcoming.viewDetails': { kn: 'ವಿವರಗಳನ್ನು ನೋಡಿ', en: 'View details' },
  'upcoming.register': { kn: 'ನೋಂದಾಯಿಸಿ', en: 'Register' },

  // Home: about
  'about.imageAlt': { kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಗೆಯಲ್ಲಿ ಕನ್ನಡ ಕೂಟದ ಸದಸ್ಯರು', en: 'Kannada Koota club members in traditional attire' },
  'about.community': { kn: 'ನಮ್ಮ ಸಮುದಾಯ', en: 'Our Community' },
  'about.eyebrow': { kn: 'ನಮ್ಮ ಕಥೆ', en: 'Our story' },
  'about.headingWhite': { kn: 'ಕನ್ನಡ ಕೂಟದ ', en: 'About ' },
  'about.headingGradient': { kn: 'ಬಗ್ಗೆ', en: 'Kannada Koota' },
  'about.intro': {
    kn: 'ಕನ್ನಡ ಕೂಟ ಇ.ಸಿ. ಪಿ.ಇ.ಎಸ್.ಯು. ಕರ್ನಾಟಕದ ಶ್ರೀಮಂತ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸಿ ಪ್ರೋತ್ಸಾಹಿಸಲು ಮೀಸಲಾದ ಚೈತನ್ಯಶೀಲ ಸಾಂಸ್ಕೃತಿಕ ಕೂಟ. ಕನ್ನಡ ಭಾಷೆ, ಸಾಹಿತ್ಯ, ಕಲೆ ಮತ್ತು ಸಂಪ್ರದಾಯಗಳ ಬಗ್ಗೆ ಒಲವು ಹೊಂದಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ನಾವು ಒಂದುಗೂಡಿಸುತ್ತೇವೆ.',
    en: 'Kannada Koota EC PESU is a vibrant cultural club dedicated to preserving and promoting the rich heritage of Karnataka. We bring together students who share a passion for Kannada language, literature, arts, and traditions.',
  },
  'about.culturalEvents': { kn: 'ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು', en: 'Cultural Events' },
  'about.regularCelebrations': { kn: 'ನಿಯಮಿತ ಆಚರಣೆಗಳು', en: 'Regular celebrations' },
  'about.workshops': { kn: 'ಕಾರ್ಯಾಗಾರಗಳು', en: 'Workshops' },
  'about.skillDevelopment': { kn: 'ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ', en: 'Skill development' },
  'about.literature': { kn: 'ಕಾವ್ಯ ಮತ್ತು ಸಾಹಿತ್ಯ', en: 'Poetry & Literature' },
  'about.literatureSub': { kn: 'ಕನ್ನಡ ಬರಹ ಮತ್ತು ಕಾವ್ಯ ವಾಚನ', en: 'Kannada writing and recitals' },
  'about.outreach': { kn: 'ಸಮುದಾಯ ಸಂಪರ್ಕ', en: 'Community Outreach' },
  'about.outreachSub': { kn: 'ಸಮಾಜ ಸೇವೆ ಮತ್ತು ಸಹಭಾಗಿತ್ವ', en: 'Service and partnerships' },
  'about.body': {
    kn: 'ನಮ್ಮ ಕೂಟವು ಸಂಪ್ರದಾಯ ಮತ್ತು ಆಧುನಿಕತೆಯ ನಡುವಿನ ಸೇತುವೆಯಾಗಿ, ಸಾಂಸ್ಕೃತಿಕ ಉತ್ಸವಗಳು, ಕಾವ್ಯ ಕಾರ್ಯಾಗಾರಗಳು, ಸಾಂಪ್ರದಾಯಿಕ ಅಡುಗೆ ಶಿಬಿರಗಳು ಮತ್ತು ಸಮುದಾಯ ಸಂಪರ್ಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುತ್ತದೆ. ಪ್ರತಿಯೊಬ್ಬರೂ ಕನ್ನಡ ಸಂಸ್ಕೃತಿಯ ಸೊಬಗನ್ನು ಕಲಿತು ಮೆಚ್ಚಬಹುದಾದ, ಎಲ್ಲರನ್ನೂ ಒಳಗೊಳ್ಳುವ ವಾತಾವರಣವನ್ನು ನಿರ್ಮಿಸುವುದರಲ್ಲಿ ನಾವು ನಂಬಿಕೆ ಇಟ್ಟಿದ್ದೇವೆ.',
    en: 'Our club serves as a bridge between tradition and modernity, organizing cultural festivals, poetry workshops, traditional cooking sessions, and community outreach programs. We believe in creating an inclusive environment where everyone can learn and appreciate the beauty of Kannada culture.',
  },
  'about.missionTitle': { kn: 'ನಮ್ಮ ಧ್ಯೇಯ', en: 'Our Mission' },
  'about.mission': {
    kn: 'ವಿದ್ಯಾರ್ಥಿಗಳು ತಮ್ಮ ಸಾಂಸ್ಕೃತಿಕ ಬೇರುಗಳೊಂದಿಗೆ ಬೆಸೆದುಕೊಳ್ಳುತ್ತಾ, ಶಾಶ್ವತ ಸ್ನೇಹ ಮತ್ತು ನೆನಪುಗಳನ್ನು ಕಟ್ಟಿಕೊಳ್ಳುವ ವೇದಿಕೆಯನ್ನು ಸೃಷ್ಟಿಸುವುದು. ಅಪ್ಪಟ ಅನುಭವಗಳು ಮತ್ತು ಅರ್ಥಪೂರ್ಣ ಪಾಲ್ಗೊಳ್ಳುವಿಕೆಯ ಮೂಲಕ ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ವೈವಿಧ್ಯ ಮತ್ತು ಶ್ರೀಮಂತಿಕೆಯನ್ನು ಪ್ರದರ್ಶಿಸುವುದು ನಮ್ಮ ಗುರಿ.',
    en: "To create a platform where students can connect with their cultural roots while building lasting friendships and memories. We aim to showcase the diversity and richness of Karnataka's cultural landscape through authentic experiences and meaningful engagement.",
  },
  'about.whatWeDo': { kn: 'ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ', en: 'What We Do' },
  'about.do1': { kn: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ಮತ್ತು ಮೈಸೂರು ದಸರಾದಂತಹ ಸಾಂಪ್ರದಾಯಿಕ ಹಬ್ಬಗಳ ಆಯೋಜನೆ', en: 'Organize traditional festivals like Kannada Rajyotsava and Mysore Dasara' },
  'about.do2': { kn: 'ಕನ್ನಡದಲ್ಲಿ ಕಾವ್ಯ ಮತ್ತು ಸಾಹಿತ್ಯ ಕಾರ್ಯಾಗಾರಗಳು', en: 'Conduct poetry and literature workshops in Kannada' },
  'about.do3': { kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಅಡುಗೆ ಮತ್ತು ಕರಕುಶಲ ಶಿಬಿರಗಳು', en: 'Host traditional cooking and crafts sessions' },
  'about.do4': { kn: 'ಸಾಂಸ್ಕೃತಿಕ ಪ್ರದರ್ಶನಗಳು ಮತ್ತು ಸಂಗೀತ ಕಛೇರಿಗಳು', en: 'Arrange cultural performances and music concerts' },
  'about.do5': { kn: 'ಸಮುದಾಯ ಸಹಭಾಗಿತ್ವ ಮತ್ತು ಸಂಪರ್ಕ ಕಾರ್ಯಕ್ರಮಗಳು', en: 'Build community partnerships and outreach programs' },
  'about.quote': { kn: '"ಕನ್ನಡ ನಾಡು ನುಡಿ ಬೆಳದಿಂಗ್ಳಾಗಿ ಬೆಳೆಯಲಿ"', en: '"May the Kannada land and language flourish like the bright moon"' },
  'about.meetTeam': { kn: 'ನಮ್ಮ ತಂಡವನ್ನು ಭೇಟಿಯಾಗಿ', en: 'Meet Our Team' },

  // Republic Day popup
  'republic.title': { kn: '🇮🇳 ಗಣರಾಜ್ಯೋತ್ಸವದ ಶುಭಾಶಯಗಳು 🇮🇳', en: '🇮🇳 Happy Republic Day 🇮🇳' },
  'republic.message': { kn: 'ಸಂವಿಧಾನ ನಮ್ಮ ಶಕ್ತಿ, ನಮ್ಮ ಹೆಮ್ಮೆ', en: 'The Constitution is our strength, our pride' },
  'republic.imageAlt': { kn: 'ಗಣರಾಜ್ಯೋತ್ಸವದ ಶುಭಾಶಯಗಳು', en: 'Happy Republic Day' },

  // Events
  'events.title': { kn: 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು', en: 'All Events' },
  'events.subtitle': { kn: 'ನಮ್ಮ ಮುಂಬರುವ ಮತ್ತು ಹಿಂದಿನ ಆಚರಣೆಗಳನ್ನು ನೋಡಿ.', en: 'Explore our upcoming and past celebrations.' },
  'events.upcoming': { kn: 'ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು', en: 'Upcoming Events' },
  'events.noUpcoming': { kn: 'ಸದ್ಯಕ್ಕೆ ಯಾವುದೇ ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳಿಲ್ಲ.', en: 'No upcoming events right now.' },
  'events.noUpcomingHint': { kn: 'ಹೊಸ ಕಾರ್ಯಕ್ರಮಗಳಿಗಾಗಿ ಶೀಘ್ರದಲ್ಲೇ ಭೇಟಿ ನೀಡಿ!', en: 'Check back soon for new events!' },
  'events.count': { kn: '{n} ಕಾರ್ಯಕ್ರಮಗಳು', en: '{n} events' },
  'events.countOne': { kn: '1 ಕಾರ್ಯಕ್ರಮ', en: '1 event' },
  'events.past': { kn: 'ಹಿಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು', en: 'Past Events' },
  'events.noPast': { kn: 'ಹಿಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.', en: 'No past events available.' },
  'events.badgeUpcoming': { kn: 'ಮುಂಬರುವ', en: 'Upcoming' },
  'events.badgeCompleted': { kn: 'ಮುಗಿದಿದೆ', en: 'Completed' },
  'events.register': { kn: 'ಈಗಲೇ ನೋಂದಾಯಿಸಿ', en: 'Register Now' },
  'events.gallery': { kn: 'ಚಿತ್ರಸಂಪುಟ', en: 'Gallery' },
  'events.galleryCount': { kn: 'ಚಿತ್ರಸಂಪುಟ · {n}', en: 'Gallery · {n}' },
  'events.share': { kn: 'ಹಂಚಿಕೊಳ್ಳಿ', en: 'Share' },
  'events.linkCopied': { kn: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!', en: 'Link copied!' },
  'events.filterAll': { kn: 'ಎಲ್ಲಾ', en: 'All' },
  'events.filterLabel': { kn: 'ವರ್ಷದ ಪ್ರಕಾರ ನೋಡಿ', en: 'Filter by year' },
  'events.prevImage': { kn: 'ಹಿಂದಿನ ಚಿತ್ರ', en: 'Previous image' },
  'events.nextImage': { kn: 'ಮುಂದಿನ ಚಿತ್ರ', en: 'Next image' },
  'events.galleryImageAlt': { kn: 'ಚಿತ್ರ {n}', en: 'Gallery image {n}' },
  'events.popupImageAlt': { kn: '{title} - ಚಿತ್ರ', en: '{title} gallery image' },

  // Team
  'team.title': { kn: 'ನಮ್ಮ ತಂಡ', en: 'Our Team' },
  'team.subtitle': { kn: 'ನಮ್ಮ ಸಮುದಾಯವನ್ನು ಮುನ್ನಡೆಸುವ ಸಮರ್ಪಿತ ವ್ಯಕ್ತಿಗಳನ್ನು ಭೇಟಿಯಾಗಿ.', en: 'Meet the dedicated individuals who drive our community forward.' },
  'team.batch': { kn: 'ತಂಡದ ವರ್ಷ:', en: 'Batch of:' },
  'team.memberCount': { kn: '{n} ಸದಸ್ಯರು', en: '{n} members' },
  'team.memberCountOne': { kn: '1 ಸದಸ್ಯರು', en: '1 member' },
  'team.noMembers': { kn: '{year}ರ ಸಾಲಿಗೆ ಯಾವುದೇ ಸದಸ್ಯರು ಕಂಡುಬಂದಿಲ್ಲ', en: 'No members found for {year}' },
  'team.noMembersHint': { kn: 'ದಯವಿಟ್ಟು ಬೇರೆ ವರ್ಷವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನಂತರ ಪರಿಶೀಲಿಸಿ.', en: 'Please select another year or check back later.' },
  'team.joinTitle': { kn: 'ನಮ್ಮ ತಂಡವನ್ನು ಸೇರಲು ಆಸಕ್ತಿ ಇದೆಯೇ?', en: 'Interested in Joining Our Team?' },
  'team.joinBody': { kn: 'ನಮ್ಮ ಧ್ಯೇಯಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುವ ಉತ್ಸಾಹಿಗಳನ್ನು ನಾವು ಸದಾ ಹುಡುಕುತ್ತಿರುತ್ತೇವೆ.', en: 'We are always looking for passionate individuals to contribute to our mission.' },
  'team.contactUs': { kn: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ', en: 'Contact Us' },
  'team.socialProfile': { kn: '{name} ಅವರ {platform} ಖಾತೆ', en: "{name}'s {platform} profile" },

  // Blogs
  'blogs.title': { kn: 'ಬ್ಲಾಗ್‌ಗಳು', en: 'Blogs' },
  'blogs.subtitle': { kn: 'ನಮ್ಮ ಕಾರ್ಯಕ್ರಮಗಳ ಕ್ಷಣಗಳು ಮತ್ತು ನೆನಪುಗಳು.', en: 'Moments and memories from our events.' },
  'blogs.reel': { kn: 'ರೀಲ್', en: 'Reel' },
  'blogs.play': { kn: 'ಪ್ಲೇ ಮಾಡಿ', en: 'Play' },
  'blogs.pause': { kn: 'ವಿರಾಮ', en: 'Pause' },
  'blogs.mute': { kn: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ', en: 'Mute' },
  'blogs.unmute': { kn: 'ಧ್ವನಿ ಆನ್ ಮಾಡಿ', en: 'Unmute' },
  'blogs.fullscreen': { kn: 'ಪೂರ್ಣ ಪರದೆ', en: 'Fullscreen' },
  'blogs.progress': { kn: 'ವಿಡಿಯೋ ಪ್ರಗತಿ', en: 'Video progress' },
  'blogs.prev': { kn: 'ಹಿಂದಿನ ವಿಡಿಯೋ', en: 'Previous video' },
  'blogs.next': { kn: 'ಮುಂದಿನ ವಿಡಿಯೋ', en: 'Next video' },

  // Contact
  'contact.title': { kn: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ', en: 'Contact Us' },
  'contact.subtitle': {
    kn: 'ಪ್ರಶ್ನೆಗಳು, ಸಲಹೆಗಳಿವೆಯೇ ಅಥವಾ ನಮ್ಮೊಂದಿಗೆ ಕೈಜೋಡಿಸಲು ಬಯಸುವಿರಾ? ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಕಾತುರರಾಗಿದ್ದೇವೆ!',
    en: "Have questions, suggestions, or want to get involved? We'd love to hear from you!",
  },
  'contact.email': { kn: 'ಇಮೇಲ್', en: 'Email' },
  'contact.instagram': { kn: 'ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್', en: 'Instagram' },
  'contact.location': { kn: 'ಸ್ಥಳ', en: 'Location' },

  'contact.copyEmail': { kn: 'ಇಮೇಲ್ ನಕಲಿಸಿ', en: 'Copy email' },
  'contact.copied': { kn: 'ನಕಲಿಸಲಾಗಿದೆ!', en: 'Copied!' },
  'contact.formTitle': { kn: 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ', en: 'Send us a message' },
  'contact.name': { kn: 'ಹೆಸರು', en: 'Name' },
  'contact.subject': { kn: 'ವಿಷಯ', en: 'Subject' },
  'contact.message': { kn: 'ಸಂದೇಶ', en: 'Message' },
  'contact.subjectGeneral': { kn: 'ಸಾಮಾನ್ಯ ವಿಚಾರಣೆ', en: 'General enquiry' },
  'contact.subjectJoin': { kn: 'ತಂಡ ಸೇರಲು', en: 'Join the team' },
  'contact.subjectCollab': { kn: 'ಸಹಯೋಗ', en: 'Collaboration' },
  'contact.subjectOther': { kn: 'ಇತರೆ', en: 'Other' },
  'contact.errorName': { kn: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ', en: 'Please enter your name' },
  'contact.errorEmail': { kn: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ', en: 'Please enter your email' },
  'contact.errorEmailInvalid': { kn: 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ', en: 'Please enter a valid email address' },
  'contact.errorMessage': { kn: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಬರೆಯಿರಿ', en: 'Please write your message' },
  'contact.send': { kn: 'ಕಳುಹಿಸಿ', en: 'Send' },
  'contact.sending': { kn: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…', en: 'Sending…' },
  'contact.success': { kn: 'ಧನ್ಯವಾದಗಳು! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.', en: "Thank you! We'll get back to you soon." },
  'contact.mailtoOpened': {
    kn: 'ನಿಮ್ಮ ಇಮೇಲ್ ಆ್ಯಪ್ ತೆರೆಯಲಾಗಿದೆ. ಸಂದೇಶ ತಲುಪಲು ಅಲ್ಲಿ "ಕಳುಹಿಸಿ" ಒತ್ತಿ.',
    en: 'Your email app has opened. Press Send there to deliver your message.',
  },
  'contact.failure': { kn: 'ಸಂದೇಶ ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.', en: "Couldn't send your message. Please try again." },
  'contact.openMaps': { kn: 'ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ', en: 'Open in Maps' },
  'contact.mapTitle': { kn: 'ಪಿ.ಇ.ಎಸ್. ವಿಶ್ವವಿದ್ಯಾಲಯ ಇ.ಸಿ. ಆವರಣದ ನಕ್ಷೆ', en: 'Map of PES University Electronic City Campus' },

  // Footer
  'footer.about': {
    kn: 'ಪಿ.ಇ.ಎಸ್. ವಿಶ್ವವಿದ್ಯಾಲಯದ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಆವರಣದಲ್ಲಿ ಕನ್ನಡ ಸಂಸ್ಕೃತಿ, ಭಾಷೆ ಮತ್ತು ಸಂಪ್ರದಾಯಗಳನ್ನು ಆಚರಿಸುತ್ತಾ ಸಂರಕ್ಷಿಸುತ್ತಿದ್ದೇವೆ.',
    en: 'Celebrating and preserving Kannada culture, language, and traditions at PES University Electronic City Campus.',
  },
  'footer.brand': { kn: 'ಕನ್ನಡ ಕೂಟ ಇ.ಸಿ', en: 'Kannada Koota EC' },
  'footer.quickLinks': { kn: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು', en: 'Quick Links' },
  'footer.getInTouch': { kn: 'ಸಂಪರ್ಕದಲ್ಲಿರಿ', en: 'Get in Touch' },
  'footer.followUs': { kn: 'ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ', en: 'Follow Us' },
  'footer.instagramLabel': { kn: 'ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್‌ನಲ್ಲಿ ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ', en: 'Follow us on Instagram' },
  'footer.stayUpdated': { kn: 'ನಮ್ಮ ಇತ್ತೀಚಿನ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳ ಮಾಹಿತಿ ಪಡೆಯುತ್ತಿರಿ', en: 'Stay updated with our latest events and activities' },
  'footer.rights': { kn: '© {year} ಕನ್ನಡ ಕೂಟ ಇ.ಸಿ. ಪಿ.ಇ.ಎಸ್.ಯು. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.', en: '© {year} Kannada Koota EC PESU. All rights reserved.' },
  // {heart} is replaced by the pulsing heart
  'footer.madeWith': { kn: 'ಕನ್ನಡ ಸಂಸ್ಕೃತಿಗಾಗಿ {heart} ಯಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ', en: 'Made with {heart} for preserving Kannada culture' },
  'footer.backToTop': { kn: 'ಮೇಲಕ್ಕೆ ಹೋಗಿ', en: 'Back to top' },
  'social.followInstagram': { kn: 'Instagram‌ನಲ್ಲಿ ಅನುಸರಿಸಿ', en: 'Follow us on Instagram' },

  // 404
  'notFound.message': { kn: 'ಅಯ್ಯೋ! ಈ ಪುಟ ಸಿಗಲಿಲ್ಲ', en: "Oops! This page wasn't found" },
  'notFound.hint': { kn: 'ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟ ಇಲ್ಲ ಅಥವಾ ಸ್ಥಳಾಂತರಗೊಂಡಿದೆ.', en: "The page you're looking for doesn't exist or has moved." },
  'notFound.home': { kn: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ', en: 'Back to home' },
} satisfies Record<string, Localized>;

export type TranslationKey = keyof typeof translations;
