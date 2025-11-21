import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type BearStore = {
  bears: number;
  addABear: () => void;
  removeABear: () => void;
  increment: (by?: number) => void;
  decrement: (by?: number) => void;
};

export const useBearStore = create<BearStore>()(
  devtools(
    persist(
      (set, get) => ({
        bears: 0,
        addABear: () => set({ bears: get().bears + 1 }),
        removeABear: () =>
          set((state) => ({ bears: Math.max(0, state.bears - 1) })), // prevents negative
        increment: (by = 1) => set({ bears: get().bears + by }),
        decrement: (by = 1) =>
          set((state) => ({ bears: Math.max(0, state.bears - by) })), // prevents negative
      }),
      {
        name: "zustand-session",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
