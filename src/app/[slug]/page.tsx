import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import BusinessView from "@/views/business-page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getImageUrl = (url?: string) => {
  if (!url) return "";

  // If it's a relative path starting with /uploads
  if (url.startsWith("/uploads/")) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.marketingsetu.com";
    const cleanApiUrl = apiUrl.replace(/\/$/, "");
    const secureApiUrl = cleanApiUrl.replace(/^http:\/\//, "https://");
    return `${secureApiUrl}${url}`;
  }

  if (
    url.startsWith("http") &&
    !url.includes("localhost") &&
    !url.includes("10.0.2.2") &&
    !url.includes("127.0.0.1")
  ) {
    return url.replace(/^http:\/\//, "https://");
  }

  const match = url.match(/\/uploads\/(.+)$/);
  if (match && match[1]) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.marketingsetu.com";
    const cleanApiUrl = apiUrl.replace(/\/$/, "");
    const secureApiUrl = cleanApiUrl.replace(/^http:\/\//, "https://");
    return `${secureApiUrl}/uploads/${match[1]}`;
  }
  return "";
};

// Fetch helper for server context
async function getBusinessData(slug: string) {
  try {
    const res = await BusinessPageApi.getPublicBusinessPage(slug);
    return res && (res.business_name || res.header?.business_name) ? res : null;
  } catch (error) {
    console.error("Error fetching business data on server:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getBusinessData(resolvedParams.slug);

  if (!data) {
    return {
      title: "Page Not Found | MarketingSetu",
    };
  }

  const businessName =
    data.header?.businessName ||
    data.header?.business_name ||
    data.business_name ||
    "";
  const tagline = data.header?.tagline || "";
  const category = data.header?.business_category || data.category || "";
  const city = data.contact?.city || data.city || "Pune";
  const state = data.contact?.state || data.state || "Maharashtra";

  const title = tagline ? `${businessName} — ${tagline}` : `${businessName} | MarketingSetu`;
  const description =
    data.about_us ||
    data.header?.tagline ||
    `Official digital business page for ${businessName} in ${city}, ${state}. Contact, view products, and connect directly on WhatsApp.`;

  const logoUrl = getImageUrl(
    data.header?.logoUrl || data.header?.logo_url || data.logo_url
  );

  const keywords = [
    businessName,
    `${businessName} ${city}`,
    category,
    `${category} in ${city}`,
    "Business Profile",
    "WhatsApp Order",
    "MarketingSetu",
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${resolvedParams.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/${resolvedParams.slug}`,
      siteName: businessName,
      type: "website",
      images: logoUrl ? [{ url: logoUrl, alt: businessName }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: logoUrl ? [logoUrl] : [],
    },
    other: {
      "geo.region": "IN-MH",
      "geo.placename": city,
      "geo.position": "18.5204;73.8567",
      "ICBM": "18.5204, 73.8567",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getBusinessData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  const businessName = data?.header?.business_name || data?.business_name || "";
  const businessDescription = data?.header?.tagline || data?.about_us || "";
  const telephone = data?.contact?.phone || data?.mobile_number || "";
  const email = data?.contact?.email || data?.email_address || "";
  const streetAddress = data?.contact?.address || data?.location_address || "";
  const city = data?.contact?.city || data?.city || "Pune";
  const state = data?.contact?.state || data?.state || "Maharashtra";
  const logo = getImageUrl(data?.header?.logo_url || data?.logo_url) || undefined;

  // JSON-LD LocalBusiness Schema
  const jsonLd = data
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": businessName,
        "description": businessDescription,
        "telephone": telephone,
        "email": email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": city,
          "addressRegion": state,
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.5204,
          "longitude": 73.8567,
        },
        "image": logo,
        "priceRange": "₹₹",
        "areaServed": "IN",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BusinessView data={data} slug={resolvedParams.slug} />
    </>
  );
}
