import cn from '@/utils/classNames';

export default function Skeleton({ className, rounded = 'rounded-xl' }) {
  return <div className={cn('shimmer', rounded, className)} aria-hidden="true" />;
}
