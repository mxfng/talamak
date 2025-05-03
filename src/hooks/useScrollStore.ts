import { create } from "zustand";

interface ScrollStoreState {
  scrollPosition: number;
  setScrollPosition: (scrollPosition: number) => void;
}

export const useScrollStore = create<ScrollStoreState>((set) => ({
  scrollPosition: 0,
  setScrollPosition: (scrollPosition: number) => set({ scrollPosition }),
}));
