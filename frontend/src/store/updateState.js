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

const useSearchStore = create((set)=> ({
  searchQuery: "",
  setSearchQuery: (query) => set({searchQuery: query }),
  clearSearchQuery: () => set({searchQuery: ""}),
}))

export default useAuthStore ;

export { useSearchStore };