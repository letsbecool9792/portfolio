#!/usr/bin/env python3
"""
Generates the Open Graph / Twitter card image and the favicon set.

Social scrapers never run JavaScript, so the share card can't be drawn by the
app — it has to be a real file on disk. This paints one in the site's own
palette (the pixel panel from `src/styles/panel.ts`, the grass tile from the
card art) so a shared link looks like the site it points at.

Outputs, all into `public/`:
    og.png              1200x630, the OG/Twitter card
    favicon.ico         16/32/48 — Google needs a 48px multiple to show an icon in results
    favicon-96.png      96x96
    apple-touch-icon.png 192x192

The source favicon is 16x16 pixel art, so every size here is an exact integer
upscale done with NEAREST — no blurring, no invented colours.

Run:  python scripts/generate_og.py
"""

from __future__ import annotations

import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FONT_CACHE = ROOT / "scripts" / ".fonts"

# Resolved from the Google Fonts CSS API. Pinned so a rerun can't silently
# change the metrics the layout below was tuned against.
FONTS = {
    "pressstart.ttf": "https://fonts.gstatic.com/s/pressstart2p/v16/e3t4euO8T-267oIAQAu6jDQyK0nS.ttf",
    "jersey25.ttf": "https://fonts.gstatic.com/s/jersey25/v4/ll8-K2eeXj2tAs6F9BXIJw.ttf",
}

# From src/styles/panel.ts and src/styles/background.ts — kept in sync by hand.
PANEL_BORDER = (0x1F, 0x48, 0x7E)
PANEL_BEVEL = (0x31, 0x66, 0xAF)
PARCHMENT = (0xFB, 0xF5, 0xE6)
SKY = (0xBF, 0xDB, 0xFE)  # tailwind blue-200, the site's page background
INK = (0x1E, 0x3A, 0x5F)
MUTED = (0x4B, 0x5B, 0x6E)

W, H = 1200, 630


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONT_CACHE / name
    if not path.exists():
        FONT_CACHE.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(FONTS[name], path)
    return ImageFont.truetype(str(path), size)


def bevelled(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill) -> None:
    """The double border from `frame` in panel.ts, drawn at OG scale."""
    x0, y0, x1, y1 = box
    draw.rectangle(box, fill=fill, outline=PANEL_BORDER, width=6)
    draw.rectangle((x0 + 10, y0 + 10, x1 - 10, y1 - 10), outline=PANEL_BEVEL, width=3)


def build_og() -> None:
    img = Image.new("RGB", (W, H), SKY)
    draw = ImageDraw.Draw(img)

    # Grass strip along the bottom, tiled from the real card texture so the
    # pixel scale matches the site.
    tile = Image.open(PUBLIC / "assets/cards/terrain_grass_block_center.png").convert("RGB")
    strip = 128
    for x in range(0, W, tile.width):
        img.paste(tile, (x, H - strip))

    # The panel holding everything, floating on the sky above the grass.
    bevelled(draw, (60, 60, W - 60, H - 90), PARCHMENT)

    # Portrait, square-cropped and framed like a relic card.
    portrait = Image.open(PUBLIC / "assets/other/pic.jpg").convert("RGB")
    side = min(portrait.size)
    left = (portrait.width - side) // 2
    portrait = portrait.crop((left, 0, left + side, side)).resize((300, 300), Image.LANCZOS)
    px, py = 120, 150
    draw.rectangle((px - 8, py - 8, px + 308, py + 308), fill=PANEL_BORDER)
    img.paste(portrait, (px, py))

    tx = 480
    draw.text((tx, 168), "SUPARNO", font=font("pressstart.ttf", 52), fill=INK)
    draw.text((tx, 236), "SAHA", font=font("pressstart.ttf", 52), fill=INK)
    draw.text((tx, 320), "letsbecool9792", font=font("jersey25.ttf", 58), fill=PANEL_BEVEL)
    draw.text((tx, 384), "Software Developer", font=font("jersey25.ttf", 46), fill=MUTED)
    draw.text((tx, 444), "suparno.me", font=font("pressstart.ttf", 20), fill=MUTED)

    img.save(PUBLIC / "og.png", optimize=True)
    print(f"og.png            {W}x{H}  {(PUBLIC / 'og.png').stat().st_size // 1024} KB")


def build_favicons() -> None:
    src = Image.open(PUBLIC / "favicon.ico").convert("RGBA")
    if src.size != (16, 16):
        raise SystemExit(f"expected a 16x16 source favicon, got {src.size}")

    # Exact integer upscales only — 3x, 6x, 12x off a 16px pixel-art source.
    src.resize((48, 48), Image.NEAREST).save(
        PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )
    src.resize((96, 96), Image.NEAREST).save(PUBLIC / "favicon-96.png")
    src.resize((192, 192), Image.NEAREST).save(PUBLIC / "apple-touch-icon.png")
    print("favicon.ico       16/32/48")
    print("favicon-96.png    96x96")
    print("apple-touch-icon  192x192")


if __name__ == "__main__":
    build_og()
    build_favicons()
