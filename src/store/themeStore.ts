import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/translation';

export interface ContactFormData {
  name: string;
  phone: string;
  business: string;
  plan: string;
  message: string;
}

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  language: Language;
  setLanguage: (language: Language) => void;
  contactForm: ContactFormData;
  updateContactField: (field: keyof ContactFormData, value: string) => void;
  resetContactForm: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
      language: 'en',
      setLanguage: (language) => set({ language }),
      contactForm: {
        name: '',
        phone: '',
        business: '',
        plan: 'Starter',
        message: '',
      },
      updateContactField: (field, value) =>
        set((state) => ({
          contactForm: {
            ...state.contactForm,
            [field]: value,
          },
        })),
      resetContactForm: () =>
        set({
          contactForm: {
            name: '',
            phone: '',
            business: '',
            plan: 'Starter',
            message: '',
          },
        }),
    }),
    {
      name: 'Theme-store', // key in localStorage
    }
  )
);
