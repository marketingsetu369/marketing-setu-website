"use client";
 
import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import { ArrowLeft02Icon, RupeeIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React, { useState } from "react";
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
}
 
interface ProductsListViewProps {
  data: any;
  slug: string;
}
 
export default function ProductsListView({ data, slug }: ProductsListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
 
  const primaryColor = data?.theme_color_hex || "#7265E3";
  const businessName = data?.header?.business_name || data?.business_name || "";
  const logoUrl = data?.header?.logo_url || data?.logo_url || "";
  const products: Product[] = Array.isArray(data?.products) ? data.products : [];
 
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
      await BusinessPageApi.submitEnquiry(slug, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        isProduct: true,
        productName: selectedProduct?.name || selectedProduct?.title || undefined,
        productPrice: selectedProduct?.price?.toString() || undefined,
        productDescription: selectedProduct?.description || undefined,
      });
      setSubmitStatus("success");
      setFormData({ name: "", phone: "", message: "" });
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
 
  const openProductEnquiry = (prod: Product) => {
    setSelectedProduct(prod);
    setSubmitStatus("idle");
    setErrorMessage("");
    setFormData({ name: "", phone: "", message: "" });
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
            <div>
              <h1 className="text-sm font-bold text-gray-950 tracking-tight leading-tight">
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
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
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
                      {prod.showPrice !== false && prod.price && (
                        <div className="mb-3 flex items-center gap-0.5 text-gray-950">
                          <HugeiconsIcon icon={RupeeIcon} size={13} className="flex-shrink-0" />
                          <p className="text-xs sm:text-sm font-bold">
                            {prod.price.toString()}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => openProductEnquiry(prod)}
                        className="w-full bg-transparent hover:bg-gray-50 text-[10px] sm:text-xs py-2 rounded-lg font-bold active:scale-95 transition-all border text-center"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                      >
                        {prod.buttonName || "Enquiry"}
                      </button>
                    </div>
                  </div>
                </div>
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
