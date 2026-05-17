import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, FileText, Banknote, Truck, Inbox, Star } from 'lucide-react';
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

  // Calculate active step index based on current status
  const getActiveStepIndex = () => {
    if (order.status === 'Selesai') return 4;
    if (order.status === 'Dikirim') return 2;
    return 1; // 'Diproses' covers placed and paid
  };

  const activeIndex = getActiveStepIndex();

  const formatDate = (dateString, offsetHours = 0) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setHours(date.getHours() + offsetHours);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).replace(/\//g, '-');
  };

  const steps = [
    { 
      label: 'Pesanan Dibuat', 
      icon: FileText, 
      date: formatDate(order.date, 0)
    },
    { 
      label: 'Pesanan Dibayar', 
      icon: Banknote, 
      date: formatDate(order.date, 0.5) 
    },
    { 
      label: 'Pesanan Dikirim', 
      icon: Truck, 
      date: activeIndex >= 2 ? formatDate(order.date, 24) : null 
    },
    { 
      label: 'Pesanan Diterima', 
      icon: Inbox, 
      date: activeIndex >= 4 ? formatDate(order.date, 48) : null 
    },
    { 
      label: 'Pesanan Selesai', 
      icon: Star, 
      date: activeIndex >= 4 ? formatDate(order.date, 49) : null 
    },
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
          <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8 overflow-x-auto overflow-y-hidden hide-scrollbar">
            <h3 className="mb-8 font-semibold text-charcoal-800 text-lg sticky left-0">Status Pengiriman</h3>
            
            <div className="relative min-w-[600px] px-2 pb-4">
              {/* Progress Bar Background */}
              <div className="absolute left-10 right-10 top-6 h-1 bg-charcoal-100 rounded-full" />
              
              {/* Active Progress Bar */}
              <motion.div 
                className="absolute left-10 top-6 h-1 bg-sage-500 rounded-full origin-left"
                initial={{ width: 0 }}
                animate={{ width: `calc(${(activeIndex / (steps.length - 1)) * 100}% - ${activeIndex === 0 ? 0 : 20}px)` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />

              <div className="relative flex justify-between">
                {steps.map((step, i) => {
                  const isActive = i <= activeIndex;
                  const isCurrent = i === activeIndex;
                  const Icon = step.icon;

                  return (
                    <div key={i} className="flex flex-col items-center group w-24">
                      {/* Icon Circle */}
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.15, duration: 0.3 }}
                        className={cn(
                          "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] bg-white transition-all duration-500",
                          isActive 
                            ? "border-sage-500 text-sage-600 shadow-md" 
                            : "border-charcoal-200 text-charcoal-300 bg-charcoal-50"
                        )}
                      >
                        <Icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} strokeWidth={isActive ? 2.5 : 2} />
                        
                        {/* Pulse effect for current active step */}
                        {isCurrent && order.status !== 'Selesai' && (
                          <span className="absolute -z-10 inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-30"></span>
                        )}
                      </motion.div>

                      {/* Text Content */}
                      <div className="mt-4 text-center">
                        <span className={cn(
                          "block text-xs font-semibold transition-colors duration-300",
                          isActive ? "text-charcoal-800" : "text-charcoal-400"
                        )}>
                          {step.label}
                        </span>
                        
                        {/* Date */}
                        <div className={cn(
                          "mt-1 text-[10px] sm:text-xs transition-all duration-300 font-medium",
                          isActive ? "text-charcoal-400 opacity-100" : "opacity-0 translate-y-2"
                        )}>
                          {step.date || '\u00A0'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {order.status === 'Dikirim' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 rounded-2xl bg-sage-50 border border-sage-100 p-5 text-sm text-sage-900 sticky left-0"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sage-200/50 rounded-lg shrink-0">
                    <Truck className="h-5 w-5 text-sage-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-sage-800">Resi JNE: JNE88291029381</p>
                    <p className="mt-1 text-sage-700/80">Pesanan Anda sedang dalam perjalanan menuju alamat pengiriman. Kurir akan segera menghubungi Anda jika sudah dekat.</p>
                  </div>
                </div>
              </motion.div>
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
