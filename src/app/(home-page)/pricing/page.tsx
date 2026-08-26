import PricingView from "@/views/home-page/PricingView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans — Affordable Marketing for Businesses in Maharashtra",
  description:
    "Affordable plans starting at just ₹3,499/year for businesses in Satara, Sangli, Kolhapur, Pune, and across Maharashtra. Automate WhatsApp follow-ups, launch digital business landing pages, and boost Google SEO.",
  keywords: [
    "MarketingSetu Pricing Maharashtra",
    "WhatsApp Marketing Cost Satara",
    "WhatsApp Marketing Pricing Sangli",
    "Digital Marketing Agency Cost Kolhapur",
    "Affordable Digital Marketing Pune Maharashtra",
    "Business Landing Page Plans",
    "Local SEO Packages Maharashtra",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing Plans | MarketingSetu Maharashtra",
    description:
      "Simple, transparent pricing starting from ₹3499/year for businesses across Satara, Sangli, Kolhapur, Pune & Maharashtra.",
    url: "/pricing",
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
          "name": "Pricing",
          "item": "https://marketingsetu.com/pricing"
        }
      ]
    },
    {
      "@type": "Product",
      "name": "MarketingSetu Business Growth Subscription",
      "description":
        "Automated WhatsApp customer follow-up, digital business pages, and local SEO ranking platform for businesses in Satara, Sangli, Kolhapur, Pune, Maharashtra and India.",
      "brand": {
        "@type": "Brand",
        "name": "MarketingSetu",
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "3499",
        "highPrice": "12999",
        "offerCount": "3",
        "offers": [
          {
            "@type": "Offer",
            "name": "Quick Connect",
            "price": "3499",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "description": "Digital Business Card, Auto SMS on Missed Call, Custom Landing Page."
          },
          {
            "@type": "Offer",
            "name": "Smart Connect",
            "price": "5499",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "description": "Auto WhatsApp on Missed Call, Custom Landing Page, Festival Social Posts."
          },
          {
            "@type": "Offer",
            "name": "Power Connect",
            "price": "12999",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "description": "Full-suite Marketing, Multi-User Dashboard, Advanced Analytics & Dedicated Support."
          }
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
      <PricingView />
    </>
  );
}
