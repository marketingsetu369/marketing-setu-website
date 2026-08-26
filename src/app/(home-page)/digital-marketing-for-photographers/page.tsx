import IndustryLandingView from "@/views/home-page/IndustryLandingView";
import { industryLandingMap } from "@/views/home-page/data/industryLandingData";
import { Metadata } from "next";

const info = industryLandingMap["digital-marketing-for-photographers"];

export const metadata: Metadata = {
  title: info.title,
  description: info.metaDescription,
  keywords: info.keywords,
  alternates: {
    canonical: `/${info.slug}`,
  },
  openGraph: {
    title: info.title,
    description: info.metaDescription,
    url: `/${info.slug}`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://marketingsetu.com" },
        { "@type": "ListItem", "position": 2, "name": info.industryName, "item": `https://marketingsetu.com/${info.slug}` }
      ]
    },
    {
      "@type": "Service",
      "name": info.title,
      "description": info.metaDescription,
      "provider": { "@type": "Organization", "name": "Marketing Setu" }
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
      <IndustryLandingView info={info} />
    </>
  );
}
