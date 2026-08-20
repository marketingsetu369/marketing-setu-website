"use client";

import React, { createContext, useContext } from "react";
import { translations } from "@/translation";
import type { Language, TranslationDictionary } from "@/translation";

// Fonts
export const FONT_HEADER = "var(--font-poppins)";
export const FONT_SANS = "var(--font-inter)";

export interface BusinessPageTheme {
  primaryColor: string;
  primaryLight: string;
  primaryBorder: string;
  fontHeader: string;
  fontSans: string;
  inputFocusStyle: React.CSSProperties;
  inputBlurStyle: React.CSSProperties;
  language: Language;
  t: (key: keyof TranslationDictionary) => string;
}

const BusinessPageContext = createContext<BusinessPageTheme | null>(null);

export function BusinessPageProvider({
  primaryColor,
  language = "en",
  children,
}: {
  primaryColor: string;
  language?: string;
  children: React.ReactNode;
}) {
  const primaryLight = `${primaryColor}10`;
  const primaryBorder = `${primaryColor}25`;

  // Normalise language code: accept 'en', 'hi', 'mr' (or fallback to 'en')
  const lang: Language = (["en", "hi", "mr"].includes(language) ? language : "en") as Language;
  const dict = translations[lang] ?? translations["en"];
  const t = (key: keyof TranslationDictionary): string => dict[key] ?? translations["en"][key] ?? key;

  const value: BusinessPageTheme = {
    primaryColor,
    primaryLight,
    primaryBorder,
    fontHeader: FONT_HEADER,
    fontSans: FONT_SANS,
    inputFocusStyle: { borderColor: primaryColor, outline: "none", boxShadow: "none" },
    inputBlurStyle: { borderColor: "", outline: "none", boxShadow: "none" },
    language: lang,
    t,
  };

  return (
    <BusinessPageContext.Provider value={value}>
      {children}
    </BusinessPageContext.Provider>
  );
}

export function useBusinessPageTheme(): BusinessPageTheme {
  const ctx = useContext(BusinessPageContext);
  if (!ctx) throw new Error("useBusinessPageTheme must be used inside BusinessPageProvider");
  return ctx;
}
