import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface OrderSelection {
  productId: string;
  name: string;
  image: string;
  size: number;
// color: string;
  
//   colorName: string;
  colorHex?: string;

  sale_price: number;
  mrp: number;
}



interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    phone_number: string;
  } | null;

  // 🔥 ORDER DATA (for order-success & my-orders UI)
  lastOrder: OrderSelection | null;

  setToken: (token: string) => void;
  setUser: (user: { id: string; name: string; phone_number: string }) => void;

  setLastOrder: (order: OrderSelection) => void;
  clearLastOrder: () => void;

  logout: () => void;
  isAuthenticated: () => boolean;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      lastOrder: null,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      setLastOrder: (order) => set({ lastOrder: order }),
      clearLastOrder: () => set({ lastOrder: null }),

      logout: () => {
        // 1️⃣ Clear Zustand state
        set({
          token: null,
          user: null,
          lastOrder: null,
        });

        // 2️⃣ Clear browser storage + cookie (CLIENT ONLY)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token');
          localStorage.removeItem('auth-storage');

          // ✅ Properly remove cookie
          document.cookie =
            'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax';
        }
      },

      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'auth-storage',

      // ✅ Persist only what is needed
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        lastOrder: state.lastOrder,
      }),
    }
  )
);


interface CartState {
  items: Array<{
    productId: number;
    variationId?: number;
    quantity: number;
  }>;
  addItem: (productId: number, variationId?: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (productId, variationId) =>
    set((state) => ({
      items: [...state.items, { productId, variationId, quantity: 1 }],
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),
  clearCart: () => set({ items: [] }),
}));
