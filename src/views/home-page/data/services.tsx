import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BubbleChatIcon,
  BrowserIcon,
  CallIncoming01Icon,
  BotIcon,
  Location01Icon,
  Camera01Icon,
} from "@hugeicons/core-free-icons";
import { ServiceBlockItem } from "../component/ServiceBlock";

export const servicesData: ServiceBlockItem[] = [
  {
    id: "whatsapp-marketing",
    icon: <HugeiconsIcon icon={BubbleChatIcon} size={36} />,
    badge: "Most Popular",
    title: "WhatsApp Marketing",
    lead: "Reach customers where they already spend hours a day. Send bulk promotions, festival offers, and order updates directly to WhatsApp with delivery and open rates far above SMS or email.",
    features: [
      "Bulk broadcast campaigns to your customer list",
      "Rich media: images, catalogues, and offer cards",
      "Delivery & read tracking so you know what's working",
      "Opt-in list building that keeps you compliant",
    ],
    imageUrl: "https://images.unsplash.com/photo-1642724978770-e27d781662d6?auto=format&fit=crop&w=900&q=80",
    imageAlt: "WhatsApp Marketing — MarketingSetu",
  },
  {
    id: "landing-pages",
    icon: <HugeiconsIcon icon={BrowserIcon} size={36} />,
    title: "Landing Page Design",
    lead: "A beautiful, fast, single-purpose page built around one campaign goal — whether that's bookings, enquiries, or sign-ups. Mobile-first, lightweight, and built to convert.",
    features: [
      "Custom design matched to your brand colours",
      "Mobile-first layout — most Indian traffic is on phones",
      "WhatsApp & call-to-action buttons built in",
      "Optional custom domain on Pro plans",
    ],
    imageUrl: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Landing Page Design — MarketingSetu",
    reversed: true,
  },
  {
    id: "missed-call",
    icon: <HugeiconsIcon icon={CallIncoming01Icon} size={36} />,
    title: "Missed Call Auto Text",
    lead: "Never lose a lead to a busy line again. The moment someone calls and hangs up, they automatically receive a warm, personalised SMS from your business.",
    features: [
      "Instant automated reply within seconds",
      "Personalised with your business name & offer",
      "Works on any existing mobile number",
      "Simple monthly reporting on missed-call volume",
    ],
    imageUrl: "https://images.unsplash.com/photo-1758876018643-71ee5951ab0a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Missed Call Auto Text — MarketingSetu",
  },
  {
    id: "auto-whatsapp",
    icon: <HugeiconsIcon icon={BotIcon} size={36} />,
    title: "Auto WhatsApp Message",
    lead: "Set up automated WhatsApp responses for common enquiries, booking confirmations, and follow-ups — so your business feels responsive 24 hours a day.",
    features: [
      "Instant greeting for first-time enquiries",
      "Automated booking & order confirmations",
      "Scheduled follow-ups for cart drops or no-shows",
      "Handover to a human agent whenever needed",
    ],
    imageUrl: "https://images.unsplash.com/photo-1760349748488-bd2a7ef25ea0?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Auto WhatsApp Message — MarketingSetu",
    reversed: true,
  },
  {
    id: "google-business",
    icon: <HugeiconsIcon icon={Location01Icon} size={36} />,
    title: "Google Business Setup",
    lead: "Get found by the customers already searching for you. We set up, verify, and optimise your Google Business Profile so you show up on Search and Maps.",
    features: [
      "Full profile setup & verification support",
      "Categories, service areas & photos optimised",
      "Review response templates & monitoring tips",
      "Local SEO keywords matched to your city",
    ],
    imageUrl: "https://images.unsplash.com/photo-1694928850410-b209896782a2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Google Business Setup — MarketingSetu",
  },
  {
    id: "social-media",
    icon: <HugeiconsIcon icon={Camera01Icon} size={36} />,
    title: "Social Media & Ad Posts",
    lead: "Instagram and Facebook marketing with eye-catching graphic posts, festival creatives, and targeted ad campaigns that build real local audience growth.",
    features: [
      "Branded post templates for every festival",
      "Instagram & Facebook ad campaign setup",
      "Audience targeting by city, interest & age",
      "Monthly content calendar available on request",
    ],
    imageUrl: "https://images.unsplash.com/photo-1759215524472-1b0686fdbd87?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Social Media & Ad Posts — MarketingSetu",
    reversed: true,
  },
];
