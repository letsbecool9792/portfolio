#!/usr/bin/env python3
"""
Normalise the image assets in public/assets.

Three jobs, in order:

1. Correct extensions. Several files are JPEGs or WebPs named `.png`. Browsers
   sniff the bytes so nothing visibly breaks, but Vercel sets `Content-Type`
   from the extension, so they are served mislabelled. Renamed files have their
   references rewritten across src/ (including the content JSON).

2. Correct resolutions. Most images are stored far larger than they are ever
   displayed (a 3072px portrait shown at ~300px). Each is capped at roughly 2x
   its real display size so it still looks sharp on HiDPI screens.

3. Correct encodings. Opaque photographs stored as PNG are re-encoded as JPEG,
   which is dramatically smaller for photographic content.

Pixel art is skipped entirely — resampling it would destroy the crisp edges the
whole site's aesthetic depends on, and the tiling textures must keep their exact
dimensions to tile seamlessly.

Usage:
    python scripts/optimize_images.py --dry-run    # report only, change nothing
    python scripts/optimize_images.py              # apply
"""

from __future__ import annotations

import argparse
import io
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required:  pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "assets"

# Directories whose contents are pixel art or vectors: never resample these.
# The card textures in particular tile seamlessly and must keep exact sizes.
SKIP_DIRS = {"background", "cards", "cursors"}

# Pixel-art sprites and UI chrome living alongside photographic assets.
SKIP_PREFIXES = ("ladder_", "character_", "sign_", "button_", "icon_", "bsky", "discord")

# Longest edge allowed, chosen as ~2x the largest size each asset is displayed at.
# First matching rule wins, so more specific paths come first.
MAX_EDGE_RULES: list[tuple[str, int]] = [
    ("other/pic", 1000),                 # portrait tile, shown ~300-400px
    ("other/modal_background", 1400),    # project modal, max-w-4xl
    ("other/projects_card", 1200),       # desktop relic card, 600x300
    ("projects/", 1400),                 # modal hero image
    ("journey/", 900),                    # timeline card image
    ("sidequests/", 800),                 # side quest card image
    ("experience/", 192),                # shipped-app icon, shown ~72px
]

# Above this many distinct colours an image is treated as photographic, so an
# opaque PNG can safely become a JPEG. Pixel art sits far below it.
PHOTO_COLOR_THRESHOLD = 10_000

JPEG_QUALITY = 82

# Files whose contents reference asset paths and may need rewriting after a rename.
REFERENCE_GLOBS = ("src/**/*.ts", "src/**/*.tsx", "src/**/*.css", "src/content/*.json")

EXT_FOR_FORMAT = {"JPEG": ".jpg", "PNG": ".png", "WEBP": ".webp", "GIF": ".gif"}


def human(num_bytes: float) -> str:
    return f"{num_bytes / 1048576:.2f}MB" if num_bytes >= 1048576 else f"{num_bytes / 1024:.0f}KB"


def is_skipped(path: Path) -> bool:
    if path.suffix.lower() == ".svg":
        return True
    if any(part in SKIP_DIRS for part in path.relative_to(ASSETS).parts[:-1]):
        return True
    return path.name.lower().startswith(SKIP_PREFIXES)


def max_edge_for(path: Path) -> int | None:
    key = path.relative_to(ASSETS).as_posix()
    for prefix, limit in MAX_EDGE_RULES:
        if key.startswith(prefix):
            return limit
    return None


def is_photographic(image: Image.Image) -> bool:
    # getcolors returns None once the palette exceeds maxcolors, which is itself
    # the signal that there is far too much colour variety to be pixel art.
    return image.convert("RGB").getcolors(maxcolors=PHOTO_COLOR_THRESHOLD) is None


def has_transparency(image: Image.Image) -> bool:
    if image.mode in ("RGBA", "LA", "PA"):
        alpha = image.getchannel("A")
        return alpha.getextrema()[0] < 255
    return image.mode == "P" and "transparency" in image.info


def rewrite_references(old_name: str, new_name: str, dry_run: bool) -> list[str]:
    """Swap a filename across source and content files. Word-boundaried so
    `pic.png` never matches inside `pic2.png`."""
    pattern = re.compile(rf"(?<![\w-]){re.escape(old_name)}(?![\w])")
    touched = []
    for glob in REFERENCE_GLOBS:
        for file in ROOT.glob(glob):
            text = file.read_text(encoding="utf-8")
            if not pattern.search(text):
                continue
            touched.append(str(file.relative_to(ROOT)).replace("\\", "/"))
            if not dry_run:
                file.write_text(pattern.sub(new_name, text), encoding="utf-8")
    return touched


