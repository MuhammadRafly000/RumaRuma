import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { promoBanners } from '@/data/banners';
import cn from '@/utils/classNames';

export default function PromoSection() {
  return (
    <section className="container-page py-12 lg:py-16">
      <div className="grid gap-4 lg:grid-cols-2">
        {promoBanners.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={p.to}
              className="group relative flex h-72 overflow-hidden rounded-[2rem] sm:h-80"
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-r from-charcoal-800/65 via-charcoal-800/30 to-transparent',
                )}
              />
              <div className="relative flex flex-1 flex-col justify-end p-8 text-white">
                <span
                  className={cn(
                    'mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white',
                    p.accent,
                  )}
                >
                  Promo terbatas
                </span>
                <h3 className="font-display text-3xl">{p.title}</h3>
                <p className="mt-1 max-w-xs text-sm text-white/80">{p.subtitle}</p>
                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-charcoal-800 transition group-hover:bg-cream-100">
                  Belanja sekarang <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
