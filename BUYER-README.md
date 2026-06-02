# RumaRuma — Buyer Quickstart

Hi, and thank you for purchasing **RumaRuma**. This guide is the **30-minute
path from ZIP to live store**. The longer `README.md` and `DEPLOYMENT.md`
in this folder go deeper if you want to customize further.

> **License**: see `LICENSE.md`. Single-buyer commercial license — use it on
> as many End Products as you build for yourself or your paying clients,
> but please don't re-sell the template itself.

---

## What you just got

```
RumaRuma/
├── src/                  ← all application code (React + JSX)
├── public/               ← favicon, robots.txt, Netlify _redirects
├── index.html            ← document shell + Google Fonts
├── package.json          ← deps (React, Vite, Tailwind, Framer Motion, …)
├── vite.config.js        ← build + chunking
├── tailwind.config.js    ← brand tokens (cream / sage / teal / charcoal)
├── postcss.config.js
├── .env.example          ← copy to .env
├── .nvmrc                ← Node 20 pin
├── vercel.json           ← Vercel deploy config
├── netlify.toml          ← Netlify deploy config
├── README.md             ← developer overview
├── DEPLOYMENT.md         ← step-by-step deployment
├── BUYER-README.md       ← THIS FILE
├── CHANGELOG.md          ← version history
├── IMAGE-CREDITS.md      ← Unsplash sources + replacement guide
└── LICENSE.md            ← commercial license
```

---

## 30-minute setup

### 1. Install (~3 min)

Requires **Node.js ≥ 18.18** (recommend Node 20 LTS).

```bash
npm install
cp .env.example .env       # macOS / Linux
# or on Windows PowerShell:
Copy-Item .env.example .env

npm run dev
```

Open <http://localhost:5173>. You should see the storefront.

### 2. Rebrand (~10 min) — edit ONE file

All brand strings live in `src/config/constants.js`. Open it and change:

```js
export const BRAND = {
  name: 'Your Brand',             // appears in Footer, SEO, copyright
  tagline: 'Your tagline',
  legalName: 'Your Legal Company Name',
  domain: 'https://yourstore.com',
  address: 'Your Studio · Jakarta, Indonesia',
  phoneDisplay: '+62 21 1234 5678',
  phoneHref:    'tel:+622112345678',
  emailDisplay: 'hello@yourstore.com',
  emailHref:    'mailto:hello@yourstore.com',
  socials: {
    instagram: 'https://instagram.com/yourbrand',
    facebook:  'https://facebook.com/yourbrand',
    twitter:   'https://twitter.com/yourbrand',
  },
};
```

That single edit updates the **Footer**, **MobileMenu contact line**, **SEO
meta tags**, and **page titles**. The wordmark in the navbar comes from
`src/components/layout/Logo.jsx` — edit that file's JSX to swap your
wordmark or upload an SVG to `public/` and reference it.

### 3. Re-color (~5 min)

Brand palette lives in `tailwind.config.js`. Change the `sage` ramp to your
brand color and the rest of the system follows:

```js
sage: {
  50:  '#f4f7f5',
  100: '#e4ede8',
  // ...
  600: '#3d6352',  // primary button color
  700: '#324f42',  // hover
}
```

Tools: <https://uicolors.app/create> generates Tailwind ramps from one
input color.

### 4. Replace demo images (~10 min)

The demo uses Unsplash URLs for product, hero, and lifestyle imagery.
**Before going live you must replace them** with your own photos or
licensed stock. See `IMAGE-CREDITS.md` for the exact list and workflow.

Quick swap: open `src/data/products.js`, `src/data/banners.js`,
`src/data/categories.js`, `src/data/testimonials.js`, replace the Unsplash
URLs with your own.

### 5. Replace dummy product data (~5 min)

Everything visible on the storefront is driven by `src/data/products.js`,
`src/data/categories.js`, `src/data/banners.js`,
`src/data/testimonials.js`.

Edit those arrays — products, categories, prices, copy — and the store
reflects it. Hot reload is on, so changes appear immediately.

When you have a real backend, replace these dummy datasets with API calls
in `src/services/productService.js`. The components stay the same.

---

## Going live

Read `DEPLOYMENT.md` for the full Vercel + Netlify walkthrough. Short
version:

1. `npm run build` — should finish in ~3s with no errors.
2. Push to GitHub.
3. Vercel.com → **Add New → Project** → import the repo. Vercel auto
   detects Vite. Click **Deploy**.
4. Add your custom domain in Vercel **Settings → Domains** and follow the
   DNS instructions.

The included `vercel.json` / `netlify.toml` handle:

- SPA rewrite (no 404 on refresh of `/produk/anything`)
- Long-term cache for hashed assets
- Security headers (X-Frame, HSTS, Referrer-Policy, etc.)

---

## Connecting a real backend

Today every API call is fake data with a small `delay()` to simulate
latency. To connect a real backend:

1. Set `VITE_API_BASE_URL` in `.env` to your backend URL (and in your
   Vercel / Netlify environment variables).
2. Open `src/services/productService.js`. Replace the function bodies
   with `apiRequest()` calls:

   ```js
   import { apiRequest } from './api';
   export const getAllProducts        = ()   => apiRequest('/products');
   export const getProductBySlug      = (s)  => apiRequest(`/products/${s}`);
   export const getProductsByCategory = (s)  => apiRequest(`/categories/${s}/products`);
   export const searchProducts        = (q)  => apiRequest(`/search?q=${encodeURIComponent(q)}`);
   ```

