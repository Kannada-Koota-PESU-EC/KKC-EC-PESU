// Tiny synthesisers – no audio files. Sound only plays after a click/tap.

let ctx: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Temple bell (ಗಂಟೆ): a few inharmonic partials with a long decay */
export function ringBell() {
  const ac = audio();
  if (!ac) return;
  const now = ac.currentTime;
  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.35, now + 0.01);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
  master.connect(ac.destination);

  const base = 392;
  [1, 2.32, 3.01, 4.16, 5.43].forEach((ratio, i) => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = base * ratio;
    g.gain.value = [0.6, 0.35, 0.25, 0.15, 0.08][i];
    osc.connect(g).connect(master);
    osc.start(now);
    osc.stop(now + 4.6);
  });
}

/** Plucked string (Karplus–Strong) – used for the veena */
export function pluck(freq: number) {
  const ac = audio();
  if (!ac) return;
  const seconds = 2.2;
  const length = Math.floor(ac.sampleRate * seconds);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  const period = Math.max(2, Math.floor(ac.sampleRate / freq));
  const ring = new Float32Array(period).map(() => Math.random() * 2 - 1);
  let idx = 0;
  for (let i = 0; i < length; i++) {
    const next = (idx + 1) % period;
    const v = 0.5 * (ring[idx] + ring[next]) * 0.996;
    data[i] = ring[idx];
    ring[idx] = v;
    idx = next;
  }
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const g = ac.createGain();
  g.gain.value = 0.45;
  src.connect(g).connect(ac.destination);
  src.start();
}

/** ಮಾಯಾಮಾಳವಗೌಳ – the first raga taught in Carnatic music (S R1 G3 M1 P D1 N3 S) */
export const MAYAMALAVAGOWLA = [
  { swara: "ಸ", semitone: 0 },
  { swara: "ರಿ", semitone: 1 },
  { swara: "ಗ", semitone: 4 },
  { swara: "ಮ", semitone: 5 },
  { swara: "ಪ", semitone: 7 },
  { swara: "ದ", semitone: 8 },
  { swara: "ನಿ", semitone: 11 },
  { swara: "ಸ", semitone: 12 },
];

export function swaraFreq(semitone: number, sa = 196) {
  return sa * Math.pow(2, semitone / 12);
}

function noiseBuffer(ac: AudioContext, seconds: number) {
  const b = ac.createBuffer(1, Math.floor(ac.sampleRate * seconds), ac.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
  return b;
}

/** A clap under the Gol Gumbaz dome: the sound comes back seven times */
export function echoClap(echoes = 7, gap = 0.42) {
  const ac = audio();
  if (!ac) return;
  const buf = noiseBuffer(ac, 0.08);
  for (let k = 0; k <= echoes; k++) {
    const src = ac.createBufferSource();
    src.buffer = buf;
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 5000 * Math.pow(0.72, k);
    const g = ac.createGain();
    g.gain.value = 0.8 * Math.pow(0.68, k);
    src.connect(f).connect(g).connect(ac.destination);
    src.start(ac.currentTime + k * gap);
  }
}

/** A struck granite pillar (Vittala temple): bright attack, inharmonic ring */
export function stoneNote(freq: number) {
  const ac = audio();
  if (!ac) return;
  const now = ac.currentTime;
  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.4, now + 0.005);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
  master.connect(ac.destination);
  [1, 2.76, 5.4].forEach((r, i) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.frequency.value = freq * r;
    g.gain.value = [0.7, 0.25, 0.1][i];
    o.connect(g).connect(master);
    o.start(now);
    o.stop(now + 1.7);
  });
}

/** Yakshagana chande: a deep "dhim" or a sharp stick "taka" */
export function drum(low: boolean) {
  const ac = audio();
  if (!ac) return;
  const now = ac.currentTime;
  if (low) {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.frequency.setValueAtTime(170, now);
    o.frequency.exponentialRampToValueAtTime(55, now + 0.35);
    g.gain.setValueAtTime(0.9, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    o.connect(g).connect(ac.destination);
    o.start(now);
    o.stop(now + 0.55);
  } else {
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac, 0.12);
    const f = ac.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 2400;
    f.Q.value = 2;
    const g = ac.createGain();
    g.gain.value = 1.2;
    src.connect(f).connect(g).connect(ac.destination);
    src.start(now);
  }
}
