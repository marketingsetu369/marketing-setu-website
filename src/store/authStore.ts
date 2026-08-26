import { create } from "zustand";

export interface UserProfile {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  plan?: string | null;
  planExpiresAt?: string | null;
  isActive: boolean;
  accessKey?: string | null;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: UserProfile) => void;
  updateUser: (user: Partial<UserProfile>) => void;
  logout: () => void;
  initFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (token: string, user: UserProfile) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("marketingsetu_user_token", token);
      localStorage.setItem("marketingsetu_user_data", JSON.stringify(user));
    }
    set({
      token,
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  updateUser: (updatedFields: Partial<UserProfile>) => {
    const current = get().user;
    if (!current) return;
    const merged = { ...current, ...updatedFields };
    if (typeof window !== "undefined") {
      localStorage.setItem("marketingsetu_user_data", JSON.stringify(merged));
    }
    set({ user: merged });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("marketingsetu_user_token");
      localStorage.removeItem("marketingsetu_user_data");
    }
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  initFromStorage: () => {
    if (typeof window === "undefined") {
      set({ isLoading: false });
      return;
    }

    try {
      const token = localStorage.getItem("marketingsetu_user_token");
      const userJson = localStorage.getItem("marketingsetu_user_data");
      if (token && userJson) {
        const user = JSON.parse(userJson);
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      }
    } catch (e) {
      console.error("Failed to parse stored auth session", e);
    }

    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
