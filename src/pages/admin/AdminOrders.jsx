import { useState } from 'react';
import { useOrderStore } from '@/context/OrderContext';
import { useToast } from '@/context/ToastContext';
import { formatCurrency } from '@/utils/formatCurrency';

export default function AdminOrders() {
  const orders = useOrderStore((state) => state.orders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const toast = useToast();

  const handleStatusChange = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
    toast.success('Status Diperbarui', `Pesanan ${id} sekarang berstatus "${newStatus}".`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display text-charcoal-800">Manajemen Pesanan</h2>
        <p className="text-sm text-charcoal-500">Kelola dan perbarui status pesanan pelanggan.</p>
      </div>

      <div className="rounded-3xl bg-white shadow-soft overflow-hidden">
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal-100 text-charcoal-400">
              <tr>
                <th className="pb-3 font-medium">Order ID / Tanggal</th>
                <th className="pb-3 font-medium">Pelanggan</th>
                <th className="pb-3 font-medium">Total Harga</th>
                <th className="pb-3 font-medium">Barang</th>
                <th className="pb-3 font-medium">Status & Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-50">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4">
                    <p className="font-semibold text-charcoal-800">{order.id}</p>
                    <p className="text-xs text-charcoal-500">
                      {new Date(order.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </td>
                  <td className="py-4">
                    <p className="font-medium text-charcoal-800">{order.customer.fullName}</p>
                    <p className="text-xs text-charcoal-500">{order.customer.city}</p>
                  </td>
                  <td className="py-4 font-semibold text-charcoal-800">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-4 text-xs text-charcoal-600">
                    <ul className="list-inside list-disc">
                      {order.items.map((i) => (
                        <li key={i.id}>{i.name} ({i.quantity}x)</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="rounded-xl border border-charcoal-200 bg-sage-50 px-3 py-1.5 text-xs font-semibold text-sage-800 focus:border-sage-500 focus:outline-none"
                    >
                      <option value="Diproses">Diproses</option>
                      <option value="Dikirim">Dikirim</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="mt-4 text-center text-sm text-charcoal-500">
              Belum ada pesanan yang masuk.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
