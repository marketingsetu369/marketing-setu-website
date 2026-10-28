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
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://marketingsetu.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://marketingsetu.com/contact"
        }
      ]
    },
    {
      "@type": "ContactPage",
      "@id": "https://marketingsetu.com/contact#webpage",
      "name": "Contact MarketingSetu",
      "description": "Contact details, phone number, and enquiry form for MarketingSetu in Pune, Satara, Sangli, Kolhapur and Maharashtra.",
      "url": "https://marketingsetu.com/contact",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "MarketingSetu",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hinjawadi - Wakad Road, Hinjawadi",
          "addressLocality": "Pune",
          "addressRegion": "MH",
          "postalCode": "411057",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.5912,
          "longitude": 73.7389
        },
        "telephone": "+91 9172415858",
        "email": "support@marketingsetu.com",
        "url": "https://marketingsetu.com/contact",
        "areaServed": [
          "Satara",
          "Sangli",
          "Kolhapur",
          "Pune",
          "Maharashtra",
          "India"
        ]
      }
    }
  ]
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
