import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import FloatingDecor from '@/components/ui/FloatingDecor.jsx';
import Button from '@/components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <div className="relative isolate min-h-[72vh] overflow-hidden">
      <FloatingDecor />
      <div className="container-page flex flex-col items-center justify-center py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
          404
        </p>
        <h1 className="mt-3 font-display text-5xl text-charcoal-800 sm:text-6xl">
          Sepertinya halamannya
          <br /> sedang dirapikan.
        </h1>
        <p className="mt-4 max-w-md text-sm text-charcoal-500">
          Halaman yang kamu cari tidak ditemukan atau sudah pindah tempat. Yuk
          kembali ke beranda atau jelajahi koleksi terbaru kami.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button as={Link} to="/">
            <Home className="h-4 w-4" /> Ke Beranda
          </Button>
          <Button as={Link} to="/kategori" variant="secondary">
            <Search className="h-4 w-4" /> Jelajahi Koleksi
          </Button>
        </div>
      </div>
    </div>
  );
}
