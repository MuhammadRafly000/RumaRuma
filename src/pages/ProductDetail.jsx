import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import ProductGallery from '@/components/product/ProductGallery.jsx';
import ProductInfo from '@/components/product/ProductInfo.jsx';
import ProductGrid from '@/components/product/ProductGrid.jsx';
import ProductReviews from '@/components/product/ProductReviews.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import Skeleton from '@/components/ui/Skeleton.jsx';
import Button from '@/components/ui/Button.jsx';
import SEO from '@/components/ui/SEO.jsx';
import { getProductBySlug, getRecommendations } from '@/services/productService';
import { findCategory } from '@/data/categories';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setRelatedLoading(true);
    getProductBySlug(slug).then((p) => {
      if (!active) return;
      setProduct(p);
      setLoading(false);
      if (p) {
        getRecommendations(p.id, 4).then((r) => {
          if (!active) return;
          setRelated(r);
          setRelatedLoading(false);
        });
      } else {
        setRelated([]);
        setRelatedLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Produk tidak ditemukan"
          description="Mungkin produk sudah dihapus atau URL salah. Yuk jelajahi koleksi lainnya."
          action={
            <Button onClick={() => navigate('/kategori')}>Lihat Semua Produk</Button>
          }
        />
      </div>
    );
  }

  const category = findCategory(product.category);

  return (
    <>
      <SEO 
        title={product.name} 
        description={product.shortDescription || product.description}
        image={product.images?.[0]}
      />
      <div className="container-page py-8 lg:py-12">
        <nav className="mb-6 flex items-center gap-1 text-xs text-charcoal-400">
          <Link to="/" className="hover:text-sage-700">Beranda</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/kategori" className="hover:text-sage-700">Semua</Link>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link to={`/kategori/${category.slug}`} className="hover:text-sage-700">{category.name}</Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="line-clamp-1 text-charcoal-700">{product.name}</span>
        </nav>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-xs text-charcoal-500 hover:text-sage-700"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />
          <ProductInfo product={product} />
        </div>

        <ProductReviews productId={product.id} rating={product.rating} totalReviews={product.reviews} />

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
                Mungkin kamu juga suka
              </p>
              <h2 className="section-title mt-1">Rekomendasi untukmu</h2>
            </div>
            {category && (
              <Link
                to={`/kategori/${category.slug}`}
                className="text-sm font-medium text-sage-700 hover:text-sage-800"
              >
                Lihat semua {category.name} →
              </Link>
            )}
          </div>
          <ProductGrid
            products={related}
            loading={relatedLoading}
            skeletonCount={4}
          />
        </section>
      </div>
    </>
  );
}
