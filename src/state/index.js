import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLoadingStore = create((set) => ({
  loading: false,
  text: '',
  setLoading: (loading, text = '') =>
    set({ loading, text: loading ? text : '' }),
}));

export const useRegisterStore = create((set) => ({
  isRegisterSuccess: false,
  setRegisterSuccessState: () => set({ isRegisterSuccess: true }),
  resetRegisterSuccessState: () => set({ isRegisterSuccess: false }),
}));

export const useGuidesStore = create(
  persist(
    (set) => ({
      guides: [],
      isFetchedDashboard: false,
      campaign: null,
      isCheckFollow: true,
      isEndedShown: false,
      isPending: false,
      pendingInfo: null,
      fileSize: 1,
      setGuides: (guides) => set({ guides }),
      setCampaign: (campaign) => set({ campaign }),
      setIsCheckFollow: (isCheckFollow) => set({ isCheckFollow }),
      setIsFetchedDashboard: (isFetchedDashboard) => set({ isFetchedDashboard }),
      setIsEndedShown: (isEndedShown) => set({ isEndedShown }),
      setIsPending: (isPending) => set({ isPending }),
      setPendingInfo: (pendingInfo) => set({ pendingInfo }),
      clearGuides: () => set({ guides: [] }),
    }),
    {
      name: 'guides-storage',
      partialize: (state) => ({
        guides: state.guides,
        isEndedShown: state.isEndedShown,
        isPending: state.isPending,
        pendingInfo: state.pendingInfo,
        fileSize: state.fileSize,
      }),
    }
  )
);
