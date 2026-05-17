import { motion } from 'framer-motion';
import cn from '@/utils/classNames';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex flex-col items-center justify-center rounded-3xl border border-dashed border-charcoal-100 bg-white/60 px-8 py-16 text-center',
        className,
      )}
    >
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-100 text-sage-600">
          <Icon className="h-7 w-7" />
        </div>
      )}
      {title && <h3 className="font-display text-xl text-charcoal-900">{title}</h3>}
      {description && (
        <p className="mt-2 max-w-md text-sm text-charcoal-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
