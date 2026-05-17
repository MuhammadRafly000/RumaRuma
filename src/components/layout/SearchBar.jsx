import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { searchProducts } from '@/services/productService';
import { formatCurrency } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

export default function SearchBar({ className, compact = false }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();
  const debounced = useDebounce(query, 250);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!debounced || debounced.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await searchProducts(debounced);
      if (active) {
        setResults(data.slice(0, 6));
        setLoading(false);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [debounced]);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/kategori?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={cn('relative w-full', className)}>
      <form onSubmit={submit} className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-charcoal-400">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="search"
          placeholder="Cari piring sage, vas bunga, atau ‘teko keramik’..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className={cn(
            'w-full rounded-full border border-charcoal-100 bg-white pr-28 pl-11 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:border-sage-400 focus:outline-none focus:ring-4 focus:ring-sage-100',
            compact ? 'py-2.5' : 'py-3.5',
          )}
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-sage-600 px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-sage-700"
        >
          Cari
        </button>
      </form>

      <AnimatePresence>
        {open && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 max-h-[480px] overflow-y-auto rounded-3xl border border-charcoal-100 bg-white p-3 shadow-elevated"
          >
            {loading && (
              <div className="flex items-center gap-2 px-3 py-4 text-sm text-charcoal-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Mencari produk...
              </div>
            )}
            {!loading && results.length === 0 && query.length >= 2 && (
              <div className="px-3 py-6 text-center text-sm text-charcoal-500">
                Tidak ada produk cocok untuk
                <span className="font-medium text-charcoal-800"> "{query}"</span>
              </div>
            )}
            {!loading &&
              results.map((p) => (
                <Link
                  key={p.id}
                  to={`/produk/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition hover:bg-cream-100"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-charcoal-800">{p.name}</p>
                    <p className="text-xs text-charcoal-500">{formatCurrency(p.price)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-charcoal-300" />
                </Link>
              ))}
            <Link
              to={`/kategori?q=${encodeURIComponent(query)}`}
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-between rounded-2xl bg-cream-100 px-3 py-2 text-xs font-medium text-charcoal-700 hover:bg-cream-200"
            >
              Lihat semua hasil untuk "{query}"
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
