import { create } from 'zustand';
import { requester } from '../shared/helpers/requester';
import { Product } from './products.store';

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface CartStore {
  cartItems: CartItem[];
  fetchCartItems: (userId: number) => void;
}

export const useCartStore = create<CartStore>()((set) => ({
  cartItems: [],
  fetchCartItems: async (userId: number) => {
    const cartItems = await requester.get<CartItem[]>(`/users/${userId}/cart`);
    set({ cartItems: cartItems.data });
  },
}));
