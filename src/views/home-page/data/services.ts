import { ServiceBlockItem } from "../component/ServiceBlock";
import { TranslationDictionary } from "@/translation";

export function getServicesData(t: TranslationDictionary): ServiceBlockItem[] {
  return [
    {
      id: "digital-business-card",
      icon: "🪪",
      badge: "Main Product",
      title: t.service_block_card_title || "Smart Digital Business Card",
      lead: t.service_block_card_lead || "Your professional Digital Business Card — shareable via WhatsApp, QR code, Instagram, and Google in one tap. Show your services, photos, contact details, and a direct enquiry button. Live in 15 min.",
      features: [
        t.showcase_bullet_digital_1 || "Custom logo, name, category & WhatsApp link",
        t.showcase_bullet_digital_2 || "Tap-to-call, WhatsApp, email & location buttons",
        t.showcase_bullet_digital_3 || "Products & services showcase with prices",
        "QR code + shareable link for WhatsApp & Instagram",
      ],
      imageUrl: "",
      imageAlt: "Smart Digital Business Card — MarketingSetu",
    },
    {
      id: "whatsapp-marketing",
      icon: "💬",
      badge: "Add-On",
      title: t.service_block_wa_title || "WhatsApp Auto Messaging",
      lead: t.service_block_wa_lead || "Never miss a customer again. Our WhatsApp Auto Messaging add-on sends instant replies to every enquiry and missed call — 24/7, automatically, even while you sleep.",
      features: [
        t.showcase_bullet_wa_1 || "Instant auto-reply on missed calls & messages",
        t.showcase_bullet_wa_2 || "Welcome message sent the moment a customer texts",
        t.showcase_bullet_wa_3 || "Follow-up messages for unconverted leads",
        "WhatsApp catalogue linked to your Digital Card",
      ],
      imageUrl: "",
      imageAlt: "WhatsApp Auto Messaging — MarketingSetu",
      reversed: true,
    },
    {
      id: "income-expense-log",
      icon: "📒",
      badge: "Add-On",
      title: t.service_block_log_title || "Log Income & Expense",
      lead: t.service_block_log_lead || "Track every sale, payment, and expense directly from your phone. Simple daily ledger built for small business owners — no accountant needed, no complicated software.",
      features: [
        t.showcase_bullet_ie_1 || "Log daily income and expenses in seconds",
        t.showcase_bullet_ie_2 || "Categorise entries by cash, UPI, or card",
        t.showcase_bullet_ie_3 || "Monthly summary with profit/loss overview",
        "Export records as PDF for CA or tax filing",
      ],
      imageUrl: "",
      imageAlt: "Income & Expense Log — MarketingSetu",
    },
    {
      id: "products-services",
      icon: "🛍️",
      badge: "Card Feature",
      title: t.service_block_catalog_title || "Products & Services Catalog",
      lead: t.service_block_catalog_lead || "Showcase all your products and services on your Digital Card with photos, descriptions, prices, and a direct WhatsApp enquiry button — your online shop without any app or website.",
      features: [
        t.showcase_bullet_pc_1 || "Item photos, names, descriptions & pricing",
        t.showcase_bullet_pc_2 || "Category grouping for easy customer navigation",
        t.showcase_bullet_pc_3 || "Direct product inquiry via WhatsApp",
        "Customer reviews and star ratings per product",
      ],
      imageUrl: "",
      imageAlt: "Products & Services Catalog — MarketingSetu",
      reversed: true,
    },
    {
      id: "photo-gallery",
      icon: "🖼️",
      badge: "Card Feature",
      title: t.service_block_gallery_title || "Photo Gallery Showcase",
      lead: t.service_block_gallery_lead || "Build trust instantly. Upload photos of your shop, work, food, or projects directly on your Digital Card so customers see the real you before they even call.",
      features: [
        t.service_feat_gallery_1 || "High-quality photo uploads for shop/office",
        t.service_feat_gallery_2 || "Organised gallery view for customer trust",
        t.service_feat_gallery_3 || "Instant mobile viewing on all devices",
        t.service_feat_gallery_4 || "Easy photo management via mobile app",
      ],
      imageUrl: "",
      imageAlt: "Photo Gallery Showcase — MarketingSetu",
    },
    {
      id: "testimonials-reviews",
      icon: "⭐",
      badge: "Card Feature",
      title: t.service_block_reviews_title || "Customer Reviews & Testimonials",
      lead: t.service_block_reviews_lead || "Let happy customers do the selling for you. Collect and display authentic reviews and ratings on your Digital Card to convert new visitors into buyers.",
      features: [
        t.service_feat_reviews_1 || "Display customer reviews, ratings & feedback",
        t.service_feat_reviews_2 || "Social proof elements for higher conversion",
        t.service_feat_reviews_3 || "Owner profiles & partner spotlight cards",
        t.service_feat_reviews_4 || "Easily update reviews through the app",
      ],
      imageUrl: "",
      imageAlt: "Customer Reviews & Testimonials — MarketingSetu",
      reversed: true,
    },
  ];
}

export const servicesData: ServiceBlockItem[] = getServicesData({} as any);
