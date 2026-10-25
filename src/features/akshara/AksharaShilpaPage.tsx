import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Download,
  RotateCcw,
  Share2,
  Sparkles,
  Type,
} from "lucide-react";
import "./akshara-shilpa.css";
const Akshara3DViewport = lazy(() => import("./Akshara3DViewport"));

type StyleKey = "stone" | "silk" | "wave" | "ink";
type PaletteKey = "kumkuma" | "haldi" | "indigo" | "hasiru" | "aurora" | "electric";
type LayoutKey = "natural" | "stacked";

type ArtworkOptions = {
  text: string;
  style: StyleKey;
  palette: PaletteKey;
  layout: LayoutKey;
  scale: number;
  texture: boolean;
};

const styles: {
  id: StyleKey;
  name: string;
  kannada: string;
  description: string;
}[] = [
  {
    id: "stone",
    name: "Stone inscription",
    kannada: "ಶಿಲಾಶಾಸನ",
    description: "Carved, timeless and monumental",
  },
  {
    id: "silk",
    name: "Mysuru silk",
    kannada: "ಮೈಸೂರು ರೇಷ್ಮೆ",
    description: "Ornamental borders and royal gold",
  },
  {
    id: "wave",
    name: "New wave",
    kannada: "ಹೊಸ ಅಲೆ",
    description: "Bold colour and contemporary energy",
  },
  {
    id: "ink",
    name: "Ink & paper",
    kannada: "ಶಾಯಿ ಮತ್ತು ಕಾಗದ",
    description: "Quiet, minimal and editorial",
  },
];

const palettes: {
  id: PaletteKey;
  name: string;
  background: string;
  ink: string;
  accent: string;
  secondary: string;
}[] = [
  {
    id: "kumkuma",
    name: "Kumkuma",
    background: "#f5e6d4",
    ink: "#691f29",
    accent: "#c64135",
    secondary: "#dfb866",
  },
  {
    id: "haldi",
    name: "Haldi",
    background: "#f8edcf",
    ink: "#52351d",
    accent: "#c28a26",
    secondary: "#e4bc58",
  },
  {
    id: "indigo",
    name: "Indigo",
    background: "#e7e8f5",
    ink: "#272b55",
    accent: "#6565bd",
    secondary: "#b0a6df",
  },
  {
    id: "hasiru",
    name: "Hasiru",
    background: "#e8eddf",
    ink: "#244b39",
    accent: "#538363",
    secondary: "#c8a568",
  },
  {
    id: "aurora",
    name: "Aurora",
    background: "#11162b",
    ink: "#f8f2ff",
    accent: "#c15bff",
    secondary: "#42f5d7",
  },
  {
    id: "electric",
    name: "Electric",
    background: "#0d1824",
    ink: "#e9fcff",
    accent: "#00e7ff",
    secondary: "#f5ec76",
  },
];

const initialOptions: ArtworkOptions = {
  text: "ಕನ್ನಡ",
  style: "silk",
  palette: "kumkuma",
  layout: "natural",
  scale: 1,
  texture: true,
};

