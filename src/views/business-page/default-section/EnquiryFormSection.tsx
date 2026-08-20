"use client";

import React from "react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { ThemedInput, ThemedTextarea } from "../common/ThemedInput";

interface FormData {
  name: string;
  phone: string;
  message: string;
}

interface EnquiryFormSectionProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  errorMessage: string;
  sectionClass: string;
}

export default function EnquiryFormSection({
  formData,
  onChange,
  onSubmit,
  onReset,
  isSubmitting,
  submitStatus,
  errorMessage,
  sectionClass,
}: EnquiryFormSectionProps) {
  const { primaryColor, fontHeader, t } = useBusinessPageTheme();

  return (
    <section className={`animate-fade-in-up animation-delay-500 ${sectionClass}`}>
      <h2 className="text-lg font-semibold text-gray-950 tracking-tight mb-5" style={{ fontFamily: fontHeader }}>
        {t("bp_enquiry_heading")}
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="clientName" className="block text-sm font-semibold text-gray-950 mb-2">
            {t("bp_full_name")}
          </label>
          <ThemedInput
            type="text"
            id="clientName"
            value={formData.name}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
            placeholder={t("bp_name_placeholder")}
            required
          />
        </div>

        <div>
          <label htmlFor="clientPhone" className="block text-sm font-semibold text-gray-950 mb-2">
            {t("bp_mobile_number")}
          </label>
          <ThemedInput
            type="tel"
            id="clientPhone"
            value={formData.phone}
            onChange={(e) => onChange({ ...formData, phone: e.target.value })}
            placeholder={t("bp_mobile_placeholder")}
            required
          />
        </div>

        <div>
          <label htmlFor="clientMessage" className="block text-sm font-semibold text-gray-950 mb-2">
            {t("bp_message")}
          </label>
          <ThemedTextarea
            id="clientMessage"
            rows={4}
            value={formData.message}
            onChange={(e) => onChange({ ...formData, message: e.target.value })}
            placeholder={t("bp_message_placeholder")}
            required
          />
        </div>

        {submitStatus === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-lg font-semibold animate-fade-in">
            {t("bp_enquiry_success")}
          </div>
        )}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg font-semibold animate-fade-in">
            {errorMessage}
          </div>
        )}

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 bg-slate-50 hover:bg-slate-100 text-gray-950 py-3.5 rounded-lg font-bold text-sm active:scale-[0.98] transition-all cursor-pointer text-center"
          >
            {t("bp_reset")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 text-white py-3.5 rounded-lg font-bold text-sm active:scale-[0.98] transition-all cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            {isSubmitting ? t("bp_submitting") : t("bp_submit")}
          </button>
        </div>
      </form>
    </section>
  );
}
