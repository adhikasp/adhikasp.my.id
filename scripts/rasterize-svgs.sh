#!/usr/bin/env bash
# Render every static/images/*.svg to a 1200x630 JPEG card in static/images/card/.
# Why: social platforms (og:image / twitter:image) cannot render SVG, and the post list
# uses these as thumbnails. Hugo cannot rasterize, so this runs before every build
# (scripts/blog/publish.sh, scripts/semar/blog-stg/build.sh in pi-life). Output is gitignored.
# Needs: rsvg-convert (librsvg) and ImageMagick. Only re-renders when the SVG is newer.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=static/images/card
mkdir -p "$OUT"
for svg in static/images/*.svg; do
  [[ -e "$svg" ]] || continue
  jpg="$OUT/$(basename "${svg%.svg}").jpg"
  [[ -f "$jpg" && "$jpg" -nt "$svg" ]] && continue
  rsvg-convert --keep-aspect-ratio -w 1080 -h 540 "$svg" \
    | magick png:- -background '#fcfcfb' -gravity center -extent 1200x630 -quality 90 -strip "$jpg"
  echo "card: $jpg"
done

# List thumbnails: WebP at two widths, Lanczos-downscaled from the source raster or SVG card. The
# browser must not do the 1600->160 px shrink itself: it aliases (pixelated, Adhika 2026-11-18). The
# desktop column is 10rem (160 px), so 320 covers it at 2x; on a phone the row is full width, so it
# takes 640. Sizes measured 2026-11-18 on one card: 61 KB as 640x336 JPEG q85, 39 KB as WebP q78,
# 12 KB at 320. post-item.html emits srcset="...320w, ...640w" + sizes="(max-width: 640px) 100vw, 160px".
shopt -s nullglob
rm -f "$OUT"/*.thumb.jpg
for src in static/images/*.{webp,jpg,jpeg,png} "$OUT"/*.jpg; do
  [[ "$src" == *.thumb.* ]] && continue
  name="$(basename "${src%.*}")"
  th640="$OUT/$name.thumb.webp"
  th320="$OUT/$name.thumb-320.webp"
  [[ -f "$th640" && "$th640" -nt "$src" && -f "$th320" && "$th320" -nt "$src" ]] && continue
  magick "$src" -filter Lanczos -resize 640x336^ -gravity center -extent 640x336 -background "#fcfcfb" -quality 78 -strip "$th640"
  magick "$src" -filter Lanczos -resize 320x168^ -gravity center -extent 320x168 -background "#fcfcfb" -quality 78 -strip "$th320"
  echo "thumb: $th640 + $th320"
done
