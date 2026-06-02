import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import QuantityStepper from '@/components/ui/QuantityStepper.jsx';
import PriceTag from '@/components/ui/PriceTag.jsx';
import { useCartStore } from '@/context/CartContext';
import cn from '@/utils/classNames';

export default function CartItem({ item, compact = false, onAfterRemove }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div
      className={cn(
        'flex gap-3 rounded-2xl border border-charcoal-100/70 bg-white p-3',
        compact ? '' : 'p-4',
      )}
    >
      <Link
        to={`/produk/${item.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-100"
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <Link
          to={`/produk/${item.slug}`}
          className="line-clamp-2 text-sm font-semibold text-charcoal-700 hover:text-sage-700"
        >
          {item.name}
        </Link>
        <PriceTag
          price={item.price}
          originalPrice={item.originalPrice}
          size="sm"
          showBadge={false}
          reserveBadgeSpace={false}
        />
        <div className="mt-auto flex items-center justify-between gap-2">
          <QuantityStepper
            value={item.quantity}
            onChange={(v) => updateQuantity(item.id, v)}
            max={item.stock || 99}
            size="sm"
          />
          <button
            type="button"
            onClick={() => {
              removeItem(item.id);
              onAfterRemove?.(item);
            }}
            className="rounded-full p-2 text-charcoal-400 transition hover:bg-rose-50 hover:text-rose-500"
            aria-label="Hapus dari keranjang"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
