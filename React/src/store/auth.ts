import { create } from "zustand";
import { login } from "../services/api";
import type { Usuario } from "../types";

type AuthState = {
  user: Usuario | null;
  isAuthenticated: boolean;
  login: (nome: string, senha: string) => Promise<boolean>;
  logout: () => void;
};

const LS_KEY = "auth.session";

function loadSession(): Usuario | null {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Usuario;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadSession(),
  isAuthenticated: !!loadSession(),
  login: async (nome, senha) => {
    const u = await login(nome, senha);
    if (u) {
      localStorage.setItem(LS_KEY, JSON.stringify(u));
      set({ user: u, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem(LS_KEY);
    set({ user: null, isAuthenticated: false });
  }
}));