import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import cn from '@/utils/classNames';

export default function ProductGallery({ images = [], alt = '' }) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <div className="relative flex-1 overflow-hidden rounded-3xl bg-cream-100">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={images[active]}
            src={images[active]}
            alt={alt}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-square w-full object-cover"
          />
        </AnimatePresence>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-charcoal-700 backdrop-blur">
          <ZoomIn className="h-3.5 w-3.5" />
          {active + 1} / {total}
        </span>
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-charcoal-700 shadow-soft backdrop-blur hover:bg-white"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-charcoal-700 shadow-soft backdrop-blur hover:bg-white"
              aria-label="Selanjutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex shrink-0 gap-3 lg:max-w-[88px] lg:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'relative h-20 w-20 overflow-hidden rounded-2xl border-2 bg-cream-100 transition',
              i === active
                ? 'border-sage-500 shadow-soft'
                : 'border-transparent opacity-70 hover:opacity-100',
            )}
            aria-label={`Lihat gambar ${i + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
