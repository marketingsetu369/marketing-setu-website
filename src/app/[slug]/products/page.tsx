import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import ProductsListView from "@/views/business-page/products-list";
import type { Metadata } from "next";
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
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.marketingsetu.com";
    const cleanApiUrl = apiUrl.replace(/\/$/, "");
    const secureApiUrl = cleanApiUrl.replace(/^http:\/\//, "https://");
    return `${secureApiUrl}/uploads/${match[1]}`;
  }
  return "";
};

async function getBusinessData(slug: string) {
  try {
    const res = await BusinessPageApi.getPublicBusinessPage(slug);
    return res && (res.business_name || res.header?.business_name) ? res : null;
  } catch (error) {
    console.error("Error fetching business data on server:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getBusinessData(resolvedParams.slug);

  if (!data) {
    return {
      title: "Products & Services | MarketingSetu",
    };
  }

  const businessName =
    data.header?.businessName ||
    data.header?.business_name ||
    data.business_name ||
    "";
  const city = data.contact?.city || data.city || "Pune";
  const state = data.contact?.state || data.state || "Maharashtra";

  const title = `Products & Services — ${businessName} | MarketingSetu`;
  const description = `Browse all products, offerings, and services provided by ${businessName} in ${city}, ${state}. Contact directly or order on WhatsApp.`;
  const logoUrl = getImageUrl(
    data.header?.logoUrl || data.header?.logo_url || data.logo_url
  );

  const keywords = [
    `${businessName} Products`,
    `${businessName} Services`,
    `${businessName} Price List`,
    `Order from ${businessName}`,
    `${businessName} ${city}`,
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${resolvedParams.slug}/products`,
    },
    openGraph: {
      title,
      description,
      url: `/${resolvedParams.slug}/products`,
      siteName: businessName,
      type: "website",
      images: logoUrl ? [{ url: logoUrl, alt: `${businessName} Products` }] : [],
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
  const products = Array.isArray(data?.products) ? data.products : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": businessName,
            "item": `https://marketingsetu.com/${resolvedParams.slug}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products & Services",
            "item": `https://marketingsetu.com/${resolvedParams.slug}/products`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": `${businessName} Products & Services`,
        "numberOfItems": products.length,
        "itemListElement": products.map((product: any, index: number) => ({
          "@type": "Product",
          "position": index + 1,
          "name": product.name || product.title || `Product ${index + 1}`,
          "description": product.description || "",
          "image": getImageUrl(product.imageUrl || product.image || product.image_url) || undefined,
          "offers": {
            "@type": "Offer",
            "price": product.price ? String(product.price).replace(/[^0-9.]/g, "") || "0" : "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsListView data={data} slug={resolvedParams.slug} />
    </>
  );
}
