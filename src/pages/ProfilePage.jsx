import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Package, User, LogOut, ChevronRight, CheckCircle2, Clock, Truck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOrderStore } from '@/context/OrderContext';
import { formatCurrency } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { orders } = useOrderStore();
  const [activeTab, setActiveTab] = useState(() => {
    // If we have user role info, admin should default to settings
    return user?.role === 'admin' ? 'settings' : 'orders';
  }); // 'orders' or 'settings'

  // This route is already wrapped in <ProtectedRoute>, but keep a declarative
  // guard as defense-in-depth. Using <Navigate> avoids calling navigate()
  // during render (which triggers a React state-update-in-render warning).
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Diproses': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Dikirim': return <Truck className="h-4 w-4 text-blue-500" />;
      case 'Selesai': return <CheckCircle2 className="h-4 w-4 text-sage-600" />;
      default: return null;
    }
  };

  return (
    <div className="container-page py-12 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        
        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-2xl font-bold text-sage-700">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-semibold text-charcoal-800">{user.name}</h2>
                <p className="text-sm text-charcoal-500">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 rounded-3xl bg-white p-4 shadow-soft">
            {user?.role !== 'admin' && (
              <button
                onClick={() => setActiveTab('orders')}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === 'orders'
                    ? 'bg-sage-50 text-sage-700'
                    : 'text-charcoal-600 hover:bg-cream-100',
                )}
              >
                <Package className="h-5 w-5" />
                Pesanan Saya
              </button>
            )}
            <button
              onClick={() => setActiveTab('settings')}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'settings'
                  ? 'bg-sage-50 text-sage-700'
                  : 'text-charcoal-600 hover:bg-cream-100',
              )}
            >
              <User className="h-5 w-5" />
              Pengaturan Akun
            </button>
            <hr className="my-2 border-charcoal-100" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50"
            >
              <LogOut className="h-5 w-5" />
              Keluar
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main>
          {activeTab === 'orders' ? (
            <div className="space-y-6">
              <h1 className="font-display text-2xl text-charcoal-800">Pesanan Saya</h1>
              
              {orders.length === 0 ? (
                <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
                  <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cream-100 text-charcoal-400">
                    <Package className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-medium text-charcoal-800">Belum ada pesanan</h3>
                  <p className="mb-6 text-sm text-charcoal-500">Anda belum melakukan pembelian apapun.</p>
                  <Link
                    to="/kategori"
                    className="inline-flex rounded-full bg-sage-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-700"
                  >
                    Mulai Belanja
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="overflow-hidden rounded-3xl bg-white shadow-soft"
                    >
                      <div className="border-b border-charcoal-100 bg-cream-50/50 px-6 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-xs text-charcoal-500">
                              {new Date(order.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                            <p className="font-medium text-charcoal-800">
                              Order ID: {order.id}
                            </p>
                          </div>
                          <div className={cn(
                            "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                            order.status === 'Diproses' ? 'bg-amber-100 text-amber-800' :
                            order.status === 'Dikirim' ? 'bg-blue-100 text-blue-800' :
                            'bg-sage-100 text-sage-800'
                          )}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-6">
                          <div className="flex flex-1 items-center gap-4">
                            <div className="flex -space-x-4">
                              {order.items.slice(0, 3).map((item) => (
                                <img
                                  key={item.id}
                                  src={item.image}
                                  alt=""
                                  className="h-16 w-16 rounded-2xl border-2 border-white object-cover shadow-sm"
                                />
                              ))}
                              {order.items.length > 3 && (
                                <div className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-white bg-cream-100 text-sm font-medium text-charcoal-600 shadow-sm">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-charcoal-800">
                                {order.items[0].name} {order.items.length > 1 && `dan ${order.items.length - 1} barang lainnya`}
                              </p>
                              <p className="text-sm text-charcoal-500">
                                Total: {formatCurrency(order.total)}
                              </p>
                            </div>
                          </div>
                          <Link
                            to={`/pesanan/${order.id}`}
                            className="inline-flex items-center gap-1 rounded-full border border-charcoal-200 px-4 py-2 text-sm font-medium text-charcoal-700 transition hover:bg-cream-50"
                          >
                            Lihat Detail <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h1 className="font-display text-2xl text-charcoal-800">Pengaturan Akun</h1>
              <div className="rounded-3xl bg-white p-8 shadow-soft">
                <p className="text-charcoal-500">Fitur pengaturan akun sedang dalam pengembangan.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
