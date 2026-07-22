import fetchClient from "../apiClient";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export const BusinessPageApi = {
  getPublicBusinessPage: (slug: string) =>
    fetchClient.get<ApiResponse<any>>(`/business-page/public/${slug}`).then((r) => r.data),
  trackAction: (slug: string, action: 'view' | 'call' | 'whatsapp' | 'copy_link' | 'directions') =>
    fetchClient.post<ApiResponse<any>>(`/business-page/public/${slug}/click`, { action }).then((r) => r.data),
};
