import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import FloatingDecor from '@/components/ui/FloatingDecor.jsx';
import { heroBanners, promoStrips } from '@/data/banners';
import cn from '@/utils/classNames';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroBanner() {
  // Custom navigation buttons (Lucide icons) wired to Swiper via refs.
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const tx1 = useTransform(sx, [-1, 1], [-18, 18]);
  const ty1 = useTransform(sy, [-1, 1], [-12, 12]);
  const tx2 = useTransform(sx, [-1, 1], [12, -12]);
  const ty2 = useTransform(sy, [-1, 1], [8, -8]);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x * 2);
    my.set(y * 2);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative isolate overflow-hidden bg-cream-50"
    >
      <FloatingDecor />
      <div className="container-page relative pb-16 pt-8 lg:pb-24 lg:pt-12">
        {/* Relative wrapper so the custom arrow buttons can sit OUTSIDE the
            Swiper's overflow-hidden box and never get clipped. */}
        <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            // Refs are null on first render; assign them before Swiper inits.
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          className="overflow-hidden rounded-[2rem]"
        >
          {heroBanners.map((b, idx) => (
            <SwiperSlide key={b.id}>
              <div className="relative isolate overflow-hidden rounded-[2rem] bg-charcoal-800">
                <motion.img
                  src={b.image}
                  alt=""
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 7, ease: 'easeOut' }}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ x: tx1, y: ty1 }}
                />
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-tr',
                    b.tint,
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal-800/55 via-charcoal-800/20 to-transparent" />

                <motion.span
                  style={{ x: tx2, y: ty2 }}
                  className="absolute right-[12%] top-[18%] hidden h-28 w-28 rounded-full bg-white/20 backdrop-blur-md sm:block"
                />
                <motion.span
                  style={{ x: tx1, y: ty2 }}
                  className="absolute right-[28%] bottom-[18%] hidden h-16 w-16 rounded-full bg-sage-300/60 sm:block"
                />

                <div
                  className={cn(
                    'relative grid min-h-[460px] gap-6 px-6 py-12 sm:min-h-[520px] sm:px-10 lg:min-h-[600px] lg:grid-cols-2 lg:px-16',
                    b.align === 'right' && 'lg:grid-cols-2',
                  )}
                >
                  <motion.div
                    key={`text-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1,
                    }}
                    className="flex flex-col justify-center text-white"
                  >
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur">
                      <Sparkles className="h-3 w-3" />
                      {b.eyebrow}
                    </span>
                    <h1 className="mt-4 max-w-xl whitespace-pre-line font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                      {b.title}
                    </h1>
                    <p className="mt-4 max-w-md text-sm text-white/85 sm:text-base">
                      {b.subtitle}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        to={b.cta.to}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal-800 shadow-soft transition hover:bg-cream-100"
                      >
                        {b.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/kategori"
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Lihat Semua Produk
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

          {/* Custom navigation — Lucide chevrons, full design control,
              positioned over the carousel and never clipped. */}
          <button
            ref={prevRef}
            type="button"
            aria-label="Banner sebelumnya"
            className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-charcoal-700 shadow-elevated backdrop-blur transition hover:scale-105 hover:bg-white active:scale-95 sm:left-4 lg:h-12 lg:w-12"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
          </button>
          <button
            ref={nextRef}
            type="button"
            aria-label="Banner berikutnya"
            className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-charcoal-700 shadow-elevated backdrop-blur transition hover:scale-105 hover:bg-white active:scale-95 sm:right-4 lg:h-12 lg:w-12"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>

        {/* Promo strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {promoStrips.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2.5 rounded-2xl bg-white/80 px-4 py-3 text-xs text-charcoal-600 shadow-soft backdrop-blur"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-sage-100 text-sage-700">
                <PromoIcon name={p.icon} />
              </span>
              <span className="font-medium">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoIcon({ name }) {
  const stroke = 'currentColor';
  switch (name) {
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M3 7h11v9H3zM14 11h4l3 3v2h-7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="18" r="1.6" />
          <circle cx="17.5" cy="18" r="1.6" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M12 3l8 3v6c0 4.5-3.4 7.9-8 9-4.6-1.1-8-4.5-8-9V6l8-3z" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'refresh':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M4 12a8 8 0 0 1 14-5l2-2v6h-6l2-2A6 6 0 0 0 6 12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 12a8 8 0 0 1-14 5l-2 2v-6h6l-2 2a6 6 0 0 0 10-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <Sparkles className="h-4 w-4" />;
  }
}