function drawArtwork(
  canvas: HTMLCanvasElement,
  options: ArtworkOptions,
  resolution = 1200,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = resolution;
  canvas.height = resolution;
  ctx.scale(resolution / 1000, resolution / 1000);

  const palette = palettes.find((item) => item.id === options.palette)!;
  const dramaticStyle = options.style === "stone" || options.style === "wave";
  const dramaticPalette = options.palette === "aurora" || options.palette === "electric";
  const background = dramaticStyle && !dramaticPalette ? palette.ink : palette.background;
  const foreground = dramaticStyle && !dramaticPalette ? palette.background : palette.ink;

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 1000, 1000);

  const wash = ctx.createRadialGradient(500, 430, 30, 500, 500, 720);
  wash.addColorStop(0, palette.accent + "15");
  wash.addColorStop(1, background);
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, 1000, 1000);

  if (options.style === "wave") {
    ctx.save();
    ctx.globalAlpha = 0.32;
    for (let i = 0; i < 13; i += 1) {
      ctx.beginPath();
      ctx.lineWidth = i % 3 === 0 ? 3 : 1;
      ctx.strokeStyle = i % 2 === 0 ? palette.secondary : palette.accent;
      ctx.ellipse(
        500,
        500,
        190 + i * 37,
        105 + i * 27,
        (i - 5) * 0.055,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
    }
    ctx.restore();
  }

  if (options.texture) {
    ctx.save();
    for (let i = 0; i < 900; i += 1) {
      const x = (i * 137.51) % 1000;
      const y = (i * 271.13) % 1000;
      ctx.globalAlpha = 0.04 + ((i % 5) * 0.008);
      ctx.fillStyle = i % 2 ? foreground : palette.secondary;
      ctx.fillRect(x, y, i % 9 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1);
    }
    ctx.restore();
  }

  const inset = options.style === "silk" ? 62 : 48;
  ctx.save();
  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = options.style === "silk" ? 4 : 1.5;
  ctx.strokeRect(inset, inset, 1000 - inset * 2, 1000 - inset * 2);

  if (options.style === "silk") {
    ctx.lineWidth = 1;
    ctx.strokeRect(76, 76, 848, 848);

    for (const x of [76, 924]) {
      for (const y of [76, 924]) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-17, -17, 34, 34);
        ctx.restore();
      }
    }
  }

  if (options.style === "stone") {
    ctx.lineWidth = 7;
    ctx.strokeStyle = palette.secondary + "70";
    ctx.strokeRect(66, 66, 868, 868);
  }

  if (options.style === "ink") {
    ctx.setLineDash([3, 8]);
    ctx.strokeStyle = palette.accent + "90";
    ctx.lineWidth = 1;
    ctx.strokeRect(78, 78, 844, 844);
    ctx.setLineDash([]);
  }

  ctx.fillStyle = palette.secondary;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '600 15px "DM Sans", sans-serif';
  ctx.letterSpacing = "3px";
  ctx.fillText("AKSHARA SHILPA", 500, 113);

  ctx.font = '500 21px "Noto Sans Kannada", sans-serif';
  ctx.fillStyle = foreground;
  ctx.letterSpacing = "1px";
  ctx.fillText("ಕನ್ನಡ ಅಕ್ಷರಶಿಲ್ಪ", 500, 153);

  const text = options.text.trim() || "ಕನ್ನಡ";
  const wordCount = text.split(/\s+/).length;
  let fontSize = Math.min(118, Math.max(48, 132 - text.length * 1.05));
  fontSize *= options.scale;

  const maxWidth = options.style === "wave" ? 790 : 780;
  const textFont = () =>
    `${options.style === "ink" ? "500" : "600"} ${fontSize}px "Noto Sans Kannada", sans-serif`;

  ctx.font = textFont();

  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];

  if (options.layout === "stacked" && words.length > 1) {
    for (const word of words) {
      if (ctx.measureText(word).width <= maxWidth) {
        lines.push(word);
      } else {
        let part = "";
        for (const character of Array.from(word)) {
          if (part && ctx.measureText(part + character).width > maxWidth) {
            lines.push(part);
            part = character;
          } else {
            part += character;
          }
        }
        if (part) lines.push(part);
      }
    }
  } else {
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
  }

  const visibleLines = lines.length ? lines : ["ಕನ್ನಡ"];
  const adjustedSize = Math.min(
    fontSize,
    (530 / Math.max(1, visibleLines.length)) * 0.96,
  );
  fontSize = adjustedSize;
  ctx.font = textFont();

  const lineHeight = Math.min(160, fontSize * 1.55);
  const totalHeight = lineHeight * visibleLines.length;
  const startY = 500 - totalHeight / 2 + lineHeight / 2;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = options.style === "ink" ? "0px" : "1px";

  if (options.style === "stone") {
    // Layered offsets create a carved, extruded edge rather than flat text.
    ctx.save();

    for (let depth = 12; depth >= 1; depth -= 1) {
      ctx.globalAlpha = 0.065 + (12 - depth) * 0.012;
      ctx.fillStyle = "#050403";

      visibleLines.forEach((lineText, index) => {
        ctx.fillText(
          lineText,
          500 + depth * 0.55,
          startY + index * lineHeight + depth * 0.8,
          maxWidth,
        );
      });
    }

    ctx.globalAlpha = 1;
    ctx.shadowColor = palette.secondary;
    ctx.shadowBlur = 12;
    ctx.fillStyle = foreground;

    visibleLines.forEach((lineText, index) => {
      ctx.fillText(lineText, 500, startY + index * lineHeight, maxWidth);
    });

    ctx.shadowBlur = 0;
    ctx.strokeStyle = palette.secondary + "ba";
    ctx.lineWidth = 1.7;

    visibleLines.forEach((lineText, index) => {
      ctx.strokeText(lineText, 500, startY + index * lineHeight, maxWidth);
    });

    ctx.restore();
  } else if (options.style === "silk") {
    // Layered metallic letters with a warm, raised edge.
    ctx.save();

    for (let depth = 8; depth >= 1; depth -= 1) {
      ctx.globalAlpha = 0.12 + (8 - depth) * 0.025;
      ctx.fillStyle = palette.accent;

      visibleLines.forEach((lineText, index) => {
        ctx.fillText(
          lineText,
          500 + depth * 0.42,
          startY + index * lineHeight + depth * 0.9,
          maxWidth,
        );
      });
    }

    ctx.globalAlpha = 1;

    const metallic = ctx.createLinearGradient(
      0,
      startY - 90,
      0,
      startY + totalHeight + 90,
    );

    metallic.addColorStop(0, palette.secondary);
    metallic.addColorStop(0.23, foreground);
    metallic.addColorStop(0.48, palette.secondary);
    metallic.addColorStop(0.72, foreground);
    metallic.addColorStop(1, palette.secondary);

    ctx.shadowColor = palette.accent;
    ctx.shadowBlur = 15;
    ctx.fillStyle = metallic;

    visibleLines.forEach((lineText, index) => {
      ctx.fillText(lineText, 500, startY + index * lineHeight, maxWidth);
    });

    ctx.restore();
  } else if (options.style === "wave") {
    ctx.save();
    ctx.shadowColor = palette.accent;
    ctx.shadowBlur = 34;
    ctx.fillStyle = foreground;

    visibleLines.forEach((lineText, index) => {
      ctx.fillText(lineText, 500, startY + index * lineHeight, maxWidth);
    });

    ctx.restore();
  } else {
    ctx.save();
    ctx.shadowColor = palette.accent + "55";
    ctx.shadowBlur = 8;
    ctx.fillStyle = foreground;

    visibleLines.forEach((lineText, index) => {
      ctx.fillText(lineText, 500, startY + index * lineHeight, maxWidth);
    });

    ctx.restore();
  }

  if (options.style === "silk") {
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(330, startY + totalHeight / 2 + 52);
    ctx.lineTo(450, startY + totalHeight / 2 + 52);
    ctx.moveTo(550, startY + totalHeight / 2 + 52);
    ctx.lineTo(670, startY + totalHeight / 2 + 52);
    ctx.stroke();

    ctx.font = '500 17px "Noto Sans Kannada", sans-serif';
    ctx.fillStyle = palette.accent;
    ctx.fillText("✦", 500, startY + totalHeight / 2 + 52);
  }

  ctx.fillStyle = palette.secondary;
  ctx.font = '600 12px "DM Sans", sans-serif';
  ctx.letterSpacing = "2px";
  ctx.fillText("ಕನ್ನಡ ಕೂಟ  ·  PES ELECTRONIC CITY", 500, 872);

  ctx.font = '500 13px "Noto Sans Kannada", sans-serif';
  ctx.letterSpacing = "0px";
  ctx.fillStyle = foreground;
  ctx.fillText("ನಮ್ಮ ನಾಡು · ನಮ್ಮ ನುಡಿ · ನಮ್ಮ ಕಲೆ", 500, 902);

  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(450, 940);
  ctx.lineTo(550, 940);
  ctx.stroke();
  ctx.restore();

  // Retain wordCount for a stable, predictable layout when the phrase changes.
  void wordCount;
}

