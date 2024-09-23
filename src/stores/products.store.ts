import { create } from 'zustand';
import { requester } from '../shared/helpers/requester';

export interface Product {
  id: number;
  title: string;
  desc: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  fetchProducts: async () => {
    const products = await requester.get<Product[]>('/products');
    set({ products: products.data });
  },
}));
