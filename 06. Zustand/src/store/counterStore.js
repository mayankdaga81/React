import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  // The way we have written the reset function is the shorthand notation for set, when we are dircetly assigning i to a value, rather than having a function to assign the value.
  // reset: () => (set((state)=>({count: state.count}))
}));

// Also, a quick note - ALl of this is done in 1 line, It looks like we have used multiple lines, but at the core level this is just 1 line.

// In Zustand, we write () => (), multiple times.
// 1st, create((set)=>({...}))
// 2nd, increase: () => set(...)
// 3rd set((state)=>({...}))
