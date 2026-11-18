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

# List thumbnails: 640x336 (3.2x the 200 px slot, so sharp on HiDPI), Lanczos-downscaled from the
# source raster or SVG card. The browser must not do the 1600->200 px shrink itself: it aliases
# (pixelated, Adhika 2026-11-18). card-image.html serves <name>.thumb.jpg when it exists.
shopt -s nullglob
for src in static/images/*.{webp,jpg,jpeg,png} "$OUT"/*.jpg; do
  [[ "$src" == *.thumb.jpg ]] && continue
  name="$(basename "${src%.*}")"
  th="$OUT/$name.thumb.jpg"
  [[ -f "$th" && "$th" -nt "$src" ]] && continue
  magick "$src" -filter Lanczos -resize 640x336^ -gravity center -extent 640x336 -background "#fcfcfb" -quality 85 -strip "$th"
  echo "thumb: $th"
done
