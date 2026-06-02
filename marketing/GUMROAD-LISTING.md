# Gumroad Listing — Copy & Paste Kit

Semua copywriting siap-tempel untuk membuat listing di Gumroad. Tinggal
copy bagian yang relevan ke field Gumroad. Edit harga, link demo, dan
brand sesuai kebutuhan kamu.

---

## 1. Product Title (max ~80 char)

> **RumaRuma — Premium Home Living E-Commerce Template (React + Vite + Tailwind)**

Alternatif yang lebih singkat:

- RumaRuma — React E-Commerce Template
- RumaRuma — Premium Storefront Starter (React + Vite)

---

## 2. Short Description (max 280 char, shown in product cards)

> Premium, production-ready React + Vite + Tailwind storefront template
> built for real e-commerce stores. Hero parallax, animated catalog,
> filter sidebar, cart drawer, checkout flow, admin panel, and a
> deployment-ready Vercel/Netlify setup. Ship a Dekoruma-class store in
> a weekend.

---

## 3. Long Description (full product page)

```markdown
## RumaRuma — Premium Home Living E-Commerce Template

A production-ready React + Vite + Tailwind CSS storefront, built for
real e-commerce businesses — not a portfolio project. Designed at the
quality bar of Dekoruma, West Elm, and other premium interior
marketplaces, with thoughtful animation, responsive layouts, and a
deployment setup that just works.

**Live demo →** https://rumaruma-demo.vercel.app  *(replace with your demo URL)*

---

### Why this template

- **Production-ready, not a portfolio demo.** Every page, state flow,
  and edge case is wired up. Empty states, loading skeletons, toast
  notifications, error handling, and 404 are all covered.
- **Looks premium, runs fast.** Manual chunk splitting keeps the
  largest JS bundle under 165 KB gzipped (~54 KB react vendor). Total
  gzipped payload ~172 KB.
- **Modular, scalable architecture.** Clean separation of pages,
  components, hooks, context, services, and data. Drop in a real
  backend by editing one service file — no UI refactor needed.
- **Deploy in 2 minutes.** Vercel and Netlify configs included with SPA
  rewrites (no 404 on refresh), security headers, and immutable cache
  policy.

---

### What's inside

#### 18 pre-built pages

Home, Category, Product Detail, Cart Page, Cart Drawer, Wishlist,
Checkout, Login, Register, Profile, Order Detail, Inspiration, Journal,
Journal Detail, About, 404, plus a 5-page Admin panel (Dashboard,
Products list, Product form, Orders list, gated by `ProtectedRoute`).

#### 50+ reusable components

Including Navbar, Footer, MobileMenu Drawer, Logo, SearchBar, ProductCard
(grid + list), ProductGrid, ProductGallery, ProductInfo, FilterSidebar,
SortDropdown, CartItem, CartSidebar, Button, Badge, Input, Drawer,
EmptyState, FloatingDecor, PriceTag, QuantityStepper, RatingStars,
Skeleton, HeroBanner, CategoryShowcase, FeaturedProducts, PromoSection,
StorySection, TestimonialSection, NewsletterSection.

#### Real e-commerce flows

- Add to cart with toast + sidebar slide-in
- Free-shipping progress bar (auto-updates as cart grows)
- Wishlist persistent across reloads (localStorage)
- Realtime search with debounce + dropdown suggestion
- Filter sidebar: brand, price range, color, rating, promo-only toggle
- Sort dropdown: relevance / newest / price / rating / bestseller
- Checkout: address, shipping option, payment option, order summary,
  auth-gated submit, persisted order history

#### State management

Zustand + persist for cart, wishlist, and orders. Context API for auth
and toast. All state lives in `src/context/` and is easy to swap.

#### Service layer

Mock data today, real backend tomorrow. Open `src/services/productService.js`,
replace `delay()` + array filter with `apiRequest('/products')`, and your
UI keeps working unchanged. Ready for Laravel, Express, Supabase, Firebase,
Strapi, Sanity, or any other backend.

#### Animation system

Framer Motion for: hero text reveal, mouse-driven parallax, scroll
fade-up with stagger, hover lift, floating decorative shapes, ambient
gradient motion, card transitions, drawer transitions. Tasteful and
performant — no jank on mobile.

#### Design system

Custom Tailwind palette (cream / sage / teal / charcoal), three custom
shadow tiers (soft / card / elevated / glow), four custom animations
(float / shimmer / fade-up / pulse-soft), DM Sans + Playfair Display
font pair via Google Fonts.

---

### Tech stack

- **React 18** + JSX
- **Vite 5** for dev + build
- **Tailwind CSS 3.4**
- **React Router v6**
- **Zustand** (with persist middleware)
- **Framer Motion** (animation)
- **Swiper.js 11** (carousel)
- **Lucide React** (icons)
- **DM Sans** + **Playfair Display** (Google Fonts)

No paid dependencies. No backend lock-in.

---

### Deployment

Includes ready-to-go configs for:

- **Vercel** — `vercel.json` with SPA rewrite, security headers, cache
- **Netlify** — `netlify.toml` + `public/_redirects`
- **Anywhere static** — `npm run build`, upload `dist/`

Push to GitHub, import to Vercel, click Deploy. Custom domain + SSL in
< 5 minutes.

---

### What you get

- ✦ Full source code (uncompiled, commented, modular)
- ✦ Production build config (Vite + Tailwind + PostCSS)
- ✦ Deployment configs (Vercel + Netlify)
- ✦ Comprehensive documentation:
  - `BUYER-README.md` — 30-minute quickstart
  - `README.md` — developer reference
  - `DEPLOYMENT.md` — step-by-step deployment
  - `IMAGE-CREDITS.md` — image attribution + replacement guide
  - `CHANGELOG.md` — version history
  - `LICENSE.md` — commercial license
- ✦ Free lifetime updates within v1.x
- ✦ 180 days of best-effort email support

---

### Requirements

- Node.js ≥ 18.18 (Node 20 LTS recommended) — `.nvmrc` included
- Basic familiarity with React and the terminal
- Optional: GitHub account, Vercel/Netlify account for deployment

---

### License (summary, see LICENSE.md for full text)

✓ Use in **unlimited** End Products (your own or paying clients)
✓ Modify any file, change any color, swap any image
✓ Deploy anywhere
✗ Don't resell the template itself
✗ Don't bundle it inside a competing template product
✗ Don't publish the template publicly on GitHub

---

### FAQ

**Is there a live demo?**
Yes — link at the top of this page.

**Do I need a backend?**
No, not to start. The template ships with realistic mock data so you can
launch a static storefront immediately. When you're ready, the service
layer is designed to plug into any REST API.

**Can I use this for a client project?**
Absolutely. Unlimited End Products, including paying-client work.

**Will it work with my preferred payment gateway?**
The checkout UI is plug-and-play — connect Midtrans, Xendit, Stripe,
PayPal, or any custom processor by wiring the submit handler in
`src/pages/CheckoutPage.jsx`.

**Does it support mobile?**
Yes — mobile-first responsive throughout, with a dedicated mobile menu
drawer and filter drawer.

**What about SEO?**
Built-in `<SEO>` component using react-helmet-async, plus a properly
configured `robots.txt`. For deeper SEO (server-rendered meta tags), you
can migrate to Next.js or Remix without redoing the UI work.

**Do I get future updates?**
Yes — all updates within v1.x are included for life.

**What if I'm stuck?**
Reply to your Gumroad receipt with a clear description, screenshots, and
console logs. Best-effort email support for 180 days from purchase.

**Can I get a refund?**
Per Gumroad's refund policy, available within 14 days of purchase if the
template doesn't work for you.

---

### Tags

`react` `vite` `tailwindcss` `ecommerce` `template` `framer-motion`
`zustand` `swiper` `responsive` `production-ready` `indonesia`
`home-living` `tableware` `dekoruma` `interior` `kitchenware`

```

