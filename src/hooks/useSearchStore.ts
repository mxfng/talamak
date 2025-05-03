import { create } from "zustand";

interface SearchStoreState {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const useSearchStore = create<SearchStoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
}));
