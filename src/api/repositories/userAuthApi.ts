import fetchClient from "../apiClient";

export interface UserProfile {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  plan?: string | null;
  planExpiresAt?: string | null;
  isActive: boolean;
  accessKey?: string | null;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  usage?: {
    dailyMessagesCount?: number;
    dailyLimit?: number;
    contactsCount?: number;
    contactsLimit?: number;
    templatesCount?: number;
    templatesLimit?: number;
  };
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    user: UserProfile;
    role: string;
    token: string;
  };
}

export const UserAuthApi = {
  login: async (phone: string, password: string) => {
    return fetchClient.post<LoginResponse>("/user/login", {
      phone,
      password,
      clientType: "web",
    });
  },

  getProfile: async () => {
    return fetchClient.get<{ statusCode: number; message: string; data: UserProfile }>("/user/me");
  },

  updateProfile: async (data: { firstName?: string; lastName?: string; email?: string }) => {
    return fetchClient.put<{ statusCode: number; message: string; data: UserProfile }>("/user/profile", data);
  },

  logout: async () => {
    return fetchClient.post<{ statusCode: number; message: string }>("/user/logout", {});
  },
};
