import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import Badge from '@/components/ui/Badge.jsx';
import PriceTag from '@/components/ui/PriceTag.jsx';
import RatingStars from '@/components/ui/RatingStars.jsx';
import { useCartStore } from '@/context/CartContext';
import { useWishlistStore } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatCompact } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

export default function ProductCard({ product, className, layout = 'grid' }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const wishlistHas = useWishlistStore((s) => s.has(product.id));
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const toast = useToast();

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success('Ditambahkan ke keranjang', product.name);
    openCart();
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    wishlistToggle(product.id);
    toast.info(
      wishlistHas ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist',
      product.name,
    );
  };

  if (layout === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className={cn(
          'group flex gap-4 rounded-3xl border border-charcoal-100/70 bg-white p-4 shadow-soft transition-all hover:shadow-card',
          className,
        )}
      >
        <Link
          to={`/produk/${product.slug}`}
          className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-cream-100"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f5f1ed%22 width=%22400%22 height=%22400%22/%3E%3C/svg%3E';
            }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="flex flex-1 flex-col">
          <Link to={`/produk/${product.slug}`} className="min-w-0">
            <p className="truncate text-xs text-charcoal-400">{product.brand}</p>
            <h3 className="line-clamp-2 font-semibold text-charcoal-700 transition group-hover:text-sage-700">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1 flex items-center gap-2 text-xs text-charcoal-400">
            <RatingStars value={product.rating} size={12} />
            <span>·</span>
            <span>{formatCompact(product.sold)} terjual</span>
          </div>
          <div className="mt-auto flex items-end justify-between">
            <PriceTag price={product.price} originalPrice={product.originalPrice} />
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full bg-sage-600 px-3.5 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-sage-700"
            >
              + Keranjang
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        // h-full + flex-col so the card stretches to the wrapper height and
        // the inner content can use mt-auto to anchor the rating row at the
        // bottom regardless of price/title length.
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-charcoal-100/70 bg-white shadow-soft transition-shadow hover:shadow-card',
        className,
      )}
    >
      {/* Image area is a plain relative container — NOT an anchor — so the
          action buttons / detail link below are not illegally nested inside
          another <a> (invalid DOM + unpredictable clicks). Only the <img> is
          wrapped in a Link. */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <Link
          to={`/produk/${product.slug}`}
          aria-label={product.name}
          className="block h-full w-full"
        >
          <img
            src={product.images?.[0]}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f5f1ed%22 width=%22400%22 height=%22400%22/%3E%3C/svg%3E';
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        {product.badge && (
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            <Badge tone={product.isBestseller ? 'sage' : product.isNew ? 'dark' : 'promo'}>
              {product.badge}
            </Badge>
          </div>
        )}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className={cn(
            'absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white',
            wishlistHas ? 'text-rose-500' : 'text-charcoal-500',
          )}
        >
          <Heart className={cn('h-4 w-4', wishlistHas && 'fill-current')} />
        </button>

        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Tambah ${product.name} ke keranjang`}
            title="Tambah ke keranjang"
            className="flex-1 rounded-full bg-sage-600 px-3 py-2.5 text-xs font-semibold text-white shadow-soft transition hover:bg-sage-700"
          >
            <ShoppingBag className="mx-auto h-4 w-4" />
          </button>
          <Link
            to={`/produk/${product.slug}`}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-charcoal-700 shadow-soft transition hover:bg-cream-100"
            aria-label="Lihat detail"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/produk/${product.slug}`} className="min-w-0">
          <p className="truncate text-[11px] uppercase tracking-wider text-charcoal-400">
            {product.brand}
          </p>
          <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-semibold text-charcoal-700 transition-colors group-hover:text-sage-700">
            {product.name}
          </h3>
        </Link>
        <PriceTag price={product.price} originalPrice={product.originalPrice} size="md" />
        <div className="mt-auto flex items-center justify-between text-[11px] text-charcoal-400">
          <span className="inline-flex items-center gap-1">
            <RatingStars value={product.rating} size={12} />
            <span>{(product.rating ?? 0).toFixed(1)}</span>
          </span>
          <span>{formatCompact(product.sold)} terjual</span>
        </div>
      </div>
    </motion.div>
  );
}
