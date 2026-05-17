import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid.jsx';
import { getAllProducts } from '@/services/productService';

const TABS = [
  { value: 'bestseller', label: 'Best Seller' },
  { value: 'new', label: 'Baru Datang' },
  { value: 'promo', label: 'Lagi Promo' },
];

export default function FeaturedProducts() {
  const [tab, setTab] = useState('bestseller');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getAllProducts().then((data) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = (() => {
    if (tab === 'bestseller') return products.filter((p) => p.isBestseller);
    if (tab === 'new') return products.filter((p) => p.isNew);
    if (tab === 'promo')
      return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
    return products;
  })().slice(0, 8);

  return (
    <section className="container-page py-12 lg:py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
            Pilihan kurator
          </p>
          <h2 className="section-title mt-2">Produk paling dicari minggu ini</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-charcoal-100 bg-white p-1">
            {TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                className={
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition ' +
                  (tab === t.value
                    ? 'bg-charcoal-800 text-white'
                    : 'text-charcoal-500 hover:text-charcoal-800')
                }
              >
                {t.label}
              </button>
            ))}
          </div>
          <Link
            to="/kategori"
            className="hidden items-center gap-1 text-sm font-medium text-sage-700 hover:text-sage-800 sm:inline-flex"
          >
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ProductGrid products={filtered} loading={loading} skeletonCount={8} />
    </section>
  );
}
