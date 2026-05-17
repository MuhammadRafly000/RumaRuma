import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Truck } from 'lucide-react';
import CartItem from '@/components/cart/CartItem.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import Button from '@/components/ui/Button.jsx';
import { useCartStore, useCartTotals } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { FREE_SHIPPING_THRESHOLD } from '@/config/constants';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, savings, total, freeShippingRemainder } =
    useCartTotals();
  const clear = useCartStore((s) => s.clear);

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Keranjang kamu masih kosong"
          description="Tambahkan produk favoritmu untuk mulai checkout."
          action={
            <Button as={Link} to="/kategori">
              Mulai Belanja
            </Button>
          }
        />
      </div>
    );
  }

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="container-page py-10">
      <header className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl text-charcoal-800 sm:text-4xl">
            Keranjang ({items.length})
          </h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Periksa kembali pesananmu sebelum melanjutkan ke pembayaran.
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-2 rounded-full border border-charcoal-100 px-4 py-2 text-xs font-medium text-charcoal-500 hover:border-rose-200 hover:text-rose-500"
        >
          <Trash2 className="h-3.5 w-3.5" /> Kosongkan keranjang
        </button>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <div className="rounded-3xl bg-sage-50 p-5">
            <div className="flex items-center gap-2 text-sm text-sage-800">
              <Truck className="h-4 w-4" />
              {freeShippingRemainder > 0 ? (
                <span>
                  Belanja{' '}
                  <span className="font-semibold">
                    {formatCurrency(freeShippingRemainder)}
                  </span>{' '}
                  lagi dan ongkir kamu gratis.
                </span>
              ) : (
                <span className="font-semibold">
                  Selamat! Pesanan ini bebas ongkir ✦
                </span>
              )}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-sage-500"
              />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 32 }}
              >
                <CartItem item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="font-display text-xl text-charcoal-800">Ringkasan Belanja</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <Row label="Subtotal" value={formatCurrency(subtotal)} />
              <Row
                label="Hemat dari diskon"
                value={`- ${formatCurrency(savings)}`}
                tone="positive"
              />
              <Row
                label="Ongkir"
                value={shipping === 0 ? 'Gratis' : formatCurrency(shipping)}
              />
              <div className="border-t border-charcoal-100 pt-3">
                <Row label="Total" value={formatCurrency(total)} bold />
              </div>
            </dl>
            <Button
              size="lg"
              fullWidth
              className="mt-5"
              onClick={() => navigate('/checkout')}
            >
              Lanjut ke Pembayaran
            </Button>
            <Link
              to="/kategori"
              className="mt-2 block text-center text-xs text-charcoal-500 hover:text-sage-700"
            >
              ← Lanjut belanja
            </Link>
          </div>

          <div className="mt-4 rounded-3xl border border-charcoal-100 bg-white p-5 text-xs text-charcoal-500">
            <p className="font-semibold text-charcoal-700">Kode promo & e-voucher</p>
            <p className="mt-1">Bisa dimasukkan di halaman pembayaran berikutnya.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, tone, bold }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={bold ? 'font-medium text-charcoal-700' : 'text-charcoal-500'}>
        {label}
      </dt>
      <dd
        className={
          (bold ? 'font-display text-2xl text-charcoal-800 ' : 'font-semibold ') +
          (tone === 'positive' ? 'text-sage-700' : 'text-charcoal-800')
        }
      >
        {value}
      </dd>
    </div>
  );
}
