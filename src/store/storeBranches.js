import { create } from 'zustand';

const useStoreBranchesStore = create((set) => ({
  storeBranchActive: { id: 0 },
  storeBranches: [],
  setStoreBranches: (storeBranches) => set({ storeBranches }),
  setStoreBranchActive: (storeBranchActive) => set({ storeBranchActive }),
}));

export default useStoreBranchesStore;
