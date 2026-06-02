import cn from '@/utils/classNames';
import { formatCurrency } from '@/utils/formatCurrency';
import { discountPercent } from '@/utils/rating';

/**
 * PriceTag — displays the current price plus optional crossed-out original
 * and a discount badge.
 *
 * Layout note: we deliberately split the price into a primary row (current
 * + original) and a secondary row (badge) and reserve vertical space for the
 * badge row even when there is no discount. Without this, cards with a
 * discount end up taller than cards without one, and a grid of mixed
 * products looks visually staggered. Setting `reserveBadgeSpace={false}`
 * disables this behavior for one-off contexts (e.g. product detail page
 * where there's only one card in view).
 */
export default function PriceTag({
  price,
  originalPrice,
  size = 'md',
  className,
  align = 'start',
  showBadge = true,
  reserveBadgeSpace = true,
}) {
  const percent = discountPercent(price, originalPrice);
  const hasDiscount = originalPrice > price && percent > 0;

  const sizes = {
    sm: {
      current: 'text-sm',
      original: 'text-xs',
      badge: 'text-[10px]',
      badgeRow: 'min-h-[18px]',
    },
    md: {
      current: 'text-base',
      original: 'text-xs',
      badge: 'text-[10px]',
      badgeRow: 'min-h-[20px]',
    },
    lg: {
      current: 'text-2xl sm:text-3xl',
      original: 'text-sm',
      badge: 'text-xs',
      badgeRow: 'min-h-[24px]',
    },
  };
  const s = sizes[size] || sizes.md;

  const justify =
    align === 'center'
      ? 'justify-center'
      : align === 'end'
        ? 'justify-end'
        : 'justify-start';

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {/* Primary row: current price + crossed-out original. flex-nowrap keeps
          them on the same baseline; min-w-0 lets the original price truncate
          if it ever gets too long. */}
      <div className={cn('flex flex-nowrap items-baseline gap-x-2', justify)}>
        <span className={cn('font-semibold text-charcoal-900', s.current)}>
          {formatCurrency(price)}
        </span>
        {hasDiscount && (
          <span
            className={cn(
              'min-w-0 truncate text-charcoal-300 line-through',
              s.original,
            )}
          >
            {formatCurrency(originalPrice)}
          </span>
        )}
      </div>

      {/* Secondary row: badge. Always rendered (as empty placeholder) when
          reserveBadgeSpace is true so every PriceTag occupies the same
          vertical space — required for visual consistency across grid cards. */}
      {(showBadge && hasDiscount) || reserveBadgeSpace ? (
        <div className={cn('flex items-center', s.badgeRow, justify)}>
          {showBadge && hasDiscount && (
            <span
              className={cn(
                'rounded-full bg-rose-100 px-1.5 py-0.5 font-bold text-rose-600',
                s.badge,
              )}
            >
              -{percent}%
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
}
