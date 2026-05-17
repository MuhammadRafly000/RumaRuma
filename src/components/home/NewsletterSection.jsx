import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast.error('Email belum valid', 'Pastikan format email kamu benar.');
      return;
    }
    toast.success(
      'Selamat bergabung!',
      'Kami sudah kirim kode promo perdana ke email kamu.',
    );
    setEmail('');
  };

  return (
    <section className="container-page py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate overflow-hidden rounded-[2rem] bg-charcoal-800 px-6 py-12 text-white sm:px-14 sm:py-16"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(80%_80%_at_30%_20%,rgba(79,125,104,0.65),transparent_60%)]"
        />
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-200">
              Newsletter
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              Hangatkan inbox-mu dengan inspirasi rumah.
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/75">
              Dapatkan kode diskon perdana 10%, tips dekorasi mingguan, dan akses
              awal ke koleksi terbatas.
            </p>
          </div>
          <form
            onSubmit={submit}
            className="flex w-full items-center gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              required
              placeholder="email@kamu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-charcoal-800 transition hover:bg-cream-100"
            >
              Berlangganan <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
