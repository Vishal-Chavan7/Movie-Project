import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  isRegistered: false,
  setLoginState: (isLoggedIn, user) => set({ isLoggedIn, user }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setRegistered: (isRegistered) => set({ isRegistered }), 
  logout: () => set({ isLoggedIn: false, user: null }),
}));

export default useAuthStore;