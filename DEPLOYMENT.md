# Deployment Guide — RumaRuma

Panduan deployment production-ready untuk **RumaRuma** (React + Vite + Tailwind
+ React Router) ke hosting modern. Setelah selesai, website akan online,
mobile-responsive, dengan SPA routing yang tidak 404 saat user refresh halaman.

> **Rekomendasi platform: Vercel.** Auto-detect Vite, gratis untuk hobby,
> edge network global, deploy preview untuk setiap PR.
> **Alternatif: Netlify.** Sama-sama excellent, banyak orang sudah familiar.
> Kedua-duanya sudah dikonfigurasi via `vercel.json` dan `netlify.toml` di root.

---

## 0. File deployment yang sudah disiapkan

| File                  | Untuk apa                                                |
| --------------------- | -------------------------------------------------------- |
| `vercel.json`         | Konfigurasi build, SPA rewrite, cache & security headers |
| `netlify.toml`        | Sama, untuk Netlify                                      |
| `public/_redirects`   | SPA fallback tambahan untuk Netlify                      |
| `public/robots.txt`   | SEO — boleh crawl halaman publik, blokir page private    |
| `.nvmrc`              | Pin Node.js 20 agar build konsisten                      |
| `package.json` engines | Minimum Node 18.18                                      |
| `.env.example`        | Template environment variables                           |

---

## 1. Pre-deployment checklist (5 menit)

```bash
# 1) Pastikan Node 18.18+ (lebih baik Node 20 LTS)
node -v

# 2) Install dependency bersih
rm -rf node_modules package-lock.json
npm install

# 3) Tes production build di lokal — wajib lulus sebelum deploy
npm run build

# 4) Preview hasil build (akan jalan di http://localhost:4173)
npm run preview
```

**Wajib dicek di `npm run preview`:**

- [ ] Halaman beranda muncul, hero carousel jalan, animasi smooth
- [ ] Klik produk → masuk ke `/produk/<slug>` → **refresh** — tidak 404
- [ ] Klik kategori → `/kategori/<slug>` → **refresh** — tidak 404
- [ ] Tambah ke cart → sidebar muncul → refresh halaman → cart masih ada (persisted)
- [ ] Wishlist toggle → refresh → tetap tersimpan
- [ ] Search bar berfungsi, dropdown suggestion muncul
- [ ] Mobile view (Chrome DevTools → Responsive) — Navbar + Drawer normal

Kalau semua OK, lanjut ke step berikutnya.

---

## 2. Push ke GitHub

> Skip step ini kalau project sudah ada di GitHub.

```bash
# Dari folder project
git init
git add .
git commit -m "chore: initial commit — RumaRuma e-commerce"

# Buat repo baru di github.com (private atau public), copy URL-nya
git branch -M main
git remote add origin https://github.com/<username>/your-shop.git
git push -u origin main
```

**Wajib pastikan `.env` ada di `.gitignore`** (sudah default di project ini).
Jangan pernah push file `.env` yang berisi secret ke GitHub.

---

## 3A. Deploy ke Vercel (rekomendasi)

### Lewat dashboard (cara termudah)

1. Buka <https://vercel.com> → login (Continue with GitHub).
2. **Add New → Project** → pilih repo `your-shop` yang barusan di-push.
3. Vercel auto-detect Vite. Biarkan settings default:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`
4. **Environment Variables** → tambahkan satu per satu sesuai
   `.env.example`:

   | Name                   | Value (contoh)                       | Environments       |
   | ---------------------- | ------------------------------------ | ------------------ |
   | `VITE_APP_NAME`        | `RumaRuma`                           | Production, Preview, Development |
   | `VITE_API_BASE_URL`    | `https://api.yourbrand.com/v1`         | Production         |
   | `VITE_API_BASE_URL`    | `https://staging-api.yourbrand.com/v1` | Preview            |
   | `VITE_DEFAULT_LOCATION`| `Jakarta Selatan`                    | All                |
   | `VITE_CURRENCY`        | `IDR`                                | All                |
   | `VITE_LOCALE`          | `id-ID`                              | All                |

   > Semua env var Vite **wajib** diawali `VITE_` agar terbaca di browser.
