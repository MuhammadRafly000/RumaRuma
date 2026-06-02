import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { inspirations } from '@/data/inspirations';
import { useProductStore } from '@/context/ProductContext';
import { formatCurrency } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

export default function InspirationPage() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const products = useProductStore((state) => state.products);
  const getProduct = (id) => products.find((p) => p.id === id);

  return (
    <div className="container-page py-10 lg:py-16">
      <header className="mb-10 text-center lg:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
          Shop the Look
        </p>
        <h1 className="mt-3 font-display text-3xl text-charcoal-800 sm:text-4xl">
          Inspirasi Ruangan
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-charcoal-500 sm:text-base">
          Temukan perpaduan sempurna dari koleksi RumaRuma untuk menghidupkan
          setiap sudut rumahmu. Ketuk tanda <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sage-100 text-[10px] font-bold text-sage-700">+</span> pada gambar untuk melihat detail produk.
        </p>
      </header>

      <div className="space-y-16 lg:space-y-24">
        {inspirations.map((insp, i) => (
          <section
            key={insp.id}
            className="grid gap-6 lg:grid-cols-2 lg:gap-16"
          >
            {/* Image + hotspots */}
            <div className={cn('relative', i % 2 !== 0 && 'lg:order-last')}>
              {/* Outer wrapper: NO overflow-hidden so popups can extend outside */}
              <div className="relative aspect-[5/4] sm:aspect-[4/3]">
                {/* Inner wrapper: clips image to rounded corners */}
                <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] shadow-elevated sm:rounded-[2rem]">
                  <img
                    src={insp.image}
                    alt={insp.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/15 via-transparent to-transparent" />
                </div>

                {/* Hotspots */}
                {insp.hotspots.map((spot) => {
                  // Decide popup orientation so it stays mostly inside the image
                  const popupSide =
                    spot.x > 65 ? 'right' : spot.x < 35 ? 'left' : 'center';
                  const popupAbove = spot.y > 60;
                  const product = getProduct(spot.id);

                  return (
                    <div
                      key={spot.id}
                      className="absolute"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveHotspot(
                            activeHotspot === spot.id ? null : spot.id,
                          )
                        }
                        aria-label={`Lihat ${spot.label}`}
                        className={cn(
                          // 44px touch target on mobile, 36px visual on desktop
                          'group relative grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-charcoal-800 shadow-card backdrop-blur transition-transform hover:scale-110 active:scale-95 sm:h-9 sm:w-9',
                          activeHotspot === spot.id && 'ring-2 ring-sage-500',
                        )}
                      >
                        {/* Pulsing halo for first-time discoverability */}
                        <span
                          className={cn(
                            'absolute inset-0 rounded-full bg-white/60',
                            activeHotspot !== spot.id &&
                              'animate-ping opacity-50',
                          )}
                          aria-hidden="true"
                        />
                        <Plus
                          className={cn(
                            'relative h-5 w-5 transition-transform sm:h-4 sm:w-4',
                            activeHotspot === spot.id && 'rotate-45',
                          )}
                        />

                        {/* Desktop-only hover tooltip (touch devices skip hover) */}
                        <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-charcoal-800 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 md:block">
                          {spot.label}
                        </span>
                      </button>

                      {/* Popup card — dynamic positioning to stay inside image bounds */}
                      <AnimatePresence>
                        {activeHotspot === spot.id && product && (
                          <motion.div
                            initial={{ opacity: 0, y: popupAbove ? 8 : -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: popupAbove ? 8 : -8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                              'absolute z-30 w-56 max-w-[min(16rem,calc(100vw-2.5rem))] rounded-2xl border border-charcoal-100/60 bg-white p-3 shadow-elevated',
                              // Horizontal anchor
                              popupSide === 'left' && 'left-0',
                              popupSide === 'right' && 'right-0',
                              popupSide === 'center' &&
                                'left-1/2 -translate-x-1/2',
                              // Vertical anchor (above or below the dot)
                              popupAbove ? 'bottom-10' : 'top-10',
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => setActiveHotspot(null)}
                              aria-label="Tutup"
                              className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-charcoal-400 hover:bg-cream-100 hover:text-charcoal-700"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            <div className="flex gap-3 pr-7">
                              <img
                                src={product.images[0]}
                                alt=""
                                className="h-16 w-16 shrink-0 rounded-xl object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-sage-700">
                                  {spot.label}
                                </p>
                                <Link
                                  to={`/produk/${product.slug}`}
                                  className="line-clamp-2 text-sm font-medium text-charcoal-800 transition-colors hover:text-sage-700"
                                >
                                  {product.name}
                                </Link>
                                <p className="mt-1 text-xs font-semibold text-charcoal-700">
                                  {formatCurrency(product.price)}
                                </p>
                              </div>
                            </div>
                            <Link
                              to={`/produk/${product.slug}`}
                              className="mt-3 flex items-center justify-center rounded-full bg-charcoal-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-charcoal-700"
                            >
                              Lihat detail produk
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Mobile hint — small caption below image */}
              <p className="mt-3 text-center text-[11px] text-charcoal-400 lg:hidden">
                {insp.hotspots.length} produk dalam look ini · ketuk
                {' '}<span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sage-100 text-[9px] font-bold text-sage-700">+</span>{' '}
                untuk detail
              </p>
            </div>

            {/* Description + product list */}
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-2xl text-charcoal-800 sm:text-3xl">
                {insp.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-500 sm:mt-4 sm:text-base">
                {insp.description}
              </p>

              <div className="mt-6 sm:mt-8">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-400 sm:mb-4">
                  Produk di foto ini
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {insp.hotspots.map((spot) => {
                    const p = getProduct(spot.id);
                    if (!p) return null;
                    return (
                      <Link
                        key={p.id}
                        to={`/produk/${p.slug}`}
                        className="group flex items-center gap-3 rounded-2xl border border-charcoal-100 p-2 transition hover:border-sage-300 hover:bg-sage-50 active:scale-[0.98]"
                      >
                        <img
                          src={p.images[0]}
                          alt=""
                          loading="lazy"
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-charcoal-700 group-hover:text-sage-700">
                            {p.name}
                          </p>
                          <p className="text-xs font-semibold text-charcoal-500">
                            {formatCurrency(p.price)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
