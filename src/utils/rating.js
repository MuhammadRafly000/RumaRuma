export function discountPercent(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function clampRating(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(5, value));
}

export function sortProducts(list, sortBy) {
  const copy = [...list];
  switch (sortBy) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'bestseller':
      return copy.sort((a, b) => b.sold - a.sold);
    case 'newest':
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    default:
      return copy;
  }
}
