import cn from '@/utils/classNames';

const tones = {
  sage: 'bg-sage-600 text-white',
  sageSoft: 'bg-sage-100 text-sage-700',
  clay: 'bg-teal-accent text-white',
  cream: 'bg-cream-100 text-charcoal-700',
  dark: 'bg-charcoal-900 text-white',
  rose: 'bg-rose-100 text-rose-700',
  promo: 'bg-rose-500 text-white',
};

export default function Badge({ tone = 'sage', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide',
        tones[tone] || tones.sage,
        className,
      )}
    >
      {children}
    </span>
  );
}
