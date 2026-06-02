import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '@/data/products';

// Bump this whenever you change the seed data in src/data/products.js so that
// returning visitors (who have an older snapshot persisted in localStorage)
// get re-seeded with your latest catalog instead of stale cached products.
const PRODUCTS_VERSION = 1;

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: initialProducts,

      addProduct: (newProduct) => {
        // Provide safe defaults for every field the storefront consumes, so a
        // product created from the admin form never crashes ProductCard /
        // ProductInfo (which read specs, stock, sold, brand, etc.). Caller
        // values override defaults via the trailing spread.
        const safeDefaults = {
          brand: 'RumaRuma Studio',
          originalPrice: null,
          rating: 0,
          reviews: 0,
          sold: 0,
          stock: 10,
          isNew: true,
          isBestseller: false,
          badge: 'New',
          color: '',
          material: '',
          sizes: [],
          shortDescription: '',
          description: '',
          specs: [],
          images: [],
          tags: [],
        };
        set((state) => ({
          products: [
            {
              ...safeDefaults,
              ...newProduct,
              id: `p-${Date.now()}`,
            },
            ...state.products,
          ],
        }));
      },

      updateProduct: (id, updatedData) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedData } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id) || null;
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug) || null;
      },
    }),
    {
      name: 'rumaruma-products', // key in localStorage
      version: PRODUCTS_VERSION,
      // When PRODUCTS_VERSION changes (i.e. you edited the seed catalog),
      // discard the persisted snapshot and re-seed from the fresh data file.
      // This prevents the common "I edited src/data/products.js but nothing
      // changed" confusion caused by localStorage persistence.
      migrate: () => ({ products: initialProducts }),
    }
  )
);
