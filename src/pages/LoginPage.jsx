import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import Logo from '@/components/layout/Logo.jsx';
import FloatingDecor from '@/components/ui/FloatingDecor.jsx';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success('Selamat datang kembali!', 'Senang melihatmu lagi di RumaRuma.');
      // `from` is usually a string ('/checkout'), but ProtectedRoute used to
      // pass the whole Location object — fall back gracefully for either shape.
      const from = location.state?.from;
      const dest =
        typeof from === 'string'
          ? from
          : from && typeof from === 'object' && from.pathname
            ? from.pathname + (from.search || '')
            : '/';
      navigate(dest, { replace: true });
    } catch (err) {
      toast.error('Login gagal', err.message);
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
            Selamat datang kembali di rumah keduamu.
          </h1>
          <p className="mt-4 max-w-md text-base text-charcoal-500">
            Lanjutkan belanja tableware dan home living favoritmu. Akses wishlist,
            riwayat order, dan promo ekslusif untuk member.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {['Sage Collection', 'Coffee Corner', 'Decor Lover'].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-charcoal-100 bg-white/60 p-4 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-wider text-sage-700">{t}</p>
                <p className="mt-1 text-xs text-charcoal-500">Promo member</p>
              </div>
            ))}
          </div>
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
            Masuk ke akunmu
          </h2>
          <p className="mt-1 text-sm text-charcoal-500">
            Belum punya akun?{' '}
            <Link to="/register" className="font-semibold text-sage-700 hover:underline">
              Daftar gratis
            </Link>
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="kamu@email.com"
              leftIcon={Mail}
              value={form.email}
              onChange={handle('email')}
              required
            />
            <div>
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                leftIcon={Lock}
                rightIcon={showPassword ? EyeOff : Eye}
                value={form.password}
                onChange={handle('password')}
                required
              />
              <div className="mt-2 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-charcoal-500">
                  <input
                    type="checkbox"
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-charcoal-200 text-sage-600 focus:ring-sage-400"
                  />
                  Tampilkan password
                </label>
                <Link to="/login" className="font-medium text-sage-700 hover:underline">
                  Lupa password?
                </Link>
              </div>
            </div>
            <Button type="submit" size="lg" fullWidth disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-charcoal-400">
            <span className="h-px flex-1 bg-charcoal-100" /> atau{' '}
            <span className="h-px flex-1 bg-charcoal-100" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-charcoal-100 bg-white px-4 py-3 text-sm font-medium text-charcoal-700 hover:border-sage-300"
            >
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-charcoal-100 bg-white px-4 py-3 text-sm font-medium text-charcoal-700 hover:border-sage-300"
            >
              Apple
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
