import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, LayoutGrid, List, ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid.jsx';
import FilterSidebar from '@/components/product/FilterSidebar.jsx';
import SortDropdown from '@/components/product/SortDropdown.jsx';
import Drawer from '@/components/ui/Drawer.jsx';
import Button from '@/components/ui/Button.jsx';
import {
  getAllProducts,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/services/productService';
import { sortProducts } from '@/utils/rating';
import { categories } from '@/data/categories';
import cn from '@/utils/classNames';

const initialFilters = () => ({
  brands: [],
  colors: [],
  priceRange: null,
  minRating: 0,
  onlyPromo: false,
});

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState('relevance');
  const [layout, setLayout] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setFilters(initialFilters());
    let active = true;
    setLoading(true);
    const loader = slug ? getProductsByCategory(slug) : getAllProducts();
    Promise.all([loader, slug ? getCategoryBySlug(slug) : null]).then(
      ([list, cat]) => {
        if (!active) return;
        setProducts(list);
        setCategory(cat || null);
        setLoading(false);
      },
    );
    return () => {
      active = false;
    };
  }, [slug]);

  const filtered = useMemo(() => {
    let list = products;
    if (queryParam) {
      const q = queryParam.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.brand, p.category, ...(p.tags || [])]
          .join(' ')
          .toLowerCase()
          .includes(q),
      );
    }
    if (filters.brands.length)
      list = list.filter((p) => filters.brands.includes(p.brand));
    if (filters.colors.length)
      list = list.filter((p) => filters.colors.includes(p.color));
    if (filters.priceRange)
      list = list.filter(
        (p) =>
          p.price >= filters.priceRange.min && p.price <= filters.priceRange.max,
      );
    if (filters.minRating > 0)
      list = list.filter((p) => p.rating >= filters.minRating);
    if (filters.onlyPromo)
      list = list.filter((p) => p.originalPrice && p.originalPrice > p.price);
    return sortProducts(list, sort);
  }, [products, filters, sort, queryParam]);

  return (
    <div className="container-page py-8 lg:py-12">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-charcoal-400">
        <Link to="/" className="hover:text-sage-700">
          Beranda
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/kategori" className="hover:text-sage-700">
          Semua Produk
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span className="text-charcoal-700">{category.name}</span>
          </>
        )}
        {queryParam && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span className="text-charcoal-700">"{queryParam}"</span>
          </>
        )}
      </nav>

      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
            {queryParam
              ? `Hasil pencarian`
              : category
                ? category.tagline
                : 'Katalog lengkap'}
          </p>
          <h1 className="mt-1 font-display text-3xl text-charcoal-800 sm:text-4xl">
            {queryParam
              ? `"${queryParam}"`
              : category?.name || 'Semua Produk'}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-charcoal-500">
            {category?.description ||
              'Telusuri koleksi pecah belah dan home living terkurasi dari pengrajin lokal terbaik.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal-100 bg-white px-4 py-2.5 text-xs font-medium text-charcoal-700 lg:hidden"
          >
            <Filter className="h-4 w-4" /> Filter
          </button>
          <SortDropdown value={sort} onChange={setSort} />
          <div className="hidden gap-1 rounded-full border border-charcoal-100 bg-white p-1 sm:inline-flex">
            <button
              type="button"
              onClick={() => setLayout('grid')}
              className={cn(
                'grid h-8 w-8 place-items-center rounded-full transition',
                layout === 'grid' ? 'bg-charcoal-800 text-white' : 'text-charcoal-500',
              )}
              aria-label="Tampilan grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setLayout('list')}
              className={cn(
                'grid h-8 w-8 place-items-center rounded-full transition',
                layout === 'list' ? 'bg-charcoal-800 text-white' : 'text-charcoal-500',
              )}
              aria-label="Tampilan list"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Subcategory chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          to="/kategori"
          className={cn(
            'rounded-full border px-4 py-1.5 text-xs font-medium transition',
            !slug
              ? 'border-charcoal-800 bg-charcoal-800 text-white'
              : 'border-charcoal-100 bg-white text-charcoal-600 hover:border-sage-300',
          )}
        >
          Semua
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/kategori/${c.slug}`}
            className={cn(
              'rounded-full border px-4 py-1.5 text-xs font-medium transition',
              slug === c.slug
                ? 'border-charcoal-800 bg-charcoal-800 text-white'
                : 'border-charcoal-100 bg-white text-charcoal-600 hover:border-sage-300',
            )}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar
            products={products}
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(initialFilters())}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between text-xs text-charcoal-500">
            <span>
              Menampilkan{' '}
              <span className="font-semibold text-charcoal-700">
                {filtered.length}
              </span>{' '}
              produk
            </span>
            {queryParam && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="text-charcoal-500 underline-offset-2 hover:text-sage-700 hover:underline"
              >
                Hapus pencarian
              </button>
            )}
          </div>
          <ProductGrid
            products={filtered}
            loading={loading}
            layout={layout}
            emptyAction={
              <Button onClick={() => setFilters(initialFilters())}>
                Reset filter
              </Button>
            }
          />
        </div>
      </div>

      <Drawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        side="left"
        title="Filter Produk"
        footer={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setFilters(initialFilters())}
            >
              Reset
            </Button>
            <Button fullWidth onClick={() => setMobileFilterOpen(false)}>
              Terapkan
            </Button>
          </div>
        }
      >
        <FilterSidebar
          products={products}
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(initialFilters())}
          embedded
        />
      </Drawer>
    </div>
  );
}
