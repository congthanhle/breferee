import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAgreed: false,
      oaId: null,
      setUser: (user) => set({ user }),
      setUserField: (field, value) =>
        set((state) => ({
          user: { ...state.user, [field]: value },
        })),
      setOaId: (oa_id) => set({ oaId: oa_id }),
      setIsAgreed: (isAgreed) => set({ isAgreed }),
      setToken: (token) => set({ token }),
      clearUser: () => set({ user: null, token: null, isAgreed: false, oaId: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
