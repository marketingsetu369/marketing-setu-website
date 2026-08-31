"use client";

import React from "react";
import { AppButton } from "./AppButton";
import { AppModal } from "./AppModal";

export interface AppConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "primary";
  isLoading?: boolean;
}

export function AppConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. Do you want to proceed?",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: AppConfirmDialogProps) {
  const isDanger = variant === "danger";

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="sm"
      className="!p-6 space-y-5"
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
            isDanger
              ? "bg-error-lighter/60 dark:bg-error-darker/40 text-error-main"
              : variant === "warning"
              ? "bg-warning-lighter/60 dark:bg-warning-darker/40 text-warning-main"
              : "bg-brand-lighter/60 text-brand-main"
          }`}
        >
          {isDanger ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="text-base font-bold text-primary leading-snug">{title}</h3>
          <p className="text-xs text-secondary leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline">
        <AppButton
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelText}
        </AppButton>
        <AppButton
          type="button"
          variant={isDanger ? "danger" : "primary"}
          size="sm"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : confirmText}
        </AppButton>
      </div>
    </AppModal>
  );
}

export default AppConfirmDialog;
