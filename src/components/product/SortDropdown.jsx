import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SORT_OPTIONS } from '@/config/constants';
import cn from '@/utils/classNames';

export default function SortDropdown({ value, onChange, className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((o) => o.value === value) || SORT_OPTIONS[0];

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-charcoal-100 bg-white px-4 py-2.5 text-xs font-medium text-charcoal-700 transition hover:border-sage-300"
      >
        Urutkan: <span className="font-semibold">{current.label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-charcoal-400 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-1.5 shadow-elevated"
          >
            {SORT_OPTIONS.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-charcoal-700 transition hover:bg-cream-100',
                    opt.value === value && 'bg-sage-50 text-sage-700',
                  )}
                >
                  {opt.label}
                  {opt.value === value && <Check className="h-4 w-4 text-sage-600" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