---

## 4. Pricing strategy

Reference pricing dari marketplace template e-commerce React (2026):

| Tier            | Range        | Yang termasuk                                       |
| --------------- | ------------ | --------------------------------------------------- |
| Entry           | $19 – $29    | Single landing page, basic styling                  |
| Standard        | $39 – $59    | Multi-page storefront, basic flows                  |
| **Premium**     | **$59 – $99** | **Full e-commerce + admin + deployment kit** ← kamu di sini |
| Professional    | $99 – $149   | + backend boilerplate, payment integration ready    |
| Enterprise      | $149+        | Full SaaS, multi-tenant, white-label                |

**Saran harga awal:**

- Launch week (minggu pertama setelah listing): **$39** dengan kupon
  `LAUNCH40` (50% off) → "buy now $39, will be $79 next week"
- Setelah launch week: **$69 – $79**
- Black Friday / event besar: $49 dengan banner countdown

**Pay-what-you-want minimum:** set di Gumroad jadi $39, suggested $69 —
biarkan early adopter bisa "tip" lebih.

---

## 5. Gumroad product setup checklist

Saat upload ke Gumroad, isi field berikut:

- [ ] **Name**: dari section 1 di atas
- [ ] **URL slug**: `rumaruma-template` atau `rumaruma`
- [ ] **Price**: $39 (launch) → $69 (reguler)
- [ ] **Cover image**: 1280×720 px JPG (lihat `marketing/cover/`)
- [ ] **Description**: paste markdown dari section 3
- [ ] **Thumbnail**: kotak 600×600 px versi cover
- [ ] **Preview gallery**: 5–8 screenshot dari `marketing/screenshots/`
- [ ] **Preview video**: 30–60 detik Loom / Screen Studio
- [ ] **Demo link**: dimasukkan sebagai field tambahan + di description
- [ ] **Tags**: lihat section 3 paling bawah
- [ ] **Refund policy**: aktifkan 14-day money-back
- [ ] **File upload**: `RumaRuma-Template-v1.0.0.zip`
- [ ] **License key generation**: aktif (Gumroad fitur built-in)
- [ ] **Email after purchase**: copy template dari section 6

