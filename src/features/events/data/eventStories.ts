import { events } from "@/features/events/data/events";
import type { Event } from "@/features/events/data/events";

export interface EventStory {
  heading: string;
  description: string[];
  highlights: string[];
}

/** Editorial copy for each event, keyed by URL slug. */
export const eventStories: Record<string, EventStory> = {
  "kannada-rajyotsava-2025": {
    heading: "ಕನ್ನಡವೇ ನಮ್ಮ ಹೆಮ್ಮೆ",
    description: [
      "Kannada Rajyotsava is a celebration of the language, heritage, and identity that bring Kannadigas together. It is a moment to honour the beauty of Kannada and the cultural legacy passed down through generations.",
      "Through cultural performances, traditional expressions, and the collective spirit of students, Kannada Koota brings the campus together to celebrate Karnataka's rich heritage.",
    ],
    highlights: [
      "Celebrating Kannada language and literature",
      "Showcasing Karnataka's cultural traditions",
      "Bringing students together through a shared love for Kannada",
      "Keeping our heritage alive for the next generation",
    ],
  },

  "kannada-rajyotsava-2024": {
    heading: "ಒಂದೇ ಭಾಷೆ, ಅನೇಕ ಭಾವನೆಗಳು",
    description: [
      "Kannada Rajyotsava is more than a celebration on the calendar. It is a reminder of the stories, traditions, music, and values that make Kannada a vital part of our identity.",
      "The celebration gives students an opportunity to reconnect with their roots while sharing their culture with the wider campus community. Every expression of Kannada pride becomes part of a larger story: a culture that continues to grow while remaining connected to its origins.",
    ],
    highlights: [
      "Celebrating Kannada identity and pride",
      "Cultural expressions inspired by Karnataka's heritage",
      "A shared platform for students to celebrate their roots",
      "Unity through language and culture",
    ],
  },

  "kannada-koota-rotaract": {
    heading: "ಸಂಸ್ಕೃತಿಯ ಜೊತೆ ಸೇವೆಯೂ ಇರಲಿ",
    description: [
      "When cultural identity meets the spirit of community service, meaningful connections begin. The collaboration between Kannada Koota and Rotaract brings together students who believe campus life should be about more than academics.",
      "It creates an opportunity to connect through shared initiatives, teamwork, and a common interest in making a positive difference. It represents the idea that student communities become stronger when they work together and exchange ideas.",
    ],
    highlights: [
      "Collaboration between student communities",
      "Teamwork and shared responsibility",
      "Opportunities to connect across communities",
      "Cooperation and collective effort",
    ],
  },

  "quadrangle-dance": {
    heading: "ಹೆಜ್ಜೆ ಹೆಜ್ಜೆಯಲ್ಲೂ ಸಂಭ್ರಮ",
    description: [
      "A campus quadrangle can become more than a place to walk through. With music, movement, and a crowd ready to join the moment, it becomes a stage where students can express themselves freely.",
      "Quadrangle Dance brings energy into everyday campus life through the universal language of dance. It celebrates expression, confidence, rhythm, and the excitement of experiencing culture in a shared public space.",
    ],
    highlights: [
      "Dance and movement in an open campus setting",
      "A lively atmosphere powered by music and performance",
      "A platform for creative expression",
      "Shared moments that make campus life memorable",
    ],
  },

  "new-crew-2026": {
    heading: "ಹೊಸ ಮುಖಗಳು, ಹೊಸ ಕನಸುಗಳು",
    description: [
      "Every new team brings a fresh set of ideas, perspectives, and possibilities. ಹೊಸ ಚಿಗುರು represents the beginning of another chapter for Kannada Koota, welcoming a new generation of students ready to contribute their creativity and enthusiasm.",
      "A student community grows when its members bring their individual strengths together. This new chapter is about building connections, learning through collaboration, and carrying forward Kannada Koota's cultural spirit while making room for new ideas.",
    ],
    highlights: [
      "Fresh perspectives and new beginnings",
      "Teamwork and shared responsibility",
      "Opportunities to learn, contribute, and grow",
      "Continuing Kannada Koota's cultural journey",
    ],
  },

  "mahashivratri-dance": {
    heading: "ನಾದದಿಂದ ನೃತ್ಯಕ್ಕೆ, ನೃತ್ಯದಿಂದ ಭಕ್ತಿಗೆ",
    description: [
      "From silence to resonance, from resonance to rhythm, from rhythm to dance, and from dance to devotion — the Mahashivratri dance performance brings together movement, music, and spirituality.",
      "Inspired by the significance of Mahashivratri, the performance offers a cultural expression of devotion through dance. Every movement contributes to an atmosphere shaped by rhythm, concentration, and reverence.",
      "The performance connects artistic expression with a deeper cultural tradition, allowing dance to become more than choreography: it becomes a way to express devotion.",
    ],
    highlights: [
      "A dance performance inspired by Mahashivratri",
      "The connection between rhythm, movement, and devotion",
      "Artistic expression rooted in Indian cultural traditions",
      "A visual celebration of spirituality through dance",
    ],
  },

  "raktha-spandana": {
    heading: "ಒಂದು ಹನಿ ರಕ್ತ, ಮತ್ತೊಂದು ಜೀವಕ್ಕೆ ಆಶಾಕಿರಣ",
    description: [
      "Blood donation is a simple act with the potential to make an extraordinary difference. Raktha Spandana centres on helping others and recognising that a small contribution from one person can become a lifeline for another.",
      "The initiative encourages awareness, compassion, and responsibility towards the wider community. It reminds us that service does not always require grand gestures. Sometimes, choosing to help is enough to become part of something meaningful.",
    ],
    highlights: [
      "Raising awareness about blood donation",
      "Promoting compassion and community responsibility",
      "Highlighting the importance of helping those in need",
      "Inspiring students to think beyond themselves",
    ],
  },

  kalantaranga: {
    heading: "ಪ್ರತಿಭೆಗೆ ವೇದಿಕೆ, ಕಲೆಗೆ ಹೊಸ ಆಯಾಮ",
    description: [
      "Every student has a story to tell, and art gives that story a voice. Kalantaranga celebrates creativity, individuality, and the many ways people express themselves through artistic talent.",
      "It is an invitation to step forward, explore new possibilities, and share what makes each person's creative perspective unique. The spirit of Kalantaranga lies in giving creativity the space to flourish.",
    ],
    highlights: [
      "Celebrating creativity and artistic expression",
      "Encouraging students to share their talents",
      "Creating space for individuality and originality",
      "Bringing different creative perspectives together",
    ],
  },

  "nritya-lahari": {
    heading: "ಕನ್ನಡದ ಲಯ, ಸಂಸ್ಕೃತಿಯ ಬಣ್ಣ",
    description: [
      "Dance is more than a sequence of steps. It is a language of emotion, rhythm, grace, and storytelling. Nritya Lahari celebrates this language through movement inspired by the richness of Indian and Kannada cultural traditions.",
      "Every performance offers an opportunity to experience the connection between music and movement, discipline and expression, tradition and creativity.",
      "Nritya Lahari brings the spirit of dance into the spotlight, celebrating the dedication it takes to transform practice into performance.",
    ],
    highlights: [
      "Celebrating dance as a form of storytelling",
      "Exploring rhythm, expression, and movement",
      "Showcasing the relationship between art and culture",
      "Bringing audiences and performers together through dance",
    ],
  },
};

/** Event id -> URL slug. Events not listed here automatically get a slug made from their id. */
const slugById: Record<string, string> = {
  "1": "kannada-rajyotsava-2025",
  "2": "kannada-rajyotsava-2024",
  "3": "kannada-koota-rotaract",
  "4": "quadrangle-dance",
  "club-head": "new-crew-2026",
  "mahashivratri-dance": "mahashivratri-dance",
  "blood-donation": "raktha-spandana",
  Kalantaranga: "kalantaranga",
  Nritya_Lahari: "nritya-lahari",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getEventSlug(event: Pick<Event, "id">): string {
  return slugById[event.id] ?? slugify(event.id);
}

export function getEventBySlug(slug: string | undefined): Event | undefined {
  if (!slug) return undefined;

  return events.find((event) => getEventSlug(event) === slug);
}

export function getEventStory(event: Pick<Event, "id">): EventStory | undefined {
  return eventStories[getEventSlug(event)];
}