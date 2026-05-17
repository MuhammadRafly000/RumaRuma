import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS, FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_FEE } from '@/config/constants';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      addItem: (product, quantity = 1) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.id === product.id);
        if (idx >= 0) {
          const next = Math.min(items[idx].quantity + quantity, product.stock ?? 99);
          items[idx] = { ...items[idx], quantity: next };
        } else {
          items.push({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images?.[0],
            stock: product.stock,
            quantity: Math.min(quantity, product.stock ?? 99),
          });
        }
        set({ items });
      },

      updateQuantity: (id, quantity) => {
        const items = get()
          .items.map((i) =>
            i.id === id
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock ?? 99)) }
              : i,
          )
          .filter((i) => i.quantity > 0);
        set({ items });
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: STORAGE_KEYS.cart,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function useCartTotals() {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const savings = items.reduce(
    (sum, i) => sum + (Math.max(0, (i.originalPrice ?? i.price) - i.price) * i.quantity),
    0,
  );
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping =
    items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  return {
    items,
    itemCount,
    subtotal,
    savings,
    shipping,
    total: subtotal + shipping,
    freeShippingRemainder: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}
