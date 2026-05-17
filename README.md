# RumaRuma — Pecah Belah & Home Living Premium

Website e-commerce production-ready untuk toko pecah belah & perlengkapan rumah
tangga **RumaRuma**. Dibangun dengan **React 18 + Vite + Tailwind CSS**,
state-management modular pakai **Zustand**, animasi premium pakai **Framer
Motion**, dan hero carousel pakai **Swiper.js**.

UI/UX disesuaikan untuk pasar Indonesia dengan nuansa cream / sage / teal yang
clean, elegan, dan setara marketplace interior premium seperti Dekoruma.

---

## Fitur

- Hero carousel premium dengan parallax mouse + animasi reveal Framer Motion
- Floating decorative shapes & ambient gradient di landing page
- Search realtime dengan debounce + dropdown suggestion
- Filter sidebar (brand, harga, warna, rating, promo) + sort dropdown
- Product grid + list layout, hover animation, quick add to cart, wishlist
- Halaman detail produk lengkap (gallery thumbnail, info, spek, tab, subtotal,
  rekomendasi produk)
- Cart sidebar (slide-over) + halaman cart penuh + progress free ongkir
- Wishlist persistent (localStorage)
- Checkout flow dengan alamat, opsi pengiriman & pembayaran
- Login / Register page dengan dummy auth service (siap diganti backend asli)
- Toast notification, loading skeleton, empty state, error handling UI
- 404 page aesthetic
- Mobile-first responsive (Navbar, Mobile menu Drawer, Cart Drawer)
- Layer service terpisah → mudah disambungkan ke backend asli (Laravel, Express,
  Firebase, Supabase, dsb.)

---

## Struktur Folder

```
src/
├── animations/     # Variants Framer Motion (fadeUp, stagger, scaleIn, ...)
├── components/
│   ├── cart/       # CartItem, CartSidebar
│   ├── home/       # HeroBanner, CategoryShowcase, PromoSection,
│   │               # FeaturedProducts, StorySection, TestimonialSection,
│   │               # NewsletterSection
│   ├── layout/     # Navbar, Footer, MobileMenu, Logo, SearchBar, ScrollToTop
│   ├── product/    # ProductCard, ProductGrid, ProductGallery, ProductInfo,
│   │               # FilterSidebar, SortDropdown, ProductSkeleton
│   └── ui/         # Button, Badge, Input, Drawer, EmptyState, FloatingDecor,
│                   # PriceTag, QuantityStepper, RatingStars, Skeleton
├── config/         # constants.js (env, nav links, sort options, dsb.)
├── context/        # AppProviders, AuthContext, ToastContext, CartContext
│                   # (Zustand), WishlistContext (Zustand)
├── data/           # products, categories, banners, testimonials (dummy data)
├── hooks/          # useDebounce, useScrollPosition, useMediaQuery,
│                   # useLockBodyScroll
├── layouts/        # MainLayout (Navbar + Outlet + Footer + ScrollToTop)
├── pages/          # Home, CategoryPage, ProductDetail, CartPage,
│                   # WishlistPage, CheckoutPage, LoginPage, RegisterPage,
│                   # NotFoundPage
├── routes/         # AppRouter (React Router v6)
├── services/       # api.js (fetch wrapper), productService, authService
├── styles/         # globals.css (Tailwind + design tokens)
├── utils/          # classNames, formatCurrency, rating helpers, storage
├── App.jsx
└── main.jsx
```

---

## Cara Menjalankan

> Membutuhkan **Node.js ≥ 18** dan **npm ≥ 9** (atau pnpm / yarn).

```bash
# 1) Install dependencies
npm install

# 2) Copy environment variables
cp .env.example .env     # macOS / Linux
# atau di Windows PowerShell:
Copy-Item .env.example .env

# 3) Jalankan dev server
npm run dev              # akan terbuka di http://localhost:5173

# 4) Build untuk production
npm run build

# 5) Preview hasil build
npm run preview
```

---

## Design Tokens

Tailwind dikonfigurasi dengan token brand di `tailwind.config.js`:

| Token            | Pakai untuk                                           |
| ---------------- | ----------------------------------------------------- |
| `cream-50..300`  | Background, surface lembut                            |
| `sage-50..900`   | Brand color utama (button, accent, highlight)         |
| `teal-accent`    | Aksen sekunder (badge, kategori)                      |
| `charcoal-50..800` | Teks & garis (pengganti gray)                       |
| `shadow-soft / card / elevated / glow` | Shadow brand                  |
| `animate-float / float-slow / shimmer / fade-up` | Animasi ambient     |

Font: **DM Sans** (UI) + **Playfair Display** (heading display).

---

## 🔌 Menyambungkan ke Backend Asli

Semua data dummy ada di `src/data/*`, lalu dibungkus oleh service di
`src/services/`. Untuk menyambungkan ke backend asli:

1. Set `VITE_API_BASE_URL` di `.env` ke endpoint backend kamu.
2. Buka `src/services/productService.js` dan ganti isi fungsi `getAllProducts`,
   `getProductBySlug`, `searchProducts`, dst. menjadi:

   ```js
   import { apiRequest } from './api';
   export const getAllProducts = () => apiRequest('/products');
   ```
3. Lakukan hal serupa untuk `authService.js`.

Komponen UI tidak perlu diubah karena hanya berbicara melalui service.

---

## State Management

- `useCartStore` (Zustand + persist) — items, open/close, addItem,
  updateQuantity, removeItem, clear. `useCartTotals()` mengembalikan subtotal,
  shipping, savings, total, dan sisa untuk free ongkir.
- `useWishlistStore` (Zustand + persist) — toggle / has / clear.
- `AuthContext` (Context API) — login, register, logout, status.
- `ToastContext` — `useToast().success / error / info / push / dismiss`.

---

## Halaman

| Path                  | Komponen          |
| --------------------- | ----------------- |
| `/`                   | `Home`            |
| `/kategori`           | `CategoryPage`    |
| `/kategori/:slug`     | `CategoryPage`    |
| `/produk/:slug`       | `ProductDetail`   |
| `/keranjang`          | `CartPage`        |
| `/wishlist`           | `WishlistPage`    |
| `/checkout`           | `CheckoutPage`    |
| `/login`              | `LoginPage`       |
| `/register`           | `RegisterPage`    |
| `*`                   | `NotFoundPage`    |

Setiap kategori (`dinnerware`, `glassware`, `kitchenware`, `decor`, `storage`,
`textile`) otomatis memfilter produk dari `src/data/products.js`.

---

## Catatan Production

- Semua import memakai alias `@/...` (resolved ke `src/*` di `vite.config.js`).
- Gambar produk menggunakan Unsplash CDN agar siap pakai. Ganti dengan asset
  produk asli di production.
- Auth dummy menyimpan token mock ke `localStorage`. Wajib diganti dengan auth
  backend yang sebenarnya sebelum live.

Selamat berkarya 
