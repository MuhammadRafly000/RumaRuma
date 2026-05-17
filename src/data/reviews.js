export const reviews = [
  {
    id: 'rev-1',
    productId: 'p-001',
    userName: 'Siti Aminah',
    userInitials: 'SA',
    rating: 5,
    date: '12 Mei 2026',
    comment: 'Piringnya sangat cantik dan estetik! Warnanya sage green persis seperti di foto. Pengemasan sangat aman, tidak ada yang pecah. Pasti bakal beli koleksi lainnya.',
    images: ['/images/banners/hero_b1.png'] // using dummy image
  },
  {
    id: 'rev-2',
    productId: 'p-001',
    userName: 'Budi Santoso',
    userInitials: 'BS',
    rating: 5,
    date: '03 April 2026',
    comment: 'Kualitas stoneware-nya terasa premium dan tebal. Dipakai untuk plating makanan di rumah serasa makan di restoran bintang 5.',
    images: []
  },
  {
    id: 'rev-3',
    productId: 'p-004',
    userName: 'Rina Marlina',
    userInitials: 'RM',
    rating: 4,
    date: '28 Februari 2026',
    comment: 'Bagus banget buat ngopi pagi. Handle-nya enak digenggam. Sayangnya pengiriman agak lama, tapi barang sampai dengan aman.',
    images: []
  },
  {
    id: 'rev-4',
    productId: 'p-011',
    userName: 'Chef Anton',
    userInitials: 'CA',
    rating: 5,
    date: '15 Januari 2026',
    comment: 'Cast iron skillet terbaik yang pernah saya beli di rentang harga ini. Panasnya merata dan hasil panggangan daging jadi sempurna.',
    images: ['/images/products/p-011.png']
  }
];

export const getReviewsByProduct = (productId) => {
  return reviews.filter(r => r.productId === productId);
};
