# Review Menyeluruh — RumaRuma

Hasil audit lengkap project per **2026-06-02**. Total file di-scan: **86**.

Build status: **✓ Sukses** (3.7s, 0 error, 0 warning). Bundle gzipped: ~172 KB.
Data integrity: **✓ Bersih** (slug unik, kategori valid, hotspot resolve, gambar
ada). Import resolve: **✓ 76/76**.

Temuan dibagi 3 tier: **🔴 wajib fix sebelum Gumroad live**, **🟡 sebaiknya
fix**, **🟢 nice-to-have**.

---

## 🔴 Wajib fix

### 1. ProductInfo.jsx: `window.location.assign` bikin full page reload

**File**: `src/components/product/ProductInfo.jsx:50`
**Symptom**: Klik **"Beli Sekarang"** di halaman produk → browser hard reload
ke `/checkout` (kelihatan dari flash putih). Bukan SPA navigation.
**Konsekuensi**: Kehilangan in-memory state, animasi terinterupsi, terasa
seperti aplikasi lama. Buyer template akan langsung notice.

```js
// BUG
const handleBuyNow = () => {
  addItem(product, qty);
  toast.success('Lanjut ke checkout', product.name);
  window.location.assign('/checkout');   // ← hard reload
};
```

**Fix**: pakai `useNavigate` + cek auth seperti tombol checkout lain.

```js
const navigate = useNavigate();
const { isAuthenticated } = useAuth();

const handleBuyNow = () => {
  addItem(product, qty);
  toast.success('Lanjut ke checkout', product.name);
  if (!isAuthenticated) navigate('/login', { state: { from: '/checkout' } });
  else navigate('/checkout');
};
```

### 2. AuthContext: `useEffect` di-import tapi tidak dipakai

**File**: `src/context/AuthContext.jsx:1`
**Symptom**: ESLint warning di production lint, dan menandakan kode mungkin
sudah di-refactor tapi import tidak ikut bersih.
**Status auth restore**: aman — sudah di-handle via lazy initial state
useState. Hanya import cleanup.

```js
// Sebelum
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Sesudah
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
```

Bonus optimasi: panggil `storage.get(STORAGE_KEYS.auth)` 1× saja, bukan 3×:

```js
const stored = storage.get(STORAGE_KEYS.auth);
const [user, setUser]     = useState(stored?.user || null);
const [token, setToken]   = useState(stored?.token || null);
const [status, setStatus] = useState(stored?.token ? 'authenticated' : 'idle');
```

### 3. ProductCard: tombol quick-add tanpa `aria-label`

**File**: `src/components/product/ProductCard.jsx:128`
**Symptom**: Tombol hover quick-add hanya berisi icon `<ShoppingBag>`,
screen reader cuma baca "button". Gagal WCAG AA.

```jsx
// Tambah aria-label
<button
  type="button"
  onClick={handleAdd}
  aria-label={`Tambah ${product.name} ke keranjang`}
  className="flex-1 rounded-full bg-sage-600 ..."
>
```

---

## 🟡 Sebaiknya fix

### 4. Footer: 8 link "placeholder" semua mengarah ke `/kategori`

**File**: `src/components/layout/Footer.jsx:14–38`
**Symptom**: "Cara Belanja", "Pengiriman & Resi", "Pengembalian", "Garansi
Pecah", "Hubungi Kami", "Pengrajin Mitra", "Karier" — semua jatuh ke
`/kategori`. Buyer ekspektasinya halaman terpisah (CMS / static page).

**Opsi fix**:
- **Cepat**: dokumentasikan di BUYER-README bahwa link ini placeholder
  sengaja, buyer harus replace.
- **Lebih bersih**: buat halaman `/bantuan` `/kontak` `/karir` placeholder
  yang isi "Coming soon" — supaya buyer langsung tahu mana yang perlu di-isi.

### 5. Inkonsistensi `from` di redirect login

**Files**:
- `src/routes/ProtectedRoute.jsx:18` → `state: { from: location }` (object)
- `src/pages/CartPage.jsx:129`, `CheckoutPage.jsx:100`, `CartSidebar.jsx:66`
  → `state: { from: '/checkout' }` (string)

**Symptom**: Kerja, tapi inkonsisten. React Router bisa terima keduanya jadi
tidak ada bug runtime, tapi maintainability jelek.

**Fix**: standardisasi ke string. Update ProtectedRoute:

```js
navigate('/login', { state: { from: location.pathname + location.search }, replace: true });
```

### 6. Phone input di CheckoutPage tidak punya `type="tel"`

**File**: `src/pages/CheckoutPage.jsx:151`
**Symptom**: Punya `inputMode="tel"` (keyboard mobile benar) tapi tidak
`type="tel"` (parsing/autofill suboptimal di Safari iOS).

```jsx
<Input
  label="Nomor HP"
  name="phone"
  type="tel"            // ← tambah
  inputMode="tel"
  pattern="[0-9+\s()-]{8,}"  // ← opsional, validasi format
  value={form.phone}
  onChange={handle('phone')}
  required
/>
```

### 7. File `src/hooks/useMediaQuery.js` tidak pernah di-import

**File**: `src/hooks/useMediaQuery.js`
**Symptom**: Dead code. Memang utility yang berguna, tapi sekarang nggak
ada yang pakai.

**Opsi fix**:
- Hapus file → bundle lebih kecil sedikit.
- Atau pakai di tempat yang relevan (misal toggle hover tooltip di
  InspirationPage hanya di desktop).

### 8. Login: `location.state?.from` tidak guard terhadap object

