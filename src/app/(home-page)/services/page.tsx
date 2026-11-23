import ServicesView from "@/views/home-page/ServicesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — WhatsApp Marketing, Local SEO & Custom Business Pages in India",
  description:
    "Explore MarketingSetu's high-impact digital marketing services across India: Automated WhatsApp Missed-Call Follow-ups, Digital Business Cards, Instant Landing Pages, Google Map Ranking, and Festival Social Post Templates.",
  keywords: [
    "WhatsApp Marketing India",
    "Local SEO India",
    "Digital Business Landing Pages India",
    "Google Business Profile Setup India",
    "Missed Call Auto Response India",
    "WhatsApp Automation Pune Mumbai Delhi Bengaluru",
    "Festival Poster Maker India",
    "Digital Khata Passbook India",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Marketing & WhatsApp Automation Services in India | MarketingSetu",
    description:
      "Convert missed calls into repeat customers across India with automated WhatsApp marketing and digital business pages.",
    url: "/services",
    type: "website",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
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
          "name": "Services",
          "item": "https://marketingsetu.com/services"
        }
      ]
    },
    {
      "@type": "ItemList",
      "name": "MarketingSetu Services in Maharashtra",
      "itemListElement": [
    {
      "@type": "Service",
      "position": 1,
      "name": "WhatsApp Marketing & Missed Call Automation",
      "description":
        "Automated WhatsApp message sending on missed or received calls with digital brochures and greeting messages for businesses in Maharashtra.",
      "provider": {
        "@type": "Organization",
        "name": "MarketingSetu",
      },
      "areaServed": [
        "Satara",
        "Sangli",
        "Kolhapur",
        "Pune",
        "Maharashtra",
        "IN"
      ],
    },
    {
      "@type": "Service",
      "position": 2,
      "name": "Custom Business Landing Pages",
      "description":
        "Instant mobile-optimized landing pages with catalog listings, enquiry forms, and WhatsApp ordering for local retailers and businesses in Maharashtra.",
      "provider": {
        "@type": "Organization",
        "name": "MarketingSetu",
      },
      "areaServed": [
        "Satara",
        "Sangli",
        "Kolhapur",
        "Pune",
        "Maharashtra",
        "IN"
      ],
    },
    {
      "@type": "Service",
      "position": 3,
      "name": "Google Business Profile & Local SEO",
      "description":
        "Complete Google Map verification, local keywords optimization, and citation ranking to capture nearby customers in Satara, Sangli, Kolhapur, Pune, and Maharashtra.",
      "provider": {
        "@type": "Organization",
        "name": "MarketingSetu",
      },
      "areaServed": [
        "Satara",
        "Sangli",
        "Kolhapur",
        "Pune",
        "Maharashtra",
        "IN"
      ],
    },
    {
      "@type": "Service",
      "position": 4,
      "name": "Festival & Promotional Graphic Posts",
      "description":
        "Ready-to-use custom branded festival and promotional templates to keep your customers engaged.",
      "provider": {
        "@type": "Organization",
        "name": "MarketingSetu",
      },
      "areaServed": [
        "Satara",
        "Sangli",
        "Kolhapur",
        "Pune",
        "Maharashtra",
        "IN"
      ],
    },
  ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesView />
    </>
  );
}
