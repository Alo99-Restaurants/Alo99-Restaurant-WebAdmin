import { create } from 'zustand';

const useStoreBranchesStore = create((set) => ({
  storeBranchActive: {},
  storeBranches: [],
  setStoreBranches: (storeBranches) => set({ storeBranches }),
  setStoreBranchActive: (storeBranchActive) => set({ storeBranchActive }),
}));

export default useStoreBranchesStore;
