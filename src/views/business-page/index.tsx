"use client";

import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import React, { useState } from "react";
import { BusinessPageProvider } from "./common/BusinessPageContext";
import { getSectionStyle, getYouTubeId } from "./common/utils";
import { translations } from "@/translation";
import type { Language } from "@/translation";
import {
  BusinessHeader,
  DesktopCta,
  EnquiryFormSection,
  FloatingCta,
  GalleryLightbox,
  GallerySection,
  LocationSection,
  OwnerCard,
  ProductEnquiryModal,
  ProductsSection,
  SocialLinksSection,
  TestimonialsSection,
  VideoSection,
} from "./default-section";
import { usePageTracking } from "./hooks/usePageTracking";

interface BusinessViewProps {
  data: any;
  slug: string;
}

export default function BusinessView({ data, slug }: BusinessViewProps) {
  usePageTracking(slug);

  // ── State ────────────────────────────────────────────────────────────────
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    message: string;
    selectedPriceTier?: string;
  }>({ name: "", phone: "", message: "", selectedPriceTier: "" });
  const [isProductEnquiry, setIsProductEnquiry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ── Data defaults ────────────────────────────────────────────────────────
  const primaryColor = data?.theme_color_hex || "#7265E3";
  const pageLanguage: string = data?.language || "en";

  const header = {
    business_name: data?.header?.business_name || "",
    tagline: data?.header?.tagline || "",
    business_category: data?.header?.business_category || "",
    logo_url: data?.header?.logo_url || "",
  };

  const contact = {
    phone: data?.contact?.phone || "",
    whatsapp: data?.contact?.whatsapp || "",
    email: data?.contact?.email || "",
    maps_link: data?.contact?.maps_link || "",
    address: data?.contact?.address || "",
  };

  const ownerList = Array.isArray(data?.owner) ? data.owner : [];
  const gallery = Array.isArray(data?.gallery) ? data.gallery : [];
  const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];

  // Map raw product pricing json to displayable price
  const products = React.useMemo(() => {
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

  const socialLinks = {
    instagram: data?.social_links?.instagram || "",
    facebook: data?.social_links?.facebook || "",
    youtube: data?.social_links?.youtube || "",
    twitter: data?.social_links?.twitter || "",
  };

  // ── Section visibility ───────────────────────────────────────────────────
  const showVideo = !!(data?.youtube_url && getYouTubeId(data.youtube_url));
  const visibleStates = [
    false, // stats (in left column)
    showVideo,
    products.length > 0,
    testimonials.length > 0,
    gallery.length > 0,
    !!(socialLinks.instagram || socialLinks.facebook || socialLinks.youtube || socialLinks.twitter),
    true, // enquiry always visible
    !!contact.maps_link,
  ];
  const section = (key: string) => getSectionStyle(key, visibleStates);

  // ── Handlers ─────────────────────────────────────────────────────────────
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
        isProduct: isProductEnquiry,
        productName: selectedProduct?.name || selectedProduct?.title || undefined,
        productPrice: selectedProduct?.price?.toString() || undefined,
        productDescription: selectedProduct?.description || undefined,
      });
      setSubmitStatus("success");
      setFormData({ name: "", phone: "", message: "", selectedPriceTier: "" });
      setTimeout(() => { setSelectedProduct(null); setSubmitStatus("idle"); }, 2000);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || err?.message || "Failed to submit enquiry. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToEnquiry = () => {
    setIsProductEnquiry(false);
    const el = document.getElementById("clientName");
    if (el) { el.scrollIntoView({ behavior: "smooth" }); el.focus(); }
  };

  const openProductEnquiry = (prod: any, preSelectedTier?: string) => {
    setSelectedProduct(prod);
    setIsProductEnquiry(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    setFormData({ name: "", phone: "", message: "", selectedPriceTier: preSelectedTier || "" });
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <BusinessPageProvider primaryColor={primaryColor} language={pageLanguage}>
      <div
        className="min-h-screen bg-[var(--color-grey-100)] flex justify-center items-start md:items-center py-0 md:py-8"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div className="w-full md:max-w-[1280px] bg-[var(--color-grey-100)] min-h-screen md:min-h-[820px] md:h-[820px] relative flex flex-col md:flex-row overflow-hidden animate-fade-in-up">

          {/* ── LEFT COLUMN ── */}
          <div className="w-full md:w-[35%] bg-[var(--color-grey-100)] flex flex-col justify-between relative md:pb-0 md:h-full md:overflow-y-auto no-scrollbar">
            <div>
              <BusinessHeader header={header} contact={contact} slug={slug} />
              <OwnerCard ownerList={ownerList} />
              <DesktopCta phone={contact.phone} slug={slug} onMessageClick={scrollToEnquiry} />
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-full md:w-[65%] flex flex-col overflow-y-auto md:h-full no-scrollbar bg-white pb-8 md:pb-8 md:border-l-[10px] md:border-white">
            <VideoSection youtubeUrl={data?.youtube_url} sectionClass={section("video")} />
            <ProductsSection products={products} slug={slug} sectionClass={section("products")} onEnquire={openProductEnquiry} />
            <GallerySection gallery={gallery} onImageClick={setActiveImageIndex} />
            <TestimonialsSection
              testimonials={testimonials}
              activeIndex={activeTestimonial}
              onPrev={() => setActiveTestimonial((p) => (p === 0 ? testimonials.length - 1 : p - 1))}
              onNext={() => setActiveTestimonial((p) => (p === testimonials.length - 1 ? 0 : p + 1))}
              sectionClass={section("testimonials")}
            />
            <EnquiryFormSection
              formData={formData}
              onChange={setFormData}
              onSubmit={handleEnquirySubmit}
              onReset={() => { setFormData({ name: "", phone: "", message: "" }); setSubmitStatus("idle"); setErrorMessage(""); }}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              errorMessage={errorMessage}
              sectionClass={section("enquiry")}
            />
            <SocialLinksSection socialLinks={socialLinks} />
            <LocationSection mapsLink={contact.maps_link} address={contact.address} />

            {/* ── MarketingSetu Advertisement Link ── */}
            <div className="pt-6 border-t border-gray-100 text-center pb-16">
              <a
                href="https://marketingsetu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-200 transition-all shadow-xs"
              >
                <span>{translations[(pageLanguage as Language) in translations ? (pageLanguage as Language) : "en"].bp_created_with ?? "Created with"}</span>
                <span className="font-bold text-gray-950 tracking-tight">
                  Marketing<span style={{ color: primaryColor }}>Setu</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                <span className="text-gray-400">{translations[(pageLanguage as Language) in translations ? (pageLanguage as Language) : "en"].bp_get_page ?? "Get your business page"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Floating Mobile CTA ── */}
        <FloatingCta phone={contact.phone} slug={slug} onMessageClick={scrollToEnquiry} />

        {/* ── Gallery Lightbox ── */}
        {activeImageIndex !== null && (
          <GalleryLightbox
            gallery={gallery}
            activeIndex={activeImageIndex}
            onClose={() => setActiveImageIndex(null)}
            onPrev={() => setActiveImageIndex((p) => (p === null || p === 0 ? gallery.length - 1 : p - 1))}
            onNext={() => setActiveImageIndex((p) => (p === null || p === gallery.length - 1 ? 0 : p + 1))}
          />
        )}

        {/* ── Product Enquiry Modal ── */}
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