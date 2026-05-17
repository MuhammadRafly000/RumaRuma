import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import Button from '@/components/ui/Button.jsx';
import { useWishlistStore } from '@/context/WishlistContext';
import { useCartStore } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useProductStore } from '@/context/ProductContext';

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const clear = useWishlistStore((s) => s.clear);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toast = useToast();

  const products = useProductStore((state) => state.products);
  const wishlist = useMemo(
    () => products.filter((p) => ids.includes(p.id)),
    [ids, products],
  );

  const addAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((p) => addItem(p, 1));
    toast.success(`${wishlist.length} produk ditambahkan ke keranjang`);
    openCart();
  };

  return (
    <div className="container-page py-10">
      <header className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
            Disimpan untuk nanti
          </p>
          <h1 className="mt-1 font-display text-3xl text-charcoal-800 sm:text-4xl">
            Wishlist ({wishlist.length})
          </h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Daftar barang yang kamu suka, siap dibeli kapan saja.
          </p>
        </div>
        {wishlist.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={clear}>
              Kosongkan
            </Button>
            <Button onClick={addAllToCart}>
              <ShoppingBag className="h-4 w-4" /> Masukkan semua ke keranjang
            </Button>
          </div>
        )}
      </header>

      {wishlist.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Wishlist masih kosong"
          description="Tekan ikon hati di setiap produk untuk menyimpannya di sini."
          action={
            <Button as={Link} to="/kategori">
              Jelajahi koleksi
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
