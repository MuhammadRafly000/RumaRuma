import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  ChevronDown,
  Clock,
} from 'lucide-react';
import Modal from '@/components/ui/Modal.jsx';
import { BRAND } from '@/config/constants';
import cn from '@/utils/classNames';

const FAQ = [
  {
    q: 'Berapa lama estimasi pengiriman?',
    a: 'Untuk wilayah Jabodetabek: 1–3 hari kerja (Reguler) atau Same Day (sebelum jam 12.00 WIB). Luar pulau: 3–7 hari kerja tergantung ekspedisi. Resi akan dikirim via email & WhatsApp setelah barang dikemas.',
  },
  {
    q: 'Bagaimana kalau barang pecah saat pengiriman?',
    a: 'Tenang — kami punya Garansi Pecah 100% selama pengiriman. Kirim foto kemasan & barang yang pecah ke WhatsApp kami dalam 24 jam setelah barang diterima, dan kami akan kirim pengganti gratis tanpa biaya tambahan.',
  },
  {
    q: 'Bisa retur atau tukar produk?',
    a: 'Ya, kamu bisa retur/tukar dalam 7 hari setelah barang diterima dengan syarat: barang belum dipakai, kemasan original utuh, dan disertai bukti pembelian. Ongkir retur ditanggung pembeli kecuali ada kesalahan dari kami.',
  },
  {
    q: 'Apa metode pembayaran yang tersedia?',
    a: 'Virtual Account (BCA · BNI · Mandiri · BRI), Kartu Kredit/Debit (Visa, Mastercard, JCB), E-Wallet (GoPay · OVO · DANA · ShopeePay), dan QRIS. Semua transaksi diproses melalui payment gateway tersertifikasi.',
  },
  {
    q: 'Apakah ada promo untuk pembelian bulk / event?',
    a: 'Ada — untuk wedding, catering, hotel, atau cafe dengan pembelian minimum Rp 5.000.000, hubungi tim kami untuk dapat penawaran khusus dengan diskon hingga 20% + free konsultasi styling.',
  },
];

const CONTACT = [
  {
    label: 'WhatsApp',
    value: 'Chat 24/7',
    icon: MessageCircle,
    href: 'https://wa.me/620000000000',
    tone: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  },
  {
    label: 'Email',
    value: BRAND.emailDisplay,
    icon: Mail,
    href: BRAND.emailHref,
    tone: 'bg-sage-50 text-sage-700 hover:bg-sage-100',
  },
  {
    label: 'Telepon',
    value: BRAND.phoneDisplay,
    icon: Phone,
    href: BRAND.phoneHref,
    tone: 'bg-cream-100 text-charcoal-700 hover:bg-cream-200',
  },
];

export default function HelpModal({ open, onClose }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Pusat Bantuan"
      description="Pertanyaan paling sering & cara hubungi kami."
      icon={HelpCircle}
      size="lg"
    >
      <div className="space-y-6">
        {/* Contact channels */}
        <section>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-400">
            Hubungi kami langsung
          </h4>
          <div className="grid gap-2 sm:grid-cols-3">
            {CONTACT.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition',
                  c.tone,
                )}
              >
                <c.icon className="h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                    {c.label}
                  </p>
                  <p className="truncate text-xs font-semibold">{c.value}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-charcoal-500">
            <Clock className="h-3.5 w-3.5" />
            Jam operasional CS: Senin–Sabtu, 09.00–18.00 WIB
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-400">
            Frequently Asked Questions
          </h4>
          <div className="space-y-2">
            {FAQ.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={item.q}
                  className={cn(
                    'rounded-2xl border bg-white transition-colors',
                    isOpen ? 'border-sage-300' : 'border-charcoal-100',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-charcoal-800"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0 text-charcoal-400 transition-transform',
                        isOpen && 'rotate-180 text-sage-600',
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm leading-relaxed text-charcoal-500">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Modal>
  );
}
