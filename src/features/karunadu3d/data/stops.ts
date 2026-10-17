/* What the 3D map tells you at every stop: the place, its story, the culture
 * that lives around it, and one question to test yourself. */

export type CultureKind = "art" | "food" | "festival" | "people" | "words" | "music" | "nature" | "history";

export interface StopInfo {
  region: string;
  regionKn: string;
  tagline: string; // Kannada
  about: string;
  facts: [string, string][];
  culture: { kind: CultureKind; kn: string; en: string }[];
  play: string; // name of the place's game
  quiz: { q: string; options: string[]; answer: number; why: string };
}

export const KIND_LABEL: Record<CultureKind, { kn: string; color: string }> = {
  art: { kn: "ಕಲೆ", color: "#ff6fa8" },
  food: { kn: "ಊಟ", color: "#ffb347" },
  festival: { kn: "ಹಬ್ಬ", color: "#ff5a4f" },
  people: { kn: "ಮಹನೀಯರು", color: "#8fd3ff" },
  words: { kn: "ಸಾಹಿತ್ಯ", color: "#c9a7ff" },
  music: { kn: "ಸಂಗೀತ", color: "#7ef0c2" },
  nature: { kn: "ನಿಸರ್ಗ", color: "#9be36b" },
  history: { kn: "ಇತಿಹಾಸ", color: "#f6dc8c" },
};

