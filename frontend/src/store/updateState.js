import {create} from 'zustand';

const useAuthStore = create((set)=>({
    isRegistered: false,
    setRegistered: (value) => set({isRegistered: value}),
    isLoggedIn: false, 
    setLoggedIn: (value) => set({isLoggedIn: value}),
    logout : () => set({isLoggedIn: false}),
}))

export default useAuthStore;