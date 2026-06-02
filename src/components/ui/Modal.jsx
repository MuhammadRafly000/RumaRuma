import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import cn from '@/utils/classNames';

/**
 * Modal — centered overlay with backdrop. Use for quick interactive
 * surfaces (FAQ, tracking, signup) where a side Drawer would feel too
 * heavy. Closes on backdrop click, ESC key, or explicit close button.
 *
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - title: ReactNode
 *  - description?: ReactNode (subtitle below title)
 *  - icon?: LucideIcon (decorative icon next to title)
 *  - size?: 'sm' | 'md' | 'lg' (default md)
 *  - footer?: ReactNode (sticky bottom area)
 *  - dismissible?: boolean (default true) — false hides close button & disables ESC/backdrop
 */
const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  icon: Icon,
  size = 'md',
  footer,
  dismissible = true,
  children,
}) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open || !dismissible) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dismissible, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center px-4 py-6 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Tutup"
            tabIndex={-1}
            onClick={dismissible ? onClose : undefined}
            className="absolute inset-0 bg-charcoal-800/55 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative z-10 flex max-h-[88vh] w-full flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-elevated',
              sizes[size] || sizes.md,
            )}
          >
            <header className="flex items-start gap-3 border-b border-charcoal-100 bg-white px-6 py-5">
              {Icon && (
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-700">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              <div className="flex-1">
                <h3 className="font-display text-lg text-charcoal-800 sm:text-xl">
                  {title}
                </h3>
                {description && (
                  <p className="mt-1 text-xs text-charcoal-500 sm:text-sm">
                    {description}
                  </p>
                )}
              </div>
              {dismissible && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-charcoal-500 transition hover:bg-cream-100 hover:text-charcoal-800"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

            {footer && (
              <footer className="border-t border-charcoal-100 bg-white px-6 py-4">
                {footer}
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
