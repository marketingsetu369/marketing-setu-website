import fetchClient from "../apiClient";

export interface BusinessPageData {
  slug?: string;
  custom_url?: string;
  theme_color_hex?: string;
  youtube_url?: string;
  language?: string;
  header?: {
    logo_url?: string;
    business_name?: string;
    business_category?: string;
    tagline?: string;
    description?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    whatsapp?: string;
    maps_link?: string;
    google_maps_url?: string;
  };
  owner?: Array<{
    avatar_url?: string;
    name: string;
    title: string;
    bio: string;
    happy_customers_count?: number;
    experience_years?: number;
  }>;
  products?: Array<{
    id?: string;
    name: string;
    description?: string;
    price?: number;
    price_unit?: string;
    image?: string;
    imageUrl?: string;
    images?: string[];
    is_active?: boolean;
  }>;
  gallery?: string[];
  testimonials?: Array<{
    id?: string;
    author_name: string;
    name?: string;
    rating: number;
    content: string;
    avatar_url?: string;
    avatar?: string;
  }>;
  social_links?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export interface AnalyticsData {
  totalViews: number;
  totalCalls: number;
  totalWhatsApp: number;
  totalDirections: number;
  totalShares: number;
  recentViews: Array<{ date: string; count: number }>;
}

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  message?: string;
  isProduct?: boolean;
  productName?: string;
  productPrice?: string;
  isRead: boolean;
  createdAt: string;
}

export interface UserTransactionItem {
  id: string;
  userId?: string;
  type: "income" | "expense";
  amount: number;
  title: string;
  category?: string;
  paymentMode?: string;
  description?: string;
  date: string;
  createdAt?: string;
}

export interface UserTransactionsSummary {
  transactions: UserTransactionItem[];
  totalExpenses: number;
  totalIncome: number;
  netBalance: number;
}

export const UserDashboardApi = {
  // Business Page
  getBusinessPage: async () => {
    return fetchClient.get<{ statusCode: number; data: BusinessPageData }>("/user/business-page");
  },

  saveBusinessPage: async (data: Partial<BusinessPageData>) => {
    return fetchClient.post<{ statusCode: number; message: string; data: BusinessPageData }>(
      "/user/business-page",
      data
    );
  },

  getAnalytics: async () => {
    return fetchClient.get<{ statusCode: number; data: AnalyticsData }>("/user/business-page/analytics");
  },

  // Enquiries
  getEnquiries: async (params?: { page?: number; limit?: number; type?: "product" | "general" }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.type) query.append("type", params.type);
    const qs = query.toString() ? `?${query.toString()}` : "";
    return fetchClient.get<{ statusCode: number; data: EnquiryItem[] | { enquiries: EnquiryItem[]; total: number } }>(
      `/user/enquiries${qs}`
    );
  },

  markEnquiryRead: async (id: string) => {
    return fetchClient.post<{ statusCode: number; message: string }>(`/user/enquiries/${id}/read`, {});
  },

  deleteEnquiry: async (id: string) => {
    return fetchClient.delete<{ statusCode: number; message: string }>(`/user/enquiries/${id}`);
  },

  // User Transactions
  getTransactions: async (params?: { fromDate?: string; toDate?: string; type?: "income" | "expense" }) => {
    const query = new URLSearchParams();
    if (params?.fromDate) query.append("fromDate", params.fromDate);
    if (params?.toDate) query.append("toDate", params.toDate);
    if (params?.type) query.append("type", params.type);
    const qs = query.toString() ? `?${query.toString()}` : "";
    return fetchClient.get<{ statusCode: number; data: UserTransactionsSummary }>(`/user/transactions${qs}`);
  },

  getTransactionCategories: async () => {
    return fetchClient.get<{ statusCode: number; data: string[] }>("/user/transactions/categories");
  },

  createTransaction: async (data: {
    type: "income" | "expense";
    amount: number;
    title: string;
    category?: string;
    paymentMode?: string;
    description?: string;
    date?: string;
  }) => {
    return fetchClient.post<{ statusCode: number; message: string; data: UserTransactionItem }>(
      "/user/transactions",
      data
    );
  },

  updateTransaction: async (
    id: string,
    data: Partial<{
      type: "income" | "expense";
      amount: number;
      title: string;
      category?: string;
      paymentMode?: string;
      description?: string;
      date?: string;
    }>
  ) => {
    return fetchClient.put<{ statusCode: number; message: string; data: UserTransactionItem }>(
      `/user/transactions/${id}`,
      data
    );
  },

  deleteTransaction: async (id: string) => {
    return fetchClient.delete<{ statusCode: number; message: string }>(`/user/transactions/${id}`);
  },

  // Media upload helper
  uploadMedia: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = typeof window !== "undefined" ? localStorage.getItem("marketingsetu_user_token") : null;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.marketingsetu.com";
    const res = await fetch(`${apiUrl}/api/v1/user/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to upload image");
    }

    return res.json() as Promise<{ statusCode: number; data: { url: string } }>;
  },
};
