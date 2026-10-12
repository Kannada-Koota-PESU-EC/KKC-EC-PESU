/* Stops of the 3D journey, north to south, ending at home.
 * `photo` paths are filled in as real photos are added to /public/karnataka/photos. */

export interface Stop {
  id: string;
  kn: string;
  en: string;
  lat: number;
  lon: number;
  photo?: string;
  credit?: string;
}

export const JOURNEY: Stop[] = [
  { id: "bidar", kn: "ಬೀದರ್ ಕೋಟೆ", en: "Bidar Fort", lat: 17.92, lon: 77.53 },
  { id: "gol-gumbaz", kn: "ಗೋಳ ಗುಮ್ಮಟ", en: "Gol Gumbaz, Vijayapura", lat: 16.83, lon: 75.73 },
  { id: "badami", kn: "ಬಾದಾಮಿ", en: "Badami Cave Temples", lat: 15.92, lon: 75.68 },
  { id: "hampi", kn: "ಹಂಪಿ", en: "Hampi", lat: 15.335, lon: 76.46 },
  { id: "jog-falls", kn: "ಜೋಗ ಜಲಪಾತ", en: "Jog Falls", lat: 14.23, lon: 74.81 },
  { id: "udupi-coast", kn: "ಕರಾವಳಿ", en: "Karavali Coast", lat: 13.34, lon: 74.75 },
  { id: "halmidi", kn: "ಹಲ್ಮಿಡಿ ಶಾಸನ", en: "Halmidi Inscription", lat: 13.03, lon: 75.98 },
  { id: "shravanabelagola", kn: "ಶ್ರವಣಬೆಳಗೊಳ", en: "Shravanabelagola", lat: 12.86, lon: 76.48 },
  { id: "mysuru-palace", kn: "ಮೈಸೂರು ಅರಮನೆ", en: "Mysuru Palace", lat: 12.305, lon: 76.655 },
  { id: "coorg", kn: "ಕೊಡಗು", en: "Kodagu", lat: 12.42, lon: 75.74 },
  { id: "home", kn: "ಕನ್ನಡ ಕೂಟ EC PES", en: "PES University, Electronic City", lat: 12.86, lon: 77.66 },
];