5. Klik **Deploy**. Tunggu ~1-2 menit.
6. Selesai — website online di `https://your-shop-<hash>.vercel.app`.

### Lewat Vercel CLI (opsional, advanced)

```bash
npm i -g vercel
vercel login
vercel              # deploy ke preview URL
vercel --prod       # deploy ke production
```

### Custom domain

1. Di dashboard Vercel → project → **Settings → Domains**.
2. Tambahkan `yourbrand.com` (dan `www.yourbrand.com`).
3. Ikuti instruksi DNS:
   - Apex (`yourbrand.com`): A record → `76.76.21.21`
   - WWW: CNAME → `cname.vercel-dns.com`
4. Setelah DNS propagate (5 menit – 1 jam), Vercel auto-issue SSL Let's Encrypt.

---

## 3B. Deploy ke Netlify (alternatif)

### Lewat dashboard

1. Buka <https://app.netlify.com> → login dengan GitHub.
2. **Add new site → Import an existing project → GitHub**.
3. Pilih repo `your-shop`. Settings akan terbaca dari `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Site settings → Environment variables** → tambahkan variabel sama seperti
   tabel di section Vercel.
5. **Deploy site**. Tunggu ~2 menit.
6. Selesai — website online di `https://<random>.netlify.app`.

### Lewat Netlify CLI (opsional)

```bash
npm i -g netlify-cli
netlify login
netlify init        # link folder ke site Netlify
netlify deploy --prod
```

### Custom domain di Netlify

1. **Domain management → Add custom domain** → masukkan `yourbrand.com`.
2. Ikuti panduan DNS (Netlify DNS atau external DNS).
3. SSL auto-aktif via Let's Encrypt.

---

## 4. Verifikasi setelah deploy

Buka URL production dan cek hal-hal berikut:

| Test                                              | Hasil yang benar              |
| ------------------------------------------------- | ----------------------------- |
| Akses langsung `/produk/piring-keramik-sage-set-4`| Halaman detail muncul, bukan 404 |
| Refresh halaman dalam kondisi di `/kategori/decor`| Halaman tetap sama, bukan 404 |
| Buka `/halaman-yang-tidak-ada`                    | Muncul 404 page custom RumaRuma |
| Mobile view (smartphone asli)                     | Layout responsive, Drawer jalan |
| Tab Network → load `assets/index-xxx.js`          | Status 200, Cache-Control `immutable` |
| Tab Security headers (lighthouse / securityheaders.com) | Skor minimal A         |
| Add to cart → reload                              | Cart tetap ada (localStorage) |
| DevTools Console                                  | Tidak ada error merah          |

Lighthouse audit (DevTools → Lighthouse → Analyze) — target awal:

- Performance: ≥ 85
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

---

## 5. Continuous deployment (otomatis)

Setelah connect ke Vercel/Netlify, **setiap `git push` ke `main` akan auto-build
dan deploy ke production**. Setiap push ke branch lain akan jadi **preview
deploy** dengan URL terpisah — sempurna untuk QA sebelum merge.

Workflow disarankan:

```bash
git checkout -b feature/banner-update
# ... edit code ...
git commit -am "feat: update hero banner"
git push origin feature/banner-update
# → otomatis dapat preview URL di komentar PR GitHub

# Setelah review OK:
git checkout main
git merge feature/banner-update
git push                # → auto deploy production
```

---

## 6. Optimasi production (opsional tapi recommended)

### 6.1 Manual chunking untuk bundle yang lebih kecil

Tambahkan ke `vite.config.js`:

```js
build: {
  target: 'es2020',
  sourcemap: false,
  cssCodeSplit: true,
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom', 'react-router-dom'],
        motion: ['framer-motion'],
        swiper: ['swiper', 'swiper/react'],
        icons: ['lucide-react'],
      },
    },
  },
},
```

Hasil: bundle utama lebih kecil, route lain lebih cepat load.

### 6.2 Image optimization

Foto produk saat ini pakai Unsplash CDN. Untuk production scale:

- Pakai **Cloudinary** atau **imgproxy** untuk resize on-the-fly
- Atau host di **Supabase Storage** / **S3 + CloudFront**
- Tambahkan `loading="lazy"` (sudah ada di ProductCard, ProductGallery, dst.)

