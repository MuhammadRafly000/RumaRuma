import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import Logo from '@/components/layout/Logo.jsx';
import cn from '@/utils/classNames';

const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/produk', label: 'Manajemen Produk', icon: Package },
  { to: '/admin/pesanan', label: 'Pesanan Masuk', icon: ShoppingCart },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-sage-50">
      {/* Sidebar */}
      <aside className="fixed bottom-0 left-0 top-0 w-64 border-r border-charcoal-100 bg-white shadow-soft">
        <div className="flex h-20 items-center px-6">
          <Logo />
        </div>
        
        <div className="px-4 py-6">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
            Menu Admin
          </p>
          <nav className="flex flex-col gap-2">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/admin'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-sage-600 text-white shadow-md'
                        : 'text-charcoal-600 hover:bg-sage-100 hover:text-sage-800'
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-charcoal-100 p-4">
          <button
            onClick={() => navigate('/')}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Kembali ke Toko
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1">
        <div className="h-20 border-b border-charcoal-100 bg-white px-8 flex items-center justify-between">
          <h1 className="font-display text-xl text-charcoal-800">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sage-200" />
            <span className="text-sm font-medium text-charcoal-700">Admin RumaRuma</span>
          </div>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
