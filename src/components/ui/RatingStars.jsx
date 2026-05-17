import { Star } from 'lucide-react';
import cn from '@/utils/classNames';
import { clampRating } from '@/utils/rating';

export default function RatingStars({ value = 0, size = 14, className }) {
  const r = clampRating(value);
  const full = Math.floor(r);
  const hasHalf = r - full >= 0.5;
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-amber-400', className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && hasHalf);
        return (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.6}
            className={cn(
              'transition-colors',
              filled ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-charcoal-200',
            )}
          />
        );
      })}
    </span>
  );
}
