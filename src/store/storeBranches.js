import { create } from 'zustand';

const useStoreBranchesStore = create((set) => ({
  storeBranches: [],
  setStoreBranches: (storeBranches) => set({ storeBranches }),
}));

export default useStoreBranchesStore;
