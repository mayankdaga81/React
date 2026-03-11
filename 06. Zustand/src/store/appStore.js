import { create } from "zustand";

// Usually dev prefer to have separate store for separate things, ex different store for Auth, and a different store for the UI.
// ALos, we have used set({user}) dircetly, which is the shorthand notation for set(()=>((state)=>({user: state.user})))

export const useAppStore = create((set) => ({
  // Auth slice
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),

  // UI slice
  theme: "light",
  toggleTheme: () => (state) => ({
    theme: state.theme === "light" ? "dark" : "light",
  }),
}));
