import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { getReviewsByProduct } from '@/data/reviews';
import Button from '@/components/ui/Button.jsx';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import cn from '@/utils/classNames';

export default function ProductReviews({ productId, rating, totalReviews }) {
  const initialReviews = getReviewsByProduct(productId);
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState('all'); // all, with-photo
  const [showForm, setShowForm] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();

  // Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.images && r.images.length > 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Belum Login', 'Silakan login terlebih dahulu untuk menulis ulasan.');
      return;
    }
    if (!newComment.trim()) {
      toast.error('Gagal', 'Ulasan tidak boleh kosong.');
      return;
    }

    const newReview = {
      id: 'r-' + Date.now(),
      productId,
      userName: user.name,
      userInitials: user.name.substring(0, 2).toUpperCase(),
      rating: newRating,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      comment: newComment,
      images: []
    };

    setReviews([newReview, ...reviews]);
    setShowForm(false);
    setNewComment('');
    setNewRating(5);
    toast.success('Berhasil', 'Ulasan kamu telah ditambahkan.');
  };

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
            <p className="text-sm text-charcoal-500">Berdasarkan {reviews.length > 0 ? reviews.length : totalReviews} ulasan</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
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
          <Button variant="outline" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Batal' : 'Tulis Ulasan'}
          </Button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 rounded-2xl border border-charcoal-100 bg-cream-50 p-6">
          <h3 className="mb-4 font-semibold text-charcoal-800">Tulis Ulasan Kamu</h3>
          <div className="mb-4">
            <p className="mb-2 text-sm text-charcoal-600">Rating Produk</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="p-1"
                >
                  <Star className={cn("h-6 w-6", star <= newRating ? "fill-amber-400 text-amber-400" : "fill-charcoal-100 text-charcoal-200")} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm text-charcoal-600">Komentar</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="h-24 w-full rounded-xl border border-charcoal-200 bg-white p-3 text-sm focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
              placeholder="Ceritakan pengalamanmu menggunakan produk ini..."
            />
          </div>
          <Button type="submit">Kirim Ulasan</Button>
        </form>
      )}

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
                    <img key={i} src={img} alt="Review attachment" loading="lazy" className="h-20 w-20 rounded-xl object-cover" />
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
