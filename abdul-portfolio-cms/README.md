
# Abdul Portfolio — A/B + CMS

- A/B toggle: `?variant=parallax` (default) or `?variant=multi`
- JSON content layer at `data/content.json`
- CMS at `/admin` (Decap/Netlify CMS) for editing copy + uploading images

## Local Preview
Open `index.html` and add `?variant=multi` to switch layouts.

## Deploy with CMS (Netlify easiest)
1. Push these files to a Git repo.
2. Create a site on Netlify from the repo.
3. Enable **Identity** + **Git Gateway** in Netlify, invite yourself.
4. Visit `/admin` on your site to log in and edit content. Uploaded images save to `assets/img`.

© 2025 Abdul Adedeji
