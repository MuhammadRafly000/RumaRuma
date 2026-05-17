import { useProductStore } from '@/context/ProductContext';
import { useOrderStore } from '@/context/OrderContext';
import { Package, ShoppingCart, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';

export default function AdminDashboard() {
  const products = useProductStore((state) => state.products);
  const orders = useOrderStore((state) => state.orders);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display text-charcoal-800">Ringkasan Toko</h2>
        <p className="text-sm text-charcoal-500">Pantau performa tokomu hari ini.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-100 text-sage-600">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal-500">Total Pendapatan</p>
              <p className="text-2xl font-bold text-charcoal-900">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cream-100 text-charcoal-600">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal-500">Total Pesanan</p>
              <p className="text-2xl font-bold text-charcoal-900">{totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-50 border border-sage-100 text-sage-700">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal-500">Total Produk</p>
              <p className="text-2xl font-bold text-charcoal-900">{totalProducts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <h3 className="mb-4 font-display text-lg text-charcoal-800">Pesanan Terbaru</h3>
        {orders.length === 0 ? (
          <p className="text-sm text-charcoal-500">Belum ada pesanan masuk.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-charcoal-100 text-charcoal-400">
                <tr>
                  <th className="pb-3 font-medium">ID Pesanan</th>
                  <th className="pb-3 font-medium">Tanggal</th>
                  <th className="pb-3 font-medium">Pelanggan</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 font-medium text-charcoal-800">{order.id}</td>
                    <td className="py-4 text-charcoal-500">
                      {new Date(order.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-4 text-charcoal-800">{order.customer.fullName}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-semibold text-sage-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-charcoal-800">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
