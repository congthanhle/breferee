import { create } from 'zustand';

export const useSheetStore = create((set) => ({
  visible: false,
  title: '',
  children: null,
  swipeToClose: false,
  setSwipeToClose: (swipeToClose) => set({ swipeToClose }),
  openSheet: ({ title = '', children }) =>
    set({ visible: true, title, children }),
  closeSheet: () =>
    set({ visible: false, title: '', children: null, swipeToClose: false }),
}));