import { useProductStore } from '@/context/ProductContext';
import { useOrderStore } from '@/context/OrderContext';
import { Package, ShoppingCart, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function AdminDashboard() {
  const products = useProductStore((state) => state.products);
  const orders = useOrderStore((state) => state.orders);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  // Simple greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 19 ? 'Selamat Sore' : 'Selamat Malam';

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="mx-auto max-w-5xl space-y-8"
    >
      <motion.header variants={item} className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-sage-600">{greeting},</p>
          <h2 className="mt-1 text-3xl font-display text-charcoal-900">Ikhtisar Tokomu</h2>
          <p className="mt-1 text-sm text-charcoal-500">Pantau performa dan pesanan terbaru hari ini.</p>
        </div>
      </motion.header>

      <motion.div variants={item} className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        <StatCard
          title="Total Pendapatan"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          trend="+12% bulan ini"
          color="bg-sage-600 text-white"
          iconBg="bg-white/20 text-white"
        />
        <StatCard
          title="Pesanan Masuk"
          value={totalOrders}
          icon={ShoppingCart}
          trend="Perlu diproses"
          color="bg-white text-charcoal-900"
          iconBg="bg-cream-100 text-charcoal-600"
          border
        />
        <StatCard
          title="Total Produk"
          value={totalProducts}
          icon={Package}
          trend="Katalog aktif"
          color="bg-white text-charcoal-900"
          iconBg="bg-sage-50 text-sage-600"
          border
        />
      </motion.div>

      <motion.div variants={item} className="rounded-[2rem] border border-charcoal-100 bg-white shadow-soft overflow-hidden">
        <div className="flex items-center justify-between border-b border-charcoal-100 bg-charcoal-50/50 p-6">
          <div>
            <h3 className="font-display text-lg text-charcoal-900">Pesanan Terbaru</h3>
            <p className="text-xs text-charcoal-500">5 pesanan terakhir yang masuk.</p>
          </div>
          <Link to="/admin/pesanan" className="group flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-semibold text-charcoal-700 shadow-sm transition hover:bg-sage-50 hover:text-sage-700">
            Lihat Semua <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-sage-50 text-sage-300">
              <Package className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium text-charcoal-600">Belum ada pesanan.</p>
            <p className="text-xs text-charcoal-400">Pesanan yang dibuat pelanggan akan muncul di sini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto p-2">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 font-semibold text-charcoal-500">ID Pesanan</th>
                  <th className="px-4 py-3 font-semibold text-charcoal-500">Pelanggan</th>
                  <th className="px-4 py-3 font-semibold text-charcoal-500">Status</th>
                  <th className="px-4 py-3 font-semibold text-charcoal-500 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-sage-50/30">
                    <td className="whitespace-nowrap px-4 py-4">
                      <p className="font-semibold text-charcoal-800">{order.id}</p>
                      <p className="text-[11px] text-charcoal-400">
                        {new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <p className="font-medium text-charcoal-800">{order.customer.fullName}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide",
                        order.status === 'Diproses' ? 'bg-orange-100 text-orange-700' : 
                        order.status === 'Dikirim' ? 'bg-blue-100 text-blue-700' : 
                        'bg-sage-100 text-sage-700'
                      )}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-charcoal-800">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color, iconBg, border }) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-[2rem] p-6 shadow-soft transition-transform hover:-translate-y-1",
      color,
      border && "border border-charcoal-100"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className={cn("grid h-12 w-12 place-items-center rounded-2xl", iconBg)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-1.5 text-xs font-medium opacity-75">
        <TrendingUp className="h-3.5 w-3.5" />
        {trend}
      </div>
    </div>
  );
}
