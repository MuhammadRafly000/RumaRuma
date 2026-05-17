import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  Menu,
  ShoppingBag,
  User,
  ChevronDown,
} from 'lucide-react';
import Logo from './Logo.jsx';
import SearchBar from './SearchBar.jsx';
import MobileMenu from './MobileMenu.jsx';
import CartSidebar from '@/components/cart/CartSidebar.jsx';
import { NAV_LINKS, DEFAULT_LOCATION } from '@/config/constants';
import { useCartStore, useCartTotals } from '@/context/CartContext';
import { useWishlistStore } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import cn from '@/utils/classNames';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isCartOpen = useCartStore((s) => s.isOpen);
  const openCart = useCartStore((s) => s.openCart);
  const closeCart = useCartStore((s) => s.closeCart);
  const { itemCount } = useCartTotals();
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const { isAuthenticated, user } = useAuth();
  const { y } = useScrollPosition();
  const scrolled = y > 12;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled ? 'bg-cream-50/90 backdrop-blur-xl shadow-soft' : 'bg-cream-50',
        )}
      >
        {/* Promo strip */}
        <div className="hidden bg-charcoal-900 text-white sm:block">
          <div className="container-page flex items-center justify-between py-1.5 text-[11px]">
            <p className="opacity-90">
              ✦ Free ongkir min. <span className="font-semibold">Rp 250.000</span> · Garansi
              pecah 100% selama pengiriman
            </p>
            <div className="flex items-center gap-4 opacity-90">
              <Link to="/login" className="hover:text-sage-200">
                Bantuan
              </Link>
              <Link to="/kategori" className="hover:text-sage-200">
                Cek resi
              </Link>
              <Link to="/kategori" className="hover:text-sage-200">
                Jadi reseller
              </Link>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="container-page flex items-center gap-4 py-3 lg:py-4">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-2 text-charcoal-700 transition hover:bg-cream-100 lg:hidden"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Logo className="shrcharcoal-0" />

          <div className="hidden flex-1 lg:block">
            <SearchBar />
          </div>

          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-charcoal-100 bg-white px-3.5 py-2.5 text-xs text-charcoal-700 transition hover:border-sage-300 lg:inline-flex"
          >
            <MapPin className="h-4 w-4 text-sage-600" />
            <span className="text-charcoal-400">Kirim ke</span>
            <span className="font-semibold text-charcoal-800">{DEFAULT_LOCATION}</span>
          </button>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <Link
              to="/wishlist"
              className="relative rounded-full p-2.5 text-charcoal-700 transition hover:bg-cream-100"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full p-2.5 text-charcoal-700 transition hover:bg-cream-100"
              aria-label="Keranjang"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-sage-600 px-1 text-[10px] font-bold text-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
            <Link
              to={isAuthenticated ? '/profil' : '/login'}
              className="hidden items-center gap-2 rounded-full border border-charcoal-100 bg-white px-3 py-2 text-xs font-medium text-charcoal-700 transition hover:border-sage-300 sm:inline-flex"
            >
              <User className="h-4 w-4" />
              {isAuthenticated ? `Hai, ${user?.name?.split(' ')[0]}` : 'Login / Daftar'}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="container-page pb-3 lg:hidden">
          <SearchBar compact />
        </div>

        {/* Category nav row */}
        <nav className="hidden border-t border-charcoal-100 bg-cream-50/80 lg:block">
          <div className="container-page flex items-center gap-2 py-2.5 text-sm">
            {NAV_LINKS.slice(0, 6).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition',
                    isActive
                      ? 'bg-charcoal-900 text-white shadow-soft'
                      : 'text-charcoal-600 hover:bg-white hover:shadow-soft',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="group relative">
              <button className="flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-charcoal-600 transition hover:bg-white hover:shadow-soft">
                Lainnya <ChevronDown className="h-4 w-4" />
              </button>
              
              <div className="absolute left-0 top-full mt-1 hidden w-48 flex-col gap-1 rounded-2xl bg-white p-2 shadow-elevated group-hover:flex">
                <Link to="/inspirasi" className="rounded-xl px-3 py-2 text-sm text-charcoal-600 transition hover:bg-sage-50 hover:text-sage-700">Shop the Look</Link>
                <Link to="/jurnal" className="rounded-xl px-3 py-2 text-sm text-charcoal-600 transition hover:bg-sage-50 hover:text-sage-700">Jurnal & Artikel</Link>
                <Link to="/tentang-kami" className="rounded-xl px-3 py-2 text-sm text-charcoal-600 transition hover:bg-sage-50 hover:text-sage-700">Tentang Kami</Link>
                {user?.role === 'admin' && (
                  <>
                    <div className="my-1 h-px bg-charcoal-50" />
                    <Link to="/admin" className="rounded-xl px-3 py-2 text-sm font-medium text-sage-600 transition hover:bg-sage-50 hover:text-sage-800">Dashboard Admin</Link>
                  </>
                )}
              </div>
            </div>

            <span className="ml-auto hidden text-xs text-charcoal-400 sm:inline">
              Pengrajin lokal · 100% original · Garansi pecah
            </span>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartSidebar open={isCartOpen} onClose={closeCart} />
    </>
  );
}
