import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  CreditCard,
  MapPin,
  ShoppingBag,
  Truck,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { useCartStore, useCartTotals } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatCurrency } from '@/utils/formatCurrency';
import cn from '@/utils/classNames';

const SHIPPING_OPTIONS = [
  {
    id: 'regular',
    title: 'Reguler',
    eta: '2–4 hari',
    price: 18_000,
    icon: Truck,
  },
  {
    id: 'sameday',
    title: 'Same Day Jabodetabek',
    eta: 'Hari ini',
    price: 35_000,
    icon: Sparkles,
  },
  {
    id: 'pickup',
    title: 'Pickup di Studio Kemang',
    eta: 'Atur jadwal',
    price: 0,
    icon: Building2,
  },
];

const PAYMENT_OPTIONS = [
  { id: 'va', title: 'Virtual Account', icon: Building2, desc: 'BCA · BNI · Mandiri' },
  { id: 'card', title: 'Kartu Kredit/Debit', icon: CreditCard, desc: 'Visa, Mastercard, JCB' },
  { id: 'ewallet', title: 'E-Wallet', icon: Wallet, desc: 'GoPay · OVO · DANA' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const clear = useCartStore((s) => s.clear);
  const { items, subtotal } = useCartTotals();

  const [shipping, setShipping] = useState('regular');
  const [payment, setPayment] = useState('va');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Jakarta Selatan',
    postal: '',
    note: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const shippingFee =
    SHIPPING_OPTIONS.find((s) => s.id === shipping)?.price ?? 0;
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Tidak ada produk untuk di-checkout"
          description="Tambahkan produk ke keranjang dulu sebelum melanjutkan."
          action={
            <Button as={Link} to="/kategori">
              Belanja sekarang
            </Button>
          }
        />
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address) {
      toast.error('Lengkapi data pengiriman', 'Nama, nomor HP, dan alamat wajib diisi.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      clear();
      toast.success(
        'Pesanan diterima!',
        'Kami sudah kirim instruksi pembayaran ke email kamu.',
      );
      navigate('/');
      setSubmitting(false);
    }, 1200);
  };

  return (
    <form onSubmit={submit} className="container-page py-10">
      <h1 className="mb-2 font-display text-3xl text-charcoal-800 sm:text-4xl">
        Checkout
      </h1>
      <p className="mb-8 text-sm text-charcoal-500">
        Selangkah lagi untuk membuat rumahmu makin hangat.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Section title="Alamat Pengiriman" icon={MapPin}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Nama Lengkap"
                name="fullName"
                value={form.fullName}
                onChange={handle('fullName')}
                required
              />
              <Input
                label="Nomor HP"
                name="phone"
                inputMode="tel"
                value={form.phone}
                onChange={handle('phone')}
                required
              />
              <div className="sm:col-span-2">
                <Input
                  label="Alamat Lengkap"
                  name="address"
                  value={form.address}
                  onChange={handle('address')}
                  required
                />
              </div>
              <Input
                label="Kota"
                name="city"
                value={form.city}
                onChange={handle('city')}
                required
              />
              <Input
                label="Kode Pos"
                name="postal"
                value={form.postal}
                onChange={handle('postal')}
              />
              <div className="sm:col-span-2">
                <Input
                  label="Catatan untuk kurir (opsional)"
                  name="note"
                  value={form.note}
                  onChange={handle('note')}
                  placeholder="Misal: titip ke security blok B"
                />
              </div>
            </div>
          </Section>

          <Section title="Metode Pengiriman" icon={Truck}>
            <div className="grid gap-3 sm:grid-cols-3">
              {SHIPPING_OPTIONS.map((s) => (
                <SelectableCard
                  key={s.id}
                  active={shipping === s.id}
                  onClick={() => setShipping(s.id)}
                  icon={s.icon}
                  title={s.title}
                  desc={s.eta}
                  right={s.price === 0 ? 'Gratis' : formatCurrency(s.price)}
                />
              ))}
            </div>
          </Section>

          <Section title="Metode Pembayaran" icon={CreditCard}>
            <div className="grid gap-3 sm:grid-cols-3">
              {PAYMENT_OPTIONS.map((p) => (
                <SelectableCard
                  key={p.id}
                  active={payment === p.id}
                  onClick={() => setPayment(p.id)}
                  icon={p.icon}
                  title={p.title}
                  desc={p.desc}
                />
              ))}
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="font-display text-xl text-charcoal-800">
              Ringkasan Pesanan
            </h2>
            <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.id} className="flex items-center gap-3">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-charcoal-700">
                      {i.name}
                    </p>
                    <p className="text-xs text-charcoal-400">{i.quantity}× pcs</p>
                  </div>
                  <span className="text-sm font-semibold text-charcoal-800">
                    {formatCurrency(i.price * i.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-charcoal-100 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-charcoal-500">Subtotal</dt>
                <dd className="font-semibold text-charcoal-800">
                  {formatCurrency(subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal-500">Ongkir</dt>
                <dd className="font-semibold text-charcoal-800">
                  {shippingFee === 0 ? 'Gratis' : formatCurrency(shippingFee)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-charcoal-100 pt-3">
                <dt className="font-medium text-charcoal-700">Total</dt>
                <dd className="font-display text-2xl text-charcoal-800">
                  {formatCurrency(total)}
                </dd>
              </div>
            </dl>
            <Button
              type="submit"
              size="lg"
              fullWidth
              className="mt-5"
              disabled={submitting}
            >
              {submitting ? 'Memproses...' : 'Buat Pesanan'}
            </Button>
            <p className="mt-3 text-center text-[11px] text-charcoal-400">
              Dengan menekan tombol di atas kamu setuju dengan{' '}
              <Link to="/kategori" className="underline">
                Syarat & Ketentuan
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-6 shadow-soft"
    >
      <header className="mb-5 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-sage-100 text-sage-700">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="font-display text-lg text-charcoal-800">{title}</h3>
      </header>
      {children}
    </motion.section>
  );
}

function SelectableCard({ active, onClick, icon: Icon, title, desc, right }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-full items-start gap-3 rounded-2xl border p-4 text-left transition',
        active
          ? 'border-sage-500 bg-sage-50 shadow-soft'
          : 'border-charcoal-100 bg-white hover:border-sage-300',
      )}
    >
      <span
        className={cn(
          'grid h-9 w-9 place-items-center rounded-full',
          active ? 'bg-sage-600 text-white' : 'bg-cream-100 text-charcoal-600',
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-charcoal-700">{title}</p>
        <p className="text-xs text-charcoal-400">{desc}</p>
      </div>
      {right && <span className="text-xs font-semibold text-sage-700">{right}</span>}
    </button>
  );
}
