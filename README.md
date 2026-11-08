# adhikasp.my.id

This is my personal blog available at https://adhikasp.my.id.

## Local Development

To run the Hugo local development server:

```bash
# Start the Hugo server with drafts enabled
hugo server -D

# The site will be available at http://localhost:1313
```

## Creating New Content

To create a new blog post:

```bash
# Create a new post
hugo new posts/your-post-title.md
```

This will create a new markdown file in `content/posts/` with the following default front matter:

```yaml
---
title: "Your Post Title"
date: YYYY-MM-DD
draft: true
---
```

Edit the markdown file to add your content. When ready to publish:

1. Set `draft: false` in the front matter
2. Write your content in markdown format
3. Add images to the `static/images/` directory if needed
4. Reference images in your post using: `/images/your-image.jpg`

## Images and diagrams

Diagrams are SVG. `layouts/_default/_markup/render-image.html` reads each
SVG's intrinsic size (width/height, falling back to `viewBox`), emits it with
those attributes so the browser reserves the right box, and the stylesheet
scales it to the full prose column — so a 480px-wide viewBox fills a 672px
column crisply instead of floating small. Raster and remote images pass
through unchanged.

```markdown
![What the diagram shows](/images/my-diagram.svg)          <!-- static/images/ -->
![What it shows](diagram.svg)                              <!-- page bundle -->
![What it shows](/images/my-diagram.svg "Optional caption") <!-- renders <figure> -->
```

Lookup order is page bundle resource → `assets/` → `static/`.

To inline the vector instead of linking it (inherits page CSS, no extra
request):

```markdown
{{< svg "images/my-diagram.svg" >}}
{{< svg "images/my-diagram.svg" "Optional caption" >}}
```

`og:image` / `twitter:image` must be a raster; if a post's `image:` points at
an SVG the build warns and falls back to `images/og-image.png`.

## Descriptions are linted

Every page in `posts`, `link-blog` and `notebook` must have a `description:`
front matter key of at most **160 characters**, on one line. It is the only
text used as the post-list teaser and the `<meta name="description">`, and the
builder renders it whole — nothing is truncated, so a longer one would wrap
the list into a paragraph. `layouts/partials/lint-page.html` (called from
`baseof.html`) fails the build when the description is too long, when a
non-draft page has none, or when a title exceeds 70 characters:

```
ERROR lint: posts/foo.md: description is 199 chars, max 160 — rewrite it shorter; list teasers are never truncated
```

Write it as a complete sentence, not a truncated thought: the fix is to rewrite
it, never to raise the limit. `layouts/partials/page-desc.html` returns the
teaser, `seo-desc.html` adds the same 160-character guard for meta tags.

## Deployment

No CI: `scripts/blog/publish.sh` in `~/pi-life` builds the production site and
rsyncs it to gatotkaca.
