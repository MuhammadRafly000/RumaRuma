import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import cn from '@/utils/classNames';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

const tones = {
  success: 'border-sage-200 text-sage-800 bg-white',
  error: 'border-rose-200 text-rose-700 bg-white',
  info: 'border-charcoal-100 text-charcoal-800 bg-white',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    ({ type = 'success', title, description, duration = 3200 }) => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      if (duration > 0) {
        setTimeout(() => remove(id), duration);
      }
      return id;
    },
    [remove],
  );

  const api = useMemo(
    () => ({
      push,
      success: (title, description) => push({ type: 'success', title, description }),
      error: (title, description) => push({ type: 'error', title, description }),
      info: (title, description) => push({ type: 'info', title, description }),
      dismiss: remove,
    }),
    [push, remove],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = icons[t.type] || Info;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-elevated',
                  tones[t.type] || tones.info,
                )}
              >
                <Icon className="mt-0.5 h-5 w-5 shrcharcoal-0" />
                <div className="flex-1">
                  {t.title && <p className="text-sm font-semibold">{t.title}</p>}
                  {t.description && (
                    <p className="text-xs text-charcoal-500">{t.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  className="rounded-full p-1 text-charcoal-300 hover:bg-cream-100 hover:text-charcoal-700"
                  aria-label="Tutup notifikasi"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
