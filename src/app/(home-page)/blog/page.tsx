import BlogView from "@/views/home-page/BlogView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Guides — Local Marketing & WhatsApp Automation in Maharashtra",
  description:
    "Expert tips, strategies, and guides on local business marketing, WhatsApp automation, Google Maps SEO, and customer retention for businesses in Satara, Sangli, Kolhapur, Pune, and Maharashtra.",
  keywords: [
    "Digital Marketing Blog Maharashtra",
    "WhatsApp Marketing Tips Pune Satara",
    "Local SEO Guides Kolhapur Sangli",
    "Maharashtra Business Growth Strategies",
    "Customer Engagement Tactics India",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Marketing Guides for Maharashtra Businesses | MarketingSetu",
    description:
      "Actionable digital marketing strategies and WhatsApp automation tips for local businesses in Maharashtra.",
    url: "/blog",
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
  "@type": "Blog",
  "name": "MarketingSetu Maharashtra Growth Blog",
  "description":
    "Marketing guides, local SEO tutorials, and WhatsApp automation tips for business owners across Maharashtra.",
  "publisher": {
    "@type": "Organization",
    "name": "MarketingSetu",
    "url": "https://marketingsetu.com",
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
      <BlogView />
    </>
  );
}
