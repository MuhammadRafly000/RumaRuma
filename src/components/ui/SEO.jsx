import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description = 'Telusuri koleksi pecah belah dan home living terkurasi dari pengrajin lokal terbaik.', 
  image = '/logo.png', // Ideally a full URL for og:image
  url = 'https://rumaruma.id' 
}) {
  const siteTitle = 'RumaRuma - Home Living & Artisan Ceramics';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
