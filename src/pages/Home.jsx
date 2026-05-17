import HeroBanner from '@/components/home/HeroBanner.jsx';
import CategoryShowcase from '@/components/home/CategoryShowcase.jsx';
import PromoSection from '@/components/home/PromoSection.jsx';
import FeaturedProducts from '@/components/home/FeaturedProducts.jsx';
import StorySection from '@/components/home/StorySection.jsx';
import TestimonialSection from '@/components/home/TestimonialSection.jsx';
import NewsletterSection from '@/components/home/NewsletterSection.jsx';
import SEO from '@/components/ui/SEO.jsx';

export default function Home() {
  return (
    <>
      <SEO title="Beranda" />
      <HeroBanner />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoSection />
      <StorySection />
      <TestimonialSection />
      <NewsletterSection />
    </>
  );
}