export const STOP_INFO: Record<string, StopInfo> = {
  bidar: {
    region: "Kalyana Karnataka",
    regionKn: "ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ",
    tagline: "ಬಹಮನಿ ಸುಲ್ತಾನರ ರಾಜಧಾನಿ, ಬಿದರಿ ಕಲೆಯ ತವರು",
    about:
      "On a red laterite plateau at the northern tip of Karnataka, Bidar Fort became the Bahmani capital in the 1420s. Its palaces still carry tile and mother-of-pearl work, and the soil of this very fort is what turns Bidriware black.",
    facts: [
      ["Bahmani capital", "from 1427"],
      ["Bidriware", "zinc + copper, inlaid with silver"],
      ["Basavakalyan", "Anubhava Mantapa, 12th c."],
    ],
    culture: [
      { kind: "art", kn: "ಬಿದರಿ ಕಲೆ", en: "Bidriware" },
      { kind: "words", kn: "ವಚನ ಸಾಹಿತ್ಯ", en: "Vachanas" },
      { kind: "history", kn: "ಅನುಭವ ಮಂಟಪ", en: "Anubhava Mantapa" },
      { kind: "history", kn: "ರಂಗೀನ್ ಮಹಲ್", en: "Rangin Mahal" },
    ],
    play: "Polish the Bidri plate",
    quiz: {
      q: "What gives Bidriware its deep black colour?",
      options: ["Black paint", "Soil from Bidar Fort", "Burnt coconut shell"],
      answer: 1,
      why: "The finished piece is rubbed with a paste made with soil from the fort, which blackens the alloy while the silver stays bright.",
    },
  },
  "gol-gumbaz": {
    region: "Kittur Karnataka",
    regionKn: "ಕಿತ್ತೂರು ಕರ್ನಾಟಕ",
    tagline: "ಒಂದು ಸದ್ದು, ಏಳು ಪ್ರತಿಧ್ವನಿ",
    about:
      "The tomb of Mohammed Adil Shah in Vijayapura carries one of the largest domes in the world. Inside, a whisper on one side of the gallery can be heard on the other, and a single clap comes back again and again.",
    facts: [
      ["Completed", "1656"],
      ["Dome", "about 44 m across"],
      ["Whispering gallery", "echoes up to 7 times"],
    ],
    culture: [
      { kind: "people", kn: "ಬಸವಣ್ಣ", en: "Basavanna, born nearby" },
      { kind: "history", kn: "ಆದಿಲ್ ಶಾಹಿ", en: "Adil Shahi" },
      { kind: "history", kn: "ಇಬ್ರಾಹಿಂ ರೋಜಾ", en: "Ibrahim Rauza" },
      { kind: "food", kn: "ಜೋಳದ ರೊಟ್ಟಿ", en: "Jolada Rotti" },
    ],
    play: "Count the echoes",
    quiz: {
      q: "How many times does a clap echo in the whispering gallery?",
      options: ["Once", "Three times", "Seven times"],
      answer: 2,
      why: "The great dome bounces sound around its circular gallery, and visitors count up to seven echoes.",
    },
  },
  badami: {
    region: "Kittur Karnataka",
    regionKn: "ಕಿತ್ತೂರು ಕರ್ನಾಟಕ",
    tagline: "ಚಾಲುಕ್ಯರ ವಾತಾಪಿ, ಕೆಂಪು ಬಂಡೆಯ ಗುಹಾ ದೇವಾಲಯಗಳು",
    about:
      "Badami was Vatapi, capital of the Chalukyas. Four cave temples are cut straight into the red sandstone above Agastya lake, and nearby Aihole and Pattadakal are where the temple styles of north and south first met.",
    facts: [
      ["Chalukya capital", "from c. 540 CE"],
      ["Cave temples", "6th century"],
      ["Pattadakal", "UNESCO, 1987"],
    ],
    culture: [
      { kind: "people", kn: "ಇಮ್ಮಡಿ ಪುಲಿಕೇಶಿ", en: "Pulakeshi II" },
      { kind: "art", kn: "ಇಳಕಲ್ ಸೀರೆ", en: "Ilkal Saree" },
      { kind: "art", kn: "ಕಸೂತಿ", en: "Kasuti embroidery" },
      { kind: "music", kn: "ಧಾರವಾಡದ ಹಿಂದೂಸ್ತಾನಿ", en: "Bhimsen Joshi, Gangubai Hangal" },
      { kind: "people", kn: "ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ", en: "Kittur Rani Chennamma" },
      { kind: "food", kn: "ಧಾರವಾಡ ಪೇಡ", en: "Dharwad Peda" },
    ],
    play: "Kasuti stitch match",
    quiz: {
      q: "Which Chalukya king stopped Harshavardhana at the Narmada?",
      options: ["Pulakeshi II", "Krishnadevaraya", "Vishnuvardhana"],
      answer: 0,
      why: "Pulakeshi II of Badami defeated Harsha around 618 CE, keeping the Deccan free.",
    },
  },
  hampi: {
    region: "Bayaluseeme",
    regionKn: "ಬಯಲುಸೀಮೆ",
    tagline: "ವಿಜಯನಗರದ ವೈಭವ, ಕಲ್ಲಿನಲ್ಲೂ ಸಂಗೀತ",
    about:
      "Among giant granite boulders on the Tungabhadra stood Vijayanagara, one of the richest cities of its time. At the Vittala temple the stone chariot still stands, and the slender pillars ring with musical notes when tapped.",
    facts: [
      ["Vijayanagara", "1336 – 1565"],
      ["UNESCO", "World Heritage, 1986"],
      ["Vittala temple", "stone chariot, musical pillars"],
    ],
    culture: [
      { kind: "people", kn: "ಕೃಷ್ಣದೇವರಾಯ", en: "Krishnadevaraya" },
      { kind: "music", kn: "ಪುರಂದರದಾಸ", en: "Purandara Dasa" },
      { kind: "words", kn: "ಕನಕದಾಸ", en: "Kanaka Dasa" },
      { kind: "festival", kn: "ಹಂಪಿ ಉತ್ಸವ", en: "Hampi Utsava" },
      { kind: "nature", kn: "ತುಂಗಭದ್ರಾ", en: "Tungabhadra" },
    ],
    play: "Musical pillars",
    quiz: {
      q: "Who is called the father of Carnatic music, and sang in Hampi?",
      options: ["Kuvempu", "Purandara Dasa", "Pampa"],
      answer: 1,
      why: "Purandara Dasa framed the lessons every Carnatic student still starts with, beginning in raga Mayamalavagowla.",
    },
  },
  "jog-falls": {
    region: "Malenadu",
    regionKn: "ಮಲೆನಾಡು",
    tagline: "ಜೋಗದ ಸಿರಿ ಬೆಳಕಿನಲ್ಲಿ…",
    about:
      "The Sharavati river leaps off the Western Ghats in four streams. In the monsoon the whole gorge fills with mist, and all around lies Malenadu: rainforest, areca, pepper and coffee.",
    facts: [
      ["Height", "253 m (830 ft)"],
      ["River", "Sharavati"],
      ["Four falls", "Raja, Rani, Roarer, Rocket"],
    ],
    culture: [
      { kind: "words", kn: "ಕುವೆಂಪು", en: "Kuvempu, of Kuppali" },
      { kind: "nature", kn: "ಆಗುಂಬೆ", en: "Agumbe rainforest" },
      { kind: "people", kn: "ಕೆಳದಿ ಚೆನ್ನಮ್ಮ", en: "Keladi Chennamma" },
      { kind: "food", kn: "ಚಿಕ್ಕಮಗಳೂರು ಕಾಫಿ", en: "Chikkamagaluru coffee" },
    ],
    play: "Stop at the pool",
    quiz: {
      q: "Which river forms Jog Falls?",
      options: ["Kaveri", "Sharavati", "Krishna"],
      answer: 1,
      why: "The Sharavati drops 253 m at Jog on its way to the Arabian Sea.",
    },
  },
  "udupi-coast": {
    region: "Karavali",
    regionKn: "ಕರಾವಳಿ",
    tagline: "ಕಡಲ ತೀರದ ಯಕ್ಷಗಾನ, ಕಂಬಳ, ಹುಲಿ ವೇಷ",
    about:
      "Off Udupi, St Mary's Islands rise as columns of volcanic basalt. On the shore, Yakshagana troupes perform through the night to the beat of the chande, buffaloes race through flooded fields at Kambala, and tiger dancers fill the streets.",
    facts: [
      ["St Mary's Islands", "basalt, about 88 million years old"],
      ["Udupi Sri Krishna Matha", "13th c., Madhvacharya"],
      ["Kanakana Kindi", "the window of Kanaka Dasa"],
    ],
    culture: [
      { kind: "art", kn: "ಯಕ್ಷಗಾನ", en: "Yakshagana" },
      { kind: "festival", kn: "ಕಂಬಳ", en: "Kambala" },
      { kind: "art", kn: "ಹುಲಿ ವೇಷ", en: "Huli Vesha" },
      { kind: "food", kn: "ಉಡುಪಿ ಮಸಾಲೆ ದೋಸೆ", en: "Udupi masala dosa" },
      { kind: "people", kn: "ರಾಣಿ ಅಬ್ಬಕ್ಕ", en: "Rani Abbakka" },
      { kind: "words", kn: "ಶಿವರಾಮ ಕಾರಂತ", en: "Shivaram Karanth" },
    ],
    play: "Kambala race",
    quiz: {
      q: "In Kambala, what races through the slushy paddy field?",
      options: ["Horses", "Buffaloes", "Elephants"],
      answer: 1,
      why: "Pairs of buffaloes, driven by a runner, sprint through the mud. It is the pride of Dakshina Kannada and Udupi.",
    },
  },
  halmidi: {
    region: "Old Mysuru",
    regionKn: "ಹಳೇ ಮೈಸೂರು",
    tagline: "ಕನ್ನಡದ ಅತ್ಯಂತ ಹಳೆಯ ಶಾಸನ",
    about:
      "In the village of Halmidi a stone of the Kadamba age carries the oldest known inscription written fully in Kannada. Every letter you read today grew from the script carved here.",
    facts: [
      ["Halmidi inscription", "c. 450 CE"],
      ["Dynasty", "Kadambas"],
      ["Classical language", "Kannada, 2008"],
    ],
    culture: [
      { kind: "history", kn: "ಕದಂಬರು", en: "Kadambas" },
      { kind: "art", kn: "ಬೇಲೂರು, ಹಳೇಬೀಡು", en: "Hoysala temples (UNESCO 2023)" },
      { kind: "words", kn: "ಕನ್ನಡ ಲಿಪಿ", en: "Kannada script" },
    ],
    play: "Read the old letters",
    quiz: {
      q: "About how old is the Halmidi inscription?",
      options: ["About 1,575 years", "About 500 years", "About 200 years"],
      answer: 0,
      why: "It dates to around 450 CE, making it the oldest known full Kannada inscription.",
    },
  },
  shravanabelagola: {
    region: "Old Mysuru",
    regionKn: "ಹಳೇ ಮೈಸೂರು",
    tagline: "ಗೊಮ್ಮಟೇಶ್ವರನ ಶಾಂತ ಮಂದಹಾಸ",
    about:
      "On top of Vindhyagiri stands Bahubali, carved from a single block of granite more than a thousand years ago. Once every twelve years he is bathed in milk, turmeric, sandal and vermilion poured from above.",
    facts: [
      ["Gommateshwara", "57 ft (17.4 m), single rock"],
      ["Carved", "c. 983 CE, by Chavundaraya"],
      ["Mahamastakabhisheka", "once every 12 years"],
    ],
    culture: [
      { kind: "history", kn: "ಗಂಗರು", en: "Western Gangas" },
      { kind: "words", kn: "ಪಂಪ, ಪೊನ್ನ, ರನ್ನ", en: "Three gems of Kannada poetry" },
      { kind: "words", kn: "ಚಾವುಂಡರಾಯ ಪುರಾಣ", en: "Chavundaraya Purana" },
    ],
    play: "Climb Vindhyagiri",
    quiz: {
      q: "How often is the Mahamastakabhisheka held?",
      options: ["Every year", "Every 12 years", "Every 100 years"],
      answer: 1,
      why: "Once every twelve years. The last one was in 2018.",
    },
  },
  "mysuru-palace": {
    region: "Old Mysuru",
    regionKn: "ಹಳೇ ಮೈಸೂರು",
    tagline: "ನಾಡಹಬ್ಬ ದಸರೆಯ ಅರಮನೆ",
    about:
      "The palace of the Wodeyars was rebuilt between 1897 and 1912. At Dasara, the Nada Habba, it glows with tens of thousands of bulbs while the golden howdah rides through the city on an elephant.",
    facts: [
      ["Built", "1897 – 1912"],
      ["Lights", "about 97,000 bulbs"],
      ["Golden howdah", "750 kg"],
    ],
    culture: [
      { kind: "festival", kn: "ಮೈಸೂರು ದಸರಾ", en: "Mysuru Dasara" },
      { kind: "art", kn: "ಮೈಸೂರು ರೇಷ್ಮೆ", en: "Mysore Silk" },
      { kind: "art", kn: "ಮೈಸೂರು ಚಿತ್ರಕಲೆ", en: "Mysore Painting" },
      { kind: "food", kn: "ಮೈಸೂರು ಪಾಕ್", en: "Mysore Pak" },
      { kind: "art", kn: "ಚನ್ನಪಟ್ಟಣದ ಗೊಂಬೆಗಳು", en: "Channapatna toys" },
      { kind: "nature", kn: "ಶ್ರೀಗಂಧ", en: "Sandalwood" },
      { kind: "history", kn: "ಗಂಡಭೇರುಂಡ", en: "Gandaberunda, the state emblem" },
    ],
    play: "Jamboo Savari",
    quiz: {
      q: "Where was Mysore Pak first made?",
      options: ["A Bengaluru café", "The Mysuru palace kitchen", "A temple in Udupi"],
      answer: 1,
      why: "The story goes that Kakasura Madappa, cook of the Mysuru palace, first made it for Krishnaraja Wodeyar IV.",
    },
  },
  coorg: {
    region: "Malenadu",
    regionKn: "ಮಲೆನಾಡು",
    tagline: "ಕಾವೇರಿಯ ತವರು, ಕಾಫಿಯ ನಾಡು",
    about:
      "Misty hills, coffee estates and the home of the Kodava people. At Talakaveri the river Kaveri, lifeline of southern Karnataka, begins as a small spring.",
    facts: [
      ["Talakaveri", "source of the Kaveri"],
      ["Coffee", "Karnataka grows about 70% of India's"],
      ["Field Marshal", "K. M. Cariappa, of Kodagu"],
    ],
    culture: [
      { kind: "festival", kn: "ಹುತ್ತರಿ", en: "Huttari harvest festival" },
      { kind: "festival", kn: "ಕಾವೇರಿ ಸಂಕ್ರಮಣ", en: "Kaveri Sankramana" },
      { kind: "nature", kn: "ದುಬಾರೆ ಆನೆ ಶಿಬಿರ", en: "Dubare elephant camp" },
      { kind: "food", kn: "ಅಕ್ಕಿ ರೊಟ್ಟಿ", en: "Akki Rotti" },
    ],
    play: "Coffee picking",
    quiz: {
      q: "Which river begins at Talakaveri in Kodagu?",
      options: ["Tungabhadra", "Kaveri", "Sharavati"],
      answer: 1,
      why: "The Kaveri rises at Talakaveri and flows east through Karnataka and Tamil Nadu to the Bay of Bengal.",
    },
  },
  home: {
    region: "Bengaluru",
    regionKn: "ಬೆಂಗಳೂರು",
    tagline: "ನಮ್ಮ ಮನೆ, ನಮ್ಮ ಕನ್ನಡ ಕೂಟ",
    about:
      "Our journey ends at home: PES University, Electronic City, where 160+ members of Kannada Koota celebrate the language and culture of Karnataka together.",
    facts: [
      ["Bengaluru", "founded by Kempegowda, 1537"],
      ["Karnataka formed", "1 November 1956"],
      ["Kannada", "8 Jnanpith awards"],
    ],
    culture: [
      { kind: "festival", kn: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ", en: "Kannada Rajyotsava" },
      { kind: "festival", kn: "ಬೆಂಗಳೂರು ಕರಗ", en: "Bengaluru Karaga" },
      { kind: "words", kn: "ನಾಡಗೀತೆ · ಕುವೆಂಪು", en: "Nada Geethe by Kuvempu" },
      { kind: "people", kn: "ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ", en: "Sir M. Visvesvaraya" },
      { kind: "nature", kn: "ಲಾಲ್‌ಬಾಗ್", en: "Lalbagh" },
    ],
    play: "Nada Geethe in order",
    quiz: {
      q: "When is Kannada Rajyotsava celebrated?",
      options: ["15 August", "1 November", "26 January"],
      answer: 1,
      why: "On 1 November 1956 the Kannada-speaking regions were united into one state, renamed Karnataka in 1973.",
    },
  },
};
