import ContactView from "@/views/home-page/ContactView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — MarketingSetu Maharashtra (Pune, Satara, Sangli, Kolhapur)",
  description:
    "Ready to scale your local business? Contact MarketingSetu for WhatsApp marketing automation, custom business pages, and local SEO across Pune, Satara, Sangli, Kolhapur, and all over Maharashtra.",
  keywords: [
    "Contact MarketingSetu",
    "Digital Marketing Agency Satara",
    "Digital Marketing Agency Sangli",
    "Digital Marketing Agency Kolhapur",
    "Digital Marketing Agency Pune",
    "WhatsApp Marketing Maharashtra Support",
    "MarketingSetu Phone Number",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | MarketingSetu Maharashtra",
    description:
      "Get in touch with MarketingSetu for local marketing solutions across Pune, Satara, Sangli, Kolhapur, and Maharashtra.",
    url: "/contact",
    type: "website",
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Satara, Sangli, Kolhapur, Pune, Maharashtra",
    "geo.position": "18.5204;73.8567",
    "ICBM": "18.5204, 73.8567",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact MarketingSetu Maharashtra",
  "description": "Contact details, phone number, and enquiry form for MarketingSetu in Maharashtra (Pune, Satara, Sangli, Kolhapur)",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "MarketingSetu",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "MH",
      "postalCode": "411001",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5204,
      "longitude": 73.8567,
    },
    "telephone": "+91-9876543210",
    "url": "https://marketingsetu.com/contact",
    "areaServed": [
      "Satara",
      "Sangli",
      "Kolhapur",
      "Pune",
      "Maharashtra",
      "India"
    ]
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactView />
    </>
  );
}
