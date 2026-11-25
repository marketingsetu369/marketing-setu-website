import fetchClient from "../apiClient";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// Temporary normalizer to support both camelCase (new NestJS backend) and snake_case (old backend).
// Remove once the new NestJS backend is deployed to production.
function normalizeBusinessPage(data: any) {
  if (!data || typeof data !== "object") return data;

  const header = data.header
    ? {
        ...data.header,
        businessName: data.header.businessName ?? data.header.business_name,
        businessCategory: data.header.businessCategory ?? data.header.business_category,
        logoUrl: data.header.logoUrl ?? data.header.logo_url,
      }
    : data.header;

  const contact = data.contact
    ? {
        ...data.contact,
        mapsLink: data.contact.mapsLink ?? data.contact.maps_link ?? data.contact.google_maps_url,
        googleMapsUrl: data.contact.googleMapsUrl ?? data.contact.google_maps_url ?? data.contact.maps_link,
      }
    : data.contact;

  return {
    ...data,
    themeColorHex: data.themeColorHex ?? data.theme_color_hex,
    youtubeUrl: data.youtubeUrl ?? data.youtube_url,
    aboutUs: data.aboutUs ?? data.about_us ?? data.header?.description,
    header,
    contact,
  };
}

export const BusinessPageApi = {
  getPublicBusinessPage: (slug: string) =>
    fetchClient
      .get<ApiResponse<any>>(`/business-page/public/${slug}`)
      .then((r) => normalizeBusinessPage(r.data)),
  trackAction: (slug: string, action: 'view' | 'call' | 'whatsapp' | 'copy_link' | 'directions') =>
    fetchClient.post<ApiResponse<any>>(`/business-page/public/${slug}/click`, { action }).then((r) => r.data),
  submitEnquiry: (slug: string, body: { name: string; phone: string; message?: string; isProduct?: boolean; productName?: string; productPrice?: string; productDescription?: string }) =>
    fetchClient.post<ApiResponse<any>>(`/business-page/public/${slug}/enquiry`, body).then((r) => r.data),
  getPublicBookings: (slug: string) =>
    fetchClient.get<ApiResponse<any>>(`/business-page/public/${slug}/bookings`).then((r) => r.data),
};
