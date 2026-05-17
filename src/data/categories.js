export const categories = [
  {
    slug: 'dinnerware',
    name: 'Pecah Belah',
    tagline: 'Piring, mangkuk, & alat makan',
    description:
      'Koleksi piring dan alat makan keramik premium untuk meja makan keluarga yang hangat dan estetik.',
    image: '/images/products/p-001.png',
    accent: 'from-sage-100 to-cream-100',
  },
  {
    slug: 'glassware',
    name: 'Gelas & Cangkir',
    tagline: 'Gelas, mug, tumbler artisan',
    description:
      'Pilihan gelas kaca, mug keramik, dan tumbler aesthetic untuk momen ngopi dan ngeteh setiap hari.',
    image: '/images/products/p-003.png',
    accent: 'from-cream-100 to-cream-200',
  },
  {
    slug: 'kitchenware',
    name: 'Kitchenware',
    tagline: 'Teko, panci, alat masak',
    description:
      'Perlengkapan dapur premium dengan desain skandinavia minimalis dan material tahan lama.',
    image: '/images/products/p-011.png',
    accent: 'from-cream-200 to-cream-100',
  },
  {
    slug: 'decor',
    name: 'Dekorasi Rumah',
    tagline: 'Vas, ornamen, lilin',
    description:
      'Detail kecil yang membuat rumah terasa hidup: vas, lilin aroma, dan ornamen meja yang aesthetic.',
    image: '/images/products/p-007.png',
    accent: 'from-sage-100 to-sage-200',
  },
  {
    slug: 'storage',
    name: 'Storage & Organizer',
    tagline: 'Toples, basket, container',
    description:
      'Koleksi storage modular untuk dapur dan ruang yang lebih rapi tanpa kehilangan estetika.',
    image: '/images/products/p-009.png',
    accent: 'from-cream-100 to-cream-300',
  },
  {
    slug: 'textile',
    name: 'Tekstil Dapur',
    tagline: 'Apron, taplak, napkin',
    description:
      'Tekstil katun premium yang lembut, mudah dicuci, dan menghangatkan suasana makan bersama.',
    image: '/images/products/p-010.png',
    accent: 'from-cream-200 to-cream-300',
  },
];

export const findCategory = (slug) => categories.find((c) => c.slug === slug);