def encode(image: Image.Image, as_jpeg: bool) -> bytes:
    """Encode to bytes, picking the smallest sensible variant.

    Flat UI screenshots often stay PNG (too few colours to count as photographic)
    but balloon after resampling, because interpolation invents thousands of new
    colours. A 256-colour palette undoes that and is what pngquant would do.
    """
    if as_jpeg:
        buffer = io.BytesIO()
        image.convert("RGB").save(buffer, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        return buffer.getvalue()

    candidates = []
    plain = io.BytesIO()
    image.save(plain, "PNG", optimize=True)
    candidates.append(plain.getvalue())

    try:
        if has_transparency(image):
            palettised = image.convert("RGBA").quantize(colors=256, method=Image.FASTOCTREE)
        else:
            palettised = image.convert("RGB").quantize(colors=256, method=Image.MEDIANCUT)
        buffer = io.BytesIO()
        palettised.save(buffer, "PNG", optimize=True)
        candidates.append(buffer.getvalue())
    except (ValueError, OSError):
        pass  # Quantisation is an optimisation, never a requirement.

    return min(candidates, key=len)


def process(path: Path, dry_run: bool) -> tuple[int, int, list[str]]:
    """Returns (bytes_before, bytes_after, notes)."""
    before = path.stat().st_size
    original_bytes = path.read_bytes()
    notes: list[str] = []

    with Image.open(path) as opened:
        image = opened.copy()
        actual_format = opened.format or ""

    # Decide the final encoding before touching the filename, so a PNG that is
    # really a photo lands on .jpg in a single rename rather than two.
    to_jpeg = is_photographic(image) and not has_transparency(image)
    correct_ext = ".jpg" if to_jpeg else EXT_FOR_FORMAT.get(actual_format)

    needs_rename = bool(correct_ext) and path.suffix.lower() != correct_ext
    cap = max_edge_for(path)
    needs_resize = bool(cap) and max(image.size) > cap

    # Re-encoding a file that needs neither is pure loss: JPEG is generational,
    # so an untouched run would degrade every image a little each time.
    if not needs_rename and not needs_resize:
        return before, before, []

    if needs_rename:
        if to_jpeg and actual_format != "JPEG":
            notes.append(f"opaque photo: re-encoding {actual_format} as JPEG")
        else:
            notes.append(f"mislabelled: {actual_format} named {path.suffix}")

    if needs_resize:
        was = image.size
        image.thumbnail((cap, cap), Image.LANCZOS)
        notes.append(f"{was[0]}x{was[1]} -> {image.size[0]}x{image.size[1]}")

    if dry_run:
        return before, before, notes

    data = encode(image, to_jpeg)

    # Never write something larger than what it replaces. If a rename is still
    # needed the original bytes move under the corrected name untouched.
    if len(data) >= before and not needs_resize:
        data = original_bytes
        notes.append("kept original bytes (re-encode was larger)")
    elif len(data) >= before:
        notes.append(f"note: re-encode grew to {human(len(data))}, kept anyway for the smaller dimensions")

    target = path.with_suffix(correct_ext) if needs_rename else path
    target.write_bytes(data)

    if target != path:
        path.unlink()
        moved = rewrite_references(path.name, target.name, dry_run)
        notes.append("refs: " + (", ".join(moved) if moved else "none found"))

    return before, target.stat().st_size, notes


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dry-run", action="store_true", help="report what would change, write nothing")
    args = parser.parse_args()

    if not ASSETS.is_dir():
        sys.exit(f"Not found: {ASSETS}")

    files = sorted(p for p in ASSETS.rglob("*") if p.is_file())
    total_before = total_after = 0
    changed = 0

    print(f"{'DRY RUN — no files written' if args.dry_run else 'Optimising'}  ({ASSETS})\n")

    for path in files:
        size = path.stat().st_size
        if is_skipped(path):
            total_before += size
            total_after += size
            continue

        before, after, notes = process(path, args.dry_run)
        total_before += before
        total_after += after
        if notes:
            changed += 1
            rel = path.relative_to(ASSETS).as_posix()
            delta = "" if args.dry_run else f"  {human(before)} -> {human(after)}"
            print(f"  {rel}{delta}")
            for note in notes:
                print(f"      {note}")

    print(f"\n{changed} file(s) {'would change' if args.dry_run else 'changed'}")
    if not args.dry_run:
        saved = total_before - total_after
        pct = (saved / total_before * 100) if total_before else 0
        print(f"total: {human(total_before)} -> {human(total_after)}  (saved {human(saved)}, {pct:.0f}%)")


if __name__ == "__main__":
    main()
