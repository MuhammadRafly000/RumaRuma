import { useMemo } from 'react';
import { Sparkles, Tag, X } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

const PRICE_RANGES = [
  { label: 'Di bawah Rp 100rb', min: 0, max: 100_000 },
  { label: 'Rp 100rb – 200rb', min: 100_000, max: 200_000 },
  { label: 'Rp 200rb – 400rb', min: 200_000, max: 400_000 },
  { label: 'Di atas Rp 400rb', min: 400_000, max: Infinity },
];

export default function FilterSidebar({
  products = [],
  filters,
  onChange,
  onReset,
  embedded = false,
}) {
  const brands = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p.brand, (map.get(p.brand) || 0) + 1));
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const colors = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p.color, (map.get(p.color) || 0) + 1));
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const materials = useMemo(() => {
    const map = new Map();
    products.forEach((p) => p.material && map.set(p.material, (map.get(p.material) || 0) + 1));
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const toggleArray = (key, value) => {
    const next = new Set(filters[key]);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    onChange({ ...filters, [key]: Array.from(next) });
  };

  const setRange = (range) => onChange({ ...filters, priceRange: range });

  const setRating = (rating) =>
    onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating });

  const setOnlyPromo = (v) => onChange({ ...filters, onlyPromo: v });

  return (
    <aside
      className={cn(
        'flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-soft',
        embedded ? '' : 'sticky top-28',
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-lg text-charcoal-800">
          <Sparkles className="h-5 w-5 text-sage-600" /> Filter
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-charcoal-400 hover:text-charcoal-700"
        >
          Reset
        </button>
      </div>

      <FilterGroup title="Brand">
        <div className="flex flex-col gap-1.5">
          {brands.map((b) => (
            <label
              key={b.name}
              className="flex cursor-pointer items-center justify-between gap-2 text-sm text-charcoal-700 hover:text-sage-700"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-charcoal-200 text-sage-600 focus:ring-sage-400"
                  checked={filters.brands.includes(b.name)}
                  onChange={() => toggleArray('brands', b.name)}
                />
                {b.name}
              </span>
              <span className="text-xs text-charcoal-300">{b.count}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rentang Harga">
        <div className="flex flex-col gap-1.5">
          {PRICE_RANGES.map((r) => {
            const active =
              filters.priceRange?.min === r.min && filters.priceRange?.max === r.max;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => setRange(active ? null : r)}
                className={cn(
                  'flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition',
                  active
                    ? 'border-sage-400 bg-sage-50 text-sage-700'
                    : 'border-transparent text-charcoal-600 hover:bg-cream-100',
                )}
              >
                <span>{r.label}</span>
                <span className="text-xs text-charcoal-300">
                  {r.max === Infinity ? '∞' : formatCurrency(r.max)}
                </span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Warna">
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const active = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleArray('colors', c.name)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs transition',
                  active
                    ? 'border-sage-500 bg-sage-100 text-sage-800'
                    : 'border-charcoal-100 text-charcoal-600 hover:border-sage-300',
                )}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Material">
        <div className="flex flex-col gap-1.5">
          {materials.map((m) => (
            <label
              key={m.name}
              className="flex cursor-pointer items-center justify-between gap-2 text-sm text-charcoal-700 hover:text-sage-700"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-charcoal-200 text-sage-600 focus:ring-sage-400"
                  checked={filters.materials?.includes(m.name)}
                  onChange={() => toggleArray('materials', m.name)}
                />
                {m.name}
              </span>
              <span className="text-xs text-charcoal-300">{m.count}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div className="flex flex-wrap gap-2">
          {[4.5, 4, 3].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRating(r)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs transition',
                filters.minRating === r
                  ? 'border-sage-500 bg-sage-100 text-sage-800'
                  : 'border-charcoal-100 text-charcoal-600 hover:border-sage-300',
              )}
            >
              {r}+ ★
            </button>
          ))}
        </div>
      </FilterGroup>

      <label className="flex items-center justify-between rounded-2xl bg-cream-100 px-4 py-3 text-sm text-charcoal-700">
        <span className="inline-flex items-center gap-2">
          <Tag className="h-4 w-4 text-rose-500" />
          Hanya tampilkan promo
        </span>
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-charcoal-200 text-sage-600 focus:ring-sage-400"
          checked={filters.onlyPromo}
          onChange={(e) => setOnlyPromo(e.target.checked)}
        />
      </label>

      <ActiveFilters filters={filters} onChange={onChange} />
    </aside>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-400">
        {title}
      </h4>
      {children}
    </div>
  );
}

function ActiveFilters({ filters, onChange }) {
  const items = [];
  filters.brands.forEach((b) =>
    items.push({
      label: b,
      onRemove: () =>
        onChange({ ...filters, brands: filters.brands.filter((x) => x !== b) }),
    }),
  );
  filters.colors.forEach((c) =>
    items.push({
      label: c,
      onRemove: () =>
        onChange({ ...filters, colors: filters.colors.filter((x) => x !== c) }),
    }),
  );
  filters.materials?.forEach((m) =>
    items.push({
      label: m,
      onRemove: () =>
        onChange({ ...filters, materials: filters.materials.filter((x) => x !== m) }),
    }),
  );
  if (filters.priceRange)
    items.push({
      label: `≤ ${
        filters.priceRange.max === Infinity
          ? '∞'
          : formatCurrency(filters.priceRange.max)
      }`,
      onRemove: () => onChange({ ...filters, priceRange: null }),
    });
  if (filters.minRating > 0)
    items.push({
      label: `${filters.minRating}+ ★`,
      onRemove: () => onChange({ ...filters, minRating: 0 }),
    });
  if (filters.onlyPromo)
    items.push({
      label: 'Promo',
      onRemove: () => onChange({ ...filters, onlyPromo: false }),
    });

  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2 border-t border-charcoal-100 pt-4">
      {items.map((it, i) => (
        <button
          key={i}
          type="button"
          onClick={it.onRemove}
          className="inline-flex items-center gap-1 rounded-full bg-sage-100 px-2.5 py-1 text-xs text-sage-800 hover:bg-sage-200"
        >
          {it.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}
