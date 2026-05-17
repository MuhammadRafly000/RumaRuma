import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { journals } from '@/data/journals';

export default function JournalPage() {
  return (
    <div className="container-page py-12 lg:py-16">
      <header className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
          Jurnal RumaRuma
        </p>
        <h1 className="mt-4 font-display text-3xl text-charcoal-800 sm:text-4xl">
          Cerita & Inspirasi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-charcoal-500">
          Temukan tips perawatan produk, inspirasi menata ruangan, hingga cerita di balik karya pengrajin lokal kami.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {journals.map((journal, i) => (
          <motion.article 
            key={journal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft transition-shadow hover:shadow-elevated"
          >
            <Link to={`/jurnal/${journal.slug}`} className="relative block aspect-[4/3] overflow-hidden">
              <img 
                src={journal.image} 
                alt={journal.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-sage-700 backdrop-blur">
                {journal.category}
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-center gap-2 text-xs text-charcoal-400">
                <span>{journal.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> 3 min read</span>
              </div>
              <Link to={`/jurnal/${journal.slug}`}>
                <h2 className="mb-2 font-display text-xl font-semibold text-charcoal-800 transition-colors group-hover:text-sage-700 line-clamp-2">
                  {journal.title}
                </h2>
              </Link>
              <p className="mb-6 text-sm text-charcoal-500 line-clamp-3">
                {journal.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-charcoal-100 pt-4">
                <span className="text-xs font-medium text-charcoal-600">Oleh {journal.author}</span>
                <Link to={`/jurnal/${journal.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-sage-600 transition-colors hover:text-sage-800">
                  Baca <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
