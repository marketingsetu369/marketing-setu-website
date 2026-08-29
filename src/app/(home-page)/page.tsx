import type { Metadata } from "next";
import HomeView from "@/views/home-page/HomeView";

export const metadata: Metadata = {
  title: "MarketingSetu – #1 Smart Digital Business Card & WhatsApp Automation Platform",
  description:
    "MarketingSetu helps small businesses grow online with smart digital business cards, WhatsApp auto-replies, custom landing pages, Google Business local SEO, and daily cash flow ledger app in Pune, Satara, Maharashtra & India.",
  keywords: [
    "marketing setu",
    "marketingsetu",
    "digital business card India",
    "digital visiting card app Pune",
    "NFC visiting card Pune Satara",
    "WhatsApp marketing automation software",
    "custom landing page builder Pune",
    "Google map ranking Maharashtra",
    "business income expense ledger app",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "hi-IN": "/?lang=hi",
      "mr-IN": "/?lang=mr",
      "x-default": "/",
    },
  },
};

export default function Page() {
  return <HomeView />;
}
