import { useState, useRef, useEffect } from 'react';
import { useOrderStore } from '@/context/OrderContext';
import { useToast } from '@/context/ToastContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import cn from '@/utils/classNames';

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

      <div className="rounded-3xl bg-white shadow-soft">
        <div className="p-6">
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
                    <StatusDropdown
                      status={order.status}
                      onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                    />
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

function StatusDropdown({ status, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'Diproses', label: 'Diproses', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
    { value: 'Dikirim', label: 'Dikirim', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { value: 'Selesai', label: 'Selesai', color: 'bg-sage-100 text-sage-700 hover:bg-sage-200' },
  ];

  const currentOption = options.find(o => o.value === status) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex w-[100px] items-center justify-between gap-x-1 rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-colors border",
          currentOption.color,
          isOpen && "ring-2 ring-white ring-offset-1 ring-offset-sage-500"
        )}
      >
        {currentOption.label.toUpperCase()}
        <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} strokeWidth={3} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 z-50 mt-1.5 w-[110px] origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5"
          >
            <div className="space-y-0.5">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors",
                    status === option.value
                      ? "bg-sage-50 text-sage-700"
                      : "text-charcoal-600 hover:bg-charcoal-50 hover:text-charcoal-900"
                  )}
                >
                  {option.label}
                  {status === option.value && <Check className="h-3 w-3 text-sage-600" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
