import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import cn from '@/utils/classNames';

export default function Drawer({
  open,
  onClose,
  title,
  side = 'right',
  width = 'max-w-md',
  children,
  footer,
}) {
  useLockBodyScroll(open);
  const isRight = side === 'right';
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Tutup panel"
            onClick={onClose}
            className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: isRight ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? '100%' : '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute top-0 flex h-full w-full flex-col bg-cream-50 shadow-elevated',
              width,
              isRight ? 'right-0' : 'left-0',
            )}
          >
            <header className="flex items-center justify-between border-b border-charcoal-100 px-5 py-4">
              <h3 className="font-display text-lg text-charcoal-900">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-charcoal-500 hover:bg-cream-100 hover:text-charcoal-900"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
            {footer && (
              <footer className="border-t border-charcoal-100 bg-white px-5 py-4">
                {footer}
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