3. Same pattern for `authService.js`. The included `AuthContext` already
   handles success / error states.

Recommended backend stacks that pair well with this front-end:

- **Laravel** + Sanctum for auth
- **Express/Fastify** + Prisma + JWT
- **Supabase** (Postgres + Auth + Storage, no backend code needed)
- **Firebase** (Firestore + Auth + Storage)
- **Sanity** or **Strapi** for content-managed catalog

---

## Customization map

| Want to change…                | Edit                                          |
| ------------------------------ | --------------------------------------------- |
| Brand name, contact, socials   | `src/config/constants.js` → `BRAND`           |
| Logo wordmark / mark           | `src/components/layout/Logo.jsx`              |
| Favicon                        | `public/favicon.svg`                          |
| Brand colors                   | `tailwind.config.js` → `theme.extend.colors`  |
| Fonts                          | `index.html` (Google Fonts) + `tailwind.config.js` |
| Nav links                      | `src/config/constants.js` → `NAV_LINKS`       |
| Sort options                   | `src/config/constants.js` → `SORT_OPTIONS`    |
| Free-shipping threshold        | `src/config/constants.js` → `FREE_SHIPPING_THRESHOLD` |
| Currency / locale              | `src/config/constants.js` → `CURRENCY`, `LOCALE` |
| Hero banners                   | `src/data/banners.js`                         |
| Categories                     | `src/data/categories.js`                      |
| Products                       | `src/data/products.js`                        |
| Testimonials                   | `src/data/testimonials.js`                    |
| Header / Footer markup         | `src/components/layout/{Navbar,Footer}.jsx`   |
| Toast tone                     | `src/context/ToastContext.jsx`                |

---

## Things to know before going live

These are intentional design choices in the template that you should be
aware of and decide whether to keep, change, or extend.

### Placeholder Footer links

The footer has several utility links (Cara Belanja, Pengiriman & Resi,
Pengembalian, Garansi Pecah, Hubungi Kami, Pengrajin Mitra, Karier) that
currently point to `/kategori` as a safe fallback. They are visual
placeholders — replace each with a real CMS page, a markdown route, or
remove the link in `src/components/layout/Footer.jsx`.

### Pagination size

`src/pages/CategoryPage.jsx` uses `ITEMS_PER_PAGE = 12`. With the bundled
demo catalog of 12 products this means everything fits on one page and
the pagination controls never appear. As soon as you grow the catalog
past 12 items, the prev/next controls show automatically at the bottom
of the grid. Tune the constant to taste (24, 48 are common values).

### Protected routes

`/checkout`, `/profil`, `/pesanan/:id`, and the `/admin/*` tree are all
wrapped in `<ProtectedRoute>` at the router level. Unauthenticated users
hitting these URLs directly are redirected to `/login` and bounced back
after a successful sign-in via the `state.from` mechanism.

To gate additional routes, wrap them the same way in
`src/routes/AppRouter.jsx`. To gate by role, pass `requireAdmin={true}`
(or extend the prop for additional roles).

### Strict Mode

`<React.StrictMode>` is enabled in `src/main.jsx`. In development, this
intentionally double-invokes effects and state initializers to surface
bugs (it has no effect in production builds). If you see a `useEffect`
fire twice during `npm run dev`, that's expected. Disable it only if you
have a specific reason — most modern React code is built to survive it.

### Animation pattern for dynamic lists

The template ships two animation strategies:

- **Static lists** (home sections, footer): `whileInView` with
  `viewport={{ once: true }}` — runs once when the section scrolls into
  view, then never again. Cheap.
- **Dynamic lists** (`ProductGrid`): `<AnimatePresence mode="popLayout">`
  + per-item `initial`/`animate`/`exit`. Required whenever items can be
  filtered, sorted, added, or removed at runtime — otherwise newly
  mounted items can get stuck at `opacity: 0`.

When you add a new filterable / sortable list, copy the
`AnimatePresence` pattern from `ProductGrid.jsx`, not the
`whileInView once: true` pattern from `CategoryShowcase.jsx`.

### Auth role assignment (demo)

`src/services/authService.js` decides admin vs user role purely from the
email: anything containing `admin` becomes an admin. That's clearly a
demo convention — replace with a real role coming from your backend
before launch.

---

## Common questions

**Can I use this for a client project?**
Yes — unlimited End Products for yourself or paying clients. See
`LICENSE.md` section 2.

**Can I host the deployed site anywhere?**
Yes. Vercel, Netlify, Cloudflare Pages, AWS Amplify, S3+CloudFront, your
own server. Anywhere that can serve a static SPA.

**Can I sell my finished store?**
Yes. The license covers the End Product as your property; what we license
is just the underlying template.

**Can I publish my customized template on GitHub publicly?**
No — that would amount to redistribution. Keep your repo private. You may
share read access privately with team members or contractors working on
the same End Product.

**Are updates included?**
Yes — within the 1.x major version, for life of the product on Gumroad.

**Do I get support?**
Best-effort email support for installation and configuration, 180 days
from purchase date. Reply to your Gumroad receipt.

---

## Need help

1. Re-read `README.md` and `DEPLOYMENT.md` — most questions are answered
   there.
2. Reply to your Gumroad purchase receipt with a clear description and
   screenshots / console logs.
3. Include: Node version (`node -v`), package manager (`npm`/`pnpm`/
   `yarn`), platform (Vercel/Netlify), and the exact error message.

Good luck — and ship something beautiful.
