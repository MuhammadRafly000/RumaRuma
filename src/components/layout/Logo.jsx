import { Link } from 'react-router-dom';
import cn from '@/utils/classNames';

export default function Logo({ className, mark = true, label = true }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-2', className)}
      aria-label="RumaRuma — beranda"
    >
      {mark && (
        <span className="relative grid h-9 w-9 place-items-center rounded-2xl bg-sage-600 text-white shadow-glow transition-transform duration-500 group-hover:rotate-[8deg]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 11L12 3l9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      {label && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl font-semibold text-charcoal-900">
            Ruma<span className="text-sage-600">Ruma</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal-400">
            home living
          </span>
        </span>
      )}
    </Link>
  );
}
