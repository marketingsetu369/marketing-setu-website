import { Metadata } from "next";
import GoogleReviewQrView from "./GoogleReviewQrView";

export const metadata: Metadata = {
  title: "Free Google Review QR Code Generator & Standee Maker | MarketingSetu",
  description:
    "Create free Google Review QR codes and printable 5-star review cards in seconds. Help local customers find your Google Maps listing and leave 5-star reviews instantly.",
  keywords: [
    "Google review QR code generator",
    "free Google review standee generator",
    "create QR code for Google reviews",
    "Google Maps 5 star review standee",
    "how to get Google review QR code",
    "Google review link generator India",
  ],
  alternates: {
    canonical: "/tools/google-review-qr-generator",
  },
  openGraph: {
    title: "Free Google Review QR Code Generator — MarketingSetu",
    description:
      "Generate custom 5-star Google Review QR codes and download printable counter standees for your shop or clinic.",
    url: "/tools/google-review-qr-generator",
    type: "website",
  },
};

export default function GoogleReviewQrPage() {
  return <GoogleReviewQrView />;
}
