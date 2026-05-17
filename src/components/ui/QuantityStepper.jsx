import { Minus, Plus } from 'lucide-react';
import cn from '@/utils/classNames';

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className,
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  const sizes = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };
  const btnSize = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-charcoal-100 bg-white',
        sizes[size],
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        className={cn(
          'flex items-center justify-center rounded-full text-charcoal-700 transition hover:bg-cream-100 disabled:opacity-40',
          btnSize[size],
        )}
        aria-label="Kurangi jumlah"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[2.25rem] text-center font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        className={cn(
          'flex items-center justify-center rounded-full text-charcoal-700 transition hover:bg-cream-100 disabled:opacity-40',
          btnSize[size],
        )}
        aria-label="Tambah jumlah"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
