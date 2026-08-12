import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import ProductsListView from "@/views/business-page/products-list";
import { Metadata } from "next";
 
export const dynamic = "force-dynamic";
 
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
 
const getImageUrl = (url?: string) => {
  if (!url) return "";
  if (
    url.startsWith("http") &&
    !url.includes("localhost") &&
    !url.includes("10.0.2.2") &&
    !url.includes("127.0.0.1") &&
    !url.includes("187.127.128.193")
  ) {
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
      title: "Products & Services | MarketingSetu",
    };
  }
 
  const businessName = data.header?.businessName || data.header?.business_name || data.business_name || "";
  const title = `Products & Services - ${businessName} | MarketingSetu`;
  const description = `Browse all products and services offered by ${businessName}`;
 
  return {
    title,
    description,
  };
}
 
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getBusinessData(resolvedParams.slug);
 
  return <ProductsListView data={data} slug={resolvedParams.slug} />;
}
