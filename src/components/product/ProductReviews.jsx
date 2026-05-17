import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { getReviewsByProduct } from '@/data/reviews';
import cn from '@/utils/classNames';

export default function ProductReviews({ productId, rating, totalReviews }) {
  const reviews = getReviewsByProduct(productId);
  const [filter, setFilter] = useState('all'); // all, with-photo

  // Dummy logic: if no reviews in our dummy data, we just show empty state
  // even if the product has rating/totalReviews > 0 in products.js
  
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.images && r.images.length > 0);

  return (
    <section className="mt-16 rounded-3xl bg-white p-6 shadow-soft sm:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-2xl text-charcoal-800">Ulasan Pengguna</h2>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
              <span className="text-2xl font-bold text-charcoal-800">{rating}</span>
              <span className="text-charcoal-400">/ 5.0</span>
            </div>
            <div className="h-8 w-px bg-charcoal-100" />
            <p className="text-sm text-charcoal-500">Berdasarkan {totalReviews} ulasan</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              filter === 'all' ? "bg-charcoal-900 text-white" : "bg-cream-100 text-charcoal-600 hover:bg-cream-200"
            )}
          >
            Semua Ulasan
          </button>
          <button
            onClick={() => setFilter('with-photo')}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              filter === 'with-photo' ? "bg-charcoal-900 text-white" : "bg-cream-100 text-charcoal-600 hover:bg-cream-200"
            )}
          >
            Dengan Foto
          </button>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-charcoal-400">
          <MessageSquare className="mb-4 h-12 w-12 opacity-50" />
          <p>Belum ada ulasan untuk filter ini.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredReviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-charcoal-100 p-6 transition hover:border-sage-200">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-sage-100 text-sm font-bold text-sage-700">
                    {review.userInitials}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-800">{review.userName}</p>
                    <p className="text-xs text-charcoal-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating ? "fill-amber-400 text-amber-400" : "fill-charcoal-100 text-charcoal-100"
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-charcoal-600">
                {review.comment}
              </p>
              {review.images && review.images.length > 0 && (
                <div className="mt-4 flex gap-2">
                  {review.images.map((img, i) => (
                    <img key={i} src={img} alt="Review attachment" className="h-20 w-20 rounded-xl object-cover" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