---

## 6. Email after purchase (Gumroad auto-send)

Aktifkan di **Workflow → After purchase email**:

```
Subject: ✦ Welcome to RumaRuma — your template is ready

Hi {{customer.name}},

Thank you for purchasing RumaRuma! You can download the template ZIP
from your Gumroad library at any time.

### Quick start

1. Unzip the file
2. Open `BUYER-README.md` — that's your 30-minute setup guide
3. Run: npm install && cp .env.example .env && npm run dev
4. The storefront opens at http://localhost:5173

### What's in the ZIP

- Full source code (React + Vite + Tailwind)
- Deployment configs for Vercel and Netlify
- 6 documentation files including DEPLOYMENT.md
- LICENSE.md (commercial single-buyer license)

### Live demo

https://rumaruma-demo.vercel.app   ← replace before publishing

### Need help?

Just reply to this email. I provide best-effort support for 180 days
from purchase for installation and configuration questions. Please
include:

- Node.js version (run: node -v)
- Operating system
- The exact error message or screenshot

### Stay updated

You'll get all v1.x updates for free in your Gumroad library. Major
version updates (v2.0+) may be a paid upgrade — current customers
typically get a generous discount.

Cheers — and ship something beautiful.
```

---

## 7. Launch announcement copy (for Twitter / LinkedIn / IG)

### Twitter / X

```
Just shipped: RumaRuma 🌿

A premium React + Vite + Tailwind e-commerce template, production-
ready, with admin panel, animated hero, smart filters, persistent
cart/wishlist, and one-click Vercel deploy.

Live demo + 50% launch discount inside:
[your-gumroad-link]
```

### LinkedIn

```
After [X weeks/months] building, I'm launching RumaRuma — a premium
React + Vite + Tailwind e-commerce template designed for real
businesses, not portfolio demos.

What's included:
✓ 18 pre-built pages
✓ Full e-commerce flows (cart, checkout, wishlist, search, filter)
✓ Admin panel with ProtectedRoute
✓ Framer Motion animations
✓ Vercel + Netlify configs
✓ Modular service layer ready for any backend
✓ Full commercial license

Live demo: [link]
Get it on Gumroad: [link]

Launch week pricing: $39 (regular $69). Limited to first 50 buyers.
```

### Instagram caption (with carousel of screenshots)

```
🌿 RumaRuma is live.

A premium React e-commerce template that ships in a weekend. Built for
real home-living and lifestyle stores, with the polish of Dekoruma and
the speed of Vite.

✦ 18 pages
✦ Animated everything
✦ Cart + wishlist + checkout flows
✦ Admin panel included
✦ Deploy to Vercel in 2 minutes

Link in bio. Launch week: 50% off (first 50 buyers).

#reactjs #vitejs #tailwindcss #ecommerce #template #webdesign
#homeliving #indiehacker #buildinpublic
```

---

## 8. Update emails (Gumroad lets you DM all buyers)

Template buat saat rilis update minor (1.0.1, 1.1.0, dst):

```
Subject: ✦ RumaRuma v1.1 — [headline feature]

Hi everyone,

I just pushed v1.1 of RumaRuma to your Gumroad library. Highlights:

- [Feature 1 — 1 line]
- [Feature 2 — 1 line]
- [Bug fix or polish]

Download the new ZIP from your Gumroad library. Existing customers
get this update free.

Full changelog: see CHANGELOG.md inside the ZIP.

As always, reply with any questions.
```