**File**: `src/pages/LoginPage.jsx:29`
```js
navigate(location.state?.from || '/');
```
Kalau `from` berisi location object (dari ProtectedRoute), `navigate(obj)`
masih jalan karena Location ⊂ To. Tapi kalau `from` berisi nilai tak
terduga (mis. user manipulasi history.state), bisa crash.

**Fix defensif**:
```js
const from = location.state?.from;
const dest = typeof from === 'string' ? from : from?.pathname || '/';
navigate(dest);
```

---

## 🟢 Nice-to-have

### 9. `key={i}` di list yang bisa berubah urutan
- `src/components/product/ProductReviews.jsx:148,163`
- `src/pages/OrderDetail.jsx:127,196`
- `src/pages/ProfilePage.jsx:154`

**Symptom**: kalau item di-add/remove/reorder, React reconciliation pakai
posisi (jelek untuk animasi & state). Untuk list statis sekarang aman, tapi
saat backend asli pakai paginasi/sort dinamis akan bermasalah.

**Fix**: pakai `key={review.id}` / `key={step.id}` dst.

### 10. AppRouter: route `/checkout` belum tergated di router level

**File**: `src/routes/AppRouter.jsx:41`
**Symptom**: Halaman `/checkout` sekarang di-gate di **komponen** (`if
(!isAuthenticated) navigate('/login')` di dalam submit handler). Lebih
aman kalau di-wrap dengan `<ProtectedRoute>` di router level supaya bahkan
URL langsung pun di-redirect sebelum render.

**Fix**:
```jsx
<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  }
/>
```

Sama untuk `/profil` dan `/pesanan/:id`.

### 11. `<React.StrictMode>` aktif → animasi useEffect kadang trigger 2×

**File**: `src/main.jsx`
**Symptom**: Setiap effect berjalan 2× di development (intentional di
StrictMode). Kalau ada side-effect yang sengaja tergantung pada single
firing, bisa double. Saya cek — sekarang tidak ada bug terkait, tapi
worth knowing untuk buyer.

**Aksi**: tidak perlu diubah. Strictly informational untuk buyer di
`BUYER-README`.

### 12. Banyak `whileInView once:true` di Home sections

**Files**: `NewsletterSection`, `StorySection`, `PromoSection`,
`CategoryShowcase`.
**Symptom**: Sekarang aman karena konten static. Tapi kalau buyer menambah
filter atau dynamic content di home, bug yang sama dengan ProductGrid
sebelumnya bisa muncul.

**Aksi**: dokumentasi di BUYER-README — pattern yang dipakai dan kapan
harus pindah ke `AnimatePresence`.

### 13. AdminProductForm: `useEffect([])` tapi tergantung `id`

**File**: `src/pages/admin/AdminProductForm.jsx` (mengisi form saat edit)
**Symptom**: Belum saya lihat detail. Worth re-check kalau `useEffect`
loading initial form data tidak punya `id` di dependency array.

### 14. Pagination muncul terlalu agresif

**File**: `src/pages/CategoryPage.jsx`
`ITEMS_PER_PAGE = 12`. Total produk juga 12. Jadi tombol "Selanjutnya"
tidak pernah muncul — fine. Tapi kalau buyer expand produk jadi 13+,
mereka harus tahu pagination sudah ada.

**Aksi**: di `BUYER-README.md` jelaskan `ITEMS_PER_PAGE` constant dan
lokasinya.

---

## Audit yang sudah passed ✓

- ✓ Build (3.7s, 0 warning, 0 error)
- ✓ Semua import `@/...` resolve (76 / 76)
- ✓ Semua route Link/NavLink valid (15/15 destinations)
- ✓ Data integrity (slug unik, category valid, hotspot resolve)
- ✓ Local image files semua ada di disk
- ✓ Form validation (Login, Register, Checkout — semua required + custom check)
- ✓ Mobile menu drawer + Admin sidebar overlay
- ✓ Tables admin sudah wrap di `overflow-x-auto`
- ✓ Status tracker OrderDetail horizontal scroll mobile-friendly
- ✓ Cart/Wishlist/Auth persistence via Zustand+persist & localStorage
- ✓ No `console.log` / TODO / FIXME leftover
- ✓ No `setState` inside `useMemo` (sudah di-fix CategoryPage)
- ✓ ProductGrid filter animation bug (sudah di-fix dengan AnimatePresence)
- ✓ Hotspot mobile UX di Inspiration (sudah di-fix)
- ✓ Personal contact info di-centralize ke `BRAND` config
- ✓ ProtectedRoute punya proper loading state + toast guard

---

## Rekomendasi urutan pengerjaan

1. **🔴 wajib (≤ 20 menit total)**:
   - Replace `window.location.assign` di ProductInfo
   - Bersihkan unused `useEffect` import + optimasi `storage.get` di AuthContext
   - Tambah aria-label di quick-add ProductCard

2. **🟡 sebaiknya (≤ 30 menit total)**:
   - Standardisasi `from: string` di semua redirect login
   - Tambah `type="tel"` di phone input
   - Hapus atau pakai `useMediaQuery.js`
   - Tulis catatan placeholder Footer links di BUYER-README

3. **🟢 nice-to-have**:
   - Wrap `/checkout`, `/profil`, `/pesanan/:id` dengan ProtectedRoute di router
   - Replace `key={i}` dengan `key={item.id}` di list dinamis
   - Tulis pagination & strict mode note di BUYER-README

Total estimasi: **~50 menit** untuk semua tier 🔴 + 🟡 + 🟢.
