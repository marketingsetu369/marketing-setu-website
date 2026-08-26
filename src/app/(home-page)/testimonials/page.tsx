import TestimonialsView from "@/views/home-page/TestimonialsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials & Success Stories — MarketingSetu Maharashtra",
  description:
    "Discover how hundreds of local business owners, doctors, retailers, and service professionals in Satara, Sangli, Kolhapur, Pune, and across Maharashtra grow their sales and inquiries with MarketingSetu.",
  keywords: [
    "MarketingSetu Reviews",
    "Customer Testimonials Maharashtra",
    "Local Business Success Stories Satara",
    "WhatsApp Marketing Case Studies Kolhapur",
    "Local Business Reviews Sangli Pune",
  ],
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Client Testimonials | MarketingSetu Maharashtra",
    description:
      "Read real stories from business owners across Satara, Sangli, Kolhapur, Pune & Maharashtra achieving measurable growth with MarketingSetu.",
    url: "/testimonials",
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
  "@type": "ItemList",
  "name": "Customer Testimonials in Maharashtra",
  "description": "Reviews and feedback from local businesses across Satara, Sangli, Kolhapur, Pune, and Maharashtra using MarketingSetu",
  "itemListElement": [
    {
      "@type": "Review",
      "position": 1,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
      },
      "author": {
        "@type": "Person",
        "name": "Local Retailer & Business Owner in Maharashtra",
      },
      "reviewBody":
        "MarketingSetu helped us capture missed call inquiries on WhatsApp instantly, resulting in 40% more repeat customers across Maharashtra.",
      "itemReviewed": {
        "@type": "Organization",
        "name": "MarketingSetu",
      },
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
      <TestimonialsView />
    </>
  );
}
