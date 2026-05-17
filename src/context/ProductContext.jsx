import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '@/data/products';

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: initialProducts,

      addProduct: (newProduct) => {
        set((state) => ({
          products: [
            {
              ...newProduct,
              id: `p-${Date.now()}`,
              rating: 0,
              reviews: 0,
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
    }
  )
);
