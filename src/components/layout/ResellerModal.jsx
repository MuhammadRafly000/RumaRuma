import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  Mail,
  Phone,
  User,
  MapPin,
  Loader2,
  CheckCircle2,
  Percent,
  TrendingUp,
  Truck,
  Sparkles,
} from 'lucide-react';
import Modal from '@/components/ui/Modal.jsx';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import { useToast } from '@/context/ToastContext';

const BENEFITS = [
  {
    icon: Percent,
    title: 'Diskon hingga 40%',
    desc: 'Harga reseller eksklusif untuk semua koleksi.',
  },
  {
    icon: TrendingUp,
    title: 'Profit margin sehat',
    desc: 'Suggested retail price terstandar agar margin terjaga.',
  },
  {
    icon: Truck,
    title: 'Free ongkir tier',
    desc: 'Free ongkir Jabodetabek mulai order Rp 1jt.',
  },
  {
    icon: Sparkles,
    title: 'Akses koleksi terbatas',
    desc: 'Drop pertama produk baru sebelum dirilis ke publik.',
  },
];

const TIER_OPTIONS = [
  { value: '1-5', label: '1 – 5 juta / bulan' },
  { value: '5-15', label: '5 – 15 juta / bulan' },
  { value: '15-50', label: '15 – 50 juta / bulan' },
  { value: '50+', label: 'Di atas 50 juta / bulan' },
];

export default function ResellerModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    city: '',
    estimate: '5-15',
  });
  const toast = useToast();

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const reset = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      business: '',
      city: '',
      estimate: '5-15',
    });
    setSubmitted(false);
    setLoading(false);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.city) {
      toast.error('Lengkapi data', 'Nama, email, nomor HP, dan kota wajib diisi.');
      return;
    }
    setLoading(true);
    // Mock submit — replace with API call to your backend.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success(
        'Pendaftaran terkirim!',
        'Tim partnership akan menghubungimu dalam 1×24 jam.',
      );
    }, 900);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose?.();
        // Reset after close animation
        setTimeout(reset, 300);
      }}
      title="Jadi Reseller RumaRuma"
      description="Mulai jualan koleksi pecah belah & home living premium kami."
      icon={Store}
      size="lg"
    >
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-8 text-center"
        >
          <div className="grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-sage-700">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="mt-4 font-display text-xl text-charcoal-800">
            Pendaftaran terkirim ✦
          </h4>
          <p className="mt-2 max-w-md text-sm text-charcoal-500">
            Terima kasih sudah mendaftar! Tim partnership kami akan menghubungimu
            via email & WhatsApp dalam <span className="font-semibold text-charcoal-700">1×24 jam</span>
            {' '}untuk mengirim pricelist dan kontrak kemitraan.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button onClick={onClose} variant="secondary">
              Tutup
            </Button>
            <Button onClick={reset}>Daftarkan lagi</Button>
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <form onSubmit={submit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Nama lengkap"
                name="name"
                autoComplete="name"
                leftIcon={User}
                placeholder="Nama kamu"
                value={form.name}
                onChange={handle('name')}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                leftIcon={Mail}
                placeholder="kamu@email.com"
                value={form.email}
                onChange={handle('email')}
                required
              />
              <Input
                label="Nomor HP / WhatsApp"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                leftIcon={Phone}
                pattern="[0-9+\s()-]{8,}"
                placeholder="08123456789"
                value={form.phone}
                onChange={handle('phone')}
                required
              />
              <Input
                label="Kota"
                name="city"
                autoComplete="address-level2"
                leftIcon={MapPin}
                placeholder="Jakarta, Bandung, ..."
                value={form.city}
                onChange={handle('city')}
                required
              />
              <div className="sm:col-span-2">
                <Input
                  label="Nama bisnis (opsional)"
                  name="business"
                  leftIcon={Store}
                  placeholder="Toko / brand kamu"
                  value={form.business}
                  onChange={handle('business')}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-charcoal-600">
                  Estimasi order per bulan
                </label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {TIER_OPTIONS.map((t) => {
                    const active = form.estimate === t.value;
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, estimate: t.value }))}
                        className={
                          'rounded-2xl border px-3 py-2.5 text-xs font-medium transition ' +
                          (active
                            ? 'border-sage-500 bg-sage-50 text-sage-800'
                            : 'border-charcoal-100 bg-white text-charcoal-600 hover:border-sage-300')
                        }
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" fullWidth disabled={loading} className="mt-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Mengirim…
                </>
              ) : (
                'Kirim Pendaftaran'
              )}
            </Button>

            <p className="text-center text-[11px] text-charcoal-400">
              Tim partnership akan menghubungimu dalam 1×24 jam.
            </p>
          </form>

          {/* Benefits sidebar */}
          <aside className="rounded-2xl bg-sage-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-700">
              Benefit member
            </p>
            <h4 className="mt-1 font-display text-lg text-charcoal-800">
              Kenapa jadi reseller kami?
            </h4>
            <ul className="mt-4 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sage-700">
                    <b.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-800">
                      {b.title}
                    </p>
                    <p className="mt-0.5 text-xs text-charcoal-500">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </Modal>
  );
}
