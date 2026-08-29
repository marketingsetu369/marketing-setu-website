"use client";

import { ArrowRight02Icon, RupeeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef, useState } from "react";
import { useBusinessPageTheme } from "../common/BusinessPageContext";
import { getImageUrl } from "../common/utils";

interface Product {
  image?: string;
  imageUrl?: string;
  name?: string;
  title?: string;
  description?: string;
  price?: string | number;
  showPrice?: boolean;
  buttonName?: string;
  priceTiers?: { label: string; price: string }[];
}

interface ProductsSectionProps {
  products: Product[];
  slug: string;
  sectionClass: string;
  onEnquire: (product: Product, preSelectedTier?: string) => void;
}

export default function ProductsSection({
  products,
  slug,
  sectionClass,
  onEnquire,
}: ProductsSectionProps) {
  const { primaryColor, fontHeader, t } = useBusinessPageTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const displayProducts = products.slice(0, 5);
  const hasMore = products.length >= 6;

  const handleViewAll = () => {
    if (slug) {
      window.location.href = `/${slug}/products`;
    }
  };

  return (
    <section className={`animate-fade-in-up animation-delay-100 ${sectionClass}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-950 tracking-tight" style={{ fontFamily: fontHeader }}>
          {t("bp_products_heading")}
        </h2>
        {hasMore && (
          <span
            onClick={handleViewAll}
            className="text-xs font-semibold hover:underline cursor-pointer"
            style={{ color: primaryColor }}
          >
            {t("bp_see_all")}
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2 -mx-6 px-6"
      >
        {displayProducts.map((prod, idx) => (
          <ProductCard
            key={idx}
            prod={prod}
            primaryColor={primaryColor}
            onEnquire={onEnquire}
          />
        ))}

        {hasMore && (
          <div
            onClick={handleViewAll}
            className="w-56 flex-shrink-0 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-dashed border-gray-200 overflow-hidden flex flex-col items-center justify-center group cursor-pointer hover:-translate-y-1 transition-all duration-300 min-h-[300px]"
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform mb-3">
              <HugeiconsIcon icon={ArrowRight02Icon} size={20} style={{ color: primaryColor }} />
            </div>
            <span className="font-bold text-sm text-gray-950">{t("bp_view_all")}</span>
            <span className="text-xs text-gray-400 mt-1">+{products.length - 5} {t("bp_more_products")}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  prod,
  primaryColor,
  onEnquire,
}: {
  prod: Product;
  primaryColor: string;
  onEnquire: (product: Product, preSelectedTier?: string) => void;
}) {
  const hasMultiplePrices = prod.priceTiers && prod.priceTiers.length > 1;
  const [selectedTierIdx, setSelectedTierIdx] = useState(0);

  const displayPrice = hasMultiplePrices && prod.priceTiers
    ? prod.priceTiers[selectedTierIdx].price
    : prod.price;

  const currentPreSelectedTierStr = hasMultiplePrices && prod.priceTiers
    ? `${prod.priceTiers[selectedTierIdx].label} - ₹${prod.priceTiers[selectedTierIdx].price}`
    : undefined;

  return (
    <div className="w-56 flex-shrink-0 bg-white rounded-2xl shadow-card overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300">
      <div className="aspect-square relative bg-gray-100 rounded-t-2xl overflow-hidden">
        {(prod.image || prod.imageUrl) && (
          <img
            src={getImageUrl(prod.image || prod.imageUrl)}
            alt={prod.name || prod.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-3.5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-950 text-base tracking-tight line-clamp-1 capitalize">
            {prod.name || prod.title}
          </h3>
          {prod.description && (
            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 mb-2 font-medium leading-normal capitalize">
              {prod.description}
            </p>
          )}
        </div>
        <div className="mt-auto">
          <div className="mb-3 flex items-center justify-between gap-2 h-9">
            {hasMultiplePrices && prod.priceTiers ? (
              <>
                <select
                  value={selectedTierIdx}
                  onChange={(e) => setSelectedTierIdx(Number(e.target.value))}
                  onClick={(e) => e.stopPropagation()} // Prevent card navigation or click events
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-800 focus:outline-none max-w-[55%]"
                >
                  {prod.priceTiers.map((tier, idx) => (
                    <option key={idx} value={idx}>
                      {tier.label}
                    </option>
                  ))}
                </select>
                {prod.showPrice !== false && displayPrice && (
                  <div className="flex items-center gap-0.5 text-gray-950 flex-shrink-0">
                    <HugeiconsIcon icon={RupeeIcon} size={13} className="flex-shrink-0" />
                    <p className="text-sm font-bold">
                      {displayPrice.toString()}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {prod.showPrice !== false && displayPrice && (
                  <div className="flex items-center gap-0.5 text-gray-950 flex-shrink-0">
                    <HugeiconsIcon icon={RupeeIcon} size={13} className="flex-shrink-0" />
                    <p className="text-sm font-bold">
                      {displayPrice.toString()}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnquire(prod, currentPreSelectedTierStr);
            }}
            className="w-full bg-transparent hover:bg-gray-50 text-xs py-2 rounded-lg font-bold active:scale-95 transition-all border text-center"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            {prod.buttonName || "Enquiry"}
          </button>
        </div>
      </div>
    </div>
  );
}
