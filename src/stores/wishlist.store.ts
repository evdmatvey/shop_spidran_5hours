import { create } from 'zustand';
import { requester } from '../shared/helpers/requester';
import { Product } from './products.store';

export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
}

interface WishlistStore {
  wishlistItems: WishlistItem[];
  fetchWishlistItems: (userId: number) => void;
}

export const useWishlistStore = create<WishlistStore>()((set) => ({
  wishlistItems: [],
  fetchWishlistItems: async (userId: number) => {
    const wishlistItems = await requester.get<WishlistItem[]>(`/users/${userId}/wishlist`);
    set({ wishlistItems: wishlistItems.data });
  },
}));
