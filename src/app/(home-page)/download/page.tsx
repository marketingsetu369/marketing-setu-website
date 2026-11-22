import DownloadView from "@/views/home-page/DownloadView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get MarketingSetu on Google Play",
  description:
    "Install the official MarketingSetu Android app from Google Play for business follow-ups, enquiries, and digital catalogs.",
  keywords: [
    "MarketingSetu Google Play",
    "MarketingSetu Android App",
    "Business Followup App",
    "Customer Engagement Android App",
  ],
  alternates: {
    canonical: "/download",
  },
  openGraph: {
    title: "Get MarketingSetu on Google Play",
    description:
      "Install MarketingSetu from the official Google Play listing and receive app updates through Google Play.",
    url: "/download",
    type: "website",
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune",
    "geo.position": "18.5204;73.8567",
    ICBM: "18.5204, 73.8567",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "MarketingSetu Android App",
  operatingSystem: "Android",
  applicationCategory: "BusinessApplication",
  installUrl: "https://play.google.com/store/apps/details?id=com.marketingsetu",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Manage customer follow-ups, digital business catalogs, and enquiries from your smartphone.",
  publisher: {
    "@type": "Organization",
    name: "MarketingSetu",
    url: "https://marketingsetu.com",
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
