import { Metadata } from "next";
import WhatsAppLinkGeneratorView from "./WhatsAppLinkGeneratorView";

export const metadata: Metadata = {
  title: "Free WhatsApp Link Generator with QR Code | MarketingSetu",
  description:
    "Generate free instant click-to-chat WhatsApp links (wa.me) and high-resolution QR codes with custom pre-filled messages. Perfect for Instagram bio, business cards, ads & websites.",
  keywords: [
    "WhatsApp link generator",
    "free WhatsApp QR code generator",
    "create wa.me link",
    "WhatsApp click to chat link",
    "WhatsApp direct message link",
    "WhatsApp marketing tool India",
    "WhatsApp business QR code Pune",
  ],
  alternates: {
    canonical: "/tools/whatsapp-link-generator",
  },
  openGraph: {
    title: "Free WhatsApp Link Generator with QR Code — MarketingSetu",
    description:
      "Create direct WhatsApp chat links with pre-filled messages and download custom QR codes in 1 click.",
    url: "/tools/whatsapp-link-generator",
    type: "website",
  },
};

export default function WhatsAppLinkGeneratorPage() {
  return <WhatsAppLinkGeneratorView />;
}