### 6.3 Analytics (opsional)

- **Vercel Analytics**: enable di dashboard project Vercel (1 klik, free tier)
- **Plausible / Umami**: privacy-friendly, GDPR-compliant
- Hindari Google Analytics untuk pasar EU/UK kalau belum ada cookie consent

### 6.4 Monitoring error

- **Sentry**: track JS error production
- Vercel/Netlify **Function logs**: real-time tail dari build & runtime

---

## 7. Environment variable per branch

Untuk staging vs production yang beda backend:

| Variable            | Production              | Preview / Staging              |
| ------------------- | ----------------------- | ------------------------------ |
| `VITE_API_BASE_URL` | `https://api.yourbrand.com/v1` | `https://staging-api.yourbrand.com/v1` |

Set di:

- **Vercel**: Settings → Environment Variables → pilih environment (Production
  / Preview / Development) saat menambahkan.
- **Netlify**: Site settings → Build & deploy → Environment → scope per
  context (production, deploy-preview, branch-deploy).

---

## 8. Troubleshooting

### "404 Not Found" saat refresh /produk/xxx

Penyebab: SPA fallback tidak aktif.

- **Vercel**: pastikan `vercel.json` ter-commit ke repo dan ada di root.
- **Netlify**: pastikan `netlify.toml` atau `public/_redirects` ter-commit.

Test cepat: `curl -I https://yoursite.com/produk/anything` → harus 200, bukan
404.

### Build gagal "Cannot find module '@/...'"

Vite alias tidak terbaca di environment build. Cek:

- `vite.config.js` sudah ada alias `'@': path.resolve(__dirname, './src')`
- `jsconfig.json` punya `paths` yang sama
- Push ulang setelah perubahan

### Build gagal "out of memory"

Edit build command di Vercel/Netlify:

```
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

Atau set di env vars: `NODE_OPTIONS=--max_old_space_size=4096`.

### Animasi tidak jalan / lag di mobile

- Cek prefers-reduced-motion di OS user (animasi memang sengaja dikurangi)
- Pastikan device tidak save-data mode
- Periksa di tab Performance DevTools

### Env var tidak terbaca

- **Wajib** awalan `VITE_` (contoh: `VITE_API_URL`, bukan `API_URL`)
- Setelah ubah env, **wajib trigger ulang deploy** — env var dibaca saat build
- Lokal: restart `npm run dev` setelah edit `.env`

### Halaman blank putih setelah deploy

Buka DevTools Console:

- Kalau error `Failed to fetch module`: clear browser cache + hard reload
- Kalau error `Unexpected token <`: build folder kosong / output dir salah —
  cek build log

---

## 9. Production-ready checklist sebelum live

- [ ] `.env` lokal tidak ter-commit (cek `git status` + `.gitignore`)
- [ ] `VITE_API_BASE_URL` production sudah diisi di Vercel/Netlify
- [ ] Custom domain attached + SSL aktif (cek `https://` di address bar)
- [ ] `robots.txt` di-update dengan domain final (`Sitemap:` line)
- [ ] Auth service `src/services/authService.js` sudah diganti ke backend asli
      (sekarang masih dummy — jangan live tanpa ini!)
- [ ] Product service `src/services/productService.js` sudah switch ke API asli
- [ ] Test transaksi end-to-end di production URL
- [ ] Lighthouse score ≥ 85 di semua kategori
- [ ] Mobile real device test (iOS Safari + Android Chrome)
- [ ] Analytics terpasang
- [ ] Error monitoring (Sentry) terpasang
- [ ] Backup plan: branch `main` di-protect, deploy preview untuk QA

---

## 10. Update / rollback cepat

**Update**: cukup `git push` ke `main` — auto deploy.

**Rollback** kalau ada bug di production:

- **Vercel**: Dashboard → Deployments → pilih deployment lama yang bagus →
  `Promote to Production`. < 30 detik.
- **Netlify**: Deploys → pilih deploy lama → `Publish deploy`. < 30 detik.

Atau revert commit di Git lalu push:

```bash
git revert <bad-commit-sha>
git push
```

---

Sudah siap go-live ✦. Kalau ada kendala spesifik (build error, domain, atau
backend integration), tulis lognya supaya bisa di-debug.
