"use client";

import React from "react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";

// ─── ThemedInput ────────────────────────────────────────────────────────────

interface ThemedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  className?: string;
}

export function ThemedInput({ className = "", ...props }: ThemedInputProps) {
  const { inputFocusStyle, inputBlurStyle } = useBusinessPageTheme();

  return (
    <input
      {...props}
      className={`w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-all ${className}`}
      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
      onBlur={(e) => Object.assign(e.target.style, inputBlurStyle)}
    />
  );
}

// ─── ThemedTextarea ──────────────────────────────────────────────────────────

interface ThemedTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  className?: string;
}

export function ThemedTextarea({ className = "", ...props }: ThemedTextareaProps) {
  const { inputFocusStyle, inputBlurStyle } = useBusinessPageTheme();

  return (
    <textarea
      {...props}
      className={`w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-all resize-none ${className}`}
      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
      onBlur={(e) => Object.assign(e.target.style, inputBlurStyle)}
    />
  );
}
