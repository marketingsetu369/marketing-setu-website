import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import BusinessView from "@/views/business-page";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http") && !url.includes("localhost") && !url.includes("10.0.2.2") && !url.includes("127.0.0.1")) {
    return url;
  }
  const match = url.match(/\/uploads\/(.+)$/);
  if (match && match[1]) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
    const cleanApiUrl = apiUrl.replace(/\/$/, "");
    return `${cleanApiUrl}/uploads/${match[1]}`;
  }
  return url;
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

  const businessName = data.header?.businessName || data.header?.business_name || data.business_name || "";
  const tagline = data.header?.tagline || "";
  
  const title = tagline ? `${businessName} | ${tagline}` : businessName;
  const description = data.about_us || data.header?.tagline || `Learn more about ${businessName}`;

  const logoUrl = getImageUrl(data.header?.logoUrl || data.header?.logo_url || data.logo_url);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: logoUrl ? [{ url: logoUrl }] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getBusinessData(resolvedParams.slug);

  const businessName = data?.header?.business_name || data?.business_name || "";
  const businessDescription = data?.header?.tagline || data?.about_us || "";
  const telephone = data?.contact?.phone || data?.mobile_number || "";
  const email = data?.contact?.email || data?.email_address || "";
  const streetAddress = data?.contact?.maps_link || data?.location_address || "";
  const logo = getImageUrl(data?.header?.logo_url || data?.logo_url) || undefined;

  // JSON-LD LocalBusiness Schema
  const jsonLd = data ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "description": businessDescription,
    "telephone": telephone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": streetAddress,
    },
    "image": logo,
  } : null;

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
