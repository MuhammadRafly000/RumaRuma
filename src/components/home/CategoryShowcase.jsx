import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { fadeUp, stagger } from '@/animations/variants';
import cn from '@/utils/classNames';

export default function CategoryShowcase() {
  return (
    <section className="container-page py-16 lg:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
            Kategori
          </p>
          <h2 className="section-title mt-2">Setiap sudut rumah, terkurasi.</h2>
          <p className="section-subtitle mt-2 max-w-xl">
            Telusuri koleksi pecah belah dan home living favorit, dipilih dari pengrajin
            lokal terbaik di Indonesia.
          </p>
        </div>
        <Link
          to="/kategori"
          className="hidden items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-800 sm:inline-flex"
        >
          Lihat semua <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <motion.div
        variants={stagger(0.05, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {categories.map((c) => (
          <motion.div key={c.slug} variants={fadeUp}>
            <Link
              to={`/kategori/${c.slug}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-charcoal-100/70 bg-white p-4 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <div
                className={cn(
                  'relative mb-3 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br',
                  c.accent,
                )}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-white"
                />
              </div>
              <p className="text-sm font-semibold text-charcoal-700 transition group-hover:text-sage-700">
                {c.name}
              </p>
              <p className="mt-0.5 text-[11px] text-charcoal-400">{c.tagline}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
