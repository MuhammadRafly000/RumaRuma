import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote } from 'lucide-react';
import RatingStars from '@/components/ui/RatingStars.jsx';
import { testimonials } from '@/data/testimonials';

import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialSection() {
  return (
    <section className="relative isolate overflow-hidden bg-sage-50 py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(159,184,168,0.35),transparent_70%)]"
      />
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
            Cerita pelanggan
          </p>
          <h2 className="section-title mt-2">
            Dipercaya 12.000+ keluarga di seluruh Indonesia.
          </h2>
          <p className="section-subtitle mt-3">
            Cerita nyata dari pelanggan setia RumaRuma — kurasi pengrajin lokal,
            kemasan aman, dan layanan yang hangat seperti namanya.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <article className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft">
                <Quote className="h-7 w-7 text-sage-300" />
                <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                  “{t.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-charcoal-100 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-charcoal-700">
                      {t.name}
                    </p>
                    <p className="text-xs text-charcoal-400">{t.role}</p>
                  </div>
                  <RatingStars value={t.rating} size={12} />
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-sage-700">
                  Beli: {t.product}
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
