"use client";

import { Cancel01Icon, RupeeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { ThemedInput, ThemedTextarea } from "../common/ThemedInput";
import { getImageUrl } from "../common/utils";

interface Product {
  image?: string;
  imageUrl?: string;
  name?: string;
  title?: string;
  description?: string;
  price?: string | number;
}

interface FormData {
  name: string;
  phone: string;
  message: string;
}

interface ProductEnquiryModalProps {
  product: Product;
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  errorMessage: string;
}

export default function ProductEnquiryModal({
  product,
  formData,
  onChange,
  onSubmit,
  onClose,
  isSubmitting,
  submitStatus,
  errorMessage,
}: ProductEnquiryModalProps) {
  const { primaryColor, fontHeader } = useBusinessPageTheme();

  return (
    <div
      className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full md:max-w-md bg-white rounded-t-[32px] md:rounded-[32px] overflow-hidden shadow-2xl animate-fade-in-up max-h-[92vh] flex flex-col">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h3 className="text-base font-bold text-gray-950" style={{ fontFamily: fontHeader }}>
              Product Enquiry
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Fill in your details and we&apos;ll get back to you</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {/* Product Preview */}
          <div
            className="flex gap-3 p-3 rounded-2xl"
            style={{ backgroundColor: `${primaryColor}08`, border: `1px solid ${primaryColor}20` }}
          >
            {(product.image || product.imageUrl) && (
              <img
                src={getImageUrl(product.image || product.imageUrl)}
                alt={product.name || product.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-950 capitalize line-clamp-1">
                {product.name || product.title}
              </p>
              {product.description && (
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 capitalize">
                  {product.description}
                </p>
              )}
              {product.price && (
                <div className="flex items-center gap-0.5 mt-1" style={{ color: primaryColor }}>
                  <HugeiconsIcon icon={RupeeIcon} size={11} />
                  <p className="text-sm font-bold">{product.price.toString().replace(/[₹$]/g, "")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <form id="product-enquiry-form" onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-950 mb-1.5">Full Name *</label>
              <ThemedInput
                type="text"
                value={formData.name}
                onChange={(e) => onChange({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="bg-gray-50 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-950 mb-1.5">Mobile Number *</label>
              <ThemedInput
                type="tel"
                value={formData.phone}
                onChange={(e) => onChange({ ...formData, phone: e.target.value })}
                placeholder="Enter your mobile number"
                className="bg-gray-50 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-950 mb-1.5">Message (optional)</label>
              <ThemedTextarea
                rows={3}
                value={formData.message}
                onChange={(e) => onChange({ ...formData, message: e.target.value })}
                placeholder="Any specific questions or requirements..."
                className="bg-gray-50 rounded-xl"
              />
            </div>

            {submitStatus === "success" && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-xl font-semibold animate-fade-in">
                ✓ Enquiry sent successfully! We will contact you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl font-semibold animate-fade-in">
                {errorMessage}
              </div>
            )}
          </form>
        </div>

        {/* Submit */}
        <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex-shrink-0">
          <button
            type="submit"
            form="product-enquiry-form"
            disabled={isSubmitting || submitStatus === "success"}
            className="w-full text-white py-3.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
            style={{ backgroundColor: primaryColor }}
          >
            {isSubmitting ? "Submitting..." : submitStatus === "success" ? "✓ Enquiry Sent!" : "Send Enquiry"}
          </button>
        </div>
      </div>
    </div>
  );
}
