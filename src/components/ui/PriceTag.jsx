import cn from '@/utils/classNames';
import { formatCurrency } from '@/utils/formatCurrency';
import { discountPercent } from '@/utils/rating';

export default function PriceTag({
  price,
  originalPrice,
  size = 'md',
  className,
  align = 'start',
  showBadge = true,
}) {
  const percent = discountPercent(price, originalPrice);
  const sizes = {
    sm: { current: 'text-sm', original: 'text-xs', badge: 'text-[10px]' },
    md: { current: 'text-base', original: 'text-xs', badge: 'text-[10px]' },
    lg: { current: 'text-2xl sm:text-3xl', original: 'text-sm', badge: 'text-xs' },
  };
  const s = sizes[size] || sizes.md;
  return (
    <div
      className={cn(
        'flex flex-wrap items-baseline gap-x-2 gap-y-1',
        align === 'start' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'end' && 'justify-end',
        className,
      )}
    >
      <span className={cn('font-semibold text-charcoal-900', s.current)}>
        {formatCurrency(price)}
      </span>
      {originalPrice > price && (
        <>
          <span className={cn('text-charcoal-300 line-through', s.original)}>
            {formatCurrency(originalPrice)}
          </span>
          {showBadge && percent > 0 && (
            <span
              className={cn(
                'rounded-full bg-rose-100 px-1.5 py-0.5 font-bold text-rose-600',
                s.badge,
              )}
            >
              -{percent}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
