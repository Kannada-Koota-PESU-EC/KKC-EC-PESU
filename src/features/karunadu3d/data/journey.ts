/* Stops of the 3D journey, north to south, ending at home. */

export interface Stop {
  id: string;
  kn: string;
  en: string;
  lat: number;
  lon: number;
  photo?: string;
  credit?: string;
}

const photo = (id: string) => `/karnataka/photos/${id}.jpg`;

export const JOURNEY: Stop[] = [
  { id: "bidar", kn: "ಬೀದರ್ ಕೋಟೆ", en: "Bidar Fort", lat: 17.92, lon: 77.53, photo: photo("bidar") },
  { id: "gol-gumbaz", kn: "ಗೋಲ್ ಗುಂಬಜ್", en: "Gol Gumbaz, Vijayapura", lat: 16.83, lon: 75.73, photo: photo("gol-gumbaz") },
  { id: "badami", kn: "ಬಾದಾಮಿ", en: "Badami Cave Temples", lat: 15.92, lon: 75.68, photo: photo("badami") },
  { id: "hampi", kn: "ಹಂಪಿ", en: "Hampi", lat: 15.335, lon: 76.46, photo: photo("hampi") },
  { id: "jog-falls", kn: "ಜೋಗ ಜಲಪಾತ", en: "Jog Falls", lat: 14.23, lon: 74.81, photo: photo("jog-falls") },
  { id: "udupi-coast", kn: "ಕರಾವಳಿ", en: "Karavali Coast", lat: 13.34, lon: 74.75, photo: photo("udupi-coast") },
  { id: "halmidi", kn: "ಹಲ್ಮಿಡಿ ಶಾಸನ", en: "Halmidi Inscription", lat: 13.03, lon: 75.98, photo: photo("halmidi") },
  { id: "shravanabelagola", kn: "ಶ್ರವಣಬೆಳಗೊಳ", en: "Shravanabelagola", lat: 12.86, lon: 76.48, photo: photo("shravanabelagola") },
  { id: "mysuru-palace", kn: "ಮೈಸೂರು ಅರಮನೆ", en: "Mysuru Palace", lat: 12.305, lon: 76.655, photo: photo("mysuru-palace") },
  { id: "coorg", kn: "ಕೊಡಗು", en: "Kodagu", lat: 12.42, lon: 75.74, photo: photo("coorg") },
  { id: "home", kn: "ಕನ್ನಡ ಕೂಟ EC PES", en: "PES University, Electronic City", lat: 12.86, lon: 77.66, photo: "/karnataka/photos/pes-ec-campus.jpg" },
];
