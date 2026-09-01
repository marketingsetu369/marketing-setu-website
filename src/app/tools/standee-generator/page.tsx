import { Metadata } from "next";
import StandeeGeneratorView from "./StandeeGeneratorView";

export const metadata: Metadata = {
  title: "Free Printable QR Standee & Counter Flyer Generator | MarketingSetu",
  description:
    "Design and download free print-ready A4 flyers, table tent cards, and acrylic counter standees with your business logo, WhatsApp QR code & UPI payment details in seconds.",
  keywords: [
    "QR code standee generator",
    "printable WhatsApp QR flyer A4",
    "table tent QR code maker",
    "Google review counter standee maker",
    "free business QR poster download",
    "shop counter QR design tool India",
  ],
  alternates: {
    canonical: "/tools/standee-generator",
  },
  openGraph: {
    title: "Free Printable QR Standee & Counter Flyer Generator — MarketingSetu",
    description:
      "Create print-ready A4 flyers & table tent standees with custom QR codes for your shop or cafe counter.",
    url: "/tools/standee-generator",
    type: "website",
  },
};

export default function StandeeGeneratorPage() {
  return <StandeeGeneratorView />;
}
