import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '120+', label: 'Pengrajin lokal terkurasi' },
  { value: '12k+', label: 'Keluarga sudah belanja' },
  { value: '4.9', label: 'Rating rata-rata' },
  { value: '24 jam', label: 'Respon CS via WhatsApp' },
];

export default function StorySection() {
  return (
    <section className="container-page overflow-x-clip py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -left-6 -top-6 -z-10 h-3/4 w-3/4 rounded-[2rem] bg-sage-100" />
          <img
            src="/images/products/p-002.png"
            alt="Pengrajin RumaRuma"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -bottom-6 -right-4 w-56 rounded-3xl bg-white/95 p-4 shadow-elevated backdrop-blur"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-sage-700">
              <Sparkles className="h-3.5 w-3.5" /> Kurasi langsung
            </div>
            <p className="mt-1 text-sm text-charcoal-600">
              Setiap produk dipilih tangan oleh tim RumaRuma dari Jepara, Bandung,
              hingga Yogyakarta.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
            Cerita RumaRuma
          </p>
          <h2 className="section-title mt-2">
            Rumah yang hangat dimulai dari detail yang dipilih dengan hati.
          </h2>
          <p className="section-subtitle mt-4 max-w-md">
            RumaRuma lahir dari kecintaan pada tableware dan home living yang
            memadukan estetika modern dengan kehangatan tangan pengrajin lokal.
            Kami percaya rumah terbaik adalah ruang yang membuat kamu betah
            berlama-lama.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-charcoal-100/70 bg-white p-4 shadow-soft"
              >
                <p className="font-display text-2xl text-charcoal-800">{s.value}</p>
                <p className="text-xs text-charcoal-500">{s.label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/kategori"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal-700"
          >
            Jelajahi semua koleksi <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
