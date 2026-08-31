"use client";

import { EnquiryItem } from "@/api/repositories/userDashboardApi";
import { AppCard } from "@/components/library/AppCard";
import React from "react";
import PortalBadge from "./PortalBadge";

export interface PortalLeadCardProps {
  enquiry: EnquiryItem;
  onMarkRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  compact?: boolean;
}

export default function PortalLeadCard({
  enquiry,
  onMarkRead,
  onDelete,
  compact = false,
}: PortalLeadCardProps) {
  const isUnread = !enquiry.isRead;
  const isProduct = Boolean(enquiry.isProduct || enquiry.productName);

  const cleanPhone = (enquiry.phone || "").replace(/\D/g, "");
  const formattedPhone = cleanPhone.startsWith("91") && cleanPhone.length === 12 ? cleanPhone.slice(2) : cleanPhone;

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!formattedPhone) return;
    window.location.href = `tel:+91${formattedPhone}`;
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!formattedPhone) return;
    const msg = encodeURIComponent(
      `Hello ${enquiry.name || "Customer"}, thanks for contacting us regarding ${
        enquiry.productName || "our services"
      }!`
    );
    window.open(`https://wa.me/91${formattedPhone}?text=${msg}`, "_blank");
  };

  const formattedDate = enquiry.createdAt
    ? new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  // Avatar color generator based on name
  const nameInitial = (enquiry.name || "C")[0].toUpperCase();

  return (
    <AppCard
      elevation={isUnread ? "lg" : "sm"}
      hoverElevation="xl"
      className={`group relative flex flex-col justify-between transition-all duration-300 !p-5 rounded-2xl border ${
        isUnread
          ? "border-brand-main/40 bg-gradient-to-b from-brand-lighter/20 via-paper to-paper shadow-z4 hover:border-brand-main"
          : "border-outline/70 bg-paper hover:border-outline hover:shadow-z4"
      }`}
    >
      {/* Glow dot for unread status */}
      {isUnread && (
        <span className="absolute top-4 right-4 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-main opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-main"></span>
        </span>
      )}

      <div>
        {/* Header: Avatar, Name, Phone & Quick Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105 ${
                isUnread
                  ? "bg-gradient-to-br from-brand-main to-brand-dark text-white shadow-brand-main/20"
                  : "bg-neutral text-primary border border-outline/80"
              }`}
            >
              {nameInitial}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-primary truncate">
                  {enquiry.name || "Anonymous Lead"}
                </h4>
              </div>
              <p className="text-xs font-semibold text-secondary mt-0.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                +91 {formattedPhone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            {isUnread && onMarkRead && (
              <button
                type="button"
                onClick={() => onMarkRead(enquiry.id)}
                title="Mark as Read"
                className="p-1.5 rounded-xl hover:bg-success-lighter/50 text-disabled hover:text-success-main transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(enquiry.id)}
                title="Delete Lead"
                className="p-1.5 rounded-xl hover:bg-error-lighter/50 dark:hover:bg-error-darker/30 text-disabled hover:text-error-main transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Lead Category Badge / Date */}
        <div className="mt-3.5 flex items-center justify-between gap-2">
          {isProduct ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-lighter/60 dark:bg-brand-dark/20 text-brand-main font-semibold text-[11px] border border-brand-main/20 truncate">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="truncate">{enquiry.productName}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral text-secondary font-semibold text-[11px] border border-outline">
              General Enquiry
            </span>
          )}

          <span className="text-[11px] font-medium text-disabled shrink-0">
            {formattedDate}
          </span>
        </div>

        {/* Customer Message snippet */}
        {enquiry.message && !compact && (
          <div className="mt-3 bg-neutral/80 dark:bg-neutral/40 p-3 rounded-xl border border-outline/60 text-xs text-secondary leading-relaxed line-clamp-3">
            &ldquo;{enquiry.message}&rdquo;
          </div>
        )}
      </div>

      {/* Action CTA Buttons: Call & WhatsApp */}
      <div className="mt-4 pt-3.5 border-t border-outline/60 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={handleCall}
          className="py-2 px-3 rounded-xl border border-outline bg-paper hover:bg-neutral text-secondary hover:text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-sm active:scale-95 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-brand-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>Direct Call</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20bd5a] hover:to-[#19a550] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#25D366]/20 active:scale-95 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span>WhatsApp</span>
        </button>
      </div>
    </AppCard>
  );
}
