export const categories = [
  {
    slug: 'dinnerware',
    name: 'Pecah Belah',
    tagline: 'Piring, mangkuk, & alat makan',
    description:
      'Koleksi piring dan alat makan keramik premium untuk meja makan keluarga yang hangat dan estetik.',
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
    accent: 'from-sage-100 to-cream-100',
  },
  {
    slug: 'glassware',
    name: 'Gelas & Cangkir',
    tagline: 'Gelas, mug, tumbler artisan',
    description:
      'Pilihan gelas kaca, mug keramik, dan tumbler aesthetic untuk momen ngopi dan ngeteh setiap hari.',
    image:
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80',
    accent: 'from-cream-100 to-cream-200',
  },
  {
    slug: 'kitchenware',
    name: 'Kitchenware',
    tagline: 'Teko, panci, alat masak',
    description:
      'Perlengkapan dapur premium dengan desain skandinavia minimalis dan material tahan lama.',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
    accent: 'from-cream-200 to-cream-100',
  },
  {
    slug: 'decor',
    name: 'Dekorasi Rumah',
    tagline: 'Vas, ornamen, lilin',
    description:
      'Detail kecil yang membuat rumah terasa hidup: vas, lilin aroma, dan ornamen meja yang aesthetic.',
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
    accent: 'from-sage-100 to-sage-200',
  },
  {
    slug: 'storage',
    name: 'Storage & Organizer',
    tagline: 'Toples, basket, container',
    description:
      'Koleksi storage modular untuk dapur dan ruang yang lebih rapi tanpa kehilangan estetika.',
    image:
      'https://images.unsplash.com/photo-1556228724-4b3e7e36c2ab?auto=format&fit=crop&w=900&q=80',
    accent: 'from-cream-100 to-cream-300',
  },
  {
    slug: 'textile',
    name: 'Tekstil Dapur',
    tagline: 'Apron, taplak, napkin',
    description:
      'Tekstil katun premium yang lembut, mudah dicuci, dan menghangatkan suasana makan bersama.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
    accent: 'from-cream-200 to-cream-300',
  },
];

export const findCategory = (slug) => categories.find((c) => c.slug === slug);
