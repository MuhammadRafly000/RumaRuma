# Image Credits & Replacement Guide

This document covers every image referenced by the RumaRuma Template, the
license under which each is used in the demo, and the workflow to replace
them with your own assets.

> **Important — read before deploying to production.**
> All imagery shown in the demo is for **layout and preview purposes
> only**. You must replace it before publishing a production storefront.

---

## 1. Imagery used in the demo

### 1.1 Local placeholder images

Path: `public/images/`

| Folder        | Files                                       | Use                                |
| ------------- | ------------------------------------------- | ---------------------------------- |
| `banners/`    | `hero_b1.png`, `hero_b3.png`                | Hero carousel slides 1 & 3         |
| `products/`   | `p-001.png` … `p-012.png` (and `.jpg` copies) | Product cards & gallery main image |

These files are bundled with the template for layout preview only. They
are **not** licensed to You for use in Your production End Product and may
not be redistributed. **Replace them with Your own original photography
or properly licensed stock before going live.**

The same filenames are referenced by `src/data/products.js` and
`src/data/banners.js` via:

```js
const img = (id) => `/images/products/${id}.png`;
```

The easiest path: keep the same file names, drop in Your replacement
images, done.

### 1.2 Remote Unsplash photos

A small number of lifestyle photos and customer avatars are referenced via
`https://images.unsplash.com/photo-…` URLs in:

- `src/data/testimonials.js`
- `src/data/reviews.js`
- `src/data/inspirations.js`
- `src/data/journals.js`
- `src/data/categories.js`
- `src/data/banners.js` (some)
- `src/components/home/StorySection.jsx`
- `src/pages/AboutPage.jsx`

These photos are used under the [Unsplash License](https://unsplash.com/license),
which permits commercial use without attribution. Attribution is still
appreciated and listed here for clarity:

| Photo ID                              | Unsplash URL                                                          | Likely use         |
| ------------------------------------- | --------------------------------------------------------------------- | ------------------ |
| `photo-1438761681033-6461ffad8d80`    | <https://unsplash.com/photos/1438761681033-6461ffad8d80>              | Customer avatar    |
| `photo-1472099645785-5658abf4ff4e`    | <https://unsplash.com/photos/1472099645785-5658abf4ff4e>              | Customer avatar    |
| `photo-1531123897727-8f129e1688ce`    | <https://unsplash.com/photos/1531123897727-8f129e1688ce>              | Customer avatar    |
| `photo-1535713875002-d1d0cf377fde`    | <https://unsplash.com/photos/1535713875002-d1d0cf377fde>              | Customer avatar    |
| `photo-1544005313-94ddf0286df2`    | <https://unsplash.com/photos/1544005313-94ddf0286df2>              | Customer avatar    |

Run this command to refresh the list at any time:

```bash
grep -rhoE "photo-[0-9]+-[a-z0-9]+" src/ | sort -u
```

### 1.3 Favicon

`public/favicon.svg` is the only branded asset bundled with the template.
You are free to replace it (recommended) — drop a new `favicon.svg` (or
add a `favicon.ico` / `apple-touch-icon.png`) into `public/` and update
the `<link rel="icon" …>` tag in `index.html` if needed.

### 1.4 Fonts

The template loads **DM Sans** and **Playfair Display** from Google Fonts
via `index.html`. Both are licensed under the SIL Open Font License 1.1
and may be used commercially without further action.

---

## 2. Replacement workflow

### Option A — keep the same paths (fastest)

1. Prepare Your replacement images sized **at least 800×800 px** for
   products, **1600×900 px** for hero banners. JPEG quality 80 or modern
   formats (WebP, AVIF) are recommended for fast load.
2. Save each product photo with the matching ID:
   `public/images/products/p-001.png`, `p-002.png`, etc.
3. Save replacement hero banners as
   `public/images/banners/hero_b1.png`, `hero_b3.png`.
4. For images currently coming from Unsplash, edit
   `src/data/testimonials.js`, `src/data/reviews.js`, etc. and replace
   the `https://images.unsplash.com/…` URL with the path of your local
   file (or a CDN URL).

No code change needed if you stick to the same paths.

### Option B — point to a CDN / image service (recommended at scale)

For production stores with many products, host images on a service that
does on-the-fly resizing:

- **Cloudinary** — free tier, easy URL transforms
- **imgix**
- **Supabase Storage** with the included `?transform=...` API
- **Cloudflare Images**
- **AWS S3 + CloudFront**

Open `src/data/products.js` and replace the helper:

```js
// Before
const img = (id) => `/images/products/${id}.png`;

// After (Cloudinary example)
const CLOUD = 'your-cloud-name';
const img = (id) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_900/products/${id}.jpg`;
```

### Option C — load from API

If your backend returns product images, drop the helper entirely and use
the URL from your API response. The `<ProductCard>` and `<ProductGallery>`
components already accept any URL string in the `images[]` field.

---

## 3. Performance recommendations

- **Format**: WebP or AVIF for product photos; SVG for logos / icons.
- **Size**: 600–900 px for cards; 1200–1600 px for hero; 200 px for avatars.
- **Quality**: 70–80 (visually identical to 100, ~5× smaller).
- **Lazy loading**: already enabled on `<img loading="lazy">` for non-LCP
  images.
- **CDN caching**: `vercel.json` and `netlify.toml` already set
  `Cache-Control: public, max-age=31536000, immutable` for everything
  under `/assets/`. If you host images in `public/images/`, copy that
  pattern in your CDN.

---

## 4. Pre-launch image checklist

- [ ] All product images replaced with originals / licensed stock.
- [ ] All hero banner images replaced.
- [ ] All Unsplash references checked, either kept (if still permitted) or
      replaced.
- [ ] Favicon and (optional) apple-touch-icon swapped.
- [ ] Each image compressed (squoosh.app or `sharp-cli`).
- [ ] Alt text reviewed in `src/data/products.js` (`name` is used as alt
      by default).
- [ ] Open Graph image set for social shares (default in `<SEO>`
      component is `/logo.png` — add this file to `public/`).