async function createArtworkBlob(options: ArtworkOptions): Promise<Blob> {
  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  drawArtwork(canvas, options, 2400);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("The browser could not export this artwork.")),
      "image/png",
    );
  });
}

function downloadBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "akshara-shilpa.png";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function AksharaShilpaPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [options, setOptions] = useState<ArtworkOptions>(initialOptions);
  const [motion, setMotion] = useState(true);
  const [notice, setNotice] = useState("");
  const [viewMode, setViewMode] = useState<"3d" | "flat">("3d");
  const [autoRotate, setAutoRotate] = useState(true);
  const [canvasRevision, setCanvasRevision] = useState(0);
  const [resetToken, setResetToken] = useState(0);
  const [threeStatus, setThreeStatus] = useState("");

  const update = <K extends keyof ArtworkOptions>(
    key: K,
    value: ArtworkOptions[K],
  ) => setOptions((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // Continue with the browser's fallback fonts.
      }
      if (!cancelled && canvasRef.current) {
        drawArtwork(canvasRef.current, options);
        setCanvasRevision((revision) => revision + 1);
      }
    };

    void render();
    return () => {
      cancelled = true;
    };
  }, [options]);

  const handleDownload = async () => {
    try {
      const blob = await createArtworkBlob(options);
      downloadBlob(blob);
      setNotice("Your high resolution artwork is ready.");
    } catch {
      setNotice("We could not export the image. Please try again.");
    }
  };

  const handleShare = async () => {
    try {
      const blob = await createArtworkBlob(options);
      const file = new File([blob], "akshara-shilpa.png", {
        type: "image/png",
      });

      if (
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          title: "Akshara Shilpa",
          text: "My Kannada letter artwork",
          files: [file],
        });
        setNotice("Artwork shared successfully.");
      } else {
        downloadBlob(blob);
        setNotice("Sharing is unavailable here, so your PNG was downloaded.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setNotice("We could not share the artwork. Try downloading it instead.");
    }
  };

  return (
    <div className="akshara-page">
      <header className="akshara-hero">
        <div className="akshara-hero-mark" aria-hidden="true">ಅ</div>
        <div className="akshara-hero-copy">
          <p className="akshara-eyebrow">
            KANNADA KOOTA <span /> A CREATIVE LETTER STUDIO
          </p>
          <h1>
            Akshara <em>Shilpa.</em>
          </h1>
          <p className="akshara-kannada-title">ಅಕ್ಷರಶಿಲ್ಪ · ಅಕ್ಷರಗಳಲ್ಲಿ ನಿಮ್ಮ ಕಥೆ</p>
          <p className="akshara-intro">
            Give your words a form of their own. Make Kannada letter art
            inspired by heritage, colour and the things we carry with us.
          </p>
        </div>
        <span className="akshara-hero-index">01 / CREATE YOUR OWN</span>
      </header>

      <main className="akshara-main">
        <div className="akshara-section-heading">
          <div>
            <p className="akshara-eyebrow">THE LETTER WORKSHOP</p>
            <h2>Your words. <em>Your artwork.</em></h2>
          </div>
          <p className="akshara-section-note">
            ಕನ್ನಡಕ್ಕೆ ನಿಮ್ಮದೇ ಆದ ಒಂದು ರೂಪ ಕೊಡಿ.
          </p>
        </div>

        <div className="akshara-workspace">
          <section className="akshara-controls" aria-label="Artwork controls">
            <div className="akshara-panel-heading">
              <span className="akshara-step">01</span>
              <div>
                <h3>Start with a word</h3>
                <p>Type something that means something to you.</p>
              </div>
              <Type size={19} aria-hidden="true" />
            </div>

            <label className="akshara-field-label" htmlFor="akshara-text">
              YOUR TEXT <span>{options.text.length}/80</span>
            </label>
            <textarea
              id="akshara-text"
              className="akshara-text-input"
              value={options.text}
              maxLength={80}
              rows={3}
              placeholder="ನಿಮ್ಮ ಪದವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
              onChange={(event) => {
                update("text", event.target.value);
                setNotice("");
              }}
            />

            <div className="akshara-examples">
              {["ಕನ್ನಡ", "ನಮ್ಮ ನಾಡು", "ಸ್ನೇಹ", "ಕರುನಾಡು"].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => update("text", sample)}
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="akshara-divider" />

            <div className="akshara-control-title">
              <span className="akshara-step">02</span>
              <div>
                <h3>Choose your style</h3>
                <p>Four different ways to tell your story.</p>
              </div>
            </div>

            <div className="akshara-style-grid">
              {styles.map((style) => (
                <button
                  type="button"
                  key={style.id}
                  className={`akshara-style-card ${options.style === style.id ? "is-selected" : ""}`}
                  aria-pressed={options.style === style.id}
                  onClick={() => update("style", style.id)}
                >
                  <span className={`akshara-style-glyph glyph-${style.id}`}>ಅ</span>
                  <span className="akshara-style-name">{style.name}</span>
                  <span className="akshara-style-kannada">{style.kannada}</span>
                  <span className="akshara-style-description">{style.description}</span>
                </button>
              ))}
            </div>

            <div className="akshara-divider" />

            <div className="akshara-control-title">
              <span className="akshara-step">03</span>
              <div>
                <h3>Find your palette</h3>
                <p>Colour changes everything.</p>
              </div>
            </div>

            <div className="akshara-palette-grid">
              {palettes.map((palette) => (
                <button
                  type="button"
                  key={palette.id}
                  className={`akshara-palette ${options.palette === palette.id ? "is-selected" : ""}`}
                  aria-label={`${palette.name} colour palette`}
                  aria-pressed={options.palette === palette.id}
                  onClick={() => update("palette", palette.id)}
                >
                  <span
                    className="akshara-palette-swatch"
                    style={{
                      background: palette.background,
                      color: palette.ink,
                      borderColor: palette.accent,
                    }}
                  >
                    <i style={{ background: palette.accent }} />
                    <i style={{ background: palette.secondary }} />
                  </span>
                  <span>{palette.name}</span>
                </button>
              ))}
            </div>

            <div className="akshara-divider" />

            <div className="akshara-control-title">
              <span className="akshara-step">04</span>
              <div>
                <h3>Fine-tune the canvas</h3>
                <p>A few finishing touches.</p>
              </div>
            </div>

            <div className="akshara-slider-heading">
              <label htmlFor="akshara-scale">Letter scale</label>
              <span>{Math.round(options.scale * 100)}%</span>
            </div>
            <input
              id="akshara-scale"
              className="akshara-range"
              type="range"
              min="0.7"
              max="1.25"
              step="0.05"
              value={options.scale}
              onChange={(event) => update("scale", Number(event.target.value))}
            />

            <fieldset className="akshara-layout-fieldset">
              <legend>Word arrangement</legend>
              <div className="akshara-layout-options">
                <button
                  type="button"
                  className={options.layout === "natural" ? "is-selected" : ""}
                  aria-pressed={options.layout === "natural"}
                  onClick={() => update("layout", "natural")}
                >
                  Natural flow
                </button>
                <button
                  type="button"
                  className={options.layout === "stacked" ? "is-selected" : ""}
                  aria-pressed={options.layout === "stacked"}
                  onClick={() => update("layout", "stacked")}
                >
                  Stacked words
                </button>
              </div>
            </fieldset>

            <label className="akshara-toggle-row">
              <span>
                <strong>Paper texture</strong>
                <small>Add a tactile finish to the canvas.</small>
              </span>
              <input
                type="checkbox"
                checked={options.texture}
                onChange={(event) => update("texture", event.target.checked)}
              />
            </label>

            <label className="akshara-toggle-row">
              <span>
                <strong>Motion preview</strong>
                <small>Give the preview a gentle entrance.</small>
              </span>
              <input
                type="checkbox"
                checked={motion}
                onChange={(event) => setMotion(event.target.checked)}
              />
            </label>

            <button
              type="button"
              className="akshara-reset"
              onClick={() => {
                setOptions(initialOptions);
                setMotion(true);
                setNotice("");
              }}
            >
              <RotateCcw size={15} /> Reset artwork
            </button>
          </section>

          <section className="akshara-preview" aria-label="Live artwork preview">
            <div className="akshara-preview-toolbar">
              <div>
                <span className="akshara-live-dot" />
                <span>{viewMode === "3d" ? "LIVE 3D OBJECT" : "FLAT CANVAS"}</span>
              </div>
              <div className="akshara-view-controls" role="group" aria-label="Artwork view controls">
                <button
                  type="button"
                  className={viewMode === "3d" ? "is-active" : ""}
                  aria-pressed={viewMode === "3d"}
                  onClick={() => {
                    setThreeStatus("");
                    setViewMode("3d");
                  }}
                >
                  3D STUDIO
                </button>
                <button
                  type="button"
                  className={viewMode === "flat" ? "is-active" : ""}
                  aria-pressed={viewMode === "flat"}
                  onClick={() => setViewMode("flat")}
                >
                  FLAT ART
                </button>
                {viewMode === "3d" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setAutoRotate((value) => !value)}
                      aria-pressed={autoRotate}
                    >
                      {autoRotate ? "PAUSE" : "ROTATE"}
                    </button>
                    <button type="button" onClick={() => setResetToken((value) => value + 1)}>
                      RESET
                    </button>
                  </>
                )}
              </div>
            </div>

            <div
              className={`akshara-canvas-stage ${motion ? "motion-enabled" : ""} ${viewMode === "3d" ? "is-3d" : "is-flat"}`}
              key={`${options.style}-${motion}`}
              onPointerMove={(event) => {
                if (event.pointerType === "touch") return;

                const frame = event.currentTarget.getBoundingClientRect();
                const art = event.currentTarget.querySelector<HTMLElement>(".akshara-canvas-3d");

                if (!art || frame.width === 0 || frame.height === 0) return;

                const x = (event.clientX - frame.left) / frame.width;
                const y = (event.clientY - frame.top) / frame.height;

                art.style.setProperty("--ak-tilt-x", `${(0.5 - y) * 10}deg`);
                art.style.setProperty("--ak-tilt-y", `${(x - 0.5) * 12}deg`);
              }}
              onPointerLeave={(event) => {
                const art = event.currentTarget.querySelector<HTMLElement>(".akshara-canvas-3d");

                art?.style.setProperty("--ak-tilt-x", "0deg");
                art?.style.setProperty("--ak-tilt-y", "0deg");
              }}
            >
              <div className="akshara-canvas-3d">
              <div className="akshara-canvas-decoration decoration-one" />
              <div className="akshara-canvas-decoration decoration-two" />
              {viewMode === "3d" && (
                <Suspense
                  fallback={
                    <div className="akshara-three-loading" role="status">
                      Preparing the 3D studio...
                    </div>
                  }
                >
                  <Akshara3DViewport
                    sourceCanvasRef={canvasRef}
                    revision={canvasRevision}
                    accentColor={palettes.find((item) => item.id === options.palette)?.accent ?? "#c15bff"}
                    secondaryColor={palettes.find((item) => item.id === options.palette)?.secondary ?? "#42f5d7"}
                    autoRotate={autoRotate}
                    resetToken={resetToken}
                    onError={(message) => {
                      setThreeStatus(message);
                      setViewMode("flat");
                    }}
                  />
                </Suspense>
              )}
              <canvas
                ref={canvasRef}
                className="akshara-art-canvas"
                width={1200}
                height={1200}
                aria-label={`Preview of the artwork: ${options.text || "ಕನ್ನಡ"}`}
                role="img"
              />
              </div>
            </div>

            <div className="akshara-preview-caption">
              <div>
                <span className="akshara-caption-label">YOUR CREATION</span>
                <p>{options.text.trim() || "ನಿಮ್ಮ ಪದ"}</p>
              </div>
              <span className="akshara-caption-style">
                {styles.find((item) => item.id === options.style)?.name}
              </span>
            </div>

            <div className="akshara-export-actions">
              <button
                type="button"
                className="akshara-download-button"
                onClick={handleDownload}
              >
                <Download size={17} />
                Download high-resolution PNG
                <ArrowUpRight size={15} />
              </button>
              <button
                type="button"
                className="akshara-share-button"
                onClick={handleShare}
                aria-label="Share your artwork"
              >
                <Share2 size={17} />
                Share
              </button>
            </div>

            <p className="akshara-export-note">
              Exported artwork is 2400 × 2400 pixels. The editor controls
              won't appear in your image.
            </p>

            {threeStatus && (
              <p className="akshara-notice" role="status">{threeStatus}</p>
            )}
            {notice && (
              <p className="akshara-notice" role="status">
                <Sparkles size={15} /> {notice}
              </p>
            )}
          </section>
        </div>
      </main>

      <footer className="akshara-footer">
        <div className="akshara-footer-symbol">ಅ</div>
        <div>
          <p>ಅಕ್ಷರಗಳಲ್ಲಿ ಒಂದು ಚಿಕ್ಕ ಪ್ರಪಂಚ.</p>
          <span>A LITTLE WORLD, MADE OF LETTERS.</span>
        </div>
        <span className="akshara-footer-brand">
          KANNADA KOOTA <b>✳</b> PES EC
        </span>
      </footer>
    </div>
  );
}
