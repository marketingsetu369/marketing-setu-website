"use client";

import React from "react";
import { BusinessOffer } from "@/types/businessPage";

interface OffersSectionProps {
  offers?: BusinessOffer[];
  showOffers?: boolean;
  businessName?: string;
  whatsapp?: string;
  phone?: string;
  sectionClass?: string;
}

export default function OffersSection({
  offers = [],
  showOffers = true,
  businessName = "Business",
  whatsapp,
  phone,
  sectionClass = "",
}: OffersSectionProps) {
  // Filter active offers
  const activeOffers = offers.filter((o) => o.isActive !== false && o.is_active !== false);

  if (!showOffers || activeOffers.length === 0) {
    return null;
  }

  const contactNumber = (whatsapp || phone || "").replace(/[^0-9]/g, "");

  const handleClaimOffer = (offer: BusinessOffer) => {
    const title = offer.title;
    const priceText = offer.offerPrice || offer.offer_price ? ` at ${offer.offerPrice || offer.offer_price}` : "";
    const msg = encodeURIComponent(
      `Hi ${businessName}, I would like to claim the offer: "${title}"${priceText}. Please let me know how to proceed!`
    );

    if (contactNumber) {
      window.open(`https://wa.me/${contactNumber}?text=${msg}`, "_blank");
    } else {
      const el = document.getElementById("clientName");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        el.focus();
      }
    }
  };

  return (
    <section className={`px-4 md:px-8 py-6 border-b border-gray-100 ${sectionClass}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </span>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
              Special Offers & Deals
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5 ml-9">
            Exclusive discounts and limited-time festive promotions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeOffers.map((offer) => {
          const badge = offer.badgeText || offer.badge_text;
          const offerPrice = offer.offerPrice || offer.offer_price;
          const originalPrice = offer.originalPrice || offer.original_price;
          const validTill = offer.validTill || offer.valid_till;

          return (
            <div
              key={offer.id || offer.title}
              className="relative group rounded-2xl p-4 bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/80 hover:border-[var(--primary-color)]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header row: Badge & Validity */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  {badge ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[var(--primary-color)]/10 text-[var(--primary-color)] border border-[var(--primary-color)]/20">
                      {badge}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      SPECIAL DEAL
                    </span>
                  )}
                  {validTill && (
                    <span className="text-[11px] text-gray-400 font-medium">
                      Till {validTill}
                    </span>
                  )}
                </div>

                {/* Offer Title */}
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[var(--primary-color)] transition-colors line-clamp-2">
                  {offer.title}
                </h3>

                {/* Offer Description */}
                {offer.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                    {offer.description}
                  </p>
                )}
              </div>

              {/* Bottom row: Pricing & Claim Button */}
              <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  {offerPrice && (
                    <span className="text-lg font-extrabold text-[var(--primary-color)]">
                      {offerPrice.startsWith("₹") ? offerPrice : `₹${offerPrice}`}
                    </span>
                  )}
                  {originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {originalPrice.startsWith("₹") ? originalPrice : `₹${originalPrice}`}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleClaimOffer(offer)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm hover:shadow transition-all active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Claim Offer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
