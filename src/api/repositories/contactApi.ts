import fetchClient from "../apiClient";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export const ContactApi = {
  submitContact: (data: {
    name: string;
    phone: string;
    business?: string;
    plan?: string;
    message?: string;
  }) =>
    fetchClient.post<ApiResponse<any>>("/contact", data).then((r) => r.data),
};
