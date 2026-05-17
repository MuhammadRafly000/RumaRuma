import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, X, ShoppingBag } from 'lucide-react';
import { inspirations } from '@/data/inspirations';
import { products } from '@/data/products';
import { formatCurrency } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

export default function InspirationPage() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const getProduct = (id) => products.find(p => p.id === id);

  return (
    <div className="container-page py-12 lg:py-16">
      <header className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
          Shop the Look
        </p>
        <h1 className="mt-4 font-display text-3xl text-charcoal-800 sm:text-4xl">
          Inspirasi Ruangan
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-charcoal-500">
          Temukan perpaduan sempurna dari koleksi RumaRuma untuk menghidupkan setiap sudut rumahmu. Klik tanda plus pada gambar untuk melihat detail produk.
        </p>
      </header>

      <div className="space-y-24">
        {inspirations.map((insp, i) => (
          <section key={insp.id} className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className={cn("relative", i % 2 !== 0 && "lg:order-last")}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-elevated">
                <img 
                  src={insp.image} 
                  alt={insp.title} 
                  className="h-full w-full object-cover"
                />
                
                {/* Hotspots */}
                {insp.hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    className="absolute"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                      className="group relative -ml-4 -mt-4 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-charcoal-800 shadow-soft backdrop-blur transition-transform hover:scale-110"
                    >
                      <Plus className={cn("h-4 w-4 transition-transform", activeHotspot === spot.id && "rotate-45")} />
                      
                      {/* Tooltip */}
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-charcoal-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                        {spot.label}
                      </span>
                    </button>
                    
                    {/* Hotspot Popup Card */}
                    <AnimatePresence>
                      {activeHotspot === spot.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute left-1/2 top-10 z-10 w-64 -translate-x-1/2 rounded-2xl bg-white p-3 shadow-elevated"
                        >
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="absolute right-2 top-2 rounded-full p-1 text-charcoal-400 hover:bg-cream-100 hover:text-charcoal-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {getProduct(spot.id) && (
                            <div className="flex gap-3">
                              <img src={getProduct(spot.id).images[0]} alt="" className="h-16 w-16 rounded-xl object-cover" />
                              <div className="flex-1 pr-4">
                                <Link to={`/produk/${getProduct(spot.id).slug}`} className="line-clamp-2 text-sm font-medium text-charcoal-800 hover:text-sage-700">
                                  {getProduct(spot.id).name}
                                </Link>
                                <p className="mt-1 text-xs font-semibold text-charcoal-600">
                                  {formatCurrency(getProduct(spot.id).price)}
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-2xl text-charcoal-800 sm:text-3xl">{insp.title}</h2>
              <p className="mt-4 text-charcoal-500 leading-relaxed">
                {insp.description}
              </p>
              
              <div className="mt-8">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal-400">Produk di foto ini</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {insp.hotspots.map((spot) => {
                    const p = getProduct(spot.id);
                    if (!p) return null;
                    return (
                      <Link key={p.id} to={`/produk/${p.slug}`} className="group flex items-center gap-3 rounded-2xl border border-charcoal-100 p-2 transition hover:border-sage-300 hover:bg-sage-50">
                        <img src={p.images[0]} alt="" className="h-14 w-14 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-charcoal-700 group-hover:text-sage-700">{p.name}</p>
                          <p className="text-xs text-charcoal-500">{formatCurrency(p.price)}</p>
                        </div>
                      </Link>
                    )
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
