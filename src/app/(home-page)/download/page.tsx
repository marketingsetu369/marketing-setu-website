import DownloadView from "@/views/home-page/DownloadView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Android App — Automatic WhatsApp Missed-Call Marketing",
  description:
    "Download the official MarketingSetu Android app to automate your business customer follow-ups on missed calls, manage business inquiries, and grow your sales on autopilot.",
  keywords: [
    "Download MarketingSetu App",
    "Missed Call WhatsApp App Android",
    "Business Followup App APK",
    "Customer Engagement Android App",
    "MarketingSetu Mobile App",
  ],
  alternates: {
    canonical: "/download",
  },
  openGraph: {
    title: "Download MarketingSetu Android App",
    description:
      "Automate customer follow-ups on missed calls and convert inquiries into loyal customers directly from your phone.",
    url: "/download",
    type: "website",
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune",
    "geo.position": "18.5204;73.8567",
    "ICBM": "18.5204, 73.8567",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "MarketingSetu Android App",
  "operatingSystem": "Android",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
  },
  "description":
    "Automate WhatsApp and SMS follow-ups on missed calls, digital business card sharing, and customer engagement directly from your smartphone.",
  "publisher": {
    "@type": "Organization",
    "name": "MarketingSetu",
    "url": "https://marketingsetu.com",
  },
};

export default function DownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DownloadView />
    </>
  );
}
