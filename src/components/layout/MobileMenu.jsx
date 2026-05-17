import { Link, NavLink } from 'react-router-dom';
import { Heart, LogIn, Mail, MapPin, ShoppingBag, User } from 'lucide-react';
import Drawer from '@/components/ui/Drawer.jsx';
import Logo from './Logo.jsx';
import { NAV_LINKS, DEFAULT_LOCATION } from '@/config/constants';
import { useAuth } from '@/context/AuthContext';
import cn from '@/utils/classNames';

export default function MobileMenu({ open, onClose }) {
  const { isAuthenticated, user, logout } = useAuth();
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
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'rounded-2xl px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'bg-sage-100 text-sage-800'
                  : 'text-charcoal-700 hover:bg-cream-100',
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
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

      <div className="mt-6 rounded-3xl bg-sage-50 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-sage-600 text-white">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-charcoal-900">
              {isAuthenticated ? `Halo, ${user?.name}` : 'Tamu'}
            </p>
            <p className="text-xs text-charcoal-500">
              {isAuthenticated ? user?.email : 'Login untuk simpan keranjang & wishlist.'}
            </p>
          </div>
        </div>
      </div>

      <a
        href="mailto:halo@rumaruma.id"
        className="mt-6 flex items-center gap-2 rounded-2xl border border-charcoal-100 px-4 py-3 text-xs text-charcoal-600"
      >
        <Mail className="h-4 w-4" /> halo@rumaruma.id
      </a>
    </Drawer>
  );
}
