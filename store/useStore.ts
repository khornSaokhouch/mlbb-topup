import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: any | null;
  walletBalance: number;
  setUser: (user: any) => void;
  setBalance: (balance: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      walletBalance: 0,
      setUser: (user) => set({ user }),
      setBalance: (balance) => set({ walletBalance: balance }),
      logout: () => set({ user: null, walletBalance: 0 }),
    }),
    {
      name: 'user-storage',
    }
  )
);

interface CartState {
  selectedProduct: any | null;
  gameId: string;
  zoneId: string;
  setProduct: (product: any) => void;
  setGameInfo: (gameId: string, zoneId: string) => void;
  reset: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  selectedProduct: null,
  gameId: '',
  zoneId: '',
  setProduct: (product) => set({ selectedProduct: product }),
  setGameInfo: (gameId, zoneId) => set({ gameId, zoneId }),
  reset: () => set({ selectedProduct: null, gameId: '', zoneId: '' }),
}));
