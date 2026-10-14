/**
 * Intro / splash settings. Edit the text, images and timings here.
 * Finer animation timings (fades, staggers) are CSS variables at the top of intro.css.
 */

// Tribute screen text
export const tribute = {
  heading: 'In Loving Memory',
  name: 'Dr. M. R. Doreswamy',
  title: 'Founder Chairman, PES Institutions',
  message: 'Your vision lives on in every one of us.',
  messageKannada: 'ನಿಮ್ಮ ನೆನಪು ಸದಾ ಅಮರ',
};

// Kannada text under the logos (two lines)
export const logosText = {
  line1: 'ಪಿಇಎಸ್ ವಿಶ್ವವಿದ್ಯಾಲಯ',
  line2: 'ಕನ್ನಡ ಕೂಟ – ಇ.ಸಿ',
};

// Images (files live in public/Respectives)
export const introImages = {
  chairman: '/Respectives/sir-mrd-pesu.png',
  college: '/Respectives/PESU.png',
  club: '/Respectives/KKC1.png',
};

// Phase lengths in milliseconds (total ≈ tribute + transition + logos + reveal)
export const introTimings = {
  tribute: 4000, // photo and text fade in, then hold
  transition: 1000, // tribute fades out
  logos: 2800, // logos slide in (see --intro-logo-slide), then hold with the text
  reveal: 600, // overlay fades away to show the site
  reducedMotionHold: 2500, // prefers-reduced-motion: static tribute shown this long
  maxPreloadWait: 4000, // start anyway if images take longer than this to load
};

// sessionStorage key: intro plays once per browser session
export const INTRO_SEEN_KEY = 'kk-intro-seen';

// Window event fired when the intro starts revealing the site (other parts, e.g. the navbar, can animate in then)
export const INTRO_REVEAL_EVENT = 'kk-intro-reveal';
