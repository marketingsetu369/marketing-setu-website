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

  return (
    <AppCard
      elevation="md"
      hoverElevation="lg"
      className={`transition-all !p-4 sm:!p-5 ${
        isUnread
          ? "bg-warning-lighter/30 dark:bg-warning-darker/20"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
              isUnread
                ? "bg-brand-main text-white"
                : "bg-neutral text-secondary"
            }`}
          >
            {(enquiry.name || "C")[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-primary">
                {enquiry.name || "Anonymous Lead"}
              </h4>
              {isUnread && (
                <PortalBadge variant="warning" size="sm">
                  New
                </PortalBadge>
              )}
            </div>
            <p className="text-xs text-secondary font-medium">
              +91 {formattedPhone}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-medium text-disabled mr-1">
            {formattedDate}
          </span>
          {isUnread && onMarkRead && (
            <button
              type="button"
              onClick={() => onMarkRead(enquiry.id)}
              title="Mark as Read"
              className="p-1.5 rounded-lg hover:bg-neutral text-disabled hover:text-success-main transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(enquiry.id)}
              title="Delete Enquiry"
              className="p-1.5 rounded-lg hover:bg-error-lighter/40 dark:hover:bg-error-darker/40 text-disabled hover:text-error-main transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Product / Message Details */}
      {(isProduct || enquiry.message) && (
        <div className="mt-3.5 pt-3 border-t border-outline space-y-2">
          {isProduct && (
            <div className="flex items-center gap-1.5 text-xs text-brand-main font-semibold">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Product Interest: {enquiry.productName}</span>
            </div>
          )}
          {enquiry.message && !compact && (
            <p className="text-xs text-secondary font-normal leading-relaxed bg-neutral p-2.5 rounded-xl border border-outline">
              &quot;{enquiry.message}&quot;
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleCall}
          className="flex-1 py-2 px-3 rounded-xl border border-outline bg-paper hover:bg-neutral text-secondary hover:text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-z1"
        >
          <svg className="w-3.5 h-3.5 text-brand-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-z4"
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
