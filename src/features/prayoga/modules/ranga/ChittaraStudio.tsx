import { useState, useId } from "react";
import {
  Palette,
  RotateCw,
  Maximize2,
  Grid,
  RotateCcw,
  Download,
  Sparkles,
  Info,
} from "lucide-react";
import type { MotifType, PatternSettings } from "./types";

interface MotifOption {
  id: MotifType;
  kannadaName: string;
  englishName: string;
  renderSVG: (color: string, strokeWidth: number) => React.ReactNode;
}

const MOTIF_OPTIONS: MotifOption[] = [
  {
    id: "padma",
    kannadaName: "ಕಮಲ ಮಂಡಲ (Lotus)",
    englishName: "Padma Mandala",
    renderSVG: (color, sw) => (
      <g stroke={color} strokeWidth={sw} fill="none">
        <circle cx="50" cy="50" r="12" />
        <circle cx="50" cy="50" r="28" strokeDasharray="3 3" opacity="0.6" />
        {/* 8 Radial Lotus Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <path
            key={idx}
            d="M 50 22 C 40 32, 40 42, 50 50 C 60 42, 60 32, 50 22"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="44" />
      </g>
    ),
  },
  {
    id: "gantu",
    kannadaName: "ಬ್ರಹ್ಮಗಂಟು (Endless Knot)",
    englishName: "Sacred Interlace",
    renderSVG: (color, sw) => (
      <g stroke={color} strokeWidth={sw} fill="none">
        {/* Continuous interlaced geometric knot */}
        <rect x="22" y="22" width="56" height="56" rx="14" />
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          rx="14"
          transform="rotate(45 50 50)"
          strokeDasharray="1 1"
          opacity="0.8"
        />
        <circle cx="50" cy="50" r="8" />
        <line x1="16" y1="50" x2="84" y2="50" />
        <line x1="50" y1="16" x2="50" y2="84" />
      </g>
    ),
  },
  {
    id: "jali",
    kannadaName: "ಹಸೆ ಜಾಲರಿ (Lattice)",
    englishName: "Chittara Mesh",
    renderSVG: (color, sw) => (
      <g stroke={color} strokeWidth={sw} fill="none">
        <polygon points="50,8 92,50 50,92 8,50" />
        <polygon points="50,22 78,50 50,78 22,50" />
        <polygon points="50,36 64,50 50,64 36,50" />
        <line x1="8" y1="8" x2="92" y2="92" strokeDasharray="2 2" opacity="0.5" />
        <line x1="92" y1="8" x2="8" y2="92" strokeDasharray="2 2" opacity="0.5" />
      </g>
    ),
  },
  {
    id: "surya",
    kannadaName: "ಸೂರ್ಯ ಮಂಡಲ (Sun Wheel)",
    englishName: "Solar Chariot Disc",
    renderSVG: (color, sw) => (
      <g stroke={color} strokeWidth={sw} fill="none">
        <circle cx="50" cy="50" r="16" />
        <circle cx="50" cy="50" r="32" />
        <circle cx="50" cy="50" r="44" strokeDasharray="2 4" />
        {/* 16 Solar Rays */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="18"
            x2="50"
            y2="6"
            transform={`rotate(${i * 22.5} 50 50)`}
          />
        ))}
      </g>
    ),
  },
  {
    id: "gopura",
    kannadaName: "ಗೋಪುರ ಶ್ರೇಣಿ (Pyramid)",
    englishName: "Stepped Shikhara",
    renderSVG: (color, sw) => (
      <g stroke={color} strokeWidth={sw} fill="none">
        <polygon points="50,14 84,86 16,86" />
        <line x1="26" y1="68" x2="74" y2="68" />
        <line x1="34" y1="50" x2="66" y2="50" />
        <line x1="42" y1="32" x2="58" y2="32" />
        <circle cx="50" cy="10" r="4" fill={color} />
        <line x1="50" y1="14" x2="50" y2="86" strokeDasharray="2 2" opacity="0.4" />
      </g>
    ),
  },
];

const TRADITIONAL_COLORS = [
  { id: "#E5A93C", name: "ಅರಿಶಿನ ಚಿನ್ನ (Turmeric Gold)" },
  { id: "#C8102E", name: "ಕುಂಕುಮ ಕೆಂಪು (Kumkuma Crimson)" },
  { id: "#D49428", name: "ಶ್ರೀಗಂಧ (Sandalwood Amber)" },
  { id: "#2A6F78", name: "ಮಯೂರ ನೀಲಿ (Peacock Slate)" },
  { id: "#A0522D", name: "ಮಣ್ಣಿನ ಕಂದು (Terracotta Clay)" },
  { id: "#F5EEDB", name: "ಶುದ್ಧ ಬಿಳಿ (Sacred Rice Paste)" },
];

