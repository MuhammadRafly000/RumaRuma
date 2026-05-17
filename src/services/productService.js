import { products, findProductBySlug, findProductById } from '@/data/products';
import { categories, findCategory } from '@/data/categories';
import { delay } from './api';

/**
 * Service layer. Today returns from local data; swap the bodies to call
 * `apiRequest()` when a real backend is ready. Signatures should stay the
 * same so components don't have to change.
 */

export async function getAllProducts() {
  await delay(120);
  return products;
}

export async function getProductsByCategory(slug) {
  await delay(120);
  if (!slug || slug === 'all') return products;
  return products.filter((p) => p.category === slug);
}

export async function getProductBySlug(slug) {
  await delay(80);
  return findProductBySlug(slug) || null;
}

export async function getProductById(id) {
  await delay(40);
  return findProductById(id) || null;
}

export async function getCategories() {
  await delay(40);
  return categories;
}

export async function getCategoryBySlug(slug) {
  await delay(40);
  return findCategory(slug) || null;
}

export async function searchProducts(query) {
  await delay(100);
  if (!query) return [];
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    const haystack = [p.name, p.brand, p.category, ...(p.tags || [])]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export async function getRecommendations(productId, max = 4) {
  await delay(60);
  const base = findProductById(productId);
  if (!base) return products.slice(0, max);
  return products
    .filter((p) => p.id !== productId && p.category === base.category)
    .slice(0, max);
}
