import { create } from 'zustand';

export interface User {
  id: number;
  login: string;
  password: string;
  age: number;
  ageInDogYears: number;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
}));
