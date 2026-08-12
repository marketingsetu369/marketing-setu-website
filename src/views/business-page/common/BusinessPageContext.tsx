"use client";

import React, { createContext, useContext } from "react";

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
}

const BusinessPageContext = createContext<BusinessPageTheme | null>(null);

export function BusinessPageProvider({
  primaryColor,
  children,
}: {
  primaryColor: string;
  children: React.ReactNode;
}) {
  const primaryLight = `${primaryColor}10`;
  const primaryBorder = `${primaryColor}25`;

  const value: BusinessPageTheme = {
    primaryColor,
    primaryLight,
    primaryBorder,
    fontHeader: FONT_HEADER,
    fontSans: FONT_SANS,
    inputFocusStyle: { borderColor: primaryColor, outline: "none", boxShadow: "none" },
    inputBlurStyle: { borderColor: "", outline: "none", boxShadow: "none" },
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
