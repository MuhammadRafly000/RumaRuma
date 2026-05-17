export const APP_NAME = import.meta.env.VITE_APP_NAME || 'RumaRuma';
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const DEFAULT_LOCATION =
  import.meta.env.VITE_DEFAULT_LOCATION || 'Jakarta Selatan';
export const CURRENCY = import.meta.env.VITE_CURRENCY || 'IDR';
export const LOCALE = import.meta.env.VITE_LOCALE || 'id-ID';

export const STORAGE_KEYS = {
  cart: 'rumaruma:cart',
  wishlist: 'rumaruma:wishlist',
  auth: 'rumaruma:auth',
  location: 'rumaruma:location',
  orders: 'rumaruma:orders',
};

export const FREE_SHIPPING_THRESHOLD = 250_000;
export const FLAT_SHIPPING_FEE = 18_000;

export const NAV_LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/kategori', label: 'Semua Produk' },
  { to: '/kategori/dinnerware', label: 'Pecah Belah' },
  { to: '/kategori/kitchenware', label: 'Kitchenware' },
  { to: '/kategori/decor', label: 'Dekorasi' },
  { to: '/kategori/storage', label: 'Storage' },
  { to: '/inspirasi', label: 'Inspirasi' },
  { to: '/jurnal', label: 'Jurnal' },
];

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Paling Relevan' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga Tertinggi' },
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'bestseller', label: 'Paling Laris' },
];
