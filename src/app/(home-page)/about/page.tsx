import AboutView from "@/views/home-page/AboutView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Empowering Local Businesses Across Maharashtra",
  description:
    "Learn about MarketingSetu's mission to bridge the gap between local businesses in Pune, Satara, Sangli, Kolhapur, and all of Maharashtra with digital growth through automated WhatsApp tools, Google local SEO, and custom business landing pages.",
  keywords: [
    "About MarketingSetu",
    "Digital Marketing Agency Maharashtra",
    "Digital Marketing Satara",
    "Digital Marketing Sangli",
    "Digital Marketing Kolhapur",
    "Digital Marketing Pune",
    "Local Business Growth Maharashtra",
    "WhatsApp Automation Company Maharashtra",
    "Local SEO Experts Kolhapur Sangli Satara",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | MarketingSetu",
    description:
      "Bridging the gap between local businesses and digital success in Satara, Sangli, Kolhapur, Pune, and across Maharashtra.",
    url: "/about",
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
  "@type": "AboutPage",
  "name": "About MarketingSetu",
  "description":
    "MarketingSetu empowers local businesses across Satara, Sangli, Kolhapur, Pune, and all over Maharashtra with WhatsApp marketing automation, digital cards, and Google Business ranking.",
  "publisher": {
    "@type": "Organization",
    "name": "MarketingSetu",
    "url": "https://marketingsetu.com",
    "logo": "https://marketingsetu.com/logo.svg",
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
      <AboutView />
    </>
  );
}
