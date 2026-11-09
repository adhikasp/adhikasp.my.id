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