const BG_OPTIONS = [
  { id: "#0D0D0D", label: "ಕಪ್ಪು ಶಿಲೆ (Dark Granite)" },
  { id: "#1C1410", label: "ಮಣ್ಣಿನ ಮಡಕೆ (Terracotta Soil)" },
  { id: "#10141C", label: "ರಾತ್ರಿ ನೀಲಿ (Night Indigo)" },
];

export default function ChittaraStudio() {
  const scaleId = useId();
  const strokeId = useId();
  const rotationId = useId();

  const [settings, setSettings] = useState<PatternSettings>({
    motif: "padma",
    color: "#E5A93C",
    bgColor: "#0D0D0D",
    scale: 1.0,
    repetition: 2,
    strokeWidth: 2,
    rotation: 0,
  });

  const selectedMotifObj =
    MOTIF_OPTIONS.find((m) => m.id === settings.motif) || MOTIF_OPTIONS[0];

  const handleReset = () => {
    setSettings({
      motif: "padma",
      color: "#E5A93C",
      bgColor: "#0D0D0D",
      scale: 1.0,
      repetition: 2,
      strokeWidth: 2,
      rotation: 0,
    });
  };

  const handleDownloadSVG = () => {
    const svgEl = document.getElementById("chittara-canvas-svg");
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `karnataka-chittara-${settings.motif}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  // Generate grid cells based on repetition (1x1, 2x2, 3x3, 4x4)
  const rep = settings.repetition;
  const cellSize = 100;
  const totalSize = rep * cellSize;

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#181822]/95 via-[#13131A]/95 to-[#0E0E14]/95 border border-amber-500/30 p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>ಚಿತ್ತಾರ ರಚನಾ ಕಣ್ವ · Creative Pattern Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-kannada">
            ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಯಾಮಿತೀಯ ಕಲಾ ವಿನ್ಯಾಸ (Pattern Generator)
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
            ಮಲೆನಾಡಿನ ಹಸೆ ಚಿತ್ತಾರ ಮತ್ತು ಶಿಲ್ಪಕಲೆಯ ಜ್ಯಾಮಿತಿಯಿಂದ ಪ್ರೇರಿತವಾದ ಸಂವಾದಾತ್ಮಕ ಕಲಾ ತಾಣ.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ಮರುಹೊಂದಿಸಿ (Reset)</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSVG}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs shadow-md transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            <span>SVG ಡೌನ್‌ಲೋಡ್ (Export)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Motif Selector */}
          <div>
            <label className="block text-xs font-bold text-amber-200/90 font-kannada uppercase tracking-wider mb-2.5">
              ೧. ಜ್ಯಾಮಿತೀಯ ನಮೂನೆ (Select Motif)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MOTIF_OPTIONS.map((motif) => (
                <button
                  key={motif.id}
                  type="button"
                  onClick={() => setSettings((s) => ({ ...s, motif: motif.id }))}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                    settings.motif === motif.id
                      ? "bg-amber-500/20 border-amber-400 text-white shadow-sm"
                      : "bg-[#141419]/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-6 h-6">
                      {motif.renderSVG(
                        settings.motif === motif.id ? "#E5A93C" : "#999",
                        2.5
                      )}
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold font-kannada leading-tight">
                      {motif.kannadaName}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-sans">
                      {motif.englishName}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette Selector */}
          <div>
            <label className="block text-xs font-bold text-amber-200/90 font-kannada uppercase tracking-wider mb-2.5">
              ೨. ಸಾಂಪ್ರದಾಯಿಕ ಬಣ್ಣ (Traditional Colors)
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {TRADITIONAL_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={c.name}
                  onClick={() => setSettings((s) => ({ ...s, color: c.id }))}
                  style={{ backgroundColor: c.id }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform shadow-md ${
                    settings.color === c.id
                      ? "scale-125 border-white ring-2 ring-amber-400/50"
                      : "border-black/40 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Background Tone Selector */}
          <div>
            <label className="block text-xs font-bold text-neutral-400 font-kannada uppercase tracking-wider mb-2">
              ಹಿನ್ನೆಲೆ ಬಣ್ಣ (Background Canvas)
            </label>
            <div className="flex items-center gap-2">
              {BG_OPTIONS.map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setSettings((s) => ({ ...s, bgColor: bg.id }))}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    settings.bgColor === bg.id
                      ? "bg-white/15 border-amber-400 text-white"
                      : "bg-[#141419] border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders: Repetition, Scale, Stroke, Rotation */}
          <div className="space-y-4 pt-3 border-t border-white/10">
            {/* Repetition */}
            <div>
              <div className="flex items-center justify-between text-xs font-kannada text-neutral-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-amber-400" />
                  <span>ಪುನರಾವರ್ತನೆ (Repetition Grid):</span>
                </span>
                <span className="font-mono text-amber-300">
                  {settings.repetition} × {settings.repetition}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {([1, 2, 3, 4] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, repetition: r }))}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                      settings.repetition === r
                        ? "bg-amber-500 text-black border-amber-400 shadow-sm"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {r}×{r}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-kannada text-neutral-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>ಪ್ರಮಾಣ (Scale):</span>
                </span>
                <span className="font-mono text-amber-300">
                  {settings.scale.toFixed(1)}x
                </span>
              </div>
              <input
                id={scaleId}
                type="range"
                min="0.6"
                max="1.8"
                step="0.1"
                value={settings.scale}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, scale: parseFloat(e.target.value) }))
                }
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Stroke Width Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-kannada text-neutral-300 mb-1">
                <span>ರೇಖೆಯ ದಪ್ಪ (Stroke Weight):</span>
                <span className="font-mono text-amber-300">
                  {settings.strokeWidth}px
                </span>
              </div>
              <input
                id={strokeId}
                type="range"
                min="1"
                max="4.5"
                step="0.5"
                value={settings.strokeWidth}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    strokeWidth: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Rotation Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-kannada text-neutral-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>ತಿರುಗುವಿಕೆ (Angle):</span>
                </span>
                <span className="font-mono text-amber-300">
                  {settings.rotation}°
                </span>
              </div>
              <input
                id={rotationId}
                type="range"
                min="0"
                max="360"
                step="15"
                value={settings.rotation}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, rotation: parseInt(e.target.value) }))
                }
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Live Canvas Viewport (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div
            style={{ backgroundColor: settings.bgColor }}
            className="relative w-full max-w-lg aspect-square rounded-3xl border-2 border-amber-500/30 p-6 flex items-center justify-center overflow-hidden shadow-2xl transition-colors duration-500 group"
          >
            {/* Subtle corner ornamental accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/40" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/40" />

            {/* SVG Visual Composition Canvas */}
            <svg
              id="chittara-canvas-svg"
              viewBox={`0 0 ${totalSize} ${totalSize}`}
              className="w-full h-full max-w-[400px] max-h-[400px] transition-transform duration-300"
            >
              <rect
                width={totalSize}
                height={totalSize}
                fill={settings.bgColor}
              />
              {Array.from({ length: rep }).map((_, row) =>
                Array.from({ length: rep }).map((_, col) => {
                  const cx = col * cellSize + cellSize / 2;
                  const cy = row * cellSize + cellSize / 2;

                  return (
                    <g
                      key={`${row}-${col}`}
                      transform={`translate(${col * cellSize}, ${row * cellSize})`}
                    >
                      <g
                        transform={`translate(50, 50) scale(${settings.scale}) rotate(${settings.rotation}) translate(-50, -50)`}
                      >
                        {selectedMotifObj.renderSVG(
                          settings.color,
                          settings.strokeWidth
                        )}
                      </g>
                    </g>
                  );
                })
              )}
            </svg>
          </div>

          {/* Respectful Disclaimer */}
          <div className="flex items-start gap-2 max-w-lg mt-4 p-3 rounded-xl bg-neutral-900/60 border border-white/5 text-[11px] text-neutral-400">
            <Info className="w-4 h-4 text-amber-400/80 flex-shrink-0 mt-0.5" />
            <span>
              <strong>ಮಾದರಿ ಜ್ಯಾಮಿತೀಯ ಕಲಾ ವಿನ್ಯಾಸ:</strong> ಕರ್ನಾಟಕದ ಸಾಂಪ್ರದಾಯಿಕ ಹಸೆ ಚಿತ್ತಾರ ಮತ್ತು ಶಿಲ್ಪಕಲೆಯ ರೇಖಾಗಣಿತದಿಂದ ಪ್ರೇರಿತವಾದ ಸಂವಾದಾತ್ಮಕ ಕಲಾ ತಾಣ.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
