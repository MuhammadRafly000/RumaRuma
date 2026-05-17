import { motion } from 'framer-motion';
import ProductCard from './ProductCard.jsx';
import ProductSkeleton from './ProductSkeleton.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { PackageSearch } from 'lucide-react';
import { stagger, fadeUp } from '@/animations/variants';
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

  return (
    <motion.div
      variants={stagger(0.05, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className={cn(gridClass, className)}
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={fadeUp}>
          <ProductCard product={p} layout={layout} />
        </motion.div>
      ))}
    </motion.div>
  );
}
