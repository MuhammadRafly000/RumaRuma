import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Share2,
  Truck,
  ShieldCheck,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import Badge from '@/components/ui/Badge.jsx';
import RatingStars from '@/components/ui/RatingStars.jsx';
import PriceTag from '@/components/ui/PriceTag.jsx';
import QuantityStepper from '@/components/ui/QuantityStepper.jsx';
import Button from '@/components/ui/Button.jsx';
import { useCartStore } from '@/context/CartContext';
import { useWishlistStore } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatCurrency, formatNumber } from '@/utils/formatCurrency';
import { DEFAULT_LOCATION } from '@/config/constants';
import cn from '@/utils/classNames';

const tabs = [
  { value: 'description', label: 'Deskripsi' },
  { value: 'specs', label: 'Spesifikasi' },
  { value: 'shipping', label: 'Pengiriman' },
];

export default function ProductInfo({ product }) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const wishlistHas = useWishlistStore((s) => s.has(product.id));
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const toast = useToast();

  const subtotal = useMemo(() => qty * product.price, [qty, product.price]);

  const handleAdd = () => {
    addItem(product, qty);
    toast.success('Ditambahkan ke keranjang', `${qty}× ${product.name}`);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    toast.success('Lanjut ke checkout', product.name);
    window.location.assign('/checkout');
  };

  const handleWishlist = () => {
    wishlistToggle(product.id);
    toast.info(
      wishlistHas ? 'Dihapus dari wishlist' : 'Disimpan ke wishlist',
      product.name,
    );
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.info('Tautan disalin');
      }
    } catch {
      /* ignore cancel */
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        {product.badge && (
          <Badge tone={product.isBestseller ? 'sage' : product.isNew ? 'dark' : 'promo'}>
            {product.badge}
          </Badge>
        )}
        <span className="text-xs text-charcoal-400">
          oleh <span className="font-semibold text-charcoal-700">{product.brand}</span>
        </span>
      </div>

      <h1 className="font-display text-3xl text-charcoal-800 sm:text-4xl">
        {product.name}
      </h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-charcoal-500">
        <span className="inline-flex items-center gap-1.5">
          <RatingStars value={product.rating} size={14} />
          <span className="font-semibold text-charcoal-700">
            {product.rating.toFixed(1)}
          </span>
          <span>({formatNumber(product.reviews)} ulasan)</span>
        </span>
        <span className="hidden sm:inline">·</span>
        <span>{formatNumber(product.sold)} terjual</span>
        <span className="hidden sm:inline">·</span>
        <span className="text-sage-700">Stok {product.stock}</span>
      </div>

      <div className="rounded-3xl bg-cream-100 p-5">
        <PriceTag
          price={product.price}
          originalPrice={product.originalPrice}
          size="lg"
        />
        <p className="mt-2 text-xs text-charcoal-500">
          Cicilan 0% mulai {formatCurrency(Math.round(product.price / 6))} / bulan
        </p>
      </div>

      <p className="text-sm leading-relaxed text-charcoal-500">{product.shortDescription}</p>

      <div className="flex flex-col gap-2 rounded-3xl border border-charcoal-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-charcoal-600">
          <Truck className="h-4 w-4 text-sage-600" />
          Dikirim dari Bandung ke
          <span className="font-semibold text-charcoal-700">{DEFAULT_LOCATION}</span>
        </div>
        <span className="text-xs text-charcoal-400">Estimasi 2–4 hari kerja</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-charcoal-500 sm:grid-cols-4">
        <Mini icon={Truck} label="Free ongkir min. Rp 250rb" />
        <Mini icon={ShieldCheck} label="Garansi pecah 100%" />
        <Mini icon={RotateCcw} label="7 hari tukar produk" />
        <Mini icon={Sparkles} label="Kurasi pengrajin lokal" />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal-500">Jumlah</label>
          <div className="mt-1.5 flex items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} max={product.stock} />
            <span className="text-xs text-charcoal-400">
              Maks {product.stock} pcs
            </span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-charcoal-400">Subtotal</p>
          <motion.p
            key={subtotal}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl text-charcoal-800"
          >
            {formatCurrency(subtotal)}
          </motion.p>
        </div>
      </div>

      <div className="flex flex-wrap items-stretch gap-3">
        <Button size="lg" onClick={handleAdd} className="flex-1 sm:flex-none sm:px-8">
          <ShoppingBag className="h-4 w-4" /> Tambah ke Keranjang
        </Button>
        <Button
          variant="dark"
          size="lg"
          onClick={handleBuyNow}
          className="flex-1 sm:flex-none sm:px-8"
        >
          Beli Sekarang
        </Button>
        <button
          type="button"
          onClick={handleWishlist}
          className={cn(
            'grid h-12 w-12 place-items-center rounded-full border transition',
            wishlistHas
              ? 'border-rose-200 bg-rose-50 text-rose-500'
              : 'border-charcoal-100 text-charcoal-600 hover:border-sage-300',
          )}
          aria-label="Wishlist"
        >
          <Heart className={cn('h-5 w-5', wishlistHas && 'fill-current')} />
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="grid h-12 w-12 place-items-center rounded-full border border-charcoal-100 text-charcoal-600 transition hover:border-sage-300"
          aria-label="Bagikan"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-2 rounded-3xl border border-charcoal-100 bg-white">
        <div className="flex gap-1 border-b border-charcoal-100 px-4 pt-3">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setActiveTab(t.value)}
              className={cn(
                'relative px-3 py-2 text-sm font-medium transition',
                activeTab === t.value
                  ? 'text-charcoal-800'
                  : 'text-charcoal-400 hover:text-charcoal-700',
              )}
            >
              {t.label}
              {activeTab === t.value && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-sage-500"
                />
              )}
            </button>
          ))}
        </div>
        <div className="p-5 text-sm leading-relaxed text-charcoal-600">
          {activeTab === 'description' && (
            <p className="text-pretty">{product.description}</p>
          )}
          {activeTab === 'specs' && (
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-2xl bg-cream-50 px-4 py-2"
                >
                  <dt className="text-xs uppercase tracking-wider text-charcoal-400">
                    {s.label}
                  </dt>
                  <dd className="text-sm font-medium text-charcoal-700">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {activeTab === 'shipping' && (
            <ul className="space-y-2">
              <li>• Dikirim dalam 1×24 jam setelah pembayaran terkonfirmasi.</li>
              <li>• Free ongkir min. transaksi Rp 250.000 area Jabodetabek.</li>
              <li>• Garansi pecah 100% selama pengiriman — gratis tukar barang.</li>
              <li>• Cicilan 0% via kartu kredit & paylater pilihan.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Mini({ icon: Icon, label }) {
  return (
    <div className="flex items-start gap-2 rounded-2xl bg-cream-100 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
      <span>{label}</span>
    </div>
  );
}
