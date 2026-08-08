import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import BusinessView from "@/views/business-page";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

  const businessName = data.header?.business_name || data.business_name || "";
  const businessCategory = data.header?.business_category || data.business_category || "Business";
  const locationAddress = data.contact?.maps_link || data.contact?.phone || data.location_address || "";

  const title = `${businessName} - ${businessCategory} in ${locationAddress}`;
  const description = data.header?.tagline || data.about_us || `Learn more about ${businessName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: (data.header?.logo_url || data.logo_url) ? [{ url: data.header?.logo_url || data.logo_url }] : [],
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
  const logo = data?.header?.logo_url || data?.logo_url || undefined;

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
      <BusinessView data={data} businessName={businessName || resolvedParams.slug} />
    </>
  );
}
