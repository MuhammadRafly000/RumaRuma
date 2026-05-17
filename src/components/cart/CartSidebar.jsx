import { Link } from 'react-router-dom';
import { ShoppingBag, Truck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Drawer from '@/components/ui/Drawer.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import Button from '@/components/ui/Button.jsx';
import CartItem from './CartItem.jsx';
import { useCartTotals } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { FREE_SHIPPING_THRESHOLD } from '@/config/constants';

export default function CartSidebar({ open, onClose }) {
  const { items, subtotal, shipping, total, freeShippingRemainder, itemCount } =
    useCartTotals();

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="right"
      width="max-w-md"
      title={`Keranjang (${itemCount})`}
      footer={
        items.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-charcoal-500">
              <span>Subtotal</span>
              <span className="font-semibold text-charcoal-800">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-charcoal-500">
              <span>Ongkir</span>
              <span className="font-semibold text-charcoal-800">
                {shipping === 0 ? 'Gratis' : formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-charcoal-100 pt-3 text-base">
              <span className="font-medium text-charcoal-600">Total</span>
              <span className="font-display text-2xl text-charcoal-800">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                as={Link}
                to="/keranjang"
                onClick={onClose}
                variant="secondary"
              >
                Lihat Keranjang
              </Button>
              <Button as={Link} to="/checkout" onClick={onClose}>
                Checkout
              </Button>
            </div>
          </div>
        )
      }
    >
      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Keranjangmu masih kosong"
          description="Yuk mulai jelajahi koleksi pecah belah dan home living favoritmu."
          action={
            <Button as={Link} to="/kategori" onClick={onClose}>
              Mulai Belanja
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          <div className="rounded-2xl bg-sage-50 p-4">
            <div className="flex items-center gap-2 text-sm text-sage-800">
              <Truck className="h-4 w-4" />
              {freeShippingRemainder > 0 ? (
                <span>
                  Belanja{' '}
                  <span className="font-semibold">
                    {formatCurrency(freeShippingRemainder)}
                  </span>{' '}
                  lagi untuk free ongkir.
                </span>
              ) : (
                <span className="font-semibold">Selamat! Ongkir kamu gratis ✦</span>
              )}
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
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
                transition={{ duration: 0.25 }}
              >
                <CartItem item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Drawer>
  );
}
