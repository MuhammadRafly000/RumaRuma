import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import Logo from '@/components/layout/Logo.jsx';
import FloatingDecor from '@/components/ui/FloatingDecor.jsx';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password terlalu pendek', 'Minimal 6 karakter.');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      toast.success('Akun berhasil dibuat!', 'Selamat bergabung di RumaRuma.');
      navigate('/');
    } catch (err) {
      toast.error('Pendaftaran gagal', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-[80vh] overflow-hidden">
      <FloatingDecor />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <Logo />
          <h1 className="mt-8 font-display text-4xl text-charcoal-800 sm:text-5xl">
            Daftar dan dapatkan diskon perdana 10%.
          </h1>
          <p className="mt-4 max-w-md text-base text-charcoal-500">
            Member RumaRuma punya akses ke koleksi baru lebih dulu, kupon promo
            mingguan, dan pengiriman prioritas.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-charcoal-600">
            <li>✦ Diskon 10% untuk transaksi pertama</li>
            <li>✦ Free ongkir tanpa batas minimum di hari ulang tahun</li>
            <li>✦ Early access koleksi terbatas dari pengrajin lokal</li>
          </ul>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-card lg:p-10"
        >
          <div className="lg:hidden">
            <Logo />
          </div>
          <h2 className="mt-6 font-display text-2xl text-charcoal-800 lg:mt-0">
            Daftar akun RumaRuma
          </h2>
          <p className="mt-1 text-sm text-charcoal-500">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-semibold text-sage-700 hover:underline">
              Masuk di sini
            </Link>
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <Input
              label="Nama lengkap"
              name="name"
              placeholder="Nama panggilan kamu"
              leftIcon={User}
              value={form.name}
              onChange={handle('name')}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="kamu@email.com"
              leftIcon={Mail}
              value={form.email}
              onChange={handle('email')}
              required
            />
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimal 6 karakter"
              leftIcon={Lock}
              rightIcon={showPassword ? EyeOff : Eye}
              value={form.password}
              onChange={handle('password')}
              required
            />
            <label className="flex items-center gap-2 text-xs text-charcoal-500">
              <input
                type="checkbox"
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-charcoal-200 text-sage-600 focus:ring-sage-400"
              />
              Tampilkan password
            </label>
            <Button type="submit" size="lg" fullWidth disabled={loading}>
              {loading ? 'Memproses...' : 'Buat akun'}
            </Button>
            <p className="text-center text-[11px] text-charcoal-400">
              Dengan mendaftar kamu setuju dengan{' '}
              <Link to="/login" className="underline">
                Syarat & Ketentuan
              </Link>{' '}
              dan{' '}
              <Link to="/login" className="underline">
                Kebijakan Privasi
              </Link>
              .
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
