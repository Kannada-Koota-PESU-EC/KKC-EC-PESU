import { MAP } from "@/features/karunadu/data/map-path";

/* Everything here is a name (Kannada + English) used as a visual label.
 * Coordinates are approximate district headquarters / site locations. */

export function project(lat: number, lon: number) {
  return {
    x: (lon - MAP.minLon) * MAP.cosLat * MAP.scale + MAP.pad,
    y: (MAP.maxLat - lat) * MAP.scale + MAP.pad,
  };
}

export interface Place {
  kn: string;
  en: string;
  lat: number;
  lon: number;
}

export const DISTRICTS: Place[] = [
  { kn: "ಬೀದರ್", en: "Bidar", lat: 17.91, lon: 77.52 },
  { kn: "ಕಲಬುರಗಿ", en: "Kalaburagi", lat: 17.33, lon: 76.83 },
  { kn: "ಯಾದಗಿರಿ", en: "Yadgir", lat: 16.77, lon: 77.14 },
  { kn: "ವಿಜಯಪುರ", en: "Vijayapura", lat: 16.83, lon: 75.71 },
  { kn: "ರಾಯಚೂರು", en: "Raichur", lat: 16.21, lon: 77.36 },
  { kn: "ಬಾಗಲಕೋಟೆ", en: "Bagalkote", lat: 16.18, lon: 75.7 },
  { kn: "ಬೆಳಗಾವಿ", en: "Belagavi", lat: 15.85, lon: 74.5 },
  { kn: "ಕೊಪ್ಪಳ", en: "Koppal", lat: 15.35, lon: 76.15 },
  { kn: "ಗದಗ", en: "Gadag", lat: 15.43, lon: 75.63 },
  { kn: "ಧಾರವಾಡ", en: "Dharwad", lat: 15.46, lon: 75.01 },
  { kn: "ವಿಜಯನಗರ", en: "Vijayanagara", lat: 15.27, lon: 76.39 },
  { kn: "ಬಳ್ಳಾರಿ", en: "Ballari", lat: 15.14, lon: 76.92 },
  { kn: "ಉತ್ತರ ಕನ್ನಡ", en: "Uttara Kannada", lat: 14.81, lon: 74.13 },
  { kn: "ಹಾವೇರಿ", en: "Haveri", lat: 14.79, lon: 75.4 },
  { kn: "ದಾವಣಗೆರೆ", en: "Davanagere", lat: 14.46, lon: 75.92 },
  { kn: "ಚಿತ್ರದುರ್ಗ", en: "Chitradurga", lat: 14.23, lon: 76.4 },
  { kn: "ಶಿವಮೊಗ್ಗ", en: "Shivamogga", lat: 13.93, lon: 75.57 },
  { kn: "ಉಡುಪಿ", en: "Udupi", lat: 13.34, lon: 74.75 },
  { kn: "ಚಿಕ್ಕಮಗಳೂರು", en: "Chikkamagaluru", lat: 13.32, lon: 75.77 },
  { kn: "ತುಮಕೂರು", en: "Tumakuru", lat: 13.34, lon: 77.1 },
  { kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", en: "Chikkaballapura", lat: 13.43, lon: 77.73 },
  { kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", en: "Bengaluru Rural", lat: 13.25, lon: 77.71 },
  { kn: "ಕೋಲಾರ", en: "Kolar", lat: 13.14, lon: 78.13 },
  { kn: "ಹಾಸನ", en: "Hassan", lat: 13.01, lon: 76.1 },
  { kn: "ದಕ್ಷಿಣ ಕನ್ನಡ", en: "Dakshina Kannada", lat: 12.91, lon: 74.86 },
  { kn: "ಬೆಂಗಳೂರು", en: "Bengaluru Urban", lat: 12.97, lon: 77.59 },
  { kn: "ರಾಮನಗರ", en: "Ramanagara", lat: 12.72, lon: 77.28 },
  { kn: "ಮಂಡ್ಯ", en: "Mandya", lat: 12.52, lon: 76.9 },
  { kn: "ಕೊಡಗು", en: "Kodagu", lat: 12.42, lon: 75.74 },
  { kn: "ಮೈಸೂರು", en: "Mysuru", lat: 12.3, lon: 76.64 },
  { kn: "ಚಾಮರಾಜನಗರ", en: "Chamarajanagar", lat: 11.93, lon: 76.94 },
];

export type LandmarkKind = "temple" | "palace" | "fort" | "dome" | "falls" | "statue" | "nature" | "inscription" | "city";

export interface Landmark extends Place {
  kind: LandmarkKind;
}

export const LANDMARKS: Landmark[] = [
  { kn: "ಹಂಪಿ", en: "Hampi", lat: 15.335, lon: 76.46, kind: "temple" },
  { kn: "ಬಾದಾಮಿ", en: "Badami", lat: 15.92, lon: 75.68, kind: "temple" },
  { kn: "ಪಟ್ಟದಕಲ್ಲು", en: "Pattadakal", lat: 15.95, lon: 75.82, kind: "temple" },
  { kn: "ಐಹೊಳೆ", en: "Aihole", lat: 16.02, lon: 75.88, kind: "temple" },
  { kn: "ಬೇಲೂರು", en: "Belur", lat: 13.16, lon: 75.86, kind: "temple" },
  { kn: "ಹಳೇಬೀಡು", en: "Halebidu", lat: 13.21, lon: 75.99, kind: "temple" },
  { kn: "ಶ್ರವಣಬೆಳಗೊಳ", en: "Shravanabelagola", lat: 12.86, lon: 76.48, kind: "statue" },
  { kn: "ಗೋಳ ಗುಮ್ಮಟ", en: "Gol Gumbaz", lat: 16.83, lon: 75.73, kind: "dome" },
  { kn: "ಮೈಸೂರು ಅರಮನೆ", en: "Mysuru Palace", lat: 12.305, lon: 76.655, kind: "palace" },
  { kn: "ಜೋಗ ಜಲಪಾತ", en: "Jog Falls", lat: 14.23, lon: 74.81, kind: "falls" },
  { kn: "ಚಿತ್ರದುರ್ಗದ ಕೋಟೆ", en: "Chitradurga Fort", lat: 14.22, lon: 76.4, kind: "fort" },
  { kn: "ಬೀದರ್ ಕೋಟೆ", en: "Bidar Fort", lat: 17.92, lon: 77.53, kind: "fort" },
  { kn: "ಕಿತ್ತೂರು", en: "Kittur", lat: 15.6, lon: 74.78, kind: "fort" },
  { kn: "ಹಲ್ಮಿಡಿ", en: "Halmidi", lat: 13.03, lon: 75.98, kind: "inscription" },
  { kn: "ಮುರುಡೇಶ್ವರ", en: "Murudeshwar", lat: 14.09, lon: 74.48, kind: "statue" },
  { kn: "ಶೃಂಗೇರಿ", en: "Sringeri", lat: 13.42, lon: 75.25, kind: "temple" },
  { kn: "ಉಡುಪಿ ಶ್ರೀಕೃಷ್ಣ ಮಠ", en: "Udupi Sri Krishna Matha", lat: 13.34, lon: 74.75, kind: "temple" },
  { kn: "ಕೂಡಲಸಂಗಮ", en: "Kudalasangama", lat: 16.2, lon: 76.07, kind: "temple" },
  { kn: "ತಲಕಾವೇರಿ", en: "Talakaveri", lat: 12.38, lon: 75.49, kind: "nature" },
  { kn: "ಬಾಬಾಬುಡನ್‌ಗಿರಿ", en: "Bababudangiri", lat: 13.43, lon: 75.73, kind: "nature" },
  { kn: "ನಂದಿ ಬೆಟ್ಟ", en: "Nandi Hills", lat: 13.37, lon: 77.68, kind: "nature" },
  { kn: "ಬಂಡೀಪುರ", en: "Bandipur", lat: 11.68, lon: 76.63, kind: "nature" },
  { kn: "ವಿಧಾನ ಸೌಧ", en: "Vidhana Soudha", lat: 12.98, lon: 77.59, kind: "city" },
];

/* Rivers as approximate polylines (lat, lon) */
export const RIVERS: { kn: string; en: string; points: [number, number][] }[] = [
  {
    kn: "ಕಾವೇರಿ",
    en: "Kaveri",
    points: [
      [12.38, 75.49], [12.46, 75.96], [12.42, 76.4], [12.42, 76.57], [12.42, 76.69], [12.3, 77.0], [12.3, 77.17], [12.26, 77.45], [12.13, 77.77],
    ],
  },
  {
    kn: "ಕೃಷ್ಣಾ",
    en: "Krishna",
    points: [
      [16.68, 74.62], [16.6, 75.1], [16.45, 75.55], [16.33, 75.88], [16.2, 76.35], [16.3, 76.9], [16.42, 77.45],
    ],
  },
  {
    kn: "ತುಂಗಭದ್ರಾ",
    en: "Tungabhadra",
    points: [
      [13.93, 75.57], [14.2, 75.66], [14.51, 75.8], [14.85, 76.02], [15.27, 76.34], [15.34, 76.46], [15.6, 76.75], [15.85, 77.15], [15.95, 77.45],
    ],
  },
  {
    kn: "ಶರಾವತಿ",
    en: "Sharavathi",
    points: [[13.95, 75.1], [14.1, 74.95], [14.23, 74.81], [14.28, 74.45]],
  },
];

export const REGIONS = [
  { id: "karavali", kn: "ಕರಾವಳಿ", en: "Karavali" },
  { id: "malenadu", kn: "ಮಲೆನಾಡು", en: "Malenadu" },
  { id: "mysuru", kn: "ಹಳೇ ಮೈಸೂರು", en: "Old Mysuru" },
  { id: "bayaluseeme", kn: "ಬಯಲುಸೀಮೆ", en: "Bayaluseeme" },
  { id: "kittur", kn: "ಕಿತ್ತೂರು ಕರ್ನಾಟಕ", en: "Kittur Karnataka" },
  { id: "kalyana", kn: "ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ", en: "Kalyana Karnataka" },
  { id: "bengaluru", kn: "ಬೆಂಗಳೂರು", en: "Bengaluru" },
] as const;

export type ArtStyle =
  | "yakshagana" | "dollu" | "puppet" | "kasuti" | "bidri" | "mysore-painting" | "channapatna"
  | "ilkal" | "huli" | "kamsale" | "sandalwood" | "kinnal" | "veeragase" | "bharatanatya" | "mysore-silk" | "navalgund";

export const ARTS: { kn: string; en: string; style: ArtStyle }[] = [
  { kn: "ಯಕ್ಷಗಾನ", en: "Yakshagana", style: "yakshagana" },
  { kn: "ಡೊಳ್ಳು ಕುಣಿತ", en: "Dollu Kunitha", style: "dollu" },
  { kn: "ತೊಗಲು ಗೊಂಬೆಯಾಟ", en: "Togalu Gombeyata", style: "puppet" },
  { kn: "ಕಸೂತಿ", en: "Kasuti", style: "kasuti" },
  { kn: "ಬಿದರಿ ಕಲೆ", en: "Bidriware", style: "bidri" },
  { kn: "ಮೈಸೂರು ಚಿತ್ರಕಲೆ", en: "Mysore Painting", style: "mysore-painting" },
  { kn: "ಚನ್ನಪಟ್ಟಣದ ಗೊಂಬೆಗಳು", en: "Channapatna Toys", style: "channapatna" },
  { kn: "ಇಳಕಲ್ ಸೀರೆ", en: "Ilkal Saree", style: "ilkal" },
  { kn: "ಮೈಸೂರು ರೇಷ್ಮೆ", en: "Mysore Silk", style: "mysore-silk" },
  { kn: "ಹುಲಿ ವೇಷ", en: "Huli Vesha", style: "huli" },
  { kn: "ಕಂಸಾಳೆ", en: "Kamsale", style: "kamsale" },
  { kn: "ವೀರಗಾಸೆ", en: "Veeragase", style: "veeragase" },
  { kn: "ಶ್ರೀಗಂಧದ ಕೆತ್ತನೆ", en: "Sandalwood Carving", style: "sandalwood" },
  { kn: "ಕಿನ್ನಾಳ ಕಲೆ", en: "Kinnal Craft", style: "kinnal" },
  { kn: "ನವಲಗುಂದ ಜಮಖಾನ", en: "Navalgund Durries", style: "navalgund" },
  { kn: "ಭರತನಾಟ್ಯ", en: "Bharatanatyam", style: "bharatanatya" },
];

export const FESTIVALS = [
  { kn: "ಯುಗಾದಿ", en: "Ugadi" },
  { kn: "ಮಕರ ಸಂಕ್ರಾಂತಿ", en: "Makara Sankranti" },
  { kn: "ಮೈಸೂರು ದಸರಾ", en: "Mysuru Dasara" },
  { kn: "ದೀಪಾವಳಿ", en: "Deepavali" },
  { kn: "ಗೌರಿ ಗಣೇಶ", en: "Gowri Ganesha" },
  { kn: "ಬೆಂಗಳೂರು ಕರಗ", en: "Bengaluru Karaga" },
  { kn: "ಕಂಬಳ", en: "Kambala" },
  { kn: "ಹಂಪಿ ಉತ್ಸವ", en: "Hampi Utsava" },
  { kn: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ", en: "Kannada Rajyotsava" },
  { kn: "ಕಡಲೆಕಾಯಿ ಪರಿಷೆ", en: "Kadalekai Parishe" },
  { kn: "ಹುತ್ತರಿ", en: "Huttari" },
  { kn: "ನಾಗರ ಪಂಚಮಿ", en: "Nagara Panchami" },
];

export type FoodShape = "rice" | "ball" | "sweet-block" | "sweet-round" | "dosa" | "roti" | "vada" | "bun" | "coffee" | "chutney" | "payasa" | "kosambari" | "holige" | "spiral";

export const FOODS: { kn: string; en: string; shape: FoodShape; color: string }[] = [
  { kn: "ಬಿಸಿ ಬೇಳೆ ಬಾತ್", en: "Bisi Bele Bath", shape: "rice", color: "#c4561b" },
  { kn: "ರಾಗಿ ಮುದ್ದೆ", en: "Ragi Mudde", shape: "ball", color: "#6b4a3a" },
  { kn: "ಮೈಸೂರು ಪಾಕ್", en: "Mysore Pak", shape: "sweet-block", color: "#e3a93b" },
  { kn: "ಧಾರವಾಡ ಪೇಡ", en: "Dharwad Pedha", shape: "sweet-round", color: "#8a5a2b" },
  { kn: "ಒಬ್ಬಟ್ಟು / ಹೋಳಿಗೆ", en: "Obbattu", shape: "holige", color: "#e6b85c" },
  { kn: "ನೀರ್ ದೋಸೆ", en: "Neer Dosa", shape: "dosa", color: "#f6efe0" },
  { kn: "ಅಕ್ಕಿ ರೊಟ್ಟಿ", en: "Akki Rotti", shape: "roti", color: "#efdcae" },
  { kn: "ಜೋಳದ ರೊಟ್ಟಿ", en: "Jolada Rotti", shape: "roti", color: "#e8d6a8" },
  { kn: "ಮದ್ದೂರು ವಡೆ", en: "Maddur Vade", shape: "vada", color: "#b8742e" },
  { kn: "ಮಂಗಳೂರು ಬನ್ಸ್", en: "Mangaluru Buns", shape: "bun", color: "#d9984a" },
  { kn: "ಕೋಸಂಬರಿ", en: "Kosambari", shape: "kosambari", color: "#e8c74a" },
  { kn: "ಪಾಯಸ", en: "Payasa", shape: "payasa", color: "#f3e3c3" },
  { kn: "ಚಟ್ನಿ", en: "Chutney", shape: "chutney", color: "#7fb069" },
  { kn: "ಕೋಡುಬಳೆ", en: "Kodubale", shape: "spiral", color: "#c98a3b" },
  { kn: "ಫಿಲ್ಟರ್ ಕಾಫಿ", en: "Filter Coffee", shape: "coffee", color: "#5b3a22" },
];

export const DYNASTIES = [
  { kn: "ಕದಂಬರು", en: "Kadambas" },
  { kn: "ಗಂಗರು", en: "Western Gangas" },
  { kn: "ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು", en: "Chalukyas of Badami" },
  { kn: "ರಾಷ್ಟ್ರಕೂಟರು", en: "Rashtrakutas" },
  { kn: "ಕಲ್ಯಾಣಿ ಚಾಲುಕ್ಯರು", en: "Chalukyas of Kalyani" },
  { kn: "ಹೊಯ್ಸಳರು", en: "Hoysalas" },
  { kn: "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ", en: "Vijayanagara Empire" },
  { kn: "ಮೈಸೂರು ಒಡೆಯರು", en: "Wodeyars of Mysore" },
];

export const HEROES = [
  { kn: "ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ", en: "Kittur Rani Chennamma" },
  { kn: "ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ", en: "Sangolli Rayanna" },
  { kn: "ಒನಕೆ ಓಬವ್ವ", en: "Onake Obavva" },
  { kn: "ರಾಣಿ ಅಬ್ಬಕ್ಕ", en: "Rani Abbakka" },
  { kn: "ಕೆಳದಿ ಚೆನ್ನಮ್ಮ", en: "Keladi Chennamma" },
  { kn: "ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ", en: "Sir M. Visvesvaraya" },
];

export const POETS = [
  { kn: "ಪಂಪ", en: "Pampa" },
  { kn: "ಪೊನ್ನ", en: "Ponna" },
  { kn: "ರನ್ನ", en: "Ranna" },
  { kn: "ಬಸವಣ್ಣ", en: "Basavanna" },
  { kn: "ಅಕ್ಕಮಹಾದೇವಿ", en: "Akka Mahadevi" },
  { kn: "ಅಲ್ಲಮಪ್ರಭು", en: "Allama Prabhu" },
  { kn: "ಹರಿಹರ", en: "Harihara" },
  { kn: "ಕುಮಾರವ್ಯಾಸ", en: "Kumaravyasa" },
  { kn: "ಪುರಂದರದಾಸ", en: "Purandara Dasa" },
  { kn: "ಕನಕದಾಸ", en: "Kanaka Dasa" },
  { kn: "ಸರ್ವಜ್ಞ", en: "Sarvajna" },
  { kn: "ಮುದ್ದಣ", en: "Muddana" },
];

/* The eight Jnanpith laureates in Kannada */
export const JNANPITH = [
  { kn: "ಕುವೆಂಪು", en: "Kuvempu" },
  { kn: "ದ. ರಾ. ಬೇಂದ್ರೆ", en: "D. R. Bendre" },
  { kn: "ಶಿವರಾಮ ಕಾರಂತ", en: "Shivaram Karanth" },
  { kn: "ಮಾಸ್ತಿ ವೆಂಕಟೇಶ ಅಯ್ಯಂಗಾರ್", en: "Masti Venkatesha Iyengar" },
  { kn: "ವಿ. ಕೃ. ಗೋಕಾಕ", en: "V. K. Gokak" },
  { kn: "ಯು. ಆರ್. ಅನಂತಮೂರ್ತಿ", en: "U. R. Ananthamurthy" },
  { kn: "ಗಿರೀಶ್ ಕಾರ್ನಾಡ್", en: "Girish Karnad" },
  { kn: "ಚಂದ್ರಶೇಖರ ಕಂಬಾರ", en: "Chandrashekhara Kambara" },
];

export const MUSICIANS = [
  { kn: "ಭೀಮಸೇನ ಜೋಶಿ", en: "Bhimsen Joshi" },
  { kn: "ಗಂಗೂಬಾಯಿ ಹಾನಗಲ್", en: "Gangubai Hangal" },
  { kn: "ಮಲ್ಲಿಕಾರ್ಜುನ ಮನ್ಸೂರ್", en: "Mallikarjun Mansur" },
  { kn: "ಬಸವರಾಜ ರಾಜಗುರು", en: "Basavaraj Rajguru" },
];

export const STATE_SYMBOLS = [
  { kn: "ಗಂಡಭೇರುಂಡ", en: "Gandaberunda", motif: "gandaberunda" },
  { kn: "ನೀಲಕಂಠ ಪಕ್ಷಿ", en: "Indian Roller", motif: "roller" },
  { kn: "ಆನೆ", en: "Asian Elephant", motif: "elephant" },
  { kn: "ಶ್ರೀಗಂಧ", en: "Sandalwood", motif: "sandalwood" },
  { kn: "ಕಮಲ", en: "Lotus", motif: "lotus" },
  { kn: "ಮಾವು", en: "Mango", motif: "mango" },
] as const;

/* Kannada vowels (ಸ್ವರಗಳು) and consonants (ವ್ಯಂಜನಗಳು) */
export const SWARAS = ["ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ", "ಅಂ", "ಅಃ"];
export const VYANJANAS = [
  "ಕ", "ಖ", "ಗ", "ಘ", "ಙ",
  "ಚ", "ಛ", "ಜ", "ಝ", "ಞ",
  "ಟ", "ಠ", "ಡ", "ಢ", "ಣ",
  "ತ", "ಥ", "ದ", "ಧ", "ನ",
  "ಪ", "ಫ", "ಬ", "ಭ", "ಮ",
  "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ",
];
