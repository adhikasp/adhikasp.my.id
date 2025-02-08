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

## Deployment

The site is automatically deployed via GitHub Actions when changes are pushed to the main branch. 