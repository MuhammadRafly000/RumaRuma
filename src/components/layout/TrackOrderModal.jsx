import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Truck,
  PackageCheck,
  Package,
  CheckCircle2,
  Loader2,
  Search,
  Copy,
  AlertCircle,
} from 'lucide-react';
import Modal from '@/components/ui/Modal.jsx';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import { useToast } from '@/context/ToastContext';
import cn from '@/utils/classNames';

const TIMELINE = [
  {
    key: 'created',
    label: 'Pesanan dibuat',
    desc: 'Pembayaran sudah dikonfirmasi.',
    icon: PackageCheck,
  },
  {
    key: 'packed',
    label: 'Sedang dikemas',
    desc: 'Tim kami membungkus pesananmu dengan aman.',
    icon: Package,
  },
  {
    key: 'shipped',
    label: 'Dalam pengiriman',
    desc: 'Paket sudah diserahkan ke kurir.',
    icon: Truck,
  },
  {
    key: 'delivered',
    label: 'Sampai tujuan',
    desc: 'Pesanan sudah diterima penerima.',
    icon: CheckCircle2,
  },
];

const SAMPLE_RESI = 'RR-2026-000123';

// Mock resolver — in production replace with API call to your courier
// integration (JNT, JNE, SiCepat, etc.).
function mockTrack(resi) {
  const clean = resi.trim().toUpperCase();
  if (!clean) return { status: 'error', message: 'Masukkan nomor resi.' };
  if (clean.length < 6)
    return {
      status: 'error',
      message: 'Format resi tidak valid (minimal 6 karakter).',
    };
  // Deterministic mock: hash the resi to pick a progress step
  const hash = [...clean].reduce((a, c) => a + c.charCodeAt(0), 0);
  const activeIndex = hash % TIMELINE.length;
  return {
    status: 'ok',
    resi: clean,
    courier: 'JNT Express',
    receiver: 'P*** A*****',
    address: 'Jakarta Selatan',
    activeIndex,
    updates: TIMELINE.slice(0, activeIndex + 1).map((step, i) => ({
      ...step,
      at: `${String((hash + i * 7) % 24).padStart(2, '0')}:${String(
        (hash + i * 13) % 60,
      ).padStart(2, '0')} WIB`,
      date: i === activeIndex ? 'Hari ini' : `${activeIndex - i} hari lalu`,
    })),
  };
}

export default function TrackOrderModal({ open, onClose }) {
  const [resi, setResi] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const toast = useToast();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = mockTrack(resi);
      setResult(r);
      setLoading(false);
    }, 700);
  };

  const reset = () => {
    setResi('');
    setResult(null);
  };

  const copySample = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_RESI);
      setResi(SAMPLE_RESI);
      toast.success('Nomor demo disalin', 'Tekan "Lacak" untuk simulasi.');
    } catch {
      setResi(SAMPLE_RESI);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose?.();
        // Delay reset so the closing animation doesn't flash empty state
        setTimeout(reset, 300);
      }}
      title="Cek Resi Pengiriman"
      description="Lacak status paketmu secara real-time."
      icon={Truck}
      size="lg"
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Input
              label="Nomor Resi"
              name="resi"
              placeholder="Contoh: RR-2026-000123"
              leftIcon={Search}
              value={resi}
              onChange={(e) => setResi(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit" size="lg" disabled={loading} className="flex-1 sm:flex-none">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Melacak…
                </>
              ) : (
                'Lacak'
              )}
            </Button>
          </div>
        </div>

        {!result && (
          <button
            type="button"
            onClick={copySample}
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-sage-700"
          >
            <Copy className="h-3 w-3" /> Pakai nomor demo
            <span className="font-mono font-medium text-charcoal-700">
              {SAMPLE_RESI}
            </span>
          </button>
        )}
      </form>

      <AnimatePresence mode="wait">
        {result?.status === 'error' && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-5 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {result.message}
          </motion.div>
        )}

        {result?.status === 'ok' && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="mt-5 space-y-5"
          >
            {/* Header info */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-soft sm:grid-cols-4">
              <Field label="No. Resi" value={result.resi} mono />
              <Field label="Kurir" value={result.courier} />
              <Field label="Penerima" value={result.receiver} />
              <Field label="Tujuan" value={result.address} />
            </div>

            {/* Timeline */}
            <div className="rounded-2xl bg-white p-5 shadow-soft">
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-400">
                Riwayat status
              </h4>
              <ol className="space-y-4">
                {TIMELINE.map((step, i) => {
                  const isDone = i <= result.activeIndex;
                  const isCurrent = i === result.activeIndex;
                  const update = result.updates[i];
                  return (
                    <li key={step.key} className="flex gap-3">
                      <div className="relative flex flex-col items-center">
                        <span
                          className={cn(
                            'grid h-8 w-8 place-items-center rounded-full ring-4 transition-colors',
                            isDone
                              ? 'bg-sage-600 text-white ring-sage-100'
                              : 'bg-cream-100 text-charcoal-400 ring-cream-50',
                          )}
                        >
                          <step.icon className="h-4 w-4" />
                        </span>
                        {i < TIMELINE.length - 1 && (
                          <span
                            className={cn(
                              'mt-1 h-full w-px flex-1 transition-colors',
                              isDone ? 'bg-sage-300' : 'bg-charcoal-100',
                            )}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <p
                            className={cn(
                              'text-sm font-semibold',
                              isDone ? 'text-charcoal-800' : 'text-charcoal-400',
                            )}
                          >
                            {step.label}
                          </p>
                          {isCurrent && (
                            <span className="rounded-full bg-sage-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sage-700">
                              Terkini
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-charcoal-500">
                          {step.desc}
                        </p>
                        {update && (
                          <p className="mt-1 text-[11px] text-charcoal-400">
                            {update.date} · {update.at}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}

function Field({ label, value, mono = false }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-400">
        {label}
      </p>
      <p
        className={cn(
          'text-sm font-semibold text-charcoal-800',
          mono && 'font-mono',
        )}
      >
        {value}
      </p>
    </div>
  );
}
