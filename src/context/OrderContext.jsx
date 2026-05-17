import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/config/constants';

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set({
          orders: [
            {
              id: `ORD-${Date.now().toString().slice(-6)}`,
              date: new Date().toISOString(),
              status: 'Diproses', // Diproses, Dikirim, Selesai
              ...order,
            },
            ...get().orders,
          ],
        });
      },

      getOrder: (id) => get().orders.find((o) => o.id === id),
      
      updateOrderStatus: (id, newStatus) => {
        set((state) => ({
          orders: state.orders.map((o) => 
            o.id === id ? { ...o, status: newStatus } : o
          ),
        }));
      },

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: STORAGE_KEYS.orders,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
