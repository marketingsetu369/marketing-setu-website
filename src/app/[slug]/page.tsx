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
    return res && res.business_name ? res : null;
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

  const title = `${data.business_name} - ${data.business_category || "Business"} in ${data.location_address || ""}`;
  const description = data.about_us || `Learn more about ${data.business_name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data.logo_url ? [{ url: data.logo_url }] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getBusinessData(resolvedParams.slug);

  // JSON-LD LocalBusiness Schema
  const jsonLd = data ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": data.business_name,
    "description": data.about_us,
    "telephone": data.mobile_number,
    "email": data.email_address,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.location_address,
    },
    "image": data.logo_url || undefined,
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BusinessView data={data} businessName={data?.business_name || resolvedParams.slug} />
    </>
  );
}
