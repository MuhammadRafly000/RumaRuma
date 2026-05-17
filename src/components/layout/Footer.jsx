import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Logo from './Logo.jsx';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';

const sections = [
  {
    title: 'Belanja',
    links: [
      { label: 'Semua Produk', to: '/kategori' },
      { label: 'Pecah Belah', to: '/kategori/dinnerware' },
      { label: 'Gelas & Cangkir', to: '/kategori/glassware' },
      { label: 'Kitchenware', to: '/kategori/kitchenware' },
      { label: 'Dekorasi Rumah', to: '/kategori/decor' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'Cara Belanja', to: '/kategori' },
      { label: 'Pengiriman & Resi', to: '/kategori' },
      { label: 'Pengembalian', to: '/kategori' },
      { label: 'Garansi Pecah', to: '/kategori' },
      { label: 'Hubungi Kami', to: '/kategori' },
    ],
  },
  {
    title: 'Tentang',
    links: [
      { label: 'Cerita RumaRuma', to: '/kategori' },
      { label: 'Pengrajin Mitra', to: '/kategori' },
      { label: 'Sustainability', to: '/kategori' },
      { label: 'Karier', to: '/kategori' },
      { label: 'Press Kit', to: '/kategori' },
    ],
  },
];

export default function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState('');

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast.error('Email belum valid', 'Pastikan format email kamu benar.');
      return;
    }
    toast.success('Berhasil berlangganan', 'Cek inbox-mu untuk promo perdana 10%.');
    setEmail('');
  };

  return (
    <footer className="mt-20 border-t border-charcoal-100 bg-cream-50">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-4">
          <Logo />
          <p className="max-w-sm text-sm text-charcoal-500">
            RumaRuma menghadirkan koleksi pecah belah & home living premium dari
            pengrajin lokal terbaik, dipilih dengan hati-hati untuk hunian yang
            hangat dan aesthetic.
          </p>
          <form
            onSubmit={subscribe}
            className="rounded-3xl bg-white p-4 shadow-soft"
          >
            <p className="text-sm font-semibold text-charcoal-900">
              Berlangganan Newsletter
            </p>
            <p className="mb-3 text-xs text-charcoal-500">
              Promo perdana 10% untuk pelanggan baru.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                name="email"
                placeholder="kamu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={Mail}
                className="flex-1"
              />
              <Button type="submit" className="sm:w-auto">
                Daftar <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <div className="flex items-center gap-3 text-charcoal-500">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-charcoal-100 p-2 transition hover:border-sage-300 hover:text-sage-600"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-charcoal-100 p-2 transition hover:border-sage-300 hover:text-sage-600"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-charcoal-100 p-2 transition hover:border-sage-300 hover:text-sage-600"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-400">
                {s.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-charcoal-600 transition hover:text-sage-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-3 lg:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-400">
            Kontak
          </h4>
          <div className="flex items-start gap-2 text-sm text-charcoal-600">
            <MapPin className="mt-0.5 h-4 w-4 text-sage-600" />
            <span>
              RumaRuma Studio,
              <br />
              Jl. Kemang Selatan 12, Jakarta
            </span>
          </div>
          <a
            href="tel:+622112345678"
            className="flex items-center gap-2 text-sm text-charcoal-600 hover:text-sage-600"
          >
            <Phone className="h-4 w-4 text-sage-600" /> +62 21 1234 5678
          </a>
          <a
            href="mailto:halo@rumaruma.id"
            className="flex items-center gap-2 text-sm text-charcoal-600 hover:text-sage-600"
          >
            <Mail className="h-4 w-4 text-sage-600" /> halo@rumaruma.id
          </a>
        </div>
      </div>

      <div className="border-t border-charcoal-100">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-charcoal-400 sm:flex-row">
          <p>© {new Date().getFullYear()} RumaRuma. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/kategori" className="hover:text-charcoal-700">
              Syarat & Ketentuan
            </Link>
            <Link to="/kategori" className="hover:text-charcoal-700">
              Kebijakan Privasi
            </Link>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Made with care in Jakarta</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
