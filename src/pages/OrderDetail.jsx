import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { useOrderStore } from '@/context/OrderContext';
import { formatCurrency } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getOrder = useOrderStore((s) => s.getOrder);
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="container-page py-16 text-center">
        <h2 className="font-display text-2xl">Pesanan tidak ditemukan</h2>
        <Link to="/profil" className="mt-4 inline-block text-sage-600 hover:underline">
          Kembali ke Profil
        </Link>
      </div>
    );
  }

  const steps = [
    { label: 'Pesanan Diterima', active: true },
    { label: 'Diproses', active: true },
    { label: 'Dikirim', active: order.status === 'Dikirim' || order.status === 'Selesai' },
    { label: 'Selesai', active: order.status === 'Selesai' },
  ];

  return (
    <div className="container-page py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-charcoal-500 hover:text-charcoal-800"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali
      </button>

      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl text-charcoal-800 sm:text-3xl">
            Detail Pesanan
          </h1>
          <p className="mt-1 text-charcoal-500">
            Order ID: <span className="font-medium text-charcoal-700">{order.id}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-charcoal-500">Tanggal Transaksi</p>
          <p className="font-medium text-charcoal-800">
            {new Date(order.date).toLocaleDateString('id-ID', {
              day: 'numeric', month: 'long', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          
          {/* Status Tracker */}
          <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <h3 className="mb-6 font-semibold text-charcoal-800">Status Pengiriman</h3>
            <div className="relative flex justify-between">
              <div className="absolute left-0 top-1/2 -z-10 h-1 w-full -translate-y-1/2 bg-charcoal-100 rounded-full" />
              <div 
                className="absolute left-0 top-1/2 -z-10 h-1 -translate-y-1/2 bg-sage-500 rounded-full transition-all duration-1000"
                style={{ width: order.status === 'Selesai' ? '100%' : order.status === 'Dikirim' ? '66%' : '33%' }}
              />
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={cn(
                    "grid h-8 w-8 place-items-center rounded-full border-2 transition-colors",
                    step.active ? "border-sage-500 bg-sage-500 text-white" : "border-charcoal-200 bg-white text-charcoal-300"
                  )}>
                    {i === 3 ? <CheckCircle2 className="h-4 w-4" /> : i === 2 ? <Truck className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    step.active ? "text-charcoal-800" : "text-charcoal-400"
                  )}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            
            {order.status === 'Dikirim' && (
              <div className="mt-8 rounded-2xl bg-blue-50 p-4 text-sm text-blue-800">
                <p className="font-semibold">Resi JNE: JNE88291029381</p>
                <p className="mt-1">Pesanan Anda sedang dalam perjalanan menuju alamat pengiriman.</p>
              </div>
            )}
          </section>

          {/* Item List */}
          <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <h3 className="mb-6 font-semibold text-charcoal-800">Barang yang Dibeli</h3>
            <div className="space-y-6">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <Link to={`/produk/${item.slug}`} className="shrink-0">
                    <img src={item.image} alt="" className="h-20 w-20 rounded-2xl object-cover shadow-sm" />
                  </Link>
                  <div className="flex flex-1 flex-col py-1">
                    <Link to={`/produk/${item.slug}`} className="font-medium text-charcoal-800 hover:text-sage-700">
                      {item.name}
                    </Link>
                    <p className="text-sm text-charcoal-500">{item.quantity} x {formatCurrency(item.price)}</p>
                    <p className="mt-auto font-semibold text-charcoal-800">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Shipping Info */}
          <section className="rounded-3xl bg-white p-6 shadow-soft">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-charcoal-800">
              <MapPin className="h-4 w-4 text-sage-600" /> Info Pengiriman
            </h3>
            <div className="text-sm text-charcoal-600 space-y-1.5">
              <p className="font-medium text-charcoal-800">{order.customer?.name || 'Customer'}</p>
              <p>{order.customer?.phone || '-'}</p>
              <p className="mt-2 leading-relaxed">{order.customer?.address || 'Alamat tidak tersedia'}</p>
              <p className="mt-2 font-medium text-charcoal-700">Kurir: {order.shippingMethod}</p>
            </div>
          </section>

          {/* Payment Summary */}
          <section className="rounded-3xl bg-white p-6 shadow-soft">
            <h3 className="mb-4 font-semibold text-charcoal-800">Rincian Pembayaran</h3>
            <div className="space-y-3 text-sm text-charcoal-600">
              <div className="flex justify-between">
                <span>Metode Pembayaran</span>
                <span className="font-medium text-charcoal-800">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Harga Barang</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span>{order.shipping > 0 ? formatCurrency(order.shipping) : 'Gratis'}</span>
              </div>
              <hr className="border-charcoal-100" />
              <div className="flex justify-between text-base font-semibold text-charcoal-800">
                <span>Total Belanja</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
