import { create } from 'zustand';

export const useLoadingStore = create((set) => ({
  loading: false,
  text: '',
  setLoading: (loading, text = '') =>
    set({ loading, text: loading ? text : '' }),
}));

