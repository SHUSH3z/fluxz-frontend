// src/store/authStore.ts
import { create } from 'zustand';
import api from '../services/api';
import type { User } from '../types/User';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));