# Changelog

All notable changes to the **RumaRuma Template** will be documented in this
file. The format is based on [Keep a Changelog](https://keepachangelog.com),
and this project adheres to [Semantic Versioning](https://semver.org).

---

## [1.0.1] — 2026-06-02

### Fixed (full-app evaluation pass)

- **Admin → catalog consistency**: `AdminProductForm` category dropdown now
  derives its options from the real catalog categories (`dinnerware`,
  `glassware`, `kitchenware`, `decor`, `storage`, `textile`). Previously it
  offered non-existent slugs (`pecah-belah`, `dekorasi`) so admin-created
  products landed in a phantom category and never appeared in storefront
  filters.
- **New-product crash**: `addProduct` now seeds complete safe defaults
  (specs, stock, sold, brand, etc.) and `ProductInfo` guards `specs`/`stock`,
  so opening the detail page (and its "Spesifikasi" tab) of an
  admin-created product no longer throws.
- **Invalid DOM nesting**: `ProductCard` no longer renders an `<a>` inside
  another `<a>` (image wrapper is now a `<div>`; the detail/quick-add links
  are siblings). Fixes a React `validateDOMNesting` warning and unpredictable
  click behavior.
- **Stale catalog after edits**: `ProductContext` persistence now has a
  `version` + `migrate`, so editing `src/data/products.js` re-seeds returning
  visitors instead of showing a stale localStorage snapshot.
- **ProfilePage**: replaced a render-time `navigate()` call with `<Navigate>`
  (no more state-update-in-render warning).
- **Security**: upgraded Swiper to v12 to clear a critical prototype-pollution
  advisory (GHSA-hmx5-qpq5-p643). Remaining `npm audit` items are
  dev-server-only (esbuild) and do not affect the production build.

### Added

- `.eslintrc.cjs` — `npm run lint` now works (was failing with "no config").
- `@tailwindcss/typography` — proper prose styling on About & Journal pages.
- Empty-state copy on the product specs tab when a product has no specs.
- Graceful image placeholder in `ProductGallery` when a product has no images.

---

## [1.0.0] — 2026-06-02

### Initial public release

#### Pages

- **Home** — hero carousel with mouse parallax, category showcase, featured
  products tabs, promo banners, brand story, testimonials, newsletter.
- **Category page** — `/kategori` and `/kategori/:slug` with filter sidebar
  (brand, price, color, rating, promo), sort dropdown, grid/list layout
  toggle, debounced search, results breadcrumb.
- **Product detail** — gallery with thumbnail rail, price tag, rating &
  sold count, quantity stepper, subtotal preview, add-to-cart / buy-now,
  wishlist toggle, share, tabbed description/specs/shipping,
  recommendations.
- **Cart** — page with free-shipping progress, item editor, summary
  sidebar; and a slide-in `<CartSidebar>` drawer that shares the same
  data via Zustand.
- **Wishlist** — persistent (`localStorage`), bulk add-to-cart, clear.
- **Checkout** — address form, shipping options (regular / same-day /
  pickup), payment options (VA / card / e-wallet), order summary,
  auth-gated submission.
- **Login / Register** — with input validation, password show/hide,
  toast feedback.
- **Profile & Order detail** — view stored orders, order status pills.
- **Inspiration, Journal, Journal detail, About** — content pages styled
  to match the storefront.
- **Admin** (gated by `ProtectedRoute`) — dashboard, product CRUD form,
  product list, order list.
- **404 NotFound** — branded, animated.

#### Components

- Reusable UI: Button, Badge, Input, Drawer, EmptyState, FloatingDecor,
  PriceTag, QuantityStepper, RatingStars, Skeleton.
- Layout: Navbar (sticky, scroll-aware), Footer, MobileMenu drawer,
  ScrollToTop, Logo, SearchBar (debounced realtime).
- Product: ProductCard (grid + list variants with hover overlay), ProductGrid
  (with skeleton + empty state), ProductGallery (with arrows + counter),
  ProductInfo, FilterSidebar, SortDropdown, ProductSkeleton.
- Home: HeroBanner, CategoryShowcase, FeaturedProducts, PromoSection,
  StorySection, TestimonialSection, NewsletterSection.
- Cart: CartItem, CartSidebar.

#### State

- `useCartStore` (Zustand + persist) — items, open/close, totals helper
  with savings, shipping, free-ship progress.
- `useWishlistStore` (Zustand + persist).
- `useOrderStore` — persisted order history.
- `AuthContext` — login, register, logout, status, `isAuthenticated`.
- `ToastContext` — success / error / info / push / dismiss API.

#### Services

- `productService` — list, by-slug, by-id, by-category, search,
  recommendations.
- `authService` — login, register, logout (dummy, ready to swap to backend).
- `api.js` — thin `fetch` wrapper with `ApiError` and `delay()` helpers.

#### Styling

- Tailwind CSS 3.4 with brand tokens: `cream`, `sage`, `teal-accent`,
  `charcoal`.
- Custom shadows (`soft`, `card`, `elevated`, `glow`), float animations,
  shimmer, fade-up, pulse-soft.
- DM Sans + Playfair Display font pair via Google Fonts.

#### Deployment

- `vercel.json`, `netlify.toml`, `public/_redirects`, `public/robots.txt`,
  `.nvmrc` shipped.
- Manual chunk splitting (`react`, `motion`, `swiper`, `icons`) keeps
  largest chunk under 165 KB.
- Security headers and immutable cache for hashed assets.

#### Docs

- `README.md` — developer overview.
- `DEPLOYMENT.md` — step-by-step Vercel + Netlify deployment.
- `BUYER-README.md` — quickstart for template buyers.
- `IMAGE-CREDITS.md` — Unsplash sources + replacement workflow.
- `LICENSE.md` — commercial single-buyer license.

---

## Future roadmap (community signals welcome)

- 1.1 — Internationalization (i18n) scaffolding.
- 1.1 — Dark mode tokens & toggle.
- 1.2 — Stripe / Midtrans / Xendit reference checkout adapters.
- 1.2 — Supabase / Firebase reference auth adapter.
- 1.3 — Static blog/journal CMS integration (Sanity, Contentful).

Tracked roadmap is not a commitment to deliver in any timeframe. Updates
within the 1.x line are included with your purchase.

---

[1.0.0]: https://gumroad.com/your-product-url
