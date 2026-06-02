import { Link, NavLink } from 'react-router-dom';
import {
  Heart,
  HelpCircle,
  LogIn,
  Mail,
  MapPin,
  ShoppingBag,
  Store,
  Truck,
  User,
} from 'lucide-react';
import Drawer from '@/components/ui/Drawer.jsx';
import Logo from './Logo.jsx';
import { NAV_LINKS, DEFAULT_LOCATION, BRAND } from '@/config/constants';
import { useAuth } from '@/context/AuthContext';
import cn from '@/utils/classNames';

export default function MobileMenu({
  open,
  onClose,
  onOpenHelp,
  onOpenTrack,
  onOpenReseller,
}) {
  const { isAuthenticated, user, logout } = useAuth();

  const fire = (handler) => () => {
    onClose?.();
    // Slight delay so the drawer close animation completes before modal opens.
    setTimeout(() => handler?.(), 200);
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="left"
      width="max-w-xs"
      title={<Logo />}
      footer={
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2 text-charcoal-500">
            <MapPin className="h-4 w-4 text-sage-600" />
            Kirim ke <span className="font-semibold text-charcoal-800">{DEFAULT_LOCATION}</span>
          </div>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="btn-secondary"
            >
              Keluar
            </button>
          ) : (
            <Link to="/login" onClick={onClose} className="btn-primary">
              <LogIn className="h-4 w-4" />
              Masuk / Daftar
            </Link>
          )}
        </div>
      }
    >
      <nav className="flex flex-col gap-1">
        {NAV_LINKS.slice(0, 6).map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'rounded-full px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'bg-charcoal-900 text-white shadow-soft'
                  : 'text-charcoal-600 hover:bg-white hover:shadow-soft',
              )
            }
          >
            {link.label}
          </NavLink>
        ))}

        <div className="my-2 h-px w-full bg-charcoal-100" />
        <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
          Lainnya
        </p>

        <NavLink
          to="/inspirasi"
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              'rounded-xl px-4 py-3 text-sm font-medium transition',
              isActive ? 'bg-sage-50 text-sage-800' : 'text-charcoal-600 hover:bg-sage-50 hover:text-sage-700'
            )
          }
        >
          Shop the Look
        </NavLink>
        <NavLink
          to="/jurnal"
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              'rounded-xl px-4 py-3 text-sm font-medium transition',
              isActive ? 'bg-sage-50 text-sage-800' : 'text-charcoal-600 hover:bg-sage-50 hover:text-sage-700'
            )
          }
        >
          Jurnal & Artikel
        </NavLink>
        <NavLink
          to="/tentang-kami"
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              'rounded-xl px-4 py-3 text-sm font-medium transition',
              isActive ? 'bg-sage-50 text-sage-800' : 'text-charcoal-600 hover:bg-sage-50 hover:text-sage-700'
            )
          }
        >
          Tentang Kami
        </NavLink>

        {user?.role === 'admin' && (
          <>
            <div className="my-1 h-px w-full bg-charcoal-50" />
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3 text-sm font-medium transition',
                  isActive ? 'bg-sage-100 text-sage-900' : 'text-sage-600 hover:bg-sage-50 hover:text-sage-800'
                )
              }
            >
              Dashboard Admin
            </NavLink>
          </>
        )}
      </nav>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          to="/wishlist"
          onClick={onClose}
          className="flex flex-col items-start gap-2 rounded-2xl bg-cream-100 p-4"
        >
          <Heart className="h-5 w-5 text-sage-600" />
          <span className="text-xs font-semibold text-charcoal-800">Wishlist</span>
        </Link>
        <Link
          to="/keranjang"
          onClick={onClose}
          className="flex flex-col items-start gap-2 rounded-2xl bg-cream-100 p-4"
        >
          <ShoppingBag className="h-5 w-5 text-sage-600" />
          <span className="text-xs font-semibold text-charcoal-800">Keranjang</span>
        </Link>
      </div>

      <Link
        to={isAuthenticated ? "/profil" : "/login"}
        onClick={onClose}
        className="mt-6 block rounded-3xl bg-sage-50 p-4 transition hover:bg-sage-100"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-600 text-white">
            <User className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-charcoal-900">
              {isAuthenticated ? `Halo, ${user?.name}` : 'Tamu'}
            </p>
            <p className="truncate text-xs text-charcoal-500">
              {isAuthenticated ? user?.email : 'Login untuk simpan keranjang & wishlist.'}
            </p>
          </div>
        </div>
      </Link>

      {/* Quick actions — mirror promo strip on desktop */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={fire(onOpenHelp)}
          className="flex flex-col items-start gap-1.5 rounded-2xl border border-charcoal-100 p-3 text-left transition hover:border-sage-300 hover:bg-sage-50"
        >
          <HelpCircle className="h-4 w-4 text-sage-600" />
          <span className="text-[11px] font-semibold leading-tight text-charcoal-800">
            Bantuan
          </span>
        </button>
        <button
          type="button"
          onClick={fire(onOpenTrack)}
          className="flex flex-col items-start gap-1.5 rounded-2xl border border-charcoal-100 p-3 text-left transition hover:border-sage-300 hover:bg-sage-50"
        >
          <Truck className="h-4 w-4 text-sage-600" />
          <span className="text-[11px] font-semibold leading-tight text-charcoal-800">
            Cek resi
          </span>
        </button>
        <button
          type="button"
          onClick={fire(onOpenReseller)}
          className="flex flex-col items-start gap-1.5 rounded-2xl border border-charcoal-100 p-3 text-left transition hover:border-sage-300 hover:bg-sage-50"
        >
          <Store className="h-4 w-4 text-sage-600" />
          <span className="text-[11px] font-semibold leading-tight text-charcoal-800">
            Reseller
          </span>
        </button>
      </div>

      <a
        href={BRAND.emailHref}
        className="mt-4 flex items-center gap-2 rounded-2xl border border-charcoal-100 px-4 py-3 text-xs text-charcoal-600"
      >
        <Mail className="h-4 w-4" /> {BRAND.emailDisplay}
      </a>
    </Drawer>
  );
}
