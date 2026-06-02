import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard.jsx';
import ProductSkeleton from './ProductSkeleton.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { PackageSearch } from 'lucide-react';
import cn from '@/utils/classNames';

export default function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  layout = 'grid',
  className,
  emptyTitle = 'Belum ada produk yang cocok',
  emptyDescription = 'Coba ubah filter atau kata kunci pencarianmu.',
  emptyAction,
}) {
  const gridClass =
    layout === 'list'
      ? 'flex flex-col gap-3'
      : 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4';

  if (loading) {
    return (
      <div className={cn(gridClass, className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <EmptyState
        icon={PackageSearch}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  /**
   * Each card runs its own enter/exit animation rather than relying on a
   * parent `whileInView` stagger. The previous approach used
   * `once: true` on the parent, which meant new cards mounted after the
   * initial trigger (e.g. after a filter change) inherited the parent's
   * "show" variant state but never actually fired their own transition —
   * leaving them stuck at `opacity: 0` and producing invisible gaps in
   * the grid. AnimatePresence + per-item `initial`/`animate` keeps each
   * card self-contained and visible regardless of when it mounts.
   */
  return (
    <div className={cn(gridClass, className)}>
      <AnimatePresence mode="popLayout">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{
              duration: 0.35,
              delay: Math.min(i * 0.035, 0.28),
              ease: [0.16, 1, 0.3, 1],
            }}
            // h-full so each card stretches to the row's tallest height
            // (grid default align-items: stretch). Without this the motion
            // wrapper is auto-sized and cards in the same row end up at
            // different visual heights when content length varies.
            className="h-full"
          >
            <ProductCard product={p} layout={layout} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
