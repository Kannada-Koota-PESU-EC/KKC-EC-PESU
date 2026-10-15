"""
Make a web-friendly WebP copy of an image (resized, rotated upright, compressed).

    python scripts/optimize-images.py public/Events/my-poster.jpg 1200
    -> public/Events/my-poster.webp  (max 1200px wide)

Suggested max widths: event posters 1200, gallery photos 1600, team / respected photos 600,
hero slideshow 1920. Then use the .webp path (e.g. "/Events/my-poster.webp") in src/data/*.json.
Needs Python with Pillow:  pip install pillow
"""
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps


def slug(name: str) -> str:
    """'KKEC X RT 1' -> 'kkec-x-rt-1'"""
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def optimize(source: Path, max_width: int, quality: int = 80) -> Path:
    image = ImageOps.exif_transpose(Image.open(source))
    image = image.convert("RGBA" if image.mode in ("RGBA", "LA", "P") else "RGB")
    if image.width > max_width:
        image = image.resize((max_width, round(image.height * max_width / image.width)), Image.LANCZOS)
    target = source.with_name(slug(source.stem) + ".webp")
    image.save(target, "WEBP", quality=quality, method=6)
    return target


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    out = optimize(Path(sys.argv[1]), int(sys.argv[2]))
    print(f"{sys.argv[1]} -> {out} ({out.stat().st_size // 1024} KB)")
