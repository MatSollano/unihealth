import { create } from 'zustand';

type Role = 'patient' | 'specialist' | null;

interface AuthState {
  user: any;
  role: Role;
  setUser: (user: any) => void;
  setRole: (role: Role) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  logout: () => set({ user: null, role: null }),
}));

export default useAuthStore;
