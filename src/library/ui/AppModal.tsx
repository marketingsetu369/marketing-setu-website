"use client";

import React, { useEffect } from "react";
import AppCard from "./AppCard";

export interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const maxWidthStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function AppModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "lg",
  className = "",
}: AppModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-grey-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full ${maxWidthStyles[maxWidth]} z-10 animate-fade-in-up`}>
        <AppCard
          elevation="xl"
          className={`!p-6 sm:!p-8 space-y-6 ${className}`}
        >
          {(title || subtitle) && (
            <div className="flex items-center justify-between border-b border-outline pb-4">
              <div>
                {title && (
                  <h3 className="text-lg font-bold text-primary tracking-tight">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-xs text-secondary font-medium mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-disabled hover:text-primary hover:bg-neutral transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <div>{children}</div>
        </AppCard>
      </div>
    </div>
  );
}

export default AppModal;
