import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Bell, ChevronDown, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/layout/Logo.jsx';
import cn from '@/utils/classNames';
import { useOrderStore } from '@/context/OrderContext';

const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/produk', label: 'Manajemen Produk', icon: Package },
  { to: '/admin/pesanan', label: 'Pesanan Masuk', icon: ShoppingCart },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const orders = useOrderStore((state) => state.orders);
  
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  
  // Calculate unread notifications
  const newOrders = orders.filter((o) => o.status === 'Diproses');
  const hasNotif = newOrders.length > 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen bg-sage-50"
    >
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-charcoal-900/20 backdrop-blur-sm lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed bottom-0 left-0 top-0 z-50 w-64 border-r border-charcoal-100 bg-white shadow-soft transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-20 items-center justify-between px-6">
          <Logo />
          <button 
            className="lg:hidden rounded-lg p-2 text-charcoal-500 hover:bg-sage-50"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
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
                  onClick={() => setSidebarOpen(false)}
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
      <main className="flex-1 lg:ml-64 w-full max-w-full overflow-hidden transition-all duration-300">
        <div className="h-20 border-b border-charcoal-100 bg-white px-4 md:px-8 flex items-center justify-between z-30 relative">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden rounded-lg p-2 text-charcoal-600 hover:bg-sage-50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="font-display text-lg md:text-xl text-charcoal-800">Admin Panel</h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-5">
            
            {/* Notification Bell Dropdown */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="relative text-charcoal-400 hover:text-charcoal-700 transition flex items-center justify-center h-10 w-10 rounded-full hover:bg-sage-50"
              >
                <Bell className="h-5 w-5" />
                {hasNotif && <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white p-2 shadow-elevated border border-charcoal-50 origin-top-right z-50"
                  >
                    <div className="px-3 py-2 border-b border-charcoal-50 mb-1 flex items-center justify-between">
                      <p className="text-sm font-semibold text-charcoal-800">Notifikasi</p>
                      {hasNotif && <span className="text-xs font-medium text-sage-600">{newOrders.length} Baru</span>}
                    </div>
                    {hasNotif ? (
                      <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
                        {newOrders.map((order) => (
                          <Link 
                            key={order.id} 
                            to="/admin/pesanan"
                            onClick={() => setNotifOpen(false)}
                            className="block rounded-xl px-3 py-3 hover:bg-sage-50 transition"
                          >
                            <p className="text-sm font-semibold text-charcoal-800">Pesanan Baru: {order.id}</p>
                            <p className="text-xs text-charcoal-500 mt-1">
                              {order.customer.fullName} memesan {order.items.length} macam barang.
                            </p>
                            <p className="text-[10px] text-sage-600 font-medium mt-2 uppercase tracking-wide">Tunggu Diproses</p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <p className="text-xs text-charcoal-500">Tidak ada pesanan baru.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-6 w-px bg-charcoal-100" />
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-3 group rounded-full pr-2 pl-1 py-1 hover:bg-sage-50 transition"
              >
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" 
                  alt="Admin Profile" 
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-sage-200 transition"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-charcoal-800 leading-none">Rizky (Admin)</p>
                  <p className="text-xs text-charcoal-500 mt-1 leading-none">Superadmin</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-charcoal-400 transition ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white p-2 shadow-elevated border border-charcoal-50 origin-top-right z-50"
                  >
                    <Link 
                      to="/profil" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-sage-50 hover:text-sage-800 transition"
                    >
                      <Settings className="h-4 w-4" /> Pengaturan Akun
                    </Link>
                    <div className="my-1 border-t border-charcoal-50" />
                    <button 
                      onClick={() => navigate('/')} 
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="h-4 w-4" /> Keluar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
        
        <div className="p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </motion.div>
  );
}
