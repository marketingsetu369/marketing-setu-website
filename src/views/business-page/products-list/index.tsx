"use client";
 
import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import { ArrowLeft02Icon, RupeeIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { BusinessPageProvider } from "../common/BusinessPageContext";
import { getImageUrl } from "../common/utils";
import ProductEnquiryModal from "../default-section/ProductEnquiryModal";
 
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
 
interface ProductsListViewProps {
  data: any;
  slug: string;
}
 
export default function ProductsListView({ data, slug }: ProductsListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    message: string;
    selectedPriceTier?: string;
  }>({ name: "", phone: "", message: "", selectedPriceTier: "" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
 
  const primaryColor = data?.theme_color_hex || "#7265E3";
  const businessName = data?.header?.business_name || data?.business_name || "";
  const logoUrl = data?.header?.logo_url || data?.logo_url || "";
 
  // Map raw product pricing json to tiers
  const products: Product[] = useMemo(() => {
    if (!data || !Array.isArray(data.products)) return [];
    return data.products.map((p: any) => {
      let priceTiers: { label: string; price: string }[] | undefined = undefined;
      let displayPrice = p.price;
      if (p.price && String(p.price).trim().startsWith("[")) {
        try {
          const parsed = JSON.parse(String(p.price).trim());
          if (Array.isArray(parsed) && parsed.length > 0) {
            priceTiers = parsed.map((item: any) => ({
              label: String(item.label || "").trim(),
              price: String(item.price || "").trim(),
            }));
            if (priceTiers.length > 1) {
              displayPrice = `From ${priceTiers[0].price}`;
            } else if (priceTiers.length === 1) {
              displayPrice = `${priceTiers[0].price}`;
            }
          }
        } catch (_) {}
      } else if (p.price) {
        displayPrice = String(p.price).trim();
      }
      return {
        ...p,
        price: displayPrice,
        priceTiers,
      };
    });
  }, [data]);
 
  const filteredProducts = products.filter((prod) => {
    const name = (prod.name || prod.title || "").toLowerCase();
    const desc = (prod.description || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || desc.includes(query);
  });
 
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage("Name and phone number are required.");
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    try {
      const selectedOptionText = formData.selectedPriceTier
        ? `Option selected: ${formData.selectedPriceTier}`
        : "";
      const enquiryMsg = [formData.message.trim(), selectedOptionText]
        .filter(Boolean)
        .join("\n");

      await BusinessPageApi.submitEnquiry(slug, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message: enquiryMsg,
        isProduct: true,
        productName: selectedProduct?.name || selectedProduct?.title || undefined,
        productPrice: selectedProduct?.price?.toString() || undefined,
        productDescription: selectedProduct?.description || undefined,
      });
      setSubmitStatus("success");
      setFormData({ name: "", phone: "", message: "", selectedPriceTier: "" });
      setTimeout(() => {
        setSelectedProduct(null);
        setSubmitStatus("idle");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err?.response?.data?.message || err?.message || "Failed to submit enquiry. Please try again."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const openProductEnquiry = (prod: Product, preSelectedTier?: string) => {
    setSelectedProduct(prod);
    setSubmitStatus("idle");
    setErrorMessage("");
    setFormData({ name: "", phone: "", message: "", selectedPriceTier: preSelectedTier || "" });
  };
 
  return (
    <BusinessPageProvider primaryColor={primaryColor}>
      <div className="min-h-screen bg-gray-50 pb-12" style={{ fontFamily: "var(--font-inter)" }}>
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/${slug}`}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
            </Link>
            {logoUrl && (
              <img
                src={getImageUrl(logoUrl)}
                alt={businessName}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
            )}
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-gray-950 tracking-tight leading-tight truncate min-w-0">
                {businessName}
              </h1>
              <p className="text-[10px] text-gray-500 font-medium">Products &amp; Services</p>
            </div>
          </div>
        </header>
 
        {/* Search bar & count */}
        <div className="max-w-[1280px] mx-auto px-6 mt-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-950 tracking-tight">All Products ({filteredProducts.length})</h2>
              <p className="text-xs text-gray-500 mt-0.5">Browse the catalog and send enquiries</p>
            </div>
 
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <HugeiconsIcon icon={Search01Icon} size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all text-gray-950 font-medium placeholder:text-gray-400"
              />
            </div>
          </div>
 
          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 px-6 text-center">
              <p className="text-sm text-gray-500 font-bold">No products found</p>
              <p className="text-xs text-gray-400 mt-1">Try resetting your search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[600px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((prod, idx) => (
                <ProductCard
                  key={idx}
                  prod={prod}
                  primaryColor={primaryColor}
                  onEnquire={openProductEnquiry}
                />
              ))}
            </div>
          )}
        </div>
 
        {/* Enquiry Modal */}
        {selectedProduct && (
          <ProductEnquiryModal
            product={selectedProduct}
            formData={formData}
            onChange={setFormData}
            onSubmit={handleEnquirySubmit}
            onClose={() => setSelectedProduct(null)}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </BusinessPageProvider>
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
    <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-gray-100">
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
          <h3 className="font-semibold text-gray-950 text-sm sm:text-base tracking-tight line-clamp-1 capitalize">
            {prod.name || prod.title}
          </h3>
          {prod.description && (
            <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2 mt-0.5 mb-2 font-medium leading-normal capitalize">
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
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none max-w-[55%]"
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
                    <p className="text-xs sm:text-sm font-bold">
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
                    <p className="text-xs sm:text-sm font-bold">
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
            className="w-full bg-transparent hover:bg-gray-50 text-[10px] sm:text-xs py-2 rounded-lg font-bold active:scale-95 transition-all border text-center"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            {prod.buttonName || "Enquiry"}
          </button>
        </div>
      </div>
    </div>
  );
}
